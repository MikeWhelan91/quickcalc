export interface ClampOptions {
  min?: number;
  max?: number;
  fallback: number;
}

export function clampNumberInput(raw: string, options: ClampOptions): number {
  const { min, max, fallback } = options;
  if (raw.trim() === "") return fallback;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed)) return fallback;
  let value = parsed;
  if (typeof min === "number") {
    value = Math.max(min, value);
  }
  if (typeof max === "number") {
    value = Math.min(max, value);
  }
  return value;
}

export function clampNumberValue(value: number, options: ClampOptions): number {
  const { min, max, fallback } = options;
  if (!Number.isFinite(value)) return fallback;
  let next = value;
  if (typeof min === "number") {
    next = Math.max(min, next);
  }
  if (typeof max === "number") {
    next = Math.min(max, next);
  }
  return next;
}
