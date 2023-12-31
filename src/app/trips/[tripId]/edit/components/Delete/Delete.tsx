"use client";

import { useDeleteTrip } from "@/hooks/useDeleteTrip";

export default function Delete({ tripId }: { tripId: string }) {
  const { mutate: deleteTrip, isPending } = useDeleteTrip();

  return (
    <button onClick={() => deleteTrip(tripId)}>
      {isPending ? "Deleting Trip..." : "Delete Trip"}
    </button>
  );
}
