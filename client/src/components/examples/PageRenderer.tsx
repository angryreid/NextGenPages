import PageRenderer from '../PageRenderer';
import { PageConfig } from '@shared/schema';

export default function PageRendererExample() {
  const pageConfig: PageConfig = {
    id: "demo-page",
    path: "/demo",
    title: "Demo Page",
    description: "A demonstration of the dynamic page rendering system",
    layout: "default",
    components: [
      {
        type: "banner",
        id: "hero",
        title: "Dynamic SSG in Action",
        subtitle: "This entire page is generated from JSON configuration",
        variant: "gradient"
      },
      {
        type: "text",
        id: "intro",
        content: "Welcome to our JSON-configured static site generator. Below you'll see various components that are all defined in configuration data.",
        variant: "paragraph"
      },
      {
        type: "card",
        id: "demo-card",
        title: "Interactive Components",
        content: "Click on buttons and cards to see console output. In a real application, these would navigate to actual pages or trigger real actions.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        link: "/interactive-demo"
      },
      {
        type: "button",
        id: "action-btn",
        text: "Try It Now",
        variant: "default",
        size: "lg",
        link: "/get-started"
      }
    ]
  };

  return <PageRenderer config={pageConfig} />;
}