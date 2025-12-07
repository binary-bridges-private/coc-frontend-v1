import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ITRProgress from "./components/ITR-ProgressBar.tsx";
import ItrEntry from "./components/ITR-entry.tsx";
import PersonalInformation from "./components/personal-info.tsx";
import GrossTotalIncome from "./components/Gross-total-income.tsx";
import TaxDeduction from "./components/Tax-deduction.tsx";
import {
  ITR_ONE_PROGRESS_STEPS,
  ITR_ONE_SUMMARY_SECTIONS,
} from "./itr-1.constants.ts";
import {
  Gender,
  ItrSummarySection,
  StepStatus,
  PropertyType,
} from "./itr-1.types.ts";
import {
  personalInformationSchema,
  PersonalInformationFormData,
  GrossTotalIncomeFormData,
  taxDeductionSchema,
  TaxDeductionFormData,
} from "./itr-1.validation.ts";
import { exportITR1ToCSV, ITR1ExportData } from "./utils/csvExport.ts";
import { exportITR1ToPDF } from "./utils/pdfExport.ts";

const ItrOne: React.FC = () => {
  const STORAGE_KEY = "itr1_formData";

  // Initialize state with data from localStorage if available
  const getInitialData = (key: string, defaultValue: any) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed[key] || defaultValue;
      }
    } catch (e) {
      console.error("Failed to load from storage", e);
    }
    return defaultValue;
  };

  const [sections, setSections] = useState<ItrSummarySection[]>(() =>
    getInitialData(
      "sections",
      ITR_ONE_SUMMARY_SECTIONS.map((section) => ({ ...section }))
    )
  );
  const { activeSection } = useParams();
  const navigate = useNavigate();
  // We can treat "activeSection" param as the source of truth for "activeDetailId".
  // Note: activeSection will be undefined when at /practice/itr/itr-1
  const activeDetailId = activeSection || null;

  // We don't need setActiveDetailId state anymore if we use the URL.
  // const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const [submissionInfo, setSubmissionInfo] = useState<{
    acknowledgementNo: string;
    submittedAt: Date;
  } | null>(null);
  const scrollTop = () => {
    // Scroll the main container instead of window, as the layout has overflow-auto on the div
    setTimeout(() => {
      document.getElementById("app-scroll-container")?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    scrollTop();
  }, [activeDetailId, submissionInfo]);

  const defaultPersonalInfo: Partial<PersonalInformationFormData> = useMemo(
    () => ({
      assessmentYear: "2025-26",
      pan: "",
      aadhar: "",
      aadhaarEnrolmentId: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: Gender.NotSpecified,
      residentialStatus: "",
      email: "",
      mobileNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      bankName: "",
      bankAccountNumber: "",
      bankIFSCCode: "",
      natureOfEmployment: "",
      filingStatus: undefined,
      taxRegime: undefined,
      filedInResponseToNotice: false,
      isRevisedOrDefective: false,
      filingUnderSeventhProviso: false,
      optingOut115BAC: false,
    }),
    []
  );

  const defaultGrossIncomeData: Partial<GrossTotalIncomeFormData> = useMemo(
    () => ({
      salarySection17_1: 0,
      perquisitesSection17_2: 0,
      profitSection17_3: 0,
      houseRentAllowance: 0,
      standardDeduction16: 50000,
      professionalTax: 0,
      propertyType: undefined,
      grossRent: 0,
      localTaxPaid: 0,
      annualValue: 0,
      standardDeduction: 0,
      interestBorrowedCapital: 0,
      arrearsRent: 0,
      totalHousePropertyIncome: 0,
      savingsInterest: 0,
      fdInterest: 0,
      dividendIncome: 0,
      otherIncome: 0,
      agriculturalIncome: 0,
    }),
    []
  );

  const [personalData, setPersonalData] = useState<
    Partial<PersonalInformationFormData>
  >(() => getInitialData("personalData", defaultPersonalInfo));
  const [grossIncomeData, setGrossIncomeData] = useState<
    Partial<GrossTotalIncomeFormData>
  >(() => getInitialData("grossIncomeData", defaultGrossIncomeData));
  const [deductionData, setDeductionData] = useState<
    Partial<TaxDeductionFormData>
  >(() => getInitialData("deductionData", {}));

  const personalFormMethods = useForm({
    resolver: zodResolver(personalInformationSchema) as any,
    mode: "onBlur",
    defaultValues: personalData as any, // Initialized from localStorage via useState
  });

  const grossIncomeFormMethods = useForm({
    mode: "onBlur",
    defaultValues: grossIncomeData as any, // Initialized from localStorage via useState
  });

  const deductionFormMethods = useForm({
    resolver: zodResolver(taxDeductionSchema) as any,
    mode: "onBlur",
    defaultValues: deductionData as any, // Initialized from localStorage via useState
  });

  const { reset: resetPersonal } = personalFormMethods;
  const { reset: resetGrossIncome } = grossIncomeFormMethods;
  const { reset: resetDeduction } = deductionFormMethods;

  // Watch form values for real-time persistence
  const currentPersonalData = personalFormMethods.watch();
  const currentGrossIncomeData = grossIncomeFormMethods.watch();
  const currentDeductionData = deductionFormMethods.watch();

  // Save to localStorage whenever FORM data changes (real-time)
  useEffect(() => {
    // Debounce or just save directly (localStorage is fast enough for this size)
    const dataToSave = {
      personalData: currentPersonalData,
      grossIncomeData: currentGrossIncomeData,
      deductionData: currentDeductionData,
      sections, // Persist the UI state (completed/pending statuses)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [
    currentPersonalData,
    currentGrossIncomeData,
    currentDeductionData,
    sections,
  ]);

  // Sync state with form reset (only when state explicitly changes via submit)
  useEffect(() => {
    resetPersonal(personalData);
  }, [personalData, resetPersonal]);

  useEffect(() => {
    resetGrossIncome(grossIncomeData);
  }, [grossIncomeData, resetGrossIncome]);

  useEffect(() => {
    resetDeduction({ ...grossIncomeData, ...deductionData });
  }, [deductionData, grossIncomeData, resetDeduction]);

  useEffect(() => {
    const toNumber = (val: any) => {
      if (typeof val === "number") return val;
      const parsed = parseFloat(val || "0");
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    // Calculate Gross Salary
    const grossSalaryIncome =
      toNumber(grossIncomeData.salarySection17_1) +
      toNumber(grossIncomeData.perquisitesSection17_2) +
      toNumber(grossIncomeData.profitSection17_3) +
      toNumber(grossIncomeData.retirementBenefitNotified) +
      toNumber(grossIncomeData.retirementBenefitOther);

    // Calculate Net Salary
    const netSalaryIncome =
      grossSalaryIncome -
      toNumber(grossIncomeData.exemptAllowances) -
      toNumber(grossIncomeData.reliefFromTaxation89A) -
      toNumber(grossIncomeData.standardDeduction16) -
      toNumber(grossIncomeData.entertainmentAllowance) -
      toNumber(grossIncomeData.professionalTax);

    // Calculate House Property Income
    const housePropertyIncome =
      toNumber(grossIncomeData.annualValue) -
      toNumber(grossIncomeData.standardDeduction30Percent) -
      toNumber(grossIncomeData.interestBorrowedCapital) +
      toNumber(grossIncomeData.arrearsUnrealisedRent);

    // Calculate Other Sources Income
    const otherSourcesIncome =
      toNumber(grossIncomeData.otherSource1Amount) +
      toNumber(grossIncomeData.otherSource2Amount) +
      toNumber(currentGrossIncomeData.otherSource3Amount) +
      toNumber(currentGrossIncomeData.otherSource4Amount) +
      toNumber(currentGrossIncomeData.retirementBenefitNonNotifiedCountry) +
      toNumber(currentGrossIncomeData.retirementBenefitUSA) +
      toNumber(currentGrossIncomeData.retirementBenefitUK) +
      toNumber(currentGrossIncomeData.retirementBenefitCanada) +
      toNumber(currentGrossIncomeData.dividendQ1) +
      toNumber(currentGrossIncomeData.dividendQ2) +
      toNumber(currentGrossIncomeData.dividendQ3) +
      toNumber(currentGrossIncomeData.dividendQ4) +
      toNumber(currentGrossIncomeData.dividendQ5) -
      toNumber(currentGrossIncomeData.reliefFromTaxation89AOtherSources) -
      toNumber(currentGrossIncomeData.deduction57iia);

    // Calculate Gross Total Income
    const grossTotalIncome =
      netSalaryIncome + housePropertyIncome + otherSourcesIncome;

    // Calculate Total Deductions
    const totalDeductions =
      toNumber(currentDeductionData.section80C) +
      toNumber(currentDeductionData.section80CCC) +
      toNumber(currentDeductionData.section80CCD1) +
      toNumber(currentDeductionData.section80CCD1B) +
      toNumber(currentDeductionData.section80CCD2) +
      toNumber(currentDeductionData.section80D) +
      toNumber(currentDeductionData.section80DD) +
      toNumber(currentDeductionData.section80DDB) +
      toNumber(currentDeductionData.section80E) +
      toNumber(currentDeductionData.section80EE) +
      toNumber(currentDeductionData.section80EEA) +
      toNumber(currentDeductionData.section80EEB) +
      toNumber(currentDeductionData.section80G) +
      toNumber(currentDeductionData.section80GG) +
      toNumber(currentDeductionData.section80GGA) +
      toNumber(currentDeductionData.section80GGC) +
      toNumber(currentDeductionData.section80TTA) +
      toNumber(currentDeductionData.section80TTB) +
      toNumber(currentDeductionData.section80U) +
      toNumber(currentDeductionData.section80CCH) +
      toNumber(currentDeductionData.anyOtherDeductions);

    setSections((prev) =>
      prev.map((section) => {
        if (section.id === "personal") {
          const isComplete = !!(
            currentPersonalData.pan && currentPersonalData.aadhar
          );
          if (isComplete && section.status !== "completed") {
            return { ...section, status: "completed", statusText: "Confirmed" };
          }
        }
        if (section.id === "gross-income") {
          const isComplete = grossTotalIncome > 0;
          return {
            ...section,
            amountValue: Math.max(0, grossTotalIncome).toLocaleString("en-IN"),
            status: isComplete ? "completed" : section.status,
            statusText: isComplete ? "Confirmed" : section.statusText,
          };
        }
        if (section.id === "deductions") {
          // Mark as complete if there are deductions OR if gross income is confirmed (sequential flow implication)
          // But strict check: totalDeductions > 0 OR if the user explicitly visited and saved (which we don't track easily here except via sections persistence)
          // Let's stick to totalDeductions > 0 for auto-confirm, OR if it was ALREADY completed (persistence).
          const isComplete = totalDeductions > 0;
          const currentStatus =
            section.status === "completed"
              ? "completed"
              : isComplete
              ? "completed"
              : section.status;

          return {
            ...section,
            amountValue: Math.max(0, totalDeductions).toLocaleString("en-IN"),
            status: currentStatus,
            statusText:
              currentStatus === "completed" ? "Confirmed" : section.statusText,
          };
        }
        return section;
      })
    );
  }, [currentGrossIncomeData, currentDeductionData, currentPersonalData]);

  const ensureAtLeastOneInProgress = (
    list: ItrSummarySection[]
  ): ItrSummarySection[] => {
    if (list.some((section) => section.status === "in-progress")) {
      return list;
    }
    const nextIndex = list.findIndex((section) => section.status === "pending");
    if (nextIndex === -1) {
      return list;
    }
    return list.map((section, index) =>
      index === nextIndex
        ? { ...section, status: "in-progress" as StepStatus }
        : section
    );
  };

  const activeSectionIndex = useMemo(() => {
    const index = sections.findIndex(
      (section) => section.status === "in-progress"
    );
    return index >= 0 ? index : 0;
  }, [sections]);

  const activeSectionId = sections[activeSectionIndex]?.id ?? sections[0].id;

  const stepStatusMap = useMemo(() => {
    const map: Record<number, StepStatus> = {};
    sections.forEach((section, index) => {
      const stepId = ITR_ONE_PROGRESS_STEPS[index]?.id;
      if (!stepId) return;
      map[stepId] = section.status;
    });
    return map;
  }, [sections]);

  const activeStepId =
    ITR_ONE_PROGRESS_STEPS[
      Math.min(activeSectionIndex, ITR_ONE_PROGRESS_STEPS.length - 1)
    ]?.id ?? 1;

  const handleSectionSelect = (sectionId: string) => {
    const targetIndex = sections.findIndex(
      (section) => section.id === sectionId
    );
    if (targetIndex === -1) return;

    setSubmissionInfo(null);

    setSections((prev) => {
      const updated = prev.map((section, index) => {
        if (index < targetIndex) {
          return { ...section, status: "completed" as StepStatus };
        }
        if (index === targetIndex) {
          return { ...section, status: "in-progress" as StepStatus };
        }
        return { ...section, status: "pending" as StepStatus };
      });
      return ensureAtLeastOneInProgress(updated);
    });

    if (sectionId === "personal") {
      navigate("/practice/itr/itr-1/personal");
      resetPersonal(personalData);
    } else if (sectionId === "gross-income") {
      navigate("/practice/itr/itr-1/gross-income");
      resetGrossIncome(grossIncomeData);
    } else if (sectionId === "deductions") {
      navigate("/practice/itr/itr-1/deductions");
      resetDeduction(deductionData);
    } else {
      navigate("/practice/itr/itr-1");
    }
  };

  const handleBackToSummary = () => {
    resetPersonal(personalData);
    resetGrossIncome(grossIncomeData);
    navigate("/practice/itr/itr-1");
    setSubmissionInfo(null);
    setSections((prev) =>
      ensureAtLeastOneInProgress(prev.map((section) => ({ ...section })))
    );
  };

  const handlePersonalSubmit: SubmitHandler<PersonalInformationFormData> = (
    values
  ) => {
    setPersonalData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "personal") {
          return {
            ...section,
            status: "completed" as StepStatus,
            statusText: "Confirmed",
          };
        }
        return { ...section };
      });
      return ensureAtLeastOneInProgress(updated);
    });
    navigate("/practice/itr/itr-1");
  };

  const handleGrossIncomeSubmit = (values: any) => {
    setGrossIncomeData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "gross-income") {
          return {
            ...section,
            status: "completed" as StepStatus,
            statusText: "Confirmed",
          };
        }
        return { ...section };
      });
      return ensureAtLeastOneInProgress(updated);
    });
    navigate("/practice/itr/itr-1");
  };

  const handleDeductionSubmit = (values: any) => {
    setDeductionData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "deductions") {
          return {
            ...section,
            status: "completed" as StepStatus,
            statusText: "Confirmed",
          };
        }
        return { ...section };
      });
      return ensureAtLeastOneInProgress(updated);
    });
    navigate("/practice/itr/itr-1");
  };

  const allSectionsCompleted = useMemo(
    () => sections.every((section) => section.status === "completed"),
    [sections]
  );

  const generateAcknowledgementNumber = () => {
    const timePart = Date.now().toString();
    const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
    return (timePart + randomPart).slice(-15);
  };

  const handleFinalSubmit = () => {
    const acknowledgementNo = generateAcknowledgementNumber();
    const submittedAt = new Date();
    setSubmissionInfo({ acknowledgementNo, submittedAt });
    // Clear saved data on successful submission
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleDownloadCSV = () => {
    // Calculate derived values
    const toNumber = (val: any) => {
      if (typeof val === "number") return val;
      const parsed = parseFloat(val || "0");
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    // Calculate Gross Salary
    const grossSalaryIncome =
      toNumber(grossIncomeData.salarySection17_1) +
      toNumber(grossIncomeData.perquisitesSection17_2) +
      toNumber(grossIncomeData.profitSection17_3) +
      toNumber(grossIncomeData.retirementBenefitNotified) +
      toNumber(grossIncomeData.retirementBenefitOther);

    // Calculate Net Salary
    const netSalaryIncome =
      grossSalaryIncome -
      toNumber(grossIncomeData.exemptAllowances) -
      toNumber(grossIncomeData.reliefFromTaxation89A) -
      toNumber(grossIncomeData.standardDeduction16) -
      toNumber(grossIncomeData.entertainmentAllowance) -
      toNumber(grossIncomeData.professionalTax);

    // Calculate House Property Income
    const housePropertyIncome =
      toNumber(grossIncomeData.annualValue) -
      toNumber(grossIncomeData.standardDeduction30Percent) -
      toNumber(grossIncomeData.interestBorrowedCapital) +
      toNumber(grossIncomeData.arrearsUnrealisedRent);

    // Calculate Other Sources Income
    const otherSourcesIncome =
      toNumber(grossIncomeData.otherSource1Amount) +
      toNumber(grossIncomeData.otherSource2Amount) +
      toNumber(grossIncomeData.otherSource3Amount) +
      toNumber(grossIncomeData.otherSource4Amount) +
      toNumber(grossIncomeData.retirementBenefitNonNotifiedCountry) +
      toNumber(grossIncomeData.retirementBenefitUSA) +
      toNumber(grossIncomeData.retirementBenefitUK) +
      toNumber(grossIncomeData.retirementBenefitCanada) +
      toNumber(grossIncomeData.dividendQ1) +
      toNumber(grossIncomeData.dividendQ2) +
      toNumber(grossIncomeData.dividendQ3) +
      toNumber(grossIncomeData.dividendQ4) +
      toNumber(grossIncomeData.dividendQ5) -
      toNumber(grossIncomeData.reliefFromTaxation89AOtherSources) -
      toNumber(grossIncomeData.deduction57iia);

    // Calculate Gross Total Income
    const grossTotalIncome =
      netSalaryIncome + housePropertyIncome + otherSourcesIncome;

    // Calculate Total Deductions
    const totalDeductions =
      toNumber(deductionData.section80C) +
      toNumber(deductionData.section80CCC) +
      toNumber(deductionData.section80CCD1) +
      toNumber(deductionData.section80CCD1B) +
      toNumber(deductionData.section80CCD2) +
      toNumber(deductionData.section80D) +
      toNumber(deductionData.section80DD) +
      toNumber(deductionData.section80DDB) +
      toNumber(deductionData.section80E) +
      toNumber(deductionData.section80EE) +
      toNumber(deductionData.section80EEA) +
      toNumber(deductionData.section80EEB) +
      toNumber(deductionData.section80G) +
      toNumber(deductionData.section80GG) +
      toNumber(deductionData.section80GGA) +
      toNumber(deductionData.section80GGC) +
      toNumber(deductionData.section80TTA) +
      toNumber(deductionData.section80TTB) +
      toNumber(deductionData.section80U) +
      toNumber(deductionData.section80CCH) +
      toNumber(deductionData.anyOtherDeductions);

    // Calculate Total Income
    const totalIncome = grossTotalIncome - totalDeductions;

    // Prepare complete export data
    const exportData: ITR1ExportData = {
      // Personal Information
      ...personalData,

      // Gross Income
      ...grossIncomeData,

      // Deductions
      ...deductionData,

      // Calculated values
      grossSalaryIncome,
      netSalaryIncome,
      housePropertyIncome,
      otherSourcesIncome,
      grossTotalIncome,
      totalDeductions,
      totalIncome,
    };

    exportITR1ToCSV(exportData);
  };

  const handleDownloadPDF = () => {
    // Calculate derived values (reused logic)
    const toNumber = (val: any) => {
      if (typeof val === "number") return val;
      const parsed = parseFloat(val || "0");
      return Number.isNaN(parsed) ? 0 : parsed;
    };

    const grossSalaryIncome =
      toNumber(grossIncomeData.salarySection17_1) +
      toNumber(grossIncomeData.perquisitesSection17_2) +
      toNumber(grossIncomeData.profitSection17_3) +
      toNumber(grossIncomeData.retirementBenefitNotified) +
      toNumber(grossIncomeData.retirementBenefitOther);

    const netSalaryIncome =
      grossSalaryIncome -
      toNumber(grossIncomeData.exemptAllowances) -
      toNumber(grossIncomeData.reliefFromTaxation89A) -
      toNumber(grossIncomeData.standardDeduction16) -
      toNumber(grossIncomeData.entertainmentAllowance) -
      toNumber(grossIncomeData.professionalTax);

    const housePropertyIncome =
      toNumber(grossIncomeData.annualValue) -
      toNumber(grossIncomeData.standardDeduction30Percent) -
      toNumber(grossIncomeData.interestBorrowedCapital) +
      toNumber(grossIncomeData.arrearsUnrealisedRent);

    const otherSourcesIncome =
      toNumber(grossIncomeData.otherSource1Amount) +
      toNumber(grossIncomeData.otherSource2Amount) +
      toNumber(grossIncomeData.otherSource3Amount) +
      toNumber(grossIncomeData.otherSource4Amount) +
      toNumber(grossIncomeData.retirementBenefitNonNotifiedCountry) +
      toNumber(grossIncomeData.retirementBenefitUSA) +
      toNumber(grossIncomeData.retirementBenefitUK) +
      toNumber(grossIncomeData.retirementBenefitCanada) +
      toNumber(grossIncomeData.dividendQ1) +
      toNumber(grossIncomeData.dividendQ2) +
      toNumber(grossIncomeData.dividendQ3) +
      toNumber(grossIncomeData.dividendQ4) +
      toNumber(grossIncomeData.dividendQ5) -
      toNumber(grossIncomeData.reliefFromTaxation89AOtherSources) -
      toNumber(grossIncomeData.deduction57iia);

    const grossTotalIncome =
      netSalaryIncome + housePropertyIncome + otherSourcesIncome;

    const totalDeductions =
      toNumber(deductionData.section80C) +
      toNumber(deductionData.section80CCC) +
      toNumber(deductionData.section80CCD1) +
      toNumber(deductionData.section80CCD1B) +
      toNumber(deductionData.section80CCD2) +
      toNumber(deductionData.section80D) +
      toNumber(deductionData.section80DD) +
      toNumber(deductionData.section80DDB) +
      toNumber(deductionData.section80E) +
      toNumber(deductionData.section80EE) +
      toNumber(deductionData.section80EEA) +
      toNumber(deductionData.section80EEB) +
      toNumber(deductionData.section80G) +
      toNumber(deductionData.section80GG) +
      toNumber(deductionData.section80GGA) +
      toNumber(deductionData.section80GGC) +
      toNumber(deductionData.section80TTA) +
      toNumber(deductionData.section80TTB) +
      toNumber(deductionData.section80U) +
      toNumber(deductionData.section80CCH) +
      toNumber(deductionData.anyOtherDeductions);

    const totalIncome = grossTotalIncome - totalDeductions;

    const exportData: ITR1ExportData = {
      ...personalData,
      ...grossIncomeData,
      ...deductionData,
      grossSalaryIncome,
      netSalaryIncome,
      housePropertyIncome,
      otherSourcesIncome,
      grossTotalIncome,
      totalDeductions,
      totalIncome,
    };

    exportITR1ToPDF(exportData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                New ITR Filing
              </p>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                ITR-1
              </h1>
              <p className="text-sm text-gray-600 md:text-base">
                Follow the guided steps below to review every section and submit
                a fresh return with confidence.
              </p>
            </div>
          </div>
        </header>

        <ITRProgress
          steps={ITR_ONE_PROGRESS_STEPS}
          activeStepId={activeStepId}
          stepStatusMap={stepStatusMap}
        />

        {activeDetailId === "personal" ? (
          <PersonalInformation
            form={personalFormMethods as any}
            onSubmit={handlePersonalSubmit}
            onCancel={handleBackToSummary}
          />
        ) : activeDetailId === "gross-income" ? (
          <GrossTotalIncome
            form={grossIncomeFormMethods as any}
            onSubmit={handleGrossIncomeSubmit}
            onCancel={handleBackToSummary}
            taxRegime={personalData.taxRegime}
          />
        ) : activeDetailId === "deductions" ? (
          <TaxDeduction
            form={deductionFormMethods as any}
            onSubmit={handleDeductionSubmit}
            onCancel={handleBackToSummary}
            taxRegime={personalData.taxRegime}
          />
        ) : (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Return Summary
            </h2>
            <span className="text-sm text-gray-600">
              Review each section below and provide your confirmation before
              moving to the next step.
            </span>
            {submissionInfo ? (
              <div className="flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-5 text-sm text-gray-800">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    ✓
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-green-800">
                      Success! Return submitted successfully.
                    </h3>
                    <p>
                      Acknowledgement No:{" "}
                      <span className="font-semibold text-green-900">
                        {submissionInfo.acknowledgementNo}
                      </span>
                    </p>
                    <p>
                      Submission Date:{" "}
                      {submissionInfo.submittedAt.toLocaleString()}
                    </p>
                    <p>
                      Please e-Verify your return within 30 days of filing. You
                      can download the ITR-V/Acknowledgement from Dashboard &gt;
                      Services &gt; View Filed Returns.
                    </p>
                  </div>
                  {/* <button
                    type="button"
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <svg
                      className="h-5 w-5"
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
                    Download CSV
                  </button> */}
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-4" />
                      <path d="M8 18v-2" />
                      <path d="M16 18v-6" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ) : (
              allSectionsCompleted && (
                <div className="flex flex-col gap-4 rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-gray-800">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-blue-900">
                      All sections confirmed.
                    </h3>
                    <p>
                      Submit your return to generate the acknowledgement message
                      shown on the Income Tax e-Filing portal.
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Submit Return
                    </button>
                  </div>
                </div>
              )
            )}
            <ItrEntry
              sections={sections}
              activeSectionId={activeSectionId}
              onSectionSelect={handleSectionSelect}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default ItrOne;
