import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import "@/app/globals.css";
import { Providers } from "@/components/providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
  title: "RoomSwift | Smart Hospitality Platform for Pakistan",
  description: "QR ordering, guest service automation, and realtime operations dashboards for hotels and restaurants in Pakistan.",
  keywords: [
    "Pakistan hotel software",
    "QR ordering",
    "hospitality SaaS",
    "restaurant operations",
    "room service automation"
  ],
  authors: [{ name: "RoomSwift Team" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "RoomSwift",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: "/icons/icon-192.svg",
    apple: "/icons/icon-192.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#07111f"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
