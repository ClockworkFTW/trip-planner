"use client";

import { useRoutes } from "@/hooks/useRoutes";

type Props = { itemId: string };

export default function Route({ itemId }: Props) {
  const { data: routes } = useRoutes(itemId);

  return routes
    ? routes.map((route, index) => (
        <div key={index} className="ml-[100px] border-l-2 border-dashed pl-4">
          <div>Distance: {route.distanceMeters}m</div>
          <div>Duration: {route.duration}</div>
        </div>
      ))
    : null;
}
