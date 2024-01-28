import { useItinerary } from "@/hooks/useItinerary";
import { useMutation } from "@/lib/liveblocks.config";
import ItineraryItem from "./itinerary-item";

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

export default function ItineraryList() {
  const itinerary = useItinerary();

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

type SortableItem = { itemId: string; placeId: string; order: number };

function SortableItem(props: SortableItem) {
  const { itemId, placeId, order } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itemId });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ItineraryItem itemId={itemId} placeId={placeId} order={order} />
    </div>
  );
}
