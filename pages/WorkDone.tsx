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
import { useMediaQuery } from "../hooks/use-media-query";

// Sample services data - replace with your actual services
const services = [
  {
    id: 1,
    title: "Web Development",
    description: "Custom websites and web applications",
    imageUrl: "/trabajo1.jpeg?height=400&width=600",
    width: 600,
    height: 400,
  },
  {
    id: 2,
    title: "Mobile App Design",
    description: "iOS and Android applications",
    imageUrl: "/trabajo2.jpeg?height=500&width=400",
    width: 400,
    height: 500,
  },
  {
    id: 3,
    title: "E-commerce Solutions",
    description: "Online stores and payment systems",
    imageUrl: "/trabajo3.jpeg?height=350&width=650",
    width: 650,
    height: 350,
  },
  {
    id: 4,
    title: "Brand Identity",
    description: "airs, color schemes, and brand guidelines",
    imageUrl: "/trabajo4.jpeg?height=450&width=450",
    width: 450,
    height: 450,
  },
  {
    id: 5,
    title: "UI/UX Design",
    description: "User-centered interface design",
    imageUrl: "/trabajo5.jpeg?height=380&width=580",
    width: 580,
    height: 380,
  },
];

export default function WorkDone() {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 bg-white">
      <h2 className="text-3xl font-bold text-center mb-2">
        Nuestros Proyectos
      </h2>
      <p className="text-muted-foreground text-center mb-5 max-w-2xl mx-auto">
        Una muestra de los proyectos y servicios que hemos prestado a nuestros
        clientes.
      </p>

      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {services.map((service) => (
            <CarouselItem
              key={service.id}
              className="md:basis-2/3 lg:basis-1/2 xl:basis-1/3 p-2"
            >
              <Card className="border-none inset-shadow-sm overflow-hidden h-full">
                <CardContent className="p-0">
                  <div
                    className="relative w-full"
                    style={{ height: isMobile ? "200px" : "280px" }}
                  >
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={current === service.id - 1}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 py-4">
          {services.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                current === index ? "bg-primary" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <CarouselPrevious className="left-2 sm:left-4" />
        <CarouselNext className="right-2 sm:right-4" />
      </Carousel>
    </div>
  );
}
