import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollar } from "@fortawesome/pro-solid-svg-icons";
import { useStorage, useMutation } from "@/lib/liveblocks.config";

type CostInputProps = { itemId: string };

export default function CostInput(props: CostInputProps) {
  const { itemId } = props;

  const formId = `cost-${itemId}`;

  const cost = useStorage(
    ({ trip }) => trip.itinerary.find((item) => item.itemId === itemId)?.cost,
  );

  const updateCost = useMutation(({ storage }, cost: string) => {
    const itinerary = storage.get("trip").get("itinerary");
    const item = itinerary.find((item) => item.get("itemId") === itemId);
    item?.set("cost", Number(cost));
  }, []);

  return (
    <div className="rounded-md bg-gray-200 px-3 text-sm text-gray-600">
      <label htmlFor={formId}>
        <FontAwesomeIcon icon={faDollar} />
      </label>
      <input
        id={formId}
        type="number"
        value={cost}
        onChange={(e) => updateCost(e.target.value)}
        className="ml-2 bg-transparent p-2"
      />
    </div>
  );
}
