import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const PaymentOfTax: React.FC<props> = ({ setOpen }) => {

    const supplies = ["Tax","Interest", "Late Fees"];

    return (
        <div>
            <h3 className="font-semibold text-md">6.1 Payment of tax
            </h3>
            <div className='border' />
            <div className="mt-10 overflow-scroll w-[100%] ">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Description</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> CESS (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Cash Ledger Balance <br /> Total (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Integrated Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Central Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> State/UT Tax (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> CESS (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Credit Ledger Balance <br /> (including current month's credit) <br /> Total (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supplies.map((rate, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 border border-gray-300 ">{rate}</td>
                                <td className="p-3 text-center border border-gray-300 ">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        // value={taxableValues[rate] || 0}
                                        // onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                                        className="w-[150px] p-1 text-center border border-gray-300 rounded-md"
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

export default PaymentOfTax;