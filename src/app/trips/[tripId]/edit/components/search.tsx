import SearchPlaces from "@/components/ui/search-places";
import { useAddPlaceToItinerary } from "@/hooks/usePlaces";
import type { Prediction } from "@/types/predictions";

export default function Search() {
  const addPlaceToItinerary = useAddPlaceToItinerary();

  function handleClick(prediction: Prediction) {
    addPlaceToItinerary(prediction.place_id);
  }

  return <SearchPlaces types="all" onClick={handleClick} />;
}
