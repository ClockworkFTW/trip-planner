import { useQuery } from "@tanstack/react-query";
import type { Prediction } from "@/types/predictions";

async function getPredictions(input: string, types: string) {
  const url = `/api/places/predictions?input=${input}&types=${types}`;
  const response = await fetch(url, { method: "GET" });
  const { predictions }: { predictions: Prediction[] } = await response.json();
  return predictions;
}

type UsePredictionsArgs = { input: string; types: string; reset: boolean };

export function usePredictions({ input, types, reset }: UsePredictionsArgs) {
  const { data, ...rest } = useQuery({
    queryKey: ["prediction", input, types],
    queryFn: () => getPredictions(input, types),
    staleTime: 10 * 60 * 1000,
    enabled: !!input,
  });

  return { data: reset ? undefined : data, ...rest };
}
