"use client";

import { useStorage, useMutation } from "@/lib/liveblocks.config";

export default function Name() {
  const name = useStorage(({ trip }) => trip.name);

  const updateName = useMutation(({ storage }, newName: string) => {
    const trip = storage.get("trip");
    trip.set("name", newName);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => updateName(e.target.value)}
      />
    </div>
  );
}
