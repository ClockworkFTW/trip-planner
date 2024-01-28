import Room from "./room";

type TripEditorLayoutProps = {
  children: React.ReactNode;
  params: { tripId: string };
};

export default function TripEditorLayout(props: TripEditorLayoutProps) {
  const { params, children } = props;

  return <Room id={params.tripId}>{children}</Room>;
}
