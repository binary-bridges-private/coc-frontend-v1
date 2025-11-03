import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  Gender,
  FilingStatus,
  TaxRegime,
  FilingSection,
} from "../itr-1.types.ts";
import { PersonalInformationFormData } from "../itr-1.validation.ts";

interface PersonalInformationProps {
  form: UseFormReturn<PersonalInformationFormData>;
  onSubmit: (values: PersonalInformationFormData) => void;
  onCancel: () => void;
}

const genderOptions = [
  { label: "Male", value: Gender.Male },
  { label: "Female", value: Gender.Female },
  { label: "Other", value: Gender.Other },
  { label: "Prefer not to say", value: Gender.NotSpecified },
];

const residentialStatusOptions = [
  "Resident",
  "Non-Resident",
  "Resident but Not Ordinarily Resident",
];

const employmentOptions = [
  "Government",
  "Public Sector",
  "Private Sector",
  "Self-Employed",
  "Retired",
  "Others",
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

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const [showFilingMetadata, setShowFilingMetadata] = useState(false);
  const filingStatus = watch("filingStatus");
  const filedInResponseToNotice = watch("filedInResponseToNotice");
  const isRevisedOrDefective = watch("isRevisedOrDefective");
  const taxRegime = watch("taxRegime");
  const filingUnderSeventhProviso = watch("filingUnderSeventhProviso");

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Step 1
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="text-sm text-gray-600">
            Provide your basic identification and contact details as they appear
            on official records.
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

      <div className="rounded-xl border-2 border-orange-300 bg-orange-50 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-orange-900">
              Important Instructions (ITR-1 SAHAJ)
            </h3>
            <div className="space-y-2 text-sm text-gray-800">
              <p>
                <strong>ITR-1 (SAHAJ)</strong> can be filed by a Resident
                Individual whose:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Total income does not exceed ₹50 lakh</li>
                <li>
                  Income is from Salary, one House Property, Family Pension,
                  Agricultural income (up to ₹5,000), and Interest
                </li>
                <li>
                  <strong className="text-red-600">Does NOT have:</strong>{" "}
                  Income under the head 'Profits and Gains of Business or
                  Profession'
                </li>
                <li>
                  <strong className="text-red-600">Does NOT have:</strong>{" "}
                  Capital Gains (Long term or Short term)
                </li>
                <li>
                  <strong className="text-red-600">Does NOT have:</strong>{" "}
                  Income from more than one house property
                </li>
                <li>
                  <strong className="text-red-600">Does NOT have:</strong>{" "}
                  Income from Lottery, Race Horses, Legal Gambling, etc.
                </li>
              </ul>
              <p className="mt-3 rounded bg-white p-2 text-xs italic">
                ℹ️ Individuals who are Directors in a company or have invested
                in unlisted equity shares are{" "}
                <strong className="text-red-600">NOT eligible</strong> to file
                ITR-1.
              </p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-700">
            <strong>💡 Helpful Tip:</strong> To estimate your total tax and
            decide as to which tax regime is beneficial, you may use{" "}
            <span className="text-blue-600 font-semibold">
              income tax calculator
            </span>
          </p>
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="PAN Number"
            name="pan"
            placeholder="ABCDE1234F"
            maxLength={10}
            register={register}
            error={errors.pan?.message}
            required
          />

          <InputField
            label="Aadhaar Number"
            name="aadhar"
            placeholder="123456789012"
            maxLength={12}
            register={register}
            error={errors.aadhar?.message}
            required
          />
        </div>

        <InputField
          label="Aadhaar Enrolment ID"
          name="aadhaarEnrolmentId"
          placeholder="Enter your Aadhaar Enrolment ID"
          maxLength={14}
          register={register}
          error={errors.aadhaarEnrolmentId?.message}
        />

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="As per PAN"
            register={register}
            error={errors.firstName?.message}
            required
          />

          <InputField
            label="Middle Name"
            name="middleName"
            placeholder="Optional"
            register={register}
            error={errors.middleName?.message}
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="As per PAN"
            register={register}
            error={errors.lastName?.message}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            register={register}
            error={errors.dateOfBirth?.message}
            required
          />

          <SelectField
            label="Gender"
            name="gender"
            register={register}
            error={errors.gender?.message}
            options={genderOptions.map(({ label, value }) => ({
              label,
              value,
            }))}
            required
          />

          <SelectField
            label="Residential Status"
            name="residentialStatus"
            register={register}
            error={errors.residentialStatus?.message}
            options={residentialStatusOptions.map((status) => ({
              label: status,
              value: status,
            }))}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Email Address"
            name="email"
            placeholder="you@example.com"
            type="email"
            register={register}
            error={errors.email?.message}
            required
          />

          <InputField
            label="Mobile Number"
            name="mobileNumber"
            placeholder="10-digit mobile number"
            maxLength={10}
            register={register}
            error={errors.mobileNumber?.message}
            required
          />
        </div>

        <SelectField
          label="Nature of Employment"
          name="natureOfEmployment"
          register={register}
          error={errors.natureOfEmployment?.message}
          options={employmentOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Flat / Door / Block No."
            name="flatDoorBlockNo"
            placeholder="e.g., Flat 101, Block A"
            register={register}
            error={errors.flatDoorBlockNo?.message}
          />

          <InputField
            label="Name of Premises / Building / Village"
            name="nameOfPremises"
            placeholder="Building or village name"
            register={register}
            error={errors.nameOfPremises?.message}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Road / Street / Post Office"
            name="roadStreetPostOffice"
            placeholder="Street name or post office"
            register={register}
            error={errors.roadStreetPostOffice?.message}
          />

          <InputField
            label="Area / Locality"
            name="areaLocality"
            placeholder="Area or locality"
            register={register}
            error={errors.areaLocality?.message}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <InputField
            label="Town / City / District"
            name="city"
            placeholder="Town, city or district"
            register={register}
            error={errors.city?.message}
            required
          />

          <InputField
            label="State"
            name="state"
            register={register}
            error={errors.state?.message}
            required
          />

          <SelectField
            label="Country / Region"
            name="country"
            register={register}
            error={errors.country?.message}
            options={[
              { label: "91-INDIA", value: "91-INDIA" },
              { label: "Other", value: "OTHER" },
            ]}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="PIN Code"
            name="pincode"
            placeholder="6-digit"
            maxLength={6}
            register={register}
            error={errors.pincode?.message}
          />

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                {...register("noZipCode")}
                className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span>No ZIP Code</span>
            </label>
          </div>

          <InputField
            label="ZIP Code (if applicable)"
            name="zipCode"
            placeholder="ZIP"
            register={register}
            error={errors.zipCode?.message}
          />
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 font-semibold text-gray-900">
            Bank Account Details (For Refund)
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Bank Name"
              name="bankName"
              placeholder="Enter bank name"
              register={register}
              error={errors.bankName?.message}
            />

            <InputField
              label="Bank Account Number"
              name="bankAccountNumber"
              placeholder="Enter account number"
              register={register}
              error={errors.bankAccountNumber?.message}
            />

            <InputField
              label="IFSC Code"
              name="bankIFSCCode"
              placeholder="Enter IFSC code"
              maxLength={11}
              register={register}
              error={errors.bankIFSCCode?.message}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={() => setShowFilingMetadata(!showFilingMetadata)}
            className="mb-4 flex w-full items-center justify-between rounded-lg bg-blue-50 p-4 text-left transition-colors hover:bg-blue-100"
          >
            <div>
              <h3 className="font-semibold text-gray-900">
                Filing Status & Tax Regime
              </h3>
              <p className="text-sm text-gray-600">
                Important information about your ITR filing
              </p>
            </div>
            <svg
              className={`h-5 w-5 text-gray-600 transition-transform ${
                showFilingMetadata ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showFilingMetadata && (
            <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h4 className="mb-2 font-semibold text-blue-900">
                  💡 Understanding Tax Regimes
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Old Regime:</strong> Allows deductions under Chapter
                    VI-A (80C, 80D, etc.) but higher tax rates
                  </p>
                  <p>
                    <strong>New Regime (115BAC):</strong> Lower tax rates but NO
                    deductions allowed (except standard deduction)
                  </p>
                  <p className="mt-2 text-xs italic text-gray-600">
                    Choose the regime that minimizes your tax liability
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Filing Status (A6)"
                  name="filingStatus"
                  register={register}
                  error={errors.filingStatus?.message}
                  options={filingStatusOptions}
                  required
                />

                <SelectField
                  label="Tax Regime (A20)"
                  name="taxRegime"
                  register={register}
                  error={errors.taxRegime?.message}
                  options={taxRegimeOptions}
                  required
                />

                {(filingStatus === FilingStatus.Revised ||
                  filingStatus === FilingStatus.DefectiveReturn) && (
                  <>
                    <div className="col-span-2 rounded-md border-l-4 border-yellow-400 bg-yellow-50 p-3 text-sm text-gray-700">
                      {filingStatus === FilingStatus.Revised ? (
                        <>
                          <strong>📝 Revised Return:</strong> File this to
                          correct errors or omissions in your original return.
                          Can be filed before the end of the relevant assessment
                          year or before completion of assessment, whichever is
                          earlier.
                        </>
                      ) : (
                        <>
                          <strong>🔧 Defective Return:</strong> File this if the
                          Income Tax Department found defects in your original
                          return and issued a notice u/s 139(9). You must
                          rectify the defects and file within the time specified
                          in the notice.
                        </>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Original Receipt Number (A18)"
                        name="originalReceiptNumber"
                        placeholder="Receipt number of original return"
                        register={register}
                        error={errors.originalReceiptNumber?.message}
                      />

                      <InputField
                        label="Date of Filing Original Return (A18)"
                        name="originalFilingDate"
                        type="date"
                        register={register}
                        error={errors.originalFilingDate?.message}
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      {...register("filedInResponseToNotice")}
                      className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <span>Filed in response to notice u/s (A16-A19)</span>
                  </label>
                </div>

                {filedInResponseToNotice && (
                  <>
                    <div className="col-span-2 rounded-md border-l-4 border-red-400 bg-red-50 p-3 text-sm text-gray-700">
                      <strong>🚨 Notice Response:</strong> Check this ONLY if
                      you received an official notice from the Income Tax
                      Department under sections 139(9), 142(1), 148, 153A, or
                      153C. The DIN (Document Identification Number) is
                      mandatory and can be found on the notice document.
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <SelectField
                        label="Notice Section"
                        name="responseNoticeSection"
                        register={register}
                        error={errors.responseNoticeSection?.message}
                        options={noticeResponseSectionOptions}
                      />

                      <InputField
                        label="Unique Identification Number (DIN)"
                        name="noticeUniqueDIN"
                        placeholder="Enter DIN from notice"
                        register={register}
                        error={errors.noticeUniqueDIN?.message}
                      />
                    </div>
                  </>
                )}

                {taxRegime === TaxRegime.New115BAC && (
                  <>
                    <div className="col-span-2 rounded-lg border border-red-300 bg-red-50 p-4">
                      <h4 className="mb-2 font-semibold text-red-900">
                        Do you wish to exercise the option u/s 115BAC(6) of
                        Opting out of new tax regime? (default is "No")
                      </h4>
                      <div className="space-y-2 text-sm text-gray-800">
                        <p>
                          1. By selecting <strong>"No"</strong> option your
                          income and tax computation shall be as per{" "}
                          <strong>"NEW TAX REGIME"</strong>
                        </p>
                        <p>
                          2. By selecting <strong>"Yes"</strong> option your
                          income and tax computation shall be as per{" "}
                          <strong>"OLD TAX REGIME"</strong>
                        </p>
                        <p className="mt-2 rounded bg-white p-2 text-xs italic text-red-700">
                          <strong>Note:</strong> For Opting out, option should
                          be exercised along with the return of income filed u/s
                          139(1).
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input
                          type="checkbox"
                          {...register("optingOut115BAC")}
                          className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span>Opting out of 115BAC(6) regime</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Form 10-IE Acknowledgment Number"
                        name="form10IEAckNumber"
                        placeholder="Enter Form 10-IE Ack No."
                        register={register}
                        error={errors.form10IEAckNumber?.message}
                      />

                      <InputField
                        label="Form 10-IE Date"
                        name="form10IEAckDate"
                        type="date"
                        register={register}
                        error={errors.form10IEAckDate?.message}
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2 border-t border-gray-300 pt-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      {...register("filingUnderSeventhProviso")}
                      className="h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                    />
                    <span>
                      Filing under Seventh proviso to section 139(1) (A21)
                    </span>
                  </label>
                  <div className="ml-6 mt-2 rounded-md border-l-4 border-purple-400 bg-purple-50 p-3 text-xs text-gray-700">
                    <strong>⚠️ Mandatory Filing Condition:</strong> Even if your
                    total income is below taxable limit, you MUST file return if
                    your expenditure on foreign travel exceeds{" "}
                    <strong>₹2,00,000</strong> or electricity consumption
                    exceeds <strong>₹1,00,000</strong> during the financial
                    year.
                  </div>
                </div>

                {filingUnderSeventhProviso && (
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Foreign Travel Expenditure (Rs.)"
                      name="foreignTravelExpenditure"
                      type="number"
                      placeholder="0"
                      register={register}
                      error={errors.foreignTravelExpenditure?.message}
                    />

                    <InputField
                      label="Electricity Expenditure (Rs.)"
                      name="electricityExpenditure"
                      type="number"
                      placeholder="0"
                      register={register}
                      error={errors.electricityExpenditure?.message}
                    />
                  </div>
                )}

                <div className="md:col-span-2 border-t border-gray-300 pt-4">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h4 className="mb-3 font-semibold text-blue-900">
                      Are you required to file a return as per other conditions
                      prescribed under clause (iv) of seventh proviso to section
                      139(1)?
                    </h4>
                    <p className="mb-3 text-sm text-gray-700">
                      (If yes, please furnish following information)
                    </p>

                    <div className="space-y-3">
                      <label className="flex items-start gap-3 rounded bg-white p-3 text-sm">
                        <input
                          type="checkbox"
                          {...register("tdsTcsAggregate25ThousandOrMore")}
                          className="mt-1 h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="flex-1 text-gray-700">
                          The aggregate of tax deducted at source and tax
                          collected at source during the previous year, in the
                          case of the person, is{" "}
                          <strong>twenty-five thousand rupees or more</strong>
                          <span className="text-gray-600">
                            {" "}
                            (fifty thousand for resident senior citizen)
                          </span>
                        </span>
                      </label>

                      <label className="flex items-start gap-3 rounded bg-white p-3 text-sm">
                        <input
                          type="checkbox"
                          {...register("savingsBankDeposit50LakhOrMore")}
                          className="mt-1 h-4 w-4 rounded border border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                        />
                        <span className="flex-1 text-gray-700">
                          The deposit in one or more savings bank account of the
                          person, in aggregate, is{" "}
                          <strong>fifty lakh rupees or more</strong>, in the
                          previous year
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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

type RegisterFn = PersonalInformationProps["form"]["register"];

interface InputFieldProps {
  label: string;
  name: keyof PersonalInformationFormData;
  register: RegisterFn;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
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
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        id={name as string}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? "border-red-400" : "border-gray-300"
        }`}
        {...register(name as any)}
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  name: keyof PersonalInformationFormData;
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
        htmlFor={name as string}
        className="text-sm font-medium text-gray-700"
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <select
        id={name as string}
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

export default PersonalInformation;
