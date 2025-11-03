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

    const [isLoading, setIsLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        taxECNo: "",
        taxRegisCertNo: "",
        exciseLicenseNo: "",
        licenseHolderName: "",
    });

    const dispatch = useAppDispatch();

    const handleSave = async () => {
        setIsLoading(true);
        setSaveError(null);
        try {
            const result = await dispatch(saveGstRegistration({ id: gstRegistratinId, stateSpecificInfo: formData })).unwrap();
            console.log('Save successful:', result.data);
            return true;
        } catch (error) {
            console.error('Save failed:', error);
            setSaveError('Failed to save registration. Please try again.');
            return false;
        } finally {
            setIsLoading(false);
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
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            'Next'
                        )}
                    </button>
                </div>
                {saveError && (
                    <div className="mt-2 text-sm text-red-500">{saveError}</div>
                )}
            </div>
        </>
    );
};

export default StateSpecificInfo;