"use client";

import { useEffect, useState } from "react";
import { useStorage, useMutation } from "@/lib/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import Search from "@/components/search";
import type { Place } from "@/lib/types";

export default function Places() {
  const places = useStorage(({ trip }) => trip.places);

  const addPlace = useMutation(({ storage }, placeId: string) => {
    const places = storage.get("trip").get("places");
    const place = new LiveObject({ placeId, cost: 0, notes: "" });
    places.push(place);
  }, []);

  return (
    <div>
      <Search types="(regions)" onPredictionClick={addPlace} />
      <ul>
        {places.map((place) => (
          <Place key={place.placeId} {...place} />
        ))}
      </ul>
    </div>
  );
}

type PlaceProps = { placeId: string; cost: number; notes: string };

function Place({ placeId, cost, notes }: PlaceProps) {
  const [place, setPlace] = useState<Place>();

  async function getPlace() {
    const res = await fetch(`/api/places/${placeId}`, { method: "GET" });
    const { place } = await res.json();
    setPlace(place);
  }

  useEffect(() => {
    getPlace();
  }, []);

  const deletePlace = useMutation(({ storage }) => {
    const places = storage.get("trip").get("places");
    const index = places.findIndex((place) => place.get("placeId") === placeId);
    places.delete(index);
  }, []);

  return place ? (
    <li>
      <span>
        Name: {place.displayName.text} | Cost: ${cost} | Notes: {notes} |{" "}
      </span>
      <button onClick={deletePlace}>Delete</button>
    </li>
  ) : null;
}
