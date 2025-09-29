import ConfigurableText from '../ConfigurableText';
import { TextComponent } from '@shared/schema';

export default function ConfigurableTextExample() {
  const textConfigs: TextComponent[] = [
    {
      type: "text",
      id: "main-heading",
      content: "Dynamic Page Generation",
      variant: "heading"
    },
    {
      type: "text",
      id: "sub-heading",
      content: "Powered by JSON Configuration",
      variant: "subheading"
    },
    {
      type: "text",
      id: "description",
      content: "This application demonstrates how to build static sites that are generated from JSON configuration files. Each page and component can be completely customized through configuration data.",
      variant: "paragraph"
    },
    {
      type: "text",
      id: "footer-note",
      content: "Built with Next.js and React",
      variant: "caption"
    }
  ];

  return (
    <div className="space-y-4">
      {textConfigs.map((config) => (
        <ConfigurableText key={config.id} config={config} />
      ))}
    </div>
  );
}