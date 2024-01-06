"use client";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { usePlace } from "@/hooks/usePlace";
import clsx from "clsx";

type MarkerProps = {
  placeId: string;
  order: number;
  isActive: boolean;
};

export default function Marker({ placeId, order, isActive }: MarkerProps) {
  const { place } = usePlace(placeId);

  if (!place) return null;

  const position = {
    lat: place.location.latitude,
    lng: place.location.longitude,
  };

  return (
    <AdvancedMarker position={position}>
      <div
        className={clsx(
          "relative h-[30px] w-[30px] rounded-full bg-red-500",
          isActive && "scale-150",
        )}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-white">
          {order}
        </div>
      </div>
    </AdvancedMarker>
  );
}
