import { useQuery } from "@tanstack/react-query";

type Trip = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

async function getTrips() {
  const url = `/api/trips`;
  const response = await fetch(url, { method: "GET" });
  const { trips }: { trips: Trip[] } = await response.json();
  return trips;
}

export function useTrips() {
  return useQuery({
    queryKey: ["trip"],
    queryFn: getTrips,
  });
}
