"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Name from "./name";
import Room from "./room";
import Search from "./search";
import Places from "./places";

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
      <Name />
      <Search />
      <Places />
      <button onClick={deleteTrip}>
        {isLoading ? "Deleting Trip..." : "Delete Trip"}
      </button>
    </Room>
  );
}
