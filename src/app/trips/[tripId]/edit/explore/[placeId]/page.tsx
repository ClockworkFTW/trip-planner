"use client";

import { useRecommendations } from "@/hooks/useRecommendations";
import Recommendations from "./components/Recommendations";
import Map from "./components/Map";

type Props = { params: { placeId: string } };

export default function ExplorePage({ params: { placeId } }: Props) {
  const { data, isLoading, error } = useRecommendations(placeId, "test");

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (data) {
    content = (
      <div className="grid h-screen grid-cols-[55%_45%]">
        <div className="overflow-y-scroll" id="scroll">
          <Recommendations places={data.places} />
        </div>
        <div className="h-full w-full">
          <Map places={data.places} bounds={data.bounds} />
        </div>
      </div>
    );
  }

  if (error) {
    content = <div>{error.message}</div>;
  }

  return content;
}
