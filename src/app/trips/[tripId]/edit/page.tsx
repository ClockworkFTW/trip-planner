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
      <div className="grid h-screen grid-cols-[55%_45%]">
        <div>
          <div className="m-3 flex justify-between">
            <Title />
            <Delete tripId={params.tripId} />
          </div>
          <Search />
          <Itinerary />
        </div>
        <div className="h-full w-full">
          <Map />
        </div>
      </div>
    </Room>
  );
}
