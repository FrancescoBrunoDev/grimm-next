import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const regular = localFont({
  src: "./fonts/Teachers-VariableFont_wght.ttf",
  variable: "--font-regular",
  display: "swap",
});
const regatto = localFont({
  src: "./fonts/RegattoBold.ttf",
  variable: "--font-regatto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jiulius Otto Grimm",
  description: "Die digitale Ausstellung über Julius Otto Grimm und seine Zeit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${regular.variable} ${regatto.variable} scroll-smooth`}
    >
      <body
        className={`bg-background font-regular text-primary text-lg leading-6 antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
