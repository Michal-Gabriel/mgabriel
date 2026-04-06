import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "About",      num: "01", href: "#about" },
  { label: "Experience", num: "02", href: "#experience" },
  { label: "Contact",    num: "03", href: "#contact" },
];

const SKILLS = [
  "SQL / BigQuery",
  "Python",
  "PowerBI / Tableau",
  "Google Analytics",
  "Mixpanel / Amplitude",
  "A/B Testing & Experiments",
  "Adobe Analytics",
  "Airflow / Hadoop",
  "Excel / VBA",
  "SAS / 4GL",
];

const JOBS = [
  {
    company: "Docplanner",
    url: "https://docplanner.com",
    roles: [
      {
        title: "Senior Product Data Analyst",
        period: "Jul 2022 – Present",
        bullets: [
          "Docplanner is one of the first Polish unicorns — the world's largest healthcare marketplace, operating in 13 countries and serving 90M+ patients monthly.",
          "Shape product strategy with data-driven insights, define main metrics and map customer journeys.",
          "Work with higher management and researchers to create and validate hypotheses from both qualitative and quantitative perspectives.",
          "Lead experiments and A/B tests to accelerate product adoption, retention, engagement, and monetization.",
        ],
      },
      {
        title: "Interim Product Manager",
        period: "Jan 2024 – Apr 2024",
        bullets: [
          "Established and led a new product team focused on driving monetization from freemium to premium.",
          "Increased registration conversion rate by 23% through targeted A/B testing and optimization experiments.",
        ],
      },
    ],
  },
  {
    company: "ING Bank",
    url: "https://ing.pl",
    roles: [
      {
        title: "Senior Data Analyst",
        period: "Jan 2020 – Jun 2022",
        bullets: [
          "Complex analysis of the bank's Self-Employed Clients segment: statistics, profiles, profitability, sales trends, CRM and customer behaviour.",
          "Used data to support business development, key decisions and strategy in cooperation with stakeholders.",
          "Tools: SAS (4GL & SQL), PowerBI, Microsoft Excel, Python, Hadoop, Adobe Analytics.",
        ],
      },
      {
        title: "Data Analyst",
        period: "Nov 2018 – Dec 2019",
        bullets: [
          "Quantitative analysis of customer behaviour: statistics, profiles, segmentation and product usage patterns.",
          "Prepared ongoing dashboards on marketing communication effectiveness.",
        ],
      },
      {
        title: "Customer Journey Intern",
        period: "Dec 2017 – Oct 2018",
        bullets: [
          "Supported implementation of new mobile payment products: Google Pay, Apple Pay, BLIK P2P.",
          "Analyzed customer web behaviour with Adobe Analytics and prepared marketing communication materials.",
        ],
      },
    ],
  },
  {
    company: "Mate Academy",
    url: "https://mate.academy",
    roles: [
      {
        title: "Data Analytics Instructor",
        period: "Apr 2025 – Present",
        bullets: [
          "Creating educational content for a Data Analytics course designed to help students launch their careers in IT.",
          "Recording video courses covering Tableau, Excel, Google Sheets, and A/B Testing.",
        ],
      },
    ],
  },
  {
    company: "Rava Consulting",
    url: "#",
    roles: [
      {
        title: "Co-Founder",
        period: "Sep 2018 – Aug 2020",
        bullets: [
          "Co-founded a market research organization bridging academia and the business world (Junior Enterprise concept).",
          "Coordinated projects from idea to delivery and managed a team of 10 people.",
        ],
      },
    ],
  },
];

const PROJECTS = [
  {
    title: "Product Analytics at Docplanner",
    description:
      "Led data-driven product decisions across 13 markets for the world's largest healthcare marketplace. Defined core metrics, built customer journey maps, and ran A/B experiments that measurably improved conversion and retention.",
    tags: ["BigQuery", "SQL", "Python", "Mixpanel", "Amplitude", "AVO"],
    links: [],
  },
  {
    title: "+23% Registration Conversion",
    description:
      "As Interim PM, led an experiment-first initiative to move the SaaS product from freemium to premium. Designed and executed A/B tests that increased registration conversion rate by 23% within a single quarter.",
    tags: ["A/B Testing", "VWO", "Product Management", "Funnel Analysis"],
    links: [],
  },
  {
    title: "ING Self-Employed Segment Analytics",
    description:
      "Built a comprehensive analytics system covering profitability, behavioural segmentation, and CRM effectiveness for ING Bank's Self-Employed Clients segment, enabling data-backed strategic decisions.",
    tags: ["SAS", "SQL", "PowerBI", "Hadoop", "Python"],
    links: [],
  },
  {
    title: "Data Analytics Curriculum",
    description:
      "Designed and recorded a full Data Analytics course at Mate Academy to help career-changers break into IT, covering Tableau, Excel, Google Sheets, and statistical A/B testing fundamentals.",
    tags: ["Tableau", "Excel", "Google Sheets", "A/B Testing", "Education"],
    links: [],
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconFolder = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconExternal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconLinkedIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconMail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconGitHub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// ── Fade-in wrapper ───────────────────────────────────────────────────────────

function AnimatedItem({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 flex items-center justify-between"
        style={{
          height: scrolled ? "60px" : "80px",
          backgroundColor: scrolled ? `hsl(220 43% 11% / 0.95)` : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 10px 30px -10px hsl(220 43% 5% / 0.7)" : "none",
          transition: "height 0.3s, background-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="relative flex items-center justify-center w-10 h-10 border border-teal rounded text-teal font-mono text-lg font-bold transition-all duration-200 hover:bg-teal/10"
        >
          MG
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
              onClick={() => scrollTo(item.href)}
              className="nav-item"
            >
              <span className="nav-number">{item.num}.</span>
              {item.label}
            </motion.button>
          ))}
          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: NAV_ITEMS.length * 0.1 + 0.3, duration: 0.4 }}
            href="https://www.linkedin.com/in/mkgabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="teal-btn ml-4"
          >
            LinkedIn
          </motion.a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-teal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-teal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-teal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: "hsl(222 41% 14%)" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="flex flex-col items-center gap-1 text-slate-lightest text-xl"
                >
                  <span className="font-mono text-teal text-sm">{item.num}.</span>
                  {item.label}
                </button>
              ))}
              <a
                href="https://www.linkedin.com/in/mkgabriel"
                target="_blank"
                rel="noopener noreferrer"
                className="teal-btn mt-4"
              >
                LinkedIn
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="min-h-[68vh] flex flex-col justify-center px-6 md:px-16 lg:px-32 max-w-5xl mx-auto"
      style={{ paddingTop: "80px" }}
    >
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="font-mono text-teal mb-5 text-base">
        Hi, my name is
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-5xl md:text-7xl font-bold text-slate-lightest leading-tight mb-3">
        Michał Gabriel.
      </motion.h1>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-4xl md:text-6xl font-bold leading-tight mb-8" style={{ color: "hsl(var(--slate))" }}>
        I turn data into decisions.
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-base md:text-lg leading-relaxed max-w-xl mb-12" style={{ color: "hsl(var(--slate))" }}>
        I work with startups and scale-ups that want their data to actually drive decisions — not just fill dashboards. You always know what's working, what isn't, and what to do next.
      </motion.p>

      {/* Social sidebar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="hidden md:flex fixed left-8 bottom-0 flex-col items-center gap-5 after:block after:w-px after:h-24 after:mt-5"
        style={{ "--tw-after-bg": "hsl(var(--slate))", color: "hsl(var(--slate))" } as React.CSSProperties}
      >
        <div className="flex flex-col gap-5 items-center">
          <a href="https://www.linkedin.com/in/mkgabriel" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <IconLinkedIn />
          </a>
          <a href="mailto:michal.gabriel3@gmail.com" className="social-link" aria-label="Email">
            <IconMail />
          </a>
          <a href="#" className="social-link" aria-label="GitHub">
            <IconGitHub />
          </a>
        </div>
        <div className="w-px h-24 mt-2" style={{ backgroundColor: "hsl(var(--slate))" }} />
      </motion.div>

      {/* Email sidebar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="hidden md:flex fixed right-8 bottom-0 flex-col items-center gap-5"
      >
        <a
          href="mailto:michal.gabriel3@gmail.com"
          className="social-link font-mono text-xs tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          michal.gabriel3@gmail.com
        </a>
        <div className="w-px h-24 mt-2" style={{ backgroundColor: "hsl(var(--slate))" }} />
      </motion.div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">01.</span> About Me
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-4 text-base leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
          <FadeIn delay={0.1}>
            <>
              <p>
                My journey started at <a href="https://ing.pl" target="_blank" rel="noopener noreferrer" className="inline-link">ING Bank</a>, where I spent 4+ years analysing customer segments, CRM campaigns, and behavioural patterns.
              </p>
              <br />
            </>
            <p>
              I then moved into product analytics at{" "}
              <a href="https://docplanner.com" target="_blank" rel="noopener noreferrer" className="inline-link">Docplanner</a>
              {" "}— a Polish unicorn — where I work at the intersection of data and product strategy. I also briefly stepped into a <span style={{ color: "hsl(var(--slate-lightest))" }}>Product Manager</span> role, leading an experiment-driven team that boosted registration conversion by 23%.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              I'm also creating Data Analytics courses at{" "}
              <a href="https://mate.academy" target="_blank" rel="noopener noreferrer" className="inline-link">Mate Academy</a>.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p>Here are some technologies I work with:</p>
            <ul className="grid grid-cols-2 gap-1 mt-4 skill-list">
              {SKILLS.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </FadeIn>
        </div>

        {/* Avatar placeholder */}
        <FadeIn delay={0.3} className="md:col-span-2 flex justify-center md:justify-end">
          <div className="relative w-56 h-56 md:w-64 md:h-64 group">
            <div
              className="absolute inset-0 rounded border-2 border-teal translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3"
              style={{ zIndex: 0 }}
            />
            <div
              className="relative w-full h-full rounded overflow-hidden"
              style={{ zIndex: 1, backgroundColor: "hsl(var(--navy-lighter))" }}
            >
              <div
                className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                style={{ backgroundColor: "hsl(var(--teal) / 0.2)" }}
              />
              <div className="w-full h-full flex items-center justify-center font-bold text-6xl"
                style={{ color: "hsl(var(--teal))" }}
              >
                MG
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────

function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const job = JOBS[activeTab];

  return (
    <section id="experience" className="py-24 px-6 md:px-16 lg:px-32 max-w-4xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">02.</span> Where I've Worked
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-0">
        {/* Tab list */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible sm:min-w-[160px] border-b sm:border-b-0 sm:border-l-0" style={{ borderColor: "hsl(var(--navy-lighter))" }}>
          {JOBS.map((j, i) => (
            <button
              key={j.company}
              className={`tab-btn ${activeTab === i ? "active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {j.company}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 sm:pl-8 pt-4 sm:pt-0"
          >
            <div className="space-y-10">
              {job.roles.map((role) => (
                <div key={`${job.company}-${role.title}`}>
                  <h3 className="text-xl font-medium" style={{ color: "hsl(var(--slate-lightest))" }}>
                    {role.title}
                  </h3>
                  <p className="font-mono text-sm mt-1 mb-5" style={{ color: "hsl(var(--slate))" }}>
                    {role.period}
                  </p>
                  <ul className="space-y-3">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
                        <span className="text-teal mt-0.5 shrink-0">▹</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </FadeIn>
    </section>
  );
}

// ── Work / Projects ───────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" className="py-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">03.</span> Some Things I've Done
        </h2>
      </FadeIn>

      <div className="grid sm:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.title} delay={i * 0.1}>
            <div className="project-card">
              <div className="flex items-start justify-between mb-6">
                <IconFolder />
                <div className="flex gap-3">
                  <IconExternal />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-3 transition-colors duration-200 hover:text-teal" style={{ color: "hsl(var(--slate-lightest))" }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "hsl(var(--slate))" }}>
                {p.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {p.tags.map((tag) => (
                  <span key={tag} className="font-mono text-xs" style={{ color: "hsl(var(--slate-light))" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="pt-14 pb-24 px-6 text-center max-w-xl mx-auto">
      <FadeIn>
        <p className="font-mono text-teal text-sm mb-4">03. What's Next?</p>
        <h2 className="text-5xl font-bold mb-6" style={{ color: "hsl(var(--slate-lightest))" }}>
          Get In Touch
        </h2>
        <p className="mb-12 leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
          I'm always open to interesting conversations, collaborations, or new opportunities. Whether you have a question or just want to say hi — my inbox is open!
        </p>
        <a href="https://www.linkedin.com/in/mkgabriel/" target="_blank" rel="noreferrer" className="teal-btn text-base px-8 py-4">
          Say Hello
        </a>
      </FadeIn>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="pb-8 text-center">
      <div className="flex justify-center gap-6 mb-6 md:hidden">
        <a href="https://www.linkedin.com/in/mkgabriel" target="_blank" rel="noopener noreferrer" className="social-link"><IconLinkedIn /></a>
        <a href="mailto:michal.gabriel3@gmail.com" className="social-link"><IconMail /></a>
        <a href="#" className="social-link"><IconGitHub /></a>
      </div>
      <p className="font-mono text-xs" style={{ color: "hsl(var(--slate))" }}>
        Designed with inspiration from{" "}
        <a href="https://v4.brittanychiang.com" target="_blank" rel="noopener noreferrer" className="inline-link">Brittany Chiang</a>
        {" "}· Built by Michał Gabriel
      </p>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div style={{ backgroundColor: "hsl(var(--navy))" }} className="min-h-screen">
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <Experience />
        
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
