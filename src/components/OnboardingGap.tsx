import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useStill } from "@/lib/useStill";

/* The quantity here is a difference, so its zero — no difference from the
   control group — is on the chart by construction. Plotting "percent of
   control" instead would have pushed every mark into the right-hand fifth of
   the plot and shown nothing. */
const FLOOR = -25;

const GROUPS = [
  {
    head: "Measured outcome",
    rows: [{ label: "Profile completion", value: -10, detail: "The profile was filled in" }],
  },
  {
    head: "Onboarding score, by component",
    rows: [
      { label: "Setup points", value: -20, detail: "Configuration steps completed" },
      { label: "Adoption points", value: -20, detail: "The doctor started using what was configured" },
      { label: "Advanced usage", value: 0, detail: "Features beyond the first setup" },
    ],
  },
];

/* A flat order, so the stagger carries across both groups instead of
   restarting in the second. */
const ORDER = GROUPS.flatMap((group) => group.rows.map((row) => row.label));

const width = (value: number) => `${(Math.abs(value) / Math.abs(FLOOR)) * 100}%`;
const show = (value: number) => (value === 0 ? "0%" : `−${Math.abs(value)}%`);

export default function OnboardingGap() {
  const still = useStill();
  /* An explicit observer on the figure: the bars grow once, together, when
     the whole thing is on screen. */
  const frame = useRef<HTMLElement>(null);
  const shown = useInView(frame, { once: true, margin: "-60px" });

  return (
    <figure className="fig-frame" ref={frame}>
      <figcaption className="fig-title">
        Self-service against control, day 14
        <span>
          Each bar is how far the self-service group fell short of the control group. Figures
          as reported, rounded.
        </span>
      </figcaption>

      {GROUPS.map((group) => (
        <div className="fig-group" key={group.head}>
          <p className="fig-group-head">{group.head}</p>
          {group.rows.map((row) => {
            const delay = still ? 0 : 0.12 * ORDER.indexOf(row.label);
            return (
              <div className={`fig-row${ORDER.indexOf(row.label) === 0 ? " fig-row-first" : ""}`} key={row.label}>
                <span className="fig-key">{row.label}</span>
                <div className="fig-track gap-track">
                  {/* The reference: zero, where the control group sits. It is
                      named once, over the first row's rule. */}
                  {ORDER.indexOf(row.label) === 0 && (
                    <span className="fig-axis" aria-hidden="true">Control group</span>
                  )}
                  <span className="gap-zero" aria-hidden="true" />
                  <motion.span
                    className="gap-mark"
                    animate={{ width: shown || still ? width(row.value) : "0%" }}
                    transition={{ duration: still ? 0 : 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="gap-dot" />
                  </motion.span>
                </div>
                <span className="fig-num">{show(row.value)}</span>
              </div>
            );
          })}
        </div>
      ))}

      <p className="fig-note">
        41 doctors in the self-service group against 71 in control, short of the ninety expected.
        The score also rewards actions Customer Success normally performs <em>with</em> the doctor
        during the call, so part of the setup and adoption gap is a measurement artefact rather
        than worse performance.
      </p>

      <table className="sr-only">
        <caption>Self-service group against control, day 14</caption>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Difference against control</th>
            <th scope="col">What it counts</th>
          </tr>
        </thead>
        <tbody>
          {GROUPS.flatMap((group) =>
            group.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{show(row.value)}</td>
                <td>{row.detail}</td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </figure>
  );
}
