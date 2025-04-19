// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const Exports: React.FC<props> = ({ setOpen }) => {

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
//             <h3 className="font-semibold text-md">6A - Exports Invoices</h3>
//             <div className='border' />
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Invoice no. *</label>
//                     <input type="text" placeholder="Invoice no." className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Invoice date *</label>
//                     <input type="date" placeholder="Invoice date" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Port Code</label>
//                     <input type="text" placeholder="Port Code" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Shipping Bill No./Bill of Export No</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Shipping Bill Date/Bill of Export Date</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total invoice value (₹) *</label>
//                     <input type="text" placeholder="Total invoice value (₹)" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">GST Payment *</label>
//                     <input type="text" placeholder="with or without" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Source</label>
//                     <input type="text" placeholder="Source" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">IRN</label>
//                     <input type="text" placeholder="IRN" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">IRN date</label>
//                     <input type="text" placeholder="IRN date" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>

//             <h2 className="pb-2 mt-10 text-lg font-semibold ">
//                 Item Details
//             </h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Amount of Tax (₹)</th>
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

// export default Exports

import React, { Dispatch, SetStateAction, useState } from 'react'

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
}

const Exports: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState({
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
        const { name, value, type } = e.target;
        
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
        setFormState(prev => ({
            ...prev,
            taxableValues: {
                ...prev.taxableValues,
                [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
            }
        }));
    };

    const handleCessValueChange = (rate: number, value: string) => {
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
        if (validateForm()) {
            updateFormState('EXP', formState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">6A - Exports Invoices</h3>
            <div className='border' />
            
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
                    />
                </div>
            </div>

            {/* Shipping Information */}
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Shipping Bill No./Bill of Export No</label>
                    <input 
                        type="text" 
                        name="shippingBillNo"
                        value={formState.shippingBillNo}
                        onChange={handleChange}
                        placeholder="" 
                        className="w-full text-sm font-medium input input-bordered" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Shipping Bill Date/Bill of Export Date</label>
                    <input 
                        type="date" 
                        name="shippingBillDate"
                        value={formState.shippingBillDate}
                        onChange={handleChange}
                        className="w-full text-sm font-medium input input-bordered" 
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
                    />
                    {errors.totalValue && <p className="mt-1 text-sm text-red-500">{errors.totalValue}</p>}
                </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supply Type</label>
                    <input 
                        type="text" 
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        placeholder="" 
                        className="w-full text-sm font-medium input input-bordered" 
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
                    />
                    {errors.gstPayment && <p className="mt-1 text-sm text-red-500">{errors.gstPayment}</p>}
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
                    className="btn bg-[#101C36] text-white" 
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Exports;