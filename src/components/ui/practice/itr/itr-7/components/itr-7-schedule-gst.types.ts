export interface Itr7ScheduleGSTDetail {
  gstin?: string;
  annual_value_outward_supplies?: number;
}

export interface ITR7ScheduleGSTData {
  scheduleGST: {
    details: Itr7ScheduleGSTDetail[];
  };
}
