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

    // const parseCurrency = (value: string) => {
    //     return value.replace(/,/g, '');
    // };

    return (
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Credit/Debit Notes (Unregistered)
                    {viewMode && <span className="ml-2 text-gray-500">(View Mode)</span>}
                </h2>
            </div>
            <div className="p-4">
                <div>
                    {/* Differential Tax Section - matching Place component styling */}
                    <div className="grid items-center grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                        <label className="flex items-center space-x-2 text-sm font-medium">
                            <input
                                type="checkbox"
                                name="isDifferentialTax"
                                checked={formState.isDifferentialTax}
                                onChange={handleChange}
                                className="checkbox checkbox-primary"
                                disabled={viewMode}
                            />
                            <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
                        </label>

                        {formState.isDifferentialTax && (
                            <div className="flex items-center justify-end">
                                <label className="mr-2 text-sm font-medium">Applicable % of Tax Rate</label>
                                <div className="w-16 p-2 text-center bg-gray-100 border border-gray-300 rounded-md">
                                    65%
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Note Information - matching Place component styling */}
                    <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Type *</label>
                            {viewMode ? (
                                <div className="w-full p-3 bg-gray-100 border rounded-md">
                                    {formState.type || '-'}
                                </div>
                            ) : (
                                <select
                                    name="type"
                                    value={formState.type}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.type ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select type</option>
                                    {supplyTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            )}
                            {errors.type && (
                                <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Debit/Credit Note No. *</label>
                            <input
                                type="text"
                                name="noteNumber"
                                value={formState.noteNumber}
                                onChange={handleChange}
                                placeholder="Note number"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteNumber ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.noteNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.noteNumber}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Debit/Credit Note Date *</label>
                            <input
                                type="date"
                                name="noteDate"
                                value={formState.noteDate}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteDate ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.noteDate && (
                                <p className="mt-1 text-sm text-red-500">{errors.noteDate}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Note value (₹) *</label>
                            {viewMode ? (
                                <div className="w-full p-3 bg-gray-100 border rounded-md">
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
                                            // const unformattedValue = parseCurrency(e.target.value);
                                            handleChange({
                                                ...e,
                                                target: {
                                                    ...e.target,
                                                    name: 'noteValue',
                                                    value: e.target.value
                                                }
                                            });
                                        }}
                                        placeholder="0.00"
                                        className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteValue ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.noteValue && (
                                        <p className="mt-1 text-sm text-red-500">{errors.noteValue}</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Note Type *</label>
                            {viewMode ? (
                                <div className="w-full p-3 bg-gray-100 border rounded-md">
                                    {formState.noteType || '-'}
                                </div>
                            ) : (
                                <select
                                    name="noteType"
                                    value={formState.noteType}
                                    onChange={handleChange}
                                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteType ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Select type</option>
                                    {noteTypes.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            )}
                            {errors.noteType && (
                                <p className="mt-1 text-sm text-red-500">{errors.noteType}</p>
                            )}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">POS *</label>
                            <input
                                type="text"
                                name="pos"
                                value={formState.pos}
                                onChange={handleChange}
                                placeholder="Place of supply"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pos ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.pos && (
                                <p className="mt-1 text-sm text-red-500">{errors.pos}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Supply Type</label>
                            <input
                                type="text"
                                name="supplyType"
                                value={formState.supplyType}
                                onChange={handleChange}
                                placeholder="Supply type"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Source</label>
                            <input
                                type="text"
                                name="source"
                                value={formState.source}
                                onChange={handleChange}
                                placeholder="Source"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">IRN</label>
                            <input
                                type="text"
                                name="irn"
                                value={formState.irn}
                                onChange={handleChange}
                                placeholder="Invoice Reference Number"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">IRN date</label>
                            <input
                                type="date"
                                name="irnDate"
                                value={formState.irnDate}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                    </div>

                    {/* Item Details Table - matching Place component styling */}
                    <h2 className="pb-2 mt-8 text-lg font-semibold border-b border-gray-200">
                        Item Details
                    </h2>
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
                                    <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
                                    <th className="p-3 font-medium text-center border border-gray-300">Amount of Tax (₹)</th>
                                    <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxRates.map((rate, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="p-3 text-center border border-gray-300">{rate}%</td>
                                        <td className="p-3 text-center border border-gray-300">
                                            {viewMode ? (
                                                <div className="w-full p-2 text-center bg-gray-100 rounded-md">
                                                    {formState.taxableValues[rate] ? formatCurrency(formState.taxableValues[rate]) : '0.00'}
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                                    <input
                                                        type="text"
                                                        value={formatCurrency(formState.taxableValues[rate] || '')}
                                                        onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                                        className="w-full p-2 pl-8 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            ₹{calculateTax(rate, formState.taxableValues[rate] || 0)}
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            {viewMode ? (
                                                <div className="w-full p-2 text-center bg-gray-100 rounded-md">
                                                    {formState.cessValues[rate] ? formatCurrency(formState.cessValues[rate]) : '0.00'}
                                                </div>
                                            ) : (
                                                <div className="relative">
                                                    <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                                    <input
                                                        type="text"
                                                        value={formatCurrency(formState.cessValues[rate] || '')}
                                                        onChange={(e) => handleCessValueChange(rate, e.target.value)}
                                                        className="w-full p-2 pl-8 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons - EXACTLY matching Place component */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => setOpen(0)}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            {viewMode ? 'Close' : 'Cancel'}
                        </button>
                        {!viewMode && (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                disabled={Object.values(errors).some(error => error !== '')}
                            >
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreditUnregistered;