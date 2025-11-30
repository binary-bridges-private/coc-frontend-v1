
export interface ITR7ScheduleIFData {
    scheduleIF: {
        investments: {
            name: string;
            type: string;
            pan: string;
            is_liable_for_audit: 'Yes' | 'No';
            is_section_92e_applicable: 'Yes' | 'No';
            percentage_share: number;
            amount_share_in_profit: number;
            capital_balance: number;
        }[];
        total_amount_share_in_profit: number;
        total_capital_balance: number;
    };
}
