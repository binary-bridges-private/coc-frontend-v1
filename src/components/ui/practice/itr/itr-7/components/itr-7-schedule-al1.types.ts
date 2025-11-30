export interface Itr7ScheduleAL1Asset {
  address?: string;
  pin_code?: string;
  date_of_acquisition?: string;
  cost_of_acquisition?: number;
  purpose_of_use?: string;
}

export interface Itr7ScheduleAL1Equity {
  opening_balance_no?: number;
  opening_balance_cost?: number;
  acquired_no?: number;
  acquired_cost?: number;
  transferred_no?: number;
  transferred_sale_consideration?: number;
  closing_balance_no?: number;
  closing_balance_cost?: number;
}

export interface Itr7ScheduleAL1UnlistedEquity extends Itr7ScheduleAL1Equity {
  name_of_company?: string;
  pan?: string;
}

export interface Itr7ScheduleAL1OtherSecurities extends Itr7ScheduleAL1Equity {
  type_of_security?: string;
}

export interface Itr7ScheduleAL1CapitalContribution {
  name_of_entity?: string;
  pan?: string;
  opening_balance?: number;
  amount_contributed?: number;
  amount_withdrawn?: number;
  closing_balance?: number;
}

export interface Itr7ScheduleAL1Loans {
  name_of_person?: string;
  pan?: string;
  opening_balance?: number;
  amount_lent?: number;
  amount_repaid?: number;
  closing_balance?: number;
  rate_of_interest?: number;
}

export interface Itr7ScheduleAL1MovableAsset {
  particulars?: string;
  registration_no?: string; // Only for vehicles
  cost_of_acquisition?: number;
  date_of_acquisition?: string;
  purpose_of_use?: string;
  quantity?: number; // Only for jewellery etc
}

export interface Itr7ScheduleAL1Liability {
  name_of_person?: string;
  pan?: string;
  opening_balance?: number;
  amount_received?: number;
  amount_paid?: number;
  closing_balance?: number;
}

export interface ITR7ScheduleAL1Data {
  scheduleAL1: {
    residential_assets: Itr7ScheduleAL1Asset[];
    non_residential_assets: Itr7ScheduleAL1Asset[];
    listed_equity: Itr7ScheduleAL1Equity[]; // Usually a single row summary or multiple? Assuming multiple for now or single summary row. Standard is usually summary. Let's make it an array to be safe.
    unlisted_equity: Itr7ScheduleAL1UnlistedEquity[];
    other_securities: Itr7ScheduleAL1OtherSecurities[];
    capital_contributions: Itr7ScheduleAL1CapitalContribution[];
    loans_advances: Itr7ScheduleAL1Loans[];
    vehicles: Itr7ScheduleAL1MovableAsset[];
    jewellery_art: Itr7ScheduleAL1MovableAsset[];
    liabilities: Itr7ScheduleAL1Liability[];
  };
}
