"use client";

import { useStorage, useMutation } from "@/lib/liveblocks.config";

type NoteProps = { itemId: string };

export default function Note({ itemId }: NoteProps) {
  const notes = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.notes,
  );

  const updateNotes = useMutation(({ storage }, notes: string) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    item?.set("notes", notes);
  }, []);

  return (
    <label>
      <span>Note: </span>
      <input
        type="text"
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
        className="w-[100px] rounded-lg"
      />
    </label>
  );
}
