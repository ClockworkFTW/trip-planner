import useSWRImmutable from "swr/immutable";
import type { Place } from "@/lib/types";

async function getPlace(url: string) {
  const response = await fetch(url, { method: "GET" });
  const { place }: { place: Place } = await response.json();
  return place;
}

export function usePlace(placeId?: string | null) {
  const url = `/api/places/${placeId}`;

  const { data, error, isLoading } = useSWRImmutable(
    placeId ? url : null,
    getPlace,
  );

  return { place: data, isLoading, isError: error };
}
