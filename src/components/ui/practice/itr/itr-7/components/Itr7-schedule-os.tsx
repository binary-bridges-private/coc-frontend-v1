import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleOSProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleOS: React.FC<ScheduleOSProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const os_dividends_gross = watch("os_dividends_gross");
  const os_dividend_other_than_iii = watch("os_dividend_other_than_iii");
  const os_dividend_2_22_c = watch("os_dividend_2_22_c");
  const os_dividend_2_22_f = watch("os_dividend_2_22_f");

  // Part a - Dividends Gross (1a = iii + ai + aii + aiii + aiv)
  useEffect(() => {
    if (
      os_dividend_other_than_iii ||
      os_dividend_2_22_c ||
      os_dividend_2_22_f
    ) {
      const total =
        (os_dividend_other_than_iii || 0) +
        (os_dividend_2_22_c || 0) +
        (os_dividend_2_22_f || 0);
      setValue("os_dividends_gross", total);
    }
  }, [
    os_dividend_other_than_iii,
    os_dividend_2_22_c,
    os_dividend_2_22_f,
    setValue,
  ]);

  // Watch for interest and rental income calculations
  const os_interest_savings = watch("os_interest_savings");
  const os_interest_deposits = watch("os_interest_deposits");
  const os_interest_tax_refund = watch("os_interest_tax_refund");
  const os_interest_pass_through = watch("os_interest_pass_through");
  const os_interest_others = watch("os_interest_others");

  // Part b - Interest Gross (1b = bi + bii + biii + biv + bv)
  useEffect(() => {
    if (
      os_interest_savings ||
      os_interest_deposits ||
      os_interest_tax_refund ||
      os_interest_pass_through ||
      os_interest_others
    ) {
      const total =
        (os_interest_savings || 0) +
        (os_interest_deposits || 0) +
        (os_interest_tax_refund || 0) +
        (os_interest_pass_through || 0) +
        (os_interest_others || 0);
      setValue("os_interest_gross", total);
    }
  }, [
    os_interest_savings,
    os_interest_deposits,
    os_interest_tax_refund,
    os_interest_pass_through,
    os_interest_others,
    setValue,
  ]);

  const os_rental_machinery = watch("os_rental_machinery");

  // Part d - Income u/s 56(2)(x)
  const os_56_2_x_aggregate = watch("os_56_2_x_aggregate");
  const os_56_2_x_immovable_no_consideration = watch(
    "os_56_2_x_immovable_no_consideration"
  );
  const os_56_2_x_immovable_inadequate = watch(
    "os_56_2_x_immovable_inadequate"
  );
  const os_56_2_x_other_property_no_consideration = watch(
    "os_56_2_x_other_property_no_consideration"
  );
  const os_56_2_x_other_property_inadequate = watch(
    "os_56_2_x_other_property_inadequate"
  );

  // Calculate part d total (1d)
  useEffect(() => {
    if (
      os_56_2_x_aggregate ||
      os_56_2_x_immovable_no_consideration ||
      os_56_2_x_immovable_inadequate ||
      os_56_2_x_other_property_no_consideration ||
      os_56_2_x_other_property_inadequate
    ) {
      const total =
        (os_56_2_x_aggregate || 0) +
        (os_56_2_x_immovable_no_consideration || 0) +
        (os_56_2_x_immovable_inadequate || 0) +
        (os_56_2_x_other_property_no_consideration || 0) +
        (os_56_2_x_other_property_inadequate || 0);
      setValue("os_56_2_x_total", total);
    }
  }, [
    os_56_2_x_aggregate,
    os_56_2_x_immovable_no_consideration,
    os_56_2_x_immovable_inadequate,
    os_56_2_x_other_property_no_consideration,
    os_56_2_x_other_property_inadequate,
    setValue,
  ]);

  // Part 1e - Any other income (please specify)
  const os_other_income_amount_1 = watch("os_other_income_amount_1");
  const os_other_income_nature_1 = watch("os_other_income_nature_1");

  // Part 2 - Income chargeable at special rates (2ai + 2aii + 2b + 2c related)
  const os_special_rate_2ai = watch("os_special_rate_2ai");
  const os_special_rate_2aii = watch("os_special_rate_2aii");
  const os_special_rate_2b = watch("os_special_rate_2b");
  const os_special_rate_2bi = watch("os_special_rate_2bi");
  const os_special_rate_2bii = watch("os_special_rate_2bii");
  const os_special_rate_2biii = watch("os_special_rate_2biii");
  const os_special_rate_2biv = watch("os_special_rate_2biv");
  const os_special_rate_2bv = watch("os_special_rate_2bv");
  const os_special_rate_2c = watch("os_special_rate_2c");

  useEffect(() => {
    if (
      os_special_rate_2ai ||
      os_special_rate_2aii ||
      os_special_rate_2b ||
      os_special_rate_2bi ||
      os_special_rate_2bii ||
      os_special_rate_2biii ||
      os_special_rate_2biv ||
      os_special_rate_2bv ||
      os_special_rate_2c
    ) {
      const total =
        (os_special_rate_2ai || 0) +
        (os_special_rate_2aii || 0) +
        (os_special_rate_2b || 0) +
        (os_special_rate_2bi || 0) +
        (os_special_rate_2bii || 0) +
        (os_special_rate_2biii || 0) +
        (os_special_rate_2biv || 0) +
        (os_special_rate_2bv || 0) +
        (os_special_rate_2c || 0);
      setValue("os_special_rate_2_total", total);
    }
  }, [
    os_special_rate_2ai,
    os_special_rate_2aii,
    os_special_rate_2b,
    os_special_rate_2bi,
    os_special_rate_2bii,
    os_special_rate_2biii,
    os_special_rate_2biv,
    os_special_rate_2bv,
    os_special_rate_2c,
    setValue,
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Schedule OS - Income from Other Sources
      </h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            1. Gross income chargeable to tax at normal applicable rates (1a +
            1b + 1c + 1d + 1e)
          </h3>

          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-700 mb-4">
              a. Dividends, Gross (1a + aii + aiii)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  i. Dividend income other than (ii) and (iii)
                </label>
                <input
                  type="number"
                  {...form.register("os_dividend_other_than_iii", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ii. Dividend income u/s 2(22)(c)
                </label>
                <input
                  type="number"
                  {...form.register("os_dividend_2_22_c", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="aii"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  iii. Dividend income u/s 2(22)(f)
                </label>
                <input
                  type="number"
                  {...form.register("os_dividend_2_22_f", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="aiii"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1a. Gross Dividends
                </label>
                <input
                  type="number"
                  {...form.register("os_dividends_gross", {
                    valueAsNumber: true,
                  })}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                  placeholder="1a (Auto-calculated)"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-700 mb-4">
              b. Interest, Gross (1b = bii + biii + biv + bv)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  i. From Savings Bank
                </label>
                <input
                  type="number"
                  {...form.register("os_interest_savings", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="bi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ii. From Deposits (Bank/ Post Office/ Co-operative Society)
                </label>
                <input
                  type="number"
                  {...form.register("os_interest_deposits", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="bii"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  iii. From Income-tax Refund
                </label>
                <input
                  type="number"
                  {...form.register("os_interest_tax_refund", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="biii"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  iv. In the nature of Pass through income/Loss
                </label>
                <input
                  type="number"
                  {...form.register("os_interest_pass_through", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="biv"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  v. Others
                </label>
                <input
                  type="number"
                  {...form.register("os_interest_others", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="bv"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1b. Gross Interest
                </label>
                <input
                  type="number"
                  {...form.register("os_interest_gross", {
                    valueAsNumber: true,
                  })}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                  placeholder="1b (Auto-calculated)"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-700 mb-4">
              c. Rental income from machinery, plants, buildings, etc., Gross
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1c. Rental Income
              </label>
              <input
                type="number"
                {...form.register("os_rental_machinery", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1c"
              />
            </div>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-700 mb-4">
              d. Income of the nature referred to in section 56(2)(x) which is
              chargeable to tax (di + dii + diii + div + dv)
            </h4>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                i. Aggregate value of sum of money received without
                consideration
              </label>
              <input
                type="number"
                {...form.register("os_56_2_x_aggregate", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="di"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ii. In case immovable property is received without
                consideration, stamp duty value of property
              </label>
              <input
                type="number"
                {...form.register("os_56_2_x_immovable_no_consideration", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="dii"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                iii. In case immovable property is received for inadequate
                consideration, stamp duty value of property in excess of such
                consideration
              </label>
              <input
                type="number"
                {...form.register("os_56_2_x_immovable_inadequate", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="diii"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                iv. In case any other property is received without
                consideration, fair market value of property
              </label>
              <input
                type="number"
                {...form.register("os_56_2_x_other_property_no_consideration", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="div"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                v. In case any other property is received for inadequate
                consideration, fair market value of property in excess of such
                consideration
              </label>
              <input
                type="number"
                {...form.register("os_56_2_x_other_property_inadequate", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="dv"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1d. Total u/s 56(2)(x)
              </label>
              <input
                type="number"
                {...form.register("os_56_2_x_total", { valueAsNumber: true })}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                placeholder="1d (Auto-calculated)"
              />
            </div>
          </div>

          <div className="mb-6 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold text-gray-700 mb-4">
              1e. Any other income (please specify nature)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nature of Income
                </label>
                <input
                  type="text"
                  {...form.register("os_other_income_nature_1")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Specify"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  {...form.register("os_other_income_amount_1", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1e"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            2. Income chargeable at special rates (2ai + 2aii + 2b + 2c related
            to u/no.1)
          </h3>

          <div className="bg-gray-50 p-4 rounded space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ai. Winnings from lotteries, crossword puzzles, races, card
                games etc. chargeable u/s 115BB
              </label>
              <input
                type="number"
                {...form.register("os_special_rate_2ai", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="2ai"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                aii. Income by way of winnings from online games chargeable u/s
                115BJ
              </label>
              <input
                type="number"
                {...form.register("os_special_rate_2aii", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="2aii"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                b. Income chargeable u/s 115BBE (bi + bii + biii + biv + bv +
                bvi)
              </label>
              <input
                type="number"
                {...form.register("os_special_rate_2b", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="2b"
              />
            </div>

            <div className="ml-4 space-y-3 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  i. Cash credits u/s 68
                </label>
                <input
                  type="number"
                  {...form.register("os_special_rate_2bi", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="bi"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  ii. Unexplained investments u/s 69
                </label>
                <input
                  type="number"
                  {...form.register("os_special_rate_2bii", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="bii"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  iii. Unexplained money etc. u/s 69A
                </label>
                <input
                  type="number"
                  {...form.register("os_special_rate_2biii", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="biii"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  iv. Undisclosed investments etc. u/s 69B
                </label>
                <input
                  type="number"
                  {...form.register("os_special_rate_2biv", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="biv"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  v. Unexplained expenditure etc. u/s 69C
                </label>
                <input
                  type="number"
                  {...form.register("os_special_rate_2bv", {
                    valueAsNumber: true,
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="bv"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                c. Any other income chargeable at special rate (total of ci to
                cxxiii)
              </label>
              <input
                type="number"
                {...form.register("os_special_rate_2c", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="2c"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. Total income chargeable at special rates
              </label>
              <input
                type="number"
                {...form.register("os_special_rate_2_total", {
                  valueAsNumber: true,
                })}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                placeholder="2 (Auto-calculated)"
              />
            </div>
          </div>
        </div>

        <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            3. Deductions under section 57 (other than those relating to income
            chargeable at special rates under 2a, 2b, 2c & 2d)
          </h3>

          <div className="bg-gray-50 p-4 rounded space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                a. Expenses / Deductions (Other than entered in C)
              </label>
              <input
                type="number"
                {...form.register("os_deductions_expenses", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="3a"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                b. Depreciation (available only if income offered in 1c)
              </label>
              <input
                type="number"
                {...form.register("os_deductions_depreciation", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="3b"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                c. Interest expenditure on dividend u/s 57(1) (only if income
                offered in 1a(i)) and/or 1a(iii))
              </label>
              <input
                type="number"
                {...form.register("os_deductions_interest", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="3c"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                d. Eligible interest expenditure u/s 57(1) - computed value
              </label>
              <input
                type="number"
                {...form.register("os_deductions_eligible_interest", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="3d"
              />
            </div>
          </div>
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

export default ScheduleOS;
