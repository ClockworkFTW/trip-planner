"use client";

import { useState } from "react";
import { useDebounce } from "usehooks-ts";
import { usePredictions } from "@/hooks/usePredictions";
import Predictions from "./Predictions";

type SearchProps = { types: string; onClick: (placeId: string) => void };

export default function Search({ types, onClick }: SearchProps) {
  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce<string>(input, 500);

  const { data: predictions } = usePredictions({
    input: debouncedInput,
    types,
    reset: !input,
  });

  function handleClick(placeId: string) {
    onClick(placeId);
    setInput("");
  }

  return (
    <div>
      <input
        className="w-full rounded-md border border-solid border-slate-300 p-2"
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
