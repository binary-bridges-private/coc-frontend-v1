
export interface ITR7PartAQDData {
    trading_concern: {
        opening_stock?: number;
        purchase_previous_year?: number;
        sales_previous_year?: number;
        closing_stock?: number;
        shortage_excess?: number;
    };
    manufacturing_concern: {
        raw_materials: {
            opening_stock?: number;
            purchases_previous_year?: number;
            consumption_previous_year?: number;
            sales_previous_year?: number;
            closing_stock?: number;
            yield_finished_products?: number;
            percentage_yield?: number;
            shortage_excess?: number;
        };
        finished_products: {
            opening_stock?: number;
            purchase_previous_year?: number;
            quantity_manufactured?: number;
            sales_previous_year?: number;
            closing_stock?: number;
            shortage_excess?: number;
        };
    };
}
