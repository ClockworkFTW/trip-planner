"use client";

import TripMembers from "./components/trip-members";
import ItineraryMap from "./components/itinerary-map";
import TitleInput from "./components/title-input";
import Search from "./components/search";
import ItineraryList from "./components/itinerary-list";
import DeleteTripButton from "./components/delete-trip-button";

export default function EditTripPage() {
  return (
    <div className="grid h-screen grid-cols-[55%_45%]">
      <div className="relative overflow-y-scroll">
        <div className="sticky top-0 z-10 bg-white p-3">
          <div className="mb-3 flex items-center justify-between">
            <TitleInput />
            <div className="flex gap-2">
              <TripMembers />
              <DeleteTripButton />
            </div>
          </div>
          <Search />
        </div>
        <ItineraryList />
      </div>
      <div className="h-full w-full">
        <ItineraryMap />
      </div>
    </div>
  );
}
