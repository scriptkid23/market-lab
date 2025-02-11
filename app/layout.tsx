import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import type React from "react"; // Added import for React

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-black text-white min-h-screen flex flex-col`}
      >
        <Web3Provider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Web3Provider } from "@/components/Web3Provider";

export const metadata = {
  generator: "v0.dev",
};
