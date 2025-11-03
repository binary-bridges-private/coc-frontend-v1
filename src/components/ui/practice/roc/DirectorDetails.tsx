import React, { useState, useEffect } from 'react';

interface DirectorData {
    // Director Personal Details
    directorDIN: string;
    directorName: string;
    directorAddress: string;
    directorCity: string;
    directorState: string;
    directorPincode: string;
    directorCountry: string;
    directorMobile: string;
    directorEmail: string;
    directorDOB: string;
    directorGender: string;
    directorFatherName: string;
    directorNationality: string;
    
    // Director Professional Details
    directorDesignation: string;
    directorDOJ: string; // Date of Joining
    directorDOL: string; // Date of Leaving (if applicable)
    directorCategory: string; // Executive/Non-Executive/Independent
    directorAppointmentType: string; // First/Reappointment
    directorQualification: string;
    directorExperience: string;
    
    // Director Financial Details
    directorRemuneration: string;
    directorSittingFees: string;
    directorCommission: string;
    directorPerquisites: string;
    directorTotalRemuneration: string;
    
    // Director Shareholding
    directorShares: string;
    directorPercentage: string;
    directorShareValue: string;
    
    // Director Compliance
    directorDisqualification: string;
    directorCriminalCases: string;
    directorInsolvency: string;
    directorDisqualificationDetails: string;
    
    // Assessment Details
    assessmentYear: string;
    financialYear: string;
}

interface Props {
    setOpen: (value: number) => void;
    formData?: DirectorData[];
    updateFormState: (slug: string, data: any) => void;
    period: any;
    viewMode?: boolean;
}

const DirectorDetails: React.FC<Props> = ({ setOpen, formData = [], updateFormState, period, viewMode = false }) => {
    const [directorData, setDirectorData] = useState<DirectorData[]>(formData || []);
    const [errors, setErrors] = useState<Record<number, Record<string, string>>>({});

    useEffect(() => {
        if (formData && formData.length > 0) {
            setDirectorData(formData);
        }
    }, [formData]);

    const addNewRow = () => {
        const newRow: DirectorData = {
            // Director Personal Details
            directorDIN: '',
            directorName: '',
            directorAddress: '',
            directorCity: '',
            directorState: '',
            directorPincode: '',
            directorCountry: 'India',
            directorMobile: '',
            directorEmail: '',
            directorDOB: '',
            directorGender: '',
            directorFatherName: '',
            directorNationality: 'Indian',
            
            // Director Professional Details
            directorDesignation: '',
            directorDOJ: '',
            directorDOL: '',
            directorCategory: '',
            directorAppointmentType: '',
            directorQualification: '',
            directorExperience: '',
            
            // Director Financial Details
            directorRemuneration: '',
            directorSittingFees: '',
            directorCommission: '',
            directorPerquisites: '',
            directorTotalRemuneration: '',
            
            // Director Shareholding
            directorShares: '',
            directorPercentage: '',
            directorShareValue: '',
            
            // Director Compliance
            directorDisqualification: 'No',
            directorCriminalCases: 'No',
            directorInsolvency: 'No',
            directorDisqualificationDetails: '',
            
            // Assessment Details
            assessmentYear: period?.financialYear || '',
            financialYear: period?.financialYear || ''
        };
        setDirectorData([...directorData, newRow]);
    };

    const removeRow = (index: number) => {
        const newData = directorData.filter((_, i) => i !== index);
        setDirectorData(newData);
        updateFormState('directors', newData);
    };

    const updateRow = (index: number, field: keyof DirectorData, value: any) => {
        const newData = [...directorData];
        newData[index] = { ...newData[index], [field]: value };
        setDirectorData(newData);
        updateFormState('directors', newData);
    };

    const validateRow = (index: number) => {
        const row = directorData[index];
        const rowErrors: Record<string, string> = {};

        // Personal Details validation
        if (!row.directorDIN.trim()) rowErrors.directorDIN = 'Director DIN is required';
        if (!row.directorName.trim()) rowErrors.directorName = 'Director Name is required';
        if (!row.directorAddress.trim()) rowErrors.directorAddress = 'Director Address is required';
        if (!row.directorDOB.trim()) rowErrors.directorDOB = 'Director DOB is required';
        if (!row.directorGender.trim()) rowErrors.directorGender = 'Director Gender is required';
        if (!row.directorNationality.trim()) rowErrors.directorNationality = 'Director Nationality is required';
        
        // Professional Details validation
        if (!row.directorDesignation.trim()) rowErrors.directorDesignation = 'Director Designation is required';
        if (!row.directorDOJ.trim()) rowErrors.directorDOJ = 'Date of Joining is required';
        if (!row.directorCategory.trim()) rowErrors.directorCategory = 'Director Category is required';
        if (!row.directorAppointmentType.trim()) rowErrors.directorAppointmentType = 'Appointment Type is required';
        
        // Financial Details validation
        if (!row.directorRemuneration.trim()) rowErrors.directorRemuneration = 'Director Remuneration is required';

        setErrors(prev => ({ ...prev, [index]: rowErrors }));
        return Object.keys(rowErrors).length === 0;
    };

    const handleSave = () => {
        let isValid = true;
        const newErrors: Record<number, Record<string, string>> = {};

        directorData.forEach((_, index) => {
            const row = directorData[index];
            const rowErrors: Record<string, string> = {};

            // Personal Details validation
            if (!row.directorDIN.trim()) rowErrors.directorDIN = 'Director DIN is required';
            if (!row.directorName.trim()) rowErrors.directorName = 'Director Name is required';
            if (!row.directorAddress.trim()) rowErrors.directorAddress = 'Director Address is required';
            if (!row.directorDOB.trim()) rowErrors.directorDOB = 'Director DOB is required';
            if (!row.directorGender.trim()) rowErrors.directorGender = 'Director Gender is required';
            if (!row.directorNationality.trim()) rowErrors.directorNationality = 'Director Nationality is required';
            
            // Professional Details validation
            if (!row.directorDesignation.trim()) rowErrors.directorDesignation = 'Director Designation is required';
            if (!row.directorDOJ.trim()) rowErrors.directorDOJ = 'Date of Joining is required';
            if (!row.directorCategory.trim()) rowErrors.directorCategory = 'Director Category is required';
            if (!row.directorAppointmentType.trim()) rowErrors.directorAppointmentType = 'Appointment Type is required';
            
            // Financial Details validation
            if (!row.directorRemuneration.trim()) rowErrors.directorRemuneration = 'Director Remuneration is required';

            if (Object.keys(rowErrors).length > 0) {
                isValid = false;
                newErrors[index] = rowErrors;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            updateFormState('directors', directorData);
            setOpen(0);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Director Details</h2>
                <p className="text-gray-600">Details of company directors for MGT-7</p>
            </div>

            <div className="mb-4">
                <button
                    onClick={addNewRow}
                    disabled={viewMode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add New Director
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DIN</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOJ</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remuneration</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {directorData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.directorDIN}
                                        onChange={(e) => updateRow(index, 'directorDIN', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.directorDIN ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Director DIN"
                                    />
                                    {errors[index]?.directorDIN && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].directorDIN}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={row.directorName}
                                        onChange={(e) => updateRow(index, 'directorName', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.directorName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Director Name"
                                    />
                                    {errors[index]?.directorName && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].directorName}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={row.directorDesignation}
                                        onChange={(e) => updateRow(index, 'directorDesignation', e.target.value)}
                                        disabled={viewMode}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors[index]?.directorDesignation ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Designation</option>
                                        <option value="Managing Director">Managing Director</option>
                                        <option value="Executive Director">Executive Director</option>
                                        <option value="Non-Executive Director">Non-Executive Director</option>
                                        <option value="Independent Director">Independent Director</option>
                                        <option value="Chairman">Chairman</option>
                                        <option value="Vice Chairman">Vice Chairman</option>
                                        <option value="Director">Director</option>
                                    </select>
                                    {errors[index]?.directorDesignation && (
                                        <p className="text-red-500 text-xs mt-1">{errors[index].directorDesignation}</p>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="date"
                                        value={row.directorDoj}
                                        onChange={(e) => updateRow(index, 'directorDoj', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.directorRemuneration}
                                        onChange={(e) => updateRow(index, 'directorRemuneration', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0.00"
                                        step="0.01"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={row.directorShares}
                                        onChange={(e) => updateRow(index, 'directorShares', e.target.value)}
                                        disabled={viewMode}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                        step="1"
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

            {directorData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No directors added yet. Click "Add New Director" to get started.
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

export default DirectorDetails;
