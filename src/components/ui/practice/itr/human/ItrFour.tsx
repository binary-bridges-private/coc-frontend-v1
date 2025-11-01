import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { itr4Status, indianStates, itr4NatureOfEmployment, itr4FiledUSlashS, itr4OrFiledInResponseToNoticeUSlashS } from "./utils.ts"

const questions = {
    "question1": "Have you exercised the option u/s 115BAC(6) of Opting out of new tax regime in Form 10-IEA in AY 2024-25?",
    "question2": "Do you wish to continue to opt out of New Tax Regime for current assessment year",
}

const ItrFour = () => {
    const formSchema = z.object({
        firstName: z.string().nonempty("This field is required"),
        middleName: z.string(),
        lastName: z.string().nonempty("This field is required"),
        permanentAccountNumber: z.string().nonempty("This field is required"),
        flatOrDoorOrBlockNumber: z.string().nonempty("This field is required"),
        nameOfPremiseOrBuildingOrVillage: z.string().nonempty("This field is required"),
        status: z.string().nonempty("This field is required"),
        roadOrStreetOrPostOffice: z.string().nonempty("This field is required"),
        areaOrLocality: z.string().nonempty("This field is required"),
        dateOfBirth: z.string().nonempty("This field is required"),
        townOrCityOrDistrict: z.string().nonempty("This field is required"),
        state: z.string().nonempty("This field is required"),
        countryOrRegion: z.string().nonempty("This field is required"),
        pinCodeOrZipCode: z.coerce.number().int().min(100000, "Must be 6 digits"),
        email1: z.email().nonempty("This field is required"),
        email2: z.email().nonempty("This field is required"),
        residentialOrOfficePhoneNumberWithIsdCode: z.e164("Phone number must be in +XXYYYYYYYYYY format").nonempty("This field is required"),
        mobileNumber1: z.e164("Phone number must be in +XXYYYYYYYYYY format").nonempty("This field is required"),
        mobileNumber2: z.e164("Phone number must be in +XXYYYYYYYYYY format").nonempty("This field is required"),
        aadhaarNumber: z.coerce.number().min(100000000000, "Must be 12 digits"),
        natureOfEmployment: z.string().nonempty("This field is required"),
        filedUnderSection: z.string().nonempty("This field is required"),
        orFiledInResponseToNoticeUnderSection: z.string().nonempty("This field is required"),
        // If revised/defective then enter
        receiptNumber: z.string(),
        dateOfFilingOfOriginalReturn: z.string(),
        // If filed in response to notice u/s 139(9) /142(1)/148/153C or order u/s 119(2)(b)-
        uniqueNumberOrDocumentIdentificationNumber: z.string(),
        dateOfSuchNoticeOrOrder: z.string(),
        question1: z.string().nonempty("This field is required"),
        // If opted out from new tax regime
        dateOfFilingForm10Iea: z.string(),
        acknowledgementNumberOfForm10Iea: z.string(),
    });

    type FormData = z.infer<typeof formSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            countryOrRegion: "India",
        },
    });

    const onFormSubmit = async (formData: FormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.table(formData);
        reset();
        setTimeout(() => window.location.href = "/practice/itr/login", 5000);
    }

    const pStyle = "mt-4 w-5/6 mx-auto text-gray-400 text-center text-xs";
    const fieldsetStyle = "border-[1px] shadow-md rounded-2xl p-14 grid grid-cols-2 gap-x-14 gap-y-3";
    const fieldStyle = "";
    const formPairStyle = "flex flex-col gap-2";
    const labelStyle = "text-black";
    const inputStyle = "border-2 border-gray-300 rounded-lg px-2.5 py-1.5 bg-white text-gray-800 focus:outline-none focus:border-blue-500";
    const noteStyle = "ml-2 border-[1px] border-gray-400 rounded-full text-gray-600 font-bold px-2 py-0.5 text-xs";
    const errorStyle = "text-red-500 text-sm my-2";

    return (
        <div className="min-h-screen bg-white">
            <h1 className="text-center text-blue-600 text-4xl pt-7 font-bold">ITR-4</h1>
            {/* <p className={pStyle}>For Individuals, HUFs and Firms (other than LLP) being a Resident having total income upto Rs.50 lakh and having income from business and profession which is computed under sections 44AD, 44ADA or 44AE, and having long-term capital gains under section 112A upto Rs. 1.25 lakh. Not for an individual who is either Director in a company or has invested in unlisted equity shares or if income-tax is deferred on ESOP or has agricultural income more than Rs.5000 or has assets (including financial interest in any entity) located outside India</p> */}
            <form onSubmit={handleSubmit(onFormSubmit)} className="py-8 px-16 mx-auto w-7/8 space-y-8">
                <fieldset className={fieldsetStyle}>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>First Name</label>
                            <input type="text" {...register("firstName")} className={inputStyle} />
                        </div>
                        {errors.firstName && <div className={errorStyle}>{errors.firstName.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Middle Name</label>
                            <input type="text" {...register("middleName")} className={inputStyle} />
                        </div>
                        {errors.middleName && <div className={errorStyle}>{errors.middleName.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Last Name</label>
                            <input type="text" {...register("lastName")} className={inputStyle} />
                        </div>
                        {errors.lastName && <div className={errorStyle}>{errors.lastName.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Permanent Account Number</label>
                            <input type="text" {...register("permanentAccountNumber")} className={inputStyle} />
                        </div>
                        {errors.permanentAccountNumber && <div className={errorStyle}>{errors.permanentAccountNumber.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Flat/Door/Block No.</label>
                            <input type="text" {...register("flatOrDoorOrBlockNumber")} className={inputStyle} />
                        </div>
                        {errors.flatOrDoorOrBlockNumber && <div className={errorStyle}>{errors.flatOrDoorOrBlockNumber.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Name of Premise/Building/Village</label>
                            <input type="text" {...register("nameOfPremiseOrBuildingOrVillage")} className={inputStyle} />
                        </div>
                        {errors.nameOfPremiseOrBuildingOrVillage && <div className={errorStyle}>{errors.nameOfPremiseOrBuildingOrVillage.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Status</label>
                            <select {...register("status")} className={inputStyle}>
                                {itr4Status.map(status => (
                                    <option value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        {errors.status && <div className={errorStyle}>{errors.status.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Road/Street/Post Office</label>
                            <input type="text" {...register("roadOrStreetOrPostOffice")} className={inputStyle} />
                        </div>
                        {errors.roadOrStreetOrPostOffice && <div className={errorStyle}>{errors.roadOrStreetOrPostOffice.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Area/Locality</label>
                            <input type="text" {...register("areaOrLocality")} className={inputStyle} />
                        </div>
                        {errors.areaOrLocality && <div className={errorStyle}>{errors.areaOrLocality.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Date of Birth</label>
                            <input type="date" {...register("dateOfBirth")} className={inputStyle + " accent-blue-500"} />
                        </div>
                        {errors.dateOfBirth && <div className={errorStyle}>{errors.dateOfBirth.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Town/City/District</label>
                            <input type="text" {...register("townOrCityOrDistrict")} className={inputStyle} />
                        </div>
                        {errors.townOrCityOrDistrict && <div className={errorStyle}>{errors.townOrCityOrDistrict.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>State</label>
                            <select {...register("state")} className={inputStyle}>
                                {indianStates.map(state => (
                                    <option value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        {errors.state && <div className={errorStyle}>{errors.state.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Country/Region</label>
                            <input type="text" {...register("countryOrRegion")}  className={inputStyle} />
                        </div>
                        {errors.countryOrRegion && <div className={errorStyle}>{errors.countryOrRegion.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>PIN Code/ZIP Code</label>
                            <input type="number" {...register("pinCodeOrZipCode")} className={inputStyle} />
                        </div>
                        {errors.pinCodeOrZipCode && <div className={errorStyle}>{errors.pinCodeOrZipCode.message}</div>}
                    </div>
                </fieldset>
                <fieldset className={fieldsetStyle}>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Email 1</label>
                            <input type="email" {...register("email1")} className={inputStyle} />
                        </div>
                        {errors.email1 && <div className={errorStyle}>{errors.email1.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Email 2</label>
                            <input type="email" {...register("email2")} className={inputStyle} />
                        </div>
                        {errors.email2 && <div className={errorStyle}>{errors.email2.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Residential/Office Phone Number with ISD Code</label>
                            <input type="tel" {...register("residentialOrOfficePhoneNumberWithIsdCode")} className={inputStyle} />
                        </div>
                        {errors.residentialOrOfficePhoneNumberWithIsdCode && <div className={errorStyle}>{errors.residentialOrOfficePhoneNumberWithIsdCode.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Mobile Number 1</label>
                            <input type="tel" {...register("mobileNumber1")} className={inputStyle} />
                        </div>
                        {errors.mobileNumber1 && <div className={errorStyle}>{errors.mobileNumber1.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Mobile Number 2</label>
                            <input type="tel" {...register("mobileNumber2")} className={inputStyle} />
                        </div>
                        {errors.mobileNumber2 && <div className={errorStyle}>{errors.mobileNumber2.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Aadhaar Number <span className={noteStyle} title="Note: Please enter the Aadhaar Number which is linked for your PAN in e-Filing portal. Applicable to Individual only">i</span></label>
                            <input type="number" {...register("aadhaarNumber")} className={inputStyle} />
                        </div>
                        {errors.aadhaarNumber && <div className={errorStyle}>{errors.aadhaarNumber.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Nature of Employment</label>
                            <select {...register("natureOfEmployment")} className={inputStyle}>
                                {itr4NatureOfEmployment.map(nature => (
                                    <option value={nature}>{nature}</option>
                                ))}
                            </select>
                        </div>
                        {errors.natureOfEmployment && <div className={errorStyle}>{errors.natureOfEmployment.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Filed u/s</label>
                            <select {...register("filedUnderSection")} className={inputStyle}>
                                {itr4FiledUSlashS.map(item => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        {errors.filedUnderSection && <div className={errorStyle}>{errors.filedUnderSection.message}</div>}
                    </div>
                    <div className={fieldStyle}>
                        <div className={formPairStyle}>
                            <label className={labelStyle}>Or Filed in response to notice u/s</label>
                            <select {...register("orFiledInResponseToNoticeUnderSection")} className={inputStyle}>
                                {itr4OrFiledInResponseToNoticeUSlashS.map(item => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        {errors.orFiledInResponseToNoticeUnderSection && <div className={errorStyle}>{errors.orFiledInResponseToNoticeUnderSection.message}</div>}
                    </div>
                </fieldset>
                <div className="!mt-8 text-center">
                    <button type="submit" className="bg-blue-500 text-white text-lg rounded-full px-10 py-3 hover:bg-blue-600 transition-colors duration-500 ease-in-out">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ItrFour;