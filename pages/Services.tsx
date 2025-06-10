/* eslint-disable react/no-unescaped-entities */
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
  AirVent,
  Wrench,
  Phone,
  Clock,
  Hammer,
  ShowerHead,
} from "lucide-react";
import Contact from "./Contact";

interface ElectricalService {
  icon: React.ReactNode;
  title: string;
  description: string;
  subDescription?: string;
  emergency?: boolean;
}

const electricalServices: ElectricalService[] = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: "Instalaciones Electricas",
    description:
      "Expertos en diseño, instalación y mantenimiento de sistemas eléctricos residenciales, comerciales e industriales. Garantizamos soluciones seguras, eficientes y cumpliendo con los más altos estándares de calidad.",
    subDescription: "💡 ¡Iluminamos tus proyectos con energía confiable!",
    emergency: true,
  },
  {
    icon: <AirVent className="h-10 w-10 text-primary" />,
    title: "Aire Acondicionado",
    description:
      "Ofrecemos instalación, mantenimiento y reparación de sistemas de climatización para hogares, oficinas y locales comerciales. Garantizamos ambientes frescos y eficiencia energética con equipos de última tecnología.",
    subDescription: "❄️ ¡Tu confort, nuestra prioridad!",
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: "Plomería",
    description:
      "Servicios profesionales de instalación, reparación y mantenimiento en sistemas de tuberías, fugas, drenajes y más. Soluciones rápidas y eficientes para hogares y negocios.",
    subDescription: "🚿 ¡Instalaciones, reparaciones y mantenimiento!",
    emergency: true,
  },
  {
    icon: <ShowerHead className="h-10 w-10 text-primary" />,
    title: "Calentadores Solares",
    description:
      "Instalación y mantenimiento de sistemas solares para agua caliente. Ahorra energía y reduce costos con tecnología eco-amigable. ¡Soluciones sustentables para tu hogar o negocio!",
    subDescription: "☀️ Energía limpia, eficiente y al mejor precio.",
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
          "Expertos en: ⚡ Electricidad | ❄️ Climatización | 💧 Plomería | ☀️
          Energía solar
        </p>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          ¿Problemas en tu hogar o negocio? ¡Contáctanos para servicio rápido y
          profesional!"
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
                    Soporte 24/7
                  </Badge>
                )}
              </div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription className="mt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {service.subDescription && (
                <p className="font-medium text-lg">{service.subDescription}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground mb-4">
          ¿Necesita un servicio que no figura en la lista anterior?
        </p>
        <Contact className={"gap-2"} />
      </div>
    </div>
  );
}
