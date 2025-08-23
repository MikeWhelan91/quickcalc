import Image from 'next/image';

export default function MortgageFAQ() {
  return (
    <section className="card faq" style={{ marginTop: 24 }}>
      <h2>Mortgage FAQs</h2>
      <div>
        <h3>What is a mortgage?</h3>
        <p>
          A mortgage is a loan used to purchase real estate where the property itself
          serves as collateral. Borrowers repay the loan over a set term through
          monthly installments that cover principal and interest.
        </p>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/30_year_mortgage_calculator.webp/640px-30_year_mortgage_calculator.webp.png"
          alt="30-year mortgage calculator screenshot"
          width={640}
          height={360}
          sizes="(max-width: 640px) 100vw, 640px"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div>
        <h3>How is mortgage interest calculated?</h3>
        <p>
          Mortgage interest is typically compounded monthly. Lenders apply the annual
          percentage rate (APR) to the outstanding balance to determine the interest
          portion of each payment.
        </p>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Compound_interest_%28English%29.gif/640px-Compound_interest_%28English%29.gif"
          alt="Compound interest diagram"
          width={640}
          height={360}
          sizes="(max-width: 640px) 100vw, 640px"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div>
        <h3>What is private mortgage insurance (PMI)?</h3>
        <p>
          PMI is insurance that protects the lender if a borrower defaults on a loan
          with a down payment below 20%. It can usually be removed once sufficient
          equity is built in the home.
        </p>
      </div>
      <div>
        <h3>How do property taxes and insurance affect my payment?</h3>
        <p>
          Property taxes and homeowners insurance are often escrowed by the lender and
          added to your monthly mortgage payment, ensuring these obligations are paid
          on time.
        </p>
      </div>
      <div>
        <h3>What is an amortization schedule?</h3>
        <p>
          An amortization schedule outlines each payment over the loan term, showing
          how much goes toward interest versus principal and the remaining balance
          after each installment.
        </p>
      </div>
    </section>
  );
}
