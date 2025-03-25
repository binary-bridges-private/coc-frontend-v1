// import React, { Dispatch, SetStateAction } from 'react';

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>;
// }

// const EligibleItc: React.FC<Props> = ({ setOpen }) => {

//     const supplies = [
//         "(A) ITC Available (whether in full or part)", 
//         "(1) Import of goods", 
//         "(2) Import of services", 
//         "(3) Inward supplies liable to reverse charge (other than 1 & 2 above)",
//         "(4) Inward supplies from ISD", 
//         "(5) All other ITC", 
//         "(B) ITC Reversed", 
//         "(1) As per rules 38,42 & 43 of CGST Rules and section 17(5)", 
//         "(2) Others ", 
//         "(C) Net ITC Available (A) - (B)",
//         "(D) Other Details", 
//         "(1) ITC reclaimed which was reversed under Table 4(B)(2) in earlier tax period", 
//         "(2) Ineligible ITC under section 16(4) & ITC restricted due to PoS rules"
//     ];

//     const check = (i: number) => {
//         if (i === 0 || i === 6 || i === 10) return false;
//         return true;
//     };

//     return (
//         <div>
//             <h3 className="font-semibold text-md">4. Eligible ITC</h3>
//             <div className='border' />
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Details</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {supplies.map((rate, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="p-3 border border-gray-300">{rate}</td>
//                                 {check(index) ? (
//                                     <>
//                                         <td className="p-3 text-center border border-gray-300">
//                                             <input
//                                                 type="number"
//                                                 // value={taxableValues[rate] || 0}
//                                                 // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                                 className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                             />
//                                         </td>
//                                         <td className="p-3 text-center border border-gray-300">
//                                             <input
//                                                 type="number"
//                                                 // value={taxableValues[rate] || 0}
//                                                 // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                                 className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                             />
//                                         </td>
//                                         <td className="p-3 text-center border border-gray-300">
//                                             <input
//                                                 type="number"
//                                                 // value={taxableValues[rate] || 0}
//                                                 // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                                 className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                             />
//                                         </td>
//                                         <td className="p-3 text-center border border-gray-300">
//                                             <input
//                                                 type="number"
//                                                 // value={taxableValues[rate] || 0}
//                                                 // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                                 className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                             />
//                                         </td>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <td className="p-3 text-center border border-gray-300"></td>
//                                         <td className="p-3 text-center border border-gray-300"></td>
//                                         <td className="p-3 text-center border border-gray-300"></td>
//                                         <td className="p-3 text-center border border-gray-300"></td>
//                                     </>
//                                 )}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => setOpen(0)}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => setOpen(0)}>Save</button>
//             </div>
//         </div>
//     );
// };

// export default EligibleItc;

import React, { Dispatch, SetStateAction, useState } from 'react';

interface ItcItem {
    integratedTax: string;
    centralTax: string;
    stateTax: string;
    cess: string;
}

interface FormData {
    supplies: Record<string, ItcItem>;
}

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: FormData;
    updateFormState: (slug: string, data: FormData) => void;
}

const EligibleItc: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    const supplyTypes = [
        "(A) ITC Available (whether in full or part)", 
        "(1) Import of goods", 
        "(2) Import of services", 
        "(3) Inward supplies liable to reverse charge (other than 1 & 2 above)",
        "(4) Inward supplies from ISD", 
        "(5) All other ITC", 
        "(B) ITC Reversed", 
        "(1) As per rules 38,42 & 43 of CGST Rules and section 17(5)", 
        "(2) Others ", 
        "(C) Net ITC Available (A) - (B)",
        "(D) Other Details", 
        "(1) ITC reclaimed which was reversed under Table 4(B)(2) in earlier tax period", 
        "(2) Ineligible ITC under section 16(4) & ITC restricted due to PoS rules"
    ];

    const initialState: FormData = {
        supplies: supplyTypes.reduce((acc, type) => ({
            ...acc,
            [type]: {
                integratedTax: '',
                centralTax: '',
                stateTax: '',
                cess: ''
            }
        }), {}),
        ...formData
    };

    const [formState, setFormState] = useState<FormData>(initialState);
    const [hasError, setHasError] = useState(false);

    const shouldShowInputs = (index: number) => {
        return ![0, 6, 10].includes(index);
    };

    const handleChange = (type: string, field: keyof ItcItem, value: string) => {
        setFormState(prev => ({
            ...prev,
            supplies: {
                ...prev.supplies,
                [type]: {
                    ...prev.supplies[type],
                    [field]: value
                }
            }
        }));

        if (hasError) {
            setHasError(false);
        }
    };

    const validateForm = (): boolean => {
        // Check if at least one field in the entire form is filled
        const isFormEmpty = supplyTypes.every((type, index) => {
            if (!shouldShowInputs(index)) return true;
            const supply = formState.supplies[type];
            return (
                supply.integratedTax === '' &&
                supply.centralTax === '' &&
                supply.stateTax === '' &&
                supply.cess === ''
            );
        });

        if (isFormEmpty) {
            setHasError(true);
            return false;
        }

        setHasError(false);
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('ELIGIBLE_ITC', formState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">4. Eligible ITC</h3>
            <div className='border' />
            
            {hasError && (
                <div className="p-2 mb-4 text-center text-red-500 bg-red-100 rounded">
                    Please fill in at least one field
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Details</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplyTypes.map((type, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-300">{type}</td>
                                
                                {shouldShowInputs(index) ? (
                                    <>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                value={formState.supplies[type].integratedTax}
                                                onChange={(e) => handleChange(type, 'integratedTax', e.target.value)}
                                                className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                value={formState.supplies[type].centralTax}
                                                onChange={(e) => handleChange(type, 'centralTax', e.target.value)}
                                                className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                value={formState.supplies[type].stateTax}
                                                onChange={(e) => handleChange(type, 'stateTax', e.target.value)}
                                                className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                            />
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                value={formState.supplies[type].cess}
                                                onChange={(e) => handleChange(type, 'cess', e.target.value)}
                                                className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                            />
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-3 text-center border border-gray-300"></td>
                                        <td className="p-3 text-center border border-gray-300"></td>
                                        <td className="p-3 text-center border border-gray-300"></td>
                                        <td className="p-3 text-center border border-gray-300"></td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setOpen(0)}>
                    Back
                </button>
                <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default EligibleItc;