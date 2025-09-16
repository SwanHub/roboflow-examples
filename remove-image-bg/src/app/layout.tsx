import type { Metadata } from "next";
import { Poppins, Work_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Remove Image Background - Free Online Tool",
  description:
    "Remove image backgrounds automatically and for free. Upload your image and get instant background removal with AI technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} ${poppins.variable} antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
