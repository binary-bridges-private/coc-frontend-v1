// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const B2cs: React.FC<props> = ({ setOpen }) => {
    
//     const [isDifferentialTax, setIsDifferentialTax] = useState(false);

//     const calculateTax = (rate, value) => {
//         let applicableRate = isDifferentialTax ? (rate * 65) / 100 : rate;  // Apply 65% if checkbox is checked
//         return ((value * applicableRate) / 100).toFixed(2);
//     };


//     return (
//         <div>
//             <h3 className="font-semibold text-md">B2CS- Add Details</h3>
//             <div className='border' />
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Taxable value (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type *</label>
//                     <input type="text" placeholder="Inter State" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             {/* <div className="grid grid-cols-1 gap-4 mt-10">
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
//                     <label className="block text-sm font-medium">Rate *</label>
//                     <input type="text" placeholder="Rate" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Integrated Tax (₹) *</label>
//                     <input type="number" placeholder="0.00 " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">CESS (₹)</label>
//                     <input type="number" placeholder="0.00" className="w-full text-sm font-medium input input-bordered" />
//                 </div>

//             </div>
//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     )
// }

// export default B2cs

import React, { Dispatch, SetStateAction, useState } from 'react'

interface Props {
    setOpen: Dispatch<SetStateAction<number>>
    formData?: any
    updateFormState: (slug: string, data: any) => void
    period: {
        financialYear: string;
        quarter: string;
        period: string;
    };
}

const B2cs: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState({
        pos: '',
        taxableValue: '',
        supplyType: 'Inter State',
        isDifferentialTax: false,
        rate: '',
        integratedTax: '',
        cess: '',
        ...formData
    });

    const [errors, setErrors] = useState({
        pos: '',
        taxableValue: '',
        supplyType: '',
        rate: '',
        integratedTax: ''
    });

    const validateField = (name: string, value: string) => {
        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (['taxableValue', 'rate', 'integratedTax'].includes(name) && isNaN(Number(value))) {
            error = 'Must be a valid number';
        } else if (name === 'rate' && Number(value) <= 0) {
            error = 'Rate must be greater than 0';
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Validate on change for required fields
        if (['pos', 'taxableValue', 'supplyType', 'rate', 'integratedTax'].includes(name)) {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name, value)
            }));
        }
    };

    const calculateTax = () => {
        if (formState.taxableValue && formState.rate) {
            const rate = parseFloat(formState.rate);
            const taxableValue = parseFloat(formState.taxableValue);
            const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
            return ((taxableValue * applicableRate) / 100).toFixed(2);
        }
        return '0.00';
    };

    const validateForm = () => {
        const newErrors = {
            pos: validateField('pos', formState.pos),
            taxableValue: validateField('taxableValue', formState.taxableValue),
            supplyType: validateField('supplyType', formState.supplyType),
            rate: validateField('rate', formState.rate),
            integratedTax: validateField('integratedTax', formState.integratedTax)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = () => {
        if (validateForm()) {
            // Auto-calculate integrated tax if not provided
            const finalState = {
                ...formState,
                integratedTax: formState.integratedTax || calculateTax()
            };
            updateFormState('B2CS', finalState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">B2CS- Add Details</h3>
            <div className='border' />
            
            {/* Basic Information */}
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
                    <label className="block text-sm font-medium">Taxable value (₹) *</label>
                    <input 
                        type="text" 
                        name="taxableValue"
                        value={formState.taxableValue}
                        onChange={handleChange}
                        placeholder="" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.taxableValue ? 'input-error' : ''}`}
                    />
                    {errors.taxableValue && <p className="mt-1 text-sm text-red-500">{errors.taxableValue}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Supply Type *</label>
                    <input 
                        type="text" 
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        placeholder="Inter State" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.supplyType ? 'input-error' : ''}`}
                    />
                    {errors.supplyType && <p className="mt-1 text-sm text-red-500">{errors.supplyType}</p>}
                </div>
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

            {/* Rate and Tax Information */}
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Rate *</label>
                    <input 
                        type="text" 
                        name="rate"
                        value={formState.rate}
                        onChange={handleChange}
                        placeholder="Rate" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.rate ? 'input-error' : ''}`}
                    />
                    {errors.rate && <p className="mt-1 text-sm text-red-500">{errors.rate}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Integrated Tax (₹) *</label>
                    <input 
                        type="number" 
                        name="integratedTax"
                        value={formState.integratedTax || calculateTax()}
                        onChange={handleChange}
                        placeholder="0.00" 
                        className={`w-full text-sm font-medium input input-bordered ${errors.integratedTax ? 'input-error' : ''}`}
                    />
                    {errors.integratedTax && <p className="mt-1 text-sm text-red-500">{errors.integratedTax}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">CESS (₹)</label>
                    <input 
                        type="number" 
                        name="cess"
                        value={formState.cess}
                        onChange={handleChange}
                        placeholder="0.00" 
                        className="w-full text-sm font-medium input input-bordered" 
                    />
                </div>
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

export default B2cs;