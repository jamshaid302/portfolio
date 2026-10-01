import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SITE_CONFIG } from "./config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0075de" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d1a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Muhammad Jamshaid Khan | Senior Full Stack Engineer",
    template: "%s | Muhammad Jamshaid Khan",
  },
  description: "Official portfolio of Muhammad Jamshaid Khan, Senior Full Stack Engineer with 5+ years of experience in microservices, Apache Kafka, multi-tenant SaaS, React, NestJS, Node.js, and AWS.",
  keywords: [
    "Muhammad Jamshaid Khan",
    "Jamshaid Khan",
    "Senior Full Stack Engineer",
    "Backend Engineer",
    "Microservices Architect",
    "NestJS",
    "React.js",
    "Apache Kafka",
    "TypeScript",
    "PostgreSQL",
    "MSSQL",
    "AWS ECS",
    "Siliconfort",
    "Lahore Pakistan Engineer"
  ],
  authors: [{ name: "Muhammad Jamshaid Khan", url: "https://github.com/jkniazi" }],
  creator: "Muhammad Jamshaid Khan",
  publisher: "Muhammad Jamshaid Khan",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/coding.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Muhammad Jamshaid Khan | Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in microservices, Apache Kafka, multi-tenant SaaS, React, NestJS, and AWS cloud delivery.",
    url: SITE_CONFIG.url,
    siteName: "Muhammad Jamshaid Khan Portfolio",
    images: [
      {
        url: "/coding.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Jamshaid Khan - Senior Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Jamshaid Khan | Senior Full Stack Engineer",
    description: "Senior Full Stack Engineer specializing in microservices, event-driven architectures with Apache Kafka, NestJS, React, and cloud infrastructure.",
    images: ["/coding.png"],
    creator: "@jkniazi302",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Jamshaid Khan",
    alternateName: ["Jamshaid Khan", "jkniazi302@gmail.com"],
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}/coding.png`,
    jobTitle: "Senior Full Stack Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Siliconfort",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Khwaja Fareed University of Engineering and Information Technology (KFUEIT)",
    },
    sameAs: [
      SITE_CONFIG.author.github,
      SITE_CONFIG.author.linkedin
    ],
    knowsAbout: [
      "Microservices Architecture",
      "Event-Driven Systems",
      "Apache Kafka",
      "Full-Stack Web Development",
      "React.js",
      "Next.js",
      "NestJS",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "MSSQL",
      "Redis",
      "AWS (ECS, ECR, EC2, S3, CloudFront)",
      "Docker & CI/CD"
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-notion antialiased selection:bg-[#0075de] selection:text-white bg-[#f6f5f4] dark:bg-[#0a0d1a] text-[#000000] dark:text-[#ffffff]">
        {children}
      </body>
    </html>
  );
}
