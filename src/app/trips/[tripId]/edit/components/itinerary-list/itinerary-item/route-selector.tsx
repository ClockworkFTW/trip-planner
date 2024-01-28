import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@/lib/liveblocks.config";
import { useItem } from "@/hooks/useItinerary";
import { useRoutes } from "@/hooks/useRoutes";
import { metersToMiles } from "@/utils/map";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import {
  faCar,
  faTrain,
  faBicycle,
  faPersonWalking,
} from "@fortawesome/pro-solid-svg-icons";

dayjs.extend(duration);

type RouteSelectorProps = { itemId: string };

export default function RouteSelector(props: RouteSelectorProps) {
  const { itemId } = props;

  const { data: routes, isLoading } = useRoutes(itemId);

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = (
      <div className="ml-[260px] border-l-2 border-dashed pl-4 text-sm">
        Loading...
      </div>
    );
  }

  if (routes) {
    const distance = routes.reduce(
      (total, route) => total + metersToMiles(route.distanceMeters),
      0,
    );

    const duration = routes.reduce(
      // remove "s" from end of duration string
      (total, route) => total + Number(route.duration.slice(0, -1)),
      0,
    );

    const time = dayjs
      .duration(duration, "seconds")
      .format("D [day] H [hr] m [min]")
      .replace("0 day", "")
      .replace(" 0 hr", "")
      .trimStart();

    content = (
      <div className="ml-[260px] flex gap-4 border-l-2 border-dashed pl-4 text-sm text-gray-800">
        <TravelMode itemId={itemId} />
        <div>{time}</div>
        <div>{distance} miles</div>
      </div>
    );
  }

  return content;
}

type TravelModeProps = { itemId: string };

function TravelMode(props: TravelModeProps) {
  const { itemId } = props;

  const item = useItem(itemId);

  // TODO: this is a temporary toggle, need to update for production
  const updateTravelMode = useMutation(({ storage }) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);

    switch (item?.get("travelMode")) {
      case "DRIVE":
        item?.set("travelMode", "TRANSIT");
        break;
      case "TRANSIT":
        item?.set("travelMode", "BICYCLE");
        break;
      case "BICYCLE":
        item?.set("travelMode", "WALK");
        break;
      case "WALK":
        item?.set("travelMode", "DRIVE");
        break;
      default:
        break;
    }
  }, []);

  let content: JSX.Element | null = null;

  switch (item?.travelMode) {
    case "DRIVE":
      content = <FontAwesomeIcon icon={faCar} />;
      break;
    case "TRANSIT":
      content = <FontAwesomeIcon icon={faTrain} />;
      break;
    case "BICYCLE":
      content = <FontAwesomeIcon icon={faBicycle} />;
      break;
    case "WALK":
      content = <FontAwesomeIcon icon={faPersonWalking} />;
      break;
    default:
      break;
  }

  return content && <div onClick={updateTravelMode}>{content}</div>;
}
