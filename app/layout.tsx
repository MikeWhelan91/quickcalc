import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Quick Calc — Calculators that just work",
  description: "Clean design, instant results, no clutter. From mortgages to BMI—powered by free public APIs.",
  themeColor: "#98188E",
  icons: {
    icon: [
      { url: "/logos/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logos/favicon-16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: { url: "/logos/icon-180.png", sizes: "180x180", type: "image/png" }
  },
  openGraph: {
    title: "Quick Calc — Calculators that just work",
    description: "Clean design, instant results, no clutter. From mortgages to BMI—powered by free public APIs.",
    images: [{ url: "/logos/social-1200.png", width: 1200, height: 1200, alt: "Quick Calc logo" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main className="container" style={{ paddingTop: 24 }}>{children}</main>
        <footer className="footer container">
          <div>© {new Date().getFullYear()} Quick Calc • Fast, private, no sign-up</div>
        </footer>
      </body>
    </html>
  );
}
