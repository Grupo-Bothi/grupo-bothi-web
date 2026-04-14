"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, Loader2, ImageIcon, RefreshCw, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster, toast } from "sonner";
import { uploadImage } from "@/lib/upload";
import type {
  SiteImages,
  HeroImage,
  ProjectImage,
  TeamMember,
} from "@/lib/site-images";

// ─── Generic slot used in the UI ────────────────────────────────────────────
type Slot = { id: string; url: string; label: string };

function toSlots(
  items: HeroImage[] | ProjectImage[] | TeamMember[],
  section: "hero" | "projects" | "team",
): Slot[] {
  if (section === "hero")
    return (items as HeroImage[]).map((i) => ({
      id: i.id,
      url: i.url,
      label: i.label,
    }));
  if (section === "projects")
    return (items as ProjectImage[]).map((i) => ({
      id: i.id,
      url: i.url,
      label: `${i.title} · ${i.category}`,
    }));
  return (items as TeamMember[]).map((i) => ({
    id: i.id,
    url: i.url,
    label: `${i.name} · ${i.role}`,
  }));
}

// ─── Single image card with upload ──────────────────────────────────────────
function ImageCard({
  slot,
  onUploaded,
}: {
  slot: Slot;
  onUploaded: (id: string, newUrl: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const id = toast.loading("Subiendo imagen...");
    try {
      const result = await uploadImage(file, slot.id);
      onUploaded(slot.id, result.url);
      toast.success("Imagen actualizada", {
        id,
        description: result.filename,
      });
    } catch (err) {
      toast.error("Error al subir", {
        id,
        description: err instanceof Error ? err.message : "Inténtalo de nuevo",
      });
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <Card className="overflow-hidden group">
      <CardContent className="p-0">
        <div className="relative aspect-video bg-gray-100">
          {slot.url ? (
            <Image
              src={slot.url}
              alt={slot.label}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 320px"
              unoptimized={slot.url.startsWith("http")}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="sm"
              variant="secondary"
              disabled={loading}
              onClick={() => inputRef.current?.click()}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {loading ? "Subiendo..." : "Reemplazar"}
            </Button>
          </div>
        </div>

        <div className="p-3">
          <p className="text-sm font-medium text-gray-800 truncate">
            {slot.label}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5 font-mono">
            {slot.url}
          </p>
        </div>
      </CardContent>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </Card>
  );
}

// ─── Section grid ────────────────────────────────────────────────────────────
function SectionGrid({
  slots,
  section,
  onUploaded,
}: {
  slots: Slot[];
  section: "hero" | "projects" | "team";
  onUploaded: (section: string, id: string, url: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => (
        <ImageCard
          key={slot.id}
          slot={slot}
          onUploaded={(id, url) => onUploaded(section, id, url)}
        />
      ))}
    </div>
  );
}

// ─── Pull-to-refresh indicator ───────────────────────────────────────────────
const PULL_THRESHOLD = 72;

function PullIndicator({
  pullDelta,
  refreshing,
}: {
  pullDelta: number;
  refreshing: boolean;
}) {
  const visible = refreshing || pullDelta > 0;
  const ready = pullDelta >= PULL_THRESHOLD;

  const translateY = refreshing
    ? 20
    : pullDelta > 0
      ? Math.min(pullDelta - 36, 20)
      : -48;

  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-center pointer-events-none z-30"
      style={{
        transform: `translateY(${translateY}px)`,
        transition:
          pullDelta > 0 ? "none" : "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 shadow-lg text-sm font-medium
          ${ready || refreshing ? "bg-[#2547a0] text-white" : "bg-white text-gray-600 border"}`}
        style={{ transition: "background 0.2s, color 0.2s" }}
      >
        <RefreshCw
          className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          style={{
            transform: refreshing
              ? undefined
              : `rotate(${(pullDelta / PULL_THRESHOLD) * 240}deg)`,
            transition: refreshing ? undefined : "transform 0.05s linear",
          }}
        />
        {refreshing
          ? "Recargando..."
          : ready
            ? "Soltar para recargar"
            : "Jalar para recargar"}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [images, setImages] = useState<SiteImages | null>(null);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDelta, setPullDelta] = useState(0);

  // Refs used inside passive touch listeners to avoid stale closures
  const refreshingRef = useRef(false);
  const pullDeltaRef = useRef(0);
  const touchStartY = useRef(0);
  const refreshFnRef = useRef<() => Promise<void>>(undefined);

  // Initial load — shows skeleton
  const load = async () => {
    setImages(null);
    const res = await fetch("/api/site-images");
    const data: SiteImages = await res.json();
    setImages(data);
  };

  // Silent refresh — keeps existing images visible
  const refresh = useCallback(async () => {
    if (refreshingRef.current) return;
    refreshingRef.current = true;
    setRefreshing(true);
    try {
      const res = await fetch("/api/site-images");
      const data: SiteImages = await res.json();
      setImages(data);
      toast.success("Imágenes recargadas");
    } catch {
      toast.error("Error al recargar");
    } finally {
      refreshingRef.current = false;
      setRefreshing(false);
    }
  }, []);

  // Keep ref in sync so touch handlers always call the latest version
  useEffect(() => {
    refreshFnRef.current = refresh;
  }, [refresh]);

  useEffect(() => {
    load();
  }, []);

  // ── Pull-to-refresh touch handlers ─────────────────────────────────────────
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = window.scrollY === 0 ? e.touches[0].clientY : 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current || refreshingRef.current) return;
      const delta = e.touches[0].clientY - touchStartY.current;
      if (delta > 0) {
        const clamped = Math.min(delta * 0.55, PULL_THRESHOLD + 24);
        pullDeltaRef.current = clamped;
        setPullDelta(clamped);
      }
    };

    const onTouchEnd = () => {
      if (pullDeltaRef.current >= PULL_THRESHOLD) {
        refreshFnRef.current?.();
      }
      pullDeltaRef.current = 0;
      touchStartY.current = 0;
      setPullDelta(0);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []); // empty — handlers use refs only

  const handleUploaded = async (
    section: string,
    id: string,
    newUrl: string,
  ) => {
    if (!images) return;

    let updated: SiteImages = { ...images };
    if (section === "hero") {
      updated = {
        ...images,
        hero: images.hero.map((h) => (h.id === id ? { ...h, url: newUrl } : h)),
      };
    } else if (section === "projects") {
      updated = {
        ...images,
        projects: images.projects.map((p) =>
          p.id === id ? { ...p, url: newUrl } : p,
        ),
      };
    } else if (section === "team") {
      updated = {
        ...images,
        team: images.team.map((t) => (t.id === id ? { ...t, url: newUrl } : t)),
      };
    } else if (section === "cta") {
      updated = { ...images, cta: { ...images.cta, url: newUrl } };
    }

    setImages(updated);

    setSaving(true);
    try {
      const res = await fetch("/api/site-images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [section]: (updated as Record<string, unknown>)[section],
        }),
      });
      if (!res.ok) throw new Error("No se pudo guardar");
      toast.success("Cambios guardados");
    } catch {
      toast.error("Error al guardar la configuración");
    } finally {
      setSaving(false);
    }
  };

  const handleCtaUploaded = (id: string, newUrl: string) => {
    handleUploaded("cta", id, newUrl);
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "¿Restaurar todas las imágenes a los valores por defecto? Esta acción no se puede deshacer.",
      )
    )
      return;
    setResetting(true);
    const id = toast.loading("Restaurando valores por defecto...");
    try {
      const res = await fetch("/api/site-images", { method: "DELETE" });
      if (!res.ok) throw new Error("No se pudo restaurar");
      const defaults = await res.json();
      setImages(defaults);
      toast.success("Imágenes restauradas a los valores por defecto", { id });
    } catch {
      toast.error("Error al restaurar", { id });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster richColors position="top-right" />

      {/* Pull-to-refresh indicator */}
      <PullIndicator pullDelta={pullDelta} refreshing={refreshing} />

      {/* Top bar */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Administrador de Imágenes
            </h1>
            <p className="text-sm text-muted-foreground">
              Grupo Bothi · Landing Page
            </p>
          </div>
          <div className="flex items-center gap-2">
            {saving && (
              <Badge variant="secondary" className="gap-1.5">
                <Loader2 className="h-3 w-3 animate-spin" />
                Guardando...
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={resetting}
              className="gap-2 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              {resetting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
              {resetting ? "Restaurando..." : "Restaurar por defecto"}
            </Button>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="gap-2 bg-[#2547a0] hover:bg-[#1e3a8a]"
              >
                Ver sitio
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!images ? (
          // Loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <Skeleton className="aspect-video w-full" />
                  <div className="p-3 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="hero">
            <div className="flex items-center gap-2 mb-6">
              <TabsList>
                <TabsTrigger value="hero">
                  Hero{" "}
                  <Badge variant="secondary" className="ml-1.5">
                    {images.hero.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="projects">
                  Proyectos{" "}
                  <Badge variant="secondary" className="ml-1.5">
                    {images.projects.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="team">
                  Equipo{" "}
                  <Badge variant="secondary" className="ml-1.5">
                    {images.team.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="cta">CTA</TabsTrigger>
              </TabsList>
              <Button
                variant="outline"
                size="sm"
                onClick={refresh}
                disabled={refreshing}
                className="gap-1.5"
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
                {refreshing ? "Recargando..." : "Recargar"}
              </Button>
            </div>

            <TabsContent value="hero">
              <p className="text-sm text-muted-foreground mb-4">
                Imágenes del carrusel en la sección principal (hero). Se rotan
                automáticamente.
              </p>
              <SectionGrid
                slots={toSlots(images.hero, "hero")}
                section="hero"
                onUploaded={handleUploaded}
              />
            </TabsContent>

            <TabsContent value="projects">
              <p className="text-sm text-muted-foreground mb-4">
                Fotos de proyectos completados que aparecen en el carrusel de
                portafolio.
              </p>
              <SectionGrid
                slots={toSlots(images.projects, "projects")}
                section="projects"
                onUploaded={handleUploaded}
              />
            </TabsContent>

            <TabsContent value="team">
              <p className="text-sm text-muted-foreground mb-4">
                Fotos de los miembros del equipo.
              </p>
              <SectionGrid
                slots={toSlots(images.team, "team")}
                section="team"
                onUploaded={handleUploaded}
              />
            </TabsContent>

            <TabsContent value="cta">
              <p className="text-sm text-muted-foreground mb-4">
                Imagen de la sección &quot;¿Estás listo para construir tu
                visión?&quot;
              </p>
              <div className="max-w-sm">
                <ImageCard
                  slot={{
                    id: images.cta.id,
                    url: images.cta.url,
                    label: images.cta.label,
                  }}
                  onUploaded={handleCtaUploaded}
                />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
}
