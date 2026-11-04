import { useEffect, useState } from "react";

/* framer-motion's reducedMotion="user" covers transforms and layout, not a
   width animation, so the figures ask the media query themselves. */
export function useStill() {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return still;
}
