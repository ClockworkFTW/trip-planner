"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/lib/liveblocks.config";

type Props = { id: string; children: React.ReactNode };

export default function Room({ id, children }: Props) {
  const initialPresence = { activeItemId: null };

  return (
    <RoomProvider id={id} initialPresence={initialPresence}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
