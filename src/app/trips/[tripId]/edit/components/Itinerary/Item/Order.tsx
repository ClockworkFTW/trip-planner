"use client";

import { useSelf } from "@/lib/liveblocks.config";
import clsx from "clsx";

type Props = { itemId: string; order: number };

export default function Order({ itemId, order }: Props) {
  const { presence } = useSelf();

  const isActiveItem = presence.activeItemId === itemId;

  return (
    <div
      className={clsx(
        "rounded-lg p-2 font-bold",
        isActiveItem && "bg-red-600  text-white",
      )}
    >
      {order}
    </div>
  );
}
