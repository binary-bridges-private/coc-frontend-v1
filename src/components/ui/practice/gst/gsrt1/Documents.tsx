// import React, { Dispatch, SetStateAction, useState } from 'react';

// interface Props {
//     setOpen: Dispatch<SetStateAction<number>>;
//     formData?: DocumentTables;
//     updateFormState: (slug: string, data: DocumentTables) => void;
//     period: {
//         financialYear: string;
//         quarter: string;
//         month: string;
//         monthName: string;
//     };
// }

// interface DocumentRow {
//     id: number;
//     from: string;
//     to: string;
//     total: string;
//     cancelled: string;
//     netIssued: string;
// }

// interface DocumentTables {
//     rows1: DocumentRow[];
//     rows2: DocumentRow[];
//     rows3: DocumentRow[];
//     rows4: DocumentRow[];
//     rows5: DocumentRow[];
//     rows6: DocumentRow[];
//     rows7: DocumentRow[];
//     rows8: DocumentRow[];
//     rows9: DocumentRow[];
//     rows10: DocumentRow[];
//     rows11: DocumentRow[];
//     rows12: DocumentRow[];
// }

// interface TableRowProps {
//     row: DocumentRow;
//     index: number;
//     handleChange: (tableKey: string, id: number, field: keyof DocumentRow, value: string) => void;
//     removeRow: (tableKey: string, id: number) => void;
//     tableKey: string;
//     errors?: Record<string, string>;
// }

// interface DocumentsTableProps {
//     tableKey: string;
//     rows: DocumentRow[];
//     handleChange: (tableKey: string, id: number, field: keyof DocumentRow, value: string) => void;
//     removeRow: (tableKey: string, id: number) => void;
//     addRow: (tableKey: string) => void;
//     title: string;
//     errors?: Record<number, Record<string, string>>;
// }

// const TableRow: React.FC<TableRowProps> = ({ row, index, handleChange, removeRow, tableKey, errors }) => {
//     return (
//         <tr className="text-sm">
//             <td className="p-2 text-center border">{index + 1}</td>
//             <td className="p-2 border">
//                 <input
//                     type="text"
//                     value={row.from}
//                     onChange={(e) => handleChange(tableKey, row.id, "from", e.target.value)}
//                     className={`w-full input input-bordered input-sm ${errors?.from ? 'input-error' : ''}`}
//                 />
//                 {errors?.from && <p className="text-xs text-red-500">{errors.from}</p>}
//             </td>
//             <td className="p-2 border">
//                 <input
//                     type="text"
//                     value={row.to}
//                     onChange={(e) => handleChange(tableKey, row.id, "to", e.target.value)}
//                     className={`w-full input input-bordered input-sm ${errors?.to ? 'input-error' : ''}`}
//                 />
//                 {errors?.to && <p className="text-xs text-red-500">{errors.to}</p>}
//             </td>
//             <td className="p-2 border">
//                 <input
//                     type="number"
//                     value={row.total}
//                     onChange={(e) => handleChange(tableKey, row.id, "total", e.target.value)}
//                     className={`w-full input input-bordered input-sm ${errors?.total ? 'input-error' : ''}`}
//                 />
//                 {errors?.total && <p className="text-xs text-red-500">{errors.total}</p>}
//             </td>
//             <td className="p-2 border">
//                 <input
//                     type="number"
//                     value={row.cancelled}
//                     onChange={(e) => handleChange(tableKey, row.id, "cancelled", e.target.value)}
//                     className={`w-full input input-bordered input-sm ${errors?.cancelled ? 'input-error' : ''}`}
//                 />
//                 {errors?.cancelled && <p className="text-xs text-red-500">{errors.cancelled}</p>}
//             </td>
//             <td className="p-2 text-center border">
//                 <input
//                     type="number"
//                     value={row.netIssued}
//                     readOnly
//                     className="w-full input input-bordered input-sm"
//                 />
//             </td>
//             <td className="p-2 text-center border">
//                 <button onClick={() => removeRow(tableKey, row.id)} className="btn btn-error btn-xs">
//                     🗑
//                 </button>
//             </td>
//         </tr>
//     );
// };

// const DocumentsTable: React.FC<DocumentsTableProps> = ({
//     tableKey,
//     rows,
//     handleChange,
//     removeRow,
//     addRow,
//     title,
//     errors
// }) => {
//     return (
//         <div className="w-full p-4 overflow-x-auto">
//             <h2 className="text-lg font-semibold">{title}</h2>
//             <table className="table w-full mt-3 border border-collapse border-gray-300">
//                 <thead>
//                     <tr className="text-sm bg-gray-200">
//                         <th className="p-2 border">No.</th>
//                         <th className="p-2 border">Sr. No. <span className="text-red-500">*</span></th>
//                         <th className="p-2 border">Sr. No. <span className="text-red-500">*</span></th>
//                         <th className="p-2 border">Total number <span className="text-red-500">*</span></th>
//                         <th className="p-2 border">Cancelled <span className="text-red-500">*</span></th>
//                         <th className="p-2 border">Net issued</th>
//                         <th className="p-2 border">Action</th>
//                     </tr>
//                     <tr className="text-sm bg-gray-100">
//                         <th className="p-2 border"></th>
//                         <th className="p-2 border">From</th>
//                         <th className="p-2 border">To</th>
//                         <th colSpan={4}></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {rows.map((row, index) => (
//                         <TableRow
//                             key={row.id}
//                             tableKey={tableKey}
//                             row={row}
//                             index={index}
//                             handleChange={handleChange}
//                             removeRow={removeRow}
//                             errors={errors?.[row.id]}
//                         />
//                     ))}
//                 </tbody>
//             </table>
//             <button onClick={() => addRow(tableKey)} className="mt-3 btn btn-primary btn-sm">
//                 ADD DOCUMENT
//             </button>
//         </div>
//     );
// };

// const Documents: React.FC<Props> = ({ setOpen, formData, updateFormState }) => {
//     const initialTables: DocumentTables = {
//         rows1: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows2: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows3: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows4: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows5: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows6: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows7: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows8: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows9: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows10: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows11: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         rows12: [{ id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }],
//         ...formData
//     };

//     const [tables, setTables] = useState<DocumentTables>(initialTables);
//     const [errors, setErrors] = useState<Record<string, Record<number, Record<string, string>>>>({});

//     const tableTitles = [
//         "1. Invoices for outward supply",
//         "2. Invoices for inward supply from unregistered person",
//         "3. Revised Invoice",
//         "4. Debit Note",
//         "5. Credit Note",
//         "6. Receipt voucher",
//         "7. Payment Voucher",
//         "8. Refund voucher",
//         "9. Delivery Challan for job work",
//         "10. Delivery Challan for supply on approval",
//         "11. Delivery Challan in case of liquid gas",
//         "12. Delivery Challan in cases other than by way of supply (excluding at S no. 9 to 11)"
//     ];

//     const validateRow = (row: DocumentRow) => {
//         const rowErrors: Record<string, string> = {};

//         if (!row.from.trim()) rowErrors.from = 'From is required';
//         if (!row.to.trim()) rowErrors.to = 'To is required';
//         if (!row.total.trim()) rowErrors.total = 'Total is required';
//         if (isNaN(Number(row.total))) rowErrors.total = 'Must be a number';
//         if (!row.cancelled.trim()) rowErrors.cancelled = 'Cancelled is required';
//         if (isNaN(Number(row.cancelled))) rowErrors.cancelled = 'Must be a number';

//         return rowErrors;
//     };

//     const handleChange = (tableKey: string, id: number, field: keyof DocumentRow, value: string) => {
//         setTables(prevTables => ({
//             ...prevTables,
//             [tableKey]: prevTables[tableKey as keyof DocumentTables].map(row =>
//                 row.id === id
//                     ? {
//                         ...row,
//                         [field]: value,
//                         netIssued: field === "total" || field === "cancelled"
//                             ? calculateNet(
//                                 field === "total" ? value : row.total,
//                                 field === "cancelled" ? value : row.cancelled
//                             )
//                             : row.netIssued
//                     }
//                     : row
//             )
//         }));
//     };

//     const calculateNet = (total: string, cancelled: string) => {
//         const totalNum = parseInt(total) || 0;
//         const cancelledNum = parseInt(cancelled) || 0;
//         return Math.max(totalNum - cancelledNum, 0).toString();
//     };

//     const addRow = (tableKey: string) => {
//         setTables(prevTables => {
//             const currentRows = prevTables[tableKey as keyof DocumentTables];
//             const newId = currentRows.length > 0 ? Math.max(...currentRows.map(r => r.id)) + 1 : 1;

//             return {
//                 ...prevTables,
//                 [tableKey]: [
//                     ...currentRows,
//                     {
//                         id: newId,
//                         from: "",
//                         to: "",
//                         total: "",
//                         cancelled: "",
//                         netIssued: ""
//                     }
//                 ],
//             };
//         });
//     };

//     const removeRow = (tableKey: string, id: number) => {
//         setTables(prevTables => ({
//             ...prevTables,
//             [tableKey]: prevTables[tableKey as keyof DocumentTables].filter(row => row.id !== id),
//         }));
//     };

//     const handleSubmit = () => {
//         updateFormState('DOCUMENTS', tables);
//         setOpen(0);
//         // }
//     };

//     return (
//         <div className="space-y-6">
//             <h3 className="font-semibold text-md">Documents issued during the tax period</h3>
//             <div className='border' />
//             <h2 className="mt-4 text-md">
//                 Note: Kindly click on save button after any modification (add, edit, delete) to save the changes
//             </h2>

//             {Object.keys(tables).map((tableKey, index) => (
//                 <DocumentsTable
//                     key={tableKey}
//                     tableKey={tableKey}
//                     rows={tables[tableKey as keyof DocumentTables]}
//                     handleChange={handleChange}
//                     removeRow={removeRow}
//                     addRow={addRow}
//                     title={tableTitles[index] || `Table ${index + 1}`}
//                     errors={errors[tableKey]}
//                 />
//             ))}

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

// export default Documents;

import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react';

// Define consistent input classes
const inputClass = "w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
const disabledInputClass = "w-full p-2 text-sm bg-gray-100 border border-gray-200 rounded-md text-gray-600"

interface Props {
    setOpen: Dispatch<SetStateAction<number>>;
    formData?: DocumentTables;
    updateFormState: (slug: string, data: DocumentTables) => void;
    period: {
        financialYear: string;
        quarter: string;
        month: string;
        monthName: string;
    };
    viewMode?: boolean;
}

interface DocumentRow {
    id: number;
    from: string;
    to: string;
    total: string;
    cancelled: string;
    netIssued: string;
}

interface DocumentTables {
    rows1: DocumentRow[];
    rows2: DocumentRow[];
    rows3: DocumentRow[];
    rows4: DocumentRow[];
    rows5: DocumentRow[];
    rows6: DocumentRow[];
    rows7: DocumentRow[];
    rows8: DocumentRow[];
    rows9: DocumentRow[];
    rows10: DocumentRow[];
    rows11: DocumentRow[];
    rows12: DocumentRow[];
}

interface TableRowProps {
    row: DocumentRow;
    index: number;
    handleChange: (tableKey: string, id: number, field: keyof DocumentRow, value: string) => void;
    removeRow: (tableKey: string, id: number) => void;
    tableKey: string;
    errors?: Record<string, string>;
    viewMode?: boolean;
}

interface DocumentsTableProps {
    tableKey: string;
    rows: DocumentRow[];
    handleChange: (tableKey: string, id: number, field: keyof DocumentRow, value: string) => void;
    removeRow: (tableKey: string, id: number) => void;
    addRow: (tableKey: string) => void;
    title: string;
    errors?: Record<number, Record<string, string>>;
    viewMode?: boolean;
}

const TableRow: FC<TableRowProps> = ({ row, index, handleChange, removeRow, tableKey, errors, viewMode }) => {
    return (
        <tr className="text-sm hover:bg-gray-50">
            <td className="p-2 text-center border border-gray-200">{index + 1}</td>
            <td className="p-2 border border-gray-200">
                <input
                    type="text"
                    value={row.from}
                    onChange={(e) => handleChange(tableKey, row.id, "from", e.target.value)}
                    className={viewMode ? disabledInputClass : `${inputClass} ${errors?.from ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    disabled={viewMode}
                    readOnly={viewMode}
                />
                {!viewMode && errors?.from && <p className="mt-1 text-xs text-red-600">{errors.from}</p>}
            </td>
            <td className="p-2 border border-gray-200">
                <input
                    type="text"
                    value={row.to}
                    onChange={(e) => handleChange(tableKey, row.id, "to", e.target.value)}
                    className={viewMode ? disabledInputClass : `${inputClass} ${errors?.to ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    disabled={viewMode}
                    readOnly={viewMode}
                />
                {!viewMode && errors?.to && <p className="mt-1 text-xs text-red-600">{errors.to}</p>}
            </td>
            <td className="p-2 border border-gray-200">
                <input
                    type="number"
                    value={row.total}
                    onChange={(e) => handleChange(tableKey, row.id, "total", e.target.value)}
                    className={viewMode ? disabledInputClass : `${inputClass} ${errors?.total ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    disabled={viewMode}
                    readOnly={viewMode}
                />
                {!viewMode && errors?.total && <p className="mt-1 text-xs text-red-600">{errors.total}</p>}
            </td>
            <td className="p-2 border border-gray-200">
                <input
                    type="number"
                    value={row.cancelled}
                    onChange={(e) => handleChange(tableKey, row.id, "cancelled", e.target.value)}
                    className={viewMode ? disabledInputClass : `${inputClass} ${errors?.cancelled ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    disabled={viewMode}
                    readOnly={viewMode}
                />
                {!viewMode && errors?.cancelled && <p className="mt-1 text-xs text-red-600">{errors.cancelled}</p>}
            </td>
            <td className="p-2 text-center border border-gray-200">
                <input
                    type="number"
                    value={row.netIssued}
                    readOnly
                    className={disabledInputClass}
                />
            </td>
            {!viewMode && (
                <td className="p-2 text-center border border-gray-200">
                    <button
                        onClick={() => removeRow(tableKey, row.id)}
                        className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Remove
                    </button>
                </td>
            )}
        </tr>
    );
};

const DocumentsTable: FC<DocumentsTableProps> = ({
    tableKey,
    rows,
    handleChange,
    removeRow,
    addRow,
    title,
    errors,
    viewMode
}) => {
    return (
        <div className="w-full p-4 mb-6 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <div className="mt-3 overflow-x-auto">
                <table className="w-full border border-collapse border-gray-200">
                    <thead>
                        <tr className="text-sm bg-gray-50">
                            <th className="p-2 border border-gray-200">No.</th>
                            <th className="p-2 border border-gray-200">Sr. No. <span className="text-red-500">*</span></th>
                            <th className="p-2 border border-gray-200">Sr. No. <span className="text-red-500">*</span></th>
                            <th className="p-2 border border-gray-200">Total number <span className="text-red-500">*</span></th>
                            <th className="p-2 border border-gray-200">Cancelled <span className="text-red-500">*</span></th>
                            <th className="p-2 border border-gray-200">Net issued</th>
                            {!viewMode && <th className="p-2 border border-gray-200">Action</th>}
                        </tr>
                        <tr className="text-sm bg-gray-100">
                            <th className="p-2 border border-gray-200"></th>
                            <th className="p-2 border border-gray-200">From</th>
                            <th className="p-2 border border-gray-200">To</th>
                            <th colSpan={viewMode ? 3 : 4} className="p-2 border border-gray-200"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                                tableKey={tableKey}
                                row={row}
                                index={index}
                                handleChange={handleChange}
                                removeRow={removeRow}
                                errors={errors?.[row.id]}
                                viewMode={viewMode}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            {!viewMode && (
                <button
                    onClick={() => addRow(tableKey)}
                    className="px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Add Document
                </button>
            )}
        </div>
    );
};

const Documents: FC<Props> = ({ setOpen, formData, updateFormState, viewMode = false }) => {
    const initialTables: DocumentTables = {
        rows1: [],
        rows2: [],
        rows3: [],
        rows4: [],
        rows5: [],
        rows6: [],
        rows7: [],
        rows8: [],
        rows9: [],
        rows10: [],
        rows11: [],
        rows12: [],
        ...formData
    };

    const [tables, setTables] = useState<DocumentTables>(initialTables);
    const [errors, setErrors] = useState<Record<string, Record<number, Record<string, string>>>>({});

    const tableTitles = [
        "1. Invoices for outward supply",
        "2. Invoices for inward supply from unregistered person",
        "3. Revised Invoice",
        "4. Debit Note",
        "5. Credit Note",
        "6. Receipt voucher",
        "7. Payment Voucher",
        "8. Refund voucher",
        "9. Delivery Challan for job work",
        "10. Delivery Challan for supply on approval",
        "11. Delivery Challan in case of liquid gas",
        "12. Delivery Challan in cases other than by way of supply (excluding at S no. 9 to 11)"
    ];

    const validateRow = (row: DocumentRow) => {
        const rowErrors: Record<string, string> = {};

        if (!row.from.trim()) rowErrors.from = 'From is required';
        if (!row.to.trim()) rowErrors.to = 'To is required';
        if (!row.total.trim()) rowErrors.total = 'Total is required';
        if (isNaN(Number(row.total))) rowErrors.total = 'Must be a number';
        if (!row.cancelled.trim()) rowErrors.cancelled = 'Cancelled is required';
        if (isNaN(Number(row.cancelled))) rowErrors.cancelled = 'Must be a number';

        return rowErrors;
    };

    const validateAllTables = () => {
        const newErrors: Record<string, Record<number, Record<string, string>>> = {};
        let isValid = true;

        Object.keys(tables).forEach(tableKey => {
            const tableErrors: Record<number, Record<string, string>> = {};

            tables[tableKey as keyof DocumentTables].forEach(row => {
                const rowErrors = validateRow(row);
                if (Object.keys(rowErrors).length > 0) {
                    tableErrors[row.id] = rowErrors;
                    isValid = false;
                }
            });

            if (Object.keys(tableErrors).length > 0) {
                newErrors[tableKey] = tableErrors;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (tableKey: string, id: number, field: keyof DocumentRow, value: string) => {
        if (viewMode) return;

        setTables(prevTables => ({
            ...prevTables,
            [tableKey]: prevTables[tableKey as keyof DocumentTables].map(row =>
                row.id === id
                    ? {
                        ...row,
                        [field]: value,
                        netIssued: field === "total" || field === "cancelled"
                            ? calculateNet(
                                field === "total" ? value : row.total,
                                field === "cancelled" ? value : row.cancelled
                            )
                            : row.netIssued
                    }
                    : row
            )
        }));
    };

    const calculateNet = (total: string, cancelled: string) => {
        const totalNum = parseInt(total) || 0;
        const cancelledNum = parseInt(cancelled) || 0;
        return Math.max(totalNum - cancelledNum, 0).toString();
    };

    const addRow = (tableKey: string) => {
        if (viewMode) return;

        setTables(prevTables => {
            const currentRows = prevTables[tableKey as keyof DocumentTables];
            const newId = currentRows.length > 0 ? Math.max(...currentRows.map(r => r.id)) + 1 : 1;

            return {
                ...prevTables,
                [tableKey]: [
                    ...currentRows,
                    {
                        id: newId,
                        from: "",
                        to: "",
                        total: "",
                        cancelled: "",
                        netIssued: ""
                    }
                ],
            };
        });
    };

    const removeRow = (tableKey: string, id: number) => {
        if (viewMode) return;

        setTables(prevTables => ({
            ...prevTables,
            [tableKey]: prevTables[tableKey as keyof DocumentTables].filter(row => row.id !== id),
        }));
    };

    const handleSubmit = () => {
        if (viewMode) {
            setOpen(0);
            return;
        }

        if (validateAllTables()) {
            updateFormState('documents', tables);
            setOpen(0);
        }
    };

    return (
        <>
            <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Documents issued during the tax period
                    {viewMode && <span className="ml-2 text-gray-500">(View Mode)</span>}
                </h2>
            </div>
            <div className="p-4 space-y-6">
                <p className="mt-4 text-gray-700 text-md">
                    Note: Kindly click on save button after any modification (add, edit, delete) to save the changes
                </p>

                <div className="space-y-6">
                    {Object.keys(tables).map((tableKey, index) => (
                        <DocumentsTable
                            key={tableKey}
                            tableKey={tableKey}
                            rows={tables[tableKey as keyof DocumentTables]}
                            handleChange={handleChange}
                            removeRow={removeRow}
                            addRow={addRow}
                            title={tableTitles[index] || `Table ${index + 1}`}
                            errors={errors[tableKey]}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() => setOpen(0)}
                    >
                        {viewMode ? 'Close' : 'Cancel'}
                    </button>
                    {!viewMode && (
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Documents;