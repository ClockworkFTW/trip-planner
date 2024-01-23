import { create } from "zustand";
import { useQuery, useQueries } from "@tanstack/react-query";
import { useMutation, useStorage, useSelf } from "@/lib/liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import { useItem } from "./useItinerary";
import { nanoid } from "nanoid";
import type { Place } from "@/types/places";

async function getPlace(placeId: string) {
  const url = `/api/places/details?placeId=${placeId}`;
  const response = await fetch(url, { method: "GET" });
  const { place }: { place: Place } = await response.json();
  return place;
}

export function useGetPlace(placeId?: string | null) {
  return useQuery({
    queryKey: ["place", placeId],
    queryFn: () => getPlace(placeId!),
    staleTime: 10 * 60 * 1000,
    enabled: !!placeId,
  });
}

export function useGetPlaces() {
  const placeIds = useStorage(({ trip }) =>
    trip.itinerary.map((item) => item.placeId),
  );

  return useQueries({
    queries: placeIds.map((placeId) => ({
      queryKey: ["place", placeId],
      queryFn: () => getPlace(placeId),
      staleTime: 10 * 60 * 1000,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
}

export function useAddPlaceToItinerary() {
  return useMutation(({ storage }, placeId: string) => {
    const items = storage.get("trip").get("itinerary");

    const item = new LiveObject({
      itemId: nanoid(),
      placeId,
      cost: 0,
      time: "",
      notes: "",
      travelMode: "DRIVE",
      votes: new LiveList([]),
    });

    items.push(item);
  }, []);
}

export function useRemovePlaceFromItinerary() {
  return useMutation(({ storage }, placeId: string) => {
    const items = storage.get("trip").get("itinerary");
    const index = items.findIndex((item) => item.get("placeId") === placeId);
    items.delete(index);
  }, []);
}

export function useIsPlaceInItinerary(placeId: string) {
  return !!useStorage(({ trip }) =>
    trip.itinerary.find((item) => item.placeId === placeId),
  );
}

type ActiveRecommendedPlace = {
  id: string | null;
  set: (placeId: string) => void;
  clear: () => void;
};

const activeRecommendedPlace = create<ActiveRecommendedPlace>()((set) => ({
  id: null,
  set: (placeId) => set({ id: placeId }),
  clear: () => set({ id: null }),
}));

export function useActiveRecommendedPlace() {
  return activeRecommendedPlace((state) => state.id);
}

export function useSetActiveRecommendedPlace() {
  return activeRecommendedPlace((state) => state.set);
}

export function useClearActiveRecommendedPlace() {
  return activeRecommendedPlace((state) => state.clear);
}

export function useActiveItineraryPlace(placeId: string) {
  const user = useSelf();
  const activeItem = useItem(user.presence.activeItemId);
  return activeItem?.placeId === placeId;
}
