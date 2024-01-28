"use client";

import SignOutButton from "@/components/ui/sign-out-button";
import { useGetTrips } from "@/hooks/useTrips";
import Link from "next/link";

export default function TripList() {
  const { data: trips, isLoading } = useGetTrips();

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (trips) {
    content = (
      <div>
        <h1>Trip List</h1>
        <Link href="/trips/create">Create Trip</Link>
        <ul>
          {trips?.map((trip) => (
            <li key={trip.id}>
              <Link href={`/trips/${trip.id}/edit`}>{trip.title}</Link>
            </li>
          ))}
        </ul>
        <SignOutButton />
      </div>
    );
  }

  return content;
}
