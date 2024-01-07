"use client";

import { useTrips } from "@/hooks/useTrips";
import Link from "next/link";

export default function TripList() {
  const { trips, isLoading } = useTrips();

  return (
    <div>
      <h1>Trip List</h1>
      <Link href="/trips/create">Create Trip</Link>
      {isLoading && <p>Loading Trips...</p>}
      <ul>
        {trips?.map((trip) => (
          <li key={trip.id}>
            <Link href={`/trips/${trip.id}/edit`}>{trip.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
