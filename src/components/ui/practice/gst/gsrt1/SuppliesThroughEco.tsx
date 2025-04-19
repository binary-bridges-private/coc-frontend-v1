// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }


// const SuppliesThroughEco: React.FC<props> = ({ setOpen }) => {

//     const [taxState, setTaxState] = useState(0);


//     return (
//         <div>
//             <h3 className="font-semibold text-md">Supplies made through E-Commerce Operators - u/s 52 (TCS) - Add Details</h3>
//             <div className='border' />

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">GSTIN of e-commerce operator *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Trade/Legal Name *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Net value of supplies (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Integrated tax (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Central tax (₹) *</label>
//                     <input type="text" placeholder=" " value={taxState} onChange={(e: any) => setTaxState(e.target.value)} className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">State/UT tax (₹) *</label>
//                     <input type="text" placeholder="" value={taxState} onChange={(e: any) => setTaxState(e.target.value)} className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Cess (₹)</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     )
// }

// export default SuppliesThroughEco

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: EcoOperatorData
    updateFormState: (slug: string, data: EcoOperatorData) => void
    period: {
        financialYear: string;
        quarter: string;
        month: string;
        monthName: string;
    };
}

interface EcoOperatorData {
    gstin: string
    legalName: string
    netValue: string
    integratedTax: string
    centralTax: string
    stateTax: string
    cess: string
}

const SuppliesThroughEco: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    const initialState: EcoOperatorData = {
        gstin: '',
        legalName: '',
        netValue: '',
        integratedTax: '',
        centralTax: '',
        stateTax: '',
        cess: '',
        ...formData
    }

    const [formState, setFormState] = useState<EcoOperatorData>(initialState)
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Auto-calculate taxes when net value changes
    useEffect(() => {
        if (formState.netValue && !isNaN(Number(formState.netValue))) {
            const netValue = parseFloat(formState.netValue)
            // Example tax calculation (adjust rates as needed)
            const igst = (netValue * 0.18).toFixed(2)
            const cgst = (netValue * 0.09).toFixed(2)
            const sgst = (netValue * 0.09).toFixed(2)
            
            // Only update if fields are empty to prevent overwriting manual entries
            setFormState(prev => ({
                ...prev,
                integratedTax: prev.integratedTax || igst,
                centralTax: prev.centralTax || cgst,
                stateTax: prev.stateTax || sgst
            }))
        }
    }, [formState.netValue])

    const validateField = (name: keyof EcoOperatorData, value: string) => {
        if (name === 'cess') return '' // Cess is optional
        
        if (!value.trim()) {
            return `${name === 'legalName' ? 'Legal name' : name.replace(/([A-Z])/g, ' $1').trim()} is required`
        }

        if (name === 'gstin' && !/^[0-9A-Z]{15}$/.test(value)) {
            return 'Invalid GSTIN format (15 alphanumeric characters expected)'
        }

        if (['netValue', 'integratedTax', 'centralTax', 'stateTax'].includes(name)) {
            if (isNaN(Number(value)) || Number(value) < 0) {
                return 'Must be a valid positive number'
            }
        }

        return ''
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        let isValid = true

        Object.keys(formState).forEach(key => {
            if (key === 'cess') return
            
            const error = validateField(key as keyof EcoOperatorData, formState[key as keyof EcoOperatorData])
            if (error) {
                newErrors[key] = error
                isValid = false
            }
        })

        setErrors(newErrors)
        return isValid
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormState(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user types in a field with error
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('ECO', formState) // Changed to match your GSTR1 options slug
            setOpen(0)
        }
    }

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold">Supplies made through E-Commerce Operators - u/s 52 (TCS) - Add Details</h3>
            <div className="my-4 border" />

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                {/* GSTIN */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">GSTIN of e-commerce operator <span className="text-red-500">*</span></span>
                    </label>
                    <input
                        type="text"
                        name="gstin"
                        value={formState.gstin}
                        onChange={handleChange}
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                        className={`input input-bordered ${errors.gstin ? 'input-error' : ''}`}
                    />
                    {errors.gstin && <label className="label">
                        <span className="text-red-500 label-text-alt">{errors.gstin}</span>
                    </label>}
                </div>

                {/* Legal Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Trade/Legal Name <span className="text-red-500">*</span></span>
                    </label>
                    <input
                        type="text"
                        name="legalName"
                        value={formState.legalName}
                        onChange={handleChange}
                        className={`input input-bordered ${errors.legalName ? 'input-error' : ''}`}
                    />
                    {errors.legalName && <label className="label">
                        <span className="text-red-500 label-text-alt">{errors.legalName}</span>
                    </label>}
                </div>

                {/* Net Value */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Net value of supplies (₹) <span className="text-red-500">*</span></span>
                    </label>
                    <input
                        type="number"
                        name="netValue"
                        value={formState.netValue}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`input input-bordered ${errors.netValue ? 'input-error' : ''}`}
                    />
                    {errors.netValue && <label className="label">
                        <span className="text-red-500 label-text-alt">{errors.netValue}</span>
                    </label>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                {/* Integrated Tax */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Integrated tax (₹) <span className="text-red-500">*</span></span>
                    </label>
                    <input
                        type="number"
                        name="integratedTax"
                        value={formState.integratedTax}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`input input-bordered ${errors.integratedTax ? 'input-error' : ''}`}
                    />
                    {errors.integratedTax && <label className="label">
                        <span className="text-red-500 label-text-alt">{errors.integratedTax}</span>
                    </label>}
                </div>

                {/* Central Tax */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Central tax (₹) <span className="text-red-500">*</span></span>
                    </label>
                    <input
                        type="number"
                        name="centralTax"
                        value={formState.centralTax}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`input input-bordered ${errors.centralTax ? 'input-error' : ''}`}
                    />
                    {errors.centralTax && <label className="label">
                        <span className="text-red-500 label-text-alt">{errors.centralTax}</span>
                    </label>}
                </div>

                {/* State Tax */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">State/UT tax (₹) <span className="text-red-500">*</span></span>
                    </label>
                    <input
                        type="number"
                        name="stateTax"
                        value={formState.stateTax}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`input input-bordered ${errors.stateTax ? 'input-error' : ''}`}
                    />
                    {errors.stateTax && <label className="label">
                        <span className="text-red-500 label-text-alt">{errors.stateTax}</span>
                    </label>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                {/* Cess */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Cess (₹)</span>
                    </label>
                    <input
                        type="number"
                        name="cess"
                        value={formState.cess}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className="input input-bordered"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
                <button 
                    className="btn btn-outline"
                    onClick={() => setOpen(0)}
                >
                    Back
                </button>
                <button 
                    className="btn btn-primary"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default SuppliesThroughEco