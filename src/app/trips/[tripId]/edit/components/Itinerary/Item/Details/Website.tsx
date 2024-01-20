"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/pro-regular-svg-icons";
import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function Website({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  const website = place?.websiteUri;

  return website ? (
    <div className="text-gray-600">
      <FontAwesomeIcon icon={faGlobeAmericas} />
      <a href={website} className="ml-2">
        {website}
      </a>
    </div>
  ) : null;
}
