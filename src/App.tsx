import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import RegistrationConversion from "./pages/RegistrationConversion";
import ElevenOutOf170 from "./pages/ElevenOutOf170";

const queryClient = new QueryClient();
const pagePath = window.location.pathname.replace(/\/(?:index\.html)?$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {pagePath.endsWith("/success-stories/eleven-out-of-170") ? <ElevenOutOf170 /> : pagePath.endsWith("/success-stories/doubling-registration-conversion") ? <RegistrationConversion /> : <Index />}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
