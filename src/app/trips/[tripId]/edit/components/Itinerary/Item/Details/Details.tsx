"use client";

import { useSelf } from "@/lib/liveblocks.config";
import Address from "./Address";
import Ratings from "./Ratings";
import Website from "./Website";
import Phone from "./Phone";
import Note from "./Note";
import Cost from "./Cost";
import Time from "./Time";

type Props = { itemId: string; placeId: string };

export default function Details({ itemId, placeId }: Props) {
  const { presence } = useSelf();

  const isActiveItem = presence.activeItemId === itemId;

  return isActiveItem ? (
    <>
      <div className="flex flex-col gap-1 rounded-md bg-gray-200 px-3 py-2 text-sm">
        <Address placeId={placeId} />
        <Website placeId={placeId} />
        <Phone placeId={placeId} />
        <Ratings placeId={placeId} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Time itemId={itemId} />
        <Cost itemId={itemId} />
      </div>
      <Note itemId={itemId} />
    </>
  ) : null;
}
