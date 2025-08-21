"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/bmi", label: "BMI" },
  { href: "/mortgage", label: "Mortgage" },
  { href: "/loan", label: "Loan" },
  { href: "/age", label: "Age" },
  { href: "/date-diff", label: "Date Diff" },
  { href: "/tip", label: "Tip" },
  { href: "/business-days", label: "Business Days" }
];

export default function Header(){
  const path = usePathname();
  return (
    <header className="header">
      <nav className="nav container">
        <Link href="/" className="brand" aria-label="Quick Calc home">
          <span className="brand-logo" aria-hidden />
          <span>Quick Calc</span>
        </Link>
        <div className="links">
          {nav.map(n => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
