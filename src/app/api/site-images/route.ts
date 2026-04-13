import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteImages, updateSiteImages, resetSiteImages } from "@/lib/site-images";
import type { SiteImages } from "@/lib/site-images";

export async function GET() {
  const images = getSiteImages();
  return NextResponse.json(images);
}

export async function PATCH(request: Request) {
  const body: Partial<SiteImages> = await request.json();
  const current = getSiteImages();
  const updated = { ...current, ...body };
  updateSiteImages(updated);
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const defaults = resetSiteImages();
  revalidatePath("/");
  return NextResponse.json(defaults);
}
