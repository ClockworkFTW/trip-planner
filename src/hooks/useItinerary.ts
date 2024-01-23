import { useStorage } from "@/lib/liveblocks.config";

export function useItinerary() {
  return useStorage((root) => {
    return root.trip.itinerary;
  });
}

export function useItem(itemId?: string | null) {
  return useStorage((root) => {
    return root.trip.itinerary.find((item) => item.itemId === itemId);
  });
}
