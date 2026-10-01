"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaComment, FaTimes, FaArrowUp } from "react-icons/fa";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import MedalAwards from "./components/MedalAwards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatComponent from "./components/ChatComponent";

import { LanguageProvider } from "./context/LanguageContext";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("portfolio-theme");
    let isDark = true;
    if (savedTheme) {
      isDark = savedTheme === "dark";
    } else {
      isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem("portfolio-theme", nextMode ? "dark" : "light");
      if (nextMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
      return nextMode;
    });
  };

  if (!mounted) return null;

  return (
    <LanguageProvider>
      <div className={darkMode ? "dark" : ""}>
        <div className="bg-[#f6f5f4] text-[#000000] dark:bg-[#0a0d1a] dark:text-white min-h-screen transition-colors duration-300">
          
          {/* Navigation Bar */}
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          {/* Main Sections */}
          <main className="pt-20">
            <HeroSection darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Skills darkMode={darkMode} />
            <Experience darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <Education darkMode={darkMode} />
            <Certifications darkMode={darkMode} />
            <MedalAwards darkMode={darkMode} />
            <Contact darkMode={darkMode} />
          </main>

          {/* Footer */}
          <Footer darkMode={darkMode} />

          {/* Floating Actions Container: Back to Top & AI Assistant Drawer */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            {/* Floating Back to Top Button */}
            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToTop}
                  aria-label="Back to Top"
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#181b2e] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] shadow-xl hover:bg-[#0075de] hover:text-white dark:hover:bg-[#0075de] dark:hover:text-white transition-all flex items-center justify-center active:scale-95"
                >
                  <FaArrowUp size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              aria-label="Ask AI Assistant"
              className="p-4 rounded-2xl bg-[#0075de] hover:bg-[#005bab] text-white shadow-xl shadow-[#0075de]/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              {isChatOpen ? <FaTimes size={20} /> : <FaComment size={20} />}
            </button>
          </div>

          {/* Responsive Floating AI Chat Drawer */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] max-w-[420px] h-[520px] max-h-[calc(100vh-110px)] z-50 shadow-2xl rounded-[32px] overflow-hidden"
              >
                <ChatComponent
                  darkMode={darkMode}
                  onClose={() => setIsChatOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </LanguageProvider>
  );
}
