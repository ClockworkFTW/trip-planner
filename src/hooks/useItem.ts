import { useStorage } from "@/lib/liveblocks.config";

export function useItem(itemId?: string | null) {
  return useStorage(({ trip }) =>
    trip.itinerary.find((item) => item.itemId === itemId),
  );
}
