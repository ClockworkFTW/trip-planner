import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Trip",
};

type Props = { children: React.ReactNode };

export default function CreateLayout({ children }: Props) {
  return <div className="mx-auto max-w-xl">{children}</div>;
}
