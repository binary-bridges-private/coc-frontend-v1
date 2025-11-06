import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface ItrTwoOsProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const ItrTwoOs: React.FC<ItrTwoOsProps> = ({
  onSubmit,
  onBack,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: initialData || {
      // Section 1a - Dividends
      dividendsGross: 0,
      dividendsU2_22_2_e_i: 0,
      dividendsU2_22_2_e_iii: 0,
      dividendsU2_22_2_f_aii: 0,
      dividendsU2_22_2_f_aiii: 0,

      // Section 1b - Interest
      interestSavingsBank: 0,
      interestDeposits: 0,
      interestIncometaxRefund: 0,
      interestPassThrough: 0,
      interestProvidentFund10_1_i: 0,
      interestProvidentFund10_1_ii: 0,
      interestProvidentFund10_12_i: 0,
      interestProvidentFund10_12_ii: 0,
      interestOthers: 0,

      // Section 1c - Rental Income
      rentalIncomeGross: 0,
      rentalPropertyDetails: {
        aggregateValue: 0,
        immovablePropertyReceived: 0,
        immovablePropertyReceivedIncome: 0,
        otherPropertyReceived: 0,
        otherPropertyReceivedFMV: 0,
      },

      // Section 1e - Any other income
      anyOtherIncome: 0,

      // Section 1 - Family Pension
      familyPensionIncome: [],

      // Section 2 - Special rates income
      section2a: {
        winningsLotteries: 0,
        winningsOnlineGames: 0,
      },
      section2bIncome: {
        cashCredits: 0,
        unexplainedInvestments: 0,
        unexplainedMoney: 0,
        undisclosedInvestments: 0,
        unexplainedExpenditure: 0,
        amountBorrowedRepaid: 0,
      },
      section2c: 0,

      // Section 2d - Other income chargeable at special rate
      section2dDividends: 0,
      section2dDividendsNonResident: 0,
      section2dInterestForeign: 0,
      section2dInterestInfraDebt: 0,
      section2dInterest194LC: 0,
      section2dInterest194LD: 0,
      section2dDistributedIncome: 0,
      section2dUnitsUTI: 0,
      section2dRoyalty: 0,
      section2dBondsInterest: 0,
      section2dGDRsDividend: 0,
      section2dGDRsDividendForeign: 0,
      section2dFIIDividend: 0,
      section2dFIIInterest: 0,
      section2dSportsperson: 0,
      section2dDonations: 0,
      section2dPatentRoyalty: 0,
      section2dCarbonCredits: 0,
      section2dNonResidentInvestment: 0,
      section2dSecurities: 0,

      // Section 2e - Pass through income
      passThrough: [],

      // Section 2f - DTAA relief
      dtaaRelief: [],

      // Section 3 - Deductions u/s 57
      deductionsExpenses: 0,
      deductionsInterest: 0,
      deductionsEligibleInterest: 0,
      deductionsSection571: 0,
      deductionsDepreciation: 0,
      deductionsTotal: 0,

      // Section 4-7
      amountsNotDeductible: 0,
      profitsChargeable: 0,
      incomeReliefU89A: 0,
      netIncomeFromOtherSources: 0,

      // Section 8 - Race horses
      raceHorses: {
        receipts: 0,
        deductions: 0,
        amountsNotDeductible: 0,
        profits: 0,
        balance: 0,
      },

      // Section 9
      incomeUnderHead: 0,

      // Section 10 - Information about accrual/receipt
      accrualReceipt: [],
    },
  });

  const [showSection1Details, setShowSection1Details] = useState(false);
  const [showSection2Details, setShowSection2Details] = useState(false);
  const [familyPensionRows, setFamilyPensionRows] = useState([]);
  const [passThroughRows, setPassThroughRows] = useState([]);
  const [dtaaReliefRows, setDtaaReliefRows] = useState([]);

  // Calculate Section 1b total interest
  const calculateSection1bTotal = () => {
    const values = watch([
      'interestSavingsBank',
      'interestDeposits',
      'interestIncometaxRefund',
      'interestPassThrough',
      'interestProvidentFund10_1_i',
      'interestProvidentFund10_1_ii',
      'interestProvidentFund10_12_i',
      'interestProvidentFund10_12_ii',
      'interestOthers',
    ]);
    return values.reduce((sum, val) => sum + (Number(val) || 0), 0);
  };

  // Calculate Section 1 total
  const calculateSection1Total = () => {
    const dividends = Number(watch('dividendsGross')) || 0;
    const interest = calculateSection1bTotal();
    const rental = Number(watch('rentalIncomeGross')) || 0;
    const other = Number(watch('anyOtherIncome')) || 0;
    return dividends + interest + rental + other;
  };

  // Calculate Section 2b total
  const calculateSection2bTotal = () => {
    const values = watch([
      'section2bIncome.cashCredits',
      'section2bIncome.unexplainedInvestments',
      'section2bIncome.unexplainedMoney',
      'section2bIncome.undisclosedInvestments',
      'section2bIncome.unexplainedExpenditure',
      'section2bIncome.amountBorrowedRepaid',
    ]);
    return values.reduce((sum, val) => sum + (Number(val) || 0), 0);
  };

  // Calculate Section 3 total deductions
  const calculateSection3Total = () => {
    const values = watch([
      'deductionsExpenses',
      'deductionsInterest',
      'deductionsEligibleInterest',
      'deductionsSection571',
      'deductionsDepreciation',
    ]);
    const total = values.reduce((sum, val) => sum + (Number(val) || 0), 0);
    setValue('deductionsTotal', total);
    return total;
  };

  // Calculate net income from other sources
  const calculateNetIncome = () => {
    const section1 = calculateSection1Total();
    const deductions = calculateSection3Total();
    const net = section1 - deductions;
    setValue('netIncomeFromOtherSources', net);
    return net;
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule OS - Income from Other Sources
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Dividends, Interest, Rental Income, and other miscellaneous income
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Section 1 - Gross income chargeable to tax at normal rates */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                1. Gross income chargeable to tax at normal applicable rates (1a+ 1b+ 1c+ 1d + 1e)
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Section 1a - Dividends */}
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">a. Dividends, Gross (ai+aii+aiii)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      i. Dividend income other than (ii) and (iii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('dividendsGross')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ii. Dividend income u/s 2(22)(e) (aiii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('dividendsU2_22_2_e_iii')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      iii. Dividend income u/s 2(22)(f)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('dividendsU2_22_2_f_aiii')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Section 1b - Interest */}
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    b. Interest, Gross (bi + bii + biii + biv+ bv + bvi + bvii + bviii + bix)
                  </h3>
                  <button
                    type="button"
                    onClick={calculateSection1bTotal}
                    className="rounded border border-gray-900 bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-gray-800"
                  >
                    Calculate Total
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      i. From Savings Bank (bi)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestSavingsBank')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ii. From Deposits (Bank/ Post Office/ Co-operative Society) (bii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestDeposits')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      iii. From Income-tax Refund (biii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestIncometaxRefund')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      iv. In the nature of Pass through income/loss (biv)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestPassThrough')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      v. Interest accrued on contributions to provident fund - first proviso to section 10(11) (bv)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestProvidentFund10_1_i')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      vi. Interest accrued on contributions to provident fund - second proviso to section 10(11) (bvi)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestProvidentFund10_1_ii')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      vii. Interest accrued on contributions to provident fund - first proviso to section 10(12) (bvii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestProvidentFund10_12_i')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      viii. Interest accrued on contributions to provident fund - second proviso to section 10(12) (bviii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestProvidentFund10_12_ii')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ix. Others (bix)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('interestOthers')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Section 1c - Rental income from machinery, plants, buildings */}
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  c. Rental income from machinery, plants, buildings, etc., Gross
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rental Income Gross (1c)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('rentalIncomeGross')}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Section 1e - Any other income */}
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  e. Any other income (please specify nature)
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Any other income (1e)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('anyOtherIncome')}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Calculate Section 1 Total */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={calculateSection1Total}
                  className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Calculate Section 1 Total
                </button>
              </div>
            </div>
          </div>

          {/* Section 2 - Income chargeable at special rates */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                2. Income chargeable at special rates (2ai+2aii+ 2b+ 2c+ 2d + 2e)
              </h2>
            </div>

            <div className="p-6 space-y-6">
              {/* Section 2a - Winnings */}
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  a. Winnings from lotteries, crossword puzzles, races, card games etc. chargeable u/s 115BB (2ai)
                </h3>
                <input
                  type="number"
                  step="0.01"
                  {...register('section2a.winningsLotteries')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  aii. Income by way of winnings from online games chargeable u/s 115BBJ (2aii)
                </h3>
                <input
                  type="number"
                  step="0.01"
                  {...register('section2a.winningsOnlineGames')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              {/* Section 2b - Income chargeable u/s 115BBE */}
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    b. Income chargeable u/s 115BBE (bi + bii + biii + biv+ bv + bvi) (2b)
                  </h3>
                  <button
                    type="button"
                    onClick={calculateSection2bTotal}
                    className="rounded border border-gray-900 bg-gray-900 px-3 py-1 text-xs font-medium text-white hover:bg-gray-800"
                  >
                    Calculate Total
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      i. Cash credits u/s 68 (bi)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('section2bIncome.cashCredits')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ii. Unexplained investments u/s 69 (bii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('section2bIncome.unexplainedInvestments')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      iii. Unexplained money etc. u/s 69A (biii)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('section2bIncome.unexplainedMoney')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      iv. Undisclosed investments etc. u/s 69B (biv)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('section2bIncome.undisclosedInvestments')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      v. Unexplained expenditure etc. u/s 69C (bv)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('section2bIncome.unexplainedExpenditure')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      vi. Amount borrowed or repaid on hundi u/s 69D (bvi)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register('section2bIncome.amountBorrowedRepaid')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 - Deductions under section 57 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                3. Deductions under section 57 (other than those relating to income chargeable at special rates under 2a, 2b & 2d)
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  a. Expenses / Deductions other than "aii" (in case other than family pension) (3ai)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('deductionsExpenses')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  aii. Interest expenditure on dividend u/s 57(i) (payable only if income offered in 1ai(i) and / or 1ai(ii)) (3aii)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('deductionsInterest')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  aiii. Eligible Interest expenditure u/s 57(i) – Computed Amount (3aiii)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('deductionsEligibleInterest')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  aiv. Deduction u/s. 57(iia) (in case of family pension only) (3aiv)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('deductionsSection571')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  b. Depreciation (available only if income offered in 1c of Schedule OS) (3b)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('deductionsDepreciation')}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  c. Total (3c)
                </label>
                <input
                  type="number"
                  readOnly
                  {...register('deductionsTotal')}
                  className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                  placeholder="0.00"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={calculateSection3Total}
                  className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Calculate Deductions Total
                </button>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              <button
                type="button"
                onClick={calculateNetIncome}
                className="rounded-lg border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Calculate Net Income
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm font-medium text-gray-700">
                  4. Amounts not deductible u/s 58
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register('amountsNotDeductible')}
                  className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm font-medium text-gray-700">
                  5. Profits chargeable to tax u/s 59
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register('profitsChargeable')}
                  className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                <span className="text-sm font-medium text-gray-700">
                  6. Income claimed for relief from taxation u/s 89A
                </span>
                <input
                  type="number"
                  step="0.01"
                  {...register('incomeReliefU89A')}
                  className="w-40 rounded border border-gray-300 px-3 py-2 text-sm text-right"
                  placeholder="0.00"
                />
              </div>
              <div className="flex items-center justify-between border-t-2 border-gray-300 bg-gray-50 p-4 rounded-lg">
                <span className="text-base font-bold text-gray-900">
                  Net Income from other sources chargeable at normal applicable rates (1a[after reducing income related to DTAA portion] – 3 + 4 + 5 -6a) (If negative take the figure to 6a of schedule CYLA)
                </span>
                <input
                  type="number"
                  readOnly
                  {...register('netIncomeFromOtherSources')}
                  className="w-48 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-lg font-bold text-gray-900 text-right"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrTwoOs;
