"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/lib/liveblocks.config";

type Props = { children: React.ReactNode; params: { tripId: string } };

export default function TripEditorLayout({ params, children }: Props) {
  const initialPresence = { activeItemId: null };

  return (
    <RoomProvider id={params.tripId} initialPresence={initialPresence}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
