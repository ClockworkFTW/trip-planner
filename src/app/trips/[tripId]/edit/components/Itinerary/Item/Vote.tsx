"use client";

import { useStorage, useMutation } from "@/lib/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useUser } from "@clerk/nextjs";

type VoteProps = { itemId: string };

export default function Vote({ itemId }: VoteProps) {
  const { user } = useUser();
  const userId = user?.id;

  const votes = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.votes,
  );

  const hasVoted = votes?.find((vote) => vote.userId === userId);

  const voteCount = votes?.reduce((count, vote) => count + vote.value, 0);

  const updateVotes = useMutation(({ storage }, value: number) => {
    if (!userId) return;

    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    const votes = item?.get("votes");

    const hasVoted = votes?.find((vote) => vote.get("userId") === userId);

    if (hasVoted) {
      const index = votes?.findIndex((vote) => vote.get("userId") === userId)!;
      votes?.delete(index);
    } else {
      const vote = new LiveObject({ userId, value });
      votes?.push(vote);
    }
  }, []);

  return (
    <>
      <span>Votes: {voteCount || 0}</span>
      <button
        onClick={() => updateVotes(1)}
        disabled={hasVoted && hasVoted.value === 1}
      >
        up
      </button>
      <button
        onClick={() => updateVotes(-1)}
        disabled={hasVoted && hasVoted.value === -1}
      >
        down
      </button>
    </>
  );
}
