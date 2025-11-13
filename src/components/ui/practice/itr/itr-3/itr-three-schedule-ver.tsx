"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleVERSchema = z
  .object({
    // Verification Details
    declarantName: z.string().default(""),
    declarantCapacity: z.string().default(""),
    placeName: z.string().default(""),
    verificationDate: z.string().default(""),
    signature: z.string().default(""),
    
    // Declarations
    declaredKnowledgeBelief: z.string().default("No"),
    informationCorrectComplete: z.string().default("No"),
    returnsIncomplete: z.string().default("No"),
    returnsCapacity: z.string().default(""),
    competentVerify: z.string().default("No"),
    holdingPAN: z.string().default("No"),
    panNumber: z.string().default(""),
    criticalAssumptions: z.string().default("No"),
    assumptionsStatement: z.string().default(""),
    allConditionsMet: z.string().default("No"),
    conditionsDetails: z.string().default(""),
    returnVerified: z.string().default("No"),
    returnFormNo: z.string().default(""),
  })
  .superRefine((data, ctx) => {
    console.log("Schedule VER - Verification and Declaration", data);
  });

export type ScheduleVERFormData = z.infer<typeof ScheduleVERSchema>;

interface ScheduleVERProps {
  initialData?: Partial<ScheduleVERFormData>;
  onSave: (data: ScheduleVERFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleVER({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleVERProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleVERFormData>({
    resolver: zodResolver(ScheduleVERSchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const onSubmit: SubmitHandler<ScheduleVERFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-purple-900">
          Verification - Declaration and Signature
        </h1>
        <p className="mt-1 text-sm text-purple-800">
          Final verification and declaration as per Income Tax Act, 1961
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        
        {/* Primary Declaration Box */}
        <div className="rounded-xl border-2 border-purple-400 bg-purple-50 p-6">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            Declaration
          </h2>
          <div className="bg-white p-5 rounded-lg border border-purple-200 space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>I,</strong> <span className="text-purple-600">{watched.declarantName || "[Name]"}</span> 
              <strong> son/daughter of</strong> _______________ 
              <strong> solemnly declare that to the best of my knowledge and belief, the information given in the return and schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.</strong>
            </p>
            
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>I further declare that I am making returns in my capacity as</strong> 
              <span className="underline"> {watched.returnsCapacity || "[Capacity]"}</span> 
              <strong> and I am also competent to make this return and verify it. I am holding permanent account number as</strong> 
              <span className="underline"> {watched.panNumber || "[PAN]"}</span> 
              <strong> (if allotted)</strong>
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>I further declare that the critical assumptions specified in the agreement have been satisfied and all the terms and conditions of the agreement have been complied with. (Applicable in a case where return is furnished under section 92CD)</strong>
            </p>
          </div>
        </div>

        {/* Declarant Information */}
        <div className="rounded-xl border border-purple-300 bg-indigo-50 p-6">
          <h2 className="text-lg font-bold text-indigo-900 mb-4">
            A. Declarant Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of Declarant
              </label>
              <Controller
                name="declarantName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Full name..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity (Individual/HUF/Company/etc.)
              </label>
              <Controller
                name="declarantCapacity"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select capacity...</option>
                    <option value="Individual">Individual</option>
                    <option value="HUF">HUF</option>
                    <option value="Company">Company</option>
                    <option value="LLP">LLP</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Trust">Trust</option>
                    <option value="AOP">AOP</option>
                    <option value="BOI">BOI</option>
                  </select>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Place of Verification
              </label>
              <Controller
                name="placeName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="City/Place..."
                  />
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Verification (DD/MM/YYYY)
              </label>
              <Controller
                name="verificationDate"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="DD/MM/YYYY"
                  />
                )}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN (if applicable)
              </label>
              <Controller
                name="panNumber"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="AAAAAAAAAA"
                  />
                )}
              />
            </div>
          </div>
        </div>

        {/* Declarations Section */}
        <div className="rounded-xl border border-blue-300 bg-blue-50 p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            B. Declarations & Confirmations
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-blue-200">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I am competent to make this return and verify it
                </label>
                <p className="text-xs text-gray-600">Confirm eligibility to file and verify return</p>
              </div>
              <Controller
                name="competentVerify"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || "No"}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
              />
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-blue-200">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I am holding permanent account number (PAN)
                </label>
                <p className="text-xs text-gray-600">If allotted</p>
              </div>
              <Controller
                name="holdingPAN"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || "No"}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
              />
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-blue-200">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Critical assumptions satisfied (Section 92CD)
                </label>
                <p className="text-xs text-gray-600">If applicable to APA agreements</p>
              </div>
              <Controller
                name="criticalAssumptions"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || "No"}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
              />
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-blue-200">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  All terms and conditions of agreement complied
                </label>
                <p className="text-xs text-gray-600">If return furnished under section 92CD</p>
              </div>
              <Controller
                name="allConditionsMet"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    value={field.value || "No"}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                )}
              />
            </div>
          </div>
        </div>

        {/* Signature and Verification Box */}
        <div className="rounded-xl border-2 border-green-400 bg-green-50 p-6">
          <h2 className="text-lg font-bold text-green-900 mb-4">
            C. Signature and Final Verification
          </h2>
          <div className="bg-white p-5 rounded-lg border border-green-200 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Signature of Declarant
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Authorized Signature</p>
                <p className="text-xs text-gray-500">Signature Image/Digital Signature</p>
              </div>
            </div>
            
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <p className="text-sm text-green-900">
                <strong>Note:</strong> The return must be digitally signed or contain an image of the signature with a timestamp. For electronic filing, digital signature certificate is mandatory.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <Controller
                  name="returnVerified"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      {...field}
                      value="Yes"
                      checked={field.value === "Yes"}
                      onChange={(e) =>
                        field.onChange(e.target.checked ? "Yes" : "No")
                      }
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                  )}
                />
                <span className="text-sm font-medium text-gray-700">
                  Return verified and ready for submission
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-6">
          <h2 className="text-lg font-bold text-amber-900 mb-3">
            Important Information
          </h2>
          <ul className="space-y-2 text-sm text-amber-900">
            <li className="flex gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>Declaration is made solemnly as per Income Tax Act, 1961</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>False declaration may result in penalties under the Income Tax Act</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>Digital signature or digital verification is mandatory for e-filed returns</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>Place and date of verification must be accurately recorded</span>
            </li>
            <li className="flex gap-2">
              <span className="text-amber-600 font-bold">•</span>
              <span>This is the final step before submitting the ITR</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-lg rounded-b-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back to Summary
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Save & Complete
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-purple-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
        >
          Submit Return
        </button>
      </div>
    </form>
  );
}
