import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type Trip = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
};

async function getTrips() {
  const url = `/api/trips`;
  const response = await fetch(url, { method: "GET" });
  const { trips }: { trips: Trip[] } = await response.json();
  return trips;
}

export function useGetTrips() {
  return useQuery({
    queryKey: ["trip"],
    queryFn: getTrips,
  });
}

type CreateTrip = Omit<Trip & { placeIds: string[] }, "id" | "title">;

async function createTrip(trip: CreateTrip) {
  const url = `/api/trips`;
  const body = JSON.stringify(trip);
  const response = await fetch(url, { method: "POST", body });
  const { tripId }: { tripId: string } = await response.json();
  return tripId;
}

export function useCreateTrip() {
  const router = useRouter();

  return useMutation({
    mutationFn: (trip: CreateTrip) => createTrip(trip),
    onSuccess: (tripId) => router.push(`/trips/${tripId}/edit`),
  });
}

async function deleteTrip(tripId: string) {
  const url = `/api/trips/${tripId}`;
  await fetch(url, { method: "DELETE" });
}

export function useDeleteTrip() {
  const router = useRouter();

  return useMutation({
    mutationFn: (tripId: string) => deleteTrip(tripId),
    onSuccess: () => router.push(`/trips`),
  });
}
