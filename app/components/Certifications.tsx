"use client";
import React from "react";
import { FaAward, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
import TechBadge from "./TechBadge";
import { useLanguage } from "../context/LanguageContext";

interface CertificationsProps {
  darkMode: boolean;
}

const Certifications: React.FC<CertificationsProps> = () => {
  const { t, fmt } = useLanguage();

  const certifications = [
    {
      id: "kafka-ms",
      title: "APACHE KAFKA & EVENT-DRIVEN MICROSERVICES",
      issuer: "Confluent / Distributed Systems",
      date: "2025",
      credentialUrl: "https://github.com/jkniazi",
      skills: ["Apache Kafka", "Microservices", "Event Streams", "NestJS"],
    },
    {
      id: "aws-cloud",
      title: "AWS CLOUD ARCHITECTURE & ECS CONTAINERIZATION",
      issuer: "Amazon Web Services / Cloud Delivery",
      date: "2025",
      credentialUrl: "https://github.com/jkniazi",
      skills: ["AWS ECS", "ECR", "S3", "CloudFront", "Docker"],
    },
    {
      id: "enterprise-saas",
      title: "MULTI-TENANT SAAS & ENTERPRISE SSO",
      issuer: "Enterprise Architecture Institute",
      date: "2024",
      credentialUrl: "https://github.com/jkniazi",
      skills: ["Keycloak SSO", "PropelAuth", "Tenant Isolation", "RBAC"],
    },
    {
      id: "react-nest",
      title: "ENTERPRISE FULL-STACK DEVELOPMENT (REACT & NESTJS)",
      issuer: "Advanced TypeScript Institute",
      date: "2024",
      credentialUrl: "https://github.com/jkniazi",
      skills: ["React.js", "NestJS", "TypeScript", "State Management"],
    },
    {
      id: "db-perf",
      title: "DATABASE PERFORMANCE & REDIS CACHING",
      issuer: "Database Engineering Guild",
      date: "2023",
      credentialUrl: "https://github.com/jkniazi",
      skills: ["PostgreSQL", "MSSQL", "TypeORM", "Prisma", "Redis"],
    },
    {
      id: "fintech-broker",
      title: "FINTECH TRADING SYSTEMS & MT5 INTEGRATIONS",
      issuer: "Financial Software Engineering",
      date: "2023",
      credentialUrl: "https://github.com/jkniazi",
      skills: ["MT5 APIs", "OAuth", "JWT", "Webhook Systems"],
    },
  ];

  return (
    <section id="certifications" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-discord-display text-xs tracking-widest text-[#0075de] dark:text-[#62aef0] uppercase block mb-2">
            {fmt(t.certifications.eyebrow)}
          </span>
          <h2 className="font-discord-display text-3xl sm:text-4xl text-[#000000] dark:text-white tracking-tight leading-tight">
            {fmt(t.certifications.heading)}
          </h2>
          <div className="w-16 h-1.5 bg-[#0075de] rounded-full mx-auto mt-3" />
        </div>

        {/* 40px Rounded Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-7 rounded-[40px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] flex flex-col justify-between hover:border-[#0075de] dark:hover:border-[#0075de] transition-colors notion-shadow-soft"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#0075de]">
                    <FaAward size={20} />
                  </div>
                  <span className="font-discord-display text-xs text-[#615d59] dark:text-[#a39e98]">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-discord-display text-lg text-[#000000] dark:text-white mb-2 leading-snug">
                  {fmt(cert.title)}
                </h3>
                <p className="text-xs font-discord-display text-[#0075de] dark:text-[#62aef0] mb-4 flex items-center gap-1.5">
                  <FaCheckCircle className="text-[#0075de]" />
                  {cert.issuer}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {cert.skills.map((skill) => (
                    <TechBadge key={skill} name={skill} />
                  ))}
                </div>
              </div>

              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between font-discord-display text-xs text-[#0075de] hover:underline pt-4 border-t border-[#e6e6e6] dark:border-[#262a42] transition-colors"
              >
                <span>{fmt(t.certifications.verifyCredential)}</span>
                <FaExternalLinkAlt size={12} className="text-[#0075de]" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;