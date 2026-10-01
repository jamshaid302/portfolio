export interface Project {
  id: string;
  title: string;
  titleUr?: string;
  subtitle: string;
  subtitleUr?: string;
  description: string;
  descriptionUr?: string;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  category: "fullstack" | "mobile" | "systems" | "architecture";
  tags: string[];
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: "siliconfort-crm",
    title: "Siliconfort CRM",
    titleUr: "سلیکون فورٹ فن ٹیک سی آر ایم",
    subtitle: "Multi-Tenant Fintech SaaS & MT5 Trading Engine",
    subtitleUr: "ملٹی ٹیننٹ فن ٹیک ساس اور ایم ٹی 5 ٹریڈنگ انجن",
    description: "End-to-end multi-tenant fintech CRM featuring MT5 trading account provisioning, Kafka asynchronous event-processing, TypeORM/MSSQL migrations, and AWS S3 document workflows.",
    descriptionUr: "ایم ٹی 5 ٹریڈنگ اکاؤنٹ پروویژننگ، کافکا غیر ہم وقتی ایونٹ پروسیسنگ، اور ٹائپ او آر ایم ایم ایس ایس کیو ایل پر مبنی ملٹی ٹیننٹ فن ٹیک سی آر ایم۔",
    demoUrl: "https://siliconfort.com",
    category: "fullstack",
    tags: ["React", "NestJS", "TypeScript", "Apache Kafka", "MT5", "MSSQL", "TypeORM", "Redis", "AWS"],
    featured: true,
  },
  {
    id: "ic4-dealer-portal",
    title: "IC4 Portal",
    titleUr: "آئی سی 4 انٹرپرائز ڈیلر پورٹل",
    subtitle: "Enterprise Automotive Dealer Platform",
    subtitleUr: "انٹرپرائز آٹوموٹو ڈیلر پلیٹ فارم",
    description: "Enterprise SaaS dealer portal with Keycloak SSO, NX Monorepo architecture, Kanban drag-and-drop state transitions, SSE real-time notifications, and AWS ECS containerized deployment.",
    descriptionUr: "کی کلاک سنگل سائن آن (SSO)، این ایکس مونو ریپو، ریئل ٹائم ایس ایس ای نوٹیفیکیشنز اور اے ڈبلیو ایس ای سی ایس ڈپلائیمنٹ کے ساتھ انٹرپرائز ڈیلر پورٹل۔",
    category: "architecture",
    tags: ["React", "Keycloak SSO", "NX Monorepo", "SSE", "Redis", "Webhooks", "PostgreSQL", "AWS ECS"],
    featured: true,
  },
  {
    id: "mx3-recruitment-platform",
    title: "MX3 Recruitment SaaS",
    titleUr: "ایم ایکس 3 ریکروٹمنٹ ساس پلیٹ فارم",
    subtitle: "Multi-Tenant Hiring & Candidate Pipeline System",
    subtitleUr: "ملٹی ٹیننٹ ہائرنگ اور امیدوار پائپ لائن سسٹم",
    description: "Scalable recruitment SaaS featuring strict tenant isolation, role-based access control with PropelAuth organization management, NestJS/PostgreSQL micro-APIs, and React/Material UI hiring pipelines.",
    descriptionUr: "سخت ٹیننٹ آئسولیشن، پروپیل آتھ آرگنائزیشن مینجمنٹ، نیسٹ جے ایس اور ری ایکٹ مٹیریل یو آئی پر مبنی ماڈرن بھرتی اور ہائرنگ سسٹم۔",
    category: "fullstack",
    tags: ["NestJS", "PostgreSQL", "React", "Material UI", "PropelAuth", "Multi-Tenant", "TypeScript"],
    featured: true,
  },
  {
    id: "player-totals-api",
    title: "Player Totals Engine",
    titleUr: "پلیئر ٹوٹلز ریئل ٹائم اسپورٹس اے پی آئیز",
    subtitle: "High-Throughput Real-Time Sports Analytics APIs",
    subtitleUr: "ہائی تھرو پٹ ریئل ٹائم اسپورٹس اینالیٹکس اے پی آئیز",
    description: "High-concurrency data platform aggregating live game schedules, player performance metrics, and team stats with Redis caching and queue management under peak concurrent traffic.",
    descriptionUr: "لائیو گیم شیڈولز، کھلاڑیوں کے اعداد و شمار، اور ریڈس کیشنگ کے ساتھ انتہائی تیز رفتار اسپورٹس اینالیٹکس پلیٹ فارم۔",
    category: "systems",
    tags: ["Node.js", "Express.js", "Redis Caching", "Bull Queues", "REST APIs", "Sports Analytics"],
    featured: true,
  },
  {
    id: "luma-ehr",
    title: "Luma EHR",
    titleUr: "لوما الیکٹرانک ہیلتھ ریکارڈز",
    subtitle: "The Lighthouse Arabia Healthcare Platform",
    subtitleUr: "دی لائٹ ہاؤس عربیہ ہیلتھ کیئر پلیٹ فارم",
    description: "Enterprise Electronic Health Records system managing confidential patient records, clinical scheduling, tele-consultation appointments, and secure doctor-patient communications.",
    descriptionUr: "مریضوں کے ریکارڈ، کلینیکل اپائنٹمنٹس اور ڈاکٹرز کے ساتھ محفوظ مواصلات کا وسیع پیمانے پر الیکٹرانک ہیلتھ ریکارڈ سسٹم۔",
    category: "fullstack",
    tags: ["React", "Node.js", "Healthcare", "EHR", "Security", "REST APIs", "PostgreSQL"],
    featured: true,
  },
  {
    id: "kafka-microservices-suite",
    title: "Kafka Event-Driven Hub",
    titleUr: "اپاچی کافکا ایونٹ ڈریون سروسز",
    subtitle: "Decoupled Asynchronous Microservices Topology",
    subtitleUr: "غیر ہم وقتی تقسیم شدہ مائیکروسروسز ٹوپولوجی",
    description: "Distributed messaging architecture utilizing Apache Kafka for reliable asynchronous trade execution, transaction event dispatching, and horizontal scale across backend clusters.",
    descriptionUr: "اپاچی کافکا پر مبنی غیر ہم وقتی ٹریڈنگ اور ٹرانزیکشن ایونٹ پروسیسنگ کا اسکیل ایبل ڈسٹری بیوٹڈ آرکیٹیکچر۔",
    category: "systems",
    tags: ["Apache Kafka", "NestJS", "Microservices", "Docker", "Event-Driven", "Redis"],
    featured: false,
  },
  {
    id: "aws-cloud-pipeline",
    title: "AWS Cloud & CI/CD Pipeline",
    titleUr: "اے ڈبلیو ایس کلاؤڈ اور سی آئی/سی ڈی پائپ لائن",
    subtitle: "Containerized Cloud Delivery on ECS & ECR",
    subtitleUr: "ای سی ایس اور ای سی آر پر کنٹینرائزڈ کلاؤڈ ڈیلیوری",
    description: "Automated multi-stage deployment workflows containerizing full-stack microservices with Docker, shipping to AWS ECS/ECR with S3 storage, and CloudFront global edge caching.",
    descriptionUr: "ڈاکر اور گٹ ہب ایکشنز کے ذریعے خودکار سی آئی/سی ڈی، اے ڈبلیو ایس ای سی ایس/ای سی آر کنٹینرائزیشن اور کلاؤڈ فرنٹ ڈیلیوری۔",
    category: "architecture",
    tags: ["AWS ECS", "ECR", "Docker", "CI/CD", "AWS S3", "CloudFront", "GitHub Actions"],
    featured: false,
  },
  {
    id: "trading-broker-bridge",
    title: "MT5 Trading Gateway Bridge",
    titleUr: "ایم ٹی 5 ٹریڈنگ گیٹ وے برج",
    subtitle: "Broker Account Provisioning & Live Trade Stream",
    subtitleUr: "بروکر اکاؤنٹ پروویژننگ اور لائیو ٹریڈ اسٹریم",
    description: "Dedicated microservice bridge enabling CRM operators to open live and demo MT5 trading accounts, query balances, leverage settings, and process trade book webhooks.",
    descriptionUr: "سی آر ایم سے میٹا ٹریڈر 5 پر لائیو اور ڈیمو اکاؤنٹس کھولنے اور بیلنس کوآرڈینیشن کے لیے وقف گیٹ وے سروس۔",
    category: "systems",
    tags: ["MT5 Trading", "Fintech", "TypeScript", "NestJS", "REST APIs", "Kafka"],
    featured: false,
  },
];
