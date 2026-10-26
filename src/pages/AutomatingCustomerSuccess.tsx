import StoryOutro from "@/components/StoryOutro";

const COMPARISON = [
  { metric: "Doctors reached each month", product: "15,200", cs: "1,000" },
  { metric: "Doctors converted each month", product: "1,900", cs: "400" },
  { metric: "Conversion rate", product: "12%", cs: "38%" },
  { metric: "Calendars activated on the marketplace", product: "883", cs: "101" },
];

function Result({ before, after, label, detail }: { before: string; after: string; label: string; detail: string }) {
  return (
    <figure className="story-result">
      <div className="story-result-values"><span className="story-before">{before}</span><span className="story-result-arrow" aria-hidden="true">→</span><span className="text-teal">{after}</span></div>
      <figcaption><strong>{label}</strong><span>{detail}</span></figcaption>
    </figure>
  );
}

export default function AutomatingCustomerSuccess() {
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
            <p className="story-eyebrow">Success story / 04</p>
            <h1>Fifteen Times the Reach of a Phone Call</h1>
            <p className="story-deck">What a product could take over from a customer success team — and the part it could not.</p>
            <p className="story-eyebrow">Docplanner · Product automation</p>
          </header>
          <div className="story-body">
            <p>Docplanner had a motion the company called farming. Customer Success agents called doctors and talked them into improving their setup: turn the online calendar on, finish the profile, set your prices, send a campaign asking patients for opinions. Each of those makes a doctor more visible on the marketplace and brings them more bookings. It is genuinely useful work.</p>
            <p>It reached about a thousand doctors a month, out of a base many times that size. The question I was handed was whether the product could do it instead.</p>

            <h2>First: when is a doctor actually reachable?</h2>
            <p>The tempting move is to put a prompt wherever there's room in the interface and see what happens. Instead I looked at when doctors opened the system at all. The pattern was blunt — Monday morning, going through notifications. That is when someone is in an administrative frame of mind and willing to fix something.</p>
            <p>So that is where the suggestions went. Not because it was free screen real estate, but because the data said it was the moment attention existed.</p>

            <h2>Second: rank the work the humans were doing</h2>
            <p>I went through the Customer Success ticket history and sorted the intervention types by how much each one actually improved a doctor's results. That turned a vague brief — "automate CS" — into an ordered list of candidates, ranked by impact rather than by whatever was easiest to build.</p>

            <h2>Third: build an engine, not a feature</h2>
            <p>What shipped was a system that decides <strong>what to show which doctor, and when</strong>. Each hint has eligibility criteria, so it only appears to doctors it applies to. Each one is scheduled across the month rather than fired all at once. Dismissing one is allowed — it simply comes back next month. And every interaction, plus what happened downstream of it, is tracked.</p>
            <p>That last property is the one that made the rest of this story possible. Fourteen hints went live across five countries, grouped around three goals: bookings, visibility and reputation, and the efficiency of the doctor's own setup.</p>

            <h2>Then the argument about the metric</h2>
            <p>The first readout looked like a loss. A hint converted 12% of the doctors who saw it. A Customer Success call converted 38%. On that number, the product was three times worse than a person, and the obvious conclusion was that automation wasn't up to the job.</p>
            <p>But conversion rate is the wrong denominator for a channel whose entire advantage is reach. A call converts well because it only ever happens to a doctor an agent chose to phone. A hint reaches everyone eligible. Measured on the thing the business actually gets — doctors who did the improvement — the picture inverts.</p>

            <figure className="eval-sample">
              <figcaption className="eval-sample-head">Product against Customer Success, per month</figcaption>
              <table className="eval-table">
                <thead>
                  <tr>
                    <th scope="col">Measure</th>
                    <th scope="col">Product</th>
                    <th scope="col">CS</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.metric}>
                      <th scope="row">{row.metric}</th>
                      <td className="eval-yes">{row.product}</td>
                      <td>{row.cs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="eval-note">Monthly averages across Brazil, Mexico, Italy, Spain and Poland, first half of 2024, rounded. Reached means a hint was displayed or a CS meeting was held; converted means the doctor performed at least one of the proposed improvements.</p>
            </figure>

            <Result before="~400" after="~1,900" label="Doctors converted each month" detail="Customer Success against the product — a third of the conversion rate, fifteen times the reach" />

            <h2>What that bought</h2>
            <p>Hints took over the simple interventions and Customer Success stopped doing them — roughly <strong>€1M</strong> of departmental workload. Eleven times as many calendars were switched on through the product as through calls, and the bookings that followed those calendars outnumbered the CS-driven ones by a factor of 46.</p>
            <p>Two findings mattered more to me than the headline ratios.</p>
            <p>The first is that the product reached doctors the team never would have. Over <strong>8,000</strong> doctors in the lowest two engagement grades were touched by hints, against 2,500 the team could meet — and 2,694 of them improved their grade. Agents triage toward the accounts worth their time, which is rational and which leaves the long tail untouched forever.</p>
            <p>The second is that it changed the rhythm. The share of doctors making more than one improvement rose from 11% to 18% over six months, and their number doubled. A call is an event. A hint on a Monday morning is a habit.</p>

            <h2>And where the humans still won</h2>
            <p>On complex tasks, Customer Success beat the product outright — consistently, for months. Opinion campaigns were the clearest case: an agent walks the doctor through importing their patient list and then sending it, while the hint could do little more than point at the right screen and wish them luck.</p>
            <p>The inverse was also true, and larger. Where a task was genuinely simple, well-designed automation didn't merely match the team — reconfiguring notification toggles produced 825 results through the product against 39 through calls.</p>
            <blockquote>So the recommendation was never "replace Customer Success." It was: automate the simple half, leave the complex half with the people who are better at it, and point the roadmap at the gap between them.</blockquote>
            <p>That split is what the team planned against afterwards, and it is a more useful artefact than any of the multiples above. It says which work to build for next, and it is defensible because it includes the cases where the product lost.</p>

            <h2>The honest limit of the comparison</h2>
            <p>Product and Customer Success were not aiming at the same doctors. Agents pick who to call; hints reach whoever is eligible. The reach gap is simply arithmetic, but the downstream ratios mix the effect of the intervention with the difference between those two populations, and I said so when presenting it.</p>
            <p>Which is why the follow-up was a real experiment rather than another comparison. Testing whether hints could reach doctors who weren't even logging in, email and WhatsApp nudges lifted the target action by 132% and 151% in Brazil, both statistically significant. The same test in Mexico came back at 119% and not significant — and that is how it was reported.</p>
          </div>
          <StoryOutro
            heading="The number everyone quotes is usually the wrong one"
            lead="This project turned on a denominator. Conversion rate said the product was losing; converted doctors said it was winning five to one. Finding out which number a decision actually rests on is most of the work."
            nextTitle="From Data Bottleneck to Company-Wide Access"
            nextSlug="eleven-out-of-170"
          />
          <footer className="story-footer"><p className="story-eyebrow">Docplanner · product automation</p><a href={`${home}#success-stories`} className="inline-link">← Back to success stories</a></footer>
        </article>
      </main>
    </div>
  );
}
