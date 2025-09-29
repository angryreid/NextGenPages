import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SiteConfiguration, siteConfigSchema } from "@shared/schema";
import { AlertCircle, CheckCircle, Code, Eye } from "lucide-react";

interface ConfigEditorProps {
  initialConfig?: SiteConfiguration;
  onConfigChange?: (config: SiteConfiguration) => void;
  onPreview?: () => void;
}

export default function ConfigEditor({ initialConfig, onConfigChange, onPreview }: ConfigEditorProps) {
  const [configText, setConfigText] = useState(() => 
    JSON.stringify(initialConfig || getDefaultConfig(), null, 2)
  );
  const [parseError, setParseError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  const validateConfig = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      const result = siteConfigSchema.safeParse(parsed);
      
      if (result.success) {
        setParseError(null);
        setIsValid(true);
        if (onConfigChange) {
          onConfigChange(result.data);
        }
        return true;
      } else {
        setParseError(result.error.issues[0]?.message || "Invalid configuration");
        setIsValid(false);
        return false;
      }
    } catch (error) {
      setParseError("Invalid JSON syntax");
      setIsValid(false);
      return false;
    }
  };

  const handleConfigChange = (value: string) => {
    setConfigText(value);
    validateConfig(value);
  };

  const handlePreview = () => {
    if (isValid && onPreview) {
      onPreview();
    }
    console.log("Preview requested"); // TODO: remove mock functionality
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Configuration Editor
          </CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isValid ? "default" : "destructive"} className="gap-1">
            {isValid ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
            {isValid ? "Valid" : "Invalid"}
          </Badge>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handlePreview}
            disabled={!isValid}
            data-testid="button-preview"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={configText}
          onChange={(e) => handleConfigChange(e.target.value)}
          className="font-mono text-sm min-h-96 resize-none"
          placeholder="Enter your JSON configuration here..."
          data-testid="textarea-config"
        />
        {parseError && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border">
            <strong>Configuration Error:</strong> {parseError}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getDefaultConfig(): SiteConfiguration {
  return {
    id: "default-site",
    name: "My Dynamic Site",
    description: "A site built with JSON configuration",
    theme: {
      primaryColor: "#3b82f6",
      fontFamily: "Inter"
    },
    pages: [
      {
        id: "home",
        path: "/",
        title: "Home Page", 
        description: "Welcome to my dynamic site",
        layout: "default",
        components: [
          {
            type: "banner",
            id: "hero-banner",
            title: "Welcome to My Site",
            subtitle: "Built with dynamic configuration",
            variant: "gradient"
          },
          {
            type: "text",
            id: "intro-text",
            content: "This page was generated from JSON configuration. You can edit the configuration to change the content, layout, and components.",
            variant: "paragraph"
          },
          {
            type: "button",
            id: "cta-button",
            text: "Get Started",
            variant: "default",
            size: "lg"
          }
        ]
      }
    ]
  };
}