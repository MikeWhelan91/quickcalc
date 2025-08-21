"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <Link href="/" className="brand" aria-label="Quick Calc home">
          <Image
            src="/logos/icon-256.png"
            alt="Quick Calc logo"
            width={48}
            height={48}
            priority
          />
        </Link>

        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <div className={`links${open ? " open" : ""}`}>
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path === n.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
