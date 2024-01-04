"use client";

import { useEffect, useState } from "react";

type Props = { params: { tripId: string } };

export default function TripView({ params }: Props) {
  const [trip, setTrip] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function getTrip() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/trips/${params.tripId}`, { method: "GET" });
      const { trip } = await res.json();
      setTrip(trip);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTrip();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (trip) {
    return <div>{trip.name}</div>;
  }

  return null;
}
