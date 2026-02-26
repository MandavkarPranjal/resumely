import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resumely — Resume Studio",
  description:
    "A power-user resume builder studio. Create stunning resumes with multiple templates and export to PDF.",
  openGraph: {
    title: "Resumely — Resume Studio",
    description:
      "Create stunning resumes with multiple templates. Export to PDF instantly.",
    type: "website",
    siteName: "Resumely",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumely — Resume Studio",
    description:
      "Create stunning resumes with multiple templates. Export to PDF instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
