import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'

// Define consistent input classes
const inputClass = "w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
const disabledInputClass = "w-full p-2 text-sm bg-gray-100 border border-gray-200 rounded-md text-gray-600"

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
    viewMode?: boolean;
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

const SuppliesThroughEco: FC<Props> = ({ setOpen, formData, updateFormState, viewMode = false }) => {
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

    console.log("suppliesThrough Eco :", formData);

    const [formState, setFormState] = useState<EcoOperatorData>(initialState)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [touched, setTouched] = useState<Record<string, boolean>>({})

    // Auto-calculate taxes when net value changes
    useEffect(() => {
        if (formState.netValue && !isNaN(Number(formState.netValue))) {
            const netValue = parseFloat(formState.netValue)
            // Example tax calculation (adjust rates as needed)
            const igst = (netValue * 0.18).toFixed(2)
            const cgst = (netValue * 0.09).toFixed(2)
            const sgst = (netValue * 0.09).toFixed(2)

            setFormState(prev => ({
                ...prev,
                integratedTax: prev.integratedTax || igst,
                centralTax: prev.centralTax || cgst,
                stateTax: prev.stateTax || sgst
            }))
        }
    }, [formState.netValue])

    // Validate fields when they change and have been touched
    useEffect(() => {
        const newErrors = { ...errors }
        let hasChanges = false

        Object.keys(touched).forEach(key => {
            if (touched[key]) {
                const error = validateField(key as keyof EcoOperatorData, formState[key as keyof EcoOperatorData])
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

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target
        setTouched(prev => ({ ...prev, [name]: true }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (viewMode) return

        const { name, value } = e.target
        setFormState(prev => ({
            ...prev,
            [name]: value
        }))
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

    const handleSubmit = () => {
        if (viewMode) {
            setOpen(0)
            return
        }

        if (validateForm()) {
            updateFormState('suppliesThroughEco', formState)
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
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Supplies made through E-Commerce Operators - u/s 52 (TCS)
                    {viewMode && <span className="ml-2 text-gray-500">(View Mode)</span>}
                </h2>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                    {/* GSTIN */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">GSTIN of e-commerce operator <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="gstin"
                            value={formState.gstin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder=""
                            maxLength={15}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.gstin ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.gstin && (
                            <p className="mt-1 text-sm text-red-500">{errors.gstin}</p>
                        )}
                    </div>

                    {/* Legal Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Trade/Legal Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="legalName"
                            value={formState.legalName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.legalName ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.legalName && (
                            <p className="mt-1 text-sm text-red-500">{errors.legalName}</p>
                        )}
                    </div>

                    {/* Net Value */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Net value of supplies (₹) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="netValue"
                                value={formatCurrency(formState.netValue)}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value)
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'netValue',
                                            value: unformattedValue
                                        }
                                    })
                                }}
                                onBlur={handleBlur}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.netValue ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        {errors.netValue && (
                            <p className="mt-1 text-sm text-red-500">{errors.netValue}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                    {/* Integrated Tax */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Integrated tax (₹) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="integratedTax"
                                value={formatCurrency(formState.integratedTax)}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value)
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'integratedTax',
                                            value: unformattedValue
                                        }
                                    })
                                }}
                                onBlur={handleBlur}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.integratedTax ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        {errors.integratedTax && (
                            <p className="mt-1 text-sm text-red-500">{errors.integratedTax}</p>
                        )}
                    </div>

                    {/* Central Tax */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Central tax (₹) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="centralTax"
                                value={formatCurrency(formState.centralTax)}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value)
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'centralTax',
                                            value: unformattedValue
                                        }
                                    })
                                }}
                                onBlur={handleBlur}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.centralTax ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        {errors.centralTax && (
                            <p className="mt-1 text-sm text-red-500">{errors.centralTax}</p>
                        )}
                    </div>

                    {/* State Tax */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">State/UT tax (₹) <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="stateTax"
                                value={formatCurrency(formState.stateTax)}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value)
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'stateTax',
                                            value: unformattedValue
                                        }
                                    })
                                }}
                                onBlur={handleBlur}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.stateTax ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        {errors.stateTax && (
                            <p className="mt-1 text-sm text-red-500">{errors.stateTax}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                    {/* Cess */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Cess (₹)</label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="cess"
                                value={formatCurrency(formState.cess)}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value)
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'cess',
                                            value: unformattedValue
                                        }
                                    })
                                }}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : 'border-gray-300'
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setOpen(0)}
                    >
                        {viewMode ? 'Close' : 'Back'}
                    </button>
                    {!viewMode && (
                        <button
                            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${Object.values(errors).some(error => error !== '') ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            onClick={handleSubmit}
                            disabled={Object.values(errors).some(error => error !== '')}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default SuppliesThroughEco