import Link from "next/link";

const items = [
  { href: "/mortgage", title: "Mortgage Calculator", desc: "Monthly payment & totals (with FX conversion)" },
  { href: "/loan", title: "Loan Calculator", desc: "Payments and total interest" },
  { href: "/bmi", title: "BMI Calculator", desc: "Body mass index" },
  { href: "/age", title: "Age Calculator", desc: "Exact age in Y/M/D" },
  { href: "/date-diff", title: "Date Difference", desc: "Days and weeks between dates" },
  { href: "/tip", title: "Tip Calculator", desc: "Split bill quickly" },
  { href: "/business-days", title: "Business Days", desc: "Working days excluding weekends & holidays" }
];

export default function Home() {
  return (
    <>
      <section className="hero" style={{ marginBottom: 16 }}>
        <h1>Fast online calculators, instant answers</h1>
        <p className="small">Clean design, instant results, no distractions. Currency & holidays powered by free public APIs.</p>
      </section>
      <section className="grid" style={{gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))"}}>
        {items.map(i => (
          <Link key={i.href} href={i.href} className="card" style={{display:"block"}}>
            <div className="badge" style={{marginBottom:10}}>Calculator</div>
            <h2 style={{margin:"4px 0 6px"}}>{i.title}</h2>
            <p className="small" style={{margin:0}}>{i.desc}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
