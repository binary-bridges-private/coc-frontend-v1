
export interface ITR7ScheduleRAData {
    scheduleRA: {
        details: {
            donee_name_address: string;
            donee_pan: string;
            donation_cash: number;
            donation_other_mode: number;
            total_donation: number;
            eligible_amount: number;
        }[];
        total_donation: {
            donation_cash: number;
            donation_other_mode: number;
            total_donation: number;
            eligible_amount: number;
        };
    };
}
