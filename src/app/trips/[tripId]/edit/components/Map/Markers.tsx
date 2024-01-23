"use client";

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { useGetPlace, useActiveItineraryPlace } from "@/hooks/usePlaces";
import { useItinerary } from "@/hooks/useItinerary";
import clsx from "clsx";

export default function Markers() {
  const itinerary = useItinerary();

  return itinerary.map(({ itemId, placeId }, index) => (
    <MarkerWrapper key={itemId} placeId={placeId} order={index + 1} />
  ));
}

type MarkerWrapperProps = {
  placeId: string;
  order: number;
};

function MarkerWrapper({ placeId, order }: MarkerWrapperProps) {
  const { data: place } = useGetPlace(placeId);

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

  const isActiveItineraryPlace = useActiveItineraryPlace(placeId);

  useEffect(() => {
    if (map && isActiveItineraryPlace) {
      map.panTo(position);
    }
  }, [map, isActiveItineraryPlace]);

  return (
    <div
      className={clsx(
        "relative h-[30px] w-[30px] rounded-full bg-red-500",
        isActiveItineraryPlace && "scale-150",
      )}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-white">
        {order}
      </div>
    </div>
  );
}
