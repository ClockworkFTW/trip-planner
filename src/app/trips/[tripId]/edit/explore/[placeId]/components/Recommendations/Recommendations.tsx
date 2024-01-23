"use client";

import { useRef, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { Element, Events } from "react-scroll";
import { sleep } from "@/util/helpers";

import {
  useAddPlaceToItinerary,
  useRemovePlaceFromItinerary,
  useIsPlaceInItinerary,
  useSetActiveRecommendedPlace,
} from "@/hooks/usePlaces";

import type { Place } from "@/types/places";

export default function Recommendations({ places }: { places: Place[] }) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    Events.scrollEvent.register("begin", () => {
      setIsScrolling(true);
    });

    Events.scrollEvent.register("end", async () => {
      await sleep(500);
      setIsScrolling(false);
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, []);

  return places.map((place, index) => (
    <Recommendation
      key={place.id}
      place={place}
      order={index + 1}
      isScrolling={isScrolling}
    />
  ));
}

type Props = { place: Place; order: number; isScrolling: boolean };

function Recommendation({ place, order, isScrolling }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const entry = useIntersectionObserver(ref, {});
  const isElementVisible = !!entry?.isIntersecting;

  const addPlaceToItinerary = useAddPlaceToItinerary();
  const removePlaceFromItinerary = useRemovePlaceFromItinerary();
  const setActiveRecommendedPlace = useSetActiveRecommendedPlace();

  const isPlaceInItinerary = useIsPlaceInItinerary(place.id);

  useEffect(() => {
    if (!isElementVisible || isScrolling) return;
    setActiveRecommendedPlace(place.id);
  }, [isElementVisible]);

  function handleAddOrRemovePlace(placeId: string) {
    if (isPlaceInItinerary) {
      removePlaceFromItinerary(placeId);
    } else {
      addPlaceToItinerary(placeId);
    }
  }

  return (
    <Element name={place.id}>
      <div
        ref={ref}
        onClick={() => setActiveRecommendedPlace(place.id)}
        className="p-2"
      >
        <div>{order}</div>
        <div className="font-bold">{place.displayName.text}</div>
        <div>{place.editorialSummary?.text}</div>
        <button onClick={() => handleAddOrRemovePlace(place.id)}>
          {isPlaceInItinerary ? "Added" : "Add"}
        </button>
      </div>
    </Element>
  );
}
