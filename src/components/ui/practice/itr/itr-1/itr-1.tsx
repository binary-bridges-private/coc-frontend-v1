import React, { useEffect, useMemo, useState } from "react";
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
import { Gender, ItrSummarySection, StepStatus } from "./itr-1.types.ts";
import { 
  personalInformationSchema, 
  PersonalInformationFormData,
  GrossTotalIncomeFormData,
  taxDeductionSchema,
  TaxDeductionFormData
} from "./itr-1.validation.ts";

const ItrOne: React.FC = () => {
  const [sections, setSections] = useState<ItrSummarySection[]>(() =>
    ITR_ONE_SUMMARY_SECTIONS.map((section) => ({ ...section }))
  );
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const [submissionInfo, setSubmissionInfo] = useState<{
    acknowledgementNo: string;
    submittedAt: Date;
  } | null>(null);
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

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
      propertyType: "",
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

  const [personalData, setPersonalData] = useState<Partial<PersonalInformationFormData>>(defaultPersonalInfo);
  const [grossIncomeData, setGrossIncomeData] = useState<Partial<GrossTotalIncomeFormData>>(defaultGrossIncomeData);
  const [deductionData, setDeductionData] = useState<Partial<TaxDeductionFormData>>({});

  const personalFormMethods = useForm<PersonalInformationFormData>({
    resolver: zodResolver(personalInformationSchema),
    mode: "onBlur",
    defaultValues: personalData,
  });

  const grossIncomeFormMethods = useForm<any>({
    mode: "onBlur",
    defaultValues: grossIncomeData,
  });

  const deductionFormMethods = useForm<any>({
    resolver: zodResolver(taxDeductionSchema),
    mode: "onBlur",
    defaultValues: deductionData,
  });

  const { reset: resetPersonal } = personalFormMethods;
  const { reset: resetGrossIncome } = grossIncomeFormMethods;
  const { reset: resetDeduction } = deductionFormMethods;

  useEffect(() => {
    resetPersonal(personalData);
  }, [personalData, resetPersonal]);

  useEffect(() => {
    resetGrossIncome(grossIncomeData);
  }, [grossIncomeData, resetGrossIncome]);

  useEffect(() => {
    resetDeduction(deductionData);
  }, [deductionData, resetDeduction]);

  const ensureAtLeastOneInProgress = (list: ItrSummarySection[]): ItrSummarySection[] => {
    if (list.some((section) => section.status === "in-progress")) {
      return list;
    }
    const nextIndex = list.findIndex((section) => section.status === "pending");
    if (nextIndex === -1) {
      return list;
    }
    return list.map((section, index) =>
      index === nextIndex ? { ...section, status: "in-progress" as StepStatus } : section
    );
  };

  const activeSectionIndex = useMemo(() => {
    const index = sections.findIndex((section) => section.status === "in-progress");
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

  const activeStepId = ITR_ONE_PROGRESS_STEPS[Math.min(activeSectionIndex, ITR_ONE_PROGRESS_STEPS.length - 1)]?.id ?? 1;

  const handleSectionSelect = (sectionId: string) => {
    const targetIndex = sections.findIndex((section) => section.id === sectionId);
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
      setActiveDetailId("personal");
      resetPersonal(personalData);
    } else if (sectionId === "gross-income") {
      setActiveDetailId("gross-income");
      resetGrossIncome(grossIncomeData);
    } else if (sectionId === "deductions") {
      setActiveDetailId("deductions");
      resetDeduction(deductionData);
    } else {
      setActiveDetailId(null);
    }
  };

  const handleBackToSummary = () => {
    resetPersonal(personalData);
    resetGrossIncome(grossIncomeData);
    setActiveDetailId(null);
    setSubmissionInfo(null);
    setSections((prev) =>
      ensureAtLeastOneInProgress(prev.map((section) => ({ ...section })))
    );
  };

  const handlePersonalSubmit: SubmitHandler<PersonalInformationFormData> = (values) => {
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
    setActiveDetailId(null);
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
    setActiveDetailId(null);
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
    setActiveDetailId(null);
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
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:py-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">New ITR Filing</p>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">ITR-1</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Follow the guided steps below to review every section and submit a fresh return with confidence.
          </p>
        </header>

        <ITRProgress steps={ITR_ONE_PROGRESS_STEPS} activeStepId={activeStepId} stepStatusMap={stepStatusMap} />

        {activeDetailId === "personal" ? (
          <PersonalInformation form={personalFormMethods} onSubmit={handlePersonalSubmit} onCancel={handleBackToSummary} />
        ) : activeDetailId === "gross-income" ? (
          <GrossTotalIncome form={grossIncomeFormMethods} onSubmit={handleGrossIncomeSubmit} onCancel={handleBackToSummary} />
        ) : activeDetailId === "deductions" ? (
          <TaxDeduction form={deductionFormMethods} onSubmit={handleDeductionSubmit} onCancel={handleBackToSummary} />
        ) : (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Return Summary</h2>
            <span className="text-sm text-gray-600">
              Review each section below and provide your confirmation before moving to the next step.
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
                      Acknowledgement No: <span className="font-semibold text-green-900">{submissionInfo.acknowledgementNo}</span>
                    </p>
                    <p>
                      Submission Date: {submissionInfo.submittedAt.toLocaleString()}
                    </p>
                    <p>
                      Please e-Verify your return within 30 days of filing. You can download the ITR-V/Acknowledgement from Dashboard &gt; Services &gt; View Filed Returns.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              allSectionsCompleted && (
                <div className="flex flex-col gap-4 rounded-lg border border-blue-200 bg-blue-50 p-5 text-sm text-gray-800">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-blue-900">All sections confirmed.</h3>
                    <p>Submit your return to generate the acknowledgement message shown on the Income Tax e-Filing portal.</p>
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
            <ItrEntry sections={sections} activeSectionId={activeSectionId} onSectionSelect={handleSectionSelect} />
          </section>
        )}
      </div>
    </div>
  );
};

export default ItrOne;