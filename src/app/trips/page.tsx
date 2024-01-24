"use client";

import { Suspense } from "react";
import SignOutButton from "@/components/SignOutButton";
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
        {isLoading && <p>Loading Trips...</p>}
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

  return <Suspense>{content}</Suspense>;
}
