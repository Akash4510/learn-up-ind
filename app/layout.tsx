import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import "./globals.css";
import { fontRaleway, fontRighteous } from "./fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { ConfettiProvider } from "@/providers/confetti-provider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { ourFileRouter } from "@/app/api/uploadthing/core";

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
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
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
