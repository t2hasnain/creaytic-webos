// Copyright (c) 2026 Hasnain (https://t2hasnain.me). All rights reserved.
// Licensed under the Creaytic WebOS Proprietary Commercial Source & Security License.
// Made by Hasnain <t2hasnain.me>

import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creaytic WebOS - Cupertino High Sierra Simulator",
  description: "A premium, state-of-the-art WebOS environment mimicking Apple's macOS Cupertino High Sierra. Built on Next.js 16, featuring multi-window desktop environments, zsh terminal simulation, sandboxed VFS, and dynamic custom app creators.",
  keywords: [
    "Creaytic webos", "webos", "macos simulator", "web macos", "Hasnain WebOS", "nextjs operating system", 
    "t2hasnain", "react operating system", "online portfolio", "Creaytic portfolio", "interactive webos", "AI WebOS"
  ],
  authors: [{ name: "t2hasnain" }],
  openGraph: {
    title: "Creaytic WebOS - Premium macOS Web Simulator",
    description: "A premium, state-of-the-art WebOS environment mimicking Apple's macOS Cupertino High Sierra. Built with Next.js 16.",
    url: "https://github.com/t2hasnain/creaytic-webos",
    siteName: "Creaytic WebOS",
    images: [
      {
        url: "/wallpaper.png",
        width: 1200,
        height: 630,
        alt: "Creaytic WebOS Screen Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creaytic WebOS - Premium macOS Web Simulator",
    description: "A premium, state-of-the-art WebOS environment mimicking Apple's macOS Cupertino High Sierra.",
    images: ["/wallpaper.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Creaytic WebOS",
    "description": "A premium, state-of-the-art WebOS environment mimicking Apple's macOS Cupertino High Sierra, built with Next.js 16 and Tailwind.",
    "url": "https://github.com/t2hasnain/creaytic-webos",
    "image": "https://github.com/t2hasnain/creaytic-webos/raw/main/public/wallpaper.png",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "author": {
      "@type": "Person",
      "name": "t2hasnain",
      "url": "https://github.com/t2hasnain"
    },
    "featureList": [
      "Multi-window Drag & Drop desktop",
      "Interactive zsh UNIX Shell terminal",
      "Fully sandboxed Virtual File System (VFS)",
      "Multi-tab Notepad tool with safety warn confirmation modals",
      "Wi-Fi and Battery hardware levels",
      "Right-click Custom App shortcuts builder"
    ]
  };

  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black">{children}</body>
    </html>
  );
}
