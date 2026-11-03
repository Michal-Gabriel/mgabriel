import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "About",           num: "1", href: "#about" },
  { label: "Success Stories", num: "2", href: "#success-stories" },
  { label: "Experience",      num: "3", href: "#experience" },
  { label: "Contact",         num: "4", href: "#contact" },
];

const PROOF = [
  { before: "33%", after: "70%", label: "Business questions answered correctly" },
  { before: "11",  after: "103", label: "People using data each month, out of 170" },
];

const SKILLS = [
  "SQL / Redshift / BigQuery",
  "dbt",
  "Python",
  "Airflow",
  "Dimensional modelling",
  "A/B Testing & Experiments",
  "Mixpanel / Amplitude",
  "Tableau / PowerBI",
];

const JOBS = [
  {
    company: "edrone",
    url: "https://www.linkedin.com/company/edrone",
    roles: [
      {
        title: "Data Lead",
        period: "Jan 2026 – Present",
        bullets: [
          "I own analytics across the company: what gets measured, what each number means, and who decides from it.",
          "Rebuilt the architecture into a gold layer — one definition per business concept. Correct answers to a fixed set of business questions went from 33% to 70%.",
          "Moved reporting off Tableau onto a tool we built, open to anyone in the company. Monthly users went from 11 to 103, out of 170 people.",
          "Run the product-led growth work: finding where activation, adoption and retention break, and turning that into experiments.",
          "Doubled registration conversion, from 6.5% to 13% in four months, across four changes measured one at a time — so we knew which of them did the work.",
          "Teach developers, designers and team leads to agree on a success metric before they build, and to check it afterwards.",
        ],
      },
    ],
  },
  {
    company: "Docplanner",
    url: "https://www.linkedin.com/company/docplannergroup",
    roles: [
      {
        title: "Senior Product Data Analyst",
        period: "Jul 2022 – Jan 2026",
        bullets: [
          "Docplanner is one of Poland's first unicorns — the world's largest healthcare marketplace, in 13 countries, serving 90M+ patients a month.",
          "Worked with product directors and PMs on strategy and KPIs, and on keeping one metric meaning one thing across teams.",
          "Designed and read A/B experiments on adoption, retention and monetisation.",
          "Mapped and ranked what Customer Success did for doctors, then shaped and measured the hint engine that took the simple half over: 15x the reach of the team, 5x the conversions, around €1M of workload.",
          "Ran the onboarding experiment that removed the CS call. Self-service setup went from 16% to 54% — and the quality drop underneath it is why the meeting stayed.",
          "Paired the numbers with user research, so a hypothesis had to survive both.",
        ],
      },
      {
        title: "Interim Product Manager",
        period: "Dec 2023 – Apr 2024",
        bullets: [
          "Built and led a new product team working on freemium-to-premium conversion.",
          "Raised registration conversion by 23% through a structured run of A/B experiments.",
        ],
      },
    ],
  },
  {
    company: "ING Bank",
    url: "https://www.linkedin.com/company/ingpolska",
    roles: [
      {
        title: "Senior Data Analyst",
        period: "Jan 2020 – Jun 2022",
        bullets: [
          "Ran analytics for the Self-Employed segment: profitability, sales trends, CRM performance, behaviour.",
          "Built the personalised offer datasets the sales network worked from — they carried 16% of credit sales during Covid.",
          "Automated the recurring reports and gave the team back 30 hours a month.",
          "Supported the CRM rollout to roughly 300 salespeople.",
        ],
      },
      {
        title: "Data Analyst",
        period: "Nov 2018 – Dec 2019",
        bullets: [
          "Quantitative work on how customers actually behaved: segmentation, product usage, marketing effectiveness.",
          "Built and kept the dashboards tracking marketing communication.",
        ],
      },
      {
        title: "Intern",
        period: "Dec 2017 – Oct 2018",
        bullets: [
          "Helped ship Google Pay, Apple Pay and BLIK P2P to ING customers.",
          "Analysed web behaviour in Adobe Analytics and prepared marketing material.",
        ],
      },
    ],
  },
  {
    company: "Mate Academy",
    url: "https://www.linkedin.com/school/mateacademy/",
    roles: [
      {
        title: "Data Analytics Instructor",
        period: "Apr 2025 – Present",
        bullets: [
          "Teach A/B testing and product analytics to people with no technical background — translating experiment design and metrics into language a non-analyst can act on.",
          "Built the Data Analytics course for people changing careers into IT, and recorded its video modules: Tableau, Excel and Google Sheets.",
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
          "Co-founded a market research outfit connecting university and business — the Junior Enterprise model.",
          "Ran projects end to end and managed a team of 10.",
        ],
      },
    ],
  },
];

// ── Icons ─────────────────────────────────────────────────────────────────────

const IconLinkedIn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ── Fade-in wrapper ───────────────────────────────────────────────────────────

function AnimatedItem({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
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
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: scrolled ? "68px" : "96px",
          backgroundColor: scrolled ? "hsl(var(--surface) / 0.86)" : "transparent",
          backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "none",
          borderBottom: scrolled ? "1px solid hsl(var(--rule))" : "1px solid transparent",
          transition: "height 0.4s, background-color 0.4s, border-color 0.4s",
        }}
      >
        <div className="w-full h-full px-6 md:px-10 lg:px-14 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="relative flex items-center justify-center w-11 h-11 border text-teal font-display text-xl transition-all duration-300 hover:bg-teal/10"
          style={{ borderColor: "hsl(var(--bronze) / 0.55)", borderRadius: "1px", letterSpacing: "0.06em" }}
        >
          MG
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
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
          className="lg:hidden flex flex-col gap-2 p-2 z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-7 h-px bg-teal transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-7 h-px bg-teal transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-7 h-px bg-teal transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
        </div>
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
            style={{ backgroundColor: "hsl(var(--surface))" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="flex flex-col items-center gap-2 text-slate-lightest font-display text-3xl"
                >
                  <span className="label text-teal">{item.num}</span>
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

function ProofBar() {
  return (
    <motion.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="proof-bar"
    >
      {PROOF.map((p) => (
        <div key={p.label} className="proof-item">
          <dt className="proof-pair">
            <span className="proof-before">{p.before}</span>
            <span className="proof-arrow" aria-hidden="true">→</span>
            <span className="proof-after">{p.after}</span>
          </dt>
          <dd className="proof-label">{p.label}</dd>
        </div>
      ))}
    </motion.dl>
  );
}

function Hero() {
  return (
    <section
      className="flex flex-col justify-center px-6 pt-36 pb-14 md:px-16 md:pt-48 md:pb-24 lg:px-32 max-w-6xl mx-auto"
    >
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="label text-teal mb-8 flex items-center gap-4">
        <span className="inline-block w-10 h-px" style={{ backgroundColor: "hsl(var(--bronze) / 0.7)" }} aria-hidden="true" />
        Michał Gabriel · Fractional Head of Data
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[2.35rem] md:text-[3.5rem] lg:text-[4rem] text-slate-lightest mb-5" style={{ fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.025em" }}>
        Ask the same question twice. Get two different answers.
      </motion.h1>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[1.45rem] md:text-[2.2rem] lg:text-[2.5rem] mb-12" style={{ color: "hsl(var(--text-muted))", fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
        Until that stops, every decision is a guess with a chart attached.
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="text-base md:text-lg max-w-2xl mb-2" style={{ color: "hsl(var(--text))", fontWeight: 300, lineHeight: 1.9 }}>
        I rebuild what sits under the reports, so one figure means one thing across the company — then prove it, by putting the same questions to the same AI before and after. At edrone:
      </motion.p>

      <ProofBar />


    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-14 md:py-24 px-6 md:px-16 lg:px-32 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">1.</span> About Me
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-5 gap-10 items-start">
        <div className="md:col-span-3 space-y-5 text-base leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
          <FadeIn delay={0.1}>
            <p>
              Eight years of making data usable. I started at{" "}
              <a href="https://www.linkedin.com/company/ingpolska" target="_blank" rel="noopener noreferrer" className="inline-link">ING Bank</a>, moved into product analytics at{" "}
              <a href="https://www.linkedin.com/company/docplannergroup" target="_blank" rel="noopener noreferrer" className="inline-link">Docplanner</a>, one of Poland's first unicorns, and today lead data at{" "}
              <a href="https://www.linkedin.com/company/edrone" target="_blank" rel="noopener noreferrer" className="inline-link">edrone</a>.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p>
              I keep meeting the same problem. The company has the data. It has the warehouse, the licences, the dashboards. And nobody trusts the number enough to act on it — because the same question, asked twice in two places, comes back with two different answers.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p>
              That used to be survivable. An analyst always knew which table was the right one. It stopped being survivable the moment companies pointed AI at the warehouse and started reading the answers directly. Bad data no longer waits to be interpreted — it just answers.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p>
              So I fix the layer underneath, and — this is the part most people skip — I measure whether it worked. Then I put it to use: product analytics, experiments, activation and retention — the half of the job that only becomes possible once the numbers hold. I spent three and a half years on that half at Docplanner, across 13 markets. I also teach data analytics at{" "}
              <a href="https://www.linkedin.com/school/mateacademy/" target="_blank" rel="noopener noreferrer" className="inline-link">Mate Academy</a>.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p>Tools I work with day to day:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1 mt-4 skill-list">
              {SKILLS.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </FadeIn>
        </div>

        {/* Profile image */}
        <FadeIn delay={0.3} className="order-first md:order-none mb-10 md:mb-0 md:col-span-2 flex justify-center md:justify-end md:pt-2">
          <div className="portrait relative w-60 h-60 md:w-full md:max-w-[19rem] md:h-auto md:aspect-square group">
            <div
              className="absolute inset-0 translate-x-5 translate-y-5 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"
              style={{ zIndex: 0, border: "1px solid hsl(var(--bronze) / 0.65)", borderRadius: "1px" }}
            />
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ zIndex: 1, backgroundColor: "hsl(var(--surface-raised))", borderRadius: "1px", boxShadow: "0 36px 70px -48px hsl(30 25% 35% / 0.5)" }}
            >
              <picture>
                <source type="image/webp" srcSet={`${import.meta.env.BASE_URL}profile-512.webp`} />
              <img
                src={`${import.meta.env.BASE_URL}profile-512.jpg`}
                loading="lazy"
                decoding="async"
                alt="Michał Gabriel"
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
              </picture>
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
  const [verticalTabs, setVerticalTabs] = useState(() => window.matchMedia("(min-width: 640px)").matches);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const updateOrientation = () => setVerticalTabs(query.matches);
    query.addEventListener("change", updateOrientation);
    return () => query.removeEventListener("change", updateOrientation);
  }, []);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let nextTab: number;
    switch (event.key) {
      case "ArrowUp":
      case "ArrowLeft": nextTab = (activeTab - 1 + JOBS.length) % JOBS.length; break;
      case "ArrowDown":
      case "ArrowRight": nextTab = (activeTab + 1) % JOBS.length; break;
      case "Home": nextTab = 0; break;
      case "End": nextTab = JOBS.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActiveTab(nextTab);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextTab]?.focus();
  };

  return (
    <section id="experience" className="py-14 md:py-24 px-6 md:px-16 lg:px-32 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">3.</span> Where I've Worked
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-0">
        {/* Tab list */}
        <div role="tablist" aria-label="Companies" aria-orientation={verticalTabs ? "vertical" : "horizontal"} onKeyDown={onTabKeyDown} className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible sm:min-w-[150px] border-b sm:border-b-0 sm:border-l-0" style={{ borderColor: "hsl(var(--navy-lighter))" }}>
          {JOBS.map((j, i) => (
            <button
              key={j.company}
              role="tab"
              id={`tab-${i}`}
              aria-controls={`panel-${i}`}
              aria-selected={activeTab === i}
              tabIndex={activeTab === i ? 0 : -1}
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
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 sm:pl-10 pt-4 sm:pt-0"
          >
            <div className="space-y-10">
              {job.roles.map((role) => (
                <div key={`${job.company}-${role.title}`}>
                  <h3 className="font-display text-3xl" style={{ color: "hsl(var(--text-strong))", fontWeight: 400, letterSpacing: "-0.015em" }}>
                    {role.title}
                  </h3>
                  <p className="label mt-3 mb-6" style={{ color: "hsl(var(--text-muted))" }}>
                    {role.period}
                  </p>
                  <ul className="space-y-3">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex gap-4 text-sm" style={{ color: "hsl(var(--text))", fontWeight: 300, lineHeight: 1.85 }}>
                        <span className="rule-bullet" aria-hidden="true" />
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

// ── Success Stories ──────────────────────────────────────────────────────────

const STORIES = [
  {
    eyebrow: "edrone · Data quality",
    title: "From Data Bottleneck to Company-Wide Access",
    lead: "A company of 170. A reporting tool only eleven people opened. In four months, data went from one team's resource to something more than half the company actually used.",
    hook: "But getting people to open a dashboard wasn't the first problem we had to solve. The bigger one was invisible.",
    slug: "eleven-out-of-170",
  },
  {
    eyebrow: "edrone · Product-led growth",
    title: "Doubling Registration Conversion",
    lead: "From 6.5% to 13% in four months, across four changes — each one measured on its own, so we knew which of them actually did the work.",
    hook: "Removing friction worked first, then stopped working. The number pointed somewhere our instinct did not.",
    slug: "doubling-registration-conversion",
  },
  {
    eyebrow: "Docplanner · Activation",
    title: "Tripling Self-Service, and Keeping the Call Anyway",
    lead: "Doctors completed the setup three times more often when no one was coming to help them. From 16% to 54%, by removing something rather than building something.",
    hook: "The hypothesis held and the bar was still missed. What the product couldn't take over turned out to be the more useful finding.",
    slug: "self-service-onboarding",
  },
  {
    eyebrow: "Docplanner · Product automation",
    title: "Fifteen Times the Reach of a Phone Call",
    lead: "A third of the conversion rate of a human being, fifteen times the reach — and five times the result. Around €1M of customer success work the product took over.",
    hook: "The whole decision turned on which number we were reading. And on being clear about where the people still won.",
    slug: "automating-customer-success",
  },
];

function SuccessStories() {
  return (
    <section id="success-stories" className="py-14 md:py-24 pb-20 md:pb-28 px-6 md:px-16 lg:px-32 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">2.</span> Success Stories
        </h2>
        <div className="success-stories-grid">
          {STORIES.map((story, i) => (
            <FadeIn key={story.slug} delay={i * 0.08}>
              <article className="story-preview">
                <div className="story-preview-head">
                  <div className="story-meta">
                    <span className="story-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <p className="story-eyebrow">{story.eyebrow}</p>
                  </div>
                  <h3>{story.title}</h3>
                </div>
                <div className="story-preview-body">
                  <p className="text-slate-light">{story.lead}</p>
                  <p className="text-slate-lightest">{story.hook}</p>
                  <a className="read-link" href={`${import.meta.env.BASE_URL}success-stories/${story.slug}/`}>
                    Read the full story <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}


// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="pt-14 md:pt-24 pb-24 md:pb-36 px-6 md:px-16 lg:px-32 max-w-6xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">4.</span> What's Next?
        </h2>
        <p className="mb-12 max-w-2xl" style={{ color: "hsl(var(--text))", fontWeight: 300, lineHeight: 1.9 }}>
          Tell me the number your company argues about most — the one that comes back different depending on who you ask. Thirty minutes is usually enough to tell whether I can help, and I'll say so either way.
        </p>
        <div className="contact-actions">
          <a href="https://www.linkedin.com/in/mkgabriel/" target="_blank" rel="noopener noreferrer" className="teal-btn">
            Say Hello
          </a>
          <a href={`${import.meta.env.BASE_URL}michal-gabriel-cv.pdf`} target="_blank" rel="noopener noreferrer nofollow" className="ghost-btn">
            Download CV
          </a>
        </div>
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
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Index() {
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <div style={{ backgroundColor: "hsl(var(--navy))" }} className="min-h-screen">
      <Navbar />
      <main id="content">
        <Hero />
        <About />
        <SuccessStories />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
