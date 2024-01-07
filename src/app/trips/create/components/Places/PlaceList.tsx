"use client";

import PlaceItem from "./PlaceItem";

type Props = { placeIds: string[] };

export default function PlaceList({ placeIds }: Props) {
  return (
    <div>
      {placeIds.map((placeId) => (
        <PlaceItem key={placeId} placeId={placeId} />
      ))}
    </div>
  );
}
