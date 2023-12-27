"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Trips() {
  const [trips, setTrips] = useState<any[]>([]);

  async function getTrips() {
    const res = await fetch("/api/trips", { method: "GET" });
    const { trips } = await res.json();
    setTrips(trips);
  }

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div>
      <h1>Trips</h1>
      <Link href="/trips/create">Create Trip</Link>
      {trips.map((trip) => (
        <div key={trip.id}>
          <Link href={`/trips/${trip.id}/edit`}>{trip.data.name}</Link>
        </div>
      ))}
    </div>
  );
}
