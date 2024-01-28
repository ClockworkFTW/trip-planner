import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/pro-solid-svg-icons";
import { useGetPlace } from "@/hooks/usePlaces";

type PhoneProps = { placeId: string };

export default function Phone(props: PhoneProps) {
  const { placeId } = props;

  const { data: place } = useGetPlace(placeId);

  const phone = place?.internationalPhoneNumber;

  if (!phone) return null;

  const link = `tel:${phone}`;

  return (
    <div className="text-gray-600 hover:text-blue-600">
      <Link href={link}>
        <FontAwesomeIcon icon={faPhone} />
        <span className="ml-2">{phone}</span>
      </Link>
    </div>
  );
}
