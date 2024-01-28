"use client";

import SearchPlaces from "@/components/ui/search-places";
import type { Prediction } from "@/types/predictions";

type SearchProps = { addDestination: (prediction: Prediction) => void };

export default function Search(props: SearchProps) {
  const { addDestination } = props;

  function handleClick(prediction: Prediction) {
    addDestination(prediction);
  }

  return <SearchPlaces types="(regions)" onClick={handleClick} />;
}
