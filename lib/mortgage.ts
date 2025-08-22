export type CountryCode = 'US' | 'CA' | 'UK' | 'AU' | 'EU' | 'IN';

export interface Field {
  id: string;
  label: string;
  step?: number;
  default: number;
  type?: 'number' | 'percent';
  annual?: boolean; // if true, value represents an annual amount
  tooltip?: string;
}

export interface CountrySchema {
  currency: string;
  locale: string;
  fields: {
    basics: Field[];
    recurring: Field[];
    upfront: Field[];
  };
  calculate: (values: Record<string, number>) => {
    payment: number; // monthly principal+interest
    extras: number; // monthly recurring extras
    monthlyTotal: number; // total monthly cost
    interest: number; // total interest paid
    total: number; // total paid over term
    upfront: number; // upfront costs
  };
}

import { amortizedPayment } from './finance';

export const schemas: Record<CountryCode, CountrySchema> = {
  US: {
    currency: 'USD',
    locale: 'en-US',
    fields: {
      basics: [
        { id: 'price', label: 'Property price', default: 400000, step: 1000 },
        { id: 'down', label: 'Down payment', default: 80000, step: 1000 },
        { id: 'term', label: 'Loan term (years)', default: 30, step: 1 },
        { id: 'rate', label: 'Rate (APR %)', default: 4.5, step: 0.01, tooltip: 'Annual percentage rate, the yearly cost of borrowing.' },
      ],
      recurring: [
        { id: 'taxPct', label: 'Property tax %', default: 1.2, step: 0.1, type: 'percent', tooltip: 'Ad valorem tax on property value expressed as a percentage.' },
        { id: 'ins', label: 'Homeowners insurance', default: 1200, step: 100, annual: true, tooltip: 'Insurance covering a private residence and its contents.' },
        { id: 'hoa', label: 'HOA fees', default: 0, step: 10, tooltip: 'Dues paid to a homeowners association for shared amenities.' },
      ],
      upfront: []
    },
    calculate: (v) => {
      const principal = Math.max(v.price - v.down, 0);
      const payment = amortizedPayment(principal, v.rate, v.term * 12);
      const tax = (v.price * (v.taxPct || 0) / 100) / 12;
      const ins = (v.ins || 0) / 12;
      const extras = tax + ins + (v.hoa || 0);
      const monthlyTotal = payment + extras;
      const total = monthlyTotal * v.term * 12;
      const interest = total - principal;
      return { payment, extras, monthlyTotal, interest, total, upfront: 0 };
    }
  },
  CA: {
    currency: 'CAD',
    locale: 'en-CA',
    fields: {
      basics: [
        { id: 'price', label: 'Price', default: 500000, step: 1000 },
        { id: 'down', label: 'Down payment', default: 100000, step: 1000 },
        { id: 'term', label: 'Amortization (years)', default: 25, step: 1 },
        { id: 'rate', label: 'Rate (APR %)', default: 4.0, step: 0.01, tooltip: 'Annual percentage rate, the yearly cost of borrowing.' },
      ],
      recurring: [
        { id: 'taxPct', label: 'Property tax %', default: 1.0, step: 0.1, type: 'percent', tooltip: 'Ad valorem tax on property value expressed as a percentage.' },
        { id: 'ins', label: 'Home insurance', default: 1200, step: 100, annual: true, tooltip: 'Insurance covering a private residence and its contents.' },
        { id: 'condo', label: 'Condo fees', default: 0, step: 10, tooltip: 'Monthly condominium association fees for shared property upkeep.' },
      ],
      upfront: [
        { id: 'cmhc', label: 'CMHC insurance %', default: 0, step: 0.1, type: 'percent', tooltip: 'Mortgage insurance from CMHC that protects lenders when the down payment is small.' }
      ]
    },
    calculate: (v) => {
      let principal = Math.max(v.price - v.down, 0);
      if (v.cmhc && v.cmhc > 0) {
        principal += principal * v.cmhc / 100;
      }
      const payment = amortizedPayment(principal, v.rate, v.term * 12);
      const tax = (v.price * (v.taxPct || 0) / 100) / 12;
      const ins = (v.ins || 0) / 12;
      const extras = tax + ins + (v.condo || 0);
      const monthlyTotal = payment + extras;
      const total = monthlyTotal * v.term * 12;
      const interest = total - principal;
      return { payment, extras, monthlyTotal, interest, total, upfront: 0 };
    }
  },
  UK: {
    currency: 'GBP',
    locale: 'en-GB',
    fields: {
      basics: [
        { id: 'price', label: 'Price', default: 350000, step: 1000 },
        { id: 'down', label: 'Deposit', default: 70000, step: 1000 },
        { id: 'term', label: 'Term (years)', default: 25, step: 1 },
        { id: 'rate', label: 'Rate (APR %)', default: 3.5, step: 0.01, tooltip: 'Annual percentage rate, the yearly cost of borrowing.' },
      ],
      recurring: [
        { id: 'ground', label: 'Ground rent & service', default: 0, step: 10, tooltip: 'Regular ground rent and service charges paid by leaseholders.' },
        { id: 'ins', label: 'Insurance', default: 1000, step: 100, annual: true, tooltip: 'Insurance covering the building against damage or loss.' },
      ],
      upfront: [
        { id: 'stamp', label: 'Stamp duty %', default: 5, step: 0.1, type: 'percent', tooltip: 'Stamp duty land tax charged on property purchases.' }
      ]
    },
    calculate: (v) => {
      const principal = Math.max(v.price - v.down, 0);
      const payment = amortizedPayment(principal, v.rate, v.term * 12);
      const ins = (v.ins || 0) / 12;
      const extras = ins + (v.ground || 0);
      const monthlyTotal = payment + extras;
      const total = monthlyTotal * v.term * 12;
      const interest = total - principal;
      const upfront = v.price * (v.stamp || 0) / 100;
      return { payment, extras, monthlyTotal, interest, total, upfront };
    }
  },
  AU: {
    currency: 'AUD',
    locale: 'en-AU',
    fields: {
      basics: [
        { id: 'price', label: 'Price', default: 600000, step: 1000 },
        { id: 'down', label: 'Deposit', default: 120000, step: 1000 },
        { id: 'term', label: 'Term (years)', default: 30, step: 1 },
        { id: 'rate', label: 'Rate (APR %)', default: 5.0, step: 0.01, tooltip: 'Annual percentage rate, the yearly cost of borrowing.' },
      ],
      recurring: [
        { id: 'strata', label: 'Strata/body-corp fees', default: 0, step: 10, tooltip: 'Contributions to a body corporate for shared property upkeep.' },
        { id: 'ins', label: 'Insurance', default: 1000, step: 100, annual: true, tooltip: 'Insurance covering a private residence and its contents.' },
      ],
      upfront: [
        { id: 'lmi', label: 'LMI %', default: 0, step: 0.1, type: 'percent', tooltip: 'Lenders Mortgage Insurance that protects the lender if the borrower defaults.' }
      ]
    },
    calculate: (v) => {
      let principal = Math.max(v.price - v.down, 0);
      if (v.lmi && v.lmi > 0) principal += principal * v.lmi / 100;
      const payment = amortizedPayment(principal, v.rate, v.term * 12);
      const ins = (v.ins || 0) / 12;
      const extras = ins + (v.strata || 0);
      const monthlyTotal = payment + extras;
      const total = monthlyTotal * v.term * 12;
      const interest = total - principal;
      return { payment, extras, monthlyTotal, interest, total, upfront: 0 };
    }
  },
  EU: {
    currency: 'EUR',
    locale: 'en',
    fields: {
      basics: [
        { id: 'price', label: 'Price', default: 300000, step: 1000 },
        { id: 'down', label: 'Deposit', default: 60000, step: 1000 },
        { id: 'term', label: 'Term (years)', default: 25, step: 1 },
        { id: 'rate', label: 'Rate (APR %)', default: 3.8, step: 0.01, tooltip: 'Annual percentage rate, the yearly cost of borrowing.' },
      ],
      recurring: [
        { id: 'taxPct', label: 'Property tax %', default: 1.0, step: 0.1, type: 'percent', tooltip: 'Ad valorem tax on property value expressed as a percentage.' },
        { id: 'ins', label: 'Insurance', default: 800, step: 100, annual: true, tooltip: 'Insurance covering a private residence and its contents.' },
      ],
      upfront: [
        { id: 'notary', label: 'Notary/registration fees %', default: 2, step: 0.1, type: 'percent', tooltip: 'Percentage paid for notary and property registration services.' }
      ]
    },
    calculate: (v) => {
      const principal = Math.max(v.price - v.down, 0);
      const payment = amortizedPayment(principal, v.rate, v.term * 12);
      const tax = (v.price * (v.taxPct || 0) / 100) / 12;
      const ins = (v.ins || 0) / 12;
      const extras = tax + ins;
      const monthlyTotal = payment + extras;
      const total = monthlyTotal * v.term * 12;
      const interest = total - principal;
      const upfront = v.price * (v.notary || 0) / 100;
      return { payment, extras, monthlyTotal, interest, total, upfront };
    }
  },
  IN: {
    currency: 'INR',
    locale: 'en-IN',
    fields: {
      basics: [
        { id: 'price', label: 'Price', default: 5000000, step: 10000 },
        { id: 'down', label: 'Down payment', default: 1000000, step: 10000 },
        { id: 'term', label: 'Term (years)', default: 20, step: 1 },
        { id: 'rate', label: 'Rate (APR %)', default: 8.0, step: 0.01, tooltip: 'Annual percentage rate, the yearly cost of borrowing.' },
      ],
      recurring: [
        { id: 'tax', label: 'Property tax', default: 10000, step: 1000, annual: true, tooltip: 'Yearly municipal tax on real estate.' },
        { id: 'maint', label: 'Maintenance', default: 0, step: 100, tooltip: 'Monthly maintenance or society charges for shared services.' },
      ],
      upfront: [
        { id: 'proc', label: 'Processing fee %', default: 1, step: 0.1, type: 'percent', tooltip: 'One-time loan origination fee as a percentage of the principal.' }
      ]
    },
    calculate: (v) => {
      let principal = Math.max(v.price - v.down, 0);
      const upfront = principal * (v.proc || 0) / 100;
      const payment = amortizedPayment(principal, v.rate, v.term * 12);
      const tax = (v.tax || 0) / 12;
      const extras = tax + (v.maint || 0);
      const monthlyTotal = payment + extras;
      const total = monthlyTotal * v.term * 12;
      const interest = total - principal;
      return { payment, extras, monthlyTotal, interest, total, upfront };
    }
  }
};
