"use client";

import { nanoid } from "nanoid";
import { useMutation } from "@/lib/liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import Search from "@/components/Search";

export default function ItemSearch() {
  const addPlaceToItinerary = useMutation(({ storage }, placeId: string) => {
    const items = storage.get("trip").get("itinerary");

    const item = new LiveObject({
      itemId: nanoid(),
      placeId,
      travelMode: "DRIVE",
      time: "",
      cost: 0,
      notes: "",
      votes: new LiveList([]),
    });

    items.push(item);
  }, []);

  return <Search types="all" onClick={addPlaceToItinerary} />;
}
