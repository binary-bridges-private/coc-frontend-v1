
export interface ITR7ScheduleVDAData {
    scheduleVDA: {
        details: {
            date_acquisition?: string; // Col 2
            date_transfer?: string; // Col 3
            head_taxed?: string; // Col 4 (Business/Capital Gain)
            cost_acquisition?: number; // Col 5
            consideration_received?: number; // Col 6
            income_from_transfer?: number; // Col 7
        }[];
        total_business_income?: number; // A
        total_capital_gain_income?: number; // B
    };
}
