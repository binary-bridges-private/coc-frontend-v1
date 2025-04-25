import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'

// Define consistent input classes
const inputClass = "w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
const disabledInputClass = "w-full p-2 text-sm bg-gray-100 border border-gray-200 rounded-md text-gray-600"

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: any
    updateFormState: (slug: string, data: any) => void
    period: {
        financialYear: string;
        quarter: string;
        month: string;
        monthName: string;
    };
    viewMode?: boolean;
}

const CreditUnregistered: React.FC<Props> = ({ setOpen, formData, updateFormState, viewMode = false }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState({
        isDifferentialTax: false,
        type: '',
        noteNumber: '',
        noteDate: '',
        noteValue: '',
        noteType: '',
        pos: '',
        supplyType: '',
        source: '',
        irn: '',
        irnDate: '',
        taxableValues: {},
        cessValues: {},
        ...formData
    });

    const [errors, setErrors] = useState({
        type: '',
        noteNumber: '',
        noteDate: '',
        noteValue: '',
        noteType: '',
        pos: ''
    });

    const [touched, setTouched] = useState({
        type: false,
        noteNumber: false,
        noteDate: false,
        noteValue: false,
        noteType: false,
        pos: false
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];
    const noteTypes = ['Credit', 'Debit'];
    const supplyTypes = ['B2CL', 'Exports with payment', 'Exports without payment'];

    useEffect(() => {
        // Validate all touched fields whenever formState changes
        const newErrors = { ...errors };
        let hasChanges = false;

        Object.keys(touched).forEach(key => {
            if (touched[key]) {
                const error = validateField(key, formState[key]);
                if (error !== errors[key]) {
                    newErrors[key] = error;
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            setErrors(newErrors);
        }
    }, [formState, touched]);

    const validateField = (name: string, value: string) => {
        if (!value?.trim()) {
            return 'This field is required';
        }
        
        switch (name) {
            case 'noteValue':
                if (isNaN(Number(value)) || Number(value) < 0) {
                    return 'Must be a valid positive number';
                }
                break;
            case 'noteNumber':
                if (value.length > 16) {
                    return 'Max 16 characters allowed';
                }
                if (!/^[a-zA-Z0-9/-]+$/.test(value)) {
                    return 'Only alphanumeric, hyphens and slashes allowed';
                }
                break;
            case 'noteDate':
                if (new Date(value) > new Date()) {
                    return 'Date cannot be in the future';
                }
                break;
        }
        
        return '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (viewMode) return;
        
        const { name, value, type } = e.target as HTMLInputElement;
        
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleTaxableValueChange = (rate: number, value: string) => {
        if (viewMode) return;
        
        const numValue = isNaN(parseFloat(value)) ? '' : parseFloat(value);
        setFormState(prev => ({
            ...prev,
            taxableValues: {
                ...prev.taxableValues,
                [rate]: numValue,
            }
        }));
    };

    const handleCessValueChange = (rate: number, value: string) => {
        if (viewMode) return;
        
        const numValue = isNaN(parseFloat(value)) ? '' : parseFloat(value);
        setFormState(prev => ({
            ...prev,
            cessValues: {
                ...prev.cessValues,
                [rate]: numValue,
            }
        }));
    };

    const calculateTax = (rate: number, value: number) => {
        if (!value) return '0.00';
        const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
        return ((value * applicableRate) / 100).toFixed(2);
    };

    const validateForm = () => {
        const newTouched = {
            type: true,
            noteNumber: true,
            noteDate: true,
            noteValue: true,
            noteType: true,
            pos: true
        };
        setTouched(newTouched);

        const newErrors = {
            type: validateField('type', formState.type),
            noteNumber: validateField('noteNumber', formState.noteNumber),
            noteDate: validateField('noteDate', formState.noteDate),
            noteValue: validateField('noteValue', formState.noteValue),
            noteType: validateField('noteType', formState.noteType),
            pos: validateField('pos', formState.pos)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = () => {
        if (viewMode) {
            setOpen(0);
            return;
        }
        
        if (validateForm()) {
            updateFormState('creditUnregistered', formState);
            setOpen(0);
        }
    };

    const formatCurrency = (value: string | number) => {
        if (value === '' || value === null || value === undefined) return '';
        const num = typeof value === 'string' ? parseFloat(value) : value;
        return new Intl.NumberFormat('en-IN', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    };

    const parseCurrency = (value: string) => {
        return value.replace(/,/g, '');
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Credit/Debit Notes (Unregistered)</h3>
            <div className="my-2 border-t border-gray-200" />
            
            {/* Differential Tax Section */}
            <div className="grid items-center grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                <label className={`flex items-center space-x-2 text-sm ${viewMode ? 'text-gray-600' : 'text-gray-700'}`}>
                    <input
                        type="checkbox"
                        name="isDifferentialTax"
                        checked={formState.isDifferentialTax}
                        onChange={handleChange}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            viewMode ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={viewMode}
                    />
                    <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
                </label>

                {formState.isDifferentialTax && (
                    <div className="flex items-center justify-end">
                        <label className="mr-2 text-sm text-gray-600">Applicable % of Tax Rate</label>
                        <div className="w-16 p-1 text-center bg-gray-100 border border-gray-300 rounded-md">
                            65%
                        </div>
                    </div>
                )}
            </div>

            {/* Note Information */}
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Type *</label>
                    {viewMode ? (
                        <div className={disabledInputClass}>
                            {formState.type || '-'}
                        </div>
                    ) : (
                        <div className="relative">
                            <select 
                                name="type"
                                value={formState.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${inputClass} ${errors.type ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                            >
                                <option value="">Select type</option>
                                {supplyTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.type && touched.type && (
                                <p className="mt-1 text-xs text-red-600">{errors.type}</p>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Debit/Credit Note No. *</label>
                    <input 
                        type="text" 
                        name="noteNumber"
                        value={formState.noteNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Note number" 
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.noteNumber ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.noteNumber && touched.noteNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.noteNumber}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Debit/Credit Note Date *</label>
                    <input 
                        type="date" 
                        name="noteDate"
                        value={formState.noteDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        max={new Date().toISOString().split('T')[0]}
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.noteDate ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.noteDate && touched.noteDate && (
                        <p className="mt-1 text-xs text-red-600">{errors.noteDate}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Note value (₹) *</label>
                    {viewMode ? (
                        <div className={disabledInputClass}>
                            {formState.noteValue ? `₹${formatCurrency(formState.noteValue)}` : '-'}
                        </div>
                    ) : (
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input 
                                type="text" 
                                name="noteValue"
                                value={formatCurrency(formState.noteValue)}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value);
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'noteValue',
                                            value: unformattedValue
                                        }
                                    });
                                }}
                                onBlur={handleBlur}
                                placeholder="0.00" 
                                className={`${inputClass} pl-8 ${errors.noteValue ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                            />
                            {errors.noteValue && touched.noteValue && (
                                <p className="mt-1 text-xs text-red-600">{errors.noteValue}</p>
                            )}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Note Type *</label>
                    {viewMode ? (
                        <div className={disabledInputClass}>
                            {formState.noteType || '-'}
                        </div>
                    ) : (
                        <div className="relative">
                            <select 
                                name="noteType"
                                value={formState.noteType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${inputClass} ${errors.noteType ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                            >
                                <option value="">Select type</option>
                                {noteTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            {errors.noteType && touched.noteType && (
                                <p className="mt-1 text-xs text-red-600">{errors.noteType}</p>
                            )}
                        </div>
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

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Supply Type</label>
                    <input 
                        type="text" 
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        placeholder="Supply type" 
                        className={viewMode ? disabledInputClass : inputClass}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Source</label>
                    <input 
                        type="text" 
                        name="source"
                        value={formState.source}
                        onChange={handleChange}
                        placeholder="Source" 
                        className={viewMode ? disabledInputClass : inputClass}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">IRN</label>
                    <input 
                        type="text" 
                        name="irn"
                        value={formState.irn}
                        onChange={handleChange}
                        placeholder="Invoice Reference Number" 
                        className={viewMode ? disabledInputClass : inputClass}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">IRN date</label>
                    <input 
                        type="date" 
                        name="irnDate"
                        value={formState.irnDate}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className={viewMode ? disabledInputClass : inputClass}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            <h2 className="pb-2 mt-8 text-lg font-semibold text-gray-800 border-b border-gray-200">
                Item Details
            </h2>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Rate (%)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Taxable Value (₹)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Amount of Tax (₹)</th>
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
                                            {formState.taxableValues[rate] ? formatCurrency(formState.taxableValues[rate]) : '0.00'}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <span className="absolute text-sm text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                            <input
                                                type="text"
                                                value={formatCurrency(formState.taxableValues[rate] || '')}
                                                onChange={(e) => handleTaxableValueChange(rate, parseCurrency(e.target.value))}
                                                className={`${inputClass} pl-8 text-center`}
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="p-3 text-sm text-center text-gray-700 border border-gray-200">
                                    ₹{calculateTax(rate, formState.taxableValues[rate] || 0)}
                                </td>
                                <td className="p-3 text-center border border-gray-200">
                                    {viewMode ? (
                                        <div className={disabledInputClass}>
                                            {formState.cessValues[rate] ? formatCurrency(formState.cessValues[rate]) : '0.00'}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <span className="absolute text-sm text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                            <input
                                                type="text"
                                                value={formatCurrency(formState.cessValues[rate] || '')}
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
    );
};

export default CreditUnregistered;