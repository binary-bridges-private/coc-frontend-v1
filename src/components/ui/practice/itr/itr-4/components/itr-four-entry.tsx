import React from 'react';

export type SectionStatus = 'not-started' | 'in-progress' | 'completed';

export interface ItrFourSection {
  id: string;
  title: string;
  description: string;
  status: SectionStatus;
}

interface ItrFourEntryProps {
  sections: ItrFourSection[];
  activeSectionId: string;
  onSectionSelect: (sectionId: string) => void;
}

const ItrFourEntry: React.FC<ItrFourEntryProps> = ({
  sections,
  activeSectionId,
  onSectionSelect,
}) => {
  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-5 w-5 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-5 w-5 text-blue-600"
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
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        );
    }
  };

  const getStatusBadge = (status: SectionStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            In Progress
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        const isActive = section.id === activeSectionId;
        const isDisabled = section.status === 'not-started' && index > 0 && sections[index - 1].status !== 'completed';

        return (
          <button
            key={section.id}
            onClick={() => !isDisabled && onSectionSelect(section.id)}
            disabled={isDisabled}
            className={`w-full rounded-xl border p-6 text-left transition-all ${
              isActive
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : section.status === 'completed'
                ? 'border-green-200 bg-white hover:border-green-300 hover:shadow-sm'
                : section.status === 'in-progress'
                ? 'border-blue-200 bg-white hover:border-blue-300 hover:shadow-sm'
                : isDisabled
                ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {getStatusIcon(section.status)}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {section.description}
                  </p>
                </div>
              </div>
              {getStatusBadge(section.status)}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ItrFourEntry;
