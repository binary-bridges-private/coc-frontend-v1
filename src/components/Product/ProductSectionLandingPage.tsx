import React from "react";
import ProductCard from "./ProductCard.tsx";

const ProductSectionLandingPage = () => {
    return (
        <div className="w-full h-auto md:h-[664px] grid md:grid-cols-3 grid-cols-1">
            <ProductCard />
        </div>
    );
};

export default ProductSectionLandingPage;
