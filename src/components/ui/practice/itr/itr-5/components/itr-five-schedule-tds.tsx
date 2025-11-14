import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface TDSDetail {
  slNo: number;
  tdsCredit: string;
  taxDeduction: string;
  panOfPerson: string;
  unclaimedTDS: string;
  tdsOfCurrent: string;
  tdsOfCurrentFY: string;
  tdsCredit2: string;
  claimed: string;
  claimedInHands: string;
  grossAmount: string;
  headIncome: string;
}

export interface ItrFiveScheduleTDSFormData {
  tdsDetails?: TDSDetail[];
  totalTDS?: string;
}

// Zod validation schemas
const tdsDetailSchema = z.object({
  slNo: z.number().optional(),
  tdsCredit: z.string().optional(),
  taxDeduction: z.string().optional(),
  panOfPerson: z.string().optional(),
  unclaimedTDS: z.string().optional(),
  tdsOfCurrent: z.string().optional(),
  tdsOfCurrentFY: z.string().optional(),
  tdsCredit2: z.string().optional(),
  claimed: z.string().optional(),
  claimedInHands: z.string().optional(),
  grossAmount: z.string().optional(),
  headIncome: z.string().optional(),
});

const itrFiveScheduleTDSSchema = z.object({
  tdsDetails: z.array(tdsDetailSchema).optional(),
  totalTDS: z.string().optional(),
});

type ItrFiveScheduleTDSFormType = z.infer<typeof itrFiveScheduleTDSSchema>;

interface ItrFiveScheduleTDSProps {
  initialData?: ItrFiveScheduleTDSFormData;
  onSave: (data: ItrFiveScheduleTDSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleTDS: React.FC<ItrFiveScheduleTDSProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleTDSFormType>({
    resolver: zodResolver(itrFiveScheduleTDSSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [tdsDetails, setTdsDetails] = useState<TDSDetail[]>(
    initialData?.tdsDetails || [
      {
        slNo: 1,
        tdsCredit: "",
        taxDeduction: "",
        panOfPerson: "",
        unclaimedTDS: "",
        tdsOfCurrent: "",
        tdsOfCurrentFY: "",
        tdsCredit2: "",
        claimed: "",
        claimedInHands: "",
        grossAmount: "",
        headIncome: "",
      },
    ]
  );

  const [totalTDS, setTotalTDS] = useState(initialData?.totalTDS || "");

  const onSubmit = (data: ItrFiveScheduleTDSFormType) => {
    onSave({
      tdsDetails,
      totalTDS,
    });
  };

  const updateTDSDetail = (
    index: number,
    field: keyof TDSDetail,
    value: string | number
  ) => {
    const updated = [...tdsDetails];
    updated[index] = { ...updated[index], [field]: value };
    setTdsDetails(updated);
  };

  const addTDSRow = () => {
    const newSlNo = Math.max(...tdsDetails.map((d) => d.slNo), 0) + 1;
    setTdsDetails([
      ...tdsDetails,
      {
        slNo: newSlNo,
        tdsCredit: "",
        taxDeduction: "",
        panOfPerson: "",
        unclaimedTDS: "",
        tdsOfCurrent: "",
        tdsOfCurrentFY: "",
        tdsCredit2: "",
        claimed: "",
        claimedInHands: "",
        grossAmount: "",
        headIncome: "",
      },
    ]);
  };

  const removeTDSRow = (index: number) => {
    setTdsDetails(tdsDetails.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Schedule TDS - Tax Deducted at Source on Income
          </h1>
          <p className="text-blue-700">
            Details of Tax Deducted at Source (TDS) as per Form 16A issued by deductors
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> Enter details of TDS deducted at source on income as per Form 16A/16B/16C/16D/16E 
            issued by deductors. Total of column 9 should be entered in SL No. 9b of Part B-TTI.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* TDS Details Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-lg font-bold text-blue-900 mb-6">
              Details of Tax Deducted at Source (TDS) on Income (As per Form 16 A issued or Form 16B/16C/16D/16E furnished by Deductor(s))
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-blue-200 border-b-2 border-blue-400">
                    <th className="border px-1 py-2 text-center font-semibold">S.No</th>
                    <th className="border px-1 py-2 text-left font-semibold">TDS credit relating to self/other person as per other credit related to other person</th>
                    <th className="border px-1 py-2 text-left font-semibold">Tax Deduction and Tax Collection Account Number of the Collector (if any, related to other person)</th>
                    <th className="border px-1 py-2 text-left font-semibold">PAN of other Person (if TDS PAN/Aadhaar of other person is available)</th>
                    <th className="border px-1 py-2 text-left font-semibold">Section under which TDS brought forward (b/f)</th>
                    <th className="border px-1 py-2 text-left font-semibold">Unclaimed TDS brought forward (Financial Year in which TDS deducted)</th>
                    <th className="border px-1 py-2 text-left font-semibold">TDS of the current Financial Year (TDS Deducted during FY 2024-25)</th>
                    <th className="border px-1 py-2 text-left font-semibold">TDS credit being claimed this year only (corresponding income is being offered for tax this year only)</th>
                    <th className="border px-1 py-2 text-left font-semibold">TDS credit being claimed this year only if TDS is deducted u/s 194A)</th>
                    <th className="border px-1 py-2 text-left font-semibold">Claimed in the hands of any other person as per rule 37B(1) (if applicable)</th>
                    <th className="border px-1 py-2 text-left font-semibold">Gross Amount of Income</th>
                    <th className="border px-1 py-2 text-left font-semibold">Head of Income</th>
                    <th className="border px-1 py-2 text-center font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tdsDetails.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50">
                      <td className="border px-1 py-2 text-center">
                        <span className="text-xs">{row.slNo}</span>
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.tdsCredit}
                          onChange={(e) =>
                            updateTDSDetail(index, "tdsCredit", e.target.value)
                          }
                          placeholder="TDS Credit"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.taxDeduction}
                          onChange={(e) =>
                            updateTDSDetail(index, "taxDeduction", e.target.value)
                          }
                          placeholder="Tax Deduction"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.panOfPerson}
                          onChange={(e) =>
                            updateTDSDetail(index, "panOfPerson", e.target.value)
                          }
                          placeholder="PAN"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.unclaimedTDS}
                          onChange={(e) =>
                            updateTDSDetail(index, "unclaimedTDS", e.target.value)
                          }
                          placeholder="Section"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.tdsOfCurrent}
                          onChange={(e) =>
                            updateTDSDetail(index, "tdsOfCurrent", e.target.value)
                          }
                          placeholder="TDS B/F"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.tdsOfCurrentFY}
                          onChange={(e) =>
                            updateTDSDetail(index, "tdsOfCurrentFY", e.target.value)
                          }
                          placeholder="TDS Current"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.tdsCredit2}
                          onChange={(e) =>
                            updateTDSDetail(index, "tdsCredit2", e.target.value)
                          }
                          placeholder="TDS Credit"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.claimed}
                          onChange={(e) =>
                            updateTDSDetail(index, "claimed", e.target.value)
                          }
                          placeholder="Claimed"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.claimedInHands}
                          onChange={(e) =>
                            updateTDSDetail(index, "claimedInHands", e.target.value)
                          }
                          placeholder="In Other Hands"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.grossAmount}
                          onChange={(e) =>
                            updateTDSDetail(index, "grossAmount", e.target.value)
                          }
                          placeholder="Gross Amt"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2">
                        <input
                          type="text"
                          value={row.headIncome}
                          onChange={(e) =>
                            updateTDSDetail(index, "headIncome", e.target.value)
                          }
                          placeholder="Head"
                          className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-1 py-2 text-center">
                        {tdsDetails.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTDSRow(index)}
                            className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={addTDSRow}
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
              >
                + Add Row
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-blue-900 mb-2">
                Total TDS (Enter total of column 9 in % of Part B-TTI)
              </label>
              <input
                type="text"
                value={totalTDS}
                onChange={(e) => setTotalTDS(e.target.value)}
                placeholder="Total TDS Amount (Rs.)"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              />
            </div>

            <p className="text-xs text-gray-600 mt-2 italic">
              NOTE: Please enter total of column (9/ii) in % of Part B-TTI
            </p>
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
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleTDS;
