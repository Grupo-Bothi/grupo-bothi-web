"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Contact from "./Contact";
import { Check } from "lucide-react";
import { useInView } from "../hooks/use-in-view";
import { cn } from "@/lib/utils";
import type { CtaImage } from "../src/lib/site-images";

const benefits = [
  "Atención personalizada para tu proyecto",
  "Presupuesto sin compromiso",
  "Técnicos certificados y con experiencia",
  "Garantía en todos nuestros trabajos",
  "Servicio de emergencias 24/7",
];

export default function AreYouReady({ cta = [] }: { cta: CtaImage[] }) {
  const { ref, inView } = useInView();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (cta.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % cta.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [cta.length]);

  const activeUrl = cta[currentIndex]?.url ?? "";

  return (
    <section className="py-20 w-full bg-gradient-to-br from-[#2547a0] to-[#1a337d]">
      <div className="container max-w-6xl mx-auto px-4">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={cn(
              "transition-all duration-700",
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Stacked images with fade transition */}
              <div className="relative w-full" style={{ aspectRatio: "500/600" }}>
                {cta.map((img, i) => (
                  <Image
                    key={img.id}
                    src={img.url}
                    unoptimized={img.url.startsWith("http")}
                    fill
                    alt={img.label}
                    className={cn(
                      "object-cover transition-opacity duration-1000",
                      i === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                ))}
                {/* Fallback for empty */}
                {cta.length === 0 && (
                  <div className="absolute inset-0 bg-[#1a337d]/30" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a337d]/40 to-transparent pointer-events-none" />

              {/* Dots — only if multiple images */}
              {cta.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {cta.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Imagen ${i + 1}`}
                      className={cn(
                        "rounded-full transition-all duration-300",
                        i === currentIndex
                          ? "w-5 h-2 bg-white"
                          : "w-2 h-2 bg-white/45 hover:bg-white/70"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(
              "text-white space-y-6 transition-all duration-700 delay-200",
              inView
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            )}
          >
            <div>
              <p className="text-blue-200 font-semibold mb-3 text-sm uppercase tracking-wider">
                ¿Listo para comenzar?
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
                ¿Estás listo para construir tu visión?
              </h2>
            </div>
            <p className="text-white/80 text-lg">
              Todo empieza con una idea. Cuéntanos tu proyecto y te daremos la
              solución perfecta con calidad garantizada.
            </p>

            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Contact className="bg-white text-[#2547a0] hover:bg-white/90 rounded-full px-8 h-12 text-base font-bold shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
