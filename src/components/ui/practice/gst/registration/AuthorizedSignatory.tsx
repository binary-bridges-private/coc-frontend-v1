// import React, { Dispatch, SetStateAction } from "react";
// import { useState } from "react";

// interface Director {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     fathersFirstName: string;
//     fathersMiddleName: string;
//     fathersLastName: string;
//     dateOfBirth: string;
//     mobileNumber: string;
//     email: string;
//     gender: string;
//     telephoneNumber: string;
//     designation: string;
//     directorIdentificationNumber: string;
//     isIndianCitizen: boolean;
//     pan: string;
//     passportNumber: string;
//     aadhaarNumber: string;
//     pinCode: string;
//     state: string;
//     district: string;
//     city: string;
//     locality: string;
//     road: string;
//     premisesName: string;
//     buildingNumber: string;
//     floorNumber: string;
//     landmark: string;
//     latitude: string;
//     longitude: string;
//     photograph: File | null;
//     proof: File | null,
//     isPrimaryAuthorizedSignatory: boolean;
// }

// interface Props {
//     setStep: Dispatch<SetStateAction<number>>,
//     setAuthorizedSign: any
// }

// const AuthorizedSignatory: React.FC<Props> = ({ setStep, setAuthorizedSign }) => {
//     const [directors, setDirectors] = useState<Director[]>([
//         {
//             firstName: '',
//             middleName: '',
//             lastName: '',
//             fathersFirstName: '',
//             fathersMiddleName: '',
//             fathersLastName: '',
//             dateOfBirth: '',
//             mobileNumber: '',
//             email: '',
//             gender: '',
//             telephoneNumber: '',
//             designation: '',
//             directorIdentificationNumber: '',
//             isIndianCitizen: false,
//             pan: '',
//             passportNumber: '',
//             aadhaarNumber: '',
//             pinCode: '',
//             state: 'Delhi',
//             district: '',
//             city: '',
//             locality: '',
//             road: '',
//             premisesName: '',
//             buildingNumber: '',
//             floorNumber: '',
//             landmark: '',
//             latitude: '',
//             longitude: '',
//             photograph: null,
//             proof: null,
//             isPrimaryAuthorizedSignatory: false,
//         },
//     ]);

//     const [errors, setErrors] = useState<{ [key: string]: string }>({});

//     const addNewDirector = () => {
//         setDirectors([...directors, {
//             firstName: '',
//             middleName: '',
//             lastName: '',
//             fathersFirstName: '',
//             fathersMiddleName: '',
//             fathersLastName: '',
//             dateOfBirth: '',
//             mobileNumber: '',
//             email: '',
//             gender: '',
//             telephoneNumber: '',
//             designation: '',
//             directorIdentificationNumber: '',
//             isIndianCitizen: false,
//             pan: '',
//             passportNumber: '',
//             aadhaarNumber: '',
//             pinCode: '',
//             state: 'Delhi',
//             district: '',
//             city: '',
//             locality: '',
//             road: '',
//             premisesName: '',
//             buildingNumber: '',
//             floorNumber: '',
//             landmark: '',
//             latitude: '',
//             longitude: '',
//             photograph: null,
//             proof: null,
//             isPrimaryAuthorizedSignatory: false,
//         }]);
//     };

//     const removeDirector = (id: number) => {
//         setDirectors(directors.filter((director, index) => index !== id));
//     };

//     const validateForm = (director: Director): boolean => {
//         const requiredFields = [
//             'firstName',
//             'lastName',
//             'dateOfBirth',
//             'mobileNumber',
//             'email',
//             'gender',
//             'designation',
//             'directorIdentificationNumber',
//             'pan',
//             'aadhaarNumber',
//             'pinCode',
//             'district',
//             'city',
//             'locality',
//             'road',
//             'premisesName',
//             'buildingNumber',
//             'floorNumber',
//         ];

//         for (const field of requiredFields) {
//             if (!director[field as keyof Director]) {
//                 return false;
//             }
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(director.email)) {
//             return false;
//         }

//         const mobileRegex = /^[0-9]{10}$/;
//         if (!mobileRegex.test(director.mobileNumber)) {
//             return false;
//         }

//         return true;
//     };

//     const handleInputChange = (index: number, field: keyof Director, value: string | boolean | File) => {
//         if (field === 'isPrimaryAuthorizedSignatory') {
//             // Update all directors to set only the selected one as primary
//             const updatedDirectors: any = directors.map((director, i) => ({
//                 ...director,
//                 isPrimaryAuthorizedSignatory: i === index ? value : false,
//             }));
//             setDirectors(updatedDirectors);
//         } else {
//             // Update only the specific field for the selected director
//             const updatedDirectors = [...directors];
//             updatedDirectors[index] = { ...updatedDirectors[index], [field]: value };
//             setDirectors(updatedDirectors);
//         }

//         // Clear errors for the updated field
//         setErrors((prevErrors) => {
//             const newErrors = { ...prevErrors };
//             delete newErrors[`${index}-${field}`];
//             return newErrors;
//         });
//     };

//     const handleFileChange = (index: number, file: File | null, key: string) => {
//         const updatedDirectors = [...directors];
//         if (key === 'photo') updatedDirectors[index].photograph = file;
//         if (key === 'proof') updatedDirectors[index].proof = file;
//         setDirectors(updatedDirectors);
//     };

//     const handleSubmit = () => {
//         const newErrors: { [key: string]: string } = {};

//         let check = false;
//         for (let i = 0; i < directors.length; i++) {
//             if (directors[i].isPrimaryAuthorizedSignatory) {
//                 check = true;
//             }
//         }

//         directors.forEach((director, index) => {
//             if (!validateForm(director)) {
//                 if (!director.firstName) newErrors[`${index}-firstName`] = 'First Name is required';
//                 if (!director.lastName) newErrors[`${index}-lastName`] = 'Last Name is required';
//                 if (!director.dateOfBirth) newErrors[`${index}-dateOfBirth`] = 'Date of Birth is required';
//                 if (!director.mobileNumber) newErrors[`${index}-mobileNumber`] = 'Mobile Number is required';
//                 if (!director.email) newErrors[`${index}-email`] = 'Email is required';
//                 if (!director.gender) newErrors[`${index}-gender`] = 'Gender is required';
//                 if (!director.designation) newErrors[`${index}-designation`] = 'Designation is required';
//                 if (!director.directorIdentificationNumber) newErrors[`${index}-directorIdentificationNumber`] = 'Director Identification Number is required';
//                 if (!director.pan) newErrors[`${index}-pan`] = 'PAN is required';
//                 if (!director.aadhaarNumber) newErrors[`${index}-aadhaarNumber`] = 'Aadhaar Number is required';
//                 if (!director.pinCode) newErrors[`${index}-pinCode`] = 'PIN Code is required';
//                 if (!director.district) newErrors[`${index}-district`] = 'District is required';
//                 if (!director.city) newErrors[`${index}-city`] = 'City is required';
//                 if (!check) newErrors['check'] = 'Need to select a primary signatory !'
//             }
//         });

//         console.log(newErrors);
//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         setAuthorizedSign(directors);
//         setStep(3);
//     }

//     return (
//         <>
//             <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
//                 <h2 className="text-xl font-extrabold text-white">
//                     Details of Authorized Signatory
//                 </h2>
//             </div>
//             <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//                 {directors.map((director, index) => (
//                     <div key={index} className="p-4 mb-2 space-y-4 border rounded-lg shadow-md">
//                         {/* <h2 className="text-lg font-semibold">Entry: {index + 1}</h2> */}
//                         {directors.length > 1 && (
//                             <button
//                                 onClick={() => removeDirector(index)}
//                                 className="relative text-[28px] text-bold text-red-500 left-[98%] hover:text-red-700"
//                             >
//                                 ❌
//                             </button>
//                         )}

//                         {/* <h3 className="font-semibold text-md">Details of Authorized Signatory</h3> */}
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <label className="flex items-center space-x-2 text-sm font-medium">
//                                 <input
//                                     type="checkbox"
//                                     className="checkbox"
//                                     checked={director.isPrimaryAuthorizedSignatory}
//                                     onChange={(e) => handleInputChange(index, 'isPrimaryAuthorizedSignatory', e.target.checked)}
//                                 />
//                                 <span>Primary Authorized Signatory</span>
//                             </label>
//                         </div>


//                         <h3 className="font-semibold text-md">Personal Information</h3>
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">First Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="First Name"
//                                     className="w-full input input-bordered"
//                                     value={director.firstName}
//                                     onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
//                                 />
//                                 {errors[`${index}-firstName`] && <p className="text-sm text-red-500">{errors[`${index}-firstName`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Middle Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Middle Name"
//                                     className="w-full input input-bordered"
//                                     value={director.middleName}
//                                     onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Last Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Last Name"
//                                     className="w-full input input-bordered"
//                                     value={director.lastName}
//                                     onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
//                                 />
//                                 {errors[`${index}-lastName`] && <p className="text-sm text-red-500">{errors[`${index}-lastName`]}</p>}
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">Father's First Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Father's First Name"
//                                     className="w-full input input-bordered"
//                                     value={director.fathersFirstName}
//                                     onChange={(e) => handleInputChange(index, 'fathersFirstName', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Father's Middle Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Father's Middle Name"
//                                     className="w-full input input-bordered"
//                                     value={director.fathersMiddleName}
//                                     onChange={(e) => handleInputChange(index, 'fathersMiddleName', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Father's Last Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Father's Last Name"
//                                     className="w-full input input-bordered"
//                                     value={director.fathersLastName}
//                                     onChange={(e) => handleInputChange(index, 'fathersLastName', e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">Date of Birth</label>
//                                 <input
//                                     type="date"
//                                     className="w-full input input-bordered"
//                                     value={director.dateOfBirth}
//                                     onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
//                                 />
//                                 {errors[`${index}-dateOfBirth`] && <p className="text-sm text-red-500">{errors[`${index}-dateOfBirth`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Mobile Number</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Mobile Number"
//                                     className="w-full input input-bordered"
//                                     value={director.mobileNumber}
//                                     onChange={(e) => handleInputChange(index, 'mobileNumber', e.target.value)}
//                                 />
//                                 {errors[`${index}-mobileNumber`] && <p className="text-sm text-red-500">{errors[`${index}-mobileNumber`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Email Address</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Email Address"
//                                     className="w-full input input-bordered"
//                                     value={director.email}
//                                     onChange={(e) => handleInputChange(index, 'email', e.target.value)}
//                                 />
//                                 {errors[`${index}-email`] && <p className="text-sm text-red-500">{errors[`${index}-email`]}</p>}
//                             </div>
//                         </div>
//                         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block w-full text-sm font-medium">Gender</label>
//                                 <select
//                                     className="w-full select select-bordered"
//                                     value={director.gender}
//                                     onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
//                                 >
//                                     <option value="">Select Gender</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Others">Others</option>
//                                 </select>
//                                 {errors[`${index}-gender`] && <p className="text-sm text-red-500">{errors[`${index}-gender`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Telephone Number (with STD Code)</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Telephone Number (with STD Code)"
//                                     className="w-full input input-bordered"
//                                     value={director.telephoneNumber}
//                                     onChange={(e) => handleInputChange(index, 'telephoneNumber', e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <h3 className="mt-10 font-semibold text-md">Identity Information</h3>
//                         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">Designation</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Designation"
//                                     className="w-full input input-bordered"
//                                     value={director.designation}
//                                     onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
//                                 />
//                                 {errors[`${index}-designation`] && <p className="text-sm text-red-500">{errors[`${index}-designation`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Director Identification Number</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Director Identification Number"
//                                     className="w-full input input-bordered"
//                                     value={director.directorIdentificationNumber}
//                                     onChange={(e) => handleInputChange(index, 'directorIdentificationNumber', e.target.value)}
//                                 />
//                                 {errors[`${index}-directorIdentificationNumber`] && <p className="text-sm text-red-500">{errors[`${index}-directorIdentificationNumber`]}</p>}
//                             </div>
//                             <label className="flex items-center space-x-2">
//                                 <span>Are you a citizen of India?</span>
//                                 <input
//                                     type="checkbox"
//                                     className="toggle toggle-primary"
//                                     checked={director.isIndianCitizen}
//                                     onChange={(e) => handleInputChange(index, 'isIndianCitizen', e.target.checked)}
//                                 />
//                             </label>
//                         </div>
//                         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">Permanent Account Number (PAN)</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Permanent Account Number (PAN)"
//                                     className="w-full input input-bordered"
//                                     value={director.pan}
//                                     onChange={(e) => handleInputChange(index, 'pan', e.target.value)}
//                                 />
//                                 {errors[`${index}-pan`] && <p className="text-sm text-red-500">{errors[`${index}-pan`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Passport Number (If Foreign)</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Passport Number (If Foreign)"
//                                     className="w-full input input-bordered"
//                                     value={director.passportNumber}
//                                     onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Aadhaar Number</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Aadhaar Number"
//                                     className="w-full input input-bordered"
//                                     value={director.aadhaarNumber}
//                                     onChange={(e) => handleInputChange(index, 'aadhaarNumber', e.target.value)}
//                                 />
//                                 {errors[`${index}-aadhaarNumber`] && <p className="text-sm text-red-500">{errors[`${index}-aadhaarNumber`]}</p>}
//                             </div>
//                         </div>

//                         {/* Residential Address */}
//                         <h3 className="mt-10 font-semibold text-md">Residential Address</h3>
//                         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">PIN Code</label>
//                                 <input
//                                     type="text"
//                                     placeholder="PIN Code"
//                                     className="w-full input input-bordered"
//                                     value={director.pinCode}
//                                     onChange={(e) => handleInputChange(index, 'pinCode', e.target.value)}
//                                 />
//                                 {errors[`${index}-pinCode`] && <p className="text-sm text-red-500">{errors[`${index}-pinCode`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">State</label>
//                                 <input
//                                     type="text"
//                                     value="Delhi"
//                                     readOnly
//                                     className="w-full input input-bordered"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">District</label>
//                                 <input
//                                     type="text"
//                                     placeholder="District"
//                                     className="w-full input input-bordered"
//                                     value={director.district}
//                                     onChange={(e) => handleInputChange(index, 'district', e.target.value)}
//                                 />
//                                 {errors[`${index}-district`] && <p className="text-sm text-red-500">{errors[`${index}-district`]}</p>}
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">City / Town / Village</label>
//                                 <input
//                                     type="text"
//                                     placeholder="City / Town / Village"
//                                     className="w-full input input-bordered"
//                                     value={director.city}
//                                     onChange={(e) => handleInputChange(index, 'city', e.target.value)}
//                                 />
//                                 {errors[`${index}-city`] && <p className="text-sm text-red-500">{errors[`${index}-city`]}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Locality / Sub Locality</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Locality / Sub Locality"
//                                     className="w-full input input-bordered"
//                                     value={director.locality}
//                                     onChange={(e) => handleInputChange(index, 'locality', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Road / Street / Lane</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Road / Street / Lane"
//                                     className="w-full input input-bordered"
//                                     value={director.road}
//                                     onChange={(e) => handleInputChange(index, 'road', e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">Name of the Premises / Building</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Name of the Premises / Building"
//                                     className="w-full input input-bordered"
//                                     value={director.premisesName}
//                                     onChange={(e) => handleInputChange(index, 'premisesName', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Building No. / Flat No.</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Building No. / Flat No."
//                                     className="w-full input input-bordered"
//                                     value={director.buildingNumber}
//                                     onChange={(e) => handleInputChange(index, 'buildingNumber', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Floor No.</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Floor No."
//                                     className="w-full input input-bordered"
//                                     value={director.floorNumber}
//                                     onChange={(e) => handleInputChange(index, 'floorNumber', e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
//                             <div>
//                                 <label className="block text-sm font-medium">Nearby Landmark</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Nearby Landmark"
//                                     className="w-full input input-bordered"
//                                     value={director.landmark}
//                                     onChange={(e) => handleInputChange(index, 'landmark', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Latitude</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Latitude"
//                                     className="w-full input input-bordered"
//                                     value={director.latitude}
//                                     onChange={(e) => handleInputChange(index, 'latitude', e.target.value)}
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium">Longitude</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Longitude"
//                                     className="w-full input input-bordered"
//                                     value={director.longitude}
//                                     onChange={(e) => handleInputChange(index, 'longitude', e.target.value)}
//                                 />
//                             </div>
//                         </div>

//                         <button
//                             className="w-full mt-4 btn btn-outline"
//                             onClick={() => {
//                                 const updatedDirectors = [...directors];
//                                 updatedDirectors[index] = {
//                                     ...updatedDirectors[index],
//                                     pinCode: '',
//                                     district: '',
//                                     city: '',
//                                     locality: '',
//                                     road: '',
//                                     premisesName: '',
//                                     buildingNumber: '',
//                                     floorNumber: '',
//                                     landmark: '',
//                                     latitude: '',
//                                     longitude: '',
//                                 };
//                                 setDirectors(updatedDirectors);
//                             }}
//                         >
//                             Reset Address
//                         </button>
//                         {/* Document Upload */}
//                         <h3 className="font-semibold text-md">Proof of details of authorized signatory</h3>
//                         <input
//                             type="file"
//                             className="w-full file-input file-input-bordered"
//                             onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null, 'proof')}
//                         />
//                         {errors[`${index}-proof`] && <p className="text-sm text-red-500">{errors[`${index}-proof`]}</p>}
//                         <h3 className="font-semibold text-md">Upload Photograph (of person whose information has been given above)</h3>
//                         <input
//                             type="file"
//                             className="w-full file-input file-input-bordered"
//                             onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null, 'photo')}
//                         />
//                         {errors[`${index}-photograph`] && <p className="text-sm text-red-500">{errors[`${index}-photograph`]}</p>}

//                     </div>

//                 ))}
//                 {errors[`check`] && <p className="text-red-500 text-md">{errors[`check`]}</p>}
//                 <div className="flex mt-4 space-x-4">
//                     <button className="btn btn-outline" onClick={() => setStep(3)}>Back</button>
//                     <button className="btn btn-outline" onClick={addNewDirector}>Add New</button>
//                     <button className="btn bg-[#101C36] text-white" onClick={handleSubmit}>Save & Continue</button>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default AuthorizedSignatory;
import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Director {
    firstName: string;
    middleName: string;
    lastName: string;
    fathersFirstName: string;
    fathersMiddleName: string;
    fathersLastName: string;
    dateOfBirth: string;
    mobileNumber: string;
    email: string;
    gender: string;
    telephoneNumber: string;
    designation: string;
    directorIdentificationNumber: string;
    isIndianCitizen: boolean;
    pan: string;
    passportNumber: string;
    aadhaarNumber: string;
    pinCode: string;
    state: string;
    district: string;
    city: string;
    locality: string;
    road: string;
    premisesName: string;
    buildingNumber: string;
    floorNumber: string;
    landmark: string;
    latitude: string;
    longitude: string;
    photograph: File | null;
    proof: File | null,
    isPrimaryAuthorizedSignatory: boolean;
}

interface Props {
    setStep: Dispatch<SetStateAction<number>>,
    setAuthorizedSign: any
}

const AuthorizedSignatory: React.FC<Props> = ({ setStep, setAuthorizedSign }) => {
    const [directors, setDirectors] = useState<Director[]>([
        {
            firstName: '',
            middleName: '',
            lastName: '',
            fathersFirstName: '',
            fathersMiddleName: '',
            fathersLastName: '',
            dateOfBirth: '',
            mobileNumber: '',
            email: '',
            gender: '',
            telephoneNumber: '',
            designation: '',
            directorIdentificationNumber: '',
            isIndianCitizen: false,
            pan: '',
            passportNumber: '',
            aadhaarNumber: '',
            pinCode: '',
            state: 'Delhi',
            district: '',
            city: '',
            locality: '',
            road: '',
            premisesName: '',
            buildingNumber: '',
            floorNumber: '',
            landmark: '',
            latitude: '',
            longitude: '',
            photograph: null,
            proof: null,
            isPrimaryAuthorizedSignatory: false,
        },
    ]);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Standardized input classes
    const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
    const selectClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white";
    const disabledInputClass = "w-full p-3 border rounded-md bg-gray-100";

    const addNewDirector = () => {
        setDirectors([...directors, {
            firstName: '',
            middleName: '',
            lastName: '',
            fathersFirstName: '',
            fathersMiddleName: '',
            fathersLastName: '',
            dateOfBirth: '',
            mobileNumber: '',
            email: '',
            gender: '',
            telephoneNumber: '',
            designation: '',
            directorIdentificationNumber: '',
            isIndianCitizen: false,
            pan: '',
            passportNumber: '',
            aadhaarNumber: '',
            pinCode: '',
            state: 'Delhi',
            district: '',
            city: '',
            locality: '',
            road: '',
            premisesName: '',
            buildingNumber: '',
            floorNumber: '',
            landmark: '',
            latitude: '',
            longitude: '',
            photograph: null,
            proof: null,
            isPrimaryAuthorizedSignatory: false,
        }]);
    };

    const removeDirector = (id: number) => {
        setDirectors(directors.filter((director, index) => index !== id));
    };

    const validateForm = (director: Director): boolean => {
        const requiredFields = [
            'firstName',
            'lastName',
            'dateOfBirth',
            'mobileNumber',
            'email',
            'gender',
            'designation',
            'directorIdentificationNumber',
            'pan',
            'aadhaarNumber',
            'pinCode',
            'district',
            'city',
            'locality',
            'road',
            'premisesName',
            'buildingNumber',
            'floorNumber',
        ];

        for (const field of requiredFields) {
            if (!director[field as keyof Director]) {
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(director.email)) {
            return false;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(director.mobileNumber)) {
            return false;
        }

        return true;
    };

    const handleInputChange = (index: number, field: keyof Director, value: string | boolean | File) => {
        if (field === 'isPrimaryAuthorizedSignatory') {
            const updatedDirectors: any = directors.map((director, i) => ({
                ...director,
                isPrimaryAuthorizedSignatory: i === index ? value : false,
            }));
            setDirectors(updatedDirectors);
        } else {
            const updatedDirectors = [...directors];
            updatedDirectors[index] = { ...updatedDirectors[index], [field]: value };
            setDirectors(updatedDirectors);
        }

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors[`${index}-${field}`];
            return newErrors;
        });
    };

    const handleFileChange = (index: number, file: File | null, key: string) => {
        const updatedDirectors = [...directors];
        if (key === 'photo') updatedDirectors[index].photograph = file;
        if (key === 'proof') updatedDirectors[index].proof = file;
        setDirectors(updatedDirectors);
    };

    const handleSubmit = () => {
        const newErrors: { [key: string]: string } = {};

        let check = false;
        for (let i = 0; i < directors.length; i++) {
            if (directors[i].isPrimaryAuthorizedSignatory) {
                check = true;
            }
        }

        directors.forEach((director, index) => {
            if (!validateForm(director)) {
                if (!director.firstName) newErrors[`${index}-firstName`] = 'First Name is required';
                if (!director.lastName) newErrors[`${index}-lastName`] = 'Last Name is required';
                if (!director.dateOfBirth) newErrors[`${index}-dateOfBirth`] = 'Date of Birth is required';
                if (!director.mobileNumber) newErrors[`${index}-mobileNumber`] = 'Mobile Number is required';
                if (!director.email) newErrors[`${index}-email`] = 'Email is required';
                if (!director.gender) newErrors[`${index}-gender`] = 'Gender is required';
                if (!director.designation) newErrors[`${index}-designation`] = 'Designation is required';
                if (!director.directorIdentificationNumber) newErrors[`${index}-directorIdentificationNumber`] = 'Director Identification Number is required';
                if (!director.pan) newErrors[`${index}-pan`] = 'PAN is required';
                if (!director.aadhaarNumber) newErrors[`${index}-aadhaarNumber`] = 'Aadhaar Number is required';
                if (!director.pinCode) newErrors[`${index}-pinCode`] = 'PIN Code is required';
                if (!director.district) newErrors[`${index}-district`] = 'District is required';
                if (!director.city) newErrors[`${index}-city`] = 'City is required';
                if (!check) newErrors['check'] = 'Need to select a primary signatory!';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setAuthorizedSign(directors);
        setStep(3);
    }

    return (
        <>
            <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
                <h2 className="text-xl font-extrabold text-white">
                    Details of Authorized Signatory
                </h2>
            </div>
            <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                {directors.map((director, index) => (
                    <div key={index} className="p-4 mb-6 space-y-4 border rounded-lg shadow-sm">
                        {directors.length > 1 && (
                            <button
                                onClick={() => removeDirector(index)}
                                className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Remove
                            </button>
                        )}

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <label className="flex items-center space-x-2 text-sm font-medium">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={director.isPrimaryAuthorizedSignatory}
                                    onChange={(e) => handleInputChange(index, 'isPrimaryAuthorizedSignatory', e.target.checked)}
                                />
                                <span>Primary Authorized Signatory</span>
                            </label>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className={inputClass}
                                    value={director.firstName}
                                    onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                                />
                                {errors[`${index}-firstName`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-firstName`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Middle Name</label>
                                <input
                                    type="text"
                                    placeholder="Middle Name"
                                    className={inputClass}
                                    value={director.middleName}
                                    onChange={(e) => handleInputChange(index, 'middleName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className={inputClass}
                                    value={director.lastName}
                                    onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                                />
                                {errors[`${index}-lastName`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-lastName`]}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Father's First Name</label>
                                <input
                                    type="text"
                                    placeholder="Father's First Name"
                                    className={inputClass}
                                    value={director.fathersFirstName}
                                    onChange={(e) => handleInputChange(index, 'fathersFirstName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Father's Middle Name</label>
                                <input
                                    type="text"
                                    placeholder="Father's Middle Name"
                                    className={inputClass}
                                    value={director.fathersMiddleName}
                                    onChange={(e) => handleInputChange(index, 'fathersMiddleName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Father's Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Father's Last Name"
                                    className={inputClass}
                                    value={director.fathersLastName}
                                    onChange={(e) => handleInputChange(index, 'fathersLastName', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    type="date"
                                    className={inputClass}
                                    value={director.dateOfBirth}
                                    onChange={(e) => handleInputChange(index, 'dateOfBirth', e.target.value)}
                                />
                                {errors[`${index}-dateOfBirth`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-dateOfBirth`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    placeholder="Mobile Number"
                                    className={inputClass}
                                    value={director.mobileNumber}
                                    onChange={(e) => handleInputChange(index, 'mobileNumber', e.target.value)}
                                />
                                {errors[`${index}-mobileNumber`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-mobileNumber`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    className={inputClass}
                                    value={director.email}
                                    onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                                />
                                {errors[`${index}-email`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-email`]}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    className={selectClass}
                                    value={director.gender}
                                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                                {errors[`${index}-gender`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-gender`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Telephone Number (with STD Code)</label>
                                <input
                                    type="text"
                                    placeholder="Telephone Number (with STD Code)"
                                    className={inputClass}
                                    value={director.telephoneNumber}
                                    onChange={(e) => handleInputChange(index, 'telephoneNumber', e.target.value)}
                                />
                            </div>
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-gray-700">Identity Information</h3>
                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Designation</label>
                                <input
                                    type="text"
                                    placeholder="Designation"
                                    className={inputClass}
                                    value={director.designation}
                                    onChange={(e) => handleInputChange(index, 'designation', e.target.value)}
                                />
                                {errors[`${index}-designation`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-designation`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Director Identification Number</label>
                                <input
                                    type="text"
                                    placeholder="Director Identification Number"
                                    className={inputClass}
                                    value={director.directorIdentificationNumber}
                                    onChange={(e) => handleInputChange(index, 'directorIdentificationNumber', e.target.value)}
                                />
                                {errors[`${index}-directorIdentificationNumber`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-directorIdentificationNumber`]}</p>}
                            </div>
                            <label className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-700">Are you a citizen of India?</span>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary"
                                    checked={director.isIndianCitizen}
                                    onChange={(e) => handleInputChange(index, 'isIndianCitizen', e.target.checked)}
                                />
                            </label>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Permanent Account Number (PAN)</label>
                                <input
                                    type="text"
                                    placeholder="Permanent Account Number (PAN)"
                                    className={inputClass}
                                    value={director.pan}
                                    onChange={(e) => handleInputChange(index, 'pan', e.target.value)}
                                />
                                {errors[`${index}-pan`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-pan`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Passport Number (If Foreign)</label>
                                <input
                                    type="text"
                                    placeholder="Passport Number (If Foreign)"
                                    className={inputClass}
                                    value={director.passportNumber}
                                    onChange={(e) => handleInputChange(index, 'passportNumber', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Aadhaar Number</label>
                                <input
                                    type="text"
                                    placeholder="Aadhaar Number"
                                    className={inputClass}
                                    value={director.aadhaarNumber}
                                    onChange={(e) => handleInputChange(index, 'aadhaarNumber', e.target.value)}
                                />
                                {errors[`${index}-aadhaarNumber`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-aadhaarNumber`]}</p>}
                            </div>
                        </div>

                        <h3 className="mt-6 text-lg font-semibold text-gray-700">Residential Address</h3>
                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">PIN Code</label>
                                <input
                                    type="text"
                                    placeholder="PIN Code"
                                    className={inputClass}
                                    value={director.pinCode}
                                    onChange={(e) => handleInputChange(index, 'pinCode', e.target.value)}
                                />
                                {errors[`${index}-pinCode`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-pinCode`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    value="Delhi"
                                    readOnly
                                    className={disabledInputClass}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">District</label>
                                <input
                                    type="text"
                                    placeholder="District"
                                    className={inputClass}
                                    value={director.district}
                                    onChange={(e) => handleInputChange(index, 'district', e.target.value)}
                                />
                                {errors[`${index}-district`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-district`]}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">City / Town / Village</label>
                                <input
                                    type="text"
                                    placeholder="City / Town / Village"
                                    className={inputClass}
                                    value={director.city}
                                    onChange={(e) => handleInputChange(index, 'city', e.target.value)}
                                />
                                {errors[`${index}-city`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-city`]}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Locality / Sub Locality</label>
                                <input
                                    type="text"
                                    placeholder="Locality / Sub Locality"
                                    className={inputClass}
                                    value={director.locality}
                                    onChange={(e) => handleInputChange(index, 'locality', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Road / Street / Lane</label>
                                <input
                                    type="text"
                                    placeholder="Road / Street / Lane"
                                    className={inputClass}
                                    value={director.road}
                                    onChange={(e) => handleInputChange(index, 'road', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Name of the Premises / Building</label>
                                <input
                                    type="text"
                                    placeholder="Name of the Premises / Building"
                                    className={inputClass}
                                    value={director.premisesName}
                                    onChange={(e) => handleInputChange(index, 'premisesName', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Building No. / Flat No.</label>
                                <input
                                    type="text"
                                    placeholder="Building No. / Flat No."
                                    className={inputClass}
                                    value={director.buildingNumber}
                                    onChange={(e) => handleInputChange(index, 'buildingNumber', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Floor No.</label>
                                <input
                                    type="text"
                                    placeholder="Floor No."
                                    className={inputClass}
                                    value={director.floorNumber}
                                    onChange={(e) => handleInputChange(index, 'floorNumber', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Nearby Landmark</label>
                                <input
                                    type="text"
                                    placeholder="Nearby Landmark"
                                    className={inputClass}
                                    value={director.landmark}
                                    onChange={(e) => handleInputChange(index, 'landmark', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    placeholder="Latitude"
                                    className={inputClass}
                                    value={director.latitude}
                                    onChange={(e) => handleInputChange(index, 'latitude', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    placeholder="Longitude"
                                    className={inputClass}
                                    value={director.longitude}
                                    onChange={(e) => handleInputChange(index, 'longitude', e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="px-4 py-2 mt-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={() => {
                                const updatedDirectors = [...directors];
                                updatedDirectors[index] = {
                                    ...updatedDirectors[index],
                                    pinCode: '',
                                    district: '',
                                    city: '',
                                    locality: '',
                                    road: '',
                                    premisesName: '',
                                    buildingNumber: '',
                                    floorNumber: '',
                                    landmark: '',
                                    latitude: '',
                                    longitude: '',
                                };
                                setDirectors(updatedDirectors);
                            }}
                        >
                            Reset Address
                        </button>

                        <h3 className="mt-6 text-lg font-semibold text-gray-700">Proof of details of authorized signatory</h3>
                        <input
                            type="file"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null, 'proof')}
                        />
                        {errors[`${index}-proof`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-proof`]}</p>}
                        
                        <h3 className="mt-6 text-lg font-semibold text-gray-700">Upload Photograph</h3>
                        <input
                            type="file"
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null, 'photo')}
                        />
                        {errors[`${index}-photograph`] && <p className="mt-1 text-sm text-red-500">{errors[`${index}-photograph`]}</p>}
                    </div>
                ))}
                
                {errors[`check`] && <p className="mt-4 text-sm text-red-500">{errors[`check`]}</p>}
                
                <div className="flex justify-end gap-4 mt-8">
                    <button
                        className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setStep(1)}
                    >
                        Back
                    </button>
                    <button
                        className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
                        onClick={addNewDirector}
                    >
                        Add New
                    </button>
                    <button
                        className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </>
    );
}

export default AuthorizedSignatory;