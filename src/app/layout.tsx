import ReactQueryProvider from "@/components/Global/ReactQueryProvider";
import ReduxWrapper from "@/components/Global/ReduxWrapper";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Link to Gether",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ReduxWrapper>
            <Toaster
              toastOptions={{
                position: "top-right",
              }}
            />
            {children}
          </ReduxWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
