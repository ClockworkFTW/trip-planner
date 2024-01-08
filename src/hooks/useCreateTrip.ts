import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Trip = {
  placeIds: string[];
  startDate: string;
  endDate: string;
};

async function createTrip(trip: Trip) {
  const url = `/api/trips`;
  const body = JSON.stringify(trip);
  const response = await fetch(url, { method: "POST", body });
  const { tripId }: { tripId: string } = await response.json();
  return tripId;
}

export function useCreateTrip() {
  const router = useRouter();

  return useMutation({
    mutationFn: (trip: Trip) => createTrip(trip),
    onSuccess: (tripId) => {
      router.push(`/trips/${tripId}/edit`);
    },
  });
}
