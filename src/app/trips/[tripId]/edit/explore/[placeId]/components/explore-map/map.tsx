import { useEffect, useState } from "react";
import { Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import Markers from "./markers";
import type { Place, Bounds } from "@/types/places";

type ExploreMapProps = { places: Place[]; bounds: Bounds };

export default function ExploreMap(props: ExploreMapProps) {
  const { places, bounds } = props;

  const coreLib = useMapsLibrary("core");

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
    <Map initialBounds={initialBounds} mapId="explore">
      <Markers places={places} />
    </Map>
  ) : null;
}
