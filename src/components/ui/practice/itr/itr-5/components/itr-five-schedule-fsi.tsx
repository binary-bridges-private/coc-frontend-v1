import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ResidentIncomeDetail {
  slNo: number;
  countryCode: string;
  taxpayerIdentificationNumber: string;
  headOfIncome: string;
  incomeOutsideIndia: string;
  taxPaidOutside: string;
  taxPayableOnIncomeUnderIndianProvisionsRate: string;
  taxReliefAvailableInIndiaRate: string;
  relevantArticleOfDTAA: string;
}

export interface ItrFiveScheduleFSIFormData {
  residentIncomeDetails?: ResidentIncomeDetail[];
  totalIncomeOutsideIndia?: string;
  totalTaxPaidOutside?: string;
  totalTaxPayableOutside?: string;
  totalTaxReliefAvailable?: string;
}

// Zod validation schema
const residentIncomeSchema = z.object({
  slNo: z.number().optional(),
  countryCode: z.string().optional(),
  taxpayerIdentificationNumber: z.string().optional(),
  headOfIncome: z.string().optional(),
  incomeOutsideIndia: z.string().optional(),
  taxPaidOutside: z.string().optional(),
  taxPayableOnIncomeUnderIndianProvisionsRate: z.string().optional(),
  taxReliefAvailableInIndiaRate: z.string().optional(),
  relevantArticleOfDTAA: z.string().optional(),
});

const itrFiveScheduleFSISchema = z.object({
  residentIncomeDetails: z.array(residentIncomeSchema).optional(),
  totalIncomeOutsideIndia: z.string().optional(),
  totalTaxPaidOutside: z.string().optional(),
  totalTaxPayableOutside: z.string().optional(),
  totalTaxReliefAvailable: z.string().optional(),
});

type ItrFiveScheduleFSIFormType = z.infer<typeof itrFiveScheduleFSISchema>;

interface ItrFiveScheduleFSIProps {
  initialData?: ItrFiveScheduleFSIFormData;
  onSave: (data: ItrFiveScheduleFSIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleFSI: React.FC<ItrFiveScheduleFSIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleFSIFormType>({
    resolver: zodResolver(itrFiveScheduleFSISchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [residentDetails, setResidentDetails] = useState<ResidentIncomeDetail[]>(
    initialData?.residentIncomeDetails || [
      {
        slNo: 1,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        headOfIncome: "",
        incomeOutsideIndia: "",
        taxPaidOutside: "",
        taxPayableOnIncomeUnderIndianProvisionsRate: "",
        taxReliefAvailableInIndiaRate: "",
        relevantArticleOfDTAA: "",
      },
      {
        slNo: 2,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        headOfIncome: "",
        incomeOutsideIndia: "",
        taxPaidOutside: "",
        taxPayableOnIncomeUnderIndianProvisionsRate: "",
        taxReliefAvailableInIndiaRate: "",
        relevantArticleOfDTAA: "",
      },
      {
        slNo: 3,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        headOfIncome: "",
        incomeOutsideIndia: "",
        taxPaidOutside: "",
        taxPayableOnIncomeUnderIndianProvisionsRate: "",
        taxReliefAvailableInIndiaRate: "",
        relevantArticleOfDTAA: "",
      },
    ]
  );

  const [totals, setTotals] = useState({
    totalIncomeOutsideIndia: initialData?.totalIncomeOutsideIndia || "",
    totalTaxPaidOutside: initialData?.totalTaxPaidOutside || "",
    totalTaxPayableOutside: initialData?.totalTaxPayableOutside || "",
    totalTaxReliefAvailable: initialData?.totalTaxReliefAvailable || "",
  });

  const onSubmit = (data: ItrFiveScheduleFSIFormType) => {
    onSave({
      residentIncomeDetails: residentDetails,
      ...totals,
    });
  };

  const updateDetail = (
    index: number,
    field: keyof ResidentIncomeDetail,
    value: string | number
  ) => {
    const updated = [...residentDetails];
    updated[index] = { ...updated[index], [field]: value };
    setResidentDetails(updated);
  };

  const addRow = () => {
    const newSlNo = Math.max(...residentDetails.map((d) => d.slNo), 0) + 1;
    setResidentDetails([
      ...residentDetails,
      {
        slNo: newSlNo,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        headOfIncome: "",
        incomeOutsideIndia: "",
        taxPaidOutside: "",
        taxPayableOnIncomeUnderIndianProvisionsRate: "",
        taxReliefAvailableInIndiaRate: "",
        relevantArticleOfDTAA: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (residentDetails.length > 1) {
      setResidentDetails(residentDetails.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-sky-900 mb-2">
            Schedule FSI - Details of Income from Outside India and Tax Relief
          </h1>
          <p className="text-sky-700">
            Provide details of income earned outside India and foreign tax relief available (applicable only for residents)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-sky-100 border-l-4 border-sky-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-sky-900">
            <strong>Important:</strong> Report all income earned outside India including country-wise breakdown, 
            tax paid, tax payable in India, and tax relief available under DTAA provisions.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Resident Foreign Source Income Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-sky-600">
            <h2 className="text-lg font-bold text-sky-900 mb-6">
              Details of Income from Outside India (for Residents)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-sky-200 border-b-2 border-sky-400">
                    <th className="border px-2 py-2 text-left font-semibold">Sl.</th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Country Code (Dropdown) - provided in the e-Form
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Taxpayer Identification Number
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Head of Income
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (a) Income from outside India
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (b) Tax paid outside India
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (c) Tax payable on income under Indian Provisions
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      (d) Tax relief available in India (as per DTAA if relief is @ 90/90 A)
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Relevant article of DTAA (if relief claimed u/s 90)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {residentDetails.map((row, index) => (
                    <tr key={index} className="hover:bg-sky-50">
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.slNo}
                          disabled
                          className="w-8 px-1 py-1 border border-sky-200 rounded bg-gray-100 text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.countryCode}
                          onChange={(e) =>
                            updateDetail(index, "countryCode", e.target.value)
                          }
                          placeholder="Country"
                          className="w-24 px-1 py-1 border border-sky-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.taxpayerIdentificationNumber}
                          onChange={(e) =>
                            updateDetail(index, "taxpayerIdentificationNumber", e.target.value)
                          }
                          placeholder="TIN"
                          className="w-24 px-1 py-1 border border-sky-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select
                          value={row.headOfIncome}
                          onChange={(e) =>
                            updateDetail(index, "headOfIncome", e.target.value)
                          }
                          className="w-full px-1 py-1 border border-sky-200 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="House Property">House Property</option>
                          <option value="Capital Gains">Capital Gains</option>
                          <option value="Business/Profession">Business/Profession</option>
                          <option value="Other Sources">Other Sources</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.incomeOutsideIndia}
                          onChange={(e) =>
                            updateDetail(index, "incomeOutsideIndia", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-sky-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.taxPaidOutside}
                          onChange={(e) =>
                            updateDetail(index, "taxPaidOutside", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-sky-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.taxPayableOnIncomeUnderIndianProvisionsRate}
                          onChange={(e) =>
                            updateDetail(index, "taxPayableOnIncomeUnderIndianProvisionsRate", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-sky-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.taxReliefAvailableInIndiaRate}
                          onChange={(e) =>
                            updateDetail(index, "taxReliefAvailableInIndiaRate", e.target.value)
                          }
                          placeholder="0"
                          className="w-24 px-1 py-1 border border-sky-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.relevantArticleOfDTAA}
                          onChange={(e) =>
                            updateDetail(index, "relevantArticleOfDTAA", e.target.value)
                          }
                          placeholder="Article"
                          className="w-20 px-1 py-1 border border-sky-200 rounded text-xs"
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
                className="px-4 py-2 bg-sky-500 text-white rounded text-sm hover:bg-sky-600 transition"
              >
                + Add Row
              </button>
              {residentDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(residentDetails.length - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  - Remove Row
                </button>
              )}
            </div>
          </div>

          {/* Summary Totals */}
          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg shadow-lg p-6 border-l-4 border-sky-600">
            <h2 className="text-lg font-bold text-sky-900 mb-6">Summary Totals</h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-sky-800">Total Income from Outside India</span>
                <input
                  type="text"
                  value={totals.totalIncomeOutsideIndia}
                  onChange={(e) =>
                    setTotals({ ...totals, totalIncomeOutsideIndia: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-sky-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-sky-800">Total Tax Paid Outside</span>
                <input
                  type="text"
                  value={totals.totalTaxPaidOutside}
                  onChange={(e) =>
                    setTotals({ ...totals, totalTaxPaidOutside: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-sky-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-sky-800">Total Tax Payable (Indian Provisions)</span>
                <input
                  type="text"
                  value={totals.totalTaxPayableOutside}
                  onChange={(e) =>
                    setTotals({ ...totals, totalTaxPayableOutside: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-sky-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-sky-300">
                <span className="font-bold text-sky-900">Total Tax Relief Available</span>
                <input
                  type="text"
                  value={totals.totalTaxReliefAvailable}
                  onChange={(e) =>
                    setTotals({ ...totals, totalTaxReliefAvailable: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border-2 border-sky-600 rounded text-right font-bold"
                />
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-sky-50 rounded-lg p-4 border-l-4 border-sky-400">
            <h3 className="font-bold text-sky-900 mb-2">Important Notes:</h3>
            <ul className="text-sm text-sky-800 space-y-1 ml-4 list-disc">
              <li>Fill this schedule only if you have earned income outside India during the financial year</li>
              <li>Include all heads of income: House property, Capital gains, Business/Profession, and Other sources</li>
              <li>Report tax paid outside India in the country of source</li>
              <li>Tax relief is available as per DTAA or section 90/90A provisions</li>
              <li>Reference relevant article from applicable Double Taxation Avoidance Agreement</li>
            </ul>
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
              className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleFSI;
