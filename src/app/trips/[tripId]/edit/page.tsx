"use client";

import Members from "./components/Members";
import Map from "./components/Map";
import Title from "./components/Title";
import Search from "./components/Search";
import Itinerary from "./components/Itinerary";
import Delete from "./components/Delete";
import { useRoom } from "@/lib/liveblocks.config";

export default function EditTripPage() {
  const room = useRoom();

  const tripId = room.id;

  return (
    <div className="grid h-screen grid-cols-[55%_45%]">
      <div className="relative overflow-y-scroll">
        <div className="sticky top-0 z-10 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <Title />
            <div className="flex gap-2">
              <Members />
              <Delete tripId={tripId} />
            </div>
          </div>
          <Search />
        </div>
        <Itinerary />
      </div>
      <div className="h-full w-full">
        <Map />
      </div>
    </div>
  );
}
