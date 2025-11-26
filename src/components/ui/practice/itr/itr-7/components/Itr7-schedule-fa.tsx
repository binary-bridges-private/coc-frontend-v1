import { useForm, UseFormReturn } from "react-hook-form";
import { useState } from "react";

interface Itr7ScheduleFAProps {
  form: UseFormReturn<any>;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

export default function ScheduleFA({
  form,
  onCancel,
  onSubmit,
}: Itr7ScheduleFAProps) {
  const { watch, register, control } = form;

  // Foreign Bank Accounts Section A
  const [bankAccountRows, setBankAccountRows] = useState(2);

  // Foreign Custodial Accounts Section B
  const [custodialRows, setCustodialRows] = useState(2);

  // Foreign Equity and Debt Interest Section C
  const [equityDebtRows, setEquityDebtRows] = useState(2);

  // Foreign Insurance Contract Section D
  const [insuranceRows, setInsuranceRows] = useState(2);

  // Financial Interest in Entity Section E
  const [financialInterestRows, setFinancialInterestRows] = useState(2);

  // Immovable Property Section F
  const [immovablePropertyRows, setImmovablePropertyRows] = useState(2);

  // Other Capital Assets Section G
  const [otherCapitalRows, setOtherCapitalRows] = useState(2);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          Schedule FA - Details of Foreign Assets
        </h3>
        <p className="text-gray-600">
          Complete details of all foreign assets held during the financial year
        </p>
      </div>

      {/* Section A: Foreign Bank Accounts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section A: Details of Foreign Bank Accounts
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Country Name</th>
                <th className="border border-gray-300 px-2 py-2">Country Code</th>
                <th className="border border-gray-300 px-2 py-2">Name of Bank</th>
                <th className="border border-gray-300 px-2 py-2">Address</th>
                <th className="border border-gray-300 px-2 py-2">ZIP Code</th>
                <th className="border border-gray-300 px-2 py-2">Account Number</th>
                <th className="border border-gray-300 px-2 py-2">Status</th>
                <th className="border border-gray-300 px-2 py-2">Opening Date</th>
                <th className="border border-gray-300 px-2 py-2">Peak Balance</th>
                <th className="border border-gray-300 px-2 py-2">Closing Balance</th>
                <th className="border border-gray-300 px-2 py-2">Gross Interest Paid</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: bankAccountRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_country_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_country_code_${idx}` as any)}
                      type="text"
                      maxLength={2}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_address_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_account_${idx}` as any)}
                      type="text"
                      maxLength={30}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_bank_status_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_opening_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_peak_balance_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_closing_balance_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_bank_interest_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={12} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setBankAccountRows(bankAccountRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section B: Foreign Custodial Accounts */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section B: Details of Foreign Custodial Accounts
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Country Name</th>
                <th className="border border-gray-300 px-2 py-2">Country Code</th>
                <th className="border border-gray-300 px-2 py-2">Name of Custodian</th>
                <th className="border border-gray-300 px-2 py-2">Address</th>
                <th className="border border-gray-300 px-2 py-2">ZIP Code</th>
                <th className="border border-gray-300 px-2 py-2">Account Number</th>
                <th className="border border-gray-300 px-2 py-2">Status</th>
                <th className="border border-gray-300 px-2 py-2">Opening Date</th>
                <th className="border border-gray-300 px-2 py-2">Peak Balance</th>
                <th className="border border-gray-300 px-2 py-2">Closing Balance</th>
                <th className="border border-gray-300 px-2 py-2">Income Credited</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: custodialRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_country_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_country_code_${idx}` as any)}
                      type="text"
                      maxLength={2}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_address_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_account_${idx}` as any)}
                      type="text"
                      maxLength={30}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_custodial_status_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Active">Active</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_opening_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_peak_balance_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_closing_balance_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_custodial_income_credited_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={12} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setCustodialRows(custodialRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section C: Foreign Equity and Debt Interest */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section C: Details of Foreign Equity and Debt Interest
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Country Name</th>
                <th className="border border-gray-300 px-2 py-2">Country Code</th>
                <th className="border border-gray-300 px-2 py-2">Name of Entity</th>
                <th className="border border-gray-300 px-2 py-2">Address</th>
                <th className="border border-gray-300 px-2 py-2">ZIP Code</th>
                <th className="border border-gray-300 px-2 py-2">Nature of Holding</th>
                <th className="border border-gray-300 px-2 py-2">Date of Acquisition</th>
                <th className="border border-gray-300 px-2 py-2">Initial Value</th>
                <th className="border border-gray-300 px-2 py-2">Peak Value</th>
                <th className="border border-gray-300 px-2 py-2">Closing Value</th>
                <th className="border border-gray-300 px-2 py-2">Gross Amount</th>
                <th className="border border-gray-300 px-2 py-2">Gross Proceeds</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: equityDebtRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_country_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_country_code_${idx}` as any)}
                      type="text"
                      maxLength={2}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_entity_name_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_address_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_equity_nature_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Equity">Equity</option>
                      <option value="Debt">Debt Interest</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_acquisition_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_initial_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_peak_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_closing_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_gross_amount_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_equity_gross_proceeds_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={13} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setEquityDebtRows(equityDebtRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section D: Foreign Insurance Contract */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section D: Details of Foreign Insurance/Annuity Contract
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Country Name</th>
                <th className="border border-gray-300 px-2 py-2">Country Code</th>
                <th className="border border-gray-300 px-2 py-2">Name of Institution</th>
                <th className="border border-gray-300 px-2 py-2">Address</th>
                <th className="border border-gray-300 px-2 py-2">ZIP Code</th>
                <th className="border border-gray-300 px-2 py-2">Date of Contract</th>
                <th className="border border-gray-300 px-2 py-2">Cash Value Surrender</th>
                <th className="border border-gray-300 px-2 py-2">Gross Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: insuranceRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_country_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_country_code_${idx}` as any)}
                      type="text"
                      maxLength={2}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_institution_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_address_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_contract_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_cash_value_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_insurance_gross_amount_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={9} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setInsuranceRows(insuranceRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section E: Financial Interest in Entity */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section E: Details of Financial Interest in Entity
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Name of Institution</th>
                <th className="border border-gray-300 px-2 py-2">Address</th>
                <th className="border border-gray-300 px-2 py-2">ZIP Code</th>
                <th className="border border-gray-300 px-2 py-2">Nature of Entity</th>
                <th className="border border-gray-300 px-2 py-2">Account Number</th>
                <th className="border border-gray-300 px-2 py-2">Peak Balance/Investment</th>
                <th className="border border-gray-300 px-2 py-2">Interest/Dividend</th>
                <th className="border border-gray-300 px-2 py-2">Nature of Income</th>
                <th className="border border-gray-300 px-2 py-2">Income Accrued</th>
                <th className="border border-gray-300 px-2 py-2">Amount</th>
                <th className="border border-gray-300 px-2 py-2">Schedule Where Offered</th>
                <th className="border border-gray-300 px-2 py-2">Item Number</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: financialInterestRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_institution_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_address_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_nature_${idx}` as any)}
                      type="text"
                      maxLength={30}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_account_${idx}` as any)}
                      type="text"
                      maxLength={30}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_peak_balance_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_interest_dividend_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Interest">Interest</option>
                      <option value="Dividend">Dividend</option>
                      <option value="Both">Both</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_interest_income_nature_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Interest">Interest</option>
                      <option value="Dividend">Dividend</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_income_accrued_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_amount_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_interest_schedule_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="OS">Schedule OS</option>
                      <option value="BP">Schedule BP</option>
                      <option value="CG">Schedule CG</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_interest_item_number_${idx}` as any)}
                      type="text"
                      maxLength={5}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={13} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setFinancialInterestRows(financialInterestRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section F: Immovable Property */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section F: Details of Immovable Property Outside India
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Country Name</th>
                <th className="border border-gray-300 px-2 py-2">ZIP Code</th>
                <th className="border border-gray-300 px-2 py-2">Address of Property</th>
                <th className="border border-gray-300 px-2 py-2">Ownership Type</th>
                <th className="border border-gray-300 px-2 py-2">Date of Acquisition</th>
                <th className="border border-gray-300 px-2 py-2">Total Investment</th>
                <th className="border border-gray-300 px-2 py-2">Income Derived</th>
                <th className="border border-gray-300 px-2 py-2">Nature of Income</th>
                <th className="border border-gray-300 px-2 py-2">Amount</th>
                <th className="border border-gray-300 px-2 py-2">Schedule Where Offered</th>
                <th className="border border-gray-300 px-2 py-2">Item Number</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: immovablePropertyRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_country_${idx}` as any)}
                      type="text"
                      maxLength={20}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_address_${idx}` as any)}
                      type="text"
                      maxLength={50}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_property_ownership_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Direct">Direct</option>
                      <option value="Beneficial">Beneficial</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_acquisition_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_investment_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_income_derived_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_property_income_nature_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Rent">Rent</option>
                      <option value="Capital Gain">Capital Gain</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_amount_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_property_schedule_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="HP">Schedule HP</option>
                      <option value="CG">Schedule CG</option>
                      <option value="OS">Schedule OS</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_property_item_number_${idx}` as any)}
                      type="text"
                      maxLength={5}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={12} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setImmovablePropertyRows(immovablePropertyRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Section G: Other Capital Assets */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-300 pb-2">
          Section G: Details of Other Capital Assets Outside India
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 px-2 py-2">Sl No</th>
                <th className="border border-gray-300 px-2 py-2">Country Zip Code</th>
                <th className="border border-gray-300 px-2 py-2">Name and Code</th>
                <th className="border border-gray-300 px-2 py-2">Nature of Asset</th>
                <th className="border border-gray-300 px-2 py-2">Ownership Type</th>
                <th className="border border-gray-300 px-2 py-2">Date of Acquisition</th>
                <th className="border border-gray-300 px-2 py-2">Total Investment</th>
                <th className="border border-gray-300 px-2 py-2">Income Derived</th>
                <th className="border border-gray-300 px-2 py-2">Nature of Income</th>
                <th className="border border-gray-300 px-2 py-2">Amount</th>
                <th className="border border-gray-300 px-2 py-2">Schedule Where Offered</th>
                <th className="border border-gray-300 px-2 py-2">Item Number</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: otherCapitalRows }).map((_, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_country_zip_${idx}` as any)}
                      type="text"
                      maxLength={10}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_name_code_${idx}` as any)}
                      type="text"
                      maxLength={30}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_capital_nature_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Artwork">Artwork</option>
                      <option value="Jewelry">Jewelry</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_capital_ownership_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Direct">Direct</option>
                      <option value="Beneficial">Beneficial</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_acquisition_date_${idx}` as any)}
                      type="date"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_investment_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_income_derived_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_capital_income_nature_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="Rent">Rent</option>
                      <option value="Capital Gain">Capital Gain</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_amount_${idx}` as any)}
                      type="number"
                      step="0.01"
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <select {...register(`fa_capital_schedule_${idx}` as any)} className="w-full border border-gray-300 px-2 py-1 text-xs">
                      <option value="">Select</option>
                      <option value="CG">Schedule CG</option>
                      <option value="OS">Schedule OS</option>
                      <option value="BP">Schedule BP</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      {...register(`fa_capital_item_number_${idx}` as any)}
                      type="text"
                      maxLength={5}
                      className="w-full border border-gray-300 px-2 py-1 text-xs"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50">
                <td colSpan={12} className="border border-gray-300 px-2 py-2 text-center">
                  <button
                    type="button"
                    onClick={() => setOtherCapitalRows(otherCapitalRows + 1)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    + Add Row
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex gap-4 justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          ← Back
        </button>
        <button
          type="submit"
          onClick={() => onSubmit(form.getValues())}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
