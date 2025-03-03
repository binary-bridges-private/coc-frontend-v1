import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const CreditUnregistered: React.FC<props> = ({ setOpen }) => {

    const [taxableValues, setTaxableValues] = useState({});
    const [isDifferentialTax, setIsDifferentialTax] = useState(false);
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
        let applicableRate = isDifferentialTax ? (rate * 65) / 100 : rate;  // Apply 65% if checkbox is checked
        return ((value * applicableRate) / 100).toFixed(2);
    };

    return (
        <div>
            <h3 className="font-semibold text-md">Credit/Debit Notes (Unregistered)</h3>
            <div className='border' />
            {/* <div className="grid grid-cols-1 gap-4 mt-10">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input type="checkbox" className="checkbox" />
                    <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
                </label>
            </div> */}

            <div className="grid items-center grid-cols-1 gap-4 mt-10 md:grid-cols-2">
                <label className="flex items-center space-x-2 text-sm font-medium">
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={isDifferentialTax}
                        onChange={() => setIsDifferentialTax(!isDifferentialTax)}
                    />
                    <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
                </label>

                {isDifferentialTax && (
                    <div className="flex items-center justify-end">
                        <label className="mr-2 text-sm font-medium">Applicable % of Tax Rate</label>
                        <input
                            type="text"
                            value="65%"
                            className="w-16 p-1 text-center bg-gray-100 border border-gray-300 rounded-md"
                            readOnly
                        />
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Type *</label>
                    {/* <input type="text" placeholder="Total invoice value (₹)" className="w-full text-sm font-medium input input-bordered" /> */}
                    <select className='w-full text-sm font-medium input input-bordered'>
                        <option>Select</option>
                        <option>B2CL</option>
                        <option>Exports with payment</option>
                        <option>Exports without payment</option>

                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">Debit/Credit Note No. *</label>
                    <input type="text" placeholder="Invoice no." className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Debit/Credit Note Date *</label>
                    <input type="date" placeholder="Invoice date" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Note value (₹) *</label>
                    <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Note Type *</label>
                    {/* <input type="text" placeholder="Total invoice value (₹)" className="w-full text-sm font-medium input input-bordered" /> */}
                    <select className='w-full text-sm font-medium input input-bordered'>
                        <option>Select</option>
                        <option>Credit</option>
                        <option>Debit</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium">POS *</label>
                    <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Supply Type</label>
                    <input type="text" placeholder="Supply Type" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Source</label>
                    <input type="text" placeholder="Source" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">IRN</label>
                    <input type="text" placeholder="IRN" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">IRN date</label>
                    <input type="text" placeholder="IRN date" className="w-full text-sm font-medium input input-bordered" />
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
                            <th className="p-3 font-medium text-center border border-gray-300">Amount of Tax (₹)</th>
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

export default CreditUnregistered