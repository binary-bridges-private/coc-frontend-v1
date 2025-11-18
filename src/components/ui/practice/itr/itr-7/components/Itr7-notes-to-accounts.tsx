import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

const NotesToAccounts: React.FC<{ onCancel: () => void }> = ({ onCancel }) => {
  const { register, watch, formState: { errors } } = useFormContext<ITR7FormData>();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "contingent-liabilities",
    "commitments",
    "related-party",
    "events",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Watch contingent liabilities
  const totalContingentLiabilities =
    (watch("nt_contingent_liability_1") || 0) +
    (watch("nt_contingent_liability_2") || 0) +
    (watch("nt_contingent_liability_3") || 0) +
    (watch("nt_contingent_liability_4") || 0) +
    (watch("nt_contingent_liability_5") || 0);

  // Watch capital commitments
  const totalCapitalCommitments =
    (watch("nt_capital_commitments_not_authorized") || 0) +
    (watch("nt_capital_commitments_authorized") || 0);

  // Watch contingent assets
  const totalContingentAssets =
    (watch("nt_contingent_asset_1") || 0) +
    (watch("nt_contingent_asset_2") || 0) +
    (watch("nt_contingent_asset_3") || 0);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Notes to Accounts
      </h2>

      {/* Contingent Liabilities */}
      <div className="mb-6 border-l-4 border-red-500">
        <button
          onClick={() => toggleSection("contingent-liabilities")}
          className="w-full bg-red-50 hover:bg-red-100 px-4 py-3 font-semibold text-left text-red-700 rounded transition"
        >
          {expandedSections.includes("contingent-liabilities") ? "▼" : "▶"} A. Contingent Liabilities
        </button>

        {expandedSections.includes("contingent-liabilities") && (
          <div className="p-4 bg-white border-t border-red-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1. Contingent liabilities due to legal proceedings/penalties
                </label>
                <textarea
                  {...register("nt_contingent_liability_desc_1")}
                  placeholder="Details of legal proceedings"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_liability_desc_1 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_liability_1", { valueAsNumber: true })}
                  placeholder="Amount (if quantifiable)"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_liability_1 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  2. Income Tax liability disputed/under appeal
                </label>
                <textarea
                  {...register("nt_contingent_liability_desc_2")}
                  placeholder="Details of tax disputes"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_liability_desc_2 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_liability_2", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_liability_2 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  3. GST/VAT liability under challenge
                </label>
                <textarea
                  {...register("nt_contingent_liability_desc_3")}
                  placeholder="Details of GST/VAT disputes"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_liability_desc_3 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_liability_3", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_liability_3 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  4. Bank guarantees/Letter of credit issued
                </label>
                <textarea
                  {...register("nt_contingent_liability_desc_4")}
                  placeholder="Details of guarantees"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_liability_desc_4 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_liability_4", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_liability_4 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  5. Other contingent liabilities
                </label>
                <textarea
                  {...register("nt_contingent_liability_desc_5")}
                  placeholder="Details of other contingencies"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_liability_desc_5 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_liability_5", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_liability_5 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div className="bg-red-100 p-3 rounded">
                <p className="font-semibold text-sm text-red-700">
                  Total Contingent Liabilities: {totalContingentLiabilities.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Capital Commitments */}
      <div className="mb-6 border-l-4 border-amber-500">
        <button
          onClick={() => toggleSection("commitments")}
          className="w-full bg-amber-50 hover:bg-amber-100 px-4 py-3 font-semibold text-left text-amber-700 rounded transition"
        >
          {expandedSections.includes("commitments") ? "▼" : "▶"} B. Capital Commitments & Contingent Assets
        </button>

        {expandedSections.includes("commitments") && (
          <div className="p-4 bg-white border-t border-amber-200">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">Capital Commitments:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capital commitments not yet executed (authorized)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_capital_commitments_not_authorized", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_capital_commitments_not_authorized ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capital commitments already executed (still in progress)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_capital_commitments_authorized", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_capital_commitments_authorized ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>

            <div className="bg-amber-100 p-3 rounded mb-6">
              <p className="font-semibold text-sm text-amber-700">
                Total Capital Commitments: {totalCapitalCommitments.toFixed(2)}
              </p>
            </div>

            <h4 className="font-semibold text-sm text-gray-700 mb-3">Contingent Assets:</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1. Income tax refund expected/under appeal
                </label>
                <textarea
                  {...register("nt_contingent_asset_desc_1")}
                  placeholder="Details of expected refunds"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_asset_desc_1 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_asset_1", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_asset_1 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  2. GST/VAT refund expected
                </label>
                <textarea
                  {...register("nt_contingent_asset_desc_2")}
                  placeholder="Details of expected GST/VAT refunds"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_asset_desc_2 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_asset_2", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_asset_2 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  3. Other contingent assets
                </label>
                <textarea
                  {...register("nt_contingent_asset_desc_3")}
                  placeholder="Details of other contingent assets"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_contingent_asset_desc_3 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_contingent_asset_3", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_contingent_asset_3 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div className="bg-amber-100 p-3 rounded">
                <p className="font-semibold text-sm text-amber-700">
                  Total Contingent Assets: {totalContingentAssets.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Party Transactions */}
      <div className="mb-6 border-l-4 border-blue-500">
        <button
          onClick={() => toggleSection("related-party")}
          className="w-full bg-blue-50 hover:bg-blue-100 px-4 py-3 font-semibold text-left text-blue-700 rounded transition"
        >
          {expandedSections.includes("related-party") ? "▼" : "▶"} C. Related Party Transactions
        </button>

        {expandedSections.includes("related-party") && (
          <div className="p-4 bg-white border-t border-blue-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1. Sales/Services to related parties
                </label>
                <textarea
                  {...register("nt_related_party_desc_1")}
                  placeholder="Details of transactions"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_related_party_desc_1 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_related_party_1", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_related_party_1 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  2. Purchases/Services from related parties
                </label>
                <textarea
                  {...register("nt_related_party_desc_2")}
                  placeholder="Details of purchases from related parties"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_related_party_desc_2 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_related_party_2", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_related_party_2 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  3. Loans/Advances given to related parties
                </label>
                <textarea
                  {...register("nt_related_party_desc_3")}
                  placeholder="Details of loans and advances"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_related_party_desc_3 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_related_party_3", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_related_party_3 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  4. Director remuneration/sitting fees paid
                </label>
                <textarea
                  {...register("nt_related_party_desc_4")}
                  placeholder="Details of director remuneration"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_related_party_desc_4 ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
                <input
                  type="number"
                  step="0.01"
                  {...register("nt_related_party_4", { valueAsNumber: true })}
                  placeholder="Amount"
                  className={`w-full px-3 py-2 border rounded-md mt-2 ${
                    errors.nt_related_party_4 ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Year End Events */}
      <div className="mb-6 border-l-4 border-green-500">
        <button
          onClick={() => toggleSection("events")}
          className="w-full bg-green-50 hover:bg-green-100 px-4 py-3 font-semibold text-left text-green-700 rounded transition"
        >
          {expandedSections.includes("events") ? "▼" : "▶"} D. Post Year End Events
        </button>

        {expandedSections.includes("events") && (
          <div className="p-4 bg-white border-t border-green-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material events after balance sheet date
                </label>
                <textarea
                  {...register("nt_post_events")}
                  placeholder="Description of material events"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_post_events ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Any mergers, acquisitions, or restructuring
                </label>
                <textarea
                  {...register("nt_restructuring_events")}
                  placeholder="Details of corporate actions"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_restructuring_events ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Any regulatory changes or compliance matters
                </label>
                <textarea
                  {...register("nt_regulatory_events")}
                  placeholder="Details of regulatory changes"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_regulatory_events ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Other Disclosures */}
      <div className="mb-6 border-l-4 border-purple-500">
        <button
          onClick={() => toggleSection("other-disclosures")}
          className="w-full bg-purple-50 hover:bg-purple-100 px-4 py-3 font-semibold text-left text-purple-700 rounded transition"
        >
          {expandedSections.includes("other-disclosures") ? "▼" : "▶"} E. Other Important Disclosures
        </button>

        {expandedSections.includes("other-disclosures") && (
          <div className="p-4 bg-white border-t border-purple-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of employees
                </label>
                <input
                  type="number"
                  {...register("nt_num_employees", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_num_employees ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employee benefits details
                </label>
                <textarea
                  {...register("nt_employee_benefits")}
                  placeholder="Details of gratuity, pension, etc."
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_employee_benefits ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Research and development activities (R&D)
                </label>
                <textarea
                  {...register("nt_rd_activities")}
                  placeholder="Details of R&D expenses"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_rd_activities ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Corporate Social Responsibility (CSR) spending
                </label>
                <textarea
                  {...register("nt_csr_activities")}
                  placeholder="Details of CSR activities"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_csr_activities ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Any other disclosures for tax compliance
                </label>
                <textarea
                  {...register("nt_other_disclosures")}
                  placeholder="Any other important disclosures"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.nt_other_disclosures ? "border-red-500" : "border-gray-300"
                  }`}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NotesToAccounts;
