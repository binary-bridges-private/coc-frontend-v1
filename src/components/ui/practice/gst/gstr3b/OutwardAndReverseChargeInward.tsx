import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const OutwardAndReverseChargeInward: React.FC<props> = ({ setOpen }) => {

    // const [taxableValues, setTaxableValues] = useState({});
    // const [isDifferentialTax, setIsDifferentialTax] = useState(false);
    // const [integratedTax, setIntegratedTax] = useState(0);
    // const [cess, setCess] = useState(0);

    const supplies = ["(a) Outward taxable supplies (other than zero rated, nil rated and exempted)", "(b) Outward taxable supplies (zero rated )",
        "(c) Other outward supplies (Nil rated, exempted)	", "(d) Inward supplies (liable to reverse charge)", "(e) Non-GST outward supplies"
    ];

    // const handleTaxableValueChange = (rate, value) => {
    //     setTaxableValues((prevValues) => ({
    //         ...prevValues,(e) Non-GST outward supplies
    //         [rate]: isNaN(parseFloat(value)) ? 0 : parseFloat(value),
    //     }));
    // };

    // const calculateTax = (rate, value) => {
    //     let applicableRate = isDifferentialTax ? (rate * 65) / 100 : rate;  // Apply 65% if checkbox is checked
    //     return ((value * applicableRate) / 100).toFixed(2);
    // };

    return (
        <div>
            <h3 className="font-semibold text-md">3.1 Details of Outward Supplies and inward supplies liable to reverse charge (other than those covered by Table 3.1.1)</h3>
            <div className='border' />
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Nature of Supplies</th>
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

export default OutwardAndReverseChargeInward;