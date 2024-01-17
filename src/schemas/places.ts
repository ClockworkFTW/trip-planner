import { z } from "zod";

export const localizedText = z.object({
  text: z.string(),
  languageCode: z.string(),
});

export const location = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const viewport = z.object({
  low: location,
  high: location,
});

export const authorAttribution = z.object({
  displayName: z.string(),
  uri: z.string(),
  photoUri: z.string(),
});

export const photo = z.object({
  name: z.string(),
  widthPx: z.number(),
  heightPx: z.number(),
  authorAttributions: z.array(authorAttribution),
});

export const addressComponent = z.object({
  longText: z.string(),
  shortText: z.string(),
  types: z.array(z.string()),
  languageCode: z.string(),
});

export const place = z.object({
  id: z.string(),
  photos: z.array(photo),
  displayName: localizedText,
  formattedAddress: z.string(),
  googleMapsUri: z.string(),
  location: location,
  viewport: viewport,
  types: z.array(z.string()),
  editorialSummary: localizedText.optional(),
  addressComponents: z.array(addressComponent),
});
