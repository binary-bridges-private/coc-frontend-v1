// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const OutwardAndReverseChargeInward: React.FC<props> = ({ setOpen }) => {

//     const supplies = ["(a) Outward taxable supplies (other than zero rated, nil rated and exempted)", "(b) Outward taxable supplies (zero rated )",
//         "(c) Other outward supplies (Nil rated, exempted)	", "(d) Inward supplies (liable to reverse charge)", "(e) Non-GST outward supplies"
//     ];

//     return (
//         <div>
//             <h3 className="font-semibold text-md">3.1 Details of Outward Supplies and inward supplies liable to reverse charge (other than those covered by Table 3.1.1)</h3>
//             <div className='border' />
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

// export default OutwardAndReverseChargeInward;

import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: FormData
    updateFormState: (slug: string, data: FormData) => void
}

interface SupplyItem {
    taxableValue: string
    integratedTax: string
    centralTax: string
    stateTax: string
    cess: string
}

interface FormData {
    supplies: Record<string, SupplyItem>
}

const OutwardAndReverseChargeInward: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    const supplyTypes = [
        "(a) Outward taxable supplies (other than zero rated, nil rated and exempted)",
        "(b) Outward taxable supplies (zero rated)",
        "(c) Other outward supplies (Nil rated, exempted)",
        "(d) Inward supplies (liable to reverse charge)",
        "(e) Non-GST outward supplies"
    ];

    const initialState: FormData = {
        supplies: supplyTypes.reduce((acc, type) => ({
            ...acc,
            [type]: {
                taxableValue: '',
                integratedTax: '',
                centralTax: '',
                stateTax: '',
                cess: ''
            }
        }), {}),
        ...formData
    }

    const [formState, setFormState] = useState<FormData>(initialState)
    const [hasError, setHasError] = useState(false)

    const validateForm = (): boolean => {
        // Check if at least one field in the entire form is filled
        const isFormEmpty = supplyTypes.every(type => {
            const supply = formState.supplies[type]
            return (
                supply.taxableValue === '' &&
                supply.integratedTax === '' &&
                supply.centralTax === '' &&
                supply.stateTax === '' &&
                supply.cess === ''
            )
        })

        if (isFormEmpty) {
            setHasError(true)
            return false
        }

        setHasError(false)
        return true
    }

    const handleChange = (type: string, field: keyof SupplyItem, value: string) => {
        setFormState(prev => ({
            ...prev,
            supplies: {
                ...prev.supplies,
                [type]: {
                    ...prev.supplies[type],
                    [field]: value
                }
            }
        }))

        // Clear error when user starts typing
        if (hasError) {
            setHasError(false)
        }
    }

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('OUTWARD_REVERSE_CHARGE', formState)
            setOpen(0)
        }
    }

    return (
        <div>
            <h3 className="font-semibold text-md">3.1 Details of Outward Supplies and inward supplies liable to reverse charge</h3>
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
                            <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Total Taxable value (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplyTypes.map((type, index) => {
                            const supply = formState.supplies[type]
                            
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3 border border-gray-300">{type}</td>
                                    
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.taxableValue}
                                            onChange={(e) => handleChange(type, 'taxableValue', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                    
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.integratedTax}
                                            onChange={(e) => handleChange(type, 'integratedTax', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.centralTax}
                                            onChange={(e) => handleChange(type, 'centralTax', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.stateTax}
                                            onChange={(e) => handleChange(type, 'stateTax', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={supply.cess}
                                            onChange={(e) => handleChange(type, 'cess', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                </tr>
                            )
                        })}
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
    )
}

export default OutwardAndReverseChargeInward