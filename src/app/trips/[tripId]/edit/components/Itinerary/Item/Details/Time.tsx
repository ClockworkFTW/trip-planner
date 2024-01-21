"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-solid-svg-icons";
import { useStorage, useMutation } from "@/lib/liveblocks.config";

type Props = { itemId: string };

export default function Time({ itemId }: Props) {
  const formId = `time-${itemId}`;

  const time = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.time,
  );

  const updateTime = useMutation(({ storage }, time: string) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    item?.set("time", time);
  }, []);

  return (
    <div className="rounded-md bg-gray-200 px-3 text-sm text-gray-600">
      <label htmlFor={formId}>
        <FontAwesomeIcon icon={faClock} />
      </label>
      <input
        id={formId}
        type="time"
        value={time}
        onChange={(e) => updateTime(e.target.value)}
        className="ml-2 bg-transparent p-2"
      />
    </div>
  );
}
