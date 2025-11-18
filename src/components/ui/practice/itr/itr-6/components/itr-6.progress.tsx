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
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex flex-wrap justify-between gap-3 p-4 md:p-6">
        {steps.map((step, index) => {
          const status = stepStatusMap[step.id]
            ? stepStatusMap[step.id]
            : step.id < activeStepId
            ? "completed"
            : step.id === activeStepId
            ? "in-progress"
            : "pending";

          return (
            <div key={step.id} className="flex items-center gap-3 min-w-[160px]">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-colors ${statusStyles[status]}`}>
                {status === "completed" ? "\u2713" : step.id}
              </div>

              <div className="flex flex-col text-sm">
                <span className="font-semibold text-gray-800">{step.title}</span>
                {step.caption && <span className="text-gray-500">{step.caption}</span>}
              </div>

              {index !== steps.length - 1 && (
                <span className="hidden md:block w-8 h-px bg-gray-200" aria-hidden />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ITR6Progress;
