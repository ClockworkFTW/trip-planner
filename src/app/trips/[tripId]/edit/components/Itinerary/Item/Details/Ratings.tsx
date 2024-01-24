import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type Props = { placeId: string };

export default function Ratings({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  const rating = place?.rating;
  const ratingCount = place?.userRatingCount;

  const query = place?.formattedAddress.split(" ").join("+");
  const link = `https://www.google.com/search?q=${query}`;

  return rating && ratingCount ? (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={link} target="_blank">
        <FontAwesomeIcon icon={faStar} />
        <span className="ml-2">
          {rating} ({ratingCount.toLocaleString()})
        </span>
      </Link>
    </div>
  ) : null;
}
