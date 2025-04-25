// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const B2c: React.FC<props> = ({ setOpen }) => {

//     const [taxableValues, setTaxableValues] = useState({});
//     const [isDifferentialTax, setIsDifferentialTax] = useState(false);
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
//         let applicableRate = isDifferentialTax ? (rate * 65) / 100 : rate;  // Apply 65% if checkbox is checked
//         return ((value * applicableRate) / 100).toFixed(2);
//     };

//     return (
//         <div>
//             <h3 className="font-semibold text-md">B2C(Large) Invoices- Details</h3>
//             <div className='border' />
//             {/* <div className="grid grid-cols-1 gap-4 mt-10">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                 <input type="checkbox" className="checkbox" />
//                 <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
//                 </label>
//                 </div> */}
//             <div className="grid items-center grid-cols-1 gap-4 mt-10 md:grid-cols-2">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input
//                         type="checkbox"
//                         className="checkbox"
//                         checked={isDifferentialTax}
//                         onChange={() => setIsDifferentialTax(!isDifferentialTax)}
//                     />
//                     <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
//                 </label>

//                 {isDifferentialTax && (
//                     <div className="flex items-center justify-end">
//                         <label className="mr-2 text-sm font-medium">Applicable % of Tax Rate</label>
//                         <input
//                             type="text"
//                             value="65%"
//                             className="w-16 p-1 text-center bg-gray-100 border border-gray-300 rounded-md"
//                             readOnly
//                         />
//                     </div>
//                 )}
//             </div>

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Invoice no. *</label>
//                     <input type="text" placeholder="Invoice no." className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Invoice date *</label>
//                     <input type="date" placeholder="Invoice date" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type</label>
//                     <input type="text" placeholder="Supply Type" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total invoice value (₹) *</label>
//                     <input type="text" placeholder="Total invoice value (₹)" className="w-full text-sm font-medium input input-bordered" />
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
//             {/* </div> */}

//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => {  setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     )
// }

// export default B2c

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
        <div>
            <h3 className="text-lg font-semibold">B2C(Large) Invoices - {viewMode ? 'View' : 'Edit'} Details</h3>
            <div className='border' />
            
            {/* Differential Tax Section */}
            <div className="grid items-center grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="isDifferentialTax"
                        checked={formState.isDifferentialTax}
                        onChange={handleChange}
                        className="checkbox"
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

            {/* Invoice Information */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
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
                        placeholder="Supply Type" 
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

export default B2c;