// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }


// const TaxLiability: React.FC<props> = ({ setOpen }) => {

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
//             <h3 className="font-semibold text-md">Tax Liability (Advance Received)</h3>
//             <div className='border' />
//             <h2 className="mt-4 text-md ">Note: Declare here the tax liability arising on account of receipt of consideration for which invoices have not been issued in the same tax period.</h2>

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type</label>
//                     <input type="text" placeholder="Supply Type" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
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

//             <h2 className="pb-2 mt-10 text-lg font-semibold ">
//                 Item Details
//             </h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Gross Advance Received (excluding tax) (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
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

// export default TaxLiability
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

interface AdvanceDetails {
    grossAdvance: string
    cess: string
}

interface FormState {
    pos: string
    supplyType: string
    isDifferentialTax: boolean
    advances: Record<number, AdvanceDetails>
}

const TaxLiability: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState<FormState>({
        pos: '',
        supplyType: '',
        isDifferentialTax: false,
        advances: {},
        ...formData
    });

    const [errors, setErrors] = useState({
        pos: ''
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

    const validateField = (name: string, value: string) => {
        let error = '';
        if (!value.trim() && name === 'pos') {
            error = 'Place of Supply is required';
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'pos') {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const handleAdvanceChange = (rate: number, field: keyof AdvanceDetails, value: string) => {
        setFormState(prev => ({
            ...prev,
            advances: {
                ...prev.advances,
                [rate]: {
                    ...(prev.advances[rate] || { grossAdvance: '0', cess: '0' }),
                    [field]: value
                }
            }
        }));
    };

    const calculateTax = (rate: number, value: string) => {
        const numericValue = parseFloat(value) || 0;
        const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
        return ((numericValue * applicableRate) / 100).toFixed(2);
    };

    const validateForm = () => {
        const newErrors = {
            pos: validateField('pos', formState.pos)
        };

        setErrors(newErrors);

        // Check if at least one advance amount is entered
        const hasAdvances = Object.values(formState.advances).some(
            advance => advance?.grossAdvance && parseFloat(advance.grossAdvance) > 0
        );

        return !newErrors.pos && hasAdvances;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('TAX-LIABILITY', formState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">Tax Liability (Advance Received)</h3>
            <div className='border' />
            <h2 className="mt-4 text-md">Note: Declare here the tax liability arising on account of receipt of consideration for which invoices have not been issued in the same tax period.</h2>

            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
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

            <h2 className="pb-2 mt-10 text-lg font-semibold">
                Item Details
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Gross Advance Received (excluding tax) (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxRates.map((rate, index) => {
                            const advance = formState.advances[rate] || { grossAdvance: '0', cess: '0' };
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3 text-center border border-gray-300">{rate}%</td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={advance.grossAdvance}
                                            onChange={(e) => handleAdvanceChange(rate, 'grossAdvance', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        {calculateTax(rate, advance.grossAdvance)}
                                    </td>
                                    <td className="p-3 text-center border border-gray-300">
                                        <input
                                            type="number"
                                            value={advance.cess}
                                            onChange={(e) => handleAdvanceChange(rate, 'cess', e.target.value)}
                                            className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
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

export default TaxLiability;