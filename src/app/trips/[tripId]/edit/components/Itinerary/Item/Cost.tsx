"use client";

import { useStorage, useMutation } from "@/lib/liveblocks.config";

type CostProps = { itemId: string };

export default function Cost({ itemId }: CostProps) {
  const cost = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.cost,
  );

  const updateCost = useMutation(({ storage }, cost: string) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    item?.set("cost", Number(cost));
  }, []);

  return (
    <label>
      Cost:{" "}
      <input
        type="number"
        value={cost}
        onChange={(e) => updateCost(e.target.value)}
      />
    </label>
  );
}
