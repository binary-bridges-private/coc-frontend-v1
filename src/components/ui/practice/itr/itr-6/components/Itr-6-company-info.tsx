import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  CompanyType,
  FilingStatus,
  TaxRegime,
  AccountType,
  FilingSection,
} from "../itr-6.types.ts";
import { CompanyInformationFormData } from "../itr-6.validation.ts";

interface CompanyInformationProps {
  form: UseFormReturn<CompanyInformationFormData>;
  onSubmit: (values: CompanyInformationFormData) => void;
  onCancel: () => void;
}

const companyTypeOptions = [
  { label: "Private Limited Company", value: CompanyType.Private },
  { label: "Public Limited Company", value: CompanyType.Public },
  { label: "One Person Company", value: CompanyType.OnePersonCompany },
  { label: "Limited Liability Partnership", value: CompanyType.LimitedLiabilityPartnership },
];

const accountTypeOptions = [
  { label: "Savings", value: AccountType.Savings },
  { label: "Current", value: AccountType.Current },
  { label: "Other", value: AccountType.Other },
];

const filingStatusOptions = [
  {
    label: "On or before due date (139(1))",
    value: FilingStatus.OnOrBeforeDueDate,
  },
  { label: "Belated (139(4))", value: FilingStatus.Belated },
  { label: "Revised (139(5))", value: FilingStatus.Revised },
  { label: "Modified Return u/s 170A", value: FilingStatus.ModifiedReturn },
  { label: "Defective u/s 139(9)", value: FilingStatus.DefectiveReturn },
];

const taxRegimeOptions = [
  { label: "Old Regime (With deductions)", value: TaxRegime.Old },
  {
    label: "New Regime u/s 115BAC (No deductions, lower rates)",
    value: TaxRegime.New115BAC,
  },
];

const noticeResponseSectionOptions = [
  { label: "139(9)", value: FilingSection.Response139_9 },
  { label: "142(1)", value: FilingSection.Response142_1 },
  { label: "148", value: FilingSection.Response148 },
  { label: "153C", value: FilingSection.Response153C },
];

const CompanyInformation: React.FC<CompanyInformationProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const {
    register: registerBase,
    handleSubmit,
    watch: watchBase,
    formState: { errors, isSubmitting },
  } = form;

  // Create type-safe wrappers that accept any field name
  const register = registerBase as any;
  const watch = watchBase as any;

  const filingStatus = watch("filingStatus");
  const filedInResponseToNotice = watch("filedInResponseToNotice");
  const isRevisedOrDefective = watch("isRevisedOrDefective");

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 1
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Company Information
          </h2>
          <p className="text-sm text-gray-600">
            Provide company identification and registration details
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="self-start rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          Back to summary
        </button>
      </div>

      <div className="rounded-xl border-2 border-blue-300 bg-blue-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-blue-900">
              Important Instructions (ITR-6)
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>ITR-6</strong> should be filed by:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Companies other than those claiming exemption under section 11</li>
                <li>All companies except Section 11 companies (charitable/religious trusts)</li>
                <li>Both Resident and Non-Resident companies</li>
                <li>Companies with income from business, profession, capital gains, or other sources</li>
              </ul>
              <p className="mt-3 rounded bg-white p-2 text-xs italic">
                ℹ️ Companies claiming exemption under section 11 should file ITR-7 instead.
              </p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {(() => {
          const relevantErrors = Object.entries(errors).filter(([fieldName]) => {
            
            // Revised/Defective conditional fields
            if (fieldName === 'originalReceiptNumber' || fieldName === 'originalFilingDate') {
              return isRevisedOrDefective === true;
            }
            // Notice response conditional fields
            if (fieldName === 'responseNoticeSection' || fieldName === 'noticeUniqueDIN') {
              return filedInResponseToNotice === true;
            }
            // IFSC Unit conditional fields
            if (fieldName === 'ifscUnitRegistration') {
              return watch("hasUnitOnIFSC") === true;
            }
            // Startup conditional fields
            if (fieldName === 'startupRegistration') {
              return watch("isRecognizedStartup") === true;
            }
            // MSME conditional fields
            if (fieldName === 'msmeRegistration') {
              return watch("isRecognizedMSME") === true;
            }
            // PE Abroad conditional fields
            if (fieldName === 'peCountry' || fieldName === 'peNature') {
              return watch("hasPermanentEstablishmentAbroad") === true;
            }
            // SEP conditional fields
            if (fieldName === 'sepDetails') {
              return watch("hasSignificantEconomicPresence") === true;
            }
            // FII/FPI conditional fields
            if (fieldName === 'sebiRegistration') {
              return watch("isFIIOrFPI") === true;
            }
            // Representative Assessee conditional fields
            if (fieldName === 'representativeAsseeName' || 
                fieldName === 'representativeCapacity' || 
                fieldName === 'representativeAddress' || 
                fieldName === 'representativePAN') {
              return watch("isRepresentativeAssessee") === true;
            }
            // Director Certification conditional fields
            if (fieldName === 'directorCertificationNumber') {
              return watch("hasFiledDirectorCertification") === true;
            }
            // All other fields are always shown
            return true;
          });

          if (relevantErrors.length === 0) return null;

          return (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg className="h-6 w-6 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-red-900">
                    ⚠️ Please fix the following errors ({relevantErrors.length} field{relevantErrors.length > 1 ? 's' : ''})
                  </h3>
                  <ul className="space-y-1 text-sm text-red-800">
                    {relevantErrors.map(([fieldName, error]: [string, any]) => {
                      const message = error?.message || 'This field is required';
                      return (
                        <li key={fieldName} className="flex items-start gap-2">
                          <span className="font-medium">•</span>
                          <span>
                            <strong className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1').trim()}:</strong> {message}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}

        <div className="rounded-lg bg-blue-50 p-4">
          <SelectField
            label="Assessment Year"
            name="assessmentYear"
            register={register}
            error={errors.assessmentYear?.message}
            options={[
              { label: "2025-26", value: "2025-26" },
              { label: "2024-25", value: "2024-25" },
              { label: "2023-24", value: "2023-24" },
            ]}
            required
          />
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Company Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="PAN Number"
              name="pan"
              placeholder="ABCDE1234F"
              maxLength={10}
              register={register}
              error={errors.pan?.message}
              helperText="Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)"
              required
            />

            <InputField
              label="CIN (Corporate Identity Number)"
              name="cin"
              placeholder="U12345MH2020PTC123456"
              maxLength={21}
              register={register}
              error={errors.cin?.message}
              helperText="21-character code from ROC registration"
              required
            />
          </div>

          <InputField
            label="Company Name"
            name="companyName"
            placeholder="As per registration certificate"
            register={register}
            error={errors.companyName?.message}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Company Type"
              name="companyType"
              register={register}
              error={errors.companyType?.message}
              options={companyTypeOptions}
              required
            />

            <InputField
              label="Date of Incorporation"
              name="dateOfIncorporation"
              type="date"
              register={register}
              error={errors.dateOfIncorporation?.message}
              required
            />
          </div>

          <InputField
            label="Registration Number"
            name="registrationNumber"
            placeholder="Company registration number"
            register={register}
            error={errors.registrationNumber?.message}
            required
          />
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Contact Information
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Email Address 1"
              name="email"
              placeholder="company@example.com"
              type="email"
              register={register}
              error={errors.email?.message}
              required
            />

            <InputField
              label="Email Address 2 (Optional)"
              name="email2"
              placeholder="alternate@example.com"
              type="email"
              register={register}
              error={errors.email2?.message}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Office Phone Number with STD Code"
              name="officePhone"
              placeholder="e.g., +91-22-1234567"
              register={register}
              error={errors.officePhone?.message}
            />

            <InputField
              label="Mobile No. 1"
              name="mobileNumber"
              placeholder="10-digit mobile number"
              maxLength={10}
              register={register}
              error={errors.mobileNumber?.message}
              required
            />
          </div>

          <InputField
            label="Mobile No. 2 (Optional)"
            name="mobileNumber2"
            placeholder="10-digit mobile number"
            maxLength={10}
            register={register}
            error={errors.mobileNumber2?.message}
          />

          <InputField
            label="Registered Office Address"
            name="registeredAddress"
            placeholder="Complete address with building, street"
            register={register}
            error={errors.registeredAddress?.message}
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Town/City/District"
              name="city"
              placeholder="City name"
              register={register}
              error={errors.city?.message}
              required
            />

            <InputField
              label="State"
              name="state"
              placeholder="State name"
              register={register}
              error={errors.state?.message}
              required
            />

            <InputField
              label="Pin Code/Zip Code"
              name="pincode"
              placeholder="6-digit pincode"
              maxLength={6}
              register={register}
              error={errors.pincode?.message}
              required
            />
          </div>

          <InputField
            label="Country"
            name="country"
            placeholder="Country"
            register={register}
            error={errors.country?.message}
            required
          />
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Bank Details (for refund)
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Bank Name"
              name="bankName"
              placeholder="Name of the bank"
              register={register}
              error={errors.bankName?.message}
              required
            />

            <InputField
              label="Bank Account Number"
              name="bankAccountNumber"
              placeholder="Account number"
              register={register}
              error={errors.bankAccountNumber?.message}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="IFSC Code"
              name="bankIFSCCode"
              placeholder="11-character IFSC code"
              maxLength={11}
              register={register}
              error={errors.bankIFSCCode?.message}
              required
            />

            <SelectField
              label="Account Type"
              name="accountType"
              register={register}
              error={errors.accountType?.message}
              options={accountTypeOptions}
              required
            />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Filing Status & Tax Regime
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Filing Status"
              name="filingStatus"
              register={register}
              error={errors.filingStatus?.message}
              options={filingStatusOptions}
              required
            />

            <SelectField
              label="Tax Regime"
              name="taxRegime"
              register={register}
              error={errors.taxRegime?.message}
              options={taxRegimeOptions}
              required
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("filedInResponseToNotice")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Filing in response to notice/order u/s 139(9), 142(1), 148, 153A, or 153C</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("isRevisedOrDefective")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>This is a revised/defective return</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("previousReturnFiled")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Previous Return has been filed (for current or earlier AY)</span>
            </label>
          </div>

          <InputField
            label="Due Date for Filing Return of Income"
            name="dueDateForFiling"
            type="date"
            register={register}
            error={errors.dueDateForFiling?.message}
            helperText="This is typically the statutory due date for your category (31st July for companies)"
          />

          {isRevisedOrDefective && (
            <div className="grid grid-cols-2 gap-4 rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <InputField
                label="Original Receipt Number"
                name="originalReceiptNumber"
                placeholder="Enter original receipt number"
                register={register}
                error={errors.originalReceiptNumber?.message}
                required
              />

              <InputField
                label="Original Filing Date"
                name="originalFilingDate"
                type="date"
                register={register}
                error={errors.originalFilingDate?.message}
                required
              />
            </div>
          )}

          {filedInResponseToNotice && (
            <div className="grid grid-cols-2 gap-4 rounded-md border-l-4 border-red-400 bg-red-50 p-4">
              <SelectField
                label="Notice Section"
                name="responseNoticeSection"
                register={register}
                error={errors.responseNoticeSection?.message}
                options={noticeResponseSectionOptions}
                required
              />

              <InputField
                label="Unique Identification Number (DIN)"
                name="noticeUniqueDIN"
                placeholder="Enter DIN from notice"
                register={register}
                error={errors.noticeUniqueDIN?.message}
                required
              />
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Income Sources & Nature of Income (A19(b), A19(c), A19(d))
          </h3>

          <p className="text-sm text-gray-700">
            Specify the nature and amount of income sources for this assessment year
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("businessOrProfessionIncome")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Business or Profession Income</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("capitalGains")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Capital Gains</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("otherIncome")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Other Income</span>
            </label>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Manufacturing Status
          </h3>

          <p className="text-sm text-gray-700">
            If you are a new manufacturing cooperative society, whether you were required to furnish the return of income mandatorily u/s 139(1) for the AY 2021-22 & 2022-23
          </p>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("isNewManufacturingCoop")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>New manufacturing cooperative society</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("exercisedOption115BAE")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Exercised option u/s 115BAE of opting new tax regime in AY 2023-24 & 2024-25</span>
            </label>
          </div>

          {watch("exercisedOption115BAE") && (
            <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-4">
              <InputField
                label="Date of Filing of Form 10-IA & Acknowledgement Number"
                name="form10IADate"
                type="date"
                placeholder="DD/MM/YYYY"
                register={register}
                error={errors.form10IADate?.message}
              />
              <InputField
                label="Acknowledgement Number"
                name="form10IANumber"
                placeholder="Enter acknowledgement number"
                register={register}
                error={errors.form10IANumber?.message}
              />
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Entity Status & Recognition
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Residential Status (ITA 2 [E])
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value="resident"
                    {...register("residentialStatus")}
                    className="h-4 w-4 border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span>Resident</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value="nonResident"
                    {...register("residentialStatus")}
                    className="h-4 w-4 border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span>Non-Resident</span>
                </label>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("hasUnitOnIFSC")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether assesses has a unit on an International Financial Services Centre and derives income solely in convertible foreign exchange?</span>
            </label>

            {watch("hasUnitOnIFSC") && (
              <div className="rounded-md border-l-4 border-blue-400 bg-blue-50 p-4">
                <InputField
                  label="Unit Registration Number"
                  name="ifscUnitRegistration"
                  placeholder="Enter IFSC unit registration number"
                  register={register}
                  error={errors.ifscUnitRegistration?.message}
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("isRecognizedStartup")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether you are recognized as start-up by DPIIT</span>
            </label>

            {watch("isRecognizedStartup") && (
              <div className="rounded-md border-l-4 border-green-400 bg-green-50 p-4">
                <InputField
                  label="Startup Registration Certificate / DIN"
                  name="startupRegistration"
                  placeholder="Enter certification details"
                  register={register}
                  error={errors.startupRegistration?.message}
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("isRecognizedMSME")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether you are recognized as MSME</span>
            </label>

            {watch("isRecognizedMSME") && (
              <div className="rounded-md border-l-4 border-purple-400 bg-purple-50 p-4">
                <InputField
                  label="MSME Certificate / Registration Number"
                  name="msmeRegistration"
                  placeholder="Enter MSME registration number"
                  register={register}
                  error={errors.msmeRegistration?.message}
                />
                <div className="mt-3 text-xs text-gray-600">
                  As per MSMED Act, 2006
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            International Operations & Presence
          </h3>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("hasPermanentEstablishmentAbroad")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether you have a permanent establishment (PE) outside India</span>
            </label>

            {watch("hasPermanentEstablishmentAbroad") && (
              <div className="rounded-md border-l-4 border-orange-400 bg-orange-50 p-4">
                <InputField
                  label="Country of Permanent Establishment"
                  name="peCountry"
                  placeholder="Enter country name"
                  register={register}
                  error={errors.peCountry?.message}
                />
                <InputField
                  label="Nature of PE (Branch, Factory, Office, etc.)"
                  name="peNature"
                  placeholder="Enter nature of PE"
                  register={register}
                  error={errors.peNature?.message}
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("hasSignificantEconomicPresence")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether you have significant economic presence (SEP) outside India as defined in Explanation (2A) to Section 9(1)(i)</span>
            </label>

            {watch("hasSignificantEconomicPresence") && (
              <div className="rounded-md border-l-4 border-pink-400 bg-pink-50 p-4">
                <InputField
                  label="SEP Details - Transactions in Previous Year"
                  name="sepDetails"
                  placeholder="Enter aggregate SEP transactions details"
                  register={register}
                  error={errors.sepDetails?.message}
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("isFIIOrFPI")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether you are FII / FPI? Yes, if yes, provide SEBI Registration Number</span>
            </label>

            {watch("isFIIOrFPI") && (
              <div className="rounded-md border-l-4 border-indigo-400 bg-indigo-50 p-4">
                <InputField
                  label="SEBI Registration Number"
                  name="sebiRegistration"
                  placeholder="Enter SEBI registration number"
                  register={register}
                  error={errors.sebiRegistration?.message}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Representative Assessee & Additional Information
          </h3>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("isRepresentativeAssessee")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether this return is being filed by a representative assessee?</span>
            </label>

            {watch("isRepresentativeAssessee") && (
              <div className="rounded-md border-l-4 border-red-400 bg-red-50 p-4 space-y-3">
                <InputField
                  label="Name of the Representative Assessee"
                  name="representativeAsseeName"
                  placeholder="Full name"
                  register={register}
                  error={errors.representativeAsseeName?.message}
                />
                <InputField
                  label="Capacity of Representative"
                  name="representativeCapacity"
                  placeholder="e.g., Guardian, Receiver, Trustee, Court-appointed"
                  register={register}
                  error={errors.representativeCapacity?.message}
                />
                <InputField
                  label="Address of Representative"
                  name="representativeAddress"
                  placeholder="Complete address"
                  register={register}
                  error={errors.representativeAddress?.message}
                />
                <InputField
                  label="PAN/Aadhar No. of Representative"
                  name="representativePAN"
                  placeholder="PAN or Aadhar number"
                  register={register}
                  error={errors.representativePAN?.message}
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("hasFiledDirectorCertification")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Whether director certification from judicial board is available</span>
            </label>

            {watch("hasFiledDirectorCertification") && (
              <div className="rounded-md border-l-4 border-cyan-400 bg-cyan-50 p-4">
                <InputField
                  label="Director Certification Number"
                  name="directorCertificationNumber"
                  placeholder="Enter certification number"
                  register={register}
                  error={errors.directorCertificationNumber?.message}
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Legal Entity Identifier (LEI) Details
          </h3>

          <p className="text-sm text-gray-700">
            Mandatory if refund is 50 Crores or more
          </p>

          <InputField
            label="LEI Number"
            name="leiNumber"
            placeholder="20-character LEI identifier"
            maxLength={20}
            register={register}
            error={errors.leiNumber?.message}
          />

          <InputField
            label="Valid up to Date"
            name="leiValidUpToDate"
            type="date"
            register={register}
            error={errors.leiValidUpToDate?.message}
          />
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Accounting & Audit Information (Section 44AB/44AA)
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Whether liable to maintain accounts as per section 44AA? (Tick ☑)
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value="yes"
                    {...register("liableToMaintainAccounts44AA")}
                    className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value="no"
                    {...register("liableToMaintainAccounts44AA")}
                    className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("maintainsBooksUnderSection44AD")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Maintains books of account declaring income only under section 44AD/44ADA/44AE/44AB/44ABA/44BBB (Tick ☑)</span>
            </label>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("turnoverDetailsProvided")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>If (b) is selected at (a), whether aggregate of all amounts received including deemed turnover for gross receipts on capital account & capital contribution, turnover during previous year, in cash, & non-cash cheque/DD does not exceed the ceiling (Tick ☑)</span>
            </label>

            {watch("turnoverDetailsProvided") && (
              <div className="rounded-md border-l-4 border-blue-400 bg-blue-50 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Turnover does not exceed"
                    name="maxTurnoverThreshold"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.maxTurnoverThreshold?.message}
                  />
                  <InputField
                    label="Gross receipts on capital account"
                    name="capitalAccountReceipts"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.capitalAccountReceipts?.message}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    {...register("capitalAccountChequeDD")}
                    className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  <span>Non-cash cheque/DD received as capital account & asset acquisition, asset repayment of loans etc. & non-A/c payee cheque/DD during previous year</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Audit Details (Section 44AB)
          </h3>

          <div className="space-y-4">
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Whether liable for audit under section 44AB? (Tick ☑)
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value="yes"
                    {...register("liableForAudit44AB")}
                    className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="radio"
                    value="no"
                    {...register("liableForAudit44AB")}
                    className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            {watch("liableForAudit44AB") === "yes" && (
              <div className="rounded-md border-l-4 border-orange-400 bg-orange-50 p-4 space-y-4">
                <div className="space-y-2 border-b pb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    If Yes, whether the accounts have been audited by a CA (Tick ☑)
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        value="yes"
                        {...register("accountsAuditedByCA")}
                        className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        value="no"
                        {...register("accountsAuditedByCA")}
                        className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                {watch("accountsAuditedByCA") === "yes" && (
                  <div className="space-y-3">
                    <InputField
                      label="Date of Furnishing of Audit Report"
                      name="auditReportFurnishDate"
                      type="date"
                      register={register}
                      error={errors.auditReportFurnishDate?.message}
                    />

                    <InputField
                      label="Name of the Auditor Signing the Audit Report"
                      name="auditorName"
                      placeholder="Full name of auditor"
                      register={register}
                      error={errors.auditorName?.message}
                    />

                    <InputField
                      label="Membership No. of the Auditor"
                      name="auditorMembershipNumber"
                      placeholder="CA membership number"
                      register={register}
                      error={errors.auditorMembershipNumber?.message}
                    />

                    <InputField
                      label="Proprietorship/Firm Name"
                      name="auditorFirmName"
                      placeholder="Name of audit firm"
                      register={register}
                      error={errors.auditorFirmName?.message}
                    />

                    <InputField
                      label="Proprietorship/Firm Registration Number"
                      name="auditorFirmRegistration"
                      placeholder="Firm registration number"
                      register={register}
                      error={errors.auditorFirmRegistration?.message}
                    />

                    <InputField
                      label="Permanent Account Number (PAN) of Auditor"
                      name="auditorPAN"
                      placeholder="PAN of auditor"
                      maxLength={10}
                      register={register}
                      error={errors.auditorPAN?.message}
                    />

                    <InputField
                      label="Date of Audit Report"
                      name="auditReportDate"
                      type="date"
                      register={register}
                      error={errors.auditReportDate?.message}
                    />

                    <InputField
                      label="Acknowledgement Number of Audit Report"
                      name="auditReportAckNumber"
                      placeholder="Acknowledgement number"
                      register={register}
                      error={errors.auditReportAckNumber?.message}
                    />

                    <InputField
                      label="UDIN"
                      name="auditorUDIN"
                      placeholder="Unique Digital Identifier Number"
                      register={register}
                      error={errors.auditorUDIN?.message}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-3 border-t pt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("liableForAudit927E")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>Are you liable for Audit u/s 92E?</span>
            </label>

            {watch("liableForAudit927E") && (
              <div className="rounded-md border-l-4 border-red-400 bg-red-50 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      If (d) is Yes, whether accounts have been audited as per 92E?
                    </label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          value="yes"
                          {...register("accountsAuditedUnder92E")}
                          className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          value="no"
                          {...register("accountsAuditedUnder92E")}
                          className="h-4 w-4 border border-gray-300 bg-white text-blue-600"
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </div>
                  <InputField
                    label="Date of Furnish of Audit Report"
                    name="audit92EFurnishDate"
                    type="date"
                    register={register}
                    error={errors.audit92EFurnishDate?.message}
                  />
                </div>
                <InputField
                  label="Acknowledgement Number"
                  name="audit92EAckNumber"
                  placeholder="Acknowledgement number"
                  register={register}
                  error={errors.audit92EAckNumber?.message}
                />
              </div>
            )}

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("liableForOtherAuditReport")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>If liable to furnish other audit report under the Income-tax Act, mention whether you have furnished such report</span>
            </label>

            {watch("liableForOtherAuditReport") && (
              <div className="rounded-md border-l-4 border-purple-400 bg-purple-50 p-4">
                <p className="mb-3 text-sm text-gray-700">Please provide the details as under (Please see instruction)</p>
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-3 py-2">SL No.</th>
                          <th className="border border-gray-300 px-3 py-2">Section Code</th>
                          <th className="border border-gray-300 px-3 py-2">Date (DD/MM/YYYY)</th>
                          <th className="border border-gray-300 px-3 py-2">Acknowledgement Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[0, 1, 2].map((index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 px-3 py-2">
                              <span>{index + 1}</span>
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              <input
                                type="text"
                                placeholder="Section Code"
                                {...register(`otherAuditReports.${index}.sectionCode` as any)}
                                className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              <input
                                type="date"
                                {...register(`otherAuditReports.${index}.date` as any)}
                                className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                              />
                            </td>
                            <td className="border border-gray-300 px-3 py-2">
                              <input
                                type="text"
                                placeholder="Ack Number"
                                {...register(`otherAuditReports.${index}.ackNumber` as any)}
                                className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Partners/Members Information (Section A)
          </h3>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register("hasPartnershipChanges")}
              className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Whether there was any change during the previous year in the partners/members of the firm/AOP/BOI</span>
          </label>

          {watch("hasPartnershipChanges") && (
            <div className="rounded-md border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="mb-3 text-sm text-gray-700">
                List of societies and cooperative banks (if yes of societies/cooperative banks give details of Managing Committee). If yes, provide the details in respect of partners/members:
              </p>
              <div className="space-y-3 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-2 py-2">SL.</th>
                      <th className="border border-gray-300 px-2 py-2">Name of Partner/Member</th>
                      <th className="border border-gray-300 px-2 py-2">Admit/ Retired</th>
                      <th className="border border-gray-300 px-2 py-2">PAN</th>
                      <th className="border border-gray-300 px-2 py-2">Date of Admission/Retirement</th>
                      <th className="border border-gray-300 px-2 py-2">Remuneration Paid/Payable</th>
                      <th className="border border-gray-300 px-2 py-2">% of Share (if determinate)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0, 1].map((index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-2 py-2 text-center">{index + 1}</td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            placeholder="Partner/Member name"
                            {...register(`partners.${index}.name` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <select
                            {...register(`partners.${index}.status` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          >
                            <option value="">Select</option>
                            <option value="admit">Admit</option>
                            <option value="retired">Retired</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            placeholder="PAN"
                            maxLength={10}
                            {...register(`partners.${index}.pan` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="date"
                            {...register(`partners.${index}.admissionDate` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="Amount"
                            {...register(`partners.${index}.remuneration` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="%"
                            step="0.01"
                            {...register(`partners.${index}.sharePercentage` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            AOP/BOI Information (Section B-D)
          </h3>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register("isAOPOrBOI")}
              className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Is any member of the AOP/BOI/executor of AJP a foreign company?</span>
          </label>

          {watch("isAOPOrBOI") && (
            <div className="rounded-md border-l-4 border-indigo-400 bg-indigo-50 p-4 space-y-3">
              <InputField
                label="Percentage of Share of Foreign Company in AOP/BOI/Executor of AJP"
                name="foreignCompanySharePercentage"
                type="number"
                step="0.01"
                placeholder="0-100%"
                register={register}
                error={errors.foreignCompanySharePercentage?.message}
              />

              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  {...register("doesForeignEntityExceedLimit")}
                  className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>Whether total amount of any member of AOP/BOI/executor of AJP exceeds the maximum amount which is non-chargeable to tax</span>
              </label>

              {watch("doesForeignEntityExceedLimit") && (
                <InputField
                  label="Percentage Share Exceeding Limit"
                  name="excessSharePercentage"
                  type="number"
                  step="0.01"
                  placeholder="%"
                  register={register}
                  error={errors.excessSharePercentage?.message}
                />
              )}
            </div>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Beneficiaries & Trust Details (Section E-F)
          </h3>

          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register("hasBeneficiaryDetails")}
              className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Particulars of persons who were partners/members of the firm/AOP/BOI or settlor/trustee/beneficiary of the trust or executors in the case of estate of deceased/estate of insolvent</span>
          </label>

          {watch("hasBeneficiaryDetails") && (
            <div className="rounded-md border-l-4 border-green-400 bg-green-50 p-4">
              <div className="space-y-3 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-2 py-2">S. No.</th>
                      <th className="border border-gray-300 px-2 py-2">Name and Address</th>
                      <th className="border border-gray-300 px-2 py-2">% of Share</th>
                      <th className="border border-gray-300 px-2 py-2">PAN</th>
                      <th className="border border-gray-300 px-2 py-2">Aadhar Number</th>
                      <th className="border border-gray-300 px-2 py-2">Designated Partner</th>
                      <th className="border border-gray-300 px-2 py-2">Status</th>
                      <th className="border border-gray-300 px-2 py-2">Rate of Interest on Capital</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[0].map((index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-2 py-2 text-center">1</td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            placeholder="Name and Address"
                            {...register(`beneficiaries.${index}.nameAddress` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="%"
                            step="0.01"
                            {...register(`beneficiaries.${index}.sharePercentage` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            placeholder="PAN"
                            maxLength={10}
                            {...register(`beneficiaries.${index}.pan` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="text"
                            placeholder="Aadhar No."
                            maxLength={12}
                            {...register(`beneficiaries.${index}.aadhar` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <select
                            {...register(`beneficiaries.${index}.designatedPartner` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <select
                            {...register(`beneficiaries.${index}.status` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          >
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <input
                            type="number"
                            placeholder="%"
                            step="0.01"
                            {...register(`beneficiaries.${index}.interestRate` as any)}
                            className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              {...register("hasTrustBenefitDeclaredOrClaimed")}
              className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Whether shares of the beneficiary are determinate or known?</span>
          </label>

          <div className="space-y-2 text-sm text-gray-700">
            <p className="font-medium">Whether any member of AOP/BOI/executor of AJP has share (to be filled in case of such members):</p>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("isBenefitOfRelativesClaimInTrust")}
                className="h-4 w-4 rounded border border-gray-300"
              />
              <span>Whether all beneficiaries declared as has the benefit of the trust provided to relieve/member of HUF</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("isTrustCreatedBehalf")}
                className="h-4 w-4 rounded border border-gray-300"
              />
              <span>Whether the trust is created on behalf of a provident fund, superannuation fund, gratuity fund, pension fund or other fund created by employer for exclusive benefit of relatives/members of HUF during specified year</span>
            </label>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Nature of Business or Profession (Section G)
          </h3>

          <p className="text-sm text-gray-700">
            If more than one business or profession, indicate the three main activities/professions. (Tick applicable)
          </p>

          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="rounded-md border border-gray-300 bg-white p-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label={`Business Code ${index + 1}`}
                    name={`businessActivities.${index}.code`}
                    placeholder="[Please see Instruction]"
                    register={register}
                    error={(errors as any)?.businessActivities?.[index]?.code?.message}
                  />

                  <InputField
                    label={`Trade Name ${index + 1}`}
                    name={`businessActivities.${index}.tradeName`}
                    placeholder="Business name"
                    register={register}
                    error={(errors as any)?.businessActivities?.[index]?.tradeName?.message}
                  />
                </div>

                <InputField
                  label={`Description of Business ${index + 1}`}
                  name={`businessActivities.${index}.description`}
                  placeholder="Brief description"
                  register={register}
                  error={(errors as any)?.businessActivities?.[index]?.description?.message}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">
            Authorized Signatory Details
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Name of Authorized Signatory"
              name="authorizedSignatoryName"
              placeholder="Full name"
              register={register}
              error={errors.authorizedSignatoryName?.message}
              required
            />

            <InputField
              label="Designation"
              name="designation"
              placeholder="e.g., Director, Manager"
              register={register}
              error={errors.designation?.message}
              required
            />

            <InputField
              label="Place"
              name="place"
              placeholder="City of signing"
              register={register}
              error={errors.place?.message}
              required
            />
          </div>

          <InputField
            label="Date of Signature"
            name="dateOfSignature"
            type="date"
            register={register}
            error={errors.dateOfSignature?.message}
          />
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </form>
    </section>
  );
};

type RegisterFn = CompanyInformationProps["form"]["register"];

interface InputFieldProps {
  label: string;
  name: string;
  register: RegisterFn;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  step?: string | number;
  helperText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  placeholder,
  type = "text",
  maxLength,
  step,
  helperText,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        id={name}
        type={type}
        maxLength={maxLength}
        step={step}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name as any)}
      />
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  name: string;
  register: RegisterFn;
  required?: boolean;
  error?: string;
  options: Array<{ label: string; value: string }>;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  register,
  required = false,
  error,
  options,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <select
        id={name}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        defaultValue=""
        {...register(name as any)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
};

export default CompanyInformation;
