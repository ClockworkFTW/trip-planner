import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type AddressProps = { placeId: string };

export default function Address(props: AddressProps) {
  const { placeId } = props;

  const { data: place } = useGetPlace(placeId);

  const address = place?.formattedAddress;
  const link = place?.googleMapsUri;

  if (!address || !link) return null;

  return (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={link} target="_blank">
        <FontAwesomeIcon icon={faLocationDot} />
        <span className="ml-2">{address}</span>
      </Link>
    </div>
  );
}
