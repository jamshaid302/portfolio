"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaExternalLinkAlt, FaChalkboardTeacher, FaChevronDown, FaChevronUp } from "react-icons/fa";
import TechBadge from "./TechBadge";
import { useLanguage } from "../context/LanguageContext";

interface ExperienceProps {
  darkMode: boolean;
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  type: string;
  description: string;
  bulletPoints: string[];
  technologies: string[];
}

const Experience: React.FC<ExperienceProps> = () => {
  const { t, fmt } = useLanguage();
  // Collapsed by default
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const experiences: ExperienceItem[] = [
    {
      id: "siliconfort",
      role: t.experience.items.siliconfort.role,
      company: "Siliconfort",
      companyUrl: "https://siliconfort.com",
      location: t.experience.items.siliconfort.location,
      period: t.experience.items.siliconfort.period,
      type: t.experience.items.siliconfort.type,
      description: t.experience.items.siliconfort.desc,
      bulletPoints: t.experience.items.siliconfort.bullets,
      technologies: ["React", "NestJS", "TypeScript", "Apache Kafka", "TypeORM", "MSSQL", "MT5", "Redis", "Bull Queues", "AWS", "Docker"],
    },
    {
      id: "nexaquanta",
      role: t.experience.items.nexaquanta.role,
      company: "NexaQuanta",
      location: t.experience.items.nexaquanta.location,
      period: t.experience.items.nexaquanta.period,
      type: t.experience.items.nexaquanta.type,
      description: t.experience.items.nexaquanta.desc,
      bulletPoints: t.experience.items.nexaquanta.bullets,
      technologies: ["Keycloak SSO", "NX Monorepo", "SSE", "Redis", "Webhooks", "PostgreSQL", "AWS ECS", "ECR", "Docker", "CI/CD"],
    },
    {
      id: "hashlogics",
      role: t.experience.items.hashlogics.role,
      company: "Hashlogics",
      location: t.experience.items.hashlogics.location,
      period: t.experience.items.hashlogics.period,
      type: t.experience.items.hashlogics.type,
      description: t.experience.items.hashlogics.desc,
      bulletPoints: t.experience.items.hashlogics.bullets,
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Webhooks", "JavaScript"],
    },
    {
      id: "loopbrackets",
      role: t.experience.items.loopbrackets.role,
      company: "Loop Brackets",
      location: t.experience.items.loopbrackets.location,
      period: t.experience.items.loopbrackets.period,
      type: t.experience.items.loopbrackets.type,
      description: t.experience.items.loopbrackets.desc,
      bulletPoints: t.experience.items.loopbrackets.bullets,
      technologies: ["Node.js", "Express.js", "Stripe Recurring", "Webhooks", "Socket.io", "REST APIs"],
    },
    {
      id: "mercurysols",
      role: t.experience.items.mercurysols.role,
      company: "Mercury Sols",
      location: t.experience.items.mercurysols.location,
      period: t.experience.items.mercurysols.period,
      type: t.experience.items.mercurysols.type,
      description: t.experience.items.mercurysols.desc,
      bulletPoints: t.experience.items.mercurysols.bullets,
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "Full-Stack"],
    },
  ];

  const specializations = [
    {
      title: t.experience.specializations.kafka.title,
      period: t.experience.specializations.kafka.period,
      domain: t.experience.specializations.kafka.domain,
      details: t.experience.specializations.kafka.details,
    },
    {
      title: t.experience.specializations.saas.title,
      period: t.experience.specializations.saas.period,
      domain: t.experience.specializations.saas.domain,
      details: t.experience.specializations.saas.details,
    },
  ];

  return (
    <section id="experience" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.experience.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.experience.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        {/* 40px Rounded Feature Cards */}
        <div className="space-y-6 mb-12">
          {experiences.map((exp) => {
            const isExpanded = !!expandedCards[exp.id];

            return (
              <div
                key={exp.id}
                className="p-7 sm:p-8 rounded-[40px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft hover:border-[#0075de] dark:hover:border-[#0075de] transition-colors"
              >
                {/* Header Row with Integrated Expand/Collapse Toggle */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-discord-display text-xl sm:text-2xl text-[#000000] dark:text-white">
                        {fmt(exp.role)}
                      </h3>
                      <span className="px-3.5 py-1 rounded-full font-discord-display text-xs bg-[#0075de] text-white whitespace-nowrap shrink-0">
                        {fmt(exp.type)}
                      </span>
                      {/* Interactive Toggle Button - Placed near title */}
                      <button
                        onClick={() => toggleCard(exp.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#0075de] dark:text-[#62aef0] border border-[#e6e6e6] dark:border-[#262a42] hover:bg-[#0075de] hover:text-white dark:hover:bg-[#0075de] dark:hover:text-white transition-all active:scale-95 ml-0 sm:ml-2 whitespace-nowrap shrink-0"
                      >
                        <span>{isExpanded ? fmt(t.experience.hideDetails) : fmt(t.experience.viewDetails)}</span>
                        {isExpanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2 font-discord-display text-xs text-[#0075de] dark:text-[#62aef0] mt-2">
                      <span>{exp.company}</span>
                      {exp.companyUrl && (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#000000] dark:hover:text-white transition-colors"
                        >
                          <FaExternalLinkAlt size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#615d59] dark:text-[#a39e98] font-discord-display flex-wrap">
                    <div className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                      <FaCalendarAlt className="text-[#0075de]" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium whitespace-nowrap shrink-0">
                      <FaMapMarkerAlt className="text-[#2a9d99]" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-[#e6e6e6] dark:border-[#262a42]">
                        <p className="text-sm text-[#31302e] dark:text-[#c5c7d0] mb-6 leading-relaxed font-medium">
                          {exp.description}
                        </p>

                        <ul className="space-y-3 mb-8">
                          {exp.bulletPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#31302e] dark:text-[#c5c7d0] leading-relaxed font-medium">
                              <span className="w-2 h-2 rounded-full bg-[#0075de] mt-1.5 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies Badges */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.technologies.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Key Architectural Specializations Section */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <FaChalkboardTeacher className="text-[#0075de] text-2xl" />
            <h3 className="font-discord-display text-2xl text-[#000000] dark:text-white">
              {fmt(t.experience.taSectionTitle)}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializations.map((spec, idx) => (
              <div
                key={idx}
                className="p-7 rounded-[32px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
                  <h4 className="font-discord-display text-base sm:text-lg text-[#000000] dark:text-white leading-snug">
                    {fmt(spec.title)}
                  </h4>
                  <span className="font-discord-display text-xs text-[#0075de] dark:text-[#62aef0] bg-[#f6f5f4] dark:bg-[#0a0d1a] px-3.5 py-1 rounded-full border border-[#e6e6e6] dark:border-[#262a42] whitespace-nowrap shrink-0 self-start sm:self-auto">
                    {spec.period}
                  </span>
                </div>
                <p className="text-xs font-discord-display text-[#0075de] dark:text-[#62aef0] mb-3">
                  {spec.domain}
                </p>
                <p className="text-xs text-[#615d59] dark:text-[#a39e98] leading-relaxed font-medium">
                  {spec.details}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
