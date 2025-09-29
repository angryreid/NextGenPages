import ConfigurableCard from '../ConfigurableCard';
import { CardComponent } from '@shared/schema';

export default function ConfigurableCardExample() {
  const cardConfigs: CardComponent[] = [
    {
      type: "card",
      id: "feature-card-1",
      title: "JSON Configuration",
      content: "Define your pages and components using simple JSON configuration files. No code changes required for content updates.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      link: "/features/json-config"
    },
    {
      type: "card", 
      id: "feature-card-2",
      title: "Static Site Generation",
      content: "Leverage Next.js SSG capabilities to generate fast, SEO-friendly static sites at build time.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      link: "/features/ssg"
    },
    {
      type: "card",
      id: "feature-card-3", 
      title: "Component Library",
      content: "Extensible component system with buttons, banners, text blocks, and cards. Easy to add new component types.",
      link: "/features/components"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardConfigs.map((config) => (
        <ConfigurableCard key={config.id} config={config} />
      ))}
    </div>
  );
}