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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useInView } from "../hooks/use-in-view";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "../src/lib/site-images";
import ImageLightbox from "@/components/ImageLightbox";
import type { LightboxImage } from "@/components/ImageLightbox";

export default function WorkDone({ projects = [] }: { projects: ProjectImage[] }) {
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

  const lightboxImages: LightboxImage[] = projects.map((p) => ({
    url: p.url,
    alt: p.title,
  }));

  return (
    <section id="proyectos" className="py-20 bg-white">
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
            Portafolio
          </Badge>
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Nuestros Proyectos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Una muestra de los proyectos y servicios que hemos prestado a
            nuestros clientes.
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
            opts={{ align: "center", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, i) => (
                <CarouselItem
                  key={project.id}
                  className="md:basis-2/3 lg:basis-1/2 xl:basis-1/3 p-3"
                >
                  <Card
                    className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => setLightbox({ index: i })}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={project.url}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized={project.url.startsWith("http")}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        {/* View hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
                            Ver imagen
                          </span>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <Badge className="mb-2 bg-[#2547a0] text-white border-none text-xs">
                            {project.category}
                          </Badge>
                          <h3 className="text-white font-bold text-lg leading-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 sm:left-4" />
            <CarouselNext className="right-2 sm:right-4" />
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => api?.scrollTo(i)}
                aria-label={`Ir a proyecto ${i + 1}`}
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
