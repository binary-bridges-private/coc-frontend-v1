// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const InterestAndLateFee: React.FC<props> = ({ setOpen }) => {

//     const supplies = ["Interest", "Late Fees" ];

//     return (
//         <div>
//             <h3 className="font-semibold text-md">5. Values of exempt, nil-rated and non-GST inward supplies
//             </h3>
//             <div className='border' />
//             <div className="grid items-center grid-cols-1 gap-4 mt-10 mb-10">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input
//                         type="checkbox"
//                         className="checkbox"
//                     />
//                     <span>Please select the check box if you wish to declare any Interest liabilities. Please note Interest amounts declared here under respective heads need to be paid in cash in addition to tax liabilities for the month. GSTR 3B can be filed only after complete payment of all liabilities.</span>
//                 </label>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Description</th>
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

// export default InterestAndLateFee;

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: any
    updateFormState: (slug: string, data: any) => void
}

interface TaxValues {
    igst: number
    cgst: number
    sgst: number
    cess: number
}

const InterestAndLateFee: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    const [isDeclaringInterest, setIsDeclaringInterest] = useState(false)
    const [taxValues, setTaxValues] = useState<Record<string, TaxValues>>({
        "Interest": { igst: 0, cgst: 0, sgst: 0, cess: 0 },
        "Late Fees": { igst: 0, cgst: 0, sgst: 0, cess: 0 }
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isTouched, setIsTouched] = useState<Record<string, boolean>>({})

    const supplies = ["Interest", "Late Fees"]

    // Load saved data if available
    useEffect(() => {
        if (formData) {
            setIsDeclaringInterest(formData.isDeclaringInterest || false)
            setTaxValues(formData.taxValues || {
                "Interest": { igst: 0, cgst: 0, sgst: 0, cess: 0 },
                "Late Fees": { igst: 0, cgst: 0, sgst: 0, cess: 0 }
            })
        }
    }, [formData])

    const handleTaxValueChange = (supply: string, field: string, value: string) => {
        const numValue = parseFloat(value) || 0
        setTaxValues(prev => ({
            ...prev,
            [supply]: {
                ...prev[supply],
                [field]: numValue
            }
        }))
        
        // Mark field as touched
        setIsTouched(prev => ({
            ...prev,
            [`${supply}_${field}`]: true
        }))
    }

    const validateField = (supply: string, field: string, value: number) => {
        if (value < 0) {
            return "Value cannot be negative"
        }
        if (value > 10000000) {
            return "Value exceeds maximum limit"
        }
        if (isNaN(value)) {
            return "Please enter a valid number"
        }
        return ""
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        let isValid = true

        // Validate all fields that have been touched
        Object.keys(isTouched).forEach(key => {
            const [supply, field] = key.split('_')
            const value = taxValues[supply][field as keyof TaxValues]
            const error = validateField(supply, field, value)
            
            if (error) {
                newErrors[key] = error
                isValid = false
            }
        })

        // Special validation when declaring interest
        if (isDeclaringInterest) {
            const interest = taxValues["Interest"]
            const hasInterestValue = interest.igst > 0 || interest.cgst > 0 || interest.sgst > 0 || interest.cess > 0
            
            if (!hasInterestValue) {
                newErrors.interestDeclaration = "Please enter interest values if declaring interest"
                isValid = false
            }
        }

        setErrors(newErrors)
        return isValid
    }

    const getFieldError = (supply: string, field: string) => {
        return errors[`${supply}_${field}`] || ""
    }

    const handleSave = () => {
        if (!validateForm()) {
            return
        }

        const formData = {
            isDeclaringInterest,
            taxValues
        }

        updateFormState("INTEREST_LATE_FEE", formData)
        setOpen(0)
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">5.1 Interest and Late fee for previous tax period</h3>
            <div className='my-2 border' />
            
            <div className="grid items-center grid-cols-1 gap-4 my-6">
                <label className="flex items-start space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        className="mt-1 checkbox"
                        checked={isDeclaringInterest}
                        onChange={(e) => setIsDeclaringInterest(e.target.checked)}
                    />
                    <span>
                        Please select the check box if you wish to declare any Interest liabilities. 
                        Please note Interest amounts declared here under respective heads need to be 
                        paid in cash in addition to tax liabilities for the month. GSTR 3B can be 
                        filed only after complete payment of all liabilities.
                    </span>
                </label>
                {errors.interestDeclaration && (
                    <div className="p-2 text-sm text-red-600 bg-red-100 rounded-md">
                        {errors.interestDeclaration}
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Description</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.map((supply, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-300">{supply}</td>
                                {['igst', 'cgst', 'sgst', 'cess'].map((field) => (
                                    <td key={field} className="p-3 text-center border border-gray-300">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={taxValues[supply][field as keyof TaxValues]}
                                                onChange={(e) => handleTaxValueChange(supply, field, e.target.value)}
                                                onBlur={() => setIsTouched(prev => ({
                                                    ...prev,
                                                    [`${supply}_${field}`]: true
                                                }))}
                                                className={`w-[70%] p-1 text-center border rounded-md ${
                                                    getFieldError(supply, field) ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                disabled={supply === "Interest" && !isDeclaringInterest}
                                            />
                                            {getFieldError(supply, field) && (
                                                <span className="mt-1 text-xs text-red-500">
                                                    {getFieldError(supply, field)}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button 
                    className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => setOpen(0)}
                >
                    Back
                </button>
                <button 
                    className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default InterestAndLateFee