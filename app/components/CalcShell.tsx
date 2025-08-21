"use client";
import { ReactNode } from "react";

export default function CalcShell({
  title, subtitle, children, result
}: { title: string; subtitle: string; children: ReactNode; result: ReactNode; }) {
  return (
    <section className="grid grid-2">
      <div className="card">
        <h1 style={{marginTop:0}}>{title}</h1>
        <p className="small" style={{marginTop:6}}>{subtitle}</p>
        <div style={{height:12}} />
        {children}
      </div>
      <div className="card">
        <div className="badge" style={{marginBottom:10}}>Result</div>
        {result}
      </div>
    </section>
  );
}
