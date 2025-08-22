import MortgageClient from './MortgageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Mortgage Calculator',
  description: 'Calculate mortgage payments worldwide with taxes, insurance and fees in multiple currencies.'
};

export default function Page() {
  return <MortgageClient />;
}
