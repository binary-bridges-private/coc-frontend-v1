import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface AdvanceTaxDetail {
  slNo: number;
  bsrCode: string;
  dateOfDeposit: string;
  serialNumberOfChallan: string;
  amountRs: string;
}

export interface ItrFiveScheduleTAXFormData {
  advanceTaxDetails?: AdvanceTaxDetail[];
  totalAdvanceTax?: string;
  selfAssessmentTaxDetails?: AdvanceTaxDetail[];
  totalSelfAssessmentTax?: string;
}

// Zod validation schemas
const advanceTaxDetailSchema = z.object({
  slNo: z.number().optional(),
  bsrCode: z.string().optional(),
  dateOfDeposit: z.string().optional(),
  serialNumberOfChallan: z.string().optional(),
  amountRs: z.string().optional(),
});

const itrFiveScheduleTAXSchema = z.object({
  advanceTaxDetails: z.array(advanceTaxDetailSchema).optional(),
  totalAdvanceTax: z.string().optional(),
  selfAssessmentTaxDetails: z.array(advanceTaxDetailSchema).optional(),
  totalSelfAssessmentTax: z.string().optional(),
});

type ItrFiveScheduleTAXFormType = z.infer<typeof itrFiveScheduleTAXSchema>;

interface ItrFiveScheduleTAXProps {
  initialData?: ItrFiveScheduleTAXFormData;
  onSave: (data: ItrFiveScheduleTAXFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleTAX: React.FC<ItrFiveScheduleTAXProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleTAXFormType>({
    resolver: zodResolver(itrFiveScheduleTAXSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [advanceTaxDetails, setAdvanceTaxDetails] = useState<AdvanceTaxDetail[]>(
    initialData?.advanceTaxDetails || [
      {
        slNo: 1,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
      {
        slNo: 2,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
      {
        slNo: 3,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
      {
        slNo: 4,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
    ]
  );

  const [selfAssessmentTaxDetails, setSelfAssessmentTaxDetails] = useState<
    AdvanceTaxDetail[]
  >(
    initialData?.selfAssessmentTaxDetails || [
      {
        slNo: 1,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
      {
        slNo: 2,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
      {
        slNo: 3,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
      {
        slNo: 4,
        bsrCode: "",
        dateOfDeposit: "",
        serialNumberOfChallan: "",
        amountRs: "",
      },
    ]
  );

  const [totalAdvanceTax, setTotalAdvanceTax] = useState(
    initialData?.totalAdvanceTax || ""
  );
  const [totalSelfAssessmentTax, setTotalSelfAssessmentTax] = useState(
    initialData?.totalSelfAssessmentTax || ""
  );

  const onSubmit = (data: ItrFiveScheduleTAXFormType) => {
    onSave({
      advanceTaxDetails,
      totalAdvanceTax,
      selfAssessmentTaxDetails,
      totalSelfAssessmentTax,
    });
  };

  const updateAdvanceTax = (
    index: number,
    field: keyof AdvanceTaxDetail,
    value: string | number
  ) => {
    const updated = [...advanceTaxDetails];
    updated[index] = { ...updated[index], [field]: value };
    setAdvanceTaxDetails(updated);
  };

  const updateSelfAssessmentTax = (
    index: number,
    field: keyof AdvanceTaxDetail,
    value: string | number
  ) => {
    const updated = [...selfAssessmentTaxDetails];
    updated[index] = { ...updated[index], [field]: value };
    setSelfAssessmentTaxDetails(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Schedule TAX - Details of Advance Tax and Self-Assessment Tax Payments
          </h1>
          <p className="text-green-700">
            Record all advance tax and self-assessment tax payments made during the financial year
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-green-100 border-l-4 border-green-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-green-900">
            <strong>Important:</strong> Enter details of all advance tax and self-assessment tax paid during the 
            financial year. Please refer to the challan issued by the bank or ITR-TTI section for verification.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Part A: Advance Tax */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <h2 className="text-lg font-bold text-green-900 mb-6">
              Part A: Details of Payments of Advance Tax and Self-Assessment Tax
            </h2>

            <div className="mb-6">
              <h3 className="text-md font-semibold text-green-900 mb-4">Advance Tax</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse bg-white">
                  <thead>
                    <tr className="bg-green-200 border-b-2 border-green-400">
                      <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                      <th className="border px-2 py-2 text-left font-semibold">BSR Code</th>
                      <th className="border px-2 py-2 text-left font-semibold">Date of Deposit (DD/MM/YYYY)</th>
                      <th className="border px-2 py-2 text-left font-semibold">Serial Number of Challan</th>
                      <th className="border px-2 py-2 text-right font-semibold">Amount (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advanceTaxDetails.map((row, index) => (
                      <tr key={index} className="hover:bg-green-50">
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.slNo}
                            disabled
                            className="w-8 px-1 py-1 border border-green-200 rounded bg-gray-100 text-xs text-center"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.bsrCode}
                            onChange={(e) =>
                              updateAdvanceTax(index, "bsrCode", e.target.value)
                            }
                            placeholder="BSR Code"
                            className="w-20 px-1 py-1 border border-green-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="date"
                            value={row.dateOfDeposit}
                            onChange={(e) =>
                              updateAdvanceTax(index, "dateOfDeposit", e.target.value)
                            }
                            className="w-28 px-1 py-1 border border-green-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.serialNumberOfChallan}
                            onChange={(e) =>
                              updateAdvanceTax(index, "serialNumberOfChallan", e.target.value)
                            }
                            placeholder="Challan #"
                            className="w-24 px-1 py-1 border border-green-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.amountRs}
                            onChange={(e) =>
                              updateAdvanceTax(index, "amountRs", e.target.value)
                            }
                            placeholder="0"
                            className="w-20 px-1 py-1 border border-green-200 rounded text-right text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-green-900 mb-2">
                  Total Advance Tax
                </label>
                <input
                  type="text"
                  value={totalAdvanceTax}
                  onChange={(e) => setTotalAdvanceTax(e.target.value)}
                  placeholder="Enter the totals of Advance tax (Rs.)"
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
                />
              </div>

              <p className="text-xs text-gray-600 mt-2 italic">
                NOTE: Enter the totals of Advance tax and Self-Assessment tax in SL No. 9a & 9d of Part B-TTI
              </p>
            </div>

            <hr className="my-8" />

            <div>
              <h3 className="text-md font-semibold text-green-900 mb-4">Self-Assessment Tax</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse bg-white">
                  <thead>
                    <tr className="bg-green-200 border-b-2 border-green-400">
                      <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                      <th className="border px-2 py-2 text-left font-semibold">BSR Code</th>
                      <th className="border px-2 py-2 text-left font-semibold">Date of Deposit (DD/MM/YYYY)</th>
                      <th className="border px-2 py-2 text-left font-semibold">Serial Number of Challan</th>
                      <th className="border px-2 py-2 text-right font-semibold">Amount (Rs.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selfAssessmentTaxDetails.map((row, index) => (
                      <tr key={index} className="hover:bg-green-50">
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.slNo}
                            disabled
                            className="w-8 px-1 py-1 border border-green-200 rounded bg-gray-100 text-xs text-center"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.bsrCode}
                            onChange={(e) =>
                              updateSelfAssessmentTax(index, "bsrCode", e.target.value)
                            }
                            placeholder="BSR Code"
                            className="w-20 px-1 py-1 border border-green-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="date"
                            value={row.dateOfDeposit}
                            onChange={(e) =>
                              updateSelfAssessmentTax(index, "dateOfDeposit", e.target.value)
                            }
                            className="w-28 px-1 py-1 border border-green-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.serialNumberOfChallan}
                            onChange={(e) =>
                              updateSelfAssessmentTax(
                                index,
                                "serialNumberOfChallan",
                                e.target.value
                              )
                            }
                            placeholder="Challan #"
                            className="w-24 px-1 py-1 border border-green-200 rounded text-xs"
                          />
                        </td>
                        <td className="border px-2 py-2">
                          <input
                            type="text"
                            value={row.amountRs}
                            onChange={(e) =>
                              updateSelfAssessmentTax(index, "amountRs", e.target.value)
                            }
                            placeholder="0"
                            className="w-20 px-1 py-1 border border-green-200 rounded text-right text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-green-900 mb-2">
                  Total Self-Assessment Tax
                </label>
                <input
                  type="text"
                  value={totalSelfAssessmentTax}
                  onChange={(e) => setTotalSelfAssessmentTax(e.target.value)}
                  placeholder="Enter the totals of Self-Assessment tax (Rs.)"
                  className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-semibold"
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
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleTAX;
