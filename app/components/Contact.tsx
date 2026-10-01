"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaPaperPlane, FaSpinner, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { SITE_CONFIG } from "../config/site";

interface ContactProps {
  darkMode: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC<ContactProps> = () => {
  const { t, fmt } = useLanguage();
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setFormState("loading");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const resJson = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resJson.message || "Failed to send message");
      }

      setFormState("success");
      reset();
      setTimeout(() => setFormState("idle"), 5000);
    } catch (err: any) {
      console.error("Email send error:", err);
      setErrorMessage(err?.message || "Failed to send message.");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 8000);
    }
  };

  const contactCards = [
    {
      icon: <FaEnvelope className="text-[#0075de] text-xl" />,
      label: t.contact.emailLabel,
      value: SITE_CONFIG.author.email,
      href: `mailto:${SITE_CONFIG.author.email}`,
    },
    {
      icon: <FaPhone className="text-[#0075de] text-xl" />,
      label: t.contact.phoneLabel,
      value: SITE_CONFIG.author.phone,
      href: `tel:${SITE_CONFIG.author.phone.replace(/\s+/g, "")}`,
    },
    {
      icon: <FaMapMarkerAlt className="text-[#0075de] text-xl" />,
      label: t.contact.locationLabel,
      value: SITE_CONFIG.author.location,
      href: undefined,
    },
    {
      icon: <FaLinkedin className="text-[#0075de] text-xl" />,
      label: "LINKEDIN",
      value: "linkedin.com/in/m-jamshaid-khan-nodejs-backend",
      href: SITE_CONFIG.author.linkedin,
    },
  ];

  return (
    <section id="contact" className="py-12 md:py-16 bg-[#f6f5f4] dark:bg-[#0a0d1a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-Bleed Matching Notion Blue CTA Band (#0075de) */}
        <div className="p-8 sm:p-10 md:p-12 rounded-[40px] bg-[#0075de] shadow-2xl mb-10 text-center text-white">
          <h2 className="font-discord-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none mb-4">
            {fmt("READY TO START A PROJECT?")}
          </h2>
          <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6 font-medium">
            {t.contact.desc}
          </p>
          <a
            href="mailto:jkniazi302@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-discord-display text-xs text-[#0075de] bg-white hover:bg-[#f6f5f4] transition-all shadow-xl active:scale-95"
          >
            {fmt("SAY HELLO")}
            <FaEnvelope size={14} className="text-[#0075de]" />
          </a>
        </div>

        {/* Contact Form & Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="mb-4">
              <h3 className="font-discord-display text-2xl text-[#000000] dark:text-white mb-2">
                {fmt(t.contact.heading)}
              </h3>
              <p className="text-sm text-[#615d59] dark:text-[#a39e98] font-medium">
                {t.contact.desc}
              </p>
            </div>

            {contactCards.map((card, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[32px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] flex items-center gap-4 notion-shadow-soft"
              >
                <div className="p-3 rounded-2xl bg-[#f6f5f4] dark:bg-[#0a0d1a] flex-shrink-0">
                  {card.icon}
                </div>
                <div className="overflow-hidden">
                  <span className="font-discord-display text-[10px] text-[#615d59] dark:text-[#a39e98] block mb-0.5">
                    {fmt(card.label)}
                  </span>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-discord-display text-sm text-[#000000] dark:text-white hover:text-[#0075de] dark:hover:text-[#62aef0] transition-colors truncate block"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <span className="font-discord-display text-sm text-[#000000] dark:text-white truncate block">
                      {card.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form Surface */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-7 sm:p-8 rounded-[40px] bg-white dark:bg-[#181b2e] border border-[#e6e6e6] dark:border-[#262a42] notion-shadow-soft space-y-5"
            >
              <div>
                <label className="block font-discord-display text-xs text-[#31302e] dark:text-[#c5c7d0] mb-2">
                  {fmt(t.contact.nameField)}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Mercer"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-5 py-3 rounded-2xl text-sm bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] focus:outline-none focus:border-[#0075de]"
                />
                {errors.name && (
                  <p className="text-xs text-[#0075de] mt-1.5 font-bold">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block font-discord-display text-xs text-[#31302e] dark:text-[#c5c7d0] mb-2">
                  {fmt(t.contact.emailField)}
                </label>
                <input
                  type="email"
                  placeholder="e.g. alex@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
                  })}
                  className="w-full px-5 py-3 rounded-2xl text-sm bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] focus:outline-none focus:border-[#0075de]"
                />
                {errors.email && (
                  <p className="text-xs text-[#0075de] mt-1.5 font-bold">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block font-discord-display text-xs text-[#31302e] dark:text-[#c5c7d0] mb-2">
                  {fmt(t.contact.messageField)}
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your message or project inquiry..."
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-5 py-3 rounded-2xl text-sm bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-white border border-[#e6e6e6] dark:border-[#262a42] focus:outline-none focus:border-[#0075de] resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-[#0075de] mt-1.5 font-bold">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full sm:w-auto px-10 py-3.5 rounded-full font-discord-display text-xs tracking-wider text-white bg-[#0075de] hover:bg-[#005bab] transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
              >
                {formState === "loading" ? (
                  <>
                    <FaSpinner className="animate-spin text-white" />
                    {fmt("SENDING MESSAGE...")}
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} className="text-white" />
                    {fmt(t.contact.sendMessage)}
                  </>
                )}
              </button>

              {formState === "success" && (
                <div className="p-4 rounded-2xl bg-[#1aae39]/20 text-[#1aae39] border border-[#1aae39]/40 font-discord-display text-xs flex items-center gap-2">
                  <FaCheck className="text-[#1aae39]" />
                  {fmt("THANK YOU! YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY.")}
                </div>
              )}

              {formState === "error" && (
                <div className="p-4 rounded-2xl bg-[#e53e3e]/10 text-[#e53e3e] dark:text-[#f87171] border border-[#e53e3e]/30 font-discord-display text-xs flex items-center gap-2">
                  <FaExclamationTriangle className="flex-shrink-0" />
                  <span>{errorMessage ? errorMessage : fmt("FAILED TO SEND MESSAGE. PLEASE EMAIL DIRECTLY.")}</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;