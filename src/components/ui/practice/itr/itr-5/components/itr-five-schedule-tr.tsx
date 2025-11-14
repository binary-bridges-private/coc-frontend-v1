import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface TaxReliefDetail {
  slNo: number;
  countryCode: string;
  taxpayerIdentificationNumber: string;
  totalTaxesPaidOutsideIndia: string;
  totalTaxReliefAvailable: string;
  sectionUnderWhichRelief: string;
}

export interface ItrFiveScheduleTRFormData {
  taxReliefDetails?: TaxReliefDetail[];
  totalTaxesPaidOutside?: string;
  totalTaxReliefAvailableDTAA?: string;
  totalTaxReliefAvailableSection91?: string;
  totalTaxRefundedRefunded?: string;
  refundAmountField?: string;
  assessmentYearRefund?: string;
  anyTaxRefundedYesNo?: string;
  refundDetails?: {
    amountRefunded?: string;
    assessmentYearRefund?: string;
  };
}

// Zod validation schema
const taxReliefDetailSchema = z.object({
  slNo: z.number().optional(),
  countryCode: z.string().optional(),
  taxpayerIdentificationNumber: z.string().optional(),
  totalTaxesPaidOutsideIndia: z.string().optional(),
  totalTaxReliefAvailable: z.string().optional(),
  sectionUnderWhichRelief: z.string().optional(),
});

const refundDetailsSchema = z.object({
  amountRefunded: z.string().optional(),
  assessmentYearRefund: z.string().optional(),
});

const itrFiveScheduleTRSchema = z.object({
  taxReliefDetails: z.array(taxReliefDetailSchema).optional(),
  totalTaxesPaidOutside: z.string().optional(),
  totalTaxReliefAvailableDTAA: z.string().optional(),
  totalTaxReliefAvailableSection91: z.string().optional(),
  totalTaxRefundedRefunded: z.string().optional(),
  refundAmountField: z.string().optional(),
  assessmentYearRefund: z.string().optional(),
  anyTaxRefundedYesNo: z.string().optional(),
  refundDetails: refundDetailsSchema.optional(),
});

type ItrFiveScheduleTRFormType = z.infer<typeof itrFiveScheduleTRSchema>;

interface ItrFiveScheduleTRProps {
  initialData?: ItrFiveScheduleTRFormData;
  onSave: (data: ItrFiveScheduleTRFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleTR: React.FC<ItrFiveScheduleTRProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleTRFormType>({
    resolver: zodResolver(itrFiveScheduleTRSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [taxReliefDetails, setTaxReliefDetails] = useState<TaxReliefDetail[]>(
    initialData?.taxReliefDetails || [
      {
        slNo: 1,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        totalTaxesPaidOutsideIndia: "",
        totalTaxReliefAvailable: "",
        sectionUnderWhichRelief: "",
      },
      {
        slNo: 2,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        totalTaxesPaidOutsideIndia: "",
        totalTaxReliefAvailable: "",
        sectionUnderWhichRelief: "",
      },
    ]
  );

  const [totals, setTotals] = useState({
    totalTaxesPaidOutside: initialData?.totalTaxesPaidOutside || "",
    totalTaxReliefAvailableDTAA: initialData?.totalTaxReliefAvailableDTAA || "",
    totalTaxReliefAvailableSection91: initialData?.totalTaxReliefAvailableSection91 || "",
    totalTaxRefundedRefunded: initialData?.totalTaxRefundedRefunded || "",
  });

  const [refundInfo, setRefundInfo] = useState({
    anyTaxRefundedYesNo: initialData?.anyTaxRefundedYesNo || "No",
    refundAmountField: initialData?.refundAmountField || "",
    assessmentYearRefund: initialData?.assessmentYearRefund || "",
  });

  const onSubmit = (data: ItrFiveScheduleTRFormType) => {
    onSave({
      taxReliefDetails,
      ...totals,
      ...refundInfo,
      refundDetails: {
        amountRefunded: refundInfo.refundAmountField,
        assessmentYearRefund: refundInfo.assessmentYearRefund,
      },
    });
  };

  const updateDetail = (
    index: number,
    field: keyof TaxReliefDetail,
    value: string | number
  ) => {
    const updated = [...taxReliefDetails];
    updated[index] = { ...updated[index], [field]: value };
    setTaxReliefDetails(updated);
  };

  const addRow = () => {
    const newSlNo = Math.max(...taxReliefDetails.map((d) => d.slNo), 0) + 1;
    setTaxReliefDetails([
      ...taxReliefDetails,
      {
        slNo: newSlNo,
        countryCode: "",
        taxpayerIdentificationNumber: "",
        totalTaxesPaidOutsideIndia: "",
        totalTaxReliefAvailable: "",
        sectionUnderWhichRelief: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    if (taxReliefDetails.length > 1) {
      setTaxReliefDetails(taxReliefDetails.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Schedule TR - Summary of Tax Relief Claimed for Taxes Paid Outside India
          </h1>
          <p className="text-amber-700">
            Summary of tax relief claimed for taxes paid outside India (applicable only in case of resident)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-amber-900">
            <strong>Important:</strong> This schedule captures summary of tax relief claimed for taxes paid outside India 
            under section 90/90A (DTAA) or section 91, including country-wise details and refund information.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Part 1: Details of Tax Relief Claimed */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-lg font-bold text-amber-900 mb-6">
              1. Details of Tax Relief Claimed
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-amber-200 border-b-2 border-amber-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Country Code (Dropdown)
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Taxpayer Identification Number
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Total taxes paid outside India (total of (c) of Schedule FSI in respect of each country)
                    </th>
                    <th className="border px-2 py-2 text-right font-semibold">
                      Total tax relief available (total of (d) of Schedule FSI in respect of each country)
                    </th>
                    <th className="border px-2 py-2 text-left font-semibold">
                      Section under which relief claimed (specify 90, 90A or 91)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taxReliefDetails.map((row, index) => (
                    <tr key={index} className="hover:bg-amber-50">
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.slNo}
                          disabled
                          className="w-8 px-1 py-1 border border-amber-200 rounded bg-gray-100 text-xs"
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
                          className="w-24 px-1 py-1 border border-amber-200 rounded text-xs"
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
                          className="w-24 px-1 py-1 border border-amber-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.totalTaxesPaidOutsideIndia}
                          onChange={(e) =>
                            updateDetail(index, "totalTaxesPaidOutsideIndia", e.target.value)
                          }
                          placeholder="0"
                          className="w-28 px-1 py-1 border border-amber-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.totalTaxReliefAvailable}
                          onChange={(e) =>
                            updateDetail(index, "totalTaxReliefAvailable", e.target.value)
                          }
                          placeholder="0"
                          className="w-28 px-1 py-1 border border-amber-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select
                          value={row.sectionUnderWhichRelief}
                          onChange={(e) =>
                            updateDetail(index, "sectionUnderWhichRelief", e.target.value)
                          }
                          className="w-full px-1 py-1 border border-amber-200 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="90">90</option>
                          <option value="90A">90A</option>
                          <option value="91">91</option>
                        </select>
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
                className="px-4 py-2 bg-amber-500 text-white rounded text-sm hover:bg-amber-600 transition"
              >
                + Add Row
              </button>
              {taxReliefDetails.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(taxReliefDetails.length - 1)}
                  className="px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  - Remove Row
                </button>
              )}
            </div>
          </div>

          {/* Part 2: Tax Relief Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-lg font-bold text-amber-900 mb-6">
              2. Tax Relief Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-amber-800">Total Tax relief available in respect of country where DTAA is applicable (section 90/90A) [Part of total of 1(d)]</span>
                <input
                  type="text"
                  value={totals.totalTaxReliefAvailableDTAA}
                  onChange={(e) =>
                    setTotals({ ...totals, totalTaxReliefAvailableDTAA: e.target.value })
                  }
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-amber-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-amber-800">Total Tax relief available in respect of country where DTAA is not applicable (section 91) [Part of total of 1(d)]</span>
                <input
                  type="text"
                  value={totals.totalTaxReliefAvailableSection91}
                  onChange={(e) =>
                    setTotals({ ...totals, totalTaxReliefAvailableSection91: e.target.value })
                  }
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-amber-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b bg-amber-50 p-2 rounded">
                <span className="font-bold text-amber-900">Total Taxes Paid Outside India</span>
                <input
                  type="text"
                  value={totals.totalTaxesPaidOutside}
                  onChange={(e) =>
                    setTotals({ ...totals, totalTaxesPaidOutside: e.target.value })
                  }
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-amber-300 rounded text-right font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Part 3: Tax Refund Information */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-lg font-bold text-amber-900 mb-6">
              3. Whether any tax paid outside India on which tax relief was allowed in India, has been refunded/credited by the foreign tax authority during the year? If yes, provide the details below.
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-6 pb-3 border-b">
                <span className="font-semibold text-amber-800">Answer (Yes/No):</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="refundYesNo"
                      value="Yes"
                      checked={refundInfo.anyTaxRefundedYesNo === "Yes"}
                      onChange={(e) =>
                        setRefundInfo({
                          ...refundInfo,
                          anyTaxRefundedYesNo: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-amber-800">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="refundYesNo"
                      value="No"
                      checked={refundInfo.anyTaxRefundedYesNo === "No"}
                      onChange={(e) =>
                        setRefundInfo({
                          ...refundInfo,
                          anyTaxRefundedYesNo: e.target.value,
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-amber-800">No</span>
                  </label>
                </div>
              </div>

              {refundInfo.anyTaxRefundedYesNo === "Yes" && (
                <>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold text-amber-800">Amount of tax refunded</span>
                    <input
                      type="text"
                      value={refundInfo.refundAmountField}
                      onChange={(e) =>
                        setRefundInfo({
                          ...refundInfo,
                          refundAmountField: e.target.value,
                        })
                      }
                      placeholder="0"
                      className="w-40 px-3 py-2 border border-amber-200 rounded text-right"
                    />
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-semibold text-amber-800">Assessment year in which tax relief was allowed in India</span>
                    <input
                      type="text"
                      value={refundInfo.assessmentYearRefund}
                      onChange={(e) =>
                        setRefundInfo({
                          ...refundInfo,
                          assessmentYearRefund: e.target.value,
                        })
                      }
                      placeholder="AY"
                      className="w-40 px-3 py-2 border border-amber-200 rounded text-right"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
            <h3 className="font-bold text-amber-900 mb-2">Important Notes:</h3>
            <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
              <li>This schedule is only for residents claiming tax relief on taxes paid outside India</li>
              <li>Include all countries where you earned income and paid taxes</li>
              <li>Reference relevant section: 90 (DTAA applicable), 90A (DTAA applicable), or 91 (No DTAA)</li>
              <li>Report any refunds of foreign taxes received in this assessment year</li>
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
              className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleTR;
