import ConfigEditor from '../ConfigEditor';
import { SiteConfiguration } from '@shared/schema';

export default function ConfigEditorExample() {
  const handleConfigChange = (config: SiteConfiguration) => {
    console.log("Configuration updated:", config); // TODO: remove mock functionality
  };

  const handlePreview = () => {
    console.log("Preview mode activated"); // TODO: remove mock functionality  
  };

  return (
    <div className="h-96">
      <ConfigEditor 
        onConfigChange={handleConfigChange}
        onPreview={handlePreview}
      />
    </div>
  );
}