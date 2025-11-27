import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itr7ValidationSchema } from './itr-7.validation.ts';
import type { ITR7FormData } from './itr-7.types.ts';
import type { ITR7BalanceSheetComprehensiveData } from './components/itr-7-balance-sheet-comprehensive.types.ts';
import type { ITR7ManufacturingAccountData } from './components/itr-7-manufacturing-account.types.ts';
import type { ITR7TradingAccountData } from './components/itr-7-trading-account.types.ts';
import type { ITR7ProfitLossAccountData } from './components/itr-7-profit-loss-account.types.ts';
import type { ITR7SummaryData } from './components/itr-7-summary.types.ts';
import type { ITR7IncomeStatementData } from './components/itr-7-income-statement.types.ts';
import type { ITR7PLAccountData } from './components/itr-7-pl-account.types.ts';
import { Itr7PersonalInfo } from './components/Itr7-personal-info.tsx';
import Itr7BalanceSheet from './components/Itr7-balance-sheet.tsx';
import Itr7BalanceSheetComprehensive from './components/Itr7-balance-sheet-comprehensive.tsx';
import Itr7ManufacturingAccount from './components/Itr7-manufacturing-account.tsx';
import Itr7TradingAccount from './components/Itr7-trading-account.tsx';
import Itr7ProfitLossAccount from './components/Itr7-profit-loss-account.tsx';
import Itr7Summary from './components/Itr7-summary.tsx';
import Itr7IncomeStatement from './components/Itr7-income-statement.tsx';
import Itr7PLAccount from './components/Itr7-pl-account.tsx';
import { ITR_SEVEN_PROGRESS_STEPS } from './itr-7.constants.ts';

type ITR7Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

const Itr7Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ITR7Step>(1);
  const [completedSteps, setCompletedSteps] = useState<ITR7Step[]>([]);

  const form = useForm<ITR7FormData>({
    resolver: zodResolver(itr7ValidationSchema) as any,
    mode: 'onChange',
    defaultValues: {
      gen_name: '',
      gen_pan: '',
      gen_cin: '',
      gen_company_type: 'domestic',
      gen_residential_status: 'resident',
    },
  });

  const comprehensiveForm = useForm<ITR7BalanceSheetComprehensiveData>({
    mode: 'onChange',
    defaultValues: {} as ITR7BalanceSheetComprehensiveData,
  });

  const manufacturingForm = useForm<ITR7ManufacturingAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ManufacturingAccountData,
  });

  const tradingForm = useForm<ITR7TradingAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7TradingAccountData,
  });

  const profitLossForm = useForm<ITR7ProfitLossAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ProfitLossAccountData,
  });

  const summaryForm = useForm<ITR7SummaryData>({
    mode: 'onChange',
    defaultValues: {} as ITR7SummaryData,
  });

  const incomeStatementForm = useForm<ITR7IncomeStatementData>({
    mode: 'onChange',
    defaultValues: {} as ITR7IncomeStatementData,
  });

  const plAccountForm = useForm<ITR7PLAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7PLAccountData,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const steps: ProgressStep[] = [
    {
      id: 'general-info',
      label: ITR_SEVEN_PROGRESS_STEPS[0]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[0]?.caption,
      completed: completedSteps.includes(1),
      current: currentStep === 1,
    },
    {
      id: 'balance-sheet',
      label: ITR_SEVEN_PROGRESS_STEPS[1]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[1]?.caption,
      completed: completedSteps.includes(2),
      current: currentStep === 2,
    },
    {
      id: 'balance-sheet-comprehensive',
      label: ITR_SEVEN_PROGRESS_STEPS[2]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[2]?.caption,
      completed: completedSteps.includes(3),
      current: currentStep === 3,
    },
    {
      id: 'manufacturing-account',
      label: ITR_SEVEN_PROGRESS_STEPS[3]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[3]?.caption,
      completed: completedSteps.includes(4),
      current: currentStep === 4,
    },
    {
      id: 'trading-account',
      label: ITR_SEVEN_PROGRESS_STEPS[4]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[4]?.caption,
      completed: completedSteps.includes(5),
      current: currentStep === 5,
    },
    {
      id: 'profit-loss-account',
      label: ITR_SEVEN_PROGRESS_STEPS[5]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[5]?.caption,
      completed: completedSteps.includes(6),
      current: currentStep === 6,
    },
    {
      id: 'summary-verification',
      label: ITR_SEVEN_PROGRESS_STEPS[6]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[6]?.caption,
      completed: completedSteps.includes(7),
      current: currentStep === 7,
    },
    {
      id: 'income-statement',
      label: ITR_SEVEN_PROGRESS_STEPS[7]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[7]?.caption,
      completed: completedSteps.includes(8),
      current: currentStep === 8,
    },
    {
      id: 'pl-account-indas',
      label: ITR_SEVEN_PROGRESS_STEPS[8]?.title + ': ' + ITR_SEVEN_PROGRESS_STEPS[8]?.caption,
      completed: completedSteps.includes(9),
      current: currentStep === 9,
    },
  ];

  const onSubmit = (data: ITR7FormData) => {
    console.log('Form submitted:', data);
  };

  const handleNext = () => {
    if (currentStep < 10) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((currentStep + 1) as ITR7Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as ITR7Step);
    }
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem('itr7_draft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const handleLoadDraft = () => {
    const draft = localStorage.getItem('itr7_draft');
    if (draft) {
      const draftData = JSON.parse(draft);
      Object.keys(draftData).forEach((key) => {
        form.setValue(key as keyof ITR7FormData, draftData[key]);
      });
      alert('Draft loaded successfully!');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Itr7PersonalInfo form={form} />;
      case 2:
        return <Itr7BalanceSheet form={form} />;
      case 3:
        return <Itr7BalanceSheetComprehensive form={comprehensiveForm} />;
      case 4:
        return <Itr7ManufacturingAccount form={manufacturingForm} />;
      case 5:
        return <Itr7TradingAccount form={tradingForm} />;
      case 6:
        return <Itr7ProfitLossAccount form={profitLossForm} />;
      case 7:
        return <Itr7Summary form={summaryForm} />;
      case 8:
        return <Itr7IncomeStatement form={incomeStatementForm} />;
      case 9:
        return <Itr7PLAccount form={plAccountForm} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            ITR-7: Income Tax Return for Trusts/Institutions
          </h1>
          <p className="text-gray-600 mt-2">
            Assessment Year: 2024-25 | Financial Year: 2023-24
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : step.current
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.completed ? '✓' : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {steps[currentStep - 1]?.label}
            </h2>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg shadow-sm mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLoadDraft}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Load Draft
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Save Draft
              </button>
            </div>

            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  ← Previous
                </button>
              )}
              {currentStep < 10 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Return
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Itr7Form;
