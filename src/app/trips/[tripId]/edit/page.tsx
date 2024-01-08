"use client";

import Map from "./components/Map";
import Title from "./components/Title";
import Room from "./components/Room";
import Search from "./components/Search";
import Itinerary from "./components/Itinerary";
import Delete from "./components/Delete";

type Props = { params: { tripId: string } };

export default function EditTrip({ params }: Props) {
  return (
    <Room id={params.tripId}>
      <Title />
      <Search />
      <Itinerary />
      <div className="h-96 w-full">
        <Map />
      </div>
      <Delete tripId={params.tripId} />
    </Room>
  );
}
