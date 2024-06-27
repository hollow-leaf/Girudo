import React from 'react';
import Provider from "@/components/providers/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar/Navbar";
import Image from "next/image";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Girudo Social DAPP",
  description: "Social DAPP leverage on Hypercert",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className="light">
      <body className="bg-main bg-cover">
        <Provider>
          <div className="min-h-screen font-sans antialiased relative bg-main bg-cover bg-fixed bg-center">
            <Navbar />
            <div className="min-h-[calc(100vh-224px) text-[#6e6f6f] flex flex-col py-6 max-w-6xl m-auto">
              {children}
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
