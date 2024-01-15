import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("h-full font-sans antialiased relative", inter.className)}
      >
        <main className="relative min-h-screen flex flex-col">
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </main>
        <Toaster position="top-center" closeButton richColors />
      </body>
    </html>
  );
}
