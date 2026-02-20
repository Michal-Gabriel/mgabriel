import { useState, useEffect } from "react";

const SECTIONS = ["about", "experience", "skills"] as const;
type Section = (typeof SECTIONS)[number];

const experience = [
  {
    period: "Apr 2025 — Present",
    role: "Data Analytics Course Instructor",
    company: "Mate Academy",
    companyUrl: "https://mate.academy",
    description:
      "Creating educational content for a Data Analytics course designed to help students launch their careers in IT. Recording courses for Tableau, Excel, Google Sheets, and A/B Testing.",
    skills: ["Tableau", "Excel", "Google Sheets", "A/B Testing"],
  },
  {
    period: "Jan 2024 — Apr 2024",
    role: "Interim Product Manager",
    company: "DocPlanner",
    companyUrl: "https://docplanner.com",
    description:
      "Established and led a new product team focused on driving monetization from freemium to premium. Increased registration conversion rate by 23% through targeted A/B testing and optimization experiments.",
    skills: ["Product Strategy", "A/B Testing", "Freemium", "Monetization"],
  },
  {
    period: "Jul 2022 — Present",
    role: "Senior Product Data Analyst",
    company: "DocPlanner",
    companyUrl: "https://docplanner.com",
    description:
      "DocPlanner is one of the first Polish unicorns — the world's largest healthcare platform, operating in 13 countries and serving over 90 million patients each month. Shape product strategy with data-driven insights, defining main metrics and customer journeys. Lead experiments and A/B tests to accelerate product adoption, retention, engagement, and monetization.",
    skills: ["SQL", "Python", "BigQuery", "Mixpanel", "Amplitude", "Airflow", "Google Analytics", "AVO", "VWO"],
  },
  {
    period: "Jan 2020 — Jun 2022",
    role: "Senior Data Analyst",
    company: "ING Bank",
    companyUrl: "https://ing.pl",
    description:
      "Complex analysis of the bank's Self-Employed Clients segment: statistics, profiles, profitability, sales, trends, CRM and customer behavior. Used data to support business development, key decisions and strategy.",
    skills: ["SAS", "4GL", "SQL", "PowerBI", "Python", "Hadoop", "Adobe Analytics"],
  },
  {
    period: "Nov 2018 — Dec 2019",
    role: "Data Analyst",
    company: "ING Bank",
    companyUrl: "https://ing.pl",
    description:
      "Quantitative analysis of customer behaviour: statistics, profiles, segmentation and product usage patterns. Prepared ongoing dashboards about marketing communication effectiveness.",
    skills: ["SAS", "SQL", "PowerBI", "Excel", "Python"],
  },
  {
    period: "Dec 2017 — Oct 2018",
    role: "Customer Journey Intern",
    company: "ING Bank",
    companyUrl: "https://ing.pl",
    description:
      "Supported implementation of new mobile payment products (Google Pay, Apple Pay, BLIK P2P). Prepared marketing communication and training materials. Analyzed customers' web behavior with Adobe Analytics.",
    skills: ["Adobe Analytics", "Market Research", "Data Analysis"],
  },
  {
    period: "Sep 2018 — Aug 2020",
    role: "Co-Founder",
    company: "Rava Consulting",
    companyUrl: "#",
    description:
      "Co-founded a local organization providing market research services, bridging the gap between academia and the business world. Coordinated projects from idea to implementation and managed a team of 10 people.",
    skills: ["Market Research", "Team Management", "Project Management"],
  },
];

const skillGroups = [
  {
    category: "Analytics & BI",
    items: ["SQL", "Python", "PowerBI", "Tableau", "Excel / VBA", "Google Sheets"],
  },
  {
    category: "Product Analytics",
    items: ["Mixpanel", "Amplitude", "Google Analytics", "Adobe Analytics", "A/B Testing", "VWO", "AVO"],
  },
  {
    category: "Data Engineering",
    items: ["BigQuery", "Airflow", "Hadoop", "SAS / 4GL", "Deepnote"],
  },
  {
    category: "Product & Management",
    items: ["Product Strategy", "Customer Journeys", "Funnel Analysis", "Experimentation", "Jira"],
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section);
        if (el && el.offsetTop - 120 <= scrollY) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: Section) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-navy text-foreground selection:bg-teal selection:text-primary-foreground" style={{ background: 'hsl(var(--navy))' }}>
      <div className="max-w-screen-xl mx-auto lg:flex lg:gap-0 px-6 md:px-12 lg:px-24">

        {/* LEFT SIDEBAR */}
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[45%] lg:flex lg:flex-col lg:justify-between py-16 lg:py-24">
          <div>
            {/* Name & Title */}
            <div className="mb-12">
              <p className="text-teal text-sm font-mono mb-3">Hi, my name is</p>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-lightest mb-3 leading-tight">
                Michał Gabriel
              </h1>
              <h2 className="text-lg md:text-xl font-medium text-slate-light mb-6">
                Senior Product Data Analyst
              </h2>
              <p className="text-slate leading-relaxed max-w-xs">
                I turn complex data into clear product insights — driving adoption, retention, and growth at scale.
              </p>
            </div>

            {/* Nav */}
            <nav className="hidden lg:block">
              <ul className="space-y-4">
                {SECTIONS.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollTo(s)}
                      className={`nav-link pl-8 flex items-center gap-4 ${activeSection === s ? "active text-slate-lightest" : ""}`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 mt-12">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mkgabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Email */}
            <a
              href="mailto:michal.gabriel3@gmail.com"
              className="social-link"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
            {/* GitHub placeholder */}
            <a
              href="#"
              className="social-link"
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:w-[55%] py-16 lg:py-24">

          {/* ABOUT */}
          <section id="about" className="mb-24">
            <h2 className="section-heading lg:hidden">About</h2>
            <div className="space-y-4 text-slate leading-relaxed">
              <p>
                I'm a <span className="text-slate-lightest font-medium">Senior Product Data Analyst</span> currently at{" "}
                <a href="https://docplanner.com" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">DocPlanner</a>
                {" "}— the world's largest healthcare marketplace, operating in 13 countries and serving over 90 million patients monthly.
              </p>
              <p>
                My work sits at the intersection of product and data: I define key metrics, map customer journeys, validate hypotheses through{" "}
                <span className="text-slate-lightest font-medium">A/B tests and experiments</span>, and translate complex data into decisions that accelerate adoption, retention, and monetization.
              </p>
              <p>
                Earlier in my career I spent over 4 years at{" "}
                <a href="https://ing.pl" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">ING Bank</a>
                {" "}analyzing customer segments, CRM effectiveness, and product behavior. I also briefly stepped into a{" "}
                <span className="text-slate-lightest font-medium">Product Manager</span> role, leading a team that increased registration conversion by 23%.
              </p>
              <p>
                Outside my main role, I create <span className="text-slate-lightest font-medium">Data Analytics courses</span> at Mate Academy, helping the next generation of analysts break into tech.
              </p>
              <p>
                Based in <span className="text-slate-lightest font-medium">Warsaw, Poland</span>. Fluent in Polish, English and conversational in Spanish.
              </p>
            </div>

            {/* Education */}
            <div className="mt-12">
              <h3 className="text-xs font-bold tracking-widest uppercase text-slate mb-6">Education</h3>
              <div className="space-y-6">
                {[
                  {
                    school: "Maastricht University",
                    degree: "Consumer Neuroscience & Neurobusiness",
                    year: "2023",
                  },
                  {
                    school: "University of Economics in Katowice",
                    degree: "Master's Degree · Computer Science",
                    year: "2020 – 2022",
                  },
                  {
                    school: "University of Economics in Katowice",
                    degree: "Bachelor's Degree · Finance & Accounting",
                    year: "2017 – 2020",
                  },
                ].map((edu) => (
                  <div key={edu.degree} className="flex gap-4">
                    <span className="text-xs text-slate font-mono whitespace-nowrap pt-1 min-w-[80px]">{edu.year}</span>
                    <div>
                      <p className="text-slate-lightest text-sm font-medium">{edu.degree}</p>
                      <p className="text-slate text-xs mt-0.5">{edu.school}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" className="mb-24">
            <h2 className="section-heading">Experience</h2>
            <div className="space-y-2">
              {experience.map((job) => (
                <a
                  key={`${job.role}-${job.company}-${job.period}`}
                  href={job.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="experience-card block group"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <span className="text-xs text-slate font-mono whitespace-nowrap pt-0.5 sm:w-36 shrink-0">
                      {job.period}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-slate-lightest font-medium group-hover:text-teal transition-colors duration-200 flex items-center gap-2">
                        {job.role}
                        <span className="text-slate">·</span>
                        <span className="text-slate-light">{job.company}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 translate-y-1 group-hover:-translate-y-0 duration-200 text-teal"
                        >
                          <path d="M7 7h10v10" />
                          <path d="M7 17 17 7" />
                        </svg>
                      </h3>
                      <p className="text-slate text-sm leading-relaxed mt-2">{job.description}</p>
                      {job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills.map((skill) => (
                            <span key={skill} className="skill-pill">{skill}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="mb-24">
            <h2 className="section-heading">Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-teal text-xs font-bold tracking-widest uppercase mb-3">{group.category}</h3>
                  <ul className="space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-slate text-sm flex items-center gap-2">
                        <span className="text-teal text-xs">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-10">
              <h3 className="text-teal text-xs font-bold tracking-widest uppercase mb-3">Languages</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { lang: "Polish", level: "Native" },
                  { lang: "English", level: "Full Professional" },
                  { lang: "Spanish", level: "Limited Working" },
                ].map(({ lang, level }) => (
                  <div key={lang} className="flex items-center gap-2">
                    <span className="text-slate-lightest text-sm font-medium">{lang}</span>
                    <span className="text-slate text-xs">— {level}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="text-slate text-sm leading-relaxed">
            <p>
              Designed with inspiration from{" "}
              <a href="https://v4.brittanychiang.com" target="_blank" rel="noopener noreferrer" className="text-slate-light hover:text-teal transition-colors">
                Brittany Chiang
              </a>
              . Built with React & Tailwind CSS.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
