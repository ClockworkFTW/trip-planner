import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

async function deleteTrip(tripId: string) {
  const url = `/api/trips/${tripId}`;
  await fetch(url, { method: "DELETE" });
}

export function useDeleteTrip() {
  const router = useRouter();

  return useMutation({
    mutationFn: (tripId: string) => deleteTrip(tripId),
    onSuccess: () => {
      router.push(`/trips`);
    },
  });
}
