// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const InwardSupplies: React.FC<props> = ({ setOpen }) => {

//     const supplies = ["From a supplier under composition scheme, Exempt and Nil rated supply", "Non GST supply" ];

//     return (
//         <div>
//             <h3 className="font-semibold text-md">5. Values of exempt, nil-rated and non-GST inward supplies
//             </h3>
//             <div className='border' />
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Inter-State Supplies (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Intra-State Supplies (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {supplies.map((rate, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="p-3 border border-gray-300 ">{rate}</td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {/* </div> */}

//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     )
// }

// export default InwardSupplies;

// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface SupplyItem {
//     interState: string
//     intraState: string
// }

// interface FormData {
//     supplies: Record<string, SupplyItem>
// }

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>
//     formData?: FormData
//     updateFormState: (slug: string, data: FormData) => void
// }

// const InwardSupplies: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     const supplyTypes = [
//         "From a supplier under composition scheme, Exempt and Nil rated supply",
//         "Non GST supply"
//     ]

//     const initialState: FormData = {
//         supplies: supplyTypes.reduce((acc, type) => ({
//             ...acc,
//             [type]: {
//                 interState: '',
//                 intraState: ''
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
//                 supply.interState === '' &&
//                 supply.intraState === ''
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
//             updateFormState('INWARD_SUPPLIES', formState)
//             setOpen(0)
//         }
//     }

//     return (
//         <div>
//             <h3 className="font-semibold text-md">5. Values of exempt, nil-rated and non-GST inward supplies</h3>
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
//                             <th className="p-3 font-medium text-center border border-gray-300">Inter-State Supplies (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Intra-State Supplies (₹)</th>
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
//                                             value={supply.interState}
//                                             onChange={(e) => handleChange(type, 'interState', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
                                    
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={supply.intraState}
//                                             onChange={(e) => handleChange(type, 'intraState', e.target.value)}
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

// export default InwardSupplies

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface SupplyItem {
    interState: string;
    intraState: string;
}

interface FormData {
    supplies: Record<string, SupplyItem>;
}

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: FormData;
    updateFormState: (slug: string, data: FormData) => void;
    period?: any;
    viewMode?: boolean;
}

const InwardSupplies: React.FC<Props> = ({ 
    setOpen, 
    formData, 
    updateFormState,
    viewMode = false
}) => {
    const supplyTypes = [
        "From a supplier under composition scheme, Exempt and Nil rated supply",
        "Non GST supply"
    ];

    const initialState: FormData = {
        supplies: supplyTypes.reduce((acc, type) => ({
            ...acc,
            [type]: {
                interState: '',
                intraState: ''
            }
        }), {}),
        ...formData
    };

    const [formState, setFormState] = useState<FormData>(initialState);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (formData) {
            setFormState(formData);
        }
    }, [formData]);

    const validateForm = (): boolean => {
        if (viewMode) return true;
        
        const isFormEmpty = supplyTypes.every(type => {
            const supply = formState.supplies[type];
            return (
                supply.interState === '' &&
                supply.intraState === ''
            );
        });

        if (isFormEmpty) {
            setHasError(true);
            return false;
        }

        setHasError(false);
        return true;
    };

    const handleChange = (type: string, field: keyof SupplyItem, value: string) => {
        if (viewMode) return;
        
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

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('inwardSupplies', formState);
            setOpen(0);
        }
    };

    return (
        <>
            {/* Header - matches other components */}
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    5. Values of exempt, nil-rated and non-GST inward supplies
                </h2>
            </div>

            {/* Error message - matches styling */}
            {hasError && (
                <div className="p-2 mt-4 text-center text-red-500 bg-red-100 rounded">
                    Please fill in at least one field
                </div>
            )}

            <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Inter-State Supplies (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Intra-State Supplies (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplyTypes.map((type, index) => {
                            const supply = formState.supplies[type];
                            
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3 border border-gray-300">{type}</td>
                                    
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.interState}
                                            onChange={(e) => handleChange(type, 'interState', e.target.value)}
                                            className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                            disabled={viewMode}
                                            readOnly={viewMode}
                                        />
                                    </td>
                                    
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.intraState}
                                            onChange={(e) => handleChange(type, 'intraState', e.target.value)}
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

            {/* Action Buttons - matches styling */}
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

export default InwardSupplies;