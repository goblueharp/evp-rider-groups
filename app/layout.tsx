import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import ReviewGate from "./ReviewGate";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Riding Group Partnerships | Evolution Powersports";
  const description = "Explore EVP member benefits, group rewards and official partnership opportunities for organized UTV riding groups.";

  return {
    metadataBase,
    title,
    description,
    icons: {
      icon: "https://evopowersports.com/cdn/shop/files/EVP_Logo-800x800_32x32.jpg?v=1700338574",
      shortcut: "https://evopowersports.com/cdn/shop/files/EVP_Logo-800x800_32x32.jpg?v=1700338574",
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: new URL("/og.png", metadataBase).toString(), width: 1200, height: 630, alt: "EVP Riding Group Partnerships" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", metadataBase).toString()] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><ReviewGate>{children}</ReviewGate></body></html>;
}
