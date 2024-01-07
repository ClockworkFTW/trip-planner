import useSWRImmutable from "swr/immutable";
import type { Prediction } from "@/lib/types";

async function searchPlaces(url: string) {
  const response = await fetch(url, { method: "GET" });
  const { predictions }: { predictions: Prediction[] } = await response.json();
  return predictions;
}

type UseSearch = { input: string; types: string; reset: boolean };

export function useSearch({ input, types, reset }: UseSearch) {
  const url = `/api/places?input=${input}&types=${types}`;

  const { data, error, isLoading } = useSWRImmutable(
    input ? url : null,
    searchPlaces,
  );

  const predictions = reset ? undefined : data;

  return { predictions, isLoading, isError: error };
}
