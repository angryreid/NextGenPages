import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteConfiguration } from "@shared/schema";
import PageRenderer from "./PageRenderer";
import { Monitor, Smartphone, Tablet, Globe } from "lucide-react";

interface SitePreviewProps {
  config: SiteConfiguration;
}

export default function SitePreview({ config }: SitePreviewProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [deviceView, setDeviceView] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const currentPage = config.pages[currentPageIndex];

  const getDeviceClasses = () => {
    switch (deviceView) {
      case "mobile":
        return "max-w-sm mx-auto";
      case "tablet":
        return "max-w-2xl mx-auto";
      default:
        return "w-full";
    }
  };

  const handlePageNavigation = (path: string) => {
    const pageIndex = config.pages.findIndex(page => page.path === path);
    if (pageIndex >= 0) {
      setCurrentPageIndex(pageIndex);
    }
    console.log(`Navigating to: ${path}`); // TODO: remove mock functionality
  };

  if (!currentPage) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No pages configured</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              {config.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {currentPage.title} ({currentPage.path})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={deviceView === "desktop" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("desktop")}
              data-testid="button-desktop-view"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === "tablet" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("tablet")}
              data-testid="button-tablet-view"
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant={deviceView === "mobile" ? "default" : "outline"}
              size="sm"
              onClick={() => setDeviceView("mobile")}
              data-testid="button-mobile-view"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {config.pages.length > 1 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {config.pages.map((page, index) => (
              <Button
                key={page.id}
                variant={index === currentPageIndex ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPageIndex(index)}
                data-testid={`button-page-${page.id}`}
              >
                {page.title}
                <Badge variant="secondary" className="ml-2">
                  {page.path}
                </Badge>
              </Button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className={`transition-all duration-300 ${getDeviceClasses()}`}>
          <div className="bg-background border-x min-h-96 overflow-hidden">
            <PageRenderer config={currentPage} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}