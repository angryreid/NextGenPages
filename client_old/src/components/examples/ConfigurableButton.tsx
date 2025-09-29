import ConfigurableButton from '../ConfigurableButton';
import { ButtonComponent } from '@shared/schema';

export default function ConfigurableButtonExample() {
  const buttonConfigs: ButtonComponent[] = [
    {
      type: "button",
      id: "primary-btn",
      text: "Get Started",
      variant: "default",
      size: "default",
      link: "/getting-started"
    },
    {
      type: "button", 
      id: "secondary-btn",
      text: "Learn More",
      variant: "outline",
      size: "default",
      link: "/docs"
    },
    {
      type: "button",
      id: "danger-btn", 
      text: "Delete Item",
      variant: "destructive",
      size: "sm"
    }
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {buttonConfigs.map((config) => (
        <ConfigurableButton key={config.id} config={config} />
      ))}
    </div>
  );
}