import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface AccretedIncomeDetail {
  slNo: number;
  description: string;
  amount: string;
}

export interface ItrFiveScheduleUSTDFormData {
  aggregateFairMarketValue?: string;
  totalLiabilitySpecifiedPerson?: string;
  netValueAssets?: string;
  fmvAcquiredDuringPeriod?: string;
  provisoSectionNote?: string;
  liabilityDeemedIncome?: string;
  fmvTransferredAccordance?: string;
  totalCalculation?: string;
  liabilityRespectAssets?: string;
  accretedIncomeAct?: string;
  additionalIncometaxPayable?: string;
  interestPayableUSTD?: string;
  specifiedDateUSTD?: string;
  additionalTaxAndInterest?: string;
  taxAndInterestPaid?: string;
  netPayableRefundable?: string;
  depositOfTax?: {
    date1?: string;
    date2?: string;
    date3?: string;
    amount1?: string;
    amount2?: string;
    amount3?: string;
  };
  bankDetails?: {
    bankCode?: string;
    serialNumber?: string;
    amountDeposited?: string;
  };
}

// Zod validation schema
const accretedIncomeSchema = z.object({
  slNo: z.number().optional(),
  description: z.string().optional(),
  amount: z.string().optional(),
});

const depositOfTaxSchema = z.object({
  date1: z.string().optional(),
  date2: z.string().optional(),
  date3: z.string().optional(),
  amount1: z.string().optional(),
  amount2: z.string().optional(),
  amount3: z.string().optional(),
});

const bankDetailsSchema = z.object({
  bankCode: z.string().optional(),
  serialNumber: z.string().optional(),
  amountDeposited: z.string().optional(),
});

const itrFiveScheduleUSTDSchema = z.object({
  aggregateFairMarketValue: z.string().optional(),
  totalLiabilitySpecifiedPerson: z.string().optional(),
  netValueAssets: z.string().optional(),
  fmvAcquiredDuringPeriod: z.string().optional(),
  provisoSectionNote: z.string().optional(),
  liabilityDeemedIncome: z.string().optional(),
  fmvTransferredAccordance: z.string().optional(),
  totalCalculation: z.string().optional(),
  liabilityRespectAssets: z.string().optional(),
  accretedIncomeAct: z.string().optional(),
  additionalIncometaxPayable: z.string().optional(),
  interestPayableUSTD: z.string().optional(),
  specifiedDateUSTD: z.string().optional(),
  additionalTaxAndInterest: z.string().optional(),
  taxAndInterestPaid: z.string().optional(),
  netPayableRefundable: z.string().optional(),
  depositOfTax: depositOfTaxSchema.optional(),
  bankDetails: bankDetailsSchema.optional(),
});

type ItrFiveScheduleUSTDFormType = z.infer<typeof itrFiveScheduleUSTDSchema>;

interface ItrFiveScheduleUSTDProps {
  initialData?: ItrFiveScheduleUSTDFormData;
  onSave: (data: ItrFiveScheduleUSTDFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleUSTD: React.FC<ItrFiveScheduleUSTDProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleUSTDFormType>({
    resolver: zodResolver(itrFiveScheduleUSTDSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [formValues, setFormValues] = useState({
    aggregateFairMarketValue: initialData?.aggregateFairMarketValue || "",
    totalLiabilitySpecifiedPerson: initialData?.totalLiabilitySpecifiedPerson || "",
    netValueAssets: initialData?.netValueAssets || "",
    fmvAcquiredDuringPeriod: initialData?.fmvAcquiredDuringPeriod || "",
    provisoSectionNote: initialData?.provisoSectionNote || "",
    liabilityDeemedIncome: initialData?.liabilityDeemedIncome || "",
    fmvTransferredAccordance: initialData?.fmvTransferredAccordance || "",
    totalCalculation: initialData?.totalCalculation || "",
    liabilityRespectAssets: initialData?.liabilityRespectAssets || "",
    accretedIncomeAct: initialData?.accretedIncomeAct || "",
    additionalIncometaxPayable: initialData?.additionalIncometaxPayable || "",
    interestPayableUSTD: initialData?.interestPayableUSTD || "",
    specifiedDateUSTD: initialData?.specifiedDateUSTD || "",
    additionalTaxAndInterest: initialData?.additionalTaxAndInterest || "",
    taxAndInterestPaid: initialData?.taxAndInterestPaid || "",
    netPayableRefundable: initialData?.netPayableRefundable || "",
    depositDate1: initialData?.depositOfTax?.date1 || "",
    depositDate2: initialData?.depositOfTax?.date2 || "",
    depositDate3: initialData?.depositOfTax?.date3 || "",
    depositAmount1: initialData?.depositOfTax?.amount1 || "",
    depositAmount2: initialData?.depositOfTax?.amount2 || "",
    depositAmount3: initialData?.depositOfTax?.amount3 || "",
    bankCode: initialData?.bankDetails?.bankCode || "",
    serialNumber: initialData?.bankDetails?.serialNumber || "",
    amountDeposited: initialData?.bankDetails?.amountDeposited || "",
  });

  const onSubmit = (data: ItrFiveScheduleUSTDFormType) => {
    onSave({
      ...formValues,
      depositOfTax: {
        date1: formValues.depositDate1,
        date2: formValues.depositDate2,
        date3: formValues.depositDate3,
        amount1: formValues.depositAmount1,
        amount2: formValues.depositAmount2,
        amount3: formValues.depositAmount3,
      },
      bankDetails: {
        bankCode: formValues.bankCode,
        serialNumber: formValues.serialNumber,
        amountDeposited: formValues.amountDeposited,
      },
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-900 mb-2">
            Schedule USTD - Accreted Income Under Section 115TD
          </h1>
          <p className="text-purple-700">
            Details of accreted income under section 115TD (Applicable if exemption claimed u/s 11 and 12 or 115TD benefits)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-purple-100 border-l-4 border-purple-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-purple-900">
            <strong>Important:</strong> This schedule captures accreted income computation under section 115TD, 
            including fair market value of assets, deemed income calculations, and associated tax/interest payments.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Part 1: Asset Valuation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-lg font-bold text-purple-900 mb-6">Part 1: Asset Valuation & Computation</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">1. Aggregate Fair Market Value (FMV) of all assets of specified person</span>
                <input
                  type="text"
                  value={formValues.aggregateFairMarketValue}
                  onChange={(e) => handleInputChange("aggregateFairMarketValue", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">2. Less: Total liability of specified person</span>
                <input
                  type="text"
                  value={formValues.totalLiabilitySpecifiedPerson}
                  onChange={(e) => handleInputChange("totalLiabilitySpecifiedPerson", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b bg-purple-50 p-2 rounded">
                <span className="font-bold text-purple-900">3. Net value of assets (1 - 2)</span>
                <input
                  type="text"
                  value={formValues.netValueAssets}
                  onChange={(e) => handleInputChange("netValueAssets", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-purple-300 rounded text-right font-semibold"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">4a. FMV of assets directly acquired out of income during the period</span>
                <input
                  type="text"
                  value={formValues.fmvAcquiredDuringPeriod}
                  onChange={(e) => handleInputChange("fmvAcquiredDuringPeriod", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">4b. Proviso to s. 115(2C), if benefit u/s 11 and 12 or 115(2D)(v)/115(2C)(v) claimed during said period</span>
                <input
                  type="text"
                  value={formValues.provisoSectionNote}
                  onChange={(e) => handleInputChange("provisoSectionNote", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">4c. FMV of assets transferred in accordance with third proviso to section 115TD(2)</span>
                <input
                  type="text"
                  value={formValues.fmvTransferredAccordance}
                  onChange={(e) => handleInputChange("fmvTransferredAccordance", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b bg-purple-50 p-2 rounded">
                <span className="font-bold text-purple-900">Total (4i + 4ii + 4iii)</span>
                <input
                  type="text"
                  value={formValues.totalCalculation}
                  onChange={(e) => handleInputChange("totalCalculation", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-purple-300 rounded text-right font-semibold"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">5. Liability in respect of assets at 4 above</span>
                <input
                  type="text"
                  value={formValues.liabilityRespectAssets}
                  onChange={(e) => handleInputChange("liabilityRespectAssets", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b bg-purple-50 p-2 rounded">
                <span className="font-bold text-purple-900">6. Accreted income as per section 115TD (3 - (4 - 5))</span>
                <input
                  type="text"
                  value={formValues.accretedIncomeAct}
                  onChange={(e) => handleInputChange("accretedIncomeAct", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-purple-300 rounded text-right font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Part 2: Tax & Interest Calculation */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-lg font-bold text-purple-900 mb-6">Part 2: Tax & Interest Payable</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">7. Additional income-tax payable u/s 115TD at maximum marginal rate</span>
                <input
                  type="text"
                  value={formValues.additionalIncometaxPayable}
                  onChange={(e) => handleInputChange("additionalIncometaxPayable", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">8. Interest payable u/s 115TE</span>
                <input
                  type="text"
                  value={formValues.interestPayableUSTD}
                  onChange={(e) => handleInputChange("interestPayableUSTD", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">9. Specified date u/s 115TD</span>
                <input
                  type="date"
                  value={formValues.specifiedDateUSTD}
                  onChange={(e) => handleInputChange("specifiedDateUSTD", e.target.value)}
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b bg-purple-50 p-2 rounded">
                <span className="font-bold text-purple-900">10. Additional income-tax and interest payable (7 + 8)</span>
                <input
                  type="text"
                  value={formValues.additionalTaxAndInterest}
                  onChange={(e) => handleInputChange("additionalTaxAndInterest", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-purple-300 rounded text-right font-semibold"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">11. Tax and interest paid</span>
                <input
                  type="text"
                  value={formValues.taxAndInterestPaid}
                  onChange={(e) => handleInputChange("taxAndInterestPaid", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b bg-purple-50 p-2 rounded">
                <span className="font-bold text-purple-900">12. Net payable/refundable (10 - 11)</span>
                <input
                  type="text"
                  value={formValues.netPayableRefundable}
                  onChange={(e) => handleInputChange("netPayableRefundable", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-purple-300 rounded text-right font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Part 3: Deposit Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-lg font-bold text-purple-900 mb-6">Part 3: Deposit of Tax Details</h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-purple-200 border-b-2 border-purple-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">Date (DD/MM/YYYY)</th>
                    <th className="border px-2 py-2 text-right font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="hover:bg-purple-50">
                      <td className="border px-2 py-2">{i}</td>
                      <td className="border px-2 py-2">
                        <input
                          type="date"
                          value={formValues[`depositDate${i}` as keyof typeof formValues] as string}
                          onChange={(e) =>
                            handleInputChange(`depositDate${i}`, e.target.value)
                          }
                          className="w-full px-1 py-1 border border-purple-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={formValues[`depositAmount${i}` as keyof typeof formValues] as string}
                          onChange={(e) =>
                            handleInputChange(`depositAmount${i}`, e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-purple-200 rounded text-right text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">IFSC/Bank Code</span>
                <input
                  type="text"
                  value={formValues.bankCode}
                  onChange={(e) => handleInputChange("bankCode", e.target.value)}
                  placeholder="Bank Code"
                  className="w-40 px-3 py-2 border border-purple-200 rounded"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">Serial number of Challan</span>
                <input
                  type="text"
                  value={formValues.serialNumber}
                  onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                  placeholder="Serial Number"
                  className="w-40 px-3 py-2 border border-purple-200 rounded"
                />
              </div>

              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-purple-800">Amount deposited</span>
                <input
                  type="text"
                  value={formValues.amountDeposited}
                  onChange={(e) => handleInputChange("amountDeposited", e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border border-purple-200 rounded text-right"
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
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleUSTD;
