import React, { Dispatch, SetStateAction, useState } from 'react'

interface props {
    setOpen: Dispatch<SetStateAction<number>>
}


const SuppliesThroughEco: React.FC<props> = ({ setOpen }) => {

    const [taxState, setTaxState] = useState(0);


    return (
        <div>
            <h3 className="font-semibold text-md">Supplies made through E-Commerce Operators - u/s 52 (TCS) - Add Details</h3>
            <div className='border' />

            <div className="grid grid-cols-1 gap-4 mt-10 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">GSTIN of e-commerce operator *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Trade/Legal Name *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Net value of supplies (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">Integrated tax (₹) *</label>
                    <input type="text" placeholder="" className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">Central tax (₹) *</label>
                    <input type="text" placeholder=" " value={taxState} onChange={(e: any) => setTaxState(e.target.value)} className="w-full text-sm font-medium input input-bordered" />
                </div>
                <div>
                    <label className="block text-sm font-medium">State/UT tax (₹) *</label>
                    <input type="text" placeholder="" value={taxState} onChange={(e: any) => setTaxState(e.target.value)} className="w-full text-sm font-medium input input-bordered" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
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

export default SuppliesThroughEco