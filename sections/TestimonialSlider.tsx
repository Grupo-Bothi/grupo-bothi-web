"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useInView } from "../hooks/use-in-view";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "El equipo se aseguró de que nuestra casa se construyera según las normas de eficiencia energética. ¡El resultado nos encantó!",
    author: "Diana Perez",
    initials: "DP",
    stars: 5,
  },
  {
    quote:
      "Profesionales y atentos en todo momento. El resultado final superó nuestras expectativas. Muy recomendados.",
    author: "María González",
    initials: "MG",
    stars: 5,
  },
  {
    quote:
      "Cumplieron con los plazos y el presupuesto acordado. Recomendaría sus servicios sin dudarlo.",
    author: "Carlos Rodríguez",
    initials: "CR",
    stars: 5,
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView();

  return (
    <section className="py-20 bg-[#1e3a8a]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            "text-center mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-blue-300 font-semibold mb-2 text-sm uppercase tracking-wider">
            Testimonios
          </p>
          <h2 className="text-4xl font-black text-white">
            Opiniones de nuestros clientes
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={cn(
                "transition-all duration-700",
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/10 h-full hover:bg-white/15 transition-colors duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-white/90 text-base leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-white bg-white/20 font-semibold text-sm">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {t.author}
                      </p>
                      <p className="text-white/55 text-xs">Cliente verificado</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
