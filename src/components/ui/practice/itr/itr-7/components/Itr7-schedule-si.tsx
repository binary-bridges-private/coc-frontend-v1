import React from "react";
import { UseFormReturn } from "react-hook-form";
import type { ITR7FormData } from "../itr-7.types";

interface ScheduleSIProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleSI: React.FC<ScheduleSIProps> = ({ form, onCancel, onSubmit }) => {
  const { register, watch } = form;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Schedule SI</h2>
      <p className="text-gray-600 mb-6">
        Income chargeable to tax at special rates [Please see instructions for section and rate of tax]
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Note:</span> Provide details of income chargeable at special rates including LTCG, STCG, and other concessional rate income.
          </p>
        </div>

        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-300 px-4 py-2 text-left">Sl. No.</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Section/Description</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Special rate (%)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Income (i)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tax thereon (ii)</th>
              </tr>
            </thead>
            <tbody>
              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">1a</td>
                <td className="border border-gray-300 px-4 py-2">
                  115A or section 115AD(1)(b)(ii)- Proviso (STCG on shares/equity) [where transfer was before 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">15</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_1a_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">1b</td>
                <td className="border border-gray-300 px-4 py-2">
                  115A or section 115AD(1)(b)(ii)- Proviso (STCG on shares units on which STT paid) [where transfer was on or after 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_1b_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">2</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AD STCG for FIIs on securities where STT not paid
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">30</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_2_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">3a</td>
                <td className="border border-gray-300 px-4 py-2">
                  Proviso 112(1) (LTCG on listed securities/ units with indexation) [where transfer was before 23rd July 2024 as applicable and tax thereon after taking into account Sl. No. 3(4) of Schedule CG, if any]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20 (as reduced by Schedule CG, if any)</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_3a_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">3b</td>
                <td className="border border-gray-300 px-4 py-2">
                  112(1) (LTCG on listed securities/ units) [where transfer was on or after 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_3b_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">4a</td>
                <td className="border border-gray-300 px-4 py-2">
                  112(1)(c)(iii) (LTCG for non-resident on unlisted securities) [where transfer was before 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_4a_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">4b</td>
                <td className="border border-gray-300 px-4 py-2">
                  112(1)(c)(iii) (LTCG for non-resident on unlisted securities or other than Listed Debentures) [where transfer was on or after 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_4b_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">5a</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AB (LTCG for non-resident on units referred in section 115AB) [where transfer was before 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_5a_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">5b</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AB (LTCG for non-resident on units referred in section115AB) where transfer was on or after 23rd July 2024 as applicable
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_5b_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">6a</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AC (LTCG for non-resident on bonds/GDR) [where transfer was before 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_6a_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">6b</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AC (LTCG for non-resident on bonds/GDR) [where transfer was on or after 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_6b_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              {/* Row 7 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">7</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AD (LTCG for FII on securities)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    {...register("special_si_7_income" as any, { valueAsNumber: true })}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span>
                </td>
              </tr>

              {/* Row 8a */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">8a</td>
                <td className="border border-gray-300 px-4 py-2">
                  112 (LTCG on others) [where transfer was before 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_8a_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 8b */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">8b</td>
                <td className="border border-gray-300 px-4 py-2">
                  112 (LTCG on others) [where transfer was on or after 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_8b_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 9a */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">9a</td>
                <td className="border border-gray-300 px-4 py-2">
                  112A (LTCG on shares or units on which STT is paid) or section 115AD(1)(b)(ii)-Proviso [where transfer was before 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_9a_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 9b */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">9b</td>
                <td className="border border-gray-300 px-4 py-2">
                  112A (LTCG on sale of shares or units on which STT is paid) or section 115AD(1)(b)(ii)-Proviso [where transfer was on or after 23rd July 2024 as applicable]
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_9b_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 10 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  STCG chargeable at special rates in India as per DTAA
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_10_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 11 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">11</td>
                <td className="border border-gray-300 px-4 py-2">
                  LTCG Chargeable at special rates in India as per DTAA
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_11_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 12 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">12</td>
                <td className="border border-gray-300 px-4 py-2">
                  115B (Profits and gains of life-insurance business
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.50</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_12_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(5(ii) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 13a */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">13a</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AC ([income by way of interest received by non-resident from bonds purchased in foreign currency)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_13a_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 2cx of Schedule OS)</span></td>
              </tr>

              {/* Row 13b */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">13b</td>
                <td className="border border-gray-300 px-4 py-2">
                  115AC (Income by way of Dividend received by non-resident on GDR purchased in foreign currency)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_13b_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 2cx of Schedule OS)</span></td>
              </tr>

              {/* Row 14 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">14</td>
                <td className="border border-gray-300 px-4 py-2">
                  115BH (Winnings from lotteries, puzzles, races, games etc.)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">30</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_14_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(2a of Schedule OS)</span></td>
              </tr>

              {/* Row 15 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">15</td>
                <td className="border border-gray-300 px-4 py-2">
                  115BBJJ (Winnings from online games)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">30</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_15_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(2ab of Schedule OS)</span></td>
              </tr>

              {/* Row 16 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">16</td>
                <td className="border border-gray-300 px-4 py-2">
                  115BBFH- Tax on Income from Virtual Digital asset
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_16_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2" />
              </tr>

              {/* Row 17 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">17</td>
                <td className="border border-gray-300 px-4 py-2">
                  115BBE (Income under section 68, 69, 69A, 69B, 69C or 69D)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">60</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_17_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(2b of Schedule OS)</span></td>
              </tr>

              {/* Row 18 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">18</td>
                <td className="border border-gray-300 px-4 py-2">
                  115A1(1)(b)(A) & 115A1(1)(b)(B)(Income of a foreign company from Royalty & Fees for Technical Services )
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_18_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 2cx of Schedule OS)</span></td>
              </tr>

              {/* Row 19 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">19</td>
                <td className="border border-gray-300 px-4 py-2">
                  115BBF ( Income from patent)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_19_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2" />
              </tr>

              {/* Row 20 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">20</td>
                <td className="border border-gray-300 px-4 py-2">
                  115BBG (Income from transfer of carbon credits)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_20_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2" />
              </tr>

              {/* Additional rows 22-30 */}
              {/* Row 22a */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">22a</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Short Term Capital Gain chargeable @ 15%
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">15</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_22a_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 22b */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">22b</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Short Term Capital Gain chargeable @ 20%
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_22b_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 23 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">23</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Short Term Capital Gain chargeable @ 30%
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">30</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_23_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 24a */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">24a</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Long Term Capital Gain chargeable @ 10% u/s 112A
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_24a_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 24b */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">24b</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Long Term Capital Gain chargeable @ 12.5% u/s 112A
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_24b_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i)a of Schedule BFLA)</span></td>
              </tr>

              {/* Row 25 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">25</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Long Term Capital Gain chargeable @ 20%
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">20</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_25_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 26a */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">26a</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Long Term Capital Gain chargeable @ 10% other than section 112A
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_26a_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 26b */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">26b</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass Through Income in the nature of Long Term Capital Gain chargeable @ 12.5% other than section 112A
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">12.5</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_26b_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 5(i) of Schedule BFLA)</span></td>
              </tr>

              {/* Row 27 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">27</td>
                <td className="border border-gray-300 px-4 py-2">
                  Pass through income in the nature of income from other source chargeable at special rates (Drop down to be provided in e-filing utility)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_27_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(2d of Schedule OS)</span></td>
              </tr>

              {/* Row 28 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">28</td>
                <td className="border border-gray-300 px-4 py-2">
                  Income received in respect of units purchased in foreign currency by an offshore fund-115AB(1)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">10</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_28_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(2cx of Schedule OS)</span></td>
              </tr>

              {/* Row 29 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">29</td>
                <td className="border border-gray-300 px-4 py-2">
                  Income from royalty where agreement entered between 31.3.1961 to 31.3.1976 and income from fees for technical services where agreement entered between 29.2.1964 to 31.3.1976, agreement is approved by the Central Government.
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">50</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_29_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(2cx of Schedule OS)</span></td>
              </tr>

              {/* Row 30 */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">30</td>
                <td className="border border-gray-300 px-4 py-2">
                  Paragraph FII of Part I of first schedule of Finance Act<br/>
                  Any other income chargeable at special rate (Drop down to be provided in e-filing utility)
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center font-semibold">-</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="number" {...register("special_si_30_income" as any, { valueAsNumber: true })} className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="0" />
                </td>
                <td className="border border-gray-300 px-4 py-2"><span className="text-gray-600 text-sm">(part of 2c of Schedule OS)</span></td>
              </tr>

              {/* Total Row */}
              <tr className="bg-gray-200 font-bold">
                <td colSpan={3} className="border border-gray-300 px-4 py-2">
                  Total
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(
                    (watch("special_si_1a_income" as any) || 0) +
                    (watch("special_si_1b_income" as any) || 0) +
                    (watch("special_si_2_income" as any) || 0) +
                    (watch("special_si_3a_income" as any) || 0) +
                    (watch("special_si_3b_income" as any) || 0) +
                    (watch("special_si_4a_income" as any) || 0) +
                    (watch("special_si_4b_income" as any) || 0) +
                    (watch("special_si_5a_income" as any) || 0) +
                    (watch("special_si_5b_income" as any) || 0) +
                    (watch("special_si_6a_income" as any) || 0) +
                    (watch("special_si_6b_income" as any) || 0) +
                    (watch("special_si_7_income" as any) || 0) +
                    (watch("special_si_8a_income" as any) || 0) +
                    (watch("special_si_8b_income" as any) || 0) +
                    (watch("special_si_9a_income" as any) || 0) +
                    (watch("special_si_9b_income" as any) || 0) +
                    (watch("special_si_10_income" as any) || 0) +
                    (watch("special_si_11_income" as any) || 0) +
                    (watch("special_si_12_income" as any) || 0) +
                    (watch("special_si_13a_income" as any) || 0) +
                    (watch("special_si_13b_income" as any) || 0) +
                    (watch("special_si_14_income" as any) || 0) +
                    (watch("special_si_15_income" as any) || 0) +
                    (watch("special_si_16_income" as any) || 0) +
                    (watch("special_si_17_income" as any) || 0) +
                    (watch("special_si_18_income" as any) || 0) +
                    (watch("special_si_19_income" as any) || 0) +
                    (watch("special_si_20_income" as any) || 0) +
                    (watch("special_si_22a_income" as any) || 0) +
                    (watch("special_si_22b_income" as any) || 0) +
                    (watch("special_si_23_income" as any) || 0) +
                    (watch("special_si_24a_income" as any) || 0) +
                    (watch("special_si_24b_income" as any) || 0) +
                    (watch("special_si_25_income" as any) || 0) +
                    (watch("special_si_26a_income" as any) || 0) +
                    (watch("special_si_26b_income" as any) || 0) +
                    (watch("special_si_27_income" as any) || 0) +
                    (watch("special_si_28_income" as any) || 0) +
                    (watch("special_si_29_income" as any) || 0) +
                    (watch("special_si_30_income" as any) || 0)
                  ).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2" />
              </tr>
            </tbody>
          </table>
        </div>

        
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

export default ScheduleSI;
