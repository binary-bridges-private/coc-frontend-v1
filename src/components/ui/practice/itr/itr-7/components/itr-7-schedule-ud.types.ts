
export interface ITR7ScheduleUDData {
    scheduleUD: {
        details: {
            assessment_year: string;
            depreciation: {
                brought_forward: number; // 3
                adjusted_115baa: number; // 3a
                set_off: number; // 4
                balance_cf: number; // 5
            };
            allowance_35_4: {
                brought_forward: number; // 6
                set_off: number; // 7
                balance_cf: number; // 8
            };
        }[];
        total: {
            depreciation: {
                set_off: number;
            };
            allowance_35_4: {
                set_off: number;
            };
        };
    };
}
