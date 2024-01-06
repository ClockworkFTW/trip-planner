"use client";

import { memo } from "react";
import { useStorage, useMutation } from "@/lib/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useUser } from "@clerk/nextjs";
import { usePlace } from "@/lib/hooks";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import type { DragEndEvent } from "@dnd-kit/core";

export default function Itinerary() {
  const itinerary = useStorage(({ trip }) => trip.itinerary);

  const itemIds = itinerary.map(({ itemId }) => itemId);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = itinerary.findIndex((item) => item.itemId === active.id);
      const newIndex = itinerary.findIndex((item) => item.itemId === over.id);

      moveItems(oldIndex, newIndex);
    }
  }

  const moveItems = useMutation(
    ({ storage }, oldIndex: number, newIndex: number) => {
      const itinerary = storage.get("trip").get("itinerary");
      itinerary.move(oldIndex, newIndex);
    },
    [],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
    >
      <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
        {itinerary.map(({ itemId, placeId }, index) => (
          <SortableItem
            key={itemId}
            itemId={itemId}
            placeId={placeId}
            order={index + 1}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

type ItemProps = { itemId: string; placeId: string; order: number };

function SortableItem({ itemId, placeId, order }: ItemProps) {
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
  const { place } = usePlace(placeId);

  return place ? (
    <div className="m-2 flex rounded-md bg-slate-100 p-2">
      <div className="mr-4 flex-none">{order}</div>
      <div className="flex flex-auto gap-4">
        <span className="font-bold">{place.displayName.text}</span>
        <CostInput itemId={itemId} />
        <NotesInput itemId={itemId} />
        <VotesInput itemId={itemId} />
      </div>
      <div className="flex-none">
        <DeleteButton itemId={itemId} />
      </div>
    </div>
  ) : null;
}

function CostInput({ itemId }: { itemId: string }) {
  const cost = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.cost,
  );

  const updateCost = useMutation(({ storage }, cost: string) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    item?.set("cost", Number(cost));
  }, []);

  return (
    <label>
      Cost:{" "}
      <input
        type="number"
        value={cost}
        onChange={(e) => updateCost(e.target.value)}
      />
    </label>
  );
}

function NotesInput({ itemId }: { itemId: string }) {
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
      Notes:{" "}
      <input
        type="text"
        value={notes}
        onChange={(e) => updateNotes(e.target.value)}
      />
    </label>
  );
}

function VotesInput({ itemId }: { itemId: string }) {
  const { user } = useUser();
  const userId = user?.id;

  const votes = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.votes,
  );

  const hasVoted = votes?.find((vote) => vote.userId === userId);

  const voteCount = votes?.reduce((count, vote) => count + vote.value, 0);

  const updateVotes = useMutation(({ storage }, value: number) => {
    if (!userId) return;

    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    const votes = item?.get("votes");

    const hasVoted = votes?.find((vote) => vote.get("userId") === userId);

    if (hasVoted) {
      const index = votes?.findIndex((vote) => vote.get("userId") === userId)!;
      votes?.delete(index);
    } else {
      const vote = new LiveObject({ userId, value });
      votes?.push(vote);
    }
  }, []);

  return (
    <>
      <span>Votes: {voteCount || 0}</span>
      <button
        onClick={() => updateVotes(1)}
        disabled={hasVoted && hasVoted.value === 1}
      >
        up
      </button>
      <button
        onClick={() => updateVotes(-1)}
        disabled={hasVoted && hasVoted.value === -1}
      >
        down
      </button>
    </>
  );
}

function DeleteButton({ itemId }: { itemId: string }) {
  const deleteItem = useMutation(({ storage }) => {
    const itinerary = storage.get("trip").get("itinerary");
    const index = itinerary.findIndex((item) => item.get("itemId") === itemId);
    itinerary.delete(index);
  }, []);

  return <button onClick={deleteItem}>Delete</button>;
}
