import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";

const RegistrationConversion = lazy(() => import("./pages/RegistrationConversion"));
const ElevenOutOf170 = lazy(() => import("./pages/ElevenOutOf170"));
const pagePath = window.location.pathname.replace(/\/(?:index\.html)?$/, "");

const App = () => (
  <MotionConfig reducedMotion="user">
    <Suspense fallback={null}>
      {pagePath.endsWith("/success-stories/eleven-out-of-170") ? <ElevenOutOf170 /> : pagePath.endsWith("/success-stories/doubling-registration-conversion") ? <RegistrationConversion /> : <Index />}
    </Suspense>
  </MotionConfig>
);

export default App;
