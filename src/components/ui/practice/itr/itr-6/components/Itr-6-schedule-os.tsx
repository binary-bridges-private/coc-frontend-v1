import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleOSProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

const ScheduleOS: React.FC<ScheduleOSProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const {
    register: registerBase,
    handleSubmit,
    formState: { errors: errorsBase, isSubmitting },
    watch,
  } = form;

  const register = registerBase as any;
  const errors = errorsBase as any;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Schedule OS
          </p>
          <h2 className="text-xl font-semibold text-gray-900">
            Income from Other Sources
          </h2>
          <p className="text-sm text-gray-600">
            Dividends, Interest, Rental Income, and Other Income Sources
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {(() => {
          const relevantErrors = Object.entries(errors).filter(([]) => true);
          if (relevantErrors.length === 0) return null;

          return (
            <div className="rounded-lg border-2 border-red-300 bg-red-50 p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-bold text-red-900">
                    ⚠️ Please fix the following errors ({relevantErrors.length}{" "}
                    field{relevantErrors.length > 1 ? "s" : ""})
                  </h3>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Part 1: Gross Income chargeable to tax at normal applicable rates */}
        <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-5">
          <h3 className="text-lg font-bold text-blue-900">
            Part 1: Gross Income chargeable to tax at normal applicable rates (1a+1b+1c+1d+1e)
          </h3>

          {/* a) Dividends */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">a) Dividends, Gross (ai + aii + aiii)</div>
            
            <div className="space-y-3 pl-4">
              <InputField
                label="i. Dividend income other than (ii) and (iii)(ai)"
                name="dividendOtherIncome"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="ii. Dividend income u/s 2(22)(o)(aii)"
                name="dividendUs2_22_o"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iii. Dividend income u/s 2(22)(f)(aiii)"
                name="dividendUs2_22_f"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>

          {/* b) Interest */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">b) Interest, Gross (bi + bii + biii + biv+bv)</div>
            
            <div className="space-y-3 pl-4">
              <InputField
                label="i. From Savings Bank (bi)"
                name="interestSavingsBank"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="ii. From Deposits (Bank/Post Office/Co-operative Society)(bii)"
                name="interestDeposits"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iii. From Income-tax Refund (biii)"
                name="interestITRefund"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iv. In the nature of Pass through income/loss (biv)"
                name="interestPassThrough"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="v. Others (bv)"
                name="interestOthers"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>

          {/* c) Rental Income */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">c) Rental income from machinery, plants, buildings, etc., Gross</div>
            <InputField
              label="Gross rental income"
              name="rentalIncomeGross"
              type="number"
              placeholder="0"
              register={register}
            />
          </div>

          {/* d) Other income */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">d) Any other income (please specify nature)</div>
            
            <div className="space-y-3 pl-4">
              <InputField
                label="Nature of other income"
                name="otherIncomeNature"
                type="text"
                placeholder="Specify the nature of income"
                register={register}
              />
              <InputField
                label="Amount"
                name="otherIncomeAmount"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>

            {/* Specific other sources */}
            <div className="space-y-3 border-t border-gray-200 pt-3">
              <div className="text-sm font-medium text-gray-700">Any specified sum received by a unit holder from a business trust during the previous year as referred to in section 56(2)(xi)</div>
              <InputField
                label="Amount from business trust"
                name="businessTrustAmount"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>
        </div>

        {/* Part 2: Income chargeable at special rates */}
        <div className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-5">
          <h3 className="text-lg font-bold text-green-900">
            Part 2: Income chargeable at special rates (2ai + 2aii + 2b+ 2c+ 2d + 2e related to sl. no. 1)
          </h3>

          {/* a) Winnings from games */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">a) Winnings from games chargeable u/s 115BB</div>
            
            <div className="space-y-3 pl-4">
              <InputField
                label="i. Winnings from lotteries, crossword, puzzles, races, card games etc. (2ai)"
                name="winningsLotteries"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="ii. Income by way of winnings from online games (2aii)"
                name="winningsOnlineGames"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>

          {/* b) Income chargeable u/s 115BBE */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">b) Income chargeable u/s 115BBE (bi + bii + biii + biv + bv)</div>
            
            <div className="space-y-3 pl-4">
              <InputField
                label="i. Cash credits u/s 68 (bi)"
                name="cashCreditsUs68"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="ii. Unexplained investment u/s 69 (bii)"
                name="unexplainedInvestmentUs69"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iii. Unexplained money etc. u/s 69A (biii)"
                name="unexplainedMoneyUs69A"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iv. Undisclosed investments etc. u/s 69B (biv)"
                name="undisclosedInvestmentsUs69B"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="v. Unexplained expenditure etc. u/s 69C (bv)"
                name="unexplainedExpenditureUs69C"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>

          {/* c) Amount borrowed or repaid */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <InputField
              label="c) Amount borrowed or repaid on hundi u/s 69D (2c)"
              name="hundiAmountUs69D"
              type="number"
              placeholder="0"
              register={register}
            />
          </div>

          {/* d) Non-Resident income */}
          <div className="space-y-3 rounded-md border border-gray-300 bg-white p-4">
            <div className="font-semibold text-gray-900">d) Non-Resident Income u/s 115A/115AD</div>
            
            <div className="space-y-3 pl-4">
              <InputField
                label="i. Dividends received by non-resident (ci)"
                name="nonResidentDividends"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="ii. Dividend from International Financial Services Centre (cia)"
                name="nonResidentDividendIFSC"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iii. Interest from Government or Indian concern on foreign currency (cii)"
                name="nonResidentInterestForeign"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="iv. Interest from Infrastructure Debt Fund (ciii)"
                name="nonResidentInterestIDF"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="v. Interest referred in section 194LC(1) (civ)"
                name="nonResidentInterestUs194LC"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="vi. Interest referred to in Proviso to section 194LC(i) (cv)"
                name="nonResidentInterestProviso194LC"
                type="number"
                placeholder="0"
                register={register}
              />
              <InputField
                label="vii. Interest referred to in section 194LD (cvi)"
                name="nonResidentInterestUs194LD"
                type="number"
                placeholder="0"
                register={register}
              />
            </div>
          </div>
        </div>

        {/* Part 3: Deductions */}
        <div className="space-y-4 rounded-lg border border-purple-200 bg-purple-50 p-5">
          <h3 className="text-lg font-bold text-purple-900">
            Part 3: Deductions under section 57 (other than those relating to income chargeable at special rates)
          </h3>

          <div className="space-y-3">
            <InputField
              label="A. Expenses/Deduction other than 'C' (3a)"
              name="deductionsExpenditureOther"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="B. Depreciation (available only if income offered in 1c)"
              name="deductionsDepreciation"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="C. Interest expenditure on dividend u/s 57(i) (available only if income offered in 1a(i) and/or 1a(iii))(3c)"
              name="deductionsInterestDividend"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="C1. Eligible Interest expenditure u/s 57(i) - computed value (3c1)"
              name="deductionsEligibleInterest"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="D. Total (3d)"
              name="deductionsTotal"
              type="number"
              placeholder="0"
              register={register}
            />
          </div>
        </div>

        {/* Part 4: Final Calculations */}
        <div className="space-y-4 rounded-lg border border-yellow-200 bg-yellow-50 p-5">
          <h3 className="text-lg font-bold text-yellow-900">Final Calculations</h3>

          <div className="space-y-3">
            <div className="rounded-md bg-white p-3 border border-gray-300">
              <div className="flex justify-between font-semibold">
                <span>Gross Income chargeable to tax at normal rates (1)</span>
                <span>0.00</span>
              </div>
            </div>
            
            <div className="rounded-md bg-white p-3 border border-gray-300">
              <div className="flex justify-between font-semibold">
                <span>Income chargeable at special rates (2)</span>
                <span>0.00</span>
              </div>
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-300">
              <div className="flex justify-between font-semibold">
                <span>Amounts not deductible u/s 58 (4)</span>
                <span>0.00</span>
              </div>
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-300">
              <div className="flex justify-between font-semibold">
                <span>Profits chargeable to tax u/s 59 (5)</span>
                <span>0.00</span>
              </div>
            </div>

            <div className="rounded-md bg-blue-100 p-3 border-2 border-blue-300">
              <div className="flex justify-between font-bold text-blue-900">
                <span>Net Income from other sources 3+4+5 (If negative take the figure to 4i of schedule C1/A)</span>
                <span>0.00</span>
              </div>
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-300">
              <div className="flex justify-between font-semibold">
                <span>Income from other sources (other than from owning and maintaining race horses) (2 + 6) (enter as nil, if negative)</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 5: Income from race horses */}
        <div className="space-y-4 rounded-lg border border-indigo-200 bg-indigo-50 p-5">
          <h3 className="text-lg font-bold text-indigo-900">
            Part 5: Income from the activity of owning race horses
          </h3>

          <div className="space-y-3">
            <InputField
              label="a. Receipts (8a)"
              name="raceHorsesReceipts"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="b. Deductions under section 57 in relation to receipts at 8a only (8b)"
              name="raceHorsesDeductions"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="c. Amounts not deductible u/s 58 (8c)"
              name="raceHorsesNotDeductible"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="d. Profits chargeable to tax u/s 59 (8d)"
              name="raceHorsesProfitsChargeable"
              type="number"
              placeholder="0"
              register={register}
            />
            <InputField
              label="e. Balance (8a - 8b - 8c - 8d) (if negative take the figure to 10 x of Schedule CF1) (8e)"
              name="raceHorsesBalance"
              type="number"
              placeholder="0"
              register={register}
            />
          </div>
        </div>

        {/* Part 6: Information about accrual/receipt of income */}
        <div className="space-y-4 rounded-lg border border-orange-200 bg-orange-50 p-5">
          <h3 className="text-lg font-bold text-orange-900">
            Part 6: Information about accrual/receipt of income from Other Sources
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-sm font-semibold">Sl.No.</th>
                  <th className="border border-gray-300 p-2 text-sm font-semibold">Other Source Income</th>
                  <th className="border border-gray-300 p-2 text-sm font-semibold">Upto 15/6 (i)</th>
                  <th className="border border-gray-300 p-2 text-sm font-semibold">From 16/6 to 15/9 (ii)</th>
                  <th className="border border-gray-300 p-2 text-sm font-semibold">From 16/9 to 15/12 (iii)</th>
                  <th className="border border-gray-300 p-2 text-sm font-semibold">From 16/12 to 31/3 (iv)</th>
                  <th className="border border-gray-300 p-2 text-sm font-semibold">From 1/4/3 to 31/3 (v)</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((rowNum) => (
                  <tr key={rowNum}>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder={rowNum.toString()} {...register(`accrual${rowNum}SlNo` as any)} /></td>
                    <td className="border border-gray-300 p-2"><input type="text" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="Enter nature" {...register(`accrual${rowNum}Nature` as any)} /></td>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="0" {...register(`accrual${rowNum}Upto15Jun` as any)} /></td>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="0" {...register(`accrual${rowNum}16JunTo15Sep` as any)} /></td>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="0" {...register(`accrual${rowNum}16SepTo15Dec` as any)} /></td>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="0" {...register(`accrual${rowNum}16DecTo31Mar` as any)} /></td>
                    <td className="border border-gray-300 p-2"><input type="number" className="w-full border border-gray-300 px-2 py-1 text-sm" placeholder="0" {...register(`accrual${rowNum}Full31Mar` as any)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Buttons */}
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

interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
  maxLength?: number;
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
  helperText,
}) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        maxLength={maxLength}
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

export default ScheduleOS;
