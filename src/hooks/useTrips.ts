import useSWR from "swr";

type Trip = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
};

async function getTrips(url: string) {
  const response = await fetch(url, { method: "GET" });
  const { trips }: { trips: Trip[] } = await response.json();
  return trips;
}

export function useTrips() {
  const url = `/api/trips`;

  const { data, error, isLoading } = useSWR(url, getTrips);

  return { trips: data, isLoading, isError: error };
}
