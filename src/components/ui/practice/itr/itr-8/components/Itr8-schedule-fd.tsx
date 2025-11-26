import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8ScheduleFdProps {
  form: UseFormReturn<ITR8FormData>;
}

/**
 * Schedule FD - Break-up of Payments/Receipts in Foreign Currency
 * Applicable for HUFs having foreign currency transactions
 * Tracks foreign currency payments and receipts on capital/revenue account
 */
export const Itr8ScheduleFd: React.FC<Itr8ScheduleFdProps> = ({ form }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg">
      <div className="bg-purple-50 border-l-4 border-purple-600 p-4">
        <h2 className="text-lg font-bold text-purple-900">Schedule FD - Foreign Currency Transactions</h2>
        <p className="text-sm text-purple-800 mt-1">
          Break-up of Payments/Receipts in Foreign Currency
        </p>
        <p className="text-xs text-purple-700 mt-2">
          To be filled up by assessee who is not liable to get accounts audited under Section 44AB
        </p>
      </div>

      {/* Capital Account Payments */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('capital_payments')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>I. Payments Made During the Year on Capital Account (in Rs.)</span>
          <span className="text-xl">{expandedSections.includes('capital_payments') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('capital_payments') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">S.L No.</th>
                  <th className="border border-gray-300 p-2">Description of Payment</th>
                  <th className="border border-gray-300 p-2">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="e.g., Plant & Machinery, Building, Equipment"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_payment_desc_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_payment_amount_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_payment_desc_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_payment_amount_2', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">3</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_payment_desc_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_payment_amount_3', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
              <p><strong>Examples:</strong> Foreign remittances for purchase of fixed assets, machinery imports, equipment purchases, technical fees for capital works</p>
            </div>
          </div>
        )}
      </div>

      {/* Revenue Account Payments */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('revenue_payments')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>II. Payments Made During the Year on Revenue Account (in Rs.)</span>
          <span className="text-xl">{expandedSections.includes('revenue_payments') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('revenue_payments') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">S.L No.</th>
                  <th className="border border-gray-300 p-2">Description of Payment</th>
                  <th className="border border-gray-300 p-2">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">i</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="e.g., International Services, Consultancy Fees"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_desc_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_amount_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">ii</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_desc_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_amount_2', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">iii</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_desc_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_amount_3', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">iv</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_desc_4')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_payment_amount_4', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
              <p><strong>Examples:</strong> Foreign royalties, professional fees, consultancy charges, payment for imported materials, international freight, foreign insurance premiums</p>
            </div>
          </div>
        )}
      </div>

      {/* Capital Account Receipts */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('capital_receipts')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>III. Receipts During the Year on Capital Account (in Rs.)</span>
          <span className="text-xl">{expandedSections.includes('capital_receipts') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('capital_receipts') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">S.L No.</th>
                  <th className="border border-gray-300 p-2">Description of Receipt</th>
                  <th className="border border-gray-300 p-2">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="e.g., Foreign Direct Investment, Equity Capital"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_receipt_desc_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_receipt_amount_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">2</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_receipt_desc_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_cap_receipt_amount_2', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
              <p><strong>Examples:</strong> Foreign investment proceeds, repatriation of funds, proceeds from sale of fixed assets abroad</p>
            </div>
          </div>
        )}
      </div>

      {/* Revenue Account Receipts */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('revenue_receipts')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>IV. Receipts During the Year on Revenue Account (in Rs.)</span>
          <span className="text-xl">{expandedSections.includes('revenue_receipts') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('revenue_receipts') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">S.L No.</th>
                  <th className="border border-gray-300 p-2">Description of Receipt</th>
                  <th className="border border-gray-300 p-2">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">i</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="e.g., Export Income, Foreign Services Income"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_desc_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_amount_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">ii</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_desc_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_amount_2', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">iii</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_desc_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_amount_3', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">iv</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_desc_4')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('fd_rev_receipt_amount_4', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
              <p><strong>Examples:</strong> Foreign royalty income, technical fees received, software exports, consultancy income received, remittances from abroad</p>
            </div>
          </div>
        )}
      </div>

      {/* Summary and Notes */}
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded p-4 text-sm">
          <h4 className="font-semibold text-amber-900 mb-2">Important Notes:</h4>
          <ul className="list-disc list-inside space-y-1 text-amber-800">
            <li>All amounts should be converted to Indian Rupees (Rs.)</li>
            <li>Exchange rate on the date of transaction should be used</li>
            <li>This schedule is applicable only if foreign currency transactions exceed Rs. 10 lakhs in a financial year</li>
            <li>Section 44AB audit requirement: Not applicable for non-auditable entities</li>
            <li>Transfer Pricing: If foreign transactions are with related parties, transfer pricing documentation is mandatory</li>
            <li>FEMA compliance: Ensure all foreign transactions comply with RBI's Foreign Exchange Management Act</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm">
          <h4 className="font-semibold text-blue-900 mb-2">Exchange Rate Considerations:</h4>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>Use transaction-date exchange rate for P&L items</li>
            <li>Use year-end RBI reference rate for balance sheet items</li>
            <li>Document exchange rate source (OANDA, XE.com, RBI, Bank Rate)</li>
            <li>Exchange gain/loss should be separately tracked</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Itr8ScheduleFd;
