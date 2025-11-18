import React from "react";
import { ItrSummarySection } from "../itr-6.types";

interface EntryProps {
  sections: ItrSummarySection[];
  activeSectionId: string;
  onSectionSelect?: (sectionId: string) => void;
}

const statusTone: Record<ItrSummarySection["status"], string> = {
  "in-progress": "text-blue-600",
  completed: "text-green-600",
  pending: "text-gray-500",
};

const ITR6Entry: React.FC<EntryProps> = ({ sections, activeSectionId, onSectionSelect }) => {
  return (
    <div className="w-full overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="divide-y divide-gray-100">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          const isCompleted = section.status === "completed";

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionSelect?.(section.id)}
              className={`flex w-full flex-col items-start gap-3 px-4 py-5 text-left transition-colors md:flex-row md:items-center md:justify-between ${
                isCompleted 
                  ? "bg-gray-100 hover:bg-gray-200" 
                  : isActive 
                  ? "bg-blue-50" 
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-medium ${
                  isCompleted 
                    ? "border-green-500 bg-green-500 text-white" 
                    : isActive 
                    ? "border-blue-500 text-blue-600" 
                    : "border-gray-300 text-gray-500"
                }`}>
                  {isCompleted ? (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    section.id === "company-info" ? "CI" : section.id.toUpperCase().slice(0, 2)
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                  <p className="max-w-2xl text-sm text-gray-600">{section.description}</p>
                </div>
              </div>

              <div className="flex w-full items-center justify-between gap-4 md:w-auto">
                {section.amountValue && (
                  <div className="text-right">
                    <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {section.amountLabel}
                    </span>
                    <div className="text-lg font-semibold text-gray-800">{section.amountValue}</div>
                  </div>
                )}

                <div className={`flex items-center gap-2 text-sm font-medium ${statusTone[section.status]}`}>
                  <span>{section.statusText ?? "Review"}</span>
                  <span aria-hidden>{">"}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ITR6Entry;
