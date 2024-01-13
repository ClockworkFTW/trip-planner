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
        "rounded-lg px-3 py-1 font-bold",
        isActiveItem ? "bg-red-600  text-white" : "bg-gray-300 text-black",
      )}
    >
      {order}
    </span>
  );
}
