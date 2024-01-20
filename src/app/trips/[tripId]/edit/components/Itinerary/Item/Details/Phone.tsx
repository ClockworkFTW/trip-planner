"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/pro-regular-svg-icons";
import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function Phone({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  const phone = place?.internationalPhoneNumber;

  return phone ? (
    <div className="text-gray-600">
      <FontAwesomeIcon icon={faPhone} />
      <span className="ml-2">{phone}</span>
    </div>
  ) : null;
}
