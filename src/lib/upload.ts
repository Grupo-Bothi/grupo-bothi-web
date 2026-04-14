const RAILS_API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type UploadResponse = {
  id: string;
  filename: string;
  content_type: string;
  byte_size: number;
  url: string;
};

export async function uploadImage(
  file: File,
  slotId?: string,
): Promise<UploadResponse> {
  const formData = new FormData();

  if (slotId) {
    const ext = file.name.split(".").pop() ?? "jpg";
    const renamed = new File([file], `${slotId}.${ext}`, { type: file.type });
    formData.append("file", renamed);
  } else {
    formData.append("file", file);
  }

  const response = await fetch(`${RAILS_API}/api/v1/uploads`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error al subir imagen: ${response.status} ${text}`);
  }

  return response.json();
}
