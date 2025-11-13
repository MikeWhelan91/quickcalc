import Link from "next/link";
import Image from "next/image";
import { Outfit } from "next/font/google";
import type { Metadata } from "next";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "QuickCalc – Accurate Online Calculators for Everyday Planning",
  description:
    "QuickCalc delivers fast, ad-free calculators for mortgages, loans, BMI, age, business days and more with clear explanations and expert guides.",
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
    "calculator faq",
    "financial planning tools",
    "health calculators"
  ],
  alternates: { canonical: canonical('/') },
  openGraph: {
    title: "QuickCalc – Accurate Online Calculators for Everyday Planning",
    description:
      "QuickCalc delivers fast, ad-free calculators for mortgages, loans, BMI, age, business days and more with clear explanations and expert guides.",
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

const outfit = Outfit({ subsets: ["latin"], weight: ["600", "700"], display: "swap" });

const items = [
  {
    href: "/mortgage",
    title: "Mortgage",
    desc: "Estimate payments, amortization, and total interest before you commit.",
    img: "/images/mortgage.jpg",
    alt: "House keys and mortgage paperwork"
  },
  {
    href: "/loan",
    title: "Loan",
    desc: "Plan personal, student, or auto loans with flexible terms and rates.",
    img: "/images/loan.jpg",
    alt: "Loan documents and calculator"
  },
  {
    href: "/bmi",
    title: "BMI",
    desc: "Check BMI instantly for adults or teens using metric or imperial units.",
    img: "/images/bmi.jpg",
    alt: "Scale and measuring tape"
  },
  {
    href: "/age",
    title: "Age",
    desc: "Find exact age in years, months, days, or countdown to your next milestone.",
    img: "/images/age.jpg",
    alt: "Clock and calendar for age"
  },
  {
    href: "/date-diff",
    title: "Date Difference",
    desc: "Count days, workweeks, or key deadlines between any two dates.",
    img: "/images/date.jpg",
    alt: "Calendar pages showing dates"
  },
  {
    href: "/tip",
    title: "Tip",
    desc: "Split the bill, round totals, and keep groups honest in one tap.",
    img: "/images/tips.jpg",
    alt: "Receipt with tip calculation"
  },
  {
    href: "/business-days",
    title: "Business Days",
    desc: "Count workdays excluding weekends and US holidays for project plans.",
    img: "/images/business.jpg",
    alt: "Office calendar for business days"
  },
  {
    href: "/compound-interest",
    title: "Compound Interest",
    desc: "Forecast growth for savings or investments with custom compounding.",
    img: "/images/loan.jpg",
    alt: "Stacked coins"
  }
];

const heroStats = [
  { value: "12+", label: "purpose-built calculators" },
  { value: "<1s", label: "average calculation time" },
  { value: "0 logins", label: "data stays on your device" }
];

const highlights = [
  {
    title: "Built for clarity",
    desc: "Each calculator includes plain-language explanations, unit controls, and instant recalculation so you always understand the numbers."
  },
  {
    title: "SEO-ready insights",
    desc: "Every results page is structured with semantic headings and schema markup so you can cite or share trusted answers."
  },
  {
    title: "Guides & walkthroughs",
    desc: "In-depth guides cover mortgages, loans, BMI categories, tip etiquette, and more to reinforce confident decisions."
  }
];

const resources = [
  {
    title: "Financial planning",
    points: [
      "Create payoff strategies for mortgages, auto, or personal loans.",
      "Compare fixed versus adjustable rates with amortization tables.",
      "Project savings growth with compound interest scenarios."
    ]
  },
  {
    title: "Health & lifestyle",
    points: [
      "Track BMI and age milestones for wellness programs.",
      "Calculate tip splits, dining budgets, or group travel costs.",
      "Plan events with accurate date and business-day counts."
    ]
  }
];

export default function Home() {
  return (
    <>
      <section className="hero hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Trusted by planners, teams, and everyday users</p>
          <h1 className={`${outfit.className} hero-title`}>
            Calculators that deliver answers you can act on
          </h1>
          <p className="hero-subtext">
            QuickCalc brings together finance, productivity, and wellness math in one fast, privacy-first toolkit. No sign-ups, no
            data retention—just accurate figures backed by detailed guides.
          </p>
          <div className="hero-ctas">
            <Link href="/bmi" className="btn btn-primary">
              Launch BMI Calculator
            </Link>
            <Link href="/guides" className="btn btn-ghost">
              Read the Guides
            </Link>
          </div>
          <dl className="hero-stats">
            {heroStats.map(stat => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero-media">
          <Image src="/images/hero.jpg" alt="Assorted calculator tools" fill sizes="(max-width: 960px) 100vw, 480px" priority />
        </div>
      </section>

      <section className="card" style={{ marginTop: 32 }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Calculator library</p>
            <h2 className={outfit.className}>Pick a tool and get instant insights</h2>
            <p>
              Every calculator is tuned for speed, validation, and accessibility. Switch between metric and imperial units, export
              amortization tables, and share deep links without losing your work.
            </p>
          </div>
          <Link href="/faq" className="fancy-link">
            See common questions
          </Link>
        </div>
        <div className="grid calc-grid">
          {items.map(i => (
            <Link key={i.href} href={i.href} className="tile">
              <div className="tile-img" aria-hidden="true">
                <Image src={i.img} alt={i.alt} fill sizes="(max-width: 600px) 100vw, 240px" loading="lazy" />
              </div>
              <div className="tile-content">
                <h3 className={outfit.className}>{i.title}</h3>
                <p>{i.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="info-grid">
        {highlights.map(h => (
          <article key={h.title} className="card info-card">
            <h3 className={outfit.className}>{h.title}</h3>
            <p>{h.desc}</p>
          </article>
        ))}
      </section>

      <section className="card seo-panel">
        <div>
          <p className="eyebrow">Why QuickCalc</p>
          <h2 className={outfit.className}>Fast math plus trustworthy context</h2>
          <p>
            QuickCalc uses lightweight client-side math so your inputs never leave the page. Structured data, accessible markup, and
            comprehensive copy make each calculator easy to index and easy to understand.
          </p>
        </div>
        <div className="grid resource-grid">
          {resources.map(resource => (
            <article key={resource.title}>
              <h3>{resource.title}</h3>
              <ul>
                {resource.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="card about-panel">
        <h2>About QuickCalc</h2>
        <p>
          QuickCalc is an independent project focused on transparency and speed. Each tool runs instantly in your browser, prioritizing
          privacy with no sign-ups or storage. We publish frequent updates to improve accuracy, add region-specific presets, and answer
          community questions.
        </p>
        <p>
          Looking to understand the math behind the numbers? Browse our {" "}
          <Link href="/guides" className="fancy-link">
            calculator guides
          </Link>{" "}
          or check the {" "}
          <Link href="/faq" className="fancy-link">
            FAQ
          </Link>{" "}
          for quick answers.
        </p>
      </section>
    </>
  );
}
