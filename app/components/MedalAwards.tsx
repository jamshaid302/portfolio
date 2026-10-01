"use client";
import React from "react";
import { FaMedal, FaTrophy } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

interface MedalAwardsProps {
  darkMode: boolean;
}

const MedalAwards: React.FC<MedalAwardsProps> = () => {
  const { t, fmt } = useLanguage();

  const awards = [
    {
      id: "silver-degree",
      title: t.awards.items.silverDegree.title,
      subtitle: t.awards.items.silverDegree.subtitle,
      period: t.awards.items.silverDegree.period,
      icon: <FaMedal className="text-[#0075de] text-3xl" />,
      description: t.awards.items.silverDegree.desc,
    },
    {
      id: "gold-semesters",
      title: t.awards.items.goldSemesters.title,
      subtitle: t.awards.items.goldSemesters.subtitle,
      period: t.awards.items.goldSemesters.period,
      icon: <FaMedal className="text-[#0075de] text-3xl" />,
      description: t.awards.items.goldSemesters.desc,
    },
    {
      id: "silver-semesters",
      title: t.awards.items.silverSemesters.title,
      subtitle: t.awards.items.silverSemesters.subtitle,
      period: t.awards.items.silverSemesters.period,
      icon: <FaMedal className="text-[#0075de] text-3xl" />,
      description: t.awards.items.silverSemesters.desc,
    },
    {
      id: "bronze-codecon",
      title: t.awards.items.bronzeCodecon.title,
      subtitle: t.awards.items.bronzeCodecon.subtitle,
      period: t.awards.items.bronzeCodecon.period,
      icon: <FaTrophy className="text-[#0075de] text-3xl" />,
      description: t.awards.items.bronzeCodecon.desc,
    },
  ];

  return (
    <section id="awards" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.awards.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.awards.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        {/* 40px Rounded Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award) => (
            <div
              key={award.id}
              className="p-7 sm:p-8 rounded-[40px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft flex flex-col justify-between hover:border-[#0075de] dark:hover:border-[#0075de] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="p-3 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a]">
                    {award.icon}
                  </div>
                  <span className="px-3.5 py-1 rounded-full font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#0075de] dark:text-[#62aef0] border border-[#e6e6e6] dark:border-[#262a42]">
                    {award.period}
                  </span>
                </div>

                <h3 className="font-discord-display text-xl sm:text-2xl text-[#000000] dark:text-white mb-1">
                  {fmt(award.title)}
                </h3>
                <p className="font-discord-display text-xs text-[#0075de] dark:text-[#62aef0] mb-3">
                  {fmt(award.subtitle)}
                </p>
                <p className="text-xs text-[#615d59] dark:text-[#a39e98] leading-relaxed font-medium">
                  {award.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MedalAwards;
