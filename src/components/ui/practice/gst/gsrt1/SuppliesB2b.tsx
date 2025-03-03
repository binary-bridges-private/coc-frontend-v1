import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}


const SuppliesB2b: React.FC<props> = ({ setOpen }) => {

    const [taxableValues, setTaxableValues] = useState({});
    const [integratedTax, setIntegratedTax] = useState(0);
    const [cess, setCess] = useState(0);

    const taxRates = [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28];

    const handleTaxableValueChange = (rate, value) => {
        setTaxableValues((prevValues) => ({
            ...prevValues,
            [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
        }));
    };

    const calculateTax = (rate, value) => {
        return ((value * rate) / 100).toFixed(2);
    };


    return (
        <div>
            <h3 className="font-semibold text-md">B2B, SEZ, DE - Add Invoice</h3>
            <div className='border' />
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input type="checkbox" className="checkbox" />
                    <span>Deemed Exports</span>
                </label>
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input type="checkbox" className="checkbox" />
                    <span>SEZ Supplies with payment</span>
                </label>
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input type="checkbox" className="checkbox" />
                    <span>SEZ Supplies without payment</span>
                </label>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supplier GSTIN/UIN *</label>
                    <input type="text" placeholder="Supplier GSTIN/UIN" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Supplier Name *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>

            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Recipient GSTIN/UIN *</label>
                    <input type="text" placeholder="Recipient GSTIN/UIN" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Recipient name *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Document number *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Document date *</label>
                    <input type="date" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Total value of supplies made (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">POS *</label>
                    <input type="text" placeholder=" " className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supply type</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>

            {/* <div className="mx-auto bg-white rounded-lg"> */}
            <h2 className="pb-2 mt-10 text-lg font-semibold ">
                Item Details
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Csess (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taxRates.map((rate, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 text-center border border-gray-300">{rate}%</td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        value={taxableValues[rate] || 0}
                                        onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    {calculateTax(rate, taxableValues[rate] || 0)}
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
            </div>
        </div>
    )
}

export default SuppliesB2b