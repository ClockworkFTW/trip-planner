"use client";

type TypeProps = { types?: string[] };

export default function Type({ types }: TypeProps) {
  if (!types) return null;

  let content = "Other";

  if (types.includes("locality")) {
    content = "City";
  }

  if (types.includes("sublocality")) {
    content = "District";
  }

  if (types.includes("country")) {
    content = "Country";
  }

  if (types.includes("administrative_area_level_1")) {
    content = "State";
  }

  if (types.includes("administrative_area_level_2")) {
    content = "County";
  }

  return (
    <div className="rounded bg-gray-300 px-2 py-1 text-sm font-bold">
      {content}
    </div>
  );
}
