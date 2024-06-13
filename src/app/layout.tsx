import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";
import { AppWrapper } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Transcryb",
  description: "Transcribe voice memos for free with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <AppWrapper>
            <Navbar />
            <div>{children}</div>
            <Footer />
            {/* <PopupWidget /> */}
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
