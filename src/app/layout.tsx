import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ourda!lydose",
  description: "For your daily dose routine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
