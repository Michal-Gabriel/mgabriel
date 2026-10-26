import StoryOutro from "@/components/StoryOutro";

function Result({ before, after, label, detail }: { before: string; after: string; label: string; detail: string }) {
  return (
    <figure className="story-result">
      <div className="story-result-values"><span className="story-before">{before}</span><span className="story-result-arrow" aria-hidden="true">→</span><span className="text-teal">{after}</span></div>
      <figcaption><strong>{label}</strong><span>{detail}</span></figcaption>
    </figure>
  );
}

export default function SelfServiceOnboarding() {
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
            <p className="story-eyebrow">Success story / 03</p>
            <h1>Tripling Self-Service, and Keeping the Call Anyway</h1>
            <p className="story-deck">Doctors used the self-onboarding tools three times more when nobody was coming to help. The experiment still said: keep the meeting.</p>
            <p className="story-eyebrow">Docplanner · Activation</p>
          </header>
          <div className="story-body">
            <p>Every new doctor at Docplanner was onboarded by a person. Customer Success booked a call, walked them through the setup, and made sure the profile, the calendar and the pricing were in place. It worked. It also didn't scale, and it was the single largest cost in getting a doctor live.</p>
            <p>We had self-service tools for exactly this — an Onboarding Wizard, a Start Guide, contextual hints. Almost nobody used them. The Wizard was completed by 18% of doctors. The Start Guide, by 2%.</p>

            <h2>The common reading was that the tools were bad</h2>
            <p>That is the obvious conclusion, and it leads somewhere expensive: redesign the Wizard, rewrite the Start Guide, ship it again, hope.</p>
            <p>My reading was different. A doctor who signs up already has a call in the calendar with a human being who is going to do this with them on Thursday. Clicking through a setup wizard on Tuesday isn't a worse option — it's a pointless one. The tools weren't failing. They were being crowded out.</p>
            <p>That distinction matters, because the two explanations call for opposite roadmaps. One says build better tools. The other says the tools are fine and the problem is the thing sitting next to them.</p>

            <h2>So the experiment wasn't a product change</h2>
            <p>The treatment was removing the Customer Success call. One group of doctors was onboarded the usual way. The other was left with the self-service tools and no human appointment.</p>
            <p>Before launch, with the CS lead, we fixed what would count as success: more than <strong>70%</strong> Wizard completion, and more than <strong>70%</strong> of doctors taking action through the Start Guide. Not an arbitrary bar — below it, we couldn't drop the first onboarding meeting, and dropping that meeting was the entire point. Setting it beforehand also meant nobody could relitigate the threshold once the numbers were in.</p>

            <h2>The hypothesis held</h2>
            <p>In the self-service group, 61% of doctors started the Wizard, and 88% of those finished the whole flow.</p>
            <Result before="16%" after="54%" label="Completed the Onboarding Wizard" detail="Control group against self-service group, measured on day 14" />
            <p>More than three times as many doctors completed the setup when there was no call coming. The call really had been suppressing the tools — people weren't ignoring them, they were waiting.</p>

            <h2>And the bar was still missed</h2>
            <p>54% is not 70%. But the more interesting number wasn't the completion rate at all.</p>
            <p>Profile completion in the self-service group was only 10% below the control — setup, essentially, took care of itself. The onboarding score, which also weighs whether a doctor actually started using the product and getting results, told a different story: the share of doctors reaching an A or B onboarding grade was <strong>19 percentage points lower</strong>. Broken down, setup and adoption points were each about 20% lower, while advanced-usage scores were flat.</p>
            <blockquote>Self-service covered the configuration. It did not cover the adoption — and adoption is what onboarding is for.</blockquote>
            <p>So the recommendation was not to cut the meeting. It was to stop building more setup tooling, which doctors evidently manage on their own, and to point the roadmap at the half the product couldn't yet carry: getting a doctor to actually use what they just configured.</p>

            <h2>What I flagged at the same time</h2>
            <p>Two things, because a result like this gets quoted long after the caveats are forgotten.</p>
            <p>The read was partial. At the day-14 cutoff there were 41 doctors in the test group and 71 in control, against roughly 90 expected. I reported it as a direction, not a verdict.</p>
            <p>And the onboarding score partly rewards actions that Customer Success normally performs <em>with</em> the doctor during the call. A group without a call loses some of those points by construction, not by performing worse. Some share of that 19-point gap is a measurement artefact, and knowing which share would have taken a cleaner metric than the one we had.</p>
            <p>Neither caveat changed the decision. Both changed how hard anyone could lean on the number afterwards.</p>
          </div>
          <StoryOutro
            heading="Before the experiment, the threshold"
            lead="The useful part here wasn't the result — it was that we agreed what would count as success before we could see the data. Most experiments skip that step, and then spend the readout arguing about the bar instead of the finding."
            nextTitle="Fifteen Times the Reach of a Phone Call"
            nextSlug="automating-customer-success"
          />
          <footer className="story-footer"><p className="story-eyebrow">Docplanner · activation</p><a href={`${home}#success-stories`} className="inline-link">← Back to success stories</a></footer>
        </article>
      </main>
    </div>
  );
}
