import { Button } from "@/components/ui/button";
import { ButtonComponent } from "@shared/schema";

interface ConfigurableButtonProps {
  config: ButtonComponent;
  onClick?: () => void;
}

export default function ConfigurableButton({ config, onClick }: ConfigurableButtonProps) {
  const handleClick = () => {
    if (config.link) {
      // TODO: remove mock functionality - replace with actual navigation
      console.log(`Navigating to: ${config.link}`);
    }
    if (onClick) {
      onClick();
    }
    console.log(`Button clicked: ${config.text}`);
  };

  return (
    <Button
      variant={config.variant === "link" ? "ghost" : config.variant}
      size={config.size}
      onClick={handleClick}
      data-testid={`button-${config.id}`}
    >
      {config.text}
    </Button>
  );
}