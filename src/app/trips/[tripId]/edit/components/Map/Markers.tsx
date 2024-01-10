"use client";

import { useEffect } from "react";
import { useStorage } from "@/lib/liveblocks.config";
import { useMap } from "@vis.gl/react-google-maps";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { usePlace } from "@/hooks/usePlace";
import { useItem } from "@/hooks/useItem";
import { useSelf } from "@/lib/liveblocks.config";
import clsx from "clsx";

export default function Markers() {
  const itinerary = useStorage(({ trip }) => trip.itinerary);

  return itinerary.map(({ itemId, placeId }, index) => (
    <MarkerWrapper key={itemId} placeId={placeId} order={index + 1} />
  ));
}

type MarkerWrapperProps = {
  placeId: string;
  order: number;
};

function MarkerWrapper({ placeId, order }: MarkerWrapperProps) {
  const { data: place } = usePlace(placeId);

  if (!place) return null;

  const position = {
    lat: place.location.latitude,
    lng: place.location.longitude,
  };

  return (
    <AdvancedMarker position={position}>
      <MarkerContent placeId={placeId} position={position} order={order} />
    </AdvancedMarker>
  );
}

type MarkerContentProps = {
  placeId: string;
  position: { lat: number; lng: number };
  order: number;
};

function MarkerContent({ placeId, position, order }: MarkerContentProps) {
  const map = useMap();
  const user = useSelf();

  const activeItem = useItem(user.presence.activeItemId);
  const isActive = activeItem?.placeId === placeId;

  useEffect(() => {
    if (map && isActive) {
      map.panTo(position);
    }
  }, [map, isActive]);

  return (
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
  );
}
