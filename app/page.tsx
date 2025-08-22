import Link from "next/link";
import Image from "next/image";

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
        <h1>Quick Calc: fast online calculators, instant answers</h1>
        <p className="small">Subtle visuals and clean design, no distractions. Currency & holidays powered by free public APIs.</p>
      </section>
      <section className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
        {items.map(i => (
          <Link key={i.href} href={i.href} className="card tile" style={{display:"block"}}>
            <div className="tile-img">
              <Image
                src={i.img}
                alt={i.alt}
                fill
                sizes="(max-width: 600px) 100vw, 240px"
                loading="lazy"
              />
            </div>
            <h2 style={{margin:"0 0 6px"}}>{i.title}</h2>
            <p className="small" style={{margin:0}}>{i.desc}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
