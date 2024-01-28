"use client";

import { Fragment } from "react";
import type { Prediction } from "@/types/predictions";

type Props = {
  destinations: Prediction[];
  removeDestination: (placeId: string) => void;
};

export default function Destinations({
  destinations,
  removeDestination,
}: Props) {
  return (
    <div className="text-2xl">
      <span>Trip to </span>
      {!!destinations.length ? (
        destinations.map((destination, index) => {
          const placeId = destination.place_id;
          const text = destination.structured_formatting.main_text;

          let spacer = "";

          if (index !== 0) {
            if (index + 1 === destinations.length) {
              spacer = " and ";
            } else {
              spacer = ", ";
            }
          }

          return (
            <Fragment key={placeId}>
              <span>{spacer}</span>
              <span
                onClick={() => removeDestination(placeId)}
                className="font-bold hover:cursor-pointer hover:text-blue-600"
              >
                {text}
              </span>
            </Fragment>
          );
        })
      ) : (
        <span>...</span>
      )}
    </div>
  );
}
