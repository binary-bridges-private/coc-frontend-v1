import React, { Dispatch, SetStateAction, useState, useCallback, useMemo } from 'react';

interface TaxableValues {
  [rate: number]: number;
}

interface CessValues {
  [rate: number]: number;
}

interface FormState {
  deemedExports: boolean;
  sezWithPayment: boolean;
  sezWithoutPayment: boolean;
  reverseCharge: boolean;
  intraStateIGST: boolean;
  isDifferentialTax: boolean;
  recipientGSTIN: string;
  recipientName: string;
  masterName: string;
  noteNumber: string;
  noteDate: string;
  noteType: string;
  noteValue: string;
  pos: string;
  supplyType: string;
  source: string;
  irn: string;
  irnDate: string;
  taxableValues: TaxableValues;
  cessValues: CessValues;
}

interface Period {
  financialYear: string;
  quarter: string;
  month: string;
  monthName: string;
}

interface Props {
  setOpen: Dispatch<SetStateAction<number>>;
  formData?: Partial<FormState>;
  updateFormState: (slug: string, data: FormState) => void;
  period: Period;
  viewMode?: boolean;
}

const Credit: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
  const taxRates = useMemo(() => [0, 0.1, 0.25, 1, 1.5, 3, 5, 6, 7.5, 12, 18, 28], []);
  const noteTypes = useMemo(() => ['Credit', 'Debit'], []);

  // Initialize form state
  const [formState, setFormState] = useState<FormState>({
    deemedExports: false,
    sezWithPayment: false,
    sezWithoutPayment: false,
    reverseCharge: false,
    intraStateIGST: false,
    isDifferentialTax: false,
    recipientGSTIN: '',
    recipientName: '',
    masterName: '',
    noteNumber: '',
    noteDate: '',
    noteType: '',
    noteValue: '',
    pos: '',
    supplyType: '',
    source: '',
    irn: '',
    irnDate: '',
    taxableValues: {},
    cessValues: {},
    ...formData
  });

  const [errors, setErrors] = useState({
    recipientGSTIN: '',
    recipientName: '',
    noteNumber: '',
    noteDate: '',
    noteType: '',
    noteValue: '',
    pos: ''
  });

  // Input styling classes
  const inputClass = "w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:border-blue-500";
  const errorInputClass = `${inputClass} border-red-500`;
  const disabledInputClass = `${inputClass} bg-gray-100 cursor-not-allowed`;
  const checkboxClass = "w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500";

  const validateField = useCallback((name: string, value: string): string => {
    if (viewMode) return '';
    if (!value.trim()) return 'This field is required';
    if (name === 'noteValue' && isNaN(Number(value))) return 'Must be a valid number';
    if (name === 'recipientGSTIN' && !/^[0-9A-Z]{15}$/.test(value)) return 'Invalid GSTIN format';
    if (name === 'noteNumber' && value.length > 16) return 'Max 16 characters allowed';
    return '';
  }, [viewMode]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (viewMode) return;

    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (['recipientGSTIN', 'recipientName', 'noteNumber', 'noteDate', 'noteType', 'noteValue', 'pos'].includes(name)) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  }, [validateField, viewMode]);

  const handleTaxableValueChange = useCallback((rate: number, value: string) => {
    if (viewMode) return;
    const numericValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    setFormState(prev => ({
      ...prev,
      taxableValues: { ...prev.taxableValues, [rate]: numericValue }
    }));
  }, [viewMode]);

  const handleCessValueChange = useCallback((rate: number, value: string) => {
    if (viewMode) return;
    const numericValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    setFormState(prev => ({
      ...prev,
      cessValues: { ...prev.cessValues, [rate]: numericValue }
    }));
  }, [viewMode]);

  const calculateTax = useCallback((rate: number, value: number): string => {
    const applicableRate = formState.isDifferentialTax ? (rate * 65) / 100 : rate;
    return ((value * applicableRate) / 100).toFixed(2);
  }, [formState.isDifferentialTax]);

  const validateForm = useCallback((): boolean => {
    if (viewMode) return true;
    const newErrors = {
      recipientGSTIN: validateField('recipientGSTIN', formState.recipientGSTIN),
      recipientName: validateField('recipientName', formState.recipientName),
      noteNumber: validateField('noteNumber', formState.noteNumber),
      noteDate: validateField('noteDate', formState.noteDate),
      noteType: validateField('noteType', formState.noteType),
      noteValue: validateField('noteValue', formState.noteValue),
      pos: validateField('pos', formState.pos)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  }, [formState, validateField, viewMode]);

  const handleSubmit = useCallback(() => {
    if (viewMode) {
      setOpen(0);
      return;
    }
    if (validateForm()) {
      updateFormState('credit', formState);
      setOpen(0);
    }
  }, [formState, setOpen, updateFormState, validateForm, viewMode]);

  const hasError = (field: keyof typeof errors): boolean => !!errors[field];

  return (
    <>
      <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          Credit/Debit Notes (Registered)
          {viewMode && <span className="ml-2 text-gray-500">(View Mode)</span>}
        </h2>
      </div>
      <div className="p-4">
        <div>
          {/* Checkbox Grid - matching Place component styling */}
          <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                name="deemedExports"
                checked={formState.deemedExports}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={viewMode}
              />
              <span>Deemed Exports</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                name="sezWithPayment"
                checked={formState.sezWithPayment}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={viewMode}
              />
              <span>SEZ Supplies with payment</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                name="sezWithoutPayment"
                checked={formState.sezWithoutPayment}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={viewMode}
              />
              <span>SEZ Supplies without payment</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                name="reverseCharge"
                checked={formState.reverseCharge}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={viewMode}
              />
              <span>Supply attract reverse charge</span>
            </label>
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                name="intraStateIGST"
                checked={formState.intraStateIGST}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={viewMode}
              />
              <span>Intra-State Supplies attracting IGST</span>
            </label>
          </div>

          {/* Differential Tax Section - matching Place component styling */}
          <div className="grid items-center grid-cols-1 gap-4 mt-8 md:grid-cols-2">
            <label className="flex items-center space-x-2 text-sm font-medium">
              <input
                type="checkbox"
                name="isDifferentialTax"
                checked={formState.isDifferentialTax}
                onChange={handleChange}
                className="checkbox checkbox-primary"
                disabled={viewMode}
              />
              <span>Is the supply eligible to be taxed at a differential percentage (%) of the existing rate of tax, as notified by the Government?</span>
            </label>

            {formState.isDifferentialTax && (
              <div className="flex items-center justify-end">
                <span className="mr-2 text-sm font-medium">Applicable % of Tax Rate</span>
                <span className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">65%</span>
              </div>
            )}
          </div>

          {/* Recipient Information - matching Place component styling */}
          <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Recipient GSTIN/UIN *</label>
              <input
                type="text"
                name="recipientGSTIN"
                value={formState.recipientGSTIN}
                onChange={handleChange}
                placeholder="Recipient GSTIN/UIN"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.recipientGSTIN ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
                readOnly={viewMode}
              />
              {errors.recipientGSTIN && <p className="mt-1 text-sm text-red-500">{errors.recipientGSTIN}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Recipient Name *</label>
              <input
                type="text"
                name="recipientName"
                value={formState.recipientName}
                onChange={handleChange}
                placeholder="Recipient Name"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.recipientName ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
                readOnly={viewMode}
              />
              {errors.recipientName && <p className="mt-1 text-sm text-red-500">{errors.recipientName}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Name as in Master</label>
              <input
                type="text"
                name="masterName"
                value={formState.masterName}
                onChange={handleChange}
                placeholder="Name as in Master"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                  }`}
                disabled={viewMode}
                readOnly={viewMode}
              />
            </div>
          </div>

          {/* Note Information - matching Place component styling */}
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Debit/Credit Note No. *</label>
              <input
                type="text"
                name="noteNumber"
                value={formState.noteNumber}
                onChange={handleChange}
                placeholder="Note number"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteNumber ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
                readOnly={viewMode}
              />
              {errors.noteNumber && <p className="mt-1 text-sm text-red-500">{errors.noteNumber}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Debit/Credit Note Date *</label>
              <input
                type="date"
                name="noteDate"
                value={formState.noteDate}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteDate ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
                readOnly={viewMode}
              />
              {errors.noteDate && <p className="mt-1 text-sm text-red-500">{errors.noteDate}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Note Type *</label>
              <select
                name="noteType"
                value={formState.noteType}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteType ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
              >
                <option value="">Select</option>
                {noteTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.noteType && <p className="mt-1 text-sm text-red-500">{errors.noteType}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Note value (₹) *</label>
              <input
                type="text"
                name="noteValue"
                value={formState.noteValue}
                onChange={handleChange}
                placeholder="Note value"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.noteValue ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
                readOnly={viewMode}
              />
              {errors.noteValue && <p className="mt-1 text-sm text-red-500">{errors.noteValue}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">POS *</label>
              <input
                type="text"
                name="pos"
                value={formState.pos}
                onChange={handleChange}
                placeholder="POS"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pos ? 'border-red-500' : 'border-gray-300'
                  } ${viewMode ? 'bg-gray-100' : ''}`}
                disabled={viewMode}
                readOnly={viewMode}
              />
              {errors.pos && <p className="mt-1 text-sm text-red-500">{errors.pos}</p>}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Supply Type</label>
              <input
                type="text"
                name="supplyType"
                value={formState.supplyType}
                onChange={handleChange}
                placeholder="Supply Type"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                  }`}
                disabled={viewMode}
                readOnly={viewMode}
              />
            </div>
          </div>

          {/* Additional Information - matching Place component styling */}
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Source</label>
              <input
                type="text"
                name="source"
                value={formState.source}
                onChange={handleChange}
                placeholder="Source"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                  }`}
                disabled={viewMode}
                readOnly={viewMode}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">IRN</label>
              <input
                type="text"
                name="irn"
                value={formState.irn}
                onChange={handleChange}
                placeholder="IRN"
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                  }`}
                disabled={viewMode}
                readOnly={viewMode}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">IRN date</label>
              <input
                type="date"
                name="irnDate"
                value={formState.irnDate}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                  }`}
                disabled={viewMode}
                readOnly={viewMode}
              />
            </div>
          </div>

          {/* Item Details Table - matching Place component styling */}
          <h2 className="pb-2 mt-8 text-lg font-semibold">Item Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 font-medium text-center border border-gray-300">Rate (%)</th>
                  <th className="p-3 font-medium text-center border border-gray-300">Taxable Value (₹)</th>
                  <th className="p-3 font-medium text-center border border-gray-300">Amount of Tax (₹)</th>
                  <th className="p-3 font-medium text-center border border-gray-300">Cess (₹)</th>
                </tr>
              </thead>
              <tbody>
                {taxRates.map((rate, index) => (
                  <tr key={rate} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 text-center border border-gray-300">{rate}%</td>
                    <td className="p-3 text-center border border-gray-300">
                      <input
                        type="number"
                        value={formState.taxableValues[rate] || ''}
                        onChange={(e) => handleTaxableValueChange(rate, e.target.value)}
                        className={`w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                          }`}
                        disabled={viewMode}
                        readOnly={viewMode}
                      />
                    </td>
                    <td className="p-3 text-center border border-gray-300">
                      {calculateTax(rate, formState.taxableValues[rate] || 0)}
                    </td>
                    <td className="p-3 text-center border border-gray-300">
                      <input
                        type="number"
                        value={formState.cessValues[rate] || ''}
                        onChange={(e) => handleCessValueChange(rate, e.target.value)}
                        className={`w-[70%] p-2 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${viewMode ? 'bg-gray-100' : ''
                          }`}
                        disabled={viewMode}
                        readOnly={viewMode}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons - EXACTLY matching Place component */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setOpen(0)}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${viewMode ? 'bg-gray-500' : ''
                }`}
            >
              {viewMode ? 'Close' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Credit;