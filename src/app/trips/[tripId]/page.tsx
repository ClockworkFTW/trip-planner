"use client";

import { useEffect, useState } from "react";

type Props = { params: { tripId: string } };

export default function TripView({ params }: Props) {
  const [trip, setTrip] = useState<any>(null);

  async function getTrip() {
    const res = await fetch(`/api/trips/${params.tripId}`, { method: "GET" });
    const { trip } = await res.json();
    setTrip(trip);
  }

  useEffect(() => {
    getTrip();
  }, []);

  return (
    <div>
      <h1>Trips</h1>
    </div>
  );
}
