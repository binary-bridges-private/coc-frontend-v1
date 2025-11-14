import React from "react";

export type SectionStatus = "not-started" | "in-progress" | "completed";

export interface ItrFiveSection {
  id: string;
  title: string;
  description: string;
  status: SectionStatus;
}

interface ItrFiveEntryProps {
  sections: ItrFiveSection[];
  activeSectionId: string | null;
  onSectionSelect: (sectionId: string) => void;
}

const ItrFiveEntry: React.FC<ItrFiveEntryProps> = ({
  sections,
  activeSectionId,
  onSectionSelect,
}) => {
  const getStatusColor = (status: SectionStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-400 text-green-900";
      case "in-progress":
        return "bg-blue-100 border-blue-400 text-blue-900";
      case "not-started":
        return "bg-gray-100 border-gray-300 text-gray-700";
    }
  };

  const getStatusIcon = (status: SectionStatus) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "→";
      case "not-started":
        return "○";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">ITR-5 Sections</h2>
      
      <div className="grid gap-3">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => onSectionSelect(section.id)}
            className={`w-full text-left p-4 rounded-lg border-l-4 transition-all ${getStatusColor(
              section.status
            )} ${
              activeSectionId === section.id
                ? "ring-2 ring-offset-2 ring-blue-500"
                : ""
            } hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg w-6 text-center">
                    {getStatusIcon(section.status)}
                  </span>
                  <h3 className="font-semibold text-lg">{section.title}</h3>
                </div>
                <p className="text-sm mt-2 opacity-90">{section.description}</p>
              </div>
              <span className="text-xs font-medium uppercase tracking-wide ml-2">
                {section.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItrFiveEntry;
