import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientInit from "@/components/ClientInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://momoru.vercel.app"),
  title: "Momoru",
  description: "An immortal entity of the void. A creature of darkness that has endured through the ages—undying, untameable, and eternal.",
  openGraph: {
    title: "Momoru",
    description: "An ancient darkness that cannot die. Explore the interactive 3D realm of the immortal Momoru.",
    url: "https://momoru.vercel.app", 
    siteName: "Momoru",
    images: [
      {
        url: "/momoru.jpg",
        width: 736,
        height: 1226,
        alt: "Momoru: The Immortal Darkness",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Momoru | Immortal Entity",
    description: "The creature of darkness that cannot die. Witness the immortal Momoru.",
    images: ["/momoru.jpg"],
    creator: "@jofrzl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientInit />
        {children}
      </body>
    </html>
  );
}
