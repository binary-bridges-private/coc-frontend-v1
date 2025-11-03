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

// Official GST validation functions
const validateGSTIN = (gstin: string): boolean => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
};

const validateUIN = (uin: string): boolean => {
    const uinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return uinRegex.test(uin);
};

const validatePOS = (pos: string): boolean => {
    const posRegex = /^[0-9]{2}$/;
    return posRegex.test(pos);
};

const B2b: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useAppDispatch()

    console.log(formData);

    const [formState, setFormState] = useState({
        // Official GSTR-1 B2B Fields
        deemedExports: false,
        sezWithPayment: false,
        sezWithoutPayment: false,
        reverseCharge: false,
        intraStateIGST: false,
        isDifferentialTax: false,
        recipientGSTIN: '', // 15-character GSTIN/UIN
        recipientName: '', // Legal name of recipient
        masterName: '', // Name as in master data
        invoiceNo: '', // Invoice number (max 16 characters)
        invoiceDate: '', // Invoice date
        totalValue: '', // Total invoice value
        pos: '', // Place of Supply (2-digit state code)
        supplyType: '', // Type of supply
        source: '', // Source of data
        irn: '', // Invoice Registration Number
        irnDate: '', // IRN date
        // Tax details as per official format
        taxableValues: {}, // Taxable value for each tax rate
        cessValues: {}, // Cess amount for each tax rate
        // Additional official fields
        documentType: 'INV', // Document type (INV, CRN, DBN, etc.)
        documentNo: '', // Document number
        documentDate: '', // Document date
        invoiceType: 'R', // Invoice type (R- Regular, SEZWP- SEZ with payment, SEZWOP- SEZ without payment, DE- Deemed Export)
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

    // Official GST tax rates as per GSTR-1
    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];
    
    // Official state codes for POS validation
    const stateCodes = [
        { code: '01', name: 'Jammu and Kashmir' },
        { code: '02', name: 'Himachal Pradesh' },
        { code: '03', name: 'Punjab' },
        { code: '04', name: 'Chandigarh' },
        { code: '05', name: 'Uttarakhand' },
        { code: '06', name: 'Haryana' },
        { code: '07', name: 'Delhi' },
        { code: '08', name: 'Rajasthan' },
        { code: '09', name: 'Uttar Pradesh' },
        { code: '10', name: 'Bihar' },
        { code: '11', name: 'Sikkim' },
        { code: '12', name: 'Arunachal Pradesh' },
        { code: '13', name: 'Nagaland' },
        { code: '14', name: 'Manipur' },
        { code: '15', name: 'Mizoram' },
        { code: '16', name: 'Tripura' },
        { code: '17', name: 'Meghalaya' },
        { code: '18', name: 'Assam' },
        { code: '19', name: 'West Bengal' },
        { code: '20', name: 'Jharkhand' },
        { code: '21', name: 'Odisha' },
        { code: '22', name: 'Chhattisgarh' },
        { code: '23', name: 'Madhya Pradesh' },
        { code: '24', name: 'Gujarat' },
        { code: '25', name: 'Daman and Diu' },
        { code: '26', name: 'Dadra and Nagar Haveli' },
        { code: '27', name: 'Maharashtra' },
        { code: '28', name: 'Andhra Pradesh' },
        { code: '29', name: 'Karnataka' },
        { code: '30', name: 'Goa' },
        { code: '31', name: 'Lakshadweep' },
        { code: '32', name: 'Kerala' },
        { code: '33', name: 'Tamil Nadu' },
        { code: '34', name: 'Puducherry' },
        { code: '35', name: 'Andaman and Nicobar Islands' },
        { code: '36', name: 'Telangana' },
        { code: '37', name: 'Andhra Pradesh' }
    ];

    const validateField = (name: string, value: string) => {
        if (viewMode) return ''; // Skip validation in view mode

        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else {
            switch (name) {
                case 'recipientGSTIN':
                    if (!validateGSTIN(value) && !validateUIN(value)) {
                        error = 'Invalid GSTIN/UIN format (15 characters: 2+5+4+1+1+1+1)';
                    }
                    break;
                case 'pos':
                    if (!validatePOS(value)) {
                        error = 'Invalid POS code (2-digit state code required)';
                    }
                    break;
                case 'invoiceNo':
                    if (value.length > 16) {
                        error = 'Invoice number cannot exceed 16 characters';
                    }
                    break;
                case 'totalValue':
                    if (isNaN(Number(value)) || Number(value) < 0) {
                        error = 'Must be a valid positive number';
                    }
                    break;
                case 'recipientName':
                    if (value.trim().length < 2) {
                        error = 'Recipient name must be at least 2 characters';
                    }
                    break;
                case 'invoiceDate':
                    const invoiceDate = new Date(value);
                    const currentDate = new Date();
                    if (invoiceDate > currentDate) {
                        error = 'Invoice date cannot be in the future';
                    }
                    break;
            }
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    // Check if it's inter-state supply (IGST applicable)
    const isInterStateSupply = () => {
        // This should be determined based on supplier and recipient state codes
        // For now, using a simple logic based on POS
        return formState.pos && formState.pos !== '27'; // Assuming 27 is Maharashtra
    };

    const getTaxBreakdown = (rate: number, value: number) => {
        const totalTax = calculateTax(rate, value);
        if (isInterStateSupply()) {
            // IGST applicable
            return {
                igst: totalTax,
                cgst: '0.00',
                sgst: '0.00'
            };
        } else {
            // CGST + SGST applicable
            const cgstSgst = (parseFloat(totalTax) / 2).toFixed(2);
            return {
                igst: '0.00',
                cgst: cgstSgst,
                sgst: cgstSgst
            };
        }
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
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    GSTR-1 Table 4A: B2B, SEZ, DE - {viewMode ? 'View' : 'Add'} Invoice
                </h2>
                <p className="text-blue-100 mt-2">
                    Details of outward supplies made to registered persons (including supplies made to SEZ unit/developer)
                </p>
            </div>
            <div>
                {/* Checkbox Grid - styled like Place component */}
                <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            name="deemedExports"
                            checked={formState.deemedExports}
                            onChange={handleChange}
                            className="checkbox checkbox-primary"
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
                            className="checkbox checkbox-primary"
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
                            className="checkbox checkbox-primary"
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
                            className="checkbox checkbox-primary"
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
                            className="checkbox checkbox-primary"
                            disabled={viewMode}
                        />
                        <span>Intra-State Supplies attracting IGST</span>
                    </label>
                </div>

                {/* Differential Tax Section - matches Place component styling */}
                <div className="grid items-center grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                    <label className="flex items-center space-x-2 text-sm font-medium">
                        <input
                            type="checkbox"
                            name="isDifferentialTax"
                            checked={formState.isDifferentialTax}
                            onChange={handleChange}
                            className="checkbox checkbox-primary"
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

                {/* Input fields with same styling as Place component */}
                <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Recipient GSTIN/UIN *</label>
                        <input
                            type="text"
                            name="recipientGSTIN"
                            value={formState.recipientGSTIN}
                            onChange={handleChange}
                            placeholder="Recipient GSTIN/UIN"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.recipientGSTIN ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.recipientGSTIN && <p className="mt-1 text-sm text-red-500">{errors.recipientGSTIN}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Recipient Name *</label>
                        <input
                            type="text"
                            name="recipientName"
                            value={formState.recipientName}
                            onChange={handleChange}
                            placeholder="Recipient Name"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.recipientName ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.recipientName && <p className="mt-1 text-sm text-red-500">{errors.recipientName}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Name as in Master</label>
                        <input
                            type="text"
                            name="masterName"
                            value={formState.masterName}
                            onChange={handleChange}
                            placeholder="Name as in Master"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                }`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                    </div>
                </div>

                {/* More input fields with consistent styling */}
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
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

                {/* Additional fields */}
                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Place of Supply (POS) *</label>
                        <select
                            name="pos"
                            value={formState.pos}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pos ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                        >
                            <option value="">Select POS</option>
                            {stateCodes.map(state => (
                                <option key={state.code} value={state.code}>
                                    {state.code} - {state.name}
                                </option>
                            ))}
                        </select>
                        {errors.pos && <p className="mt-1 text-sm text-red-500">{errors.pos}</p>}
                    </div>
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
                            placeholder="IRN"
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
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                                }`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                    </div>
                </div>

                {/* Official GSTR-1 Tax Rate Wise Details Table */}
                <h2 className="pb-2 mt-10 text-lg font-semibold">Tax Rate Wise Details</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-blue-50">
                                <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
                                <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
                                <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
                                <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
                                <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
                                <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxRates.map((rate, index) => {
                                const taxableValue = Number(formState.taxableValues[rate]) || 0;
                                const taxBreakdown = getTaxBreakdown(rate, taxableValue);
                                
                                return (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="p-3 text-center border border-gray-300 font-medium">{rate}%</td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formState.taxableValues[rate] || ''}
                                                onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                                className="w-[90%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                                disabled={viewMode}
                                                readOnly={viewMode}
                                                placeholder="0.00"
                                            />
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <span className={`font-medium ${taxBreakdown.igst !== '0.00' ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {taxBreakdown.igst}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <span className={`font-medium ${taxBreakdown.cgst !== '0.00' ? 'text-green-600' : 'text-gray-400'}`}>
                                                {taxBreakdown.cgst}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <span className={`font-medium ${taxBreakdown.sgst !== '0.00' ? 'text-green-600' : 'text-gray-400'}`}>
                                                {taxBreakdown.sgst}
                                            </span>
                                        </td>
                                        <td className="p-3 text-center border border-gray-300">
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={formState.cessValues[rate] || ''}
                                                onChange={(e) => handleCessValueChange(rate, e.target.value)}
                                                className="w-[90%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                                disabled={viewMode}
                                                readOnly={viewMode}
                                                placeholder="0.00"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {/* Official Instructions */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Instructions:</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• GSTIN should be 15 characters long</li>
                        <li>• Invoice number cannot exceed 16 characters</li>
                        <li>• Place of Supply should be selected from the dropdown</li>
                        <li>• Tax amounts are calculated automatically based on taxable value and tax rate</li>
                        <li>• For SEZ supplies, select appropriate checkbox</li>
                        <li>• For reverse charge supplies, select the reverse charge checkbox</li>
                    </ul>
                </div>

                {/* Action Buttons - matches Place component styling */}
                <div className="flex justify-end gap-4 mt-6">
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
                        onClick={handleSubmit}
                        className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${viewMode ? 'bg-gray-500 hover:bg-gray-600' : ''
                            }`}
                    >
                        {viewMode ? 'Close' : 'Save'}
                    </button>
                </div>
            </div>

        </>
    );
};

export default B2b;