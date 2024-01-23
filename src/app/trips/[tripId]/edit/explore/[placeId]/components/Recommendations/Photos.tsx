"use client";

import type { Photo } from "@/types/places";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export default function Photos({ photos }: { photos: Photo[] }) {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="flex gap-4 overflow-y-scroll">
        {photos.map((photo) => {
          let url: string;

          if (photo.name.startsWith("places")) {
            const maxWidthPx = 600;
            const maxHeighPx = 600;
            url = `https://places.googleapis.com/v1/${photo.name}/media?key=${API_KEY}&maxWidthPx=${maxWidthPx}&maxHeightPx=${maxHeighPx}`;
          } else {
            url = photo.name;
          }

          return (
            <img
              key={url}
              src={url}
              className="h-[120px] flex-none overflow-hidden rounded-md object-cover"
            />
          );
        })}
      </div>
    </div>
  );
}
