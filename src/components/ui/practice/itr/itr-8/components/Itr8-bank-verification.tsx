import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR8FormData } from '../itr-8.types';

interface Itr8BankVerificationProps {
  form: UseFormReturn<ITR8FormData>;
}

/**
 * Bank Account Details, Tax Payments (Advance Tax, TDS, TCS) and Verification
 * Final section of ITR-8 form
 */
export const Itr8BankVerification: React.FC<Itr8BankVerificationProps> = ({ form }) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg">
      {/* 16. Bank Account Question */}
      <div className="border-2 border-blue-600 rounded-lg p-4 bg-blue-50">
        <div className="flex items-center justify-between mb-4">
          <label className="font-bold text-blue-900 text-lg">
            16. Do you have a bank account in India
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="yes"
                className="mr-2"
                {...form.register('tti_have_bank_account')}
              />
              <span className="font-medium">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="no"
                className="mr-2"
                {...form.register('tti_have_bank_account')}
              />
              <span className="font-medium">No</span>
            </label>
          </div>
        </div>

        {/* Bank Accounts Table */}
        <div className="bg-white p-4 rounded">
          <h4 className="font-semibold text-gray-800 mb-3">
            (a) Details of all Bank Accounts held in India at any time during the previous year (excluding dormant accounts)
          </h4>
          
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 p-2">Sl.</th>
                <th className="border border-gray-300 p-2">IFS Code of the Bank</th>
                <th className="border border-gray-300 p-2">
                  In case of multiple Bank Accounts held in India
                </th>
                <th className="border border-gray-300 p-2">Name of the Bank</th>
                <th className="border border-gray-300 p-2">Account Number</th>
                <th className="border border-gray-300 p-2">
                  Type of account
                  <div className="text-xs font-normal">(Dropdown to be provided by)</div>
                </th>
                <th className="border border-gray-300 p-2">
                  Select Account for refund
                  <div className="text-xs font-normal">(tick atleast one account ✓)</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Account 1 */}
              <tr>
                <td className="border border-gray-300 p-2 text-center font-semibold">i</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    maxLength={11}
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_ifsc_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_name_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Name of the Bank"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_name_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Account Number"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_account_number_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_account_type_1')}
                  >
                    <option value="">Select</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    {...form.register('bank_refund_account_1')}
                  />
                </td>
              </tr>

              {/* Account 2 */}
              <tr>
                <td className="border border-gray-300 p-2 text-center font-semibold">ii</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="IFSC Code"
                    maxLength={11}
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_ifsc_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_name_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Name of the Bank"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_name_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Account Number"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_account_number_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    className="w-full border rounded px-2 py-1"
                    {...form.register('bank_account_type_2')}
                  >
                    <option value="">Select</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                  </select>
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    {...form.register('bank_refund_account_2')}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-3 space-y-1 text-xs text-gray-600">
            <p><strong>Note:</strong></p>
            <p>1) All bank accounts held at any time are to be reported, except dormant A/c.</p>
            <p>2) In case multiple accounts are selected, the refund will be credited to one of the validated accounts after processing the return.</p>
            <p className="italic">(Row can be added as required)</p>
          </div>
        </div>

        {/* Foreign Bank Account */}
        <div className="bg-white p-4 rounded mt-4">
          <h4 className="font-semibold text-gray-800 mb-3">
            (b) Non- residents, may, at their option, furnish the details of one foreign bank account:
          </h4>
          
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 p-2">S. No.</th>
                <th className="border border-gray-300 p-2">SWIFT Code</th>
                <th className="border border-gray-300 p-2">Name of the Bank</th>
                <th className="border border-gray-300 p-2">Country of Location</th>
                <th className="border border-gray-300 p-2">IBAN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">1</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="SWIFT Code"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('foreign_swift_code')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Bank Name"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('foreign_bank_name')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('foreign_bank_country')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="IBAN"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('foreign_bank_iban')}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-600 mt-2 italic">Row can be added as required</p>
        </div>
      </div>

      {/* 17. Foreign Assets/Income Questions */}
      <div className="border-2 border-purple-600 rounded-lg p-4 bg-purple-50">
        <h3 className="font-bold text-purple-900 mb-4">
          17. Do you at any time during the previous year:-
        </h3>
        
        <div className="space-y-3 ml-4">
          <div className="flex items-center justify-between bg-white p-3 rounded">
            <label className="font-medium text-gray-700">
              (i) hold, as beneficial owner, beneficiary or otherwise, any asset (including financial interest in any entity) located outside India; or
            </label>
            <div className="flex gap-4 ml-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  className="mr-2"
                  {...form.register('foreign_assets_held')}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  className="mr-2"
                  {...form.register('foreign_assets_held')}
                />
                No
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded">
            <label className="font-medium text-gray-700">
              (ii) have signing authority in any account located outside India; or
            </label>
            <div className="flex gap-4 ml-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  className="mr-2"
                  {...form.register('foreign_financial_interest')}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  className="mr-2"
                  {...form.register('foreign_financial_interest')}
                />
                No
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded">
            <label className="font-medium text-gray-700">
              (iii) have income from any source outside India?
            </label>
            <div className="flex gap-4 ml-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="yes"
                  className="mr-2"
                  {...form.register('foreign_income')}
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="no"
                  className="mr-2"
                  {...form.register('foreign_income')}
                />
                No
              </label>
            </div>
          </div>

          <p className="text-xs text-gray-600 italic mt-2">
            [applicable only in case of a resident] [Ensure Schedule FA is filled up if the answer is Yes]
          </p>
        </div>
      </div>

      {/* 18. TAX PAYMENTS */}
      <div className="border-2 border-indigo-600 rounded-lg p-4 bg-indigo-50">
        <h3 className="font-bold text-indigo-900 mb-4">18. TAX PAYMENTS</h3>

        {/* A. Advance Tax */}
        <div className="bg-white p-4 rounded mb-4">
          <h4 className="font-semibold text-gray-800 mb-3">
            A. Details of payments of Advance Tax and Self-Assessment Tax
          </h4>
          
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 p-2">Sl No</th>
                <th className="border border-gray-300 p-2">BSR Code</th>
                <th className="border border-gray-300 p-2">Date of Deposit (DD/MM/YYYY)</th>
                <th className="border border-gray-300 p-2">Serial Number of Challan</th>
                <th className="border border-gray-300 p-2">Amount (Rs)</th>
              </tr>
              <tr className="text-xs text-gray-500">
                <th className="border border-gray-300 p-1">(1)</th>
                <th className="border border-gray-300 p-1">(2)</th>
                <th className="border border-gray-300 p-1">(3)</th>
                <th className="border border-gray-300 p-1">(4)</th>
                <th className="border border-gray-300 p-1">(5)</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td className="border border-gray-300 p-2 text-center font-semibold">i</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="BSR Code"
                    maxLength={7}
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_bsr_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_date_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Serial Number"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_serial_1')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_amount_1', { valueAsNumber: true })}
                  />
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="border border-gray-300 p-2 text-center font-semibold">ii</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="BSR Code"
                    maxLength={7}
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_bsr_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_date_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="Serial Number"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_serial_2')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_amount_2', { valueAsNumber: true })}
                  />
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="border border-gray-300 p-2 text-center font-semibold">iii</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="BSR Code"
                    maxLength={7}
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_bsr_3')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_date_3')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
  <input
                    type="text"
                    placeholder="Serial Number"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_serial_3')}
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full border rounded px-2 py-1"
                    {...form.register('advance_tax_amount_3', { valueAsNumber: true })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          
          <p className="text-xs text-gray-600 mt-2">
            <strong>NOTE ▶</strong> Enter the totals of Advance tax and Self-Assessment tax in Sl No. 10a & 10d of Part B-TTI
          </p>
        </div>

        {/* B. TDS Details */}
        <div className="bg-white p-4 rounded mb-4">
          <h4 className="font-semibold text-gray-800 mb-3">
            B. Details of Tax Deducted at Source (TDS) on Income [As per Form 16 A issued or Form 16B/16C/16D/16E furnished by Deductor(s)]
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-1" rowSpan={2}>Sl No</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>TDS credit relating to self /other person /other person as per rule 37BA(2))</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>PAN/Aadhar ar No. of Other Person or Name, if PAN/aadhar ar No, of a Buyer</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>TAN of the Deductor under which TDS is deducted</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>Section under which TDS is deducted</th>
                  <th className="border border-gray-300 p-1" colSpan={2}>Unclaimed TDS brought forward (b/f)</th>
                  <th className="border border-gray-300 p-1" colSpan={4}>TDS of the current Financial Year (TDS deducted during the FY 2024-25)</th>
                  <th className="border border-gray-300 p-1" colSpan={2}>TDS credit being claimed this Year (if corresponding income is being offered for tax this year not applicable if TDS is deducted by PAN)</th>
                  <th className="border border-gray-300 p-1" colSpan={2}>Corresponding TDS credit being carried forward</th>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-1">Fin. Year in which TDS deducted</th>
                  <th className="border border-gray-300 p-1">TD S b/f own hands</th>
                  <th className="border border-gray-300 p-1">Deducted d in own hands</th>
                  <th className="border border-gray-300 p-1">Deducted in the hands of any other person as per rule 37BA(2) (if applicable)</th>
                  <th className="border border-gray-300 p-1">Claimed d in own hands</th>
                  <th className="border border-gray-300 p-1">Claimed in the hands of any other person as per rule 37BA(2) (if applicable)</th>
                  <th className="border border-gray-300 p-1">Gross Amount</th>
                  <th className="border border-gray-300 p-1">Head of Income</th>
                  <th className="border border-gray-300 p-1">TDS credit being carried forward</th>
                  <th className="border border-gray-300 p-1">PAN/ Aadhaar No.</th>
                </tr>
                <tr className="text-gray-500">
                  <th className="border border-gray-300 p-1">(1)</th>
                  <th className="border border-gray-300 p-1">2(i)</th>
                  <th className="border border-gray-300 p-1">(2)(ii)</th>
                  <th className="border border-gray-300 p-1">(3)</th>
                  <th className="border border-gray-300 p-1">(4)</th>
                  <th className="border border-gray-300 p-1">(4a)</th>
                  <th className="border border-gray-300 p-1">(5)</th>
                  <th className="border border-gray-300 p-1">(6)</th>
                  <th className="border border-gray-300 p-1">(7)</th>
                  <th className="border border-gray-300 p-1">(8)</th>
                  <th className="border border-gray-300 p-1">(9)</th>
                  <th className="border border-gray-300 p-1">(10)</th>
                  <th className="border border-gray-300 p-1">(11)</th>
                  <th className="border border-gray-300 p-1">(12)</th>
                  <th className="border border-gray-300 p-1">(13)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">i</td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_credit_self')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_pan_other')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_deduction_tax')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_account_number')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_fin_year')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_amount_bf', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_deducted_own', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_deducted_other', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_claimed_other', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_gross_amount', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_head_income')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_credit_carried', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tds_pan_aadhaar')} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={6} className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2 text-center">Income</td>
                  <td className="border border-gray-300 p-2 text-center">TDS</td>
                  <td className="border border-gray-300 p-2 text-center">Income</td>
                  <td className="border border-gray-300 p-2 text-center">TDS</td>
                  <td className="border border-gray-300 p-2 text-center">PAN/Aadhaar No.</td>
                  <td colSpan={3} className="border border-gray-300 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-xs text-gray-600 mt-2">
            <strong>NOTE ▶</strong> Please enter total of column (7)(i) in 10c of Part B-TTI
          </p>
        </div>

        {/* C. TCS Details */}
        <div className="bg-white p-4 rounded">
          <h4 className="font-semibold text-gray-800 mb-3">
            C. Details of Tax Collected at Source (TCS) [As per Form 27D issued by the Collector(s)]
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border border-gray-300 p-1" rowSpan={2}>Sl No</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>TCS credit relating to self /other person /other person as per rule 37i(1)</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>Tax Deduction and Tax Collection Account Number of the Collector</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>PAN of Other Person (if TCS credit related to other person)</th>
                  <th className="border border-gray-300 p-1" colSpan={2}>Unclaimed TCS brought forward (b/f)</th>
                  <th className="border border-gray-300 p-1" colSpan={4}>TCS of the current financial Year (TCS collected during the FY 2024-25)</th>
                  <th className="border border-gray-300 p-1" colSpan={2}>TCS credit being claimed this Year</th>
                  <th className="border border-gray-300 p-1" rowSpan={2}>TCS credit being carried forward</th>
                </tr>
                <tr>
                  <th className="border border-gray-300 p-1">Fin. Year in which collected</th>
                  <th className="border border-gray-300 p-1">Amount b/f</th>
                  <th className="border border-gray-300 p-1">Collected in own hands</th>
                  <th className="border border-gray-300 p-1">Collected in the hands of any other person as per rule 37i(1) (if applicable)</th>
                  <th className="border border-gray-300 p-1">Claimed in own hands</th>
                  <th className="border border-gray-300 p-1">Claimed in the hands of any other person as per rule 37i(1) (if applicable)</th>
                  <th className="border border-gray-300 p-1">Gross Amount</th>
                  <th className="border border-gray-300 p-1">Head of Income</th>
                </tr>
                <tr className="text-gray-500">
                  <th className="border border-gray-300 p-1">(1)</th>
                  <th className="border border-gray-300 p-1">2(i)</th>
                  <th className="border border-gray-300 p-1">(2)(ii)</th>
                  <th className="border border-gray-300 p-1">(3)</th>
                  <th className="border border-gray-300 p-1">(4)</th>
                  <th className="border border-gray-300 p-1">(5)</th>
                  <th className="border border-gray-300 p-1">6(i)</th>
                  <th className="border border-gray-300 p-1">6(ii)</th>
                  <th className="border border-gray-300 p-1">7(i)</th>
                  <th className="border border-gray-300 p-1">7(ii)</th>
                  <th className="border border-gray-300 p-1" colSpan={2}>TCS | PAN</th>
                  <th className="border border-gray-300 p-1">(8)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 text-center">i</td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_credit_self')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_deduction_tax')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_pan_other')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_fin_year')} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_amount_bf', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_collected_own', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_collected_other', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_claimed_this_year', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_claimed_other', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="number" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_credit_carried', { valueAsNumber: true })} />
                  </td>
                  <td className="border border-gray-300 p-1">
                    <input type="text" className="w-full border rounded px-1 py-1 text-xs" {...form.register('tcs_pan')} />
                  </td>
                  <td className="border border-gray-300 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VERIFICATION */}
      <div className="border-4 border-gray-800 rounded-lg p-6 bg-gray-50">
        <h2 className="font-bold text-gray-900 text-xl mb-4 text-center">VERIFICATION</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <span className="text-gray-700">I,</span>
            <input
              type="text"
              placeholder="Name of the person"
              className="flex-1 border-b-2 border-gray-400 bg-transparent px-2 py-1 focus:border-blue-600"
              {...form.register('verification_son_daughter_of')}
            />
            <span className="text-gray-700">son/ daughter of</span>
            <input
              type="text"
              placeholder="Father's/Mother's name"
              className="flex-1 border-b-2 border-gray-400 bg-transparent px-2 py-1 focus:border-blue-600"
              {...form.register('verification_son_daughter_of')}
            />
            <span className="text-gray-700">, solemnly declare that to the best of my</span>
          </div>

          <p className="text-gray-700">
            knowledge and belief, the information given in the return and the schedules thereto is correct and complete is in accordance with the provisions of the Income-tax Act, 1961.
          </p>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">I further declare that I am making this return in my capacity as</span>
            <input
              type="text"
              placeholder="(drop down to be provided"
              className="flex-1 border-b-2 border-gray-400 bg-transparent px-2 py-1 focus:border-blue-600"
              {...form.register('verification_capacity')}
            />
            <span className="text-gray-700">and I am also competent to make this return</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">and verify it. I am holding permanent account number</span>
            <input
              type="text"
              placeholder="Account number"
              className="flex-1 border-b-2 border-gray-400 bg-transparent px-2 py-1 focus:border-blue-600"
              {...form.register('verification_account_number')}
            />
            <span className="text-gray-700">(if allotted)</span>
            <span className="text-xs text-gray-500">(Please see instruction).</span>
          </div>

          <p className="text-gray-700">
            I further declare that the critical assumptions specified in the agreement have been satisfied and all the terms and conditions of the agreement have been complied with. (Applicable, in a case where return is furnished under section 92CD)
          </p>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t-2 border-gray-400">
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Date</label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                className="w-full border-2 border-gray-400 rounded px-3 py-2"
                {...form.register('verification_date')}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Place</label>
              <input
                type="text"
                placeholder="Place"
                className="w-full border-2 border-gray-400 rounded px-3 py-2"
                {...form.register('verification_place')}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700 block mb-2">Sign here ➔</label>
              <div className="w-full border-2 border-gray-400 rounded px-3 py-2 h-12 bg-white">
                {/* Signature area */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-100 p-4 rounded text-center">
        <p className="text-sm text-gray-700 font-semibold">[F.NO. 370142/16/2025-TPL]</p>
        <p className="text-sm text-gray-700 mt-2">SURBENDU THAKUR, Under Secy., Tax Policy and Legislation</p>
        <p className="text-xs text-gray-600 mt-4">
          <strong>Note:-</strong> The principal rules were published in the Gazette of India, Extraordinary, Part II, Section 3,
          Sub-Section (ii) vide notification number S.O. 969 (E), dated the 26th March, 1962 and was last
          amended vide notification number G.S.R. 287(E), dated the 03 May, 2025.
        </p>
        <p className="text-xs text-gray-600 mt-2">
          <strong>Explanatory Memorandum:</strong> - It is hereby certified that no person shall be adversely affected by
          giving retrospective effect to these rules.
        </p>
      </div>
    </div>
  );
};
