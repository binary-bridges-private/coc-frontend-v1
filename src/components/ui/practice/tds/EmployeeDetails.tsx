import React, { useState, useEffect } from 'react';

interface EmployeeData {
    // Employee Personal Details
    employeePAN: string;
    employeeName: string;
    employeeAddress: string;
    employeeCity: string;
    employeeState: string;
    employeePincode: string;
    employeeMobile: string;
    employeeEmail: string;
    employeeDOB: string;
    employeeGender: string;
    employeeFatherName: string;
    
    // Employment Details
    employeeDesignation: string;
    employeeDOJ: string; // Date of Joining
    employeeDOL: string; // Date of Leaving (if applicable)
    employeeDepartment: string;
    employeeEmployeeID: string;
    
    // Salary Structure
    basicSalary: string;
    dearnessAllowance: string;
    houseRentAllowance: string;
    conveyanceAllowance: string;
    medicalAllowance: string;
    specialAllowance: string;
    otherAllowances: string;
    grossSalary: string;
    
    // Deductions
    professionalTax: string;
    providentFund: string;
    employeeStateInsurance: string;
    otherDeductions: string;
    totalDeductions: string;
    
    // Taxable Income and Tax
    taxableIncome: string;
    taxDeducted: string;
    surcharge: string;
    healthAndEducationCess: string;
    totalTaxDeducted: string;
    
    // Assessment Details
    assessmentYear: string;
    quarter: string;
    tdsCertificateNumber: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: EmployeeData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const EmployeeDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [employeeData, setEmployeeData] = useState<EmployeeData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setEmployeeData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: EmployeeData = {
            // Employee Personal Details
            employeePAN: '',
            employeeName: '',
            employeeAddress: '',
            employeeCity: '',
            employeeState: '',
            employeePincode: '',
            employeeMobile: '',
            employeeEmail: '',
            employeeDOB: '',
            employeeGender: '',
            employeeFatherName: '',
            
            // Employment Details
            employeeDesignation: '',
            employeeDOJ: '',
            employeeDOL: '',
            employeeDepartment: '',
            employeeEmployeeID: '',
            
            // Salary Structure
            basicSalary: '',
            dearnessAllowance: '',
            houseRentAllowance: '',
            conveyanceAllowance: '',
            medicalAllowance: '',
            specialAllowance: '',
            otherAllowances: '',
            grossSalary: '',
            
            // Deductions
            professionalTax: '',
            providentFund: '',
            employeeStateInsurance: '',
            otherDeductions: '',
            totalDeductions: '',
            
            // Taxable Income and Tax
            taxableIncome: '',
            taxDeducted: '',
            surcharge: '',
            healthAndEducationCess: '',
            totalTaxDeducted: '',
            
            // Assessment Details
            assessmentYear: period?.financialYear || '',
            quarter: period?.quarter || '',
            tdsCertificateNumber: `TDS-${Date.now()}`
        };
        setEmployeeData([...employeeData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = employeeData.filter((_, i) => i !== index);
        setEmployeeData(newData);
        updateFormState('employees', newData);
    };

    const updateRow = (index: number, field: keyof EmployeeData, value: any) => {
        const newData = [...employeeData];
        newData[index] = { ...newData[index], [field]: value };
        setEmployeeData(newData);
        updateFormState('employees', newData);
    };

    const validateRow = (index: number) => {
        const row = employeeData[index];
        const rowErrors: Record<string, string> = {};

        // Personal Details validation
        if (!row.employeePAN.trim()) rowErrors.employeePAN = 'Employee PAN is required';
        if (!row.employeeName.trim()) rowErrors.employeeName = 'Employee Name is required';
        if (!row.employeeAddress.trim()) rowErrors.employeeAddress = 'Employee Address is required';
        if (!row.employeeDOB.trim()) rowErrors.employeeDOB = 'Employee DOB is required';
        if (!row.employeeGender.trim()) rowErrors.employeeGender = 'Employee Gender is required';
        
        // Employment Details validation
        if (!row.employeeDesignation.trim()) rowErrors.employeeDesignation = 'Employee Designation is required';
        if (!row.employeeDOJ.trim()) rowErrors.employeeDOJ = 'Date of Joining is required';
        if (!row.employeeDepartment.trim()) rowErrors.employeeDepartment = 'Employee Department is required';
        
        // Salary validation
        if (!row.basicSalary.trim()) rowErrors.basicSalary = 'Basic Salary is required';
        if (!row.grossSalary.trim()) rowErrors.grossSalary = 'Gross Salary is required';
        
        // Tax validation
        if (!row.taxDeducted.trim()) rowErrors.taxDeducted = 'Tax Deducted is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        employeeData.forEach((_, index) => {
            const row = employeeData[index];
            const rowErrors: Record<string, string> = {};

            // Personal Details validation
            if (!row.employeePAN.trim()) rowErrors.employeePAN = 'Employee PAN is required';
            if (!row.employeeName.trim()) rowErrors.employeeName = 'Employee Name is required';
            if (!row.employeeAddress.trim()) rowErrors.employeeAddress = 'Employee Address is required';
            if (!row.employeeDOB.trim()) rowErrors.employeeDOB = 'Employee DOB is required';
            if (!row.employeeGender.trim()) rowErrors.employeeGender = 'Employee Gender is required';
            
            // Employment Details validation
            if (!row.employeeDesignation.trim()) rowErrors.employeeDesignation = 'Employee Designation is required';
            if (!row.employeeDOJ.trim()) rowErrors.employeeDOJ = 'Date of Joining is required';
            if (!row.employeeDepartment.trim()) rowErrors.employeeDepartment = 'Employee Department is required';
            
            // Salary validation
            if (!row.basicSalary.trim()) rowErrors.basicSalary = 'Basic Salary is required';
            if (!row.grossSalary.trim()) rowErrors.grossSalary = 'Gross Salary is required';
            
            // Tax validation
            if (!row.taxDeducted.trim()) rowErrors.taxDeducted = 'Tax Deducted is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('employees', employeeData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Employee Details</h2>
                <p className="text-gray-600">Details of employees for TDS on salary</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Employee
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOJ</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TDS</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employeeData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.employeePAN}
                                        onChange={(e) => updateRow(index, 'employeePAN', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.employeePAN ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="ABCDE1234F"
                                        maxLength={10}
                                    />
                                    {errors[index]?.employeePAN && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].employeePAN}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.employeeName}
                                        onChange={(e) => updateRow(index, 'employeeName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.employeeName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Employee Name"
                                    />
                                    {errors[index]?.employeeName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].employeeName}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.employeeDesignation}
                                        onChange={(e) => updateRow(index, 'employeeDesignation', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.employeeDesignation ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Designation"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="date"
                                        value={row.employeeDOJ}
                                        onChange={(e) => updateRow(index, 'employeeDOJ', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.employeeDOJ ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.basicSalary}
                                        onChange={(e) => updateRow(index, 'basicSalary', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.basicSalary ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                    {errors[index]?.basicSalary && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].basicSalary}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.taxDeducted}
                                        onChange={(e) => updateRow(index, 'taxDeducted', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.taxDeducted ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    {!viewMode && (
                                        <button
                                            onClick={() => removeRow(index)}
                                            className="text-red-600 hover:text-red-800 font-medium"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {employeeData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No employees added yet. Click "Add New Employee" to get started.
                </div>
            )}

            <div className="mt-6 flex justify-between">
                <button
                    onClick={() => setOpen(0)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Back
                </button>
                {!viewMode && (
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Save & Continue
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployeeDetails;
