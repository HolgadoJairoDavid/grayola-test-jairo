import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/sooner";

import Footer from "@/components/footer";
import HeaderComponent from "@/components/header-comp";



const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Grayola test",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
      <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="bg-background text-foreground flex flex-col items-center relative 
      min-h-screen"
      >
        <HeaderComponent />
        <main className="min-h-screen flex flex-col items-center w-full h-full">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}