import SitePreview from '../SitePreview';
import { SiteConfiguration } from '@shared/schema';

export default function SitePreviewExample() {
  const sampleConfig: SiteConfiguration = {
    id: "demo-site",
    name: "Demo Website",
    description: "A demonstration of the dynamic site generation system",
    theme: {
      primaryColor: "#3b82f6",
      fontFamily: "Inter"
    },
    pages: [
      {
        id: "home",
        path: "/",
        title: "Home",
        description: "Welcome to our demo site",
        layout: "default",
        components: [
          {
            type: "banner",
            id: "hero",
            title: "Welcome to Dynamic SSG",
            subtitle: "Build beautiful static sites with JSON configuration",
            variant: "gradient"
          },
          {
            type: "text",
            id: "intro",
            content: "This demo shows how pages are generated from configuration data. Try switching between desktop, tablet, and mobile views using the buttons above.",
            variant: "paragraph"
          },
          {
            type: "card",
            id: "feature-card",
            title: "Easy Configuration",
            content: "Define your entire site structure using simple JSON files. No complex setup required.",
            image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
          }
        ]
      },
      {
        id: "about",
        path: "/about",
        title: "About",
        description: "Learn more about our platform",
        layout: "centered",
        components: [
          {
            type: "text",
            id: "about-heading",
            content: "About Our Platform",
            variant: "heading"
          },
          {
            type: "text",
            id: "about-content",
            content: "We make it easy to create static websites using JSON configuration. Perfect for content sites, portfolios, and landing pages.",
            variant: "paragraph"
          },
          {
            type: "button",
            id: "contact-btn",
            text: "Get in Touch",
            variant: "default",
            size: "default",
            link: "/contact"
          }
        ]
      }
    ]
  };

  return <SitePreview config={sampleConfig} />;
}