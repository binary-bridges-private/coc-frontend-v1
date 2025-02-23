// import React, { Dispatch, SetStateAction } from "react";
// import { useState } from "react";

// interface Props {
//     setStep: Dispatch<SetStateAction<number>>;
// }

// interface Director {
//     id: number;
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     fathersFirstName: string;
//     fathersMiddleName: string;
//     fathersLastName: string;
//     dob: string;
//     gender: string;
//     email: string;
//     designation: string;
//     din: string;
//     pan: string;
//     passport: string;
//     aadhaar: string;
//     isIndianCitizen: boolean;
//     address: string;
//     city: string;
//     state: string;
//     pinCode: string;
//     street: string;
//     flatNumber: string;
// }

// const Promoter: React.FC<Props> = ({ setStep }) => {
//     const [directors, setDirectors] = useState<Director[]>([
//         {
//             id: Date.now(),
//             firstName: "",
//             middleName: "",
//             lastName: "",
//             fathersFirstName: "",
//             fathersMiddleName: "",
//             fathersLastName: "",
//             dob: "",
//             gender: "",
//             email: "",
//             designation: "",
//             din: "",
//             pan: "",
//             passport: "",
//             aadhaar: "",
//             isIndianCitizen: false,
//             address: "",
//             city: "",
//             state: "",
//             pinCode: "",
//             street: "",
//             flatNumber: "",
//         }
//     ]);

//     const addNewDirector = () => {
//         setDirectors([
//             ...directors,
//             {
//                 id: Date.now(),
//                 firstName: "",
//                 middleName: "",
//                 lastName: "",
//                 fathersFirstName: "",
//                 fathersMiddleName: "",
//                 fathersLastName: "",
//                 dob: "",
//                 gender: "",
//                 email: "",
//                 designation: "",
//                 din: "",
//                 pan: "",
//                 passport: "",
//                 aadhaar: "",
//                 isIndianCitizen: false,
//                 address: "",
//                 city: "",
//                 state: "",
//                 pinCode: "",
//                 street: "",
//                 flatNumber: "",
//             }
//         ]);
//     };

//     const removeDirector = (id: number) => {
//         setDirectors(directors.filter((director) => director.id !== id));
//     };

//     const updateDirector = (id: number, field: keyof Director, value: any) => {
//         setDirectors(directors.map(director => 
//             director.id === id ? { ...director, [field]: value } : director
//         ));
//     };

//     return (
//         <div className="w-[50%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//             {directors.map((director, index) => (
//                 <div key={director.id} className="relative p-4 space-y-4 border rounded-lg shadow-md">
//                     <h2 className="text-lg font-semibold">Director {index + 1}</h2>

//                     {directors.length > 1 && (
//                         <button 
//                             onClick={() => removeDirector(director.id)}
//                             className="absolute text-red-500 top-2 right-2 hover:text-red-700"
//                         >
//                             ❌
//                         </button>
//                     )}

//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                         <input type="text" placeholder="First Name" className="input input-bordered" 
//                             value={director.firstName} 
//                             onChange={(e) => updateDirector(director.id, "firstName", e.target.value)}
//                         />
//                         <input type="text" placeholder="Middle Name" className="input input-bordered" 
//                             value={director.middleName} 
//                             onChange={(e) => updateDirector(director.id, "middleName", e.target.value)}
//                         />
//                         <input type="text" placeholder="Last Name" className="input input-bordered" 
//                             value={director.lastName} 
//                             onChange={(e) => updateDirector(director.id, "lastName", e.target.value)}
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                         <input type="text" placeholder="Father's First Name" className="input input-bordered" 
//                             value={director.fathersFirstName} 
//                             onChange={(e) => updateDirector(director.id, "fathersFirstName", e.target.value)}
//                         />
//                         <input type="text" placeholder="Father's Middle Name" className="input input-bordered" 
//                             value={director.fathersMiddleName} 
//                             onChange={(e) => updateDirector(director.id, "fathersMiddleName", e.target.value)}
//                         />
//                         <input type="text" placeholder="Father's Last Name" className="input input-bordered" 
//                             value={director.fathersLastName} 
//                             onChange={(e) => updateDirector(director.id, "fathersLastName", e.target.value)}
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                         <input type="date" className="input input-bordered" 
//                             value={director.dob} 
//                             onChange={(e) => updateDirector(director.id, "dob", e.target.value)}
//                         />
//                         <select className="select select-bordered"
//                             value={director.gender}
//                             onChange={(e) => updateDirector(director.id, "gender", e.target.value)}
//                         >
//                             <option value="">Select Gender</option>
//                             <option>Male</option>
//                             <option>Female</option>
//                             <option>Others</option>
//                         </select>
//                         <input type="text" placeholder="Email Address" className="input input-bordered" 
//                             value={director.email} 
//                             onChange={(e) => updateDirector(director.id, "email", e.target.value)}
//                         />
//                     </div>

//                     <h3 className="font-semibold text-md">Residential Address</h3>
//                     <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                         <input type="text" placeholder="Address" className="input input-bordered" 
//                             value={director.address} 
//                             onChange={(e) => updateDirector(director.id, "address", e.target.value)}
//                         />
//                         <input type="text" placeholder="City/Town/Village" className="input input-bordered" 
//                             value={director.city} 
//                             onChange={(e) => updateDirector(director.id, "city", e.target.value)}
//                         />
//                         <input type="text" placeholder="State" className="input input-bordered" 
//                             value={director.state} 
//                             onChange={(e) => updateDirector(director.id, "state", e.target.value)}
//                         />
//                     </div>

//                     <h3 className="font-semibold text-md">Document Upload</h3>
//                     <input type="file" className="w-full file-input file-input-bordered" />
//                 </div>
//             ))}

//             <div className="flex space-x-4">
//             <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>

//                 <button className="btn btn-secondary" onClick={addNewDirector}>Add New</button>
//                 <button className="btn btn-primary" onClick={() => setStep(4)}>Save & Continue</button>
//             </div>
//         </div>
//     );
// };

// export default Promoter;

import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
}

const Promoter: React.FC<Props> = ({ setStep }) => {
    const [directors, setDirectors] = useState([{}]);

    const addNewDirector = () => {
        setDirectors([...directors, {}]);
    };

    const removeDirector = (id: number) => {
        setDirectors(directors.filter((director, index) => index !== id));
    };

    return (
        <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
            {directors.map((director, index) => (
                <div key={index} className="p-4 mb-2 space-y-4 border rounded-lg shadow-md">
                    {/* <h2 className="text-lg font-semibold">Entry: {index + 1}</h2> */}
                    {directors.length > 1 && (
                        <button
                            onClick={() => removeDirector(index)}
                            className="relative text-[28px] text-bold text-red-500 left-[98%] hover:text-red-700"
                        >
                            ❌
                        </button>
                    )}

                    <h3 className="font-semibold text-md">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">First Name</label>
                            <input type="text" placeholder="First Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Middle Name</label>
                            <input type="text" placeholder="Middle Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Name</label>
                            <input type="text" placeholder="Last Name" className="w-full input input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Father's First Name</label>
                            <input type="text" placeholder="Father's First Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father's Middle Name</label>
                            <input type="text" placeholder="Father's Middle Name" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Father's Last Name</label>
                            <input type="text" placeholder="Father's Last Name" className="w-full input input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input type="date" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mobile Number</label>
                            <input type="text" placeholder="Mobile Number" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email Address</label>
                            <input type="text" placeholder="Email Address" className="w-full input input-bordered" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="block w-full text-sm font-medium">Gender</label>
                            <select className="w-full select select-bordered">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Telephone Number (with STD Code)</label>
                            <input type="text" placeholder="Telephone Number (with STD Code)" className="w-full input input-bordered" />
                        </div>
                    </div>

                    {/* Identity Information */}
                    <h3 className="mt-10 font-semibold text-md">Identity Information</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Designation</label>
                            <input type="text" placeholder="Designation" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Director Identification Number</label>
                            <input type="text" placeholder="Director Identification Number" className="w-full input input-bordered" />
                        </div>
                        <label className="flex items-center space-x-2">
                            <span>Are you a citizen of India?</span>
                            <input type="checkbox" className="toggle toggle-primary" />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Permanent Account Number (PAN)</label>
                            <input type="text" placeholder="Permanent Account Number (PAN)" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Passport Number (If Foreign)</label>
                            <input type="text" placeholder="Passport Number (If Foreign)" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Aadhaar Number</label>
                            <input type="text" placeholder="Aadhaar Number" className="w-full input input-bordered" />
                        </div>
                    </div>

                    {/* Residential Address */}
                    <h3 className="mt-10 font-semibold text-md">Residential Address</h3>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">PIN Code</label>
                            <input type="text" placeholder="PIN Code" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">State</label>
                            <input type="text" value="Delhi" readOnly className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">District</label>
                            <input type="text" placeholder="District" className="w-full input input-bordered" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">City / Town / Village</label>
                            <input type="text" placeholder="City / Town / Village" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Locality / Sub Locality</label>
                            <input type="text" placeholder="Locality / Sub Locality" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Road / Street / Lane</label>
                            <input type="text" placeholder="Road / Street / Lane" className="w-full input input-bordered" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Name of the Premises / Building</label>
                            <input type="text" placeholder="Name of the Premises / Building" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Building No. / Flat No.</label>
                            <input type="text" placeholder="Building No. / Flat No." className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Floor No.</label>
                            <input type="text" placeholder="Floor No." className="w-full input input-bordered" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Nearby Landmark</label>
                            <input type="text" placeholder="Nearby Landmark" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Latitude</label>
                            <input type="text" placeholder="Latitude" className="w-full input input-bordered" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Longitude</label>
                            <input type="text" placeholder="Longitude" className="w-full input input-bordered" />
                        </div>
                    </div>

                    <button className="w-full mt-4 btn btn-outline">Reset Address</button>


                    {/* Document Upload */}
                    <h3 className="mt-10 font-semibold text-md">Document Upload</h3>
                    <label className="block text-sm font-medium">Photograph ( Of person whose info is given above )</label>
                    <input type="file" className="w-full file-input file-input-bordered" />

                    <h3 className="mt-10 font-semibold text-md">Other Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <label className="flex items-center space-x-2 text-sm font-medium">
                            <input type="checkbox" className="checkbox" />
                            <span>Also Authorized Signatory</span>
                        </label>
                    </div>
                </div>
            ))}
            <div className="flex justify-end gap-4 mt-6">
                <button className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-outline" onClick={addNewDirector}>Add New</button>
                <button className="btn bg-[#101C36] text-white" onClick={() => setStep(4)}>Save & Continue</button>
            </div>
        </div>
    );
}

export default Promoter;
