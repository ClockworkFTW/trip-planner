import { Suspense } from "react";

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/utils/helpers";

import { Providers } from "./providers";
import "./globals.css";

import "/node_modules/flag-icons/css/flag-icons.min.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Trip Planner",
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Props = { children: React.ReactNode };

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
