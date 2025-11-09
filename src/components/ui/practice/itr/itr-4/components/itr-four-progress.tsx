import React from 'react';

interface ItrFourProgressProps {
  percentage: number;
  currentSection: string;
  totalSections: number;
  completedSections: number;
}

const ItrFourProgress: React.FC<ItrFourProgressProps> = ({
  percentage,
  currentSection,
  totalSections,
  completedSections,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Filing Progress</h2>
            <p className="mt-1 text-sm text-gray-600">
              {completedSections} of {totalSections} sections completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
            <p className="text-xs text-gray-600">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Current Section */}
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-blue-600">Current Section</p>
            <p className="text-sm font-semibold text-gray-900">{currentSection}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrFourProgress;
