import React, { useEffect, useState } from 'react'
import B2b from './B2b.tsx'
import { useNavigate } from 'react-router-dom'
import B2c from './B2c.tsx';
import Exports from './Exports.tsx';
import B2cs from './B2cs.tsx';
import NilRated from './NilRated.tsx';
import Credit from './creditDebitNotes.tsx';
import CreditUnregistered from './creditDebitNotesUnregistered.tsx';
import TaxLiability from './TaxLiability.tsx';
import Adjustment from './AdjustmentInAdvances.tsx';
import Hsn from './Hsn.tsx';
import SuppliesThroughEco from './SuppliesThroughEco.tsx';
import SuppliesB2b from './SuppliesB2b.tsx';
import Document from './Documents.tsx';

const Gstr1 = () => {
    const navigate = useNavigate();

    // State to track form data
    const [formStates, setFormStates] = useState<Record<string, any>>({});

    // State to track which form is open
    const [open, setOpen] = useState(0);

    // Options list
    const gstOptions = [
        { name: "4A, 4B, 6B, 6C - B2B, SEZ, DE Invoices", slug: "B2B" },
        { name: "5 - B2C (Large) Invoices", slug: "B2CL" },
        { name: "6A - Exports Invoices", slug: "EXP" },
        { name: "7 - B2C (Others)", slug: "B2CS" },
        { name: "8A, 8B, 8C, 8D - Nil Rated Supplies", slug: "NIL-RATED" },
        { name: "9B - Credit / Debit Notes (Registered)", slug: "CDNR" },
        { name: "9B - Credit / Debit Notes (Unregistered)", slug: "CDNUR" },
        { name: "11A(1), 11A(2) - Tax Liability (Advances Received)", slug: "TAX-LIABILITY" },
        { name: "11B(1), 11B(2) - Adjustment of Advances", slug: "ADJUSTMENT" },
        { name: "HSN-wise summary of outward supplies", slug: "HSN" },
        { name: "Documents Issued", slug: "DOCUMENTS" },
        { name: "Supplies made through ECO", slug: "ECO" },
        { name: "Supplies U/s 9(5)", slug: "SUPPLIES-B2B" },
    ];

    // Function to update form states
    const updateFormState = (slug: string, data: any) => {
        setFormStates((prev) => ({ ...prev, [slug]: data }));
    };

    return (
        <div className="flex flex-col items-center px-10 pt-5 pb-20">
            {/* Header Section */}
            {open === 0 && (
                <div className="w-full py-10 hero">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">GSTR1</h1>
                        <p className="mt-2 text-lg">Details of outward supplies of goods or services</p>
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
                        <li className="cursor-pointer" onClick={() => setOpen(0)}>Gstr-1</li>
                        <li>{gstOptions[open - 1].slug}</li>
                    </ul>
                </div>
            )}

            {/* Form Rendering */}
            {open > 0 && (
                <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                    {open === 1 && <B2b setOpen={setOpen} formData={formStates["B2B"]} updateFormState={updateFormState} />}
                    {open === 2 && <B2c setOpen={setOpen} formData={formStates["B2CL"]} updateFormState={updateFormState} />}
                    {open === 3 && <Exports setOpen={setOpen} formData={formStates["EXP"]} updateFormState={updateFormState} />}
                    {open === 4 && <B2cs setOpen={setOpen} formData={formStates["B2CS"]} updateFormState={updateFormState} />}
                    {open === 5 && <NilRated setOpen={setOpen} formData={formStates["NIL-RATED"]} updateFormState={updateFormState} />}

                    {open === 6 && <Credit setOpen={setOpen} formData={formStates["CDNR"]} updateFormState={updateFormState} />}
                    {open === 7 && <CreditUnregistered setOpen={setOpen} formData={formStates["CDNUR"]} updateFormState={updateFormState} />}
                    {open === 8 && <TaxLiability setOpen={setOpen} formData={formStates["TAX-LIABILITY"]} updateFormState={updateFormState} />}
                    {open === 9 && <Adjustment setOpen={setOpen} formData={formStates["ADJUSTMENT"]} updateFormState={updateFormState} />}
                    {open === 10 && <Hsn setOpen={setOpen} formData={formStates["HSN"]} updateFormState={updateFormState} />}
                    {open === 11 && <Document setOpen={setOpen} formData={formStates["DOCUMENTS"]} updateFormState={updateFormState} />}
                    {open === 12 && <SuppliesThroughEco setOpen={setOpen} formData={formStates["ECO"]} updateFormState={updateFormState} />}
                    {open === 13 && <SuppliesB2b setOpen={setOpen} formData={formStates["SUPPLIES-B2B"]} updateFormState={updateFormState} />}
                </div>
            )}
        </div>
    );
};

export default Gstr1