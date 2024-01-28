import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type WebsiteProps = { placeId: string };

export default function Website(props: WebsiteProps) {
  const { placeId } = props;

  const { data: place } = useGetPlace(placeId);

  const website = place?.websiteUri;

  if (!website) return null;

  return (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={website} target="_blank">
        <FontAwesomeIcon icon={faGlobeAmericas} />
        <span className="ml-2">{website}</span>
      </Link>
    </div>
  );
}
