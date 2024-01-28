import { useSelf } from "@/lib/liveblocks.config";
import NotesInput from "./notes-input";
import CostInput from "./cost-input";
import TimeInput from "./time-input";
import Address from "./address";
import Ratings from "./ratings";
import Website from "./website";
import Phone from "./phone";

type ItemDetailsProps = { itemId: string; placeId: string };

export default function ItemDetails(props: ItemDetailsProps) {
  const { itemId, placeId } = props;

  const { presence } = useSelf();

  if (presence.activeItemId !== itemId) return null;

  return (
    <>
      <div className="flex flex-col gap-1 rounded-md bg-gray-200 px-3 py-2 text-sm">
        <Address placeId={placeId} />
        <Website placeId={placeId} />
        <Phone placeId={placeId} />
        <Ratings placeId={placeId} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TimeInput itemId={itemId} />
        <CostInput itemId={itemId} />
      </div>
      <NotesInput itemId={itemId} />
    </>
  );
}
