// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>
//     formData?: FormData
//     updateFormState: (slug: string, data: FormData) => void
// }

// interface SupplyItem {
//     taxableValue: string
//     integratedTax: string
//     centralTax: string
//     stateTax: string
//     cess: string
// }

// interface FormData {
//     supplies: Record<string, SupplyItem>
// }

// const OutwardAndReverseChargeInward: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     const supplyTypes = [
//         "(a) Outward taxable supplies (other than zero rated, nil rated and exempted)",
//         "(b) Outward taxable supplies (zero rated)",
//         "(c) Other outward supplies (Nil rated, exempted)",
//         "(d) Inward supplies (liable to reverse charge)",
//         "(e) Non-GST outward supplies"
//     ];

//     const initialState: FormData = {
//         supplies: supplyTypes.reduce((acc, type) => ({
//             ...acc,
//             [type]: {
//                 taxableValue: '',
//                 integratedTax: '',
//                 centralTax: '',
//                 stateTax: '',
//                 cess: ''
//             }
//         }), {}),
//         ...formData
//     }

//     const [formState, setFormState] = useState<FormData>(initialState)
//     const [hasError, setHasError] = useState(false)

//     const validateForm = (): boolean => {
//         // Check if at least one field in the entire form is filled
//         const isFormEmpty = supplyTypes.every(type => {
//             const supply = formState.supplies[type]
//             return (
//                 supply.taxableValue === '' &&
//                 supply.integratedTax === '' &&
//                 supply.centralTax === '' &&
//                 supply.stateTax === '' &&
//                 supply.cess === ''
//             )
//         })

//         if (isFormEmpty) {
//             setHasError(true)
//             return false
//         }

//         setHasError(false)
//         return true
//     }

//     const handleChange = (type: string, field: keyof SupplyItem, value: string) => {
//         setFormState(prev => ({
//             ...prev,
//             supplies: {
//                 ...prev.supplies,
//                 [type]: {
//                     ...prev.supplies[type],
//                     [field]: value
//                 }
//             }
//         }))

//         // Clear error when user starts typing
//         if (hasError) {
//             setHasError(false)
//         }
//     }

//     const handleSubmit = () => {
//         if (validateForm()) {
//             updateFormState('OUTWARD_REVERSE_CHARGE', formState)
//             setOpen(0)
//         }
//     }

//     return (
//         <div>
//             <h3 className="font-semibold text-md">3.1 Details of Outward Supplies and inward supplies liable to reverse charge</h3>
//             <div className='border' />
            
//             {hasError && (
//                 <div className="p-2 mb-4 text-center text-red-500 bg-red-100 rounded">
//                     Please fill in at least one field
//                 </div>
//             )}

//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Total Taxable value (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {supplyTypes.map((type, index) => {
//                             const supply = formState.supplies[type]
                            
//                             return (
//                                 <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                     <td className="p-3 border border-gray-300">{type}</td>
                                    
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={supply.taxableValue}
//                                             onChange={(e) => handleChange(type, 'taxableValue', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
                                    
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={supply.integratedTax}
//                                             onChange={(e) => handleChange(type, 'integratedTax', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={supply.centralTax}
//                                             onChange={(e) => handleChange(type, 'centralTax', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={supply.stateTax}
//                                             onChange={(e) => handleChange(type, 'stateTax', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={supply.cess}
//                                             onChange={(e) => handleChange(type, 'cess', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => setOpen(0)}>
//                     Back
//                 </button>
//                 <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>
//                     Save
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default OutwardAndReverseChargeInward

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: any;
    updateFormState: (slug: string, data: any) => void;
    period?: any;
    viewMode?: boolean;
}

interface TaxDetails {
    taxableValue?: string;
    integratedTax?: string;
    centralTax?: string;
    stateTax?: string;
    cess?: string;
}

interface OutwardReverseCharge {
    ots?: TaxDetails;
    otsZeroRated?: TaxDetails;
    oss?: TaxDetails;
    is?: TaxDetails;
    os?: TaxDetails;
}

const OutwardAndReverseChargeInward: React.FC<Props> = ({ 
    setOpen, 
    formData, 
    updateFormState,
    viewMode = false
}) => {
    const supplyTypes = [
        { 
            key: 'ots', 
            label: "(a) Outward taxable supplies (other than zero rated, nil rated and exempted)" 
        },
        { 
            key: 'otsZeroRated', 
            label: "(b) Outward taxable supplies (zero rated)" 
        },
        { 
            key: 'oss', 
            label: "(c) Other outward supplies (Nil rated, exempted)" 
        },
        { 
            key: 'is', 
            label: "(d) Inward supplies (liable to reverse charge)" 
        },
        { 
            key: 'os', 
            label: "(e) Non-GST outward supplies" 
        }
    ];

    const initialState: OutwardReverseCharge = formData || {
        ots: {},
        otsZeroRated: {},
        oss: {},
        is: {},
        os: {}
    };

    const [formState, setFormState] = useState<OutwardReverseCharge>(initialState);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (formData) {
            setFormState(formData);
        }
    }, [formData]);

    const validateForm = (): boolean => {
        const isFormEmpty = supplyTypes.every(({ key }) => {
            const supply = formState[key as keyof OutwardReverseCharge];
            return !supply || (
                (!supply.taxableValue || supply.taxableValue === '') &&
                (!supply.integratedTax || supply.integratedTax === '') &&
                (!supply.centralTax || supply.centralTax === '') &&
                (!supply.stateTax || supply.stateTax === '') &&
                (!supply.cess || supply.cess === '')
            );
        });

        if (isFormEmpty) {
            setHasError(true);
            return false;
        }

        setHasError(false);
        return true;
    };

    const handleChange = (type: keyof OutwardReverseCharge, field: keyof TaxDetails, value: string) => {
        setFormState(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value
            }
        }));

        if (hasError) {
            setHasError(false);
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('outwardAndReverseChargeInward', formState);
            setOpen(0);
        }
    };

    return (
        <>
            {/* Header - matches B2b component styling */}
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    3.1 Details of Outward Supplies and inward supplies liable to reverse charge
                </h2>
            </div>

            {/* Error message - matches B2b styling */}
            {hasError && (
                <div className="p-2 mt-4 text-center text-red-500 bg-red-100 rounded">
                    Please fill in at least one field
                </div>
            )}

            {/* Table - matches B2b component styling */}
            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Total Taxable value (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplyTypes.map(({ key, label }, index) => {
                            const supply = formState[key as keyof OutwardReverseCharge] || {};
                            
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3 border border-gray-300">{label}</td>
                                    
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.taxableValue || ''}
                                            onChange={(e) => handleChange(key as keyof OutwardReverseCharge, 'taxableValue', e.target.value)}
                                            className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            disabled={viewMode}
                                            readOnly={viewMode}
                                        />
                                    </td>
                                    
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.integratedTax || ''}
                                            onChange={(e) => handleChange(key as keyof OutwardReverseCharge, 'integratedTax', e.target.value)}
                                            className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            disabled={viewMode}
                                            readOnly={viewMode}
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.centralTax || ''}
                                            onChange={(e) => handleChange(key as keyof OutwardReverseCharge, 'centralTax', e.target.value)}
                                            className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            disabled={viewMode}
                                            readOnly={viewMode}
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.stateTax || ''}
                                            onChange={(e) => handleChange(key as keyof OutwardReverseCharge, 'stateTax', e.target.value)}
                                            className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            disabled={viewMode}
                                            readOnly={viewMode}
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.cess || ''}
                                            onChange={(e) => handleChange(key as keyof OutwardReverseCharge, 'cess', e.target.value)}
                                            className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            disabled={viewMode}
                                            readOnly={viewMode}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons - matches B2b component styling */}
            <div className="flex justify-end gap-4 mt-6">
                <button
                    type="button"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setOpen(0);
                    }}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${viewMode ? 'bg-gray-500 hover:bg-gray-600' : ''
                        }`}
                    disabled={viewMode}
                >
                    {viewMode ? 'Close' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default OutwardAndReverseChargeInward;