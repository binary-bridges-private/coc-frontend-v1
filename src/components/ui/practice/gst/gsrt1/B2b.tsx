import React, { Dispatch, SetStateAction, useState } from 'react'
import { GSTR1B2B, updateB2B } from '../../../../../store/slices/gstr1Slice.ts';
import { useAppDispatch } from "../../../../../store/hooks.ts"

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: GSTR1B2B
    updateFormState: (slug: string, data: any) => void
    period: {
        financialYear: string;
        quarter: string;
        month: string;
        monthName: string;
    };
    viewMode?: boolean;
}

const B2b: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch()

    console.log(formData);

    const [formState, setFormState] = useState({
        deemedExports: false,
        sezWithPayment: false,
        sezWithoutPayment: false,
        reverseCharge: false,
        intraStateIGST: false,
        isDifferentialTax: false,
        recipientGSTIN: '',
        recipientName: '',
        masterName: '',
        invoiceNo: '',
        invoiceDate: '',
        totalValue: '',
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
        recipientGSTIN: '',
        recipientName: '',
        invoiceNo: '',
        invoiceDate: '',
        totalValue: '',
        pos: ''
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

    const validateField = (name: string, value: string) => {
        if (viewMode) return ''; // Skip validation in view mode
        
        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (name === 'totalValue' && isNaN(Number(value))) {
            error = 'Must be a valid number';
        } else if (name === 'recipientGSTIN' && !/^[0-9A-Z]{15}$/.test(value)) {
            error = 'Invalid GSTIN format';
        } else if (name === 'invoiceNo' && value.length > 16) {
            error = 'Max 16 characters allowed';
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

        // Validate on change for required fields
        if (['recipientGSTIN', 'recipientName', 'invoiceNo', 'invoiceDate', 'totalValue', 'pos'].includes(name)) {
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
            recipientGSTIN: validateField('recipientGSTIN', formState.recipientGSTIN),
            recipientName: validateField('recipientName', formState.recipientName),
            invoiceNo: validateField('invoiceNo', formState.invoiceNo),
            invoiceDate: validateField('invoiceDate', formState.invoiceDate),
            totalValue: validateField('totalValue', formState.totalValue),
            pos: validateField('pos', formState.pos)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (viewMode) {
            setOpen(0); // Just close the form if in view mode
            return;
        }

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const b2bData: GSTR1B2B = {
                ...formState,
                taxableValues: formState.taxableValues,
                cessValues: formState.cessValues
            };

            dispatch(updateB2B(b2bData));
            updateFormState('b2b', b2bData);
            setOpen(0);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">B2B, SEZ, DE - {viewMode ? 'View' : 'Add'} Invoice</h3>
            <div className='border' />

            {/* Checkbox Grid */}
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="deemedExports"
                        checked={formState.deemedExports}
                        onChange={handleChange}
                        className="checkbox"
                        disabled={viewMode}
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
                        disabled={viewMode}
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
                        disabled={viewMode}
                    />
                    <span>SEZ Supplies without payment</span>
                </label>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="reverseCharge"
                        checked={formState.reverseCharge}
                        onChange={handleChange}
                        className="checkbox"
                        disabled={viewMode}
                    />
                    <span>Supply attract reverse charge</span>
                </label>
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="intraStateIGST"
                        checked={formState.intraStateIGST}
                        onChange={handleChange}
                        className="checkbox"
                        disabled={viewMode}
                    />
                    <span>Intra-State Supplies attracting IGST</span>
                </label>
            </div>

            {/* Differential Tax Section */}
            <div className="grid items-center grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="isDifferentialTax"
                        checked={formState.isDifferentialTax}
                        onChange={handleChange}
                        className="checkbox"
                        disabled={viewMode}
                    />
                    <span>Differential tax percentage</span>
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

            {/* Recipient Information */}
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Recipient GSTIN/UIN *</label>
                    <input
                        type="text"
                        name="recipientGSTIN"
                        value={formState.recipientGSTIN}
                        onChange={handleChange}
                        placeholder="Recipient GSTIN/UIN"
                        className={`w-full text-sm font-medium input input-bordered ${errors.recipientGSTIN ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.recipientGSTIN && <p className="mt-1 text-sm text-red-500">{errors.recipientGSTIN}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Recipient Name *</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formState.recipientName}
                        onChange={handleChange}
                        placeholder="Recipient Name"
                        className={`w-full text-sm font-medium input input-bordered ${errors.recipientName ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.recipientName && <p className="mt-1 text-sm text-red-500">{errors.recipientName}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Name as in Master</label>
                    <input
                        type="text"
                        name="masterName"
                        value={formState.masterName}
                        onChange={handleChange}
                        placeholder="Name as in Master"
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            {/* Invoice Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Invoice no. *</label>
                    <input
                        type="text"
                        name="invoiceNo"
                        value={formState.invoiceNo}
                        onChange={handleChange}
                        placeholder="Invoice no."
                        className={`w-full text-sm font-medium input input-bordered ${errors.invoiceNo ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.invoiceNo && <p className="mt-1 text-sm text-red-500">{errors.invoiceNo}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Invoice date *</label>
                    <input
                        type="date"
                        name="invoiceDate"
                        value={formState.invoiceDate}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.invoiceDate ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.invoiceDate && <p className="mt-1 text-sm text-red-500">{errors.invoiceDate}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Total invoice value (₹) *</label>
                    <input
                        type="text"
                        name="totalValue"
                        value={formState.totalValue}
                        onChange={handleChange}
                        placeholder="Total invoice value (₹)"
                        className={`w-full text-sm font-medium input input-bordered ${errors.totalValue ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.totalValue && <p className="mt-1 text-sm text-red-500">{errors.totalValue}</p>}
                </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">POS *</label>
                    <input
                        type="text"
                        name="pos"
                        value={formState.pos}
                        onChange={handleChange}
                        placeholder="POS"
                        className={`w-full text-sm font-medium input input-bordered ${errors.pos ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.pos && <p className="mt-1 text-sm text-red-500">{errors.pos}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Supply Type</label>
                    <input
                        type="text"
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        placeholder="Supply Type"
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Source</label>
                    <input
                        type="text"
                        name="source"
                        value={formState.source}
                        onChange={handleChange}
                        placeholder="Source"
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">IRN</label>
                    <input
                        type="text"
                        name="irn"
                        value={formState.irn}
                        onChange={handleChange}
                        placeholder="IRN"
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">IRN date</label>
                    <input
                        type="date"
                        name="irnDate"
                        value={formState.irnDate}
                        onChange={handleChange}
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
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
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        disabled={viewMode}
                                        readOnly={viewMode}
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    {calculateTax(rate, Number(formState.taxableValues[rate]) || 0)}
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        value={formState.cessValues[rate] || ''}
                                        onChange={(e) => handleCessValueChange(rate, e.target.value)}
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        disabled={viewMode}
                                        readOnly={viewMode}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
                <button
                    className="btn btn-outline"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setOpen(0);
                    }}
                >
                    Back
                </button>
                <button
                    className={`btn ${viewMode ? 'btn-outline' : 'bg-[#101C36] text-white'}`}
                    onClick={handleSubmit}
                >
                    {viewMode ? 'Close' : 'Save'}
                </button>
            </div>
        </div>
    );
};

export default B2b;