"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/pro-solid-svg-icons";
import { useStorage, useMutation } from "@/lib/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { useUser } from "@clerk/nextjs";
import clsx from "clsx";

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
    <div className="text-gray-800">
      <button
        onClick={() => updateVotes(1)}
        disabled={hasVoted && hasVoted.value === 1}
        className={clsx(
          "rounded-lg px-2 py-1",
          hasVoted?.value === 1 && "bg-green-300",
        )}
      >
        <FontAwesomeIcon icon={faThumbsUp} />
      </button>
      <span className="mx-1">{voteCount || 0}</span>
      <button
        onClick={() => updateVotes(-1)}
        disabled={hasVoted && hasVoted.value === -1}
        className={clsx(
          "rounded-lg px-2 py-1",
          hasVoted?.value === -1 && "bg-red-300",
        )}
      >
        <FontAwesomeIcon icon={faThumbsDown} />
      </button>
    </div>
  );
}
