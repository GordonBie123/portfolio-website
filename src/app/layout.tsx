import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "gordon bie",
  description: "Human — Northeastern '27",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={robotoMono.variable}>
      <body className="antialiased bg-bg text-text font-mono">
        <div className="mx-auto flex min-h-dvh w-full max-w-[1100px] flex-col px-5 sm:px-8">
          <TopBar />
          <main className="flex-1 py-8 sm:py-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
