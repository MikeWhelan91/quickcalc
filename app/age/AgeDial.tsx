"use client";
import { useMemo } from "react";

interface AgeDialProps {
  years: number;
  months: number;
  days: number;
  percent: number;
  expectancy: number;
}

const SIZE = 220;
const STROKE = 18;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function AgeDial({ years, months, days, percent, expectancy }: AgeDialProps) {
  const dash = useMemo(() => {
    const clamped = Math.min(1, Math.max(0, percent));
    const progress = CIRCUMFERENCE * clamped;
    return `${progress} ${CIRCUMFERENCE - progress}`;
  }, [percent]);

  const ageLabel = `${years}y ${months}m ${days}d`;

  return (
    <div className="age-dial" aria-label={`Age dial showing ${ageLabel}`}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="presentation">
        <defs>
          <linearGradient id="ageDialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <linearGradient id="ageDialTrack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(15,31,58,0.08)" />
            <stop offset="100%" stopColor="rgba(15,31,58,0.18)" />
          </linearGradient>
        </defs>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="url(#ageDialTrack)"
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          className="age-dial-progress"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="url(#ageDialGradient)"
          strokeWidth={STROKE}
          strokeDasharray={dash}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <div className="age-dial-label">
        <strong>{ageLabel}</strong>
        <span>of {expectancy} yrs</span>
      </div>
    </div>
  );
}
