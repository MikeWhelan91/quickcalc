"use client";
import { ReactNode } from "react";
import { Outfit } from "next/font/google";
import "./CalcShell.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["700"], display: "swap" });

interface CalcShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  result: ReactNode;
}

export default function CalcShell({ title, subtitle, children, result }: CalcShellProps) {
  return (
    <section className="calc-shell">
      <div className="card calc-shell-panel">
        <div className="calc-shell-head">
          <p className="eyebrow">Calculator</p>
          <h1 className={outfit.className}>{title}</h1>
          <p className="small">{subtitle}</p>
        </div>
        <div className="calc-shell-body">{children}</div>
      </div>
      <div className="card calc-shell-panel calc-shell-result">
        <div className="badge" style={{ marginBottom: 12 }}>Result</div>
        {result}
      </div>
    </section>
  );
}
