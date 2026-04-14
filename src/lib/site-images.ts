const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type HeroImage = {
  id: string;
  url: string;
  label: string;
};

export type ProjectImage = {
  id: string;
  url: string;
  title: string;
  category: string;
};

export type TeamMember = {
  id: string;
  url: string;
  name: string;
  role: string;
};

export type CtaImage = {
  id: string;
  url: string;
  label: string;
};

export type SiteImages = {
  hero: HeroImage[];
  projects: ProjectImage[];
  team: TeamMember[];
  cta: CtaImage[];
};

export const MAX_IMAGES_PER_SECTION = 10;

// ─── Metadata estática (todos los slots posibles hasta 10) ───────────────────
export const SLOT_META = {
  hero: [
    { id: "hero_1", label: "Hero - Slide 1" },
    { id: "hero_2", label: "Hero - Slide 2" },
    { id: "hero_3", label: "Hero - Slide 3" },
    { id: "hero_4", label: "Hero - Slide 4" },
    { id: "hero_5", label: "Hero - Slide 5" },
    { id: "hero_6", label: "Hero - Slide 6" },
    { id: "hero_7", label: "Hero - Slide 7" },
    { id: "hero_8", label: "Hero - Slide 8" },
    { id: "hero_9", label: "Hero - Slide 9" },
    { id: "hero_10", label: "Hero - Slide 10" },
  ] as const satisfies { id: string; label: string }[],
  projects: [
    { id: "project_1", title: "La Casa Blanca", category: "Instalación Eléctrica" },
    { id: "project_2", title: "Bar 'Jamadi'", category: "Instalación Eléctrica" },
    { id: "project_3", title: "Bar 'El Despecho' Pachuca", category: "Instalación Eléctrica" },
    { id: "project_4", title: "Residencial Las Lomas de la Plata", category: "Instalación Eléctrica" },
    { id: "project_5", title: "Escuela Primaria Benito Juárez", category: "Aire Acondicionado" },
    { id: "project_6", title: "Proyecto 6", category: "Instalación Eléctrica" },
    { id: "project_7", title: "Proyecto 7", category: "Instalación Eléctrica" },
    { id: "project_8", title: "Proyecto 8", category: "Instalación Eléctrica" },
    { id: "project_9", title: "Proyecto 9", category: "Instalación Eléctrica" },
    { id: "project_10", title: "Proyecto 10", category: "Instalación Eléctrica" },
  ] as const satisfies { id: string; title: string; category: string }[],
  team: [
    { id: "team_1", name: "Juan Carlos Bothi", role: "Fundador" },
    { id: "team_2", name: "Mario Lopez", role: "Contratista General" },
    { id: "team_3", name: "Kevin Flores", role: "Contratista General" },
    { id: "team_4", name: "Santiago Pastor", role: "Contratista General" },
    { id: "team_5", name: "Miembro 5", role: "Contratista General" },
    { id: "team_6", name: "Miembro 6", role: "Contratista General" },
    { id: "team_7", name: "Miembro 7", role: "Contratista General" },
    { id: "team_8", name: "Miembro 8", role: "Contratista General" },
    { id: "team_9", name: "Miembro 9", role: "Contratista General" },
    { id: "team_10", name: "Miembro 10", role: "Contratista General" },
  ] as const satisfies { id: string; name: string; role: string }[],
  cta: [
    { id: "cta_1", label: "CTA - Imagen 1" },
    { id: "cta_2", label: "CTA - Imagen 2" },
    { id: "cta_3", label: "CTA - Imagen 3" },
    { id: "cta_4", label: "CTA - Imagen 4" },
    { id: "cta_5", label: "CTA - Imagen 5" },
    { id: "cta_6", label: "CTA - Imagen 6" },
    { id: "cta_7", label: "CTA - Imagen 7" },
    { id: "cta_8", label: "CTA - Imagen 8" },
    { id: "cta_9", label: "CTA - Imagen 9" },
    { id: "cta_10", label: "CTA - Imagen 10" },
  ] as const satisfies { id: string; label: string }[],
};

// ─── URLs por defecto (archivos en /public) ──────────────────────────────────
const DEFAULT_URLS: Record<string, string> = {
  hero_1: "/achievements3.jpeg",
  hero_2: "/achievements2.jpeg",
  hero_3: "/achievements1.jpeg",
  hero_4: "/achievements4.jpeg",
  project_1: "/trabajo1.jpeg",
  project_2: "/trabajo2.jpeg",
  project_3: "/trabajo3.jpeg",
  project_4: "/trabajo4.jpeg",
  project_5: "/trabajo5.jpeg",
  team_1: "/equipo5.jpeg",
  team_2: "/equipo6.jpeg",
  team_3: "/equipo4.jpeg",
  team_4: "/equipo3.jpeg",
  cta_1: "/areReady1.jpeg",
};

type ApiUpload = {
  id: string;
  url: string;
  filename: string;
};

export async function getSiteImages(): Promise<SiteImages> {
  let urlMap: Record<string, string> = {};

  try {
    const res = await fetch(`${API_BASE}/api/v1/uploads`, {
      cache: "no-store",
    });
    if (res.ok) {
      const uploads: ApiUpload[] = await res.json();
      for (const u of uploads) {
        const slotId = u.filename.replace(/\.[^.]+$/, "");
        urlMap[slotId] = u.url;
      }
    }
  } catch {
    // Si el API no responde, se usan las URLs por defecto
  }

  const getUrl = (id: string) => urlMap[id] ?? DEFAULT_URLS[id] ?? "";

  return {
    hero: SLOT_META.hero
      .map((s) => ({ ...s, url: getUrl(s.id) }))
      .filter((s) => s.url !== ""),
    projects: SLOT_META.projects
      .map((s) => ({ ...s, url: getUrl(s.id) }))
      .filter((s) => s.url !== ""),
    team: SLOT_META.team
      .map((s) => ({ ...s, url: getUrl(s.id) }))
      .filter((s) => s.url !== ""),
    cta: SLOT_META.cta
      .map((s) => ({ ...s, url: getUrl(s.id) }))
      .filter((s) => s.url !== ""),
  };
}

export function getDefaultImages(): SiteImages {
  return {
    hero: SLOT_META.hero.slice(0, 4).map((s) => ({ ...s, url: DEFAULT_URLS[s.id] ?? "" })),
    projects: SLOT_META.projects.slice(0, 5).map((s) => ({ ...s, url: DEFAULT_URLS[s.id] ?? "" })),
    team: SLOT_META.team.slice(0, 4).map((s) => ({ ...s, url: DEFAULT_URLS[s.id] ?? "" })),
    cta: SLOT_META.cta.slice(0, 1).map((s) => ({ ...s, url: DEFAULT_URLS[s.id] ?? "" })),
  };
}
