import Search from "@/components/Search";
import { useAddPlaceToItinerary } from "@/hooks/usePlaces";
import type { Prediction } from "@/types/predictions";

export default function ItemSearch() {
  const addPlaceToItinerary = useAddPlaceToItinerary();

  function handleClick(prediction: Prediction) {
    addPlaceToItinerary(prediction.place_id);
  }

  return <Search types="all" onClick={handleClick} />;
}
