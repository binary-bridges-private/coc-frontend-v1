import React from "react";

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

interface Itr7ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: ProgressStep[];
}

const Itr7ProgressBar: React.FC<Itr7ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-6 mb-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            ITR-7 Form Progress
          </h3>
          <p className="text-sm text-slate-600">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            {Math.round(progressPercentage)}%
          </div>
          <p className="text-xs text-slate-500">Complete</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center p-3 rounded-lg transition-all ${
              step.current
                ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                : step.completed
                ? "bg-green-50 border-2 border-green-500"
                : "bg-gray-50 border-2 border-gray-300"
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 flex-shrink-0 ${
                step.current
                  ? "bg-blue-500 text-white"
                  : step.completed
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.completed ? "✓" : index + 1}
            </div>
            <div className="min-w-0">
              <p
                className={`text-xs font-semibold truncate ${
                  step.current
                    ? "text-blue-900"
                    : step.completed
                    ? "text-green-900"
                    : "text-gray-600"
                }`}
              >
                {step.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Status Message */}
      <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Current Step:</span> {steps[currentStep - 1]?.label || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default Itr7ProgressBar;
