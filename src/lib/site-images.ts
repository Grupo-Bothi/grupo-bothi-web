import fs from "fs";
import path from "path";

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
  cta: CtaImage;
};

const DATA_PATH = path.join(process.cwd(), "data", "images.json");
const DEFAULT_PATH = path.join(process.cwd(), "data", "images.default.json");

export function getSiteImages(): SiteImages {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

export function updateSiteImages(images: SiteImages): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(images, null, 2), "utf-8");
}

export function resetSiteImages(): SiteImages {
  const raw = fs.readFileSync(DEFAULT_PATH, "utf-8");
  const defaults: SiteImages = JSON.parse(raw);
  fs.writeFileSync(DATA_PATH, JSON.stringify(defaults, null, 2), "utf-8");
  return defaults;
}
