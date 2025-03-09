import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const InwardSupplies: React.FC<props> = ({ setOpen }) => {

    const supplies = ["From a supplier under composition scheme, Exempt and Nil rated supply", "Non GST supply" ];

    return (
        <div>
            <h3 className="font-semibold text-md">5. Values of exempt, nil-rated and non-GST inward supplies
            </h3>
            <div className='border' />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Inter-State Supplies (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Intra-State Supplies (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.map((rate, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-300 ">{rate}</td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
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
            {/* </div> */}

            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
            </div>
        </div>
    )
}

export default InwardSupplies;