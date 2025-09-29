import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardComponent } from "@shared/schema";

interface ConfigurableCardProps {
  config: CardComponent;
}

export default function ConfigurableCard({ config }: ConfigurableCardProps) {
  const handleCardClick = () => {
    if (config.link) {
      // TODO: remove mock functionality - replace with actual navigation  
      console.log(`Navigating to: ${config.link}`);
    }
    console.log(`Card clicked: ${config.title}`);
  };

  return (
    <Card 
      className="hover-elevate cursor-pointer transition-all duration-200"
      onClick={handleCardClick}
      data-testid={`card-${config.id}`}
    >
      {config.image && (
        <div className="w-full h-48 overflow-hidden rounded-t-md">
          <img 
            src={config.image} 
            alt={config.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{config.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{config.content}</p>
        {config.link && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            data-testid={`button-card-${config.id}`}
          >
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}