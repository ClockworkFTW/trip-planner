"use client";

import Search from "@/components/Search";
import type { Prediction } from "@/types/predictions";

type Props = { addDestination: (prediction: Prediction) => void };

export default function ItemSearch({ addDestination }: Props) {
  function handleClick(prediction: Prediction) {
    addDestination(prediction);
  }

  return <Search types="(regions)" onClick={handleClick} />;
}
