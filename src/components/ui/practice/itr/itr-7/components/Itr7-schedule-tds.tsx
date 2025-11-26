import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleTDSProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleTDS: React.FC<ScheduleTDSProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;
  const [rows, setRows] = useState(3);

  const addRow = () => {
    setRows(rows + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule TDS</h2>
      <p className="text-gray-600 mb-6">
        Details of tax on distributed income of a domestic company on buy-back of shares
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of tax on distributed income received on buy-back of shares from domestic company. Provide particulars of each buy-back transaction or distribution of income.
          </p>
        </div>

        {/* Distributed Income Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-center">Sl. No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date 1 (DD/MM/YYYY)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date 2 (DD/MM/YYYY)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date 3 (DD/MM/YYYY)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date 4 (DD/MM/YYYY)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date 5 (DD/MM/YYYY)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date 6 (DD/MM/YYYY)</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Date of Buy-back */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center">1</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Date of buy-back of shares</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_date_buyback_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_date_buyback_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_date_buyback_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_date_buyback_4" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_date_buyback_5" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_date_buyback_6" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="DD/MM/YYYY"
                  />
                </td>
              </tr>

              {/* Row 2: Name of company paying */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center">2</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Name of company paying buy-back/distribution</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_company_name_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Company name"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_company_name_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Company name"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_company_name_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Company name"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_company_name_4" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Company name"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_company_name_5" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Company name"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_company_name_6" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Company name"
                  />
                </td>
              </tr>

              {/* Row 3: PAN of company */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center">3</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">PAN of the company</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_pan_company_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_pan_company_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_pan_company_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_pan_company_4" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_pan_company_5" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_pan_company_6" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="PAN"
                    maxLength={10}
                  />
                </td>
              </tr>

              {/* Row 4: ISIN Code */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center">4</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">ISIN Code</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_isin_code_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ISIN"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_isin_code_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ISIN"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_isin_code_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ISIN"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_isin_code_4" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ISIN"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_isin_code_5" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ISIN"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_isin_code_6" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="ISIN"
                  />
                </td>
              </tr>

              {/* Row 5: Serial number of shalin */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center">5</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Serial number of shalin</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_serial_number_1" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Serial #"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_serial_number_2" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Serial #"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_serial_number_3" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Serial #"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_serial_number_4" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Serial #"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_serial_number_5" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Serial #"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    {...register("tds_serial_number_6" as any)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Serial #"
                  />
                </td>
              </tr>

              {/* Row 6: Amount deposited */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold text-center">6</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">Amount deposited</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_amount_deposited_1" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_amount_deposited_2" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_amount_deposited_3" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_amount_deposited_4" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_amount_deposited_5" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_amount_deposited_6" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              {/* Total Row */}
              <tr className="bg-gray-200 font-bold">
                <td colSpan={2} className="border border-gray-300 px-4 py-2">
                  Total Amount Deposited
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(watch("tds_amount_deposited_1" as any) || 0).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(watch("tds_amount_deposited_2" as any) || 0).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(watch("tds_amount_deposited_3" as any) || 0).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(watch("tds_amount_deposited_4" as any) || 0).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(watch("tds_amount_deposited_5" as any) || 0).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(watch("tds_amount_deposited_6" as any) || 0).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Income Details */}
        <div className="border border-gray-300 rounded p-4 bg-gray-50">
          <h3 className="text-lg font-bold mb-4 text-gray-800">Income Details</h3>
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  Income u/s 115BBDH [Tax on buy-back of shares as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_income_115bbdh" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  Income-tax and Interest Payable u/s 115BBDH
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_tax_interest_payable" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">
                  Tax and Interest Payable u/s 115BBDH (Read with section 115BAC)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("tds_tax_interest_115bac" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
              </tr>

              <tr className="bg-gray-200 font-bold hover:bg-gray-200">
                <td className="border border-gray-300 px-4 py-2">
                  Total Tax and Interest Payable
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("tds_tax_interest_payable" as any) || 0) +
                    (watch("tds_tax_interest_115bac" as any) || 0)
                  ).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleTDS;
