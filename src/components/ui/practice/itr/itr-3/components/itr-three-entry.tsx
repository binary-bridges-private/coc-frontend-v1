import React from 'react';

export type SectionStatus = 'not-started' | 'in-progress' | 'completed';

export interface ItrThreeSection {
  id: string;
  title: string;
  description: string;
  status: SectionStatus;
}

interface ItrThreeEntryProps {
  sections: ItrThreeSection[];
  activeSectionId: string;
  onSectionSelect: (sectionId: string) => void;
}

const ItrThreeEntry: React.FC<ItrThreeEntryProps> = ({
  sections,
  activeSectionId,
  onSectionSelect,
}) => {
  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
            <span className="text-sm font-medium text-gray-400">•</span>
          </div>
        );
    }
  };

  const getStatusBadge = (status: SectionStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            In Progress
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
            Not Started
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {sections.map((section, index) => {
        const isActive = section.id === activeSectionId;
        const isClickable = section.status !== 'not-started' || index === 0 || sections[index - 1]?.status === 'completed';

        return (
          <div
            key={section.id}
            className={`rounded-lg border-2 transition-all ${
              isActive
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : section.status === 'completed'
                ? 'border-green-200 bg-white hover:shadow-md'
                : 'border-gray-200 bg-white hover:shadow-sm'
            } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
            onClick={() => isClickable && onSectionSelect(section.id)}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{getStatusIcon(section.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                      {section.title}
                    </h3>
                    {getStatusBadge(section.status)}
                  </div>
                  <p className={`text-xs ${isActive ? 'text-blue-700' : 'text-gray-600'}`}>
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItrThreeEntry;
