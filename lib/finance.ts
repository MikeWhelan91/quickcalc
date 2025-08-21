import Decimal from "decimal.js";

export function amortizedPayment(principal: number, aprPercent: number, termMonths: number) {
  const P = new Decimal(principal);
  const r = new Decimal(aprPercent).div(100).div(12);
  const n = new Decimal(termMonths);
  if (r.isZero()) return P.div(n).toNumber();
  const one = new Decimal(1);
  const pmt = P.times(r.times(one.plus(r).pow(n.toNumber()))).div(one.plus(r).pow(n.toNumber()).minus(1));
  return pmt.toNumber();
}
