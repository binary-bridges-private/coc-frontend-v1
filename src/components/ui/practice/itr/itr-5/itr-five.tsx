import React, { useState, useMemo, useEffect } from "react";
import ItrFiveProgress from "./components/itr-five-progress";
import ItrFiveEntry, {
  ItrFiveSection,
  SectionStatus,
} from "./components/itr-five-entry";
import ItrFivePersonal from "./components/itr-five-personal";
import ItrFiveScheduleI from "./components/itr-five-schedule-i";
import ItrFiveScheduleIA from "./components/itr-five-schedule-ia";
import ItrFiveScheduleD from "./components/itr-five-schedule-d";
import ItrFiveScheduleDA from "./components/itr-five-schedule-da";
import ItrFiveScheduleDB from "./components/itr-five-schedule-db";
import ItrFiveScheduleBS from "./components/itr-five-schedule-bs";
import ItrFiveScheduleR from "./components/itr-five-schedule-r";
import ItrFiveScheduleLA from "./components/itr-five-schedule-la";
import ItrFiveScheduleET from "./components/itr-five-schedule-et";
import ItrFiveScheduleVC from "./components/itr-five-schedule-vc";
import ItrFiveScheduleAI from "./components/itr-five-schedule-ai";
import ItrFiveScheduleH from "./components/itr-five-schedule-h";
import ItrFiveScheduleHE1 from "./components/itr-five-schedule-he1";
import ItrFiveScheduleHE3 from "./components/itr-five-schedule-he3";
import ItrFiveScheduleHE4 from "./components/itr-five-schedule-he4";
import ItrFiveScheduleHP from "./components/itr-five-schedule-hp";

// ITR-5 sections based on the form structure provided
const ITR_FIVE_SECTIONS: ItrFiveSection[] = [
  {
    id: "part-a-gen",
    title: "Part A - General Information (Personal)",
    description:
      "Personal details, name, PAN, address, contact information, project/institution details, first return, audit information, and members",
    status: "not-started",
  },
  {
    id: "schedule-i",
    title: "Schedule I - Accumulated/Set Apart Funds",
    description:
      "Details of amounts accumulated or set apart within the meaning of section 11(2) or in terms of third proviso to section 10(23C)/10(21)/10(21)",
    status: "not-started",
  },
  {
    id: "schedule-ia",
    title: "Schedule IA - Accumulated Income Taxed in Earlier Years",
    description:
      "Details of accumulated income taxed in earlier assessment years as per section 11(3) (Figures in Rs.)",
    status: "not-started",
  },
  {
    id: "schedule-d",
    title: "Schedule D - Deemed Application of Income",
    description:
      "Details of deemed application of income under clause (2) of Explanation 1 to sub-section (1) of section 11",
    status: "not-started",
  },
  {
    id: "schedule-da",
    title: "Schedule DA - Accumulated Income Taxed in Earlier Years (Per Section 11(1B))",
    description:
      "Details of accumulated income taxed in earlier assessment years as per section 11(1B) (Figures in Rs.)",
    status: "not-started",
  },
  {
    id: "schedule-db",
    title: "Schedule DB - Funds and Investments",
    description:
      "Statement showing the funds and investments as on the last day of the previous year - Details of corpus, loans, investments, properties, and voluntary contributions",
    status: "not-started",
  },
  {
    id: "schedule-bs",
    title: "Part A-BS - Consolidated Balance Sheet",
    description:
      "Consolidated Balance Sheet as on 31st Day of March, 2025 - Sources and application of funds",
    status: "not-started",
  },
  {
    id: "schedule-r",
    title: "Schedule R - Reconciliation of Corpus",
    description:
      "Reconciliation of Corpus of Schedule J and Balance sheet with reasons for differences",
    status: "not-started",
  },
  {
    id: "schedule-la",
    title: "Schedule LA - Political Party",
    description:
      "Details of Political Party Registration, Audit, and Contributions",
    status: "not-started",
  },
  {
    id: "schedule-et",
    title: "Schedule ET - Electoral Trust",
    description:
      "Details of Electoral Trust Accounts and Compliance with Distributions",
    status: "not-started",
  },
  {
    id: "schedule-vc",
    title: "Schedule VC - Voluntary Contributions",
    description:
      "Details of Domestic and Foreign Voluntary Contributions Received",
    status: "not-started",
  },
  {
    id: "schedule-ai",
    title: "Schedule AI - Aggregate of Income",
    description:
      "Aggregate of income derived during the previous year excluding Voluntary contributions",
    status: "not-started",
  },
  {
    id: "schedule-h",
    title: "Schedule H - Application towards Stated Objects",
    description:
      "Amount applied to stated objects of the trust/institution during previous year from all sources",
    status: "not-started",
  },
  {
    id: "schedule-he1",
    title: "Schedule HE-1 - Income & Expenditure Statement",
    description:
      "For assessees claiming exemption u/s 10(21), 10(22)(4), 10(23B), 10(23D)",
    status: "not-started",
  },
  {
    id: "schedule-he3",
    title: "Schedule HE-3 - Income & Expenditure Statement",
    description:
      "For assessees with institutions/universities not exceeding fifty per cent of total receipts",
    status: "not-started",
  },
  {
    id: "schedule-he4",
    title: "Schedule HE-4 - Income & Expenditure Statement",
    description:
      "For assessees u/s 10(23C)(iiiad), 10(23C)(iv), 10(23C)(v) with no fifty per cent restriction",
    status: "not-started",
  },
  {
    id: "schedule-hp",
    title: "Schedule HP - Income from House Property",
    description:
      "Details of Income from House Property (Self-Occupied, Let out, Deemed let out)",
    status: "not-started",
  },
];

const calculateCompletionPercentage = (sections: ItrFiveSection[]): number => {
  const completedSections = sections.filter(
    (s) => s.status === "completed"
  ).length;
  return Math.round((completedSections / sections.length) * 100);
};

interface ItrFiveFormData {
  partAGen?: any;
  scheduleI?: any;
  scheduleIA?: any;
  scheduleD?: any;
  scheduleDA?: any;
  scheduleDB?: any;
  scheduleBS?: any;
  scheduleR?: any;
  scheduleLA?: any;
  scheduleET?: any;
  scheduleVC?: any;
  scheduleAI?: any;
  scheduleH?: any;
  scheduleHE1?: any;
  scheduleHE3?: any;
  scheduleHE4?: any;
  scheduleHP?: any;
  partBIncome?: any;
  partCCapitalGains?: any;
  partDIncome?: any;
  partEDeductions?: any;
  partFTaxComputation?: any;
  partGVerification?: any;
}

const ItrFive: React.FC = () => {
  const [sections, setSections] = useState<ItrFiveSection[]>(ITR_FIVE_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ItrFiveFormData>({});

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

  useEffect(() => {
    if (activeSectionId) {
      const element = document.getElementById(`section-${activeSectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeSectionId]);

  const handleSectionSelect = (sectionId: string) => {
    const targetIndex = sections.findIndex((s) => s.id === sectionId);
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

  const handleBackToSummary = () => {
    setActiveSectionId(null);
  };

  const handleSectionComplete = (sectionId: string, data?: any) => {
    if (sectionId === "part-a-gen" && data) {
      setFormData((prev) => ({ ...prev, partAGen: data }));
    }
    if (sectionId === "schedule-i" && data) {
      setFormData((prev) => ({ ...prev, scheduleI: data }));
    }
    if (sectionId === "schedule-ia" && data) {
      setFormData((prev) => ({ ...prev, scheduleIA: data }));
    }
    if (sectionId === "part-b-income" && data) {
      setFormData((prev) => ({ ...prev, partBIncome: data }));
    }
    if (sectionId === "part-c-capital-gains" && data) {
      setFormData((prev) => ({ ...prev, partCCapitalGains: data }));
    }
    if (sectionId === "part-d-income-other" && data) {
      setFormData((prev) => ({ ...prev, partDIncome: data }));
    }
    if (sectionId === "part-e-deductions" && data) {
      setFormData((prev) => ({ ...prev, partEDeductions: data }));
    }
    if (sectionId === "part-f-tax-computation" && data) {
      setFormData((prev) => ({ ...prev, partFTaxComputation: data }));
    }
    if (sectionId === "part-g-verification" && data) {
      setFormData((prev) => ({ ...prev, partGVerification: data }));
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

  const exportToJSON = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ITR5_${new Date().toISOString().split("T")[0]}.json`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("ITR-5 data exported to JSON successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
            New ITR Filing
          </p>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            ITR-5 (For Association of Persons and Body of Individuals)
          </h1>
          <p className="text-sm text-gray-600">
            Assessment Year 2025-26 | Complete all sections to file your income
            tax return
          </p>
        </header>

        {/* Main Content */}
        {activeSectionId ? (
          <section id={`section-${activeSectionId}`} className="space-y-4">
            {/* Render Part A - General Information */}
            {activeSectionId === "part-a-gen" && (
              <ItrFivePersonal
                initialData={formData.partAGen}
                onSave={(data) => handleSectionComplete("part-a-gen", data)}
                onNext={() => handleSectionComplete("part-a-gen", formData.partAGen)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule I */}
            {activeSectionId === "schedule-i" && (
              <ItrFiveScheduleI
                initialData={formData.scheduleI}
                onSave={(data) => handleSectionComplete("schedule-i", data)}
                onNext={() => handleSectionComplete("schedule-i", formData.scheduleI)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule IA */}
            {activeSectionId === "schedule-ia" && (
              <ItrFiveScheduleIA
                initialData={formData.scheduleIA}
                onSave={(data) => handleSectionComplete("schedule-ia", data)}
                onNext={() => handleSectionComplete("schedule-ia", formData.scheduleIA)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule D */}
            {activeSectionId === "schedule-d" && (
              <ItrFiveScheduleD
                initialData={formData.scheduleD}
                onSave={(data) => handleSectionComplete("schedule-d", data)}
                onNext={() => handleSectionComplete("schedule-d", formData.scheduleD)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule DA */}
            {activeSectionId === "schedule-da" && (
              <ItrFiveScheduleDA
                initialData={formData.scheduleDA}
                onSave={(data) => handleSectionComplete("schedule-da", data)}
                onNext={() => handleSectionComplete("schedule-da", formData.scheduleDA)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule DB */}
            {activeSectionId === "schedule-db" && (
              <ItrFiveScheduleDB
                initialData={formData.scheduleDB}
                onSave={(data) => handleSectionComplete("schedule-db", data)}
                onNext={() => handleSectionComplete("schedule-db", formData.scheduleDB)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule BS */}
            {activeSectionId === "schedule-bs" && (
              <ItrFiveScheduleBS
                initialData={formData.scheduleBS}
                onSave={(data) => handleSectionComplete("schedule-bs", data)}
                onNext={() => handleSectionComplete("schedule-bs", formData.scheduleBS)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule R */}
            {activeSectionId === "schedule-r" && (
              <ItrFiveScheduleR
                initialData={formData.scheduleR}
                onSave={(data) => handleSectionComplete("schedule-r", data)}
                onNext={() => handleSectionComplete("schedule-r", formData.scheduleR)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule LA */}
            {activeSectionId === "schedule-la" && (
              <ItrFiveScheduleLA
                initialData={formData.scheduleLA}
                onSave={(data) => handleSectionComplete("schedule-la", data)}
                onNext={() => handleSectionComplete("schedule-la", formData.scheduleLA)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule ET */}
            {activeSectionId === "schedule-et" && (
              <ItrFiveScheduleET
                initialData={formData.scheduleET}
                onSave={(data) => handleSectionComplete("schedule-et", data)}
                onNext={() => handleSectionComplete("schedule-et", formData.scheduleET)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule VC */}
            {activeSectionId === "schedule-vc" && (
              <ItrFiveScheduleVC
                initialData={formData.scheduleVC}
                onSave={(data) => handleSectionComplete("schedule-vc", data)}
                onNext={() => handleSectionComplete("schedule-vc", formData.scheduleVC)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule AI */}
            {activeSectionId === "schedule-ai" && (
              <ItrFiveScheduleAI
                initialData={formData.scheduleAI}
                onSave={(data) => handleSectionComplete("schedule-ai", data)}
                onNext={() => handleSectionComplete("schedule-ai", formData.scheduleAI)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule H */}
            {activeSectionId === "schedule-h" && (
              <ItrFiveScheduleH
                initialData={formData.scheduleH}
                onSave={(data) => handleSectionComplete("schedule-h", data)}
                onNext={() => handleSectionComplete("schedule-h", formData.scheduleH)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule HE-1 */}
            {activeSectionId === "schedule-he1" && (
              <ItrFiveScheduleHE1
                initialData={formData.scheduleHE1}
                onSave={(data) => handleSectionComplete("schedule-he1", data)}
                onNext={() => handleSectionComplete("schedule-he1", formData.scheduleHE1)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule HE-3 */}
            {activeSectionId === "schedule-he3" && (
              <ItrFiveScheduleHE3
                initialData={formData.scheduleHE3}
                onSave={(data) => handleSectionComplete("schedule-he3", data)}
                onNext={() => handleSectionComplete("schedule-he3", formData.scheduleHE3)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule HE-4 */}
            {activeSectionId === "schedule-he4" && (
              <ItrFiveScheduleHE4
                initialData={formData.scheduleHE4}
                onSave={(data) => handleSectionComplete("schedule-he4", data)}
                onNext={() => handleSectionComplete("schedule-he4", formData.scheduleHE4)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Render Schedule HP */}
            {activeSectionId === "schedule-hp" && (
              <ItrFiveScheduleHP
                initialData={formData.scheduleHP}
                onSave={(data) => handleSectionComplete("schedule-hp", data)}
                onNext={() => handleSectionComplete("schedule-hp", formData.scheduleHP)}
                onBack={handleBackToSummary}
              />
            )}

            {/* Placeholder for other sections */}
            {activeSectionId && 
             !["part-a-gen", "schedule-i", "schedule-ia", "schedule-d", "schedule-da", "schedule-db", "schedule-bs", "schedule-r", "schedule-la", "schedule-et", "schedule-vc", "schedule-ai", "schedule-h", "schedule-he1", "schedule-he3", "schedule-he4", "schedule-hp"].includes(activeSectionId) && (
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeSection?.title}
                  </h2>
                  <button
                    onClick={handleBackToSummary}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 transition"
                  >
                    ← Back to Summary
                  </button>
                </div>
                <p className="text-gray-600">{activeSection?.description}</p>
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-gray-600 italic">
                    🚧 {activeSection?.title} component will be added soon
                  </p>
                </div>
              </div>
            )}
          </section>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {/* Progress Sidebar */}
            <div className="md:col-span-1">
              <ItrFiveProgress
                sections={sections}
                currentSectionTitle={currentSection}
              />

              {/* Export Button */}
              <button
                onClick={exportToJSON}
                className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 transition"
              >
                📥 Export to JSON
              </button>
            </div>

            {/* Sections List */}
            <div className="md:col-span-2">
              <ItrFiveEntry
                sections={sections}
                activeSectionId={activeSectionId}
                onSectionSelect={handleSectionSelect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItrFive;
