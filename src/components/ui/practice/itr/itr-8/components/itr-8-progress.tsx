import React from "react";

interface Itr8ProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ id: string; label: string; completed: boolean; current: boolean }>;
}

const Itr8ProgressBar: React.FC<Itr8ProgressProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">Form Progress</h3>
        <span className="text-sm font-semibold text-slate-600">
          {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-3 mb-6">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {steps.slice(0, 12).map((step, index) => (
          <div
            key={step.id}
            className={`p-3 rounded-lg text-center text-sm font-semibold transition-colors ${
              step.current
                ? "bg-blue-600 text-white shadow-lg"
                : step.completed
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-gray-100 text-gray-600 border border-gray-300"
            }`}
          >
            {index + 1}
            {step.completed && <div className="text-xs">✓</div>}
          </div>
        ))}
      </div>

      {/* Current Step Label */}
      <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-600 rounded">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Current Step:</span> {steps[currentStep - 1]?.label}
        </p>
      </div>
    </div>
  );
};

export default Itr8ProgressBar;
