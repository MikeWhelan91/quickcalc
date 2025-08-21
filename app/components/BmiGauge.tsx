'use client';
import React from 'react';

type Props = { value: number };

// Domain (12 → 40 mapped to 180° → 360° on the TOP semicircle)
const MIN = 12;
const MAX = 40;
const CUTS = { underEnd: 18.5, normalEnd: 25, overEnd: 30 };

// Geometry (match these with viewBox below)
const VB_W = 320;
const VB_H = 220;
const cx = VB_W / 2;  // 160
const cy = 140;       // vertical center for the dial
const R  = 100;
const THICK = 16;
const OVERLAP_DEG = 2; // visual only: green “eats” 2° at each side

// Map BMI to degrees on top semicircle (left=180°, right=360°)
function toDeg(bmi: number) {
  const clamped = Math.max(MIN, Math.min(MAX, bmi ?? MIN));
  return 180 + ((clamped - MIN) / (MAX - MIN)) * 180;
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(startDeg: number, endDeg: number) {
  const s = polar(cx, cy, R, startDeg);
  const e = polar(cx, cy, R, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const sweep = 1; // clockwise along top half
  return `M ${s.x.toFixed(3)},${s.y.toFixed(3)} A ${R} ${R} 0 ${large} ${sweep} ${e.x.toFixed(3)},${e.y.toFixed(3)}`;
}

export default function BmiGauge({ value }: Props) {
  // Base cutoffs
  const dLeft  = 180;
  const dUnder = toDeg(CUTS.underEnd);
  const dNorm  = toDeg(CUTS.normalEnd);
  const dOver  = toDeg(CUTS.overEnd);
  const dRight = 360;

  // Visual balance (segments only)
  const U_END = Math.max(dLeft, dUnder - OVERLAP_DEG);
  const N_END = Math.min(dNorm + OVERLAP_DEG, dOver - 1e-3);
  const O_END = dOver;

  // Needle (true mapping)
  const dVal   = toDeg(value);
  const needle = polar(cx, cy, R - 10, dVal);

  // Ticks & labels (shorter ticks; avoid “hyphen at 40”)
  const tickValues = [MIN, CUTS.underEnd, CUTS.normalEnd, CUTS.overEnd, MAX];
  const rTickOuter = R - THICK / 2 + 1;
  const rTickInner = rTickOuter - 6;       // shorter tick
  const labelR     = rTickInner - 10;      // sit a touch lower

  return (
    <svg
      width="100%"
      height="200"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      style={{ display: 'block', margin: '0 auto' }}
      role="img"
      aria-label={`BMI gauge ${value ?? '—'}`}
    >
      {/* Background track */}
      <path d={arcPath(dLeft, dRight)} fill="none" stroke="rgba(0,0,0,.08)" strokeWidth={THICK} strokeLinecap="round" />

      {/* Inner rim + soft highlight for depth */}
      <path
        d={`M ${polar(cx,cy,R-THICK/2, dLeft).x},${polar(cx,cy,R-THICK/2, dLeft).y}
            A ${R-THICK/2} ${R-THICK/2} 0 1 1 ${polar(cx,cy,R-THICK/2, dRight).x},${polar(cx,cy,R-THICK/2, dRight).y}`}
        fill="none"
        stroke="rgba(0,0,0,.10)"
        strokeWidth={1.25}
      />
      <path
        d={`M ${polar(cx,cy,R+THICK/2, dLeft).x},${polar(cx,cy,R+THICK/2, dLeft).y}
            A ${R+THICK/2} ${R+THICK/2} 0 1 1 ${polar(cx,cy,R+THICK/2, dRight).x},${polar(cx,cy,R+THICK/2, dRight).y}`}
        fill="none"
        stroke="rgba(255,255,255,.6)"
        strokeWidth={1}
        opacity="0.7"
      />

      {/* Segments (no overlap; butt caps keep joins crisp) */}
      <path d={arcPath(dLeft, U_END)}  fill="none" stroke="#94a3b8" strokeWidth={THICK} strokeLinecap="butt" />
      <path d={arcPath(U_END, N_END)}  fill="none" stroke="#22c55e" strokeWidth={THICK} strokeLinecap="butt" />
      <path d={arcPath(N_END, O_END)}  fill="none" stroke="#F6A313" strokeWidth={THICK} strokeLinecap="butt" />
      <path d={arcPath(O_END, dRight)} fill="none" stroke="#ef4444" strokeWidth={THICK} strokeLinecap="butt" />

      {/* Ticks + labels */}
      {tickValues.map((v, i) => {
        const d = toDeg(v);
        const p1 = polar(cx, cy, rTickOuter, d);
        const p2 = polar(cx, cy, rTickInner, d);
        const pl = polar(cx, cy, labelR, d);

        // Improve readability at extreme ends
        const anchor =
          Math.abs(d - dLeft) < 0.01 ? 'end' :
          Math.abs(d - dRight) < 0.01 ? 'start' :
          'middle';

        return (
          <g key={i}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="rgba(0,0,0,.45)" strokeWidth={1.25} />
            <text x={pl.x} y={pl.y + 4} fontSize="10" fill="#6b7280" textAnchor={anchor}>
              {String(v)}
            </text>
          </g>
        );
      })}

      {/* Needle + hub */}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke="#0F1F3A" strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill="#0F1F3A" />
    </svg>
  );
}
