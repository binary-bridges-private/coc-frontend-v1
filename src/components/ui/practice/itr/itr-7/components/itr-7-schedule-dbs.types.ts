
export interface ITR7ScheduleDBSData {
    scheduleDBS: {
        buy_backs: {
            // Details of 1st, 2nd, 3rd buy back
            date_of_payments: string;
            date_of_distribution: string;
            amount_consideration_paid: number;
            amount_received_by_company: number;
            distributed_income: number;
            tax_payable_on_distributed_income: number;
            additional_income_tax: number;
            surcharge_12_percent: number;
            health_education_cess: number;
            total_additional_tax_payable: number;
            taxes_paid: number;
            net_tax_payable: number;
            interest_payable_115qb: number;
            additional_interest_payable: number;
            income_tax_and_interest_payable: number;
            tax_and_interest_paid: number;
            net_payable_refundable: number;

            // Date(s) of deposit of tax on distribution of income
            deposit_dates: { date: string }[];

            // Bank details
            name_of_bank_and_branch: string;
            bsr_code: string;
            serial_number_of_challan: string;
            amount_deposited: number;
        }[];
    };
}
