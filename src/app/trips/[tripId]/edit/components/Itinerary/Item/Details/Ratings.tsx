"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-regular-svg-icons";
import { usePlace } from "@/hooks/usePlace";

type Props = { placeId: string };

export default function Ratings({ placeId }: Props) {
  const { data: place } = usePlace(placeId);

  const rating = place?.rating;
  const ratingCount = place?.userRatingCount;

  return rating && ratingCount ? (
    <div className="text-gray-600">
      <FontAwesomeIcon icon={faStar} />
      <span className="ml-2">
        {rating} ({ratingCount.toLocaleString()})
      </span>
    </div>
  ) : null;
}
