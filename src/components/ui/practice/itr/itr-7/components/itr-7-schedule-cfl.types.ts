
export interface ITR7ScheduleCFLData {
    scheduleCFL: {
        details: {
            assessment_year: string;
            date_of_filing: string;
            house_property_loss: number;
            business_loss: {
                brought_forward: number; // 5a
                adjusted_115baa: number; // 5b
                available_for_set_off: number; // 5c
            };
            speculative_business_loss: number;
            specified_business_loss: number;
            life_insurance_business_loss: number;
            stcl: number;
            ltcl: number;
            race_horses_loss: number;
        }[]; // Rows i to xv
        total_earlier_year_losses: { // xvi
            house_property_loss: number;
            business_loss: {
                brought_forward: number;
                adjusted_115baa: number;
                available_for_set_off: number;
            };
            speculative_business_loss: number;
            specified_business_loss: number;
            life_insurance_business_loss: number;
            stcl: number;
            ltcl: number;
            race_horses_loss: number;
        };
        adjustment_of_above_losses: { // xvii
            house_property_loss: number;
            business_loss_available: number; // 2ii of Schedule BFLA
            speculative_business_loss: number; // 2iv of Schedule BFLA
            specified_business_loss: number; // 2v of Schedule BFLA
            life_insurance_business_loss: number; // 2iii of Schedule BFLA
            stcl: number;
            ltcl: number;
            race_horses_loss: number; // 2xiv of Schedule BFLA
        };
        current_year_losses: { // xviii
            house_property_loss: number; // 2xviii of Schedule CYLA
            business_loss_available: number; // 3xviii of Schedule CYLA
            speculative_business_loss: number; // B43 of Schedule BP, if -ve
            specified_business_loss: number; // C49 of Schedule BP, if -ve
            life_insurance_business_loss: number; // 4b of Schedule BP, if -ve
            stcl: number; // 2xii + 3xii + 4xii + 5xii + 6xii of item E of Schedule CG
            ltcl: number; // 7xii + 8xii + 9xii + 10xii of item E of Schedule CG
            race_horses_loss: number; // 8e of Schedule OS, if -ve
        };
        current_year_loss_distributed: { // xix
            house_property_loss: number;
            business_loss_available: number;
            speculative_business_loss: number;
            specified_business_loss: number;
            life_insurance_business_loss: number;
            stcl: number;
            ltcl: number;
            race_horses_loss: number;
        };
        current_year_losses_carried_forward: { // xx
            house_property_loss: number;
            business_loss_available: number;
            speculative_business_loss: number;
            specified_business_loss: number;
            life_insurance_business_loss: number;
            stcl: number;
            ltcl: number;
            race_horses_loss: number;
        };
        total_loss_carried_forward: { // xxi
            house_property_loss: number;
            business_loss_available: number;
            speculative_business_loss: number;
            specified_business_loss: number;
            life_insurance_business_loss: number;
            stcl: number;
            ltcl: number;
            race_horses_loss: number;
        };
    };
}
