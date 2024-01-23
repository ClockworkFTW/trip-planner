"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type Props = { placeId: string };

export default function Phone({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  const phone = place?.internationalPhoneNumber;

  const link = `tel:${phone}`;

  return phone ? (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={link}>
        <FontAwesomeIcon icon={faPhone} />
        <span className="ml-2">{phone}</span>
      </Link>
    </div>
  ) : null;
}
