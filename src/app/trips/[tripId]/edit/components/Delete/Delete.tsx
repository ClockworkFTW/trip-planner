import { useSearchParams } from "next/navigation";
import { useDeleteTrip } from "@/hooks/useTrips";

export default function Delete() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");

  const { mutate: deleteTrip, isPending } = useDeleteTrip();

  function handleDeleteTrip() {
    if (tripId) {
      deleteTrip(tripId);
    }
  }

  return (
    <button onClick={handleDeleteTrip}>
      {isPending ? "Deleting Trip..." : "Delete Trip"}
    </button>
  );
}
