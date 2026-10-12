type StoryOutroProps = {
  heading: string;
  lead: string;
  nextTitle: string;
  nextSlug: string;
};

export default function StoryOutro({ heading, lead, nextTitle, nextSlug }: StoryOutroProps) {
  const home = import.meta.env.BASE_URL;

  return (
    <aside className="story-outro">
      <p className="story-eyebrow">What this looks like for you</p>
      <h2>{heading}</h2>
      <p>{lead}</p>

      <div className="story-outro-actions">
        <a href={`${home}#how-i-work`} className="teal-btn">How I work</a>
        <a href="https://www.linkedin.com/in/mkgabriel" target="_blank" rel="noopener noreferrer" className="ghost-btn">Message me</a>
      </div>

      <a href={`${home}success-stories/${nextSlug}/`} className="story-outro-next">
        <span className="story-eyebrow">Next story</span>
        <span className="story-outro-next-title">
          {nextTitle} <span aria-hidden="true">→</span>
        </span>
      </a>
    </aside>
  );
}
