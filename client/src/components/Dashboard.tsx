import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteConfiguration, siteConfigSchema } from "@shared/schema";
import { useConfiguration } from "@/contexts/ConfigurationContext";
import ConfigEditor from "./ConfigEditor";
import SitePreview from "./SitePreview";
import { ThemeToggle } from "./ThemeToggle";
import { FileText, Eye, Settings, Download, Upload, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { config: currentConfig, setConfig, setIsBuilderMode } = useConfiguration();
  const [activeTab, setActiveTab] = useState("editor");
  const [, setLocation] = useLocation();

  const handleConfigChange = (config: SiteConfiguration) => {
    setConfig(config);
    console.log("Configuration updated in dashboard:", config); // TODO: remove mock functionality
  };

  const handlePreview = () => {
    setActiveTab("preview");
    console.log("Switching to preview mode"); // TODO: remove mock functionality
  };

  const handleExport = () => {
    if (currentConfig) {
      const dataStr = JSON.stringify(currentConfig, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `${currentConfig.name.toLowerCase().replace(/\s+/g, '-')}-config.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      console.log("Configuration exported"); // TODO: remove mock functionality
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const config = JSON.parse(e.target?.result as string);
            const result = siteConfigSchema.safeParse(config);
            if (result.success) {
              setConfig(result.data);
              console.log("Configuration imported successfully"); // TODO: remove mock functionality
            } else {
              console.error("Invalid configuration file"); // TODO: remove mock functionality
            }
          } catch (error) {
            console.error("Failed to parse configuration file"); // TODO: remove mock functionality
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dynamic SSG Builder</h1>
              <p className="text-muted-foreground">
                Create static sites with JSON configuration
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImport}
                  data-testid="button-import"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExport}
                  disabled={!currentConfig}
                  data-testid="button-export"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-fit grid-cols-2">
              <TabsTrigger value="editor" data-testid="tab-editor">
                <FileText className="w-4 h-4 mr-2" />
                Editor
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                disabled={!currentConfig}
                data-testid="tab-preview"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            {currentConfig && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {currentConfig.pages.length} page{currentConfig.pages.length !== 1 ? 's' : ''}
                  </Badge>
                  <Badge variant="outline">
                    {currentConfig.pages.reduce((acc, page) => acc + page.components.length, 0)} components
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsBuilderMode(false);
                      setLocation(currentConfig.pages[0]?.path || '/');
                    }}
                    data-testid="button-view-site"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Site
                  </Button>
                </div>
              </div>
            )}
          </div>

          <TabsContent value="editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
              <div>
                <ConfigEditor
                  initialConfig={currentConfig || undefined}
                  onConfigChange={handleConfigChange}
                  onPreview={handlePreview}
                />
              </div>
              <div>
                {currentConfig ? (
                  <SitePreview config={currentConfig} />
                ) : (
                  <Card className="h-full">
                    <CardContent className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Configure Your Site</h3>
                        <p className="text-muted-foreground">
                          Enter a valid JSON configuration to see your site preview
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {currentConfig && <SitePreview config={currentConfig} />}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}