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
        <a href={home} className="text-teal font-mono font-bold text-lg" aria-label="Michał Gabriel — home">MG</a>
        <a href={`${home}#success-stories`} className="inline-link font-mono text-xs">← All success stories</a>
      </header>
      <main className="story-main">
        <article>
          <header className="story-header">
            <p className="story-eyebrow">Success story / 02</p>
            <h1>Doubling Registration Conversion</h1>
            <p className="story-deck">How removing friction and making the value clearer helped edrone turn more visitors into registrations.</p>
            <p className="story-eyebrow">edrone · Product-led growth & activation · January – April</p>
          </header>
          <div className="story-body">
            <p>In January, the registration conversion rate at edrone was 6.5%. By April, it was 13%. Over those four months, we changed what the registration flow asked people to do — and how it explained why they should do it.</p>
            <p>The sequence matters. Removing a field was followed by a substantial increase. Two more changes barely moved the monthly rate. Then we added a value proposition, and the rate reached its highest point in the period.</p>
            <p>The story is about two parts of the same decision: <strong>how much effort registration takes</strong>, and <strong>whether that effort feels worthwhile</strong>.</p>

            <h2>First, ask for less</h2>
            <p>January gave us the baseline: <strong>6.5%</strong>, with no changes. In February, we removed the URL field. The monthly conversion rate rose to <strong>8.8%</strong> — an increase of 2.3 percentage points, or roughly 35% relative to January.</p>
            <p>A field looks small on a screen. But each one is another thing a person has to understand and complete before they can move forward. Removing the URL field reduced what we asked for at that first step.</p>

            <h2>A simpler flow didn't explain the whole opportunity</h2>
            <p>In March, we removed the phone field and split registration into two steps. The conversion rate reached <strong>9.0%</strong>, up from 8.8% — about 2% relative growth.</p>
            <p>That was a much smaller movement than the month before. The monthly figures show that successive simplifications were not accompanied by equally large gains. They also leave an important product question: once the effort is lower, is the reason to register clear enough?</p>

            <h2>Then, make the value clear</h2>
            <p>In April, we added a value proposition to the registration experience. The monthly conversion rate rose to <strong>13.0%</strong>: four percentage points above March, or roughly 44% relative growth.</p>
            <p>This was the largest month-to-month increase in the sequence. The flow now asked for less information and gave people a clearer reason to continue.</p>

            <figure className="conversion-figure">
              <figcaption className="conversion-chart-title">Registration conversion — and what changed each month</figcaption>
              <div className="conversion-milestones">{milestones.map(step => <div key={step.month}>
                <span className="story-eyebrow">{step.month}</span><strong>{step.value}</strong><span className="conversion-change">{step.change}</span><small>{step.detail}</small>
              </div>)}</div>
              <div className="conversion-chart-scroll" tabIndex={0} role="region" aria-label="Monthly registration conversion chart; scroll horizontally on smaller screens">
                <svg viewBox="0 0 750 440" className="conversion-chart" role="img" aria-labelledby="conversion-title conversion-desc">
                  <title id="conversion-title">Registration conversion doubled from January to April</title>
                  <desc id="conversion-desc">January: 6.5 percent. February: 8.8 percent after removing the URL field. March: 9 percent after removing the phone field and splitting registration into two steps. April: 13 percent after adding a value proposition. The vertical scale starts at zero.</desc>
                  <defs><linearGradient id="conversion-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#66ffd9" stopOpacity="0.18" /><stop offset="100%" stopColor="#66ffd9" stopOpacity="0.01" /></linearGradient></defs>
                  {[0, 5, 10, 15].map(value => <g key={value}><line x1="60" x2="700" y1={390 - value * (340 / 15)} y2={390 - value * (340 / 15)} stroke="#293449" /><text x="45" y={395 - value * (340 / 15)} textAnchor="end" fill="#a6b4c8" fontSize="12">{value}%</text></g>)}
                  <path d="M75 243 L275 191 L475 186 L675 95 L675 390 L75 390 Z" fill="url(#conversion-fill)" />
                  <path d="M75 243 L275 191 L475 186 L675 95" stroke="#66ffd9" strokeWidth="3" fill="none" />
                  {milestones.map(step => <g key={step.month}><circle cx={step.x} cy={step.y} r="6" fill="#66ffd9" stroke="#142033" strokeWidth="3" /><text x={step.x} y={step.y - 19} textAnchor="middle" fill="#66ffd9" fontSize="18" fontWeight="600">{step.value}</text><text x={step.x} y="423" textAnchor="middle" fill="#a6b4c8" fontSize="12">{step.month}</text></g>)}
                </svg>
              </div>
              <p className="conversion-note">Monthly conversion rates. Relative changes are rounded. These are month-to-month observations, rather than isolated A/B test effect estimates.</p>
            </figure>

            <h2>Twice the conversion, in four months</h2>
            <figure className="story-result">
              <div className="story-result-values"><span className="story-before">6.5%</span><span className="story-result-arrow" aria-hidden="true">→</span><span className="text-teal">13%</span></div>
              <figcaption><strong>Registration conversion doubled</strong><span>January → April · +6.5 percentage points · +100% relative increase</span></figcaption>
            </figure>
            <p>At January's rate, 1,000 visitors would translate into 65 registrations. At April's rate, the same number would translate into 130. That is what doubling conversion means at the same traffic volume.</p>
            <blockquote>Make it easier to register. Make it clearer why someone should.</blockquote>
            <p>Registration is only the start of activation. In this part of the journey, the result was concrete: the monthly conversion rate doubled while we simplified the flow and strengthened its value proposition.</p>
          </div>
          <footer className="story-footer"><p className="story-eyebrow">edrone · product-led growth</p><a href={`${home}#success-stories`} className="inline-link">← Back to success stories</a></footer>
        </article>
      </main>
    </div>
  );
}
