
export interface ITR7Schedule80GData {
    schedule80G: {
        donations_100_percent_no_limit: { // A
            details: {
                donee_name_address: string;
                donee_pan: string;
                donation_cash: number;
                donation_other_mode: number;
                total_donation: number;
                eligible_amount: number;
            }[];
            total_eligible_amount: number;
        };
        donations_50_percent_no_limit: { // B
            details: {
                donee_name_address: string;
                donee_pan: string;
                donation_cash: number;
                donation_other_mode: number;
                total_donation: number;
                eligible_amount: number;
            }[];
            total_eligible_amount: number;
        };
        donations_100_percent_limit: { // C
            details: {
                donee_name_address: string;
                donee_pan: string;
                donation_cash: number;
                donation_other_mode: number;
                total_donation: number;
                eligible_amount: number;
            }[];
            total_eligible_amount: number;
        };
        donations_50_percent_limit: { // D
            details: {
                donee_name_address: string;
                donee_pan: string;
                arn: string; // Additional field for Section D
                donation_cash: number;
                donation_other_mode: number;
                total_donation: number;
                eligible_amount: number;
            }[];
            total_eligible_amount: number;
        };
        total_donations_eligible: number; // E
    };
}
