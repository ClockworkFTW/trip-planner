import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";

type Trip = {
  placeIds: string[];
  startDate: string;
  endDate: string;
};

async function createTrip(url: string, { arg }: { arg: Trip }) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
  const { tripId }: { tripId: string } = await response.json();
  return tripId;
}

export function useCreateTrip() {
  const router = useRouter();

  const url = `/api/trips`;

  const { trigger, error, isMutating } = useSWRMutation(url, createTrip, {
    onSuccess: (tripId) => {
      router.push(`/trips/${tripId}/edit`);
    },
  });

  return { createTrip: trigger, isLoading: isMutating, isError: error };
}
