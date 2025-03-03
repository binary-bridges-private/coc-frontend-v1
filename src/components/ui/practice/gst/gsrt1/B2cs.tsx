import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const B2cs: React.FC<props> = ({ setOpen }) => {
    
    const [isDifferentialTax, setIsDifferentialTax] = useState(false);

    const calculateTax = (rate, value) => {
        let applicableRate = isDifferentialTax ? (rate * 65) / 100 : rate;  // Apply 65% if checkbox is checked
        return ((value * applicableRate) / 100).toFixed(2);
    };


    return (
        <div>
            <h3 className="font-semibold text-md">B2CS- Add Details</h3>
            <div className='border' />
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">POS *</label>
                    <input type="text" placeholder="POS " className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Taxable value (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Supply Type *</label>
                    <input type="text" placeholder="Inter State" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
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
                    <label className="block text-sm font-medium">Rate *</label>
                    <input type="text" placeholder="Rate" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Integrated Tax (₹) *</label>
                    <input type="number" placeholder="0.00 " className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">CESS (₹)</label>
                    <input type="number" placeholder="0.00" className="w-full text-sm font-medium input input-bordered" />
                </div>

            </div>
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
            </div>
        </div>
    )
}

export default B2cs