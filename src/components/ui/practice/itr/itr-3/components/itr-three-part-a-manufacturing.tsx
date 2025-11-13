import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// Manufacturing Account Form Data Type
export interface ManufacturingFormData {
  // Opening Inventory
  openingStockRawMaterial?: string;
  openingStockWip?: string;
  
  // Purchases and Direct Costs
  purchasesNet?: string;
  directWages?: string;
  
  // Direct Expenses
  carriageInward?: string;
  powerAndFuel?: string;
  otherDirectExpenses?: string;
  
  // Factory Overheads
  indirectWages?: string;
  factoryRentAndRates?: string;
  factoryInsurance?: string;
  factoryFuelAndPower?: string;
  factoryGeneralExpenses?: string;
  depreciationFactoryMachinery?: string;
  
  // Closing Stock
  closingStockRawMaterial?: string;
  closingStockWip?: string;
}

// Zod Schema with validation
const manufacturingSchema = z.object({
  openingStockRawMaterial: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  openingStockWip: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  purchasesNet: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  directWages: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  carriageInward: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  powerAndFuel: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  otherDirectExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  indirectWages: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  factoryRentAndRates: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  factoryInsurance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  factoryFuelAndPower: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  factoryGeneralExpenses: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  depreciationFactoryMachinery: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  closingStockRawMaterial: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
  
  closingStockWip: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative amount' }),
}).superRefine((data, ctx) => {
  // Helper function to safely parse amounts
  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };
  
  // Calculate opening inventory total (1A)
  const openingRawMaterial = parseAmount(data.openingStockRawMaterial);
  const openingWip = parseAmount(data.openingStockWip);
  const openingInventoryTotal = openingRawMaterial + openingWip;
  
  // Calculate direct expenses (D)
  const carriageInward = parseAmount(data.carriageInward);
  const powerAndFuel = parseAmount(data.powerAndFuel);
  const otherDirectExpenses = parseAmount(data.otherDirectExpenses);
  const directExpensesTotal = carriageInward + powerAndFuel + otherDirectExpenses;
  
  // Calculate factory overheads (E)
  const indirectWages = parseAmount(data.indirectWages);
  const factoryRentAndRates = parseAmount(data.factoryRentAndRates);
  const factoryInsurance = parseAmount(data.factoryInsurance);
  const factoryFuelAndPower = parseAmount(data.factoryFuelAndPower);
  const factoryGeneralExpenses = parseAmount(data.factoryGeneralExpenses);
  const depreciationFactoryMachinery = parseAmount(data.depreciationFactoryMachinery);
  const factoryOverheadsTotal = indirectWages + factoryRentAndRates + factoryInsurance + factoryFuelAndPower + factoryGeneralExpenses + depreciationFactoryMachinery;
  
  // Calculate total debits to manufacturing account (1F)
  const purchases = parseAmount(data.purchasesNet);
  const directWages = parseAmount(data.directWages);
  const totalDebits = openingInventoryTotal + purchases + directWages + directExpensesTotal + factoryOverheadsTotal;
  
  // Calculate closing stock total (2)
  const closingRawMaterial = parseAmount(data.closingStockRawMaterial);
  const closingWip = parseAmount(data.closingStockWip);
  const closingStockTotal = closingRawMaterial + closingWip;
  
  // Calculate cost of goods produced (3 = 1F - 2)
  const costOfGoodsProduced = totalDebits - closingStockTotal;
  
  // Log calculations for debugging
  console.log('📊 Manufacturing Account Calculations:', {
    '1.A - Opening Inventory Total': openingInventoryTotal,
    '1.B - Purchases (Net)': purchases,
    '1.C - Direct Wages': directWages,
    '1.D - Direct Expenses Total': directExpensesTotal,
    '1.E - Factory Overheads Total': factoryOverheadsTotal,
    '1.F - Total Debits to Manufacturing Account': totalDebits,
    '2 - Closing Stock Total': closingStockTotal,
    '3 - Cost of Goods Produced (1F - 2)': costOfGoodsProduced,
  });
  
  // Validation: Cost of goods produced should be non-negative
  if (costOfGoodsProduced < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Cost of Goods Produced cannot be negative (₹${costOfGoodsProduced.toFixed(2)}). Review closing stock amounts.`,
      path: [],
    });
  }
  
  // Validation: Closing stock cannot exceed opening inventory + purchases + wages + expenses
  if (closingStockTotal > totalDebits) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Closing Stock (₹${closingStockTotal.toFixed(2)}) cannot exceed Total Debits to Manufacturing Account (₹${totalDebits.toFixed(2)}).`,
      path: [],
    });
  }
});

interface ItrThreePartAManufacturingProps {
  initialData?: ManufacturingFormData;
  onNext: () => void;
  onBack: () => void;
  onSave: (data: ManufacturingFormData) => void;
}

const ItrThreePartAManufacturing: React.FC<ItrThreePartAManufacturingProps> = ({
  initialData,
  onNext,
  onBack,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<ManufacturingFormData>({
    resolver: zodResolver(manufacturingSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  // Watch all amount fields for real-time calculations
  const openingStockRawMaterial = watch('openingStockRawMaterial');
  const openingStockWip = watch('openingStockWip');
  const purchasesNet = watch('purchasesNet');
  const directWages = watch('directWages');
  const carriageInward = watch('carriageInward');
  const powerAndFuel = watch('powerAndFuel');
  const otherDirectExpenses = watch('otherDirectExpenses');
  const indirectWages = watch('indirectWages');
  const factoryRentAndRates = watch('factoryRentAndRates');
  const factoryInsurance = watch('factoryInsurance');
  const factoryFuelAndPower = watch('factoryFuelAndPower');
  const factoryGeneralExpenses = watch('factoryGeneralExpenses');
  const depreciationFactoryMachinery = watch('depreciationFactoryMachinery');
  const closingStockRawMaterial = watch('closingStockRawMaterial');
  const closingStockWip = watch('closingStockWip');

  // Parse utility function
  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // Real-time calculations
  const calculations = useMemo(() => {
    const openingInventoryTotal = parseAmount(openingStockRawMaterial) + parseAmount(openingStockWip);
    const directExpensesTotal = parseAmount(carriageInward) + parseAmount(powerAndFuel) + parseAmount(otherDirectExpenses);
    const factoryOverheadsTotal = parseAmount(indirectWages) + parseAmount(factoryRentAndRates) + parseAmount(factoryInsurance) + parseAmount(factoryFuelAndPower) + parseAmount(factoryGeneralExpenses) + parseAmount(depreciationFactoryMachinery);
    
    const totalDebits = openingInventoryTotal + parseAmount(purchasesNet) + parseAmount(directWages) + directExpensesTotal + factoryOverheadsTotal;
    const closingStockTotal = parseAmount(closingStockRawMaterial) + parseAmount(closingStockWip);
    const costOfGoodsProduced = totalDebits - closingStockTotal;
    
    return {
      openingInventoryTotal,
      directExpensesTotal,
      factoryOverheadsTotal,
      totalDebits,
      closingStockTotal,
      costOfGoodsProduced,
    };
  }, [
    openingStockRawMaterial, openingStockWip, purchasesNet, directWages,
    carriageInward, powerAndFuel, otherDirectExpenses,
    indirectWages, factoryRentAndRates, factoryInsurance, factoryFuelAndPower, factoryGeneralExpenses, depreciationFactoryMachinery,
    closingStockRawMaterial, closingStockWip
  ]);

  const onSubmit = (data: ManufacturingFormData) => {
    onSave(data);
    onNext();
  };

  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([key, error]) => {
      if (error?.message) {
        errorList.push(`${key}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  React.useEffect(() => {
    if (allErrors.length > 0) {
      console.log('❌ Manufacturing Account Validation Errors:', allErrors);
    }
  }, [allErrors]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Part A - Manufacturing Account</h2>
        <p className="mt-2 text-sm text-gray-600">
          Financial Year 2024-25 | Fill items 1 to 3 for regular books of account
        </p>
      </div>

      {/* Error Banner */}
      {hasErrors && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-900">
            ⚠️ Please correct the following {allErrors.length} error(s):
          </p>
          <ul className="mt-2 space-y-1">
            {allErrors.map((error, index) => (
              <li key={index} className="text-xs text-red-800">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Debits to Manufacturing Account */}
        <div className="space-y-6">
          <div className="border-b-2 border-blue-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">1. Debits to Manufacturing Account</h3>
          </div>

          {/* 1.A - Opening Inventory */}
          <div className="space-y-4 rounded-lg bg-blue-50 p-4">
            <h4 className="font-semibold text-gray-900">1.A - Opening Inventory</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                i. Opening Stock of Raw Material
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('openingStockRawMaterial')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.openingStockRawMaterial ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.openingStockRawMaterial && (
                <p className="mt-1 text-xs text-red-600">{errors.openingStockRawMaterial.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ii. Opening Stock of Work in Progress
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('openingStockWip')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.openingStockWip ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.openingStockWip && (
                <p className="mt-1 text-xs text-red-600">{errors.openingStockWip.message}</p>
              )}
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                Total Opening Inventory (Aiii): <span className="text-blue-600">₹{calculations.openingInventoryTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* 1.B - Purchases */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              1.B - Purchases (net of refunds and duty or tax, if any)
            </label>
            <input
              type="number"
              placeholder="Enter amount in ₹"
              step="0.01"
              min="0"
              {...register('purchasesNet')}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                errors.purchasesNet ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.purchasesNet && (
              <p className="mt-1 text-xs text-red-600">{errors.purchasesNet.message}</p>
            )}
          </div>

          {/* 1.C - Direct Wages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              1.C - Direct Wages
            </label>
            <input
              type="number"
              placeholder="Enter amount in ₹"
              step="0.01"
              min="0"
              {...register('directWages')}
              className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                errors.directWages ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.directWages && (
              <p className="mt-1 text-xs text-red-600">{errors.directWages.message}</p>
            )}
          </div>

          {/* 1.D - Direct Expenses */}
          <div className="space-y-4 rounded-lg bg-yellow-50 p-4">
            <h4 className="font-semibold text-gray-900">1.D - Direct Expenses</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                i. Carriage Inward
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('carriageInward')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.carriageInward ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.carriageInward && (
                <p className="mt-1 text-xs text-red-600">{errors.carriageInward.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ii. Power and Fuel
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('powerAndFuel')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.powerAndFuel ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.powerAndFuel && (
                <p className="mt-1 text-xs text-red-600">{errors.powerAndFuel.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                iii. Other Direct Expenses
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('otherDirectExpenses')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.otherDirectExpenses ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.otherDirectExpenses && (
                <p className="mt-1 text-xs text-red-600">{errors.otherDirectExpenses.message}</p>
              )}
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                Total Direct Expenses (Diii): <span className="text-blue-600">₹{calculations.directExpensesTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* 1.E - Factory Overheads */}
          <div className="space-y-4 rounded-lg bg-purple-50 p-4">
            <h4 className="font-semibold text-gray-900">1.E - Factory Overheads</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                i. Indirect Wages
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('indirectWages')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.indirectWages ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.indirectWages && (
                <p className="mt-1 text-xs text-red-600">{errors.indirectWages.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ii. Factory Rent and Rates
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('factoryRentAndRates')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.factoryRentAndRates ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.factoryRentAndRates && (
                <p className="mt-1 text-xs text-red-600">{errors.factoryRentAndRates.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                iii. Factory Insurance
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('factoryInsurance')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.factoryInsurance ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.factoryInsurance && (
                <p className="mt-1 text-xs text-red-600">{errors.factoryInsurance.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                iv. Factory Fuel and Power
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('factoryFuelAndPower')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.factoryFuelAndPower ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.factoryFuelAndPower && (
                <p className="mt-1 text-xs text-red-600">{errors.factoryFuelAndPower.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                v. Factory General Expenses
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('factoryGeneralExpenses')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.factoryGeneralExpenses ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.factoryGeneralExpenses && (
                <p className="mt-1 text-xs text-red-600">{errors.factoryGeneralExpenses.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                vi. Depreciation of Factory Machinery
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('depreciationFactoryMachinery')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.depreciationFactoryMachinery ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.depreciationFactoryMachinery && (
                <p className="mt-1 text-xs text-red-600">{errors.depreciationFactoryMachinery.message}</p>
              )}
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                Total Factory Overheads (Evii): <span className="text-blue-600">₹{calculations.factoryOverheadsTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* 1.F - Total Debits to Manufacturing Account */}
          <div className="rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              1.F - Total Debits to Manufacturing Account
            </p>
            <p className="text-xs text-gray-600 mb-2">
              = Opening Inventory (Aiii) + Purchases (B) + Direct Wages (C) + Direct Expenses (Diii) + Factory Overheads (Evii)
            </p>
            <p className="text-lg font-bold text-green-700">
              ₹{calculations.totalDebits.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Section 2: Closing Stock */}
        <div className="space-y-6">
          <div className="border-b-2 border-blue-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">2. Closing Stock</h3>
          </div>

          <div className="space-y-4 rounded-lg bg-blue-50 p-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                i. Raw Material
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('closingStockRawMaterial')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.closingStockRawMaterial ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.closingStockRawMaterial && (
                <p className="mt-1 text-xs text-red-600">{errors.closingStockRawMaterial.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ii. Work-in-Progress
              </label>
              <input
                type="number"
                placeholder="Enter amount in ₹"
                step="0.01"
                min="0"
                {...register('closingStockWip')}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none ${
                  errors.closingStockWip ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.closingStockWip && (
                <p className="mt-1 text-xs text-red-600">{errors.closingStockWip.message}</p>
              )}
            </div>

            <div className="rounded-md bg-white p-3 border border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                Total Closing Stock (2): <span className="text-blue-600">₹{calculations.closingStockTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Cost of Goods Produced */}
        <div className="space-y-6">
          <div className="border-b-2 border-blue-200 pb-2">
            <h3 className="text-lg font-semibold text-gray-900">3. Cost of Goods Produced</h3>
          </div>

          <div className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-4 border-2 border-orange-300">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              Transferred to Trading Account
            </p>
            <p className="text-xs text-gray-600 mb-2">
              = Total Debits to Manufacturing Account (1F) - Closing Stock (2)
            </p>
            <p className="text-2xl font-bold text-orange-700">
              ₹{calculations.costOfGoodsProduced.toFixed(2)}
            </p>
            <p className={`mt-2 text-xs font-medium ${calculations.costOfGoodsProduced >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {calculations.costOfGoodsProduced >= 0 ? '✓ Valid' : '✗ Cost cannot be negative'}
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={hasErrors}
            className={`rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors ${
              hasErrors
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Next: Proceed to Trading Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreePartAManufacturing;
