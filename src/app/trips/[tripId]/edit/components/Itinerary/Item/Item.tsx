"use client";

import { memo } from "react";
import { useUpdateMyPresence } from "@/lib/liveblocks.config";
import { usePlace } from "@/hooks/usePlace";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Order from "./Order";
import Note from "./Note";
import Vote from "./Vote";
import Cost from "./Cost";
import Route from "./Route";
import Photo from "./Photo";
import Delete from "./Delete";

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
  const { data: place } = usePlace(placeId);

  const updateMyPresence = useUpdateMyPresence();

  function setActiveItemId() {
    updateMyPresence({ activeItemId: itemId });
  }

  return place ? (
    <>
      <div onClick={setActiveItemId} className="m-4 flex gap-4">
        <div className="flex min-w-0 flex-auto flex-col justify-between rounded-lg bg-gray-200 p-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Order itemId={itemId} order={order} />
              <span className="font-bold">{place.displayName.text}</span>
            </div>
            <Delete itemId={itemId} />
          </div>
          <div className="my-1">{place.editorialSummary?.text}</div>

          <div className="flex justify-between gap-3 align-bottom">
            <Cost itemId={itemId} />
            <Note itemId={itemId} />
            <Vote itemId={itemId} />
          </div>
        </div>
        <Photo placeId={placeId} />
      </div>
      <Route itemId={itemId} />
    </>
  ) : null;
}
