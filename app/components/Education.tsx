"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward, FaBookOpen, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

interface EducationProps {
  darkMode: boolean;
}

const Education: React.FC<EducationProps> = () => {
  const { t, fmt } = useLanguage();
  // Collapsed by default
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const educationItems = [
    {
      id: "kfueit",
      institution: "Khwaja Fareed University of Engineering and Information Technology (KFUEIT)",
      degree: t.education.items.kfueit.degree,
      period: t.education.items.kfueit.period,
      location: t.education.items.kfueit.location,
      gpa: t.education.items.kfueit.gpa,
      description: t.education.items.kfueit.desc,
      coursework: t.education.items.kfueit.coursework,
      honors: t.education.items.kfueit.honors,
    },
  ];

  return (
    <section id="education" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.education.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.education.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        {/* 40px Rounded Education Timeline Cards */}
        <div className="space-y-6">
          {educationItems.map((edu) => {
            const isExpanded = !!expandedCards[edu.id];

            return (
              <div
                key={edu.id}
                className="p-7 sm:p-8 rounded-[40px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft hover:border-[#0075de] dark:hover:border-[#0075de] transition-colors"
              >
                {/* Header Row with Integrated Expand/Collapse Toggle */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                      <FaGraduationCap className="text-[#0075de] text-2xl" />
                      <h3 className="font-discord-display text-xl sm:text-2xl text-[#000000] dark:text-white">
                        {fmt(edu.degree)}
                      </h3>
                      {/* Interactive Toggle Button - Placed near title */}
                      <button
                        onClick={() => toggleCard(edu.id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#0075de] dark:text-[#62aef0] border border-[#e6e6e6] dark:border-[#262a42] hover:bg-[#0075de] hover:text-white dark:hover:bg-[#0075de] dark:hover:text-white transition-all active:scale-95 ml-0 sm:ml-2"
                      >
                        <span>{isExpanded ? fmt(t.education.hideDetails) : fmt(t.education.viewDetails)}</span>
                        {isExpanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                      </button>
                    </div>
                    <p className="font-discord-display text-xs text-[#0075de] dark:text-[#62aef0]">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#615d59] dark:text-[#a39e98] font-discord-display flex-wrap">
                    <div className="flex items-center gap-1.5 font-medium">
                      <FaCalendarAlt className="text-[#0075de]" />
                      {edu.period}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <FaMapMarkerAlt className="text-[#2a9d99]" />
                      {edu.location}
                    </div>
                    {edu.gpa && (
                      <span className="px-3.5 py-1 rounded-full font-discord-display text-xs bg-[#0075de] text-white font-medium">
                        {edu.gpa}
                      </span>
                    )}
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
                          {edu.description}
                        </p>

                        {/* Coursework Pills */}
                        <div className="mb-6">
                          <h4 className="font-discord-display text-xs text-[#615d59] dark:text-[#a39e98] uppercase tracking-wider mb-3 flex items-center gap-2">
                            <FaBookOpen className="text-[#0075de]" />
                            {fmt(t.education.keyCoursework)}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.coursework.map((course) => (
                              <span
                                key={course}
                                className="px-3.5 py-1.5 rounded-2xl font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42]"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Honors & Achievements */}
                        <div>
                          <h4 className="font-discord-display text-xs text-[#615d59] dark:text-[#a39e98] uppercase tracking-wider mb-3 flex items-center gap-2">
                            <FaAward className="text-[#0075de]" />
                            {fmt(t.education.honorsRecognition)}
                          </h4>
                          <ul className="space-y-2">
                            {edu.honors.map((honor, hIdx) => (
                              <li key={hIdx} className="text-xs sm:text-sm text-[#31302e] dark:text-[#c5c7d0] flex items-center gap-2.5 font-medium">
                                <span className="w-2 h-2 rounded-full bg-[#0075de] flex-shrink-0" />
                                <span>{honor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Education;
