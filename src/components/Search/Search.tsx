"use client";

import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { usePredictions } from "@/hooks/usePredictions";
import Predictions from "./Predictions";
import type { Prediction } from "@/types/predictions";

type SearchProps = { types: string; onClick: (prediction: Prediction) => void };

export default function Search({ types, onClick }: SearchProps) {
  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce<string>(input, 500);

  const { data: predictions } = usePredictions({
    input: debouncedInput,
    types,
    reset: !input,
  });

  function handleClick(prediction: Prediction) {
    onClick(prediction);
    setInput("");
  }

  return (
    <div>
      <input
        className="w-full rounded-md border border-solid border-gray-300 p-2"
        type="text"
        placeholder="Search Places"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {predictions ? (
        <Predictions predictions={predictions} onClick={handleClick} />
      ) : null}
    </div>
  );
}
