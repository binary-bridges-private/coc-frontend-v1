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
    const gstOptions = [
        { name: "4A, 4B, 6B, 6C - B2B, SEZ, DE Invoices", slug: "B2B" },
        { name: "5 - B2C (Large) Invoices", slug: "B2CL" },
        { name: "6A - Exports Invoices", slug: "EXP" },
        { name: "7 - B2C (Others)", slug: "B2CS" },
        { name: "8A, 8B, 8C, 8D - Nil Rated Supplies", slug: "NIL-RATED" },
        { name: "9B - Credit / Debit Notes (Registered)", slug: "CDNR" },
        { name: "9B - Credit / Debit Notes (Unregistered)", slug: "CDNUR" },
        { name: "11A(1), 11A(2) - Tax Liability (Advances Received)", slug: "Tax Liability (Advances Received)" },
        { name: "11B(1), 11B(2) - Adjustment of Advances", slug: "Adjustment of Advances" },
        { name: "HSN-wise summary of outward supplies", slug: "HSN" },
        { name: "Documents Issued", slug: "Documents Issued" },
        { name: "Supplies made through ECO", slug: "Supplies through ECO" },
        { name: "Supplies U/s 9(5)", slug: "Supplies U/s 9(5)" },
    ];

    const [open, setOpen] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "instant" });
        }, 50); // Small delay to let the DOM update
    }, [open]);
    
    

    return (
        <div className="flex flex-col items-center px-10 pt-5 pb-20">
            {open === 0 && <div className="w-full py-10 hero">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">GSTR1</h1>
                    <p className="mt-2 text-lg">Details of outward supplies of goods or services</p>
                </div>
            </div>}

            {open === 0 && <div className="flex flex-wrap justify-center gap-3">
                {gstOptions.map((option, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px]"
                    >
                        <span className="text-lg font-semibold text-gray-700">{option.name}</span>
                        <button onClick={() => setOpen(index + 1)} className="flex items-center m-5 text-gray-700 bg-white border border-gray-400 btn hover:bg-gray-100">
                            Select <span className="ml-2">→</span>
                        </button>
                    </div>
                ))}
            </div>}

            {open === 0 &&
                <button onClick={() => navigate("/practice/gst")} className="mt-6 btn btn-outline">
                    ⬅ Back to Services
                </button>
            }


            {open > 0 && <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg  breadcrumbs">
                <ul>
                    <li className="cursor-pointer" onClick={() => { navigate("/practice") }}>Practice</li>
                    <li className="cursor-pointer" onClick={() => { navigate("/practice/gst") }}>Gst</li>
                    <li className="cursor-pointer" onClick={() => { setOpen(0); navigate("/practice/gst/gstr-1") }}>Gstr-1</li>
                    <li>{gstOptions[open - 1].slug}</li>
                </ul>
            </div>}


            {open > 0 && <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
                {open === 1 && <B2b setOpen={setOpen}/>}
                {open === 2 && <B2c setOpen={setOpen} />}
                {open === 3 && <Exports setOpen={setOpen} />}
                {open === 4 && <B2cs setOpen={setOpen} />}
                {open === 5 && <NilRated setOpen={setOpen} />}
                {open === 6 && <Credit setOpen={setOpen} />}
                {open === 7 && <CreditUnregistered setOpen={setOpen} />}
                {open === 8 && <TaxLiability setOpen={setOpen} />}
                {open === 9 && <Adjustment setOpen={setOpen} />}
                {open === 10 && <Hsn setOpen={setOpen} />}
                {open === 11 && < Document setOpen={setOpen} />}
                {open === 12 && <SuppliesThroughEco setOpen={setOpen} />}
                {open === 13 && <SuppliesB2b setOpen={setOpen} />}
            </div>}
        </div>
    );
};

export default Gstr1