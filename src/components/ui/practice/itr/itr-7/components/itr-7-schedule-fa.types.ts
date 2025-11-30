export interface ITR7ScheduleFAData {
  scheduleFA: {
    // A. Foreign Depository Accounts
    foreign_depository_accounts: {
      country_name: string;
      country_code: string;
      financial_institution_name: string;
      financial_institution_address: string;
      zip_code: string;
      account_number: string;
      status: string;
      account_opening_date: string;
      peak_balance: number;
      closing_balance: number;
      gross_interest_paid: number;
    }[];

    // B. Foreign Custodial Accounts
    foreign_custodial_accounts: {
      country_name: string;
      country_code: string;
      financial_institution_name: string;
      financial_institution_address: string;
      zip_code: string;
      account_number: string;
      status: string;
      account_opening_date: string;
      peak_balance: number;
      closing_balance: number;
      gross_amount_paid: number; // interest/dividend/proceeds
    }[];

    // C. Foreign Equity and Debt Interest
    foreign_equity_debt_interest: {
      country_name: string;
      country_code: string;
      entity_name: string;
      entity_address: string;
      zip_code: string;
      nature_of_entity: string;
      date_of_acquiring: string;
      initial_value: number;
      peak_value: number;
      closing_value: number;
      total_gross_amount_paid: number;
      total_gross_proceeds_sale: number;
    }[];

    // D. Foreign Cash Value Insurance Contract or Annuity Contract
    foreign_insurance_contracts: {
      country_name: string;
      country_code: string;
      financial_institution_name: string;
      financial_institution_address: string;
      zip_code: string;
      date_of_contract: string;
      cash_value_or_surrender_value: number;
      total_gross_amount_paid: number;
    }[];

    // E. Financial Interest in any Entity
    financial_interest_entity: {
      country_name: string;
      zip_code: string;
      nature_of_entity: string;
      name_of_entity: string;
      address_of_entity: string;
      nature_of_interest: string; // Direct/Beneficial/Beneficiary
      date_since_held: string;
      total_investment_at_cost: number;
      income_accrued: number;
      nature_of_income: string;
      taxable_amount: number;
      schedule_offered: string;
      item_number: string;
    }[];

    // F. Immovable Property
    immovable_property: {
      country_name: string;
      zip_code: string;
      address_of_property: string;
      ownership_type: string;
      date_of_acquisition: string;
      total_investment_at_cost: number;
      income_derived: number;
      nature_of_income: string;
      taxable_amount: number;
      schedule_offered: string;
      item_number: string;
    }[];

    // G. Other Capital Assets
    other_capital_assets: {
      country_name: string;
      zip_code: string;
      nature_of_asset: string;
      ownership_type: string;
      date_of_acquisition: string;
      total_investment_at_cost: number;
      income_derived: number;
      nature_of_income: string;
      taxable_amount: number;
      schedule_offered: string;
      item_number: string;
    }[];

    // H. Signing Authority Accounts (Not included in A to D)
    signing_authority_accounts: {
      name_of_institution: string;
      address_of_institution: string;
      zip_code: string;
      name_of_account_holder: string;
      account_number: string;
      peak_balance: number;
      whether_taxable: "Yes" | "No";
      amount_taxable: number;
      schedule_offered: string;
      item_number: string;
    }[];

    // I. Trusts outside India (Trustee/Beneficiary/Settlor)
    trusts_outside_india: {
      country_name: string;
      zip_code: string;
      name_of_trust: string;
      address_of_trust: string;
      name_of_trustees: string;
      address_of_trustees: string;
      name_of_settlor: string;
      address_of_settlor: string;
      name_of_beneficiaries: string;
      address_of_beneficiaries: string;
      date_since_held: string;
      whether_taxable: "Yes" | "No";
      amount_taxable: number;
      schedule_offered: string;
      item_number: string;
    }[];

    // J. Any other income derived from any source outside India
    other_income_outside_india: {
      country_name: string;
      zip_code: string;
      name_address_payer: string;
      income_derived: number;
      nature_of_income: string;
      whether_taxable: "Yes" | "No";
      amount_taxable: number;
      schedule_offered: string;
      item_number: string;
    }[];
  };
}
