import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

// Quantitative Details Form Data Type
export interface QDFormData {
  // A. Trading Concern - Opening Stock (Item 1)
  tradingOpeningStock?: string;
  
  // A. Trading Concern - Purchases during year (Item 2)
  tradingPurchases?: string;
  
  // A. Trading Concern - Consumption during year (Item 3)
  tradingConsumption?: string;
  
  // A. Trading Concern - Closing Stock (Item 4)
  tradingClosingStock?: string;
  
  // A. Trading Concern - Shortage/Excess (Item 5)
  tradingShortageExcess?: string;

  // B. Manufacturing Concern - Raw Materials
  // Opening Stock (Item 6a)
  manufacturingRawMaterialOpeningStock?: string;
  
  // Purchases during year (Item 6b)
  manufacturingRawMaterialPurchases?: string;
  
  // Consumption during year (Item 6c)
  manufacturingRawMaterialConsumption?: string;
  
  // Sales during year (Item 6d)
  manufacturingRawMaterialSales?: string;
  
  // Closing Stock (Item 6e)
  manufacturingRawMaterialClosingStock?: string;
  
  // Shortage/Excess (Item 6f)
  manufacturingRawMaterialShortageExcess?: string;

  // B. Manufacturing Concern - Work in Progress
  // Opening Stock (Item 6ga)
  wipOpeningStock?: string;
  
  // Closing Stock (Item 6gb)
  wipClosingStock?: string;

  // B. Manufacturing Concern - Yield
  // Finished Products (Item 6g)
  yieldFinishedProducts?: string;
  
  // Percentage of Yield (Item 6h)
  yieldPercentage?: string;

  // B. Manufacturing Concern - Finished Products/By-products
  // Opening Stock (Item 7a)
  finishedProductsOpeningStock?: string;
  
  // Purchase during year (Item 7b)
  finishedProductsPurchases?: string;
  
  // Quantity manufactured (Item 7c)
  finishedProductsQuantityManufactured?: string;
  
  // Sales during year (Item 7d)
  finishedProductsSales?: string;
  
  // Closing Stock (Item 7e)
  finishedProductsClosingStock?: string;
  
  // Shortage/Excess (Item 7f)
  finishedProductsShortageExcess?: string;
}

// Zod Schema with validation
const qdSchema = z.object({
  // Trading Concern validations
  tradingOpeningStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  tradingPurchases: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  tradingConsumption: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  tradingClosingStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  tradingShortageExcess: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),

  // Manufacturing Raw Materials validations
  manufacturingRawMaterialOpeningStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  manufacturingRawMaterialPurchases: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  manufacturingRawMaterialConsumption: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  manufacturingRawMaterialSales: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  manufacturingRawMaterialClosingStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  manufacturingRawMaterialShortageExcess: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),

  // WIP validations
  wipOpeningStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  wipClosingStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  // Yield validations
  yieldFinishedProducts: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  yieldPercentage: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0 && num <= 100;
  }, { message: 'Yield percentage must be between 0 and 100' }),

  // Finished Products validations
  finishedProductsOpeningStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  finishedProductsPurchases: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  finishedProductsQuantityManufactured: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  finishedProductsSales: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  finishedProductsClosingStock: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative quantity' }),

  finishedProductsShortageExcess: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num);
  }, { message: 'Must be a valid number' }),

}).superRefine((data, ctx) => {
  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // Trading Concern Reconciliation: Opening + Purchase - Consumption - Sales = Closing + Shortage/Excess
  const tradingOpening = parseAmount(data.tradingOpeningStock);
  const tradingPurchase = parseAmount(data.tradingPurchases);
  const tradingConsumption = parseAmount(data.tradingConsumption);
  const tradingClosing = parseAmount(data.tradingClosingStock);
  const tradingShortageExcess = parseAmount(data.tradingShortageExcess);

  // Calculate expected closing stock: Opening + Purchase - Consumption = Closing + Shortage/Excess
  const tradingExpectedClosing = tradingOpening + tradingPurchase - tradingConsumption;
  const tradingActualClosing = tradingClosing + tradingShortageExcess;

  // Tolerance for rounding (allow 0.1% variance)
  const tradingTolerance = Math.abs(tradingExpectedClosing) * 0.001;
  if (tradingOpening > 0 || tradingPurchase > 0) {
    if (Math.abs(tradingExpectedClosing - tradingActualClosing) > tradingTolerance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Trading Concern stock reconciliation issue: Opening (${tradingOpening}) + Purchase (${tradingPurchase}) - Consumption (${tradingConsumption}) should equal Closing (${tradingClosing}) + Shortage/Excess (${tradingShortageExcess}). Expected closing: ${tradingExpectedClosing.toFixed(2)}, Actual: ${tradingActualClosing.toFixed(2)}`,
        path: [],
      });
    }
  }

  // Manufacturing Raw Materials Reconciliation
  const rawMatOpening = parseAmount(data.manufacturingRawMaterialOpeningStock);
  const rawMatPurchase = parseAmount(data.manufacturingRawMaterialPurchases);
  const rawMatConsumption = parseAmount(data.manufacturingRawMaterialConsumption);
  const rawMatSales = parseAmount(data.manufacturingRawMaterialSales);
  const rawMatClosing = parseAmount(data.manufacturingRawMaterialClosingStock);
  const rawMatShortageExcess = parseAmount(data.manufacturingRawMaterialShortageExcess);

  // Opening + Purchase = Consumption + Sales + Closing + Shortage/Excess
  const rawMatExpected = rawMatOpening + rawMatPurchase;
  const rawMatActual = rawMatConsumption + rawMatSales + rawMatClosing + rawMatShortageExcess;

  const rawMatTolerance = Math.abs(rawMatExpected) * 0.001;
  if (rawMatOpening > 0 || rawMatPurchase > 0) {
    if (Math.abs(rawMatExpected - rawMatActual) > rawMatTolerance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Raw Materials reconciliation issue: Opening (${rawMatOpening}) + Purchase (${rawMatPurchase}) should equal Consumption (${rawMatConsumption}) + Sales (${rawMatSales}) + Closing (${rawMatClosing}) + Shortage/Excess (${rawMatShortageExcess}). Expected: ${rawMatExpected.toFixed(2)}, Actual: ${rawMatActual.toFixed(2)}`,
        path: [],
      });
    }
  }

  // Finished Products Reconciliation
  const fpOpening = parseAmount(data.finishedProductsOpeningStock);
  const fpPurchase = parseAmount(data.finishedProductsPurchases);
  const fpManufactured = parseAmount(data.finishedProductsQuantityManufactured);
  const fpSales = parseAmount(data.finishedProductsSales);
  const fpClosing = parseAmount(data.finishedProductsClosingStock);
  const fpShortageExcess = parseAmount(data.finishedProductsShortageExcess);

  // Opening + Purchase + Manufactured = Sales + Closing + Shortage/Excess
  const fpExpected = fpOpening + fpPurchase + fpManufactured;
  const fpActual = fpSales + fpClosing + fpShortageExcess;

  const fpTolerance = Math.abs(fpExpected) * 0.001;
  if (fpOpening > 0 || fpPurchase > 0 || fpManufactured > 0) {
    if (Math.abs(fpExpected - fpActual) > fpTolerance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Finished Products reconciliation issue: Opening (${fpOpening}) + Purchase (${fpPurchase}) + Manufactured (${fpManufactured}) should equal Sales (${fpSales}) + Closing (${fpClosing}) + Shortage/Excess (${fpShortageExcess}). Expected: ${fpExpected.toFixed(2)}, Actual: ${fpActual.toFixed(2)}`,
        path: [],
      });
    }
  }

  // Yield validation: Yield % should be reasonable (not > 100%)
  const yieldPercent = parseAmount(data.yieldPercentage);
  if (yieldPercent > 100) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Yield percentage (${yieldPercent}%) cannot exceed 100%`,
      path: [],
    });
  }

  // Manufacturing Yield Consistency: If yield finished products and yield % are provided, they should be consistent
  const yieldFP = parseAmount(data.yieldFinishedProducts);
  const yieldPct = parseAmount(data.yieldPercentage);
  
  if (yieldFP > 0 && yieldPct > 0 && rawMatConsumption > 0) {
    const expectedYield = (rawMatConsumption * yieldPct) / 100;
    const tolerance = expectedYield * 0.1; // 10% tolerance
    if (Math.abs(yieldFP - expectedYield) > tolerance) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Yield inconsistency: ${yieldFP} finished products at ${yieldPct}% yield from ${rawMatConsumption} consumed materials. Expected approximately ${expectedYield.toFixed(2)} units.`,
        path: [],
      });
    }
  }

  console.log('📦 Quantitative Details Validations:', {
    'Trading Opening Stock': tradingOpening,
    'Trading Purchases': tradingPurchase,
    'Trading Consumption': tradingConsumption,
    'Trading Closing Stock': tradingClosing,
    'Trading Shortage/Excess': tradingShortageExcess,
    'Trading Reconciliation': `Expected Closing: ${tradingExpectedClosing.toFixed(2)}, Actual: ${tradingActualClosing.toFixed(2)}`,
    'Raw Materials Opening': rawMatOpening,
    'Raw Materials Reconciliation': `Expected: ${rawMatExpected.toFixed(2)}, Actual: ${rawMatActual.toFixed(2)}`,
    'Finished Products Opening': fpOpening,
    'Finished Products Reconciliation': `Expected: ${fpExpected.toFixed(2)}, Actual: ${fpActual.toFixed(2)}`,
    'Yield Percentage': yieldPct,
  });
});

interface ItrThreePartAQDProps {
  initialData?: QDFormData;
  onNext: () => void;
  onBack: () => void;
  onSave: (data: QDFormData) => void;
}

const ItrThreePartAQD: React.FC<ItrThreePartAQDProps> = ({
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
  } = useForm<QDFormData>({
    resolver: zodResolver(qdSchema),
    defaultValues: initialData,
    mode: 'onChange',
  });

  const formData = watch();

  const onSubmit = (data: QDFormData) => {
    onSave(data);
    onNext();
  };

  const parseAmount = (val: string | undefined): number => {
    if (!val || val.trim() === '') return 0;
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  };

  // Calculate trading reconciliation
  const tradingReconciliation = useMemo(() => {
    const opening = parseAmount(formData.tradingOpeningStock);
    const purchase = parseAmount(formData.tradingPurchases);
    const consumption = parseAmount(formData.tradingConsumption);
    const closing = parseAmount(formData.tradingClosingStock);
    const shortageExcess = parseAmount(formData.tradingShortageExcess);

    const expectedClosing = opening + purchase - consumption;
    const actualClosing = closing + shortageExcess;

    return { expectedClosing, actualClosing, balanced: Math.abs(expectedClosing - actualClosing) < 0.01 };
  }, [formData.tradingOpeningStock, formData.tradingPurchases, formData.tradingConsumption, formData.tradingClosingStock, formData.tradingShortageExcess]);

  // Calculate raw materials reconciliation
  const rawMaterialsReconciliation = useMemo(() => {
    const opening = parseAmount(formData.manufacturingRawMaterialOpeningStock);
    const purchase = parseAmount(formData.manufacturingRawMaterialPurchases);
    const consumption = parseAmount(formData.manufacturingRawMaterialConsumption);
    const sales = parseAmount(formData.manufacturingRawMaterialSales);
    const closing = parseAmount(formData.manufacturingRawMaterialClosingStock);
    const shortageExcess = parseAmount(formData.manufacturingRawMaterialShortageExcess);

    const available = opening + purchase;
    const distributed = consumption + sales + closing + shortageExcess;

    return { available, distributed, balanced: Math.abs(available - distributed) < 0.01 };
  }, [formData.manufacturingRawMaterialOpeningStock, formData.manufacturingRawMaterialPurchases, formData.manufacturingRawMaterialConsumption, formData.manufacturingRawMaterialSales, formData.manufacturingRawMaterialClosingStock, formData.manufacturingRawMaterialShortageExcess]);

  // Calculate finished products reconciliation
  const finishedProductsReconciliation = useMemo(() => {
    const opening = parseAmount(formData.finishedProductsOpeningStock);
    const purchase = parseAmount(formData.finishedProductsPurchases);
    const manufactured = parseAmount(formData.finishedProductsQuantityManufactured);
    const sales = parseAmount(formData.finishedProductsSales);
    const closing = parseAmount(formData.finishedProductsClosingStock);
    const shortageExcess = parseAmount(formData.finishedProductsShortageExcess);

    const available = opening + purchase + manufactured;
    const distributed = sales + closing + shortageExcess;

    return { available, distributed, balanced: Math.abs(available - distributed) < 0.01 };
  }, [formData.finishedProductsOpeningStock, formData.finishedProductsPurchases, formData.finishedProductsQuantityManufactured, formData.finishedProductsSales, formData.finishedProductsClosingStock, formData.finishedProductsShortageExcess]);

  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([key, error]) => {
      if (error?.message) {
        errorList.push(`${key}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Part A-QD: Quantitative Details</h2>
        <p className="mt-2 text-sm text-gray-600">
          Mandatory disclosure for audit under section 44AB. Fill items 1-7f for your business type.
        </p>
      </div>

      {/* Error Banner */}
      {hasErrors && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-900">
            ⚠️ Please correct the following {allErrors.length} error(s):
          </p>
          <ul className="mt-2 space-y-1 max-h-48 overflow-y-auto">
            {allErrors.map((error, index) => (
              <li key={index} className="text-xs text-red-800">
                • {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* A. Trading Concern */}
        <div className="space-y-4 rounded-lg bg-blue-50 p-4 border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900">A. Trading Concern - Quantitative Details</h3>
          <p className="text-sm text-gray-600">Fill if your business is trading/commerce</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">1. Opening Stock (Units/Quantity)</label>
              <input type="number" placeholder="Quantity" step="0.01" {...register('tradingOpeningStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              {errors.tradingOpeningStock && <p className="mt-1 text-xs text-red-600">{errors.tradingOpeningStock.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">2. Purchase During Year</label>
              <input type="number" placeholder="Quantity" step="0.01" {...register('tradingPurchases')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              {errors.tradingPurchases && <p className="mt-1 text-xs text-red-600">{errors.tradingPurchases.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">3. Consumption During Year</label>
              <input type="number" placeholder="Quantity" step="0.01" {...register('tradingConsumption')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              {errors.tradingConsumption && <p className="mt-1 text-xs text-red-600">{errors.tradingConsumption.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">4. Closing Stock</label>
              <input type="number" placeholder="Quantity" step="0.01" {...register('tradingClosingStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              {errors.tradingClosingStock && <p className="mt-1 text-xs text-red-600">{errors.tradingClosingStock.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">5. Shortage/Excess, if any</label>
              <input type="number" placeholder="Quantity (can be negative)" step="0.01" {...register('tradingShortageExcess')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
              {errors.tradingShortageExcess && <p className="mt-1 text-xs text-red-600">{errors.tradingShortageExcess.message}</p>}
            </div>
          </div>

          {/* Trading Reconciliation Display */}
          <div className={`mt-4 p-3 rounded-lg border-2 ${tradingReconciliation.balanced ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
            <p className="text-xs text-gray-600">Stock Reconciliation: Opening + Purchase - Consumption = Closing + Shortage/Excess</p>
            <p className="text-sm font-semibold mt-1">
              Expected Closing: <span className="font-bold">{tradingReconciliation.expectedClosing.toFixed(2)}</span>
              {' '} | Actual (Closing + Shortage): <span className="font-bold">{tradingReconciliation.actualClosing.toFixed(2)}</span>
              {' '} {tradingReconciliation.balanced ? '✅' : '⚠️'}
            </p>
          </div>
        </div>

        {/* B. Manufacturing Concern */}
        <div className="space-y-6">
          <h3 className="font-semibold text-gray-900">B. Manufacturing Concern - Quantitative Details</h3>
          <p className="text-sm text-gray-600">Fill if your business involves manufacturing</p>

          {/* B1. Raw Materials */}
          <div className="space-y-4 rounded-lg bg-purple-50 p-4 border-l-4 border-purple-500">
            <h4 className="font-semibold text-gray-900">6. Raw Materials</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6a. Opening Stock</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('manufacturingRawMaterialOpeningStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.manufacturingRawMaterialOpeningStock && <p className="mt-1 text-xs text-red-600">{errors.manufacturingRawMaterialOpeningStock.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6b. Purchases During Year</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('manufacturingRawMaterialPurchases')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.manufacturingRawMaterialPurchases && <p className="mt-1 text-xs text-red-600">{errors.manufacturingRawMaterialPurchases.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6c. Consumption During Year</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('manufacturingRawMaterialConsumption')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.manufacturingRawMaterialConsumption && <p className="mt-1 text-xs text-red-600">{errors.manufacturingRawMaterialConsumption.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6d. Sales During Year</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('manufacturingRawMaterialSales')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.manufacturingRawMaterialSales && <p className="mt-1 text-xs text-red-600">{errors.manufacturingRawMaterialSales.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6e. Closing Stock</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('manufacturingRawMaterialClosingStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.manufacturingRawMaterialClosingStock && <p className="mt-1 text-xs text-red-600">{errors.manufacturingRawMaterialClosingStock.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6f. Shortage/Excess, if any</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('manufacturingRawMaterialShortageExcess')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.manufacturingRawMaterialShortageExcess && <p className="mt-1 text-xs text-red-600">{errors.manufacturingRawMaterialShortageExcess.message}</p>}
              </div>
            </div>

            {/* Raw Materials Reconciliation */}
            <div className={`mt-4 p-3 rounded-lg border-2 ${rawMaterialsReconciliation.balanced ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
              <p className="text-xs text-gray-600">Reconciliation: Opening + Purchase = Consumption + Sales + Closing + Shortage/Excess</p>
              <p className="text-sm font-semibold mt-1">
                Available: <span className="font-bold">{rawMaterialsReconciliation.available.toFixed(2)}</span>
                {' '} | Distributed: <span className="font-bold">{rawMaterialsReconciliation.distributed.toFixed(2)}</span>
                {' '} {rawMaterialsReconciliation.balanced ? '✅' : '⚠️'}
              </p>
            </div>
          </div>

          {/* B2. Work in Progress */}
          <div className="space-y-4 rounded-lg bg-indigo-50 p-4 border-l-4 border-indigo-500">
            <h4 className="font-semibold text-gray-900">6. Work in Progress (WIP)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6ga. Opening Stock</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('wipOpeningStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.wipOpeningStock && <p className="mt-1 text-xs text-red-600">{errors.wipOpeningStock.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6gb. Closing Stock</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('wipClosingStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.wipClosingStock && <p className="mt-1 text-xs text-red-600">{errors.wipClosingStock.message}</p>}
              </div>
            </div>
          </div>

          {/* B3. Yield */}
          <div className="space-y-4 rounded-lg bg-green-50 p-4 border-l-4 border-green-500">
            <h4 className="font-semibold text-gray-900">6g-6h. Yield Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6g. Yield - Finished Products (Units)</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('yieldFinishedProducts')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.yieldFinishedProducts && <p className="mt-1 text-xs text-red-600">{errors.yieldFinishedProducts.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">6h. Percentage of Yield (%)</label>
                <input type="number" placeholder="0-100" step="0.01" min="0" max="100" {...register('yieldPercentage')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.yieldPercentage && <p className="mt-1 text-xs text-red-600">{errors.yieldPercentage.message}</p>}
              </div>
            </div>
          </div>

          {/* B4. Finished Products/By-products */}
          <div className="space-y-4 rounded-lg bg-orange-50 p-4 border-l-4 border-orange-500">
            <h4 className="font-semibold text-gray-900">7. Finished Products / By-products</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">7a. Opening Stock</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('finishedProductsOpeningStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.finishedProductsOpeningStock && <p className="mt-1 text-xs text-red-600">{errors.finishedProductsOpeningStock.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">7b. Purchase During Year</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('finishedProductsPurchases')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.finishedProductsPurchases && <p className="mt-1 text-xs text-red-600">{errors.finishedProductsPurchases.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">7c. Quantity Manufactured During Year</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('finishedProductsQuantityManufactured')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.finishedProductsQuantityManufactured && <p className="mt-1 text-xs text-red-600">{errors.finishedProductsQuantityManufactured.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">7d. Sales During Year</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('finishedProductsSales')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.finishedProductsSales && <p className="mt-1 text-xs text-red-600">{errors.finishedProductsSales.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">7e. Closing Stock</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('finishedProductsClosingStock')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.finishedProductsClosingStock && <p className="mt-1 text-xs text-red-600">{errors.finishedProductsClosingStock.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">7f. Shortage/Excess, if any</label>
                <input type="number" placeholder="Quantity" step="0.01" {...register('finishedProductsShortageExcess')} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none" />
                {errors.finishedProductsShortageExcess && <p className="mt-1 text-xs text-red-600">{errors.finishedProductsShortageExcess.message}</p>}
              </div>
            </div>

            {/* Finished Products Reconciliation */}
            <div className={`mt-4 p-3 rounded-lg border-2 ${finishedProductsReconciliation.balanced ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
              <p className="text-xs text-gray-600">Reconciliation: Opening + Purchase + Manufactured = Sales + Closing + Shortage/Excess</p>
              <p className="text-sm font-semibold mt-1">
                Available: <span className="font-bold">{finishedProductsReconciliation.available.toFixed(2)}</span>
                {' '} | Distributed: <span className="font-bold">{finishedProductsReconciliation.distributed.toFixed(2)}</span>
                {' '} {finishedProductsReconciliation.balanced ? '✅' : '⚠️'}
              </p>
            </div>
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
            Next: Complete Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrThreePartAQD;
