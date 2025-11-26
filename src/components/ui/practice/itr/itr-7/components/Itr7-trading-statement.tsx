import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface TradingStatementProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const TradingStatement: React.FC<TradingStatementProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const { register, watch, handleSubmit, formState: { errors } } = form;
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Watch values for calculations
  const openingStock = watch("ts_opening_stock") || 0;
  const purchases = watch("ts_purchases") || 0;
  const carriageInbound = watch("ts_carriage_inbound") || 0;
  const purchaseReturns = watch("ts_purchase_returns") || 0;
  const importDuty = watch("ts_import_duty") || 0;
  const octroi = watch("ts_octroi") || 0;
  const otherMaterials = watch("ts_other_materials") || 0;
  const closingStock = watch("ts_closing_stock") || 0;
  const labour = watch("ts_labour") || 0;
  const powerFuel = watch("ts_power_fuel") || 0;
  const freightCartage = watch("ts_freight_cartage") || 0;
  const manufacturingOverheads = watch("ts_manufacturing_overheads") || 0;
  const otherDirectExpenses = watch("ts_other_direct_expenses") || 0;
  const otherManufacturingExpenses = watch("ts_other_manufacturing_expenses") || 0;
  const openingWip = watch("ts_opening_wip") || 0;
  const closingWip = watch("ts_closing_wip") || 0;
  const openingFinished = watch("ts_opening_finished_goods") || 0;
  const closingFinished = watch("ts_closing_finished_goods") || 0;
  const sales = watch("ts_sales") || 0;
  const salesReturns = watch("ts_sales_returns") || 0;
  const otherRevenue = watch("ts_other_revenue") || 0;
  const exciseDuty = watch("ts_excise_duty") || 0;
  const tradeDiscount = watch("ts_trade_discount") || 0;
  const freightOutbound = watch("ts_freight_outbound") || 0;
  const packaging = watch("ts_packaging") || 0;

  // Calculate COGS
  const costOfMaterials = 
    Number(openingStock) + Number(purchases) + Number(carriageInbound) - Number(purchaseReturns) + Number(importDuty) + Number(octroi) + Number(otherMaterials) - Number(closingStock);
  const directExpenses = Number(labour) + Number(powerFuel) + Number(freightCartage) + Number(manufacturingOverheads) + Number(otherDirectExpenses) + Number(otherManufacturingExpenses);
  const costOfGoodsManufactured = costOfMaterials + directExpenses;
  const costOfGoodsManufacturedAdjusted = costOfGoodsManufactured + Number(openingWip) - Number(closingWip);
  const costOfGoodsSold = costOfGoodsManufacturedAdjusted + Number(openingFinished) - Number(closingFinished);
  const totalRevenue = Number(sales) - Number(salesReturns) + Number(exciseDuty) + Number(tradeDiscount) + Number(freightOutbound) + Number(packaging) + Number(otherRevenue);
  const grossProfit = totalRevenue - costOfGoodsSold;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ITR-7: Trading Statement
          </h1>
          <p className="text-slate-600 text-lg">
            Part A-TS: Trading and Profit & Loss Account for the year ended 31st March, 2025
          </p>
        </div>

        {/* PART A: TRADING ACCOUNT */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">
            PART A: TRADING ACCOUNT
          </h2>

          {/* I. Cost of Materials Consumed */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("materials")}
              className="w-full px-6 py-4 bg-indigo-50 hover:bg-indigo-100 transition-colors flex items-center justify-between font-semibold text-indigo-900"
            >
              <span>I. Cost of Materials Consumed</span>
              <span className="text-xl">
                {expandedSections.includes("materials") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("materials") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Opening Stock of Raw Material
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_opening_stock")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Purchases
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_purchases")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Carriage Inbound
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_carriage_inbound")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Less: Purchase Returns
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_purchase_returns")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Import Duty
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_import_duty")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Octroi/Entry Tax
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_octroi")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Other Materials
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_other_materials")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Less: Closing Stock of Raw Material
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_closing_stock")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cost of Materials Consumed 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={costOfMaterials.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-indigo-50 font-semibold text-indigo-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* II. Manufacturing Expenses */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("expenses")}
              className="w-full px-6 py-4 bg-orange-50 hover:bg-orange-100 transition-colors flex items-center justify-between font-semibold text-orange-900"
            >
              <span>II. Manufacturing Expenses (Direct Expenses)</span>
              <span className="text-xl">
                {expandedSections.includes("expenses") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("expenses") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      a. Labour
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_labour")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      b. Power & Fuel
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_power_fuel")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      c. Freight & Cartage (Inbound)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_freight_cartage")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      d. Manufacturing Overheads
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_manufacturing_overheads")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      e. Other Direct Expenses
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_other_direct_expenses")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      f. Other Manufacturing Expenses
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_other_manufacturing_expenses")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Direct Expenses 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={directExpenses.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-orange-50 font-semibold text-orange-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* III. Cost of Goods Manufactured */}
          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cost of Materials Consumed
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={costOfMaterials.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Add: Direct Expenses
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={directExpenses.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-indigo-900 mb-2">
                  III. Cost of Goods Manufactured 🔄
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={costOfGoodsManufactured.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg bg-indigo-100 font-bold text-indigo-900"
                />
              </div>
            </div>
          </div>

          {/* IV. Work in Progress Adjustment */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("wip")}
              className="w-full px-6 py-4 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-between font-semibold text-blue-900"
            >
              <span>IV. Work in Progress Adjustment</span>
              <span className="text-xl">
                {expandedSections.includes("wip") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("wip") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Opening Work in Progress
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_opening_wip")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Less: Closing Work in Progress
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_closing_wip")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cost of Goods Manufactured (After WIP) 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={costOfGoodsManufacturedAdjusted.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-blue-50 font-semibold text-blue-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* V. Cost of Goods Sold */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("goods_sold")}
              className="w-full px-6 py-4 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center justify-between font-semibold text-purple-900"
            >
              <span>V. Cost of Goods Sold</span>
              <span className="text-xl">
                {expandedSections.includes("goods_sold") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("goods_sold") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cost of Goods Manufactured (After WIP)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={costOfGoodsManufacturedAdjusted.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Opening Stock of Semi-Finished Goods
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_opening_semifinished")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Less: Closing Stock of Semi-Finished Goods
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_closing_semifinished")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Add: Opening Stock of Finished Goods
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_opening_finished_goods")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Less: Closing Stock of Finished Goods
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_closing_finished_goods")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      V. Cost of Goods Sold 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={costOfGoodsSold.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-purple-50 font-semibold text-purple-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* VI. Revenue from Operations */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("revenue")}
              className="w-full px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors flex items-center justify-between font-semibold text-green-900"
            >
              <span>VI. Revenue from Operations</span>
              <span className="text-xl">
                {expandedSections.includes("revenue") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("revenue") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      a. Sales
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_sales")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      b. Less: Sales Returns
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_sales_returns")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      c. Excise Duty
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_excise_duty")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      d. Trade Discounts/Rebates
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_trade_discount")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      e. Freight Outbound
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_freight_outbound")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      f. Packaging
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_packaging")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      g. Other Revenue
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_other_revenue")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      VI. Total Revenue from Operations 🔄
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={totalRevenue.toFixed(2)}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-green-50 font-semibold text-green-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* VII. Gross Profit/Loss */}
          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Revenue from Operations
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={totalRevenue.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Less: Cost of Goods Sold
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={costOfGoodsSold.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-indigo-900 mb-2">
                  VII. Gross Profit / Loss 🔄
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={grossProfit.toFixed(2)}
                  readOnly
                  className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg bg-indigo-100 font-bold text-indigo-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PART B: PROFIT & LOSS ACCOUNT */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-rose-500">
          <h2 className="text-2xl font-bold text-rose-900 mb-6">
            PART B: PROFIT & LOSS ACCOUNT
          </h2>

          {/* VIII. Operating Expenses */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("operating_expenses")}
              className="w-full px-6 py-4 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center justify-between font-semibold text-rose-900"
            >
              <span>VIII. Operating & Administrative Expenses</span>
              <span className="text-xl">
                {expandedSections.includes("operating_expenses") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("operating_expenses") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      a. Employee Benefits Expense
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_employee_benefits")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      b. Finance Costs (Interest)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_finance_costs")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      c. Depreciation & Amortization
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_depreciation")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      d. Amortization of Intangibles
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_amortization")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      e. Research & Development
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_research_development")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      f. Administrative Expenses
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_administrative_expenses")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      g. Selling & Distribution Expenses
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_selling_distribution")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      h. Other Operating Expenses
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_other_operating_expenses")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* IX. Other Income & Items */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("other_items")}
              className="w-full px-6 py-4 bg-amber-50 hover:bg-amber-100 transition-colors flex items-center justify-between font-semibold text-amber-900"
            >
              <span>IX. Other Income & Exceptional Items</span>
              <span className="text-xl">
                {expandedSections.includes("other_items") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("other_items") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      a. Other Income
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_other_income")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      b. Exceptional Items
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_exceptional_items")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      c. Prior Period Adjustments
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_prior_period_adjustments")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      d. Tax Expense
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_tax_expense")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PART C: ASSET SCHEDULES */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border-l-4 border-teal-500">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">
            PART C: ASSET SCHEDULES (Current Assets Details)
          </h2>

          {/* X. Inventories */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("inventories")}
              className="w-full px-6 py-4 bg-teal-50 hover:bg-teal-100 transition-colors flex items-center justify-between font-semibold text-teal-900"
            >
              <span>X. Inventories (Current Assets)</span>
              <span className="text-xl">
                {expandedSections.includes("inventories") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("inventories") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Raw materials
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_raw_materials")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Work-in-progress
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_work_in_progress")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Finished goods
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_finished_goods")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. Stock-in-trade (goods acquired for trading)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_stock_in_trade")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      v. Stores and spares
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_stores_spares")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vi. Loose tools
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_loose_tools")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vii. Others
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_other_inventory")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* XI. Financial Assets - Investments */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("investments")}
              className="w-full px-6 py-4 bg-cyan-50 hover:bg-cyan-100 transition-colors flex items-center justify-between font-semibold text-cyan-900"
            >
              <span>XI. Financial Assets - Investments</span>
              <span className="text-xl">
                {expandedSections.includes("investments") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("investments") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Investments in Equity instruments
                    </label>
                  </div>
                  <div></div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      &nbsp;&nbsp;a. Listed equities
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_listed_equities")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      &nbsp;&nbsp;b. Unlisted equities
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_unlisted_equities")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Investment in Preference shares
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_preference_shares")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Investment in government or trust securities
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_government_securities")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. Investment in debentures or bonds
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_debentures_bonds")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      v. Investment in Mutual funds
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_mutual_funds")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vi. Investment in partnership firms
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_partnership_firms")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      vii. Other Investments
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_inv_other_investments")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* XII. Trade Receivables */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("receivables")}
              className="w-full px-6 py-4 bg-sky-50 hover:bg-sky-100 transition-colors flex items-center justify-between font-semibold text-sky-900"
            >
              <span>XII. Trade Receivables</span>
              <span className="text-xl">
                {expandedSections.includes("receivables") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("receivables") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Secured, considered good
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_tr_secured_good")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Unsecured, considered good
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_tr_unsecured_good")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Doubtful
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_tr_doubtful")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* XIII. Cash and Cash Equivalents */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("cash")}
              className="w-full px-6 py-4 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-between font-semibold text-emerald-900"
            >
              <span>XIII. Cash and Cash Equivalents</span>
              <span className="text-xl">
                {expandedSections.includes("cash") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("cash") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Balances with Banks (of the nature of cash and cash equivalents)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_cash_bank_balances")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Cheques, drafts in hand
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_cash_cheques_drafts")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Cash on hand
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_cash_on_hand")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iv. Others (specify nature)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_cash_others")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      IV. Bank Balances other than III above
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_bank_balances_other")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* XIV. Loans */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("loans")}
              className="w-full px-6 py-4 bg-lime-50 hover:bg-lime-100 transition-colors flex items-center justify-between font-semibold text-lime-900"
            >
              <span>XIV. Loans</span>
              <span className="text-xl">
                {expandedSections.includes("loans") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("loans") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Security Deposits
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_loans_security_deposits")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ii. Loans to related parties (see instructions)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_loans_related_parties")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      iii. Others (specify nature)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_loans_other")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      V. Loans and advances included in V above which is-
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      a. for the purpose of business or profession
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_loans_business_profession")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      b. not for the purpose of business or profession / for shareholder benefit
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_loans_shareholder_benefit")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* XV. Other Financial & Current Assets */}
          <div className="mb-8 border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => toggleSection("other_assets")}
              className="w-full px-6 py-4 bg-violet-50 hover:bg-violet-100 transition-colors flex items-center justify-between font-semibold text-violet-900"
            >
              <span>XV. Other Financial & Current Assets</span>
              <span className="text-xl">
                {expandedSections.includes("other_assets") ? "−" : "+"}
              </span>
            </button>

            {expandedSections.includes("other_assets") && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      i. Other Financial Assets
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_financial_assets_other")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      II. Advances other than capital advances
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_current_assets_advances")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      III. Others (specify nature)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("ts_current_assets_other")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default TradingStatement;
