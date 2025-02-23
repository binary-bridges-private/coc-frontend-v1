import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
}

const StateSpecificInfo: React.FC<Props> = ({ setStep }) => {
    return (
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="pb-2 mb-4 text-lg font-semibold border-b">
                State Specific Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Professional Tax Employee Code (EC) No.
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Professions Tax E.C Number"
                        className="w-full input input-bordered"
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium">
                        Professional Tax Registration Certificate (RC) No.
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Professions Tax R.C Number"
                        className="w-full input input-bordered"
                    />
                </div>
            </div>

            <div className="p-4 mt-6 bg-gray-100 rounded-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            State Excise License No.
                        </label>
                        <input
                            type="text"
                            placeholder="Enter State Excise License Number"
                            className="w-full input input-bordered"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Name of the person in whose name Excise License is held
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name of the Person in whose name Excise License is held"
                            className="w-full input input-bordered"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">

                <button className="btn btn-outline" onClick={() => setStep(8)}>Back</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => setStep(10)}>Save & Continue</button>
            </div>
        </div>
    );
};

export default StateSpecificInfo;
