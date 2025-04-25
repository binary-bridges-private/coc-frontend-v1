// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>
//     formData?: any
//     updateFormState: (slug: string, data: any) => void
//     period: {
//         financialYear: string;
//         quarter: string;
//         month: string;
//         monthName: string;
//     };
//     viewMode: boolean
// }

// const Exports: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {

//     const [formState, setFormState] = useState({
//         invoiceNo: '',
//         invoiceDate: '',
//         portCode: '',
//         shippingBillNo: '',
//         shippingBillDate: '',
//         totalValue: '',
//         supplyType: '',
//         gstPayment: '',
//         source: '',
//         irn: '',
//         irnDate: '',
//         taxableValues: {},
//         cessValues: {},
//         ...formData
//     });

//     const [errors, setErrors] = useState({
//         invoiceNo: '',
//         invoiceDate: '',
//         totalValue: '',
//         gstPayment: ''
//     });

//     const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

//     const validateField = (name: string, value: string) => {
//         let error = '';
//         if (!value.trim()) {
//             error = 'This field is required';
//         } else if (name === 'totalValue' && isNaN(Number(value))) {
//             error = 'Must be a valid number';
//         } else if (name === 'invoiceNo' && value.length > 16) {
//             error = 'Max 16 characters allowed';
//         } else if (name === 'gstPayment' && !['with', 'without'].includes(value.toLowerCase())) {
//             error = 'Must be "with" or "without"';
//         }
//         return error;
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type } = e.target;
        
//         setFormState(prev => ({
//             ...prev,
//             [name]: value
//         }));

//         // Validate on change for required fields
//         if (['invoiceNo', 'invoiceDate', 'totalValue', 'gstPayment'].includes(name)) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value)
//             }));
//         }
//     };

//     const handleTaxableValueChange = (rate: number, value: string) => {
//         setFormState(prev => ({
//             ...prev,
//             taxableValues: {
//                 ...prev.taxableValues,
//                 [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
//             }
//         }));
//     };

//     const handleCessValueChange = (rate: number, value: string) => {
//         setFormState(prev => ({
//             ...prev,
//             cessValues: {
//                 ...prev.cessValues,
//                 [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
//             }
//         }));
//     };

//     const calculateTax = (rate: number, value: number) => {
//         return ((value * rate) / 100).toFixed(2);
//     };

//     const validateForm = () => {
//         const newErrors = {
//             invoiceNo: validateField('invoiceNo', formState.invoiceNo),
//             invoiceDate: validateField('invoiceDate', formState.invoiceDate),
//             totalValue: validateField('totalValue', formState.totalValue),
//             gstPayment: validateField('gstPayment', formState.gstPayment)
//         };

//         setErrors(newErrors);

//         return !Object.values(newErrors).some(error => error !== '');
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             updateFormState('EXP', formState);
//             setOpen(0);
//         }
//     };

//     return (
//         <div>
//             <h3 className="font-semibold text-md">6A - Exports Invoices</h3>
//             <div className='border' />
            
//             {/* Invoice Information */}
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Invoice no. *</label>
//                     <input 
//                         type="text" 
//                         name="invoiceNo"
//                         value={formState.invoiceNo}
//                         onChange={handleChange}
//                         placeholder="Invoice no." 
//                         className={`w-full text-sm font-medium input input-bordered ${errors.invoiceNo ? 'input-error' : ''}`}
//                     />
//                     {errors.invoiceNo && <p className="mt-1 text-sm text-red-500">{errors.invoiceNo}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Invoice date *</label>
//                     <input 
//                         type="date" 
//                         name="invoiceDate"
//                         value={formState.invoiceDate}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.invoiceDate ? 'input-error' : ''}`}
//                     />
//                     {errors.invoiceDate && <p className="mt-1 text-sm text-red-500">{errors.invoiceDate}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Port Code</label>
//                     <input 
//                         type="text" 
//                         name="portCode"
//                         value={formState.portCode}
//                         onChange={handleChange}
//                         placeholder="Port Code" 
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//             </div>

//             {/* Shipping Information */}
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Shipping Bill No./Bill of Export No</label>
//                     <input 
//                         type="text" 
//                         name="shippingBillNo"
//                         value={formState.shippingBillNo}
//                         onChange={handleChange}
//                         placeholder="" 
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Shipping Bill Date/Bill of Export Date</label>
//                     <input 
//                         type="date" 
//                         name="shippingBillDate"
//                         value={formState.shippingBillDate}
//                         onChange={handleChange}
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total invoice value (₹) *</label>
//                     <input 
//                         type="text" 
//                         name="totalValue"
//                         value={formState.totalValue}
//                         onChange={handleChange}
//                         placeholder="Total invoice value (₹)" 
//                         className={`w-full text-sm font-medium input input-bordered ${errors.totalValue ? 'input-error' : ''}`}
//                     />
//                     {errors.totalValue && <p className="mt-1 text-sm text-red-500">{errors.totalValue}</p>}
//                 </div>
//             </div>

//             {/* Additional Information */}
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type</label>
//                     <input 
//                         type="text" 
//                         name="supplyType"
//                         value={formState.supplyType}
//                         onChange={handleChange}
//                         placeholder="" 
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">GST Payment *</label>
//                     <input 
//                         type="text" 
//                         name="gstPayment"
//                         value={formState.gstPayment}
//                         onChange={handleChange}
//                         placeholder="with or without" 
//                         className={`w-full text-sm font-medium input input-bordered ${errors.gstPayment ? 'input-error' : ''}`}
//                     />
//                     {errors.gstPayment && <p className="mt-1 text-sm text-red-500">{errors.gstPayment}</p>}
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Source</label>
//                     <input 
//                         type="text" 
//                         name="source"
//                         value={formState.source}
//                         onChange={handleChange}
//                         placeholder="Source" 
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">IRN</label>
//                     <input 
//                         type="text" 
//                         name="irn"
//                         value={formState.irn}
//                         onChange={handleChange}
//                         placeholder="IRN" 
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">IRN date</label>
//                     <input 
//                         type="date" 
//                         name="irnDate"
//                         value={formState.irnDate}
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
//                             <th className="p-3 font-medium text-center border border-gray-300">Amount of Tax (₹)</th>
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
//                                     {calculateTax(rate, formState.taxableValues[rate] || 0)}
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
//                 <button 
//                     className="btn btn-outline" 
//                     onClick={() => setOpen(0)}
//                 >
//                     Back
//                 </button>
//                 <button 
//                     className="btn bg-[#101C36] text-white" 
//                     onClick={handleSubmit}
//                 >
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Exports;

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
    invoiceNo: string;
    invoiceDate: string;
    portCode: string;
    shippingBillNo: string;
    shippingBillDate: string;
    totalValue: string;
    supplyType: string;
    gstPayment: string;
    source: string;
    irn: string;
    irnDate: string;
    taxableValues: TaxValues;
    cessValues: TaxValues;
}

const Exports: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
    const [formState, setFormState] = useState<FormState>({
        invoiceNo: '',
        invoiceDate: '',
        portCode: '',
        shippingBillNo: '',
        shippingBillDate: '',
        totalValue: '',
        supplyType: '',
        gstPayment: '',
        source: '',
        irn: '',
        irnDate: '',
        taxableValues: {},
        cessValues: {},
        ...formData
    });

    const [errors, setErrors] = useState({
        invoiceNo: '',
        invoiceDate: '',
        totalValue: '',
        gstPayment: ''
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

    const validateField = (name: string, value: string) => {
        if (viewMode) return ''; // Skip validation in view mode
        
        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (name === 'totalValue' && isNaN(Number(value))) {
            error = 'Must be a valid number';
        } else if (name === 'invoiceNo' && value.length > 16) {
            error = 'Max 16 characters allowed';
        } else if (name === 'gstPayment' && !['with', 'without'].includes(value.toLowerCase())) {
            error = 'Must be "with" or "without"';
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (viewMode) return; // Don't allow changes in view mode

        const { name, value } = e.target;
        
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change for required fields
        if (['invoiceNo', 'invoiceDate', 'totalValue', 'gstPayment'].includes(name)) {
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
        return ((value * rate) / 100).toFixed(2);
    };

    const validateForm = () => {
        if (viewMode) return true; // Skip validation in view mode
        
        const newErrors = {
            invoiceNo: validateField('invoiceNo', formState.invoiceNo),
            invoiceDate: validateField('invoiceDate', formState.invoiceDate),
            totalValue: validateField('totalValue', formState.totalValue),
            gstPayment: validateField('gstPayment', formState.gstPayment)
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
            updateFormState('exports', formState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold">6A - Exports Invoices {viewMode ? '(View)' : '(Edit)'}</h3>
            <div className='border' />
            
            {/* Invoice Information */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
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
                    <label className="block text-sm font-medium">Port Code</label>
                    <input 
                        type="text" 
                        name="portCode"
                        value={formState.portCode}
                        onChange={handleChange}
                        placeholder="Port Code" 
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            {/* Shipping Information */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Shipping Bill No.</label>
                    <input 
                        type="text" 
                        name="shippingBillNo"
                        value={formState.shippingBillNo}
                        onChange={handleChange}
                        placeholder="" 
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Shipping Bill Date</label>
                    <input 
                        type="date" 
                        name="shippingBillDate"
                        value={formState.shippingBillDate}
                        onChange={handleChange}
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
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
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supply Type</label>
                    <input 
                        type="text" 
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        placeholder="" 
                        className="w-full text-sm font-medium input input-bordered"
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">GST Payment *</label>
                    <input 
                        type="text" 
                        name="gstPayment"
                        value={formState.gstPayment}
                        onChange={handleChange}
                        placeholder="with or without" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.gstPayment ? 'input-error' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.gstPayment && <p className="mt-1 text-sm text-red-500">{errors.gstPayment}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
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
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
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
                    onClick={() => setOpen(0)}
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

export default Exports;