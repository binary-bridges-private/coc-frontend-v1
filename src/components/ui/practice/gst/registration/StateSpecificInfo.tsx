// import React, { Dispatch, SetStateAction } from "react";
// import { useState } from "react";

// interface Props {
//     setStep: Dispatch<SetStateAction<number>>;
// }

// const StateSpecificInfo: React.FC<Props> = ({ setStep }) => {
//     return (
//         <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//             <h2 className="pb-2 mb-4 text-lg font-semibold border-b">
//                 State Specific Information
//             </h2>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div>
//                     <label className="block mb-1 text-sm font-medium">
//                         Professional Tax Employee Code (EC) No.
//                     </label>
//                     <input
//                         type="text"
//                         placeholder="Enter Professions Tax E.C Number"
//                         className="w-full input input-bordered"
//                     />
//                 </div>

//                 <div>
//                     <label className="block mb-1 text-sm font-medium">
//                         Professional Tax Registration Certificate (RC) No.
//                     </label>
//                     <input
//                         type="text"
//                         placeholder="Enter Professions Tax R.C Number"
//                         className="w-full input input-bordered"
//                     />
//                 </div>
//             </div>

//             <div className="p-4 mt-6 bg-gray-100 rounded-lg">
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                     <div>
//                         <label className="block mb-1 text-sm font-medium">
//                             State Excise License No.
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter State Excise License Number"
//                             className="w-full input input-bordered"
//                         />
//                     </div>

//                     <div>
//                         <label className="block mb-1 text-sm font-medium">
//                             Name of the person in whose name Excise License is held
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter Name of the Person in whose name Excise License is held"
//                             className="w-full input input-bordered"
//                         />
//                     </div>
//                 </div>
//             </div>

//             <div className="flex justify-end gap-4 mt-6">

//                 <button className="btn btn-outline" onClick={() => setStep(8)}>Back</button>
//                 <button className="btn bg-[#101C36] text-white" onClick={() => setStep(10)}>Save & Continue</button>
//             </div>
//         </div>
//     );
// };

// export default StateSpecificInfo;

import React, { Dispatch, SetStateAction } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
}

const StateSpecificInfo: React.FC<Props> = ({ setStep }) => {
    // Standardized input classes
    const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
    
    return (
        <>
            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    State Specific Information
                </h2>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                <div className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Professional Tax Employee Code (EC) No.
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Professional Tax E.C Number"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Professional Tax Registration Certificate (RC) No.
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Professional Tax R.C Number"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="p-4 border rounded-md bg-gray-50">
                        <h3 className="mb-4 font-medium text-gray-700 text-md">Excise License Details</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    State Excise License No.
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter State Excise License Number"
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">
                                    Name of License Holder
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter name of person holding license"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setStep(8)}
                    >
                        Back
                    </button>
                    <button
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={() => setStep(10)}
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </>
    );
};

export default StateSpecificInfo;