import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { UserProvider } from "@/context/UserProvider";
import { createClient } from "@/lib/supabase/server";

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
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cormorantGaramond.variable}`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <UserProvider user={user}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </UserProvider>
        <Analytics />
      </body>
    </html>
  );
}
