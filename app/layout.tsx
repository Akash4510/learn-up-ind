import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { fontRaleway, fontRighteous } from "./fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { ConfettiProvider } from "@/providers/confetti-provider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "LearnUPIND",
  description: "The ultimate platform where creators thrive and learners excel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontRighteous.variable} ${fontRaleway.variable} ${fontRaleway.className} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="learnupind-theme"
            disableTransitionOnChange
          >
            <ConfettiProvider />
            <Toaster richColors />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
