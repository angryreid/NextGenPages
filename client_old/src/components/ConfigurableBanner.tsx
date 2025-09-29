import { BannerComponent } from "@shared/schema";

interface ConfigurableBannerProps {
  config: BannerComponent;
}

export default function ConfigurableBanner({ config }: ConfigurableBannerProps) {
  const getVariantClasses = () => {
    switch (config.variant) {
      case "gradient":
        return "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground";
      case "image":
        return config.backgroundImage 
          ? "bg-cover bg-center text-white relative"
          : "bg-muted text-muted-foreground";
      default:
        return "bg-card text-card-foreground border";
    }
  };

  const backgroundStyle = config.variant === "image" && config.backgroundImage
    ? { backgroundImage: `url(${config.backgroundImage})` }
    : {};

  return (
    <div 
      className={`p-8 rounded-md ${getVariantClasses()}`}
      style={backgroundStyle}
      data-testid={`banner-${config.id}`}
    >
      {config.variant === "image" && config.backgroundImage && (
        <div className="absolute inset-0 bg-black/40 rounded-md" />
      )}
      <div className="relative z-10">
        <h2 className="text-3xl font-semibold mb-2">{config.title}</h2>
        {config.subtitle && (
          <p className="text-lg opacity-90">{config.subtitle}</p>
        )}
      </div>
    </div>
  );
}