import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { stateCodes } from "../../../../helpers/Constants.tsx";
import { useAppSelector } from '../../../../../store/hooks.ts';

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

interface FormState {
    pos: string;
    taxableValue: string;
    supplyType: string;
    isDifferentialTax: boolean;
    rate: string;
    cgst: string;
    sgst: string;
    igst: string;
    cess: string;
}

const B2cs: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
    // Initialize form state with existing data or defaults

    const currentRegistration = useAppSelector(state => state.gstRegistration.currentRegistration);

    console.log("curr regis :", currentRegistration);

    const [formState, setFormState] = useState<FormState>({
        pos: formData?.pos || '',
        taxableValue: formData?.taxableValue || '',
        supplyType: formData?.supplyType || '',
        isDifferentialTax: formData?.isDifferentialTax || false,
        rate: formData?.rate || '',
        cgst: formData?.cgst || '',
        sgst: formData?.sgst || '',
        igst: formData?.igst || '',
        cess: formData?.cess || '',
        ...formData
    });

    const [regisState] = useState<string | undefined>(currentRegistration?.state);

    console.log(regisState);
    const [errors, setErrors] = useState({
        pos: '',
        taxableValue: '',
        supplyType: '',
        rate: '',
        cgst: '',
        sgst: '',
        igst: ''
    });

    const isIntraState = formState.pos === regisState;
    console.log(formState.pos, regisState, isIntraState);

    const validateField = (name: string, value: string) => {
        if (viewMode) return ''; // Skip validation in view mode

        let error = '';
        if (!value.trim()) {
            error = 'This field is required';
        } else if (['taxableValue', 'rate', 'cgst', 'sgst', 'igst'].includes(name) && isNaN(Number(value))) {
            error = 'Must be a valid number';
        } else if (name === 'rate' && Number(value) <= 0) {
            error = 'Rate must be greater than 0';
        }
        return error;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (viewMode) return; // Don't allow changes in view mode

        const { name, value, type } = e.target;
        const target = e.target as HTMLInputElement; // Type assertion for checkbox

        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? target.checked : value,
            supplyType: name === 'pos' ?
                (isIntraState ? 'intra-state' : 'inter-state') :
                prev.supplyType
        }));

        if (['pos', 'taxableValue', 'rate', 'cgst', 'sgst', 'igst'].includes(name)) {
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
            const taxAmount = (taxableValue * applicableRate) / 100;

            return {
                cgst: isIntraState ? (taxAmount / 2).toFixed(2) : '0.00',
                sgst: isIntraState ? (taxAmount / 2).toFixed(2) : '0.00',
                igst: !isIntraState ? taxAmount.toFixed(2) : '0.00'
            };
        }
        return {
            cgst: '0.00',
            sgst: '0.00',
            igst: '0.00'
        };
    };

    const validateForm = () => {
        if (viewMode) return true; // Skip validation in view mode

        const taxCalculated = calculateTax();
        const newErrors = {
            pos: validateField('pos', formState.pos),
            taxableValue: validateField('taxableValue', formState.taxableValue),
            supplyType: validateField('supplyType', formState.supplyType),
            rate: validateField('rate', formState.rate),
            cgst: isIntraState ? validateField('cgst', formState.cgst || taxCalculated.cgst) : '',
            sgst: isIntraState ? validateField('sgst', formState.sgst || taxCalculated.sgst) : '',
            igst: !isIntraState ? validateField('igst', formState.igst || taxCalculated.igst) : ''
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
            const taxCalculated = calculateTax();
            const finalState = {
                ...formState,
                supplyType: isIntraState ? 'intra-state' : 'inter-state',
                cgst: isIntraState ? (formState.cgst || taxCalculated.cgst) : '0.00',
                sgst: isIntraState ? (formState.sgst || taxCalculated.sgst) : '0.00',
                igst: !isIntraState ? (formState.igst || taxCalculated.igst) : '0.00'
            };
            updateFormState('b2cs', finalState);
            setOpen(0);
        }
    };

    const taxCalculated = calculateTax();

    return (
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    B2CS - {viewMode ? 'View' : 'Add'} Details
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">POS *</label>
                    <select
                        name="pos"
                        value={formState.pos}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pos ? 'border-red-500' : 'border-gray-300'
                            } ${viewMode ? 'bg-gray-100' : ''}`}
                        disabled={viewMode}
                    >
                        <option value="">Select state</option>
                        {Object.keys(stateCodes).map((state) => (
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                    {errors.pos && <p className="mt-1 text-sm text-red-500">{errors.pos}</p>}
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Taxable value (₹) *</label>
                    <input
                        type="text"
                        name="taxableValue"
                        value={formState.taxableValue}
                        onChange={handleChange}
                        placeholder=""
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.taxableValue ? 'border-red-500' : 'border-gray-300'
                            } ${viewMode ? 'bg-gray-100' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.taxableValue && <p className="mt-1 text-sm text-red-500">{errors.taxableValue}</p>}
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Supply Type *</label>
                    <input
                        type="text"
                        name="supplyType"
                        value={isIntraState ? 'intra-state' : 'inter-state'}
                        readOnly
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.supplyType ? 'border-red-500' : 'border-gray-300'
                            } bg-gray-100`}
                    />
                    {errors.supplyType && <p className="mt-1 text-sm text-red-500">{errors.supplyType}</p>}
                </div>
            </div>

            {/* Differential Tax Section */}
            <div className="grid items-center grid-cols-1 gap-4 mt-6 md:grid-cols-2">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        name="isDifferentialTax"
                        checked={formState.isDifferentialTax}
                        onChange={handleChange}
                        className="checkbox checkbox-primary"
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
                            className="w-16 p-2 text-center bg-gray-100 border border-gray-300 rounded-md"
                            readOnly
                        />
                    </div>
                )}
            </div>

            {/* Rate and Tax Information */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Rate *</label>
                    <input
                        type="text"
                        name="rate"
                        value={formState.rate}
                        onChange={handleChange}
                        placeholder="Rate"
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.rate ? 'border-red-500' : 'border-gray-300'
                            } ${viewMode ? 'bg-gray-100' : ''}`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                    {errors.rate && <p className="mt-1 text-sm text-red-500">{errors.rate}</p>}
                </div>
            </div>

            {/* Tax Fields - Show CGST/SGST for intra-state, IGST for inter-state */}
            <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                {isIntraState ? (
                    <>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">CGST (₹) *</label>
                            <input
                                type="number"
                                name="cgst"
                                value={formState.cgst || taxCalculated.cgst}
                                onChange={handleChange}
                                placeholder="0.00"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.cgst ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.cgst && <p className="mt-1 text-sm text-red-500">{errors.cgst}</p>}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">SGST (₹) *</label>
                            <input
                                type="number"
                                name="sgst"
                                value={formState.sgst || taxCalculated.sgst}
                                onChange={handleChange}
                                placeholder="0.00"
                                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.sgst ? 'border-red-500' : 'border-gray-300'
                                    } ${viewMode ? 'bg-gray-100' : ''}`}
                                disabled={viewMode}
                                readOnly={viewMode}
                            />
                            {errors.sgst && <p className="mt-1 text-sm text-red-500">{errors.sgst}</p>}
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Integrated Tax (₹) *</label>
                        <input
                            type="number"
                            name="igst"
                            value={formState.igst || taxCalculated.igst}
                            onChange={handleChange}
                            placeholder="0.00"
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.igst ? 'border-red-500' : 'border-gray-300'
                                } ${viewMode ? 'bg-gray-100' : ''}`}
                            disabled={viewMode}
                            readOnly={viewMode}
                        />
                        {errors.igst && <p className="mt-1 text-sm text-red-500">{errors.igst}</p>}
                    </div>
                )}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">CESS (₹)</label>
                    <input
                        type="number"
                        name="cess"
                        value={formState.cess}
                        onChange={handleChange}
                        placeholder="0.00"
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                            }`}
                        disabled={viewMode}
                        readOnly={viewMode}
                    />
                </div>
            </div>

            {/* Action Buttons - matching Place component styling */}
            <div className="flex justify-end gap-4 mt-6">
                <button
                    type="button"
                    onClick={() => setOpen(0)}
                    className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`px-6 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700 ${viewMode ? 'bg-gray-500' : 'bg-blue-600'
                        }`}
                >
                    {viewMode ? 'Close' : 'Save'}
                </button>
            </div>
        </>
    );
};

export default B2cs;