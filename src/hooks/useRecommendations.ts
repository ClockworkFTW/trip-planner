import { useQuery } from "@tanstack/react-query";
import type { Place, Bounds } from "@/types/places";

async function getRecommendations(placeId: string, type: string) {
  const url = `/api/places/recommendations?placeId=${placeId}&type=${type}`;
  const response = await fetch(url, { method: "GET" });

  if (!response.ok) {
    const data: { message: string } = await response.json();
    throw new Error(data.message);
  } else {
    const data: { places: Place[]; bounds: Bounds } = await response.json();
    return data;
  }
}

export function useRecommendations(placeId: string, type: string) {
  return useQuery({
    queryKey: ["recommendation", placeId, type],
    queryFn: () => getRecommendations(placeId, type),
    staleTime: 10 * 60 * 1000,
  });
}
