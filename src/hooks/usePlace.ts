import { useQuery } from "@tanstack/react-query";
import type { Place } from "@/types/places";

async function getPlace(placeId: string) {
  const url = `/api/places/${placeId}`;
  const response = await fetch(url, { method: "GET" });
  const { place }: { place: Place } = await response.json();
  return place;
}

export function usePlace(placeId?: string | null) {
  return useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlace(placeId!),
    staleTime: 10 * 60 * 1000,
    enabled: !!placeId,
  });
}
