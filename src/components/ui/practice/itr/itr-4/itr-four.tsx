import React, { useState, useMemo, useEffect } from "react";
import ItrFourProgress from "./components/itr-four-progress.tsx";
import ItrFourEntry, {
  ItrFourSection,
  SectionStatus,
} from "./components/itr-four-entry.tsx";
import ItrFourPartAGeneral, {
  PartAGeneralFormData,
} from "./components/itr-four-part-a-general.tsx";
import ItrFourPartBGTI, {
  PartBGTIFormData,
} from "./components/itr-four-part-b-gti.tsx";
import ItrFourPartCDeductions, {
  PartCDeductionsFormData,
} from "./components/itr-four-part-c-deductions.tsx";
import ItrFourPartDTaxComputations, {
  PartDTaxComputationsFormData,
} from "./components/itr-four-part-d-tax-computations.tsx";
import ItrFourScheduleBP, {
  ScheduleBPFormData,
} from "./components/itr-four-schedule-bp.tsx";
import ItrFourVerification, {
  VerificationFormData,
} from "./components/itr-four-verification.tsx";
import { exportITR4ToPDF } from "./utils/pdfExportITR4.ts";

// Define all ITR-4 SUGAM sections
const ITR_FOUR_SECTIONS: ItrFourSection[] = [
  // Main Parts A, B, C, D
  {
    id: "part-a-general",
    title: "Part A - General Information",
    description:
      "Personal details, address, contact information, and filing status",
    status: "in-progress",
  },
  {
    id: "part-b-gti",
    title: "Part B - Gross Total Income",
    description:
      "Income from business/profession, salary, house property, and other sources",
    status: "not-started",
  },
  {
    id: "part-c-deductions",
    title: "Part C - Deductions and Taxable Total Income",
    description:
      "Chapter VI-A deductions (80C to 80U) and computation of taxable total income",
    status: "not-started",
  },
  {
    id: "part-d-tax-computations",
    title: "Part D - Tax Computations and Tax Status",
    description:
      "Tax liability, interest, fees, and refund/amount payable calculation",
    status: "not-started",
  },

  // Schedules (Supporting Details)
  {
    id: "schedule-bp",
    title: "Schedule BP - Business/Profession Income",
    description:
      "Details of income from business or profession under sections 44AD/44ADA/44AE",
    status: "not-started",
  },
  {
    id: "verification",
    title: "Verification",
    description: "Final verification and declaration",
    status: "not-started",
  },
];

// Helper function to calculate completion percentage
const calculateCompletionPercentage = (sections: ItrFourSection[]): number => {
  const completedSections = sections.filter(
    (s) => s.status === "completed"
  ).length;
  return Math.round((completedSections / sections.length) * 100);
};

// CSV Export Function
const exportToCSV = (allFormData: any) => {
  const flattenObject = (obj: any, prefix = ""): any => {
    let result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}_${key}` : key;

        if (value && typeof value === "object" && !Array.isArray(value)) {
          Object.assign(result, flattenObject(value, newKey));
        } else if (Array.isArray(value)) {
          result[newKey] = JSON.stringify(value);
        } else {
          result[newKey] = value || "";
        }
      }
    }
    return result;
  };

  const flatData = flattenObject(allFormData);

  // Convert to CSV
  const headers = Object.keys(flatData);
  const values = Object.values(flatData);

  const csvContent = [
    headers.join(","),
    values
      .map((val: any) => {
        const stringVal = String(val).replace(/"/g, '""');
        return `"${stringVal}"`;
      })
      .join(","),
  ].join("\n");

  // Download CSV
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `ITR4_SUGAM_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("ITR-4 SUGAM data exported to CSV successfully!");
};

const ItrFour: React.FC = () => {
  // Persistence logic
  const [formData, setFormData] = useState<{
    partAGeneral?: PartAGeneralFormData;
    partBGTI?: PartBGTIFormData;
    scheduleBP?: ScheduleBPFormData;
    scheduleS?: any;
    scheduleHP?: any;
    scheduleOS?: any;
    scheduleCYLA?: any;
    scheduleBFLA?: any;
    scheduleCFL?: any;
    partCDeductions?: PartCDeductionsFormData;
    partDTaxComputations?: PartDTaxComputationsFormData;
    scheduleIT?: any;
    scheduleTDS?: any;
    scheduleTCS?: any;
    scheduleAMT?: any;
    scheduleFA?: any;
    schedule5A?: any;
    verification?: VerificationFormData;
  }>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("itr4_formData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.formData || {};
        } catch (e) {
          console.error("Error parsing itr4_formData", e);
        }
      }
    }
    return {};
  });

  const [sections, setSections] = useState<ItrFourSection[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("itr4_formData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.sections || ITR_FOUR_SECTIONS;
        } catch (e) {
          console.error("Error parsing itr4_sections", e);
        }
      }
    }
    return ITR_FOUR_SECTIONS;
  });

  // Save to persistence
  useEffect(() => {
    localStorage.setItem(
      "itr4_formData",
      JSON.stringify({
        formData,
        sections,
      })
    );
  }, [formData, sections]);

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  const completionPercentage = useMemo(
    () => calculateCompletionPercentage(sections),
    [sections]
  );
  // ... (rest of the file until render)

  // ... inside render ...
  {
    /* Part C - Deductions and Taxable Total Income */
  }
  {
    activeSectionId === "part-c-deductions" && (
      <ItrFourPartCDeductions
        onNext={() =>
          handleSectionComplete("part-c-deductions", formData.partCDeductions)
        }
        onBack={handleBackToSummary}
        onSave={(data) =>
          setFormData((prev) => ({ ...prev, partCDeductions: data }))
        }
        initialData={formData.partCDeductions}
        grossTotalIncome={formData.partBGTI?.b5_grossTotalIncome || "0"}
        partAGeneral={formData.partAGeneral}
      />
    );
  }

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

  // Auto-scroll to the currently active section
  useEffect(() => {
    const targetId = activeSectionId
      ? `section-${activeSectionId}`
      : "section-summary";
    const scroll = () => {
      const el = document.getElementById(targetId);
      if (el && "scrollIntoView" in el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const t = window.setTimeout(scroll, 0);
    return () => window.clearTimeout(t);
  }, [activeSectionId, activeSectionIndex]);

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
    // Save data based on section ID
    if (sectionId === "part-a-general" && data) {
      setFormData((prev) => ({ ...prev, partAGeneral: data }));
    } else if (sectionId === "part-b-gti" && data) {
      setFormData((prev) => ({ ...prev, partBGTI: data }));
    } else if (sectionId === "part-c-deductions" && data) {
      setFormData((prev) => ({ ...prev, partCDeductions: data }));
    } else if (sectionId === "part-d-tax-computations" && data) {
      setFormData((prev) => ({ ...prev, partDTaxComputations: data }));
    } else if (sectionId === "schedule-bp" && data) {
      setFormData((prev) => ({ ...prev, scheduleBP: data }));
    } else if (sectionId === "verification" && data) {
      setFormData((prev) => ({ ...prev, verification: data }));
    }
    // Add more section data handlers here as components are created

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

  const handleFinalSubmit = () => {
    exportToCSV(formData);
  };

  const allSectionsCompleted = useMemo(() => {
    return sections.every((s) => s.status === "completed");
  }, [sections]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            New ITR Filing
          </p>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            ITR-4 SUGAM
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            For Individuals, HUFs and Firms (other than LLP) being a resident
            having total income upto Rs.50 lakh and having income from business
            and profession which is computed under sections 44AD, 44ADA or 44AE
          </p>
        </header>

        {/* Progress Bar */}
        <ItrFourProgress
          percentage={completionPercentage}
          currentSection={currentSection}
          totalSections={sections.length}
          completedSections={completedSections}
        />

        {activeSectionId ? (
          <section id={`section-${activeSectionId}`} className="space-y-4">
            {/* Part A - General Information */}
            {activeSectionId === "part-a-general" && (
              <ItrFourPartAGeneral
                onComplete={(data) =>
                  handleSectionComplete("part-a-general", data)
                }
                onCancel={handleBackToSummary}
                initialData={formData.partAGeneral}
              />
            )}

            {/* Part B - Gross Total Income */}
            {activeSectionId === "part-b-gti" && (
              <ItrFourPartBGTI
                onNext={() =>
                  handleSectionComplete("part-b-gti", formData.partBGTI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partBGTI: data }))
                }
                initialData={formData.partBGTI}
              />
            )}

            {/* Part C - Deductions and Taxable Total Income */}
            {activeSectionId === "part-c-deductions" && (
              <ItrFourPartCDeductions
                onNext={() =>
                  handleSectionComplete(
                    "part-c-deductions",
                    formData.partCDeductions
                  )
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partCDeductions: data }))
                }
                initialData={formData.partCDeductions}
                grossTotalIncome={formData.partBGTI?.b5_grossTotalIncome || "0"}
              />
            )}

            {/* Part D - Tax Computations and Tax Status */}
            {activeSectionId === "part-d-tax-computations" && (
              <ItrFourPartDTaxComputations
                onNext={() =>
                  handleSectionComplete(
                    "part-d-tax-computations",
                    formData.partDTaxComputations
                  )
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({
                    ...prev,
                    partDTaxComputations: data,
                  }))
                }
                initialData={formData.partDTaxComputations}
                taxableTotalIncome={
                  formData.partCDeductions?.c20_taxableTotalIncome || "0"
                }
              />
            )}

            {/* Schedule BP - Business/Profession Income */}
            {activeSectionId === "schedule-bp" && (
              <ItrFourScheduleBP
                onNext={() =>
                  handleSectionComplete("schedule-bp", formData.scheduleBP)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleBP: data }))
                }
                initialData={formData.scheduleBP}
              />
            )}

            {/* Verification - Final Declaration */}
            {activeSectionId === "verification" && (
              <ItrFourVerification
                onNext={() =>
                  handleSectionComplete("verification", formData.verification)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, verification: data }))
                }
                initialData={formData.verification}
              />
            )}

            {/* Placeholder for other sections */}
            {activeSectionId !== "part-a-general" &&
              activeSectionId !== "part-b-gti" &&
              activeSectionId !== "part-c-deductions" &&
              activeSectionId !== "part-d-tax-computations" &&
              activeSectionId !== "schedule-bp" &&
              activeSectionId !== "verification" && (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {activeSection.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    {activeSection.description}
                  </p>
                  <div className="mt-6 rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-blue-900">
                      This section is under development. Click the button below
                      to mark it as complete and proceed.
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleBackToSummary}
                      className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Back to Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSectionComplete(activeSectionId)}
                      className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Mark as Complete
                    </button>
                  </div>
                </div>
              )}
          </section>
        ) : (
          <section id="section-summary" className="space-y-4">
            {/* Section Selection */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                ITR-4 SUGAM Sections
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Complete all sections to file your ITR-4 SUGAM return
              </p>
              <ItrFourEntry
                sections={sections}
                activeSectionId={activeSection?.id || ""}
                onSectionSelect={handleSectionSelect}
              />
            </div>

            {/* Final Submission */}
            {allSectionsCompleted && (
              <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                    <svg
                      className="h-7 w-7 text-white"
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
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      All Sections Completed!
                    </h3>
                    <p className="mt-2 text-sm text-gray-700">
                      Congratulations! You have successfully completed all
                      sections of your ITR-4 SUGAM return. Review your
                      information and submit when ready.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={handleFinalSubmit}
                        className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                      >
                        Export to CSV
                      </button>
                      <button
                        onClick={() => exportITR4ToPDF(formData)}
                        className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                      >
                        Download PDF
                      </button>
                      <button
                        onClick={() => {
                          const firstSection = sections[0];
                          if (firstSection) {
                            handleSectionSelect(firstSection.id);
                          }
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        Review Sections
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ItrFour;
