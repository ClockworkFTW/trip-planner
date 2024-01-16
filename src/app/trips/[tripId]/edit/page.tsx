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
        <div className="relative overflow-y-scroll">
          <div className="sticky top-0 z-10 bg-white p-3">
            <div className="mb-3 flex justify-between">
              <Title />
              <Delete tripId={params.tripId} />
            </div>
            <Search />
          </div>
          <Itinerary />
        </div>
        <div className="h-full w-full">
          <Map />
        </div>
      </div>
    </Room>
  );
}
