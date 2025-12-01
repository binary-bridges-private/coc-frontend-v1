import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as XLSX from 'xlsx';
import { itr7ValidationSchema } from './itr-7.validation.ts';
import type { ITR7FormData } from './itr-7.types.ts';
import type { ITR7BalanceSheetComprehensiveData } from './components/itr-7-balance-sheet-comprehensive.types.ts';
import type { ITR7ManufacturingAccountData } from './components/itr-7-manufacturing-account.types.ts';
import type { ITR7TradingAccountData } from './components/itr-7-trading-account.types.ts';
import type { ITR7ProfitLossAccountData } from './components/itr-7-profit-loss-account.types.ts';
import type { ITR7SummaryData } from './components/itr-7-summary.types.ts';
import type { ITR7IncomeStatementData } from './components/itr-7-income-statement.types.ts';
import type { ITR7PLAccountData } from './components/itr-7-pl-account.types.ts';
import type { ITR7PartAOIData } from './components/itr-7-part-a-oi.types.ts';
import type { ITR7PartAQDData } from './components/itr-7-part-a-qd.types.ts';
import type { ITR7PartAOLData } from './components/itr-7-part-a-ol.types.ts';
import type { ITR7ScheduleHPData } from './components/itr-7-schedule-hp.types.ts';
import type { ITR7ScheduleBPData } from './components/itr-7-schedule-bp.types.ts';
import type { ITR7ScheduleDPMData } from './components/itr-7-schedule-dpm.types.ts';
import type { ITR7ScheduleDOAData } from './components/itr-7-schedule-doa.types.ts';
import type { ITR7ScheduleDEPData } from './components/itr-7-schedule-dep.types.ts';
import type { ITR7ScheduleDCGData } from './components/itr-7-schedule-dcg.types.ts';
import type { ITR7ScheduleESRData } from './components/itr-7-schedule-esr.types.ts';
import type { ITR7ScheduleCGData } from './components/itr-7-schedule-cg.types.ts';
import type { ITR7Schedule112AData } from './components/itr-7-schedule-112a.types.ts';
import type { ITR7Schedule115ADData } from './components/itr-7-schedule-115ad.types.ts';
import type { ITR7ScheduleVDAData } from './components/itr-7-schedule-vda.types.ts';
import type { ITR7ScheduleOSData } from './components/itr-7-schedule-os.types.ts';
import type { ITR7ScheduleCYLAData } from './components/itr-7-schedule-cyla.types.ts';
import type { ITR7ScheduleBFLAData } from './components/itr-7-schedule-bfla.types.ts';
import type { ITR7ScheduleCFLData } from './components/itr-7-schedule-cfl.types.ts';
import type { ITR7ScheduleUDData } from './components/itr-7-schedule-ud.types.ts';
import type { ITR7ScheduleICDSData } from './components/itr-7-schedule-icds.types.ts';
import type { ITR7Schedule10AAData } from './components/itr-7-schedule-10aa.types.ts';
import type { ITR7Schedule80GData } from './components/itr-7-schedule-80g.types.ts';
import type { ITR7Schedule80GGAData } from './components/itr-7-schedule-80gga.types.ts';
import type { ITR7Schedule80GGCData } from './components/itr-7-schedule-80ggc.types.ts';
import type { ITR7Schedule80IACData } from './components/itr-7-schedule-80iac.types.ts';
import type { ITR7Schedule80LAData } from './components/itr-7-schedule-80la.types.ts';
import type { ITR7ScheduleRAData } from './components/itr-7-schedule-ra.types.ts';
import type { ITR7Schedule80IAData } from './components/itr-7-schedule-80ia.types.ts';
import type { ITR7Schedule80IBData } from './components/itr-7-schedule-80ib.types.ts';
import type { ITR7Schedule80IEData } from './components/itr-7-schedule-80ie.types.ts';
import type { ITR7ScheduleSIData } from './components/itr-7-schedule-si.types.ts';
import type { ITR7ScheduleIFData } from './components/itr-7-schedule-if.types.ts';
import type { ITR7ScheduleEIData } from './components/itr-7-schedule-ei.types.ts';
import type { ITR7SchedulePTIData } from './components/itr-7-schedule-pti.types.ts';
import type { ITR7ScheduleMATData } from './components/itr-7-schedule-mat.types.ts';
import type { ITR7ScheduleMATCData } from './components/itr-7-schedule-matc.types.ts';
import type { ITR7ScheduleDBSData } from './components/itr-7-schedule-dbs.types.ts';
import type { ITR7ScheduleTPSAData } from './components/itr-7-schedule-tpsa.types.ts';
import type { ITR7Schedule115TDData } from './components/itr-7-schedule-115td.types.ts';
import type { ITR7ScheduleFSIData } from './components/itr-7-schedule-fsi.types.ts';
import type { ITR7ScheduleTRData } from './components/itr-7-schedule-tr.types.ts';
import type { ITR7ScheduleFAData } from './components/itr-7-schedule-fa.types.ts';
import type { ITR7ScheduleSH1Data } from './components/itr-7-schedule-sh1.types.ts';
import type { ITR7ScheduleSH2Data } from './components/itr-7-schedule-sh2.types.ts';
import type { ITR7ScheduleAL1Data } from './components/itr-7-schedule-al1.types.ts';
import type { ITR7ScheduleAL2Data } from './components/itr-7-schedule-al2.types.ts';
import type { ITR7ScheduleGSTData } from './components/itr-7-schedule-gst.types.ts';
import type { ITR7ScheduleFDData } from './components/itr-7-schedule-fd.types.ts';
import { Itr7PersonalInfo } from './components/Itr7-personal-info.tsx';
import Itr7BalanceSheet from './components/Itr7-balance-sheet.tsx';
import Itr7BalanceSheetComprehensive from './components/Itr7-balance-sheet-comprehensive.tsx';
import Itr7ManufacturingAccount from './components/Itr7-manufacturing-account.tsx';
import Itr7TradingAccount from './components/Itr7-trading-account.tsx';
import Itr7ProfitLossAccount from './components/Itr7-profit-loss-account.tsx';
import Itr7Summary from './components/Itr7-summary.tsx';
import Itr7IncomeStatement from './components/Itr7-income-statement.tsx';
import Itr7PLAccount from './components/Itr7-pl-account.tsx';
import Itr7PartAOI from './components/Itr7-part-a-oi.tsx';
import Itr7PartAQD from './components/Itr7-part-a-qd.tsx';
import Itr7PartAOL from './components/Itr7-part-a-ol.tsx';
import Itr7ScheduleHP from './components/Itr7-schedule-hp.tsx';
import Itr7ScheduleBP from './components/Itr7-schedule-bp.tsx';
import Itr7ScheduleDPM from './components/Itr7-schedule-dpm.tsx';
import Itr7ScheduleDOA from './components/Itr7-schedule-doa.tsx';
import Itr7ScheduleDEP from './components/Itr7-schedule-dep.tsx';
import Itr7ScheduleDCG from './components/Itr7-schedule-dcg.tsx';
import Itr7ScheduleESR from './components/Itr7-schedule-esr.tsx';
import Itr7ScheduleCG from './components/Itr7-schedule-cg.tsx';
import Itr7Schedule112A from './components/Itr7-schedule-112a.tsx';
import Itr7Schedule115AD from './components/Itr7-schedule-115ad.tsx';
import Itr7ScheduleVDA from './components/Itr7-schedule-vda.tsx';
import Itr7ScheduleOS from './components/Itr7-schedule-os.tsx';
import Itr7ScheduleCYLA from './components/Itr7-schedule-cyla.tsx';
import Itr7ScheduleBFLA from './components/Itr7-schedule-bfla.tsx';
import Itr7ScheduleCFL from './components/Itr7-schedule-cfl.tsx';
import Itr7ScheduleUD from './components/Itr7-schedule-ud.tsx';
import Itr7ScheduleICDS from './components/Itr7-schedule-icds.tsx';
import Itr7Schedule10AA from './components/Itr7-schedule-10aa.tsx';
import Itr7Schedule80G from './components/Itr7-schedule-80g.tsx';
import Itr7Schedule80GGA from './components/Itr7-schedule-80gga.tsx';
import Itr7Schedule80GGC from './components/Itr7-schedule-80ggc.tsx';
import Itr7Schedule80IAC from './components/Itr7-schedule-80iac.tsx';
import Itr7Schedule80LA from './components/Itr7-schedule-80la.tsx';
import Itr7ScheduleRA from './components/Itr7-schedule-ra.tsx';
import Itr7Schedule80IA from './components/Itr7-schedule-80ia.tsx';
import Itr7Schedule80IB from './components/Itr7-schedule-80ib.tsx';
import Itr7Schedule80IE from './components/Itr7-schedule-80ie.tsx';
import Itr7ScheduleSI from './components/Itr7-schedule-si.tsx';
import Itr7ScheduleIF from './components/Itr7-schedule-if.tsx';
import Itr7ScheduleEI from './components/Itr7-schedule-ei.tsx';
import Itr7SchedulePTI from './components/Itr7-schedule-pti.tsx';
import Itr7ScheduleMAT from './components/Itr7-schedule-mat.tsx';
import Itr7ScheduleMATC from './components/Itr7-schedule-matc.tsx';
import Itr7ScheduleDBS from './components/Itr7-schedule-dbs.tsx';
import Itr7ScheduleTPSA from './components/Itr7-schedule-tpsa.tsx';
import Itr7Schedule115TD from './components/Itr7-schedule-115td.tsx';
import Itr7ScheduleFSI from './components/Itr7-schedule-fsi.tsx';
import Itr7ScheduleTR from './components/Itr7-schedule-tr.tsx';
import Itr7ScheduleFA from './components/Itr7-schedule-fa.tsx';
import Itr7ScheduleSH1 from './components/Itr7-schedule-sh1.tsx';
import Itr7ScheduleSH2 from './components/Itr7-schedule-sh2.tsx';
import Itr7ScheduleAL1 from './components/Itr7-schedule-al1.tsx';
import Itr7ScheduleAL2 from './components/Itr7-schedule-al2.tsx';
import Itr7ScheduleGST from './components/Itr7-schedule-gst.tsx';
import Itr7ScheduleFD from './components/Itr7-schedule-fd.tsx';
import Itr7PartBTI from './components/Itr7-part-b-ti.tsx';
import Itr7PartBTTI from './components/Itr7-part-b-tti.tsx';
import Itr7Verification from './components/Itr7-verification.tsx';
import { ITR7PartBTIData } from './components/itr-7-part-b-ti.types.ts';
import { ITR7PartBTTIData } from './components/itr-7-part-b-tti.types.ts';
import { ITR7VerificationData } from './components/itr-7-verification.types.ts';
import { ITR_SEVEN_PROGRESS_STEPS } from './itr-7.constants.ts';

type ITR7Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;

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
    mode: 'onChange',
    defaultValues: {
      gen_name: '',
      gen_pan: '',
      gen_cin: '',
      gen_company_type: 'domestic',
      gen_residential_status: 'resident',
    },
  });

  const comprehensiveForm = useForm<ITR7BalanceSheetComprehensiveData>({
    mode: 'onChange',
    defaultValues: {} as ITR7BalanceSheetComprehensiveData,
  });

  const manufacturingForm = useForm<ITR7ManufacturingAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ManufacturingAccountData,
  });

  const tradingForm = useForm<ITR7TradingAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7TradingAccountData,
  });

  const profitLossForm = useForm<ITR7ProfitLossAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ProfitLossAccountData,
  });

  const summaryForm = useForm<ITR7SummaryData>({
    mode: 'onChange',
    defaultValues: {} as ITR7SummaryData,
  });

  const incomeStatementForm = useForm<ITR7IncomeStatementData>({
    mode: 'onChange',
    defaultValues: {} as ITR7IncomeStatementData,
  });

  const plAccountForm = useForm<ITR7PLAccountData>({
    mode: 'onChange',
    defaultValues: {} as ITR7PLAccountData,
  });

  const partAOIForm = useForm<ITR7PartAOIData>({
    mode: 'onChange',
    defaultValues: {} as ITR7PartAOIData,
  });

  const partAQDForm = useForm<ITR7PartAQDData>({
    mode: 'onChange',
    defaultValues: {} as ITR7PartAQDData,
  });

  const partAOLForm = useForm<ITR7PartAOLData>({
    mode: 'onChange',
    defaultValues: {} as ITR7PartAOLData,
  });

  const scheduleHPForm = useForm<ITR7ScheduleHPData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleHPData,
  });

  const scheduleBPForm = useForm<ITR7ScheduleBPData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleBPData,
  });

  const scheduleDPMForm = useForm<ITR7ScheduleDPMData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleDPMData,
  });

  const scheduleDOAForm = useForm<ITR7ScheduleDOAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleDOAData,
  });

  const scheduleDEPForm = useForm<ITR7ScheduleDEPData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleDEPData,
  });

  const scheduleDCGForm = useForm<ITR7ScheduleDCGData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleDCGData,
  });

  const scheduleESRForm = useForm<ITR7ScheduleESRData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleESRData,
  });

  const scheduleCGForm = useForm<ITR7ScheduleCGData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleCGData,
  });

  const schedule112AForm = useForm<ITR7Schedule112AData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule112AData,
  });

  const schedule115ADForm = useForm<ITR7Schedule115ADData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule115ADData,
  });

  const scheduleVDAForm = useForm<ITR7ScheduleVDAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleVDAData,
  });

  const scheduleOSForm = useForm<ITR7ScheduleOSData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleOSData,
  });

  const scheduleCYLAForm = useForm<ITR7ScheduleCYLAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleCYLAData,
  });

  const scheduleBFLAForm = useForm<ITR7ScheduleBFLAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleBFLAData,
  });

  const scheduleCFLForm = useForm<ITR7ScheduleCFLData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleCFLData,
  });

  const scheduleUDForm = useForm<ITR7ScheduleUDData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleUDData,
  });

  const scheduleICDSForm = useForm<ITR7ScheduleICDSData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleICDSData,
  });

  const schedule10AAForm = useForm<ITR7Schedule10AAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule10AAData,
  });

  const schedule80GForm = useForm<ITR7Schedule80GData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80GData,
  });

  const schedule80GGAForm = useForm<ITR7Schedule80GGAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80GGAData,
  });

  const schedule80GGCForm = useForm<ITR7Schedule80GGCData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80GGCData,
  });

  const schedule80IACForm = useForm<ITR7Schedule80IACData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80IACData,
  });

  const schedule80LAForm = useForm<ITR7Schedule80LAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80LAData,
  });

  const scheduleRAForm = useForm<ITR7ScheduleRAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleRAData,
  });

  const schedule80IAForm = useForm<ITR7Schedule80IAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80IAData,
  });

  const schedule80IBForm = useForm<ITR7Schedule80IBData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80IBData,
  });

  const schedule80IEForm = useForm<ITR7Schedule80IEData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule80IEData,
  });

  const scheduleSIForm = useForm<ITR7ScheduleSIData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleSIData,
  });

  const scheduleIFForm = useForm<ITR7ScheduleIFData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleIFData,
  });

  const scheduleEIForm = useForm<ITR7ScheduleEIData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleEIData,
  });

  const schedulePTIForm = useForm<ITR7SchedulePTIData>({
    mode: 'onChange',
    defaultValues: {} as ITR7SchedulePTIData,
  });

  const scheduleMATForm = useForm<ITR7ScheduleMATData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleMATData,
  });

  const scheduleMATCForm = useForm<ITR7ScheduleMATCData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleMATCData,
  });

  const scheduleDBSForm = useForm<ITR7ScheduleDBSData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleDBSData,
  });

  const scheduleTPSAForm = useForm<ITR7ScheduleTPSAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleTPSAData,
  });

  const schedule115TDForm = useForm<ITR7Schedule115TDData>({
    mode: 'onChange',
    defaultValues: {} as ITR7Schedule115TDData,
  });

  const scheduleFSIForm = useForm<ITR7ScheduleFSIData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleFSIData,
  });

  const scheduleTRForm = useForm<ITR7ScheduleTRData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleTRData,
  });

  const scheduleFAForm = useForm<ITR7ScheduleFAData>({
    mode: 'onChange',
    defaultValues: {} as ITR7ScheduleFAData,
  });

  const scheduleSH1Form = useForm<ITR7ScheduleSH1Data>({
    defaultValues: {
      shareholders: [],
      application_money: [],
      ceased_shareholders: []
    }
  });

  const scheduleSH2Form = useForm<ITR7ScheduleSH2Data>({
    defaultValues: {
      shareholders: [],
      application_money: [],
      ceased_shareholders: []
    }
  });

  const scheduleAL1Form = useForm<ITR7ScheduleAL1Data>({
    defaultValues: {
      scheduleAL1: {
        residential_assets: [],
        non_residential_assets: [],
        listed_equity: [],
        unlisted_equity: [],
        other_securities: [],
        capital_contributions: [],
        loans_advances: [],
        vehicles: [],
        jewellery_art: [],
        liabilities: []
      }
    }
  });

  const scheduleAL2Form = useForm<ITR7ScheduleAL2Data>({
    defaultValues: {
      scheduleAL2: {
        residential_assets: [],
        non_residential_assets: [],
        loans_advances: [],
        capital_contributions: [],
        shares_securities: [],
        vehicles: [],
        jewellery_art: [],
        archaeological_collections: [],
        liabilities: []
      }
    }
  });

  const scheduleGSTForm = useForm<ITR7ScheduleGSTData>({
    defaultValues: {
      scheduleGST: {
        details: []
      }
    }
  });

  const scheduleFDForm = useForm<ITR7ScheduleFDData>({
    defaultValues: {
      scheduleFD: {}
    }
  });

  const partBTIForm = useForm<ITR7PartBTIData>({
    defaultValues: {
      partBTI: {}
    }
  });

  const partBTTIForm = useForm<ITR7PartBTTIData>({
    defaultValues: {
      partBTTI: {
        computation_tax_liability: {},
        taxes_paid: {},
        bank_accounts: [],
        tax_payments: {
          advance_tax: [],
          tds: [],
          tcs: []
        }
      }
    }
  });

  const verificationForm = useForm<ITR7VerificationData>({
    defaultValues: {
      verification: {
        name: '',
        parent_name: '',
        capacity: '',
        pan: '',
        date: '',
        place: ''
      }
    }
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = form;

  const steps: ProgressStep[] = ITR_SEVEN_PROGRESS_STEPS.map((step, index) => ({
    id: step.id.toString(),
    label: `${step.title}: ${step.caption}`,
    completed: completedSteps.includes(step.id as ITR7Step),
    current: currentStep === step.id,
  }));

  const onSubmit = (data: ITR7FormData) => {
    console.log('Form submitted:', data);
  };

  const handleNext = () => {
    if (currentStep < 60) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep((currentStep + 1) as ITR7Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as ITR7Step);
    }
  };

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem('itr7_draft', JSON.stringify(formData));
    alert('Draft saved successfully!');
  };

  const handleLoadDraft = () => {
    const draft = localStorage.getItem('itr7_draft');
    if (draft) {
      const draftData = JSON.parse(draft);
      Object.keys(draftData).forEach((key) => {
        form.setValue(key as keyof ITR7FormData, draftData[key]);
      });
      alert('Draft loaded successfully!');
    }
  };

  const handleDownloadExcel = () => {
    try {
      const wb = XLSX.utils.book_new();

      const createSheet = (data: any, sheetName: string) => {
        const flatData: any[] = [];
        
        const flattenObject = (obj: any, prefix = '') => {
          Object.keys(obj).forEach(key => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (value && typeof value === 'object' && !Array.isArray(value)) {
              flattenObject(value, newKey);
            } else if (Array.isArray(value)) {
              flatData.push({ Field: newKey, Value: JSON.stringify(value) });
            } else {
              flatData.push({ Field: newKey, Value: value ?? '' });
            }
          });
        };
        
        flattenObject(data);
        
        if (flatData.length > 0) {
          const ws = XLSX.utils.json_to_sheet(flatData);
          XLSX.utils.book_append_sheet(wb, ws, sheetName);
        }
      };

      createSheet(form.getValues(), 'General Information');
      createSheet(comprehensiveForm.getValues(), 'Balance Sheet');
      createSheet(manufacturingForm.getValues(), 'Manufacturing');
      createSheet(tradingForm.getValues(), 'Trading Account');
      createSheet(profitLossForm.getValues(), 'Profit & Loss');
      createSheet(summaryForm.getValues(), 'Summary');
      createSheet(incomeStatementForm.getValues(), 'Income Statement');
      createSheet(plAccountForm.getValues(), 'P&L Account');
      createSheet(partAOIForm.getValues(), 'Part A-OI');
      createSheet(partAQDForm.getValues(), 'Part A-QD');
      createSheet(partAOLForm.getValues(), 'Part A-OL');
      createSheet(scheduleHPForm.getValues(), 'Schedule HP');
      createSheet(scheduleBPForm.getValues(), 'Schedule BP');
      createSheet(scheduleDPMForm.getValues(), 'Schedule DPM');
      createSheet(scheduleDOAForm.getValues(), 'Schedule DOA');
      createSheet(scheduleDEPForm.getValues(), 'Schedule DEP');
      createSheet(scheduleDCGForm.getValues(), 'Schedule DCG');
      createSheet(scheduleESRForm.getValues(), 'Schedule ESR');
      createSheet(scheduleCGForm.getValues(), 'Schedule CG');
      createSheet(schedule112AForm.getValues(), 'Schedule 112A');
      createSheet(schedule115ADForm.getValues(), 'Schedule 115AD');
      createSheet(scheduleVDAForm.getValues(), 'Schedule VDA');
      createSheet(scheduleOSForm.getValues(), 'Schedule OS');
      createSheet(scheduleCYLAForm.getValues(), 'Schedule CYLA');
      createSheet(scheduleBFLAForm.getValues(), 'Schedule BFLA');
      createSheet(scheduleCFLForm.getValues(), 'Schedule CFL');
      createSheet(scheduleUDForm.getValues(), 'Schedule UD');
      createSheet(scheduleICDSForm.getValues(), 'Schedule ICDS');
      createSheet(schedule10AAForm.getValues(), 'Schedule 10AA');
      createSheet(schedule80GForm.getValues(), 'Schedule 80G');
      createSheet(schedule80GGAForm.getValues(), 'Schedule 80GGA');
      createSheet(schedule80GGCForm.getValues(), 'Schedule 80GGC');
      createSheet(schedule80IACForm.getValues(), 'Schedule 80IAC');
      createSheet(schedule80LAForm.getValues(), 'Schedule 80LA');
      createSheet(scheduleRAForm.getValues(), 'Schedule RA');
      createSheet(schedule80IAForm.getValues(), 'Schedule 80IA');
      createSheet(schedule80IBForm.getValues(), 'Schedule 80IB');
      createSheet(schedule80IEForm.getValues(), 'Schedule 80IE');
      createSheet(scheduleSIForm.getValues(), 'Schedule SI');
      createSheet(scheduleIFForm.getValues(), 'Schedule IF');
      createSheet(scheduleEIForm.getValues(), 'Schedule EI');
      createSheet(schedulePTIForm.getValues(), 'Schedule PTI');
      createSheet(scheduleMATForm.getValues(), 'Schedule MAT');
      createSheet(scheduleMATCForm.getValues(), 'Schedule MATC');
      createSheet(scheduleDBSForm.getValues(), 'Schedule DBS');
      createSheet(scheduleTPSAForm.getValues(), 'Schedule TPSA');
      createSheet(schedule115TDForm.getValues(), 'Schedule 115TD');
      createSheet(scheduleFAForm.getValues(), 'Schedule FA');
      createSheet(scheduleTRForm.getValues(), 'Schedule TR');
      createSheet(scheduleFSIForm.getValues(), 'Schedule FSI');
      createSheet(scheduleSH1Form.getValues(), 'Schedule SH1');
      createSheet(scheduleSH2Form.getValues(), 'Schedule SH2');
      createSheet(scheduleAL1Form.getValues(), 'Schedule AL1');
      createSheet(scheduleAL2Form.getValues(), 'Schedule AL2');
      createSheet(scheduleGSTForm.getValues(), 'Schedule GST');
      createSheet(scheduleFDForm.getValues(), 'Schedule FD');
      createSheet(partBTIForm.getValues(), 'Part B-TI');
      createSheet(partBTTIForm.getValues(), 'Part B-TTI');
      createSheet(verificationForm.getValues(), 'Verification');

      const date = new Date().toISOString().split('T')[0];
      const filename = `ITR7_Form_${date}.xlsx`;

      XLSX.writeFile(wb, filename);
      
      alert('Excel file downloaded successfully!');
    } catch (error) {
      console.error('Error downloading Excel:', error);
      alert('Error downloading Excel file. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Itr7PersonalInfo form={form} />;
      case 2:
        return <Itr7BalanceSheet form={form} />;
      case 3:
        return <Itr7BalanceSheetComprehensive form={comprehensiveForm} />;
      case 4:
        return <Itr7ManufacturingAccount form={manufacturingForm} />;
      case 5:
        return <Itr7TradingAccount form={tradingForm} />;
      case 6:
        return <Itr7ProfitLossAccount form={profitLossForm} />;
      case 7:
        return <Itr7Summary form={summaryForm} />;
      case 8:
        return <Itr7IncomeStatement form={incomeStatementForm} />;
      case 9:
        return <Itr7PLAccount form={plAccountForm} />;
      case 10:
        return <Itr7PartAOI form={partAOIForm} />;
      case 11:
        return <Itr7PartAQD form={partAQDForm} />;
      case 12:
        return <Itr7PartAOL form={partAOLForm} />;
      case 13:
        return <Itr7ScheduleHP form={scheduleHPForm} />;
      case 14:
        return <Itr7ScheduleBP form={scheduleBPForm} />;
      case 15:
        return <Itr7ScheduleDPM form={scheduleDPMForm} />;
      case 16:
        return <Itr7ScheduleDOA form={scheduleDOAForm} />;
      case 17:
        return <Itr7ScheduleDEP form={scheduleDEPForm} />;
      case 18:
        return <Itr7ScheduleDCG form={scheduleDCGForm} />;
      case 19:
        return <Itr7ScheduleESR form={scheduleESRForm} />;
      case 20:
        return <Itr7ScheduleCG form={scheduleCGForm} />;
      case 21:
        return <Itr7Schedule112A form={schedule112AForm} />;
      case 22:
        return <Itr7Schedule115AD form={schedule115ADForm} />;
      case 23:
        return <Itr7ScheduleVDA form={scheduleVDAForm} />;
      case 24:
        return <Itr7ScheduleOS form={scheduleOSForm} />;
      case 25:
        return <Itr7ScheduleCYLA form={scheduleCYLAForm} />;
      case 26:
        return <Itr7ScheduleBFLA form={scheduleBFLAForm} />;
      case 27:
        return <Itr7ScheduleCFL form={scheduleCFLForm} />;
      case 28:
        return <Itr7ScheduleUD form={scheduleUDForm} />;
      case 29:
        return <Itr7ScheduleICDS form={scheduleICDSForm} />;
      case 30:
        return <Itr7Schedule10AA form={schedule10AAForm} />;
      case 31:
        return <Itr7Schedule80G form={schedule80GForm} />;
      case 32:
        return <Itr7Schedule80GGA form={schedule80GGAForm} />;
      case 33:
        return <Itr7Schedule80GGC form={schedule80GGCForm} />;
      case 34:
        return <Itr7Schedule80IAC form={schedule80IACForm} />;
      case 35:
        return <Itr7Schedule80LA form={schedule80LAForm} />;
      case 36:
        return <Itr7ScheduleRA form={scheduleRAForm} />;
      case 37:
        return <Itr7Schedule80IA form={schedule80IAForm} />;
      case 38:
        return <Itr7Schedule80IB form={schedule80IBForm} />;
      case 39:
        return <Itr7Schedule80IE form={schedule80IEForm} />;
      case 40:
        return <Itr7ScheduleSI form={scheduleSIForm} />;
      case 41:
        return <Itr7ScheduleIF form={scheduleIFForm} />;
      case 42:
        return <Itr7ScheduleEI form={scheduleEIForm} />;
      case 43:
        return <Itr7SchedulePTI form={schedulePTIForm} />;
      case 44:
        return <Itr7ScheduleMAT form={scheduleMATForm} />;
      case 45:
        return <Itr7ScheduleMATC form={scheduleMATCForm} />;
      case 46:
        return <Itr7ScheduleDBS form={scheduleDBSForm} />;
      case 47:
        return <Itr7ScheduleTPSA form={scheduleTPSAForm} />;
      case 48:
        return <Itr7Schedule115TD form={schedule115TDForm} />;
      case 49:
        return <Itr7ScheduleFSI form={scheduleFSIForm} />;
      case 50:
        return <Itr7ScheduleTR form={scheduleTRForm} />;
      case 51:
        return <Itr7ScheduleFA form={scheduleFAForm} />;
      case 52:
        return <Itr7ScheduleSH1 form={scheduleSH1Form} />;
      case 53:
        return <Itr7ScheduleSH2 form={scheduleSH2Form} />;
      case 54:
        return <Itr7ScheduleAL1 form={scheduleAL1Form} />;
      case 55:
        return <Itr7ScheduleAL2 form={scheduleAL2Form} />;
      case 56:
        return <Itr7ScheduleGST form={scheduleGSTForm} />;
      case 57:
        return <Itr7ScheduleFD form={scheduleFDForm} />;
      case 58:
        return <Itr7PartBTI form={partBTIForm} />;
      case 59:
        return <Itr7PartBTTI form={partBTTIForm} />;
      case 60:
        return <Itr7Verification form={verificationForm} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            ITR-7: Income Tax Return for Trusts/Institutions
          </h1>
          <p className="text-gray-600 mt-2">
            Assessment Year: 2024-25 | Financial Year: 2023-24
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center min-w-max mr-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed
                    ? 'bg-green-500 text-white'
                    : step.current
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                    }`}
                >
                  {step.completed ? '✓' : index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-10 h-1 mx-2 ${step.completed ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {steps[currentStep - 1]?.label}
            </h2>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-lg shadow-sm mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-6">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleLoadDraft}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Load Draft
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={handleDownloadExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Excel
              </button>
            </div>

            <div className="flex gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  ← Previous
                </button>
              )}
              {currentStep < 60 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Return
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Itr7Form;
