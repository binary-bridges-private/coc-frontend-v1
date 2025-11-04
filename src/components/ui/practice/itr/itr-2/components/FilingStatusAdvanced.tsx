import React from "react";
import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { PersonalInfoFormData } from "../itr-two.validation.ts";

interface FilingStatusAdvancedProps {
  register: UseFormRegister<PersonalInfoFormData>;
  watch: UseFormWatch<PersonalInfoFormData>;
  errors: FieldErrors<PersonalInfoFormData>;
}

const FilingStatusAdvanced: React.FC<FilingStatusAdvancedProps> = ({
  register,
  watch,
  errors,
}) => {
  return (
    <>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Or filed in response to notice u/s
        </label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="139(9)"
              className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700"> 139(9)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="142(1)"
              className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700"> 142(1)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="148"
              className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700"> 148</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="153C"
              className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700"> 153C</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Do you wish to exercise the option u/s 115BAC(6) of Opting out of new
          tax regime? (default is "No")
        </label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              {...register("optingOutNewRegime")}
              type="radio"
              value="Yes"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register("optingOutNewRegime")}
              type="radio"
              value="No"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Note- For Opting out, option should be exercised along with the return
          of income filed u/s 139(1)
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label className="mb-3 block text-sm font-medium text-gray-700">
          Are you filing return of income under Seventh proviso to section
          139(1) but otherwise not required to furnish return of income?
        </label>
        <div className="mb-3 flex gap-6">
          <label className="flex items-center">
            <input
              {...register("filingUnderSeventhProviso")}
              type="radio"
              value="Yes"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register("filingUnderSeventhProviso")}
              type="radio"
              value="No"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>

        {watch("filingUnderSeventhProviso") === "Yes" && (
          <div className="space-y-3 rounded-lg border border-gray-300 bg-white p-3">
            <p className="text-xs text-gray-600">
              If yes, please furnish following information (Note: To be filled
              only if a person is not required to furnish a return of income
              under section 139(1) but filing return of income due to fulfilling
              one or more conditions mentioned in the seventh proviso to section
              139(1))
            </p>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                (bi) Have you deposited amount or aggregate of amounts exceeding
                Rs. 1 Crore in one or more current account during the previous
                year?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    {...register("depositedAmountExceeds1Crore")}
                    type="radio"
                    value="Yes"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("depositedAmountExceeds1Crore")}
                    type="radio"
                    value="No"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
              {errors.depositedAmountExceeds1Crore && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.depositedAmountExceeds1Crore.message}
                </p>
              )}
              {watch("depositedAmountExceeds1Crore") === "Yes" && (
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Amount (Rs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("depositedAmount", { valueAsNumber: true })}
                    type="number"
                    min="10000000"
                    step="1"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Min: 10000000 (1 Crore)"
                  />
                  {errors.depositedAmount && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.depositedAmount.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                (bii) Have you incurred expenditure of an amount or aggregate of
                amount exceeding Rs. 2 lakhs for travel to a foreign country for
                yourself or for any other person?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    {...register("incurredExpenditureExceeds2Lakhs")}
                    type="radio"
                    value="Yes"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("incurredExpenditureExceeds2Lakhs")}
                    type="radio"
                    value="No"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
              {errors.incurredExpenditureExceeds2Lakhs && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.incurredExpenditureExceeds2Lakhs.message}
                </p>
              )}
              {watch("incurredExpenditureExceeds2Lakhs") === "Yes" && (
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Amount (Rs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("incurredExpenditureAmount", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    min="200000"
                    step="1"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Min: 200000 (2 Lakhs)"
                  />
                  {errors.incurredExpenditureAmount && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.incurredExpenditureAmount.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                (biii) Have you incurred expenditure of amount or aggregate of
                amount exceeding Rs. 1 lakh on consumption of electricity during
                the previous year?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    {...register("electricityExpenditureExceeds1Lakh")}
                    type="radio"
                    value="Yes"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("electricityExpenditureExceeds1Lakh")}
                    type="radio"
                    value="No"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
              {errors.electricityExpenditureExceeds1Lakh && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.electricityExpenditureExceeds1Lakh.message}
                </p>
              )}
              {watch("electricityExpenditureExceeds1Lakh") === "Yes" && (
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Amount (Rs) <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("electricityExpenditureAmount", {
                      valueAsNumber: true,
                    })}
                    type="number"
                    min="100000"
                    step="1"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Min: 100000 (1 Lakh)"
                  />
                  {errors.electricityExpenditureAmount && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.electricityExpenditureAmount.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-700">
                (biv) Are you required to file a return as per other conditions
                prescribed under clause (iv) of seventh proviso to section
                139(1)?
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    {...register("otherConditionsApplicable")}
                    type="radio"
                    value="Yes"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    {...register("otherConditionsApplicable")}
                    type="radio"
                    value="No"
                    className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
              {errors.otherConditionsApplicable && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.otherConditionsApplicable.message}
                </p>
              )}
              {watch("otherConditionsApplicable") === "Yes" && (
                <div>
                  <label className="mb-1 block text-xs text-gray-600">
                    Please select the relevant condition from the drop down menu <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("relevantCondition")}
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Specify condition"
                  />
                  {errors.relevantCondition && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.relevantCondition.message}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="flex items-center">
          <input
            {...register("isRevisedDefectiveModified")}
            type="checkbox"
            className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            If Revised/Defective/Modified, then enter Receipt No. and Date of
            filing original return
          </span>
        </label>
        {watch("isRevisedDefectiveModified") && (
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Receipt Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register("originalReceiptNumber")}
                type="text"
                maxLength={50}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., ABC123456789"
              />
              {errors.originalReceiptNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.originalReceiptNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Date of Filing (DD/MM/YYYY) <span className="text-red-500">*</span>
              </label>
              <input
                {...register("originalFilingDate")}
                type="text"
                maxLength={10}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="DD/MM/YYYY"
              />
              {errors.originalFilingDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.originalFilingDate.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          If filed, in response to a notice u/s 139(9)/142(1)/148/153C or order
          u/s 119(2)(b) enter Unique Number/ Document Identification Number
          (DIN) and date of such Notice/Order, or if filed u/s 92CD, enter date
          of Advance Pricing Agreement
        </label>
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-gray-700">
              Unique Number/DIN <span className="text-red-500">*</span>
            </label>
            <input
              {...register("uniqueDocumentNumber")}
              type="text"
              maxLength={50}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter unique number/DIN"
            />
            {errors.uniqueDocumentNumber && (
              <p className="mt-1 text-xs text-red-500">
                {errors.uniqueDocumentNumber.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-700">
              Date (DD/MM/YYYY) <span className="text-red-500">*</span>
            </label>
            <input
              {...register("noticeDate")}
              type="text"
              maxLength={10}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="DD/MM/YYYY"
            />
            {errors.noticeDate && (
              <p className="mt-1 text-xs text-red-500">
                {errors.noticeDate.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label className="mb-3 block text-sm font-medium text-gray-700">
          Residential Status in India (for individuals)
        </label>

        {watch("residentialStatus") === "Resident" && (
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                You were in India for 182 days or more during the previous year
                [section 6(1)(a)]
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                You were in India for 60 days or more during the previous year,
                and have been in India for 365 days or more within the 4
                preceding years
              </span>
            </label>
            <div>
              <label className="mb-1.5 block text-sm text-gray-700">
                Total period of stay in India during the previous year (in days)
              </label>
              <input
                {...register("daysInIndiaPreviousYear", {
                  valueAsNumber: true,
                })}
                type="number"
                min="0"
                max="366"
                step="1"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0-366 days"
              />
              {errors.daysInIndiaPreviousYear && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.daysInIndiaPreviousYear.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-700">
                Total period of stay in India during the 4 preceding years (in
                days)
              </label>
              <input
                {...register("daysInIndiaPreceding4Years", {
                  valueAsNumber: true,
                })}
                type="number"
                min="0"
                max="1464"
                step="1"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0-1464 days"
              />
              {errors.daysInIndiaPreceding4Years && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.daysInIndiaPreceding4Years.message}
                </p>
              )}
            </div>
          </div>
        )}

        {watch("residentialStatus") ===
          "Resident but not Ordinarily Resident" && (
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                You have been in India for 729 days or less during the 7
                preceding years [section 6(6)(a)]
              </span>
            </label>
          </div>
        )}

        {watch("residentialStatus") === "Non-resident" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              You were a non-resident during the previous year.
            </p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Please specify the jurisdiction(s) of residence during the
                previous year
              </label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Jurisdiction(s) of residence <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("jurisdictionOfResidence")}
                      type="text"
                      maxLength={200}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="e.g., United States, United Kingdom"
                    />
                    {errors.jurisdictionOfResidence && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.jurisdictionOfResidence.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-gray-600">
                      Taxpayer Identification Number(s) <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("taxpayerIdentificationNumber")}
                      type="text"
                      maxLength={50}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter TIN"
                    />
                    {errors.taxpayerIdentificationNumber && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.taxpayerIdentificationNumber.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Do you want to claim benefit under section 115H?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              {...register("section115HBenefit")}
              type="radio"
              value="Yes"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register("section115HBenefit")}
              type="radio"
              value="No"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Are you governed by Portuguese Civil Code as per section 5A?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              {...register("portugueseCivilCode")}
              type="radio"
              value="Yes"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register("portugueseCivilCode")}
              type="radio"
              value="No"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {watch("portugueseCivilCode") === "Yes" && (
          <div className="mt-2">
            <label className="mb-1 block text-xs text-gray-600">
              SEBI Registration Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("sebiRegNo")}
              type="text"
              maxLength={50}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="e.g., INF/12345/2020"
            />
            {errors.sebiRegNo && (
              <p className="mt-1 text-xs text-red-500">
                {errors.sebiRegNo.message}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Whether you are an FPI?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                {...register("fpiYesNo")}
                type="radio"
                value="Yes"
                className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                {...register("fpiYesNo")}
                type="radio"
                value="No"
                className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {watch("fpiYesNo") === "Yes" && (
          <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                LEI Number (20 characters) <span className="text-red-500">*</span>
              </label>
              <input
                {...register("leiNumber")}
                type="text"
                minLength={20}
                maxLength={20}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="20 alphanumeric characters"
              />
              {errors.leiNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.leiNumber.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Valid up to date <span className="text-red-500">*</span>
              </label>
              <input
                {...register("leiValidDate")}
                type="text"
                maxLength={10}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="DD/MM/YYYY"
              />
              {errors.leiValidDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.leiValidDate.message}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Whether this return is being filed by a Representative Assessee?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center">
              <input
                {...register("representativeAssessee")}
                type="radio"
                value="Yes"
                className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                {...register("representativeAssessee")}
                type="radio"
                value="No"
                className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {watch("representativeAssessee") === "Yes" && (
          <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-600">
              If yes, please furnish following information
            </p>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Name of the Representative <span className="text-red-500">*</span>
              </label>
              <input
                {...register("representativeName")}
                type="text"
                maxLength={200}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter full name"
              />
              {errors.representativeName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.representativeName.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Capacity of the Representative <span className="text-red-500">*</span>
              </label>
              <input
                {...register("representativeCapacity")}
                type="text"
                maxLength={200}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Guardian, Trustee, Administrator"
              />
              {errors.representativeCapacity && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.representativeCapacity.message}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Address of the Representative <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("representativeAddress")}
                rows={2}
                maxLength={500}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter complete address"
              />
              {errors.representativeAddress && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.representativeAddress.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  PAN of Representative
                </label>
                <input
                  {...register("representativePan")}
                  type="text"
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm uppercase text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="ABCDE1234F"
                />
                {errors.representativePan && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.representativePan.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Aadhaar No. of Representative
                </label>
                <input
                  {...register("representativeAadhaar")}
                  type="text"
                  maxLength={12}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="123456789012"
                />
                {errors.representativeAadhaar && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.representativeAadhaar.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Whether you were Director in a company at any time during the previous
          year?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              {...register("wasDirector")}
              type="radio"
              value="Yes"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register("wasDirector")}
              type="radio"
              value="No"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {watch("wasDirector") === "Yes" && (
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 text-xs text-gray-600">
              If yes, please furnish following information
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-2 text-left">
                      Name of Company
                    </th>
                    <th className="border border-gray-300 px-2 py-2 text-left">
                      Type of Company
                    </th>
                    <th className="border border-gray-300 px-2 py-2 text-left">
                      PAN
                    </th>
                    <th className="border border-gray-300 px-2 py-2 text-left">
                      Listed/Unlisted
                    </th>
                    <th className="border border-gray-300 px-2 py-2 text-left">
                      DIN
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
                        placeholder="Company name"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
                        placeholder="Type"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        maxLength={10}
                        className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm uppercase text-gray-900"
                        placeholder="PAN"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <select className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm text-gray-900">
                        <option value="">Select</option>
                        <option value="Listed">Listed</option>
                        <option value="Unlisted">Unlisted</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm text-gray-900"
                        placeholder="DIN"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Another Company
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Whether you have held unlisted equity shares at any time during the
          previous year?
        </label>
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              {...register("heldUnlistedEquity")}
              type="radio"
              value="Yes"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              {...register("heldUnlistedEquity")}
              type="radio"
              value="No"
              className="mr-2 h-4 w-4 border-gray-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {watch("heldUnlistedEquity") === "Yes" && (
          <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 text-xs text-gray-600">
              If yes, please furnish following information in respect of equity
              shares
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 bg-white text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-2">
                      Name of Company
                    </th>
                    <th className="border border-gray-300 px-2 py-2">Type</th>
                    <th className="border border-gray-300 px-2 py-2">PAN</th>
                    <th className="border border-gray-300 px-2 py-2">
                      Opening Balance
                    </th>
                    <th
                      className="border border-gray-300 px-2 py-2"
                      colSpan={4}
                    >
                      Shares acquired during the year
                    </th>
                    <th
                      className="border border-gray-300 px-2 py-2"
                      colSpan={3}
                    >
                      Shares transferred during the year
                    </th>
                    <th className="border border-gray-300 px-2 py-2">
                      Closing Balance
                    </th>
                    <th className="border border-gray-300 px-2 py-2">
                      Cost of Acquisition
                    </th>
                  </tr>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 py-1"></th>
                    <th className="border border-gray-300 px-2 py-1"></th>
                    <th className="border border-gray-300 px-2 py-1"></th>
                    <th className="border border-gray-300 px-2 py-1"></th>
                    <th className="border border-gray-300 px-2 py-1">
                      No. of shares
                    </th>
                    <th className="border border-gray-300 px-2 py-1">Date</th>
                    <th className="border border-gray-300 px-2 py-1">
                      Face value
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Purchase price
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      No. of shares
                    </th>
                    <th className="border border-gray-300 px-2 py-1">
                      Sale consideration
                    </th>
                    <th className="border border-gray-300 px-2 py-1">Cost</th>
                    <th className="border border-gray-300 px-2 py-1"></th>
                    <th className="border border-gray-300 px-2 py-1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        className="w-full rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="Company"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="Type"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        maxLength={10}
                        className="w-28 rounded border-gray-300 bg-white px-2 py-1 text-xs uppercase"
                        placeholder="PAN"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-20 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="DD/MM/YY"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-20 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-20 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        className="w-24 rounded border-gray-300 bg-white px-2 py-1 text-xs"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              + Add Another Entry
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default FilingStatusAdvanced;
