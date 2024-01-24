import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type Props = { placeId: string };

export default function Website({ placeId }: Props) {
  const { data: place } = useGetPlace(placeId);

  const website = place?.websiteUri;

  return website ? (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={website} target="_blank">
        <FontAwesomeIcon icon={faGlobeAmericas} />
        <span className="ml-2">{website}</span>
      </Link>
    </div>
  ) : null;
}
