import { useQuery } from "@tanstack/react-query";
import { useStorage } from "@/lib/liveblocks.config";
import type { Route } from "@/types/routes";

type GetRoutesArgs = {
  placeIdA: string;
  placeIdB?: string;
  travelMode: string;
};

async function getRoutes({ placeIdA, placeIdB, travelMode }: GetRoutesArgs) {
  const url = `/api/places/routes?placeIdA=${placeIdA}&placeIdB=${placeIdB}&travelMode=${travelMode}`;
  const response = await fetch(url, { method: "GET" });
  const { routes }: { routes: Route[] } = await response.json();
  return routes;
}

export function useRoutes(itemId: string) {
  const itemIndex = useStorage(({ trip }) =>
    trip.itinerary.findIndex((item) => item.itemId === itemId),
  );

  const travelMode = useStorage(
    ({ trip }) => trip.itinerary[itemIndex].travelMode,
  );

  const placeIdA = useStorage(({ trip }) => trip.itinerary[itemIndex].placeId);

  const placeIdB = useStorage(({ trip }) => {
    if (trip.itinerary.length > itemIndex + 1) {
      return trip.itinerary[itemIndex + 1].placeId;
    }
  });

  return useQuery({
    queryKey: ["routes", placeIdA, placeIdB, travelMode],
    queryFn: () => getRoutes({ placeIdA, placeIdB, travelMode }),
    staleTime: 10 * 60 * 1000,
    enabled: !!placeIdB,
  });
}
