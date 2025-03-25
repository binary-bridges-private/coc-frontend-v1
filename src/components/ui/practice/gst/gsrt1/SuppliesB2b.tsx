// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }


// const SuppliesB2b: React.FC<props> = ({ setOpen }) => {

//     const [taxableValues, setTaxableValues] = useState({});
//     const [integratedTax, setIntegratedTax] = useState(0);
//     const [cess, setCess] = useState(0);

//     const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

//     const handleTaxableValueChange = (rate, value) => {
//         setTaxableValues((prevValues) => ({
//             ...prevValues,
//             [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
//         }));
//     };

//     const calculateTax = (rate, value) => {
//         return ((value * rate) / 100).toFixed(2);
//     };


//     return (
//         <div>
//             <h3 className="font-semibold text-md">B2B, SEZ, DE - Add Invoice</h3>
//             <div className='border' />
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>Deemed Exports</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>SEZ Supplies with payment</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>SEZ Supplies without payment</span>
//                 </label>
//             </div>

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supplier GSTIN/UIN *</label>
//                     <input type="text" placeholder="Supplier GSTIN/UIN" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Supplier Name *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>

//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Recipient GSTIN/UIN *</label>
//                     <input type="text" placeholder="Recipient GSTIN/UIN" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Recipient name *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Document number *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Document date *</label>
//                     <input type="date" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total value of supplies made (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input type="text" placeholder=" " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supply type</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>

//             {/* <div className="mx-auto bg-white rounded-lg"> */}
//             <h2 className="pb-2 mt-10 text-lg font-semibold ">
//                 Item Details
//             </h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Csess (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {taxRates.map((rate, index) => (
//                             <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                 <td className="p-3 text-center border border-gray-300">{rate}%</td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     <input
//                                         type="number"
//                                         value={taxableValues[rate] || 0}
//                                         onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
//                                         className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                     />
//                                 </td>
//                                 <td className="p-3 text-center border border-gray-300">
//                                     {calculateTax(rate, taxableValues[rate] || 0)}
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
//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     )
// }

// export default SuppliesB2b

import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: B2BFormData
    updateFormState: (slug: string, data: B2BFormData) => void
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

const SuppliesB2b: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
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

    const validateField = (name: Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, value: string | boolean) => {
        if (typeof value === 'boolean') return '' // Checkboxes don't need validation
        
        if (['supplierGstin', 'recipientGstin'].includes(name) && value && !/^[0-9A-Z]{15}$/.test(value)) {
            return 'Invalid GSTIN format'
        }

        if (['totalValue'].includes(name) && (isNaN(Number(value)) || Number(value) < 0)) {
            return 'Must be a positive number'
        }

        if (!value && ['supplierGstin', 'supplierName', 'recipientGstin', 'recipientName', 
                      'documentNumber', 'documentDate', 'totalValue', 'pos'].includes(name)) {
            return 'This field is required'
        }

        return ''
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        let isValid = true

        Object.keys(formState).forEach(key => {
            if (key === 'taxableValues' || key === 'cessValues') return
            
            const value = formState[key as keyof B2BFormData]
            if (typeof value === 'string' || typeof value === 'boolean') {
                const error = validateField(key as Exclude<keyof B2BFormData, 'taxableValues' | 'cessValues'>, value)
                if (error) {
                    newErrors[key] = error
                    isValid = false
                }
            }
        })

        setErrors(newErrors)
        return isValid
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setFormState(prev => ({
            ...prev,
            taxableValues: {
                ...prev.taxableValues,
                [rate]: value
            }
        }))
    }

    const handleCessValueChange = (rate: number, value: string) => {
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

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('SUPPLIES-B2B', formState)  // Changed slug to match your GSTR1 options
            setOpen(0)
        }
    }

    return (
        <div>
            <h3 className="font-semibold text-md">B2B, SEZ, DE - Add Invoice</h3>
            <div className='border' />

            {/* Checkbox Section */}
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="deemedExports"
                        checked={formState.deemedExports}
                        onChange={handleChange}
                        className="checkbox"
                    />
                    <span>Deemed Exports</span>
                </label>
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="sezWithPayment"
                        checked={formState.sezWithPayment}
                        onChange={handleChange}
                        className="checkbox"
                    />
                    <span>SEZ Supplies with payment</span>
                </label>
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="sezWithoutPayment"
                        checked={formState.sezWithoutPayment}
                        onChange={handleChange}
                        className="checkbox"
                    />
                    <span>SEZ Supplies without payment</span>
                </label>
            </div>

            {/* Supplier Information */}
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supplier GSTIN/UIN *</label>
                    <input
                        type="text"
                        name="supplierGstin"
                        value={formState.supplierGstin}
                        onChange={handleChange}
                        placeholder="Supplier GSTIN/UIN"
                        className={`w-full text-sm font-medium input input-bordered ${errors.supplierGstin ? 'input-error' : ''}`}
                    />
                    {errors.supplierGstin && <p className="mt-1 text-xs text-red-500">{errors.supplierGstin}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Supplier Name *</label>
                    <input
                        type="text"
                        name="supplierName"
                        value={formState.supplierName}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.supplierName ? 'input-error' : ''}`}
                    />
                    {errors.supplierName && <p className="mt-1 text-xs text-red-500">{errors.supplierName}</p>}
                </div>
            </div>

            {/* Recipient Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Recipient GSTIN/UIN *</label>
                    <input
                        type="text"
                        name="recipientGstin"
                        value={formState.recipientGstin}
                        onChange={handleChange}
                        placeholder="Recipient GSTIN/UIN"
                        className={`w-full text-sm font-medium input input-bordered ${errors.recipientGstin ? 'input-error' : ''}`}
                    />
                    {errors.recipientGstin && <p className="mt-1 text-xs text-red-500">{errors.recipientGstin}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Recipient name *</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formState.recipientName}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.recipientName ? 'input-error' : ''}`}
                    />
                    {errors.recipientName && <p className="mt-1 text-xs text-red-500">{errors.recipientName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Document number *</label>
                    <input
                        type="text"
                        name="documentNumber"
                        value={formState.documentNumber}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.documentNumber ? 'input-error' : ''}`}
                    />
                    {errors.documentNumber && <p className="mt-1 text-xs text-red-500">{errors.documentNumber}</p>}
                </div>
            </div>

            {/* Document Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Document date *</label>
                    <input
                        type="date"
                        name="documentDate"
                        value={formState.documentDate}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.documentDate ? 'input-error' : ''}`}
                    />
                    {errors.documentDate && <p className="mt-1 text-xs text-red-500">{errors.documentDate}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Total value of supplies made (₹) *</label>
                    <input
                        type="number"
                        name="totalValue"
                        value={formState.totalValue}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.totalValue ? 'input-error' : ''}`}
                    />
                    {errors.totalValue && <p className="mt-1 text-xs text-red-500">{errors.totalValue}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">POS *</label>
                    <input
                        type="text"
                        name="pos"
                        value={formState.pos}
                        onChange={handleChange}
                        placeholder=" "
                        className={`w-full text-sm font-medium input input-bordered ${errors.pos ? 'input-error' : ''}`}
                    />
                    {errors.pos && <p className="mt-1 text-xs text-red-500">{errors.pos}</p>}
                </div>
            </div>

            {/* Supply Type */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supply type</label>
                    <input
                        type="text"
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        className="w-full text-sm font-medium input input-bordered"
                    />
                </div>
            </div>

            {/* Item Details Table */}
            <h2 className="pb-2 mt-10 text-lg font-semibold">Item Details</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxRates.map((rate, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 text-center border border-gray-300">{rate}%</td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        value={formState.taxableValues[rate] || ''}
                                        onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    {calculateTax(rate, formState.taxableValues[rate] || '0')}
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        value={formState.cessValues[rate] || ''}
                                        onChange={(e) => handleCessValueChange(rate, e.target.value)}
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setOpen(0)}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}

export default SuppliesB2b