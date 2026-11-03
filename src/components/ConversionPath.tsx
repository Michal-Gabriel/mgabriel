import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* The real series from the story page — four months, each with the one change
   that shipped that month. Nothing between these points was measured, so
   nothing between them is drawn as data. */
const POINTS = [
  { month: "January",  short: "Jan", value: 6.5,  change: "Baseline, no changes" },
  { month: "February", short: "Feb", value: 8.8,  change: "Removed the URL field" },
  { month: "March",    short: "Mar", value: 9.0,  change: "Removed phone, split into two steps" },
  { month: "April",    short: "Apr", value: 13.0, change: "Added a value proposition" },
];

/* The scale starts at zero: a trend drawn off a cropped baseline exaggerates
   itself, and this page argues for reading numbers honestly. */
const MAX = 14;
const W = 640;
const H = 200;
const PAD = { top: 34, right: 46, bottom: 26, left: 46 };

const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / (POINTS.length - 1);
const y = (v: number) => H - PAD.bottom - (v / MAX) * (H - PAD.top - PAD.bottom);

/* Percentages, so the labels can live in HTML and keep their real type size at
   any width. Text set inside the SVG would scale with the viewBox — at phone
   width the months came out around 4px tall. */
const left = (i: number) => `${(x(i) / W) * 100}%`;
const top = (v: number) => `${(y(v) / H) * 100}%`;

const line = POINTS.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p.value)}`).join(" ");
const area = `${line} L${x(POINTS.length - 1)},${H - PAD.bottom} L${x(0)},${H - PAD.bottom} Z`;
const last = POINTS.length - 1;

export default function ConversionPath() {
  const [active, setActive] = useState<number | null>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const shown = active === null ? null : POINTS[active];

  return (
    <figure className="path-figure">
      <figcaption className="path-title">
        Registration conversion, month by month
        <span>Four changes, each measured on its own, January to April.</span>
      </figcaption>

      <div className="path-plot">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="path-svg"
          role="img"
          aria-label="Registration conversion rose from 6.5% in January to 13.0% in April, measured monthly."
        >
          <defs>
            {/* A wash that fades toward the baseline — a flat block is too much
                ink for a zero-based area this tall. */}
            <linearGradient id="path-wash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--bronze))" stopOpacity="0.14" />
              <stop offset="100%" stopColor="hsl(var(--bronze))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* The only chrome: one hairline baseline at zero. */}
          <line
            x1={PAD.left - 20}
            y1={H - PAD.bottom}
            x2={W - PAD.right + 20}
            y2={H - PAD.bottom}
            stroke="hsl(var(--rule))"
            strokeWidth="1"
          />

          <motion.path
            d={area}
            fill="url(#path-wash)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, delay: still ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.path
            d={line}
            fill="none"
            stroke="hsl(var(--bronze))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            initial={{ strokeDashoffset: still ? 0 : 1 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: still ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {POINTS.map((p, i) => (
            <motion.circle
              key={p.month}
              cx={x(i)}
              cy={y(p.value)}
              r={active === i ? 6 : 4.5}
              fill="hsl(var(--bronze))"
              /* A 2px ring in the surface colour keeps the marker legible
                 where it sits on the line. */
              stroke="hsl(var(--surface-raised))"
              strokeWidth="2"
              initial={{ opacity: still ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: still ? 0 : 0.9 + i * 0.16 }}
              style={{ transition: "r 0.3s" }}
            />
          ))}

          {/* Hit areas far larger than the markers, reachable by keyboard. */}
          {POINTS.map((p, i) => (
            <circle
              key={`hit-${p.month}`}
              cx={x(i)}
              cy={y(p.value)}
              r={24}
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${p.month}: ${p.value}% — ${p.change}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            />
          ))}
        </svg>

        {/* Only the first and last values are set on the chart; the months
            carry the rest, and the tooltip carries the changes. */}
        <span className="path-value path-value-start" style={{ left: left(0), top: top(POINTS[0].value) }}>
          6.5%
        </span>
        <span className="path-value path-value-end" style={{ left: left(last), top: top(POINTS[last].value) }}>
          13.0%
        </span>

        {shown && (
          <div className="path-tip" style={{ left: left(POINTS.indexOf(shown)), top: top(shown.value) }}>
            <strong>{shown.value.toFixed(1)}%</strong>
            <span>{shown.month}</span>
            <span>{shown.change}</span>
          </div>
        )}
      </div>

      <div className="path-months" aria-hidden="true">
        {POINTS.map((p, i) => (
          <span key={p.month} style={{ left: left(i) }}>{p.short}</span>
        ))}
      </div>

      {/* Every value the tooltip shows, reachable without hovering. */}
      <table className="sr-only">
        <caption>Registration conversion by month</caption>
        <thead>
          <tr><th scope="col">Month</th><th scope="col">Conversion</th><th scope="col">Change shipped</th></tr>
        </thead>
        <tbody>
          {POINTS.map((p) => (
            <tr key={p.month}>
              <th scope="row">{p.month}</th>
              <td>{p.value.toFixed(1)}%</td>
              <td>{p.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
