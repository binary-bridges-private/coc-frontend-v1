
export interface ITR7ScheduleDCGData {
    plant_machinery: {
        block_15_percent?: number; // 1a
        block_30_percent?: number; // 1b
        block_40_percent?: number; // 1c
        block_45_percent?: number; // 1d
        total?: number; // 1e
    };
    building: {
        block_5_percent?: number; // 2a
        block_10_percent?: number; // 2b
        block_40_percent?: number; // 2c
        total?: number; // 2d
    };
    furniture_fittings?: number; // 3
    intangible_assets?: number; // 4
    ships?: number; // 5
    total?: number; // 6
}
