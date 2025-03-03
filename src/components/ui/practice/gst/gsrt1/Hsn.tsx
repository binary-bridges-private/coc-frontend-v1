import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}

const Hsn: React.FC<props> = ({ setOpen }) => {
    return (
        <div>
            <h3 className="font-semibold text-md">HSN - wise summary of outward supplies</h3>
            <div className='border' />
            <ul className="mt-4 text-md ">
                Note:

                <li className="mt-1 text-sm ">
                    1. In case there are no suggestions for any HSN, then after typing the required HSN; click on description/UQC to enable other fields.

                </li>
                <li className="mt-1 text-sm ">
                    2. Please select HSN from the search results dropdown only. In case HSN entered is not available, you can enter HSN manually

                </li>
                <li className="mt-1 text-sm ">
                    3. Kindly click on save button after any modification( add, edit) to save the changes

                </li>
            </ul>

            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">HSN *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Product name as in Master *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">UQC *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Total Quantity *</label>
                    <input type="date" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Total taxable value (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Rate (%) *</label>
                    <input type="text" placeholder=" " className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Integrated tax (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Central tax (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">State/UT tax (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Cess (₹)</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => { setOpen(0) }}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => { setOpen(0) }} >Save</button>
            </div>
        </div>
    )
}

export default Hsn