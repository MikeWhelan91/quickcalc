import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const base = searchParams.get("base") || "EUR";
  const symbols = searchParams.get("symbols") || "USD,GBP";
  const upstream = `https://api.frankfurter.app/latest?from=${base}&to=${symbols}`;

  const r = await fetch(upstream, { headers: { accept: "application/json" }, cache: "no-store" });
  if (!r.ok) return NextResponse.json({ error: "fx_upstream_error" }, { status: 502 });
  const data = await r.json();

  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" }
  });
}
