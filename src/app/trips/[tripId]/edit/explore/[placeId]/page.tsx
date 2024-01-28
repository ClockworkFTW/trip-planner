"use client";

import { useRouter } from "next/navigation";
import { useRecommendations } from "@/hooks/useRecommendations";
import RecommendationsList from "./components/recommendations-list";
import ExploreMap from "./components/explore-map";

type ExplorePageProps = { params: { placeId: string } };

export default function ExplorePage(props: ExplorePageProps) {
  const {
    params: { placeId },
  } = props;

  const { data, isLoading, error } = useRecommendations(placeId, "test");

  const router = useRouter();

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (data) {
    content = (
      <div className="grid h-screen grid-cols-[55%_45%]">
        <div className="overflow-y-scroll" id="scroll">
          <button onClick={() => router.back()}>Back</button>
          <RecommendationsList places={data.places} />
        </div>
        <div className="h-full w-full">
          <ExploreMap places={data.places} bounds={data.bounds} />
        </div>
      </div>
    );
  }

  if (error) {
    content = <div>{error.message}</div>;
  }

  return content;
}
