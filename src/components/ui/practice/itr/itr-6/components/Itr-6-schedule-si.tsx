import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ScheduleSIProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ScheduleSI: React.FC<ScheduleSIProps> = ({
  form,
  onSubmit,
  onCancel,
}) => {
  const { register, watch, handleSubmit, formState } = form;

  const incomeItems = [
    {
      id: "1a",
      num: "1a",
      section: "115A or section 115AD(1)(b) - Proviso (STCG on shares/equity)",
      rate: 15,
      note: "(part of 5va of Schedule BTA)",
    },
    {
      id: "1b",
      num: "1b",
      section: "115A or section 115AD(1)(b) - Proviso (STCG on shares units on which STT paid)",
      rate: 20,
      note: "(part of 5vb of Schedule BTA)",
    },
    {
      id: "2",
      num: "2",
      section: "115AD (STCG for FIIs on securities where STT not paid)",
      rate: 30,
      note: "(part of 5vi of Schedule BTA)",
    },
    {
      id: "2a",
      num: "2a",
      section: "Proviso to 112(1) (LTCG on listed securities/units with indexation) where transfer was before 23rd July 2024",
      rate: 20,
      note: "(as reduced by 115JE) (part of Schedule CG if any)",
    },
    {
      id: "2b",
      num: "2b",
      section: "112(1)(b) (LTCG on listed securities/units) where transfer was on or after 23rd July 2024",
      rate: 12.5,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2c",
      num: "2c",
      section: "112(1)(c)(ii) (LTCG on non-resident unlisted securities or other listed securities) where transfer was before 23rd July 2024",
      rate: 10,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2d",
      num: "2d",
      section: "112(1)(c)(iii) (LTCG for non-resident on unlisted securities) where transfer was on or after 23rd July 2024",
      rate: 12.5,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2e",
      num: "2e",
      section: "115AB (LTCG for non-resident on units referred in section(115AB) where transfer was before 23rd July 2024",
      rate: 10,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2f",
      num: "2f",
      section: "115AB (LTCG for non-resident on units referred in section(115AB) where transfer was on or after 23rd July 2024",
      rate: 12.5,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2g",
      num: "2g",
      section: "115AC (LTCG for non-resident on bonds/CDI/where transfer was before 23rd July 2024)",
      rate: 10,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2h",
      num: "2h",
      section: "115AC (LTCG for non-resident on bonds/CDI) where transfer was on or after 23rd July 2024",
      rate: 12.5,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2i",
      num: "2i",
      section: "115AD (LTCG for FII on securities)",
      rate: 20,
      note: "(part of 5a of Schedule BTA)",
    },
    {
      id: "2j",
      num: "2j",
      section: "115E (STCG on unlisted) [where transfer / event was before 23rd July 2024 as applicable]",
      rate: 20,
      note: "(part of 5e of Schedule BTA)",
    },
    {
      id: "2k",
      num: "2k",
      section: "115E (LTCG on unlisted) [where transfer / event was on or after 23rd July 2024 as applicable]",
      rate: 12.5,
      note: "(part of 5e of Schedule BTA)",
    },
    {
      id: "2l",
      num: "2l",
      section: "112A or section 115AD(1)(b)(iii) - Proviso (LTCG on sale of shares) on which STT paid (transfer was before 23rd July 2024)",
      rate: 10,
      note: "(5ab of Schedule BTA)",
    },
    {
      id: "2m",
      num: "2m",
      section: "112A or section 115AD(1)(b)(iii) - Proviso (LTCG on sale of shares or units on which STT is paid) (transfer / event was on or after 23rd July 2024)",
      rate: 12.5,
      note: "(5ab of Schedule BTA)",
    },
    {
      id: "3",
      num: "3",
      section: "STCG chargeable at special rates in India as per DTAA",
      rate: null,
      note: "(part of 5i of Schedule BTA)",
    },
    {
      id: "4",
      num: "4",
      section: "LTCG Chargeable at special rates in India as per DTAA",
      rate: null,
      note: "(part of 5i of Schedule BTA)",
    },
    {
      id: "5",
      num: "5",
      section: "115B (Profits and gains of life insurance business)",
      rate: 12.5,
      note: "(7b of Schedule BTA)",
    },
    {
      id: "6",
      num: "6",
      section: "115AC (Income by way of interest received by non-resident from bonds purchased in foreign currency)",
      rate: 10,
      note: "(part of 2c a of Schedule CS)",
    },
    {
      id: "7",
      num: "7",
      section: "115BJ (Winnings from lotteries, puzzles, races, games etc.)",
      rate: 30,
      note: "(2a of Schedule CS)",
    },
    {
      id: "8",
      num: "8",
      section: "115BJJ (Winnings from online games)",
      rate: 30,
      note: "(2a of Schedule CS)",
    },
    {
      id: "9",
      num: "9",
      section: "115BBE (Income under section 68, 69, 69A, 69B, 69C or 69D)",
      rate: 60,
      note: "(3b of Schedule CS)",
    },
    {
      id: "10",
      num: "10",
      section: "115BDF (Income from patent)",
      rate: 10,
      note: "(3d of Schedule BP)",
    },
    {
      id: "11",
      num: "11",
      section: "Income under head business or profession",
      rate: 10,
      note: "(2c of Schedule CS)",
    },
    {
      id: "12",
      num: "12",
      section: "115BBG (Income from transfer of carbon credits)",
      rate: 10,
      note: "(1e of Schedule BP)",
    },
    {
      id: "13",
      num: "13",
      section: "Income under head business or profession",
      rate: 10,
      note: "(2c of Schedule CS)",
    },
    {
      id: "14",
      num: "14",
      section: "Income under head other sources",
      rate: 10,
      note: "(2c of Schedule CS)",
    },
    {
      id: "15",
      num: "15",
      section: "115BBH - Tax on Income from Virtual Digital asset",
      rate: 30,
      note: "(3f of Schedule BF)",
    },
    {
      id: "15a",
      num: "15a",
      section: "Income under head business or profession",
      rate: 30,
      note: "(3f of Schedule BF)",
    },
    {
      id: "15b",
      num: "15b",
      section: "Income under head Capital Gain",
      rate: 30,
      note: "(C2 of Schedule CG)",
    },
    {
      id: "16",
      num: "16",
      section: "115A(1)(b) (A) & 115A(1)(b)(B) (Income of a non-resident from Royalty)",
      rate: 10,
      note: "(part of 2cvii of Schedule CS)",
    },
  ];

  const calculateTotals = () => {
    let totalIncome = 0;
    let totalTax = 0;

    incomeItems.forEach((item) => {
      const income = parseFloat(watch(`si_income_${item.id}`) || 0) || 0;
      totalIncome += income;

      if (item.rate) {
        const tax = (income * item.rate) / 100;
        totalTax += tax;
      }
    });

    return { totalIncome, totalTax };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Schedule SI: Special Income Taxed at Special Rates
          </h1>
          <p className="text-blue-700">
            Income chargeable at special rates under various sections
          </p>
        </div>

        {/* Income Details Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Special Income Items with Applicable Rates
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 px-2 py-2 text-left w-8">
                    SNo
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left">
                    Section/Description
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-16">
                    Rate (%)
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-24">
                    Income (₹)
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-center w-24">
                    Tax Comp (₹)
                  </th>
                  <th className="border border-gray-300 px-2 py-2 text-left w-32">
                    Schedule Reference
                  </th>
                </tr>
              </thead>
              <tbody>
                {incomeItems.map((item) => {
                  const income = parseFloat(watch(`si_income_${item.id}`) || 0) || 0;
                  const tax = item.rate ? (income * item.rate) / 100 : 0;

                  return (
                    <tr key={item.id} className="hover:bg-blue-50">
                      <td className="border border-gray-300 px-2 py-2 font-bold text-blue-700">
                        {item.num}
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-xs">
                        <div className="font-semibold text-gray-800">
                          {item.section}
                        </div>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center font-semibold">
                        {item.rate ? `${item.rate}%` : "DTAA"}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="number"
                          placeholder="0"
                          step="0.01"
                          {...register(`si_income_${item.id}`)}
                          className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center bg-blue-50 font-semibold text-xs">
                        ₹ {tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="border border-gray-300 px-2 py-1 text-xs text-gray-600">
                        {item.note}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-blue-100 font-bold">
                  <td colSpan={3} className="border border-gray-300 px-2 py-2">
                    Total Special Income
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-blue-700">
                    ₹ {totals.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-blue-700">
                    ₹ {totals.totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-300 px-2 py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Special Income</p>
              <p className="text-2xl font-bold">₹ {totals.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm opacity-90 mb-2">Total Tax on Special Income</p>
              <p className="text-2xl font-bold">₹ {totals.totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Information Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                Income taxed at special rates includes capital gains, winnings, and specific heads
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Special rates vary from 10% to 60% depending on nature of income</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>STCG rates changed with effect from 23rd July 2024</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>DTAA rates apply for non-residents as per applicable treaty</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>These items are included in total income for computation purposes</span>
            </li>
          </ul>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleSI;
