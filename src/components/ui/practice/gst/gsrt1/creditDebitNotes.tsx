// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const Credit: React.FC<props> = ({ setOpen }) => {

//     const [taxableValues, setTaxableValues] = useState({});
//         const [isDifferentialTax, setIsDifferentialTax] = useState(false);
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
//             <h3 className="font-semibold text-md">Credit/Debit Notes (Registered)</h3>
//             <div className='border' />
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>Deemed Exports</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>SEZ Supplies with payment</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>SEZ Supplies without payment</span>
//                 </label>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>Supply attract reverse charge</span>
//                 </label>
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>Intra-State Supplies attracting IGST</span>
//                 </label>
//             </div>
//             {/* <div className="grid grid-cols-1 gap-4 mt-4">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input type="checkbox" className="checkbox" />
//                     <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
//                 </label>
//             </div> */}

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
//                     <label className="block text-sm font-medium">Recipient GSTIN/UIN *</label>
//                     <input type="text" placeholder="Recipient GSTIN/UIN" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Recipient Name *</label>
//                     <input type="text" placeholder="Recipient Name" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Name as in Master</label>
//                     <input type="text" placeholder="Name as in Master" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Debit/Credit Note No. *</label>
//                     <input type="text" placeholder="Invoice no." className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Debit/Credit Note Date *</label>
//                     <input type="date" placeholder="Invoice date" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Note Type *</label>
//                     {/* <input type="text" placeholder="Total invoice value (₹)" className="w-full text-sm font-medium input input-bordered" /> */}
//                     <select className='w-full text-sm font-medium input input-bordered'>
//                         <option>Select</option>
//                         <option>Credit</option>
//                         <option>Debit</option>
//                     </select>
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Note value (₹) *</label>
//                     <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type</label>
//                     <input type="text" placeholder="Supply Type" className="w-full text-sm font-medium input input-bordered" />
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

// export default Credit;


import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: any
    updateFormState: (slug: string, data: any) => void
}

const Credit: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    // Initialize form state with existing data or defaults
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
        noteNumber: '',
        noteDate: '',
        noteType: '',
        noteValue: '',
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
        noteNumber: '',
        noteDate: '',
        noteType: '',
        noteValue: '',
        pos: ''
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];
    const noteTypes = ['Credit', 'Debit'];

    const validateField = (name: string, value: string) => {
        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (name === 'noteValue' && isNaN(Number(value))) {
            error = 'Must be a valid number';
        } else if (name === 'recipientGSTIN' && !/^[0-9A-Z]{15}$/.test(value)) {
            error = 'Invalid GSTIN format';
        } else if (name === 'noteNumber' && value.length > 16) {
            error = 'Max 16 characters allowed';
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));

        // Validate on change for required fields
        if (['recipientGSTIN', 'recipientName', 'noteNumber', 'noteDate', 'noteType', 'noteValue', 'pos'].includes(name)) {
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
        const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
        return ((value * applicableRate) / 100).toFixed(2);
    };

    const validateForm = () => {
        const newErrors = {
            recipientGSTIN: validateField('recipientGSTIN', formState.recipientGSTIN),
            recipientName: validateField('recipientName', formState.recipientName),
            noteNumber: validateField('noteNumber', formState.noteNumber),
            noteDate: validateField('noteDate', formState.noteDate),
            noteType: validateField('noteType', formState.noteType),
            noteValue: validateField('noteValue', formState.noteValue),
            pos: validateField('pos', formState.pos)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('CDNR', formState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">Credit/Debit Notes (Registered)</h3>
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
                    />
                </div>
            </div>

            {/* Note Information */}
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Debit/Credit Note No. *</label>
                    <input 
                        type="text" 
                        name="noteNumber"
                        value={formState.noteNumber}
                        onChange={handleChange}
                        placeholder="Note number" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.noteNumber ? 'input-error' : ''}`}
                    />
                    {errors.noteNumber && <p className="mt-1 text-sm text-red-500">{errors.noteNumber}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Debit/Credit Note Date *</label>
                    <input 
                        type="date" 
                        name="noteDate"
                        value={formState.noteDate}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.noteDate ? 'input-error' : ''}`}
                    />
                    {errors.noteDate && <p className="mt-1 text-sm text-red-500">{errors.noteDate}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Note Type *</label>
                    <select 
                        name="noteType"
                        value={formState.noteType}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.noteType ? 'input-error' : ''}`}
                    >
                        <option value="">Select</option>
                        {noteTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    {errors.noteType && <p className="mt-1 text-sm text-red-500">{errors.noteType}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Note value (₹) *</label>
                    <input 
                        type="text" 
                        name="noteValue"
                        value={formState.noteValue}
                        onChange={handleChange}
                        placeholder="Note value" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.noteValue ? 'input-error' : ''}`}
                    />
                    {errors.noteValue && <p className="mt-1 text-sm text-red-500">{errors.noteValue}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">POS *</label>
                    <input 
                        type="text" 
                        name="pos"
                        value={formState.pos}
                        onChange={handleChange}
                        placeholder="POS" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.pos ? 'input-error' : ''}`}
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
            <h2 className="pb-2 mt-10 text-lg font-semibold">
                Item Details
            </h2>
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

export default Credit;