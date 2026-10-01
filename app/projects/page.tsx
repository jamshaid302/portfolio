"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaArrowLeft, FaSun, FaMoon } from "react-icons/fa";
import TechBadge from "../components/TechBadge";
import Footer from "../components/Footer";
import { projectsData } from "../data/projectsData";
import { LanguageProvider, useLanguage } from "../context/LanguageContext";

function AllProjectsContent() {
  const { t, fmt, language, toggleLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const categories = [
    { id: "all", label: `${t.allProjectsPage.categories.all} (${projectsData.length})` },
    { id: "fullstack", label: t.allProjectsPage.categories.fullstack },
    { id: "mobile", label: t.allProjectsPage.categories.mobile },
    { id: "systems", label: t.allProjectsPage.categories.systems },
    { id: "architecture", label: t.allProjectsPage.categories.architecture },
  ];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeFilter === "all" || project.category === activeFilter;
    const titleText = (language === "ur" && project.titleUr) ? project.titleUr : project.title;
    const subtitleText = (language === "ur" && project.subtitleUr) ? project.subtitleUr : project.subtitle;
    const matchesSearch =
      searchTerm === "" ||
      titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subtitleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={darkMode ? "dark bg-[#0a0d1a] min-h-screen" : "bg-[#f6f5f4] min-h-screen"}>
      
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0d1a]/80 backdrop-blur-md border-b border-[#e6e6e6] dark:border-[#262a42]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-discord-display text-xs text-[#0075de] dark:text-[#62aef0] hover:underline"
          >
            <FaArrowLeft size={12} />
            {fmt(t.allProjectsPage.backToHome)}
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3.5 py-1.5 rounded-full font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#181b2e] text-[#0075de] dark:text-[#62aef0] border border-[#e6e6e6] dark:border-[#262a42] hover:border-[#0075de] transition-colors"
            >
              <span>{language === "en" ? "اردو" : "EN"}</span>
            </button>

            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="p-2.5 rounded-2xl bg-[#f6f5f4] dark:bg-[#181b2e] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] hover:border-[#0075de] transition-colors"
            >
              {darkMode ? <FaSun size={14} className="text-[#62aef0]" /> : <FaMoon size={14} className="text-[#0075de]" />}
            </button>

            <Link
              href="/#contact"
              className="px-5 py-2.5 rounded-full font-discord-display text-xs text-white bg-[#0075de] hover:bg-[#005bab] transition-all shadow-md"
            >
              {fmt(t.nav.letsTalk)}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
              {fmt(t.allProjectsPage.eyebrow)}
            </span>
            <h1 className="font-discord-display text-3xl sm:text-5xl text-[#000000] dark:text-white tracking-tight leading-tight">
              {fmt(t.allProjectsPage.heading)}
            </h1>
            <p className="text-sm sm:text-base text-[#615d59] dark:text-[#a39e98] mt-3 font-medium">
              {t.allProjectsPage.subheading}
            </p>
            <div className="w-20 h-1.5 bg-[#0075de] rounded-full mx-auto mt-4" />
          </div>

          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-discord-display text-xs tracking-wider transition-all ${
                    activeFilter === cat.id
                      ? "bg-[#0075de] text-white shadow-md"
                      : "bg-white dark:bg-[#181b2e] text-[#31302e] dark:text-[#c5c7d0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] border border-[#e6e6e6] dark:border-[#262a42]"
                  }`}
                >
                  {fmt(cat.label)}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#615d59] text-xs" />
              <input
                type="text"
                placeholder={`Search ${projectsData.length} projects...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] focus:outline-none focus:border-[#0075de]"
              />
            </div>
          </div>

          {/* 40px Rounded Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-[40px] overflow-hidden flex flex-col justify-between border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft hover:border-[#0075de] dark:hover:border-[#0075de] transition-all bg-white dark:bg-[#181b2e]"
              >
                <div>
                  {/* Content */}
                  <div className="p-7 sm:p-8">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-discord-display text-xs text-[#0075de] dark:text-[#62aef0] tracking-wider font-semibold uppercase">
                        {fmt((language === "ur" && project.subtitleUr) ? project.subtitleUr : project.subtitle)}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-discord-display tracking-wider bg-[#0075de]/10 text-[#0075de] dark:text-[#62aef0] border border-[#0075de]/20 uppercase">
                          {language === "ur" ? "نمایاں" : "FEATURED"}
                        </span>
                      )}
                    </div>
                    <h3 className="font-discord-display text-2xl text-[#000000] dark:text-white mb-3">
                      {fmt((language === "ur" && project.titleUr) ? project.titleUr : project.title)}
                    </h3>
                    <p className="text-sm text-[#615d59] dark:text-[#a39e98] leading-relaxed mb-6 font-medium">
                      {(language === "ur" && project.descriptionUr) ? project.descriptionUr : project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <TechBadge key={tag} name={tag} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-7 pb-7 pt-4 flex items-center justify-between gap-3 border-t border-[#e6e6e6] dark:border-[#262a42]">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-discord-display text-xs text-[#31302e] dark:text-[#c5c7d0] hover:text-[#0075de] dark:hover:text-[#62aef0] transition-colors"
                    >
                      <FaGithub size={16} />
                      {fmt(t.projects.sourceCode)}
                    </a>
                  ) : (
                    <span className="text-[11px] font-discord-display text-[#615d59] dark:text-[#a39e98] tracking-wider uppercase">
                      {language === "ur" ? "انٹرپرائز پروڈکشن" : "Enterprise Production"}
                    </span>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-discord-display text-xs text-white bg-[#0075de] hover:bg-[#005bab] transition-all shadow-sm"
                    >
                      {fmt(t.projects.liveDemo)}
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-white dark:bg-[#181b2e] rounded-[40px] border border-[#e6e6e6] dark:border-[#262a42] mt-6">
              <p className="font-discord-display text-lg text-[#000000] dark:text-white">
                NO PROJECTS FOUND MATCHING &quot;{searchTerm}&quot;
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="mt-4 px-6 py-2.5 rounded-full font-discord-display text-xs text-white bg-[#0075de] hover:bg-[#005bab] transition-all"
              >
                RESET SEARCH
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default function AllProjectsPage() {
  return (
    <LanguageProvider>
      <AllProjectsContent />
    </LanguageProvider>
  );
}
