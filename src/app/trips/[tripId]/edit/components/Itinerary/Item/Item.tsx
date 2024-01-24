import { memo } from "react";
import { useUpdateMyPresence } from "@/lib/liveblocks.config";
import { useGetPlace } from "@/hooks/usePlaces";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Order from "./Order";
import Flag from "./Flag";
import Vote from "./Vote";
import Route from "./Route";
import Photo from "./Photo";
import Delete from "./Delete";
import Details from "./Details";

type ItemProps = { itemId: string; placeId: string; order: number };

export default function SortableItem({ itemId, placeId, order }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MemoizedItem itemId={itemId} placeId={placeId} order={order} />
    </div>
  );
}

const MemoizedItem = memo(Item);

// ? Item always renders three times on mount

function Item({ itemId, placeId, order }: ItemProps) {
  const { data: place, isLoading } = useGetPlace(placeId);

  const updateMyPresence = useUpdateMyPresence();

  function setActiveItemId() {
    updateMyPresence({ activeItemId: itemId });
  }

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (place) {
    content = (
      <>
        <div onClick={setActiveItemId} className="m-4 flex gap-4 ">
          <Photo placeId={placeId} />
          <div className="flex min-w-0 flex-auto flex-col justify-between gap-2 rounded-lg bg-gray-100 p-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Order order={order} />
                <span className="font-bold text-gray-800">
                  {place.displayName.text}
                </span>
              </div>
              <Flag placeId={placeId} />
            </div>
            <div className="text-sm text-gray-500">
              {place.editorialSummary?.text}
            </div>
            <Details itemId={itemId} placeId={placeId} />
            <div className="flex justify-between gap-3 align-bottom">
              <Vote itemId={itemId} />
              <Delete itemId={itemId} />
            </div>
          </div>
        </div>
        <Route itemId={itemId} />
      </>
    );
  }

  return content;
}
