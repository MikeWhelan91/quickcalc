export const baseUrl = process.env.SITE_URL ?? 'https://quickcalc.me';

export function canonical(path: string): string {
  return new URL(path, baseUrl).toString();
}
