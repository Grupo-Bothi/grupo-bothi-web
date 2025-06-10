"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "/achievements1.jpeg?height=800&width=1200",
    alt: "Slide 1",
  },
  {
    src: "/achievements2.jpeg?height=800&width=1200",
    alt: "Slide 2",
  },
  {
    src: "/achievements3.jpeg?height=800&width=1200",
    alt: "Slide 3",
  },
  {
    src: "/achievements4.jpeg?height=800&width=1200",
    alt: "Slide 4",
  },
];

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <div className="flex justify-between pb-20">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white">
          Grupo Bothi
        </h1>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-white">
          Multi Servicios
        </h1>
      </div>
      <div className="relative h-full w-full">
        <div className="relative h-full w-full">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            priority
            sizes="90vw"
            className="object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={cn(
              "h-2.5 w-2.5 rounded-full bg-white/50 transition-all",
              currentIndex === slideIndex && "w-8 bg-white"
            )}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
export default Achievements;
