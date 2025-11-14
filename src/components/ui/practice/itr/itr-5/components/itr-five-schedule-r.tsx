import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ReconciliationDetail {
  particular: string;
  corpusRGC: string;
  corpusOtherPost2020: string;
  corpusOther: string;
}

export interface ItrFiveScheduleRFormData {
  closingBalanceScheduleJ?: string;
  reasonOfDifference?: string;
  purchaseOfFixedAsset?: string;
  depreciation?: string;
  otherReason?: string;
  reconciliationDetails?: ReconciliationDetail[];
}

// Zod validation schema
const reconciliationSchema = z.object({
  particular: z.string().optional(),
  corpusRGC: z.string().optional(),
  corpusOtherPost2020: z.string().optional(),
  corpusOther: z.string().optional(),
});

const itrFiveScheduleRSchema = z.object({
  closingBalanceScheduleJ: z.string().optional(),
  reasonOfDifference: z.string().optional(),
  purchaseOfFixedAsset: z.string().optional(),
  depreciation: z.string().optional(),
  otherReason: z.string().optional(),
  reconciliationDetails: z.array(reconciliationSchema).optional(),
});

type ItrFiveScheduleRFormType = z.infer<typeof itrFiveScheduleRSchema>;

interface ItrFiveScheduleRProps {
  initialData?: ItrFiveScheduleRFormData;
  onSave: (data: ItrFiveScheduleRFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleR: React.FC<ItrFiveScheduleRProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleRFormType>({
    resolver: zodResolver(itrFiveScheduleRSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [closingBalanceScheduleJ, setClosingBalanceScheduleJ] = useState(
    initialData?.closingBalanceScheduleJ || ""
  );

  const [reasonOfDifference, setReasonOfDifference] = useState(
    initialData?.reasonOfDifference || ""
  );

  const [purchaseOfFixedAsset, setPurchaseOfFixedAsset] = useState(
    initialData?.purchaseOfFixedAsset || ""
  );

  const [depreciation, setDepreciation] = useState(
    initialData?.depreciation || ""
  );

  const [otherReason, setOtherReason] = useState(
    initialData?.otherReason || ""
  );

  const [reconciliationDetails, setReconciliationDetails] = useState<ReconciliationDetail[]>(
    initialData?.reconciliationDetails || [
      {
        particular: "Closing balance as on 31.03.2023 as per Schedule J",
        corpusRGC: "",
        corpusOtherPost2020: "",
        corpusOther: "",
      },
      {
        particular: "Reasons of difference (-/+) (III+III+III)",
        corpusRGC: "",
        corpusOtherPost2020: "",
        corpusOther: "",
      },
      {
        particular: "0. Purchase of fixed asset",
        corpusRGC: "",
        corpusOtherPost2020: "",
        corpusOther: "",
      },
      {
        particular: "B) Depreciation",
        corpusRGC: "",
        corpusOtherPost2020: "",
        corpusOther: "",
      },
      {
        particular: "III) Any other reason (Please specify)",
        corpusRGC: "",
        corpusOtherPost2020: "",
        corpusOther: "",
      },
    ]
  );

  const onSubmit = (data: ItrFiveScheduleRFormType) => {
    onSave({
      closingBalanceScheduleJ,
      reasonOfDifference,
      purchaseOfFixedAsset,
      depreciation,
      otherReason,
      reconciliationDetails,
    });
  };

  const updateReconciliationDetail = (
    idx: number,
    field: keyof ReconciliationDetail,
    value: string
  ) => {
    const updated = [...reconciliationDetails];
    updated[idx][field] = value;
    setReconciliationDetails(updated);
  };

  const calculateColumnTotal = (
    columnKey: "corpusRGC" | "corpusOtherPost2020" | "corpusOther"
  ): string => {
    const total = reconciliationDetails.reduce((sum, item) => {
      return sum + (parseFloat(item[columnKey]) || 0);
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">
            Schedule R - Reconciliation of Corpus
          </h1>
          <p className="text-emerald-700">
            Reconciliation of Corpus of Schedule J and Balance sheet
          </p>
          <p className="text-xs text-emerald-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Reconciliation Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-600">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">
              Reconciliation of Corpus - Schedule J and Balance Sheet
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-emerald-100">
                  <tr>
                    <th className="border border-gray-300 bg-emerald-200 px-3 py-2 text-left font-semibold text-gray-800 min-w-40">
                      Particulars
                    </th>
                    <th className="border border-gray-300 bg-emerald-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-32">
                      Corpus out of the donations received for renovation or repair of places notified u/s RGC(21D) on or after 01.04.2020<br/>
                      <span className="text-xs font-normal">(1)</span>
                    </th>
                    <th className="border border-gray-300 bg-emerald-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-32">
                      Corpus other than (a) received on or after 01.04.2021<br/>
                      <span className="text-xs font-normal">(2)</span>
                    </th>
                    <th className="border border-gray-300 bg-emerald-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-32">
                      Corpus other than (i) and (ii)<br/>
                      <span className="text-xs font-normal">(3)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reconciliationDetails.map((detail, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50">
                      <td className="border border-gray-300 px-3 py-2 text-xs font-medium">
                        {detail.particular}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={detail.corpusRGC}
                          onChange={(e) =>
                            updateReconciliationDetail(
                              idx,
                              "corpusRGC",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={detail.corpusOtherPost2020}
                          onChange={(e) =>
                            updateReconciliationDetail(
                              idx,
                              "corpusOtherPost2020",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={detail.corpusOther}
                          onChange={(e) =>
                            updateReconciliationDetail(
                              idx,
                              "corpusOther",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-100 font-semibold">
                    <td className="border border-gray-300 px-3 py-2 text-center text-xs">
                      Total
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-xs">
                      {calculateColumnTotal("corpusRGC")}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-xs">
                      {calculateColumnTotal("corpusOtherPost2020")}
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-center text-xs">
                      {calculateColumnTotal("corpusOther")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-600 mt-4 italic">
              Note: Column totals are automatically calculated. Enter amounts in the respective corpus columns.
            </p>
          </div>

          {/* Summary Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-xl font-bold text-emerald-900 mb-4">
              Summary
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Closing balance as on 31.03.2023 as per Schedule J
                </label>
                <input
                  type="text"
                  value={closingBalanceScheduleJ}
                  onChange={(e) => setClosingBalanceScheduleJ(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Reasons of difference (-/+) (III+III+III)
                </label>
                <input
                  type="text"
                  value={reasonOfDifference}
                  onChange={(e) => setReasonOfDifference(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                />
              </div>

              <div className="border-t-2 border-teal-300 pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">Reasons of difference (-/+)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    0) Purchase of fixed asset
                  </label>
                  <input
                    type="text"
                    value={purchaseOfFixedAsset}
                    onChange={(e) => setPurchaseOfFixedAsset(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    B) Depreciation
                  </label>
                  <input
                    type="text"
                    value={depreciation}
                    onChange={(e) => setDepreciation(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    III) Any other reason (Please specify)
                  </label>
                  <textarea
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    placeholder="Specify reason"
                    rows={3}
                    className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
            <h3 className="font-semibold text-emerald-900 mb-2">Instructions:</h3>
            <ul className="text-xs text-emerald-800 space-y-1 list-disc list-inside">
              <li>Enter the closing balance from Schedule J for each corpus category</li>
              <li>Provide reasons for any differences between Schedule J and Balance Sheet</li>
              <li>Specify the nature of fixed assets purchased and depreciation amounts</li>
              <li>If there are other reasons for differences, please specify them in detail</li>
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
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleR;
