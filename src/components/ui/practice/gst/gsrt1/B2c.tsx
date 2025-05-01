import React, { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: any;
    updateFormState: (slug: string, data: any) => void;
    period: {
        financialYear: string;
        quarter: string;
        month: string;
        monthName: string;
    };
    viewMode?: boolean;
}

interface TaxValues {
    [rate: number]: number;
}

interface FormState {
    isDifferentialTax: boolean;
    pos: string;
    invoiceNo: string;
    invoiceDate: string;
    supplyType: string;
    totalValue: string;
    taxableValues: TaxValues;
    cessValues: TaxValues;
}

const B2c: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState<FormState>({
        isDifferentialTax: false,
        pos: '',
        invoiceNo: '',
        invoiceDate: '',
        supplyType: '',
        totalValue: '',
        taxableValues: {},
        cessValues: {},
        ...formData
    });

    const [errors, setErrors] = useState({
        pos: '',
        invoiceNo: '',
        invoiceDate: '',
        totalValue: ''
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

    const validateField = (name: string, value: string) => {
        if (viewMode) return ''; // Skip validation in view mode

        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (name === 'totalValue' && isNaN(Number(value))) {
            error = 'Must be a valid number';
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (viewMode) return; // Don't allow changes in view mode

        const { name, value, type, checked } = e.target;

        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Validate on change
        if (['pos', 'invoiceNo', 'invoiceDate', 'totalValue'].includes(name)) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const handleTaxableValueChange = (rate: number, value: string) => {
        if (viewMode) return; // Don't allow changes in view mode

        setFormState(prev => ({
            ...prev,
            taxableValues: {
                ...prev.taxableValues,
                [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
            }
        }));
    };

    const handleCessValueChange = (rate: number, value: string) => {
        if (viewMode) return; // Don't allow changes in view mode

        setFormState(prev => ({
            ...prev,
            cessValues: {
                ...prev.cessValues,
                [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
            }
        }));
    };

    const calculateTax = (rate: number, value: number) => {
        const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
        return ((value * applicableRate) / 100).toFixed(2);
    };

    const validateForm = () => {
        if (viewMode) return true; // Skip validation in view mode

        const newErrors = {
            pos: validateField('pos', formState.pos),
            invoiceNo: validateField('invoiceNo', formState.invoiceNo),
            invoiceDate: validateField('invoiceDate', formState.invoiceDate),
            totalValue: validateField('totalValue', formState.totalValue)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = () => {
        if (viewMode) {
            setOpen(0); // Just close the form if in view mode
            return;
        }

        if (validateForm()) {
            updateFormState('b2c', formState);
            setOpen(0);
        }
    };

    return (
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    B2C(Large) Invoices - {viewMode ? 'View' : 'Edit'} Details
                </h2>
            </div>
            <div>

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
                                <input
                                    type="text"
                                    value="65%"
                                    className="w-16 p-1 text-center bg-gray-100 border border-gray-300 rounded-md"
                                    readOnly
                                />
                            </div>
                        )}
                    </div>

                    {/* Invoice Information - matching Place component styling */}
                    <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">POS *</label>
                            <input
                                type="text"
                                name="pos"
                                value={formState.pos}
                                onChange={handleChange}
                                placeholder="POS"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pos ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.pos && <p className="mt-1 text-sm text-red-500">{errors.pos}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Invoice no. *</label>
                            <input
                                type="text"
                                name="invoiceNo"
                                value={formState.invoiceNo}
                                onChange={handleChange}
                                placeholder="Invoice no."
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.invoiceNo ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.invoiceNo && <p className="mt-1 text-sm text-red-500">{errors.invoiceNo}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Invoice date *</label>
                            <input
                                type="date"
                                name="invoiceDate"
                                value={formState.invoiceDate}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.invoiceDate ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.invoiceDate && <p className="mt-1 text-sm text-red-500">{errors.invoiceDate}</p>}
                        </div>
                    </div>

                    {/* Additional Information - matching Place component styling */}
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Supply Type</label>
                            <input
                                type="text"
                                name="supplyType"
                                value={formState.supplyType}
                                onChange={handleChange}
                                placeholder="Supply Type"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Total invoice value (₹) *</label>
                            <input
                                type="text"
                                name="totalValue"
                                value={formState.totalValue}
                                onChange={handleChange}
                                placeholder="Total invoice value (₹)"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.totalValue ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.totalValue && <p className="mt-1 text-sm text-red-500">{errors.totalValue}</p>}
                        </div>
                    </div>

                    {/* Item Details Table - matching Place component styling */}
                    <h2 className="pb-2 mt-6 text-lg font-semibold">Item Details</h2>
                    <div className="overflow-x-auto">
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
                                            <input
                                                type="number"
                                                value={formState.taxableValues[rate] || ''}
                                                onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                                className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                                disabled={viewMode}
                                                readOnly={viewMode}
                                            />
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            {calculateTax(rate, formState.taxableValues[rate] || 0)}
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                value={formState.cessValues[rate] || ''}
                                                onChange={(e) => handleCessValueChange(rate, e.target.value)}
                                                className="w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                                disabled={viewMode}
                                                readOnly={viewMode}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons - matching Place component styling */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={() => setOpen(0)}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`px-6 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700 ${viewMode ? 'bg-gray-500' : 'bg-blue-600'
                                }`}
                        >
                            {viewMode ? 'Close' : 'Save'}
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default B2c;