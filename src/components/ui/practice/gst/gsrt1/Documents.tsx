import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const TableRow = ({ row, index, handleChange, removeRow, tableKey }) => {
    return (
        <tr className="text-sm">
            <td className="p-2 text-center border">{index + 1}</td>
            <td className="p-2 border">
                <input
                    type="text"
                    value={row.from}
                    onChange={(e) => handleChange(tableKey, row.id, "from", e.target.value)}
                    className="w-full input input-bordered input-sm"
                />
            </td>
            <td className="p-2 border">
                <input
                    type="text"
                    value={row.to}
                    onChange={(e) => handleChange(tableKey, row.id, "to", e.target.value)}
                    className="w-full input input-bordered input-sm"
                />
            </td>
            <td className="p-2 border">
                <input
                    type="number"
                    value={row.total}
                    onChange={(e) => handleChange(tableKey, row.id, "total", e.target.value)}
                    className="w-full input input-bordered input-sm"
                />
            </td>
            <td className="p-2 border">
                <input
                    type="number"
                    value={row.cancelled}
                    onChange={(e) => handleChange(tableKey, row.id, "cancelled", e.target.value)}
                    className="w-full input input-bordered input-sm"
                />
            </td>
            <td className="p-2 text-center border">
                <input
                    type="number"
                    value={row.netIssued}
                    // disabled
                    className="w-full input input-bordered input-sm "
                />
            </td>
            <td className="p-2 text-center border">
                <button onClick={() => removeRow(tableKey, row.id)} className="btn btn-error btn-xs">
                    🗑
                </button>
            </td>
        </tr>
    );
};

const DocumentsTable = ({ tableKey, rows, handleChange, removeRow, addRow, title }) => {
    return (
        <div className="w-full p-4 overflow-x-auto">
            <h2 className="text-lg font-semibold">{title}</h2>
            <table className="table w-full mt-3 border border-collapse border-gray-300">
                <thead>
                    <tr className="text-sm bg-gray-200">
                        <th className="p-2 border">No.</th>
                        <th className="p-2 border">Sr. No. <span className="text-red-500">*</span></th>
                        <th className="p-2 border">Sr. No. <span className="text-red-500">*</span></th>
                        <th className="p-2 border">Total number <span className="text-red-500">*</span></th>
                        <th className="p-2 border">Cancelled <span className="text-red-500">*</span></th>
                        <th className="p-2 border">Net issued</th>
                    </tr>
                    <tr className="text-sm bg-gray-100">
                        <th className="p-2 border"></th>
                        <th className="p-2 border">From</th>
                        <th className="p-2 border">To</th>
                        <th colSpan={3}></th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <TableRow key={row.id} tableKey={tableKey} row={row} index={index} handleChange={handleChange} removeRow={removeRow} />
                    ))}
                </tbody>
            </table>
            <button onClick={() => addRow(tableKey)} className="mt-3 btn btn-primary">ADD DOCUMENT</button>
        </div>
    );
};

const Documents: React.FC<props> = ({ setOpen }) => {
    const initialRow = { id: 1, from: "", to: "", total: "", cancelled: "", netIssued: "" };

    const [tables, setTables] = useState({
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
    });

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

    const handleChange = (tableKey, id, field, value) => {
        setTables((prevTables) => ({
            ...prevTables,
            [tableKey]: prevTables[tableKey].map((row) =>
                row.id === id
                    ? {
                        ...row,
                        [field]: value,
                        netIssued: calculateNet(
                            field === "total" ? value : row.total,
                            field === "cancelled" ? value : row.cancelled
                        )
                    }
                    : row
            )
        }));
    };

    const calculateNet = (total, cancelled) => {
        const totalNum = parseInt(total) || 0;
        const cancelledNum = parseInt(cancelled) || 0;
        return Math.max(totalNum - cancelledNum, 0).toString();
    };

    const addRow = (tableKey) => {
        setTables((prevTables) => ({
            ...prevTables,
            [tableKey]: [
                ...prevTables[tableKey],
                { id: prevTables[tableKey].length + 1, from: "", to: "", total: "", cancelled: "", netIssued: "" }
            ],
        }));
    };

    const removeRow = (tableKey, id) => {
        setTables((prevTables) => ({
            ...prevTables,
            [tableKey]: prevTables[tableKey].filter((row) => row.id !== id),
        }));
    };

    return (
        <div className="space-y-6">
            <h3 className="font-semibold text-md">Documents issued during the tax period</h3>
            <div className='border' />
            <h2 className="mt-4 text-md ">Note: Kindly click on save button after any modification( add, edit, delete) to save the changes
            </h2>

            {Object.keys(tables).map((tableKey, index) => (
                <DocumentsTable
                    key={tableKey}
                    tableKey={tableKey}
                    rows={tables[tableKey]}
                    handleChange={handleChange}
                    removeRow={removeRow}
                    addRow={addRow}
                    title={tableTitles[index] || `Table ${index + 1}`}
                />
            ))}
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
            </div>
        </div>
    );
};

export default Documents;
