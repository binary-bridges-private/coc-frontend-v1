
export interface ITR7Schedule80GGCData {
    schedule80GGC: {
        details: {
            date: string;
            contribution_cash: number;
            contribution_other_mode: number;
            total_contribution: number;
            eligible_amount: number;
            transaction_ref_no: string;
            ifs_code: string;
        }[];
        total_contribution: {
            contribution_cash: number;
            contribution_other_mode: number;
            total_contribution: number;
            eligible_amount: number;
        };
    };
}
