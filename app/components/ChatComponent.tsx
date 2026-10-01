"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Loader2, Bot, Send, Sparkles, X, Trash2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

interface ChatComponentProps {
  darkMode: boolean;
  onClose?: () => void;
}

const STORAGE_KEY = "jamshaid_portfolio_chat_messages";

const messageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" }
  },
};

const userDataSummary = `
Muhammad Jamshaid Khan
Senior Full Stack Engineer — Backend, Microservices & Cloud
Lahore, Pakistan | +92 301-2857327 | jkniazi302@gmail.com
LinkedIn: https://www.linkedin.com/in/m-jamshaid-khan-nodejs-backend/ | GitHub: https://github.com/jkniazi

Professional Summary:
- Senior Full Stack Engineer with 5+ years of experience delivering multi-tenant SaaS and fintech products with React, NestJS, Node.js, and TypeScript.
- Backend-focused expertise in microservices, event-driven systems with Apache Kafka, and secure, scalable REST APIs.
- Strong data and performance background across PostgreSQL, MSSQL, MongoDB, TypeORM, Prisma, Redis, background jobs, and caching.
- Experienced deploying containerized services through Docker and CI/CD on AWS ECS, ECR, EC2, S3, and CloudFront.

Core Skills:
- Frontend: React.js, Next.js, Redux, Material UI, TypeScript
- Backend: Node.js, NestJS, Express.js, REST APIs, GraphQL, Microservices, Apache Kafka, Bull Queues, Socket.io, SSE
- Databases & Caching: PostgreSQL, MongoDB, MSSQL, Prisma, Sequelize, TypeORM, Redis
- Architecture: Microservices, Event-Driven Systems, Multi-Tenant SaaS, NX Monorepo, Modular Design
- Cloud & DevOps: AWS (ECS, ECR, EC2, S3, CloudFront), Docker, CI/CD, GitHub Actions
- Auth & Integrations: JWT, Passport, Keycloak (SSO), PropelAuth, OAuth, Stripe, Webhooks, MT5 Trading APIs

Professional Experience:
- Senior Full Stack Engineer at Siliconfort (Apr 2026 – Present, Lahore, Pakistan): Production multi-tenant fintech SaaS CRM using React, NestJS, TypeScript, TypeORM, MSSQL. Kafka microservices for MT5 live/demo account provisioning, Redis caching, Bull background jobs, Docker CI/CD on AWS ECS/ECR/S3/CloudFront.
- Senior Full Stack Developer at NexaQuanta (Sep 2024 – Mar 2026, Lahore, Pakistan): IC4 enterprise dealer portal with Keycloak SSO, NX Monorepo with shared libraries, SSE, Redis, webhooks, AWS ECS/ECR.
- MERN Stack Developer at Hashlogics (Apr 2023 – Aug 2024, Lahore, Pakistan): Production React apps, Node.js/Express.js REST APIs, MongoDB schema and query optimization.
- Node.js Developer at Loop Brackets (Jul 2022 – Mar 2023, Lahore, Pakistan): Node.js/Express SaaS products, Stripe recurring payments, Socket.io in-app updates.
- MERN Stack Developer at Mercury Sols (Jun 2021 – Jul 2022, Rahim Yar Khan, Pakistan): React interfaces, Node.js/Express APIs, MongoDB.

Featured Projects:
- Siliconfort CRM: Multi-Tenant Fintech SaaS with MT5 trading operations and Apache Kafka.
- IC4 Portal: Enterprise Dealer Platform with Keycloak SSO and NX Monorepo.
- MX3: Recruitment SaaS Platform with tenant isolation and PropelAuth.
- Player Totals: Real-Time Sports Data APIs with Redis caching and queues.
- Luma EHR: The Lighthouse Arabia Electronic Health Records platform.

Education:
- Bachelor of Information Technology (BS IT) from Khwaja Fareed University of Engineering and Information Technology (2017 – 2021), Pakistan.
`;

const ChatComponent: React.FC<ChatComponentProps> = ({ onClose }) => {
  const { t, fmt } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickItems = [
    { question: t.chat.quickQuestions.q1, answer: t.chat.quickQuestions.a1 },
    { question: t.chat.quickQuestions.q2, answer: t.chat.quickQuestions.a2 },
    { question: t.chat.quickQuestions.q3, answer: t.chat.quickQuestions.a3 },
    { question: t.chat.quickQuestions.q4, answer: t.chat.quickQuestions.a4 },
  ];

  // 1. Load chat history from localStorage on initial render
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load chat messages from localStorage", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. Persist chat messages to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to save chat messages to localStorage", e);
    }
  }, [messages, isInitialized]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const clearHistory = () => {
    setMessages([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear localStorage chat history", e);
    }
  };

  const sendQuery = async (questionText: string, predefinedAnswer?: string) => {
    if (!questionText.trim()) return;

    const userMsgId = Date.now().toString();
    const newUserMsg: Message = { id: userMsgId, sender: "user", text: questionText };
    
    // Prepare history payload for multi-turn AI context
    const currentHistory = [...messages, newUserMsg].map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    if (predefinedAnswer) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: "bot", text: predefinedAnswer },
        ]);
        setLoading(false);
      }, 400);
      return;
    }

    try {
      const res = await fetch("/api/getChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: questionText,
          userData: userDataSummary,
          history: currentHistory.slice(-6),
        }),
      });

      const data = await res.json();
      if (res.ok && data.generatedText) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: "bot", text: data.generatedText },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "I am currently running in offline mode. Muhammad Jamshaid Khan is a Senior Full Stack Engineer specializing in React, NestJS, Apache Kafka, PostgreSQL, MSSQL, and AWS.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Muhammad Jamshaid Khan is a Senior Full Stack Engineer with 5+ years of experience in microservices, Apache Kafka, multi-tenant SaaS, and AWS cloud infrastructure.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] rounded-[32px] overflow-hidden notion-shadow-soft">
      
      {/* Bot Integrated Header */}
      <div className="px-4 py-3 bg-[#f6f5f4] dark:bg-[#0a0d1a] border-b border-[#e6e6e6] dark:border-[#262a42] flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0075de] flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-discord-display text-xs text-[#000000] dark:text-white font-bold leading-tight">
              {fmt(t.chat.botName)}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#1aae39] animate-pulse flex-shrink-0" />
              <p className="text-[11px] text-[#615d59] dark:text-[#a39e98] font-medium leading-tight">
                {t.chat.botStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearHistory}
              title="Clear Conversation History"
              aria-label="Clear Chat History"
              className="p-2 rounded-xl text-[#615d59] dark:text-[#a39e98] hover:bg-white dark:hover:bg-[#181b2e] hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close Chat"
              className="p-2 rounded-xl text-[#615d59] dark:text-[#a39e98] hover:bg-white dark:hover:bg-[#181b2e] hover:text-[#000000] dark:hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Scroll Container */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 custom-scrollbar text-xs">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-2">
            <div className="w-11 h-11 rounded-2xl bg-[#0075de]/10 flex items-center justify-center mb-2.5 flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-[#0075de]" />
            </div>
            <h4 className="font-discord-display text-xs sm:text-sm text-[#000000] dark:text-white font-bold mb-1">
              {fmt(t.chat.askAnything)}
            </h4>
            <p className="text-[11px] text-[#615d59] dark:text-[#a39e98] leading-relaxed max-w-xs mb-3 font-medium">
              {t.chat.emptySubtitle}
            </p>

            {/* Quick Questions Chips Grid */}
            <div className="w-full space-y-1.5 pt-1 text-left">
              <span className="font-discord-display text-[10px] text-[#0075de] dark:text-[#62aef0] uppercase tracking-wider block font-bold flex items-center gap-1 mb-1">
                <Sparkles size={11} />
                {fmt(t.chat.quickQuestionsTitle)}
              </span>
              {quickItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => sendQuery(item.question, item.answer)}
                  className="w-full text-left p-2 sm:p-2.5 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a] hover:bg-[#0075de] hover:text-white dark:hover:bg-[#0075de] dark:hover:text-white border border-[#e6e6e6] dark:border-[#262a42] text-[11px] sm:text-xs font-medium text-[#31302e] dark:text-[#c5c7d0] transition-all active:scale-[0.98] truncate"
                >
                  {item.question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2`}
            >
              {msg.sender === "bot" && (
                <div className="w-7 h-7 rounded-lg bg-[#0075de] flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                  <Bot size={14} />
                </div>
              )}
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed font-medium ${
                  msg.sender === "user"
                    ? "bg-[#0075de] text-white rounded-tr-none shadow-md font-discord-display"
                    : "bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))
        )}

        {loading && (
          <motion.div
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 text-[#615d59] dark:text-[#a39e98]"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0075de] flex items-center justify-center text-white flex-shrink-0">
              <Bot size={14} />
            </div>
            <div className="p-3 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a] border border-[#e6e6e6] dark:border-[#262a42] flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-[#0075de]" />
              <span className="font-discord-display text-xs text-[#0075de]">
                {fmt(t.chat.thinking)}
              </span>
            </div>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Quick Question Bar when messages exist */}
      {messages.length > 0 && (
        <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto custom-scrollbar border-t border-[#e6e6e6] dark:border-[#262a42] bg-[#f6f5f4]/50 dark:bg-[#0a0d1a]/50 flex-shrink-0">
          {quickItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => sendQuery(item.question, item.answer)}
              className="px-3 py-1 rounded-full bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] hover:border-[#0075de] text-[11px] text-[#31302e] dark:text-[#c5c7d0] whitespace-nowrap transition-colors"
            >
              {item.question.split(" ")[0]} {item.question.split(" ")[1]}...
            </button>
          ))}
        </div>
      )}

      {/* Input Field Bar */}
      <form
        onSubmit={handleFormSubmit}
        className="p-3.5 border-t border-[#e6e6e6] dark:border-[#262a42] bg-white dark:bg-[#181b2e] flex items-center gap-2 flex-shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chat.placeholder}
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-full text-xs bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] focus:outline-none focus:border-[#0075de] transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 sm:px-5 py-2.5 rounded-full font-discord-display text-xs text-white bg-[#0075de] hover:bg-[#005bab] transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 disabled:opacity-40 flex-shrink-0"
        >
          <span>{fmt(t.chat.send)}</span>
          <Send size={12} />
        </button>
      </form>

    </div>
  );
};

export default ChatComponent;