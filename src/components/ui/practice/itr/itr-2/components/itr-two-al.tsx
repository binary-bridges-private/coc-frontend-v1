import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation Schema
const alSchema = z.object({
  // Section (i): Immovable Assets
  immovableAssets: z.array(
    z.object({
      description: z.string().min(1, 'Description is required'),
      address: z.string().min(1, 'Address is required'),
      pinCode: z.string().regex(/^\d{6}$/, 'PIN must be 6 digits').optional().or(z.literal('')),
      amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
    })
  ),
  
  // Section (ii): Movable Assets
  movableAssets: z.object({
    // (i) Jewellery, bullion etc
    jewellery: z.array(
      z.object({
        description: z.string().min(1, 'Description is required'),
        amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
      })
    ),
    
    // (ii) Archaeological collections, drawings, paintings, sculpture or any work of art
    archaeological: z.array(
      z.object({
        description: z.string().min(1, 'Description is required'),
        amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
      })
    ),
    
    // (iii) Vehicles, yachts, boats and aircrafts
    vehicles: z.array(
      z.object({
        description: z.string().min(1, 'Description is required'),
        amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
      })
    ),
    
    // (iv) Financial Assets
    financialAssets: z.object({
      // (a) Bank (including all deposits)
      bank: z.array(
        z.object({
          description: z.string().min(1, 'Description is required'),
          amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
        })
      ),
      
      // (b) Shares and securities
      shares: z.array(
        z.object({
          description: z.string().min(1, 'Description is required'),
          amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
        })
      ),
      
      // (c) Insurance policies
      insurance: z.array(
        z.object({
          description: z.string().min(1, 'Description is required'),
          amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
        })
      ),
      
      // (d) Loans and advances given
      loans: z.array(
        z.object({
          description: z.string().min(1, 'Description is required'),
          amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
        })
      ),
      
      // (e) Cash in hand
      cash: z.array(
        z.object({
          description: z.string().min(1, 'Description is required'),
          amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
        })
      ),
    }),
    
    // (v) Annuities in relation to Assets at (A + B)
    annuities: z.array(
      z.object({
        description: z.string().min(1, 'Description is required'),
        amount: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid amount').min(1, 'Amount is required'),
      })
    ),
  }),
  
  // Auto-calculated totals
  totalImmovableAssets: z.string().optional(),
  totalMovableAssets: z.string().optional(),
  grandTotal: z.string().optional(),
});

type ALFormData = z.infer<typeof alSchema>;

interface ItrTwoALProps {
  onSave?: (data: ALFormData) => void;
  initialData?: Partial<ALFormData>;
}

const ItrTwoAL: React.FC<ItrTwoALProps> = ({ onSave, initialData }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ALFormData>({
    resolver: zodResolver(alSchema),
    defaultValues: initialData || {
      immovableAssets: [],
      movableAssets: {
        jewellery: [],
        archaeological: [],
        vehicles: [],
        financialAssets: {
          bank: [],
          shares: [],
          insurance: [],
          loans: [],
          cash: [],
        },
        annuities: [],
      },
      totalImmovableAssets: '0.00',
      totalMovableAssets: '0.00',
      grandTotal: '0.00',
    },
  });

  // Immovable Assets
  const { fields: immovableFields, append: appendImmovable, remove: removeImmovable } = useFieldArray({
    control,
    name: 'immovableAssets',
  });

  // Movable Assets - Jewellery
  const { fields: jewelleryFields, append: appendJewellery, remove: removeJewellery } = useFieldArray({
    control,
    name: 'movableAssets.jewellery',
  });

  // Archaeological
  const { fields: archaeologicalFields, append: appendArchaeological, remove: removeArchaeological } = useFieldArray({
    control,
    name: 'movableAssets.archaeological',
  });

  // Vehicles
  const { fields: vehiclesFields, append: appendVehicles, remove: removeVehicles } = useFieldArray({
    control,
    name: 'movableAssets.vehicles',
  });

  // Financial Assets
  const { fields: bankFields, append: appendBank, remove: removeBank } = useFieldArray({
    control,
    name: 'movableAssets.financialAssets.bank',
  });

  const { fields: sharesFields, append: appendShares, remove: removeShares } = useFieldArray({
    control,
    name: 'movableAssets.financialAssets.shares',
  });

  const { fields: insuranceFields, append: appendInsurance, remove: removeInsurance } = useFieldArray({
    control,
    name: 'movableAssets.financialAssets.insurance',
  });

  const { fields: loansFields, append: appendLoans, remove: removeLoans } = useFieldArray({
    control,
    name: 'movableAssets.financialAssets.loans',
  });

  const { fields: cashFields, append: appendCash, remove: removeCash } = useFieldArray({
    control,
    name: 'movableAssets.financialAssets.cash',
  });

  // Annuities
  const { fields: annuitiesFields, append: appendAnnuities, remove: removeAnnuities } = useFieldArray({
    control,
    name: 'movableAssets.annuities',
  });

  // Watch all amounts for auto-calculation
  const watchedImmovable = watch('immovableAssets');
  const watchedJewellery = watch('movableAssets.jewellery');
  const watchedArchaeological = watch('movableAssets.archaeological');
  const watchedVehicles = watch('movableAssets.vehicles');
  const watchedBank = watch('movableAssets.financialAssets.bank');
  const watchedShares = watch('movableAssets.financialAssets.shares');
  const watchedInsurance = watch('movableAssets.financialAssets.insurance');
  const watchedLoans = watch('movableAssets.financialAssets.loans');
  const watchedCash = watch('movableAssets.financialAssets.cash');
  const watchedAnnuities = watch('movableAssets.annuities');

  // Auto-calculate totals
  useEffect(() => {
    const sumArray = (arr: any[], field: string = 'amount') => {
      return arr?.reduce((sum, item) => {
        const val = parseFloat(item?.[field] || '0');
        return sum + (isNaN(val) ? 0 : val);
      }, 0) || 0;
    };

    const totalImmovable = sumArray(watchedImmovable);
    
    const totalJewellery = sumArray(watchedJewellery);
    const totalArchaeological = sumArray(watchedArchaeological);
    const totalVehicles = sumArray(watchedVehicles);
    const totalBank = sumArray(watchedBank);
    const totalShares = sumArray(watchedShares);
    const totalInsurance = sumArray(watchedInsurance);
    const totalLoans = sumArray(watchedLoans);
    const totalCash = sumArray(watchedCash);
    const totalAnnuities = sumArray(watchedAnnuities);
    
    const totalMovable = totalJewellery + totalArchaeological + totalVehicles + 
                         totalBank + totalShares + totalInsurance + totalLoans + totalCash + 
                         totalAnnuities;
    
    const grandTotal = totalImmovable + totalMovable;

    setValue('totalImmovableAssets', totalImmovable.toFixed(2));
    setValue('totalMovableAssets', totalMovable.toFixed(2));
    setValue('grandTotal', grandTotal.toFixed(2));
  }, [
    watchedImmovable, watchedJewellery, watchedArchaeological, watchedVehicles,
    watchedBank, watchedShares, watchedInsurance, watchedLoans, watchedCash, watchedAnnuities,
    setValue
  ]);

  const onSubmit = (data: ALFormData) => {
    console.log('Schedule AL Data:', data);
    onSave?.(data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Header */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Schedule AL</h2>
          <p className="mt-1 text-sm text-gray-600">
            Assets and Liabilities at the end of the year (applicable in a case where total income exceeds Rs. 1 Crore.)
          </p>
        </div>

        {/* Section (i): Immovable Assets */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">(i) Details of Immovable Assets</h3>
            <button
              type="button"
              onClick={() => appendImmovable({ description: '', address: '', pinCode: '', amount: '' })}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              + Add Immovable Asset
            </button>
          </div>

          {immovableFields.length === 0 && (
            <p className="text-sm italic text-gray-500">No immovable assets added yet. Click "Add Immovable Asset" to begin.</p>
          )}

          <div className="space-y-3">
            {immovableFields.map((field, idx) => (
              <div key={field.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Asset #{idx + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeImmovable(idx)}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Description *</label>
                    <input
                      type="text"
                      {...register(`immovableAssets.${idx}.description`)}
                      placeholder="e.g., Residential Property, Land"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.immovableAssets?.[idx]?.description && (
                      <p className="mt-1 text-xs text-red-600">{errors.immovableAssets[idx]?.description?.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Address *</label>
                    <input
                      type="text"
                      {...register(`immovableAssets.${idx}.address`)}
                      placeholder="Full address"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.immovableAssets?.[idx]?.address && (
                      <p className="mt-1 text-xs text-red-600">{errors.immovableAssets[idx]?.address?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">PIN Code</label>
                    <input
                      type="text"
                      {...register(`immovableAssets.${idx}.pinCode`)}
                      placeholder="6 digits"
                      maxLength={6}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.immovableAssets?.[idx]?.pinCode && (
                      <p className="mt-1 text-xs text-red-600">{errors.immovableAssets[idx]?.pinCode?.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Amount (cost) in Rs. *</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register(`immovableAssets.${idx}.amount`)}
                      placeholder="0.00"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.immovableAssets?.[idx]?.amount && (
                      <p className="mt-1 text-xs text-red-600">{errors.immovableAssets[idx]?.amount?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section (ii): Movable Assets */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">(ii) Details of Movable Assets</h3>

          {/* (i) Jewellery, bullion etc. */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">(i) Jewellery, bullion etc.</h4>
              <button
                type="button"
                onClick={() => appendJewellery({ description: '', amount: '' })}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {jewelleryFields.map((field, idx) => (
                <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    {...register(`movableAssets.jewellery.${idx}.description`)}
                    placeholder="Description"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`movableAssets.jewellery.${idx}.amount`)}
                      placeholder="Amount"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeJewellery(idx)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* (ii) Archaeological collections */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">(ii) Archaeological collections, drawings, paintings, sculpture or any work of art</h4>
              <button
                type="button"
                onClick={() => appendArchaeological({ description: '', amount: '' })}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {archaeologicalFields.map((field, idx) => (
                <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    {...register(`movableAssets.archaeological.${idx}.description`)}
                    placeholder="Description"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`movableAssets.archaeological.${idx}.amount`)}
                      placeholder="Amount"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeArchaeological(idx)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* (iii) Vehicles, yachts, boats and aircrafts */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">(iii) Vehicles, yachts, boats and aircrafts</h4>
              <button
                type="button"
                onClick={() => appendVehicles({ description: '', amount: '' })}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {vehiclesFields.map((field, idx) => (
                <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    {...register(`movableAssets.vehicles.${idx}.description`)}
                    placeholder="Description"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`movableAssets.vehicles.${idx}.amount`)}
                      placeholder="Amount"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeVehicles(idx)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* (iv) Financial Assets */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-4 text-sm font-semibold text-gray-900">(iv) Financial Assets</h4>

            {/* (a) Bank */}
            <div className="mb-3 pl-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">(a) Bank (including all deposits)</h5>
                <button
                  type="button"
                  onClick={() => appendBank({ description: '', amount: '' })}
                  className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {bankFields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input
                      type="text"
                      {...register(`movableAssets.financialAssets.bank.${idx}.description`)}
                      placeholder="Bank/Account details"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`movableAssets.financialAssets.bank.${idx}.amount`)}
                        placeholder="Amount"
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeBank(idx)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* (b) Shares and securities */}
            <div className="mb-3 pl-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">(b) Shares and securities</h5>
                <button
                  type="button"
                  onClick={() => appendShares({ description: '', amount: '' })}
                  className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {sharesFields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input
                      type="text"
                      {...register(`movableAssets.financialAssets.shares.${idx}.description`)}
                      placeholder="Share/Security details"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`movableAssets.financialAssets.shares.${idx}.amount`)}
                        placeholder="Amount"
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeShares(idx)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* (c) Insurance policies */}
            <div className="mb-3 pl-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">(c) Insurance policies</h5>
                <button
                  type="button"
                  onClick={() => appendInsurance({ description: '', amount: '' })}
                  className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {insuranceFields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input
                      type="text"
                      {...register(`movableAssets.financialAssets.insurance.${idx}.description`)}
                      placeholder="Policy details"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`movableAssets.financialAssets.insurance.${idx}.amount`)}
                        placeholder="Amount"
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeInsurance(idx)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* (d) Loans and advances given */}
            <div className="mb-3 pl-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">(d) Loans and advances given</h5>
                <button
                  type="button"
                  onClick={() => appendLoans({ description: '', amount: '' })}
                  className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {loansFields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input
                      type="text"
                      {...register(`movableAssets.financialAssets.loans.${idx}.description`)}
                      placeholder="Loan/Advance details"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`movableAssets.financialAssets.loans.${idx}.amount`)}
                        placeholder="Amount"
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeLoans(idx)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* (e) Cash in hand */}
            <div className="mb-3 pl-4">
              <div className="mb-2 flex items-center justify-between">
                <h5 className="text-sm font-medium text-gray-700">(e) Cash in hand</h5>
                <button
                  type="button"
                  onClick={() => appendCash({ description: '', amount: '' })}
                  className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-2">
                {cashFields.map((field, idx) => (
                  <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <input
                      type="text"
                      {...register(`movableAssets.financialAssets.cash.${idx}.description`)}
                      placeholder="Cash details"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`movableAssets.financialAssets.cash.${idx}.amount`)}
                        placeholder="Amount"
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeCash(idx)}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* (v) Annuities */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">(v) Annuities in relation to Assets at (A + B)</h4>
              <button
                type="button"
                onClick={() => appendAnnuities({ description: '', amount: '' })}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-700"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {annuitiesFields.map((field, idx) => (
                <div key={field.id} className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <input
                    type="text"
                    {...register(`movableAssets.annuities.${idx}.description`)}
                    placeholder="Description"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register(`movableAssets.annuities.${idx}.amount`)}
                      placeholder="Amount"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeAnnuities(idx)}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Totals */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-base font-semibold text-gray-900">Summary</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <label className="mb-2 block text-sm font-medium text-gray-700">Total Immovable Assets</label>
              <input
                type="text"
                {...register('totalImmovableAssets')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-right font-semibold text-gray-900"
              />
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <label className="mb-2 block text-sm font-medium text-gray-700">Total Movable Assets</label>
              <input
                type="text"
                {...register('totalMovableAssets')}
                readOnly
                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-right font-semibold text-gray-900"
              />
            </div>
            <div className="rounded-lg border border-green-500 bg-green-50 p-3 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-green-700">Grand Total (A + B)</label>
              <input
                type="text"
                {...register('grandTotal')}
                readOnly
                className="w-full rounded-lg border border-green-500 bg-green-50 px-3 py-2 text-right text-lg font-bold text-green-700"
              />
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50 p-4">
          <p className="text-sm text-gray-700">
            <strong>NOTE:</strong> Please refer to instructions for filling out this schedule.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => console.log('Current form data:', watch())}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Preview Data
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save Schedule AL
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoAL;
