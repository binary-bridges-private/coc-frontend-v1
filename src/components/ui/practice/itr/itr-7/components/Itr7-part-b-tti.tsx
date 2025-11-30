import React, { useEffect } from 'react';
import { useForm, UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, Trash2 } from "lucide-react";
import { ITR7PartBTTIData } from './itr-7-part-b-tti.types';

interface Itr7PartBTTIProps {
  form: UseFormReturn<ITR7PartBTTIData>;
}

const Itr7PartBTTI: React.FC<Itr7PartBTTIProps> = ({ form }) => {
  const { register, control, setValue } = form;
  const values = useWatch({ control });

  const { fields: bankFields, append: appendBank, remove: removeBank } = useFieldArray({ control, name: "partBTTI.bank_accounts" });
  const { fields: advanceTaxFields, append: appendAdvanceTax, remove: removeAdvanceTax } = useFieldArray({ control, name: "partBTTI.tax_payments.advance_tax" });
  const { fields: tdsFields, append: appendTDS, remove: removeTDS } = useFieldArray({ control, name: "partBTTI.tax_payments.tds" });
  const { fields: tcsFields, append: appendTCS, remove: removeTCS } = useFieldArray({ control, name: "partBTTI.tax_payments.tcs" });

  // Helper to safely get number values
  const getVal = (path: string): number => {
    const val = path.split('.').reduce((obj: any, key) => obj?.[key], values);
    return Number(val) || 0;
  };

  // Calculations
  useEffect(() => {
    // 1d. Total Tax Payable u/s 115JB
    const total115JB = 
      getVal('partBTTI.computation_tax_liability.tax_payable_deemed_total_income_115jb') +
      getVal('partBTTI.computation_tax_liability.surcharge_115jb') +
      getVal('partBTTI.computation_tax_liability.cess_115jb');
    setValue('partBTTI.computation_tax_liability.total_tax_payable_115jb', total115JB);

    // 2c. Tax Payable on Total Income
    const taxTotalIncome = 
      getVal('partBTTI.computation_tax_liability.tax_at_normal_rates') +
      getVal('partBTTI.computation_tax_liability.tax_at_special_rates');
    setValue('partBTTI.computation_tax_liability.tax_payable_total_income', taxTotalIncome);

    // 2diii. Total Surcharge
    const totalSurcharge = 
      getVal('partBTTI.computation_tax_liability.surcharge.rate_25_percent') +
      getVal('partBTTI.computation_tax_liability.surcharge.on_balance');
    setValue('partBTTI.computation_tax_liability.surcharge.total_surcharge', totalSurcharge);

    // 2f. Gross tax liability
    const grossTaxLiability = 
      taxTotalIncome + 
      totalSurcharge + 
      getVal('partBTTI.computation_tax_liability.cess');
    setValue('partBTTI.computation_tax_liability.gross_tax_liability', grossTaxLiability);

    // 3. Gross tax payable (higher of 1d and 2f)
    const grossTaxPayable = Math.max(total115JB, grossTaxLiability);
    setValue('partBTTI.computation_tax_liability.gross_tax_payable', grossTaxPayable);

    // 5. Tax payable after credit
    const taxAfterCredit = Math.max(0, grossTaxPayable - getVal('partBTTI.computation_tax_liability.credit_115jaa'));
    setValue('partBTTI.computation_tax_liability.tax_payable_after_credit', taxAfterCredit);

    // 6c. Total Tax Relief
    const totalRelief = 
      getVal('partBTTI.computation_tax_liability.tax_relief.section_90_90a') +
      getVal('partBTTI.computation_tax_liability.tax_relief.section_91');
    setValue('partBTTI.computation_tax_liability.tax_relief.total_relief', totalRelief);

    // 7. Net tax liability
    const netTaxLiability = Math.max(0, taxAfterCredit - totalRelief);
    setValue('partBTTI.computation_tax_liability.net_tax_liability', netTaxLiability);

    // 8e. Total Interest and Fee
    const totalInterest = 
      getVal('partBTTI.computation_tax_liability.interest_fee_payable.section_234a') +
      getVal('partBTTI.computation_tax_liability.interest_fee_payable.section_234b') +
      getVal('partBTTI.computation_tax_liability.interest_fee_payable.section_234c') +
      getVal('partBTTI.computation_tax_liability.interest_fee_payable.section_234f');
    setValue('partBTTI.computation_tax_liability.interest_fee_payable.total_interest_fee', totalInterest);

    // 9. Aggregate liability
    const aggregateLiability = netTaxLiability + totalInterest;
    setValue('partBTTI.computation_tax_liability.aggregate_liability', aggregateLiability);

    // 10e. Total Taxes Paid
    const totalTaxesPaid = 
      getVal('partBTTI.taxes_paid.advance_tax') +
      getVal('partBTTI.taxes_paid.tds') +
      getVal('partBTTI.taxes_paid.tcs') +
      getVal('partBTTI.taxes_paid.self_assessment_tax');
    setValue('partBTTI.taxes_paid.total_taxes_paid', totalTaxesPaid);

    // 11. Amount payable
    const amountPayable = Math.max(0, aggregateLiability - totalTaxesPaid);
    setValue('partBTTI.taxes_paid.amount_payable', amountPayable);

    // 12. Refund
    const refund = Math.max(0, totalTaxesPaid - aggregateLiability);
    setValue('partBTTI.taxes_paid.refund', refund);

    // 14. Tax payable u/s 115TD after adjustment
    const tax115TD = getVal('partBTTI.taxes_paid.net_tax_payable_115td');
    const tax115TDAfterAdj = Math.max(0, tax115TD - refund);
    setValue('partBTTI.taxes_paid.tax_payable_115td_after_adjustment', tax115TDAfterAdj);

    // 15. Net refund after adjustment
    const netRefund = Math.max(0, refund - tax115TD);
    setValue('partBTTI.taxes_paid.net_refund_after_adjustment', netRefund);

  }, [values, setValue]);

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Part B - TTI</h1>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          Computation of tax liability on total income
        </span>
      </div>

      {/* 1. Tax Payable u/s 115JB */}
      <table className="min-w-full border-collapse border border-gray-300 text-sm mb-6">
        <tbody>
          <tr className="bg-gray-100">
            <td className="border p-2 font-semibold w-10">1</td>
            <td className="border p-2" colSpan={3}>Tax Payable on deemed total Income under section 115JB (10 of Schedule MAT)</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 w-10">a</td>
            <td className="border p-2">Tax Payable on deemed total Income under section 115JB</td>
            <td className="border p-2 w-32">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_payable_deemed_total_income_115jb")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">Surcharge on (a) above (if applicable)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.surcharge_115jb")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">c</td>
            <td className="border p-2">Health and Education Cess @ 4% on (1a+1b) above</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.cess_115jb")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">d</td>
            <td className="border p-2">Total Tax Payable u/s 115JB (1a+1b+1c)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.total_tax_payable_115jb")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          {/* 2. Tax payable on total income */}
          <tr className="bg-gray-100">
            <td className="border p-2 font-semibold">2</td>
            <td className="border p-2" colSpan={3}>Tax payable on total income</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">a</td>
            <td className="border p-2">Tax at normal rates on 15 of Part B-TI</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_at_normal_rates")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">Tax at special rates (total of col. (ii) of Schedule-SI)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_at_special_rates")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">c</td>
            <td className="border p-2">Tax Payable on Total Income (2a + 2b)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_payable_total_income")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">d</td>
            <td className="border p-2" colSpan={2}>Surcharge</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">i</td>
            <td className="border p-2">25% of 16(ii) of Schedule SI</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.surcharge.rate_25_percent")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2 pl-6">ii</td>
            <td className="border p-2">On [(2c) – (16(ii) of Schedule SI)]</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.surcharge.on_balance")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 pl-6 font-semibold">iii</td>
            <td className="border p-2">Total (i + ii)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.surcharge.total_surcharge")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">e</td>
            <td className="border p-2">Health and Education Cess @ 4% on (2c+2diii)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.cess")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">f</td>
            <td className="border p-2">Gross tax liability (2c+2diii+2e)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.gross_tax_liability")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          {/* 3-9 Summary */}
          <tr>
            <td className="border p-2 font-semibold">3</td>
            <td className="border p-2" colSpan={2}>Gross tax payable (higher of 1d and 2f)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.gross_tax_payable")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">4</td>
            <td className="border p-2" colSpan={2}>Credit under section 115JAA of tax paid in earlier years (if 2f is more than 1d) (5 of Schedule MATC)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.credit_115jaa")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">5</td>
            <td className="border p-2" colSpan={2}>Tax payable after credit under section 115JAA [ (3 - 4)]</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_payable_after_credit")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          
          <tr>
            <td className="border p-2 font-semibold">6</td>
            <td className="border p-2" colSpan={3}>Tax relief</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">a</td>
            <td className="border p-2">Section 90/90A(2 of Schedule TR)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_relief.section_90_90a")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">Section 91(3 of Schedule TR)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_relief.section_91")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">c</td>
            <td className="border p-2">Total (6a + 6b)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.tax_relief.total_relief")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          <tr>
            <td className="border p-2 font-semibold">7</td>
            <td className="border p-2" colSpan={2}>Net tax liability (5 – 6c) (enter zero if negative)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.net_tax_liability")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          <tr>
            <td className="border p-2 font-semibold">8</td>
            <td className="border p-2" colSpan={3}>Interest and fee payable</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">a</td>
            <td className="border p-2">Interest for default in furnishing the return (section 234A)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.interest_fee_payable.section_234a")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">Interest for default in payment of advance tax (section 234B)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.interest_fee_payable.section_234b")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">c</td>
            <td className="border p-2">Interest for deferment of advance tax (section 234C)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.interest_fee_payable.section_234c")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">d</td>
            <td className="border p-2">Fee for default in furnishing return of income (section 234F)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.interest_fee_payable.section_234f")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">e</td>
            <td className="border p-2">Total Interest and Fee Payable (8a+8b+8c+8d)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.interest_fee_payable.total_interest_fee")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          <tr className="bg-gray-100 font-semibold">
            <td className="border p-2">9</td>
            <td className="border p-2" colSpan={2}>Aggregate liability (7 + 8e)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.computation_tax_liability.aggregate_liability")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          {/* 10. Taxes Paid */}
          <tr>
            <td className="border p-2 font-semibold">10</td>
            <td className="border p-2" colSpan={3}>Taxes Paid</td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">a</td>
            <td className="border p-2">Advance Tax (from column 5 of 15A)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.advance_tax")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">b</td>
            <td className="border p-2">TDS (total of column 9 of 15B )</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.tds")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">c</td>
            <td className="border p-2">TCS (total of column 7 of 15C)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.tcs")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">d</td>
            <td className="border p-2">Self-Assessment Tax (from column 5 of 15A)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.self_assessment_tax")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border p-2"></td>
            <td className="border p-2 font-semibold">e</td>
            <td className="border p-2">Total Taxes Paid (10a+10b+10c + 10d)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.total_taxes_paid")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>

          <tr>
            <td className="border p-2 font-semibold">11</td>
            <td className="border p-2" colSpan={2}>Amount payable (9 - 10e) (Enter if 9 is greater than 10e, else enter 0)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.amount_payable")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">12</td>
            <td className="border p-2" colSpan={2}>Refund (If 10e is greater than 9)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.refund")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">13</td>
            <td className="border p-2" colSpan={2}>Net tax payable on 115TD income including interest u/s 115TE (Sr.no. 12 of Schedule 115TD)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.net_tax_payable_115td")} className="w-full p-1 border rounded text-right" />
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">14</td>
            <td className="border p-2" colSpan={2}>Tax payable u/s 115TD after adjustment of refund at Sl. No. 12 (13-12)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.tax_payable_115td_after_adjustment")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">15</td>
            <td className="border p-2" colSpan={2}>Net refund after adjustment as per Sl. No. 14 (12-13) (refund, if any, will be directly credited into the bank account)</td>
            <td className="border p-2">
              <input type="number" {...register("partBTTI.taxes_paid.net_refund_after_adjustment")} className="w-full p-1 border rounded text-right bg-gray-100" readOnly />
            </td>
          </tr>
        </tbody>
      </table>

      {/* 16. Bank Account Details */}
      <div className="mb-8">
        <h3 className="font-semibold mb-2">16. Do you have a bank account in India</h3>
        <div className="mb-2">
          <h4 className="text-sm font-medium">(a) Details of all Bank Accounts held in India at any time during the previous year (excluding dormant accounts)</h4>
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">IFS Code</th>
                <th className="border p-2">Name of the Bank</th>
                <th className="border p-2">Account Number</th>
                <th className="border p-2">Type of account</th>
                <th className="border p-2">Select for refund</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bankFields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border p-2"><input {...register(`partBTTI.bank_accounts.${index}.ifs_code`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input {...register(`partBTTI.bank_accounts.${index}.bank_name`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input {...register(`partBTTI.bank_accounts.${index}.account_number`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2">
                    <select {...register(`partBTTI.bank_accounts.${index}.account_type`)} className="w-full p-1 border rounded">
                      <option value="">Select</option>
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  </td>
                  <td className="border p-2 text-center"><input type="checkbox" {...register(`partBTTI.bank_accounts.${index}.select_for_refund`)} /></td>
                  <td className="border p-2 text-center"><button type="button" onClick={() => removeBank(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => appendBank({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Bank Account</button>
        </div>
        
        <div className="mb-2">
          <h4 className="text-sm font-medium">(b) Non- residents, may, at their option, furnish the details of one foreign bank account:</h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs">SWIFT Code</label>
              <input {...register("partBTTI.foreign_bank_account.swift_code")} className="w-full p-1 border rounded" />
            </div>
            <div>
              <label className="block text-xs">Name of the Bank</label>
              <input {...register("partBTTI.foreign_bank_account.bank_name")} className="w-full p-1 border rounded" />
            </div>
            <div>
              <label className="block text-xs">Country of Location</label>
              <input {...register("partBTTI.foreign_bank_account.country")} className="w-full p-1 border rounded" />
            </div>
            <div>
              <label className="block text-xs">IBAN</label>
              <input {...register("partBTTI.foreign_bank_account.iban")} className="w-full p-1 border rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* 17. Asset outside India */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <p className="mb-2 text-sm font-medium">17. Do you at any time during the previous year,-</p>
        <ul className="list-disc pl-5 text-sm mb-2 text-gray-700">
          <li>(i) hold, as beneficial owner, beneficiary or otherwise, any asset (including financial interest in any entity) located outside India; or</li>
          <li>(ii) have signing authority in any account located outside India; or</li>
          <li>(iii) have income from any source outside India?</li>
        </ul>
        <p className="text-xs italic mb-2">[applicable only in case of a resident] [Ensure Schedule FA is filled up if the answer is Yes]</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="Yes" {...register("partBTTI.asset_outside_india")} /> Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="No" {...register("partBTTI.asset_outside_india")} /> No
          </label>
        </div>
      </div>

      {/* 18. Tax Payments */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4">18. TAX PAYMENTS</h3>
        
        {/* A. Advance Tax */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 text-sm">A. Details of payments of Advance Tax and Self-Assessment Tax</h4>
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">BSR Code</th>
                <th className="border p-2">Date of Deposit (DD/MM/YYYY)</th>
                <th className="border p-2">Serial Number of Challan</th>
                <th className="border p-2">Amount (Rs)</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {advanceTaxFields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.advance_tax.${index}.bsr_code`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input type="date" {...register(`partBTTI.tax_payments.advance_tax.${index}.date_of_deposit`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.advance_tax.${index}.serial_number`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.advance_tax.${index}.amount`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2 text-center"><button type="button" onClick={() => removeAdvanceTax(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => appendAdvanceTax({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
        </div>

        {/* B. TDS */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 text-sm">B. Details of Tax Deducted at Source (TDS) on Income [As per Form 16 A issued or Form 16B/16C/16D/16E furnished by Deductor(s)]</h4>
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">TAN of Deductor</th>
                <th className="border p-2">Name of Deductor</th>
                <th className="border p-2">Unclaimed TDS b/f</th>
                <th className="border p-2">TDS deducted current year</th>
                <th className="border p-2">TDS credit claimed</th>
                <th className="border p-2">Gross Receipt offered</th>
                <th className="border p-2">Head of Income</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tdsFields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.tds.${index}.tan_deductor`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.tds.${index}.name_deductor`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tds.${index}.unclaimed_tds_brought_forward`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tds.${index}.tds_current_year`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tds.${index}.tds_credit_claimed`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tds.${index}.gross_receipt_offered`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.tds.${index}.head_of_income`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2 text-center"><button type="button" onClick={() => removeTDS(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => appendTDS({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
        </div>

        {/* C. TCS */}
        <div className="mb-6">
          <h4 className="font-medium mb-2 text-sm">C. Details of Tax Collected at Source (TCS) [As per Form 27D issued by the Collector(s)]</h4>
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Tax Deduction Account Number</th>
                <th className="border p-2">Name of Collector</th>
                <th className="border p-2">Unclaimed TCS b/f</th>
                <th className="border p-2">TCS collected current year</th>
                <th className="border p-2">TCS credit claimed</th>
                <th className="border p-2">Gross Receipt offered</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tcsFields.map((field, index) => (
                <tr key={field.id}>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.tcs.${index}.tax_deduction_account_number`)} className="w-full p-1 border rounded uppercase" maxLength={10} /></td>
                  <td className="border p-2"><input {...register(`partBTTI.tax_payments.tcs.${index}.name_collector`)} className="w-full p-1 border rounded" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tcs.${index}.unclaimed_tcs_brought_forward`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tcs.${index}.tcs_current_year`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tcs.${index}.tcs_credit_claimed`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2"><input type="number" {...register(`partBTTI.tax_payments.tcs.${index}.gross_receipt_offered`)} className="w-full p-1 border rounded text-right" /></td>
                  <td className="border p-2 text-center"><button type="button" onClick={() => removeTCS(index)} className="text-red-500"><Trash2 className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => appendTCS({})} className="mt-2 text-blue-600 flex items-center gap-1"><Plus className="h-4 w-4" /> Add Row</button>
        </div>

      </div>
    </div>
  );
};

export default Itr7PartBTTI;
