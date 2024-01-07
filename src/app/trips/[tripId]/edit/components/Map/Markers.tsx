"use client";

import { useStorage } from "@/lib/liveblocks.config";
import Marker from "./Marker";

export default function Markers() {
  const itinerary = useStorage(({ trip }) => trip.itinerary);

  return itinerary.map(({ itemId, placeId }, index) => (
    <Marker key={itemId} placeId={placeId} order={index + 1} />
  ));
}
