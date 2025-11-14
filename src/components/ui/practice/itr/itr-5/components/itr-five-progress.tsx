import React, { useMemo } from "react";
import { ItrFiveSection } from "./itr-five-entry";

interface ItrFiveProgressProps {
  sections: ItrFiveSection[];
  currentSectionTitle: string;
}

const ItrFiveProgress: React.FC<ItrFiveProgressProps> = ({
  sections,
  currentSectionTitle,
}) => {
  const progressStats = useMemo(() => {
    const total = sections.length;
    const completed = sections.filter((s) => s.status === "completed").length;
    const inProgress = sections.filter((s) => s.status === "in-progress").length;
    const notStarted = sections.filter((s) => s.status === "not-started").length;
    const percentage = Math.round((completed / total) * 100);

    return { total, completed, inProgress, notStarted, percentage };
  }, [sections]);

  return (
    <div className="space-y-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-200">
      {/* Current Section */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          Current Section
        </p>
        <h3 className="text-lg font-bold text-gray-900">{currentSectionTitle}</h3>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">Overall Progress</p>
          <span className="text-lg font-bold text-blue-600">
            {progressStats.percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-500"
            style={{ width: `${progressStats.percentage}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3 pt-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {progressStats.completed}
          </p>
          <p className="text-xs text-gray-600 mt-1">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {progressStats.inProgress}
          </p>
          <p className="text-xs text-gray-600 mt-1">In Progress</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600">
            {progressStats.notStarted}
          </p>
          <p className="text-xs text-gray-600 mt-1">Not Started</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {progressStats.total}
          </p>
          <p className="text-xs text-gray-600 mt-1">Total</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFiveProgress;
