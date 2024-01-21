"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function Address({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  const address = place?.formattedAddress;

  return address ? (
    <Link href={""} className="text-gray-600 hover:text-blue-600">
      <FontAwesomeIcon icon={faLocationDot} />
      <span className="ml-2">{address}</span>
    </Link>
  ) : null;
}
