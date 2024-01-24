import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { scroller } from "react-scroll";
import clsx from "clsx";

import {
  useActiveRecommendedPlace,
  useSetActiveRecommendedPlace,
} from "@/hooks/usePlaces";

import type { Place } from "@/types/places";

export default function MarkerContainer({ places }: { places: Place[] }) {
  const setActivePlaceId = useSetActiveRecommendedPlace();

  return places.map((place, index) => {
    const placeId = place.id;

    const position = {
      lat: place.location.latitude,
      lng: place.location.longitude,
    };

    const order = index + 1;

    function handleClick() {
      setActivePlaceId(placeId);

      scroller.scrollTo(placeId, {
        containerId: "scroll",
        duration: 200,
        smooth: true,
      });
    }

    return (
      <AdvancedMarker key={placeId} position={position} onClick={handleClick}>
        <MarkerContent placeId={placeId} position={position} order={order} />
      </AdvancedMarker>
    );
  });
}

type MarkerContentProps = {
  placeId: string;
  position: { lat: number; lng: number };
  order: number;
};

function MarkerContent({ placeId, position, order }: MarkerContentProps) {
  const map = useMap();

  const activeRecommendedPlaceId = useActiveRecommendedPlace();
  const isPlaceActive = activeRecommendedPlaceId === placeId;

  useEffect(() => {
    if (map && isPlaceActive) {
      map.panTo(position);
    }
  }, [map, isPlaceActive]);

  return (
    <div
      className={clsx(
        "relative h-[30px] w-[30px] rounded-full bg-red-500",
        isPlaceActive && "scale-150",
      )}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-base font-bold text-white">
        {order}
      </div>
    </div>
  );
}
