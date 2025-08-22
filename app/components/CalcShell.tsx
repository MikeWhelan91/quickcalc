"use client";
import { ReactNode } from "react";
import { Tomorrow } from "next/font/google";
import "./CalcShell.css";

const tomorrow = Tomorrow({ subsets: ["latin"], weight: ["700"], display: "swap" });

export default function CalcShell({
  title, subtitle, children, result
}: { title: string; subtitle: string; children: ReactNode; result: ReactNode; }) {
  return (
    <section className="calc-shell grid grid-2">
      <div className="card">
        <h1 className={tomorrow.className} style={{ marginTop: 0 }}>{title}</h1>
        <p className="small" style={{ marginTop: 6 }}>{subtitle}</p>
        <div style={{ height: 12 }} />
        {children}
      </div>
      <div className="card">
        <div className="badge" style={{ marginBottom: 10 }}>Result</div>
        {result}
      </div>
    </section>
  );
}
