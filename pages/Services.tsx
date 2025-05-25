import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  Zap,
  Home,
  Factory,
  AlertTriangle,
  Wrench,
  Phone,
  Clock,
} from "lucide-react";
import Contact from "./Contact";

// Define the service type
interface ElectricalService {
  icon: React.ReactNode;
  title: string;
  description: string;
  price?: string;
  emergency?: boolean;
}

// Sample electrical services data
const electricalServices: ElectricalService[] = [
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: "Residential Wiring",
    description:
      "Complete home electrical installations and rewiring services for new and existing properties.",
    price: "Starting at $150",
  },
  {
    icon: <Lightbulb className="h-10 w-10 text-primary" />,
    title: "Lighting Installation",
    description:
      "Professional installation of indoor and outdoor lighting fixtures, ceiling fans, and smart lighting systems.",
    price: "Starting at $85",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Electrical Repairs",
    description:
      "Quick and reliable repairs for outlets, switches, circuit breakers, and other electrical components.",
    price: "Starting at $95",
    emergency: true,
  },
  {
    icon: <Factory className="h-10 w-10 text-primary" />,
    title: "Commercial Services",
    description:
      "Comprehensive electrical solutions for offices, retail spaces, and industrial facilities.",
    price: "Custom quote",
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: "Emergency Services",
    description:
      "24/7 emergency electrical repairs to keep your home or business safe and operational.",
    price: "Starting at $150",
    emergency: true,
  },
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: "Electrical Maintenance",
    description:
      "Regular inspection and maintenance to prevent electrical issues and ensure safety compliance.",
    price: "Starting at $120",
  },
    {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: "Unas caguamas",
    description:
      "Regular inspection and maintenance to prevent electrical issues and ensure safety compliance.",
    price: "Starting at $120",
  },
];

export default function Services() {
  return (
    <div
      className="py-12 "
      style={{ backgroundColor: "hsl(0deg 1.54% 12.75% / 17%)" }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight">
          Nuestros Servicios
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Professional, licensed electricians providing reliable electrical
          services for residential and commercial properties.
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm">Servicio el mismo día</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm">Soporte 24/7</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {electricalServices.map((service, index) => (
          <Card
            key={index}
            className="border border-border hover:shadow-md transition-shadow duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="mb-4">{service.icon}</div>
                {service.emergency && (
                  <Badge variant="destructive" className="ml-2">
                    24/7 Emergency
                  </Badge>
                )}
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription className="mt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {service.price && (
                <p className="font-medium text-lg">{service.price}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          ¿Necesita un servicio que no figura en la lista anterior?
        </p>
        <Contact className={'gap-2'} />
      </div>
    </div>
  );
}
