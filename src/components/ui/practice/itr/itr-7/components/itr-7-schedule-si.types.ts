
export interface ITR7ScheduleSIData {
    scheduleSI: {
        items: {
            section_code: string;
            special_rate: string;
            income: number;
            tax_thereon: number;
        }[];
        total_income: number;
        total_tax: number;
    };
}
