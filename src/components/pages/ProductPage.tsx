import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface SecondaryVariant {
    ID: string;
    Name: string;
    OriginalPrice: number;
    SellingPrice: number;
  }
  
  interface Variant {
    ID: string;
    ExamDate: string;
    SecondaryVariants: SecondaryVariant[];
  }
  
  interface ProductData {
    ID: string;
    Title: string;
    Description: string;
    Rating: number;
    Price: number;
    DiscountPercentage: number;
    TotalTaxAmount: number;
    Variants: Variant[];
  }
  
  interface ProductPageProps {
    product: ProductData;
  }
  

const ProductPage = () => {
    const { id } = useParams(); // Extract ID from URL
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response:string = "{\"status\":\"success\",\"message\":\"Login successfull!\",\"data\":{\"ID\":\"a6bc2ff5-bde9-46d9-8ed9-e61d30bdb6b8\",\"RefProductId\":\"physics-course-for-jee\",\"Title\":\"Physics Course for JEE\",\"Description\":\"Comprehensive physics course for JEE preparation.\",\"Rating\":4.5,\"RatingsQuantity\":0,\"Category\":\"full-course\",\"Stage\":\"intermediate\",\"DiscountPercentage\":10,\"CgstPercentage\":9,\"SgstPercentage\":9,\"TotalTaxAmount\":270,\"Price\":1500,\"CreatedAt\":\"2025-01-19T15:16:33.762Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.762Z\",\"IsActive\":true,\"Variants\":[{\"ID\":\"1d300652-a87d-486f-a118-b51121ea7ed1\",\"ProductID\":\"a6bc2ff5-bde9-46d9-8ed9-e61d30bdb6b8\",\"ExamDate\":\"May 2026\",\"CreatedAt\":\"2025-01-19T15:16:33.765Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.765Z\",\"SecondaryVariants\":[{\"ID\":\"04a8b011-57e6-418c-b68d-770f25df17db\",\"PrimaryVariantID\":\"1d300652-a87d-486f-a118-b51121ea7ed1\",\"Name\":\"Notes and Video Lectures\",\"OriginalPrice\":2200,\"SellingPrice\":2000,\"CreatedAt\":\"2025-01-19T15:16:33.766Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.766Z\"},{\"ID\":\"4fd2f118-2b1c-4fb0-8a68-cba560fcb528\",\"PrimaryVariantID\":\"1d300652-a87d-486f-a118-b51121ea7ed1\",\"Name\":\"Notes Only\",\"OriginalPrice\":1200,\"SellingPrice\":1100,\"CreatedAt\":\"2025-01-19T15:16:33.766Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.766Z\"}]},{\"ID\":\"3b572cb2-f397-4c11-b6d7-db3ccc4cd9cc\",\"ProductID\":\"a6bc2ff5-bde9-46d9-8ed9-e61d30bdb6b8\",\"ExamDate\":\"Jan 2025\",\"CreatedAt\":\"2025-01-19T15:16:33.765Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.765Z\",\"SecondaryVariants\":[{\"ID\":\"9a8aeddf-fd9a-4877-bf36-b8b5d5e92184\",\"PrimaryVariantID\":\"3b572cb2-f397-4c11-b6d7-db3ccc4cd9cc\",\"Name\":\"Notes Only\",\"OriginalPrice\":1000,\"SellingPrice\":900,\"CreatedAt\":\"2025-01-19T15:16:33.766Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.766Z\"},{\"ID\":\"b9b9bae5-aea4-4cf3-838e-7bb093891e15\",\"PrimaryVariantID\":\"3b572cb2-f397-4c11-b6d7-db3ccc4cd9cc\",\"Name\":\"Notes and Video Lectures\",\"OriginalPrice\":2000,\"SellingPrice\":1800,\"CreatedAt\":\"2025-01-19T15:16:33.766Z\",\"UpdatedAt\":\"2025-01-19T15:16:33.766Z\"}]}]}}"
                // await fetch(
                //     `https://api.example.com/product/${id}` // Replace with your API URL
                // );
                const data = await JSON.parse(response);
                console.log(data)
                setProduct(data.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="mt-8 text-center">Loading...</div>;
    }

    if (!product) {
        return <div className="mt-8 text-center">Product not found</div>;
    }

    return (
        <div className="max-w-4xl p-6 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">{product.Title}</h1>
            <p className="text-gray-700">{product.Description}</p>
            <p className="mt-4">
                <span className="text-xl font-semibold">₹{product.Price}</span>{" "}
                <span className="text-sm text-gray-500 line-through">
                    ₹{product.Price + product.TotalTaxAmount}
                </span>{" "}
                <span className="text-green-600">
                    ({product.DiscountPercentage}% Off)
                </span>
            </p>
            <p className="mt-2 text-gray-600">Rating: {product.Rating} ⭐</p>

            <div className="mt-6">
                <h2 className="mb-2 text-2xl font-bold">Variants</h2>
                {product.Variants.map((variant) => (
                    <div key={variant.ID} className="p-4 mb-4 border rounded-lg">
                        <h3 className="text-lg font-semibold">
                            Exam Date: {variant.ExamDate}
                        </h3>
                        {variant.SecondaryVariants.map((secondaryVariant) => (
                            <div
                                key={secondaryVariant.ID}
                                className="flex items-center justify-between mt-2"
                            >
                                <span>{secondaryVariant.Name}</span>
                                <span className="font-semibold">
                                    ₹{secondaryVariant.SellingPrice}
                                </span>
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                    onClick={() =>
                                        alert(
                                            `Added "${secondaryVariant.Name}" to cart!`
                                        )
                                    }
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
