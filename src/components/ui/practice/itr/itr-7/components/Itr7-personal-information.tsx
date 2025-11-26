import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";
import {
  INDIAN_STATES,
} from "../itr-7.constants";

interface PersonalInformationProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;

  // Watch fields for conditional rendering
  const nameChange = watch("gen_name_change");
  const companyType = watch("gen_company_type");
  const returnType = watch("gen_original_return");
  const residentialStatus = watch("gen_residential_status");
  const representativeAssessee = watch("gen_representative_assessee");
  const auditAccounts = watch("gen_audit_accounts_audited");
  const startupRecognition = watch("gen_startup_recognition");
  const msmeRecognition = watch("gen_msme_recognition");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ITR-7: Personal Information
          </h1>
          <p className="text-slate-600 text-lg">
            Part A-GEN: General Information for Company/Corporate Assessee
          </p>
        </div>

        {/* Part 1: Basic Company Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Part 1: Basic Company Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A1. Name of Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                {...register("gen_name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.gen_name && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A2. PAN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., ABCDE1234F"
                {...register("gen_pan")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.gen_pan && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_pan.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A3. Any change in company name? If yes, furnish old name
              </label>
              <select
                {...register("gen_name_change")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {nameChange === "yes" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Old Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter old company name"
                  {...register("gen_old_name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.gen_old_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.gen_old_name.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A4. Corporate Identity Number (CIN) issued by MCA
              </label>
              <input
                type="text"
                placeholder="e.g., U72200XY2012ABC1234D"
                {...register("gen_cin")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.gen_cin && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_cin.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A5. Date of Incorporation (DD/MM/YYYY)
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                {...register("gen_incorporation_date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.gen_incorporation_date && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_incorporation_date.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A6. Date of Commencement of Business (DD/MM/YYYY)
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                {...register("gen_business_commencement_date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.gen_business_commencement_date && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_business_commencement_date.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Part 2: Address Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Part 2: Address Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A7. Flat/Door/Block No.
              </label>
              <input
                type="text"
                placeholder="Flat/Door/Block No."
                {...register("gen_flat_door_block")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A8. Name of Premises/Building/Village
              </label>
              <input
                type="text"
                placeholder="Premises/Building/Village"
                {...register("gen_premises_building")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A9. Road/Street/Post Office
              </label>
              <input
                type="text"
                placeholder="Road/Street/Post Office"
                {...register("gen_road_street_post")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A10. Area/Locality
              </label>
              <input
                type="text"
                placeholder="Area/Locality"
                {...register("gen_area_locality")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A11. Town/City/District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Town/City/District"
                {...register("gen_town_city_district")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.gen_town_city_district && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_town_city_district.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A12. State <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gen_state")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.gen_state && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_state.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A13. PIN Code
              </label>
              <input
                type="text"
                placeholder="6-digit PIN code"
                {...register("gen_pin_code")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.gen_pin_code && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_pin_code.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A14. Country
              </label>
              <input
                type="text"
                placeholder="Country"
                {...register("gen_country")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part 3: Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            Part 3: Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A15. Office Phone (STD Code)
              </label>
              <input
                type="text"
                placeholder="STD Code"
                {...register("gen_office_phone_std")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A15. Office Phone (Mobile No. 1)
              </label>
              <input
                type="text"
                placeholder="10-digit mobile number"
                {...register("gen_office_phone_mobile")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.gen_office_phone_mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_office_phone_mobile.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A16. Mobile No. 2
              </label>
              <input
                type="text"
                placeholder="10-digit mobile number"
                {...register("gen_mobile_2")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.gen_mobile_2 && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_mobile_2.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A17. Email Address-1
              </label>
              <input
                type="email"
                placeholder="Email address"
                {...register("gen_email_1")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.gen_email_1 && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_email_1.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A18. Email Address-2
              </label>
              <input
                type="email"
                placeholder="Email address"
                {...register("gen_email_2")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.gen_email_2 && (
                <p className="text-red-500 text-sm mt-1">{errors.gen_email_2.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Part 4: Company Type */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-amber-500">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Part 4: Company Type
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A19. Type of Company
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("gen_domestic_company_checkbox")}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="ml-3 text-gray-700">Domestic Company</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("gen_foreign_company_checkbox")}
                    className="w-4 h-4 text-amber-500 rounded focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="ml-3 text-gray-700">Foreign Company</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                (Tick any one) If a private company write 7, and if public company, write 6, If any other write 8
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Company Type Code
              </label>
              <input
                type="text"
                placeholder="6, 7, or 8"
                {...register("gen_public_company_write_6")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part 5: Filing Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            Part 5: Filing Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A19(a). Due Date of Filing (DD/MM/YYYY)
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                {...register("gen_due_date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A19(a)(i). I Filed us (Tick/Please see instruction)
              </label>
              <select
                {...register("gen_filed_us")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="139_1">139(1) - On or Before due date</option>
                <option value="139_4">139(4) - After due date</option>
                <option value="139_5">139(5) - Revised Return</option>
                <option value="92cd">92CD - Modified return</option>
                <option value="119_2b">119(2)(b) - After condonation of delay</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A19(b). If Revised/Defective/Modified, then enter Receipt Number or UIN from original return (DD/MM/YYYY)
              </label>
              <input
                type="text"
                placeholder="Receipt/UIN Number"
                {...register("gen_receipt_number")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A19(c). Response to Notice u/s 139(9)/142(1)/148/15C or order u/s 119(2)(b) or order referred in section 170A
              </label>
              <input
                type="text"
                placeholder="Unique Number/Document Identification"
                {...register("gen_response_to_notice")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part 6: Residential Status */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">
            Part 6: Residential Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A20. Residential Status (Tick)
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="resident"
                    {...register("gen_residential_status")}
                    className="w-4 h-4 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700">Resident</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="non-resident"
                    {...register("gen_residential_status")}
                    className="w-4 h-4 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="ml-3 text-gray-700">Non-Resident</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A20(a). Has any relief for taxation under section 115BA/115BAA/115BAB been drop down to be provided in filing utility
              </label>
              <select
                {...register("gen_taxation_under_115ba")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A20(b). If yes, please provide the date of filing of relevant form (10-IB/10-IC/10-ID) & acknowledgement number
              </label>
              <input
                type="text"
                placeholder="Date (DD/MM/YYYY)"
                {...register("gen_relevant_form_date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part 7: Representative Assessee */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-cyan-500">
          <h2 className="text-2xl font-bold text-cyan-900 mb-6">
            Part 7: Representative Assessee
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              A21. Whether this return is being filed by a representative assessee? (Tick)
            </label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="yes"
                  {...register("gen_representative_assessee")}
                  className="w-4 h-4 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                />
                <span className="ml-3 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  {...register("gen_representative_assessee")}
                  className="w-4 h-4 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                />
                <span className="ml-3 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {representativeAssessee === "yes" && (
            <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Please furnish following information:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A21(1). Name of the Representative Assessee
                  </label>
                  <input
                    type="text"
                    placeholder="Representative name"
                    {...register("gen_representative_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  {errors.gen_representative_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.gen_representative_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A21(2). Capacity of the Representative
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Director, Manager, etc."
                    {...register("gen_representative_capacity")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A21(3). Address of the Representative Assessee
                  </label>
                  <textarea
                    placeholder="Full address"
                    rows={3}
                    {...register("gen_representative_address")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A21(4). PAN/Aadhaar No. of the Representative Assessee
                  </label>
                  <input
                    type="text"
                    placeholder="PAN or Aadhaar"
                    {...register("gen_representative_pan_aadhaar")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                  {errors.gen_representative_pan_aadhaar && (
                    <p className="text-red-500 text-sm mt-1">{errors.gen_representative_pan_aadhaar.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Part 8: Audit Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold text-orange-900 mb-6">
            Part 8: Audit Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A22. Whether the accounts have been audited by an accountant? (Tick)
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_audit_accounts_audited")}
                    className="w-4 h-4 text-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_audit_accounts_audited")}
                    className="w-4 h-4 text-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          {auditAccounts === "yes" && (
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Furnish the following information below:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(1). Date of Furnishing of Audit Report (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    {...register("gen_audit_report_date")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.gen_audit_report_date && (
                    <p className="text-red-500 text-sm mt-1">{errors.gen_audit_report_date.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(2). Name of the Auditor Signing the Tax Audit Report
                  </label>
                  <input
                    type="text"
                    placeholder="Auditor name"
                    {...register("gen_auditor_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {errors.gen_auditor_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.gen_auditor_name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(3). Membership No. of the Auditor
                  </label>
                  <input
                    type="text"
                    placeholder="Membership number"
                    {...register("gen_auditor_membership")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(4). Name of the Auditor (Proprietorship/firm)
                  </label>
                  <input
                    type="text"
                    placeholder="Firm name"
                    {...register("gen_auditor_firm_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(5). Proprietorship/Firm Registration Number
                  </label>
                  <input
                    type="text"
                    placeholder="Registration number"
                    {...register("gen_auditor_registration")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(6). PAN/Aadhaar No. of the Auditor (Proprietorship/firm)
                  </label>
                  <input
                    type="text"
                    placeholder="PAN/Aadhaar"
                    {...register("gen_auditor_pan")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(7). Date of Audit Report (DD/MM/YYYY)
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    {...register("gen_audit_date")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(8). Acknowledgement Number of the Audit Report
                  </label>
                  <input
                    type="text"
                    placeholder="Acknowledgement number"
                    {...register("gen_audit_acknowledgement")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    A22(9). UDIN
                  </label>
                  <input
                    type="text"
                    placeholder="UDIN"
                    {...register("gen_udin")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Part 9: Start-up Recognition */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Part 9: Start-up Recognition (DPIIT)
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              A23. Whether recognized as start up by DPIIT?
            </label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="yes"
                  {...register("gen_startup_recognition")}
                  className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  {...register("gen_startup_recognition")}
                  className="w-4 h-4 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-3 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {startupRecognition === "yes" && (
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A23(1). DPIIT Start-up Registration Number
                </label>
                <input
                  type="text"
                  placeholder="Start-up recognition number"
                  {...register("gen_dpiit_startup_number")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A23(2). Whether Certificate from Inter-ministerial Board for Certification is Received?
                </label>
                <select
                  {...register("gen_inter_ministerial_certificate")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A23(3). If yes provide the Certification Number
                </label>
                <input
                  type="text"
                  placeholder="Certificate number"
                  {...register("gen_certificate_number")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A23(4). Whether Declaration in Form 2 in compliance with para 5 of DPIIT notification dated 19/02/2019 has been filed before filing the return?
                </label>
                <select
                  {...register("gen_dpiit_para5_declaration")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A23(4i). If yes, provide date of filing of Form 2 (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  {...register("gen_form2_filing_date")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Part 10: MSME Recognition */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-teal-600">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">
            Part 10: MSME Recognition
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              A24. Whether you are recognized as MSME?
            </label>
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="yes"
                  {...register("gen_msme_recognition")}
                  className="w-4 h-4 text-teal-600 focus:ring-2 focus:ring-teal-500"
                />
                <span className="ml-3 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  {...register("gen_msme_recognition")}
                  className="w-4 h-4 text-teal-600 focus:ring-2 focus:ring-teal-500"
                />
                <span className="ml-3 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {msmeRecognition === "yes" && (
            <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  A24(1). MSME Registration Number (As per MSME Act 2006)
                </label>
                <input
                  type="text"
                  placeholder="Registration number"
                  {...register("gen_msme_registration")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Part 11: LEI Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-rose-600">
          <h2 className="text-2xl font-bold text-rose-900 mb-6">
            Part 11: Legal Entity Identifier (LEI)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A25. LEI Number
              </label>
              <input
                type="text"
                placeholder="LEI Number"
                {...register("gen_lei_number")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                A25(1). Valid Upto Date (DD/MM/YYYY)
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                {...register("gen_lei_valid_date")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Part 12: Tax Sections and Conditions */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-violet-600">
          <h2 className="text-2xl font-bold text-violet-900 mb-6">
            Part 12: Tax Sections & Compliance Conditions
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A26. Whether liable to maintain accounts as per section 44AA? (Tick)
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_maintain_accounts_44aa")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_maintain_accounts_44aa")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A27. Whether declaring income only under section 44BB/44BBB/44BBA? (Tick)
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_income_declaration_44bb")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_income_declaration_44bb")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A28. Whether total turnover/sales/gross receipts of business exceeds 400 crores? (Tick)
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_total_turnover_exceeds_400cr")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_total_turnover_exceeds_400cr")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A29. Whether assessee is a Permanent Establishment (PE) in India as per section 9(1)(i)?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_permanent_establishment")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_permanent_establishment")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A30. Whether assessee has a Significant Economic Presence (SEP) in India as per section 9(1)(i)?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_significant_economic_presence")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_significant_economic_presence")}
                    className="w-4 h-4 text-violet-600 focus:ring-2 focus:ring-violet-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Part 13: Transfer Pricing & Section 92 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-pink-600">
          <h2 className="text-2xl font-bold text-pink-900 mb-6">
            Part 13: Transfer Pricing & International Transactions
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A31. Whether the financial statements of the company are drawn up in compliance with Indian Accounting Standards?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_financial_statements_compliance")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_financial_statements_compliance")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A32. Whether the assessee company is under International Financial Services Centre and derives income solely in convertible foreign exchange?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_ifsc_unit")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_ifsc_unit")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A33. Whether assessee has a unit located in an International Financial Services Centre and derives income solely in convertible foreign exchange?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_foreign_exchange")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_foreign_exchange")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A34. Whether the assessee company is under liquidation?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_under_liquidation")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_under_liquidation")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A35. Whether you are an FII/FPI?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_fii_fpi")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_fii_fpi")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                If yes, please provide SEBI Registration Number
              </label>
              <input
                type="text"
                placeholder="SEBI Registration Number"
                {...register("gen_sebi_registration")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                A36. Whether the company is a producer company as defined in Sec.581 A of Companies Act, 1956?
              </label>
              <div className="space-y-3">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="yes"
                    {...register("gen_producer_company")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="no"
                    {...register("gen_producer_company")}
                    className="w-4 h-4 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-3 text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end mb-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInformation;
