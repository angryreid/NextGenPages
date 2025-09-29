import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConfigurationProvider, useConfiguration } from "@/contexts/ConfigurationContext";
import Home from "@/pages/Home";
import DynamicPage from "@/components/DynamicPage";
import NotFound from "@/pages/not-found";

function DynamicRouter() {
  const { config, isBuilderMode } = useConfiguration();

  // If no config is loaded or in builder mode, show the builder
  if (!config || isBuilderMode) {
    return (
      <Switch>
        <Route path="/builder" component={Home} />
        <Route path="/" component={Home} />
        <Route component={Home} />
      </Switch>
    );
  }

  // Generate dynamic routes based on the site configuration
  return (
    <Switch>
      {/* Builder route */}
      <Route path="/builder" component={Home} />
      
      {/* Dynamic routes from configuration */}
      {config.pages.map((page) => (
        <Route key={page.id} path={page.path} component={DynamicPage} />
      ))}
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function getDefaultConfig() {
  return {
    id: "default-site",
    name: "My Dynamic Site",
    description: "A site built with JSON configuration",
    theme: {
      primaryColor: "#3b82f6",
      fontFamily: "Inter"
    },
    pages: [
      {
        id: "home",
        path: "/",
        title: "Home Page", 
        description: "Welcome to my dynamic site",
        layout: "default" as const,
        components: [
          {
            type: "banner" as const,
            id: "hero-banner",
            title: "Welcome to My Site",
            subtitle: "Built with dynamic configuration",
            variant: "gradient" as const
          },
          {
            type: "text" as const,
            id: "intro-text",
            content: "This page was generated from JSON configuration. You can edit the configuration to change the content, layout, and components.",
            variant: "paragraph" as const
          },
          {
            type: "button" as const,
            id: "cta-button",
            text: "Get Started",
            variant: "default" as const,
            size: "lg" as const
          }
        ]
      }
    ]
  };
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ssg-builder-theme">
        <TooltipProvider>
          <ConfigurationProvider defaultConfig={getDefaultConfig()}>
            <Toaster />
            <DynamicRouter />
          </ConfigurationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
