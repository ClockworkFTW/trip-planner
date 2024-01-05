import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/trips/auth",
});

type Presence = {};

type Storage = {
  trip: LiveObject<{
    name: string;
    places: LiveList<
      LiveObject<{
        id: string;
        cost: number;
        notes: string;
        votes: LiveList<
          LiveObject<{
            userId: string;
            value: number;
          }>
        >;
      }>
    >;
  }>;
};

type UserMeta = {};

type RoomEvent = {};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
