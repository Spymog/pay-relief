import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { UserProvider } from "@/context/UserProvider";
import { AuthGuard } from "@/components/auth/AuthGuard";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PayRelief — Financial Advocacy Platform",
  description:
    "PayRelief is a financial advocacy platform helping debtors, counselors, and lenders negotiate better outcomes.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorantGaramond.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <UserProvider>
          <AuthGuard>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </AuthGuard>
        </UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
