import Avatar from "@/components/Avatar";
import { useSelf, useOthers } from "@/lib/liveblocks.config";

export default function Members() {
  const self = useSelf();
  const others = useOthers();

  return (
    <div className="flex">
      <Avatar
        id={self.id}
        image={self.info.image}
        name={`${self.info.name} (you)`}
      />
      {others.map((other) => (
        <div key={other.id} className="-translate-x-2">
          <Avatar
            id={other.id}
            image={other.info.image}
            name={other.info.name}
          />
        </div>
      ))}
    </div>
  );
}
