import { z } from "zod";
import type { Photo, LocalizedText } from "@/types/places";

const descriptionResponseSchema = z.object({
  knowledgeGraph: z.object({ description: z.string() }).optional(),
});

const API_KEY = process.env.SERPER_API_KEY!;

export async function getDescription(query: string) {
  const url = `https://google.serper.dev/search`;

  const headers = new Headers();
  headers.set("X-API-KEY", API_KEY);
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify({ q: query });

  const response = await fetch(url, { method: "POST", headers, body });

  const data: unknown = await response.json();

  const parsedData = descriptionResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Serper description error");
  }

  if (!parsedData.data.knowledgeGraph) return null;

  const description: LocalizedText = {
    text: parsedData.data.knowledgeGraph.description,
    languageCode: "en",
  };

  return description;
}

const imageSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  imageWidth: z.number(),
  imageHeight: z.number(),
  thumbnailUrl: z.string(),
  thumbnailWidth: z.number(),
  thumbnailHeight: z.number(),
  source: z.string(),
  domain: z.string(),
  link: z.string(),
  googleUrl: z.string(),
  position: z.number(),
});

const imagesResponseSchema = z.object({
  images: z.array(imageSchema),
});

export async function getPhotos(query: string) {
  const url = `https://google.serper.dev/images`;

  const headers = new Headers();
  headers.set("X-API-KEY", API_KEY);
  headers.set("Content-Type", "application/json");

  const body = JSON.stringify({ q: query });

  const response = await fetch(url, { method: "POST", headers, body });

  const data: unknown = await response.json();

  const parsedData = imagesResponseSchema.safeParse(data);

  if (!parsedData.success) {
    throw new Error("Serper photos error");
  }

  const photos: Photo[] = parsedData.data.images.map((image) => ({
    name: image.imageUrl,
    widthPx: image.imageWidth,
    heightPx: image.imageHeight,
    authorAttributions: [
      {
        displayName: image.source,
        uri: image.domain,
        photoUri: image.link,
      },
    ],
  }));

  return photos;
}
