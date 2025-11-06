import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

interface CarryForwardLoss {
  assessmentYear: string;
  dateOfFiling: string;
  housePropertyLoss: number;
  shortTermCapitalLoss: number;
  longTermCapitalLoss: number;
  raceHorsesLoss: number;
}

interface ItrTwoCflProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const ItrTwoCfl: React.FC<ItrTwoCflProps> = ({
  onSubmit,
  onBack,
  initialData,
}) => {
  const { register, handleSubmit, watch, setValue, control } = useForm({
    defaultValues: initialData || {
      carryForwardLosses: [
        {
          assessmentYear: "2017-18",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2018-19",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2019-20",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2020-21",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2021-22",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2022-23",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2023-24",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
        {
          assessmentYear: "2024-25",
          dateOfFiling: "",
          housePropertyLoss: 0,
          shortTermCapitalLoss: 0,
          longTermCapitalLoss: 0,
          raceHorsesLoss: 0,
          col1: 0,
          col2: 0,
          col3: 0,
          col4: 0,
          col5: 0,
          col6: 0,
        },
      ],
      totalEarlierYearLosses: {
        housePropertyLoss: 0,
        shortTermCapitalLoss: 0,
        longTermCapitalLoss: 0,
        raceHorsesLoss: 0,
      },
      adjustmentBFLA: {
        housePropertyLoss: 0,
        shortTermCapitalLoss: 0,
        longTermCapitalLoss: 0,
        raceHorsesLoss: 0,
      },
      currentYearLosses: {
        housePropertyLoss: 0,
        shortTermCapitalLoss: 0,
        longTermCapitalLoss: 0,
        raceHorsesLoss: 0,
      },
      totalLossCarriedForward: {
        housePropertyLoss: 0,
        shortTermCapitalLoss: 0,
        longTermCapitalLoss: 0,
        raceHorsesLoss: 0,
      },
    },
  });

  const { fields } = useFieldArray<any, "carryForwardLosses">({
    control,
    name: "carryForwardLosses",
  });

  // Calculate total of earlier year losses (sum of rows i to viii)
  const calculateTotalEarlierYearLosses = () => {
    let totalHP = 0;
    let totalST = 0;
    let totalLT = 0;
    let totalRH = 0;

    for (let i = 0; i < 8; i++) {
      totalHP +=
        Number(watch(`carryForwardLosses.${i}.housePropertyLoss`)) || 0;
      totalST +=
        Number(watch(`carryForwardLosses.${i}.shortTermCapitalLoss`)) || 0;
      totalLT +=
        Number(watch(`carryForwardLosses.${i}.longTermCapitalLoss`)) || 0;
      totalRH += Number(watch(`carryForwardLosses.${i}.raceHorsesLoss`)) || 0;
    }

    setValue("totalEarlierYearLosses.housePropertyLoss", totalHP);
    setValue("totalEarlierYearLosses.shortTermCapitalLoss", totalST);
    setValue("totalEarlierYearLosses.longTermCapitalLoss", totalLT);
    setValue("totalEarlierYearLosses.raceHorsesLoss", totalRH);
  };

  // Calculate total loss carried forward to future years
  const calculateTotalLossCarriedForward = () => {
    const totalHP =
      Number(watch("totalEarlierYearLosses.housePropertyLoss")) || 0;
    const adjustHP = Number(watch("adjustmentBFLA.housePropertyLoss")) || 0;
    const currentHP = Number(watch("currentYearLosses.housePropertyLoss")) || 0;

    const totalST =
      Number(watch("totalEarlierYearLosses.shortTermCapitalLoss")) || 0;
    const adjustST = Number(watch("adjustmentBFLA.shortTermCapitalLoss")) || 0;
    const currentST =
      Number(watch("currentYearLosses.shortTermCapitalLoss")) || 0;

    const totalLT =
      Number(watch("totalEarlierYearLosses.longTermCapitalLoss")) || 0;
    const adjustLT = Number(watch("adjustmentBFLA.longTermCapitalLoss")) || 0;
    const currentLT =
      Number(watch("currentYearLosses.longTermCapitalLoss")) || 0;

    const totalRH = Number(watch("totalEarlierYearLosses.raceHorsesLoss")) || 0;
    const adjustRH = Number(watch("adjustmentBFLA.raceHorsesLoss")) || 0;
    const currentRH = Number(watch("currentYearLosses.raceHorsesLoss")) || 0;

    setValue(
      "totalLossCarriedForward.housePropertyLoss",
      totalHP - adjustHP + currentHP
    );
    setValue(
      "totalLossCarriedForward.shortTermCapitalLoss",
      totalST - adjustST + currentST
    );
    setValue(
      "totalLossCarriedForward.longTermCapitalLoss",
      totalLT - adjustLT + currentLT
    );
    setValue(
      "totalLossCarriedForward.raceHorsesLoss",
      totalRH - adjustRH + currentRH
    );
  };

  // Calculate all totals
  const calculateAll = () => {
    calculateTotalEarlierYearLosses();
    calculateTotalLossCarriedForward();
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule CFL - CARRY FORWARD OF LOSS
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Details of losses carried forward from earlier years
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 text-sm text-gray-700">
              <p className="font-semibold">Important Notes:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  House property loss can be carried forward for 8 assessment
                  years
                </li>
                <li>
                  Short-term and long-term capital losses can be carried forward
                  for 8 assessment years
                </li>
                <li>
                  Loss from race horses can be carried forward for 4 assessment
                  years
                </li>
                <li>
                  Enter losses from previous assessment years that are still
                  eligible to be carried forward
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    Sl. No.
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    Assessment Year
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    Date of Filing
                    <br />
                    (DD/MM/YYYY)
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    House property loss
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    Short-term capital loss
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    Long-term Capital loss
                  </th>
                  <th
                    rowSpan={2}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200"
                  >
                    Loss from owning and maintaining race horses
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200 min-w-[120px]">
                    1
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200 min-w-[120px]">
                    2
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200 min-w-[120px]">
                    3
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200 min-w-[120px]">
                    4
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200 min-w-[120px]">
                    5
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-700 min-w-[120px]">
                    6
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {fields.map((field, index) => {
                  const assessmentYears = [
                    "2017-18",
                    "2018-19",
                    "2019-20",
                    "2020-21",
                    "2021-22",
                    "2022-23",
                    "2023-24",
                    "2024-25",
                  ];
                  return (
                    <tr key={field.id}>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                        {
                          ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"][
                            index
                          ]
                        }
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                        {assessmentYears[index]}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="text"
                          {...register(
                            `carryForwardLosses.${index}.dateOfFiling`
                          )}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="DD/MM/YYYY"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(
                            `carryForwardLosses.${index}.housePropertyLoss`
                          )}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(
                            `carryForwardLosses.${index}.shortTermCapitalLoss`
                          )}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(
                            `carryForwardLosses.${index}.longTermCapitalLoss`
                          )}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(
                            `carryForwardLosses.${index}.raceHorsesLoss`
                          )}
                          className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`carryForwardLosses.${index}.col1`)}
                          className="w-full min-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`carryForwardLosses.${index}.col2`)}
                          className="w-full min-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`carryForwardLosses.${index}.col3`)}
                          className="w-full min-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`carryForwardLosses.${index}.col4`)}
                          className="w-full min-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 border-r border-gray-200">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`carryForwardLosses.${index}.col5`)}
                          className="w-full min-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          step="0.01"
                          {...register(`carryForwardLosses.${index}.col6`)}
                          className="w-full min-w-[120px] rounded border border-gray-300 px-3 py-2 text-sm"
                          placeholder="0.00"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200">
                    Sl. No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200">
                    House property loss
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200">
                    Short-term capital loss
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 border-r border-gray-200">
                    Long-term Capital loss
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Loss from owning and maintaining race horses
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="bg-gray-50 font-semibold">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-200">
                    ix
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-200">
                    Total of earlier year losses
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      readOnly
                      {...register("totalEarlierYearLosses.housePropertyLoss")}
                      className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      readOnly
                      {...register(
                        "totalEarlierYearLosses.shortTermCapitalLoss"
                      )}
                      className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      readOnly
                      {...register(
                        "totalEarlierYearLosses.longTermCapitalLoss"
                      )}
                      className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register("totalEarlierYearLosses.raceHorsesLoss")}
                      className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                    x
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                    Adjustment of above losses in Schedule BFLA
                    <br />
                    <span className="text-xs text-gray-600">2025-26</span>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      step="0.01"
                      {...register("adjustmentBFLA.housePropertyLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (2ii of Schedule BFLA)
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      step="0.01"
                      {...register("adjustmentBFLA.shortTermCapitalLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (2iii + 3iii + 4iii + 5iii + 6iii) of item E of Schedule
                      CG
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      step="0.01"
                      {...register("adjustmentBFLA.longTermCapitalLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (7vii + 8vii + 9vii + 10vii) of item E of Schedule
                      CG
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register("adjustmentBFLA.raceHorsesLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (2xi of Schedule BFLA)
                    </div>
                  </td>
                </tr>

                {/* Row xi - Current year losses (2025-26) */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                    xi
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                    <span className="font-bold">2025-26</span> (Current year
                    losses)
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      step="0.01"
                      {...register("currentYearLosses.housePropertyLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (2xv of Schedule CYLA)
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      step="0.01"
                      {...register("currentYearLosses.shortTermCapitalLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (2iii + 3iii + 4iii + 5iii + 6iii) of item E of Schedule
                      CG
                    </div>
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      step="0.01"
                      {...register("currentYearLosses.longTermCapitalLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (7vii + 8vii + 9vii + 10vii) of item E of Schedule CG
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register("currentYearLosses.raceHorsesLoss")}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      (8e of Schedule OS, if –ve)
                    </div>
                  </td>
                </tr>

                {/* Row xii - Total loss carried forward to future years */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-200">
                    xii
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 border-r border-gray-200">
                    Total loss carried forward to future years
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      readOnly
                      {...register("totalLossCarriedForward.housePropertyLoss")}
                      className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-base font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      readOnly
                      {...register(
                        "totalLossCarriedForward.shortTermCapitalLoss"
                      )}
                      className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-base font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3 border-r border-gray-200">
                    <input
                      type="number"
                      readOnly
                      {...register(
                        "totalLossCarriedForward.longTermCapitalLoss"
                      )}
                      className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-base font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register("totalLossCarriedForward.raceHorsesLoss")}
                      className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-base font-bold text-gray-900"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculate All Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={calculateAll}
              className="rounded-lg border border-gray-900 bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Calculate All Totals
            </button>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrTwoCfl;
