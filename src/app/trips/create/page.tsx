"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/search";
import type { PlaceAutocompletePrediction } from "@/lib/types";

export default function CreateTrip() {
  const router = useRouter();

  const [destinations, setDestinations] = useState<
    { placeId: string; name: string }[]
  >([]);

  function addDestination(prediction: PlaceAutocompletePrediction) {
    const newDestination = {
      name: prediction.structured_formatting.main_text,
      placeId: prediction.place_id!,
    };
    setDestinations((destinations) => [...destinations, newDestination]);
  }

  async function createTrip() {
    const body = JSON.stringify({ destinations });
    const res = await fetch("/api/trips", { method: "POST", body });
    const { tripId } = await res.json();
    router.push(`/trips/${tripId}/edit`);
  }

  return (
    <div>
      <div className="text-center">
        <h1>Plan a New Trip</h1>
        {destinations.map((destination) => (
          <span key={destination.placeId}>{destination.name}</span>
        ))}
      </div>
      <div className="my-5">
        <Search />
      </div>
      <div className="text-center">
        <button
          className="rounded bg-blue-500 px-3 py-2 text-white"
          onClick={createTrip}
        >
          Start Planning
        </button>
      </div>
    </div>
  );
}
