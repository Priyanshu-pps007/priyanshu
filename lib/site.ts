const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const siteUrl = configuredSiteUrl
  ? `${configuredSiteUrl.startsWith("http") ? configuredSiteUrl : `https://${configuredSiteUrl}`}`.replace(
      /\/$/,
      ""
    )
  : "https://priyanshupps.vercel.app";

export const siteHost = new URL(siteUrl).hostname;

export const siteConfig = {
  name: "Priyanshu Pratap Singh",
  shortName: "Priyanshu Singh",
  title: "Priyanshu Pratap Singh | AI Engineer, Backend Engineer & FastAPI Developer",
  description:
    "Priyanshu Pratap Singh is an AI engineer, software engineer, backend engineer, FastAPI developer, and Python developer in India building production AI systems and scalable backend products.",
  tagline:
    "AI engineer and backend engineer in India building production-grade FastAPI systems and intelligent software.",
  keywords: [
    "Priyanshu Pratap Singh",
    "Priyanshu Singh",
    "AI engineer in India",
    "AI engineer",
    "software engineer",
    "software developer",
    "backend engineer",
    "FastAPI developer",
    "Python developer",
    "Python backend engineer",
    "backend developer",
    "LLM engineer",
    "LangGraph developer",
    "RAG engineer",
    "Priyanshu Pratap Singh portfolio",
    "AI engineer portfolio",
    "backend engineer portfolio",
    "FastAPI developer portfolio",
  ],
  email: "priyanshusinghpps786@gmail.com",
  phone: "+91-7275984821",
  location: "India",
  countryCode: "IN",
  portrait: "/priyanshu-pratap-singh-portrait.jpeg",
  role: "AI Engineer, Backend Engineer & FastAPI Developer",
  alternateSiteNames: ["Priyanshu Singh", siteHost],
  primaryRoles: [
    "AI Engineer",
    "Software Engineer",
    "Software Developer",
    "Backend Engineer",
    "FastAPI Developer",
    "Python Developer",
  ],
  expertiseTitle:
    "AI engineer, backend engineer, FastAPI developer, software engineer, and Python developer in India",
  summary:
    "AI engineer and backend engineer with 2+ years building multi-agent systems, RAG pipelines, LLM orchestration platforms, and production-ready FastAPI services.",
  seoIntro:
    "If you are searching for Priyanshu Pratap Singh, AI engineer, software engineer, backend engineer, FastAPI developer, or Python developer in India, this portfolio highlights production AI systems, scalable backends, and real-world LLM delivery.",
  ogImageAlt:
    "Priyanshu Pratap Singh, AI engineer and backend engineer specializing in FastAPI, Python, and production AI systems",
};

export const navigation = [
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const expertise = [
  "Multi-agent systems with LangGraph and HITL controls",
  "FastAPI backends, async systems, streaming APIs, and Celery workers",
  "RAG pipelines, vector databases, semantic memory, and MCP integrations",
  "PostgreSQL data modeling, AWS deployments, and full-stack AI product delivery",
];

export const recruiterCards = [
  {
    title: "AI Systems",
    value: "Multi-agent orchestration",
    detail: "LangGraph, MCP servers, HITL approvals, memory, and model routing.",
  },
  {
    title: "Backend Engineering",
    value: "FastAPI at production scale",
    detail: "Async APIs, Celery workers, streaming responses, auth, and observability.",
  },
  {
    title: "LLM Applications",
    value: "RAG and semantic retrieval",
    detail: "Chunking, embeddings, vector storage, prompt pipelines, and grounded answers.",
  },
  {
    title: "Databases",
    value: "PostgreSQL and vector data",
    detail: "Schema design, pgvector, filtering, performance tuning, and multi-tenant thinking.",
  },
  {
    title: "Cloud Delivery",
    value: "AWS-ready systems",
    detail: "S3, Bedrock, Cognito, Dockerized services, and deployment-ready architecture.",
  },
  {
    title: "Team Impact",
    value: "0 to 1 execution",
    detail: "Product thinking, API design, debugging, documentation, and practical shipping speed.",
  },
];

export const hiringSignals = [
  "Open to AI engineer, backend engineer, and FastAPI developer roles",
  "Strong fit for product companies, startups, and applied AI teams",
  "Comfortable owning architecture, backend delivery, and AI integration",
  "Focused on reliable systems, clean APIs, and production deployment",
];

export const highlights = [
  {
    value: "2+",
    label: "Years shipping AI and backend products",
  },
  {
    value: "40%",
    label: "Latency reduction through async and task offloading",
  },
  {
    value: "0→1",
    label: "AI platforms built from architecture to production",
  },
];

export const experiences = [
  {
    company: "SVAHNAR",
    role: "Software Engineer",
    period: "May 2024 - Present",
    points: [
      "Engineered a multi-agent orchestration engine using LangGraph with PostgreSQL-backed state, Celery queues, and real-time SSE token streaming across OpenAI and AWS Bedrock models.",
      "Integrated MCP servers and Human-in-the-Loop approval flows so operators can pause, inspect, edit, or reject tool calls during execution.",
      "Applied async programming, multithreading, FastAPI background tasks, and Celery workers to reduce API response latency by about 40%.",
      "Architected an AI platform with Next.js, FastAPI, AWS Cognito, RBAC, and connectors for S3, SharePoint, and Confluence.",
    ],
  },
  {
    company: "Blackcoffer",
    role: "Associate Software Engineer Intern",
    period: "Nov 2023 - May 2024",
    points: [
      "Led two client projects end to end and delivered RAG pipelines, data mining scripts, and Python scraping tools that cut manual research effort.",
      "Designed secure REST APIs and collaborated across distributed teams using GitHub, Jira, and Agile delivery practices.",
    ],
  },
];

export const projects = [
  {
    name: "ARCA",
    tag: "Open-source AI agent runtime",
    description:
      "A platform turning natural language into deployed agents in under a minute, with a builder layer, runtime workers, semantic memory, and a CLI-first developer interface.",
    stack: ["LangGraph", "PostgreSQL", "pgvector", "Redis", "Docker", "Celery"],
  },
  {
    name: "Voice With RAG",
    tag: "Voice-first multi-agent assistant",
    description:
      "A FastAPI system with route-aware agents, token-level WebSocket streaming, PDF ingestion, semantic chunking, Qdrant retrieval, and live search augmentation.",
    stack: ["FastAPI", "LangGraph", "Qdrant", "Ollama", "WebSockets", "Tavily"],
  },
];

export const roleSpotlights = [
  {
    title: "AI Engineer",
    detail:
      "I design and ship production AI systems with multi-agent workflows, RAG pipelines, semantic memory, model routing, and Human-in-the-Loop controls for reliability.",
  },
  {
    title: "Backend Engineer",
    detail:
      "My backend work covers PostgreSQL design, Redis, Celery, AWS deployment, service orchestration, performance optimization, and production observability.",
  },
  {
    title: "FastAPI Developer",
    detail:
      "I build FastAPI backends with async execution, streaming responses, WebSockets, task queues, authentication flows, and scalable API architecture for real products.",
  },
  {
    title: "Python Developer",
    detail:
      "I use Python for APIs, agent runtimes, data pipelines, automation, retrieval systems, and maintainable backend services that are ready for production.",
  },
  {
    title: "Software Engineer",
    detail:
      "I take products from idea to deployment by combining software engineering discipline with strong AI implementation, clear system design, and practical delivery speed.",
  },
  {
    title: "Software Developer",
    detail:
      "I build full product experiences across APIs, integrations, workflows, and frontend/backend collaboration so teams can ship useful software faster.",
  },
];

export const skills = {
  languages: ["Python", "JavaScript", "C++"],
  frameworks: ["FastAPI", "LangChain", "LangGraph", "Next.js", "Django", "DRF"],
  ai: ["RAG Pipelines", "Multi-Agent Systems", "MCP Servers", "HITL Workflows", "LangSmith"],
  data: ["PostgreSQL", "pgvector", "Qdrant", "MongoDB", "MySQL"],
  infra: ["Docker", "AWS", "Redis", "Celery", "System Design", "GitHub"],
};

export const education = {
  degree: "Bachelor of Technology in Computer Science and Engineering",
  period: "2020 - 2024",
  detail: "CGPA: 7.6",
};
