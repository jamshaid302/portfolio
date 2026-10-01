"use client";
import React, { useState } from "react";
import { 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaCloud, 
  FaMobileAlt, 
  FaBrain 
} from "react-icons/fa";
import TechBadge from "./TechBadge";
import { useLanguage } from "../context/LanguageContext";

interface SkillsProps {
  darkMode: boolean;
}

const Skills: React.FC<SkillsProps> = () => {
  const { t, fmt } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");

  const skillGroups = [
    {
      id: "frontend",
      category: t.skills.categories.frontend,
      icon: <FaCode className="text-[#0075de]" />,
      description: "Building resilient, high-performance web applications and UI interfaces",
      skills: ["React.js", "Next.js", "TypeScript", "Redux", "Material UI", "Tailwind CSS", "JavaScript"],
    },
    {
      id: "backend",
      category: t.skills.categories.backend,
      icon: <FaServer className="text-[#0075de]" />,
      description: "Scalable microservices, distributed events, and robust server APIs",
      skills: ["NestJS", "Node.js", "Express.js", "Apache Kafka", "Microservices", "REST APIs", "GraphQL", "Bull Queues", "Socket.io", "SSE"],
    },
    {
      id: "database",
      category: t.skills.categories.database,
      icon: <FaDatabase className="text-[#0075de]" />,
      description: "Relational & NoSQL database architecture, ORM migrations, and caching",
      skills: ["PostgreSQL", "MSSQL", "MongoDB", "TypeORM", "Prisma", "Sequelize", "Redis Caching"],
    },
    {
      id: "devops",
      category: t.skills.categories.devops,
      icon: <FaCloud className="text-[#0075de]" />,
      description: "Containerized deployments, automated CI/CD pipelines, and cloud services",
      skills: ["AWS ECS", "AWS ECR", "AWS EC2", "AWS S3", "CloudFront", "Docker", "CI/CD", "GitHub Actions"],
    },
    {
      id: "mobile",
      category: t.skills.categories.mobile,
      icon: <FaBrain className="text-[#0075de]" />,
      description: "Enterprise system design, tenant isolation, and modular architecture",
      skills: ["Microservices", "Event-Driven Systems", "Multi-Tenant SaaS", "NX Monorepo", "Modular Design", "Tenant Isolation"],
    },
    {
      id: "concepts",
      category: t.skills.categories.concepts,
      icon: <FaBrain className="text-[#0075de]" />,
      description: "Enterprise identity, secure access control, and financial APIs",
      skills: ["Keycloak (SSO)", "PropelAuth", "JWT / OAuth", "Passport", "Stripe Webhooks", "MT5 Trading APIs"],
    },
  ];

  const filteredGroups = activeCategory === "all"
    ? skillGroups
    : skillGroups.filter((g) => g.id === activeCategory);

  return (
    <section id="skills" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.skills.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.skills.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full font-discord-display text-xs tracking-wider transition-all ${
              activeCategory === "all"
                ? "bg-[#0075de] text-white shadow-md"
                : "bg-white dark:bg-[#181b2e] text-[#31302e] dark:text-[#c5c7d0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] border border-[#e6e6e6] dark:border-[#262a42]"
            }`}
          >
            {fmt(t.skills.allSkills)}
          </button>

          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveCategory(group.id)}
              className={`px-5 py-2 rounded-full font-discord-display text-xs tracking-wider transition-all ${
                activeCategory === group.id
                  ? "bg-[#0075de] text-white shadow-md"
                  : "bg-white dark:bg-[#181b2e] text-[#31302e] dark:text-[#c5c7d0] hover:bg-[#f6f5f4] dark:hover:bg-[#252946] border border-[#e6e6e6] dark:border-[#262a42]"
              }`}
            >
              {fmt(group.category)}
            </button>
          ))}
        </div>

        {/* 40px Rounded Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="p-7 sm:p-8 rounded-[40px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] flex flex-col justify-between hover:border-[#0075de] dark:hover:border-[#0075de] transition-colors notion-shadow-soft"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a] text-xl">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="font-discord-display text-lg text-[#000000] dark:text-white">
                      {fmt(group.category)}
                    </h3>
                    <p className="text-xs text-[#615d59] dark:text-[#a39e98] font-medium">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-[#e6e6e6] dark:bg-[#262a42] my-4" />

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <TechBadge key={skill} name={skill} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;