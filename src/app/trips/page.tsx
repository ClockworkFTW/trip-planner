"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Trips() {
  const router = useRouter();

  const [trips, setTrips] = useState<any[]>([]);

  async function getTrips() {
    const res = await fetch("/api/trips", { method: "GET" });
    const { trips } = await res.json();
    setTrips(trips);
  }

  const [isLoading, setIsLoading] = useState(false);

  async function createTrip() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/trips", { method: "POST" });
      const { tripId } = await res.json();
      router.push(`/trips/${tripId}/edit`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <div>
      <h1>Trips</h1>
      <button onClick={createTrip}>
        {isLoading ? "Creating Trip..." : "Create Trip"}
      </button>
      {trips.map((trip) => (
        <div key={trip.id}>
          <Link href={`/trips/${trip.id}/edit`}>{trip.data.name}</Link>
        </div>
      ))}
    </div>
  );
}
