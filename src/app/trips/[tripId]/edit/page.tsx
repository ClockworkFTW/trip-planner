"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Map from "./components/Map";
import Title from "./components/Title";
import Room from "./components/Room";
import Search from "./components/Search";
import Itinerary from "./components/Itinerary";

type Props = { params: { tripId: string } };

export default function EditTrip({ params }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function deleteTrip() {
    try {
      setIsLoading(true);
      await fetch(`/api/trips/${params.tripId}`, { method: "DELETE" });
      router.push(`/trips`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Room id={params.tripId}>
      <Title />
      <Search />
      <Itinerary />
      <div className="h-96 w-full">
        <Map />
      </div>

      <button onClick={deleteTrip}>
        {isLoading ? "Deleting Trip..." : "Delete Trip"}
      </button>
    </Room>
  );
}
