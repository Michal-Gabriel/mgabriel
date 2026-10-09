import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import ElevenOutOf170 from "./pages/ElevenOutOf170";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {window.location.pathname.replace(/\/(?:index\.html)?$/, "").endsWith("/success-stories/eleven-out-of-170") ? <ElevenOutOf170 /> : <Index />}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
