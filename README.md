# QuickCalc (Next.js)

Clean, modern calculators with consistent styling. Includes free APIs:

- **Frankfurter** (FX rates) via `/api/fx`
- **Nager.Date** (public holidays) via `/api/business-days`
- **WorldTimeAPI** (timezone) via `/api/time`

## Run
```bash
npm i
npm run dev
# open http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Notes
- Finance math uses `decimal.js` for precision.
- Date math uses `date-fns` where appropriate.
- All calculators work offline; APIs enhance results (FX, holidays).
