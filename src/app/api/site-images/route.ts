import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteImages, getDefaultImages } from "@/lib/site-images";

export async function GET() {
  const images = await getSiteImages();
  return NextResponse.json(images);
}

export async function PATCH() {
  revalidatePath("/");
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

  try {
    const res = await fetch(`${apiBase}/api/v1/uploads`);
    if (res.ok) {
      const uploads: { id: string }[] = await res.json();
      await Promise.all(
        uploads.map((u) =>
          fetch(`${apiBase}/api/v1/uploads/${u.id}`, { method: "DELETE" }),
        ),
      );
    }
  } catch {
    // Si falla la limpieza, igual devolvemos los defaults
  }

  const defaults = getDefaultImages();
  revalidatePath("/");
  return NextResponse.json(defaults);
}
