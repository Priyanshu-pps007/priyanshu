import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/app/components/contact-form";
import { ScrollAnimations } from "@/app/components/scroll-animations";
import {
  education,
  experiences,
  expertise,
  highlights,
  hiringSignals,
  navigation,
  projects,
  recruiterCards,
  roleSpotlights,
  siteConfig,
  siteUrl,
  skills,
} from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}#person`,
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  alternateName: [siteConfig.shortName],
  description: siteConfig.description,
  mainEntityOfPage: siteUrl,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  image: `${siteUrl}${siteConfig.portrait}`,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressCountry: siteConfig.countryCode,
  },
  knowsAbout: siteConfig.keywords,
  hasOccupation: siteConfig.primaryRoles.map((role) => ({
    "@type": "Occupation",
    name: role,
  })),
  sameAs: [siteUrl],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  alternateName: siteConfig.alternateSiteNames,
  url: siteUrl,
  description: siteConfig.description,
  inLanguage: "en-IN",
  publisher: {
    "@id": `${siteUrl}#person`,
  },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteUrl,
  mainEntity: {
    "@id": `${siteUrl}#person`,
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${siteConfig.name} Portfolio`,
  image: `${siteUrl}${siteConfig.portrait}`,
  url: siteUrl,
  description: siteConfig.description,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: siteConfig.countryCode,
  },
  email: siteConfig.email,
  telephone: siteConfig.phone,
  serviceType: [
    "AI engineering",
    "Backend engineering",
    "FastAPI development",
    "Software engineering",
    "Python development",
    "LLM application development",
  ],
  provider: {
    "@id": `${siteUrl}#person`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who is Priyanshu Pratap Singh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Priyanshu Pratap Singh is an AI engineer in India and backend engineer who builds production AI systems, FastAPI services, RAG pipelines, and multi-agent platforms.",
      },
    },
    {
      "@type": "Question",
      name: "What does Priyanshu Pratap Singh specialize in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "He specializes in AI engineering, FastAPI backend development, LLM orchestration, LangGraph workflows, semantic retrieval, vector databases, and scalable software architecture.",
      },
    },
    {
      "@type": "Question",
      name: "Is Priyanshu Pratap Singh available for AI or backend projects?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. He works on AI product engineering, backend systems, FastAPI services, RAG applications, and software architecture projects.",
      },
    },
    {
      "@type": "Question",
      name: "Is Priyanshu Pratap Singh a Python developer and FastAPI developer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. He builds Python backends, FastAPI services, agent runtimes, async APIs, background jobs, and scalable software systems for production use.",
      },
    },
    {
      "@type": "Question",
      name: "What software engineering work does Priyanshu Pratap Singh do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "He works across AI engineering, backend engineering, software architecture, integrations, retrieval systems, and full software delivery from idea to deployment.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="portfolio-shell">
      <ScrollAnimations />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="hero-stage viewport-panel" data-animate-section data-hero-stage>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow" data-animate-child>
              AI Engineer in India • FastAPI • Multi-Agent Systems
            </p>
            <div className="hero-status-row" data-animate-child>
              <span className="status-pill">Backend/AI engineer</span>
              <span className="status-pill subtle">Product teams • Startups • Applied AI</span>
            </div>
            <nav className="top-nav" aria-label="Section navigation" data-animate-child>
              {navigation.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <h1 data-animate-child>{siteConfig.name}</h1>
            <h2 className="hero-title-support" data-animate-child>
              {siteConfig.expertiseTitle}
            </h2>
            <p className="hero-lead" data-animate-child>
              I build production AI systems and scalable backend platforms that move from idea to
              reliable deployment fast.
            </p>
            <div className="hero-summary-grid">
              <article className="hero-summary-card" data-animate-child>
                <h3>AI systems</h3>
                <p>Multi-agent workflows, RAG pipelines, semantic memory, and MCP tooling.</p>
              </article>
              <article className="hero-summary-card" data-animate-child>
                <h3>Backend delivery</h3>
                <p>FastAPI, async APIs, streaming services, PostgreSQL, Redis, and Celery.</p>
              </article>
              <article className="hero-summary-card" data-animate-child>
                <h3>Production mindset</h3>
                <p>Built for reliability, speed, maintainability, and real product deployment.</p>
              </article>
            </div>
            <p className="hero-seo-copy" data-animate-child>
              {siteConfig.seoIntro}
            </p>
            <div className="hero-actions" data-animate-child>
              <a className="primary-button" href="#contact">
                Hire me for AI and backend work
              </a>
              <a className="ghost-button" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </div>
            <p className="hero-note" data-animate-child>
              Searching for Priyanshu Pratap Singh, AI engineer, software engineer, backend
              engineer, FastAPI developer, or Python developer? This portfolio is built to make
              that fit immediately clear.
            </p>
            <div className="metric-row">
              {highlights.map((item) => (
                <div key={item.label} className="metric-card" data-animate-child>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="signal-row">
              {hiringSignals.map((signal) => (
                <span key={signal} className="signal-chip" data-animate-child>
                  {signal}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual" data-hero-media data-animate-child>
            <article className="floating-card card-left" data-float-card>
              <span>Currently shipping</span>
              <strong>Agent runtimes, FastAPI systems, and retrieval workflows</strong>
            </article>
            <div className="portrait-frame">
              <div className="portrait-orbit orbit-one" data-orbit />
              <div className="portrait-orbit orbit-two" data-orbit />
              <Image
                src={siteConfig.portrait}
                alt="Priyanshu Pratap Singh portrait"
                width={768}
                height={1365}
                priority
                sizes="(max-width: 1024px) 84vw, 34rem"
              />
            </div>
            <article className="floating-card card-right" data-float-card>
              <span>Best fit</span>
              <strong>AI engineer, backend engineer, and Python developer roles</strong>
            </article>
          </div>
        </div>
        <div className="hero-strip">
          {expertise.map((item) => (
            <article key={item} className="hero-strip-card" data-animate-child>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block viewport-panel" id="expertise" data-animate-section>
        <div className="section-heading">
          <p className="eyebrow" data-animate-child>
            Why teams reach out
          </p>
          <h2 data-animate-child>Software engineering depth with an AI systems mindset</h2>
        </div>
        <div className="expertise-layout">
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article key={item} className="glass-panel" data-animate-child>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="mini-card-grid">
            {recruiterCards.map((card) => (
              <article key={card.title} className="mini-skill-card" data-animate-child>
                <p className="mini-card-label">{card.title}</p>
                <h3>{card.value}</h3>
                <p>{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block viewport-panel" id="experience" data-animate-section>
        <div className="section-heading">
          <p className="eyebrow" data-animate-child>
            Experience
          </p>
          <h2 data-animate-child>Building AI products that hold up in production</h2>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <article key={item.company} className="timeline-card" data-animate-child>
              <div className="timeline-head">
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <span>{item.period}</span>
              </div>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block viewport-panel" id="hire-me" data-animate-section>
        <div className="section-heading">
          <p className="eyebrow" data-animate-child>
            Why hire me
          </p>
          <h2 data-animate-child>Value packaged for recruiters, founders, and engineering teams</h2>
        </div>
        <div className="hire-grid">
          <article className="glass-panel hire-card" data-animate-child>
            <h3>Strong for AI Engineer roles</h3>
            <p>
              Production experience with AI systems, LLM orchestration, RAG pipelines, semantic
              search, and tool-enabled agent workflows.
            </p>
          </article>
          <article className="glass-panel hire-card" data-animate-child>
            <h3>Reliable Backend Engineer profile</h3>
            <p>
              FastAPI, PostgreSQL, async services, Redis, Celery, AWS, and scalable API design
              for customer-facing systems.
            </p>
          </article>
          <article className="glass-panel hire-card" data-animate-child>
            <h3>FastAPI Developer with delivery speed</h3>
            <p>
              Comfortable shipping APIs, streaming endpoints, WebSockets, background jobs, and
              auth-enabled services that are ready for production.
            </p>
          </article>
          <article className="glass-panel hire-card" data-animate-child>
            <h3>Software Engineer who can own 0 to 1</h3>
            <p>
              Able to connect product thinking, engineering execution, and modern AI capabilities
              to help teams move quickly without sacrificing reliability.
            </p>
          </article>
        </div>
      </section>

      <section className="section-block viewport-panel" id="seo-faq" data-animate-section>
        <div className="section-heading">
          <p className="eyebrow" data-animate-child>
            Search-friendly profile
          </p>
          <h2 data-animate-child>
            What I do as an AI engineer, software engineer, and backend engineer in India
          </h2>
          <p className="section-copy" data-animate-child>
            This section covers the role phrases recruiters and founders actually search for, from
            Priyanshu Pratap Singh and AI engineer to backend engineer, FastAPI developer, and
            Python developer.
          </p>
        </div>
        <div className="faq-grid">
          {roleSpotlights.map((role) => (
            <article key={role.title} className="glass-panel" data-animate-child>
              <h3>{role.title}</h3>
              <p>{role.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block viewport-panel" id="projects" data-animate-section>
        <div className="section-heading">
          <p className="eyebrow" data-animate-child>
            Selected work
          </p>
          <h2 data-animate-child>From agent runtimes to voice-first RAG systems</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.name} className="project-card" data-animate-child>
              <p className="project-tag">{project.tag}</p>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="chip-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block viewport-panel" data-animate-section>
        <div className="section-heading">
          <p className="eyebrow" data-animate-child>
            Technical profile
          </p>
          <h2 data-animate-child>Tools I use to ship fast and responsibly</h2>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([group, items]) => (
            <article key={group} className="glass-panel" data-animate-child>
              <h3>{group}</h3>
              <div className="chip-row">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
          <article className="glass-panel education-card" data-animate-child>
            <h3>Education</h3>
            <p>{education.degree}</p>
            <p>{education.institution}</p>
            <p>
              {education.period} • {education.detail}
            </p>
          </article>
        </div>
      </section>

      <section
        className="section-block contact-layout viewport-panel"
        id="contact"
        data-animate-section
      >
        <div className="contact-copy" data-animate-child>
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something sharp, reliable, and hard to ignore</h2>
          <p>{siteConfig.summary}</p>
          <div className="contact-links">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>{siteConfig.phone}</a>
            <span>{siteConfig.location}</span>
          </div>
        </div>
        <div className="glass-panel" data-animate-child>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
