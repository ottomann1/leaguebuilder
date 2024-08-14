import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { StaticDataProvider } from "@/context/StaticDataContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "league build app",
  description: "League build app by Otto Kostmann",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StaticDataProvider>{children}</StaticDataProvider>
        </body>
    </html>
  );
}
