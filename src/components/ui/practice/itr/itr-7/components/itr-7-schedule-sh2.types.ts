export interface Itr7ScheduleSH2Shareholder {
  name: string;
  category: string;
  type_of_share: string;
  pan_aadhaar: string;
  date_of_allotment: string;
  number_of_shares: number;
  face_value: number;
  issue_price: number;
  paid_up_value: number;
  share_premium: number;
}

export interface Itr7ScheduleSH2ApplicationMoney {
  name: string;
  category: string;
  type_of_share: string;
  pan_aadhaar: string;
  date_of_application: string;
  number_of_shares_applied: number;
  face_value: number;
  proposed_issue_price: number;
  share_application_money: number;
  share_premium: number;
}

export interface Itr7ScheduleSH2CeasedShareholder {
  name: string;
  category: string;
  type_of_share: string;
  pan_aadhaar: string;
  date_of_allotment: string;
  number_of_shares: number;
  face_value: number;
  issue_price: number;
  paid_up_value: number;
  date_cessation: string;
  mode_cessation: string;
  pan_new_shareholder?: string;
}

export interface ITR7ScheduleSH2Data {
  shareholders: Itr7ScheduleSH2Shareholder[];
  application_money: Itr7ScheduleSH2ApplicationMoney[];
  ceased_shareholders: Itr7ScheduleSH2CeasedShareholder[];
}
