import React, { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch } from "../../../../../store/hooks.ts";
import { saveGstRegistration } from "../../../../../store/slices/gstSlice.ts";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
    gstRegistratinId: string | null;
}

const StateSpecificInfo: React.FC<Props> = ({ setStep, gstRegistratinId }) => {
    // Standardized input classes
    const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";

    const [formData, setFormData] = useState({
        taxECNo: "",
        taxRegisCertNo: "",
        exciseLicenseNo: "",
        licenseHolderName: "",
    });

    const dispatch = useAppDispatch();

    const handleSave = async () => {
        try {
            const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, stateSpecificInfo: formData })).unwrap();
            console.log('Save successful:', result.data);
            return true;
        } catch (error) {
            console.error('Save failed:', error);
            return false;
        }
    };

    const handleSubmit = async () => {
        const success = await handleSave();
        if (success) setStep(10);
    }

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
                                value={formData.taxECNo}
                                onChange={(e) => { setFormData({ ...formData, taxECNo: e.target.value }) }}
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
                                value={formData.taxRegisCertNo}
                                onChange={(e) => { setFormData({ ...formData, taxRegisCertNo: e.target.value }) }}
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
                                    value={formData.exciseLicenseNo}
                                    onChange={(e) => { setFormData({ ...formData, exciseLicenseNo: e.target.value }) }}
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
                                    value={formData.licenseHolderName}
                                    onChange={(e) => { setFormData({ ...formData, licenseHolderName: e.target.value }) }}
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
                        onClick={handleSubmit}
                    >
                        Save & Continue
                    </button>
                </div>
            </div>
        </>
    );
};

export default StateSpecificInfo;