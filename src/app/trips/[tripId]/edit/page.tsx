import Room from "./room";

type Props = { params: { tripId: string } };

export default function EditTrip({ params }: Props) {
  return (
    <Room id={params.tripId}>
      <h1>Edit Trip</h1>
    </Room>
  );
}
