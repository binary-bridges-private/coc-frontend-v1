import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ForeignAssetDetail {
  slNo: number;
  country: string;
  zipCode: string;
  accountName: string;
  accountStatus: string;
  accountNumber: string;
  openingBalance: string;
  closingBalance: string;
  grossInterestCredited: string;
  assetType: string;
}

export interface ItrFiveScheduleFAFormData {
  foreignAssetDetails?: ForeignAssetDetail[];
  totalOpeningBalance?: string;
  totalClosingBalance?: string;
  totalGrossInterestCredited?: string;
}

// Zod validation schema
const foreignAssetDetailSchema = z.object({
  slNo: z.number().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  accountName: z.string().optional(),
  accountStatus: z.string().optional(),
  accountNumber: z.string().optional(),
  openingBalance: z.string().optional(),
  closingBalance: z.string().optional(),
  grossInterestCredited: z.string().optional(),
  assetType: z.string().optional(),
});

const itrFiveScheduleFASchema = z.object({
  foreignAssetDetails: z.array(foreignAssetDetailSchema).optional(),
  totalOpeningBalance: z.string().optional(),
  totalClosingBalance: z.string().optional(),
  totalGrossInterestCredited: z.string().optional(),
});

type ItrFiveScheduleFAFormType = z.infer<typeof itrFiveScheduleFASchema>;

interface ItrFiveScheduleFAProps {
  initialData?: ItrFiveScheduleFAFormData;
  onSave: (data: ItrFiveScheduleFAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleFA: React.FC<ItrFiveScheduleFAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleFAFormType>({
    resolver: zodResolver(itrFiveScheduleFASchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const assetTypes = [
    { id: "A1", label: "A. Details of Foreign Depository Accounts" },
    { id: "A2", label: "A. Details of Foreign Custodial Accounts" },
    { id: "B", label: "B. Details of Foreign Equity and Debt Interest" },
    { id: "C", label: "C. Details of Immovable Property" },
    { id: "D", label: "D. Details of any other Capital Asset" },
    { id: "E", label: "E. Details of accounts() in which signing authority held" },
    { id: "F", label: "F. Details of trusts, created outside India" },
    { id: "G", label: "G. Details of any other income derived from outside India" },
  ];

  const [foreignAssets, setForeignAssets] = useState<ForeignAssetDetail[]>(
    initialData?.foreignAssetDetails || [
      {
        slNo: 1,
        country: "",
        zipCode: "",
        accountName: "",
        accountStatus: "",
        accountNumber: "",
        openingBalance: "",
        closingBalance: "",
        grossInterestCredited: "",
        assetType: "A1",
      },
      {
        slNo: 2,
        country: "",
        zipCode: "",
        accountName: "",
        accountStatus: "",
        accountNumber: "",
        openingBalance: "",
        closingBalance: "",
        grossInterestCredited: "",
        assetType: "A1",
      },
      {
        slNo: 3,
        country: "",
        zipCode: "",
        accountName: "",
        accountStatus: "",
        accountNumber: "",
        openingBalance: "",
        closingBalance: "",
        grossInterestCredited: "",
        assetType: "A1",
      },
    ]
  );

  const [totals, setTotals] = useState({
    totalOpeningBalance: initialData?.totalOpeningBalance || "",
    totalClosingBalance: initialData?.totalClosingBalance || "",
    totalGrossInterestCredited: initialData?.totalGrossInterestCredited || "",
  });

  const onSubmit = (data: ItrFiveScheduleFAFormType) => {
    onSave({
      foreignAssetDetails: foreignAssets,
      ...totals,
    });
  };

  const updateAsset = (
    index: number,
    field: keyof ForeignAssetDetail,
    value: string | number
  ) => {
    const updated = [...foreignAssets];
    updated[index] = { ...updated[index], [field]: value };
    setForeignAssets(updated);
  };

  const addRow = () => {
    const newSlNo = Math.max(...foreignAssets.map((a) => a.slNo), 0) + 1;
    setForeignAssets([
      ...foreignAssets,
      {
        slNo: newSlNo,
        country: "",
        zipCode: "",
        accountName: "",
        accountStatus: "",
        accountNumber: "",
        openingBalance: "",
        closingBalance: "",
        grossInterestCredited: "",
        assetType: "A1",
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (foreignAssets.length > 1) {
      setForeignAssets(foreignAssets.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            Schedule FA - Details of Foreign Assets and Income from Any Source Outside India
          </h1>
          <p className="text-blue-700">
            Provide comprehensive details of all foreign assets held during the calendar year
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> This schedule captures all foreign assets including depository accounts, 
            custodial accounts, equity/debt securities, immovable property, and other capital assets held outside India.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section A: Foreign Depository Accounts */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-lg font-bold text-blue-900 mb-6">
              A. Details of Foreign Depository Accounts (including any beneficial interest) at any time during the calendar year ending on 31st December, 2024
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-blue-200 border-b-2 border-blue-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">Country Name</th>
                    <th className="border px-2 py-2 text-left font-semibold">Country Code</th>
                    <th className="border px-2 py-2 text-left font-semibold">Name of Financial Institution</th>
                    <th className="border px-2 py-2 text-left font-semibold">Address of Financial Institution</th>
                    <th className="border px-2 py-2 text-left font-semibold">ZIP Code</th>
                    <th className="border px-2 py-2 text-left font-semibold">Account Number</th>
                    <th className="border px-2 py-2 text-left font-semibold">Status</th>
                    <th className="border px-2 py-2 text-right font-semibold">Opening Balance</th>
                    <th className="border px-2 py-2 text-right font-semibold">Closing Balance</th>
                    <th className="border px-2 py-2 text-right font-semibold">Gross Interest Credited</th>
                  </tr>
                </thead>
                <tbody>
                  {foreignAssets
                    .filter((a) => a.assetType === "A1")
                    .map((asset, index) => (
                      <tr key={index} className="hover:bg-blue-50">
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.slNo}
                            disabled
                            className="w-8 px-1 py-1 border border-blue-200 rounded bg-gray-100 text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.country}
                            onChange={(e) =>
                              updateAsset(index, "country", e.target.value)
                            }
                            placeholder="Country"
                            className="w-20 px-1 py-1 border border-blue-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.zipCode}
                            onChange={(e) =>
                              updateAsset(index, "zipCode", e.target.value)
                            }
                            placeholder="Code"
                            className="w-12 px-1 py-1 border border-blue-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.accountName}
                            onChange={(e) =>
                              updateAsset(index, "accountName", e.target.value)
                            }
                            placeholder="Institution"
                            className="w-24 px-1 py-1 border border-blue-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            placeholder="Address"
                            className="w-24 px-1 py-1 border border-blue-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            placeholder="ZIP"
                            className="w-16 px-1 py-1 border border-blue-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.accountNumber}
                            onChange={(e) =>
                              updateAsset(index, "accountNumber", e.target.value)
                            }
                            placeholder="Account #"
                            className="w-20 px-1 py-1 border border-blue-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <select
                            value={asset.accountStatus}
                            onChange={(e) =>
                              updateAsset(index, "accountStatus", e.target.value)
                            }
                            className="w-20 px-1 py-1 border border-blue-200 rounded text-xs"
                          >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.openingBalance}
                            onChange={(e) =>
                              updateAsset(index, "openingBalance", e.target.value)
                            }
                            placeholder="0"
                            className="w-20 px-1 py-1 border border-blue-200 rounded text-right text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.closingBalance}
                            onChange={(e) =>
                              updateAsset(index, "closingBalance", e.target.value)
                            }
                            placeholder="0"
                            className="w-20 px-1 py-1 border border-blue-200 rounded text-right text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={asset.grossInterestCredited}
                            onChange={(e) =>
                              updateAsset(index, "grossInterestCredited", e.target.value)
                            }
                            placeholder="0"
                            className="w-20 px-1 py-1 border border-blue-200 rounded text-right text-xs"
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
                className="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
              >
                + Add Row
              </button>
              {foreignAssets.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(foreignAssets.length - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  - Remove Row
                </button>
              )}
            </div>
          </div>

          {/* Summary Totals */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-lg font-bold text-blue-900 mb-6">Summary Totals</h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-blue-800">Total Opening Balance</span>
                <input
                  type="text"
                  value={totals.totalOpeningBalance}
                  onChange={(e) =>
                    setTotals({ ...totals, totalOpeningBalance: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-blue-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm font-semibold text-blue-800">Total Closing Balance</span>
                <input
                  type="text"
                  value={totals.totalClosingBalance}
                  onChange={(e) =>
                    setTotals({ ...totals, totalClosingBalance: e.target.value })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border border-blue-300 rounded text-right text-sm"
                />
              </div>

              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-blue-300">
                <span className="font-bold text-blue-900">Total Gross Interest Credited</span>
                <input
                  type="text"
                  value={totals.totalGrossInterestCredited}
                  onChange={(e) =>
                    setTotals({
                      ...totals,
                      totalGrossInterestCredited: e.target.value,
                    })
                  }
                  placeholder="0"
                  className="w-32 px-3 py-2 border-2 border-blue-600 rounded text-right font-bold"
                />
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
            <h3 className="font-bold text-blue-900 mb-2">Important Notes:</h3>
            <ul className="text-sm text-blue-800 space-y-1 ml-4 list-disc">
              <li>Report all foreign assets held at any time during the calendar year</li>
              <li>Include depository, custodial, equity, debt, immovable, and other capital assets</li>
              <li>Report closing balance as on 31st December of the assessment year</li>
              <li>Include beneficial interests held directly or through nominees</li>
              <li>Report all income derived from foreign assets in their respective schedules</li>
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

export default ItrFiveScheduleFA;
