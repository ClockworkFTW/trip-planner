"use client";

import { APIProvider, Map as MapContainer } from "@vis.gl/react-google-maps";
import { useSelf } from "@/lib/liveblocks.config";
import { useStorage } from "@/lib/liveblocks.config";
import { useItem } from "@/hooks/useItem";
import { usePlace } from "@/hooks/usePlace";
import Marker from "./Marker";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export default function Map() {
  const position = {
    lat: 37.7749295,
    lng: -122.41941550000001,
  };

  const itinerary = useStorage(({ trip }) => trip.itinerary);

  const user = useSelf();

  const activeItem = useItem(user.presence.activeItemId);

  const { place: activePlace } = usePlace(activeItem?.placeId);

  const activePosition = activePlace
    ? {
        lat: activePlace?.location.latitude,
        lng: activePlace?.location.longitude,
      }
    : null;

  return (
    <APIProvider apiKey={API_KEY}>
      <MapContainer center={activePosition || position} zoom={3} mapId={"1"}>
        {itinerary.map(({ itemId, placeId }, index) => (
          <Marker
            key={itemId}
            placeId={placeId}
            order={index + 1}
            isActive={activeItem?.itemId === itemId}
          />
        ))}
      </MapContainer>
    </APIProvider>
  );
}
