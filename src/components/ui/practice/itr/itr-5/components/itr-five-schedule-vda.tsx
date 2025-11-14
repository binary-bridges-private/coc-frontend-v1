import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface VirtualDigitalAssetTransaction {
  dateOfAcquisition: string;
  dateOfTransfer: string;
  headUnderWhichIncomeToBeIssued: string;
  costOfAcquisition: string;
  considerationReceivedAmount: string;
  considerationReceivedIfGift: string;
  incomeFromTransferVDA: string;
}

export interface ItrFiveScheduleVDAFormData {
  vdaTransactions?: VirtualDigitalAssetTransaction[];
  totalCostOfAcquisition?: string;
  totalConsiderationReceived?: string;
  totalIncomeFromTransfer?: string;
}

// Zod validation schema
const virtualDigitalAssetTransactionSchema = z.object({
  dateOfAcquisition: z.string().optional(),
  dateOfTransfer: z.string().optional(),
  headUnderWhichIncomeToBeIssued: z.string().optional(),
  costOfAcquisition: z.string().optional(),
  considerationReceivedAmount: z.string().optional(),
  considerationReceivedIfGift: z.string().optional(),
  incomeFromTransferVDA: z.string().optional(),
});

const itrFiveScheduleVDASchema = z.object({
  vdaTransactions: z.array(virtualDigitalAssetTransactionSchema).optional(),
  totalCostOfAcquisition: z.string().optional(),
  totalConsiderationReceived: z.string().optional(),
  totalIncomeFromTransfer: z.string().optional(),
});

type ItrFiveScheduleVDAFormType = z.infer<typeof itrFiveScheduleVDASchema>;

interface ItrFiveScheduleVDAProps {
  initialData?: ItrFiveScheduleVDAFormData;
  onSave: (data: ItrFiveScheduleVDAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleVDA: React.FC<ItrFiveScheduleVDAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleVDAFormType>({
    resolver: zodResolver(itrFiveScheduleVDASchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [vdaTransactions, setVDATransactions] = useState<
    VirtualDigitalAssetTransaction[]
  >(
    initialData?.vdaTransactions || [
      {
        dateOfAcquisition: "",
        dateOfTransfer: "",
        headUnderWhichIncomeToBeIssued: "",
        costOfAcquisition: "",
        considerationReceivedAmount: "",
        considerationReceivedIfGift: "",
        incomeFromTransferVDA: "",
      },
    ]
  );

  const [totalCostOfAcquisition, setTotalCostOfAcquisition] = useState(
    initialData?.totalCostOfAcquisition || ""
  );
  const [totalConsiderationReceived, setTotalConsiderationReceived] = useState(
    initialData?.totalConsiderationReceived || ""
  );
  const [totalIncomeFromTransfer, setTotalIncomeFromTransfer] = useState(
    initialData?.totalIncomeFromTransfer || ""
  );

  const onSubmit = (data: ItrFiveScheduleVDAFormType) => {
    onSave({
      vdaTransactions,
      totalCostOfAcquisition,
      totalConsiderationReceived,
      totalIncomeFromTransfer,
    });
  };

  const updateVDATransaction = (
    index: number,
    field: keyof VirtualDigitalAssetTransaction,
    value: string
  ) => {
    const updated = [...vdaTransactions];
    updated[index] = { ...updated[index], [field]: value };
    setVDATransactions(updated);
  };

  const addVDATransactionRow = () => {
    setVDATransactions([
      ...vdaTransactions,
      {
        dateOfAcquisition: "",
        dateOfTransfer: "",
        headUnderWhichIncomeToBeIssued: "",
        costOfAcquisition: "",
        considerationReceivedAmount: "",
        considerationReceivedIfGift: "",
        incomeFromTransferVDA: "",
      },
    ]);
  };

  const removeVDATransactionRow = (index: number) => {
    setVDATransactions(vdaTransactions.filter((_, i) => i !== index));
  };

  const parseNumber = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/,/g, "")) || 0;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-900 mb-2">
            Schedule VDA - Income from Transfer of Virtual Digital Assets
          </h1>
          <p className="text-cyan-700">
            As per section 115BBH (Note: Details of every 'transaction' are to be filled, wherein every 'transfer' is a transaction)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-cyan-100 border-l-4 border-cyan-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-cyan-900">
            <strong>Important:</strong> Provide details of all transactions involving transfer of Virtual Digital Assets (VDAs). 
            Include cost of acquisition, consideration received, and resulting income for tax purposes u/s 115BBH.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section: Virtual Digital Asset Transactions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-6">
              Details of Virtual Digital Asset Transactions
            </h2>

            <div className="space-y-4">
              {vdaTransactions.length === 0 ? (
                <p className="text-gray-500 italic">No VDA transactions added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse bg-white">
                    <thead>
                      <tr className="bg-cyan-100 border-b-2 border-cyan-400">
                        <th className="border px-2 py-3 text-left font-semibold">
                          Date of Acquisition (DD/MM/YYYY)
                        </th>
                        <th className="border px-2 py-3 text-left font-semibold">
                          Date of Transfer (DD/MM/YYYY)
                        </th>
                        <th className="border px-2 py-3 text-left font-semibold">
                          Head under which income to be issued
                        </th>
                        <th className="border px-2 py-3 text-right font-semibold">
                          Cost of Acquisition
                        </th>
                        <th className="border px-2 py-3 text-right font-semibold">
                          Consideration Received (Amount)
                        </th>
                        <th className="border px-2 py-3 text-right font-semibold">
                          In case of gift (amount on which tax is paid u/s 56(2)(x))
                        </th>
                        <th className="border px-2 py-3 text-right font-semibold">
                          Income from transfer of VDA (enter nil in case of loss)
                        </th>
                        <th className="border px-2 py-3 text-center font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {vdaTransactions.map((transaction, index) => (
                        <tr key={index} className="hover:bg-cyan-50">
                          <td className="border px-2 py-3">
                            <input
                              type="text"
                              value={transaction.dateOfAcquisition}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "dateOfAcquisition",
                                  e.target.value
                                )
                              }
                              placeholder="DD/MM/YYYY"
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-3">
                            <input
                              type="text"
                              value={transaction.dateOfTransfer}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "dateOfTransfer",
                                  e.target.value
                                )
                              }
                              placeholder="DD/MM/YYYY"
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-3">
                            <select
                              value={transaction.headUnderWhichIncomeToBeIssued}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "headUnderWhichIncomeToBeIssued",
                                  e.target.value
                                )
                              }
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-xs"
                            >
                              <option value="">Select Head</option>
                              <option value="businessCapitalGain">
                                Business/Capital Gain
                              </option>
                              <option value="capitalGain">Capital Gain</option>
                              <option value="otherIncome">Other Income</option>
                            </select>
                          </td>
                          <td className="border px-2 py-3">
                            <input
                              type="text"
                              value={transaction.costOfAcquisition}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "costOfAcquisition",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-3">
                            <input
                              type="text"
                              value={transaction.considerationReceivedAmount}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "considerationReceivedAmount",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-3">
                            <input
                              type="text"
                              value={transaction.considerationReceivedIfGift}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "considerationReceivedIfGift",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-3">
                            <input
                              type="text"
                              value={transaction.incomeFromTransferVDA}
                              onChange={(e) =>
                                updateVDATransaction(
                                  index,
                                  "incomeFromTransferVDA",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-cyan-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-3 text-center">
                            <button
                              type="button"
                              onClick={() => removeVDATransactionRow(index)}
                              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="button"
                onClick={addVDATransactionRow}
                className="px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-200"
              >
                + Add VDA Transaction
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-cyan-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              Summary Totals
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-cyan-800">
                  Total Cost of Acquisition
                </span>
                <input
                  type="text"
                  value={totalCostOfAcquisition}
                  onChange={(e) => setTotalCostOfAcquisition(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-cyan-300 rounded-lg text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-cyan-800">
                  Total Consideration Received
                </span>
                <input
                  type="text"
                  value={totalConsiderationReceived}
                  onChange={(e) => setTotalConsiderationReceived(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-cyan-300 rounded-lg text-right"
                />
              </div>

              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-cyan-300">
                <span className="font-bold text-lg text-cyan-900">
                  Total Income from Transfer of VDA
                </span>
                <input
                  type="text"
                  value={totalIncomeFromTransfer}
                  onChange={(e) => setTotalIncomeFromTransfer(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-cyan-600 rounded-lg text-right font-bold"
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
              className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleVDA;
