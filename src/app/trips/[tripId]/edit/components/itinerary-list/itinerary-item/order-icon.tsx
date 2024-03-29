type OrderIconProps = { order: number };

export default function OrderIcon(props: OrderIconProps) {
  const { order } = props;

  return (
    <span className="relative h-8 w-8 rounded-lg bg-red-600 font-bold text-white">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {order}
      </span>
    </span>
  );
}
