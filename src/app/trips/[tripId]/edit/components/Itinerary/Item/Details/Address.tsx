"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function Address({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  const address = place?.formattedAddress;

  return address ? (
    <div className="text-gray-600">
      <FontAwesomeIcon icon={faLocationDot} />
      <span className="ml-2">{address}</span>
    </div>
  ) : null;
}
