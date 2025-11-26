import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8ScheduleAlStartupProps {
  form: UseFormReturn<ITR8FormData>;
}

/**
 * Schedule AL (Startup) - Assets and Liabilities for Startups
 * Applicable for startups that filed Form-2 declaration under DPIIT notification dated 19.02.2019
 * Tracks assets and liabilities from incorporation date to end of financial year
 */
export const Itr8ScheduleAlStartup: React.FC<Itr8ScheduleAlStartupProps> = ({ form }) => {
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
      <div className="bg-amber-50 border-l-4 border-amber-600 p-4">
        <h2 className="text-lg font-bold text-amber-900">Schedule AL (Startup) - Assets and Liabilities</h2>
        <p className="text-sm text-amber-800 mt-1">
          Applicable for startups which filed declaration in Form-2 under para 5 of DPIIT notification dated 19.02.2019
        </p>
        <p className="text-xs text-amber-700 mt-2">
          Period: From date of incorporation upto end of the financial year
        </p>
      </div>

      {/* Section A - Residential House Property */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('A')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>A. Details of building or land appurtenant thereto, or both, being a residential house acquired since incorporation</span>
          <span className="text-xl">{expandedSections.includes('A') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('A') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Sl. No</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">Pin Code</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition (Rs.)</th>
                  <th className="border border-gray-300 p-2">Purpose for which Used</th>
                  <th className="border border-gray-300 p-2">Whether Transferred (Yes/No)</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">1</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_address_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_pin_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_purpose_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_res_transferred_1')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">2</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_address_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_pin_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_date_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_cost_2', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_purpose_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_res_transferred_2')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">3</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_address_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_pin_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_date_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_cost_3', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_res_purpose_3')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_res_transferred_3')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section B - Non-Residential House Property */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('B')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>B. Details of land or building or both not being in the nature of residential house acquired since incorporation</span>
          <span className="text-xl">{expandedSections.includes('B') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('B') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Sl. No</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">Pin Code</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition (Rs.)</th>
                  <th className="border border-gray-300 p-2">Purpose for which Used</th>
                  <th className="border border-gray-300 p-2">Whether Transferred (Yes/No)</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">1</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_address_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_pin_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_purpose_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_nonres_transferred_1')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border border-gray-300 p-2 font-semibold">2</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_address_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_pin_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_date_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_cost_2', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_nonres_purpose_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_nonres_transferred_2')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section C - Loans & Advances */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('C')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>C. Details of Loans & Advances made since incorporation</span>
          <span className="text-xl">{expandedSections.includes('C') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('C') && (
          <div className="p-4 border-t space-y-4">
            <p className="text-xs text-gray-600 mb-3">(If lending of money is not assessee's substantial business)</p>
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Person</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Date of Loan/Advances</th>
                  <th className="border border-gray-300 p-2">Amount of Loans/Advances (Rs.)</th>
                  <th className="border border-gray-300 p-2">Amount Repaid (Rs.)</th>
                  <th className="border border-gray-300 p-2">Whether Repaid by Previous Year-end (Yes/No)</th>
                  <th className="border border-gray-300 p-2">Closing Balance (Rs.)</th>
                  <th className="border border-gray-300 p-2">Rate of Interest (%)</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_name_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="PAN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_pan_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_amount_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_repaid_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_loan_prev_repaid_1')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_closing_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_rate_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_name_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="PAN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_pan_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_date_2')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_amount_2', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_repaid_2', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_loan_prev_repaid_2')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_closing_2', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_loan_rate_2', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section D - Capital Contribution */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('D')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>D. Details of Capital Contribution made to any other entity since incorporation</span>
          <span className="text-xl">{expandedSections.includes('D') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('D') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Entity</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Date of Capital Contribution</th>
                  <th className="border border-gray-300 p-2">Amount of Contribution (Rs.)</th>
                  <th className="border border-gray-300 p-2">Amount Withdrawn (Rs.)</th>
                  <th className="border border-gray-300 p-2">Profit/Dividend/Interest Credited (Rs.)</th>
                  <th className="border border-gray-300 p-2">Closing Balance (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Entity name"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_entity_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="PAN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_pan_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_contrib_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_withdraw_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_profit_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_capital_closing_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section E - Acquisition of Shares & Securities */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('E')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>E. Details of Acquisition of Shares and Securities</span>
          <span className="text-xl">{expandedSections.includes('E') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('E') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Company/Entity</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Type of Shares/Securities</th>
                  <th className="border border-gray-300 p-2">Number of Shares/Securities</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition (Rs.)</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Whether Transferred (Yes/No)</th>
                  <th className="border border-gray-300 p-2">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Company name"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_company_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="PAN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_pan_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Type"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_type_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_qty_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_shares_transferred_1')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_shares_closing_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section F - Motor Vehicles */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('F')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>F. Details of Motor Vehicle, Aircraft, Yacht or other Mode of Transport (Actual cost exceeds 10 lakhs)</span>
          <span className="text-xl">{expandedSections.includes('F') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('F') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Particulars of Asset</th>
                  <th className="border border-gray-300 p-2">Registration Number</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition (Rs.)</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Purpose for which Used</th>
                  <th className="border border-gray-300 p-2">Whether Transferred (Yes/No)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="e.g., Car, Bike, Aircraft"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_vehicle_particulars_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Registration"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_vehicle_reg_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_vehicle_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_vehicle_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_vehicle_purpose_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_vehicle_transferred_1')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section G - Archaeological Collections & Artwork */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('G')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>G. Details of Archaeological Collections, Drawings, Paintings, Sculptures, Artwork or Bullion</span>
          <span className="text-xl">{expandedSections.includes('G') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('G') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Particulars of Asset</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition (Rs.)</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Purpose for which Used</th>
                  <th className="border border-gray-300 p-2">Whether Transferred (Yes/No)</th>
                  <th className="border border-gray-300 p-2">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Item"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_art_particulars_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Quantity"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_art_qty_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_art_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_art_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_art_purpose_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_startup_art_transferred_1')}>
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_art_closing_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section H - Liabilities */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('H')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>H. Details of Liabilities - Loans, Deposits & Advances from Non-Financial Institution</span>
          <span className="text-xl">{expandedSections.includes('H') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('H') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Person</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Opening Balance (Rs.)</th>
                  <th className="border border-gray-300 p-2">Amount Received (Rs.)</th>
                  <th className="border border-gray-300 p-2">Amount Paid (Rs.)</th>
                  <th className="border border-gray-300 p-2">Interest Debited (Rs.)</th>
                  <th className="border border-gray-300 p-2">Closing Balance (Rs.)</th>
                  <th className="border border-gray-300 p-2">Rate of Interest (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_name_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="PAN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_pan_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_open_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_received_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_paid_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_interest_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_closing_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      step="0.01"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_startup_liab_rate_1', { valueAsNumber: true })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-800">
        <strong>Note:</strong> This schedule is applicable only for startups which filed declaration in Form-2 under DPIIT notification. All monetary values should be in Indian Rupees (Rs.).
      </div>
    </div>
  );
};

export default Itr8ScheduleAlStartup;
