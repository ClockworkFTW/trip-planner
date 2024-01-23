"use client";

import { useAddPlaceToItinerary } from "@/hooks/usePlaces";
import Search from "@/components/Search";

export default function ItemSearch() {
  const addPlaceToItinerary = useAddPlaceToItinerary();

  return <Search types="all" onClick={addPlaceToItinerary} />;
}
