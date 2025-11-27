// Summary and Schedules Types for ITR-7
// For the financial year 2024-25

export interface ITR7SummaryData {
  // Schedule 1: Verification
  summary_verification_name: string;
  summary_verification_pan: string;
  summary_verification_place: string;
  summary_verification_date: string;
  summary_verification_signature: string;
  
  // Schedule 2: Key Financial Metrics
  summary_total_income: number;
  summary_gross_profit: number;
  summary_profit_before_tax: number;
  summary_profit_after_tax: number;
  summary_total_assets: number;
  summary_total_liabilities: number;
  summary_net_worth: number;
  
  // Schedule 3: Tax Summary
  summary_tax_provision_current: number;
  summary_tax_provision_deferred: number;
  summary_tax_effective_rate: number;
  
  // Schedule 4: Ratios and Metrics
  summary_debt_equity_ratio: number;
  summary_current_ratio: number;
  summary_quick_ratio: number;
  summary_profit_margin: number;
  summary_return_on_assets: number;
  summary_return_on_equity: number;
  
  // Schedule 5: Compliance Checklist
  summary_books_maintained: string; // Yes/No
  summary_audit_conducted: string; // Yes/No
  summary_gst_registered: string; // Yes/No
  summary_tds_compliance: string; // Yes/No
  summary_schedule_required: string; // Yes/No
  
  // Schedule 6: Notes and Disclosures
  summary_accounting_policies: string;
  summary_contingent_liabilities: string;
  summary_commitments: string;
  summary_related_party_transactions: string;
  summary_events_after_balance_sheet: string;
  
  // Schedule 7: Declaration
  summary_declaration_text: string;
  summary_declaration_acceptance: string; // Yes/No
  summary_declaration_date: string;
}
