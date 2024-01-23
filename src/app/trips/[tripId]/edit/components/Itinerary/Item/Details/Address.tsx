"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type Props = { placeId: string };

export default function Address({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  const address = place?.formattedAddress;

  const link = place?.googleMapsUri;

  return address && link ? (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={link} target="_blank">
        <FontAwesomeIcon icon={faLocationDot} />
        <span className="ml-2">{address}</span>
      </Link>
    </div>
  ) : null;
}
