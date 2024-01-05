"use client";

import { useEffect, useState } from "react";
import { useStorage, useMutation } from "@/lib/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useUser } from "@clerk/nextjs";

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

import type { Place } from "@/lib/types";

export default function Places() {
  const places = useStorage(({ trip }) => trip.places);
  const placeIds = places.map((place) => place.id);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = places.findIndex((place) => place.id === active.id);
      const newIndex = places.findIndex((place) => place.id === over.id);

      movePlaces(oldIndex, newIndex);
    }
  }

  const movePlaces = useMutation(
    ({ storage }, oldIndex: number, newIndex: number) => {
      const places = storage.get("trip").get("places");
      places.move(oldIndex, newIndex);
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
      <SortableContext items={placeIds} strategy={verticalListSortingStrategy}>
        {placeIds.map((placeId, index) => (
          <SortablePlace key={placeId} placeId={placeId} order={index + 1} />
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortablePlace({ placeId, order }: { placeId: string; order: number }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: placeId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Place placeId={placeId} order={order} />
    </div>
  );
}

function Place({ placeId, order }: { placeId: string; order: number }) {
  const [place, setPlace] = useState<Place>();

  async function getPlace() {
    const res = await fetch(`/api/places/${placeId}`, { method: "GET" });
    const { place } = await res.json();
    setPlace(place);
  }

  useEffect(() => {
    getPlace();
  }, []);

  return place ? (
    <div className="m-2 flex rounded-md bg-slate-100 p-2">
      <div className="mr-4 flex-none">{order}</div>
      <div className="flex flex-auto gap-4">
        <span className="font-bold">{place.displayName.text}</span>
        <CostInput placeId={placeId} />
        <NotesInput placeId={placeId} />
        <VotesInput placeId={placeId} />
      </div>
      <div className="flex-none">
        <DeleteButton placeId={placeId} />
      </div>
    </div>
  ) : null;
}

function CostInput({ placeId }: { placeId: string }) {
  const cost = useStorage(
    ({ trip }) => trip.places.find((place) => place.id === placeId)?.cost,
  );

  const updateCost = useMutation(({ storage }, cost: string) => {
    const places = storage.get("trip").get("places");
    const place = places.find((place) => place.get("id") === placeId);
    place?.set("cost", Number(cost));
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

function NotesInput({ placeId }: { placeId: string }) {
  const notes = useStorage(
    ({ trip }) => trip.places.find((place) => place.id === placeId)?.notes,
  );

  const updateNotes = useMutation(({ storage }, notes: string) => {
    const places = storage.get("trip").get("places");
    const place = places.find((place) => place.get("id") === placeId);
    place?.set("notes", notes);
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

function VotesInput({ placeId }: { placeId: string }) {
  const { user } = useUser();
  const userId = user?.id;

  const votes = useStorage(
    ({ trip }) => trip.places.find((place) => place.id === placeId)?.votes,
  );

  const hasVoted = votes?.find((vote) => vote.userId === userId);

  const voteCount = votes?.reduce((count, vote) => count + vote.value, 0);

  const updateVotes = useMutation(({ storage }, value: number) => {
    if (!userId) return;

    const places = storage.get("trip").get("places");
    const place = places.find((place) => place.get("id") === placeId);
    const votes = place?.get("votes");

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

function DeleteButton({ placeId }: { placeId: string }) {
  const deletePlace = useMutation(({ storage }) => {
    const places = storage.get("trip").get("places");
    const index = places.findIndex((place) => place.get("id") === placeId);
    places.delete(index);
  }, []);

  return <button onClick={deletePlace}>Delete</button>;
}
