// import React, { Dispatch, SetStateAction, useState } from 'react'

// interface props {
//     setOpen: Dispatch<SetStateAction<number>>
// }

// const Hsn: React.FC<props> = ({ setOpen }) => {
//     return (
//         <div>
//             <h3 className="font-semibold text-md">HSN - wise summary of outward supplies</h3>
//             <div className='border' />
//             <ul className="mt-4 text-md ">
//                 Note:

//                 <li className="mt-1 text-sm ">
//                     1. In case there are no suggestions for any HSN, then after typing the required HSN; click on description/UQC to enable other fields.

//                 </li>
//                 <li className="mt-1 text-sm ">
//                     2. Please select HSN from the search results dropdown only. In case HSN entered is not available, you can enter HSN manually

//                 </li>
//                 <li className="mt-1 text-sm ">
//                     3. Kindly click on save button after any modification( add, edit) to save the changes

//                 </li>
//             </ul>

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">HSN *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Description</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Product name as in Master *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">UQC *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total Quantity *</label>
//                     <input type="date" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total taxable value (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Rate (%) *</label>
//                     <input type="text" placeholder=" " className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Integrated tax (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Central tax (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">State/UT tax (₹) *</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Cess (₹)</label>
//                     <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
//                 </div>
//             </div>

//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     )
// }

// export default Hsn

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

interface HsnItem {
    hsn: string
    description: string
    productName: string
    uqc: string
    quantity: string
    taxableValue: string
    rate: string
    integratedTax: string
    centralTax: string
    stateTax: string
    cess: string
}

const Hsn: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState<HsnItem>({
        hsn: '',
        description: '',
        productName: '',
        uqc: '',
        quantity: '',
        taxableValue: '',
        rate: '',
        integratedTax: '',
        centralTax: '',
        stateTax: '',
        cess: '',
        ...formData
    });

    const [errors, setErrors] = useState({
        hsn: '',
        productName: '',
        uqc: '',
        quantity: '',
        taxableValue: '',
        rate: '',
        integratedTax: '',
        centralTax: '',
        stateTax: ''
    });

    const validateField = (name: keyof HsnItem, value: string) => {
        if (!value.trim() && name !== 'description' && name !== 'cess') {
            return 'This field is required';
        }
        if (['quantity', 'taxableValue', 'rate', 'integratedTax', 'centralTax', 'stateTax', 'cess'].includes(name) && isNaN(Number(value))) {
            return 'Must be a valid number';
        }
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate on change for all fields except description and cess
        if (name !== 'description' && name !== 'cess') {
            setErrors(prev => ({
                ...prev,
                [name]: validateField(name as keyof HsnItem, value)
            }));
        }
    };

    const calculateTaxes = () => {
        if (formState.rate && formState.taxableValue) {
            const rate = parseFloat(formState.rate);
            const taxableValue = parseFloat(formState.taxableValue);
            const taxAmount = (taxableValue * rate) / 100;
            
            setFormState(prev => ({
                ...prev,
                integratedTax: taxAmount.toFixed(2),
                centralTax: (taxAmount / 2).toFixed(2),
                stateTax: (taxAmount / 2).toFixed(2)
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            hsn: validateField('hsn', formState.hsn),
            productName: validateField('productName', formState.productName),
            uqc: validateField('uqc', formState.uqc),
            quantity: validateField('quantity', formState.quantity),
            taxableValue: validateField('taxableValue', formState.taxableValue),
            rate: validateField('rate', formState.rate),
            integratedTax: validateField('integratedTax', formState.integratedTax),
            centralTax: validateField('centralTax', formState.centralTax),
            stateTax: validateField('stateTax', formState.stateTax)
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('HSN', formState);
            setOpen(0);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-md">HSN - wise summary of outward supplies</h3>
            <div className='border' />
            <ul className="mt-4 text-md">
                Note:
                <li className="mt-1 text-sm">
                    1. In case there are no suggestions for any HSN, then after typing the required HSN; click on description/UQC to enable other fields.
                </li>
                <li className="mt-1 text-sm">
                    2. Please select HSN from the search results dropdown only. In case HSN entered is not available, you can enter HSN manually
                </li>
                <li className="mt-1 text-sm">
                    3. Kindly click on save button after any modification( add, edit) to save the changes
                </li>
            </ul>

            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">HSN *</label>
                    <input 
                        type="text" 
                        name="hsn"
                        value={formState.hsn}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.hsn ? 'input-error' : ''}`}
                    />
                    {errors.hsn && <p className="mt-1 text-sm text-red-500">{errors.hsn}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input 
                        type="text" 
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        className="w-full text-sm font-medium input input-bordered"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Product name as in Master *</label>
                    <input 
                        type="text" 
                        name="productName"
                        value={formState.productName}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.productName ? 'input-error' : ''}`}
                    />
                    {errors.productName && <p className="mt-1 text-sm text-red-500">{errors.productName}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">UQC *</label>
                    <input 
                        type="text" 
                        name="uqc"
                        value={formState.uqc}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.uqc ? 'input-error' : ''}`}
                    />
                    {errors.uqc && <p className="mt-1 text-sm text-red-500">{errors.uqc}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Total Quantity *</label>
                    <input 
                        type="number" 
                        name="quantity"
                        value={formState.quantity}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.quantity ? 'input-error' : ''}`}
                    />
                    {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Total taxable value (₹) *</label>
                    <input 
                        type="number" 
                        name="taxableValue"
                        value={formState.taxableValue}
                        onChange={handleChange}
                        onBlur={calculateTaxes}
                        className={`w-full text-sm font-medium input input-bordered ${errors.taxableValue ? 'input-error' : ''}`}
                    />
                    {errors.taxableValue && <p className="mt-1 text-sm text-red-500">{errors.taxableValue}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Rate (%) *</label>
                    <input 
                        type="number" 
                        name="rate"
                        value={formState.rate}
                        onChange={handleChange}
                        onBlur={calculateTaxes}
                        className={`w-full text-sm font-medium input input-bordered ${errors.rate ? 'input-error' : ''}`}
                    />
                    {errors.rate && <p className="mt-1 text-sm text-red-500">{errors.rate}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Integrated tax (₹) *</label>
                    <input 
                        type="number" 
                        name="integratedTax"
                        value={formState.integratedTax}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.integratedTax ? 'input-error' : ''}`}
                        readOnly
                    />
                    {errors.integratedTax && <p className="mt-1 text-sm text-red-500">{errors.integratedTax}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Central tax (₹) *</label>
                    <input 
                        type="number" 
                        name="centralTax"
                        value={formState.centralTax}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.centralTax ? 'input-error' : ''}`}
                        readOnly
                    />
                    {errors.centralTax && <p className="mt-1 text-sm text-red-500">{errors.centralTax}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">State/UT tax (₹) *</label>
                    <input 
                        type="number" 
                        name="stateTax"
                        value={formState.stateTax}
                        onChange={handleChange}
                        className={`w-full text-sm font-medium input input-bordered ${errors.stateTax ? 'input-error' : ''}`}
                        readOnly
                    />
                    {errors.stateTax && <p className="mt-1 text-sm text-red-500">{errors.stateTax}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Cess (₹)</label>
                    <input 
                        type="number" 
                        name="cess"
                        value={formState.cess}
                        onChange={handleChange}
                        className="w-full text-sm font-medium input input-bordered"
                    />
                </div>
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

export default Hsn;