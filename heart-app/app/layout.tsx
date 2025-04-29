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
  title: "Our lovee",
  description: "Our lovee in an application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap"
        />
        <link rel="icon" href="/heart.svg" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-b from-gray-900 to-black`}
        style={{
          color: "var(--foreground)"
          // , background: "var(--background)"
        }}>
        <Analytics/>
        <SpeedInsights/>
        {children}
      </body>
    </html>
  );
}
