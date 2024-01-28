import { memo } from "react";
import { useUpdateMyPresence } from "@/lib/liveblocks.config";
import { useGetPlace } from "@/hooks/usePlaces";

import OrderIcon from "./order-icon";
import CountryBadge from "./country-badge";
import VoteButton from "./vote-button";
import RouteSelector from "./route-selector";
import PhotoSlider from "./photo-slider";
import DeleteButton from "./delete-button";
import ItemDetails from "./item-details";

// Item always renders three times on mount

type ItineraryItemProps = { itemId: string; placeId: string; order: number };

function ItineraryItem(props: ItineraryItemProps) {
  const { itemId, placeId, order } = props;

  const { data: place, isLoading } = useGetPlace(placeId);

  const updateMyPresence = useUpdateMyPresence();

  function setActiveItemId() {
    updateMyPresence({ activeItemId: itemId });
  }

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (place) {
    content = (
      <>
        <div onClick={setActiveItemId} className="m-4 flex gap-4 ">
          <PhotoSlider placeId={placeId} />
          <div className="flex min-w-0 flex-auto flex-col justify-between gap-2 rounded-lg bg-gray-100 p-3">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <OrderIcon order={order} />
                <span className="font-bold text-gray-800">
                  {place.displayName.text}
                </span>
              </div>
              <CountryBadge placeId={placeId} />
            </div>
            <div className="text-sm text-gray-500">
              {place.editorialSummary?.text}
            </div>
            <ItemDetails itemId={itemId} placeId={placeId} />
            <div className="flex justify-between gap-3 align-bottom">
              <VoteButton itemId={itemId} />
              <DeleteButton itemId={itemId} />
            </div>
          </div>
        </div>
        <RouteSelector itemId={itemId} />
      </>
    );
  }

  return content;
}

export default memo(ItineraryItem);
