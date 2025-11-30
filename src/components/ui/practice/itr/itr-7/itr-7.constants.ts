import { ITR7Step, ITR7SummarySection } from "./itr-7.types.ts";

export const ITR_SEVEN_PROGRESS_STEPS: ITR7Step[] = [
  {
    id: 1,
    title: "General Information",
    caption: "Company/Trust Details & Filing Status",
  },
  { id: 2, title: "Balance Sheet", caption: "Equity & Liabilities, Assets" },
  {
    id: 3,
    title: "Balance Sheet (Comprehensive)",
    caption: "Detailed Ind AS Format Balance Sheet",
  },
  {
    id: 4,
    title: "Manufacturing Account",
    caption: "Opening Inventory, Purchases, Wages & Overheads",
  },
  {
    id: 5,
    title: "Trading Account",
    caption: "Revenue from Operations, Duties & Taxes, Closing Stock",
  },
  {
    id: 6,
    title: "Profit and Loss Account",
    caption: "Other Income, Expenses, Taxes & Appropriations",
  },
  {
    id: 7,
    title: "Summary & Verification",
    caption: "Review, Schedules & Final Declaration",
  },
  {
    id: 8,
    title: "Income Statement (Ind-AS)",
    caption: "Trading Account with Ind-AS Format",
  },
  {
    id: 9,
    title: "Profit & Loss Account (Ind-AS)",
    caption: "Comprehensive Expenses, Provisions & OCI",
  },
  {
    id: 10,
    title: "Part A - OI: Other Information",
    caption: "Other Information",
  },
  {
    id: 11,
    title: "Part A - QD: Quantitative Details",
    caption: "Quantitative Details",
  },
  {
    id: 12,
    title: "Part A - OL: Receipt and Payment",
    caption: "Receipt and Payment Account",
  },
  {
    id: 13,
    title: "Schedule HP",
    caption: "Details of Income from House Property",
  },
  {
    id: 14,
    title: "Schedule BP",
    caption: "Computation of income from business or profession",
  },
  {
    id: 15,
    title: "Schedule DPM",
    caption: "Depreciation on Plant and Machinery",
  },
  { id: 16, title: "Schedule DOA", caption: "Depreciation on other assets" },
  {
    id: 17,
    title: "Schedule DEP",
    caption: "Summary of depreciation on assets",
  },
  {
    id: 18,
    title: "Schedule DCG",
    caption: "Deemed Capital Gains on sale of depreciable assets",
  },
  {
    id: 19,
    title: "Schedule ESR",
    caption: "Expenditure on scientific Research etc.",
  },
  { id: 20, title: "Schedule CG", caption: "Capital Gains" },
  {
    id: 21,
    title: "Schedule 112A",
    caption:
      "From sale of equity share in a company or unit of equity oriented fund or unit of a business trust on which STT is paid under section 112A",
  },
  {
    id: 22,
    title: "Schedule 115AD(1)(b)(iii)-Proviso",
    caption:
      "From sale of equity share in a company or unit of equity oriented fund or unit of a business trust on which STT is paid under section 112A rws 115AD(1)(b)(iii) proviso",
  },
  {
    id: 25,
    title: "Schedule CYLA",
    caption: "Details of Income after Set off of current year losses",
  },
  {
    id: 26,
    title: "Schedule BFLA",
    caption:
      "Details of Income after Set off of Brought Forward Losses of earlier years",
  },
  {
    id: 27,
    title: "Schedule CFL",
    caption: "Details of Losses to be carried forward to future years",
  },
  {
    id: 28,
    title: "Schedule UD",
    caption: "Unabsorbed depreciation and allowance under section 35(4)",
  },
  {
    id: 29,
    title: "Schedule ICDS",
    caption: "Effect of Income Computation Disclosure Standards on profit",
  },
  { id: 30, title: "Schedule 10AA", caption: "Deduction under section 10AA" },
  {
    id: 31,
    title: "Schedule 80G",
    caption: "Details of donations entitled for deduction under section 80G",
  },
  {
    id: 32,
    title: "Schedule 80GGA",
    caption:
      "Details of donations for scientific research or rural development",
  },
  {
    id: 33,
    title: "Schedule 80GGC",
    caption: "Details of contributions made to political parties",
  },
  {
    id: 34,
    title: "Schedule 80IAC",
    caption: "Deduction in respect of eligible start-up",
  },
  {
    id: 35,
    title: "Schedule 80LA",
    caption: "Deduction in respect of offshore banking unit or IFSC",
  },
  {
    id: 36,
    title: "Schedule RA",
    caption: "Details of donations to research associations etc.",
  },
  {
    id: 37,
    title: "Schedule 80-IA",
    caption: "Deductions under section 80-IA",
  },
  {
    id: 38,
    title: "Schedule 80-IB",
    caption: "Deductions under section 80-IB",
  },
  {
    id: 39,
    title: "Schedule 80-IE",
    caption: "Deductions under section 80-IE",
  },
  {
    id: 40,
    title: "Schedule SI",
    caption: "Income chargeable to tax at special rates",
  },
  {
    id: 41,
    title: "Schedule IF",
    caption: "Information regarding investment in unincorporated entities",
  },
  { id: 42, title: "Schedule EI", caption: "Details of Exempt Income" },
  { id: 43, title: "Schedule PTI", caption: "Pass Through Income details" },
  {
    id: 44,
    title: "Schedule MAT",
    caption: "Computation of Minimum Alternate Tax payable under section 115JB",
  },
  {
    id: 45,
    title: "Schedule MATC",
    caption: "Computation of tax credit under section 115JAA",
  },
  {
    id: 46,
    title: "Schedule DBS",
    caption: "Details of tax on distributed income on buy back of shares",
  },
  {
    id: 47,
    title: "Schedule TPSA",
    caption: "Details of Tax on Secondary adjustments as per section 92CE(2A)",
  },
  {
    id: 48,
    title: "Schedule 115TD",
    caption: "Accreted income under section 115TD",
  },
  {
    id: 49,
    title: "Schedule FSI",
    caption: "Details of Income from outside India and tax relief",
  },
  {
    id: 50,
    title: "Schedule TR",
    caption: "Summary of tax relief claimed for taxes paid outside India",
  },
  {
    id: 51,
    title: "Schedule FA",
    caption:
      "Details of Foreign Assets and Income from any source outside India",
  },
  {
    id: 52,
    title: "Schedule SH-1",
    caption: "Shareholding of Unlisted Company",
  },
  {
    id: 53,
    title: "Schedule SH-2",
    caption: "Shareholding of Start-ups",
  },
  {
    id: 54,
    title: "Schedule AL-1",
    caption: "Assets and liabilities as at the end of the year",
  },
  {
    id: 55,
    title: "Schedule AL-2",
    caption:
      "Assets and liabilities as at the end of the year (applicable for start-ups only)",
  },
  {
    id: 56,
    title: "Schedule GST",
    caption: "Information regarding turnover/gross receipt reported for GST",
  },
  {
    id: 57,
    title: "Schedule FD",
    caption: "Break-up of payments/receipts in Foreign currency",
  },
  {
    id: 58,
    title: "Part B - TI",
    caption: "Computation of total income",
  },
  {
    id: 59,
    title: "Part B - TTI",
    caption: "Computation of tax liability on total income",
  },
  {
    id: 60,
    title: "Verification",
    caption: "Verification of return",
  },
];

export const ITR_SEVEN_SUMMARY_SECTIONS: ITR7SummarySection[] = [
  {
    id: "general-info",
    title: "Part A-GEN - General Information",
    description:
      "Personal information including Name, PAN, CIN, Address, Filing Status, Taxation Options, Audit Information, and Company Structure",
    statusText: "Complete personal details",
    status: "in-progress",
  },
  {
    id: "balance-sheet",
    title: "Part A-BS - Balance Sheet",
    description:
      "Balance Sheet showing Equity and Liabilities, Assets with standard fields",
    statusText: "Balance sheet details",
    status: "pending",
  },
  {
    id: "balance-sheet-comprehensive",
    title: "Part A-BS - Balance Sheet (Comprehensive - Ind AS)",
    description:
      "Comprehensive Balance Sheet in detailed Ind AS format with complete subsections for all components",
    statusText: "Comprehensive balance sheet",
    status: "pending",
  },
  {
    id: "manufacturing-account",
    title: "Part A-MFG - Manufacturing Account",
    description:
      "Manufacturing Account showing Opening Inventory, Purchases, Direct Wages, Direct Expenses, Factory Overheads, Closing Stock, and Cost of Goods Produced",
    statusText: "Manufacturing account details",
    status: "pending",
  },
  {
    id: "trading-account",
    title: "Part A-TRD - Trading Account",
    description:
      "Trading Account showing Revenue from Operations, Sales/Gross Receipts, Duties/Taxes Received, and Closing Stock of Finished Goods",
    statusText: "Trading account details",
    status: "pending",
  },
  {
    id: "profit-loss-account",
    title: "Part A-P&L - Profit and Loss Account",
    description:
      "Profit and Loss Account showing Other Income, All Expenses, Bad Debts, Provisions, Interest, Depreciation, Tax Calculations, and Appropriations of Profit",
    statusText: "Profit and loss account details",
    status: "pending",
  },
  {
    id: "summary-verification",
    title: "Summary & Verification",
    description:
      "Review all financial data, complete schedules with key metrics, financial ratios, compliance checklist, notes and disclosures, and final declaration",
    statusText: "Summary, schedules and verification",
    status: "pending",
  },
  {
    id: "income-statement",
    title: "Part A-IS - Income Statement (Ind-AS)",
    description:
      "Income Statement for financial year 2024-25 showing Revenue from Operations, Duties/Taxes, Direct Expenses, Cost of Goods Produced, and Gross Profit",
    statusText: "Income statement and trading account",
    status: "pending",
  },
  {
    id: "pl-account-indas",
    title: "Part A-P&L - Profit and Loss Account (Ind-AS)",
    description:
      "Comprehensive P&L Account with detailed expense categorization, compensation, insurance, commissions, professional fees, bad debts, provisions, depreciation, and Other Comprehensive Income items",
    statusText: "P&L account with all expenses and OCI",
    status: "pending",
  },
];
