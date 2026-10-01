export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    skills: string;
    experience: string;
    projects: string;
    github: string;
    education: string;
    certifications: string;
    awards: string;
    contact: string;
    letsTalk: string;
    brandTitle: string;
    brandSubtitle: string;
  };
  hero: {
    badge: string;
    building: string;
    webMobile: string;
    words: string[];
    lead: string;
    viewProjects: string;
    contactMe: string;
    resume: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    cgpaBadge: string;
    subheading: string;
    desc1: string;
    desc2: string;
    highlights: {
      fullstackTitle: string;
      fullstackDesc: string;
      archTitle: string;
      archDesc: string;
      taTitle: string;
      taDesc: string;
      honorsTitle: string;
      honorsDesc: string;
    };
  };
  skills: {
    eyebrow: string;
    heading: string;
    allSkills: string;
    categories: {
      frontend: string;
      backend: string;
      database: string;
      devops: string;
      mobile: string;
      concepts: string;
    };
  };
  experience: {
    eyebrow: string;
    heading: string;
    viewDetails: string;
    hideDetails: string;
    taSectionTitle: string;
    items: {
      siliconfort: {
        role: string;
        type: string;
        location: string;
        period: string;
        desc: string;
        bullets: string[];
      };
      nexaquanta: {
        role: string;
        type: string;
        location: string;
        period: string;
        desc: string;
        bullets: string[];
      };
      hashlogics: {
        role: string;
        type: string;
        location: string;
        period: string;
        desc: string;
        bullets: string[];
      };
      loopbrackets: {
        role: string;
        type: string;
        location: string;
        period: string;
        desc: string;
        bullets: string[];
      };
      mercurysols: {
        role: string;
        type: string;
        location: string;
        period: string;
        desc: string;
        bullets: string[];
      };
    };
    specializations: {
      kafka: {
        title: string;
        period: string;
        domain: string;
        details: string;
      };
      saas: {
        title: string;
        period: string;
        domain: string;
        details: string;
      };
    };
  };
  projects: {
    eyebrow: string;
    heading: string;
    allFeatured: string;
    searchPlaceholder: string;
    sourceCode: string;
    liveDemo: string;
    viewAllProjects: string;
  };
  education: {
    eyebrow: string;
    heading: string;
    viewDetails: string;
    hideDetails: string;
    keyCoursework: string;
    honorsRecognition: string;
    items: {
      kfueit: {
        degree: string;
        period: string;
        location: string;
        gpa: string;
        desc: string;
        coursework: string[];
        honors: string[];
      };
    };
  };
  certifications: {
    eyebrow: string;
    heading: string;
    verifyCredential: string;
  };
  awards: {
    eyebrow: string;
    heading: string;
    items: {
      silverDegree: {
        title: string;
        subtitle: string;
        period: string;
        desc: string;
      };
      goldSemesters: {
        title: string;
        subtitle: string;
        period: string;
        desc: string;
      };
      silverSemesters: {
        title: string;
        subtitle: string;
        period: string;
        desc: string;
      };
      bronzeCodecon: {
        title: string;
        subtitle: string;
        period: string;
        desc: string;
      };
    };
  };
  contact: {
    eyebrow: string;
    heading: string;
    desc: string;
    emailLabel: string;
    locationLabel: string;
    phoneLabel: string;
    nameField: string;
    emailField: string;
    messageField: string;
    sendMessage: string;
  };
  footer: {
    subtitle: string;
    backToTop: string;
    rightsReserved: string;
  };
  chat: {
    title: string;
    botName: string;
    botStatus: string;
    askAnything: string;
    emptySubtitle: string;
    thinking: string;
    placeholder: string;
    send: string;
    quickQuestionsTitle: string;
    quickQuestions: {
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
    };
  };
  github: {
    eyebrow: string;
    heading: string;
    subheading: string;
    totalContributions: string;
    currentStreak: string;
    longestStreak: string;
    totalStars: string;
    publicRepos: string;
    followers: string;
    topLanguages: string;
    contributionCalendar: string;
    viewOnGithub: string;
    daysCount: string;
  };
  allProjectsPage: {
    backToHome: string;
    eyebrow: string;
    heading: string;
    subheading: string;
    categories: {
      all: string;
      fullstack: string;
      mobile: string;
      systems: string;
      architecture: string;
    };
  };
}

export const translations: Record<"en" | "ur", TranslationDictionary> = {
  en: {
    nav: {
      home: "HOME",
      about: "ABOUT",
      skills: "SKILLS",
      experience: "EXPERIENCE",
      projects: "PROJECTS",
      github: "GITHUB",
      education: "EDUCATION",
      certifications: "CERTS",
      awards: "HIGHLIGHTS",
      contact: "CONTACT",
      letsTalk: "LET'S TALK",
      brandTitle: "JAMSHAID",
      brandSubtitle: "SENIOR FULL STACK ENGINEER",
    },
    hero: {
      badge: "SENIOR FULL STACK ENGINEER • 5+ YEARS EXPERIENCE",
      building: "ARCHITECTING",
      webMobile: "EVENT-DRIVEN SAAS & MICROSERVICES.",
      words: ["DISTRIBUTED", "KAFKA-POWERED", "SCALABLE", "CLOUD-NATIVE", "HIGH-THROUGHPUT"],
      lead: "I'm Muhammad Jamshaid Khan, a Senior Full Stack Engineer with 5+ years of experience delivering multi-tenant SaaS and fintech platforms with React, NestJS, Apache Kafka, and AWS cloud infrastructure.",
      viewProjects: "VIEW PROJECTS",
      contactMe: "CONTACT ME",
      resume: "RESUME",
    },
    about: {
      eyebrow: "WHO I AM",
      heading: "ENGINEERED FOR BACKEND, MICROSERVICES & CLOUD AT SCALE",
      cgpaBadge: "5+ YEARS PROFESSIONAL EXPERIENCE",
      subheading: "ARCHITECTING EVENT-DRIVEN SYSTEMS & ENTERPRISE FINTECH SAAS.",
      desc1: "I am a Senior Full Stack Engineer with 5+ years of experience delivering robust multi-tenant SaaS and fintech products using React, NestJS, Node.js, and TypeScript. My backend-focused expertise centers on microservices, event-driven systems with Apache Kafka, and secure, scalable REST APIs.",
      desc2: "I possess a strong data and performance background across PostgreSQL, MSSQL, MongoDB, TypeORM, Prisma, Redis, Bull queues, and caching, alongside containerized service delivery through Docker and CI/CD pipelines on AWS (ECS, ECR, EC2, S3, CloudFront).",
      highlights: {
        fullstackTitle: "MICROSERVICES & EVENT-DRIVEN",
        fullstackDesc: "Designed Kafka-based microservice communication for MT5 trading operations, asynchronous trade-events, and live/demo account provisioning.",
        archTitle: "MULTI-TENANT SAAS ARCHITECTURE",
        archDesc: "Engineered tenant isolation, Keycloak SSO, PropelAuth organization management, role-based access control, and NX Monorepo systems.",
        taTitle: "CLOUD & DEVOPS EXCELLENCE",
        taDesc: "Shipped containerized deployments via automated CI/CD onto AWS ECS, ECR, EC2, S3, and CloudFront for high reliability.",
        honorsTitle: "HIGH-PERFORMANCE DATA & CACHING",
        honorsDesc: "Optimized queries and caching on PostgreSQL, MSSQL, and MongoDB using Redis, TypeORM migrations, and Bull background queues.",
      },
    },
    skills: {
      eyebrow: "TECHNICAL ARSENAL",
      heading: "SKILLS & TECHNOLOGIES",
      allSkills: "ALL SKILLS",
      categories: {
        frontend: "FRONTEND ENGINEERING",
        backend: "BACKEND & MICROSERVICES",
        database: "DATABASES & CACHING",
        devops: "CLOUD & DEVOPS",
        mobile: "ARCHITECTURE & SAAS",
        concepts: "AUTH & INTEGRATIONS",
      },
    },
    experience: {
      eyebrow: "CAREER PATH",
      heading: "WORK EXPERIENCE & TRACK RECORD",
      viewDetails: "VIEW DETAILS",
      hideDetails: "HIDE DETAILS",
      taSectionTitle: "KEY ARCHITECTURAL SPECIALIZATIONS",
      items: {
        siliconfort: {
          role: "SENIOR FULL STACK ENGINEER",
          type: "FULL-TIME",
          location: "Lahore, Pakistan",
          period: "Apr 2026 – Present",
          desc: "Architecting and delivering full-stack features for a production multi-tenant fintech SaaS CRM using React, NestJS, TypeScript, TypeORM, and MSSQL.",
          bullets: [
            "Build end-to-end features for a production multi-tenant fintech SaaS CRM using React, NestJS, TypeScript, TypeORM, and MSSQL.",
            "Design Kafka-based microservice communication for MT5 live/demo account provisioning, trading workflows, and asynchronous integrations.",
            "Develop secure JWT/OAuth APIs, partner and commission reporting, Redis caching, Bull background jobs, and Socket.io real-time features.",
            "Ship containerized releases through Docker-based CI/CD and cloud delivery using AWS S3, ECS, ECR, EC2, and CloudFront.",
          ],
        },
        nexaquanta: {
          role: "SENIOR FULL STACK DEVELOPER",
          type: "FULL-TIME",
          location: "Lahore, Pakistan",
          period: "Sep 2024 – Mar 2026",
          desc: "Led development of the IC4 enterprise dealer portal with Keycloak SSO and subscription-based access across multiple products.",
          bullets: [
            "Led development of the IC4 enterprise dealer portal with Keycloak SSO and subscription-based access across multiple products.",
            "Architected an NX Monorepo with shared frontend and backend libraries, reducing duplication and simplifying cross-application delivery.",
            "Delivered real-time workflows with SSE, Redis, webhooks, and background jobs; optimized PostgreSQL queries and caching for production load.",
            "Containerized and deployed services through automated CI/CD on AWS ECS/ECR, improving release consistency and reliability.",
          ],
        },
        hashlogics: {
          role: "MERN STACK DEVELOPER",
          type: "FULL-TIME",
          location: "Lahore, Pakistan",
          period: "Apr 2023 – Aug 2024",
          desc: "Delivered production React applications with reusable interfaces focused on usability, accessibility, and high performance.",
          bullets: [
            "Delivered production React applications with reusable interfaces focused on usability, accessibility, and performance.",
            "Built Node.js and Express.js REST APIs and integrated third-party services and webhooks across client projects.",
            "Optimized MongoDB schemas, indexes, and aggregation queries for faster responses under concurrent load.",
          ],
        },
        loopbrackets: {
          role: "NODE.JS DEVELOPER",
          type: "FULL-TIME",
          location: "Lahore, Pakistan",
          period: "Jul 2022 – Mar 2023",
          desc: "Developed robust Node.js and Express.js services for subscription-based SaaS products with recurring billing.",
          bullets: [
            "Developed Node.js and Express.js services for subscription-based SaaS products.",
            "Integrated Stripe recurring payments, billing events, and webhook workflows.",
            "Implemented Socket.io features for live in-app updates and messaging.",
          ],
        },
        mercurysols: {
          role: "MERN STACK DEVELOPER",
          type: "FULL-TIME",
          location: "Rahim Yar Khan, Pakistan",
          period: "Jun 2021 – Jul 2022",
          desc: "Built responsive React interfaces and Node.js/Express.js APIs for multiple client applications.",
          bullets: [
            "Built responsive React interfaces and Node.js/Express.js APIs for multiple client products.",
            "Designed maintainable MongoDB schemas and optimized application queries.",
            "Delivered features from requirements and implementation through testing, deployment, and support.",
          ],
        },
      },
      specializations: {
        kafka: {
          title: "Apache Kafka & Event-Driven Microservices",
          period: "2024 – Present",
          domain: "Fintech & High-Throughput Messaging",
          details: "Designed decoupled microservices processing thousands of trading events, account provisionings, and webhook notifications asynchronously.",
        },
        saas: {
          title: "Multi-Tenant SaaS & Enterprise SSO",
          period: "2023 – Present",
          domain: "Tenant Isolation, Keycloak & PropelAuth",
          details: "Engineered scalable multi-tenant platforms with strict data segregation, organization role hierarchies, and seamless single sign-on.",
        },
      },
    },
    projects: {
      eyebrow: "SHOWCASE GALLERY",
      heading: "PRODUCTION SYSTEMS & ARCHITECTURES",
      allFeatured: "ALL FEATURED",
      searchPlaceholder: "Search projects...",
      sourceCode: "SOURCE CODE",
      liveDemo: "LIVE DEMO",
      viewAllProjects: "VIEW ALL PROJECTS",
    },
    education: {
      eyebrow: "ACADEMIC FOUNDATION",
      heading: "EDUCATION & DEGREE",
      viewDetails: "VIEW DETAILS",
      hideDetails: "HIDE DETAILS",
      keyCoursework: "CORE CURRICULUM",
      honorsRecognition: "FOCUS & HIGHLIGHTS",
      items: {
        kfueit: {
          degree: "Bachelor of Information Technology (BS IT)",
          period: "2017 – 2021",
          location: "Rahim Yar Khan / Pakistan",
          gpa: "Graduated with Honors",
          desc: "Rigorous curriculum focused on distributed computing, database management, software development life cycles, and network infrastructure.",
          coursework: [
            "Distributed Systems & Cloud Computing",
            "Advanced Database Management Systems",
            "Data Structures & Algorithms (DSA)",
            "Object-Oriented Programming (OOP)",
            "Software Architecture & Engineering",
            "Computer Networks & Security",
            "Web Technologies & API Design",
            "Operating Systems",
          ],
          honors: [
            "Final Year Capstone Project Distinction",
            "High Academic Standing in IT Core Modules",
            "Hands-on Systems Engineering Focus",
          ],
        },
      },
    },
    certifications: {
      eyebrow: "TECHNICAL MASTERY",
      heading: "SKILLS CREDENTIALS & COMPETENCIES",
      verifyCredential: "VIEW DETAILS",
    },
    awards: {
      eyebrow: "MILESTONES & ACHIEVEMENTS",
      heading: "ENGINEERING EXCELLENCE & IMPACT",
      items: {
        silverDegree: {
          title: "5+ Years Full Stack Experience",
          subtitle: "Multi-Tenant SaaS & Fintech",
          period: "2021 – Present",
          desc: "Demonstrated track record of delivering resilient, high-volume production SaaS applications across fintech, automotive dealer platforms, and recruitment.",
        },
        goldSemesters: {
          title: "Fintech & MT5 Trading Architecture",
          subtitle: "Siliconfort Lead Engineer",
          period: "2026 – Present",
          desc: "Spearheaded MT5 live/demo account provisioning, trading workflows, and asynchronous trade-event processing over Apache Kafka.",
        },
        silverSemesters: {
          title: "Enterprise Dealer Platform (IC4)",
          subtitle: "Keycloak SSO & NX Monorepo",
          period: "2024 – 2026",
          desc: "Architected dealer portal with Keycloak SSO, shared monorepo libraries, SSE real-time updates, and AWS ECS containerized deployment.",
        },
        bronzeCodecon: {
          title: "Cloud Delivery & CI/CD Pipelines",
          subtitle: "AWS ECS, ECR, S3, CloudFront",
          period: "Continuous",
          desc: "Maintained zero-downtime automated deployment pipelines containerizing microservices with Docker and GitHub Actions.",
        },
      },
    },
    contact: {
      eyebrow: "LET'S CONNECT",
      heading: "GET IN TOUCH",
      desc: "Looking for a Senior Full Stack Engineer to lead backend architecture, Kafka microservices, or complex multi-tenant SaaS? Let's connect.",
      emailLabel: "EMAIL ADDRESS",
      locationLabel: "LOCATION",
      phoneLabel: "PHONE / WHATSAPP",
      nameField: "YOUR NAME",
      emailField: "YOUR EMAIL",
      messageField: "YOUR MESSAGE",
      sendMessage: "SEND MESSAGE",
    },
    footer: {
      subtitle: "SENIOR FULL STACK ENGINEER • BACKEND, MICROSERVICES & CLOUD",
      backToTop: "TOP",
      rightsReserved: "All rights reserved.",
    },
    chat: {
      title: "Ask AI Assistant",
      botName: "JAMSHAID AI",
      botStatus: "Ready to answer questions",
      askAnything: "ASK ME ANYTHING",
      emptySubtitle: "Ask about my Kafka architecture, Siliconfort fintech CRM, AWS deployments, or NestJS APIs.",
      thinking: "THINKING...",
      placeholder: "Ask about Jamshaid's background...",
      send: "Send",
      quickQuestionsTitle: "QUICK QUESTIONS",
      quickQuestions: {
        q1: "⚡ What are Jamshaid's core technical skills?",
        a1: "Jamshaid is a Senior Full Stack Engineer specializing in React, NestJS, Node.js, TypeScript, Apache Kafka, PostgreSQL, MSSQL, Redis, Docker, and AWS (ECS/EC2/S3).",
        q2: "💼 Tell me about his experience at Siliconfort",
        a2: "At Siliconfort, Jamshaid builds a multi-tenant fintech SaaS CRM, designing Kafka microservices for MT5 trading operations and AWS ECS containerized delivery.",
        q3: "🚀 What are his key architectural projects?",
        a3: "Key projects include Siliconfort CRM (Fintech), IC4 Portal (Enterprise Dealer Platform with Keycloak SSO), MX3 (Recruitment SaaS), and Player Totals (Real-Time Sports APIs).",
        q4: "🎓 What is his educational background?",
        a4: "Jamshaid holds a Bachelor of Information Technology (BS IT) from Khwaja Fareed University of Engineering and Information Technology (KFUEIT, 2017-2021).",
      },
    },
    github: {
      eyebrow: "OPEN SOURCE & ACTIVITY",
      heading: "GitHub Contributions & Code",
      subheading: "Active development and open-source contributions powered by GitHub API.",
      totalContributions: "Total Contributions",
      currentStreak: "Current Streak",
      longestStreak: "Longest Streak",
      totalStars: "Total Stars Earned",
      publicRepos: "Public Repositories",
      followers: "GitHub Followers",
      topLanguages: "Top Languages by Usage",
      contributionCalendar: "Contribution Calendar",
      viewOnGithub: "View GitHub Profile",
      daysCount: "days",
    },
    allProjectsPage: {
      backToHome: "BACK TO HOME",
      eyebrow: "COMPLETE PROJECT CATALOG",
      heading: "ALL PROJECTS & REPOSITORIES",
      subheading: "Explore production web applications, multi-tenant SaaS platforms, Kafka microservices, and high-throughput systems.",
      categories: {
        all: "ALL PROJECTS",
        fullstack: "FULL STACK & SAAS",
        mobile: "FINTECH & TRADING",
        systems: "MICROSERVICES & APIS",
        architecture: "CLOUD & ARCHITECTURE",
      },
    },
  },
  ur: {
    nav: {
      home: "صفحہ اول",
      about: "تعارف",
      skills: "مہارتیں",
      experience: "تجربہ",
      projects: "منصوبے",
      github: "گٹ ہب",
      education: "تعلیم",
      certifications: "اسناد",
      awards: "نمایاں پہلو",
      contact: "رابطہ",
      letsTalk: "بات کرتے ہیں",
      brandTitle: "جمشید",
      brandSubtitle: "سینئر فل اسٹیک انجینئر",
    },
    hero: {
      badge: "سینئر فل اسٹیک انجینئر • 5+ سالہ تجربہ",
      building: "تعمیر کنندہ",
      webMobile: "مائیکروسروسز اور ملٹی ٹیننٹ ساس سسٹمز۔",
      words: ["کافکا پاورڈ", "تقسیم شدہ سسٹمز", "قابل توسیع", "کلاؤڈ نیٹو", "ہائی تھرو پٹ"],
      lead: "میں محمد جمشید خان ہوں، 5+ سال کے تجربے کا حامل سینئر فل اسٹیک انجینئر۔ میں ری ایکٹ، نیسٹ جے ایس، اپاچی کافکا اور اے ڈبلیو ایس کلاؤڈ انفراسٹرکچر پر مبنی ساس اور فن ٹیک پروڈکٹس تیار کرتا ہوں۔",
      viewProjects: "منصوبے دیکھیں",
      contactMe: "رابطہ کریں",
      resume: "سی وی ڈاؤن لوڈ کریں",
    },
    about: {
      eyebrow: "میرا تعارف",
      heading: "بیک اینڈ، مائیکروسروسز اور کلاؤڈ آرکیٹیکچر میں مہارت",
      cgpaBadge: "5+ سالہ انڈسٹری کا تجربہ",
      subheading: "ایونٹ ڈریون سسٹمز اور انٹرپرائز ساس کی تعمیر۔",
      desc1: "میں ایک سینئر فل اسٹیک انجینئر ہوں جس کے پاس ری ایکٹ، نیسٹ جے ایس، نوڈ جے ایس اور ٹائپ اسکرپٹ کے ساتھ ملٹی ٹیننٹ ساس اور فن ٹیک پروڈکٹس بنانے کا 5 سال سے زیادہ تجربہ ہے۔ میری بنیادی مہارت مائیکروسروسز، اپاچی کافکا اور محفوظ ریسٹ اے پی آئیز پر ہے۔",
      desc2: "میرے پاس پوسٹگریس، ایم ایس ایس کیو ایل، مونگو ڈی بی، ٹائپ او آر ایم، پریزما، ریڈس اور بل کیوز کے ساتھ ڈیٹا بیس آپٹیمائزیشن اور اے ڈبلیو ایس (ECS, ECR, EC2, S3) پر ڈاکر کنٹینرائزڈ ڈپلائیمنٹ کا وسیع عملی تجربہ ہے۔",
      highlights: {
        fullstackTitle: "مائیکروسروسز اور کافکا",
        fullstackDesc: "ایم ٹی 5 ٹریڈنگ سسٹمز اور لائیو/ڈیمو اکاونٹس کے لیے اپاچی کافکا پر مبنی مائیکروسروسز کی ڈیزائننگ۔",
        archTitle: "ملٹی ٹیننٹ ساس آرکیٹیکچر",
        archDesc: "ٹیننٹ آئسولیشن، کی کلاک سنگل سائن آن (SSO)، پروپیل آتھ، اور این ایکس مونو ریپو سسٹمز کی تعمیر۔",
        taTitle: "کلاؤڈ اور کنٹینرائزیشن",
        taDesc: "ڈاکر، گٹ ہب ایکشنز، اور اے ڈبلیو ایس ای سی ایس/ای سی آر کے ذریعے خودکار سی آئی/سی ڈی پائپ لائنز۔",
        honorsTitle: "ہائی پرفارمنس ڈیٹا اور کیشنگ",
        honorsDesc: "پوسٹگریس، ایم ایس ایس کیو ایل، ریڈس کیشنگ اور بل کیوز کے ساتھ ہائی ٹریفک سسٹمز کی آپٹیمائزیشن۔",
      },
    },
    skills: {
      eyebrow: "تکنیکی مہارتیں",
      heading: "مہارتیں اور ٹیکنالوجیز",
      allSkills: "تمام مہارتیں",
      categories: {
        frontend: "فرنٹ اینڈ انجینئرنگ",
        backend: "بیک اینڈ اور مائیکروسروسز",
        database: "ڈیٹا بیسز اور کیشنگ",
        devops: "کلاؤڈ اور ڈیو آپس",
        mobile: "آرکیٹیکچر اور ساس",
        concepts: "آتھ اور انٹیگریشنز",
      },
    },
    experience: {
      eyebrow: "پیشہ ورانہ سفر",
      heading: "کام کا تجربہ اور کیریئر",
      viewDetails: "تفصیلات دیکھیں",
      hideDetails: "تفصیلات چھپائیں",
      taSectionTitle: "بنیادی آرکیٹیکچرل تخصص",
      items: {
        siliconfort: {
          role: "سینئر فل اسٹیک انجینئر",
          type: "فل ٹائم",
          location: "لاہور، پاکستان",
          period: "اپریل 2026 – تاحال",
          desc: "ری ایکٹ، نیسٹ جے ایس، ٹائپ اسکرپٹ، ٹائپ او آر ایم اور ایم ایس ایس کیو ایل کے ساتھ پروڈکشن ملٹی ٹیننٹ فن ٹیک ساس سی آر ایم کی تعمیر۔",
          bullets: [
            "ری ایکٹ، نیسٹ جے ایس، ٹائپ اسکرپٹ، ٹائپ او آر ایم اور ایم ایس ایس کیو ایل کے ساتھ ملٹی ٹیننٹ فن ٹیک ساس سی آر ایم کی اینڈ ٹو اینڈ تعمیر۔",
            "ایم ٹی 5 ٹریڈنگ اور اکاؤنٹ پروویژننگ کے لیے اپاچی کافکا مائیکروسروسز کی ڈیزائننگ۔",
            "محفوظ JWT/OAuth APIs، پارٹنر و کمیشن رپورٹنگ، ریڈس کیشنگ اور ساکٹ آئی او ریئل ٹائم فیچرز کا نفاذ۔",
            "ڈاکر اور اے ڈبلیو ایس (S3, ECS, ECR, EC2, CloudFront) کے ذریعے کنٹینرائزڈ ریلیز کی ڈپلائیمنٹ۔",
          ],
        },
        nexaquanta: {
          role: "سینئر فل اسٹیک ڈیولپر",
          type: "فل ٹائم",
          location: "لاہور، پاکستان",
          period: "ستمبر 2024 – مارچ 2026",
          desc: "کی کلاک سنگل سائن آن (SSO) اور سبسکرپشن بیسڈ ایکسس کے ساتھ آئی سی 4 انٹرپرائز ڈیلر پورٹل کی ڈیولپمنٹ کی قیادت۔",
          bullets: [
            "کی کلاک سنگل سائن آن (SSO) کے ساتھ آئی سی 4 انٹرپرائز ڈیلر پورٹل کی مکمل رہنمائی اور تعمیر۔",
            "مشترکہ فرنٹ اینڈ اور بیک اینڈ لائبریریز کے ساتھ این ایکس مونو ریپو آرکیٹیکچر کا قیام۔",
            "ایس ایس ای (SSE)، ریڈس اور ویب ہکس کے ساتھ ریئل ٹائم ورک فلوز اور پوسٹگریس کیوریز کی اصلاح۔",
            "اے ڈبلیو ایس ای سی ایس اور ای سی آر پر خودکار سی آئی/سی ڈی پائپ لائنز کے ذریعے سروسز کی ڈپلائیمنٹ۔",
          ],
        },
        hashlogics: {
          role: "مرن (MERN) اسٹیک ڈیولپر",
          type: "فل ٹائم",
          location: "لاہور، پاکستان",
          period: "اپریل 2023 – اگست 2024",
          desc: "اعلیٰ کارکردگی، استعمال میں آسانی اور اسکیل ایبلٹی پر مبنی پروڈکشن ری ایکٹ ایپس کی فراہمی۔",
          bullets: [
            "ری ایکٹ کے ساتھ دوبارہ قابل استعمال اور تیز رفتار یوزر انٹرفیسز کی تعمیر۔",
            "نوڈ جے ایس اور ایکسپریس پر مبنی ریسٹ اے پی آئیز اور تھرڈ پارٹی ویب ہک انٹیگریشنز۔",
            "زیادہ ٹریفک کے تحت مونگو ڈی بی اسکیماز اور ایگریگیشن کیوریز کی اسپیڈ آپٹیمائزیشن۔",
          ],
        },
        loopbrackets: {
          role: "نوڈ جے ایس ڈیولپر",
          type: "فل ٹائم",
          location: "لاہور، پاکستان",
          period: "جولائی 2022 – مارچ 2023",
          desc: "سبسکرپشن بیسڈ ساس پروڈکٹس کے لیے نوڈ جے ایس اور ایکسپریس سروسز کی تیاری۔",
          bullets: [
            "ساس پلیٹ فارمز کے لیے نوڈ جے ایس اور ایکسپریس پر مبنی جدید بیک اینڈ سروسز۔",
            "اسٹرائپ ریکرنگ پیمنٹس، بلنگ ایونٹس اور ویب ہک ورک فلوز کا نفاذ۔",
            "ایپ میں فوری اپ ڈیٹس اور لائیو میسجنگ کے لیے ساکٹ آئی او فیچرز کی فراہمی۔",
          ],
        },
        mercurysols: {
          role: "مرن (MERN) اسٹیک ڈیولپر",
          type: "فل ٹائم",
          location: "رحیم یار خان، پاکستان",
          period: "جون 2021 – جولائی 2022",
          desc: "متعدد کلائنٹ پروڈکٹس کے لیے ریسپانسیو ری ایکٹ انٹرفیسز اور نوڈ جے ایس اے پی آئیز کی تعمیر۔",
          bullets: [
            "متعدد کلائنٹ ایپلیکیشنز کے لیے ری ایکٹ انٹرفیسز اور نوڈ جے ایس اے پی آئیز کا قیام۔",
            "بہترین مونگو ڈی بی اسکیما ڈیزائن اور ڈیٹا بیس کیوریز کی اصلاح۔",
            "ضروریات کے تجزیے سے لے کر ٹیسٹنگ اور سپورٹ تک فیچرز کی بروقت ترسیل۔",
          ],
        },
      },
      specializations: {
        kafka: {
          title: "اپاچی کافکا اور ایونٹ ڈریون مائیکروسروسز",
          period: "2024 – تاحال",
          domain: "فن ٹیک اور ہائی تھرو پٹ میسجنگ",
          details: "ہزاروں ٹریڈنگ ایونٹس اور نوٹیفیکیشنز کو بیک وقت پروسیس کرنے والے ڈسٹری بیوٹڈ سسٹمز۔",
        },
        saas: {
          title: "ملٹی ٹیننٹ ساس اور انٹرپرائز ایس ایس او",
          period: "2023 – تاحال",
          domain: "ٹیننٹ آئسولیشن، کی کلاک اور پروپیل آتھ",
          details: "سخت ڈیٹا آئسولیشن اور رول بیسڈ ایکسس کے ساتھ جدید انٹرپرائز ساس پلیٹ فارمز۔",
        },
      },
    },
    projects: {
      eyebrow: "منصوبوں کی نمائش",
      heading: "پروڈکشن سسٹمز اور آرکیٹیکچرز",
      allFeatured: "تمام نمایاں",
      searchPlaceholder: "منصوبے تلاش کریں...",
      sourceCode: "سور کوڈ",
      liveDemo: "لائیو ڈیمو",
      viewAllProjects: "تمام منصوبے دیکھیں",
    },
    education: {
      eyebrow: "تعلیمی پس منظر",
      heading: "تعلیم اور ڈگری",
      viewDetails: "تفصیلات دیکھیں",
      hideDetails: "تفصیلات چھپائیں",
      keyCoursework: "بنیادی مضامین",
      honorsRecognition: "نمایاں نکات",
      items: {
        kfueit: {
          degree: "بیچلر آف انفارمیشن ٹیکنالوجی (BS IT)",
          period: "2017 – 2021",
          location: "خواجہ فرید یونیورسٹی آف انجینئرنگ اینڈ انفارمیشن ٹیکنالوجی (KFUEIT)",
          gpa: "ڈگری امتیازی نمبروں سے مکمل",
          desc: "ڈسٹری بیوٹڈ کمپیوٹنگ، ڈیٹا بیس مینجمنٹ، سافٹ ویئر انجینئرنگ اور نیٹ ورک انفراسٹرکچر پر مبنی جامع نصاب۔",
          coursework: [
            "ڈسٹری بیوٹڈ سسٹمز اور کلاؤڈ کمپیوٹنگ",
            "ایڈوانسڈ ڈیٹا بیس مینجمنٹ سسٹمز",
            "ڈیٹا سٹرکچرز اور الگورتھمز (DSA)",
            "آبجیکٹ اورینٹڈ پروگرامنگ (OOP)",
            "سافٹ ویئر آرکیٹیکچر اور انجینئرنگ",
            "کمپیوٹر نیٹ ورکس اور سیکیورٹی",
            "ویب ٹیکنالوجیز اور اے پی آئی ڈیزائن",
            "آپریٹنگ سسٹمز",
          ],
          honors: [
            "فائنل ایئر کیپ اسٹون پروجیکٹ میں امتیازی حیثیت",
            "انفارمیشن ٹیکنالوجی کور ماڈیولز میں بہترین کارکردگی",
            "عملی سسٹمز انجینئرنگ پر مکمل توجہ",
          ],
        },
      },
    },
    certifications: {
      eyebrow: "تکنیکی مہارت کی سند",
      heading: "مہارتیں اور اسناد",
      verifyCredential: "تفصیلات دیکھیں",
    },
    awards: {
      eyebrow: "سنگ میل اور کامیابیاں",
      heading: "انجینئرنگ کی مہارت اور اثرات",
      items: {
        silverDegree: {
          title: "5+ سالہ فل اسٹیک تجربہ",
          subtitle: "ملٹی ٹیننٹ ساس اور فن ٹیک",
          period: "2021 – تاحال",
          desc: "فن ٹیک، آٹوموٹو ڈیلر سسٹمز، اور ریکروٹمنٹ پلیٹ فارمز کے لیے قابل اعتماد اور ہائی والیوم ساس ایپلی کیشنز کی ترسیل۔",
        },
        goldSemesters: {
          title: "فن ٹیک اور ایم ٹی 5 ٹریڈنگ آرکیٹیکچر",
          subtitle: "سلیکون فورٹ سینئر انجینئر",
          period: "2026 – تاحال",
          desc: "اپاچی کافکا کے ذریعے ایم ٹی 5 لائیو/ڈیمو اکاونٹس، ٹریڈنگ ورک فلوز اور غیر ہم وقتی ایونٹ پروسیسنگ کی قیادت۔",
        },
        silverSemesters: {
          title: "انٹرپرائز ڈیلر پلیٹ فارم (IC4)",
          subtitle: "کی کلاک ایس ایس او اور مونو ریپو",
          period: "2024 – 2026",
          desc: "کی کلاک سنگل سائن آن، مشترکہ لائبریریز، ریئل ٹائم ایس ایس ای اپ ڈیٹس اور اے ڈبلیو ایس ای سی ایس ڈپلائیمنٹ۔",
        },
        bronzeCodecon: {
          title: "کلاؤڈ ڈیلیوری اور سی آئی/سی ڈی",
          subtitle: "AWS ECS, ECR, S3, CloudFront",
          period: "مسلسل",
          desc: "ڈاکر اور گٹ ہب ایکشنز کے ساتھ مائیکروسروسز کے لیے زیرو ڈاؤن ٹائم خودکار ڈپلائیمنٹ پائپ لائنز کا تسلسل۔",
        },
      },
    },
    contact: {
      eyebrow: "رابطہ کریں",
      heading: "مجھ سے رابطہ فرمائیں",
      desc: "اگر آپ کو بیک اینڈ آرکیٹیکچر، کافکا مائیکروسروسز، یا پیچیدہ ملٹی ٹیننٹ ساس کے لیے سینئر فل اسٹیک انجینئر درکار ہے تو رابطہ کیجیے۔",
      emailLabel: "ای میل ایڈریس",
      locationLabel: "مقام",
      phoneLabel: "فون / واٹس ایپ",
      nameField: "آپ کا نام",
      emailField: "آپ کا ای میل",
      messageField: "آپ کا پیغام",
      sendMessage: "پیغام بھیجیں",
    },
    footer: {
      subtitle: "سینئر فل اسٹیک انجینئر • بیک اینڈ، مائیکروسروسز اور کلاؤڈ",
      backToTop: "اوپر جائیں",
      rightsReserved: "جملہ حقوق محفوظ ہیں۔",
    },
    chat: {
      title: "اے آئی اسسٹنٹ سے پوچھیں",
      botName: "جمشید اے آئی",
      botStatus: "سوالات کے جوابات کے لیے تیار",
      askAnything: "مجھ سے کچھ بھی پوچھیں",
      emptySubtitle: "میرے کافکا آرکیٹیکچر، سلیکون فورٹ فن ٹیک سی آر ایم، اے ڈبلیو ایس ڈپلائیمنٹس یا نیسٹ جے ایس پروجیکٹس کے بارے میں پوچھیں۔",
      thinking: "سوچ رہا ہے...",
      placeholder: "جمشید کے تجربے کے بارے میں پوچھیں...",
      send: "ارسال کریں",
      quickQuestionsTitle: "فوری سوالات",
      quickQuestions: {
        q1: "⚡ جمشید کی بنیادی تکنیکی مہارتیں کیا ہیں؟",
        a1: "جمشید ری ایکٹ، نیسٹ جے ایس، نوڈ جے ایس، ٹائپ اسکرپٹ، اپاچی کافکا، پوسٹگریس، ایم ایس ایس کیو ایل، ریڈس، ڈاکر اور اے ڈبلیو ایس میں ماہر ہیں۔",
        q2: "💼 سلیکون فورٹ میں ان کے تجربے کے بارے میں بتائیں",
        a2: "سلیکون فورٹ میں جمشید ملٹی ٹیننٹ فن ٹیک ساس سی آر ایم پر کام کرتے ہیں، جس میں کافکا مائیکروسروسز اور ایم ٹی 5 ٹریڈنگ سسٹمز شامل ہیں۔",
        q3: "🚀 ان کے نمایاں آرکیٹیکچرل پروجیکٹس کون سے ہیں؟",
        a3: "اہم پروجیکٹس میں سلیکون فورٹ سی آر ایم (فن ٹیک)، آئی سی 4 پورٹل (کی کلاک ایس ایس او کے ساتھ ڈیلر پلیٹ فارم)، ایم ایکس 3 ساس، اور پلیئر ٹوٹلز شامل ہیں۔",
        q4: "🎓 ان کا تعلیمی پس منظر کیا ہے؟",
        a4: "جمشید نے خواجہ فرید یونیورسٹی آف انجینئرنگ اینڈ انفارمیشن ٹیکنالوجی (KFUEIT) سے بیچلر آف انفارمیشن ٹیکنالوجی (BS IT) کی ڈگری مکمل کی ہے۔",
      },
    },
    github: {
      eyebrow: "اوپن سورس اور سرگرمیاں",
      heading: "گٹ ہب کنٹری بیوشنز اور کوڈ",
      subheading: "گٹ ہب اے پی آئی کے ذریعے لائیو شماریات اور اوپن سورس خدمات۔",
      totalContributions: "کل کنٹری بیوشنز",
      currentStreak: "موجودہ اسٹریک",
      longestStreak: "طویل ترین اسٹریک",
      totalStars: "حاصل کردہ اسٹارز",
      publicRepos: "پبلک ریپوزٹریز",
      followers: "گٹ ہب فالوورز",
      topLanguages: "سب سے زیادہ استعمال شدہ زبانیں",
      contributionCalendar: "کنٹری بیوشن کیلنڈر",
      viewOnGithub: "گٹ ہب پروفائل دیکھیں",
      daysCount: "دن",
    },
    allProjectsPage: {
      backToHome: "صفحہ اول پر واپسی",
      eyebrow: "مکمل پروجیکٹ کیٹلاگ",
      heading: "تمام منصوبے اور ریپوزٹریز",
      subheading: "پروڈکشن ویب ایپلیکیشنز، ملٹی ٹیننٹ ساس، کافکا مائیکروسروسز اور کلاؤڈ سسٹمز کا مکمل کیٹلاگ۔",
      categories: {
        all: "تمام منصوبے",
        fullstack: "فل اسٹیک اور ساس",
        mobile: "فن ٹیک اور ٹریڈنگ",
        systems: "مائیکروسروسز اور اے پی آئیز",
        architecture: "کلاؤڈ اور آرکیٹیکچر",
      },
    },
  },
};
