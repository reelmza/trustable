import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import DesktopSideBar from "@/components/layout/DesktopSideBar";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`relative h-full w-full bg-gray-50 flex ${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        >
          <DesktopSideBar />
          <div className="relative grow h-full bg-red-600x">
            <Header />
            <div className="h-full w-full flex flex-col items-center justify-center bg-red-300x">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
