// import React, { Dispatch, FC, SetStateAction, useState } from 'react'

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

// interface AdjustmentDetails {
//     grossAdvance: string
//     cess: string
// }

// interface FormState {
//     pos: string
//     supplyType: string
//     isDifferentialTax: boolean
//     adjustments: Record<number, AdjustmentDetails>
// }

// const Adjustment: FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     // Initialize form state with existing data or defaults
//     const [formState, setFormState] = useState<FormState>({
//         pos: '',
//         supplyType: '',
//         isDifferentialTax: false,
//         adjustments: {},
//         ...formData
//     });

//     const [errors, setErrors] = useState({
//         pos: ''
//     });

//     const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

//     const validateField = (name: string, value: string) => {
//         if (name === 'pos' && !value.trim()) {
//             return 'Place of Supply is required';
//         }
//         return '';
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
        
//         setFormState(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));

//         if (name === 'pos') {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: validateField(name, value)
//             }));
//         }
//     };

//     const handleAdjustmentChange = (rate: number, field: keyof AdjustmentDetails, value: string) => {
//         setFormState(prev => ({
//             ...prev,
//             adjustments: {
//                 ...prev.adjustments,
//                 [rate]: {
//                     ...(prev.adjustments[rate] || { grossAdvance: '0', cess: '0' }),
//                     [field]: value
//                 }
//             }
//         }));
//     };

//     const calculateTax = (rate: number, value: string) => {
//         const numericValue = parseFloat(value) || 0;
//         const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
//         return ((numericValue * applicableRate) / 100).toFixed(2);
//     };

//     const validateForm = () => {
//         const newErrors = {
//             pos: validateField('pos', formState.pos)
//         };

//         setErrors(newErrors);

//         // Check if at least one adjustment amount is entered
//         const hasAdjustments = Object.values(formState.adjustments).some(
//             adj => adj?.grossAdvance && parseFloat(adj.grossAdvance) > 0
//         );

//         return !newErrors.pos && hasAdjustments;
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             updateFormState('ADJUSTMENT', formState);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//             setOpen(0);
//         }
//     };

//     return (
//         <div>
//             <h3 className="font-semibold text-md">Tax already paid on invoices issued in the current period - Add Details</h3>
//             <div className='border' />
//             <h2 className="mt-4 text-md">Note: Declare the amount of advance for which tax has already been paid receipt of consideration in an earlier period and invoices issued in the current period for the supplies.</h2>

//             <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
//                 <div>
//                     <label className="block text-sm font-medium">POS *</label>
//                     <input 
//                         type="text" 
//                         name="pos"
//                         value={formState.pos}
//                         onChange={handleChange}
//                         placeholder="POS" 
//                         className={`w-full text-sm font-medium input input-bordered ${errors.pos ? 'input-error' : ''}`}
//                     />
//                     {errors.pos && <p className="mt-1 text-sm text-red-500">{errors.pos}</p>}
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium">Supply Type</label>
//                     <input 
//                         type="text" 
//                         name="supplyType"
//                         value={formState.supplyType}
//                         onChange={handleChange}
//                         placeholder="Supply Type" 
//                         className="w-full text-sm font-medium input input-bordered" 
//                     />
//                 </div>
//             </div>

//             <div className="grid items-center grid-cols-1 gap-4 mt-10 md:grid-cols-2">
//                 <label className="flex items-center space-x-2 text-sm font-medium">
//                     <input
//                         type="checkbox"
//                         name="isDifferentialTax"
//                         checked={formState.isDifferentialTax}
//                         onChange={handleChange}
//                         className="checkbox"
//                     />
//                     <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
//                 </label>

//                 {formState.isDifferentialTax && (
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

//             <h2 className="pb-2 mt-10 text-lg font-semibold">
//                 Item Details
//             </h2>
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Gross Advance Received (excluding tax) (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
//                             <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {taxRates.map((rate, index) => {
//                             const adjustment = formState.adjustments[rate] || { grossAdvance: '0', cess: '0' };
//                             return (
//                                 <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                                     <td className="p-3 text-center border border-gray-300">{rate}%</td>
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={adjustment.grossAdvance}
//                                             onChange={(e) => handleAdjustmentChange(rate, 'grossAdvance', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
//                                     <td className="p-3 text-center border border-gray-300">
//                                         {calculateTax(rate, adjustment.grossAdvance)}
//                                     </td>
//                                     <td className="p-3 text-center border border-gray-300">
//                                         <input
//                                             type="number"
//                                             value={adjustment.cess}
//                                             onChange={(e) => handleAdjustmentChange(rate, 'cess', e.target.value)}
//                                             className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
//                                         />
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex justify-end gap-4 mt-6">
//                 <button 
//                     className="btn btn-outline" 
//                     onClick={() => {
//                         window.scrollTo({ top: 0, behavior: "smooth" });
//                         setOpen(0);
//                     }}
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

// export default Adjustment;

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

interface AdjustmentDetails {
    grossAdvance: string
    cess: string
}

interface FormState {
    pos: string
    supplyType: string
    isDifferentialTax: boolean
    adjustments: Record<number, AdjustmentDetails>
}

const Adjustment: FC<Props> = ({ setOpen, formData, updateFormState, viewMode = false }) => {
    // Initialize form state with existing data or defaults
    const [formState, setFormState] = useState<FormState>({
        pos: '',
        supplyType: '',
        isDifferentialTax: false,
        adjustments: {},
        ...formData
    });

    const [errors, setErrors] = useState({
        pos: ''
    });

    const [touched, setTouched] = useState({
        pos: false
    });

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

    useEffect(() => {
        // Validate when formState changes
        if (touched.pos) {
            setErrors(prev => ({
                ...prev,
                pos: validateField('pos', formState.pos)
            }));
        }
    }, [formState.pos, touched.pos]);

    const validateField = (name: string, value: string) => {
        if (!value.trim() && name === 'pos') {
            return 'Place of Supply is required';
        }
        return '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (viewMode) return;
        
        const { name, value, type, checked } = e.target;
        
        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAdjustmentChange = (rate: number, field: keyof AdjustmentDetails, value: string) => {
        if (viewMode) return;
        
        setFormState(prev => ({
            ...prev,
            adjustments: {
                ...prev.adjustments,
                [rate]: {
                    ...(prev.adjustments[rate] || { grossAdvance: '0', cess: '0' }),
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
        const newTouched = { pos: true };
        setTouched(newTouched);

        const newErrors = {
            pos: validateField('pos', formState.pos)
        };

        setErrors(newErrors);

        // Check if at least one adjustment amount is entered
        const hasAdjustments = Object.values(formState.adjustments).some(
            adj => adj?.grossAdvance && parseFloat(adj.grossAdvance) > 0
        );

        if (!hasAdjustments) {
            alert('Please enter at least one adjustment amount');
            return false;
        }

        return !newErrors.pos;
    };

    const handleSubmit = () => {
        if (viewMode) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(0);
            return;
        }
        
        if (validateForm()) {
            updateFormState('adjustments', formState);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(0);
        }
    };

    const formatCurrency = (value: string) => {
        if (!value) return '';
        const num = parseFloat(value);
        return isNaN(num) ? '' : num.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const parseCurrency = (value: string) => {
        return value.replace(/,/g, '');
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Tax already paid on invoices issued in the current period - Add Details</h3>
            <div className="my-2 border-t border-gray-200" />
            <p className="mt-4 text-sm text-gray-600">
                Note: Declare the amount of advance for which tax has already been paid receipt of consideration in an earlier period and invoices issued in the current period for the supplies.
            </p>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">POS *</label>
                    <input 
                        type="text" 
                        name="pos"
                        value={formState.pos}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Place of supply" 
                        className={viewMode ? disabledInputClass : `${inputClass} ${errors.pos ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {!viewMode && errors.pos && touched.pos && (
                        <p className="mt-1 text-xs text-red-600">{errors.pos}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Supply Type</label>
                    <input 
                        type="text" 
                        name="supplyType"
                        value={formState.supplyType}
                        onChange={handleChange}
                        placeholder="Supply type" 
                        className={viewMode ? disabledInputClass : inputClass}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            <div className="grid items-center grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                <label className={`flex items-center space-x-2 text-sm ${viewMode ? 'text-gray-600' : 'text-gray-700'}`}>
                    <input
                        type="checkbox"
                        name="isDifferentialTax"
                        checked={formState.isDifferentialTax}
                        onChange={handleChange}
                        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                            viewMode ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={viewMode}
                    />
                    <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
                </label>

                {formState.isDifferentialTax && (
                    <div className="flex items-center justify-end">
                        <label className="mr-2 text-sm text-gray-600">Applicable % of Tax Rate</label>
                        <div className="w-16 p-1 text-center bg-gray-100 border border-gray-300 rounded-md">
                            65%
                        </div>
                    </div>
                )}
            </div>

            <h2 className="pb-2 mt-8 text-lg font-semibold text-gray-800 border-b border-gray-200">
                Item Details
            </h2>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Rate (%)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Gross Advance Received (excluding tax) (₹)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Integrated tax (₹)</th>
                            <th className="p-3 text-sm font-medium text-center text-gray-700 border border-gray-200">Cess (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxRates.map((rate, index) => {
                            const adjustment = formState.adjustments[rate] || { grossAdvance: '0', cess: '0' };
                            return (
                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="p-3 text-sm text-center text-gray-700 border border-gray-200">{rate}%</td>
                                    <td className="p-3 text-center border border-gray-200">
                                        {viewMode ? (
                                            <div className={disabledInputClass}>
                                                {formatCurrency(adjustment.grossAdvance) || '0.00'}
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <span className="absolute text-sm text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                                <input
                                                    type="text"
                                                    value={formatCurrency(adjustment.grossAdvance)}
                                                    onChange={(e) => handleAdjustmentChange(rate, 'grossAdvance', parseCurrency(e.target.value))}
                                                    className={`${inputClass} pl-8 text-center`}
                                                />
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3 text-sm text-center text-gray-700 border border-gray-200">
                                        ₹{calculateTax(rate, adjustment.grossAdvance)}
                                    </td>
                                    <td className="p-3 text-center border border-gray-200">
                                        {viewMode ? (
                                            <div className={disabledInputClass}>
                                                {formatCurrency(adjustment.cess) || '0.00'}
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <span className="absolute text-sm text-gray-500 transform -translate-y-1/2 left-3 top-1/2">₹</span>
                                                <input
                                                    type="text"
                                                    value={formatCurrency(adjustment.cess)}
                                                    onChange={(e) => handleAdjustmentChange(rate, 'cess', parseCurrency(e.target.value))}
                                                    className={`${inputClass} pl-8 text-center`}
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end gap-4 pb-4 mt-6">
                <button 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setOpen(0);
                    }}
                >
                    {viewMode ? 'Close' : 'Cancel'}
                </button>
                {!viewMode && (
                    <button 
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={!!errors.pos}
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
};

export default Adjustment;