"use client";

import Highlight from "./Highlight";
import Type from "./Type";
import type { Prediction } from "@/lib/types";

type Props = {
  predictions: Prediction[];
  onClick: (placeId: string) => void;
};

export default function Predictions({ predictions, onClick }: Props) {
  return (
    <ul className="mt-1 rounded border border-solid border-slate-300">
      {predictions.map((prediction) => {
        const { place_id } = prediction;

        if (!place_id) return null;

        const {
          main_text,
          main_text_matched_substrings,
          secondary_text,
          secondary_text_matched_substrings,
        } = prediction.structured_formatting;

        return (
          <li
            key={place_id}
            onClick={() => onClick(place_id)}
            className="flex items-center justify-between p-2 hover:cursor-pointer hover:bg-slate-100"
          >
            <div>
              <h1>
                <Highlight
                  text={main_text}
                  substrings={main_text_matched_substrings}
                />
              </h1>
              <p className="text-xs text-slate-700">
                <Highlight
                  text={secondary_text}
                  substrings={secondary_text_matched_substrings}
                />
              </p>
            </div>
            <Type types={prediction.types} />
          </li>
        );
      })}
    </ul>
  );
}
