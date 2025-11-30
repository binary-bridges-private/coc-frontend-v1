export interface ITR7ScheduleFSIData {
  scheduleFSI: {
    // Details of Income from outside India and tax relief
    income_details: {
      country_code: string;
      taxpayer_identification_number: string;

      // Head of income
      house_property: {
        income_outside_india: number; // (b)
        tax_paid_outside_india: number; // (c)
        tax_payable_normal_provisions: number; // (d)
        tax_relief_available: number; // (e)
        relevant_article_dtaa: string; // (f)
      };
      business_profession: {
        income_outside_india: number;
        tax_paid_outside_india: number;
        tax_payable_normal_provisions: number;
        tax_relief_available: number;
        relevant_article_dtaa: string;
      };
      capital_gains: {
        income_outside_india: number;
        tax_paid_outside_india: number;
        tax_payable_normal_provisions: number;
        tax_relief_available: number;
        relevant_article_dtaa: string;
      };
      other_sources: {
        income_outside_india: number;
        tax_paid_outside_india: number;
        tax_payable_normal_provisions: number;
        tax_relief_available: number;
        relevant_article_dtaa: string;
      };
      total: {
        income_outside_india: number;
        tax_paid_outside_india: number;
        tax_payable_normal_provisions: number;
        tax_relief_available: number;
        relevant_article_dtaa: string;
      };
    }[];
  };
}
