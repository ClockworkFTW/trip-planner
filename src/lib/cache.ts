import { kv } from "@vercel/kv";
import type { Photo, LocalizedText } from "@/types/places";

export async function getCachedDescription(placeId: string) {
  const key = `description:${placeId}`;

  const response: LocalizedText | null = await kv.get(key);

  return response;
}

export async function getCachedPhotos(placeId: string) {
  const key = `photos:${placeId}`;

  const response: Photo[] | null = await kv.get(key);

  return response;
}

export async function setCachedDescription(
  placeId: string,
  description: LocalizedText,
) {
  const key = `description:${placeId}`;

  const value = JSON.stringify(description);

  await kv.set(key, value);
}

export async function setCachedPhotos(placeId: string, photos: Photo[]) {
  const key = `photos:${placeId}`;

  const value = JSON.stringify(photos);

  await kv.set(key, value);
}
