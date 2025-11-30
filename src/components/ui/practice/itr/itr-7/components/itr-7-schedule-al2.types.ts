export interface Itr7ScheduleAL2Asset {
  address?: string;
  pin_code?: string;
  date_of_acquisition?: string;
  cost_of_acquisition?: number;
  purpose_of_use?: string;
  transferred_on_or_before_end_of_year?: string; // Yes/No
  date_of_transfer?: string;
}

export interface Itr7ScheduleAL2Loans {
  name_of_person?: string;
  pan?: string;
  date_loan_made?: string;
  amount_loans_advances?: number;
  amount_repaid?: number;
  repaid_before_end_of_year?: string; // Yes/No
  date_of_repayment?: string;
  closing_balance?: number;
  rate_of_interest?: number;
}

export interface Itr7ScheduleAL2CapitalContribution {
  name_of_entity?: string;
  pan?: string;
  date_contribution_made?: string;
  amount_contribution?: number;
  amount_withdrawn?: number;
  amount_profit_loss_dividend?: number;
  closing_balance?: number;
}

export interface Itr7ScheduleAL2Shares {
  name_of_company?: string;
  pan?: string;
  type_of_shares?: string;
  number_of_shares?: number;
  cost_of_acquisition?: number;
  date_of_acquisition?: string;
  transferred_before_end_of_year?: string; // Yes/No
  date_of_transfer?: string;
  closing_balance?: number;
}

export interface Itr7ScheduleAL2MovableAsset {
  particulars?: string;
  registration_no?: string; // Only for vehicles
  cost_of_acquisition?: number;
  date_of_acquisition?: string;
  purpose_of_use?: string;
  transferred_before_end_of_year?: string; // Yes/No
  date_of_transfer?: string;
  quantity?: number; // Only for jewellery etc
  closing_balance?: number;
}

export interface Itr7ScheduleAL2Liability {
  name_of_person?: string;
  pan?: string;
  opening_balance?: number;
  amount_received?: number;
  amount_paid?: number;
  interest_debited?: number;
  closing_balance?: number;
  rate_of_interest?: number;
}

export interface ITR7ScheduleAL2Data {
  scheduleAL2: {
    residential_assets: Itr7ScheduleAL2Asset[];
    non_residential_assets: Itr7ScheduleAL2Asset[];
    loans_advances: Itr7ScheduleAL2Loans[];
    capital_contributions: Itr7ScheduleAL2CapitalContribution[];
    shares_securities: Itr7ScheduleAL2Shares[];
    vehicles: Itr7ScheduleAL2MovableAsset[];
    jewellery_art: Itr7ScheduleAL2MovableAsset[];
    archaeological_collections: Itr7ScheduleAL2MovableAsset[];
    liabilities: Itr7ScheduleAL2Liability[];
  };
}
