import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET() {
  const r = await fetch("https://worldtimeapi.org/api/ip", { cache: "no-store" });
  if (!r.ok) return NextResponse.json({ error: "time_upstream_error" }, { status: 502 });
  const data = await r.json();
  return NextResponse.json({ timezone: data.timezone, utc_offset: data.utc_offset });
}
