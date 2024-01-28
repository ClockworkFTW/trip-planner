import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type RatingsProps = { placeId: string };

export default function Ratings(props: RatingsProps) {
  const { placeId } = props;

  const { data: place } = useGetPlace(placeId);

  const rating = place?.rating;
  const ratingCount = place?.userRatingCount;

  if (!rating || !ratingCount) return null;

  const query = place?.formattedAddress.split(" ").join("+");
  const link = `https://www.google.com/search?q=${query}`;

  return (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={link} target="_blank">
        <FontAwesomeIcon icon={faStar} />
        <span className="ml-2">
          {rating} ({ratingCount.toLocaleString()})
        </span>
      </Link>
    </div>
  );
}
