import { PageConfig, ComponentConfig } from "@shared/schema";
import ConfigurableButton from "./ConfigurableButton";
import ConfigurableBanner from "./ConfigurableBanner";
import ConfigurableText from "./ConfigurableText";
import ConfigurableCard from "./ConfigurableCard";

interface PageRendererProps {
  config: PageConfig;
}

function renderComponent(component: ComponentConfig) {
  switch (component.type) {
    case "button":
      return <ConfigurableButton key={component.id} config={component} />;
    case "banner":
      return <ConfigurableBanner key={component.id} config={component} />;
    case "text":
      return <ConfigurableText key={component.id} config={component} />;
    case "card":
      return <ConfigurableCard key={component.id} config={component} />;
    default:
      return null;
  }
}

export default function PageRenderer({ config }: PageRendererProps) {
  const getLayoutClasses = () => {
    switch (config.layout) {
      case "centered":
        return "max-w-4xl mx-auto px-6";
      case "wide":
        return "max-w-7xl mx-auto px-8";
      default:
        return "max-w-6xl mx-auto px-6";
    }
  };

  return (
    <div className={`py-8 ${getLayoutClasses()}`} data-testid={`page-${config.id}`}>
      <div className="space-y-8">
        {config.components.map((component) => renderComponent(component))}
      </div>
    </div>
  );
}