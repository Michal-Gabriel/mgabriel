import DataArchitecture from "@/components/DataArchitecture";
import StoryOutro from "@/components/StoryOutro";

function Result({ before, after, label, detail }: { before: string; after: string; label: string; detail: string }) {
  return (
    <figure className="story-result">
      <div className="story-result-values"><span className="story-before">{before}</span><span className="story-result-arrow" aria-hidden="true">→</span><span className="text-teal">{after}</span></div>
      <figcaption><strong>{label}</strong><span>{detail}</span></figcaption>
    </figure>
  );
}

export default function ElevenOutOf170() {
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
            <p className="story-eyebrow">Success story / 01</p>
            <h1>From Data Bottleneck to Company-Wide Access</h1>
            <p className="story-deck">How data at edrone stopped being one team's resource — in four months.</p>
            <p className="story-eyebrow">edrone · Data quality</p>
          </header>
          <div className="story-body">
            <p>When I joined edrone in January, reporting ran on Tableau. Dashboards, data, licences — all there. Over an entire month, eleven people opened it.</p>
            <p>Eleven, in a company of 170. A company that sells other companies a tool for making decisions based on data.</p>
            <p>You only had to ask why. Tableau was seen as unstable and hard to use, so people stopped trying. They messaged the data team and waited — or didn't ask anyone and guessed.</p>

            <h2>The second problem was worse, because it was invisible</h2>
            <p>Even when someone reached a number, it wasn't clear whether it was <strong><em>the</em></strong> number. The same question, asked twice, came back with two answers depending on which table happened to be open.</p>
            <p>Nobody reports this. Nobody walks up and says “my data is wrong” — how would they know. Trust just erodes, until instinct starts beating the report.</p>
            <p>So, two goals, in this order: <strong>fix the quality</strong>, then <strong>open up the access</strong>. Access to bad data only spreads the error faster.</p>

            <h2>What “rebuilding the architecture” actually meant</h2>
            <p>Here is how ten versions of the truth get made, with nobody at fault. A developer needs somewhere to put data, so they create a table. The feature changes — another table. A fix, an export, a backfill — another, and another. Six months later one feature is described by ten tables, none of them marked as the right one.</p>
            <p>An analyst arrives with a question and picks one. Probably the one with the most convincing name. The next analyst picks a different one. Both believe their answer, and the two reports don't match.</p>
            <p>A gold layer is the answer: a thin, deliberate layer on top of everything developers produce. One table per business concept, defined once, owned, documented. Everything underneath stays where it is — it just stops being what anyone reads. If a figure isn't in the gold layer, it isn't the figure.</p>

            <DataArchitecture />

            <h2>How to tell whether the data got better</h2>
            <p>A gold layer produces nothing you can see. No new screen, no new feature — just the same questions, answered more reliably. So it had to be weighed.</p>
            <p>We fixed a set of business questions we already knew the answers to. The AI got each one twice: once on the old architecture, once on the new. Then we counted the hits.</p>
            <Result before="33%" after="70%" label="Correct answers" detail="A fixed evaluation set of business questions, old architecture against new" />
            <p>From one third to seven tenths. Same AI, same questions — different data underneath.</p>

            <h2>Then we opened the doors</h2>
            <p>At the end of January we moved off Tableau onto Beyond, a tool we built ourselves. No licences to hand out, no learning curve: open to anyone on the company VPN. And if you can't find what you're after, you ask the AI in plain language.</p>
            <p>That last part mattered more than we expected. The barrier was never access — the logins existed. It was that asking a question first required knowing how to ask it.</p>
            <Result before="11" after="103" label="Monthly active users" detail="Tableau in January against Beyond in April" />
            <p>Nine times as many people going in for data in a given month. Not accounts — people. More than half the company.</p>
            <blockquote>People hadn't stopped using data because they didn't need it. They stopped because it was harder than guessing.</blockquote>
            <p>Today a question about a number routes through the person who needs it, not the data team — and comes back with an answer they can trust. That is the whole difference between data a company has and data a company uses.</p>
          </div>
          <StoryOutro
            heading="The same test, on your data"
            lead="The questions weren't special — they were the ones the company already asked itself. Running them against your data takes about four weeks, and the score tells you whether any of this applies to you."
            nextTitle="Doubling Registration Conversion"
            nextSlug="doubling-registration-conversion"
          />
          <footer className="story-footer"><p className="story-eyebrow">edrone · data team</p><a href={`${home}#success-stories`} className="inline-link">← Back to success stories</a></footer>
        </article>
      </main>
    </div>
  );
}
