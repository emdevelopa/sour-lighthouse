import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Sour Lighthouse",
  description: "Lightweight website auditor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full font-inter bg-white text-neutral-900 dark:bg-[#0c0c0c] dark:text-neutral-100 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
