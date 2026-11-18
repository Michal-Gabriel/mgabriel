import StoryOutro from "@/components/StoryOutro";

const milestones = [
  { month: "January", value: "6.5%", change: "Baseline", detail: "No changes", x: 75, y: 243 },
  { month: "February", value: "8.8%", change: "Remove the URL field", detail: "+35% vs. January", x: 275, y: 191 },
  { month: "March", value: "9.0%", change: "Remove phone · split into two steps", detail: "+2% vs. February", x: 475, y: 186 },
  { month: "April", value: "13.0%", change: "Add a value proposition", detail: "+44% vs. March", x: 675, y: 95 },
];

export default function RegistrationConversion() {
  const home = import.meta.env.BASE_URL;
  return (
    <div className="min-h-screen bg-navy">
      <header className="story-nav">
        <a href={home} className="text-teal font-display text-xl" style={{ letterSpacing: "0.06em" }} aria-label="Michał Gabriel — home">MG</a>
        <a href={`${home}#success-stories`} className="inline-link label">← All success stories</a>
      </header>
      <main className="story-main">
        <article>
          <header className="story-header">
            <p className="story-eyebrow">Success story / 02</p>
            <h1>Doubling Registration Conversion</h1>
            <p className="story-deck">Four changes in four months, each measured on its own — and the one that worked was not the one we expected.</p>
            <p className="story-eyebrow">edrone · Product-led growth</p>
          </header>
          <div className="story-body">
            <p>In January, registration conversion at edrone was 6.5%. By April it was 13%. In between, four changes — each one measured on its own.</p>
            <p>The sequence is the point. Removing one field moved the rate sharply. Two more simplifications barely moved it at all. Then we explained why registering was worth it, and the rate hit its high.</p>
            <p>Two halves of the same decision: <strong>how much effort registration takes</strong>, and <strong>whether that effort feels worthwhile</strong>.</p>

            <h2>First, ask for less</h2>
            <p>January was the baseline: <strong>6.5%</strong>, nothing changed. In February we removed the URL field. Conversion rose to <strong>8.8%</strong> — 2.3 points, about 35% relative.</p>
            <p>A field looks like nothing on a screen. It's one more thing to understand and fill in before anyone can move forward.</p>

            <h2>A simpler flow didn't explain the whole opportunity</h2>
            <p>In March we dropped the phone field and split registration into two steps. Conversion reached <strong>9.0%</strong> — up 2% relative.</p>
            <p>Far less than the month before. Simplifying again didn't buy another jump, which raised the real question: once the effort is low, is the reason to register clear?</p>

            <h2>Then, make the value clear</h2>
            <p>In April we added a value proposition to the flow. Conversion rose to <strong>13.0%</strong> — four points above March, about 44% relative, the biggest month-to-month move in the sequence.</p>
            <p>The flow now asked for less and gave people a reason to continue.</p>

            <figure className="conversion-figure">
              <figcaption className="conversion-chart-title">Registration conversion — and what changed each month</figcaption>
              <div className="conversion-milestones">{milestones.map(step => <div key={step.month}>
                <span className="story-eyebrow">{step.month}</span><strong>{step.value}</strong><span className="conversion-change">{step.change}</span><small>{step.detail}</small>
              </div>)}</div>
              <div className="conversion-chart-scroll" tabIndex={0} role="region" aria-label="Monthly registration conversion chart; scroll horizontally on smaller screens">
                <svg viewBox="0 0 750 440" className="conversion-chart" role="img" aria-labelledby="conversion-title conversion-desc">
                  <title id="conversion-title">Registration conversion doubled from January to April</title>
                  <desc id="conversion-desc">January: 6.5 percent. February: 8.8 percent after removing the URL field. March: 9 percent after removing the phone field and splitting registration into two steps. April: 13 percent after adding a value proposition. The vertical scale starts at zero.</desc>
                  <defs><linearGradient id="conversion-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="hsl(var(--bronze))" stopOpacity="0.14" /><stop offset="100%" stopColor="hsl(var(--bronze))" stopOpacity="0.01" /></linearGradient></defs>
                  {[0, 5, 10, 15].map(value => <g key={value}><line x1="60" x2="700" y1={390 - value * (340 / 15)} y2={390 - value * (340 / 15)} stroke="hsl(var(--rule))" /><text x="45" y={395 - value * (340 / 15)} textAnchor="end" fill="hsl(var(--text-muted))" fontSize="12">{value}%</text></g>)}
                  <path d="M75 243 L275 191 L475 186 L675 95 L675 390 L75 390 Z" fill="url(#conversion-fill)" />
                  <path d="M75 243 L275 191 L475 186 L675 95" stroke="hsl(var(--bronze))" strokeWidth="2" fill="none" />
                  {milestones.map(step => <g key={step.month}><circle cx={step.x} cy={step.y} r="6" fill="hsl(var(--bronze))" stroke="hsl(var(--surface-raised))" strokeWidth="3" /><text x={step.x} y={step.y - 19} textAnchor="middle" fill="hsl(var(--bronze))" fontSize="19" fontWeight="500" fontFamily="var(--font-display)">{step.value}</text><text x={step.x} y="423" textAnchor="middle" fill="hsl(var(--text-muted))" fontSize="12">{step.month}</text></g>)}
                </svg>
              </div>
              <p className="conversion-note">Monthly conversion rates. Relative changes are rounded. These are month-to-month observations, rather than isolated A/B test effect estimates.</p>
            </figure>

            <h2>Twice the conversion, in four months</h2>
            <figure className="story-result">
              <div className="story-result-values"><span className="story-before">6.5%</span><span className="story-result-arrow" aria-hidden="true">→</span><span className="text-teal">13%</span></div>
              <figcaption><strong>Registration conversion doubled</strong><span>January → April · +6.5 percentage points · +100% relative increase</span></figcaption>
            </figure>
            <p>At January's rate, 1,000 visitors meant 65 registrations. At April's, 130. Same traffic.</p>
            <blockquote>Make it easier to register. Make it clearer why someone should.</blockquote>
            <p>Registration is only the start of activation. But this part of the journey is concrete: the rate doubled while we cut the flow down and sharpened what it promised.</p>
          </div>
          <StoryOutro
            heading="A decision is only as good as the number behind it"
            lead="These are month-to-month movements, not isolated experiment effects — and saying so is half the job. The other half is a conversion rate that means one thing company-wide. In most companies the same question returns two answers, so no change is ever credited or ruled out. That is the part I usually get called in for."
            nextTitle="Fifteen Times the Reach of a Phone Call"
            nextSlug="automating-customer-success"
          />
          <footer className="story-footer"><p className="story-eyebrow">edrone · product-led growth</p><a href={`${home}#success-stories`} className="inline-link">← Back to success stories</a></footer>
        </article>
      </main>
    </div>
  );
}
