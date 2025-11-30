export interface Itr7ScheduleSH1Shareholder {
  name: string;
  residential_status: string;
  type_of_share: string;
  pan_aadhaar: string;
  date_of_allotment: string;
  number_of_shares: number;
  face_value: number;
  issue_price: number;
  amount_received: number;
}

export interface Itr7ScheduleSH1ApplicationMoney {
  name: string;
  residential_status: string;
  type_of_share: string;
  pan_aadhaar: string;
  date_of_application: string;
  number_of_shares_applied: number;
  application_money_received: number;
  face_value: number;
  proposed_issue_price: number;
}

export interface Itr7ScheduleSH1CeasedShareholder {
  name: string;
  residential_status: string;
  type_of_share: string;
  pan_aadhaar: string;
  number_of_shares: number;
  face_value: number;
  issue_price: number;
  amount_received: number;
  date_of_allotment: string;
  date_cessation: string;
  mode_cessation: string;
  pan_new_shareholder?: string;
}

export interface ITR7ScheduleSH1Data {
  shareholders: Itr7ScheduleSH1Shareholder[];
  application_money: Itr7ScheduleSH1ApplicationMoney[];
  ceased_shareholders: Itr7ScheduleSH1CeasedShareholder[];
}
