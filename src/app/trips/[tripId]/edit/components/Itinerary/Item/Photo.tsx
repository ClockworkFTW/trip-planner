"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-solid-svg-icons";
import { useState } from "react";
import { useGetPlace } from "@/hooks/usePlaces";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type Props = { placeId: string };

export default function Photo({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  const photos = place?.photos.map((photo) => {
    if (photo.name.startsWith("places")) {
      const maxWidthPx = 600;
      const maxHeighPx = 600;
      return `https://places.googleapis.com/v1/${photo.name}/media?key=${API_KEY}&maxWidthPx=${maxWidthPx}&maxHeightPx=${maxHeighPx}`;
    } else {
      return photo.name;
    }
  });

  const [index, setIndex] = useState(0);

  function incrementIndex() {
    if (!photos) return;

    setIndex((index) => {
      console.log(index);
      if (index === photos.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  }

  function decrementIndex() {
    if (!photos) return;

    setIndex((index) => {
      console.log(index);
      if (index === 0) {
        return photos.length - 1;
      } else {
        return index - 1;
      }
    });
  }

  return (
    <div className="relative h-[160px] w-[160px] flex-none overflow-hidden rounded-lg">
      {photos ? (
        <img src={photos[index]} className="h-full w-full object-cover" />
      ) : null}
      <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 justify-between opacity-0 hover:opacity-100">
        <button
          onClick={decrementIndex}
          className="h-7 w-7 rounded-full bg-white"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          onClick={incrementIndex}
          className="h-7 w-7 rounded-full bg-white"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  );
}
