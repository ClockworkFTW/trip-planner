import { useParams } from "next/navigation";
import { useDeleteTrip } from "@/hooks/useTrips";

export default function DeleteTripButton() {
  const params = useParams<{ tripId: string }>();

  const { mutate: deleteTrip, isPending } = useDeleteTrip();

  function handleDeleteTrip() {
    deleteTrip(params.tripId);
  }

  return (
    <button onClick={handleDeleteTrip}>
      {isPending ? "Deleting Trip..." : "Delete Trip"}
    </button>
  );
}
