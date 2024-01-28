import { Tooltip } from "react-tooltip";

type Props = { id: string; image: string; name: string };

export default function Avatar({ id, image, name }: Props) {
  return (
    <>
      <img
        data-tooltip-id={id}
        src={image}
        alt={name}
        className="h-10 w-10 rounded-full border-2 border-white"
      />
      <Tooltip id={id}>{name}</Tooltip>
    </>
  );
}
