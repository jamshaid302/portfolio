"use client";

import React, { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGithub, 
  FaStar, 
  FaCodeBranch, 
  FaUsers, 
  FaFire, 
  FaCalendarCheck, 
  FaExternalLinkAlt,
  FaChartPie,
  FaChevronDown,
  FaCheck
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { GITHUB_CONFIG } from "../config/github";
import type { GitHubStatsResponse, LanguageStat } from "../api/github/route";

const CALENDAR_THEME = {
  light: ["#ebedf0", "#cce3fa", "#80b8f4", "#338deb", "#0075de"],
  dark: ["#141727", "#1a365d", "#2b4c7e", "#3b629f", "#62aef0"],
};

interface GithubActivityProps {
  darkMode: boolean;
}

const GithubActivity: React.FC<GithubActivityProps> = ({ darkMode }) => {
  const { t, fmt } = useLanguage();
  const [stats, setStats] = useState<GitHubStatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number | "last">("last");
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);

  const yearOptions: Array<{ label: string; value: number | "last" }> = [
    { label: "Last 12 Months", value: "last" },
    { label: "2026", value: 2026 },
    { label: "2025", value: 2025 },
    { label: "2024", value: 2024 },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(e.target as Node)) {
        setIsYearDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchGithubStats() {
      try {
        setLoading(true);
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data: GitHubStatsResponse = await res.json();
        if (isMounted) {
          setStats(data);
          setError(false);
        }
      } catch (err) {
        console.error("Error loading GitHub stats:", err);
        if (isMounted) {
          setError(true);
          // Fallback to static config data if API fails
          setStats(GITHUB_CONFIG.fallbackData as unknown as GitHubStatsResponse);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGithubStats();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="github" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.github.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.github.heading)}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#615d59] dark:text-gray-400">
            {t.github.subheading}
          </p>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center animate-pulse h-28"
              >
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
                <div className="w-12 h-5 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))
          ) : (
            <>
              {/* Total Contributions */}
              <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#0075de]/50 hover:shadow-md transition-all group">
                <div className="p-2.5 rounded-xl bg-[#0075de]/10 dark:bg-[#0075de]/20 text-[#0075de] dark:text-[#62aef0] mb-2 group-hover:scale-110 transition-transform">
                  <FaCalendarCheck size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-white">
                  {stats?.totalContributions.toLocaleString() ?? "0"}
                </span>
                <span className="text-xs text-[#615d59] dark:text-gray-400 mt-0.5">
                  {t.github.totalContributions}
                </span>
              </div>

              {/* Current Streak */}
              <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#0075de]/50 hover:shadow-md transition-all group">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 dark:bg-orange-500/20 mb-2 group-hover:scale-110 transition-transform">
                  <FaFire size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-white">
                  {stats?.currentStreak ?? 0} <span className="text-xs font-normal text-[#615d59] dark:text-gray-400">{t.github.daysCount}</span>
                </span>
                <span className="text-xs text-[#615d59] dark:text-gray-400 mt-0.5">
                  {t.github.currentStreak}
                </span>
              </div>

              {/* Longest Streak */}
              <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#0075de]/50 hover:shadow-md transition-all group">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 dark:bg-red-500/20 mb-2 group-hover:scale-110 transition-transform">
                  <FaFire size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-white">
                  {stats?.longestStreak ?? 0} <span className="text-xs font-normal text-[#615d59] dark:text-gray-400">{t.github.daysCount}</span>
                </span>
                <span className="text-xs text-[#615d59] dark:text-gray-400 mt-0.5">
                  {t.github.longestStreak}
                </span>
              </div>

              {/* Total Stars */}
              <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#0075de]/50 hover:shadow-md transition-all group">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 mb-2 group-hover:scale-110 transition-transform">
                  <FaStar size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-white">
                  {stats?.totalStars ?? 0}
                </span>
                <span className="text-xs text-[#615d59] dark:text-gray-400 mt-0.5">
                  {t.github.totalStars}
                </span>
              </div>

              {/* Public Repositories */}
              <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#0075de]/50 hover:shadow-md transition-all group">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 mb-2 group-hover:scale-110 transition-transform">
                  <FaCodeBranch size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-white">
                  {stats?.publicRepos ?? 0}
                </span>
                <span className="text-xs text-[#615d59] dark:text-gray-400 mt-0.5">
                  {t.github.publicRepos}
                </span>
              </div>

              {/* Followers */}
              <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#0075de]/50 hover:shadow-md transition-all group">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 mb-2 group-hover:scale-110 transition-transform">
                  <FaUsers size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-bold text-[#000000] dark:text-white">
                  {stats?.followers ?? 0}
                </span>
                <span className="text-xs text-[#615d59] dark:text-gray-400 mt-0.5">
                  {t.github.followers}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Top Languages & Contribution Calendar Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Top Languages Breakdown */}
          <div className="bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FaChartPie className="text-[#0075de] dark:text-[#62aef0]" size={18} />
                <h3 className="font-discord-display text-lg text-[#000000] dark:text-white font-semibold">
                  {t.github.topLanguages}
                </h3>
              </div>

              {/* Multi-segmented Progress Bar */}
              {loading ? (
                <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse my-4" />
              ) : (
                <div className="w-full h-3 bg-gray-100 dark:bg-[#141727] rounded-full overflow-hidden flex my-4">
                  {stats?.topLanguages.map((lang: LanguageStat, index: number) => (
                    <div
                      key={index}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      className="h-full transition-all duration-500"
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
              )}

              {/* Language Badges List */}
              <div className="flex flex-wrap gap-2.5 mt-4">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    ))
                  : stats?.topLanguages.map((lang: LanguageStat, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#f6f5f4] dark:bg-[#141727] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42]"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span>{lang.name}</span>
                        <span className="text-[#615d59] dark:text-gray-400 text-[11px] ml-0.5">
                          {lang.percentage}%
                        </span>
                      </div>
                    ))}
              </div>
            </div>

            {/* Profile CTA Button */}
            <div className="mt-6 pt-4 border-t border-[#e6e6e6] dark:border-[#262a42]">
              <a
                href={stats?.profileUrl || `https://github.com/${GITHUB_CONFIG.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0075de] hover:bg-[#005bab] text-white font-medium text-sm transition-all shadow-md shadow-[#0075de]/20 active:scale-98 group"
              >
                <FaGithub size={16} />
                <span>{t.github.viewOnGithub}</span>
                <FaExternalLinkAlt size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Themeable Contribution Calendar */}
          <div className="lg:col-span-2 bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <FaGithub className="text-[#0075de] dark:text-[#62aef0]" size={20} />
                  <h3 className="font-discord-display text-lg text-[#000000] dark:text-white font-semibold">
                    {t.github.contributionCalendar}
                  </h3>
                </div>

                {/* Custom Sleek Year Dropdown */}
                <div className="relative inline-block" ref={yearDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#f6f5f4] dark:bg-[#141727] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] hover:border-[#0075de] dark:hover:border-[#62aef0] transition-colors shadow-xs"
                  >
                    <span>{yearOptions.find((opt) => opt.value === selectedYear)?.label}</span>
                    <FaChevronDown
                      size={10}
                      className={`text-[#615d59] dark:text-gray-400 transition-transform duration-200 ${
                        isYearDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isYearDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-1.5 w-40 p-1.5 bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col gap-1"
                      >
                        {yearOptions.map((opt) => {
                          const isSelected = selectedYear === opt.value;
                          return (
                            <button
                              key={String(opt.value)}
                              type="button"
                              onClick={() => {
                                setSelectedYear(opt.value);
                                setIsYearDropdownOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                                isSelected
                                  ? "bg-[#0075de] text-white font-bold"
                                  : "text-[#31302e] dark:text-[#c5c7d0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] hover:text-[#000000] dark:hover:text-white"
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && <FaCheck size={10} className="text-white" />}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Contribution Calendar Scrollable Container */}
              <div className="overflow-x-auto no-scrollbar py-2 flex justify-center items-center min-h-[165px] w-full [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0">
                <GitHubCalendar
                  username={GITHUB_CONFIG.username}
                  year={selectedYear}
                  colorScheme={darkMode ? "dark" : "light"}
                  theme={CALENDAR_THEME}
                  blockSize={11}
                  blockMargin={3.5}
                  fontSize={12}
                  labels={{
                    totalCount: `{{count}} contributions in ${selectedYear === "last" ? "the past year" : selectedYear}`,
                  }}
                />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e6e6e6] dark:border-[#262a42] flex items-center justify-between text-xs text-[#615d59] dark:text-gray-400">
              <span>{t.github.subheading}</span>
              <span className="font-medium text-[#0075de] dark:text-[#62aef0]">
                {stats?.totalContributions ?? 0} {t.github.totalContributions.toLowerCase()}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default GithubActivity;
