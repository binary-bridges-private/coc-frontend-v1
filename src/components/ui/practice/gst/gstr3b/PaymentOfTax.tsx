// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const PaymentOfTax: React.FC<props> = ({ setOpen }) => {

//     const supplies = ["Tax","Interest", "Late Fees"];

//     return (
//         <div>
//             <h3 className="font-semibold text-md">6.1 Payment of tax
//             </h3>
//             <div className='border' />
//             <div className="mt-10 overflow-scroll w-[100%] ">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Description</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Integrated Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Central Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> State/UT Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> CESS (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Total (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Integrated Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Central Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> State/UT Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> CESS (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Total (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {supplies.map((rate, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="p-3 border border-gray-300 ">{rate}</td>
//                                 <td className="p-3 text-center border border-gray-300 ">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         // value={taxableValues[rate] || 0}
//                                         // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
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

// export default PaymentOfTax;

// import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>
//     formData?: any
//     updateFormState: (slug: string, data: any) => void
// }

// interface PaymentDetails {
//     cashLedger: {
//         igst: number
//         cgst: number
//         sgst: number
//         cess: number
//         total: number
//     }
//     creditLedger: {
//         igst: number
//         cgst: number
//         sgst: number
//         cess: number
//         total: number
//     }
// }

// const PaymentOfTax: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     const supplies = ["Tax", "Interest", "Late Fees"]
//     const [paymentData, setPaymentData] = useState<Record<string, PaymentDetails>>({
//         "Tax": {
//             cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
//             creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
//         },
//         "Interest": {
//             cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
//             creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
//         },
//         "Late Fees": {
//             cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
//             creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
//         }
//     })
//     const [errors, setErrors] = useState<Record<string, string>>({})
//     const [isTouched, setIsTouched] = useState<Record<string, boolean>>({})

//     // Load saved data if available
//     useEffect(() => {
//         if (formData) {
//             setPaymentData(formData.paymentData || {
//                 "Tax": {
//                     cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
//                     creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
//                 },
//                 "Interest": {
//                     cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
//                     creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
//                 },
//                 "Late Fees": {
//                     cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
//                     creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
//                 }
//             })
//         }
//     }, [formData])

//     const handleValueChange = (supply: string, ledgerType: 'cashLedger' | 'creditLedger', field: string, value: string) => {
//         const numValue = parseFloat(value) || 0
        
//         setPaymentData(prev => {
//             const updatedData = { ...prev }
//             updatedData[supply][ledgerType] = {
//                 ...updatedData[supply][ledgerType],
//                 [field]: numValue
//             }
            
//             // Auto-calculate total if any of the components change
//             if (field !== 'total' && ['igst', 'cgst', 'sgst', 'cess'].includes(field)) {
//                 const { igst, cgst, sgst, cess } = updatedData[supply][ledgerType]
//                 updatedData[supply][ledgerType].total = igst + cgst + sgst + cess
//             }
            
//             return updatedData
//         })

//         // Mark field as touched
//         setIsTouched(prev => ({
//             ...prev,
//             [`${supply}_${ledgerType}_${field}`]: true
//         }))
//     }

//     const validateField = (value: number) => {
//         if (value < 0) return "Value cannot be negative"
//         if (value > 100000000) return "Value exceeds maximum limit"
//         if (isNaN(value)) return "Please enter a valid number"
//         return ""
//     }

//     const validateForm = () => {
//         const newErrors: Record<string, string> = {}
//         let isValid = true

//         // Validate all fields that have been touched
//         Object.keys(isTouched).forEach(key => {
//             const [supply, ledgerType, field] = key.split('_') as [string, 'cashLedger' | 'creditLedger', string]
//             const value = paymentData[supply][ledgerType][field as keyof PaymentDetails['cashLedger']]
//             const error = validateField(value)
            
//             if (error) {
//                 newErrors[key] = error
//                 isValid = false
//             }
//         })

//         // Validate totals match sum of components
//         supplies.forEach(supply => {
//             ['cashLedger', 'creditLedger'].forEach(ledgerType => {
//                 const ledger = paymentData[supply][ledgerType as 'cashLedger' | 'creditLedger']
//                 const calculatedTotal = ledger.igst + ledger.cgst + ledger.sgst + ledger.cess
                
//                 if (Math.abs(ledger.total - calculatedTotal) > 0.01) {
//                     newErrors[`${supply}_${ledgerType}_total`] = "Total must equal sum of components"
//                     isValid = false
//                 }
//             })
//         })

//         setErrors(newErrors)
//         return isValid
//     }

//     const getFieldError = (supply: string, ledgerType: string, field: string) => {
//         return errors[`${supply}_${ledgerType}_${field}`] || ""
//     }

//     const handleSave = () => {
//         if (!validateForm()) {
//             return
//         }

//         updateFormState("PAYMENT_TAX", { paymentData })
//         setOpen(0)
//     }

//     return (
//         <div className="p-4">
//             <h3 className="text-lg font-semibold">6.1 Payment of tax</h3>
//             <div className='my-2 border' />
            
//             <div className="mt-6 overflow-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Description</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Integrated Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Central Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> State/UT Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> CESS (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Total (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Integrated Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Central Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> State/UT Tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> CESS (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Total (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {supplies.map((supply, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="p-3 border border-gray-300">{supply}</td>
                                
//                                 {/* Cash Ledger Fields */}
//                                 {['igst', 'cgst', 'sgst', 'cess', 'total'].map(field => (
//                                     <td key={`cash_${field}`} className="p-3 text-center border border-gray-300">
//                                         <div className="flex flex-col items-center">
//                                             <input
//                                                 type="number"
//                                                 min="0"
//                                                 step="0.01"
//                                                 value={paymentData[supply].cashLedger[field as keyof PaymentDetails['cashLedger']]}
//                                                 onChange={(e) => handleValueChange(supply, 'cashLedger', field, e.target.value)}
//                                                 onBlur={() => setIsTouched(prev => ({
//                                                     ...prev,
//                                                     [`${supply}_cashLedger_${field}`]: true
//                                                 }))}
//                                                 className={`w-[150px] p-1 text-center border rounded-md ${
//                                                     getFieldError(supply, 'cashLedger', field) ? 'border-red-500' : 'border-gray-300'
//                                                 }`}
//                                             />
//                                             {getFieldError(supply, 'cashLedger', field) && (
//                                                 <span className="mt-1 text-xs text-red-500">
//                                                     {getFieldError(supply, 'cashLedger', field)}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </td>
//                                 ))}
                                
//                                 {/* Credit Ledger Fields */}
//                                 {['igst', 'cgst', 'sgst', 'cess', 'total'].map(field => (
//                                     <td key={`credit_${field}`} className="p-3 text-center border border-gray-300">
//                                         <div className="flex flex-col items-center">
//                                             <input
//                                                 type="number"
//                                                 min="0"
//                                                 step="0.01"
//                                                 value={paymentData[supply].creditLedger[field as keyof PaymentDetails['creditLedger']]}
//                                                 onChange={(e) => handleValueChange(supply, 'creditLedger', field, e.target.value)}
//                                                 onBlur={() => setIsTouched(prev => ({
//                                                     ...prev,
//                                                     [`${supply}_creditLedger_${field}`]: true
//                                                 }))}
//                                                 className={`w-[150px] p-1 text-center border rounded-md ${
//                                                     getFieldError(supply, 'creditLedger', field) ? 'border-red-500' : 'border-gray-300'
//                                                 }`}
//                                             />
//                                             {getFieldError(supply, 'creditLedger', field) && (
//                                                 <span className="mt-1 text-xs text-red-500">
//                                                     {getFieldError(supply, 'creditLedger', field)}
//                                                 </span>
//                                             )}
//                                         </div>
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex justify-end gap-4 mt-8">
//                 <button 
//                     className="px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//                     onClick={() => setOpen(0)}
//                 >
//                     Back
//                 </button>
//                 <button 
//                     className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//                     onClick={handleSave}
//                 >
//                     Save
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default PaymentOfTax


import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: any;
    updateFormState: (slug: string, data: any) => void;
    period?: any;
    viewMode?: boolean;
}

interface PaymentDetails {
    cashLedger: {
        igst: number;
        cgst: number;
        sgst: number;
        cess: number;
        total: number;
    };
    creditLedger: {
        igst: number;
        cgst: number;
        sgst: number;
        cess: number;
        total: number;
    };
}

const PaymentOfTax: React.FC<Props> = ({ 
    setOpen, 
    formData, 
    updateFormState,
    viewMode = false
}) => {
    const supplies = ["Tax", "Interest", "Late Fees"];
    const [paymentData, setPaymentData] = useState<Record<string, PaymentDetails>>({
        "Tax": {
            cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
            creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
        },
        "Interest": {
            cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
            creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
        },
        "Late Fees": {
            cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
            creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
        }
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

    // Load saved data if available
    useEffect(() => {
        if (formData) {
            setPaymentData(formData.paymentData || {
                "Tax": {
                    cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
                    creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
                },
                "Interest": {
                    cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
                    creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
                },
                "Late Fees": {
                    cashLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
                    creditLedger: { igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 }
                }
            });
        }
    }, [formData]);

    const handleValueChange = (supply: string, ledgerType: 'cashLedger' | 'creditLedger', field: string, value: string) => {
        if (viewMode) return;
        
        const numValue = parseFloat(value) || 0;
        
        setPaymentData(prev => {
            const updatedData = { ...prev };
            updatedData[supply][ledgerType] = {
                ...updatedData[supply][ledgerType],
                [field]: numValue
            };
            
            // Auto-calculate total if any of the components change
            if (field !== 'total' && ['igst', 'cgst', 'sgst', 'cess'].includes(field)) {
                const { igst, cgst, sgst, cess } = updatedData[supply][ledgerType];
                updatedData[supply][ledgerType].total = igst + cgst + sgst + cess;
            }
            
            return updatedData;
        });

        // Mark field as touched
        setIsTouched(prev => ({
            ...prev,
            [`${supply}_${ledgerType}_${field}`]: true
        }));
    };

    const validateField = (value: number) => {
        if (value < 0) return "Value cannot be negative";
        if (value > 100000000) return "Value exceeds maximum limit";
        if (isNaN(value)) return "Please enter a valid number";
        return "";
    };

    const validateForm = () => {
        if (viewMode) return true;
        
        const newErrors: Record<string, string> = {};
        let isValid = true;

        // Validate all fields that have been touched
        Object.keys(isTouched).forEach(key => {
            const [supply, ledgerType, field] = key.split('_') as [string, 'cashLedger' | 'creditLedger', string];
            const value = paymentData[supply][ledgerType][field as keyof PaymentDetails['cashLedger']];
            const error = validateField(value);
            
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        // Validate totals match sum of components
        supplies.forEach(supply => {
            ['cashLedger', 'creditLedger'].forEach(ledgerType => {
                const ledger = paymentData[supply][ledgerType as 'cashLedger' | 'creditLedger'];
                const calculatedTotal = ledger.igst + ledger.cgst + ledger.sgst + ledger.cess;
                
                if (Math.abs(ledger.total - calculatedTotal) > 0.01) {
                    newErrors[`${supply}_${ledgerType}_total`] = "Total must equal sum of components";
                    isValid = false;
                }
            });
        });

        setErrors(newErrors);
        return isValid;
    };

    const getFieldError = (supply: string, ledgerType: string, field: string) => {
        return errors[`${supply}_${ledgerType}_${field}`] || "";
    };

    const handleSave = () => {
        if (!validateForm()) {
            return;
        }

        updateFormState("paymentOfTax", { paymentData });
        setOpen(0);
    };

    return (
        <>
            {/* Header - matches other components */}
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    6.1 Payment of tax
                </h2>
            </div>

            <div className="p-4 mt-6 overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Description</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> CESS (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Total (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> CESS (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Total (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.map((supply, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-300">{supply}</td>
                                
                                {/* Cash Ledger Fields */}
                                {['igst', 'cgst', 'sgst', 'cess', 'total'].map(field => (
                                    <td key={`cash_${field}`} className="p-3 text-center border border-gray-300">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={paymentData[supply].cashLedger[field as keyof PaymentDetails['cashLedger']]}
                                                onChange={(e) => handleValueChange(supply, 'cashLedger', field, e.target.value)}
                                                onBlur={() => setIsTouched(prev => ({
                                                    ...prev,
                                                    [`${supply}_cashLedger_${field}`]: true
                                                }))}
                                                className={`w-[150px] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                                                    getFieldError(supply, 'cashLedger', field) ? 'border-red-500' : ''
                                                } ${viewMode ? 'bg-gray-100' : ''}`}
                                                disabled={viewMode}
                                                readOnly={viewMode}
                                            />
                                            {getFieldError(supply, 'cashLedger', field) && (
                                                <span className="mt-1 text-xs text-red-500">
                                                    {getFieldError(supply, 'cashLedger', field)}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                ))}
                                
                                {/* Credit Ledger Fields */}
                                {['igst', 'cgst', 'sgst', 'cess', 'total'].map(field => (
                                    <td key={`credit_${field}`} className="p-3 text-center border border-gray-300">
                                        <div className="flex flex-col items-center">
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={paymentData[supply].creditLedger[field as keyof PaymentDetails['creditLedger']]}
                                                onChange={(e) => handleValueChange(supply, 'creditLedger', field, e.target.value)}
                                                onBlur={() => setIsTouched(prev => ({
                                                    ...prev,
                                                    [`${supply}_creditLedger_${field}`]: true
                                                }))}
                                                className={`w-[150px] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                                                    getFieldError(supply, 'creditLedger', field) ? 'border-red-500' : ''
                                                } ${viewMode ? 'bg-gray-100' : ''}`}
                                                disabled={viewMode}
                                                readOnly={viewMode}
                                            />
                                            {getFieldError(supply, 'creditLedger', field) && (
                                                <span className="mt-1 text-xs text-red-500">
                                                    {getFieldError(supply, 'creditLedger', field)}
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

            {/* Action Buttons - matches styling */}
            <div className="flex justify-end gap-4 p-4 mt-6">
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
                    onClick={handleSave}
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

export default PaymentOfTax;