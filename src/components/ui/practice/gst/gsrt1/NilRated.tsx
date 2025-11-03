import React, { Dispatch, SetStateAction, useState, useCallback, useMemo } from 'react';

interface NilRatedItem {
  description: string;
  nilRated: string;
  exempted: string;
  nonGst: string;
}

interface FormErrors {
  nilRated: string;
  exempted: string;
  nonGst: string;
}

interface Period {
  financialYear: string;
  quarter: string;
  month: string;
  monthName: string;
}

interface Props {
  setOpen: Dispatch<SetStateAction<number>>;
  formData?: { items: NilRatedItem[] };
  updateFormState: (slug: string, data: { items: NilRatedItem[] }) => void;
  period: Period;
  viewMode?: boolean;
}

const NilRated: React.FC<Props> = ({ setOpen, formData, updateFormState, period, viewMode = false }) => {
  const descriptions = useMemo(() => [
    "Intra-state supplies to registered person",
    "Intra-state supplies to unregistered person",
    "Inter-state supplies to registered person",
    "Inter-state supplies to unregistered person"
  ], []);

  // Initialize form state with existing data or defaults
  const [formState, setFormState] = useState<NilRatedItem[]>(() => {
    if (formData?.items) {
      return formData.items.map(item => ({
        description: item.description,
        nilRated: item.nilRated || '',
        exempted: item.exempted || '',
        nonGst: item.nonGst || ''
      }));
    }
    return descriptions.map(desc => ({
      description: desc,
      nilRated: '',
      exempted: '',
      nonGst: ''
    }));
  });

  const [errors, setErrors] = useState<FormErrors[]>(() =>
    descriptions.map(() => ({
      nilRated: '',
      exempted: '',
      nonGst: ''
    }))
  );

  const validateField = useCallback((value: string): string => {
    if (viewMode) return '';
    if (value && isNaN(Number(value))) {
      return 'Must be a valid number';
    }
    return '';
  }, [viewMode]);

  const handleValueChange = useCallback((index: number, field: keyof NilRatedItem, value: string) => {
    if (viewMode) return;

    setFormState(prev => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        [field]: value
      };
      return newState;
    });

    setErrors(prev => {
      const newErrors = [...prev];
      newErrors[index] = {
        ...newErrors[index],
        [field]: validateField(value)
      };
      return newErrors;
    });
  }, [viewMode, validateField]);

  const validateForm = useCallback(() => {
    if (viewMode) return true;

    let isValid = true;
    const newErrors = [...errors];

    formState.forEach((item, index) => {
      const itemErrors = {
        nilRated: validateField(item.nilRated),
        exempted: validateField(item.exempted),
        nonGst: validateField(item.nonGst)
      };

      newErrors[index] = itemErrors;

      if (itemErrors.nilRated || itemErrors.exempted || itemErrors.nonGst) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formState, errors, validateField, viewMode]);

  const hasAnyValue = useMemo(() =>
    formState.some(item =>
      item.nilRated || item.exempted || item.nonGst
    ),
    [formState]
  );

  const handleSubmit = useCallback(() => {
    if (viewMode) {
      setOpen(0);
      return;
    }

    if (validateForm()) {
      updateFormState('nilRated', { items: formState });
      setOpen(0);
    }
  }, [formState, updateFormState, setOpen, validateForm, viewMode]);

  return (
    <>
      <div className="w-[100%] mx-auto p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          8A, 8B, 8C, 8D - Nil Rated, Exempted and Non-GST Supplies {viewMode ? '(View)' : '(Edit)'}
        </h2>
      </div>
      <div className="mt-10">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 font-medium text-center border border-gray-300">Description</th>
                <th className="p-3 font-medium text-center border border-gray-300">Nil Rated Supplies (₹)</th>
                <th className="p-3 font-medium text-center border border-gray-300">Exempted(Other than Nil rated/non-GST supply) (₹)</th>
                <th className="p-3 font-medium text-center border border-gray-300">Non-GST Supplies (₹)</th>
              </tr>
            </thead>
            <tbody>
              {formState.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-3 text-center border border-gray-300">{item.description}</td>
                  <td className="p-3 text-center border border-gray-300">
                    <input
                      type="text"
                      value={item.nilRated}
                      onChange={(e) => handleValueChange(index, 'nilRated', e.target.value)}
                      placeholder="0.00"
                      className={`w-[70%] p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${errors[index]?.nilRated ? 'border-red-500' : ''
                        } ${viewMode ? 'bg-gray-100' : ''}`}
                      disabled={viewMode}
                      readOnly={viewMode}
                    />
                    {errors[index]?.nilRated && (
                      <p className="mt-1 text-sm text-red-500">{errors[index].nilRated}</p>
                    )}
                  </td>
                  <td className="p-3 text-center border border-gray-300">
                    <input
                      type="text"
                      value={item.exempted}
                      onChange={(e) => handleValueChange(index, 'exempted', e.target.value)}
                      placeholder="0.00"
                      className={`w-[70%] p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${errors[index]?.exempted ? 'border-red-500' : ''
                        } ${viewMode ? 'bg-gray-100' : ''}`}
                      disabled={viewMode}
                      readOnly={viewMode}
                    />
                    {errors[index]?.exempted && (
                      <p className="mt-1 text-sm text-red-500">{errors[index].exempted}</p>
                    )}
                  </td>
                  <td className="p-3 text-center border border-gray-300">
                    <input
                      type="text"
                      value={item.nonGst}
                      onChange={(e) => handleValueChange(index, 'nonGst', e.target.value)}
                      placeholder="0.00"
                      className={`w-[70%] p-3 text-center border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${errors[index]?.nonGst ? 'border-red-500' : ''
                        } ${viewMode ? 'bg-gray-100' : ''}`}
                      disabled={viewMode}
                      readOnly={viewMode}
                    />
                    {errors[index]?.nonGst && (
                      <p className="mt-1 text-sm text-red-500">{errors[index].nonGst}</p>
                    )}
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
            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${viewMode ? '!bg-gray-500' : ''
              } ${!hasAnyValue && !viewMode ? '!bg-gray-400 !cursor-not-allowed' : ''}`}
            disabled={!viewMode && !hasAnyValue}
          >
            {viewMode ? 'Close' : 'Save'}
          </button>
        </div>
      </div>
    </>
  );
};

export default NilRated;