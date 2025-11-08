import React, { useState, useMemo, useEffect } from "react";
import ItrTwoProgress from "./components/itr-two-progress.tsx";
import ItrTwoEntry from "./components/Itr-two-entry.tsx";
import ItrTwoPersonal from "./components/itr-two-personal.tsx";
import ItrTwoSalary from "./components/itr-two-salary.tsx";
import ItrTwoHousing from "./components/Itr-two-housing.tsx";
import ItrTwoCapitalGain from "./components/Itr-two-capital-gain.tsx";
import ItrTwoSchedule112A from "./components/itr-two-schedule112A.tsx";
import ItrTwo115AD from "./components/Itr-two-115AD.tsx";
import ItrTwoVda from "./components/Itr-two-Vda.tsx";
import ItrTwoOs from "./components/itr-two-os.tsx";
import ItrTwoCyla from "./components/itr-two-cyla.tsx";
import ItrTwoBfla from "./components/Itr-two-bfla.tsx";
import ItrTwoCylaBfla from "./components/itr-two-cyla-bfla.tsx";
import ItrTwoCfl from "./components/itr-two-cfl.tsx";
import ItrTwoScheduleVIA from "./components/itr-two-schedule-via.tsx";
import ItrTwo80G from "./components/itr-two-80g.tsx";
import ItrTwo80GGA from "./components/itr-two-80gga.tsx";
import ItrTwo80GGC from "./components/itr-two-80ggc.tsx";
import ItrTwo80DD from "./components/itr-two-80dd.tsx";
import ItrTwo80U from "./components/itr-two-80u.tsx";
import ItrTwoAMT from "./components/itr-two-amt.tsx";
import ItrTwoAMTC from "./components/itr-two-amtc.tsx";
import ItrTwoSI from "./components/itr-two-si.tsx";
import ItrTwoEI from "./components/itr-two-ei.tsx";
import ItrTwoPTI from "./components/itr-two-pti.tsx";
import ItrTwoFSI from "./components/itr-two-fsi.tsx";
import ItrTwoTR from "./components/itr-two-tr.tsx";
import ItrTwoFA from "./components/itr-two-fa.tsx";
import ItrTwo5A from "./components/itr-two-5a.tsx";
import ItrTwoAL from "./components/itr-two-al.tsx";
import ItrTwoPart3TTI from "./components/itr-two-part3-tti.tsx";
import ItrTwoTaxPayments from "./components/itr-two-tax-payments.tsx";
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
  Schedule112AFormData,
  Schedule115ADFormData,
  ScheduleVDAFormData,
  ScheduleVIAFormData,
  Schedule80GGAFormData,
  Schedule80GGCFormData,
  Schedule80DDFormData,
} from "./itr-two.validation.ts";

// CSV Export Function
const exportToCSV = (allFormData: any, taxPaymentsData: any) => {
  const completeData = { ...allFormData, taxPayments: taxPaymentsData };
  
  // Flatten nested objects into CSV rows
  const flattenObject = (obj: any, prefix = ''): any => {
    let result: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}_${key}` : key;
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          Object.assign(result, flattenObject(value, newKey));
        } else if (Array.isArray(value)) {
          result[newKey] = JSON.stringify(value);
        } else {
          result[newKey] = value || '';
        }
      }
    }
    return result;
  };
  
  const flatData = flattenObject(completeData);
  
  // Convert to CSV
  const headers = Object.keys(flatData);
  const values = Object.values(flatData);
  
  const csvContent = [
    headers.join(','),
    values.map((val: any) => {
      const stringVal = String(val).replace(/"/g, '""');
      return `"${stringVal}"`;
    }).join(',')
  ].join('\n');
  
  // Download CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `ITR2_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  console.log('ITR-2 data exported to CSV successfully!');
};

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
    schedule112A?: Schedule112AFormData;
    schedule115AD?: Schedule115ADFormData;
    scheduleVDA?: ScheduleVDAFormData;
    scheduleOS?: any;
    scheduleCYLA?: any;
    scheduleBFLA?: any;
    scheduleCFL?: any;
    scheduleVIA?: ScheduleVIAFormData;
    schedule80G?: any;
    schedule80GGA?: Schedule80GGAFormData;
    schedule80GGC?: Schedule80GGCFormData;
    schedule80DD?: Schedule80DDFormData;
    schedule80U?: any;
    scheduleAMT?: any;
    scheduleAMTC?: any;
    scheduleSI?: any;
    scheduleEI?: any;
    schedulePTI?: any;
    scheduleFSI?: any;
    scheduleTR?: any;
    scheduleFA?: any;
    schedule5A?: any;
    scheduleAL?: any;
    part3TTI?: any;
    taxPayments?: any;
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

  // Auto-scroll to the currently active (in-progress) section whenever it changes
  useEffect(() => {
    // Determine the target element id
    const targetId = activeSectionId ? `section-${activeSectionId}` : 'section-summary';
    const scroll = () => {
      const el = document.getElementById(targetId);
      if (el && 'scrollIntoView' in el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    // Allow DOM to render before scrolling
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
    if (sectionId === "schedule-112a" && data) {
      setFormData((prev) => ({ ...prev, schedule112A: data }));
    }
    if (sectionId === "schedule-115ad" && data) {
      setFormData((prev) => ({ ...prev, schedule115AD: data }));
    }
    if (sectionId === "vda" && data) {
      setFormData((prev) => ({ ...prev, scheduleVDA: data }));
    }
    if (sectionId === "os" && data) {
      setFormData((prev) => ({ ...prev, scheduleOS: data }));
    }
    if (sectionId === "cyla" && data) {
      setFormData((prev) => ({ ...prev, scheduleCYLA: data }));
    }
    if (sectionId === "bfla" && data) {
      setFormData((prev) => ({ ...prev, scheduleBFLA: data }));
    }
    if (sectionId === "cyla-bfla" && data) {
      setFormData((prev) => ({ 
        ...prev, 
        scheduleCYLA: data.cyla,
        scheduleBFLA: data.bfla 
      }));
    }
    if (sectionId === "cfl" && data) {
      setFormData((prev) => ({ ...prev, scheduleCFL: data }));
    }
    if (sectionId === "80c" && data) {
      setFormData((prev) => ({ ...prev, scheduleVIA: data }));
    }
    if (sectionId === "80g" && data) {
      setFormData((prev) => ({ ...prev, schedule80G: data }));
    }
    if (sectionId === "80gga" && data) {
      setFormData((prev) => ({ ...prev, schedule80GGA: data }));
    }
    if (sectionId === "80ggc" && data) {
      setFormData((prev) => ({ ...prev, schedule80GGC: data }));
    }
    if (sectionId === "80dd" && data) {
      setFormData((prev) => ({ ...prev, schedule80DD: data }));
    }
    if (sectionId === "80u" && data) {
      setFormData((prev) => ({ ...prev, schedule80U: data }));
    }
    if (sectionId === "amt" && data) {
      setFormData((prev) => ({ ...prev, scheduleAMT: data }));
    }
    if (sectionId === "amtc" && data) {
      setFormData((prev) => ({ ...prev, scheduleAMTC: data }));
    }
    if (sectionId === "si" && data) {
      setFormData((prev) => ({ ...prev, scheduleSI: data }));
    }
    if (sectionId === "ei" && data) {
      setFormData((prev) => ({ ...prev, scheduleEI: data }));
    }
    if (sectionId === "pti" && data) {
      setFormData((prev) => ({ ...prev, schedulePTI: data }));
    }
    if (sectionId === "fsi" && data) {
      setFormData((prev) => ({ ...prev, scheduleFSI: data }));
    }
    if (sectionId === "tr" && data) {
      setFormData((prev) => ({ ...prev, scheduleTR: data }));
    }
    if (sectionId === "fa" && data) {
      setFormData((prev) => ({ ...prev, scheduleFA: data }));
    }
    if (sectionId === "5a" && data) {
      setFormData((prev) => ({ ...prev, schedule5A: data }));
    }
    if (sectionId === "al" && data) {
      setFormData((prev) => ({ ...prev, scheduleAL: data }));
    }
    if (sectionId === "part3-tti" && data) {
      setFormData((prev) => ({ ...prev, part3TTI: data }));
    }
    if (sectionId === "tax-payments" && data) {
      setFormData((prev) => ({ ...prev, taxPayments: data }));
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

  const handleFinalSubmit = () => {
    exportToCSV(formData, formData.taxPayments);
  };

  const allSectionsCompleted = useMemo(() => {
    return sections.every((s) => s.status === "completed");
  }, [sections]);

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
          <section id={`section-${activeSectionId}`} className="space-y-4">
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

            {activeSectionId === "schedule-112a" && (
              <ItrTwoSchedule112A
                onSubmit={(data) => handleSectionComplete("schedule-112a", data)}
                onCancel={handleBackToSummary}
                initialData={formData.schedule112A}
              />
            )}

            {activeSectionId === "schedule-115ad" && (
              <ItrTwo115AD
                onSubmit={(data) => handleSectionComplete("schedule-115ad", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedule115AD}
              />
            )}

            {activeSectionId === "vda" && (
              <ItrTwoVda
                onSubmit={(data) => handleSectionComplete("vda", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleVDA}
              />
            )}

            {activeSectionId === "os" && (
              <ItrTwoOs
                onSubmit={(data) => handleSectionComplete("os", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleOS}
              />
            )}

            {activeSectionId === "cyla" && (
              <ItrTwoCyla
                onSubmit={(data) => handleSectionComplete("cyla", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleCYLA}
              />
            )}

            {activeSectionId === "bfla" && (
              <ItrTwoBfla
                onSubmit={(data) => handleSectionComplete("bfla", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleBFLA}
              />
            )}

            {activeSectionId === "cyla-bfla" && (
              <ItrTwoCylaBfla
                onSubmit={(data) => handleSectionComplete("cyla-bfla", data)}
                onBack={handleBackToSummary}
                initialData={{
                  cyla: formData.scheduleCYLA,
                  bfla: formData.scheduleBFLA
                }}
              />
            )}

            {activeSectionId === "cfl" && (
              <ItrTwoCfl
                onSubmit={(data) => handleSectionComplete("cfl", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleCFL}
              />
            )}

            {activeSectionId === "80c" && (
              <ItrTwoScheduleVIA
                onSave={(data) => handleSectionComplete("80c", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleVIA}
              />
            )}

            {activeSectionId === "80g" && (
              <ItrTwo80G
                onSave={(data) => handleSectionComplete("80g", data)}
                initialData={formData.schedule80G}
              />
            )}

            {activeSectionId === "80gga" && (
              <ItrTwo80GGA
                onSave={(data) => handleSectionComplete("80gga", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedule80GGA}
              />
            )}

            {activeSectionId === "80ggc" && (
              <ItrTwo80GGC
                onSave={(data) => handleSectionComplete("80ggc", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedule80GGC}
              />
            )}

            {activeSectionId === "80dd" && (
              <ItrTwo80DD
                onSave={(data) => handleSectionComplete("80dd", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedule80DD}
              />
            )}

            {activeSectionId === "80u" && (
              <ItrTwo80U
                onSave={(data) => handleSectionComplete("80u", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedule80U}
              />
            )}

            {activeSectionId === "amt" && (
              <ItrTwoAMT
                onSave={(data) => handleSectionComplete("amt", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleAMT}
              />
            )}

            {activeSectionId === "amtc" && (
              <ItrTwoAMTC
                onSave={(data) => handleSectionComplete("amtc", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleAMTC}
              />
            )}

            {activeSectionId === "si" && (
              <ItrTwoSI
                onSave={(data) => handleSectionComplete("si", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleSI}
              />
            )}

            {activeSectionId === "ei" && (
              <ItrTwoEI
                onSave={(data) => handleSectionComplete("ei", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleEI}
              />
            )}

            {activeSectionId === "pti" && (
              <ItrTwoPTI
                onSave={(data) => handleSectionComplete("pti", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedulePTI}
              />
            )}

            {activeSectionId === "fsi" && (
              <ItrTwoFSI
                onSave={(data) => handleSectionComplete("fsi", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleFSI}
              />
            )}

            {activeSectionId === "tr" && (
              <ItrTwoTR
                onSave={(data) => handleSectionComplete("tr", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleTR}
              />
            )}

            {activeSectionId === "fa" && (
              <ItrTwoFA
                onSave={(data) => handleSectionComplete("fa", data)}
                onBack={handleBackToSummary}
                initialData={formData.scheduleFA}
              />
            )}

            {activeSectionId === "5a" && (
              <ItrTwo5A
                onSave={(data) => handleSectionComplete("5a", data)}
                onBack={handleBackToSummary}
                initialData={formData.schedule5A}
              />
            )}

            {activeSectionId === "al" && (
              <ItrTwoAL
                onSave={(data) => handleSectionComplete("al", data)}
                initialData={formData.scheduleAL}
              />
            )}

            {activeSectionId === "part3-tti" && (
              <ItrTwoPart3TTI
                onSave={(data) => handleSectionComplete("part3-tti", data)}
                onBack={handleBackToSummary}
                initialData={formData.part3TTI}
              />
            )}

            {activeSectionId === "tax-payments" && (
              <ItrTwoTaxPayments
                onSave={(data) => handleSectionComplete("tax-payments", data)}
                onBack={handleBackToSummary}
                initialData={formData.taxPayments}
              />
            )}

            {activeSectionId !== "part-a-general" &&
              activeSectionId !== "schedule-s" &&
              activeSectionId !== "house-property" &&
              activeSectionId !== "cg" &&
              activeSectionId !== "schedule-112a" &&
              activeSectionId !== "schedule-115ad" &&
              activeSectionId !== "vda" &&
              activeSectionId !== "os" &&
              activeSectionId !== "cyla" &&
              activeSectionId !== "bfla" &&
              activeSectionId !== "cyla-bfla" &&
              activeSectionId !== "cfl" &&
              activeSectionId !== "80c" &&
              activeSectionId !== "80g" &&
              activeSectionId !== "80gga" &&
              activeSectionId !== "80ggc" &&
              activeSectionId !== "80dd" &&
              activeSectionId !== "80u" &&
              activeSectionId !== "amt" &&
              activeSectionId !== "amtc" &&
              activeSectionId !== "si" &&
              activeSectionId !== "ei" &&
              activeSectionId !== "pti" &&
              activeSectionId !== "fsi" &&
              activeSectionId !== "tr" &&
              activeSectionId !== "fa" &&
              activeSectionId !== "5a" &&
              activeSectionId !== "al" &&
              activeSectionId !== "part3-tti" &&
              activeSectionId !== "tax-payments" && (
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
          <section id="section-summary" className="space-y-4">
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

            {allSectionsCompleted && (
              <div className="rounded-xl border-2 border-green-500 bg-gradient-to-br from-green-50 to-green-100 p-8 shadow-lg">
                <div className="mx-auto max-w-2xl text-center space-y-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 shadow-lg">
                    <svg
                      className="h-10 w-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      All Sections Completed!
                    </h3>
                    <p className="text-base text-gray-700">
                      Congratulations! You have successfully filled all sections of ITR-2 form.
                    </p>
                    <p className="text-sm text-gray-600">
                      Click the button below to download your complete ITR-2 data as a CSV file.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="inline-flex items-center gap-3 rounded-lg bg-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl hover:scale-105"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Submit & Download ITR-2 Form
                  </button>

                  <p className="text-xs text-gray-500 pt-2">
                    Your data will be downloaded as: ITR2_{new Date().toISOString().split('T')[0]}.csv
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default ItrTwo;
