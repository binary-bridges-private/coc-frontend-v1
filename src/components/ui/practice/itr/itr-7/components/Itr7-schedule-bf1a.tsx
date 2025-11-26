import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleBF1AProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleBF1A: React.FC<ScheduleBF1AProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { watch, setValue } = form;

  const bf1a_house_property_income = watch("bf1a_house_property_income");
  const bf1a_house_property_bfl_setoff = watch(
    "bf1a_house_property_bfl_setoff"
  );
  const bf1a_house_property_fa_setoff = watch("bf1a_house_property_fa_setoff");
  const bf1a_house_property_section_354 = watch(
    "bf1a_house_property_section_354"
  );

  useEffect(() => {
    if (
      bf1a_house_property_income ||
      bf1a_house_property_bfl_setoff ||
      bf1a_house_property_fa_setoff ||
      bf1a_house_property_section_354
    ) {
      const afterSetoff =
        (bf1a_house_property_income || 0) -
        (bf1a_house_property_bfl_setoff || 0) -
        (bf1a_house_property_fa_setoff || 0) -
        (bf1a_house_property_section_354 || 0);
      setValue("bf1a_house_property_current", Math.max(0, afterSetoff));
    }
  }, [
    bf1a_house_property_income,
    bf1a_house_property_bfl_setoff,
    bf1a_house_property_fa_setoff,
    bf1a_house_property_section_354,
    setValue,
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule BF1A</h2>
      <p className="text-gray-600 mb-6">
        Details of Income after Set-off of Brought Forward Losses of earlier
        years
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> This schedule shows
            income from various sources after set-off of brought forward losses
            (BFL) from earlier years and other allowances. Enter the income
            after set-off from Schedule CVLA in column 1, then track deductions
            and allowances.
          </p>
        </div>

        <div className="overflow-x-auto border border-gray-300 rounded">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 p-2 text-left font-semibold w-12">
                  Sl. No
                </th>
                <th className="border border-gray-300 p-2 text-left font-semibold">
                  Head/ Source of Income
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Income after set-off, if any, of current year's brought
                  forward loss of Schedule CVLA (1)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Brought forward loss set off (2)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Brought forward: depreciation set off (3)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Brought forward allowance under section 35(4) set off (4)
                </th>
                <th className="border border-gray-300 p-2 text-center font-semibold w-24">
                  Current year's income remaining after set off (5)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  i
                </td>
                <td className="border border-gray-300 p-2">House property</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_house_property_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_house_property_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_house_property_fa_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_house_property_section_354", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_house_property_current", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-calc"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  ii
                </td>
                <td className="border border-gray-300 p-2">
                  Business (excluding Income from Insurance business u/s 115B,
                  speculation income and income from specified business)
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_business_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_business_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_business_fa_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_business_section_354", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_business_current", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  iii
                </td>
                <td className="border border-gray-300 p-2">
                  Profit and gains from life insurance business u/s 115B
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_insurance_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_insurance_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_insurance_current", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  iv
                </td>
                <td className="border border-gray-300 p-2">
                  Speculation Income
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_speculation_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_speculation_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_speculation_current", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  v
                </td>
                <td className="border border-gray-300 p-2">
                  Specified Business Income
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_specified_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_specified_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_specified_current", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  vi
                </td>
                <td className="border border-gray-300 p-2">
                  Short-term capital gain taxable @ 15%
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_stcg_15_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  vii
                </td>
                <td className="border border-gray-300 p-2">
                  Short-term capital gain taxable @ 20%
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_stcg_20_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  viii
                </td>
                <td className="border border-gray-300 p-2">
                  Short-term capital gain taxable @ 30%
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_stcg_30_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  ix
                </td>
                <td className="border border-gray-300 p-2">
                  Short-term capital gain taxable at applicable rates
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_stcg_applicable_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  x
                </td>
                <td className="border border-gray-300 p-2">
                  Short-term capital gain taxable at special rates in India as
                  per DTAA
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_stcg_special_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xi
                </td>
                <td className="border border-gray-300 p-2">
                  Long-term capital gain taxable @ 10%
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_ltcg_10_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xii
                </td>
                <td className="border border-gray-300 p-2">
                  Long-term capital gain taxable @ 12.5%
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_ltcg_12_5_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xiii
                </td>
                <td className="border border-gray-300 p-2">
                  Long-term capital gain taxable @ 20%
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_ltcg_20_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xiv
                </td>
                <td className="border border-gray-300 p-2">
                  Long-term capital gain taxable at special rates in India as
                  per DTAA
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_ltcg_special_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xv
                </td>
                <td className="border border-gray-300 p-2">
                  Net income from other sources chargeable at normal applicable
                  rates
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_os_normal_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_os_normal_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_os_normal_fa_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_os_normal_section_354", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_os_normal_current", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xvi
                </td>
                <td className="border border-gray-300 p-2">
                  Profit from owning and maintaining race horses
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_race_horses_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_race_horses_bfl_setoff", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Set-off"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_race_horses_current", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="After set-off"
                  />
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xvii
                </td>
                <td className="border border-gray-300 p-2">
                  Income from other sources income taxable at special rates in
                  India as per DTAA
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_os_special_income", {
                      valueAsNumber: true,
                    })}
                    className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="From CVLA"
                  />
                </td>
                <td
                  colSpan={4}
                  className="border border-gray-300 p-2 text-center text-gray-500 text-xs"
                >
                  No set-off allowed
                </td>
              </tr>

              <tr className="bg-blue-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xviii
                </td>
                <td className="border border-gray-300 p-2 font-semibold">
                  Total of brought forward loss set off
                </td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_total_bfl_setoff", {
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
                    {...form.register("bf1a_total_fa_setoff", {
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
                    {...form.register("bf1a_total_section_354", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600"
                    placeholder="Auto-sum"
                  />
                </td>
                <td className="border border-gray-300 p-2"></td>
              </tr>

              <tr className="bg-green-50 border-b border-gray-300">
                <td className="border border-gray-300 p-2 text-center font-semibold">
                  xix
                </td>
                <td className="border border-gray-300 p-2 font-semibold">
                  Current year's income remaining after set-off Total of 5i +
                  5ii + 5iii + 5iv + 5v + 5via + 5vib + 5vii + 5viii + 5ix
                </td>
                <td colSpan={5} className="border border-gray-300 p-2">
                  <input
                    type="number"
                    {...form.register("bf1a_total_remaining_income", {
                      valueAsNumber: true,
                    })}
                    disabled
                    className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100 text-gray-600 font-semibold"
                    placeholder="Auto-sum of column 5"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

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

export default ScheduleBF1A;
