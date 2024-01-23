"use client";

import { useGetPlace } from "@/hooks/usePlaces";

type Props = { placeId: string };

export default function DestinationItem({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  return place ? <div>{place.displayName.text}</div> : null;
}
