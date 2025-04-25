// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>
//     formData?: B2BFormData
//     updateFormState: (slug: string, data: B2BFormData) => void
//     period: {
//         financialYear: string;
//         quarter: string;
//         month: string;
//         monthName: string;
//     };
// }

// interface B2BFormData {
//     deemedExports: boolean
//     sezWithPayment: boolean
//     sezWithoutPayment: boolean
//     supplierGstin: string
//     supplierName: string
//     recipientGstin: string
//     recipientName: string
//     documentNumber: string
//     documentDate: string
//     totalValue: string
//     pos: string
//     supplyType: string
//     taxableValues: Record<number, string>
//     cessValues: Record<number, string>
// }

// const SuppliesB2b: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28]

//     const initialState: B2BFormData = {
//         deemedExports: false,
//         sezWithPayment: false,
//         sezWithoutPayment: false,
//         supplierGstin: '',
//         supplierName: '',
//         recipientGstin: '',
//         recipientName: '',
//         documentNumber: '',
//         documentDate: '',
//         totalValue: '',
//         pos: '',
//         supplyType: '',
//         taxableValues: taxRates.reduce((acc, rate) => ({ ...acc, [rate]: '' }), {}),
//         cessValues: taxRates.reduce((acc, rate) => ({ ...acc, [rate]: '' }), {}),
//         ...formData
//     }

//     const [formState, setFormState] = useState<B2BFormData>(initialState)
//     const [errors, setErrors] = useState<Record<string, string>>({})

//     const validateField = (name: Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, value: string | boolean) => {
//         if (typeof value === 'boolean') return '' // Checkboxes don't need validation
        
//         if (['supplierGstin', 'recipientGstin'].includes(name) && value && !/^[0-9A-Z]{15}$/.test(value)) {
//             return 'Invalid GSTIN format'
//         }

//         if (['totalValue'].includes(name) && (isNaN(Number(value)) || Number(value) < 0)) {
//             return 'Must be a positive number'
//         }

//         if (!value && ['supplierGstin', 'supplierName', 'recipientGstin', 'recipientName', 
//                       'documentNumber', 'documentDate', 'totalValue', 'pos'].includes(name)) {
//             return 'This field is required'
//         }

//         return ''
//     }

//     const validateForm = () => {
//         const newErrors: Record<string, string> = {}
//         let isValid = true

//         Object.keys(formState).forEach(key => {
//             if (key === 'taxableValues' || key === 'cessValues') return
            
//             const value = formState[key as keyof B2BFormData]
//             if (typeof value === 'string' || typeof value === 'boolean') {
//                 const error = validateField(key as Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, value)
//                 if (error) {
//                     newErrors[key] = error
//                     isValid = false
//                 }
//             }
//         })

//         setErrors(newErrors)
//         return isValid
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target
//         setFormState(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }))

//         if (errors[name]) {
//             setErrors(prev => {
//                 const newErrors = { ...prev }
//                 delete newErrors[name]
//                 return newErrors
//             })
//         }
//     }

//     const handleTaxableValueChange = (rate: number, value: string) => {
//         setFormState(prev => ({
//             ...prev,
//             taxableValues: {
//                 ...prev.taxableValues,
//                 [rate]: value
//             }
//         }))
//     }

//     const handleCessValueChange = (rate: number, value: string) => {
//         setFormState(prev => ({
//             ...prev,
//             cessValues: {
//                 ...prev.cessValues,
//                 [rate]: value
//             }
//         }))
//     }

//     const calculateTax = (rate: number, value: string) => {
//         const numValue = parseFloat(value) || 0
//         return ((numValue * rate) / 100).toFixed(2)
//     }

//     const handleSubmit = () => {
//         if (validateForm()) {
//             updateFormState('SUPPLIES-B2B', formState)  // Changed slug to match your GSTR1 options
//             setOpen(0)
//         }
//     }

//     return (
//         <div>
//             <h3 className="font-semibold text-md">B2B, SEZ, DE - Add Invoice</h3>
//             <div className='border' />

//             {/* Checkbox Section */}
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input
//                         type="checkbox"
//                         name="deemedExports"
//                         checked={formState.deemedExports}
//                         onChange={handleChange}
//                         className="checkbox"
//                     />
//                     <span>Deemed Exports</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input
//                         type="checkbox"
//                         name="sezWithPayment"
//                         checked={formState.sezWithPayment}
//                         onChange={handleChange}
//                         className="checkbox"
//                     />
//                     <span>SEZ Supplies with payment</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input
//                         type="checkbox"
//                         name="sezWithoutPayment"
//                         checked={formState.sezWithoutPayment}
//                         onChange={handleChange}
//                         className="checkbox"
//                     />
//                     <span>SEZ Supplies without payment</span>
//                 </label>
//             </div>

//             {/* Supplier Information */}
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supplier GSTIN/UIN *</label>
//                     <input
//                         type="text"
//                         name="supplierGstin"
//                         value={formState.supplierGstin}
//                         onChange={handleChange}
//                         placeholder="Supplier GSTIN/UIN"
//                         className={`w-full text-sm font-medium input input-bordered ${errors.supplierGstin ? 'input-error' : ''}`}
//                     />
//                     {errors.supplierGstin && <p className="mt-1 text-xs text-red-500">{errors.supplierGstin}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Supplier Name *</label>
//                     <input
//                         type="text"
//                         name="supplierName"
//                         value={formState.supplierName}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.supplierName ? 'input-error' : ''}`}
//                     />
//                     {errors.supplierName && <p className="mt-1 text-xs text-red-500">{errors.supplierName}</p>}
//                 </div>
//             </div>

//             {/* Recipient Information */}
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Recipient GSTIN/UIN *</label>
//                     <input
//                         type="text"
//                         name="recipientGstin"
//                         value={formState.recipientGstin}
//                         onChange={handleChange}
//                         placeholder="Recipient GSTIN/UIN"
//                         className={`w-full text-sm font-medium input input-bordered ${errors.recipientGstin ? 'input-error' : ''}`}
//                     />
//                     {errors.recipientGstin && <p className="mt-1 text-xs text-red-500">{errors.recipientGstin}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Recipient name *</label>
//                     <input
//                         type="text"
//                         name="recipientName"
//                         value={formState.recipientName}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.recipientName ? 'input-error' : ''}`}
//                     />
//                     {errors.recipientName && <p className="mt-1 text-xs text-red-500">{errors.recipientName}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Document number *</label>
//                     <input
//                         type="text"
//                         name="documentNumber"
//                         value={formState.documentNumber}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.documentNumber ? 'input-error' : ''}`}
//                     />
//                     {errors.documentNumber && <p className="mt-1 text-xs text-red-500">{errors.documentNumber}</p>}
//                 </div>
//             </div>

//             {/* Document Information */}
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Document date *</label>
//                     <input
//                         type="date"
//                         name="documentDate"
//                         value={formState.documentDate}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.documentDate ? 'input-error' : ''}`}
//                     />
//                     {errors.documentDate && <p className="mt-1 text-xs text-red-500">{errors.documentDate}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total value of supplies made (₹) *</label>
//                     <input
//                         type="number"
//                         name="totalValue"
//                         value={formState.totalValue}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.totalValue ? 'input-error' : ''}`}
//                     />
//                     {errors.totalValue && <p className="mt-1 text-xs text-red-500">{errors.totalValue}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input
//                         type="text"
//                         name="pos"
//                         value={formState.pos}
//                         onChange={handleChange}
//                         placeholder=" "
//                         className={`w-full text-sm font-medium input input-bordered ${errors.pos ? 'input-error' : ''}`}
//                     />
//                     {errors.pos && <p className="mt-1 text-xs text-red-500">{errors.pos}</p>}
//                 </div>
//             </div>

//             {/* Supply Type */}
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supply type</label>
//                     <input
//                         type="text"
//                         name="supplyType"
//                         value={formState.supplyType}
//                         onChange={handleChange}
//                         className="w-full text-sm font-medium input input-bordered"
//                     />
//                 </div>
//             </div>

//             {/* Item Details Table */}
//             <h2 className="pb-2 mt-10 text-lg font-semibold">Item Details</h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {taxRates.map((rate, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="p-3 text-center border border-gray-300">{rate}%</td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         value={formState.taxableValues[rate] || ''}
//                                         onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     {calculateTax(rate, formState.taxableValues[rate] || '0')}
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         value={formState.cessValues[rate] || ''}
//                                         onChange={(e) => handleCessValueChange(rate, e.target.value)}
//                                         className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => setOpen(0)}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>Save</button>
//             </div>
//         </div>
//     )
// }

// export default SuppliesB2b

import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'

// Define consistent input classes
const inputClass = "w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
const disabledInputClass = "w-full p-2 text-sm bg-gray-100 border border-gray-200 rounded-md text-gray-600"

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: B2BFormData
    updateFormState: (slug: string, data: B2BFormData) => void
    period: {
        financialYear: string;
        quarter: string;
        month: string;
        monthName: string;
    };
    viewMode?: boolean;
}

interface B2BFormData {
    deemedExports: boolean
    sezWithPayment: boolean
    sezWithoutPayment: boolean
    supplierGstin: string
    supplierName: string
    recipientGstin: string
    recipientName: string
    documentNumber: string
    documentDate: string
    totalValue: string
    pos: string
    supplyType: string
    taxableValues: Record<number, string>
    cessValues: Record<number, string>
}

const SuppliesB2b: FC<Props> = ({ setOpen, formData, updateFormState, viewMode = false }) => {
    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28]

    const initialState: B2BFormData = {
        deemedExports: false,
        sezWithPayment: false,
        sezWithoutPayment: false,
        supplierGstin: '',
        supplierName: '',
        recipientGstin: '',
        recipientName: '',
        documentNumber: '',
        documentDate: '',
        totalValue: '',
        pos: '',
        supplyType: '',
        taxableValues: taxRates.reduce((acc, rate) => ({ ...acc, [rate]: '' }), {}),
        cessValues: taxRates.reduce((acc, rate) => ({ ...acc, [rate]: '' }), {}),
        ...formData
    }

    const [formState, setFormState] = useState<B2BFormData>(initialState)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    // Validate fields when they change and have been touched
    useEffect(() => {
        const newErrors = { ...errors }
        let hasChanges = false

        Object.keys(touched).forEach(key => {
            if (touched[key]) {
                const error = validateField(key as Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, formState[key])
                if (error !== errors[key]) {
                    newErrors[key] = error
                    hasChanges = true
                }
            }
        })

        if (hasChanges) {
            setErrors(newErrors)
        }
    }, [formState, touched])

    const validateField = (name: Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, value: string | boolean) => {
        if (typeof value === 'boolean') return '' // Checkboxes don't need validation
        
        if (['supplierGstin', 'recipientGstin'].includes(name) && value && !/^[0-9A-Z]{15}$/.test(value)) {
            return 'Invalid GSTIN format (15 alphanumeric characters expected)'
        }

        if (['totalValue'].includes(name) && (isNaN(Number(value)) || Number(value) < 0)) {
            return 'Must be a valid positive number'
        }

        if (!value && ['supplierGstin', 'supplierName', 'recipientGstin', 'recipientName', 
                      'documentNumber', 'documentDate', 'totalValue', 'pos'].includes(name)) {
            return 'This field is required'
        }

        return ''
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (viewMode) return
        
        const { name, value, type, checked } = e.target
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const handleTaxableValueChange = (rate: number, value: string) => {
        if (viewMode) return
        
        setFormState(prev => ({
            ...prev,
            taxableValues: {
                ...prev.taxableValues,
                [rate]: value
            }
        }))
    }

    const handleCessValueChange = (rate: number, value: string) => {
        if (viewMode) return
        
        setFormState(prev => ({
            ...prev,
            cessValues: {
                ...prev.cessValues,
                [rate]: value
            }
        }))
    }

    const calculateTax = (rate: number, value: string) => {
        const numValue = parseFloat(value) || 0
        return ((numValue * rate) / 100).toFixed(2)
    }

    const validateForm = () => {
        const newTouched = {
            supplierGstin: true,
            supplierName: true,
            recipientGstin: true,
            recipientName: true,
            documentNumber: true,
            documentDate: true,
            totalValue: true,
            pos: true
        }
        setTouched(newTouched)

        const newErrors: Record<string, string> = {}
        let isValid = true

        Object.keys(newTouched).forEach(key => {
            const error = validateField(key as Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, formState[key])
            if (error) {
                newErrors[key] = error
                isValid = false
            }
        })

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = () => {
        if (viewMode) {
            setOpen(0)
            return
        }
        
        if (validateForm()) {
            updateFormState('suppliesB2b', formState)
            setOpen(0)
        }
    }

    const formatCurrency = (value: string) => {
        if (!value) return ''
        const num = parseFloat(value)
        return isNaN(num) ? '' : num.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    const parseCurrency = (value: string) => {
        return value.replace(/,/g, '')
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">B2B, SEZ, DE - Add Invoice</h3>
            <div className="my-2 border-t border-gray-200" />

            {/* Checkbox Section */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <label className={`flex items-center space-x-2 text-sm ${viewMode ? 'text-gray-600' : 'text-gray-700'}`}>
                    <input
                        type="checkbox"
                        name="deemedExports"
                        checked={formState.deemedExports}
                        onChange={handleChange}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            viewMode ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={viewMode}
                    />
                    <span>Deemed Exports</span>
                </label>
                <label className={`flex items-center space-x-2 text-sm ${viewMode ? 'text-gray-600' : 'text-gray-700'}`}>
                    <input
                        type="checkbox"
                        name="sezWithPayment"
                        checked={formState.sezWithPayment}
                        onChange={handleChange}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            viewMode ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={viewMode}
                    />
                    <span>SEZ Supplies with payment</span>
                </label>
                <label className={`flex items-center space-x-2 text-sm ${viewMode ? 'text-gray-600' : 'text-gray-700'}`}>
                    <input
                        type="checkbox"
                        name="sezWithoutPayment"
                        checked={formState.sezWithoutPayment}
                        onChange={handleChange}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            viewMode ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={viewMode}
                    />
                    <span>SEZ Supplies without payment</span>
                </label>
            </div>

            {/* Supplier Information */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Supplier GSTIN/UIN *</label>
                    <input
                        type="text"
                        name="supplierGstin"
                        value={formState.supplierGstin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=""
                        maxLength={15}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.supplierGstin ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.supplierGstin && touched.supplierGstin && (
                        <p className="mt-1 text-xs text-red-600">{errors.supplierGstin}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Supplier Name *</label>
                    <input
                        type="text"
                        name="supplierName"
                        value={formState.supplierName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.supplierName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.supplierName && touched.supplierName && (
                        <p className="mt-1 text-xs text-red-600">{errors.supplierName}</p>
                    )}
                </div>
            </div>

            {/* Recipient Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Recipient GSTIN/UIN *</label>
                    <input
                        type="text"
                        name="recipientGstin"
                        value={formState.recipientGstin}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder=""
                        maxLength={15}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.recipientGstin ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.recipientGstin && touched.recipientGstin && (
                        <p className="mt-1 text-xs text-red-600">{errors.recipientGstin}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Recipient name *</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formState.recipientName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.recipientName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.recipientName && touched.recipientName && (
                        <p className="mt-1 text-xs text-red-600">{errors.recipientName}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Document number *</label>
                    <input
                        type="text"
                        name="documentNumber"
                        value={formState.documentNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.documentNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.documentNumber && touched.documentNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.documentNumber}</p>
                    )}
                </div>
            </div>

            {/* Document Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Document date *</label>
                    <input
                        type="date"
                        name="documentDate"
                        value={formState.documentDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={new Date().toISOString().split('T')[0]}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.documentDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.documentDate && touched.documentDate && (
                        <p className="mt-1 text-xs text-red-600">{errors.documentDate}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Total value of supplies made (₹) *</label>
                    <div className="relative">
                        <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                        <input
                            type="text"
                            name="totalValue"
                            value={formatCurrency(formState.totalValue)}
                            onChange={(e) => {
                                const unformattedValue = parseCurrency(e.target.value)
                                handleChange({
                                    ...e,
                                    target: {
                                        ...e.target,
                                        name: 'totalValue',
                                        value: unformattedValue
                                    }
                                })
                            }}
                            onBlur={handleBlur}
                            className={`${viewMode ? disabledInputClass : inputClass} pl-8 ${errors.totalValue ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                    </div>
                    {!viewMode && errors.totalValue && touched.totalValue && (
                        <p className="mt-1 text-xs text-red-600">{errors.totalValue}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">POS *</label>
                    <input
                        type="text"
                        name="pos"
                        value={formState.pos}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Place of supply"
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.pos ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.pos && touched.pos && (
                        <p className="mt-1 text-xs text-red-600">{errors.pos}</p>
                    )}
                </div>
            </div>

            {/* Supply Type */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Supply type</label>
                    <input
                        type="text"
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        className={viewMode ? disabledInputClass : inputClass}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            {/* Item Details Table */}
            <h2 className="pb-2 mt-8 text-lg font-semibold text-gray-800 border-b border-gray-200">
                Item Details
            </h2>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Rate (%)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Taxable Value (₹)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Integrated tax (₹)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Cess (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxRates.map((rate, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 text-sm text-center text-gray-700 border border-gray-200">{rate}%</td>
                                <td className="p-3 text-center border border-gray-200">
                                    {viewMode ? (
                                        <div className={disabledInputClass}>
                                            {formatCurrency(formState.taxableValues[rate]) || '0.00'}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <span className="absolute text-sm text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                            <input
                                                type="text"
                                                value={formatCurrency(formState.taxableValues[rate])}
                                                onChange={(e) => handleTaxableValueChange(rate, parseCurrency(e.target.value))}
                                                className={`${inputClass} pl-8 text-center`}
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 text-sm text-center text-gray-700 border border-gray-200">
                                    ₹{calculateTax(rate, formState.taxableValues[rate] || '0')}
                                </td>
                                <td className="p-3 text-center border border-gray-200">
                                    {viewMode ? (
                                        <div className={disabledInputClass}>
                                            {formatCurrency(formState.cessValues[rate]) || '0.00'}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <span className="absolute text-sm text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                            <input
                                                type="text"
                                                value={formatCurrency(formState.cessValues[rate])}
                                                onChange={(e) => handleCessValueChange(rate, parseCurrency(e.target.value))}
                                                className={`${inputClass} pl-8 text-center`}
                                            />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pb-4 mt-6">
                <button 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setOpen(0)}
                >
                    {viewMode ? 'Close' : 'Cancel'}
                </button>
                {!viewMode && (
                    <button 
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={Object.values(errors).some(error => error !== '')}
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    )
}

export default SuppliesB2b