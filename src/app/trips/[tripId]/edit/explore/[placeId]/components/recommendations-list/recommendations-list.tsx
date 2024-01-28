import { useRef, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { Element, Events } from "react-scroll";
import { sleep } from "@/utils/helpers";
import PhotoGallery from "./photo-gallery";

import {
  useAddPlaceToItinerary,
  useRemovePlaceFromItinerary,
  useIsPlaceInItinerary,
  useSetActiveRecommendedPlace,
} from "@/hooks/usePlaces";

import type { Place } from "@/types/places";

type RecommendationsListProps = { places: Place[] };

export default function RecommendationsList(props: RecommendationsListProps) {
  const { places } = props;

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
    <RecommendationItem
      key={place.id}
      place={place}
      order={index + 1}
      isScrolling={isScrolling}
    />
  ));
}

type RecommendationItemProps = {
  place: Place;
  order: number;
  isScrolling: boolean;
};

function RecommendationItem(props: RecommendationItemProps) {
  const { place, order, isScrolling } = props;

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
        className="p-4"
      >
        <div>{order}</div>
        <div className="font-bold">{place.displayName.text}</div>
        <div>{place.editorialSummary?.text}</div>
        <PhotoGallery photos={place.photos} />
        <button onClick={() => handleAddOrRemovePlace(place.id)}>
          {isPlaceInItinerary ? "Added" : "Add"}
        </button>
      </div>
    </Element>
  );
}
