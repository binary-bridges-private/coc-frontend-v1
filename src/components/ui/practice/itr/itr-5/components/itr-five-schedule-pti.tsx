import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface BusinessTrustInvestment {
  slNo: string;
  investmentEntityCoveredBySection: string;
  investmentDescription: string;
  trustBusinessName: string;
  incomeOfCurrentYear: string;
  shareInNetIncome: string;
  shareOfLossInCurrent: string;
  curryForwardLossIncludedAbove: string;
  netIncomeIncludedAbove: string;
  pTIEnumeration: string;
  shareOfStFromCurrentFund: string;
  netShareOfIncomeAddComments: string;
}

export interface ItrFiveSchedulePTIFormData {
  businessTrustInvestments?: BusinessTrustInvestment[];
  totalIncomeOfCurrentYear?: string;
  totalShareInNetIncome?: string;
  totalShareOfLoss?: string;
  totalLossCarriedForward?: string;
  totalNetIncome?: string;
  totalPTIEnumeration?: string;
  totalSTFromCurrentFund?: string;
  totalNetShare?: string;
}

// Zod validation schema
const businessTrustInvestmentSchema = z.object({
  slNo: z.string().optional(),
  investmentEntityCoveredBySection: z.string().optional(),
  investmentDescription: z.string().optional(),
  trustBusinessName: z.string().optional(),
  incomeOfCurrentYear: z.string().optional(),
  shareInNetIncome: z.string().optional(),
  shareOfLossInCurrent: z.string().optional(),
  curryForwardLossIncludedAbove: z.string().optional(),
  netIncomeIncludedAbove: z.string().optional(),
  pTIEnumeration: z.string().optional(),
  shareOfStFromCurrentFund: z.string().optional(),
  netShareOfIncomeAddComments: z.string().optional(),
});

const itrFiveSchedulePTISchema = z.object({
  businessTrustInvestments: z.array(businessTrustInvestmentSchema).optional(),
  totalIncomeOfCurrentYear: z.string().optional(),
  totalShareInNetIncome: z.string().optional(),
  totalShareOfLoss: z.string().optional(),
  totalLossCarriedForward: z.string().optional(),
  totalNetIncome: z.string().optional(),
  totalPTIEnumeration: z.string().optional(),
  totalSTFromCurrentFund: z.string().optional(),
  totalNetShare: z.string().optional(),
});

type ItrFiveSchedulePTIFormType = z.infer<typeof itrFiveSchedulePTISchema>;

interface ItrFiveSchedulePTIProps {
  initialData?: ItrFiveSchedulePTIFormData;
  onSave: (data: ItrFiveSchedulePTIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveSchedulePTI: React.FC<ItrFiveSchedulePTIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveSchedulePTIFormType>({
    resolver: zodResolver(itrFiveSchedulePTISchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [businessTrustInvestments, setBusinessTrustInvestments] = useState<BusinessTrustInvestment[]>(
    initialData?.businessTrustInvestments || [
      {
        slNo: "",
        investmentEntityCoveredBySection: "",
        investmentDescription: "",
        trustBusinessName: "",
        incomeOfCurrentYear: "",
        shareInNetIncome: "",
        shareOfLossInCurrent: "",
        curryForwardLossIncludedAbove: "",
        netIncomeIncludedAbove: "",
        pTIEnumeration: "",
        shareOfStFromCurrentFund: "",
        netShareOfIncomeAddComments: "",
      },
      {
        slNo: "",
        investmentEntityCoveredBySection: "",
        investmentDescription: "",
        trustBusinessName: "",
        incomeOfCurrentYear: "",
        shareInNetIncome: "",
        shareOfLossInCurrent: "",
        curryForwardLossIncludedAbove: "",
        netIncomeIncludedAbove: "",
        pTIEnumeration: "",
        shareOfStFromCurrentFund: "",
        netShareOfIncomeAddComments: "",
      },
      {
        slNo: "",
        investmentEntityCoveredBySection: "",
        investmentDescription: "",
        trustBusinessName: "",
        incomeOfCurrentYear: "",
        shareInNetIncome: "",
        shareOfLossInCurrent: "",
        curryForwardLossIncludedAbove: "",
        netIncomeIncludedAbove: "",
        pTIEnumeration: "",
        shareOfStFromCurrentFund: "",
        netShareOfIncomeAddComments: "",
      },
    ]
  );

  const [totals, setTotals] = useState({
    totalIncomeOfCurrentYear: initialData?.totalIncomeOfCurrentYear || "",
    totalShareInNetIncome: initialData?.totalShareInNetIncome || "",
    totalShareOfLoss: initialData?.totalShareOfLoss || "",
    totalLossCarriedForward: initialData?.totalLossCarriedForward || "",
    totalNetIncome: initialData?.totalNetIncome || "",
    totalPTIEnumeration: initialData?.totalPTIEnumeration || "",
    totalSTFromCurrentFund: initialData?.totalSTFromCurrentFund || "",
    totalNetShare: initialData?.totalNetShare || "",
  });

  const onSubmit = (data: ItrFiveSchedulePTIFormType) => {
    onSave({
      businessTrustInvestments,
      ...totals,
    });
  };

  const updateInvestment = (
    index: number,
    field: keyof BusinessTrustInvestment,
    value: string
  ) => {
    const updated = [...businessTrustInvestments];
    updated[index] = { ...updated[index], [field]: value };
    setBusinessTrustInvestments(updated);
  };

  const addRow = () => {
    setBusinessTrustInvestments([
      ...businessTrustInvestments,
      {
        slNo: "",
        investmentEntityCoveredBySection: "",
        investmentDescription: "",
        trustBusinessName: "",
        incomeOfCurrentYear: "",
        shareInNetIncome: "",
        shareOfLossInCurrent: "",
        curryForwardLossIncludedAbove: "",
        netIncomeIncludedAbove: "",
        pTIEnumeration: "",
        shareOfStFromCurrentFund: "",
        netShareOfIncomeAddComments: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (businessTrustInvestments.length > 1) {
      setBusinessTrustInvestments(businessTrustInvestments.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Schedule PTI - Details of Income from Business Trust or Investment Fund
          </h1>
          <p className="text-indigo-700">
            Provide details of income from business trust u/s 113U and investment fund u/s 113UA
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-indigo-100 border-l-4 border-indigo-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-indigo-900">
            <strong>Important:</strong> Report income from business trusts or investment funds covered 
            by section 113U or 113UA including net income, share of losses, and enumeration details.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Business Trust Investment Details Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <h2 className="text-lg font-bold text-indigo-900 mb-6">
              Drop down to be provided
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-indigo-200 border-b-2 border-indigo-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Investment entity covered by Section 113U/113UA
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Entity/Investment/Trust/Business/Fund
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Trust/Business/Fund name
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (1) Income of current year
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (6) Share in net income
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (7) Share of loss in current year
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (8) Carry forward loss included
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (9) Net income included above
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (10) PTI Enumeration
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Share of ST from current fund
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Net Share of Income (Add comments)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {businessTrustInvestments.map((row, index) => (
                    <tr key={index} className="hover:bg-indigo-50">
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.slNo}
                          onChange={(e) => updateInvestment(index, "slNo", e.target.value)}
                          placeholder={String(index + 1)}
                          className="w-10 px-1 py-1 border border-indigo-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select
                          value={row.investmentEntityCoveredBySection}
                          onChange={(e) =>
                            updateInvestment(index, "investmentEntityCoveredBySection", e.target.value)
                          }
                          className="w-full px-1 py-1 border border-indigo-200 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="113U">Section 113U</option>
                          <option value="113UA">Section 113UA</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.investmentDescription}
                          onChange={(e) =>
                            updateInvestment(index, "investmentDescription", e.target.value)
                          }
                          placeholder="Entity/Investment/Trust"
                          className="w-full px-1 py-1 border border-indigo-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.trustBusinessName}
                          onChange={(e) =>
                            updateInvestment(index, "trustBusinessName", e.target.value)
                          }
                          placeholder="Trust/Business name"
                          className="w-full px-1 py-1 border border-indigo-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.incomeOfCurrentYear}
                          onChange={(e) =>
                            updateInvestment(index, "incomeOfCurrentYear", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.shareInNetIncome}
                          onChange={(e) =>
                            updateInvestment(index, "shareInNetIncome", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.shareOfLossInCurrent}
                          onChange={(e) =>
                            updateInvestment(index, "shareOfLossInCurrent", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.curryForwardLossIncludedAbove}
                          onChange={(e) =>
                            updateInvestment(index, "curryForwardLossIncludedAbove", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.netIncomeIncludedAbove}
                          onChange={(e) =>
                            updateInvestment(index, "netIncomeIncludedAbove", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.pTIEnumeration}
                          onChange={(e) =>
                            updateInvestment(index, "pTIEnumeration", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.shareOfStFromCurrentFund}
                          onChange={(e) =>
                            updateInvestment(index, "shareOfStFromCurrentFund", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-indigo-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.netShareOfIncomeAddComments}
                          onChange={(e) =>
                            updateInvestment(index, "netShareOfIncomeAddComments", e.target.value)
                          }
                          placeholder="Add comments"
                          className="w-full px-1 py-1 border border-indigo-200 rounded text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add/Remove Row Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={addRow}
                className="px-4 py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600 transition"
              >
                + Add Row
              </button>
              {businessTrustInvestments.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(businessTrustInvestments.length - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  - Remove Row
                </button>
              )}
            </div>
          </div>

          {/* Totals Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
            <h2 className="text-lg font-bold text-indigo-900 mb-6">Summary Totals</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total Income of Current Year</span>
                <input
                  type="text"
                  value={totals.totalIncomeOfCurrentYear}
                  onChange={(e) =>
                    setTotals({ ...totals, totalIncomeOfCurrentYear: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total Share in Net Income</span>
                <input
                  type="text"
                  value={totals.totalShareInNetIncome}
                  onChange={(e) =>
                    setTotals({ ...totals, totalShareInNetIncome: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total Share of Loss</span>
                <input
                  type="text"
                  value={totals.totalShareOfLoss}
                  onChange={(e) =>
                    setTotals({ ...totals, totalShareOfLoss: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total Loss Carried Forward</span>
                <input
                  type="text"
                  value={totals.totalLossCarriedForward}
                  onChange={(e) =>
                    setTotals({ ...totals, totalLossCarriedForward: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total Net Income</span>
                <input
                  type="text"
                  value={totals.totalNetIncome}
                  onChange={(e) =>
                    setTotals({ ...totals, totalNetIncome: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total PTI Enumeration</span>
                <input
                  type="text"
                  value={totals.totalPTIEnumeration}
                  onChange={(e) =>
                    setTotals({ ...totals, totalPTIEnumeration: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-indigo-800">Total ST from Current Fund</span>
                <input
                  type="text"
                  value={totals.totalSTFromCurrentFund}
                  onChange={(e) =>
                    setTotals({ ...totals, totalSTFromCurrentFund: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-indigo-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-indigo-300">
                <span className="font-bold text-indigo-900">Total Net Share</span>
                <input
                  type="text"
                  value={totals.totalNetShare}
                  onChange={(e) =>
                    setTotals({ ...totals, totalNetShare: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border-2 border-indigo-600 rounded font-bold text-right"
                />
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
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveSchedulePTI;
