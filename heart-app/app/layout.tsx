import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./flags.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Our love",
  description: "Our love in an application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="/heart.svg" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics/>
        <SpeedInsights/>
        {children}
      </body>
    </html>
  );
}
