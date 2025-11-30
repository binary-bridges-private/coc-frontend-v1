export interface ITR7Schedule115TDData {
  schedule115TD: {
    aggregate_fmv_total_assets: number; // 1
    less_total_liability: number; // 2
    net_value_of_assets: number; // 3 (1-2)

    // Section 4: FMV of assets
    fmv_assets_details: {
      directly_acquired_income_section_10_1: number; // 4i
      acquired_during_period_date_creation: number; // 4ii
      transferred_third_proviso_115td_2: number; // 4iii
      total_fmv: number; // 4iv (i+ii+iii)
    };

    liability_respect_assets: number; // 5
    accreted_income_section_115td: number; // 6 (3 - (4iv - 5))
    additional_income_tax_payable_115td: number; // 7
    interest_payable_115te: number; // 8
    specified_date_115td: string; // 9
    additional_income_tax_and_interest_payable: number; // 10
    tax_and_interest_paid: number; // 11
    net_payable: number; // 12 (10 - 11)

    // Date(s) of deposit
    deposit_dates: { date: string }[];

    // Bank details
    name_of_bank_and_branch: string;
    bsr_code: string;
    serial_number_of_challan: string;
    amount_deposited: number;
  };
}
