import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/pro-solid-svg-icons";
import { useMutation } from "@/lib/liveblocks.config";

type DeleteProps = { itemId: string };

export default function Delete({ itemId }: DeleteProps) {
  const deleteItem = useMutation(({ storage }) => {
    const itinerary = storage.get("trip").get("itinerary");
    const index = itinerary.findIndex((item) => item.get("itemId") === itemId);
    itinerary.delete(index);
  }, []);

  return (
    <button
      className="rounded-lg px-2 py-1 text-gray-600 hover:bg-gray-200"
      onClick={deleteItem}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
