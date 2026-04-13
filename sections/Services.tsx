"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AirVent, Wrench, Clock, Phone, Hammer, ShowerHead } from "lucide-react";
import Contact from "./Contact";
import { useInView } from "../hooks/use-in-view";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Wrench,
    colorClass: "bg-blue-100 text-blue-600",
    accentClass: "border-t-blue-500",
    title: "Instalaciones Eléctricas",
    description:
      "Diseño, instalación y mantenimiento de sistemas eléctricos residenciales, comerciales e industriales con los más altos estándares de calidad y seguridad.",
    tag: "⚡ Energía confiable",
    badge: "24/7",
  },
  {
    icon: AirVent,
    colorClass: "bg-cyan-100 text-cyan-600",
    accentClass: "border-t-cyan-500",
    title: "Aire Acondicionado",
    description:
      "Instalación, mantenimiento y reparación de sistemas de climatización para hogares, oficinas y locales comerciales con eficiencia energética.",
    tag: "❄️ Tu confort, nuestra prioridad",
    badge: null,
  },
  {
    icon: ShowerHead,
    colorClass: "bg-amber-100 text-amber-600",
    accentClass: "border-t-amber-500",
    title: "Calentadores Solares",
    description:
      "Instalación y mantenimiento de sistemas solares para agua caliente. Ahorra energía y reduce costos con tecnología eco-amigable para tu hogar o negocio.",
    tag: "☀️ Energía limpia y eficiente",
    badge: null,
  },
  {
    icon: Hammer,
    colorClass: "bg-green-100 text-green-600",
    accentClass: "border-t-green-500",
    title: "Plomería",
    description:
      "Instalación, reparación y mantenimiento en sistemas de tuberías, fugas, drenajes y más. Soluciones rápidas y eficientes para hogares y negocios.",
    tag: "💧 Instalaciones y reparaciones",
    badge: "24/7",
  },
];

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            "text-center mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
            Nuestros Servicios
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Lo que hacemos mejor
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Expertos en electricidad, climatización, plomería y energía solar.
            Servicio profesional para tu hogar o negocio.
          </p>
          <div className="flex justify-center gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Servicio el mismo día
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              Soporte 24/7
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={cn(
                  "transition-all duration-700",
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <Card
                  className={cn(
                    "h-full border-t-4 hover:shadow-lg transition-shadow duration-300 group",
                    service.accentClass
                  )}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200",
                        service.colorClass
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    {service.badge && (
                      <Badge
                        variant="destructive"
                        className="self-start mb-3 text-xs"
                      >
                        Soporte {service.badge}
                      </Badge>
                    )}
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                      {service.description}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-gray-700">
                      {service.tag}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={cn(
            "text-center mt-12 transition-all duration-700 delay-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-muted-foreground mb-4 text-sm">
            ¿Necesitas algo más? Háblanos de tu proyecto
          </p>
          <Contact className="rounded-full px-8" />
        </div>
      </div>
    </section>
  );
}
