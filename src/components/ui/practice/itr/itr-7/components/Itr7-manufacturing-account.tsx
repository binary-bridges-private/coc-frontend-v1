import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types";

interface ManufacturingAccountProps {
  onCancel: () => void;
}

const ManufacturingAccount: React.FC<ManufacturingAccountProps> = ({
  onCancel,
}) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "opening_inventory",
    "purchases",
    "wages",
    "expenses",
    "factory_overheads",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // Watch values for calculations
  const openingRawMaterials = watch("mfg_opening_raw_materials") || 0;
  const openingWIP = watch("mfg_opening_wip") || 0;
  const purchases = watch("mfg_purchases") || 0;
  const purchaseReturns = watch("mfg_purchase_returns") || 0;
  const carriageInward = watch("mfg_carriage_inward") || 0;
  const importDuty = watch("mfg_import_duty") || 0;
  const octroi = watch("mfg_octroi") || 0;
  const otherMaterials = watch("mfg_other_materials_consumed") || 0;
  const closingRawMaterials = watch("mfg_closing_raw_materials") || 0;

  const directWages = watch("mfg_direct_wages") || 0;
  const directExpenses = watch("mfg_direct_expenses_carriage") || 0;
  const powerFuel = watch("mfg_power_and_fuel") || 0;
  const otherDirectExpenses = watch("mfg_other_direct_expenses") || 0;

  const indirectWages = watch("mfg_indirect_wages") || 0;
  const factoryRent = watch("mfg_factory_rent_and_rates") || 0;
  const factoryInsurance = watch("mfg_factory_insurance") || 0;
  const factoryFuelPower = watch("mfg_factory_fuel_and_power") || 0;
  const factoryGeneralExpenses = watch("mfg_factory_general_expenses") || 0;
  const factoryDepreciation = watch("mfg_depreciation_factory_machinery") || 0;

  const closingWIP = watch("mfg_closing_wip") || 0;
  const closingFinishedGoods = watch("mfg_closing_finished_goods") || 0;

  // Calculations
  const costOfMaterialsConsumed =
    openingRawMaterials +
    purchases -
    purchaseReturns +
    carriageInward +
    importDuty +
    octroi +
    otherMaterials -
    closingRawMaterials;

  const totalDirectExpenses = directWages + directExpenses + powerFuel + otherDirectExpenses;

  const costOfGoodsProduced = costOfMaterialsConsumed + totalDirectExpenses;

  const totalFactoryOverheads =
    indirectWages +
    factoryRent +
    factoryInsurance +
    factoryFuelPower +
    factoryGeneralExpenses +
    factoryDepreciation;

  const totalDebitsToManufacturing =
    costOfGoodsProduced + totalFactoryOverheads + openingWIP;

  const costOfGoodsManufactured = totalDebitsToManufacturing - closingWIP;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <form onSubmit={(e) => e.preventDefault()} className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            PART A - MANUFACTURING ACCOUNT
          </h1>
          <p className="text-gray-600 text-sm">
            For the financial year 2024-25 (Fill items 1 to 3 in a case where regular books of account are maintained, otherwise fill items 6i to 62 as applicable)
          </p>
        </div>

        {/* DEBITS TO MANUFACTURING ACCOUNT */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">
            1. DEBITS TO MANUFACTURING ACCOUNT
          </h2>

          {/* A. Opening Inventory */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("opening_inventory")}
              className="w-full px-6 py-4 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-between font-semibold text-indigo-900"
            >
              <span>A. Opening Inventory</span>
              <span className="text-xl">
                {expandedSections.includes("opening_inventory") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("opening_inventory") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Opening stock of raw-material
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_opening_raw_materials")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Opening stock of Work in progress
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_opening_wip")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 bg-indigo-50 p-4 rounded">
                    <label className="block text-sm font-semibold text-indigo-900">
                      iii. Total (i + ii) = AIII
                    </label>
                    <p className="text-lg font-bold text-indigo-700 mt-2">
                      ₹ {(openingRawMaterials + openingWIP).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* B. Purchases */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("purchases")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-semibold text-blue-900"
            >
              <span>B. Purchases (net of refunds and duty or tax, if any)</span>
              <span className="text-xl">
                {expandedSections.includes("purchases") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("purchases") && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Purchases (net of refunds and duty or tax)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("mfg_purchases")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* C. Direct Wages */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("wages")}
              className="w-full px-6 py-4 bg-cyan-50 hover:bg-cyan-100 transition-colors flex items-center justify-between font-semibold text-cyan-900"
            >
              <span>C. Direct wages</span>
              <span className="text-xl">
                {expandedSections.includes("wages") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("wages") && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Direct wages
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("mfg_direct_wages")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* D. Direct Expenses */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("direct_expenses")}
              className="w-full px-6 py-4 bg-teal-50 hover:bg-teal-100 transition-colors flex items-center justify-between font-semibold text-teal-900"
            >
              <span>D. Direct Expenses (Di + Dii + Diii)</span>
              <span className="text-xl">
                {expandedSections.includes("direct_expenses") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("direct_expenses") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Carriage inward
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_direct_expenses_carriage")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Power and fuel
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_power_and_fuel")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Other direct expenses (specify)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_other_direct_expenses")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 bg-teal-50 p-4 rounded">
                    <label className="block text-sm font-semibold text-teal-900">
                      Total Direct Expenses (Di + Dii + Diii)
                    </label>
                    <p className="text-lg font-bold text-teal-700 mt-2">
                      ₹ {totalDirectExpenses.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Additional Material Components */}
                <div className="border-t pt-4 mt-4 space-y-4">
                  <p className="text-sm font-semibold text-gray-600">Additional Material Components:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Purchase Returns
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("mfg_purchase_returns")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Import Duty
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("mfg_import_duty")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Octroi
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("mfg_octroi")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Other Materials Consumed
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("mfg_other_materials_consumed")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* E. Factory Overheads */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("factory_overheads")}
              className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between font-semibold text-green-900"
            >
              <span>E. Factory Overheads</span>
              <span className="text-xl">
                {expandedSections.includes("factory_overheads") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("factory_overheads") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Indirect wages
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_indirect_wages")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Factory rent and rates
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_factory_rent_and_rates")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Factory Insurance
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_factory_insurance")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. Factory fuel and power
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_factory_fuel_and_power")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      v. Factory general expenses
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_factory_general_expenses")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vi. Depreciation of factory machinery
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("mfg_depreciation_factory_machinery")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2 bg-green-50 p-4 rounded">
                    <label className="block text-sm font-semibold text-green-900">
                      vii. Total (i+ii+iii+iv+v+vi) = E:vii
                    </label>
                    <p className="text-lg font-bold text-green-700 mt-2">
                      ₹ {totalFactoryOverheads.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* F. Total of Debits to Manufacturing Account */}
          <div className="mb-8 border-2 border-indigo-300 rounded-lg bg-indigo-50 p-6">
            <label className="block text-sm font-semibold text-indigo-900 mb-2">
              F. Total of Debits to Manufacturing Account (AIII+B+C+D+E+vii)
            </label>
            <p className="text-2xl font-bold text-indigo-900">
              ₹ {totalDebitsToManufacturing.toFixed(2)}
            </p>
          </div>
        </div>

        {/* CLOSING STOCK */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-orange-500">
          <h2 className="text-2xl font-bold text-orange-900 mb-6">2. CLOSING STOCK</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                2i. Raw material
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("mfg_closing_raw_materials")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                2ii. Work-in-progress
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("mfg_closing_wip")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2 bg-orange-50 p-4 rounded">
              <label className="block text-sm font-semibold text-orange-900">
                Total (2i +2ii)
              </label>
              <p className="text-lg font-bold text-orange-700 mt-2">
                ₹ {(closingRawMaterials + closingWIP).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* COST OF GOODS PRODUCED */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-red-500">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            3. COST OF GOODS PRODUCED - transferred to Trading Account (1F - 2)
          </h2>

          <div className="bg-red-50 p-6 rounded">
            <p className="text-2xl font-bold text-red-900">
              ₹ {costOfGoodsManufactured.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Finished Goods Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">
            4. CLOSING STOCK OF FINISHED GOODS
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Closing stock of finished goods
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("mfg_closing_finished_goods")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end mb-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManufacturingAccount;
