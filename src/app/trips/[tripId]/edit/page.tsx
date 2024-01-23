"use client";

import Members from "./components/Members";
import Map from "./components/Map";
import Title from "./components/Title";
import Search from "./components/Search";
import Itinerary from "./components/Itinerary";
import Delete from "./components/Delete";
import { useRoom } from "@/lib/liveblocks.config";
import { useRouter } from "next/navigation";

export default function EditTripPage() {
  const room = useRoom();

  const tripId = room.id;

  const router = useRouter();

  return (
    <div className="grid h-screen grid-cols-[55%_45%]">
      <div className="relative overflow-y-scroll">
        <div className="sticky top-0 z-10 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <Title />
            <button
              onClick={() =>
                router.push(
                  "http://localhost:3000/trips/e1c9a353-8183-4d03-9158-6e4e50b5b033/edit/explore/ChIJu46S-ZZhLxMROG5lkwZ3D7k",
                )
              }
            >
              Explore
            </button>
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
