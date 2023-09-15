import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Comments",
  description: "Comments challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-rubik bg-very-light-gray flex flex-col min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
