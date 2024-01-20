"use client";

import { useSelf } from "@/lib/liveblocks.config";
import clsx from "clsx";

type Props = { itemId: string; order: number };

export default function Order({ itemId, order }: Props) {
  const { presence } = useSelf();

  const isActiveItem = presence.activeItemId === itemId;

  return (
    <span
      className={clsx(
        "relative h-8 w-8 rounded-lg font-bold",
        isActiveItem ? "bg-red-600 text-white" : "bg-gray-200 text-black",
      )}
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {order}
      </span>
    </span>
  );
}
