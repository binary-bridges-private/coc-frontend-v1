import React, { useState, useMemo } from "react";
import ItrTwoProgress from "./components/itr-two-progress.tsx";
import ItrTwoEntry from "./components/Itr-two-entry.tsx";
import ItrTwoPersonal from "./components/itr-two-personal.tsx";
import ItrTwoSalary from "./components/itr-two-salary.tsx";
import ItrTwoHousing from "./components/Itr-two-housing.tsx";
import ItrTwoCapitalGain from "./components/Itr-two-capital-gain.tsx";
import {
  ITR_TWO_SECTIONS,
  calculateCompletionPercentage,
} from "./itr-two.constants.ts";
import { ItrTwoSection, SectionStatus } from "./itr-two.types.ts";
import {
  PersonalInfoFormData,
  SalaryIncomeFormData,
  HousePropertyFormData,
  CapitalGainsSectionAFormData,
  CapitalGainsSectionBFormData,
} from "./itr-two.validation.ts";

const ItrTwo: React.FC = () => {
  const [sections, setSections] = useState<ItrTwoSection[]>(ITR_TWO_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    personalInfo?: PersonalInfoFormData;
    salaryIncome?: SalaryIncomeFormData;
    houseProperty?: HousePropertyFormData;
    capitalGains?: {
      sectionA?: CapitalGainsSectionAFormData;
      sectionB?: CapitalGainsSectionBFormData;
    };
  }>({});

  const completionPercentage = useMemo(
    () => calculateCompletionPercentage(sections),
    [sections]
  );

  const completedSections = useMemo(
    () => sections.filter((s) => s.status === "completed").length,
    [sections]
  );

  const currentSection = useMemo(() => {
    const activeSection = sections.find((s) => s.status === "in-progress");
    return activeSection ? activeSection.title : "Get Started";
  }, [sections]);

  const activeSectionIndex = useMemo(() => {
    const index = sections.findIndex((s) => s.status === "in-progress");
    return index >= 0 ? index : 0;
  }, [sections]);

  const activeSection = sections[activeSectionIndex];

  const handleSectionSelect = (sectionId: string) => {
    const targetIndex = sections.findIndex(
      (section) => section.id === sectionId
    );
    if (targetIndex === -1) return;

    setSections((prev) => {
      const updated = prev.map((section, index) => {
        if (index < targetIndex) {
          return { ...section, status: "completed" as SectionStatus };
        }
        if (index === targetIndex) {
          return { ...section, status: "in-progress" as SectionStatus };
        }
        return section;
      });
      return updated;
    });

    setActiveSectionId(sectionId);
  };

  const handleSectionComplete = (sectionId: string, data?: any) => {
    if (sectionId === "part-a-general" && data) {
      setFormData((prev) => ({ ...prev, personalInfo: data }));
    }
    if (sectionId === "schedule-s" && data) {
      setFormData((prev) => ({ ...prev, salaryIncome: data }));
    }
    if (sectionId === "house-property" && data) {
      setFormData((prev) => ({ ...prev, houseProperty: data }));
    }
    if (sectionId === "cg" && data) {
      setFormData((prev) => ({ ...prev, capitalGains: data }));
    }

    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === sectionId) {
          return { ...section, status: "completed" as SectionStatus };
        }
        return section;
      });

      const currentIndex = prev.findIndex((s) => s.id === sectionId);
      if (currentIndex < prev.length - 1) {
        updated[currentIndex + 1].status = "in-progress";
      }

      return updated;
    });
    setActiveSectionId(null);
  };

  const handleBackToSummary = () => {
    setActiveSectionId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            New ITR Filing
          </p>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            ITR-2
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            For Individuals and HUFs not having income from profits and gains of
            business or profession
          </p>
        </header>

        <ItrTwoProgress
          percentage={completionPercentage}
          currentSection={currentSection}
          totalSections={sections.length}
          completedSections={completedSections}
        />

        {activeSectionId ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeSection?.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {activeSection?.description}
                </p>
              </div>
              <button
                type="button"
                onClick={handleBackToSummary}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Back to summary
              </button>
            </div>

            {activeSectionId === "part-a-general" && (
              <ItrTwoPersonal
                onComplete={(data) =>
                  handleSectionComplete("part-a-general", data)
                }
                onCancel={handleBackToSummary}
                initialData={formData.personalInfo}
              />
            )}

            {activeSectionId === "schedule-s" && (
              <ItrTwoSalary
                onComplete={(data) => handleSectionComplete("schedule-s", data)}
                initialData={formData.salaryIncome}
                personalInfo={formData.personalInfo} 
              />
            )}

            {activeSectionId === "house-property" && (
              <ItrTwoHousing
                onComplete={(data) =>
                  handleSectionComplete("house-property", data)
                }
                initialData={formData.houseProperty}
                personalInfo={formData.personalInfo} 
              />
            )}

            {activeSectionId === "cg" && (
              <ItrTwoCapitalGain
                onComplete={(data) => handleSectionComplete("cg", data)}
                initialData={formData.capitalGains}
                personalInfo={formData.personalInfo}
              />
            )}

            {activeSectionId !== "part-a-general" &&
              activeSectionId !== "schedule-s" &&
              activeSectionId !== "house-property" &&
              activeSectionId !== "cg" && (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto max-w-md space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                      <svg
                        className="h-8 w-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {activeSection?.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Form component for this section will be implemented here.
                    </p>
                    <div className="flex justify-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={handleBackToSummary}
                        className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSectionComplete(activeSectionId)}
                        className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </section>
        ) : (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Filing Sections
            </h2>
            <p className="text-sm text-gray-600">
              Complete all sections to file your ITR-2. Click on any section to
              begin.
            </p>
            <ItrTwoEntry
              sections={sections}
              activeSectionId={activeSection?.id || ""}
              onSectionSelect={handleSectionSelect}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ItrTwo;
