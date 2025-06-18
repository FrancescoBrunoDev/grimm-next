import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Script from "next/script";

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
      <head>
        <Script
          defer
          src="https://umami-w4w0gwowc4kgg4gogs0o8sok.francesco-bruno.com/script.js"
          data-website-id="03da75cf-17bf-4a79-9ded-9d206477c399"
        />
      </head>
      <body
        className={`bg-background font-regular text-primary text-lg leading-6 antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
