import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "VistorAi — Turn ideas into cinematic video and image",
  description:
    "Generate cinematic video and ultra-realistic images from a single prompt. Free to start, no card required.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col relative bg-ink text-paper overflow-x-hidden">
        {/* Deep Space Motion Logo Background */}
        <div className="app-space-bg" aria-hidden="true">
          <div className="app-space-logo">
            <Image
              src="/logo.png"
              alt=""
              width={680}
              height={680}
              priority
            />
          </div>
          <div className="app-space-vignette" />
        </div>

        <Providers>
          <SplashScreen />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
