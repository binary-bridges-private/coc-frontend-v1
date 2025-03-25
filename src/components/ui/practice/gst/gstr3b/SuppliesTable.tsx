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
}

const SuppliesTable: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
    const initialState: FormData = {
        unregisteredRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
        compositionRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
        uinRows: [{ placeOfSupply: '', taxableValue: '', integratedTax: '' }],
        ...formData
    };

    const [formState, setFormState] = useState<FormData>(initialState);
    const [hasError, setHasError] = useState(false);

    const addRow = (rows: RowData[], type: keyof FormData) => {
        setFormState(prev => ({
            ...prev,
            [type]: [...rows, { placeOfSupply: '', taxableValue: '', integratedTax: '' }]
        }));
    };

    const removeRow = (rows: RowData[], type: keyof FormData, index: number) => {
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
        // Check if at least one row has values in all fields
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
            updateFormState('INTERSTATE_SUPPLIES', formState);
            setOpen(0);
        }
    };

    const renderTable = (rows: RowData[], type: keyof FormData, title: string) => (
        <div className="mb-10">
            <h1 className="mb-4 text-xl font-bold">{title}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Place of Supply (State/UT)</th>
                            <th>Total Taxable value (₹)</th>
                            <th>Amount of Integrated Tax (₹)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        className="w-full max-w-xs input input-bordered"
                                        value={row.placeOfSupply}
                                        onChange={(e) => handleInputChange(type, index, 'placeOfSupply', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="w-full max-w-xs input input-bordered"
                                        value={row.taxableValue}
                                        onChange={(e) => handleInputChange(type, index, 'taxableValue', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="w-full max-w-xs input input-bordered"
                                        value={row.integratedTax}
                                        onChange={(e) => handleInputChange(type, index, 'integratedTax', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <button 
                                        className="mr-2 btn btn-primary" 
                                        onClick={() => addRow(rows, type)}
                                    >
                                        ADD
                                    </button>
                                    <button 
                                        className="btn btn-error" 
                                        onClick={() => removeRow(rows, type, index)}
                                        disabled={rows.length <= 1}
                                    >
                                        REMOVE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="p-4">
            {hasError && (
                <div className="p-2 mb-4 text-center text-red-500 bg-red-100 rounded">
                    Please fill in at least one complete row
                </div>
            )}

            {renderTable(formState.unregisteredRows, 'unregisteredRows', 'Supplies made to Unregistered Persons')}
            {renderTable(formState.compositionRows, 'compositionRows', 'Supplies made to Composition Taxable Persons')}
            {renderTable(formState.uinRows, 'uinRows', 'Supplies made to UIN holders')}
            
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setOpen(0)}>
                    Back
                </button>
                <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default SuppliesTable;