import React from 'react';

interface ItrThreeProgressProps {
  completionPercentage: number;
  completedSections: number;
  totalSections: number;
  currentSection: string;
}

const ItrThreeProgress: React.FC<ItrThreeProgressProps> = ({
  completionPercentage,
  completedSections,
  totalSections,
  currentSection,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filing Progress</h2>
        <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
      </div>

      <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Sections Completed:</span>
          <span className="font-semibold text-gray-900">
            {completedSections} / {totalSections}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Current Section:</span>
          <span className="font-semibold text-gray-900">{currentSection}</span>
        </div>
      </div>
    </div>
  );
};

export default ItrThreeProgress;
