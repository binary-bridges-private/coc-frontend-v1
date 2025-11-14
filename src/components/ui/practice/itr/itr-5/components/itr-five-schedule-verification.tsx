import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ItrFiveScheduleVerificationFormData {
  declarerName?: string;
  sonDaughterOf?: string;
  isSolemnly?: string;
  capacityStatement?: string;
  capacityAsset?: string;
  capacityBusiness?: string;
  capacityAuthority?: string;
  criticalAssumptions?: string;
  hasReturnSchedule?: string;
  place?: string;
  date?: string;
  signatureInitials?: string;
}

// Zod validation schemas
const itrFiveScheduleVerificationSchema = z.object({
  declarerName: z.string().optional(),
  sonDaughterOf: z.string().optional(),
  isSolemnly: z.string().optional(),
  capacityStatement: z.string().optional(),
  capacityAsset: z.string().optional(),
  capacityBusiness: z.string().optional(),
  capacityAuthority: z.string().optional(),
  criticalAssumptions: z.string().optional(),
  hasReturnSchedule: z.string().optional(),
  place: z.string().optional(),
  date: z.string().optional(),
  signatureInitials: z.string().optional(),
});

type ItrFiveScheduleVerificationFormType = z.infer<
  typeof itrFiveScheduleVerificationSchema
>;

interface ItrFiveScheduleVerificationProps {
  initialData?: ItrFiveScheduleVerificationFormData;
  onSave: (data: ItrFiveScheduleVerificationFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleVerification: React.FC<
  ItrFiveScheduleVerificationProps
> = ({ initialData, onSave, onNext, onBack }) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleVerificationFormType>({
    resolver: zodResolver(itrFiveScheduleVerificationSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [formData, setFormData] = useState<
    ItrFiveScheduleVerificationFormData
  >(initialData || {});

  const onSubmit = (data: ItrFiveScheduleVerificationFormType) => {
    onSave(formData);
  };

  const updateField = (
    field: keyof ItrFiveScheduleVerificationFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Verification
          </h1>
          <p className="text-purple-700">
            Final verification declaration as per Income-tax Act, 1961
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-purple-100 border-l-4 border-purple-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-purple-900">
            <strong>Important:</strong> This is the final verification section of your ITR return. 
            Please carefully review all information and sign the declaration in the presence of a witness if required.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Verification Declaration */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
            <h2 className="text-lg font-bold text-purple-900 mb-8">
              Verification as per Income-tax Act, 1961
            </h2>

            <div className="space-y-6">
              {/* Declaration Text */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <p className="text-sm leading-relaxed text-purple-900 mb-4">
                  I, <span className="font-semibold underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> son/daughter of{" "}
                  <span className="font-semibold underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>, solemnly declare that 
                  to the best of my knowledge and belief, the information given in the return and the schedules, statements, etc. accompanying it is correct and complete in accordance with the provisions of the Income-tax Act, 1961.
                </p>

                <p className="text-sm leading-relaxed text-purple-900 mb-4">
                  I further declare that I am making this return in my capacity as{" "}
                  <span className="font-semibold underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                  (drop down to be provided) and I am also competent to make this return and verify it. I am holding permanent account number{" "}
                  <span className="font-semibold underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                  (Please see instruction).
                </p>

                <p className="text-sm leading-relaxed text-purple-900 mb-4">
                  I further declare that the critical assumptions specified in the agreement have been satisfied and all the terms and conditions of the agreement have been complied with. (Applicable, in a case where return is furnished under section 92CD)
                </p>
              </div>

              {/* Declarer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Declarer Name
                  </label>
                  <input
                    type="text"
                    value={formData.declarerName || ""}
                    onChange={(e) => updateField("declarerName", e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-purple-900 mb-2">
                    Son/Daughter of
                  </label>
                  <input
                    type="text"
                    value={formData.sonDaughterOf || ""}
                    onChange={(e) =>
                      updateField("sonDaughterOf", e.target.value)
                    }
                    placeholder="Enter parent's name"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Solemnly Declaration */}
              <div>
                <label className="block text-sm font-semibold text-purple-900 mb-3">
                  I solemnly declare that
                </label>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.isSolemnly === "yes"}
                      onChange={(e) =>
                        updateField("isSolemnly", e.target.checked ? "yes" : "no")
                      }
                      className="mt-1 mr-3 w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-purple-900">
                      The information given in the return and schedules is correct and complete
                    </span>
                  </label>
                </div>
              </div>

              {/* Capacity Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-purple-900 mb-2">
                  Capacity in which return is being made
                </label>
                <select
                  value={formData.capacityStatement || ""}
                  onChange={(e) =>
                    updateField("capacityStatement", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Capacity</option>
                  <option value="Individual">Individual</option>
                  <option value="Representative">Representative</option>
                  <option value="Legal Guardian">Legal Guardian</option>
                  <option value="Attorney">Attorney</option>
                  <option value="Authorized Representative">
                    Authorized Representative
                  </option>
                  <option value="Trustee">Trustee</option>
                  <option value="Partner">Partner</option>
                  <option value="Director">Director</option>
                  <option value="Manager">Manager</option>
                  <option value="Executor/Administrator">
                    Executor/Administrator
                  </option>
                </select>
              </div>

              {/* Critical Assumptions */}
              <div>
                <label className="block text-sm font-semibold text-purple-900 mb-2">
                  Critical Assumptions for Transfer Pricing (if applicable)
                </label>
                <textarea
                  value={formData.criticalAssumptions || ""}
                  onChange={(e) =>
                    updateField("criticalAssumptions", e.target.value)
                  }
                  placeholder="Enter details of critical assumptions specified in the agreement (applicable under section 92CD)"
                  rows={4}
                  className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Section 92CD Question */}
              <div>
                <label className="block text-sm font-semibold text-purple-900 mb-3">
                  Has critical assumptions in Transfer Pricing agreement been satisfied?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="section92cd"
                      value="Yes"
                      checked={formData.hasReturnSchedule === "Yes"}
                      onChange={(e) =>
                        updateField("hasReturnSchedule", e.target.value)
                      }
                      className="mr-2 w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm font-semibold text-purple-900">
                      Yes
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="section92cd"
                      value="No"
                      checked={formData.hasReturnSchedule === "No"}
                      onChange={(e) =>
                        updateField("hasReturnSchedule", e.target.value)
                      }
                      className="mr-2 w-4 h-4 text-purple-600"
                    />
                    <span className="text-sm font-semibold text-purple-900">
                      No
                    </span>
                  </label>
                </div>
              </div>

              {/* Signature Section */}
              <div className="border-t-2 border-purple-300 pt-8 mt-8">
                <h3 className="text-md font-bold text-purple-900 mb-6">
                  Signature Section
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Place
                    </label>
                    <input
                      type="text"
                      value={formData.place || ""}
                      onChange={(e) => updateField("place", e.target.value)}
                      placeholder="City/Town"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-purple-900 mb-2">
                      Signature/Initials
                    </label>
                    <input
                      type="text"
                      value={formData.signatureInitials || ""}
                      onChange={(e) =>
                        updateField("signatureInitials", e.target.value)
                      }
                      placeholder="(Signature or initials)"
                      className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 italic"
                    />
                  </div>
                </div>

                {/* Signature Box */}
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-12 text-center mb-6">
                  <p className="text-sm text-purple-700 mb-4">
                    Signature Box - Please sign above
                  </p>
                  <div className="border-t-2 border-purple-900 w-64 mx-auto mt-8 pt-2">
                    <p className="text-xs text-purple-900">
                      Signature with date
                    </p>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
                  <p className="text-xs text-yellow-900 leading-relaxed">
                    <strong>Note:</strong> The return must be signed by the assessee. If return is signed by an 
                    authorized representative, the power of attorney must be enclosed. The return should be printed on 
                    A4 size paper and signed in blue ink. A scanned copy of the signed return should be uploaded along 
                    with the digital signature certificate while filing the return.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Submit Return →
            </button>
          </div>

          {/* Completion Message */}
          <div className="bg-green-50 border-2 border-green-400 rounded-lg p-6 text-center">
            <p className="text-green-900 font-semibold">
              ✓ You have completed all sections of the ITR-5 Form
            </p>
            <p className="text-sm text-green-700 mt-2">
              Please review all information before final submission
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleVerification;
