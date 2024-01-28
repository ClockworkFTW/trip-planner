"use client";

import { useState } from "react";
import { useCreateTrip } from "@/hooks/useTrips";
import Search from "./components/search";
import Destinations from "./components/destinations";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import type { DateRange } from "react-day-picker";
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

  const [dates, setDates] = useState<DateRange | undefined>();

  function handleCreateTrip() {
    const startDate = dates?.from?.toString();
    const endDate = dates?.to?.toString();

    if (destinations.length && startDate && endDate) {
      const placeIds = destinations.map((destination) => destination.place_id);
      createTrip({ placeIds, startDate, endDate });
    }
  }

  return (
    <div>
      <Destinations
        destinations={destinations}
        removeDestination={removeDestination}
      />
      <Search addDestination={addDestination} />
      <DateRangePicker dates={dates} setDates={setDates} />
      <button onClick={handleCreateTrip}>
        {isPending ? "Creating Trip..." : "Create Trip"}
      </button>
    </div>
  );
}
