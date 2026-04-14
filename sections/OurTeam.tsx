/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useInView } from "../hooks/use-in-view";
import { cn } from "@/lib/utils";
import type { TeamMember } from "../src/lib/site-images";
import ImageLightbox from "@/components/ImageLightbox";
import type { LightboxImage } from "@/components/ImageLightbox";

export default function OurTeam({ team = [] }: { team: TeamMember[] }) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView();
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);
    return () => api.off("select", handleSelect);
  }, [api]);

  const lightboxImages: LightboxImage[] = team.map((m) => ({
    url: m.url,
    alt: m.name,
  }));

  return (
    <section id="equipo" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            "mb-14 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
            El equipo
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            Nuestro <span className="text-[#2547a0]">equipo</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl text-lg">
            Profesionales con años de experiencia listos para atender tu
            proyecto con dedicación y calidad.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={cn(
            "transition-all duration-700 delay-200",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {team.map((member, i) => (
                <CarouselItem
                  key={member.id}
                  className="pl-4 basis-3/4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div
                    className="group cursor-pointer"
                    onClick={() => setLightbox({ index: i })}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 shadow-md">
                      <Image
                        src={member.url}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized={member.url.startsWith("http")}
                        sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a337d]/85 via-[#2547a0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* View hint */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                          Ver foto
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <p className="text-white font-bold text-sm">{member.name}</p>
                        <p className="text-blue-200 text-xs">{member.role}</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" />
            <CarouselNext className="right-2 sm:right-4" />
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {team.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir a miembro ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current ? "w-8 bg-[#2547a0]" : "w-2 bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <ImageLightbox
          images={lightboxImages}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  );
}
