
export interface ITR7ScheduleESRData {
    esr_items: ESRItem[];
    total_esr: ESRItem;
}

export interface ESRItem {
    section: string; // 1
    amount_debited_pl?: number; // 2
    amount_deduction_allowable?: number; // 3
    amount_deduction_excess?: number; // 4
}
