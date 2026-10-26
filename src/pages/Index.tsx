import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "About",           num: "1", href: "#about" },
  { label: "Success Stories", num: "2", href: "#success-stories" },
  { label: "Experience",      num: "3", href: "#experience" },
  { label: "How I Work",      num: "4", href: "#how-i-work" },
  { label: "Contact",         num: "5", href: "#contact" },
];

const PROOF = [
  { before: "33%", after: "70%", label: "Correct answers, same AI" },
  { before: "11",  after: "103", label: "Monthly data users, out of 170" },
];

const STEPS = [
  {
    num: "01",
    title: "Data Trust Check",
    meta: "4–6 weeks · fixed price · stands on its own",
    body: "We take 20–30 questions your business actually asks — the ones you already know the right answers to — and run them against your data as it is today. You get a score. Then the map that explains the score.",
    points: [
      "An evaluation set of 20–30 real business questions, scored against your current data",
      "A map of the competing tables: which number people are reading, and which one is right",
      "A gold-layer plan — one definition per business concept, each with an owner",
      "Scope, sequence and cost of fixing it, so you can decide with a number in hand",
    ],
  },
  {
    num: "02",
    title: "The ongoing seat",
    meta: "1–2 days a week · fractional Head of Data",
    body: "A company of 30–150 rarely needs a Head of Data on payroll. It needs someone who sets the architecture once and then keeps it from drifting back — because it will drift back. That part is a role, not a project.",
    points: [
      "The gold layer built and owned: one place where a number always means the same thing",
      "Access opened past the data team — and adoption measured, not assumed",
      "The same evaluation set re-run each quarter, so the score is something your board can read",
      "Your developers and PMs mentored into keeping it that way after I'm gone",
    ],
  },
  {
    num: "03",
    title: "What the data is for",
    meta: "ongoing · product analytics & experiments",
    body: "Trustworthy numbers were never the point — decisions are. Once a figure is finally worth acting on, the work moves to the product: where people drop out, which change actually moved them, and what is worth keeping.",
    points: [
      "Activation, adoption and retention mapped across the journey — where users stop, and what that costs you",
      "A/B experiments designed so the answer is readable, not merely significant",
      "Metric definitions agreed before the experiment rather than argued after it",
      "Eight years of this: product analytics across 13 markets at Docplanner, registration conversion from 6.5% to 13% at edrone",
    ],
  },
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

function ProofBar() {
  return (
    <motion.dl
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
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
      className="flex flex-col justify-center px-6 pt-28 pb-12 md:px-16 md:pt-32 md:pb-16 lg:px-32 max-w-5xl mx-auto"
    >
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="font-mono text-teal mb-5 text-sm md:text-base">
        Michał Gabriel · Fractional Head of Data
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="text-4xl md:text-6xl font-bold text-slate-lightest leading-tight mb-3">
        AI answers only as well as the data beneath it.
      </motion.h1>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-3xl md:text-5xl font-bold leading-tight mb-8" style={{ color: "hsl(var(--slate))" }}>
        Most companies have no idea how bad theirs is.
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-base md:text-lg leading-relaxed max-w-xl mb-2" style={{ color: "hsl(var(--slate))" }}>
        I rebuild the layer underneath, so a number means the same thing everywhere — then measure whether it worked. At edrone:
      </motion.p>

      <ProofBar />


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
          href="https://www.linkedin.com/in/mkgabriel"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link font-mono text-xs tracking-widest"
          style={{ writingMode: "vertical-rl" }}
        >
          linkedin.com/in/mkgabriel
        </a>
        <div className="w-px h-24 mt-2" style={{ backgroundColor: "hsl(var(--slate))" }} />
      </motion.div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="pt-12 pb-16 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">1.</span> About Me
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-5 gap-12 items-start">
        <div className="md:col-span-3 space-y-4 text-base leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
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
            <ul className="grid grid-cols-2 gap-1 mt-4 skill-list">
              {SKILLS.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </FadeIn>
        </div>

        {/* Profile image */}
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

// ── How I Work ────────────────────────────────────────────────────────────────

const EVAL_SAMPLE = [
  { q: "How many active customers did we have last month?",   before: false, after: true  },
  { q: "What was MRR in Q2 — and does finance agree?",         before: false, after: true  },
  { q: "Which plan do customers churn from most?",             before: true,  after: true  },
  { q: "How many orders came through the mobile app?",         before: false, after: true  },
  { q: "What did we spend to acquire a customer in Q2?",       before: false, after: false },
];

function Mark({ ok }: { ok: boolean }) {
  return (
    <span className={ok ? "eval-yes" : "eval-no"} role="img" aria-label={ok ? "correct" : "wrong"}>
      {ok ? "✓" : "✗"}
    </span>
  );
}

function EvalSample() {
  const before = EVAL_SAMPLE.filter((r) => r.before).length;
  const after = EVAL_SAMPLE.filter((r) => r.after).length;

  return (
    <figure className="eval-sample">
      <figcaption className="eval-sample-head">What the scored set looks like</figcaption>
      <table className="eval-table">
        <thead>
          <tr>
            <th scope="col">Question</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
          </tr>
        </thead>
        <tbody>
          {EVAL_SAMPLE.map((row) => (
            <tr key={row.q}>
              <th scope="row">{row.q}</th>
              <td><Mark ok={row.before} /></td>
              <td><Mark ok={row.after} /></td>
            </tr>
          ))}
          <tr className="eval-total">
            <th scope="row">Answered correctly</th>
            <td>{before}/{EVAL_SAMPLE.length}</td>
            <td>{after}/{EVAL_SAMPLE.length}</td>
          </tr>
        </tbody>
      </table>
      <p className="eval-note">
        Illustrative. Your set is built from questions your business already asks and already knows
        the answers to. Some come back right the first time. Some stay broken after the first pass —
        and then at least you know which.
      </p>
    </figure>
  );
}

function HowIWork() {
  return (
    <section id="how-i-work" className="py-16 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">4.</span> How I Work
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="max-w-2xl mb-12 text-base md:text-lg leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
          Three steps. The first stands on its own — you find out where you are before committing to anything larger. The third is the reason for the first two.
        </p>
      </FadeIn>

      <div className="space-y-6">
        {STEPS.map((step, i) => (
          <FadeIn key={step.title} delay={0.15 + i * 0.1}>
            <article className="step">
              <header className="step-head">
                <span className="step-num">{step.num}</span>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-meta">{step.meta}</p>
                </div>
              </header>
              <p className="step-body">{step.body}</p>
              <ul className="step-list">
                {step.points.map((p) => (
                  <li key={p}>
                    <span className="text-teal shrink-0" aria-hidden="true">▹</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              {i === 0 && <EvalSample />}
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <p className="availability-note">
          If the first score comes back high, you don't need the second step — and I'll say so.
          I'm currently Data Lead at edrone and take a limited number of outside engagements.
        </p>
      </FadeIn>
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
    <section id="experience" className="py-16 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">3.</span> Where I've Worked
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} className="flex flex-col sm:flex-row gap-0">
        {/* Tab list */}
        <div role="tablist" aria-label="Companies" aria-orientation={verticalTabs ? "vertical" : "horizontal"} onKeyDown={onTabKeyDown} className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible sm:min-w-[160px] border-b sm:border-b-0 sm:border-l-0" style={{ borderColor: "hsl(var(--navy-lighter))" }}>
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
    <section id="success-stories" className="py-12 px-6 md:px-16 lg:px-32 max-w-7xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">2.</span> Success Stories
        </h2>
        <div className="success-stories-grid">
          {STORIES.map((story) => (
            <article className="story-preview" key={story.slug}>
              <div className="story-preview-head">
                <p className="story-eyebrow">{story.eyebrow}</p>
                <h3>{story.title}</h3>
              </div>
              <div className="story-preview-body">
                <p className="text-slate-light leading-relaxed">{story.lead}</p>
                <p className="text-slate-lightest leading-relaxed">{story.hook}</p>
                <a className="teal-btn inline-flex items-center gap-4" href={`${import.meta.env.BASE_URL}success-stories/${story.slug}/`}>
                  Read the full story <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}


// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="pt-12 pb-24 px-6 md:px-16 lg:px-32 max-w-5xl mx-auto">
      <FadeIn>
        <h2 className="numbered-heading">
          <span className="section-number">5.</span> What's Next?
        </h2>
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-5xl font-bold mb-6" style={{ color: "hsl(var(--slate-lightest))" }}>
            Get In Touch
          </h3>
          <p className="mb-10 leading-relaxed" style={{ color: "hsl(var(--slate))" }}>
            Tell me the number your company argues about most — the one that comes back different depending on who you ask. Thirty minutes is usually enough to tell whether I can help, and I'll say so either way.
          </p>
          <a href="https://www.linkedin.com/in/mkgabriel/" target="_blank" rel="noopener noreferrer" className="teal-btn text-base px-8 py-4">
            Say Hello
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
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
