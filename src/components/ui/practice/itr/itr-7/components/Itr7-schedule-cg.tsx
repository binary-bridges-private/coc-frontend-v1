import React from "react";
import { UseFormReturn } from "react-hook-form";
import { ITR7FormData } from "../itr-7.types.ts";

interface ScheduleCGProps {
  form: UseFormReturn<ITR7FormData>;
  onCancel: () => void;
  onSubmit: (data: ITR7FormData) => void;
}

const ScheduleCG: React.FC<ScheduleCGProps> = ({
  form,
  onCancel,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule CG
          </h1>
          <p className="text-slate-600 text-lg">
            Capital Gains (Short-term and Long-term)
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            PART A: SHORT-TERM CAPITAL GAINS (STCG)
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            (Sub-items 4 & 5 are not applicable for residents)
          </p>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              1. From sale of land or building or both
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              (fill up details separately for each property)(in case of
              co-ownership, enter your share of capital gain)
            </p>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of purchase/acquisition (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  {...register("cg_stcg_1_date_acq")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of sale/transfer (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  {...register("cg_stcg_1_date_sale")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded mb-3">
              <h4 className="font-semibold text-slate-700 mb-2">
                a. Computation of Capital Gain
              </h4>
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      i. Full value of consideration received/receivable (ai)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1a_i_fvoc")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      ii. Value of property as per stamp valuation authority
                      (aii)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1a_ii_stamp")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      iii. Full value adopted (aiii)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1a_iii_adopted")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded mb-3">
              <h4 className="font-semibold text-slate-700 mb-2">
                b. Deductions u/s 48
              </h4>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      i. Cost of acquisition without indexation (bi)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1b_i_coa_ni")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      ii. Cost of Improvement without indexation (bii)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1b_ii_coi_ni")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      iii. Expenditure wholly and exclusively in connection with
                      transfer (biii)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1b_iii_expl_trans")}
                      className="w-full px-2 py-1 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600">
                      iv. Total (bi + bii + biii) (biv)
                    </label>
                    <input
                      type="number"
                      {...register("cg_stcg_1b_iv_total")}
                      className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    c. Balance (aiii - biv) (1c)
                  </label>
                  <input
                    type="number"
                    {...register("cg_stcg_1c_balance")}
                    className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    d. Deduction u/s 54/54GA (1d)
                  </label>
                  <input
                    type="number"
                    {...register("cg_stcg_1d_deduction")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded mt-2 font-bold">
              <label className="text-xs font-medium text-slate-700">
                e. Short-term Capital Gains on Immovable property (1c - 1d)
                (A1e)
              </label>
              <input
                type="number"
                {...register("cg_stcg_1e_stcg_immov")}
                className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              2. From stump sale
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  A. Fair market value as per Rule 11UAE(2) (2ai)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_2a_fmv_rule2")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  B. Fair market value as per Rule 11UAE(3) (2aii)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_2b_fmv_rule3")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  C. Full value of consideration (higher of ai or all) (2aiii)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_2c_fvoc_higher")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  D. Net worth of the under taking or division (2b)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_2d_networth")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  E. Short-term Capital gains from stump sale (2aii-2b) (A2e)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_2e_stcg_stump")}
                  className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              3. From sale of equity share or unit of equity oriented Mutual
              Fund (MF) or unit of a business trust on which STT is paid
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  a. Full value of consideration (3a)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_3a_fvoc")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <h4 className="font-semibold text-slate-700 mb-2 text-sm">
                  b. Deductions u/s 48
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    {...register("cg_stcg_3b_i_coa_ni")}
                    placeholder="i. Cost of acquisition (bi)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_3b_ii_coi_ni")}
                    placeholder="ii. Cost of Improvement (bii)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_3b_iii_expl")}
                    placeholder="iii. Expenditure (biii)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_3b_iv_total")}
                    placeholder="iv. Total (biv)"
                    className="px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  c. Balance (3a - biv) (3c)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_3c_balance")}
                  className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  d. Loss u/s 94(7) or 94(8) - (if applicable) (3d)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_3d_loss")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div className="bg-blue-100 p-2 rounded font-bold">
                <label className="text-sm font-medium text-slate-700">
                  e. Short-term Capital gain on equity share or equity oriented
                  MF (3c+3d) (A3e)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_3e_stcg_equity")}
                  className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              4. For NON-RESIDENT, not being an FII- from sale of shares or
              debentures of an Indian company
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  a. STCG on transactions covered by TCS u/s 194LA (A4a)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_4a_tcs")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  b. STCG from sale of shares not covered in A4a (A4b)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_4b_other")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              5. For RESIDENTS- from sale of securities (other than those at A3
              above) by an FII as per section 115AD
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  i. In case securities sold include shares of a company other
                  than quoted shares
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <input
                    type="number"
                    {...register("cg_stcg_5i_a_fvoc")}
                    placeholder="a. Full value of consideration (ia)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_5i_b_fmv")}
                    placeholder="b. Fair market value (ib)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_5i_c_adopted")}
                    placeholder="c. Full value adopted (ic)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_5i_ii_other")}
                    placeholder="ii. Full value in respect of other securities (aii)"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_5i_iii_total")}
                    placeholder="iii. Total (ic + ii) (aiii)"
                    className="px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  ii. Deductions u/s 48 - Total (bi+bii+biii) (biv)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_5ii_deduction")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div className="bg-blue-100 p-2 rounded font-bold">
                <label className="text-sm font-medium text-slate-700">
                  iii. Balance (aiii - biv) (5c)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_5c_balance")}
                  className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              6. From sale of assets other than A1 or A2 or A3 or A4 or A5 above
            </h3>
            <div className="space-y-2">
              <div className="bg-slate-50 p-2 rounded">
                <h4 className="font-semibold text-slate-700 mb-2 text-sm">
                  A. Unquoted shares
                </h4>
                <div className="space-y-1 text-sm">
                  <input
                    type="number"
                    {...register("cg_stcg_6a_i_fvoc")}
                    placeholder="a. Full value of consideration (ia)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_6a_ii_fmv")}
                    placeholder="b. Fair market value (ib)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_stcg_6a_iii_adopted")}
                    placeholder="c. Full value adopted (ic)"
                    className="w-full px-2 py-1 border rounded font-bold bg-yellow-100"
                  />
                </div>
              </div>
              <div className="bg-slate-50 p-2 rounded">
                <h4 className="font-semibold text-slate-700 mb-2 text-sm">
                  B. Deductions u/s 48
                </h4>
                <input
                  type="number"
                  {...register("cg_stcg_6b_deduction")}
                  placeholder="Total (bi+bii+biii) (biv)"
                  className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                />
              </div>
              <div className="bg-blue-100 p-2 rounded font-bold">
                <label className="text-sm font-medium text-slate-700">
                  C. Balance (6aiii - 6biv) (6c)
                </label>
                <input
                  type="number"
                  {...register("cg_stcg_6c_balance")}
                  className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              7. Amount deemed to be short term capital gains
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_stcg_7_deemed")}
                placeholder="Amount of deemed short term capital gains (Xi+ Xii+ Xiii + b) (A7g)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              8. Pass Through Income/Loss in the nature of Short Term Capital
              Gain
            </h3>
            <div className="space-y-1 text-sm">
              <input
                type="number"
                {...register("cg_stcg_8a_passthrough_15")}
                placeholder="a. Pass Through Income/Loss in the nature of Short Term Capital Gain, chargeable @ 15%"
                className="w-full px-2 py-1 border rounded"
              />
              <input
                type="number"
                {...register("cg_stcg_8b_passthrough_20")}
                placeholder="b. Pass Through Income/Loss in the nature of Short Term Capital Gain, chargeable @ 20%"
                className="w-full px-2 py-1 border rounded"
              />
              <input
                type="number"
                {...register("cg_stcg_8c_passthrough_30")}
                placeholder="c. Pass Through Income/Loss in the nature of Short Term Capital Gain, chargeable @ 30%"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              9. Amount of STCG not claimed as chargeable to tax or chargeable
              at special rates
            </h3>
            <div className="space-y-1 text-sm">
              <input
                type="number"
                {...register("cg_stcg_9a_dtaa_not_claimed")}
                placeholder="a. Total amount of STCG not claimed as chargeable to tax in India as per DTAA (A9a)"
                className="w-full px-2 py-1 border rounded"
              />
              <input
                type="number"
                {...register("cg_stcg_9b_special_rates")}
                placeholder="b. Total amount of STCG claimed as chargeable to tax at special rates in India as per DTAA (A9b)"
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>

          <div className="bg-blue-200 p-4 rounded font-bold mb-6">
            <label className="text-sm font-medium text-slate-700">
              10. Total Short-term Capital Gain (A1e+ A2e+ A3e+A4a+ A4b+ A5c+
              A6c+ A7g+ A8+ A8a-A9a+ A9b)
            </label>
            <input
              type="number"
              {...register("cg_stcg_10_total")}
              className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-300"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            PART B: LONG-TERM CAPITAL GAINS (LTCG)
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            (Sub-items 6, 7 & 8 are not applicable for residents)
          </p>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              1. From sale of land or building or both
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of purchase/acquisition (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  {...register("cg_ltcg_1_date_acq")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date of sale/transfer (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  {...register("cg_ltcg_1_date_sale")}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded mb-3">
              <h4 className="font-semibold text-slate-700 mb-2">
                a. Computation of Capital Gain
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    i. Full value of consideration received/receivable (B1i)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1a_i_fvoc")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    ii. Value of property as per stamp valuation authority
                    (B1ii)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1a_ii_stamp")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    iii. Full value adopted (B1iii)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1a_iii_adopted")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded mb-3">
              <h4 className="font-semibold text-slate-700 mb-2">
                b. Deductions u/s 48
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    i. Cost of acquisition without indexation (B1bi)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_i_coa_ni")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    iia. Cost of acquisition with indexation - Applicable only
                    for transfers before 23rd July 2024 (B1iia)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iia_coa_indexed")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    iib. Total Cost of Improvement (B1iib)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iib_coi_total")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div className="ml-4 space-y-1 text-xs">
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iib_a_coi_ni")}
                    placeholder="(a) Cost of improvement without indexation"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iib_b_coi_indexed")}
                    placeholder="(b) Year of improvement"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iib_c_coi_indexed_23jul")}
                    placeholder="(c) Cost of improvement with indexation (for transfers before 23rd July 2024 only)"
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    iii. Add row Expenditure wholly and exclusively in
                    connection with transfer (B1iii)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iii_expl")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded">
              <div className="space-y-2">
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    Total (where transfer is before 23rd July 2024 B1bi + Σ
                    B1iib(c) + B1iii; where transfer is on or after 23rd July
                    2024 bi+ Σ B1iib(a) + B1iii) (B1iv)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1b_iv_total")}
                    className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    c. Balance (aiii - biv) (B1c)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1c_balance")}
                    className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">
                    d. Deduction u/s 54D/54EC/54F/54G/54GA (Specify details in
                    item D below) (B1d)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1d_deduction")}
                    className="w-full px-2 py-1 border rounded text-sm"
                  />
                </div>
                <div className="bg-blue-200 font-bold">
                  <label className="text-xs font-medium text-slate-700">
                    e. Long-term Capital Gains on Immovable property (1c - 1d)
                    (B1e)
                  </label>
                  <input
                    type="number"
                    {...register("cg_ltcg_1e_ltcg_immov")}
                    className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              2. From stump sale
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  a. Fair market value as per Rule 11UAE(2) (B2ai)
                </label>
                <input
                  type="number"
                  {...register("cg_ltcg_2a_fmv_rule2")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  b. Fair market value as per Rule 11UAE(3) (B2aii)
                </label>
                <input
                  type="number"
                  {...register("cg_ltcg_2b_fmv_rule3")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  c. Long-term Capital gains from stump sale (B2ei, B2eii, B2e)
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <input
                    type="number"
                    {...register("cg_ltcg_2c_ei")}
                    placeholder="(i) Before 23rd July 2024"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_2c_eii")}
                    placeholder="(ii) On or after 23rd July 2024"
                    className="px-2 py-1 border rounded text-sm"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_2c_e")}
                    placeholder="(iii) Total"
                    className="px-2 py-1 border rounded text-sm font-bold bg-yellow-100"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              3. From residents, from sale of unlisted bonds or unlisted
              debenture
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_ltcg_3a_fvoc")}
                placeholder="a. Full value of consideration (B3a)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_3b_deduction")}
                placeholder="b. Deductions u/s 48 - Total (bi+bii+biii) (B3biv)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_3c_balance")}
                placeholder="c. LTCG on bonds of debenture (3a-biv) (B3c)"
                className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              4. From sale of listed securities (other than a unit) or zero
              coupon bonds as per Section 112(1)
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_ltcg_4a_fvoc")}
                placeholder="a. Full value of consideration (B4a)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <div className="bg-slate-50 p-2 rounded">
                <label className="text-xs font-medium text-slate-600 block mb-2">
                  b. Deductions u/s 48
                </label>
                <div className="space-y-1 text-sm">
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_i_coa_ni")}
                    placeholder="i. Cost of acquisition with indexation (B4bi)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_ia_coa_ni_23jul")}
                    placeholder="ia. Cost of acquisition without indexation (where transfer was before 23rd July 2024, applicable only for computing excess) (B4bia)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_ii_coi_ni")}
                    placeholder="ii. Cost of improvement with indexation (B4bii)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_iia_coi_ni_23jul")}
                    placeholder="iia. Cost of improvement without indexation (where transfer was before 23rd July 2024, applicable only for computing excess) (B4biia)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_iii_expl")}
                    placeholder="iii. Expenditure wholly and exclusively in connection with transfer (B4biii)"
                    className="w-full px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_iv_total")}
                    placeholder="iv. Total (biv) "
                    className="w-full px-2 py-1 border rounded font-bold bg-yellow-100"
                  />
                  <input
                    type="number"
                    {...register("cg_ltcg_4b_iva_total_23jul")}
                    placeholder="iva. Total (biv a) - (for the purpose of computing excess as per proviso to section 112(1)) (B4biv a) "
                    className="w-full px-2 py-1 border rounded font-bold bg-yellow-100"
                  />
                </div>
              </div>
              <input
                type="number"
                {...register("cg_ltcg_4c_balance")}
                placeholder="c. LTCG on listed securities (4a - biv) (B4c)"
                className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              5. From sale of equity share in a company or unit of equity
              oriented fund or unit of a business trust on which STT is paid
              under section 112A
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_ltcg_5a_fvoc")}
                placeholder="a. Full value of consideration (B5a)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_5b_deduction")}
                placeholder="b. Deductions u/s 48 - Cost of acquisition with indexation (B5bi)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_5c_balance")}
                placeholder="c. LTCG on equity shares (5a - 5bi) (B5c)"
                className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-200"
              />
              <input
                type="number"
                {...register("cg_ltcg_5d_col_14")}
                placeholder="d. Sum of column 14 where transfer was before 23rd July 2024 (B5i)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_5e_col_14_23jul")}
                placeholder="e. Sum of column 14 where transfer was on or after 23rd July 2024 (B5ii)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              6. For NON-RESIDENTS- from sale of shares or debenture of Indian
              company
            </h3>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  a. LTCG computed without indexation benefit where transfer was
                  before 23rd July 2024 (B6i)
                </label>
                <input
                  type="number"
                  {...register("cg_ltcg_6a_ni_before_23jul")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  b. LTCG computed without indexation benefit where transfer was
                  before 23rd July 2024 - Listed Debentures (B6ii)
                </label>
                <input
                  type="number"
                  {...register("cg_ltcg_6b_deb_before_23jul")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  c. LTCG computed without indexation benefit where transfer was
                  on or after 23rd July 2024 (B6iii)
                </label>
                <input
                  type="number"
                  {...register("cg_ltcg_6c_ni_after_23jul")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  d. LTCG computed without indexation benefit where transfer was
                  on or after 23rd July 2024 - Listed Debentures (B6iiii)
                </label>
                <input
                  type="number"
                  {...register("cg_ltcg_6d_deb_after_23jul")}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              7-9. For NON-RESIDENTS- from sale of unlisted securities
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_ltcg_7_unlisted")}
                placeholder="7. From sale of assets at B7 above where transfer was before 23rd July 2024 (B7c)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_8_fii_stpt")}
                placeholder="8. For FII (PT) - From sale of equity share or unit of equity oriented fund or unit of a business trust on which STT is paid under section 112A (B8)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_9_cap_gains_immov")}
                placeholder="9. Long-term Capital Gains on assets at B9 above where transfer was before 23 July 2024 (B9e)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              10. Pass Through Income/Loss in the nature of Long-Term Capital
              Gain
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_ltcg_10a_passthrough_10")}
                placeholder="a. Pass Through Income/Loss chargeable @ 10%"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_10b_passthrough_12_5")}
                placeholder="b. Pass Through Income/Loss chargeable @ 12.5%"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_10c_passthrough_20")}
                placeholder="c. Pass Through Income/Loss chargeable @ 20%"
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              11. Amount of LTCG included in items B1-B11 but claimed as not
              chargeable to tax or chargeable at special rates
            </h3>
            <div className="space-y-2">
              <input
                type="number"
                {...register("cg_ltcg_11a_not_claimed")}
                placeholder="a. Total amount of LTCG not claimed as chargeable to tax in India as per DTAA (B12a)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
              <input
                type="number"
                {...register("cg_ltcg_11b_special_rates")}
                placeholder="b. Total amount of LTCG claimed as chargeable to tax at special rates in India as per DTAA (B12b)"
                className="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>

          <div className="bg-blue-200 p-4 rounded font-bold mb-6">
            <label className="text-sm font-medium text-slate-700">
              12. Total long term capital gain (B1e + B2c + B3c + B4c + B5c + B6
              + B7c + B8+ B9e + B10a + B10b + B10c + B11a - B11b + B12a - B12b +
              B13)
            </label>
            <input
              type="number"
              {...register("cg_ltcg_13_total")}
              className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-300"
            />
          </div>

          <div className="bg-green-200 p-4 rounded font-bold mb-6">
            <label className="text-sm font-medium text-slate-700">
              C. Sum of Capital Gain Incomes (Item + IIiii + II+ + 1(iii + 2
              (iii) + IIc + IId + IIe + IIfii + IIg + IIh + IIi + IIj +IIx +
              IIxi + IIxiii)
            </label>
            <input
              type="number"
              {...register("cg_total_capital_gains")}
              className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-300"
            />
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <label className="text-sm font-medium text-slate-700">
              D. Income from transfer of Virtual Digital Assets (Item No. B of
              Schedule VDA)
            </label>
            <input
              type="number"
              {...register("cg_vda_income")}
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              E. Deductions under section 54, 54B, 54D, 54EC, 54F, 54G, 54GA, 54GB, 115F
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">a. Section 54</label>
                  <input type="number" {...register("cg_deduct_54_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">b. Section 54B</label>
                  <input type="number" {...register("cg_deduct_54b_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">c. Section 54D</label>
                  <input type="number" {...register("cg_deduct_54d_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">d. Section 54EC</label>
                  <input type="number" {...register("cg_deduct_54ec_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">e. Section 54F</label>
                  <input type="number" {...register("cg_deduct_54f_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">f. Section 54G</label>
                  <input type="number" {...register("cg_deduct_54g_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">g. Section 54GA</label>
                  <input type="number" {...register("cg_deduct_54ga_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">h. Section 54GB</label>
                  <input type="number" {...register("cg_deduct_54gb_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">i. Section 115F</label>
                  <input type="number" {...register("cg_deduct_115f_amount")} className="w-full px-2 py-1 border rounded text-sm" />
                </div>
              </div>
              <div className="mt-4 bg-yellow-50 p-2 rounded">
                <label className="text-sm font-bold text-slate-700">Total Deductions</label>
                <input type="number" {...register("cg_deduct_total")} className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100" />
              </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              F. Set-off of current year capital losses with current year capital gains
            </h3>
            <div className="space-y-2">
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="text-sm font-medium text-slate-700">1. Short Term Capital Loss set-off</label>
                    <input type="number" {...register("cg_setoff_stcg_loss")} className="w-full px-2 py-1 border rounded text-sm" />
                 </div>
                 <div>
                    <label className="text-sm font-medium text-slate-700">2. Long Term Capital Loss set-off</label>
                    <input type="number" {...register("cg_setoff_ltcg_loss")} className="w-full px-2 py-1 border rounded text-sm" />
                 </div>
               </div>
               <div className="mt-2">
                  <label className="text-sm font-bold text-slate-700">Total Loss Set-off</label>
                  <input type="number" {...register("cg_setoff_total_loss")} className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-100" />
               </div>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">
              G. Information about accrual/receipt of capital gain
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600 border-collapse border border-slate-200">
                <thead className="bg-slate-100 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-2 border border-slate-200">Type of Capital Gain</th>
                    <th className="px-4 py-2 border border-slate-200">Upto 15/6</th>
                    <th className="px-4 py-2 border border-slate-200">16/6 to 15/9</th>
                    <th className="px-4 py-2 border border-slate-200">16/9 to 15/12</th>
                    <th className="px-4 py-2 border border-slate-200">16/12 to 15/3</th>
                    <th className="px-4 py-2 border border-slate-200">16/3 to 31/3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-slate-200 font-medium">Short Term Capital Gains</td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_stcg_15_6")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_stcg_16_9")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_stcg_16_12")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_stcg_16_3")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_stcg_31_3")} className="w-full px-1 py-0.5 border rounded" /></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-slate-200 font-medium">Long Term Capital Gains</td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_ltcg_15_6")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_ltcg_16_9")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_ltcg_16_12")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_ltcg_16_3")} className="w-full px-1 py-0.5 border rounded" /></td>
                    <td className="px-4 py-2 border border-slate-200"><input type="number" {...register("cg_accrual_ltcg_31_3")} className="w-full px-1 py-0.5 border rounded" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6 border border-slate-300 rounded-lg p-4">
            <label className="text-sm font-medium text-slate-700">
              H. Income chargeable under the head "CAPITAL GAINS"
            </label>
            <input
              type="number"
              {...register("cg_income_chargeable")}
              className="w-full px-2 py-1 border rounded text-sm font-bold bg-yellow-300"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-slate-400 text-white rounded-lg hover:bg-slate-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleCG;
