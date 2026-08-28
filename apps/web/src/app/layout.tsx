import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Racines & Promesses — Luciana & Ben",
  description:
    "Une nouvelle saison commence. Save the date : Luciana & Ben se marient entre septembre et décembre 2026.",
  icons: {
    icon: [
      { url: "/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/logo/apple-touch-icon-180x180.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Racines & Promesses — Luciana & Ben",
    description: "Une nouvelle saison commence. Save the date : septembre – décembre 2026.",
    images: ["/logo/logo-lb-w640.png"],
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivoire text-vert-profond">
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
