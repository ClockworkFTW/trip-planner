"use client";

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
    <button className="text-gray-800" onClick={deleteItem}>
      <FontAwesomeIcon icon={faTrashCan} />
    </button>
  );
}
