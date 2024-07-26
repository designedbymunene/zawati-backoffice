import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Providers } from "./providers";

import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zawati",
  description:
    "Pesa Chama is a digital merry-go-round platform that allows you to save.",
  creator: "designedbymunene",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "h-screen")}>
        <Providers>
          <main className="text-foreground bg-background">{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
