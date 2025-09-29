import { TextComponent } from "@shared/schema";

interface ConfigurableTextProps {
  config: TextComponent;
}

export default function ConfigurableText({ config }: ConfigurableTextProps) {
  const getVariantClasses = () => {
    switch (config.variant) {
      case "heading":
        return "text-2xl font-semibold text-foreground";
      case "subheading":
        return "text-lg font-medium text-foreground";
      case "caption":
        return "text-sm text-muted-foreground";
      default:
        return "text-base text-foreground";
    }
  };

  const Tag = config.variant === "heading" ? "h2" : 
             config.variant === "subheading" ? "h3" : 
             config.variant === "caption" ? "span" : "p";

  return (
    <Tag 
      className={getVariantClasses()}
      data-testid={`text-${config.id}`}
    >
      {config.content}
    </Tag>
  );
}