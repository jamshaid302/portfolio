"use client";

import React from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiRedux, 
  SiHtml5, 
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiCplusplus, 
  SiMongodb, 
  SiPostgresql, 
  SiMysql, 
  SiSupabase, 
  SiFirebase, 
  SiRedis, 
  SiDocker, 
  SiAmazonaws, 
  SiGit, 
  SiGithub, 
  SiVercel, 
  SiExpo, 
  SiAndroid, 
  SiSass, 
  SiBootstrap, 
  SiStripe,
  SiPosthog,
  SiNestjs,
  SiMui
} from "react-icons/si";
import { FaJava, FaCode, FaServer, FaBrain } from "react-icons/fa";

export const getTechIcon = (name: string) => {
  const normalized = name.toLowerCase().trim();
  if (normalized.includes("react native")) return <SiReact className="text-[#61DAFB]" />;
  if (normalized.includes("react")) return <SiReact className="text-[#61DAFB]" />;
  if (normalized.includes("next.js") || normalized.includes("nextjs")) return <SiNextdotjs className="text-gray-900 dark:text-white" />;
  if (normalized.includes("typescript")) return <SiTypescript className="text-[#3178C6]" />;
  if (normalized.includes("javascript") || normalized.includes("es6")) return <SiJavascript className="text-[#F7DF1E]" />;
  if (normalized.includes("tailwind")) return <SiTailwindcss className="text-[#06B6D4]" />;
  if (normalized.includes("material ui") || normalized.includes("mui")) return <SiMui className="text-[#007FFF]" />;
  if (normalized.includes("nestjs") || normalized.includes("nest")) return <SiNestjs className="text-[#E0234E]" />;
  if (normalized.includes("redux")) return <SiRedux className="text-[#764ABC]" />;
  if (normalized.includes("html") || normalized.includes("css")) return <SiHtml5 className="text-[#E34F26]" />;
  if (normalized.includes("sass")) return <SiSass className="text-[#CC6699]" />;
  if (normalized.includes("bootstrap")) return <SiBootstrap className="text-[#7952B3]" />;
  if (normalized.includes("node")) return <SiNodedotjs className="text-[#339933]" />;
  if (normalized.includes("express")) return <SiExpress className="text-gray-900 dark:text-white" />;
  if (normalized.includes("trpc")) return <FaServer className="text-[#398CCB]" />;
  if (normalized.includes("stripe")) return <SiStripe className="text-[#635BFF]" />;
  if (normalized.includes("supabase")) return <SiSupabase className="text-[#3ECF8E]" />;
  if (normalized.includes("firebase")) return <SiFirebase className="text-[#FFCA28]" />;
  if (normalized.includes("mongo")) return <SiMongodb className="text-[#47A248]" />;
  if (normalized.includes("postgres")) return <SiPostgresql className="text-[#4169E1]" />;
  if (normalized.includes("mysql")) return <SiMysql className="text-[#4479A1]" />;
  if (normalized.includes("redis")) return <SiRedis className="text-[#DC382D]" />;
  if (normalized.includes("docker")) return <SiDocker className="text-[#2496ED]" />;
  if (normalized.includes("aws") || normalized.includes("amazon")) return <SiAmazonaws className="text-[#FF9900]" />;
  if (normalized.includes("github")) return <SiGithub className="text-gray-900 dark:text-white" />;
  if (normalized.includes("git")) return <SiGit className="text-[#F05032]" />;
  if (normalized.includes("vercel")) return <SiVercel className="text-gray-900 dark:text-white" />;
  if (normalized.includes("expo")) return <SiExpo className="text-gray-900 dark:text-white" />;
  if (normalized.includes("android")) return <SiAndroid className="text-[#3DDC84]" />;
  if (normalized.includes("python")) return <SiPython className="text-[#3776AB]" />;
  if (normalized.includes("c++") || normalized.includes("cpp")) return <SiCplusplus className="text-[#00599C]" />;
  if (normalized.includes("java") && !normalized.includes("javascript")) return <FaJava className="text-[#5382A1]" />;
  if (normalized.includes("posthog")) return <SiPosthog className="text-[#F54E00]" />;
  if (normalized.includes("ai") || normalized.includes("nlp") || normalized.includes("dsa") || normalized.includes("algorithm")) return <FaBrain className="text-[#0075de]" />;
  if (normalized.includes("api") || normalized.includes("backend")) return <FaServer className="text-[#0075de]" />;
  return <FaCode className="text-[#0075de]" />;
};

interface TechBadgeProps {
  name: string;
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl font-discord-display text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft transition-transform hover:scale-105 ${className}`}
    >
      <span className="text-sm flex-shrink-0">{getTechIcon(name)}</span>
      <span>{name}</span>
    </span>
  );
};

export default TechBadge;
