"use client";

import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function DestinationItem({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  return place ? <div>{place.displayName.text}</div> : null;
}
