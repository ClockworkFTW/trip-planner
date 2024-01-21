import { Redis } from "@upstash/redis";
import type { Photo, LocalizedText } from "@/types/places";

const redis = new Redis({
  url: process.env.REDIS_URL!,
  token: process.env.REDIS_TOKEN!,
});

export async function getDescription(placeId: string) {
  const key = `description:${placeId}`;

  const response: LocalizedText | null = await redis.get(key);

  return response;
}

export async function getPhotos(placeId: string) {
  const key = `photos:${placeId}`;

  const response: Photo[] | null = await redis.get(key);

  return response;
}

export async function setDescription(
  placeId: string,
  description: LocalizedText,
) {
  const key = `description:${placeId}`;

  const value = JSON.stringify(description);

  await redis.set(key, value);
}

export async function setPhotos(placeId: string, photos: Photo[]) {
  const key = `photos:${placeId}`;

  const value = JSON.stringify(photos);

  await redis.set(key, value);
}
