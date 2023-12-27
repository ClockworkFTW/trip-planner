"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTrip() {
  const router = useRouter();

  const [name, setName] = useState("");

  async function handleCreateTrip() {
    const body = JSON.stringify({ name });
    const res = await fetch("/api/trips", { method: "POST", body });
    const { tripId } = await res.json();
    router.push(`/trips/${tripId}/edit`);
  }

  return (
    <div>
      <h1>Create Trip</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreateTrip}>Create Trip</button>
    </div>
  );
}
