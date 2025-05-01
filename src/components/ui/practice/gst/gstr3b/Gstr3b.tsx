import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OutwardAndReverseChargeInward from './OutwardAndReverseChargeInward.tsx';
import SuppliesThroughEcommerceOperators from './SuppliesThroughEcommerceOperators.tsx';
import SuppliesTable from './SuppliesTable.tsx';
import EligibleItc from './EligibleItc.tsx';
import InwardSupplies from './InwardSupplies.tsx';
import InterestAndLateFee from './InterestAndLateFee.tsx';
import PaymentOfTax from './PaymentOfTax.tsx';

const Gstr3b = () => {
    const navigate = useNavigate();

    // State to track form data
    const [formStates, setFormStates] = useState<Record<string, any>>({});

    // State to track which form is open
    const [open, setOpen] = useState(0);

    // Options list
    const gstOptions = [
        { name: "3.1 Tax on outward and reverse charge inward supplies", slug: "OUTWARD_REVERSE_CHARGE" },
        { name: "3.1.1 Supplies notified under section 9(5)", slug: "ECOMMERCE_SUPPLIES" },
        { name: "3.2 Inter-state supplies", slug: "INTERSTATE_SUPPLIES" },
        { name: "4. Eligible ITC", slug: "ELIGIBLE_ITC" },
        { name: "5. Exempt, nil and Non GST inward supplies", slug: "INWARD_SUPPLIES" },
        { name: "5.1 Interest and Late fee for previous tax period", slug: "INTEREST_LATE_FEE" },
        { name: "6.1 Payment of tax", slug: "PAYMENT_TAX" },
    ];

    // Function to update form states
    const updateFormState = (slug: string, data: any) => {
        setFormStates((prev) => ({ ...prev, [slug]: data }));
    };

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 50);
    }, [open]);

    return (
        <div className="flex flex-col items-center px-10 pt-5 pb-20">
            {/* Header Section */}
            {open === 0 && (
                <div className="w-full py-10 hero">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">GSTR-3B</h1>
                        <p className="mt-2 text-lg">Monthly Return</p>
                    </div>
                </div>
            )}

            {/* Selection Grid */}
            {open === 0 && (
                <div className="flex flex-wrap justify-center gap-3">
                    {gstOptions.map((option, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px] h-[180px] transition-all duration-300 ease-in-out"
                        >
                            <span className="text-lg font-semibold text-gray-700">{option.name}</span>

                            <div className="flex items-center gap-2 mt-4">
                                <button
                                    onClick={() => setOpen(index + 1)}
                                    className="flex items-center px-4 py-2 text-gray-700 transition-all bg-white border border-gray-400 rounded-lg hover:bg-gray-100"
                                >
                                    Select <span className="ml-2">→</span>
                                </button>

                                {/* Tick Icon (Shown only if form is submitted) */}
                                {formStates[option.slug] && (
                                    <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-lg">
                                        <span className="text-2xl">✔</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Back Button */}
            {open === 0 && (
                <button onClick={() => navigate("/practice/gst")} className="mt-6 btn btn-outline">
                    ⬅ Back to Services
                </button>
            )}

            {/* Breadcrumbs */}
            {open > 0 && (
                <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg breadcrumbs">
                    <ul>
                        <li className="cursor-pointer" onClick={() => navigate("/practice")}>Practice</li>
                        <li className="cursor-pointer" onClick={() => navigate("/practice/gst")}>Gst</li>
                        <li className="cursor-pointer" onClick={() => setOpen(0)}>Gstr-3B</li>
                        <li>{gstOptions[open - 1].name}</li>
                    </ul>
                </div>
            )}

            {/* Form Rendering */}
            {open > 0 && (
                <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                    {open === 1 && <OutwardAndReverseChargeInward setOpen={setOpen} formData={formStates["OUTWARD_REVERSE_CHARGE"]} updateFormState={updateFormState} />}
                    {open === 2 && <SuppliesThroughEcommerceOperators setOpen={setOpen} formData={formStates["ECOMMERCE_SUPPLIES"]} updateFormState={updateFormState} />}
                    {open === 3 && <SuppliesTable setOpen={setOpen} formData={formStates["INTERSTATE_SUPPLIES"]} updateFormState={updateFormState} />}
                    {open === 4 && <EligibleItc setOpen={setOpen} formData={formStates["ELIGIBLE_ITC"]} updateFormState={updateFormState} />}
                    {open === 5 && <InwardSupplies setOpen={setOpen} formData={formStates["INWARD_SUPPLIES"]} updateFormState={updateFormState} />}
                    {open === 6 && <InterestAndLateFee setOpen={setOpen} formData={formStates["INTEREST_LATE_FEE"]} updateFormState={updateFormState} />}                    
                    {open === 7 && <PaymentOfTax setOpen={setOpen} formData={formStates["PAYMENT_TAX"]} updateFormState={updateFormState} />} 
                   
                </div>
            )}
        </div>
    );
};

export default Gstr3b