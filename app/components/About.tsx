"use client";
import React from "react";
import { FaLaptopCode, FaCode, FaChalkboardTeacher, FaTrophy } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

interface AboutProps {
  darkMode: boolean;
}

const About: React.FC<AboutProps> = () => {
  const { t, fmt } = useLanguage();

  const highlights = [
    {
      icon: <FaLaptopCode className="text-[#0075de] text-xl" />,
      title: t.about.highlights.fullstackTitle,
      description: t.about.highlights.fullstackDesc,
    },
    {
      icon: <FaCode className="text-[#0075de] text-xl" />,
      title: t.about.highlights.archTitle,
      description: t.about.highlights.archDesc,
    },
    {
      icon: <FaChalkboardTeacher className="text-[#0075de] text-xl" />,
      title: t.about.highlights.taTitle,
      description: t.about.highlights.taDesc,
    },
    {
      icon: <FaTrophy className="text-[#0075de] text-xl" />,
      title: t.about.highlights.honorsTitle,
      description: t.about.highlights.honorsDesc,
    },
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.about.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.about.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Narrative Notion Feature Card */}
          <div className="lg:col-span-6 p-7 sm:p-8 rounded-[40px] bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] flex flex-col justify-between notion-shadow-soft">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#0075de] text-white font-discord-display text-xs mb-5 shadow-sm">
                {fmt(t.about.cgpaBadge)}
              </span>
              <h3 className="font-discord-display text-2xl sm:text-3xl mb-4 leading-snug text-[#000000] dark:text-white">
                {fmt(t.about.subheading)}
              </h3>
              <p className="text-base text-[#31302e] dark:text-[#c5c7d0] leading-relaxed mb-4 font-medium">
                {t.about.desc1}
              </p>
              <p className="text-base text-[#31302e] dark:text-[#c5c7d0] leading-relaxed font-medium">
                {t.about.desc2}
              </p>
            </div>
          </div>

          {/* 4 Feature Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[32px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] flex flex-col justify-between hover:border-[#0075de] dark:hover:border-[#0075de] transition-colors notion-shadow-soft"
              >
                <div>
                  <div className="p-3 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a] w-fit mb-3">
                    {item.icon}
                  </div>
                  <h4 className="font-discord-display text-base text-[#000000] dark:text-white mb-2">
                    {fmt(item.title)}
                  </h4>
                  <p className="text-xs text-[#615d59] dark:text-[#a39e98] leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;