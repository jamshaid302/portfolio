import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, SECURITY_HEADERS } from "../../utils/rateLimit";
import { sanitizeString } from "../../utils/security";
import { SITE_CONFIG } from "../../config/site";

interface HistoryItem {
    role: string;
    content: string;
}

interface RequestBody {
    prompt: string;
    userData: string;
    history?: HistoryItem[];
}

const buildSystemPrompt = (userData: string, prompt: string, history: HistoryItem[] = []) => {
    const formattedHistory = history.length > 0
        ? history.slice(-6).map(item => `${item.role === 'user' ? 'User' : 'Jamshaid'}: ${sanitizeString(item.content)}`).join("\n")
        : "No previous conversation.";

    return `
You are Muhammad Jamshaid Khan speaking directly in the first person ("I", "me", "my"). You are a Senior Full Stack Engineer specializing in Backend, Microservices & Cloud Architecture.
Answer the user's question directly, naturally, dynamically, and warmly—sounding completely human, like chatting on WhatsApp or LinkedIn.
Do NOT sound like a generic AI assistant or bot. Never say "As an AI..." or "I am an AI assistant". Speak as Jamshaid himself!

=== MY PORTFOLIO DETAILS & BACKGROUND ===
${userData}

=== RECENT CONVERSATION HISTORY ===
${formattedHistory}

=== CURRENT USER QUESTION ===
${prompt}

=== CRITICAL INSTRUCTIONS ===
1. CONVERSATION CONTEXT & MULTI-QUESTION RESOLUTION: Pay close attention to recent conversation history above. If the user refers to previous context (e.g. "what about Kafka?", "where is he working?", "tell me more"), or asks MULTIPLE questions in a single message, answer ALL parts dynamically using my portfolio details!
2. DYNAMIC & UNCONSTRAINED: Do NOT rely on canned responses. Use your full reasoning intelligence to answer ANY question about my software engineering background, KFUEIT degree (BS IT), 5+ years of experience, Siliconfort fintech CRM, NexaQuanta IC4 portal, Kafka microservices, or contact details.
3. FIRST-PERSON VOICE: Speak strictly in 1st person ("I'm Jamshaid", "I work as Senior Full Stack Engineer at Siliconfort", "I have 5+ years experience").
4. LENGTH & TONE: Warm, natural, direct, concise, and professional (2-4 sentences max).
`;
};

// Helper 1: Try Gemini (Primary)
async function tryGemini(promptText: string): Promise<string | null> {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
        console.warn("Gemini skipped: GEMINI_API_KEY is not configured in .env");
        return null;
    }

    const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-3.6-flash",
        "gemini-3.7-flash",
        "gemini-1.5-flash-latest",
        "gemini-2.5-pro",
    ];

    for (const modelName of modelsToTry) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: modelName,
                generationConfig: { maxOutputTokens: 350, temperature: 0.7 }
            });
            const result = await model.generateContent(promptText);
            const text = result.response.text()?.trim();
            if (text) return text;
        } catch (err: any) {
            console.warn(`Gemini AI (${modelName}) attempt failed:`, err?.message || err);
        }
    }
    return null;
}

// Helper 2: Try Groq (Secondary Fallback)
async function tryGroq(promptText: string): Promise<string | null> {
    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey) {
        console.warn("Groq skipped: GROQ_API_KEY is not configured in .env");
        return null;
    }

    const groqModels = [
        "llama-3.3-70b-versatile",
        "llama-3.1-8b-instant",
        "mixtral-8x7b-32768",
        "gemma2-9b-it"
    ];

    for (const modelName of groqModels) {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: modelName,
                    messages: [{ role: "user", content: promptText }],
                    max_tokens: 350,
                    temperature: 0.7,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const text = data?.choices?.[0]?.message?.content?.trim();
                if (text) return text;
            } else {
                const errText = await response.text();
                console.warn(`Groq API (${modelName}) returned HTTP ${response.status}:`, errText);
            }
        } catch (err: any) {
            console.warn(`Groq AI (${modelName}) fetch exception:`, err?.message || err);
        }
    }
    return null;
}

// Helper 3: Try OpenRouter (Tertiary Fallback)
async function tryOpenRouter(promptText: string): Promise<string | null> {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    if (!apiKey) {
        console.warn("OpenRouter skipped: OPENROUTER_API_KEY is not configured in .env");
        return null;
    }

    const openRouterModels = [
        "meta-llama/llama-3.3-70b-instruct:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "google/gemini-2.0-flash-lite-preview:free",
        "deepseek/deepseek-r1:free",
        "qwen/qwen-2.5-7b-instruct:free"
    ];

    for (const modelName of openRouterModels) {
        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": SITE_CONFIG.url,
                    "X-Title": "Jamshaid Portfolio",
                },
                body: JSON.stringify({
                    model: modelName,
                    messages: [{ role: "user", content: promptText }],
                    max_tokens: 350,
                    temperature: 0.7,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const text = data?.choices?.[0]?.message?.content?.trim();
                if (text) return text;
            } else {
                const errText = await response.text();
                console.warn(`OpenRouter API (${modelName}) returned HTTP ${response.status}:`, errText);
            }
        } catch (err: any) {
            console.warn(`OpenRouter AI (${modelName}) fetch exception:`, err?.message || err);
        }
    }
    return null;
}

// Helper 4: Multi-Topic Knowledge-Based Offline Fallback Engine
function getSmartFallbackResponse(query: string, history: HistoryItem[] = []): string {
    const q = query.toLowerCase();
    const historyText = history.map(h => h.content.toLowerCase()).join(" ");
    const fullContext = `${historyText} ${q}`;

    const answers: string[] = [];

    // 1. Experience & Years
    if (
        q.includes("years") || q.includes("experience") || q.includes("senior") ||
        (q.includes("work") && (q.includes("how long") || q.includes("summary")))
    ) {
        answers.push("I have over 5 years of professional experience as a Senior Full Stack Engineer, building multi-tenant SaaS and fintech systems with React, NestJS, and Apache Kafka.");
    }

    // 2. Working / Current Job / Company / Siliconfort / NexaQuanta
    if (
        q.includes("working") || q.includes("work") || q.includes("job") || q.includes("company") ||
        q.includes("companies") || q.includes("siliconfort") || q.includes("nexaquanta") || q.includes("employ")
    ) {
        answers.push("I am currently a Senior Full Stack Engineer at Siliconfort (building a multi-tenant fintech CRM with NestJS, MT5, Kafka, and MSSQL) and was previously at NexaQuanta leading the IC4 enterprise dealer portal.");
    }

    // 3. Education / Degree / University / KFUEIT
    if (
        q.includes("education") || q.includes("degree") || q.includes("university") || q.includes("kfueit") ||
        q.includes("khwaja") || q.includes("college") || q.includes("school") || q.includes("gpa")
    ) {
        answers.push("I hold a Bachelor of Information Technology (BS IT) from Khwaja Fareed University of Engineering and Information Technology (KFUEIT, 2017 – 2021).");
    }

    // 4. Projects / Apps
    if (q.includes("project") || q.includes("projects") || q.includes("crm") || q.includes("ic4") || q.includes("mx3") || q.includes("luma") || q.includes("build")) {
        answers.push("Key projects include the Siliconfort CRM (multi-tenant fintech SaaS with MT5 and Kafka), IC4 Portal (dealer SaaS with Keycloak SSO), and MX3 (recruitment platform).");
    }

    // 5. Skills / Stack / Kafka / AWS
    if (q.includes("skill") || q.includes("skills") || q.includes("stack") || q.includes("tech") || q.includes("technology") || q.includes("kafka") || q.includes("aws") || q.includes("react") || q.includes("nest")) {
        answers.push("My core technical stack includes React.js, Next.js, NestJS, Node.js, TypeScript, Apache Kafka, PostgreSQL, MSSQL, Redis, Docker, and AWS (ECS/ECR/S3).");
    }

    // 6. Contact / Email / Phone / Location
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("location") || q.includes("whatsapp")) {
        answers.push("You can reach me directly via email at jkniazi302@gmail.com, on phone/WhatsApp at +92 301-2857327, based in Lahore, Pakistan.");
    }

    if (answers.length > 0) {
        return answers.join(" ");
    }

    // 7. Follow up detection using conversation context
    if (q.includes("what about") || q.includes("tell me more") || q.includes("and")) {
        if (fullContext.includes("kafka") || fullContext.includes("microservice")) {
            return "Regarding Kafka and microservices, I design event-driven architectures for asynchronous trade processing, account provisioning, and real-time streaming.";
        }
        if (fullContext.includes("company") || fullContext.includes("work")) {
            return "Regarding my career, I'm currently working at Siliconfort engineering high-throughput fintech CRM services on AWS.";
        }
    }

    // Greeting / General
    if (q.includes("who") || q.includes("about") || q.includes("jamshaid") || q.includes("hi") || q.includes("hello") || q.includes("hey")) {
        return "Hey there! I'm Muhammad Jamshaid Khan, a Senior Full Stack Engineer specializing in microservices, Apache Kafka, React, and NestJS. Feel free to ask about my 5+ years of experience, Siliconfort fintech CRM, or cloud architectures!";
    }

    return "I'm Muhammad Jamshaid Khan, a Senior Full Stack Engineer with 5+ years of experience in React, NestJS, Apache Kafka, PostgreSQL, and AWS. Feel free to ask me about my work at Siliconfort, enterprise SaaS platforms, or contact details!";
}

export async function POST(request: Request) {
    if (request.method !== 'POST') {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405, headers: SECURITY_HEADERS });
    }

    // 1. Rate Limiting Check (15 requests per 1 minute per IP)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp, { intervalMs: 60 * 1000, maxRequests: 15 });

    if (!rateLimit.success) {
        const retryAfterSeconds = Math.ceil(rateLimit.resetMs / 1000);
        return NextResponse.json(
            { error: `Too many chat requests. Please wait ${retryAfterSeconds} seconds.` },
            { 
                status: 429, 
                headers: { 
                    ...SECURITY_HEADERS,
                    "Retry-After": String(retryAfterSeconds) 
                } 
            }
        );
    }

    try {
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
            return NextResponse.json({ error: "Invalid Content-Type. Expected application/json." }, { status: 400, headers: SECURITY_HEADERS });
        }

        const reqBody: RequestBody = await request.json();
        const { prompt: rawPrompt, userData: rawUserData, history: rawHistory } = reqBody || {};

        if (!rawPrompt || typeof rawPrompt !== "string") {
            return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400, headers: SECURITY_HEADERS });
        }

        // 2. Input Validation & Sanitization
        const sanitizedPrompt = sanitizeString(rawPrompt);
        if (!sanitizedPrompt || sanitizedPrompt.length > 500) {
            return NextResponse.json({ error: "Prompt must be between 1 and 500 characters." }, { status: 400, headers: SECURITY_HEADERS });
        }

        const sanitizedUserData = sanitizeString(String(rawUserData || "")).slice(0, 3000);
        const validHistory: HistoryItem[] = Array.isArray(rawHistory) ? rawHistory.slice(-6) : [];

        const fullPrompt = buildSystemPrompt(sanitizedUserData, sanitizedPrompt, validHistory);

        // 3. Multi-Provider Fallback Sequence
        // 1. Try Gemini
        let generatedText = await tryGemini(fullPrompt);
        let providerUsed = "Gemini";

        // 2. Try Groq if Gemini failed
        if (!generatedText) {
            generatedText = await tryGroq(fullPrompt);
            providerUsed = "Groq";
        }

        // 3. Try OpenRouter if Groq failed
        if (!generatedText) {
            generatedText = await tryOpenRouter(fullPrompt);
            providerUsed = "OpenRouter";
        }

        // 4. Multi-Topic Knowledge Fallback Engine if AI calls fail or keys are unconfigured
        if (!generatedText) {
            providerUsed = "Multi-Topic Knowledge Engine";
            generatedText = getSmartFallbackResponse(sanitizedPrompt, validHistory);
        }

        return NextResponse.json(
            {
                message: `Responded via ${providerUsed}`,
                generatedText,
                provider: providerUsed,
            },
            { status: 200, headers: SECURITY_HEADERS }
        );
    } catch (error: any) {
        console.error("Error in getChat route:", error);
        return NextResponse.json(
            {
                error: "Failed to process chat query",
                details: error?.message || String(error),
            },
            { status: 500, headers: SECURITY_HEADERS }
        );
    }
}