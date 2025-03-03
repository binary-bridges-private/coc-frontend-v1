import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}


const NilRated: React.FC<props> = ({ setOpen }) => {
    const description = ["Intra-state supplies to registered person", "Intra-state supplies to unregistered person", "Inter-state supplies to registered person", "Inter-state supplies to unregistered person"];

    return (
        <div>
            <h3 className="font-semibold text-md">8A, 8B, 8C, 8D - Nil Rated, Exempted and Non-GST Supplies</h3>
            <div className='border' />
            <h2 className="pb-2 mt-10 text-lg font-semibold ">
                Item Details
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 font-medium text-center border border-gray-300">Description</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Nil Rated Supplies (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Exempted(Other than Nil rated/non-GST supply) (₹)</th>
                            <th className="p-3 font-medium text-center border border-gray-300">Non-GST Supplies (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {description.map((desc, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="p-3 text-center border border-gray-300">{desc}</td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        placeholder='0.00'
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        placeholder='0.00'
                                        className="w-[70%] p-1 text-center border border-gray-300 rounded-md"
                                    />
                                </td>
                                <td className="p-3 text-center border border-gray-300">
                                    <input
                                        type="number"
                                        placeholder='0.00'
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

export default NilRated;