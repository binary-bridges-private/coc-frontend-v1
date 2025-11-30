
export interface ITR7ScheduleEIData {
    scheduleEI: {
        interest_income: number; // 1
        agriculture: {
            gross_receipts: number; // 2i
            expenditure: number; // 2ii
            unabsorbed_loss: number; // 2iii
            rule_7_income: number; // 2iv
            net_income: number; // 2v
            details_if_exceeds_5_lakh: {
                district_name: string;
                pincode: string;
                measurement_acre: number;
                ownership_status: 'Owned' | 'Held on lease';
                irrigation_status: 'Irrigated' | 'Rain-fed';
            };
        };
        other_exempt_income: {
            income_u_s_10_15b_etc: number; // 3a
            details_10_23ff: {
                ack_number: string;
                date_filed: string;
            };
            any_other_income: {
                nature: string;
                amount: number;
            }[];
            total_other_exempt_income: number; // 3a+3b
        };
        income_not_chargeable_dta: {
            items: {
                amount: number;
                nature: string;
                country_name_code: string;
                article_dtaa: string;
                head_of_income: string;
                trc_obtained: 'Yes' | 'No';
            }[];
            total: number; // 4
        };
        pass_through_income_pti: number; // 5 (from Schedule PTI)
        total_exempt_income: number; // 6
    };
}
