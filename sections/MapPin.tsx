import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapButtonProps {
  className?: string;
}

export default function MapButton({ className }: MapButtonProps) {
  const handleMapClick = () => {
    window.open(
      "https://maps.app.goo.gl/SawePsRznaAGJq9o9",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      onClick={handleMapClick}
      size="lg"
      variant="outline"
      className={className}
    >
      <MapPin className="h-4 w-4" />
      Ver en Mapa
    </Button>
  );
}
