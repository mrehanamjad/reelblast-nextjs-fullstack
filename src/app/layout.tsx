import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import Navbar from "@/components/Navbar";
import { Notifications } from '@mantine/notifications';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReelBlast - Watch & Share Reels",
  description: "Upload, explore, and engage with trending short-form videos on ReelBlast.",
  keywords: ["reels", "video", "social media", "shorts", "ReelBlast"],
  icons: {
    icon: "/favicon.ico", 
  },
  openGraph: {
    title: "ReelBlast - Watch & Share Reels",
    description: "Connect with creators through bite-sized video content.",
    url: "https://reelblast.vercel.app",
    siteName: "ReelBlast",
    images: [
      {
        url: "https://reelblast.vercel.app/logo.png", 
        width: 1200,
        height: 630,
        alt: "ReelBlast Cover",
      },
    ],
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    <MantineProvider defaultColorScheme="dark" >
        <Providers >
        <Notifications color="cyan" position="top-right" />
        <div className="flex ">
        <Navbar />
        <main className="flex-1 bg-black/80">{children}</main>
        </div>
        </Providers>
        </MantineProvider>
      </body>
    </html>
  );
}
