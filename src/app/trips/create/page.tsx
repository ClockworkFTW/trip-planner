"use client";

import { useState } from "react";
import { useCreateTrip } from "@/hooks/useCreateTrip";
import Calendar from "./components/Calendar";
import Search from "./components/Search";
import Places from "./components/Places";

export default function CreateTrip() {
  const { createTrip, isLoading } = useCreateTrip();

  const [placeIds, setPlaceIds] = useState<string[]>([]);

  function handleAddPlace(placeId: string) {
    setPlaceIds((placeIds) => [...placeIds, placeId]);
  }

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  function handleCreateTrip() {
    if (placeIds.length && startDate && endDate) {
      createTrip({
        placeIds,
        startDate,
        endDate,
      });
    }
  }

  return (
    <div>
      <Calendar
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Search onClick={handleAddPlace} />
      <Places placeIds={placeIds} />
      <button onClick={handleCreateTrip}>
        {isLoading ? "Creating Trip..." : "Create Trip"}
      </button>
    </div>
  );
}
