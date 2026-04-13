"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Wind, Droplets, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Contact from "./Contact";
import { cn } from "@/lib/utils";

import type { HeroImage } from "../src/lib/site-images";

const stats = [
  { value: "5+", label: "Años de experiencia" },
  { value: "100+", label: "Proyectos completados" },
  { value: "24/7", label: "Soporte disponible" },
  { value: "100%", label: "Clientes satisfechos" },
];

const services = [
  { icon: Zap, label: "Electricidad" },
  { icon: Wind, label: "Climatización" },
  { icon: Droplets, label: "Plomería" },
  { icon: Sun, label: "Energía Solar" },
];

export default function Hero({ images = [] }: { images: HeroImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={img.url}
            alt={img.label}
            unoptimized={img.url.startsWith("http")}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e3a8a]/85 via-[#2547a0]/65 to-[#1a337d]/90" />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 pb-24">
        <Badge
          className={cn(
            "mb-6 bg-white/15 text-white border-white/25 backdrop-blur-sm px-4 py-1.5 text-sm",
            mounted && "animate-fade-in"
          )}
        >
          Ixmiquilpan, Hidalgo · Servicio profesional
        </Badge>

        <h1
          className={cn(
            "text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight",
            mounted && "animate-fade-in-up"
          )}
        >
          Grupo Bothi
        </h1>
        <p
          className={cn(
            "text-2xl md:text-3xl lg:text-4xl font-bold text-blue-200 mt-2 mb-6",
            mounted && "animate-fade-in-up animation-delay-100"
          )}
        >
          MultiServicios
        </p>

        <p
          className={cn(
            "text-white/85 text-lg md:text-xl max-w-2xl mb-8",
            mounted && "animate-fade-in-up animation-delay-200"
          )}
        >
          Expertos en instalaciones eléctricas, climatización, plomería y
          energía solar para tu hogar o negocio.
        </p>

        {/* Service pills */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-10",
            mounted && "animate-fade-in-up animation-delay-300"
          )}
        >
          {services.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm"
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4",
            mounted && "animate-fade-in-up animation-delay-400"
          )}
        >
          <Contact className="bg-white text-[#2547a0] hover:bg-blue-50 rounded-full px-8 font-bold text-base shadow-xl h-12" />
          <a href="#servicios">
            <Button
              variant="outline"
              className="rounded-full px-8 h-12 border-white/60 text-white hover:bg-white/10 text-base font-semibold bg-transparent"
            >
              Ver Servicios
            </Button>
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#1a337d]/80 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-white font-black text-2xl md:text-3xl leading-none">
                  {stat.value}
                </p>
                <p className="text-white/65 text-xs md:text-sm mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/35"
            )}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
