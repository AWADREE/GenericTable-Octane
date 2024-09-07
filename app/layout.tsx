"use client";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavigationBar from "@/components/ui/navigation-bar";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title></title>
        </head>
        <body className={`${inter.className} p-3`}>
          <NavigationBar />
          {children}
        </body>
      </html>
    </QueryClientProvider>
  );
}
