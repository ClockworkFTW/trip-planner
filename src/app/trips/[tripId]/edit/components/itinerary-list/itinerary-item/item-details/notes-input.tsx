import { useStorage, useMutation } from "@/lib/liveblocks.config";

type NotesInputProps = { itemId: string };

export default function Note(props: NotesInputProps) {
  const { itemId } = props;

  const notes = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.notes,
  );

  const updateNotes = useMutation(({ storage }, notes: string) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    item?.set("notes", notes);
  }, []);

  return (
    <input
      type="text"
      value={notes}
      placeholder="Notes..."
      onChange={(e) => updateNotes(e.target.value)}
      className="rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-600"
    />
  );
}
