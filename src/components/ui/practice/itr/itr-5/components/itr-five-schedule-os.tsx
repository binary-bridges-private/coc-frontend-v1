import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface OtherSourceIncome {
  slNo: string;
  natureOfIncome: string;
  amount: string;
  itemNumber: string;
  countryCode: string;
  articleReference: string;
  ratePerTreatyDTAA: string;
  whetherTBC: string;
  sectionUnderITA: string;
  rateApplicable: string;
  applicableLowerTaxOrCustomary: string;
}

export interface OtherSourceAccrualDetail {
  dateRange: string;
  otherSourceIncome: string;
  upTo159Amount: string;
  from16To159Amount: string;
  from16To1531Amount: string;
  from16ToSeptember: string;
}

export interface OtherSourceDeduction {
  slNo: string;
  amountOfIncome: string;
  itemNumber: string;
  countryCode: string;
  articleReference: string;
  ratePerTreatyDTAA: string;
  whetherTBC: string;
  sectionUnderITA: string;
  rateApplicable: string;
  applicableLowerTaxOrCustomary: string;
}

export interface ItrFiveScheduleOSFormData {
  otherSourceIncomes?: OtherSourceIncome[];
  otherSourceAccruals?: OtherSourceAccrualDetail[];
  otherSourceDeductions?: OtherSourceDeduction[];
  totalOtherSourceIncome?: string;
}

// Zod validation schema
const otherSourceIncomeSchema = z.object({
  slNo: z.string().optional(),
  natureOfIncome: z.string().optional(),
  amount: z.string().optional(),
  itemNumber: z.string().optional(),
  countryCode: z.string().optional(),
  articleReference: z.string().optional(),
  ratePerTreatyDTAA: z.string().optional(),
  whetherTBC: z.string().optional(),
  sectionUnderITA: z.string().optional(),
  rateApplicable: z.string().optional(),
  applicableLowerTaxOrCustomary: z.string().optional(),
});

const otherSourceAccrualSchema = z.object({
  dateRange: z.string().optional(),
  otherSourceIncome: z.string().optional(),
  upTo159Amount: z.string().optional(),
  from16To159Amount: z.string().optional(),
  from16To1531Amount: z.string().optional(),
  from16ToSeptember: z.string().optional(),
});

const otherSourceDeductionSchema = z.object({
  slNo: z.string().optional(),
  amountOfIncome: z.string().optional(),
  itemNumber: z.string().optional(),
  countryCode: z.string().optional(),
  articleReference: z.string().optional(),
  ratePerTreatyDTAA: z.string().optional(),
  whetherTBC: z.string().optional(),
  sectionUnderITA: z.string().optional(),
  rateApplicable: z.string().optional(),
  applicableLowerTaxOrCustomary: z.string().optional(),
});

const itrFiveScheduleOSSchema = z.object({
  otherSourceIncomes: z.array(otherSourceIncomeSchema).optional(),
  otherSourceAccruals: z.array(otherSourceAccrualSchema).optional(),
  otherSourceDeductions: z.array(otherSourceDeductionSchema).optional(),
  totalOtherSourceIncome: z.string().optional(),
});

type ItrFiveScheduleOSFormType = z.infer<typeof itrFiveScheduleOSSchema>;

interface ItrFiveScheduleOSProps {
  initialData?: ItrFiveScheduleOSFormData;
  onSave: (data: ItrFiveScheduleOSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleOS: React.FC<ItrFiveScheduleOSProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleOSFormType>({
    resolver: zodResolver(itrFiveScheduleOSSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [otherSourceIncomes, setOtherSourceIncomes] = useState<
    OtherSourceIncome[]
  >(
    initialData?.otherSourceIncomes || [
      {
        slNo: "1",
        natureOfIncome: "",
        amount: "",
        itemNumber: "",
        countryCode: "",
        articleReference: "",
        ratePerTreatyDTAA: "",
        whetherTBC: "",
        sectionUnderITA: "",
        rateApplicable: "",
        applicableLowerTaxOrCustomary: "",
      },
    ]
  );

  const [otherSourceAccruals, setOtherSourceAccruals] = useState<
    OtherSourceAccrualDetail[]
  >(
    initialData?.otherSourceAccruals || [
      {
        dateRange: "",
        otherSourceIncome: "",
        upTo159Amount: "",
        from16To159Amount: "",
        from16To1531Amount: "",
        from16ToSeptember: "",
      },
    ]
  );

  const [otherSourceDeductions, setOtherSourceDeductions] = useState<
    OtherSourceDeduction[]
  >(
    initialData?.otherSourceDeductions || [
      {
        slNo: "1",
        amountOfIncome: "",
        itemNumber: "",
        countryCode: "",
        articleReference: "",
        ratePerTreatyDTAA: "",
        whetherTBC: "",
        sectionUnderITA: "",
        rateApplicable: "",
        applicableLowerTaxOrCustomary: "",
      },
    ]
  );

  const [totalOtherSourceIncome, setTotalOtherSourceIncome] = useState(
    initialData?.totalOtherSourceIncome || ""
  );

  const onSubmit = (data: ItrFiveScheduleOSFormType) => {
    onSave({
      otherSourceIncomes,
      otherSourceAccruals,
      otherSourceDeductions,
      totalOtherSourceIncome,
    });
  };

  const updateOtherSourceIncome = (
    index: number,
    field: keyof OtherSourceIncome,
    value: string
  ) => {
    const updated = [...otherSourceIncomes];
    updated[index] = { ...updated[index], [field]: value };
    setOtherSourceIncomes(updated);
  };

  const addOtherSourceIncomeRow = () => {
    setOtherSourceIncomes([
      ...otherSourceIncomes,
      {
        slNo: String(otherSourceIncomes.length + 1),
        natureOfIncome: "",
        amount: "",
        itemNumber: "",
        countryCode: "",
        articleReference: "",
        ratePerTreatyDTAA: "",
        whetherTBC: "",
        sectionUnderITA: "",
        rateApplicable: "",
        applicableLowerTaxOrCustomary: "",
      },
    ]);
  };

  const removeOtherSourceIncomeRow = (index: number) => {
    setOtherSourceIncomes(otherSourceIncomes.filter((_, i) => i !== index));
  };

  const updateOtherSourceAccrual = (
    index: number,
    field: keyof OtherSourceAccrualDetail,
    value: string
  ) => {
    const updated = [...otherSourceAccruals];
    updated[index] = { ...updated[index], [field]: value };
    setOtherSourceAccruals(updated);
  };

  const addOtherSourceAccrualRow = () => {
    setOtherSourceAccruals([
      ...otherSourceAccruals,
      {
        dateRange: "",
        otherSourceIncome: "",
        upTo159Amount: "",
        from16To159Amount: "",
        from16To1531Amount: "",
        from16ToSeptember: "",
      },
    ]);
  };

  const removeOtherSourceAccrualRow = (index: number) => {
    setOtherSourceAccruals(otherSourceAccruals.filter((_, i) => i !== index));
  };

  const updateOtherSourceDeduction = (
    index: number,
    field: keyof OtherSourceDeduction,
    value: string
  ) => {
    const updated = [...otherSourceDeductions];
    updated[index] = { ...updated[index], [field]: value };
    setOtherSourceDeductions(updated);
  };

  const addOtherSourceDeductionRow = () => {
    setOtherSourceDeductions([
      ...otherSourceDeductions,
      {
        slNo: String(otherSourceDeductions.length + 1),
        amountOfIncome: "",
        itemNumber: "",
        countryCode: "",
        articleReference: "",
        ratePerTreatyDTAA: "",
        whetherTBC: "",
        sectionUnderITA: "",
        rateApplicable: "",
        applicableLowerTaxOrCustomary: "",
      },
    ]);
  };

  const removeOtherSourceDeductionRow = (index: number) => {
    setOtherSourceDeductions(otherSourceDeductions.filter((_, i) => i !== index));
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Schedule OS - Income from Other Sources
          </h1>
          <p className="text-amber-700">
            Includes dividends, interest, gifts, winnings, rent from property, and other miscellaneous income
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-amber-900">
            <strong>Important:</strong> Provide complete details of all income from other sources including 
            dividends (domestic & international), interest, gifts, rental income, lottery winnings, 
            and any other income not covered under other schedules.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section A: Gross Income chargeable at normal applicable rates */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-xl font-bold text-amber-900 mb-6">
              A. Gross Income chargeable at normal applicable rates (1st Proviso, 1st + 1st + 1c + 1e)
            </h2>

            <div className="space-y-4">
              {otherSourceIncomes.length === 0 ? (
                <p className="text-gray-500 italic">No income sources added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse bg-white">
                    <thead>
                      <tr className="bg-amber-100 border-b-2 border-amber-400">
                        <th className="border px-2 py-2 text-left">S.No.</th>
                        <th className="border px-2 py-2 text-left">Nature of Income</th>
                        <th className="border px-2 py-2 text-right">Amount</th>
                        <th className="border px-2 py-2 text-left">Item No.</th>
                        <th className="border px-2 py-2 text-left">Country Code</th>
                        <th className="border px-2 py-2 text-left">Article (DTAA)</th>
                        <th className="border px-2 py-2 text-left">Rate per Treaty/DTAA (%)</th>
                        <th className="border px-2 py-2 text-center">TBC</th>
                        <th className="border px-2 py-2 text-left">Section ITA</th>
                        <th className="border px-2 py-2 text-left">Rate Applicable (%)</th>
                        <th className="border px-2 py-2 text-center">Lower/Customary</th>
                        <th className="border px-2 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherSourceIncomes.map((income, index) => (
                        <tr key={index} className="hover:bg-amber-50">
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.slNo}
                              onChange={(e) =>
                                updateOtherSourceIncome(index, "slNo", e.target.value)
                              }
                              placeholder="1"
                              className="w-8 px-1 py-1 border border-amber-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <select
                              value={income.natureOfIncome}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "natureOfIncome",
                                  e.target.value
                                )
                              }
                              className="w-full px-1 py-1 border border-amber-200 rounded text-xs"
                            >
                              <option value="">Select</option>
                              <option value="dividend">Dividend</option>
                              <option value="interest">Interest</option>
                              <option value="gift">Gift</option>
                              <option value="lottery">Lottery</option>
                              <option value="rental">Rental Income</option>
                              <option value="other">Other</option>
                            </select>
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.amount}
                              onChange={(e) =>
                                updateOtherSourceIncome(index, "amount", e.target.value)
                              }
                              placeholder="0"
                              className="w-16 px-1 py-1 border border-amber-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.itemNumber}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "itemNumber",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.countryCode}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "countryCode",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.articleReference}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "articleReference",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.ratePerTreatyDTAA}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "ratePerTreatyDTAA",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <select
                              value={income.whetherTBC}
                              onChange={(e) =>
                                updateOtherSourceIncome(index, "whetherTBC", e.target.value)
                              }
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-xs"
                            >
                              <option value="">-</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.sectionUnderITA}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "sectionUnderITA",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-16 px-1 py-1 border border-amber-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={income.rateApplicable}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "rateApplicable",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <select
                              value={income.applicableLowerTaxOrCustomary}
                              onChange={(e) =>
                                updateOtherSourceIncome(
                                  index,
                                  "applicableLowerTaxOrCustomary",
                                  e.target.value
                                )
                              }
                              className="w-12 px-1 py-1 border border-amber-200 rounded text-xs"
                            >
                              <option value="">-</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeOtherSourceIncomeRow(index)}
                              className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              X
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
                onClick={addOtherSourceIncomeRow}
                className="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition duration-200"
              >
                + Add Income Source
              </button>
            </div>
          </div>

          {/* Section B: Information about accrual/receipt of income from other sources */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
            <h2 className="text-xl font-bold text-amber-900 mb-6">
              B. Information about accrual/receipt of Income from Other Sources (Period-wise)
            </h2>

            <div className="space-y-4">
              {otherSourceAccruals.length === 0 ? (
                <p className="text-gray-500 italic">No accrual details added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse bg-white">
                    <thead>
                      <tr className="bg-orange-100 border-b-2 border-orange-400">
                        <th className="border px-3 py-2 text-left">Period/Date Range</th>
                        <th className="border px-3 py-2 text-left">Other Source Income</th>
                        <th className="border px-3 py-2 text-right">Upto 15/9 (i)</th>
                        <th className="border px-3 py-2 text-right">16/9 to 15/9 (ii)</th>
                        <th className="border px-3 py-2 text-right">16/9 to 15/3 (iii)</th>
                        <th className="border px-3 py-2 text-right">16/3 to 31/3 (iv)</th>
                        <th className="border px-3 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherSourceAccruals.map((accrual, index) => (
                        <tr key={index} className="hover:bg-orange-50">
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.dateRange}
                              onChange={(e) =>
                                updateOtherSourceAccrual(
                                  index,
                                  "dateRange",
                                  e.target.value
                                )
                              }
                              placeholder="E.g., Upto 15/9"
                              className="w-full px-2 py-1 border border-orange-200 rounded text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.otherSourceIncome}
                              onChange={(e) =>
                                updateOtherSourceAccrual(
                                  index,
                                  "otherSourceIncome",
                                  e.target.value
                                )
                              }
                              placeholder="Type"
                              className="w-full px-2 py-1 border border-orange-200 rounded text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.upTo159Amount}
                              onChange={(e) =>
                                updateOtherSourceAccrual(
                                  index,
                                  "upTo159Amount",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-orange-200 rounded text-right text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.from16To159Amount}
                              onChange={(e) =>
                                updateOtherSourceAccrual(
                                  index,
                                  "from16To159Amount",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-orange-200 rounded text-right text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.from16To1531Amount}
                              onChange={(e) =>
                                updateOtherSourceAccrual(
                                  index,
                                  "from16To1531Amount",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-orange-200 rounded text-right text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2">
                            <input
                              type="text"
                              value={accrual.from16ToSeptember}
                              onChange={(e) =>
                                updateOtherSourceAccrual(
                                  index,
                                  "from16ToSeptember",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-full px-2 py-1 border border-orange-200 rounded text-right text-sm"
                            />
                          </td>
                          <td className="border px-3 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeOtherSourceAccrualRow(index)}
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
                onClick={addOtherSourceAccrualRow}
                className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
              >
                + Add Accrual Detail
              </button>
            </div>
          </div>

          {/* Section C: Deductions under Section 57 */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-xl font-bold text-amber-900 mb-6">
              C. Deductions under Section 57 (other than those relating to income chargeable at special rates)
            </h2>

            <div className="space-y-4">
              {otherSourceDeductions.length === 0 ? (
                <p className="text-gray-500 italic">No deductions added yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse bg-white">
                    <thead>
                      <tr className="bg-red-100 border-b-2 border-red-400">
                        <th className="border px-2 py-2 text-left">S.No.</th>
                        <th className="border px-2 py-2 text-right">Amount of Income</th>
                        <th className="border px-2 py-2 text-left">Item No.</th>
                        <th className="border px-2 py-2 text-left">Country</th>
                        <th className="border px-2 py-2 text-left">Article (DTAA)</th>
                        <th className="border px-2 py-2 text-left">Rate per Treaty/DTAA</th>
                        <th className="border px-2 py-2 text-center">TBC</th>
                        <th className="border px-2 py-2 text-left">Section ITA</th>
                        <th className="border px-2 py-2 text-left">Rate Applicable (%)</th>
                        <th className="border px-2 py-2 text-center">Lower/Customary</th>
                        <th className="border px-2 py-2 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherSourceDeductions.map((deduction, index) => (
                        <tr key={index} className="hover:bg-red-50">
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.slNo}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "slNo",
                                  e.target.value
                                )
                              }
                              placeholder="1"
                              className="w-8 px-1 py-1 border border-red-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.amountOfIncome}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "amountOfIncome",
                                  e.target.value
                                )
                              }
                              placeholder="0"
                              className="w-20 px-1 py-1 border border-red-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.itemNumber}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "itemNumber",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-red-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.countryCode}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "countryCode",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-red-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.articleReference}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "articleReference",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-red-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.ratePerTreatyDTAA}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "ratePerTreatyDTAA",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-red-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <select
                              value={deduction.whetherTBC}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "whetherTBC",
                                  e.target.value
                                )
                              }
                              className="w-12 px-1 py-1 border border-red-200 rounded text-xs"
                            >
                              <option value="">-</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.sectionUnderITA}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "sectionUnderITA",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-16 px-1 py-1 border border-red-200 rounded text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2">
                            <input
                              type="text"
                              value={deduction.rateApplicable}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "rateApplicable",
                                  e.target.value
                                )
                              }
                              placeholder="-"
                              className="w-12 px-1 py-1 border border-red-200 rounded text-right text-xs"
                            />
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <select
                              value={deduction.applicableLowerTaxOrCustomary}
                              onChange={(e) =>
                                updateOtherSourceDeduction(
                                  index,
                                  "applicableLowerTaxOrCustomary",
                                  e.target.value
                                )
                              }
                              className="w-12 px-1 py-1 border border-red-200 rounded text-xs"
                            >
                              <option value="">-</option>
                              <option value="yes">Yes</option>
                              <option value="no">No</option>
                            </select>
                          </td>
                          <td className="border px-2 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeOtherSourceDeductionRow(index)}
                              className="px-1 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                            >
                              X
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
                onClick={addOtherSourceDeductionRow}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
              >
                + Add Deduction
              </button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg shadow-lg p-6 border-l-4 border-amber-600">
            <h2 className="text-xl font-bold text-amber-900 mb-4">
              Summary Totals
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-amber-300">
                <span className="font-bold text-lg text-amber-900">
                  Total Other Source Income
                </span>
                <input
                  type="text"
                  value={totalOtherSourceIncome}
                  onChange={(e) => setTotalOtherSourceIncome(e.target.value)}
                  placeholder="0"
                  className="w-40 px-3 py-2 border-2 border-amber-600 rounded-lg text-right font-bold"
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

export default ItrFiveScheduleOS;
