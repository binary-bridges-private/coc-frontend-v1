import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleFAProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleFA: React.FC<ScheduleFAProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit } = form;

  const depositaryCount = watch("fa_depositary_count") || 1;
  const depositaryAccounts = Array.from({ length: Math.min(depositaryCount, 10) });

  const financialEntityCount = watch("fa_financial_entity_count") || 1;
  const financialEntities = Array.from({ length: Math.min(financialEntityCount, 10) });

  const equityCount = watch("fa_equity_count") || 1;
  const equityAssets = Array.from({ length: Math.min(equityCount, 10) });

  const insuranceCount = watch("fa_insurance_count") || 1;
  const insuranceContracts = Array.from({ length: Math.min(insuranceCount, 10) });

  const propertyCount = watch("fa_property_count") || 1;
  const propertyAssets = Array.from({ length: Math.min(propertyCount, 10) });

  const capitalAssetCount = watch("fa_capital_asset_count") || 1;
  const capitalAssets = Array.from({ length: Math.min(capitalAssetCount, 10) });

  const accountCount = watch("fa_account_count") || 1;
  const accountsHeld = Array.from({ length: Math.min(accountCount, 10) });

  const trustCount = watch("fa_trust_count") || 1;
  const trusts = Array.from({ length: Math.min(trustCount, 10) });

  const otherIncomeCount = watch("fa_other_income_count") || 1;
  const otherIncomes = Array.from({ length: Math.min(otherIncomeCount, 10) });

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-cyan-900 mb-2">
            Schedule FA: Foreign Assets Details
          </h1>
          <p className="text-cyan-700">
            Comprehensive details of foreign deposits, financial interests, and other assets held outside India
          </p>
        </div>

        {/* Part A: Foreign Depositary Accounts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-cyan-500">
          <h2 className="text-lg font-bold text-cyan-800 mb-4">
            Part A: Foreign Depositary Accounts
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of foreign depositary accounts held (including any beneficial interest) as on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Accounts (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_depositary_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {depositaryAccounts.map((_, idx) => (
            <div key={idx} className="bg-cyan-50 rounded-lg p-4 mb-4 border border-cyan-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_dep_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Institution Name</label>
                  <input type="text" placeholder="Institution" {...register(`fa_dep_institution_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Account Number</label>
                  <input type="text" placeholder="Account #" {...register(`fa_dep_account_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">ZIP Code</label>
                  <input type="text" placeholder="ZIP" {...register(`fa_dep_zip_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Opening Date (DD/MM/YYYY)</label>
                  <input type="text" placeholder="DD/MM/YYYY" {...register(`fa_dep_opening_date_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Peak Balance (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_dep_peak_balance_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Closing Balance (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_dep_closing_balance_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Interest Credited (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_dep_interest_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part B: Financial Interest */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Part B: Financial Interest in Entities
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of financial interest in any entity held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Entities (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_financial_entity_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {financialEntities.map((_, idx) => (
            <div key={idx} className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Entity Name</label>
                  <input type="text" placeholder="Entity name" {...register(`fa_entity_name_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_entity_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nature of Interest</label>
                  <input type="text" placeholder="Direct/Beneficial" {...register(`fa_entity_interest_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Total Investment (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_entity_investment_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Peak Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_entity_peak_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Income (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_entity_income_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part C: Equity and Debt Interest */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-lg font-bold text-indigo-800 mb-4">
            Part C: Equity and Debt Interest
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of foreign equity and debt interest held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Holdings (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_equity_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {equityAssets.map((_, idx) => (
            <div key={idx} className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Entity Name</label>
                  <input type="text" placeholder="Entity" {...register(`fa_equity_entity_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_equity_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nature of Interest</label>
                  <input type="text" placeholder="Equity/Debt" {...register(`fa_equity_nature_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Acquisition Date</label>
                  <input type="text" placeholder="DD/MM/YYYY" {...register(`fa_equity_acquisition_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Initial Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_equity_initial_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Peak Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_equity_peak_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Closing Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_equity_closing_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Total Proceeds (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_equity_proceeds_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part D: Insurance Contracts */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-purple-500">
          <h2 className="text-lg font-bold text-purple-800 mb-4">
            Part D: Foreign Insurance Contracts
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of foreign cash value insurance contract or annuity contract held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Contracts (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_insurance_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {insuranceContracts.map((_, idx) => (
            <div key={idx} className="bg-purple-50 rounded-lg p-4 mb-4 border border-purple-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Institution Name</label>
                  <input type="text" placeholder="Institution" {...register(`fa_insurance_institution_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_insurance_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Contract Date</label>
                  <input type="text" placeholder="DD/MM/YYYY" {...register(`fa_insurance_date_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Cash Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_insurance_value_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Amount Paid (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_insurance_paid_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part E: Immovable Property */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-violet-500">
          <h2 className="text-lg font-bold text-violet-800 mb-4">
            Part E: Immovable Property Held
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of immovable property held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Properties (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_property_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
          </div>

          {propertyAssets.map((_, idx) => (
            <div key={idx} className="bg-violet-50 rounded-lg p-4 mb-4 border border-violet-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_property_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Property Description</label>
                  <input type="text" placeholder="Address" {...register(`fa_property_desc_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Acquisition Date</label>
                  <input type="text" placeholder="DD/MM/YYYY" {...register(`fa_property_date_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Total Investment (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_property_investment_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Peak Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_property_peak_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Income (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_property_income_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-violet-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part F: Capital Assets */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-500">
          <h2 className="text-lg font-bold text-green-800 mb-4">
            Part F: Capital Assets
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of capital assets held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Capital Assets (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_capital_asset_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {capitalAssets.map((_, idx) => (
            <div key={idx} className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_capital_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Asset Description</label>
                  <input type="text" placeholder="Asset Name" {...register(`fa_capital_desc_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Acquisition Date</label>
                  <input type="text" placeholder="DD/MM/YYYY" {...register(`fa_capital_date_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Cost (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_capital_cost_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Fair Market Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_capital_fmv_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Reference/Certificate</label>
                  <input type="text" placeholder="Reference No." {...register(`fa_capital_ref_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part G: Bank Accounts Held */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-red-500">
          <h2 className="text-lg font-bold text-red-800 mb-4">
            Part G: Bank Accounts Held Outside India
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of bank accounts held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Accounts (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_account_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {accountsHeld.map((_, idx) => (
            <div key={idx} className="bg-red-50 rounded-lg p-4 mb-4 border border-red-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_account_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Bank Name</label>
                  <input type="text" placeholder="Bank Name" {...register(`fa_account_bank_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Account Number</label>
                  <input type="text" placeholder="A/C Number" {...register(`fa_account_number_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Account Type</label>
                  <select {...register(`fa_account_type_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="current">Current</option>
                    <option value="savings">Savings</option>
                    <option value="fixed">Fixed Deposit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Opening Balance (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_account_opening_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Closing Balance (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_account_closing_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Max Balance (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_account_max_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Income (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_account_income_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part H: Interests in Trusts/Entities */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-orange-500">
          <h2 className="text-lg font-bold text-orange-800 mb-4">
            Part H: Interests in Trusts/Foreign Entities
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of beneficial interests held during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Trusts/Entities (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_trust_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {trusts.map((_, idx) => (
            <div key={idx} className="bg-orange-50 rounded-lg p-4 mb-4 border border-orange-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_trust_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Trust/Entity Name</label>
                  <input type="text" placeholder="Name" {...register(`fa_trust_name_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Identification Number</label>
                  <input type="text" placeholder="ID/TIN" {...register(`fa_trust_id_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nature of Interest</label>
                  <input type="text" placeholder="Beneficiary/Settlor" {...register(`fa_trust_nature_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1\">Interest Value (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_trust_value_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Income Received (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_trust_income_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-orange-400 focus:border-transparent text-right" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Part I: Other Foreign Income Sources */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-500">
          <h2 className="text-lg font-bold text-indigo-800 mb-4">
            Part I: Other Foreign Income Sources
          </h2>
          <p className="text-sm text-gray-600 mb-4">Details of other foreign income sources during the calendar year ending on 31st December, 2024</p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Sources (Max 10)</label>
            <input
              type="number"
              min="1"
              max="10"
              {...register("fa_other_income_count")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {otherIncomes.map((_, idx) => (
            <div key={idx} className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-200">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Country Code</label>
                  <input type="text" placeholder="Country" {...register(`fa_other_country_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1\">Source Description</label>
                  <input type="text" placeholder="Source Type" {...register(`fa_other_source_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nature of Income</label>
                  <input type="text" placeholder="Income Type" {...register(`fa_other_nature_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1\">Amount (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_other_amount_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1\">Tax Paid (₹)</label>
                  <input type="number" placeholder="0" step="0.01" {...register(`fa_other_tax_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-right" />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Assessment Year</label>
                  <input type="text" placeholder="AY" {...register(`fa_other_ay_${idx}`)} className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-400 focus:border-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end mb-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleFA;
