import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "QuickCalc – Free Online Calculators",
  description:
    "Instant answers for mortgage, loan, BMI, age, date difference, tip and business day calculations.",
  keywords: [
    "free online calculators",
    "mortgage calculator",
    "loan calculator",
    "bmi calculator",
    "age calculator",
    "tip calculator",
    "date difference calculator",
    "business days calculator",
    "calculator guides",
    "calculator faq"
  ],
  alternates: { canonical: canonical('/') },
  openGraph: {
    title: "QuickCalc – Free Online Calculators",
    description:
      "Instant answers for mortgage, loan, BMI, age, date difference, tip and business day calculations.",
    url: canonical('/'),
    images: [
      {
        url: "/logos/social-1200.png",
        width: 1200,
        height: 1200,
        alt: "QuickCalc logo"
      }
    ]
  }
};

const outfit = Outfit({ subsets: ["latin"], weight: ["700"], display: "swap" });

const items = [
  {
    href: "/mortgage",
    title: "Mortgage",
    desc: "Estimate your monthly home payment and total cost",
    img: "/images/mortgage.jpg",
    alt: "House keys and mortgage paperwork"
  },
  {
    href: "/loan",
    title: "Loan",
    desc: "Plan payments and interest for any personal loan",
    img: "/images/loan.jpg",
    alt: "Loan documents and calculator"
  },
  {
    href: "/bmi",
    title: "BMI",
    desc: "Check your body mass index from height and weight",
    img: "/images/bmi.jpg",
    alt: "Scale and measuring tape"
  },
  {
    href: "/age",
    title: "Age",
    desc: "Find your exact age in years, months, and days",
    img: "/images/age.jpg",
    alt: "Clock and calendar for age"
  },
  {
    href: "/date-diff",
    title: "Date Difference",
    desc: "Calculate days and weeks between dates",
    img: "/images/date.jpg",
    alt: "Calendar pages showing dates"
  },
  {
    href: "/tip",
    title: "Tip",
    desc: "Quickly split restaurant bills and tips",
    img: "/images/tips.jpg",
    alt: "Receipt with tip calculation"
  },
  {
    href: "/business-days",
    title: "Business Days",
    desc: "Count workdays excluding weekends and holidays",
    img: "/images/business.jpg",
    alt: "Office calendar for business days"
  }
];

export default function Home() {
  return (
    <>
      <section className="hero" style={{ marginBottom: 16 }}>
        <div className="hero-img">
          <Image
            src="/images/hero.jpg"
            alt="Assorted calculator tools"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <h1 className={outfit.className}>Calculators that just work</h1>
        <p>Smart, clean calculators for everyday life.</p>
        <div className="hero-ctas">
          <Link href="/bmi" className="btn btn-primary">Open BMI Calculator</Link>
        </div>
      </section>
      <section id="calc-grid" className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
        {items.map(i => (
          <Link key={i.href} href={i.href} className="card tile">
            <div className="tile-img">
              <Image
                src={i.img}
                alt={i.alt}
                fill
                sizes="(max-width: 600px) 100vw, 240px"
                loading="lazy"
              />
            </div>
            <h2 className={outfit.className}>{i.title}</h2>
            <p>{i.desc}</p>

          </Link>
        ))}
      </section>
      <section className="card" style={{ marginTop: 40 }}>
        <h2>About QuickCalc</h2>
        <p>
          QuickCalc offers a growing collection of free online calculators designed for everyday use.
          Each tool runs instantly in your browser, prioritizing privacy with no sign‑ups or data storage.
        </p>
        <p>
          Looking to understand the math behind the numbers? Browse our
          {" "}
          <Link href="/guides" className="fancy-link">calculator guides</Link>
          {" "}
          or check the
          {" "}
          <Link href="/faq" className="fancy-link">FAQ</Link>
          {" "}
          for quick answers.
        </p>
      </section>
    </>
  );
}
