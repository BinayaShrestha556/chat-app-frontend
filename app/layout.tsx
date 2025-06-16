import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import ModalProviders from "@/providers/modal-providers";
import { ToastProvider } from "@/providers/toast-provider";

const lato = Lato({ weight: ["400", "700"], subsets: ["latin"] });
export const metadata: Metadata = {
  title: "VibeWAVE",
  description: "VibeWAVE - A chat application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased h-[100dvh] w-full flex  flex-col`}
      >
        <ToastProvider />
        <ModalProviders />
        {children}
      </body>
    </html>
  );
}
