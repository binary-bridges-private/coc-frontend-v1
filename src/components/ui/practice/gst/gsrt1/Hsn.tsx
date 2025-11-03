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
// }

// interface HsnItem {
//     hsn: string
//     description: string
//     productName: string
//     uqc: string
//     quantity: string
//     taxableValue: string
//     rate: string
//     integratedTax: string
//     centralTax: string
//     stateTax: string
//     cess: string
// }

// const Hsn: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     // Initialize form state with existing data or defaults
//     const [formState, setFormState] = useState<HsnItem>({
//         hsn: '',
//         description: '',
//         productName: '',
//         uqc: '',
//         quantity: '',
//         taxableValue: '',
//         rate: '',
//         integratedTax: '',
//         centralTax: '',
//         stateTax: '',
//         cess: '',
//         ...formData
//     });

//     const [errors, setErrors] = useState({
//         hsn: '',
//         productName: '',
//         uqc: '',
//         quantity: '',
//         taxableValue: '',
//         rate: '',
//         integratedTax: '',
//         centralTax: '',
//         stateTax: ''
//     });

//     const validateField = (name: keyof HsnItem, value: string) => {
//         if (!value.trim() && name !== 'description' && name !== 'cess') {
//             return 'This field is required';
//         }
//         if (['quantity', 'taxableValue', 'rate', 'integratedTax', 'centralTax', 'stateTax', 'cess'].includes(name) && isNaN(Number(value))) {
//             return 'Must be a valid number';
//         }
//         return '';
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;

//         setFormState(prev => ({
//             ...prev,
//             [name]: value
//         }));

//         // Validate on change for all fields except description and cess
//         if (name !== 'description' && name !== 'cess') {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name as keyof HsnItem, value)
//             }));
//         }
//     };

//     const calculateTaxes = () => {
//         if (formState.rate && formState.taxableValue) {
//             const rate = parseFloat(formState.rate);
//             const taxableValue = parseFloat(formState.taxableValue);
//             const taxAmount = (taxableValue * rate) / 100;

//             setFormState(prev => ({
//                 ...prev,
//                 integratedTax: taxAmount.toFixed(2),
//                 centralTax: (taxAmount / 2).toFixed(2),
//                 stateTax: (taxAmount / 2).toFixed(2)
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {
//             hsn: validateField('hsn', formState.hsn),
//             productName: validateField('productName', formState.productName),
//             uqc: validateField('uqc', formState.uqc),
//             quantity: validateField('quantity', formState.quantity),
//             taxableValue: validateField('taxableValue', formState.taxableValue),
//             rate: validateField('rate', formState.rate),
//             integratedTax: validateField('integratedTax', formState.integratedTax),
//             centralTax: validateField('centralTax', formState.centralTax),
//             stateTax: validateField('stateTax', formState.stateTax)
//         };

//         setErrors(newErrors);

//         return !Object.values(newErrors).some(error => error !== '');
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             updateFormState('HSN', formState);
//             setOpen(0);
//         }
//     };

//     return (
//         <div>
//             <h3 className="font-semibold text-md">HSN - wise summary of outward supplies</h3>
//             <div className='border' />
//             <ul className="mt-4 text-md">
//                 Note:
//                 <li className="mt-1 text-sm">
//                     1. In case there are no suggestions for any HSN, then after typing the required HSN; click on description/UQC to enable other fields.
//                 </li>
//                 <li className="mt-1 text-sm">
//                     2. Please select HSN from the search results dropdown only. In case HSN entered is not available, you can enter HSN manually
//                 </li>
//                 <li className="mt-1 text-sm">
//                     3. Kindly click on save button after any modification( add, edit) to save the changes
//                 </li>
//             </ul>

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">HSN *</label>
//                     <input 
//                         type="text" 
//                         name="hsn"
//                         value={formState.hsn}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.hsn ? 'input-error' : ''}`}
//                     />
//                     {errors.hsn && <p className="mt-1 text-sm text-red-500">{errors.hsn}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Description</label>
//                     <input 
//                         type="text" 
//                         name="description"
//                         value={formState.description}
//                         onChange={handleChange}
//                         className="w-full text-sm font-medium input input-bordered"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Product name as in Master *</label>
//                     <input 
//                         type="text" 
//                         name="productName"
//                         value={formState.productName}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.productName ? 'input-error' : ''}`}
//                     />
//                     {errors.productName && <p className="mt-1 text-sm text-red-500">{errors.productName}</p>}
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">UQC *</label>
//                     <input 
//                         type="text" 
//                         name="uqc"
//                         value={formState.uqc}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.uqc ? 'input-error' : ''}`}
//                     />
//                     {errors.uqc && <p className="mt-1 text-sm text-red-500">{errors.uqc}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total Quantity *</label>
//                     <input 
//                         type="number" 
//                         name="quantity"
//                         value={formState.quantity}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.quantity ? 'input-error' : ''}`}
//                     />
//                     {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Total taxable value (₹) *</label>
//                     <input 
//                         type="number" 
//                         name="taxableValue"
//                         value={formState.taxableValue}
//                         onChange={handleChange}
//                         onBlur={calculateTaxes}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.taxableValue ? 'input-error' : ''}`}
//                     />
//                     {errors.taxableValue && <p className="mt-1 text-sm text-red-500">{errors.taxableValue}</p>}
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">Rate (%) *</label>
//                     <input 
//                         type="number" 
//                         name="rate"
//                         value={formState.rate}
//                         onChange={handleChange}
//                         onBlur={calculateTaxes}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.rate ? 'input-error' : ''}`}
//                     />
//                     {errors.rate && <p className="mt-1 text-sm text-red-500">{errors.rate}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Integrated tax (₹) *</label>
//                     <input 
//                         type="number" 
//                         name="integratedTax"
//                         value={formState.integratedTax}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.integratedTax ? 'input-error' : ''}`}
//                         readOnly
//                     />
//                     {errors.integratedTax && <p className="mt-1 text-sm text-red-500">{errors.integratedTax}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Central tax (₹) *</label>
//                     <input 
//                         type="number" 
//                         name="centralTax"
//                         value={formState.centralTax}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.centralTax ? 'input-error' : ''}`}
//                         readOnly
//                     />
//                     {errors.centralTax && <p className="mt-1 text-sm text-red-500">{errors.centralTax}</p>}
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">State/UT tax (₹) *</label>
//                     <input 
//                         type="number" 
//                         name="stateTax"
//                         value={formState.stateTax}
//                         onChange={handleChange}
//                         className={`w-full text-sm font-medium input input-bordered ${errors.stateTax ? 'input-error' : ''}`}
//                         readOnly
//                     />
//                     {errors.stateTax && <p className="mt-1 text-sm text-red-500">{errors.stateTax}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Cess (₹)</label>
//                     <input 
//                         type="number" 
//                         name="cess"
//                         value={formState.cess}
//                         onChange={handleChange}
//                         className="w-full text-sm font-medium input input-bordered"
//                     />
//                 </div>
//             </div>

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

// export default Hsn;

import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'

// Define consistent input classes
const inputClass = "w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
const disabledInputClass = "w-full p-2 text-sm bg-gray-100 border border-gray-200 rounded-md text-gray-600"

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
    viewMode?: boolean;
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

const Hsn: FC<Props> = ({ setOpen, formData, updateFormState, viewMode = false }) => {
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

    const [touched, setTouched] = useState({
        hsn: false,
        productName: false,
        uqc: false,
        quantity: false,
        taxableValue: false,
        rate: false
    });

    useEffect(() => {
        // Validate when formState changes
        const newErrors = { ...errors };
        let hasChanges = false;

        Object.keys(touched).forEach(key => {
            if (touched[key as keyof typeof touched]) {
                const error = validateField(key as keyof HsnItem, formState[key as keyof HsnItem]);
                if (error !== errors[key as keyof typeof errors]) {
                    newErrors[key as keyof typeof errors] = error;
                    hasChanges = true;
                }
            }
        });

        if (hasChanges) {
            setErrors(newErrors);
        }
    }, [formState, touched]);

    const validateField = (name: keyof HsnItem, value: string) => {
        if (!value.trim() && name !== 'description' && name !== 'cess') {
            return 'This field is required';
        }
        if (['quantity', 'taxableValue', 'rate', 'integratedTax', 'centralTax', 'stateTax', 'cess'].includes(name) && isNaN(Number(value))) {
            return 'Must be a valid number';
        }
        if (name === 'hsn' && !/^\d{4,8}$/.test(value)) {
            return 'HSN code must be 4-8 digits';
        }
        return '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (viewMode) return;

        const { name, value } = e.target;

        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
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
        const newTouched = {
            hsn: true,
            productName: true,
            uqc: true,
            quantity: true,
            taxableValue: true,
            rate: true
        };
        setTouched(newTouched);

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
        if (viewMode) {
            setOpen(0);
            return;
        }

        if (validateForm()) {
            updateFormState('hsn', formState);
            setOpen(0);
        }
    };

    // const formatCurrency = (value: string) => {
    //     if (!value) return '';
    //     const num = parseFloat(value);
    //     return isNaN(num) ? '' : num.toLocaleString('en-IN', {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2
    //     });
    // };

    const parseCurrency = (value: string) => {
        return value.replace(/,/g, '');
    };

    return (
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    HSN - wise summary of outward supplies
                    {viewMode && <span className="ml-2 text-gray-500">(View Mode)</span>}
                </h2>
            </div>
            <div className="p-4">
                <div className="my-2 border-t border-gray-200" />
                <ul className="mt-4 space-y-1 text-gray-700 text-md">
                    <li>Note:</li>
                    <li className="ml-4">1. In case there are no suggestions for any HSN, then after typing the required HSN; click on description/UQC to enable other fields.</li>
                    <li className="ml-4">2. Please select HSN from the search results dropdown only. In case HSN entered is not available, you can enter HSN manually</li>
                    <li className="ml-4">3. Kindly click on save button after any modification( add, edit) to save the changes</li>
                </ul>

                <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">HSN *</label>
                        <input
                            type="text"
                            name="hsn"
                            value={formState.hsn}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.hsn ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.hsn && (
                            <p className="mt-1 text-sm text-red-500">{errors.hsn}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={formState.description}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : 'border-gray-300'
                                }`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Product name as in Master *</label>
                        <input
                            type="text"
                            name="productName"
                            value={formState.productName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.productName ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.productName && (
                            <p className="mt-1 text-sm text-red-500">{errors.productName}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">UQC *</label>
                        <input
                            type="text"
                            name="uqc"
                            value={formState.uqc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.uqc ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.uqc && (
                            <p className="mt-1 text-sm text-red-500">{errors.uqc}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Total Quantity *</label>
                        <input
                            type="text"
                            name="quantity"
                            value={formState.quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.quantity && (
                            <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Total taxable value (₹) *</label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="taxableValue"
                                value={formState.taxableValue}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value);
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'taxableValue',
                                            value: unformattedValue
                                        }
                                    });
                                }}
                                onBlur={(e) => {
                                    handleBlur(e);
                                    calculateTaxes();
                                }}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.taxableValue ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                        {errors.taxableValue && (
                            <p className="mt-1 text-sm text-red-500">{errors.taxableValue}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Rate (%) *</label>
                        <input
                            type="text"
                            name="rate"
                            value={formState.rate}
                            onChange={handleChange}
                            onBlur={(e) => {
                                handleBlur(e);
                                calculateTaxes();
                            }}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.rate ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.rate && (
                            <p className="mt-1 text-sm text-red-500">{errors.rate}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Integrated tax (₹) *</label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="integratedTax"
                                value={formState.integratedTax}
                                className={`w-full p-3 pl-8 bg-gray-100 border border-gray-300 rounded-md ${errors.integratedTax ? 'border-red-500' : ''
                                    }`}
                                readOnly
                            />
                        </div>
                        {errors.integratedTax && (
                            <p className="mt-1 text-sm text-red-500">{errors.integratedTax}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Central tax (₹) *</label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="centralTax"
                                value={formState.centralTax}
                                className={`w-full p-3 pl-8 bg-gray-100 border border-gray-300 rounded-md ${errors.centralTax ? 'border-red-500' : ''
                                    }`}
                                readOnly
                            />
                        </div>
                        {errors.centralTax && (
                            <p className="mt-1 text-sm text-red-500">{errors.centralTax}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">State/UT tax (₹) *</label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="stateTax"
                                value={formState.stateTax}
                                className={`w-full p-3 pl-8 bg-gray-100 border border-gray-300 rounded-md ${errors.stateTax ? 'border-red-500' : ''
                                    }`}
                                readOnly
                            />
                        </div>
                        {errors.stateTax && (
                            <p className="mt-1 text-sm text-red-500">{errors.stateTax}</p>
                        )}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Cess (₹)</label>
                        <div className="relative">
                            <span className="absolute text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                            <input
                                type="text"
                                name="cess"
                                value={formState.cess}
                                onChange={(e) => {
                                    const unformattedValue = parseCurrency(e.target.value);
                                    handleChange({
                                        ...e,
                                        target: {
                                            ...e.target,
                                            name: 'cess',
                                            value: unformattedValue
                                        }
                                    });
                                }}
                                className={`w-full p-3 pl-8 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : 'border-gray-300'
                                    }`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => setOpen(0)}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        {viewMode ? 'Close' : 'Back'}
                    </button>
                    {!viewMode && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${Object.values(errors).some(error => error !== '') ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={Object.values(errors).some(error => error !== '')}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Hsn;