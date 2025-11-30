import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7ScheduleFDData } from './itr-7-schedule-fd.types';

interface Itr7ScheduleFDProps {
  form: UseFormReturn<ITR7ScheduleFDData>;
}

const Itr7ScheduleFD: React.FC<Itr7ScheduleFDProps> = ({ form }) => {
  const { register } = form;

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">SCHEDULE FD</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          Break-up of payments/receipts in Foreign currency
        </span>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        (to be filled up by the assessee who is not liable to get accounts audited u/s 44AB)
      </div>

      <div className="mb-8 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-[50px]">S. No.</th>
              <th className="border p-2 text-left">Foreign Currency Transaction</th>
              <th className="border p-2 w-[200px]">Amount (in Rs.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center">i</td>
              <td className="border p-2">Payments made during the year on capital account</td>
              <td className="border p-2">
                <input
                  type="number"
                  {...register("scheduleFD.payments_capital_account")}
                  className="w-full p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">ii</td>
              <td className="border p-2">Payments made during the year on revenue account</td>
              <td className="border p-2">
                <input
                  type="number"
                  {...register("scheduleFD.payments_revenue_account")}
                  className="w-full p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">iii</td>
              <td className="border p-2">Receipts during the year on capital account</td>
              <td className="border p-2">
                <input
                  type="number"
                  {...register("scheduleFD.receipts_capital_account")}
                  className="w-full p-1 border rounded text-right"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2 text-center">iv</td>
              <td className="border p-2">Receipts during the year on revenue account</td>
              <td className="border p-2">
                <input
                  type="number"
                  {...register("scheduleFD.receipts_revenue_account")}
                  className="w-full p-1 border rounded text-right"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Itr7ScheduleFD;
