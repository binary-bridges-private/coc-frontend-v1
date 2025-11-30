
export interface ITR7ScheduleHPData {
    properties: {
        type_of_property: 'let_out' | 'deemed_let_out';
        tenant_name: string;
        tenant_pan_aadhaar: string;
        tenant_pan_tan_aadhaar_tds?: string;
        gross_rent_received?: number;
        rent_cannot_be_realized?: number;
        tax_paid_local_authorities?: number;
        total_1b_1c?: number;
        annual_value?: number;
        annual_value_property_owned?: number;
        standard_deduction_30_percent?: number;
        interest_payable_borrowed_capital?: number;
        total_1g_1h?: number;
        arrears_unrealised_rent_received?: number;
        income_from_house_property?: number;
    }[];
    pass_through_income_loss?: number;
    total_income_house_property?: number;
}
