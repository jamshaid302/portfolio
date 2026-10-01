"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaSearch, FaArrowRight } from "react-icons/fa";
import TechBadge from "./TechBadge";
import { projectsData } from "../data/projectsData";
import { useLanguage } from "../context/LanguageContext";

interface ProjectsProps {
  darkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = () => {
  const { t, fmt, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = [
    { id: "all", label: t.projects.allFeatured },
    { id: "fullstack", label: t.skills.categories.frontend },
    { id: "mobile", label: t.skills.categories.mobile },
    { id: "systems", label: t.skills.categories.backend },
    { id: "architecture", label: t.skills.categories.concepts },
  ];

  // Limit to featured or top 6 projects for the home page showcase
  const homepageProjects = projectsData.slice(0, 6);

  const filteredProjects = homepageProjects.filter((project) => {
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
    <section id="projects" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.projects.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.projects.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
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
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#615d59] text-xs" />
            <input
              type="text"
              placeholder={t.projects.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] focus:outline-none focus:border-[#0075de]"
            />
          </div>
        </div>

        {/* 40px Rounded Showcase Cards (6 Featured) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#31302e] dark:text-[#c5c7d0] border border-[#e6e6e6] dark:border-[#262a42] hover:border-[#0075de] dark:hover:border-[#0075de] hover:text-[#0075de] dark:hover:text-[#62aef0] transition-all"
                  >
                    <FaGithub size={14} />
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

        {/* View All Projects Button */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-discord-display text-xs tracking-wider text-white bg-[#0075de] hover:bg-[#005bab] active:scale-95 transition-all shadow-md"
          >
            {fmt(t.projects.viewAllProjects)} ({projectsData.length})
            <FaArrowRight size={14} className="text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Projects;