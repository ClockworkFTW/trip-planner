import { useStorage, useMutation } from "@/lib/liveblocks.config";

export default function TitleInput() {
  const title = useStorage(({ trip }) => trip.title);

  const updateTitle = useMutation(({ storage }, newTitle: string) => {
    const trip = storage.get("trip");
    trip.set("title", newTitle);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => updateTitle(e.target.value)}
      />
    </div>
  );
}
