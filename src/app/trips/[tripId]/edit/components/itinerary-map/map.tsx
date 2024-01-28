import { useEffect, useState } from "react";
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useStorage } from "@/lib/liveblocks.config";
import Bounds from "./bounds";
import Markers from "./markers";
import Routes from "./routes";

export default function MapContainer() {
  const coreLib = useMapsLibrary("core");

  const bounds = useStorage(({ trip }) => trip.bounds);

  const [initialBounds, setInitialBounds] =
    useState<google.maps.LatLngBounds>();

  useEffect(() => {
    if (!coreLib) return;

    const { LatLng, LatLngBounds } = coreLib;

    const sw = new LatLng(bounds.sw.latitude, bounds.sw.longitude);
    const ne = new LatLng(bounds.ne.latitude, bounds.ne.longitude);

    const initialBounds = new LatLngBounds(sw, ne);

    setInitialBounds(initialBounds);
  }, [coreLib]);

  return initialBounds ? (
    <Map initialBounds={initialBounds} mapId="itinerary">
      <Bounds />
      <Markers />
      <Routes />
    </Map>
  ) : null;
}
