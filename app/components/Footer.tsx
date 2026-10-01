"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { SITE_CONFIG } from "../config/site";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = () => {
  const { t, fmt } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { href: SITE_CONFIG.author.github, icon: <FaGithub size={20} />, label: "GitHub" },
    { href: SITE_CONFIG.author.linkedin, icon: <FaLinkedin size={20} />, label: "LinkedIn" },
    { href: `mailto:${SITE_CONFIG.author.email}`, icon: <FaEnvelope size={20} />, label: "Email" },
  ];

  return (
    <footer className="py-16 bg-[#f6f5f4] dark:bg-[#141727] border-t border-[#e6e6e6] dark:border-[#262a42] text-[#000000] dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Wordmark Section */}
        <div className="pb-12 border-b border-[#e6e6e6] dark:border-[#262a42] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-discord-display text-4xl sm:6xl tracking-tight text-[#000000] dark:text-white">
              JAMSHAID
            </h2>
            <p className="font-discord-display text-xs text-[#0075de] dark:text-[#62aef0] tracking-widest uppercase mt-1">
              {fmt(t.footer.subtitle)}
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#181b2e] text-[#31302e] dark:text-[#c5c7d0] hover:text-white hover:bg-[#0075de] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & Scroll Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#615d59] dark:text-[#a39e98]">
          <p>© {currentYear} Muhammad Jamshaid Khan. {t.footer.rightsReserved}</p>
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white hover:bg-[#0075de] hover:text-white border border-[#e6e6e6] dark:border-[#262a42] transition-colors font-discord-display text-xs"
          >
            {fmt(t.footer.backToTop)}
            <FaArrowUp size={10} />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;