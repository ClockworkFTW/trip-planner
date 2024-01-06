"use client";

import { useMutation } from "@/lib/liveblocks.config";

type DeleteProps = { itemId: string };

export default function Delete({ itemId }: DeleteProps) {
  const deleteItem = useMutation(({ storage }) => {
    const itinerary = storage.get("trip").get("itinerary");
    const index = itinerary.findIndex((item) => item.get("itemId") === itemId);
    itinerary.delete(index);
  }, []);

  return <button onClick={deleteItem}>Delete</button>;
}
