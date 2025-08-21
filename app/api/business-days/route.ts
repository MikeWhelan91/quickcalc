import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get("country") || "IE";
  const startStr = searchParams.get("start") || new Date().toISOString().slice(0,10);
  const endStr = searchParams.get("end") || new Date().toISOString().slice(0,10);
  const start = new Date(startStr);
  const end = new Date(endStr);
  const year = start.getFullYear() === end.getFullYear() ? start.getFullYear() : new Date().getFullYear();

  const r = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`, { cache: "force-cache" });
  if (!r.ok) return NextResponse.json({ error: "holiday_upstream_error" }, { status: 502 });
  const holidays = await r.json();
  const set = new Set(holidays.map((h: any) => h.date));

  let d = new Date(start); let businessDays = 0;
  while (d <= end) {
    const day = d.getDay(); // 0 Sun .. 6 Sat
    const iso = d.toISOString().slice(0,10);
    if (day !== 0 && day !== 6 && !set.has(iso)) businessDays++;
    d.setDate(d.getDate() + 1);
  }

  return NextResponse.json({ businessDays }, { headers: { "Cache-Control": "public, s-maxage=86400" } });
}
