export interface ITR7ScheduleTRData {
  scheduleTR: {
    // 1. Details of Tax relief claimed
    tax_relief_claims: {
      country_code: string; // (a)
      taxpayer_identification_number: string; // (b)
      total_taxes_paid_outside_india: number; // (c)
      total_tax_relief_available: number; // (d)
      section_relief_claimed: string; // (e) 90, 90A or 91
    }[];

    total_tax_relief_claims: {
      total_taxes_paid_outside_india: number;
      total_tax_relief_available: number;
    };

    // 2. Total Tax relief available in respect of country where DTAA is applicable (section 90/90A)
    total_relief_dtaa_applicable: number;

    // 3. Total Tax relief available in respect of country where DTAA is not applicable (section 91)
    total_relief_dtaa_not_applicable: number;

    // 4. Whether any tax paid outside India, on which tax relief was allowed in India, has been refunded/credited
    tax_paid_outside_india_refunded: "Yes" | "No";
    amount_tax_refunded: number; // 4a
    assessment_year_relief_allowed: string; // 4b
  };
}
