"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowRight,
  FaEnvelope,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { SITE_CONFIG } from "../config/site";

interface HeroProps {
  darkMode: boolean;
}

const HeroSection: React.FC<HeroProps> = () => {
  const { t, fmt } = useLanguage();
  const words = t.hero.words;
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-10 pb-12 md:pt-16 md:pb-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-6 xl:gap-8">
          {/* Left Column: Bold Display Typography */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            {/* Notion Eyebrow Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-discord-display text-xs tracking-wider uppercase text-[#0075de] dark:text-[#62aef0] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft mb-6 max-w-full truncate">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0075de] animate-pulse flex-shrink-0" />
              <span className="truncate">{fmt(t.hero.badge)}</span>
            </div>

            {/* Headline with Single Row Word Rotator */}
            <h1 className="font-discord-display text-3xl sm:text-4xl md:text-5xl xl:text-6xl tracking-tight text-[#000000] dark:text-white leading-[1.12] mb-6">
              <span className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
                <span>{fmt(t.hero.building)}</span>
                <span className="inline-block relative text-left min-w-[130px] sm:min-w-[200px] md:min-w-[240px] xl:min-w-[280px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={words[currentWordIndex]}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="inline-block text-[#0075de] dark:text-[#62aef0]"
                    >
                      {fmt(words[currentWordIndex])}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <span className="block mt-1 sm:mt-2">
                {fmt(t.hero.webMobile)}
              </span>
            </h1>

            {/* Lead Body Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-[#31302e] dark:text-[#c5c7d0] leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
              {t.hero.lead}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              {/* Primary CTA */}
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-discord-display text-xs tracking-wider text-white bg-[#0075de] hover:bg-[#005bab] active:scale-95 transition-all shadow-md"
              >
                {fmt(t.hero.viewProjects)}
                <FaArrowRight size={13} className="text-white" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-discord-display text-xs tracking-wider text-[#000000] dark:text-white bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] active:scale-95 transition-all notion-shadow-soft"
              >
                {fmt(t.hero.contactMe)}
                <FaEnvelope size={13} className="text-[#0075de]" />
              </button>

              {/* Resume Button */}
              <a
                href="https://drive.google.com/file/d/1u-dtkZWQzCEM2cV6KMWVZPsZ-fhAsTi7/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-discord-display text-xs tracking-wider text-[#000000] dark:text-white bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] active:scale-95 transition-all notion-shadow-soft"
              >
                <FaFileDownload size={13} className="text-[#0075de]" />
                {fmt(t.hero.resume)}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mt-8">
              <a
                href={SITE_CONFIG.author.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-3.5 rounded-2xl bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white hover:text-[#0075de] dark:hover:text-[#62aef0] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft transition-colors"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={SITE_CONFIG.author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3.5 rounded-2xl bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white hover:text-[#0075de] dark:hover:text-[#62aef0] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Portrait */}
          <div className="w-full lg:w-2/5 flex justify-center flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
              <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft">
                <Image
                  src="/jamshaid.jpg"
                  alt="Muhammad Jamshaid Khan - Senior Full Stack Engineer"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 384px"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
