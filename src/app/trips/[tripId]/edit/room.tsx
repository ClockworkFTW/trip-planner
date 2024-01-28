"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/lib/liveblocks.config";

type RoomProps = { id: string; children: React.ReactNode };

export default function Room(props: RoomProps) {
  const { id, children } = props;

  const initialPresence = { activeItemId: null };

  return (
    <RoomProvider id={id} initialPresence={initialPresence}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
