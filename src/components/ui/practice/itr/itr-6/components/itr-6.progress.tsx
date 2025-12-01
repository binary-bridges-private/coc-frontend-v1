import React from "react";
import { ItrStep, StepStatus } from "../itr-6.types";

interface ProgressProps {
  steps: ItrStep[];
  activeStepId: number;
  stepStatusMap?: Record<number, StepStatus>;
}

const statusStyles: Record<StepStatus, string> = {
  completed: "bg-green-500 border-green-500 text-white",
  "in-progress": "bg-blue-600 border-blue-600 text-white",
  pending: "bg-white border-gray-300 text-gray-500",
};

const ITR6Progress: React.FC<ProgressProps> = ({ steps, activeStepId, stepStatusMap = {} }) => {
  return (
    <div className="flex justify-between items-center overflow-x-auto pb-2">
      {steps.map((step, index) => {
          const status = stepStatusMap[step.id]
            ? stepStatusMap[step.id]
            : step.id < activeStepId
            ? "completed"
            : step.id === activeStepId
            ? "in-progress"
            : "pending";

          return (
            <div key={step.id} className="flex items-center min-w-max mr-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-colors ${statusStyles[status]}`}
              >
                {status === "completed" ? "\u2713" : step.id}
              </div>
              {index !== steps.length - 1 && (
                <div className="w-10 h-[2px] mx-2 bg-gray-200" aria-hidden />
              )}
            </div>
          );
      })}
    </div>
  );
};

export default ITR6Progress;
