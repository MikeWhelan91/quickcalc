import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/next";
import ConsentBanner from "./components/ConsentBanner";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const baseUrl = process.env.SITE_URL ?? "https://quickcalc.me";

export const metadata: Metadata = {
  title: "QuickCalc — Calculators that just work",
  description: "Smart, clean calculators for everyday life. From mortgages to BMI—powered by free public APIs.",
  keywords: [
    "online calculators",
    "mortgage calculator",
    "loan calculator",
    "bmi calculator",
    "age calculator",
    "tip calculator",
    "date difference",
    "business days calculator"
  ],
  metadataBase: new URL(baseUrl),
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logos/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/favicon-16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: { url: "/logos/icon-180.png", sizes: "180x180", type: "image/png" }
  },
  openGraph: {
    title: "QuickCalc — Calculators that just work",
    description: "Smart, clean calculators for everyday life. From mortgages to BMI—powered by free public APIs.",
    url: baseUrl,
    siteName: "QuickCalc",
    type: "website",
    images: [{ url: "/logos/social-1200.png", width: 1200, height: 1200, alt: "QuickCalc logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickCalc — Calculators that just work",
    description: "Smart, clean calculators for everyday life. From mortgages to BMI—powered by free public APIs.",
    images: ["/logos/social-1200.png"],
    creator: "@quickcalc"
  }
};

export const viewport = {
  themeColor: "#98188E"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-9ZHES1KSV3"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              personalization_storage: 'denied',
              security_storage: 'granted'
            });
            gtag('js', new Date());

            gtag('config', 'G-9ZHES1KSV3');
          `}
        </Script>
        <Script id="schema-website" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "QuickCalc",
            url: baseUrl
          })}
        </Script>
      </head>
      <body>
        <Header />
        <main className="container" style={{ paddingTop: 24 }}>{children}</main>
        <footer className="footer container">
          <div>
            © {new Date().getFullYear()} QuickCalc • Fast, private, no sign-up
          </div>
        </footer>
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
