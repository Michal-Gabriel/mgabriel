import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useStill } from "@/lib/useStill";

/* Two panels, two scales, on purpose. Doctors and a share of doctors are not
   the same quantity, and putting them on one axis is the trick that makes
   either channel look like whichever winner you wanted. */
const CHANNELS = [
  { name: "Product", reached: 15200, converted: 1900, rate: 12, calendars: 883 },
  { name: "Customer Success", reached: 1000, converted: 400, rate: 38, calendars: 101 },
];

const COUNT_MAX = 16000;
const RATE_MAX = 40;

const fmt = (n: number) => n.toLocaleString("en-US");

function Bar({ value, max, tone, delay, still, shown }: {
  value: number; max: number; tone: string; delay: number; still: boolean; shown: boolean;
}) {
  const to = `${(value / max) * 100}%`;
  return (
    <motion.span
      className={`rr-bar ${tone}`}
      animate={{ width: shown || still ? to : "0%" }}
      transition={{ duration: still ? 0 : 0.9, delay: still ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

export default function ReachAndRate() {
  const still = useStill();
  /* One observer for the figure, so both plots fill on the same cue. */
  const frame = useRef<HTMLElement>(null);
  const shown = useInView(frame, { once: true, margin: "-60px" });

  return (
    <figure className="fig-frame" ref={frame}>
      <figcaption className="fig-title">
        Product against Customer Success, per month
        <span>
          The same comparison read on two measures. One counts doctors, the other is a share of
          the doctors reached — so they get two plots, not two axes.
        </span>
      </figcaption>

      <div className="fig-group">
        <p className="fig-group-head">Doctors per month</p>
        <p className="rr-legend">
          <span className="rr-swatch rr-reach" aria-hidden="true" />Reached
          <span className="rr-swatch rr-conv" aria-hidden="true" />Converted
        </p>
        {CHANNELS.map((c, i) => (
          <div className="rr-channel" key={c.name}>
            <p className="rr-name">{c.name}</p>
            <div className="fig-row">
              <span className="fig-key">Reached</span>
              <div className="fig-track">
                {/* The scale ends here, named once per plot. */}
                {i === 0 && <span className="fig-axis" aria-hidden="true">max {fmt(COUNT_MAX)}</span>}
                <Bar value={c.reached} max={COUNT_MAX} tone="rr-reach" delay={i * 0.14} still={still} shown={shown} />
              </div>
              <span className="fig-num">{fmt(c.reached)}</span>
            </div>
            <div className="fig-row">
              <span className="fig-key">Converted</span>
              <div className="fig-track"><Bar value={c.converted} max={COUNT_MAX} tone="rr-conv" delay={0.1 + i * 0.14} still={still} shown={shown} /></div>
              <span className="fig-num">{fmt(c.converted)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="fig-group">
        <p className="fig-group-head">Of those reached, converted</p>
        {CHANNELS.map((c, i) => (
          <div className={`fig-row${i === 0 ? " fig-row-first" : ""}`} key={c.name}>
            <span className="fig-key">{c.name}</span>
            <div className="fig-track">
              {i === 0 && <span className="fig-axis" aria-hidden="true">max {RATE_MAX}%</span>}
              <Bar value={c.rate} max={RATE_MAX} tone="rr-conv" delay={0.3 + i * 0.14} still={still} shown={shown} />
            </div>
            <span className="fig-num">{c.rate}%</span>
          </div>
        ))}
      </div>

      <p className="fig-note">
        Monthly averages across Brazil, Mexico, Italy, Spain and Poland, first half of 2024,
        rounded. Reached means a hint was displayed or a meeting was held; converted means the
        doctor performed at least one of the proposed improvements. Agents choose whom to call
        and hints reach whoever is eligible, so the two populations are not the same.
      </p>

      <table className="sr-only">
        <caption>Product against Customer Success, per month</caption>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Product</th>
            <th scope="col">Customer Success</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Doctors reached each month</th><td>{fmt(CHANNELS[0].reached)}</td><td>{fmt(CHANNELS[1].reached)}</td></tr>
          <tr><th scope="row">Doctors converted each month</th><td>{fmt(CHANNELS[0].converted)}</td><td>{fmt(CHANNELS[1].converted)}</td></tr>
          <tr><th scope="row">Conversion rate</th><td>{CHANNELS[0].rate}%</td><td>{CHANNELS[1].rate}%</td></tr>
          <tr><th scope="row">Calendars activated on the marketplace</th><td>{fmt(CHANNELS[0].calendars)}</td><td>{fmt(CHANNELS[1].calendars)}</td></tr>
        </tbody>
      </table>
    </figure>
  );
}
