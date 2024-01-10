"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useStorage } from "@/lib/liveblocks.config";
import Markers from "./Markers";
import Bounds from "./Bounds";
import Routes from "./Routes";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export default function MapContainer() {
  return (
    <APIProvider apiKey={API_KEY}>
      <MapContent />
    </APIProvider>
  );
}

function MapContent() {
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
    <Map initialBounds={initialBounds} mapId={"1"}>
      <Markers />
      <Bounds />
      <Routes />
    </Map>
  ) : null;
}
