import React from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface Itr7ScheduleMATCProps {
  register: UseFormRegister<ITR7FormData>;
  watch: UseFormWatch<ITR7FormData>;
}

export const Itr7ScheduleMATCC: React.FC<Itr7ScheduleMATCProps> = ({
  register,
  watch,
}) => {
  const assessmentYears = [
    { year: "2009-10", label: "i", rowPrefix: "2009_10" },
    { year: "2010-11", label: "ii", rowPrefix: "2010_11" },
    { year: "2011-12", label: "iii", rowPrefix: "2011_12" },
    { year: "2012-13", label: "iv", rowPrefix: "2012_13" },
    { year: "2013-14", label: "v", rowPrefix: "2013_14" },
    { year: "2014-15", label: "vi", rowPrefix: "2014_15" },
    { year: "2015-16", label: "vii", rowPrefix: "2015_16" },
    { year: "2016-17", label: "viii", rowPrefix: "2016_17" },
    { year: "2017-18", label: "ix", rowPrefix: "2017_18" },
    { year: "2018-19", label: "x", rowPrefix: "2018_19" },
    { year: "2019-20", label: "xi", rowPrefix: "2019_20" },
    { year: "2020-21", label: "xii", rowPrefix: "2020_21" },
    { year: "2021-22", label: "xiii", rowPrefix: "2021_22" },
    { year: "2022-23", label: "xiv", rowPrefix: "2022_23" },
    { year: "2023-24", label: "xv", rowPrefix: "2023_24" },
    { year: "2024-25", label: "xvi", rowPrefix: "2024_25" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Schedule MATC - Computation of MAT Credit under section 115JAA
      </h2>

      <div className="overflow-x-auto space-y-6">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold w-32">
                1
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Tax under section 115JB in assessment year 2025-26 (14 of
                Part-B-ITI)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  {...register("matc_tax_2025_26" as any, {
                    valueAsNumber: true,
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                2
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Tax under other provisions of the Act in assessment year 2025-26
                (2 of Part-B-ITI)
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  {...register("matc_tax_2025_26_part_b" as any, {
                    valueAsNumber: true,
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                3
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Amount of tax against which credit is available [enter (2 - 1) /
                2 is greater than 1, otherwise enter 0]
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  {...register("matc_amount_against_credit" as any, {
                    valueAsNumber: true,
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="border border-gray-300 rounded overflow-hidden">
          <div className="bg-gray-100 p-4 font-semibold">
            4. Utilisation of MAT credit Available [Sum of MAT credit utilized
            during the current year is subject to maximum of amount mentioned in
            3 above and opening / Cr. on balance ]
          </div>

          <table className="w-full border-collapse border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  S.No
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  Assessment Year (A)
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  MAT Credit Gross (B1)
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  Set-off in earlier years (B2)
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  Balance Brought forward (B3)=(B2)-(B1)
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  MAT Credit Utilised during the Current Year (C)
                </th>
                <th className="border border-gray-300 px-2 py-2 text-center font-semibold">
                  Balance AT Credit Carried forward (D)= (B3) - (C)
                </th>
              </tr>
            </thead>
            <tbody>
              {assessmentYears.map((ay) => (
                <tr key={ay.rowPrefix} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    {ay.label}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {ay.year}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      {...register(`matc_row_${ay.rowPrefix}_gross` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      {...register(`matc_row_${ay.rowPrefix}_setoff` as any, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {Math.max(
                      0,
                      (watch(`matc_row_${ay.rowPrefix}_setoff` as any) || 0) -
                        (watch(`matc_row_${ay.rowPrefix}_gross` as any) || 0)
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <input
                      type="number"
                      {...register(
                        `matc_row_${ay.rowPrefix}_credit_utilized` as any,
                        { valueAsNumber: true }
                      )}
                      className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                      placeholder="0"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center font-semibold">
                    {Math.max(
                      0,
                      Math.max(
                        0,
                        (watch(`matc_row_${ay.rowPrefix}_setoff` as any) || 0) -
                          (watch(`matc_row_${ay.rowPrefix}_gross` as any) || 0)
                      ) -
                        (watch(
                          `matc_row_${ay.rowPrefix}_credit_utilized` as any
                        ) || 0)
                    )}
                  </td>
                </tr>
              ))}

              <tr className="bg-yellow-50 font-semibold hover:bg-yellow-100">
                <td className="border border-gray-300 px-2 py-1 text-center">
                  xvii
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  2025-26[(sl no 1-Sl no 2 of(+3+4) of Schedule Part-B-ITI, only
                  if positive)]
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    {...register("matc_row_2025_26_gross" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    {...register("matc_row_2025_26_setoff" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {Math.max(
                    0,
                    (watch("matc_row_2025_26_setoff" as any) || 0) -
                      (watch("matc_row_2025_26_gross" as any) || 0)
                  )}
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    type="number"
                    {...register("matc_row_2025_26_balance" as any, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center font-bold">
                  {Math.max(
                    0,
                    Math.max(
                      0,
                      (watch("matc_row_2025_26_setoff" as any) || 0) -
                        (watch("matc_row_2025_26_gross" as any) || 0)
                    ) - (watch("matc_row_2025_26_balance" as any) || 0)
                  )}
                </td>
              </tr>

              <tr className="bg-gray-200 font-bold">
                <td
                  colSpan={5}
                  className="border border-gray-300 px-2 py-2 text-right"
                >
                  Total
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  {assessmentYears
                    .reduce((sum, ay) => {
                      return (
                        sum +
                        (watch(
                          `matc_row_${ay.rowPrefix}_credit_utilized` as any
                        ) || 0)
                      );
                    }, 0)
                    .toLocaleString()}
                </td>
                <td className="border border-gray-300 px-2 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <table className="w-full border-collapse border border-gray-300 text-sm">
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold w-12">
                5
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Amount of tax credit under section 115JAA utilised during the
                year [enter 4(C)sviii]
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  {...register("matc_total_mat_utilized" as any, {
                    valueAsNumber: true,
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </td>
            </tr>

            <tr className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                6
              </td>
              <td className="border border-gray-300 px-4 py-2">
                Amount of MAT liability available for credit in subsequent
                assessment years [enter 4(D)sviii]
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  {...register("matc_total_liability" as any, {
                    valueAsNumber: true,
                  })}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder="0"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> MAT credit is available for 15 assessment years
          from the year in which the MAT liability arose. The credit can be
          utilized only against regular income-tax liability. Credits are
          carried forward and can be used until the end of the 15-year period.
        </p>
      </div>
    </div>
  );
};
