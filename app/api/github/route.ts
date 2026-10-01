import { NextResponse } from "next/server";
import { GITHUB_CONFIG } from "../../config/github";

export interface LanguageStat {
  name: string;
  percentage: number;
  color: string;
}

export interface GitHubStatsResponse {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  topLanguages: LanguageStat[];
  isFallback: boolean;
}

// Map common languages to hex colors if GitHub color is missing
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Rust: "#dea584",
  Dart: "#00B4AB",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
};

export async function GET() {
  const username = GITHUB_CONFIG.username;
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  // Strategy 1: Attempt GraphQL API if server GITHUB_TOKEN is configured
  if (token) {
    try {
      const graphqlQuery = {
        query: `
          query($username: String!) {
            user(login: $username) {
              name
              login
              avatarUrl
              url
              followers {
                totalCount
              }
              following {
                totalCount
              }
              repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
                totalCount
                nodes {
                  stargazerCount
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
        variables: { username },
      };

      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Jamshaid-Portfolio",
        },
        next: { revalidate: GITHUB_CONFIG.revalidateSeconds },
      });

      if (res.ok) {
        const json = await res.json();
        const userData = json?.data?.user;

        if (userData) {
          const repos = userData.repositories?.nodes || [];
          const totalStars = repos.reduce(
            (acc: number, repo: { stargazerCount: number }) => acc + (repo.stargazerCount || 0),
            0
          );

          // Language breakdown
          const langMap: Record<string, { count: number; color: string }> = {};
          let totalLangCount = 0;

          repos.forEach((repo: { primaryLanguage?: { name: string; color: string } }) => {
            if (repo.primaryLanguage?.name) {
              const name = repo.primaryLanguage.name;
              const color = repo.primaryLanguage.color || LANGUAGE_COLORS[name] || "#0075de";
              if (!langMap[name]) {
                langMap[name] = { count: 0, color };
              }
              langMap[name].count += 1;
              totalLangCount += 1;
            }
          });

          const topLanguages: LanguageStat[] = Object.entries(langMap)
            .map(([name, data]) => ({
              name,
              percentage: totalLangCount > 0 ? Math.round((data.count / totalLangCount) * 100) : 0,
              color: data.color,
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);

          // Calculate Streaks & Contributions from Calendar
          const weeks = userData.contributionsCollection?.contributionCalendar?.weeks || [];
          const allDays = weeks.flatMap(
            (w: { contributionDays: Array<{ contributionCount: number; date: string }> }) =>
              w.contributionDays || []
          );

          const totalContributions =
            userData.contributionsCollection?.contributionCalendar?.totalContributions || 0;

          // Streak calculations
          let currentStreak = 0;
          let longestStreak = 0;
          let tempStreak = 0;

          // Days sorted chronologically
          const sortedDays = [...allDays].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

          for (const day of sortedDays) {
            if (day.contributionCount > 0) {
              tempStreak += 1;
              if (tempStreak > longestStreak) {
                longestStreak = tempStreak;
              }
            } else {
              tempStreak = 0;
            }
          }

          // Current streak calculation (backwards from today)
          const reverseDays = [...sortedDays].reverse();
          let todayChecked = false;

          for (const day of reverseDays) {
            if (!todayChecked && day.contributionCount === 0) {
              // If today has 0 contributions so far, don't break current streak if yesterday had contributions
              const todayStr = new Date().toISOString().split("T")[0];
              if (day.date === todayStr) {
                todayChecked = true;
                continue;
              }
            }
            todayChecked = true;

            if (day.contributionCount > 0) {
              currentStreak += 1;
            } else {
              break;
            }
          }

          const responseData: GitHubStatsResponse = {
            username: userData.login || username,
            name: userData.name || "Muhammad Jamshaid Khan",
            avatarUrl: userData.avatarUrl || `https://github.com/${username}.png`,
            profileUrl: userData.url || `https://github.com/${username}`,
            publicRepos: userData.repositories?.totalCount || repos.length,
            followers: userData.followers?.totalCount || 0,
            following: userData.following?.totalCount || 0,
            totalStars,
            totalContributions,
            currentStreak,
            longestStreak,
            topLanguages,
            isFallback: false,
          };

          return NextResponse.json(responseData, {
            headers: {
              "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
          });
        }
      }
    } catch (err) {
      console.warn("GitHub GraphQL fetch failed, falling back to REST API:", err);
    }
  }

  // Strategy 2: REST API fallback (Public or with optional header)
  try {
    const headers: Record<string, string> = {
      "User-Agent": "Jamshaid-Portfolio",
    };
    if (token) {
      headers.Authorization = `token ${token}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: GITHUB_CONFIG.revalidateSeconds },
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, {
        headers,
        next: { revalidate: GITHUB_CONFIG.revalidateSeconds },
      }),
    ]);

    if (userRes.ok && reposRes.ok) {
      const user = await userRes.json();
      const repos = await reposRes.json();

      const totalStars = Array.isArray(repos)
        ? repos.reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count || 0), 0)
        : 0;

      const langMap: Record<string, number> = {};
      let totalCount = 0;

      if (Array.isArray(repos)) {
        repos.forEach((r: { language?: string }) => {
          if (r.language) {
            langMap[r.language] = (langMap[r.language] || 0) + 1;
            totalCount += 1;
          }
        });
      }

      const topLanguages: LanguageStat[] = Object.entries(langMap)
        .map(([name, count]) => ({
          name,
          percentage: totalCount > 0 ? Math.round((count / totalCount) * 100) : 0,
          color: LANGUAGE_COLORS[name] || "#0075de",
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);

      const responseData: GitHubStatsResponse = {
        username: user.login || username,
        name: user.name || "Muhammad Jamshaid Khan",
        avatarUrl: user.avatar_url || `https://github.com/${username}.png`,
        profileUrl: user.html_url || `https://github.com/${username}`,
        publicRepos: user.public_repos || 0,
        followers: user.followers || 0,
        following: user.following || 0,
        totalStars,
        totalContributions: GITHUB_CONFIG.fallbackData.totalContributions,
        currentStreak: GITHUB_CONFIG.fallbackData.currentStreak,
        longestStreak: GITHUB_CONFIG.fallbackData.longestStreak,
        topLanguages: topLanguages.length > 0 ? topLanguages : GITHUB_CONFIG.fallbackData.topLanguages,
        isFallback: false,
      };

      return NextResponse.json(responseData, {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      });
    }
  } catch (err) {
    console.warn("GitHub REST fetch failed, using fallback data:", err);
  }

  // Strategy 3: Default static fallback data
  return NextResponse.json(GITHUB_CONFIG.fallbackData, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
