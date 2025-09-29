import { useParams, useLocation } from 'wouter';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import PageRenderer from '@/components/PageRenderer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ArrowLeft } from 'lucide-react';

export default function DynamicPage() {
  const [location, setLocation] = useLocation();
  const { config, isBuilderMode, setIsBuilderMode } = useConfiguration();

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No site configuration loaded</p>
            <Button 
              onClick={() => setIsBuilderMode(true)}
              data-testid="button-setup-site"
            >
              <Settings className="w-4 h-4 mr-2" />
              Setup Site
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Find the page that matches the current path
  const currentPage = config.pages.find(page => page.path === location);

  if (!currentPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The page "{location}" doesn't exist in your site configuration.
            </p>
            {isBuilderMode && (
              <Button 
                onClick={() => setIsBuilderMode(true)}
                data-testid="button-edit-config"
              >
                <Settings className="w-4 h-4 mr-2" />
                Edit Configuration
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Builder mode controls */}
      {isBuilderMode && (
        <div className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Builder Mode:</span>
                <span className="font-medium">{currentPage.title}</span>
                <span>({currentPage.path})</span>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setLocation('/builder')}
                  data-testid="button-back-to-builder"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Builder
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsBuilderMode(false)}
                  data-testid="button-exit-builder-mode"
                >
                  Exit Builder Mode
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apply theme styles if available */}
      <style>{`
        :root {
          --theme-primary: ${config.theme?.primaryColor || '#3b82f6'};
          --theme-font: ${config.theme?.fontFamily || 'Inter'};
        }
        body {
          font-family: var(--theme-font), system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Page content */}
      <div data-testid={`dynamic-page-${currentPage.id}`}>
        <PageRenderer config={currentPage} />
      </div>
    </div>
  );
}