"use client";

import { Suspense, useState } from "react";
import { useCreateTrip } from "@/hooks/useTrips";
import Calendar from "./components/calendar";
import Search from "./components/search";
import Destinations from "./components/destinations";
import type { Prediction } from "@/types/predictions";

export default function CreateTrip() {
  const { mutate: createTrip, isPending } = useCreateTrip();

  const [destinations, setDestinations] = useState<Prediction[]>([]);

  function addDestination(prediction: Prediction) {
    setDestinations((destinations) => [...destinations, prediction]);
  }

  function removeDestination(placeId: string) {
    setDestinations((destinations) =>
      destinations.filter((destination) => destination.place_id !== placeId),
    );
  }

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  function handleCreateTrip() {
    if (destinations.length && startDate && endDate) {
      const placeIds = destinations.map((destination) => destination.place_id);
      createTrip({ placeIds, startDate, endDate });
    }
  }

  return (
    <Suspense>
      <div>
        <Destinations
          destinations={destinations}
          removeDestination={removeDestination}
        />
        <Search addDestination={addDestination} />
        <Calendar
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <button onClick={handleCreateTrip}>
          {isPending ? "Creating Trip..." : "Create Trip"}
        </button>
      </div>
    </Suspense>
  );
}
