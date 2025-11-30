export interface ITR7PartBTIData {
  partBTI: {
    income_house_property?: number; // 1
    profits_gains_business_profession?: {
      business_other_than_speculative?: number; // 2i
      foreign_company_selling_diamonds?: number; // 2ia
      speculative_business?: number; // 2ii
      specified_business?: number; // 2iii
      income_chargeable_special_rates?: number; // 2iv
      total_business_income?: number; // 2v
    };
    capital_gains?: {
      short_term?: {
        chargeable_15_percent?: number; // 3aia
        chargeable_20_percent?: number; // 3aib
        chargeable_30_percent?: number; // 3aii
        chargeable_applicable_rate?: number; // 3aiii
        chargeable_special_rates_dtaa?: number; // 3aiv
        total_short_term?: number; // 3av
      };
      long_term?: {
        chargeable_10_percent?: number; // 3bia
        chargeable_12_5_percent?: number; // 3bib
        chargeable_20_percent?: number; // 3bii
        chargeable_special_rates_dtaa?: number; // 3biii
        total_long_term?: number; // 3biv
      };
      sum_short_term_long_term?: number; // 3c
      capital_gain_chargeable_30_percent_115bbh?: number; // 3d
      total_capital_gains?: number; // 3e
    };
    income_other_sources?: {
      net_income_normal_rates?: number; // 4a
      chargeable_special_rate?: number; // 4b
      owning_maintaining_race_horses?: number; // 4c
      total_other_sources?: number; // 4d
    };
    total_head_wise_income?: number; // 5
    losses_current_year_set_off?: number; // 6
    balance_after_set_off_current_year_losses?: number; // 7
    brought_forward_losses_set_off?: number; // 8
    gross_total_income?: number; // 9
    income_chargeable_special_rate_included_in_9?: number; // 10
    deductions_chapter_vi_a?: {
      part_b?: number; // 11a
      part_c?: number; // 11b
      total_deductions?: number; // 11c
    };
    deduction_10aa?: number; // 12
    total_income?: number; // 13
    income_chargeable_special_rates?: number; // 14
    income_chargeable_normal_rates?: number; // 15
    net_agricultural_income?: number; // 16
    losses_current_year_carried_forward?: number; // 17
    deemed_total_income_115jb?: number; // 18
  };
}
