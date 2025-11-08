import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Schema for Advance Tax and Self-Assessment Tax
const advanceTaxRowSchema = z.object({
  bsrCode: z.string().optional().or(z.literal('')),
  dateOfDeposit: z.string().optional().or(z.literal('')),
  serialNumberOfChallan: z.string().optional().or(z.literal('')),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
});

// Schema for TDS from Salary (Form 16)
const tdsSalaryRowSchema = z.object({
  tanOfEmployer: z.string().optional().or(z.literal('')),
  nameOfEmployer: z.string().optional().or(z.literal('')),
  incomeChargeable: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  totalTaxDeducted: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
});

// Schema for TDS from other sources (Form 16B/16C/16E)
const tdsOtherRowSchema = z.object({
  tdsCredit: z.enum(['self', 'spouse', 'other'], { message: 'Select TDS credit' }).optional().or(z.literal('')),
  panAadhaar: z.string().optional().or(z.literal('')),
  section: z.string().optional().or(z.literal('')),
  unclaimedTDSBrought: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tdsCurrentYearFin: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tdsCurrentYearDeducted: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tdsDeductedInOwnHands: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tdsDeductedInHandsOfSpouse: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tdsClaimedInOwnHands: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tdsClaimedInHandsOfSpouse: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  grossAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  headOfIncome: z.string().optional().or(z.literal('')),
  tdsCreditBeingCarried: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
});

// Schema for TCS (Form 27D)
const tcsRowSchema = z.object({
  tcsCredit: z.enum(['self', 'spouse', 'other'], { message: 'Select TCS credit' }).optional().or(z.literal('')),
  taxDeductionAccountNumber: z.string().optional().or(z.literal('')),
  panOfOtherPerson: z.string().optional().or(z.literal('')),
  unclaimedTCSBrought: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tcsCurrentYearCollected: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tcsCollectedInOwnHands: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tcsCollectedInHandsOfSpouse: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tcsClaimedInOwnHands: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
  tcsClaimedPANAadhaar: z.string().optional().or(z.literal('')),
  tcsCreditBeingCarried: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
});

const taxPaymentsSchema = z.object({
  // Section A: Advance Tax and Self-Assessment Tax
  advanceTaxRows: z.array(advanceTaxRowSchema),
  
  // Section B: TDS from Salary
  tdsSalaryRows: z.array(tdsSalaryRowSchema),
  
  // Section C: TDS from other sources
  tdsOtherRows: z.array(tdsOtherRowSchema),
  
  // Section D: TCS
  tcsRows: z.array(tcsRowSchema),
  
  // Verification
  verificationCapacity: z.string().min(1, 'Capacity is required'),
  verificationPlace: z.string().min(1, 'Place is required'),
  verificationDate: z.string().min(1, 'Date is required'),
  
  // Tax Return Preparer (TRP) details
  hasTRP: z.enum(['yes', 'no'], { message: 'Please select' }).optional(),
  trpIdentificationNumber: z.string().optional().or(z.literal('')),
  trpName: z.string().optional().or(z.literal('')),
  trpCounterSignature: z.string().optional().or(z.literal('')),
  trpReimbursementAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').optional().or(z.literal('')),
});

export type TaxPaymentsFormData = z.infer<typeof taxPaymentsSchema>;

interface ItrTwoTaxPaymentsProps {
  onSave: (data: TaxPaymentsFormData) => void;
  onBack: () => void;
  initialData?: Partial<TaxPaymentsFormData>;
}

const ItrTwoTaxPayments: React.FC<ItrTwoTaxPaymentsProps> = ({ onSave, onBack, initialData }) => {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<TaxPaymentsFormData>({
    resolver: zodResolver(taxPaymentsSchema),
    defaultValues: initialData || {
      advanceTaxRows: [{ bsrCode: '', dateOfDeposit: '', serialNumberOfChallan: '', amount: '' }],
      tdsSalaryRows: [{ tanOfEmployer: '', nameOfEmployer: '', incomeChargeable: '', totalTaxDeducted: '' }],
      tdsOtherRows: [],
      tcsRows: [],
      verificationCapacity: '',
      verificationPlace: '',
      verificationDate: '',
      hasTRP: undefined,
      trpIdentificationNumber: '',
      trpName: '',
      trpCounterSignature: '',
      trpReimbursementAmount: '',
    }
  });

  const { fields: advanceTaxFields, append: appendAdvanceTax, remove: removeAdvanceTax } = useFieldArray({
    control,
    name: 'advanceTaxRows'
  });

  const { fields: tdsSalaryFields, append: appendTDSSalary, remove: removeTDSSalary } = useFieldArray({
    control,
    name: 'tdsSalaryRows'
  });

  const { fields: tdsOtherFields, append: appendTDSOther, remove: removeTDSOther } = useFieldArray({
    control,
    name: 'tdsOtherRows'
  });

  const { fields: tcsFields, append: appendTCS, remove: removeTCS } = useFieldArray({
    control,
    name: 'tcsRows'
  });

  const hasTRP = watch('hasTRP');

  const onSubmit = (data: TaxPaymentsFormData) => {
    console.log('Tax Payments & Verification Data:', data);
    onSave(data);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Tax Payments & Verification</h2>
          <p className="text-sm text-gray-600 mt-1">Details of tax payments and final verification</p>
        </div>

        {/* Section A: Advance Tax and Self-Assessment Tax */}
        <div className="border border-gray-300 rounded-lg p-5 bg-blue-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">A. Details of payments of Advance Tax and Self-Assessment Tax</h3>
            <button
              type="button"
              onClick={() => appendAdvanceTax({ bsrCode: '', dateOfDeposit: '', serialNumberOfChallan: '', amount: '' })}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              + Add Payment
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-4">NOTE: Enter the totals of Advance tax and Self-Assessment tax in SI Nos. 15a & 15d of Part B-TTI</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2">SI No</th>
                  <th className="border border-gray-300 px-3 py-2">BSR Code</th>
                  <th className="border border-gray-300 px-3 py-2">Date of Deposit (DD/MM/YYYY)</th>
                  <th className="border border-gray-300 px-3 py-2">Serial Number of Challan</th>
                  <th className="border border-gray-300 px-3 py-2">Amount (Rs)</th>
                  <th className="border border-gray-300 px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {advanceTaxFields.map((field, idx) => (
                  <tr key={field.id}>
                    <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`advanceTaxRows.${idx}.bsrCode`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="BSR Code"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="date"
                        {...register(`advanceTaxRows.${idx}.dateOfDeposit`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`advanceTaxRows.${idx}.serialNumberOfChallan`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Challan No"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`advanceTaxRows.${idx}.amount`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeAdvanceTax(idx)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section B: TDS from Salary */}
        <div className="border border-gray-300 rounded-lg p-5 bg-green-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">B. Details of Tax Deducted at Source from Salary [As per Form 16 issued by Employer(s)]</h3>
            <button
              type="button"
              onClick={() => appendTDSSalary({ tanOfEmployer: '', nameOfEmployer: '', incomeChargeable: '', totalTaxDeducted: '' })}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              + Add Employer
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-4">NOTE: Please enter total of column 5 in 15b of Part B-TTI</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-3 py-2">SI No</th>
                  <th className="border border-gray-300 px-3 py-2">Tax Deduction Account Number (TAN) of the Employer</th>
                  <th className="border border-gray-300 px-3 py-2">Name of the Employer</th>
                  <th className="border border-gray-300 px-3 py-2">Income chargeable under Salaries</th>
                  <th className="border border-gray-300 px-3 py-2">Total tax deducted</th>
                  <th className="border border-gray-300 px-3 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {tdsSalaryFields.map((field, idx) => (
                  <tr key={field.id}>
                    <td className="border border-gray-300 px-2 py-2 text-center">{idx + 1}</td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`tdsSalaryRows.${idx}.tanOfEmployer`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="TAN"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="text"
                        {...register(`tdsSalaryRows.${idx}.nameOfEmployer`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Employer Name"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsSalaryRows.${idx}.incomeChargeable`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsSalaryRows.${idx}.totalTaxDeducted`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="border border-gray-300 px-2 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeTDSSalary(idx)}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section C: TDS from other sources */}
        <div className="border border-gray-300 rounded-lg p-5 bg-yellow-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">C. Details of Tax Deducted at Source from Other Income [As per Form 16A/16B/16C/16E furnished by Deductor(s)]</h3>
            <button
              type="button"
              onClick={() => appendTDSOther({ 
                tdsCredit: '', panAadhaar: '', section: '', unclaimedTDSBrought: '', 
                tdsCurrentYearFin: '', tdsCurrentYearDeducted: '', tdsDeductedInOwnHands: '', 
                tdsDeductedInHandsOfSpouse: '', tdsClaimedInOwnHands: '', tdsClaimedInHandsOfSpouse: '', 
                grossAmount: '', headOfIncome: '', tdsCreditBeingCarried: '' 
              })}
              className="px-4 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700"
            >
              + Add TDS Entry
            </button>
          </div>
          
          {tdsOtherFields.length > 0 ? (
            <div className="space-y-4">
              {tdsOtherFields.map((field, idx) => (
                <div key={field.id} className="p-4 bg-white border border-gray-300 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">TDS Entry #{idx + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTDSOther(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TDS Credit</label>
                      <select
                        {...register(`tdsOtherRows.${idx}.tdsCredit`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="self">Self</option>
                        <option value="spouse">Spouse</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">PAN/Aadhaar</label>
                      <input
                        type="text"
                        {...register(`tdsOtherRows.${idx}.panAadhaar`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="PAN/Aadhaar"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Section</label>
                      <input
                        type="text"
                        {...register(`tdsOtherRows.${idx}.section`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Section"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Unclaimed TDS Brought</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsOtherRows.${idx}.unclaimedTDSBrought`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TDS Current Year (Financial)</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsOtherRows.${idx}.tdsCurrentYearFin`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TDS Deducted (Own Hands)</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsOtherRows.${idx}.tdsDeductedInOwnHands`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TDS Claimed (Own Hands)</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsOtherRows.${idx}.tdsClaimedInOwnHands`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Gross Amount</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tdsOtherRows.${idx}.grossAmount`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No TDS entries added yet.</p>
          )}
        </div>

        {/* Section D: TCS */}
        <div className="border border-gray-300 rounded-lg p-5 bg-purple-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">D. Details of Tax Collected at Source (TCS) [As per Form 27D issued by the Collector(s)]</h3>
            <button
              type="button"
              onClick={() => appendTCS({ 
                tcsCredit: '', taxDeductionAccountNumber: '', panOfOtherPerson: '', 
                unclaimedTCSBrought: '', tcsCurrentYearCollected: '', tcsCollectedInOwnHands: '', 
                tcsCollectedInHandsOfSpouse: '', tcsClaimedInOwnHands: '', tcsClaimedPANAadhaar: '', 
                tcsCreditBeingCarried: '' 
              })}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              + Add TCS Entry
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-4">NOTE: Please enter total of column 7(i) in 15c of Part B-TTI</p>
          
          {tcsFields.length > 0 ? (
            <div className="space-y-4">
              {tcsFields.map((field, idx) => (
                <div key={field.id} className="p-4 bg-white border border-gray-300 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">TCS Entry #{idx + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTCS(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TCS Credit</label>
                      <select
                        {...register(`tcsRows.${idx}.tcsCredit`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select</option>
                        <option value="self">Self</option>
                        <option value="spouse">Spouse</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Tax Deduction Account Number</label>
                      <input
                        type="text"
                        {...register(`tcsRows.${idx}.taxDeductionAccountNumber`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Account Number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">PAN of Other Person</label>
                      <input
                        type="text"
                        {...register(`tcsRows.${idx}.panOfOtherPerson`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="PAN"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Unclaimed TCS Brought</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tcsRows.${idx}.unclaimedTCSBrought`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TCS Current Year Collected</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tcsRows.${idx}.tcsCurrentYearCollected`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TCS Collected (Own Hands)</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tcsRows.${idx}.tcsCollectedInOwnHands`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TCS Claimed (Own Hands)</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tcsRows.${idx}.tcsClaimedInOwnHands`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">TCS Credit Being Carried</label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`tcsRows.${idx}.tcsCreditBeingCarried`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No TCS entries added yet.</p>
          )}
        </div>

        {/* Verification Section */}
        <div className="border border-gray-800 rounded-lg p-6 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800 mb-6">VERIFICATION</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded border border-gray-300">
              <p className="text-sm text-gray-700 mb-4">
                I, <strong>son/daughter of ________________</strong>, solemnly declare that to the best of my knowledge
                and belief, the information given in the return and schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.
              </p>
              <p className="text-sm text-gray-700 mb-4">
                I further declare that I am making return in my capacity as <span className="text-red-600">*</span> and I am also competent to make this return and verify it.
                I am holding permanent account number <strong>(if allotted)</strong> (Please see instruction). I further declare that the critical assumptions specified in the agreement to which I am party,
                have been satisfied and all the terms and conditions of the agreement have been complied with. (Applicable in a case where return is furnished under section 92CD)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Capacity <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register('verificationCapacity')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="e.g., Self"
                />
                {errors.verificationCapacity && (
                  <p className="text-red-600 text-xs mt-1">{errors.verificationCapacity.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  {...register('verificationPlace')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="City/Town"
                />
                {errors.verificationPlace && (
                  <p className="text-red-600 text-xs mt-1">{errors.verificationPlace.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  {...register('verificationDate')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                {errors.verificationDate && (
                  <p className="text-red-600 text-xs mt-1">{errors.verificationDate.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tax Return Preparer (TRP) Section */}
        <div className="border border-gray-300 rounded-lg p-5 bg-blue-50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">If the return has been prepared by a Tax Return Preparer (TRP) give further details below:</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Has this return been prepared by a TRP?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('hasTRP')}
                  value="yes"
                  className="mr-2"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  {...register('hasTRP')}
                  value="no"
                  className="mr-2"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>

          {hasTRP === 'yes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded border border-gray-300">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Identification No. of TRP</label>
                <input
                  type="text"
                  {...register('trpIdentificationNumber')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="TRP ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name of TRP</label>
                <input
                  type="text"
                  {...register('trpName')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="TRP Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counter Signature of TRP</label>
                <input
                  type="text"
                  {...register('trpCounterSignature')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="Signature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  If TRP is entitled for any reimbursement from the Government, amount thereof
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('trpReimbursementAmount')}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => console.log('Preview:', watch())}
            className="px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
          >
            Preview Data
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 font-semibold text-lg shadow-lg"
          >
            Submit ITR-2 Return
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoTaxPayments;
