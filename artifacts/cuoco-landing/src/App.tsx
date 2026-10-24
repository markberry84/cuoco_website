import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Connect from "@/pages/Connect";
import Voice from "@/pages/Voice";
import Support from "@/pages/Support";
import { titleFor } from "@/content/seo";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/connect" component={Connect} />
      <Route path="/voice" component={Voice} />
      <Route path="/support" component={Support} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Keeps the browser tab's title right when moving between pages without a reload.
function TitleSync() {
  const [location] = useLocation();
  useEffect(() => {
    document.title = titleFor(location);
  }, [location]);
  return null;
}

function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")} ssrPath={ssrPath}>
          <TitleSync />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
