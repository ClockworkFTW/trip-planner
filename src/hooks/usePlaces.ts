import { useQueries } from "@tanstack/react-query";
import { useStorage } from "@/lib/liveblocks.config";
import type { Place } from "@/types/places";

async function getPlace(placeId: string) {
  const response = await fetch(`/api/places/${placeId}`, { method: "GET" });
  const { place }: { place: Place } = await response.json();
  return place;
}

export function usePlaces() {
  const placeIds = useStorage(({ trip }) =>
    trip.itinerary.map((item) => item.placeId),
  );

  return useQueries({
    queries: placeIds.map((placeId) => ({
      queryKey: ["place", placeId],
      queryFn: () => getPlace(placeId),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
}
