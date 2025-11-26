import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8ScheduleAlProps {
  form: UseFormReturn<ITR8FormData>;
}

export const Itr8ScheduleAl: React.FC<Itr8ScheduleAlProps> = ({ form }) => {
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
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <h2 className="text-lg font-bold text-blue-900">Schedule AL - Assets and Liabilities</h2>
        <p className="text-sm text-blue-700 mt-1">
          Details of assets and liabilities as at the end of the year (Mandatory for unlisted company)
        </p>
      </div>

      {/* Section A - Residential House Property */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('A')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>A. Details of building or land appurtenant thereto, or both, being a residential house</span>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_reshouse_address_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_reshouse_pin_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_reshouse_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_reshouse_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_reshouse_purpose_1')}>
                      <option value="">Select Purpose</option>
                      <option value="self_residence">Self Residence</option>
                      <option value="rental">Rental</option>
                      <option value="investment">Investment</option>
                      <option value="commercial">Commercial</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-600">
              Add more rows as needed. Dropdown to be provided for "Purpose for which used"
            </p>
          </div>
        )}
      </div>

      {/* Section B - Non-Residential House Property */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('B')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>B. Details of land or building or both not being in the nature of residential house</span>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">1</td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_nonreshouse_address_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="PIN"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_nonreshouse_pin_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_nonreshouse_date_1')}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_nonreshouse_cost_1', { valueAsNumber: true })}
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      placeholder="Enter purpose"
                      className="w-full border rounded px-2 py-1"
                      {...form.register('al_nonreshouse_purpose_1')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section C - Listed Equity Shares */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('C')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>C. Details of Listed Equity Shares</span>
          <span className="text-xl">{expandedSections.includes('C') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('C') && (
          <div className="p-4 border-t space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Opening Balance</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Shares Acquired During Year</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Shares Transferred During Year</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Closing Balance</th>
                  </tr>
                  <tr>
                    <th className="border border-gray-300 p-2">No. of shares</th>
                    <th className="border border-gray-300 p-2">Type of shares</th>
                    <th className="border border-gray-300 p-2">Cost of acquisition</th>
                    <th className="border border-gray-300 p-2">No. of shares</th>
                    <th className="border border-gray-300 p-2">Type of shares</th>
                    <th className="border border-gray-300 p-2">Cost of acquisition</th>
                    <th className="border border-gray-300 p-2">No. of shares</th>
                    <th className="border border-gray-300 p-2">Type of shares</th>
                    <th className="border border-gray-300 p-2">Sale consideration</th>
                    <th className="border border-gray-300 p-2">No. of shares</th>
                    <th className="border border-gray-300 p-2">Type of shares</th>
                    <th className="border border-gray-300 p-2">Cost of acquisition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_open_qty', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select className="w-full border rounded px-1 py-1" {...form.register('al_equity_open_type')}>
                        <option value="">Select</option>
                        <option value="equity">Equity</option>
                        <option value="preference">Preference</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_open_cost', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_acq_qty', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select className="w-full border rounded px-1 py-1" {...form.register('al_equity_acq_type')}>
                        <option value="">Select</option>
                        <option value="equity">Equity</option>
                        <option value="preference">Preference</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_acq_cost', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_trans_qty', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select className="w-full border rounded px-1 py-1" {...form.register('al_equity_trans_type')}>
                        <option value="">Select</option>
                        <option value="equity">Equity</option>
                        <option value="preference">Preference</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_trans_sale', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_close_qty', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select className="w-full border rounded px-1 py-1" {...form.register('al_equity_close_type')}>
                        <option value="">Select</option>
                        <option value="equity">Equity</option>
                        <option value="preference">Preference</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_equity_close_cost', { valueAsNumber: true })} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Section D - Unlisted Equity Shares */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('D')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>D. Details of Unlisted Equity Shares</span>
          <span className="text-xl">{expandedSections.includes('D') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('D') && (
          <div className="p-4 border-t space-y-4">
            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-2">Name of Company</th>
                    <th className="border border-gray-300 p-2">PAN</th>
                    <th className="border border-gray-300 p-2">Opening Balance (No. of shares)</th>
                    <th className="border border-gray-300 p-2">Cost of Acquisition</th>
                    <th className="border border-gray-300 p-2">No. of Shares Issued</th>
                    <th className="border border-gray-300 p-2">Date of Subscription</th>
                    <th className="border border-gray-300 p-2">Face Value Per Share</th>
                    <th className="border border-gray-300 p-2">Issue Price Per Share</th>
                    <th className="border border-gray-300 p-2">Purchase Price Per Share (in case of purchase from existing holder)</th>
                    <th className="border border-gray-300 p-2">No. of Shares Transferred</th>
                    <th className="border border-gray-300 p-2">Sale Consideration</th>
                    <th className="border border-gray-300 p-2">Closing Balance (No. of shares)</th>
                    <th className="border border-gray-300 p-2">Cost of Acquisition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input type="text" placeholder="Company name" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_company_1')} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="text" placeholder="PAN" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_pan_1')} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_open_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_open_cost_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_issue_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="text" placeholder="DD/MM/YYYY" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_issue_date_1')} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_face_value_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_issue_price_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_purchase_price_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_trans_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_sale_consid_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_close_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="0" className="w-full border rounded px-1 py-1" {...form.register('al_unlisted_close_cost_1', { valueAsNumber: true })} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Section E - Other Securities */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('E')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>E. Details of Other Securities (Bonds, Debentures, etc.)</span>
          <span className="text-xl">{expandedSections.includes('E') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('E') && (
          <div className="p-4 border-t space-y-4">
            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-2">Type of Security</th>
                    <th className="border border-gray-300 p-2">Listed/Unlisted</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Opening Balance</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Acquired During Year</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Transferred During Year</th>
                    <th colSpan={3} className="border border-gray-300 p-2 bg-blue-50">Closing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      <input type="text" placeholder="Security type" className="w-full border rounded px-1 py-1" {...form.register('al_security_type_1')} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <select className="w-full border rounded px-1 py-1" {...form.register('al_security_listed_1')}>
                        <option value="">Select</option>
                        <option value="listed">Listed</option>
                        <option value="unlisted">Unlisted</option>
                      </select>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Qty" className="w-full border rounded px-1 py-1" {...form.register('al_security_open_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Cost" className="w-full border rounded px-1 py-1" {...form.register('al_security_open_cost_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Qty" className="w-full border rounded px-1 py-1" {...form.register('al_security_acq_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Cost" className="w-full border rounded px-1 py-1" {...form.register('al_security_acq_cost_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Qty" className="w-full border rounded px-1 py-1" {...form.register('al_security_trans_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Sale" className="w-full border rounded px-1 py-1" {...form.register('al_security_trans_sale_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Qty" className="w-full border rounded px-1 py-1" {...form.register('al_security_close_qty_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input type="number" placeholder="Cost" className="w-full border rounded px-1 py-1" {...form.register('al_security_close_cost_1', { valueAsNumber: true })} />
                    </td>
                    <td className="border border-gray-300 p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Section F - Capital Contribution */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('F')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>F. Details of Capital Contribution to Other Entity</span>
          <span className="text-xl">{expandedSections.includes('F') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('F') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Entity</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Opening Balance</th>
                  <th className="border border-gray-300 p-2">Amount Contributed During Year</th>
                  <th className="border border-gray-300 p-2">Amount Withdrawn During Year</th>
                  <th className="border border-gray-300 p-2">Profit/Dividend/Interest Credited</th>
                  <th className="border border-gray-300 p-2">Closing Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="Entity name" className="w-full border rounded px-2 py-1" {...form.register('al_capital_entity_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="PAN" className="w-full border rounded px-2 py-1" {...form.register('al_capital_pan_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_capital_open_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_capital_contrib_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_capital_withdraw_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_capital_profit_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_capital_close_1', { valueAsNumber: true })} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section G - Loans & Advances */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('G')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>G. Details of Loans & Advances to Other Concern</span>
          <span className="text-xl">{expandedSections.includes('G') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('G') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Person</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Opening Balance</th>
                  <th className="border border-gray-300 p-2">Amount Received</th>
                  <th className="border border-gray-300 p-2">Amount Paid</th>
                  <th className="border border-gray-300 p-2">Interest Credited, if any</th>
                  <th className="border border-gray-300 p-2">Closing Balance</th>
                  <th className="border border-gray-300 p-2">Rate of Interest (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="Person name" className="w-full border rounded px-2 py-1" {...form.register('al_loan_person_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="PAN" className="w-full border rounded px-2 py-1" {...form.register('al_loan_pan_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_loan_open_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_loan_received_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_loan_paid_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_loan_interest_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_loan_close_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" step="0.01" className="w-full border rounded px-2 py-1" {...form.register('al_loan_rate_1', { valueAsNumber: true })} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section H - Motor Vehicle & Transport */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('H')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>H. Details of Motor Vehicle, Aircraft, Yacht or Other Mode of Transport</span>
          <span className="text-xl">{expandedSections.includes('H') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('H') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Particulars of Asset</th>
                  <th className="border border-gray-300 p-2">Registration Number</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Purpose for which Used</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="e.g., Car, Bike, Yacht" className="w-full border rounded px-2 py-1" {...form.register('al_vehicle_particulars_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="Registration Number" className="w-full border rounded px-2 py-1" {...form.register('al_vehicle_reg_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_vehicle_cost_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="DD/MM/YYYY" className="w-full border rounded px-2 py-1" {...form.register('al_vehicle_date_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select className="w-full border rounded px-2 py-1" {...form.register('al_vehicle_purpose_1')}>
                      <option value="">Select Purpose</option>
                      <option value="personal">Personal Use</option>
                      <option value="business">Business Use</option>
                      <option value="investment">Investment</option>
                      <option value="hire">On Hire</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section I - Jewellery & Art */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('I')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>I. Details of Jewellery, Archaeological Collections, Artwork, Sculptures, Bullion</span>
          <span className="text-xl">{expandedSections.includes('I') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('I') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Particulars of Asset</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Cost of Acquisition (Rs.)</th>
                  <th className="border border-gray-300 p-2">Date of Acquisition</th>
                  <th className="border border-gray-300 p-2">Purpose of Use</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="e.g., Gold Jewellery, Painting" className="w-full border rounded px-2 py-1" {...form.register('al_jewel_particulars_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="Quantity" className="w-full border rounded px-2 py-1" {...form.register('al_jewel_qty_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_jewel_cost_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="DD/MM/YYYY" className="w-full border rounded px-2 py-1" {...form.register('al_jewel_date_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="Purpose of use" className="w-full border rounded px-2 py-1" {...form.register('al_jewel_purpose_1')} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section J - Liabilities */}
      <div className="border rounded-lg">
        <button
          onClick={() => toggleSection('J')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>J. Details of Liabilities - Loans from Non-Financial Institution</span>
          <span className="text-xl">{expandedSections.includes('J') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('J') && (
          <div className="p-4 border-t space-y-4">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-2">Name of Person</th>
                  <th className="border border-gray-300 p-2">PAN</th>
                  <th className="border border-gray-300 p-2">Opening Balance</th>
                  <th className="border border-gray-300 p-2">Amount Received</th>
                  <th className="border border-gray-300 p-2">Amount Paid</th>
                  <th className="border border-gray-300 p-2">Interest Credited, if any</th>
                  <th className="border border-gray-300 p-2">Closing Balance</th>
                  <th className="border border-gray-300 p-2">Rate of Interest (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="Lender name" className="w-full border rounded px-2 py-1" {...form.register('al_liab_person_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="text" placeholder="PAN" className="w-full border rounded px-2 py-1" {...form.register('al_liab_pan_1')} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_liab_open_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_liab_received_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_liab_paid_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_liab_interest_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" className="w-full border rounded px-2 py-1" {...form.register('al_liab_close_1', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" placeholder="0" step="0.01" className="w-full border rounded px-2 py-1" {...form.register('al_liab_rate_1', { valueAsNumber: true })} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-800">
        <strong>Note:</strong> All monetary values should be in Indian Rupees (Rs.). Add more rows as needed for multiple entries.
      </div>
    </div>
  );
};

export default Itr8ScheduleAl;
