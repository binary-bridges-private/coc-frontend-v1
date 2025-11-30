
export interface ITR7SchedulePTIData {
    schedulePTI: {
        investments: {
            section: string;
            name_of_business_trust: string;
            pan_of_business_trust: string;
            heads_of_income: {
                house_property: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                capital_gains: {
                    short_term: {
                        section_111a: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                        others: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                    };
                    long_term: {
                        section_112a: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                        other_than_112a: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                    };
                };
                other_sources: {
                    dividend: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                    others: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                };
                income_claimed_exempt: {
                    u_s_10_23fbb: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                    other_exempt: { current_year_income: number; share_of_loss: number; net_income: number; tds: number };
                };
            };
        }[];
    };
}
