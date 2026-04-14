"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type LightboxImage = {
  url: string;
  alt: string;
};

type Props = {
  images: LightboxImage[];
  initialIndex: number;
  onClose: () => void;
};

export default function ImageLightbox({ images, initialIndex, onClose }: Props) {
  const [current, setCurrent] = useState(initialIndex);
  const [visible, setVisible] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    // Only swipe horizontally if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      dx > 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-250",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95"
        onClick={handleClose}
      />

      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/25 transition-colors"
        onClick={handleClose}
        aria-label="Cerrar"
      >
        <X className="h-5 w-5 text-white" />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-white/60 text-sm font-medium tabular-nums">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Image area */}
      <div
        className="relative z-10 w-full h-full flex items-center justify-center px-16 md:px-24 py-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className={cn(
              "absolute inset-0 flex items-center justify-center px-16 md:px-24 py-16 transition-opacity duration-300",
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div className="relative w-full h-full">
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-contain select-none"
                unoptimized={img.url.startsWith("http")}
                sizes="100vw"
                priority={i === current}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 active:bg-white/30 transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 items-center">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              aria-label={`Ir a imagen ${i + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                i === current
                  ? "w-5 h-2 bg-white"
                  : "w-2 h-2 bg-white/35 hover:bg-white/60"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
