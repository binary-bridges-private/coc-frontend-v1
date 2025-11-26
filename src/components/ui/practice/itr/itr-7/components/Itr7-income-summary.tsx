import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface IncomeSummaryProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const IncomeSummary: React.FC<IncomeSummaryProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const businessIncome = watch("summary_business_income") || 0;
  const capitalGain = watch("summary_capital_gain") || 0;
  const vdaBusinessIncome = watch("vda_total_business_income") || 0;
  const vdaCapitalGain = watch("vda_total_capital_gain") || 0;

  const totalBusinessIncome =
    Number(businessIncome) + Number(vdaBusinessIncome);
  const totalCapitalGain = Number(capitalGain) + Number(vdaCapitalGain);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Income Summary
          </h1>
          <p className="text-slate-600 text-lg">
            Summary of All Positive Incomes from Business Income and Capital
            Gains
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Business Income Section */}
          <div className="mb-8 border-b-2 border-slate-200 pb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              Business Income Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  A. Total (Sum of all Positive Incomes of Business Income in
                  Col. 7)
                </label>
                <input
                  type="number"
                  {...register("summary_business_income")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-lg"
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Reference: Item No. 3f of Schedule BP
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  VDA Business Income from Schedule VDA
                </label>
                <input
                  type="number"
                  value={Number(vdaBusinessIncome).toFixed(2)}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 font-bold text-lg"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                <label className="block text-sm font-bold text-blue-900 mb-2">
                  Total Business Income (A + VDA)
                </label>
                <input
                  type="number"
                  value={totalBusinessIncome.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg bg-blue-100 font-bold text-lg text-blue-900"
                />
              </div>
            </div>
          </div>

          {/* Capital Gain Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Capital Gain Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  B. Total (Sum of all Positive Incomes of Capital Gain in Col.
                  7)
                </label>
                <input
                  type="number"
                  {...register("summary_capital_gain")}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-bold text-lg"
                  placeholder="0.00"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Reference: Item No. C2 of Schedule CC
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  VDA Capital Gain from Schedule VDA
                </label>
                <input
                  type="number"
                  value={Number(vdaCapitalGain).toFixed(2)}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 font-bold text-lg"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                <label className="block text-sm font-bold text-green-900 mb-2">
                  Total Capital Gain (B + VDA)
                </label>
                <input
                  type="number"
                  value={totalCapitalGain.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-3 border border-green-300 rounded-lg bg-green-100 font-bold text-lg text-green-900"
                />
              </div>
            </div>
          </div>

          {/* Grand Total */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-lg mt-8">
            <label className="block text-sm font-bold text-white mb-2">
              GRAND TOTAL (Business Income + Capital Gain)
            </label>
            <input
              type="number"
              value={(totalBusinessIncome + totalCapitalGain).toFixed(2)}
              readOnly
              className="w-full px-4 py-3 border border-slate-700 rounded-lg bg-white font-bold text-2xl text-slate-900"
            />
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded border border-amber-200">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Note:</span> This summary
              consolidates all positive incomes from:
            </p>
            <ul className="text-sm text-amber-900 mt-2 ml-4 space-y-1 list-disc">
              <li>Business Income from Schedule BP (Item 3f)</li>
              <li>Capital Gain from Schedule CC (Item C2)</li>
              <li>Virtual Digital Assets from Schedule VDA</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeSummary;
