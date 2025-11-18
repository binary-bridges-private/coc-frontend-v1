import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInformation from "./components/Itr7-personal-information";
import ManufacturingAccount from "./components/Itr7-manufacturing-account";
import TradingAccountComponent from "./components/Itr7-trading-account";
import BalanceSheet from "./components/Itr7-balance-sheet";
import TradingStatement from "./components/Itr7-trading-statement";
import ProfitLossAccount from "./components/Itr7-profit-loss";
import CashFlowStatement from "./components/Itr7-cash-flow";
import NotesToAccounts from "./components/Itr7-notes-to-accounts";
import ComprehensiveIncomeStatement from "./components/Itr7-comprehensive-income";
import Itr7ProgressBar from "./components/itr-7-progress";
import { itr7ValidationSchema } from "./itr-7.validation";
import type { ITR7FormData } from "./itr-7.types";

type ITR7Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
    mode: "onChange",
    defaultValues: {    
      gen_name: "",
      gen_pan: "",
      gen_cin: "",
      gen_incorporation_date: "",
      gen_business_commencement_date: "",
    },
  });

  const { handleSubmit, formState: { isValid } } = form;

  // Define all ITR-7 form steps
  const steps: ProgressStep[] = [
    {
      id: "personal-info",
      label: "Personal Information",
      completed: completedSteps.includes(1),
      current: currentStep === 1,
    },
    {
      id: "manufacturing-account",
      label: "Manufacturing Account",
      completed: completedSteps.includes(2),
      current: currentStep === 2,
    },
    {
      id: "trading-account",
      label: "Trading Account",
      completed: completedSteps.includes(3),
      current: currentStep === 3,
    },
    {
      id: "balance-sheet",
      label: "Balance Sheet",
      completed: completedSteps.includes(4),
      current: currentStep === 4,
    },
    {
      id: "trading-statement",
      label: "Trading Statement (Asset Schedules)",
      completed: completedSteps.includes(5),
      current: currentStep === 5,
    },
    {
      id: "profit-loss",
      label: "Profit & Loss Account",
      completed: completedSteps.includes(6),
      current: currentStep === 6,
    },
    {
      id: "cash-flow",
      label: "Cash Flow Statement",
      completed: completedSteps.includes(7),
      current: currentStep === 7,
    },
    {
      id: "notes-to-accounts",
      label: "Notes to Accounts",
      completed: completedSteps.includes(8),
      current: currentStep === 8,
    },
    {
      id: "comprehensive-income",
      label: "Comprehensive Income Statement",
      completed: completedSteps.includes(9),
      current: currentStep === 9,
    },
  ];

  const handleNext = async () => {
    // Validate current step before proceeding
    const isStepValid = await form.trigger();
    if (!isStepValid) return;

    if (currentStep < 9) {
      // Mark current step as completed
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((currentStep + 1) as ITR7Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as ITR7Step);
    }
  };

  const handleSubmitForm = (data: ITR7FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission
    alert("ITR-7 Form submitted successfully!");
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem("itr7_draft", JSON.stringify(formData));
    alert("Form saved as draft!");
  };

  const handleLoadDraft = () => {
    const savedData = localStorage.getItem("itr7_draft");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
      alert("Draft loaded successfully!");
    } else {
      alert("No saved draft found!");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      form.reset();
      setCurrentStep(1);
      setCompletedSteps([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ITR-7 Form: Corporate Tax Return
          </h1>
          <p className="text-slate-600 text-lg">
            For Corporate Bodies (Other than Co-operative Societies)
          </p>
        </div>

        {/* Progress Bar */}
        <Itr7ProgressBar 
          currentStep={currentStep} 
          totalSteps={3}
          steps={steps}
        />

        {/* Form Steps */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <PersonalInformation
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}

          {/* Step 2: Manufacturing Account */}
          {currentStep === 2 && (
            <ManufacturingAccount
              onCancel={() => handleReset()}
            />
          )}

          {/* Step 3: Trading Account */}
          {currentStep === 3 && (
            <TradingAccountComponent
              onCancel={() => handleReset()}
            />
          )}

          {/* Step 4: Balance Sheet */}
          {currentStep === 4 && (
            <BalanceSheet
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}

          {/* Step 5: Trading Statement (Asset Schedules) */}
          {currentStep === 5 && (
            <TradingStatement
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}

          {/* Step 6: Profit & Loss Account */}
          {currentStep === 6 && (
            <ProfitLossAccount
              onCancel={() => handleReset()}
            />
          )}

          {/* Step 7: Cash Flow Statement */}
          {currentStep === 7 && (
            <CashFlowStatement
              onCancel={() => handleReset()}
            />
          )}

          {/* Step 8: Notes to Accounts */}
          {currentStep === 8 && (
            <NotesToAccounts
              onCancel={() => handleReset()}
            />
          )}

          {/* Step 9: Comprehensive Income Statement */}
          {currentStep === 9 && (
            <ComprehensiveIncomeStatement
              onCancel={() => handleReset()}
            />
          )}

          {/* Navigation Buttons */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex gap-4 justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ← Previous
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLoadDraft}
                className="px-6 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                📂 Load Draft
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                💾 Save Draft
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                🔄 Reset
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isValid || currentStep === 9}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next →
            </button>
          </div>

          {/* Submit Section (Only visible on last step) */}
          {currentStep === 9 && (
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✅ Ready to Submit?
              </h3>
              <p className="text-gray-600 mb-6">
                Review all the information before submitting. You can go back to any section
                to make changes.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  ← Go Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                >
                  ✓ Submit ITR-7
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Footer Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Important Information
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                All fields marked with <span className="text-red-500">*</span> are mandatory
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                You can save the form as draft and continue later
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                All calculations are done automatically for balance sheet fields
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                Ensure all dates are in DD/MM/YYYY format
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                For any assistance, contact support@example.com
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Itr7Form;
