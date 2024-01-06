"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { nanoid } from "nanoid";
import { useMutation } from "@/lib/liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import type { PlaceAutocompletePrediction } from "@/lib/types";

export default function Search() {
  const types = "(regions)";

  const [input, setInput] = useState<string>("");
  const debouncedInput = useDebounce<string>(input, 500);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  const [predictions, setPredictions] = useState<PlaceAutocompletePrediction[]>(
    [],
  );

  async function searchPlaces() {
    const url = `/api/places?input=${debouncedInput}&types=${types}`;
    const response = await fetch(url, { method: "GET" });
    const data: { predictions: PlaceAutocompletePrediction[] } =
      await response.json();
    setPredictions(data.predictions);
  }

  useEffect(() => {
    if (debouncedInput === "") {
      setPredictions([]);
    } else {
      searchPlaces();
    }
  }, [debouncedInput]);

  const addPlaceToItinerary = useMutation(({ storage }, placeId: string) => {
    const items = storage.get("trip").get("itinerary");

    const item = new LiveObject({
      itemId: nanoid(),
      placeId,
      cost: 0,
      notes: "",
      votes: new LiveList([]),
    });

    items.push(item);

    setPredictions([]);
    setInput("");
  }, []);

  return (
    <div>
      <input
        className="w-full rounded-md border border-solid border-slate-300 p-2"
        type="text"
        placeholder="Search Places"
        value={input}
        onChange={handleInputChange}
      />
      {predictions.length !== 0 && (
        <ul className="mt-1 rounded border border-solid border-slate-300">
          {predictions.map((prediction, i) => {
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
                key={i}
                onClick={() => addPlaceToItinerary(place_id)}
                className="flex items-center justify-between p-2 hover:cursor-pointer hover:bg-slate-100"
              >
                <div>
                  <h1>
                    <PredictionText
                      text={main_text}
                      substrings={main_text_matched_substrings}
                    />
                  </h1>
                  <p className="text-xs text-slate-700">
                    <PredictionText
                      text={secondary_text}
                      substrings={secondary_text_matched_substrings}
                    />
                  </p>
                </div>
                <PredictionType types={prediction.types} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

type PredictionTextProps = {
  text?: string;
  substrings?: { length: number; offset: number }[];
};

function PredictionText({ text, substrings }: PredictionTextProps) {
  if (!text) return null;

  if (!substrings) return <span>{text}</span>;

  const { offset, length } = substrings[0];

  return (
    <span>
      {text.split("").map((char, i) => {
        if (i >= offset && i < offset + length) {
          return <b key={i}>{char}</b>;
        } else {
          return char;
        }
      })}
    </span>
  );
}

type PredictionTypeProps = { types?: string[] };

function PredictionType({ types }: PredictionTypeProps) {
  if (!types) return null;

  let content = "Other";

  if (types.includes("locality")) {
    content = "City";
  }

  if (types.includes("sublocality")) {
    content = "District";
  }

  if (types.includes("country")) {
    content = "Country";
  }

  if (types.includes("administrative_area_level_1")) {
    content = "State";
  }

  if (types.includes("administrative_area_level_2")) {
    content = "County";
  }

  return (
    <div className="rounded bg-slate-300 px-2 py-1 text-sm font-bold">
      {content}
    </div>
  );
}
