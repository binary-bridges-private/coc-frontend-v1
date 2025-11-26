import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleCFLProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleCFL: React.FC<ScheduleCFLProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { watch, setValue, register } = form;

  const hp_losses = [
    watch("cfl_hp_2010_11"),
    watch("cfl_hp_2011_12"),
    watch("cfl_hp_2012_13"),
    watch("cfl_hp_2013_14"),
    watch("cfl_hp_2014_15"),
    watch("cfl_hp_2015_16"),
    watch("cfl_hp_2016_17"),
    watch("cfl_hp_2017_18"),
    watch("cfl_hp_2018_19"),
    watch("cfl_hp_2019_20"),
    watch("cfl_hp_2020_21"),
    watch("cfl_hp_2021_22"),
    watch("cfl_hp_2022_23"),
    watch("cfl_hp_2023_24"),
    watch("cfl_hp_2024_25"),
  ];

  const business_losses = [
    watch("cfl_business_2010_11"),
    watch("cfl_business_2011_12"),
    watch("cfl_business_2012_13"),
    watch("cfl_business_2013_14"),
    watch("cfl_business_2014_15"),
    watch("cfl_business_2015_16"),
    watch("cfl_business_2016_17"),
    watch("cfl_business_2017_18"),
    watch("cfl_business_2018_19"),
    watch("cfl_business_2019_20"),
    watch("cfl_business_2020_21"),
    watch("cfl_business_2021_22"),
    watch("cfl_business_2022_23"),
    watch("cfl_business_2023_24"),
    watch("cfl_business_2024_25"),
  ];

  useEffect(() => {
    const totalHp = hp_losses.reduce(
      (sum: number, val: any) => sum + (Number(val) || 0),
      0
    );
    const totalBusiness = business_losses.reduce(
      (sum: number, val: any) => sum + (Number(val) || 0),
      0
    );

    setValue("cfl_total_hp", totalHp);
    setValue("cfl_total_business", totalBusiness);
  }, [hp_losses, business_losses, setValue]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule CFL</h2>
      <p className="text-gray-600 mb-6">
        Details of Losses to be carried forward to future years
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> This schedule provides
            details of losses and unabsorbed depreciation/allowance to be
            carried forward to future years as per the Income Tax Act. Enter
            assessment years and corresponding loss amounts.
          </p>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-center font-semibold w-12">
                  S. No.
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Assessment Year (A.Y.)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Date of Filing (DD/MM/YY)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  House property loss
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Loss from business other than speculation or specified
                  business
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Brought forward: Amount of unabsorbed depreciation sec 115B a
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Loss from speculative business
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Loss from insurance business u/s 115B
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Loss from business u/s 115B A
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Short-term capital loss
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Long-term capital loss
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold">
                  Loss from other sources (owning and maintaining race horses)
                </th>
              </tr>
            </thead>
            <tbody>
              {/* FY 2010-11 */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  i
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  2010-11
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    {...form.register("cfl_date_2010_11")}
                    placeholder="DD/MM/YY"
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_hp_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_business_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_depreciation_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_speculative_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_insurance_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_insurance_115b_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_stcl_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_ltcl_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_race_horses_2010_11", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>

              {/* FY 2011-12 */}
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  ii
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  2011-12
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    {...form.register("cfl_date_2011_12")}
                    placeholder="DD/MM/YY"
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_hp_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_business_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_depreciation_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_speculative_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_insurance_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_insurance_115b_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_stcl_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_ltcl_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_race_horses_2011_12", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              </tr>

              {/* FY 2012-13 through 2024-25 - 13 more rows */}
              {[
                "2012-13",
                "2013-14",
                "2014-15",
                "2015-16",
                "2016-17",
                "2017-18",
                "2018-19",
                "2019-20",
                "2020-21",
                "2021-22",
                "2022-23",
                "2023-24",
                "2024-25",
              ].map((fy, idx) => {
                const suffix = fy.replace("-", "_");
                const rowNum = idx + 3;
                return (
                  <tr key={fy} className="border-b border-gray-300">
                    <td className="border border-gray-300 p-2 text-center font-semibold">
                      {String.fromCharCode(96 + rowNum)}
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      {fy}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        {...form.register(`cfl_date_${suffix}` as any)}
                        placeholder="DD/MM/YY"
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_hp_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_business_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_depreciation_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_speculative_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_insurance_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(
                          `cfl_insurance_115b_${suffix}` as any,
                          { valueAsNumber: true }
                        )}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_stcl_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_ltcl_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        {...form.register(`cfl_race_horses_${suffix}` as any, {
                          valueAsNumber: true,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                );
              })}

              {/* Total row */}
              <tr className="bg-blue-50 border-b border-gray-300">
                <td
                  colSpan={2}
                  className="border border-gray-300 p-2 font-semibold"
                >
                  Total of earlier year losses b/f
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_hp", { valueAsNumber: true })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_business", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_depreciation", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_speculative", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_insurance", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_insurance_115b", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_stcl", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_ltcl", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("cfl_total_race_horses", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t-2 border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleCFL;
