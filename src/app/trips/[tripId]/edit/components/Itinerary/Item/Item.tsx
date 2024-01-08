"use client";

import { memo } from "react";
import { useMyPresence } from "@/lib/liveblocks.config";
import { usePlace } from "@/hooks/usePlace";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Note from "./Note";
import Vote from "./Vote";
import Cost from "./Cost";
import Delete from "./Delete";
import clsx from "clsx";

type ItemProps = { itemId: string; placeId: string; order: number };

export default function SortableItem({ itemId, placeId, order }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemId });

  const style = {
    transform: CSS.Transform.toString(transform),
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

  const [presence, updatePresence] = useMyPresence();

  const isActiveItem = presence.activeItemId === itemId;

  function setActiveItemId() {
    updatePresence({ activeItemId: itemId });
  }

  return place ? (
    <div
      onClick={setActiveItemId}
      className={clsx(
        "m-2 flex rounded-md bg-slate-100 p-2",
        isActiveItem && "outline outline-2 outline-red-600",
      )}
    >
      <div className="mr-4 flex-none">{order}</div>
      <div className="flex flex-auto gap-4">
        <span className="font-bold">{place.displayName.text}</span>
        <Cost itemId={itemId} />
        <Note itemId={itemId} />
        <Vote itemId={itemId} />
      </div>
      <div className="flex-none">
        <Delete itemId={itemId} />
      </div>
    </div>
  ) : null;
}
