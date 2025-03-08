/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample testimonials data
const testimonials = [
  {
    quote:
      "El equipo se aseguró de que nuestra casa se construyera según las normas de eficiencia energética de nuestra ciudad. ¡Nos encanta nuestra nueva casa!",
    author: "Emmett Marsh",
  },
  {
    quote:
      "Profesionales y atentos en todo momento. El resultado final superó nuestras expectativas.",
    author: "María González",
  },
  {
    quote:
      "Cumplieron con los plazos y el presupuesto acordado. Recomendaría sus servicios sin dudarlo.",
    author: "Carlos Rodríguez",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full bg-[#1e3a8a] py-24 px-4 flex flex-col items-center justify-center min-h-[400px]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white text-4xl font-bold mb-16">
          Opiniones de nuestros clientes
        </h2>

        <div className="mb-16">
          <p className="text-white text-xl md:text-2xl font-medium mb-4 max-w-3xl mx-auto">
            "{testimonials[currentIndex].quote}"
          </p>
          <p className="text-white/80 text-sm">
            — {testimonials[currentIndex].author}
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            onClick={goToPrevious}
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={goToNext}
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
