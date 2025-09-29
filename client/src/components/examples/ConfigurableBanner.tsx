import ConfigurableBanner from '../ConfigurableBanner';
import { BannerComponent } from '@shared/schema';

export default function ConfigurableBannerExample() {
  const bannerConfigs: BannerComponent[] = [
    {
      type: "banner",
      id: "hero-banner",
      title: "Welcome to Dynamic SSG",
      subtitle: "Build static sites with JSON configuration",
      variant: "gradient"
    },
    {
      type: "banner",
      id: "announcement-banner", 
      title: "New Features Available",
      subtitle: "Check out our latest component library updates",
      variant: "default"
    },
    {
      type: "banner",
      id: "image-banner",
      title: "Beautiful Layouts",
      subtitle: "Create stunning pages with ease",
      variant: "image",
      backgroundImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop"
    }
  ];

  return (
    <div className="space-y-6">
      {bannerConfigs.map((config) => (
        <ConfigurableBanner key={config.id} config={config} />
      ))}
    </div>
  );
}