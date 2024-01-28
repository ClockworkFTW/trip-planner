type TypeProps = { types?: string[] };

export default function Type({ types }: TypeProps) {
  if (!types) return null;

  let text = "Other";

  if (types.includes("locality")) {
    text = "City";
  }

  if (types.includes("sublocality")) {
    text = "District";
  }

  if (types.includes("country")) {
    text = "Country";
  }

  if (types.includes("administrative_area_level_1")) {
    text = "State";
  }

  if (types.includes("administrative_area_level_2")) {
    text = "County";
  }

  return (
    <div className="rounded bg-gray-300 px-2 py-1 text-sm font-bold">
      {text}
    </div>
  );
}
