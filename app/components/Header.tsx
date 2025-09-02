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
  { href: "/business-days", label: "Business Days" },
  { href: "/compound-interest", label: "Compound" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" }
];

export default function Header(){
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav container">
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Link href="/" className="brand" aria-label="QuickCalc home">
          <Image
            src="/logos/icon-256.png"
            alt="QuickCalc logo"
            width={48}
            height={48}
            priority
          />
          <span className="brand-text">QuickCalc</span>
        </Link>

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
