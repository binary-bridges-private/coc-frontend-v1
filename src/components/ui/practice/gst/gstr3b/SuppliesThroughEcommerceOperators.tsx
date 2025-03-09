import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const SuppliesThroughEcommerceOperators: React.FC<props> = ({ setOpen }) => {

    const supplies = ["(i) Taxable supplies on which electronic commerce operator pays tax u/s 9(5) [to be furnished by electronic commerce operator]", "(ii) Taxable supplies made by registered person through electronic commerce operator, on which electronic commerce operator is required to pay tax u/s 9(5) [to be furnished by registered person making supplies through electronic commerce operator]	"];

    return (
        <div>
            <h3 className="font-semibold text-md">3.1.1 Details of supplies notified under section 9(5) of the CGST Act, 2017 and corresponding provision in IGST/UTGST/SGST Acts</h3>
            <div className='border' />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Description</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Total Taxable value (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">CESS (₹)</th>
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

export default SuppliesThroughEcommerceOperators;