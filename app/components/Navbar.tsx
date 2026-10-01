"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaGlobe,
  FaChevronDown,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const { language, toggleLanguage, t, fmt } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const primaryNavItems = useMemo(
    () => [
      { id: "home", label: t.nav.home },
      { id: "about", label: t.nav.about },
      { id: "skills", label: t.nav.skills },
      { id: "experience", label: t.nav.experience },
      { id: "projects", label: t.nav.projects },
    ],
    [t],
  );

  const secondaryNavItems = useMemo(
    () => [
      { id: "education", label: t.nav.education },
      { id: "certifications", label: t.nav.certifications },
      { id: "awards", label: t.nav.awards },
      { id: "contact", label: t.nav.contact },
    ],
    [t],
  );

  const navItems = useMemo(
    () => [...primaryNavItems, ...secondaryNavItems],
    [primaryNavItems, secondaryNavItems],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setScrolled(scrollPosition > 20);

          const sections = navItems.map(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
              const rect = element.getBoundingClientRect();
              return { id, top: rect.top };
            }
            return { id, top: Infinity };
          });

          if (scrollPosition < 100) {
            setActiveSection("home");
          } else {
            const current = sections.find(
              (sec) => sec.top >= -150 && sec.top < 300,
            );
            if (current) {
              setActiveSection(current.id);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  const scrollToSection = (id: string) => {
    setMobileNavOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 dark:bg-[#141727]/95 backdrop-blur-md border-b border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft py-3"
          : "bg-transparent py-4 border-b border-[#e6e6e6]/60 dark:border-[#262a42]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Mark */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0075de]/30 dark:border-[#0075de]/40 flex items-center justify-center transition-all group-hover:scale-105 group-hover:border-[#0075de] shadow-md flex-shrink-0">
              <Image
                src="/jamshaid.jpg"
                alt="Muhammad Jamshaid Khan"
                width={40}
                height={40}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-discord-display text-lg tracking-tight text-[#000000] dark:text-white group-hover:text-[#0075de] transition-colors">
                {fmt(t.nav.brandTitle)}
              </span>
              <span className="text-xs font-discord-display text-[#0075de] dark:text-[#62aef0] font-medium">
                {fmt(t.nav.brandSubtitle)}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/90 dark:bg-[#181b2e]/90 p-1.5 rounded-full border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft">
            {primaryNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-normal transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#0075de] text-white shadow-sm font-bold"
                      : "text-[#31302e] dark:text-[#c5c7d0] hover:text-[#000000] dark:hover:text-white hover:bg-[#f6f5f4] dark:hover:bg-[#252946]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* More Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-normal transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  secondaryNavItems.some((item) => activeSection === item.id) ||
                  moreDropdownOpen
                    ? "bg-[#0075de] text-white shadow-sm font-bold"
                    : "text-[#31302e] dark:text-[#c5c7d0] hover:text-[#000000] dark:hover:text-white hover:bg-[#f6f5f4] dark:hover:bg-[#252946]"
                }`}
              >
                <span>{language === "ur" ? "مزید" : "MORE"}</span>
                <FaChevronDown
                  size={10}
                  className={`transition-transform duration-200 ${moreDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-44 p-1.5 bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col gap-1"
                  >
                    {secondaryNavItems.map((item) => {
                      const isActive = activeSection === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setMoreDropdownOpen(false);
                            scrollToSection(item.id);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                            isActive
                              ? "bg-[#0075de] text-white font-bold"
                              : "text-[#31302e] dark:text-[#c5c7d0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] hover:text-[#000000] dark:hover:text-white"
                          }`}
                        >
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Actions: Language Switcher, Dark Mode Toggle & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="px-3 py-2 rounded-full bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] text-[#0075de] dark:text-[#62aef0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] transition-colors flex items-center gap-1.5 font-discord-display text-xs font-bold"
            >
              <FaGlobe size={13} />
              <span>{language === "en" ? "اردو" : "EN"}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Theme Preference"
              className="p-2.5 sm:p-3 rounded-full bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] text-[#31302e] dark:text-[#62aef0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] transition-colors"
            >
              {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>

            {/* Let's Talk CTA Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full font-discord-display text-xs tracking-wider text-white bg-[#0075de] hover:bg-[#005bab] active:scale-95 transition-all shadow-md whitespace-nowrap"
            >
              {fmt(t.nav.letsTalk)}
            </button>

            {/* Mobile Drawer Trigger (xl:hidden) */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] text-[#000000] dark:text-white hover:bg-[#f6f5f4] dark:hover:bg-[#252946] transition-colors"
            >
              {mobileNavOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              ref={mobileNavRef}
              className="fixed top-0 right-0 bottom-0 w-80 z-50 p-6 flex flex-col justify-between xl:hidden bg-[#ffffff] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border-l border-[#e6e6e6] dark:border-[#262a42] shadow-2xl overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#e6e6e6] dark:border-[#262a42]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-[#0075de]/30 flex items-center justify-center flex-shrink-0">
                      <Image
                        src="/jamshaid.jpg"
                        alt="Muhammad Jamshaid Khan"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <span className="font-discord-display text-sm tracking-wide">
                      {language === "ur" ? "نیویگیشن" : "NAVIGATION"}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileNavOpen(false)}
                    className="p-2 rounded-xl text-[#615d59] hover:bg-[#f6f5f4] dark:hover:bg-[#181b2e]"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col gap-1.5">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center px-4 py-3 rounded-2xl font-discord-display text-xs tracking-wider transition-colors ${
                          isActive
                            ? "bg-[#0075de] text-white"
                            : "text-[#31302e] dark:text-[#c5c7d0] hover:bg-[#f6f5f4] dark:hover:bg-[#181b2e]"
                        }`}
                      >
                        {fmt(item.label)}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-[#e6e6e6] dark:border-[#262a42] space-y-3">
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full py-3 rounded-full font-discord-display text-xs tracking-wider text-white bg-[#0075de] hover:bg-[#005bab] text-center"
                >
                  {fmt(t.nav.letsTalk)}
                </button>
                <p className="text-[11px] font-discord-display text-[#615d59] dark:text-[#a39e98] text-center">
                  © {new Date().getFullYear()} {fmt(t.nav.brandTitle)}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
