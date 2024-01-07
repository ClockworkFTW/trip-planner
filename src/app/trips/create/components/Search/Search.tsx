"use client";

import Search from "@/components/Search";

type Props = { onClick: (name: string) => void };

export default function ItemSearch({ onClick }: Props) {
  return <Search types="(regions)" onClick={onClick} />;
}
