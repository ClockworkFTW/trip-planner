"use client";

import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function Flag({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  let countryCode: string | null = null;
  let countryName: string | null = null;

  place?.addressComponents.forEach((component) => {
    if (component.types.includes("country")) {
      countryCode = component.shortText.toLowerCase();
      countryName = component.longText;
    }
  });

  const width = 24;
  const height = 18;

  const baseUrl = "https://flagcdn.com";

  const src = `${baseUrl}/${width}x${height}/${countryCode}.png`;
  const src2x = `${baseUrl}/${width * 2}x${height * 2}/${countryCode}.png`;
  const src3x = `${baseUrl}/${width * 2}x${height * 3}/${countryCode}.png`;
  const srcSet = `${src2x} 2x, ${src3x} 3x`;

  return countryCode && countryName ? (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-800">{countryName}</span>
      <img
        className="flex-none self-center rounded"
        src={src}
        srcSet={srcSet}
        width={width}
        height={height}
        alt={countryName}
      />
    </div>
  ) : null;
}
