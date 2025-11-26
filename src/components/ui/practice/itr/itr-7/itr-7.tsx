import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PersonalInformation from "./components/Itr7-personal-information.tsx";
import ManufacturingAccount from "./components/Itr7-manufacturing-account.tsx";
import TradingAccountComponent from "./components/Itr7-trading-account.tsx";
import BalanceSheet from "./components/Itr7-balance-sheet.tsx";
import TradingStatement from "./components/Itr7-trading-statement.tsx";
import ProfitLossAccount from "./components/Itr7-profit-loss.tsx";
import ScheduleBP from "./components/Itr7-schedule-bp.tsx";
import ScheduleDPM from "./components/Itr7-schedule-dpm.tsx";
import ScheduleDOA from "./components/Itr7-schedule-doa.tsx";
import ScheduleDEP from "./components/Itr7-schedule-dep.tsx";
import ScheduleDCG from "./components/Itr7-schedule-dcg.tsx";
import ScheduleESR from "./components/Itr7-schedule-esr.tsx";
import ScheduleCG from "./components/Itr7-schedule-cg.tsx";
import ScheduleITA from "./components/Itr7-schedule-ita.tsx";
import ScheduleVDA from "./components/Itr7-schedule-vda.tsx";
import IncomeSummary from "./components/Itr7-income-summary.tsx";
import ScheduleOS from "./components/Itr7-schedule-os.tsx";
import ScheduleCVLA from "./components/Itr7-schedule-cvla.tsx";
import ScheduleBF1A from "./components/Itr7-schedule-bf1a.tsx";
import ScheduleCFL from "./components/Itr7-schedule-cfl.tsx";
import ScheduleUD from "./components/Itr7-schedule-ud.tsx";
import ScheduleICDS from "./components/Itr7-schedule-icds.tsx";
import Schedule10AA from "./components/Itr7-schedule-10aa.tsx";
import Schedule80G from "./components/Itr7-schedule-80g.tsx";
import Schedule80GGA from "./components/Itr7-schedule-80gga.tsx";
import Schedule80GGCC from "./components/Itr7-schedule-80ggcc.tsx";
import Schedule80JAC from "./components/Itr7-schedule-80jac.tsx";
import Schedule80JJA from "./components/Itr7-schedule-80jja.tsx";
import Schedule80L from "./components/Itr7-schedule-80l.tsx";
import ScheduleFDI from "./components/Itr7-schedule-fdi.tsx";
import ScheduleRA from "./components/Itr7-schedule-ra.tsx";
import Schedule80IA from "./components/Itr7-schedule-80ia.tsx";
import Schedule80IB from "./components/Itr7-schedule-80ib.tsx";
import Schedule80IE from "./components/Itr7-schedule-80ie.tsx";
import ScheduleVIA from "./components/Itr7-schedule-via.tsx";
import ScheduleSI from "./components/Itr7-schedule-si.tsx";
import ScheduleIF from "./components/Itr7-schedule-if.tsx";
import { Itr7ScheduleEI } from "./components/Itr7-schedule-ei.tsx";
import { Itr7SchedulePTI } from "./components/Itr7-schedule-pti.tsx";
import { Itr7ScheduleMAT } from "./components/Itr7-schedule-mat.tsx";
import { Itr7ScheduleMATCC } from "./components/Itr7-schedule-matc.tsx";
import ScheduleTDS from "./components/Itr7-schedule-tds.tsx";
import Schedule115A1CA from "./components/Itr7-schedule-115a1ca.tsx";
import Schedule115D from "./components/Itr7-schedule-115d.tsx";
import ScheduleFSI from "./components/Itr7-schedule-fsi.tsx";
import ScheduleTR from "./components/Itr7-schedule-tr.tsx";
import ScheduleFA from "./components/Itr7-schedule-fa.tsx";
import ScheduleSH1 from "./components/Itr7-schedule-sh1.tsx";
import ScheduleSH2 from "./components/Itr7-schedule-sh2.tsx";
import CashFlowStatement from "./components/Itr7-cash-flow.tsx";
import NotesToAccounts from "./components/Itr7-notes-to-accounts.tsx";
import ComprehensiveIncomeStatement from "./components/Itr7-comprehensive-income.tsx";
import Itr7ProgressBar from "./components/itr-7-progress.tsx";
import { itr7ValidationSchema } from "./itr-7.validation.ts";
import type { ITR7FormData } from "./itr-7.types.ts";

type ITR7Step =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52;

interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
  current: boolean;
}

const Itr7Form: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ITR7Step>(1);
  const [completedSteps, setCompletedSteps] = useState<ITR7Step[]>([]);

  const form = useForm<ITR7FormData>({
    resolver: zodResolver(itr7ValidationSchema) as any,
    mode: "onChange",
    defaultValues: {
      gen_name: "",
      gen_pan: "",
      gen_cin: "",
      gen_incorporation_date: "",
      gen_business_commencement_date: "",
    },
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const steps: ProgressStep[] = [
    {
      id: "personal-info",
      label: "Personal Information",
      completed: completedSteps.includes(1),
      current: currentStep === 1,
    },
    {
      id: "manufacturing-account",
      label: "Manufacturing Account",
      completed: completedSteps.includes(2),
      current: currentStep === 2,
    },
    {
      id: "trading-account",
      label: "Trading Account",
      completed: completedSteps.includes(3),
      current: currentStep === 3,
    },
    {
      id: "balance-sheet",
      label: "Balance Sheet",
      completed: completedSteps.includes(4),
      current: currentStep === 4,
    },
    {
      id: "trading-statement",
      label: "Trading Statement (Asset Schedules)",
      completed: completedSteps.includes(5),
      current: currentStep === 5,
    },
    {
      id: "profit-loss",
      label: "Profit & Loss Account",
      completed: completedSteps.includes(6),
      current: currentStep === 6,
    },
    {
      id: "schedule-bp",
      label: "Schedule BP",
      completed: completedSteps.includes(7),
      current: currentStep === 7,
    },
    {
      id: "schedule-dpm",
      label: "Schedule DPM",
      completed: completedSteps.includes(8),
      current: currentStep === 8,
    },
    {
      id: "schedule-doa",
      label: "Schedule DOA",
      completed: completedSteps.includes(9),
      current: currentStep === 9,
    },
    {
      id: "schedule-dep",
      label: "Schedule DEP",
      completed: completedSteps.includes(10),
      current: currentStep === 10,
    },
    {
      id: "schedule-dcg",
      label: "Schedule DCG",
      completed: completedSteps.includes(11),
      current: currentStep === 11,
    },
    {
      id: "schedule-esr",
      label: "Schedule ESR",
      completed: completedSteps.includes(12),
      current: currentStep === 12,
    },
    {
      id: "schedule-cg",
      label: "Schedule CG",
      completed: completedSteps.includes(13),
      current: currentStep === 13,
    },
    {
      id: "schedule-ita",
      label: "Schedule ITA",
      completed: completedSteps.includes(14),
      current: currentStep === 14,
    },
    {
      id: "schedule-vda",
      label: "Schedule VDA",
      completed: completedSteps.includes(15),
      current: currentStep === 15,
    },
    {
      id: "income-summary",
      label: "Income Summary",
      completed: completedSteps.includes(16),
      current: currentStep === 16,
    },
    {
      id: "schedule-os",
      label: "Schedule OS",
      completed: completedSteps.includes(17),
      current: currentStep === 17,
    },
    {
      id: "schedule-cvla",
      label: "Schedule CVLA",
      completed: completedSteps.includes(18),
      current: currentStep === 18,
    },
    {
      id: "schedule-bf1a",
      label: "Schedule BF1A",
      completed: completedSteps.includes(19),
      current: currentStep === 19,
    },
    {
      id: "schedule-cfl",
      label: "Schedule CFL",
      completed: completedSteps.includes(20),
      current: currentStep === 20,
    },
    {
      id: "schedule-ud",
      label: "Schedule UD",
      completed: completedSteps.includes(21),
      current: currentStep === 21,
    },
    {
      id: "schedule-icds",
      label: "Schedule ICDS",
      completed: completedSteps.includes(22),
      current: currentStep === 22,
    },
    {
      id: "schedule-10aa",
      label: "Schedule 10AA",
      completed: completedSteps.includes(23),
      current: currentStep === 23,
    },
    {
      id: "schedule-80g",
      label: "Schedule 80G",
      completed: completedSteps.includes(24),
      current: currentStep === 24,
    },
    {
      id: "schedule-80gga",
      label: "Schedule 80GGA",
      completed: completedSteps.includes(25),
      current: currentStep === 25,
    },
    {
      id: "schedule-80ggcc",
      label: "Schedule 80GGCC",
      completed: completedSteps.includes(26),
      current: currentStep === 26,
    },
    {
      id: "schedule-80jac",
      label: "Schedule 80JAC",
      completed: completedSteps.includes(27),
      current: currentStep === 27,
    },
    {
      id: "schedule-80jja",
      label: "Schedule 80JJA",
      completed: completedSteps.includes(28),
      current: currentStep === 28,
    },
    {
      id: "schedule-80l",
      label: "Schedule 80L",
      completed: completedSteps.includes(29),
      current: currentStep === 29,
    },
    {
      id: "schedule-fdi",
      label: "Schedule FDI",
      completed: completedSteps.includes(30),
      current: currentStep === 30,
    },
    {
      id: "schedule-ra",
      label: "Schedule RA",
      completed: completedSteps.includes(31),
      current: currentStep === 31,
    },
    {
      id: "schedule-80ia",
      label: "Schedule 80-IA",
      completed: completedSteps.includes(32),
      current: currentStep === 32,
    },
    {
      id: "schedule-80ib",
      label: "Schedule 80-IB",
      completed: completedSteps.includes(33),
      current: currentStep === 33,
    },
    {
      id: "schedule-80ie",
      label: "Schedule 80-IE",
      completed: completedSteps.includes(34),
      current: currentStep === 34,
    },
    {
      id: "schedule-via",
      label: "Schedule VI-A",
      completed: completedSteps.includes(35),
      current: currentStep === 35,
    },
    {
      id: "schedule-si",
      label: "Schedule SI",
      completed: completedSteps.includes(36),
      current: currentStep === 36,
    },
    {
      id: "schedule-if",
      label: "Schedule IF",
      completed: completedSteps.includes(37),
      current: currentStep === 37,
    },
    {
      id: "schedule-ei",
      label: "Schedule EI",
      completed: completedSteps.includes(38),
      current: currentStep === 38,
    },
    {
      id: "schedule-pti",
      label: "Schedule PTI",
      completed: completedSteps.includes(39),
      current: currentStep === 39,
    },
    {
      id: "schedule-mat",
      label: "Schedule MAT",
      completed: completedSteps.includes(40),
      current: currentStep === 40,
    },
    {
      id: "schedule-matc",
      label: "Schedule MATC",
      completed: completedSteps.includes(41),
      current: currentStep === 41,
    },
    {
      id: "schedule-tds",
      label: "Schedule TDS",
      completed: completedSteps.includes(42),
      current: currentStep === 42,
    },
    {
      id: "schedule-115a1ca",
      label: "Schedule 115A1CA",
      completed: completedSteps.includes(43),
      current: currentStep === 43,
    },
    {
      id: "schedule-115d",
      label: "Schedule 115D",
      completed: completedSteps.includes(44),
      current: currentStep === 44,
    },
    {
      id: "cash-flow",
      label: "Cash Flow Statement",
      completed: completedSteps.includes(45),
      current: currentStep === 45,
    },
    {
      id: "notes-to-accounts",
      label: "Notes to Accounts",
      completed: completedSteps.includes(46),
      current: currentStep === 46,
    },
    {
      id: "schedule-fsi",
      label: "Schedule FSI",
      completed: completedSteps.includes(47),
      current: currentStep === 47,
    },
    {
      id: "schedule-tr",
      label: "Schedule TR",
      completed: completedSteps.includes(48),
      current: currentStep === 48,
    },
    {
      id: "schedule-fa",
      label: "Schedule FA",
      completed: completedSteps.includes(49),
      current: currentStep === 49,
    },
    {
      id: "schedule-sh1",
      label: "Schedule SH-1",
      completed: completedSteps.includes(50),
      current: currentStep === 50,
    },
    {
      id: "schedule-sh2",
      label: "Schedule SH-2",
      completed: completedSteps.includes(51),
      current: currentStep === 51,
    },
    {
      id: "comprehensive-income",
      label: "Comprehensive Income Statement",
      completed: completedSteps.includes(52),
      current: currentStep === 52,
    },
  ];

  const handleNext = async () => {
    const isStepValid = await form.trigger();
    if (!isStepValid) return;

    if (currentStep < 40) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((currentStep + 1) as ITR7Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as ITR7Step);
    }
  };

  const handleSubmitForm = (data: ITR7FormData) => {
    console.log("Form submitted:", data);

    alert("ITR-7 Form submitted successfully!");
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem("itr7_draft", JSON.stringify(formData));
    alert("Form saved as draft!");
  };

  const handleLoadDraft = () => {
    const savedData = localStorage.getItem("itr7_draft");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      form.reset(parsedData);
      alert("Draft loaded successfully!");
    } else {
      alert("No saved draft found!");
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      form.reset();
      setCurrentStep(1);
      setCompletedSteps([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            ITR-7 Form: Corporate Tax Return
          </h1>
          <p className="text-slate-600 text-lg">
            For Corporate Bodies (Other than Co-operative Societies)
          </p>
        </div>

        {/* Progress Bar */}
        <Itr7ProgressBar
          currentStep={currentStep}
          totalSteps={52}
          steps={steps}
        />

        {/* Form Steps */}
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <PersonalInformation
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 2: Manufacturing Account */}
          {currentStep === 2 && (
            <ManufacturingAccount onCancel={() => handleReset()} />
          )}
          {/* Step 3: Trading Account */}
          {currentStep === 3 && (
            <TradingAccountComponent onCancel={() => handleReset()} />
          )}
          {/* Step 4: Balance Sheet */}
          {currentStep === 4 && (
            <BalanceSheet
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 5: Trading Statement (Asset Schedules) */}
          {currentStep === 5 && (
            <TradingStatement
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 6: Profit & Loss Account */}
          {currentStep === 6 && (
            <ProfitLossAccount onCancel={() => handleReset()} />
          )}
          {/* Step 7: Schedule BP */}
          {currentStep === 7 && (
            <ScheduleBP
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 8: Schedule DPM */}
          {currentStep === 8 && (
            <ScheduleDPM
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 9: Schedule DOA */}
          {currentStep === 9 && (
            <ScheduleDOA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 10: Schedule DEP */}
          {currentStep === 10 && (
            <ScheduleDEP
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 11: Schedule DCG */}
          {currentStep === 11 && (
            <ScheduleDCG
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 12: Schedule ESR */}
          {currentStep === 12 && (
            <ScheduleESR
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 13: Schedule CG */}
          {currentStep === 13 && (
            <ScheduleCG
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 14: Schedule ITA */}
          {currentStep === 14 && (
            <ScheduleITA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {currentStep === 15 && (
            <ScheduleVDA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 16: Income Summary */}
          {currentStep === 16 && (
            <IncomeSummary
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 17: Schedule OS */}
          {currentStep === 17 && (
            <ScheduleOS
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 18: Schedule CVLA */}
          {currentStep === 18 && (
            <ScheduleCVLA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 19: Schedule BF1A */}
          {currentStep === 19 && (
            <ScheduleBF1A
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 20: Schedule CFL */}
          {currentStep === 20 && (
            <ScheduleCFL
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 21: Schedule UD */}
          {currentStep === 21 && (
            <ScheduleUD
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 22: Schedule ICDS */}
          {currentStep === 22 && (
            <ScheduleICDS
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 23: Schedule 10AA */}
          {currentStep === 23 && (
            <Schedule10AA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 24: Schedule 80G */}
          {currentStep === 24 && (
            <Schedule80G
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 25: Schedule 80GGA */}
          {currentStep === 25 && (
            <Schedule80GGA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 26: Schedule 80GGCC */}
          {currentStep === 26 && (
            <Schedule80GGCC
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 27: Schedule 80JAC */}
          {currentStep === 27 && (
            <Schedule80JAC
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 28: Schedule 80JJA */}
          {currentStep === 28 && (
            <Schedule80JJA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 29: Schedule 80L */}
          {currentStep === 29 && (
            <Schedule80L
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 30: Schedule FDI */}
          {currentStep === 30 && (
            <ScheduleFDI
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 31: Schedule RA */}
          {currentStep === 31 && (
            <ScheduleRA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 32: Schedule 80-IA */}
          {currentStep === 32 && (
            <Schedule80IA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 33: Schedule 80-IB */}
          {currentStep === 33 && (
            <Schedule80IB
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 34: Schedule 80-IE */}
          {currentStep === 34 && (
            <Schedule80IE
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 35: Schedule VI-A */}
          {currentStep === 35 && (
            <ScheduleVIA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 36: Schedule SI */}
          {currentStep === 36 && (
            <ScheduleSI
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 37: Schedule IF */}
          {currentStep === 37 && (
            <ScheduleIF
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 38: Schedule EI */}
          {currentStep === 38 && (
            <Itr7ScheduleEI
              register={form.register}
              watch={form.watch}
            />
          )}
          {/* Step 39: Schedule PTI */}
          {currentStep === 39 && (
            <Itr7SchedulePTI
              register={form.register}
              watch={form.watch}
            />
          )}
          {/* Step 40: Schedule MAT */}
          {currentStep === 40 && (
            <Itr7ScheduleMAT
              register={form.register}
              watch={form.watch}
            />
          )}
          {/* Step 41: Schedule MATC */}
          {currentStep === 41 && (
            <Itr7ScheduleMATCC
              register={form.register}
              watch={form.watch}
            />
          )}
          {/* Step 42: Schedule TDS */}
          {currentStep === 42 && (
            <ScheduleTDS
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 43: Schedule 115A1CA */}
          {currentStep === 43 && (
            <Schedule115A1CA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 44: Schedule 115D */}
          {currentStep === 44 && (
            <Schedule115D
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 45: Cash Flow Statement */}
          {currentStep === 45 && (
            <CashFlowStatement onCancel={() => handleReset()} />
          )}
          {/* Step 46: Notes to Accounts */}
          {currentStep === 46 && (
            <NotesToAccounts onCancel={() => handleReset()} />
          )}
          {/* Step 47: Schedule FSI */}
          {currentStep === 47 && (
            <ScheduleFSI
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 48: Schedule TR */}
          {currentStep === 48 && (
            <ScheduleTR
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 49: Schedule FA */}
          {currentStep === 49 && (
            <ScheduleFA
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 50: Schedule SH-1 */}
          {currentStep === 50 && (
            <ScheduleSH1
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 51: Schedule SH-2 */}
          {currentStep === 51 && (
            <ScheduleSH2
              form={form}
              onCancel={() => handleReset()}
              onSubmit={handleSubmitForm}
            />
          )}
          {/* Step 52: Comprehensive Income Statement */}
          {currentStep === 52 && (
            <ComprehensiveIncomeStatement onCancel={() => handleReset()} />
          )}{" "}
          {/* Navigation Buttons */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex gap-4 justify-between">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              ← Previous
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLoadDraft}
                className="px-6 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                📂 Load Draft
              </button>

              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                💾 Save Draft
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                🔄 Reset
              </button>
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isValid || currentStep === 52}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Next →
            </button>
          </div>
          {/* Submit Section (Only visible on last step) */}
          {currentStep === 42 && (
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
              <h3 className="text-xl font-bold text-green-900 mb-4">
                ✅ Ready to Submit?
              </h3>
              <p className="text-gray-600 mb-6">
                Review all the information before submitting. You can go back to
                any section to make changes.
              </p>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  ← Go Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                >
                  ✓ Submit ITR-7
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Footer Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Important Information
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                All fields marked with <span className="text-red-500">*</span>{" "}
                are mandatory
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>You can save the form as draft and continue later</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>
                All calculations are done automatically for balance sheet fields
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>Ensure all dates are in DD/MM/YYYY format</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">•</span>
              <span>For any assistance, contact support@example.com</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Itr7Form;
