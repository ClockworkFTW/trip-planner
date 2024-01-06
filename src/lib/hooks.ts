import useSWRImmutable from "swr/immutable";
import type { Place } from "./types";

async function getPlace(url: string) {
  const response = await fetch(url, { method: "GET" });
  const { place }: { place: Place } = await response.json();
  return place;
}

export function usePlace(placeId: string) {
  const url = `/api/places/${placeId}`;
  const { data, error, isLoading } = useSWRImmutable(url, getPlace);
  return { place: data, isLoading, isError: error };
}
