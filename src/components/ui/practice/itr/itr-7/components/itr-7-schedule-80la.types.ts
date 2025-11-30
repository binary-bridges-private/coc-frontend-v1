
export interface ITR7Schedule80LAData {
    schedule80LA: {
        details: {
            type_of_entity: string;
            type_of_income: string;
            authority_granting_registration: string;
            date_of_registration: string;
            registration_number: string;
            first_ay_claimed: string;
            amount_deduction: number;
        }[];
        total_deduction: number;
    };
}
