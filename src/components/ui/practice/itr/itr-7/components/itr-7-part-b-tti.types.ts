export interface Itr7BankDetails {
  ifs_code?: string;
  bank_name?: string;
  account_number?: string;
  account_type?: string; // Dropdown
  select_for_refund?: boolean;
}

export interface Itr7ForeignBankDetails {
  swift_code?: string;
  bank_name?: string;
  country?: string;
  iban?: string;
}

export interface Itr7AdvanceTaxDetails {
  bsr_code?: string;
  date_of_deposit?: string;
  serial_number?: string;
  amount?: number;
}

export interface Itr7TDSDetails {
  tan_deductor?: string;
  name_deductor?: string; // PAN/Aadhar or Name
  unclaimed_tds_brought_forward?: number;
  tds_current_year?: number;
  tds_credit_claimed?: number;
  gross_receipt_offered?: number;
  head_of_income?: string;
}

export interface Itr7TCSDetails {
  tax_deduction_account_number?: string;
  name_collector?: string;
  unclaimed_tcs_brought_forward?: number;
  tcs_current_year?: number;
  tcs_credit_claimed?: number;
  gross_receipt_offered?: number; // implied from context, though image header is slightly different
}

export interface ITR7PartBTTIData {
  partBTTI: {
    computation_tax_liability: {
      tax_payable_deemed_total_income_115jb?: number; // 1a
      surcharge_115jb?: number; // 1b
      cess_115jb?: number; // 1c
      total_tax_payable_115jb?: number; // 1d

      tax_at_normal_rates?: number; // 2a
      tax_at_special_rates?: number; // 2b
      tax_payable_total_income?: number; // 2c
      surcharge?: {
        rate_25_percent?: number; // 2di
        on_balance?: number; // 2dii
        total_surcharge?: number; // 2diii
      };
      cess?: number; // 2e
      gross_tax_liability?: number; // 2f

      gross_tax_payable?: number; // 3
      credit_115jaa?: number; // 4
      tax_payable_after_credit?: number; // 5
      tax_relief?: {
        section_90_90a?: number; // 6a
        section_91?: number; // 6b
        total_relief?: number; // 6c
      };
      net_tax_liability?: number; // 7
      interest_fee_payable?: {
        section_234a?: number; // 8a
        section_234b?: number; // 8b
        section_234c?: number; // 8c
        section_234f?: number; // 8d
        total_interest_fee?: number; // 8e
      };
      aggregate_liability?: number; // 9
    };
    taxes_paid: {
      advance_tax?: number; // 10a
      tds?: number; // 10b
      tcs?: number; // 10c
      self_assessment_tax?: number; // 10d
      total_taxes_paid?: number; // 10e
      amount_payable?: number; // 11
      refund?: number; // 12
      net_tax_payable_115td?: number; // 13
      tax_payable_115td_after_adjustment?: number; // 14
      net_refund_after_adjustment?: number; // 15
    };
    bank_accounts: Itr7BankDetails[]; // 16a
    foreign_bank_account?: Itr7ForeignBankDetails; // 16b
    asset_outside_india?: string; // 17 Yes/No
    tax_payments: {
      advance_tax: Itr7AdvanceTaxDetails[]; // 18A
      tds: Itr7TDSDetails[]; // 18B
      tcs: Itr7TCSDetails[]; // 18C
    };
  };
}
