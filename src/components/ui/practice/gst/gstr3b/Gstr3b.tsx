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
    const gstOptions = [
        { name: "3.1 Tax on outward and reverse charge inward supplies", slug: "Outward and Reverse Charge Inward" },
        { name: "3.1.1 Supplies notified under section 9(5) of the CGST Act, 2017", slug: "Supplies through E-commerce operators" },
        { name: "3.2 Inter-state supplies", slug: "Inter-state Supplies" },
        { name: "4. Eligible ITC", slug: "Eligible ITC" },
        { name: "5. Exempt, nil and Non GST inward supplies", slug: " Inward Supplies" },
        { name: "5.1 Interest and Late fee for previous tax period", slug: "Interest and Late Fee" },
        { name: "6.1 Payment of tax", slug: "Payment of tax" },
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
                    <h1 className="text-4xl font-bold">GSTR-3b</h1>
                    <p className="mt-2 text-lg">Monthly Return</p>
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
                    <li className="cursor-pointer" onClick={() => { setOpen(0); navigate("/practice/gst/gstr-3b") }}>Gstr-3b</li>
                    <li>{gstOptions[open - 1].slug}</li>
                </ul>
            </div>}


            {open > 0 && <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
                {open === 1 && <OutwardAndReverseChargeInward setOpen={setOpen}/>}
                {open === 2 && <SuppliesThroughEcommerceOperators setOpen={setOpen}/>}
                {open === 3 && <SuppliesTable setOpen={setOpen}/>}                
                {open === 4 && <EligibleItc setOpen={setOpen}/>}                
                {open === 5 && <InwardSupplies setOpen={setOpen}/>}        
                {open === 6 && <InterestAndLateFee setOpen={setOpen}/>}           
                {open === 7 && <PaymentOfTax setOpen={setOpen}/>}           

            </div>}
        </div>
    );
};

export default Gstr3b