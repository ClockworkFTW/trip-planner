import { useEffect } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useStorage } from "@/lib/liveblocks.config";
import { useRoutes } from "@/hooks/useRoutes";

export default function Routes() {
  const itinerary = useStorage(({ trip }) => trip.itinerary);

  return itinerary.map(({ itemId }) => <Route key={itemId} itemId={itemId} />);
}

type RouteProps = { itemId: string };

function Route(props: RouteProps) {
  const { itemId } = props;

  const { data: routes } = useRoutes(itemId);

  const map = useMap();
  const mapsLib = useMapsLibrary("maps");
  const geometryLib = useMapsLibrary("geometry");

  useEffect(() => {
    if (!map || !routes || !mapsLib || !geometryLib) return;

    const path = geometryLib.encoding.decodePath(
      routes[0].polyline.encodedPolyline,
    );

    const route = new mapsLib.Polyline({
      path,
      geodesic: true,
      strokeColor: "#ef4444",
      strokeOpacity: 1.0,
      strokeWeight: 4,
    });

    route.setMap(map);

    return () => {
      route.setMap(null);
    };
  }, [map, routes, mapsLib, geometryLib]);

  return null;
}
