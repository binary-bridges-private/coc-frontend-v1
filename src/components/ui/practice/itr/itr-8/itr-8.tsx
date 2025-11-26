import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itr8ValidationSchema } from "./itr-8.validation";
import type { ITR8FormData } from "./itr-8.types";

type ITR8Step = 
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 
  | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 
  | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30;

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

const Itr8Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ITR8Step>(1);
  const [completedSteps, setCompletedSteps] = useState<ITR8Step[]>([]);

  const form = useForm<ITR8FormData>({
    resolver: zodResolver(itr8ValidationSchema) as any,
    mode: "onChange",
    defaultValues: {
      gen_name: "",
      gen_pan: "",
      gen_aadhaar: "",
      gen_karta_name: "",
      gen_residential_status: "resident",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const steps: ProgressStep[] = [
    {
      id: "personal-info",
      label: "Personal Information (HUF)",
      completed: completedSteps.includes(1),
      current: currentStep === 1,
    },
    {
      id: "house-property",
      label: "House Property Income",
      completed: completedSteps.includes(2),
      current: currentStep === 2,
    },
    {
      id: "business-profession",
      label: "Business/Profession Income",
      completed: completedSteps.includes(3),
      current: currentStep === 3,
    },
    {
      id: "capital-gains",
      label: "Capital Gains",
      completed: completedSteps.includes(4),
      current: currentStep === 4,
    },
    {
      id: "other-sources",
      label: "Other Sources of Income",
      completed: completedSteps.includes(5),
      current: currentStep === 5,
    },
    {
      id: "agricultural-income",
      label: "Agricultural Income",
      completed: completedSteps.includes(6),
      current: currentStep === 6,
    },
    {
      id: "loss-computation",
      label: "Loss Computation",
      completed: completedSteps.includes(7),
      current: currentStep === 7,
    },
    {
      id: "depreciation",
      label: "Depreciation Schedule",
      completed: completedSteps.includes(8),
      current: currentStep === 8,
    },
    {
      id: "chapter-vi-a",
      label: "Chapter VI-A Deductions",
      completed: completedSteps.includes(9),
      current: currentStep === 9,
    },
    {
      id: "donations-80g",
      label: "Donations (80G)",
      completed: completedSteps.includes(10),
      current: currentStep === 10,
    },
    {
      id: "donations-80gga",
      label: "Donations (80GGA)",
      completed: completedSteps.includes(11),
      current: currentStep === 11,
    },
    {
      id: "donations-80ggc",
      label: "Political Contributions (80GGC)",
      completed: completedSteps.includes(12),
      current: currentStep === 12,
    },
    {
      id: "deduction-80l",
      label: "NPS Contribution (80L)",
      completed: completedSteps.includes(13),
      current: currentStep === 13,
    },
    {
      id: "deduction-80e",
      label: "Education Loan Interest (80E)",
      completed: completedSteps.includes(14),
      current: currentStep === 14,
    },
    {
      id: "health-insurance",
      label: "Health Insurance (80D)",
      completed: completedSteps.includes(15),
      current: currentStep === 15,
    },
    {
      id: "set-off-losses",
      label: "Set-off of Losses (Schedule CVLA)",
      completed: completedSteps.includes(16),
      current: currentStep === 16,
    },
    {
      id: "bf-losses",
      label: "Brought Forward Losses (Schedule BF1A)",
      completed: completedSteps.includes(17),
      current: currentStep === 17,
    },
    {
      id: "income-summary",
      label: "Income Summary",
      completed: completedSteps.includes(18),
      current: currentStep === 18,
    },
    {
      id: "tax-calculation",
      label: "Tax Calculation",
      completed: completedSteps.includes(19),
      current: currentStep === 19,
    },
    {
      id: "payment-details",
      label: "Payment and Refund Details",
      completed: completedSteps.includes(20),
      current: currentStep === 20,
    },
    {
      id: "bank-details",
      label: "Bank Account Details",
      completed: completedSteps.includes(21),
      current: currentStep === 21,
    },
    {
      id: "verification",
      label: "Verification",
      completed: completedSteps.includes(22),
      current: currentStep === 22,
    },
    {
      id: "declaration",
      label: "Declaration and Submission",
      completed: completedSteps.includes(23),
      current: currentStep === 23,
    },
  ];

  const handleNext = async () => {
    const isStepValid = await form.trigger();
    if (!isStepValid) return;

    if (currentStep < 23) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((currentStep + 1) as ITR8Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as ITR8Step);
    }
  };

  const handleSubmitForm = (data: ITR8FormData) => {
    console.log("Form submitted:", data);
    alert("ITR-8 Form submitted successfully!");
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem("itr8_draft", JSON.stringify(formData));
    alert("Form saved as draft!");
  };

  const handleLoadDraft = () => {
    const savedData = localStorage.getItem("itr8_draft");
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
            ITR-8 Form: HUF Tax Return
          </h1>
          <p className="text-slate-600 text-lg">
            For Hindu Undivided Families (HUF)
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-600">
                  Step {currentStep} of 23
                </span>
                <span className="text-sm font-semibold text-slate-600">
                  {Math.round((currentStep / 23) * 100)}% Complete
                </span>
              </div>
              <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 23) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-slate-700 font-medium">
            {steps[currentStep - 1]?.label}
          </p>
        </div>

        {/* Form Content Area */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {steps[currentStep - 1]?.label}
            </h2>
            
            {/* Placeholder for step content */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-slate-700">
                Step {currentStep} content will be rendered here. This form collects comprehensive information for HUF tax return filing under the Income Tax Act, 1961.
              </p>
            </div>
          </div>

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
              disabled={!isValid || currentStep === 23}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next →
            </button>
          </div>

          {/* Submit Section (Only visible on last step) */}
          {currentStep === 23 && (
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✅ Ready to Submit?
              </h3>
              <p className="text-gray-600 mb-6">
                Review all the information before submitting. You can go back to any section to make changes.
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
                  ✓ Submit ITR-8
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
              <span>ITR-8 is applicable for Hindu Undivided Families (HUF)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>All fields marked with <span className="text-red-500">*</span> are mandatory</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>You can save the form as draft and continue later</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Ensure all dates are in DD/MM/YYYY format</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>File return before the due date specified</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Itr8Form;
