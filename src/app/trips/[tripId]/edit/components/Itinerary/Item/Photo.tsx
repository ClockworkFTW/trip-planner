"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/pro-regular-svg-icons";
import { useState } from "react";
import { usePlace } from "@/hooks/usePlace";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

type Props = { placeId: string };

export default function Photo({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  const photos = place?.photos.map((photo) => {
    if (photo.name.startsWith("places")) {
      const maxWidthPx = 600;
      const maxHeighPx = 360;
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
    <div className="relative h-[120px] w-[200px] flex-none overflow-hidden rounded-lg">
      {photos ? (
        <img src={photos[index]} className="h-full w-full object-cover" />
      ) : null}
      <button
        onClick={decrementIndex}
        className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        onClick={incrementIndex}
        className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}
