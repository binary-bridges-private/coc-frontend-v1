
export interface ITR7ScheduleTPSAData {
    scheduleTPSA: {
        // Section 1: Primary adjustments
        primary_adjustments_option_exercised: 'Yes' | 'No';
        additional_income_tax_payable_18_percent: number; // 1a
        surcharge_12_percent: number; // 1b
        health_education_cess: number; // 1c
        total_additional_tax_payable: number; // 1d (a+b+c)

        // Section 2-4
        taxes_paid: number; // 2
        net_tax_payable: number; // 3 (2d-3)

        // Section 5: Date(s) of deposit of tax on secondary adjustments
        deposit_dates: { date: string }[];

        // Section 6-9: Bank details
        name_of_bank_and_branch: string;
        bsr_code: string;
        serial_number_of_challan: string;
        amount_deposited: number;
    };
}
