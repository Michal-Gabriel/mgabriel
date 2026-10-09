import DataArchitecture from "@/components/DataArchitecture";

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
        <a href={home} className="text-teal font-mono font-bold text-lg" aria-label="Michał Gabriel — home">MG</a>
        <a href={`${home}#success-stories`} className="inline-link font-mono text-xs">← All success stories</a>
      </header>
      <main className="story-main">
        <article>
          <header className="story-header">
            <p className="story-eyebrow">Success story / 01</p>
            <h1>From Data Bottleneck to Company-Wide Access</h1>
            <p className="story-deck">How data at edrone stopped being one team's resource — in four months.</p>
            <p className="story-eyebrow">edrone · Data team · January – April</p>
          </header>
          <div className="story-body">
            <p>When I joined edrone in January, reporting ran on Tableau. The tool worked — technically. It had dashboards, it had data, it had licences. And over an entire month, eleven people opened it.</p>
            <p>Eleven, in a company of 170. A company that sells other companies a tool for making decisions based on data.</p>
            <p>The reason wasn't a mystery. You only had to ask. Tableau was seen as unstable and hard to use, so people stopped trying. Instead they messaged someone on the data team and waited. Or — more often — didn't message anyone and guessed.</p>

            <h2>The second problem was worse, because it was invisible</h2>
            <p>Even when someone did reach a number, it wasn't clear whether it was <strong><em>the</em></strong> number. The same question, asked twice in two places, could come back with two different answers — depending on which table happened to be open. There was no single place where a figure always meant the same thing.</p>
            <p>This is the kind of problem that never reports itself. Nobody walks up and says “my data is wrong,” because how would they know. Trust in the numbers just erodes quietly, until instinct starts beating the report.</p>
            <p>So we set two goals, in this order: <strong>fix the quality</strong>, then <strong>open up the access</strong>. Either one alone is useless. Access to bad data only spreads the error faster.</p>

            <h2>What “rebuilding the architecture” actually meant</h2>
            <p>Here is how ten versions of the truth get made, and nobody is at fault. A developer builds a feature and needs somewhere to put the data, so they create a table. The feature changes, so they create another one. A fix goes out, an export is needed, someone backfills history — another table, and another. Six months later one feature is described by ten tables, each slightly different, none of them marked as the right one.</p>
            <p>Then an analyst arrives with a question and picks one. Probably the one with the most convincing name. The next analyst picks a different one. Both get an answer, both believe it, and the numbers in the two reports don't match.</p>
            <p>A gold layer is the answer to that. It's a thin, deliberate layer on top of everything developers produce: one table per business concept, defined once, owned by someone, and documented. Everything underneath it stays where it is — it just stops being what anyone reads. If a figure isn't in the gold layer, it isn't the figure.</p>

            <DataArchitecture />

            <h2>How to tell whether the data got better</h2>
            <p>The trouble with a gold layer is that it produces nothing you can see. No new screen, no new feature — just the same questions, answered more reliably. So it had to be weighed.</p>
            <p>So we collected 21 business questions we already knew the correct answers to. The AI got each one twice: once on the old architecture, once on the new. Then we counted the hits.</p>
            <Result before="33%" after="70%" label="Correct answers" detail="Across 21 test questions, old architecture against new" />
            <p>From one third to seven tenths. Twice as many questions the system answers the way it should — same AI, same questions, different data underneath.</p>

            <h2>Then we opened the doors</h2>
            <p>At the end of January we moved off Tableau and onto Beyond, a tool we built ourselves. There are no licences to hand out and no learning curve to clear: it's open to anyone on the company VPN. And if you can't find the data you're after, you ask the AI in plain language.</p>
            <p>That last part mattered more than we expected. The barrier was never access — the logins existed. It was that asking a question first required knowing how to ask it.</p>
            <Result before="11" after="103" label="Monthly active users" detail="Tableau in January against Beyond in April" />
            <p>Nine times as many people actually going in for data in a given month. Not accounts — people. Out of 170 in the company, more than half now use it.</p>
            <blockquote>People hadn't stopped using data because they didn't need it. They stopped because it was harder than guessing.</blockquote>
            <p>Today a question about a number no longer routes through the data team. It routes through the person who needs the number — and comes back with an answer they can trust. That is the whole difference between data a company has and data a company uses.</p>
          </div>
          <footer className="story-footer"><p className="story-eyebrow">edrone · data team</p><a href={`${home}#success-stories`} className="inline-link">← Back to success stories</a></footer>
        </article>
      </main>
    </div>
  );
}
