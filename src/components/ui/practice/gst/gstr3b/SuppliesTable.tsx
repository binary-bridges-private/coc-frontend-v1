// import React, { Dispatch, SetStateAction, useState } from 'react';

// interface RowData {
//     placeOfSupply: string;
//     taxableValue: string;
//     integratedTax: string;
// }

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>;
// }

// const SuppliesTable: React.FC<Props> = ({ setOpen }) => {
//     const [unregisteredRows, setUnregisteredRows] = useState<RowData[]>([
//         { placeOfSupply: 'Select', taxableValue: '0.00', integratedTax: '0.00' },
//     ]);
//     const [compositionRows, setCompositionRows] = useState<RowData[]>([
//         { placeOfSupply: 'Select', taxableValue: '0.00', integratedTax: '0.00' },
//     ]);
//     const [uinRows, setUinRows] = useState<RowData[]>([
//         { placeOfSupply: 'Select', taxableValue: '0.00', integratedTax: '0.00' },
//     ]);

//     const addRow = (rows: RowData[], setRows: Dispatch<SetStateAction<RowData[]>>) => {
//         setRows([...rows, { placeOfSupply: 'Select', taxableValue: '0.00', integratedTax: '0.00' }]);
//     };

//     const removeRow = (rows: RowData[], setRows: Dispatch<SetStateAction<RowData[]>>, index: number) => {
//         const newRows = rows.filter((_, i) => i !== index);
//         setRows(newRows);
//     };

//     const handleInputChange = (
//         rows: RowData[],
//         setRows: Dispatch<SetStateAction<RowData[]>>,
//         index: number,
//         field: keyof RowData,
//         value: string
//     ) => {
//         const newRows = [...rows];
//         newRows[index][field] = value;
//         setRows(newRows);
//     };

//     const renderTable = (rows: RowData[], setRows: Dispatch<SetStateAction<RowData[]>>, title: string) => (
//         <div className="mb-10">
//             <h1 className="mb-4 text-xl font-bold">{title}</h1>
//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>Place of Supply (State/UT)</th>
//                             <th>Total Taxable value ($)</th>
//                             <th>Amount of Integrated Tax ($)</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {rows.map((row, index) => (
//                             <tr key={index}>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         className="w-full max-w-xs input input-bordered"
//                                         value={row.placeOfSupply}
//                                         onChange={(e) => handleInputChange(rows, setRows, index, 'placeOfSupply', e.target.value)}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         className="w-full max-w-xs input input-bordered"
//                                         value={row.taxableValue}
//                                         onChange={(e) => handleInputChange(rows, setRows, index, 'taxableValue', e.target.value)}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         className="w-full max-w-xs input input-bordered"
//                                         value={row.integratedTax}
//                                         onChange={(e) => handleInputChange(rows, setRows, index, 'integratedTax', e.target.value)}
//                                     />
//                                 </td>
//                                 <td>
//                                     <button className="mr-2 btn btn-primary" onClick={() => addRow(rows, setRows)}>
//                                         ADD
//                                     </button>
//                                     <button className="btn btn-error" onClick={() => removeRow(rows, setRows, index)}>
//                                         REMOVE
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     return (
//         <div className="p-4">
//             {renderTable(unregisteredRows, setUnregisteredRows, 'Supplies made to Unregistered Persons')}
//             {renderTable(compositionRows, setCompositionRows, 'Supplies made to Composition Taxable Persons')}
//             {renderTable(uinRows, setUinRows, 'Supplies made to UIN holders')}
//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
//             </div>
//         </div>
//     );
// };

// export default SuppliesTable;

// import React, { Dispatch, SetStateAction, useState } from 'react';

// interface RowData {
//     placeOfSupply: string;
//     taxableValue: string;
//     integratedTax: string;
// }

// interface FormData {
//     unregisteredRows: RowData[];
//     compositionRows: RowData[];
//     uinRows: RowData[];
// }

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>;
//     formData?: FormData;
//     updateFormState: (slug: string, data: FormData) => void;
// }

// const SuppliesTable: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     const initialState: FormData = {
//         unregisteredRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
//         compositionRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
//         uinRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
//         ...formData
//     };

//     const [formState, setFormState] = useState<FormData>(initialState);
//     const [hasError, setHasError] = useState(false);

//     const addRow = (rows: RowData[], type: keyof FormData) => {
//         setFormState(prev => ({
//             ...prev,
//             [type]: [...rows, { placeOfSupply: '', taxableValue: '', integratedTax: '' }]
//         }));
//     };

//     const removeRow = (rows: RowData[], type: keyof FormData, index: number) => {
//         const newRows = rows.filter((_, i) => i !== index);
//         setFormState(prev => ({
//             ...prev,
//             [type]: newRows.length > 0 ? newRows : [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }]
//         }));
//     };

//     const handleInputChange = (
//         type: keyof FormData,
//         index: number,
//         field: keyof RowData,
//         value: string
//     ) => {
//         setFormState(prev => {
//             const newRows = [...prev[type]];
//             newRows[index][field] = value;
//             return { ...prev, [type]: newRows };
//         });

//         if (hasError) {
//             setHasError(false);
//         }
//     };

//     const validateForm = (): boolean => {
//         // Check if at least one row has values in all fields
//         const isValid = Object.values(formState).some(rows => 
//             rows.some(row => 
//                 row.placeOfSupply.trim() !== '' && 
//                 row.taxableValue.trim() !== '' && 
//                 row.integratedTax.trim() !== ''
//             )
//         );

//         setHasError(!isValid);
//         return isValid;
//     };

//     const handleSubmit = () => {
//         if (validateForm()) {
//             updateFormState('INTERSTATE_SUPPLIES', formState);
//             setOpen(0);
//         }
//     };

//     const renderTable = (rows: RowData[], type: keyof FormData, title: string) => (
//         <div className="mb-10">
//             <h1 className="mb-4 text-xl font-bold">{title}</h1>
//             <div className="overflow-x-auto">
//                 <table className="table w-full">
//                     <thead>
//                         <tr>
//                             <th>Place of Supply (State/UT)</th>
//                             <th>Total Taxable value (₹)</th>
//                             <th>Amount of Integrated Tax (₹)</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {rows.map((row, index) => (
//                             <tr key={index}>
//                                 <td>
//                                     <input
//                                         type="text"
//                                         className="w-full max-w-xs input input-bordered"
//                                         value={row.placeOfSupply}
//                                         onChange={(e) => handleInputChange(type, index, 'placeOfSupply', e.target.value)}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         className="w-full max-w-xs input input-bordered"
//                                         value={row.taxableValue}
//                                         onChange={(e) => handleInputChange(type, index, 'taxableValue', e.target.value)}
//                                     />
//                                 </td>
//                                 <td>
//                                     <input
//                                         type="number"
//                                         className="w-full max-w-xs input input-bordered"
//                                         value={row.integratedTax}
//                                         onChange={(e) => handleInputChange(type, index, 'integratedTax', e.target.value)}
//                                     />
//                                 </td>
//                                 <td>
//                                     <button 
//                                         className="mr-2 btn btn-primary" 
//                                         onClick={() => addRow(rows, type)}
//                                     >
//                                         ADD
//                                     </button>
//                                     <button 
//                                         className="btn btn-error" 
//                                         onClick={() => removeRow(rows, type, index)}
//                                         disabled={rows.length <= 1}
//                                     >
//                                         REMOVE
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     return (
//         <div className="p-4">
//             {hasError && (
//                 <div className="p-2 mb-4 text-center text-red-500 bg-red-100 rounded">
//                     Please fill in at least one complete row
//                 </div>
//             )}

//             {renderTable(formState.unregisteredRows, 'unregisteredRows', 'Supplies made to Unregistered Persons')}
//             {renderTable(formState.compositionRows, 'compositionRows', 'Supplies made to Composition Taxable Persons')}
//             {renderTable(formState.uinRows, 'uinRows', 'Supplies made to UIN holders')}
            
//             <div className="flex justify-end gap-4 mt-6">
//                 <button className="btn btn-outline" onClick={() => setOpen(0)}>
//                     Back
//                 </button>
//                 <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>
//                     Save
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SuppliesTable;

import React, { Dispatch, SetStateAction, useState } from 'react';

interface RowData {
    placeOfSupply: string;
    taxableValue: string;
    integratedTax: string;
}

interface FormData {
    unregisteredRows: RowData[];
    compositionRows: RowData[];
    uinRows: RowData[];
}

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: FormData;
    updateFormState: (slug: string, data: FormData) => void;
    period?: any;
    viewMode?: boolean;
}

const SuppliesTable: React.FC<Props> = ({ 
    setOpen, 
    formData, 
    updateFormState,
    viewMode = false
}) => {
    const initialState: FormData = {
        unregisteredRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
        compositionRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
        uinRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
        ...formData
    };

    const [formState, setFormState] = useState<FormData>(initialState);
    const [hasError, setHasError] = useState(false);

    const addRow = (rows: RowData[], type: keyof FormData) => {
        if (viewMode) return;
        setFormState(prev => ({
            ...prev,
            [type]: [...rows, { placeOfSupply: '', taxableValue: '', integratedTax: '' }]
        }));
    };

    const removeRow = (rows: RowData[], type: keyof FormData, index: number) => {
        if (viewMode) return;
        const newRows = rows.filter((_, i) => i !== index);
        setFormState(prev => ({
            ...prev,
            [type]: newRows.length > 0 ? newRows : [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }]
        }));
    };

    const handleInputChange = (
        type: keyof FormData,
        index: number,
        field: keyof RowData,
        value: string
    ) => {
        if (viewMode) return;
        
        setFormState(prev => {
            const newRows = [...prev[type]];
            newRows[index][field] = value;
            return { ...prev, [type]: newRows };
        });

        if (hasError) {
            setHasError(false);
        }
    };

    const validateForm = (): boolean => {
        if (viewMode) return true;
        
        const isValid = Object.values(formState).some(rows => 
            rows.some(row => 
                row.placeOfSupply.trim() !== '' && 
                row.taxableValue.trim() !== '' && 
                row.integratedTax.trim() !== ''
            )
        );

        setHasError(!isValid);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateFormState('interStateSupplies', formState);
            setOpen(0);
        }
    };

    const renderTable = (rows: RowData[], type: keyof FormData, title: string) => (
        <div className="mb-10">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Place of Supply (State/UT)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Total Taxable value (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Amount of Integrated Tax (₹)</th>
                            {!viewMode && <th className="p-3 font-medium text-center border border-gray-300">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-300">
                                    <input
                                        type="text"
                                        value={row.placeOfSupply}
                                        onChange={(e) => handleInputChange(type, index, 'placeOfSupply', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        disabled={viewMode}
                                        readOnly={viewMode}
                                    />
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <input
                                        type="number"
                                        value={row.taxableValue}
                                        onChange={(e) => handleInputChange(type, index, 'taxableValue', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        disabled={viewMode}
                                        readOnly={viewMode}
                                    />
                                </td>
                                <td className="p-3 border border-gray-300">
                                    <input
                                        type="number"
                                        value={row.integratedTax}
                                        onChange={(e) => handleInputChange(type, index, 'integratedTax', e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                        disabled={viewMode}
                                        readOnly={viewMode}
                                    />
                                </td>
                                {!viewMode && (
                                    <td className="p-3 border border-gray-300">
                                        <div className="flex justify-center space-x-2">
                                            <button 
                                                className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                                                onClick={() => addRow(rows, type)}
                                            >
                                                Add
                                            </button>
                                            <button 
                                                className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                                                onClick={() => removeRow(rows, type, index)}
                                                disabled={rows.length <= 1}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <>
            {/* Header - matches other components */}
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    3.2 Details of Inter-State Supplies
                </h2>
            </div>

            {/* Error message - matches styling */}
            {hasError && (
                <div className="p-2 mt-4 text-center text-red-500 bg-red-100 rounded">
                    Please fill in at least one complete row
                </div>
            )}

            <div className="p-4">
                {renderTable(formState.unregisteredRows, 'unregisteredRows', 'Supplies made to Unregistered Persons')}
                {renderTable(formState.compositionRows, 'compositionRows', 'Supplies made to Composition Taxable Persons')}
                {renderTable(formState.uinRows, 'uinRows', 'Supplies made to UIN holders')}
                
                {/* Action Buttons - matches styling */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setOpen(0);
                        }}
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${viewMode ? 'bg-gray-500 hover:bg-gray-600' : ''
                            }`}
                        disabled={viewMode}
                    >
                        {viewMode ? 'Close' : 'Save'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SuppliesTable;