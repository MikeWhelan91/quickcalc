import Link from "next/link";
import Image from "next/image";
import { Outfit, Tomorrow } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["700"], display: "swap" });
const tomorrow = Tomorrow({ subsets: ["latin"], weight: ["700"], display: "swap" });

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
        <p>Clean design, instant results, no clutter. From mortgages to BMI—powered by free public APIs.</p>
        <div className="hero-ctas">
          <Link href="/bmi" className="btn btn-primary">Open BMI Calculator</Link>
          <Link href="#calc-grid" className="btn btn-ghost">Browse all calculators</Link>
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
            <h2 className={tomorrow.className}>{i.title}</h2>
            <p>{i.desc}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
