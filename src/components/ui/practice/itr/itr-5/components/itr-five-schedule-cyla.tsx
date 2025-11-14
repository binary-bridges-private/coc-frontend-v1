import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface IncomeAfterSetOffDetail {
  slNo: string;
  headSourceOfIncome: string;
  incomeOfCurrentYear: string;
  housePropertyLoss: string;
  businessLossSpeculation: string;
  businessLossSpecified: string;
  otherSourcesLoss: string;
  currentYearIncomeAfterSetOff: string;
}

export interface ItrFiveScheduleCYLAFormData {
  incomeAfterSetOffDetails?: IncomeAfterSetOffDetail[];
  totalLossToBeAdjusted?: string;
  totalCurrentYearIncomeAfterSetOff?: string;
}

// Zod validation schema
const incomeAfterSetOffSchema = z.object({
  slNo: z.string().optional(),
  headSourceOfIncome: z.string().optional(),
  incomeOfCurrentYear: z.string().optional(),
  housePropertyLoss: z.string().optional(),
  businessLossSpeculation: z.string().optional(),
  businessLossSpecified: z.string().optional(),
  otherSourcesLoss: z.string().optional(),
  currentYearIncomeAfterSetOff: z.string().optional(),
});

const itrFiveScheduleCYLASchema = z.object({
  incomeAfterSetOffDetails: z.array(incomeAfterSetOffSchema).optional(),
  totalLossToBeAdjusted: z.string().optional(),
  totalCurrentYearIncomeAfterSetOff: z.string().optional(),
});

type ItrFiveScheduleCYLAFormType = z.infer<typeof itrFiveScheduleCYLASchema>;

interface ItrFiveScheduleCYLAProps {
  initialData?: ItrFiveScheduleCYLAFormData;
  onSave: (data: ItrFiveScheduleCYLAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleCYLA: React.FC<ItrFiveScheduleCYLAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleCYLAFormType>({
    resolver: zodResolver(itrFiveScheduleCYLASchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [incomeAfterSetOff, setIncomeAfterSetOff] = useState<IncomeAfterSetOffDetail[]>(
    initialData?.incomeAfterSetOffDetails || [
      {
        slNo: "Loss to be adjusted -->",
        headSourceOfIncome: "",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "i",
        headSourceOfIncome: "House property",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "ii",
        headSourceOfIncome: "Business (excluding speculative income and income from specified business)",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "iii",
        headSourceOfIncome: "Speculation income",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "iv",
        headSourceOfIncome: "Specified business income u/s 35AD",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "v",
        headSourceOfIncome: "Short-term capital gain taxable @ 15%",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "vi",
        headSourceOfIncome: "Short-term capital gain taxable @ 20%",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "vii",
        headSourceOfIncome: "Short-term capital gain taxable @ applicable rates",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "viii",
        headSourceOfIncome: "Short-term capital gain taxable in India as per DTAA",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "ix",
        headSourceOfIncome: "Long term capital gain taxable @ 10%",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "x",
        headSourceOfIncome: "Long term capital gain taxable @ 12.5%",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "xi",
        headSourceOfIncome: "Long term capital gain taxable @ 20%",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "xii",
        headSourceOfIncome: "Long term capital gains taxable in India as per DTAA",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "xiii",
        headSourceOfIncome: "Net income from Other sources (excluding profit from owning race horses and winnings from lottery)",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "xiv",
        headSourceOfIncome: "Income from other sources relating to owning and maintaining race horses",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
      {
        slNo: "xv",
        headSourceOfIncome: "Income from other sources taxable at special rates in India as per DTAA",
        incomeOfCurrentYear: "",
        housePropertyLoss: "",
        businessLossSpeculation: "",
        businessLossSpecified: "",
        otherSourcesLoss: "",
        currentYearIncomeAfterSetOff: "",
      },
    ]
  );

  const [totalLossToBeAdjusted, setTotalLossToBeAdjusted] = useState(
    initialData?.totalLossToBeAdjusted || ""
  );
  const [totalCurrentYearIncomeAfterSetOff, setTotalCurrentYearIncomeAfterSetOff] = useState(
    initialData?.totalCurrentYearIncomeAfterSetOff || ""
  );

  const onSubmit = (data: ItrFiveScheduleCYLAFormType) => {
    onSave({
      incomeAfterSetOffDetails: incomeAfterSetOff,
      totalLossToBeAdjusted,
      totalCurrentYearIncomeAfterSetOff,
    });
  };

  const updateIncomeAfterSetOff = (
    index: number,
    field: keyof IncomeAfterSetOffDetail,
    value: string
  ) => {
    const updated = [...incomeAfterSetOff];
    updated[index] = { ...updated[index], [field]: value };
    setIncomeAfterSetOff(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule CYLA - Details of Income After Set-off of Current Year's Losses
          </h1>
          <p className="text-slate-700">
            Set-off of losses from various heads of income against income in the current year
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-slate-100 border-l-4 border-slate-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-slate-900">
            <strong>Important:</strong> Provide details of income from each head after adjusting losses. 
            Include House property, Business (excluding speculative), Speculation, Specified business, 
            Capital gains (STCG/LTCG at various rates), and Other sources.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Income After Set-off Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
            <h2 className="text-lg font-bold text-slate-900 mb-6">
              Details of Income After Set-off of Current Year's Losses
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-200 border-b-2 border-slate-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">Head/Source of Income</th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Income of current year (Fill only if income is zero or positive)
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      House property loss
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Business Loss (other than speculation & specified business)
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Business Loss (speculation)
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Other sources loss
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Current year income after set off = (1-2-3-4)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incomeAfterSetOff.map((row, index) => (
                    <tr key={index} className={index === 0 ? "bg-gray-100" : "hover:bg-slate-50"}>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.slNo}
                          disabled={index === 0}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "slNo", e.target.value)
                          }
                          className={`w-12 px-1 py-1 border border-slate-200 rounded text-xs ${
                            index === 0 ? "bg-gray-100" : ""
                          }`}
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.headSourceOfIncome}
                          disabled={index !== 0}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "headSourceOfIncome", e.target.value)
                          }
                          className={`w-full px-1 py-1 border border-slate-200 rounded text-xs ${
                            index !== 0 ? "bg-gray-100" : ""
                          }`}
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.incomeOfCurrentYear}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "incomeOfCurrentYear", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-slate-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.housePropertyLoss}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "housePropertyLoss", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-slate-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.businessLossSpeculation}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "businessLossSpeculation", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-slate-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.businessLossSpecified}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "businessLossSpecified", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-slate-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.otherSourcesLoss}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "otherSourcesLoss", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-slate-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.currentYearIncomeAfterSetOff}
                          onChange={(e) =>
                            updateIncomeAfterSetOff(index, "currentYearIncomeAfterSetOff", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-slate-200 rounded text-right text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Summary Totals</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-slate-800">xvi. Total loss to be set off</span>
                <input
                  type="text"
                  value={totalLossToBeAdjusted}
                  onChange={(e) => setTotalLossToBeAdjusted(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-slate-300">
                <span className="font-bold text-lg text-slate-900">
                  xvii. Loss remaining after set off
                </span>
                <input
                  type="text"
                  value={totalCurrentYearIncomeAfterSetOff}
                  onChange={(e) => setTotalCurrentYearIncomeAfterSetOff(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-slate-600 rounded-lg text-right font-bold"
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
              className="px-8 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleCYLA;
