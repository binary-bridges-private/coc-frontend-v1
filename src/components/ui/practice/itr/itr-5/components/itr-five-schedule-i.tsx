import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ScheduleIFund {
  fiscalYear: string;
  amountAccumulated: string;
  purposeOfAccumulation: string;
  amountAppliedForCharitable: string;
  balance: string;
  amountInvested: string;
  balanceAvailable: string;
  amountsAppliedForCharitable: string;
}

export interface ItrFiveScheduleIFormData {
  funds?: ScheduleIFund[];
}

// Zod validation schema
const fundSchema = z.object({
  fiscalYear: z.string().min(1, "Fiscal year required"),
  amountAccumulated: z.string().optional(),
  purposeOfAccumulation: z.string().optional(),
  amountAppliedForCharitable: z.string().optional(),
  balance: z.string().optional(),
  amountInvested: z.string().optional(),
  balanceAvailable: z.string().optional(),
  amountsAppliedForCharitable: z.string().optional(),
});

const itrFiveScheduleISchema = z.object({
  funds: z.array(fundSchema).optional(),
});

type ItrFiveScheduleIFormType = z.infer<typeof itrFiveScheduleISchema>;

interface ItrFiveScheduleIProps {
  initialData?: ItrFiveScheduleIFormData;
  onSave: (data: ItrFiveScheduleIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleI: React.FC<ItrFiveScheduleIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleIFormType>({
    resolver: zodResolver(itrFiveScheduleISchema),
    mode: "onChange",
    defaultValues: initialData || {
      funds: [],
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const formValues = watch();
  const [funds, setFunds] = React.useState<ScheduleIFund[]>(
    initialData?.funds || [
      {
        fiscalYear: "2019-20",
        amountAccumulated: "",
        purposeOfAccumulation: "",
        amountAppliedForCharitable: "",
        balance: "",
        amountInvested: "",
        balanceAvailable: "",
        amountsAppliedForCharitable: "",
      },
      {
        fiscalYear: "2020-21",
        amountAccumulated: "",
        purposeOfAccumulation: "",
        amountAppliedForCharitable: "",
        balance: "",
        amountInvested: "",
        balanceAvailable: "",
        amountsAppliedForCharitable: "",
      },
      {
        fiscalYear: "2021-22",
        amountAccumulated: "",
        purposeOfAccumulation: "",
        amountAppliedForCharitable: "",
        balance: "",
        amountInvested: "",
        balanceAvailable: "",
        amountsAppliedForCharitable: "",
      },
      {
        fiscalYear: "2022-23",
        amountAccumulated: "",
        purposeOfAccumulation: "",
        amountAppliedForCharitable: "",
        balance: "",
        amountInvested: "",
        balanceAvailable: "",
        amountsAppliedForCharitable: "",
      },
      {
        fiscalYear: "2023-24",
        amountAccumulated: "",
        purposeOfAccumulation: "",
        amountAppliedForCharitable: "",
        balance: "",
        amountInvested: "",
        balanceAvailable: "",
        amountsAppliedForCharitable: "",
      },
      {
        fiscalYear: "2024-25",
        amountAccumulated: "",
        purposeOfAccumulation: "",
        amountAppliedForCharitable: "",
        balance: "",
        amountInvested: "",
        balanceAvailable: "",
        amountsAppliedForCharitable: "",
      },
    ]
  );

  // Collect all errors
  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ItrFiveScheduleIFormType) => {
    onSave({
      funds,
    });
  };

  const updateFund = (
    idx: number,
    field: keyof ScheduleIFund,
    value: string
  ) => {
    const updated = [...funds];
    updated[idx][field] = value;
    setFunds(updated);
  };

  const calculateBalance = (idx: number) => {
    const fund = funds[idx];
    const accumulated = parseFloat(fund.amountAccumulated) || 0;
    const applied = parseFloat(fund.amountAppliedForCharitable) || 0;
    return accumulated - applied;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Schedule I - Accumulated/Set Apart Funds
          </h1>
          <p className="text-indigo-700">
            Details of amounts accumulated / set apart within the meaning of section 11(2) or in terms of third proviso to section 10(23C)/10(21)/10(21) read with section 35(1)
          </p>
        </div>

        {/* Error Banner */}
        {allErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="text-red-900 font-bold mb-2">
              ⚠️ Please correct {allErrors.length} error(s):
            </h3>
            <ul className="text-red-800 text-sm space-y-1 max-h-32 overflow-y-auto">
              {allErrors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Funds Table */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">
              Funds Details
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-24">
                      Year of Accumulation (F. Yr.)
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-32">
                      Amount accumulated in the year of accumulation
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-32">
                      Purpose of accumulation
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-28">
                      Amount applied for charitable/religious/Scientific research purposes
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-20">
                      Balance
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-24">
                      Amount invested or deposited in the previous accumulation (if any)
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-24">
                      Balance available for application
                    </th>
                    <th className="border border-gray-300 bg-indigo-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-28">
                      Amounts applied for charitable or religious/Scientific research/social science or statistical research purpose during the previous year out of previous
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((fund, idx) => (
                    <tr key={idx} className="hover:bg-indigo-50">
                      <td className="border border-gray-300 px-2 py-2 text-center text-xs font-medium">
                        {fund.fiscalYear}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={fund.amountAccumulated}
                          onChange={(e) =>
                            updateFund(idx, "amountAccumulated", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={fund.purposeOfAccumulation}
                          onChange={(e) =>
                            updateFund(
                              idx,
                              "purposeOfAccumulation",
                              e.target.value
                            )
                          }
                          placeholder="Describe purpose"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={fund.amountAppliedForCharitable}
                          onChange={(e) =>
                            updateFund(
                              idx,
                              "amountAppliedForCharitable",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <div className="px-1 py-1 text-xs text-right font-medium">
                          {calculateBalance(idx).toFixed(2)}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={fund.amountInvested}
                          onChange={(e) =>
                            updateFund(idx, "amountInvested", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={fund.balanceAvailable}
                          onChange={(e) =>
                            updateFund(idx, "balanceAvailable", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={fund.amountsAppliedForCharitable}
                          onChange={(e) =>
                            updateFund(
                              idx,
                              "amountsAppliedForCharitable",
                              e.target.value
                            )
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-indigo-50 font-semibold">
                    <td colSpan={8} className="border border-gray-300 px-2 py-2 text-center text-xs">
                      Total
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-600 mt-4 italic">
              Note: Balance is calculated as Amount accumulated minus Amount applied for charitable purposes
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
              disabled={!isValid && funds.length === 0}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid || funds.length > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isValid && funds.length === 0}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid || funds.length > 0
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleI;
