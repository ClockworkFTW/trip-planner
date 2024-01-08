import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/trips/auth",
});

type Presence = {
  activeItemId: string | null;
};

type Storage = {
  trip: LiveObject<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    bounds: LiveObject<{
      sw: LiveObject<{
        latitude: number;
        longitude: number;
      }>;
      ne: LiveObject<{
        latitude: number;
        longitude: number;
      }>;
    }>;

    itinerary: LiveList<
      LiveObject<{
        itemId: string;
        placeId: string;
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
