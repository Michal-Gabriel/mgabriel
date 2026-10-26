import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import Index from "./pages/Index";

const RegistrationConversion = lazy(() => import("./pages/RegistrationConversion"));
const ElevenOutOf170 = lazy(() => import("./pages/ElevenOutOf170"));
const SelfServiceOnboarding = lazy(() => import("./pages/SelfServiceOnboarding"));
const AutomatingCustomerSuccess = lazy(() => import("./pages/AutomatingCustomerSuccess"));
const pagePath = window.location.pathname.replace(/\/(?:index\.html)?$/, "");

const STORIES: Record<string, React.ComponentType> = {
  "eleven-out-of-170": ElevenOutOf170,
  "doubling-registration-conversion": RegistrationConversion,
  "self-service-onboarding": SelfServiceOnboarding,
  "automating-customer-success": AutomatingCustomerSuccess,
};

const slug = pagePath.split("/success-stories/")[1];
const Story = slug ? STORIES[slug] : undefined;

const App = () => (
  <MotionConfig reducedMotion="user">
    <Suspense fallback={null}>{Story ? <Story /> : <Index />}</Suspense>
  </MotionConfig>
);

export default App;
