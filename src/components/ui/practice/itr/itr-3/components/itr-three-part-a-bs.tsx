import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod Schema for Balance Sheet
const partABSSchema = z.object({
  // Sources of Funds (Liabilities)
  proprietorCapital: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  loanFromBank: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  loanFromOthers: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  creditors: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  otherLiabilities: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  totalLiabilities: z.string().optional().or(z.literal('')),

  // Application of Funds (Assets)
  fixedAssets: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  stockInTrade: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  debtors: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  bankBalance: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  cashInHand: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  otherAssets: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  totalAssets: z.string().optional().or(z.literal('')),

  // Additional Information
  closingStockValue: z.string().optional().or(z.literal('')).refine((val) => {
    if (!val || val.trim() === '') return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, { message: 'Must be a valid non-negative number' }),

  booksClosed: z.enum(['Yes', 'No', '']).optional().or(z.literal('')),
  reasonIfNotClosed: z.string().optional().or(z.literal('')),

}).superRefine((data, ctx) => {
  // Balance Sheet Balancing Check
  const calculateTotal = (values: (string | undefined)[]): number => {
    return values.reduce((sum, val) => {
      if (!val || val.trim() === '') return sum;
      const num = parseFloat(val);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  };

  const liabilities = [
    data.proprietorCapital,
    data.loanFromBank,
    data.loanFromOthers,
    data.creditors,
    data.otherLiabilities,
  ];

  const assets = [
    data.fixedAssets,
    data.stockInTrade,
    data.debtors,
    data.bankBalance,
    data.cashInHand,
    data.otherAssets,
  ];

  const totalLiab = calculateTotal(liabilities);
  const totalAss = calculateTotal(assets);

  // Check if any values are entered
  const hasLiabilities = liabilities.some(v => v && v.trim() !== '');
  const hasAssets = assets.some(v => v && v.trim() !== '');

  // If both have values, they should match
  if (hasLiabilities && hasAssets && Math.abs(totalLiab - totalAss) > 0.01) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Balance Sheet not balanced. Total Liabilities (${totalLiab.toFixed(2)}) must equal Total Assets (${totalAss.toFixed(2)})`,
      path: ['totalAssets'],
    });
  }

  // Validate books closed reason
  if (data.booksClosed === 'No' && (!data.reasonIfNotClosed || data.reasonIfNotClosed.trim() === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please provide reason if books are not closed',
      path: ['reasonIfNotClosed'],
    });
  }

  // Console logging for debugging
  if (hasLiabilities || hasAssets) {
    console.log('📊 Balance Sheet Validation:', {
      totalLiabilities: totalLiab.toFixed(2),
      totalAssets: totalAss.toFixed(2),
      balanced: Math.abs(totalLiab - totalAss) <= 0.01,
      difference: Math.abs(totalLiab - totalAss).toFixed(2),
    });
  }
});

export type PartABSFormData = z.infer<typeof partABSSchema>;

interface PartABSProps {
  onNext: () => void;
  onBack: () => void;
  onSave?: (data: PartABSFormData) => void;
  initialData?: Partial<PartABSFormData>;
}

const ItrThreePartABS: React.FC<PartABSProps> = ({
  onNext,
  onBack,
  onSave,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PartABSFormData>({
    resolver: zodResolver(partABSSchema),
    defaultValues: initialData,
  });

  const onSubmit = (data: PartABSFormData) => {
    console.log('✅ Balance Sheet validation passed! Submitting data:', data);
    if (onSave) {
      onSave(data);
    }
    onNext();
  };

  const onError = (errors: any) => {
    console.error('❌ Balance Sheet validation failed!');
    console.error('Total errors:', Object.keys(errors).length);
    console.error('Error details:', errors);
    
    Object.entries(errors).forEach(([field, error]: [string, any]) => {
      console.error(`  - ${field}: ${error.message}`);
    });
  };

  const handleSaveProgress = () => {
    const data = watch();
    if (onSave) {
      onSave(data as PartABSFormData);
    }
    console.log('💾 Balance Sheet progress saved');
  };

  const hasErrors = Object.keys(errors).length > 0;

  React.useEffect(() => {
    if (hasErrors) {
      console.warn('⚠️ Balance Sheet has validation errors:', errors);
    }
  }, [hasErrors, errors]);

  // Watch for balance calculation
  const proprietorCapital = watch('proprietorCapital');
  const loanFromBank = watch('loanFromBank');
  const loanFromOthers = watch('loanFromOthers');
  const creditors = watch('creditors');
  const otherLiabilities = watch('otherLiabilities');

  const fixedAssets = watch('fixedAssets');
  const stockInTrade = watch('stockInTrade');
  const debtors = watch('debtors');
  const bankBalance = watch('bankBalance');
  const cashInHand = watch('cashInHand');
  const otherAssets = watch('otherAssets');

  const calculateAmount = (value: string | undefined): number => {
    if (!value || value.trim() === '') return 0;
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const totalLiabilities = 
    calculateAmount(proprietorCapital) +
    calculateAmount(loanFromBank) +
    calculateAmount(loanFromOthers) +
    calculateAmount(creditors) +
    calculateAmount(otherLiabilities);

  const totalAssets =
    calculateAmount(fixedAssets) +
    calculateAmount(stockInTrade) +
    calculateAmount(debtors) +
    calculateAmount(bankBalance) +
    calculateAmount(cashInHand) +
    calculateAmount(otherAssets);

  const isBalanced = Math.abs(totalLiabilities - totalAssets) <= 0.01;
  const balanceStatus = totalLiabilities === 0 && totalAssets === 0 ? null : isBalanced;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-xl border border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Part A-BS - Balance Sheet
        </h2>
        <p className="text-sm text-gray-600">
          As on 31st Day of March, 2025 - Balance sheet of the proprietory business
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
        {/* Error Summary Banner */}
        {hasErrors && (
          <div className="rounded-xl border-2 border-red-300 bg-red-50 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-900">
                  Please correct the following errors ({Object.keys(errors).length})
                </h3>
                <div className="mt-2 max-h-40 overflow-y-auto">
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.entries(errors).map(([field, error]: [string, any]) => (
                      <li key={field} className="text-xs text-red-800">
                        <span className="font-medium">{field.replace(/_/g, ' ')}:</span> {error.message}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Balance Status Indicator */}
        {balanceStatus !== null && (
          <div className={`rounded-xl border-2 p-4 ${isBalanced ? 'border-green-300 bg-green-50' : 'border-yellow-300 bg-yellow-50'}`}>
            <div className="flex items-center gap-2">
              {isBalanced ? (
                <>
                  <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-green-900">✅ Balance Sheet is balanced</p>
                    <p className="text-xs text-green-800">Assets: ₹{totalAssets.toLocaleString('en-IN', {maximumFractionDigits: 2})} = Liabilities: ₹{totalLiabilities.toLocaleString('en-IN', {maximumFractionDigits: 2})}</p>
                  </div>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-yellow-900">⚠️ Balance Sheet NOT balanced</p>
                    <p className="text-xs text-yellow-800">
                      Difference: ₹{Math.abs(totalLiabilities - totalAssets).toLocaleString('en-IN', {maximumFractionDigits: 2})}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Sources of Funds (Liabilities) Section */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Sources of Funds (Liabilities)</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Proprietor's Capital (₹)</label>
                <input 
                  type="number" 
                  {...register('proprietorCapital')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.proprietorCapital ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.proprietorCapital && (
                  <p className="mt-1 text-xs text-red-600">{errors.proprietorCapital.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Loan from Bank (₹)</label>
                <input 
                  type="number" 
                  {...register('loanFromBank')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.loanFromBank ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.loanFromBank && (
                  <p className="mt-1 text-xs text-red-600">{errors.loanFromBank.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Loan from Others (₹)</label>
                <input 
                  type="number" 
                  {...register('loanFromOthers')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.loanFromOthers ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.loanFromOthers && (
                  <p className="mt-1 text-xs text-red-600">{errors.loanFromOthers.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Creditors (₹)</label>
                <input 
                  type="number" 
                  {...register('creditors')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.creditors ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.creditors && (
                  <p className="mt-1 text-xs text-red-600">{errors.creditors.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Other Liabilities (₹)</label>
              <input 
                type="number" 
                {...register('otherLiabilities')} 
                placeholder="0" 
                step="0.01"
                min="0"
                className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.otherLiabilities ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.otherLiabilities && (
                <p className="mt-1 text-xs text-red-600">{errors.otherLiabilities.message}</p>
              )}
            </div>

            <div className="rounded-lg bg-blue-100 p-3">
              <p className="text-sm font-semibold text-blue-900">
                Total Liabilities: ₹{totalLiabilities.toLocaleString('en-IN', {maximumFractionDigits: 2})}
              </p>
            </div>
          </div>
        </div>

        {/* Application of Funds (Assets) Section */}
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Application of Funds (Assets)</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Fixed Assets (₹)</label>
                <input 
                  type="number" 
                  {...register('fixedAssets')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.fixedAssets ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.fixedAssets && (
                  <p className="mt-1 text-xs text-red-600">{errors.fixedAssets.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Stock in Trade (₹)</label>
                <input 
                  type="number" 
                  {...register('stockInTrade')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.stockInTrade ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.stockInTrade && (
                  <p className="mt-1 text-xs text-red-600">{errors.stockInTrade.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Debtors (₹)</label>
                <input 
                  type="number" 
                  {...register('debtors')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.debtors ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.debtors && (
                  <p className="mt-1 text-xs text-red-600">{errors.debtors.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Bank Balance (₹)</label>
                <input 
                  type="number" 
                  {...register('bankBalance')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.bankBalance ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.bankBalance && (
                  <p className="mt-1 text-xs text-red-600">{errors.bankBalance.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Cash in Hand (₹)</label>
                <input 
                  type="number" 
                  {...register('cashInHand')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.cashInHand ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.cashInHand && (
                  <p className="mt-1 text-xs text-red-600">{errors.cashInHand.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Other Assets (₹)</label>
                <input 
                  type="number" 
                  {...register('otherAssets')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.otherAssets ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.otherAssets && (
                  <p className="mt-1 text-xs text-red-600">{errors.otherAssets.message}</p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-purple-100 p-3">
              <p className="text-sm font-semibold text-purple-900">
                Total Assets: ₹{totalAssets.toLocaleString('en-IN', {maximumFractionDigits: 2})}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Information</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Closing Stock Value (₹)</label>
                <input 
                  type="number" 
                  {...register('closingStockValue')} 
                  placeholder="0" 
                  step="0.01"
                  min="0"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.closingStockValue ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.closingStockValue && (
                  <p className="mt-1 text-xs text-red-600">{errors.closingStockValue.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Books Closed on 31st March 2025?</label>
                <select 
                  {...register('booksClosed')} 
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.booksClosed ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.booksClosed && (
                  <p className="mt-1 text-xs text-red-600">{errors.booksClosed.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">If books not closed, provide reason</label>
              <textarea 
                {...register('reasonIfNotClosed')} 
                placeholder="Enter reason for not closing books on 31st March 2025" 
                rows={3}
                className={`w-full rounded-lg border px-3 py-2 text-sm ${errors.reasonIfNotClosed ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.reasonIfNotClosed && (
                <p className="mt-1 text-xs text-red-600">{errors.reasonIfNotClosed.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <button type="button" onClick={onBack} className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            ← Back
          </button>
          <div className="flex gap-3">
            <button type="button" onClick={handleSaveProgress} className="rounded-lg border border-blue-300 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100">
              💾 Save Progress
            </button>
            <button type="submit" className="rounded-lg bg-green-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
              Next →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItrThreePartABS;
