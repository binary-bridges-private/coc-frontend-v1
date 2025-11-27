import { ITR7Step, ITR7SummarySection } from './itr-7.types.ts';

export const ITR_SEVEN_PROGRESS_STEPS: ITR7Step[] = [
  { id: 1, title: 'General Information', caption: 'Company/Trust Details & Filing Status' },
  { id: 2, title: 'Balance Sheet', caption: 'Equity & Liabilities, Assets' },
  { id: 3, title: 'Balance Sheet (Comprehensive)', caption: 'Detailed Ind AS Format Balance Sheet' },
  { id: 4, title: 'Manufacturing Account', caption: 'Opening Inventory, Purchases, Wages & Overheads' },
  { id: 5, title: 'Trading Account', caption: 'Revenue from Operations, Duties & Taxes, Closing Stock' },
  { id: 6, title: 'Profit and Loss Account', caption: 'Other Income, Expenses, Taxes & Appropriations' },
  { id: 7, title: 'Summary & Verification', caption: 'Review, Schedules & Final Declaration' },
  { id: 8, title: 'Income Statement (Ind-AS)', caption: 'Trading Account with Ind-AS Format' },
  { id: 9, title: 'Profit & Loss Account (Ind-AS)', caption: 'Comprehensive Expenses, Provisions & OCI' },
];

export const ITR_SEVEN_SUMMARY_SECTIONS: ITR7SummarySection[] = [
  {
    id: 'general-info',
    title: 'Part A-GEN - General Information',
    description: 'Personal information including Name, PAN, CIN, Address, Filing Status, Taxation Options, Audit Information, and Company Structure',
    statusText: 'Complete personal details',
    status: 'in-progress',
  },
  {
    id: 'balance-sheet',
    title: 'Part A-BS - Balance Sheet',
    description: 'Balance Sheet showing Equity and Liabilities, Assets with standard fields',
    statusText: 'Balance sheet details',
    status: 'pending',
  },
  {
    id: 'balance-sheet-comprehensive',
    title: 'Part A-BS - Balance Sheet (Comprehensive - Ind AS)',
    description: 'Comprehensive Balance Sheet in detailed Ind AS format with complete subsections for all components',
    statusText: 'Comprehensive balance sheet',
    status: 'pending',
  },
  {
    id: 'manufacturing-account',
    title: 'Part A-MFG - Manufacturing Account',
    description: 'Manufacturing Account showing Opening Inventory, Purchases, Direct Wages, Direct Expenses, Factory Overheads, Closing Stock, and Cost of Goods Produced',
    statusText: 'Manufacturing account details',
    status: 'pending',
  },
  {
    id: 'trading-account',
    title: 'Part A-TRD - Trading Account',
    description: 'Trading Account showing Revenue from Operations, Sales/Gross Receipts, Duties/Taxes Received, and Closing Stock of Finished Goods',
    statusText: 'Trading account details',
    status: 'pending',
  },
  {
    id: 'profit-loss-account',
    title: 'Part A-P&L - Profit and Loss Account',
    description: 'Profit and Loss Account showing Other Income, All Expenses, Bad Debts, Provisions, Interest, Depreciation, Tax Calculations, and Appropriations of Profit',
    statusText: 'Profit and loss account details',
    status: 'pending',
  },
  {
    id: 'summary-verification',
    title: 'Summary & Verification',
    description: 'Review all financial data, complete schedules with key metrics, financial ratios, compliance checklist, notes and disclosures, and final declaration',
    statusText: 'Summary, schedules and verification',
    status: 'pending',
  },
  {
    id: 'income-statement',
    title: 'Part A-IS - Income Statement (Ind-AS)',
    description: 'Income Statement for financial year 2024-25 showing Revenue from Operations, Duties/Taxes, Direct Expenses, Cost of Goods Produced, and Gross Profit',
    statusText: 'Income statement and trading account',
    status: 'pending',
  },
  {
    id: 'pl-account-indas',
    title: 'Part A-P&L - Profit and Loss Account (Ind-AS)',
    description: 'Comprehensive P&L Account with detailed expense categorization, compensation, insurance, commissions, professional fees, bad debts, provisions, depreciation, and Other Comprehensive Income items',
    statusText: 'P&L account with all expenses and OCI',
    status: 'pending',
  },
];
