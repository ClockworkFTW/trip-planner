"use client";

import { useGetPlace } from "@/hooks/usePlaces";

type Props = { placeId: string };

export default function Flag({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  let countryCode: string | null = null;
  let countryName: string | null = null;

  place?.addressComponents.forEach((component) => {
    if (component.types.includes("country")) {
      countryCode = component.shortText.toLowerCase();
      countryName = component.longText;
    }
  });

  return countryCode && countryName ? (
    <div className="flex items-center gap-2 self-start rounded-md bg-gray-200 p-1">
      <span className={`fi fi-${countryCode} fis rounded`}></span>
      <span className="pr-1 text-xs font-bold text-gray-600">
        {countryName}
      </span>
    </div>
  ) : null;
}
