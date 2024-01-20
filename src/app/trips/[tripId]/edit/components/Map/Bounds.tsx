"use client";

import { useEffect } from "react";
import { useMutation } from "@/lib/liveblocks.config";
import { useMap } from "@vis.gl/react-google-maps";
import { LiveObject } from "@liveblocks/client";
import { getBounds } from "@/lib/util";
import { usePlaces } from "@/hooks/usePlaces";
import type { Place, Bounds } from "@/types/places";

export default function Bounds() {
  const map = useMap();

  const { data, pending } = usePlaces();

  // Filter out any places that could not be fetched
  const places = data.filter((data): data is Place => !!data);

  const placeIds = places.map((place) => place.id);

  // Remove duplicates, sort and join IDs into single ID for triggering useEffect
  const triggerId = Array.from(new Set(placeIds)).sort().join("");

  useEffect(() => {
    if (triggerId && map && !pending) {
      let bounds: Bounds;

      if (places.length === 1) {
        bounds = { sw: places[0].viewport.low, ne: places[0].viewport.high };
      } else {
        bounds = getBounds(places.map((place) => place.location));
      }

      updateBounds(bounds);
    }
  }, [triggerId, pending]);

  const updateBounds = useMutation(({ storage }, { sw, ne }: Bounds) => {
    const bounds = new LiveObject({
      sw: new LiveObject({ latitude: sw.latitude, longitude: sw.longitude }),
      ne: new LiveObject({ latitude: ne.latitude, longitude: ne.longitude }),
    });

    storage.get("trip").set("bounds", bounds);
  }, []);

  return null;
}
