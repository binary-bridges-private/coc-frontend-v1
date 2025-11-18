import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface BalanceSheetProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const BalanceSheet: React.FC<BalanceSheetProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Watch all balance sheet values for calculations
  const shareCapitalAuthorised = watch("bs_share_capital_authorised") || 0;
  const shareCapitalIssued = watch("bs_share_capital_issued") || 0;
  const shareCapitalSubscribed = watch("bs_share_capital_subscribed") || 0;
  const capitalReserve = watch("bs_capital_reserve") || 0;
  const capitalRedemptionReserve = watch("bs_capital_redemption_reserve") || 0;
  const securitiesPremiumReserve = watch("bs_securities_premium_reserve") || 0;
  const debenturRedemptionReserve = watch("bs_debenture_redemption_reserve") || 0;
  const revaluationReserve = watch("bs_revaluation_reserve") || 0;
  const shareOptionsOutstanding = watch("bs_share_options_outstanding") || 0;
  const otherReserveA = watch("bs_other_reserve_a") || 0;
  const otherReserveB = watch("bs_other_reserve_b") || 0;
  const surplusBalance = watch("bs_surplus_balance") || 0;

  // Auto-calculated totals
  const totalShareCapital = Number(shareCapitalAuthorised) + Number(shareCapitalIssued) + Number(shareCapitalSubscribed);
  const totalReservesA = Number(capitalReserve) + Number(capitalRedemptionReserve) + Number(securitiesPremiumReserve) + Number(debenturRedemptionReserve) + Number(revaluationReserve) + Number(shareOptionsOutstanding);
  const totalReservesB = Number(otherReserveA) + Number(otherReserveB);
  const totalReserves = totalReservesA + totalReservesB;
  const totalEquityLiabilities = totalShareCapital + totalReserves + Number(surplusBalance);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ITR-7: Balance Sheet
          </h1>
          <p className="text-slate-600 text-lg">
            Part A-BS: Balance Sheet as on 31st March, 2025 or as on the date of amalgamation
          </p>
        </div>

        {/* SECTION I: EQUITY AND LIABILITIES */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            I. EQUITY AND LIABILITIES
          </h2>

          {/* 1. Shareholder's Fund */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("shareholderFund")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-semibold text-blue-900"
            >
              <span>1. Shareholder's Fund</span>
              <span className="text-xl">{expandedSections.includes("shareholderFund") ? "−" : "+"}</span>
            </button>

            {expandedSections.includes("shareholderFund") && (
              <div className="p-6 space-y-4">
                {/* A. Share Capital */}
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-700 mb-4">A. Share Capital</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        i. Authorised (Ai)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_share_capital_authorised")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ii. Issued, Subscribed and fully Paid up (Aii)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_share_capital_issued")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        iii. Subscribed but not fully paid (Aiii)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_share_capital_subscribed")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        iv. Total (Ai + Aii + Aiii) 🔄
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={totalShareCapital.toFixed(2)}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 font-semibold text-blue-700"
                      />
                    </div>
                  </div>
                </div>

                {/* B. Reserves and Surplus */}
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-700 mb-4">B. Reserves and Surplus</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        i. Capital Reserve (Bi)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_capital_reserve")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ii. Capital Redemption Reserve (Bii)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_capital_redemption_reserve")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        iii. Securities Premium Reserve (Biii)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_securities_premium_reserve")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        iv. Debenture Redemption Reserve (Biv)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_debenture_redemption_reserve")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        v. Revaluation Reserve (Bv)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_revaluation_reserve")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        vi. Share options outstanding amount (Bvi)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_share_options_outstanding")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        vii. Other reserve a (Bvii-a)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_other_reserve_a")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        vii. Other reserve b (Bvii-b)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_other_reserve_b")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        viii. Surplus i.e. Balance in profit and loss account (Bviii) 🔄
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_surplus_balance")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ix. Total (Bi + Bii + Biii + Biv + Bv + Bvi + Bvii + Bviii) (Bix) 🔄
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={totalEquityLiabilities.toFixed(2)}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 font-semibold text-blue-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Share application money pending allotment */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("shareApplication")}
              className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between font-semibold text-green-900"
            >
              <span>2. Share Application Money Pending Allotment</span>
              <span className="text-xl">{expandedSections.includes("shareApplication") ? "−" : "+"}</span>
            </button>

            {expandedSections.includes("shareApplication") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Pending for less than one year
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_share_application_less_1year")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Pending for more than one year
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_share_application_more_1year")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Total (i + ii) 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={(Number(watch("bs_share_application_less_1year") || 0) + Number(watch("bs_share_application_more_1year") || 0)).toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-semibold text-green-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Non-current liabilities */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("nonCurrentLiabilities")}
              className="w-full px-6 py-4 bg-amber-50 hover:bg-amber-100 transition-colors flex items-center justify-between font-semibold text-amber-900"
            >
              <span>3. Non-current Liabilities</span>
              <span className="text-xl">{expandedSections.includes("nonCurrentLiabilities") ? "−" : "+"}</span>
            </button>

            {expandedSections.includes("nonCurrentLiabilities") && (
              <div className="p-6 space-y-6">
                {/* Long-term borrowings */}
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <h5 className="font-semibold text-gray-700 mb-3">A. Long-term Borrowings</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        i. Bonds/debentures - Foreign currency (Ia)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_bonds_foreign_currency")}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        i. Bonds/debentures - Rupees (Ib)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_bonds_rupees")}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        i. Total (Ia + Ib) (Ic) 🔄
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={(Number(watch("bs_bonds_foreign_currency") || 0) + Number(watch("bs_bonds_rupees") || 0)).toFixed(2)}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-amber-50 font-semibold text-amber-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Term loans and other sections - simplified structure */}
                <div className="border border-gray-200 rounded p-4 bg-gray-50">
                  <h5 className="font-semibold text-gray-700 mb-3">II. Term Loans</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        From Banks (IIa)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_term_loans_banks")}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        From Others (IIb)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("bs_term_loans_others")}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Total Term Loans (IIa + IIb) (IIc) 🔄
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={(Number(watch("bs_term_loans_banks") || 0) + Number(watch("bs_term_loans_others") || 0)).toFixed(2)}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-amber-50 font-semibold text-amber-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Other liabilities sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      III. Deferred Payment Liabilities
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_deferred_payment_liabilities")}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      IV. Deposits from Related Parties
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_deposits_related_parties")}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      V. Other Deposits
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_other_deposits")}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      VI. Loans and Advances from Related Parties
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_loans_advances_related")}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      VII. Other Loans and Advances
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_other_loans_advances")}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      VIII. Long term maturities of finance lease obligations
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_finance_lease_obligations")}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION II: ASSETS (Simplified) */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            II. ASSETS
          </h2>

          {/* 1. Non-current assets */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("nonCurrentAssets")}
              className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between font-semibold text-green-900"
            >
              <span>1. Non-current Assets</span>
              <span className="text-xl">{expandedSections.includes("nonCurrentAssets") ? "−" : "+"}</span>
            </button>

            {expandedSections.includes("nonCurrentAssets") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      A. Fixed Assets - Gross Block (Ia)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_fixed_assets_gross")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Less: Depreciation (Ib)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_fixed_assets_depreciation")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Net Fixed Assets (Ia - Ib) (Ic) 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={(Number(watch("bs_fixed_assets_gross") || 0) - Number(watch("bs_fixed_assets_depreciation") || 0)).toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-semibold text-green-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Current Assets */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("currentAssets")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-semibold text-blue-900"
            >
              <span>2. Current Assets</span>
              <span className="text-xl">{expandedSections.includes("currentAssets") ? "−" : "+"}</span>
            </button>

            {expandedSections.includes("currentAssets") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      A. Inventories (IIa)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_inventories")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      B. Trade Receivables (IIb)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_trade_receivables")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      C. Cash and Cash Equivalents (IIc)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_cash_equivalents")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      D. Other Current Assets (IId)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("bs_other_current_assets")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Current Assets (IIa + IIb + IIc + IId) 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={(Number(watch("bs_inventories") || 0) + Number(watch("bs_trade_receivables") || 0) + Number(watch("bs_cash_equivalents") || 0) + Number(watch("bs_other_current_assets") || 0)).toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 font-semibold text-blue-700"
                    />
                  </div>
                </div>
              </div>
            )}
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

export default BalanceSheet;
