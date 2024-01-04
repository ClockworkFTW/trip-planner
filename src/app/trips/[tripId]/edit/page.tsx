"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Room from "./room";

type Props = { params: { tripId: string } };

export default function EditTrip({ params }: Props) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function deleteTrip() {
    try {
      setIsLoading(true);
      await fetch(`/api/trips/${params.tripId}`, { method: "DELETE" });
      router.push(`/trips`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Room id={params.tripId}>
      <h1>Edit Trip</h1>
      <button onClick={deleteTrip}>
        {isLoading ? "Deleting Trip..." : "Delete Trip"}
      </button>
    </Room>
  );
}
