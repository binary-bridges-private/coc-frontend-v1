import React, { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ITR6Progress from "./components/itr-6.progress.tsx";
import ITR6Entry from "./components/itr-6.entry.tsx";
import CompanyInformation from "./components/Itr-6-company-info.tsx";
import BalanceSheet from "./components/Itr-6-balance-sheet.tsx";
import ManufacturingAccount from "./components/Itr-6-manufacturing-account.tsx";
import TradingAccount from "./components/Itr-6-trading-account.tsx";
import OtherInfo from "./components/Itr-6-other-info.tsx";
import ScheduleHP from "./components/Itr-6-schedule-hp.tsx";
import ScheduleBP from "./components/Itr-6-schedule-bp.tsx";
import ScheduleDPM from "./components/Itr-6-schedule-dpm.tsx";
import ScheduleDOA from "./components/Itr-6-schedule-doa.tsx";
import ScheduleDEP from "./components/Itr-6-schedule-dep.tsx";
import ScheduleDCG from "./components/Itr-6-schedule-dcg.tsx";
import ScheduleESR from "./components/Itr-6-schedule-esr.tsx";
import ScheduleCG from "./components/Itr-6-schedule-cg.tsx";
import Schedule112A from "./components/Itr-6-schedule-112a.tsx";
import Schedule115AD from "./components/Itr-6-schedule-115ad.tsx";
import ScheduleVDA from "./components/Itr-6-schedule-vda.tsx";
import ScheduleOS from "./components/Itr-6-schedule-os.tsx";
import ScheduleCYL from "./components/Itr-6-schedule-cyl.tsx";
import ScheduleFI from "./components/Itr-6-schedule-fi.tsx";
import ScheduleLSF from "./components/Itr-6-schedule-lsf.tsx";
import ScheduleUFD from "./components/Itr-6-schedule-ufd.tsx";
import ScheduleICDS from "./components/Itr-6-schedule-icds.tsx";
import Schedule16AA from "./components/Itr-6-schedule-16aa.tsx";
import Schedule80G from "./components/Itr-6-schedule-80g.tsx";
import Schedule80GGA from "./components/Itr-6-schedule-80gga.tsx";
import Schedule80GGC from "./components/Itr-6-schedule-80ggc.tsx";
import Schedule81AC from "./components/Itr-6-schedule-81ac.tsx";
import Schedule81LA from "./components/Itr-6-schedule-81la.tsx";
import Schedule80IA from "./components/Itr-6-schedule-80ia.tsx";
import Schedule80IB from "./components/Itr-6-schedule-80ib.tsx";
import Schedule80RA from "./components/Itr-6-schedule-80ra.tsx";
import Schedule80IE from "./components/Itr-6-schedule-80ie.tsx";
import Schedule80P from "./components/Itr-6-schedule-80p.tsx";
import ScheduleVIA from "./components/Itr-6-schedule-via.tsx";
import ScheduleAMT from "./components/Itr-6-schedule-amt.tsx";
import ScheduleAMTCredit from "./components/Itr-6-schedule-amt-credit.tsx";
import ScheduleSI from "./components/Itr-6-schedule-si.tsx";
import ScheduleIF from "./components/Itr-6-schedule-if.tsx";
import ScheduleEX from "./components/Itr-6-schedule-ex.tsx";
import SchedulePT from "./components/Itr-6-schedule-pt.tsx";
import ScheduleTPSA from "./components/Itr-6-schedule-tpsa.tsx";
import Schedule115TD from "./components/Itr-6-schedule-115td.tsx";
import ScheduleFSI from "./components/Itr-6-schedule-fsi.tsx";
import ScheduleTR from "./components/Itr-6-schedule-tr.tsx";
import ScheduleFA from "./components/Itr-6-schedule-fa.tsx";
import ScheduleGST from "./components/Itr-6-schedule-gst.tsx";
import ScheduleTI from "./components/Itr-6-schedule-ti.tsx";
import ScheduleTTI from "./components/Itr-6-schedule-tti.tsx";
import ScheduleTP from "./components/Itr-6-schedule-tp.tsx";
import ScheduleTDS from "./components/Itr-6-schedule-tds.tsx";
import {
  ITR_SIX_PROGRESS_STEPS,
  ITR_SIX_SUMMARY_SECTIONS,
} from "./itr-6.constants.ts";
import { ItrSummarySection, StepStatus } from "./itr-6.types.ts";
import {
  companyInformationSchema,
  CompanyInformationFormData,
  balanceSheetSchema,
  BalanceSheetFormData,
  manufacturingAccountSchema,
  ManufacturingAccountFormData,
  tradingAccountSchema,
  TradingAccountFormData,
  FinancialInformationFormData,
  TaxComputationFormData,
  ShareholdingFormData,
} from "./itr-6.validation.ts";

const ItrSix: React.FC = () => {
  const [sections, setSections] = useState<ItrSummarySection[]>(() =>
    ITR_SIX_SUMMARY_SECTIONS.map((section) => ({ ...section }))
  );
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const [submissionInfo, setSubmissionInfo] = useState<{
    acknowledgementNo: string;
    submittedAt: Date;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const defaultCompanyInfo: Partial<CompanyInformationFormData> = useMemo(
    () => ({
      assessmentYear: "2025-26",
      pan: "",
      cin: "",
      companyName: "",
      companyType: undefined,
      dateOfIncorporation: "",
      registrationNumber: "",
      email: "",
      mobileNumber: "",
      registeredAddress: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
      bankName: "",
      bankAccountNumber: "",
      bankIFSCCode: "",
      accountType: undefined,
      filingStatus: undefined,
      taxRegime: undefined,
      filedInResponseToNotice: false,
      isRevisedOrDefective: false,
      authorizedSignatoryName: "",
      designation: "",
      place: "",
    }),
    []
  );

  const defaultFinancialData: Partial<FinancialInformationFormData> = useMemo(
    () => ({
      revenueFromOperations: 0,
      otherIncome: 0,
      totalRevenue: 0,
      costOfMaterialsConsumed: 0,
      purchasesOfStockInTrade: 0,
      changesInInventories: 0,
      employeeBenefitExpense: 0,
      financeExpense: 0,
      depreciationAndAmortization: 0,
      otherExpenses: 0,
      totalExpenses: 0,
      profitBeforeTax: 0,
      taxExpense: 0,
      profitAfterTax: 0,
    }),
    []
  );

  const defaultTaxComputation: Partial<TaxComputationFormData> = useMemo(
    () => ({
      profitBeforeTax: 0,
      additionsUnderIncomeTaxAct: 0,
      deductionsUnderIncomeTaxAct: 0,
      totalIncome: 0,
      taxRate: 0,
      incomeTax: 0,
      surcharge: 0,
      healthAndEducationCess: 0,
      totalTaxLiability: 0,
      advanceTaxPaid: 0,
      tdsCredited: 0,
      selfAssessmentTax: 0,
      totalTaxPaid: 0,
      taxPayable: 0,
    }),
    []
  );

  const defaultShareholding: Partial<ShareholdingFormData> = useMemo(
    () => ({
      numberOfDirectors: 1,
      numberOfShareholders: 1,
      authorizedShareCapital: 0,
      paidUpShareCapital: 0,
      faceValuePerShare: 10,
      numberOfShares: 0,
      reservesAndSurplus: 0,
    }),
    []
  );

  const defaultBalanceSheet: Partial<BalanceSheetFormData> = useMemo(
    () => ({
      // Sources of Funds
      partnersCapital: 0,
      revaluationReserve: 0,
      capitalReserve: 0,
      statutoryReserve: 0,
      otherReserve: 0,
      creditBalancePL: 0,
      securedLoansForex: 0,
      rupeeLoansFromBanks: 0,
      rupeeLoansFromOthers: 0,
      unsecuredLoansForex: 0,
      unsecuredRupeeFromBanks: 0,
      unsecuredRupeeFromSpecified: 0,
      unsecuredRupeeFromOthers: 0,
      deferredTaxLiability: 0,
      advancesFromSpecified: 0,
      advancesFromOthers: 0,
      // Application of Funds - Fixed Assets
      grossBlock: 0,
      depreciation: 0,
      netBlock: 0,
      capitalWIP: 0,
      // Investments - Long-term
      listedEquities: 0,
      unlistedEquities: 0,
      preferenceShares: 0,
      govSecurities: 0,
      debentureBonds: 0,
      mutualFunds: 0,
      otherLTInvestments: 0,
      // Investments - Short-term
      stListedEquities: 0,
      stUnlistedEquities: 0,
      stPreferenceShares: 0,
      stGovSecurities: 0,
      stDebentureBonds: 0,
      stMutualFunds: 0,
      otherSTInvestments: 0,
      // Current Assets - Inventories
      rawMaterials: 0,
      workInProgress: 0,
      finishedGoods: 0,
      stockInTrade: 0,
      storesConsumables: 0,
      looseTools: 0,
      otherInventories: 0,
      // Current Assets - Sundry Debtors
      sundryd1Year: 0,
      sundryOthers: 0,
      // Current Assets - Cash & Bank Balances
      balanceWithBanks: 0,
      cashInHand: 0,
      otherCashBalances: 0,
      // Current Assets - Other
      otherCurrentAssets: 0,
      // Current Assets - Loans & Advances
      advancesRecoverable: 0,
      // Additional Deposits & Loans
      depositsToCorpAndOthers: 0,
      balanceWithRevenueAuth: 0,
      // Loans and Advances subsections
      loansForBusiness: 0,
      loansNotForBusiness: 0,
      // Current Liabilities - Sundry Creditors
      sundryCred1Year: 0,
      sundryCred1YearOthers: 0,
      sundryCred1YearTotal: 0,
      // Current Liabilities - Other items
      liabilityForLeased: 0,
      interestAccrued: 0,
      interestNotDue: 0,
      incomeReceivedAdvance: 0,
      otherPayables: 0,
      // Provisions
      provisionIncomeTax: 0,
      provisionEncashment: 0,
      provisionOthers: 0,
      // Misc and Deferred Tax
      miscExpenditureNotWritten: 0,
      deferredTaxAsset: 0,
      debitBalancePL: 0,
    }),
    []
  );

  const defaultManufacturingAccount: Partial<ManufacturingAccountFormData> = useMemo(
    () => ({
      // Opening Inventory
      openingRawMaterial: 0,
      openingWorkInProgress: 0,
      // Purchases
      purchases: 0,
      // Direct Wages
      directWages: 0,
      // Direct Expenses
      carriageInward: 0,
      powerAndFuel: 0,
      otherDirectExpenses: 0,
      // Factory Overheads
      indirectWages: 0,
      factoryRent: 0,
      factoryInsurance: 0,
      factoryFuelPower: 0,
      factoryGeneralExpenses: 0,
      factoryDepreciation: 0,
      // Closing Stock
      closingRawMaterial: 0,
      closingWorkInProgress: 0,
    }),
    []
  );

  const defaultTradingAccount: Partial<TradingAccountFormData> = useMemo(
    () => ({
      // Revenue from Operations
      saleOfGoods: 0,
      saleOfServices: 0,
      otherOperatingRevenues: 0,
      // Duties and Taxes Receivable
      customExciseDuties: 0,
      serviceTax: 0,
      vatSalesTax: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      utgst: 0,
      otherDutiesAndTax: 0,
      // Total Revenue
      totalRevenueFromOperations: 0,
      closingStockFinishedGoods: 0,
      // Opening Stock and Purchases
      openingStockFinishedGoods: 0,
      // Duties and Taxes Payable
      customDuty: 0,
      countervailingDuty: 0,
      specialAdditionalDuty: 0,
      unionExciseDuty: 0,
      serviceTaxPayable: 0,
      vatSalesTaxPayable: 0,
      cgstPayable: 0,
      sgstPayable: 0,
      igstPayable: 0,
      utgstPayable: 0,
      otherTaxPayable: 0,
      // Summary fields
      costOfGoodsProduced: 0,
      incomeFromIntradayTrading: 0,
    }),
    []
  );

  const [companyData, setCompanyData] =
    useState<Partial<CompanyInformationFormData>>(defaultCompanyInfo);
  const [balanceSheetData, setBalanceSheetData] = useState<
    Partial<BalanceSheetFormData>
  >(defaultBalanceSheet);
  const [manufacturingAccountData, setManufacturingAccountData] = useState<
    Partial<ManufacturingAccountFormData>
  >(defaultManufacturingAccount);
  const [financialData, setFinancialData] = useState<
    Partial<FinancialInformationFormData>
  >(defaultFinancialData);
  const [taxData, setTaxData] = useState<
    Partial<TaxComputationFormData>
  >(defaultTaxComputation);
  const [shareholdingData, setShareholdingData] = useState<
    Partial<ShareholdingFormData>
  >(defaultShareholding);
  const [tradingAccountData, setTradingAccountData] = useState<
    Partial<TradingAccountFormData>
  >(defaultTradingAccount);
  const [otherInfoData, setOtherInfoData] = useState({});
  const [scheduleHPData, setScheduleHPData] = useState({});
  const [scheduleBPData, setScheduleBPData] = useState({});
  const [scheduleDPMData, setScheduleDPMData] = useState({});
  const [scheduleDOAData, setScheduleDOAData] = useState({});
  const [scheduleDEPData, setScheduleDEPData] = useState({});
  const [scheduleDCGData, setScheduleDCGData] = useState({});
  const [scheduleESRData, setScheduleESRData] = useState({});
  const [scheduleCGData, setScheduleCGData] = useState({});
  const [schedule112AData, setSchedule112AData] = useState({});
  const [schedule115ADData, setSchedule115ADData] = useState({});
  const [scheduleVDAData, setScheduleVDAData] = useState({});
  const [scheduleOSData, setScheduleOSData] = useState({});
  const [scheduleCYLData, setScheduleCYLData] = useState({});
  const [scheduleFIData, setScheduleFIData] = useState({});
  const [scheduleLSFData, setScheduleLSFData] = useState({});
  const [scheduleUFDData, setScheduleUFDData] = useState({});
  const [scheduleICDSData, setScheduleICDSData] = useState({});
  const [schedule16AAData, setSchedule16AAData] = useState({});
  const [schedule80GData, setSchedule80GData] = useState({});
  const [schedule80GGAData, setSchedule80GGAData] = useState({});
  const [schedule80GGCData, setSchedule80GGCData] = useState({});
  const [schedule81ACData, setSchedule81ACData] = useState({});
  const [schedule81LAData, setSchedule81LAData] = useState({});
  const [schedule80IAData, setSchedule80IAData] = useState({});
  const [schedule80IBData, setSchedule80IBData] = useState({});
  const [schedule80RAData, setSchedule80RAData] = useState({});
  const [schedule80IEData, setSchedule80IEData] = useState({});
  const [schedule80PData, setSchedule80PData] = useState({});
  const [scheduleVIAData, setScheduleVIAData] = useState({});
  const [scheduleAMTData, setScheduleAMTData] = useState({});
  const [scheduleAMTCreditData, setScheduleAMTCreditData] = useState({});
  const [scheduleSIData, setScheduleSIData] = useState({});
  const [scheduleIFData, setScheduleIFData] = useState({});
  const [scheduleEXData, setScheduleEXData] = useState({});
  const [schedulePTData, setSchedulePTData] = useState({});
  const [scheduleTPSAData, setScheduleTPSAData] = useState({});
  const [schedule115TDData, setSchedule115TDData] = useState({});
  const [scheduleFSIData, setScheduleFSIData] = useState({});
  const [scheduleTRData, setScheduleTRData] = useState({});
  const [scheduleFAData, setScheduleFAData] = useState({});
  const [scheduleGSTData, setScheduleGSTData] = useState({});
  const [scheduleTIData, setScheduleTIData] = useState({});
  const [scheduleTTIData, setScheduleTTIData] = useState({});
  const [scheduleTPData, setScheduleTPData] = useState({});
  const [scheduleTDSData, setScheduleTDSData] = useState({});

  const companyFormMethods = useForm({
    resolver: zodResolver(companyInformationSchema) as any,
    mode: "onBlur",
    defaultValues: companyData as any,
  });

  const { reset: resetCompany } = companyFormMethods;

  useEffect(() => {
    resetCompany(companyData);
  }, [companyData, resetCompany]);

  const balanceSheetFormMethods = useForm({
    resolver: zodResolver(balanceSheetSchema) as any,
    mode: "onBlur",
    defaultValues: balanceSheetData as any,
  });

  const { reset: resetBalanceSheet } = balanceSheetFormMethods;

  useEffect(() => {
    resetBalanceSheet(balanceSheetData);
  }, [balanceSheetData, resetBalanceSheet]);

  const manufacturingAccountFormMethods = useForm({
    resolver: zodResolver(manufacturingAccountSchema) as any,
    mode: "onBlur",
    defaultValues: manufacturingAccountData as any,
  });

  const { reset: resetManufacturingAccount } = manufacturingAccountFormMethods;

  useEffect(() => {
    resetManufacturingAccount(manufacturingAccountData);
  }, [manufacturingAccountData, resetManufacturingAccount]);

  const tradingAccountFormMethods = useForm({
    resolver: zodResolver(tradingAccountSchema) as any,
    mode: "onBlur",
    defaultValues: tradingAccountData as any,
  });

  const { reset: resetTradingAccount } = tradingAccountFormMethods;

  useEffect(() => {
    resetTradingAccount(tradingAccountData);
  }, [tradingAccountData, resetTradingAccount]);

  const handleOtherInfoSubmit = (values: any) => {
    setOtherInfoData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "other-info") {
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

  const handleScheduleHPSubmit = (values: any) => {
    setScheduleHPData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-hp") {
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

  const handleScheduleBPSubmit = (values: any) => {
    setScheduleBPData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-bp") {
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

  const handleScheduleDPMSubmit = (values: any) => {
    setScheduleDPMData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-dpm") {
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

  const handleScheduleDOASubmit = (values: any) => {
    setScheduleDOAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-doa") {
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

  const handleScheduleDEPSubmit = (values: any) => {
    setScheduleDEPData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-dep") {
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

  const handleScheduleDCGSubmit = (values: any) => {
    setScheduleDCGData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-dcg") {
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

  const handleScheduleESRSubmit = (values: any) => {
    setScheduleESRData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-esr") {
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

  const handleScheduleCGSubmit = (values: any) => {
    setScheduleCGData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-cg") {
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

  const handleSchedule112ASubmit = (values: any) => {
    setSchedule112AData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-112a") {
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

  const handleSchedule115ADSubmit = (values: any) => {
    setSchedule115ADData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-115ad") {
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

  const handleScheduleVDASubmit = (values: any) => {
    setScheduleVDAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-vda") {
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

  const handleScheduleOSSubmit = (values: any) => {
    setScheduleOSData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-os") {
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

  const handleScheduleCYLSubmit = (values: any) => {
    setScheduleCYLData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-cyl") {
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

  const handleScheduleFISubmit = (values: any) => {
    setScheduleFIData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-fi") {
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

  const handleScheduleLSFSubmit = (values: any) => {
    setScheduleLSFData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-lsf") {
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

  const handleScheduleUFDSubmit = (values: any) => {
    setScheduleUFDData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-ufd") {
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

  const handleScheduleICDSSubmit = (values: any) => {
    setScheduleICDSData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-icds") {
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

  const handleSchedule16AASubmit = (values: any) => {
    setSchedule16AAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-16aa") {
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

  const handleSchedule80GSubmit = (values: any) => {
    setSchedule80GData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80g") {
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

  const handleSchedule80GGASubmit = (values: any) => {
    setSchedule80GGAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80gga") {
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

  const handleSchedule80GGCSubmit = (values: any) => {
    setSchedule80GGCData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80ggc") {
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

  const handleSchedule81ACSubmit = (values: any) => {
    setSchedule81ACData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-81ac") {
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

  const handleSchedule81LASubmit = (values: any) => {
    setSchedule81LAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-81la") {
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

  const handleSchedule80IASubmit = (values: any) => {
    setSchedule80IAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80ia") {
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

  const handleSchedule80IBSubmit = (values: any) => {
    setSchedule80IBData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80ib") {
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

  const handleSchedule80RASubmit = (values: any) => {
    setSchedule80RAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80ra") {
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

  const handleSchedule80IESubmit = (values: any) => {
    setSchedule80IEData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80ie") {
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

  const handleSchedule80PSubmit = (values: any) => {
    setSchedule80PData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-80p") {
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

  const handleScheduleVIASubmit = (values: any) => {
    setScheduleVIAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-via") {
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

  const handleScheduleAMTSubmit = (values: any) => {
    setScheduleAMTData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-amt") {
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

  const handleScheduleAMTCreditSubmit = (values: any) => {
    setScheduleAMTCreditData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-amt-credit") {
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

  const handleScheduleSISubmit = (values: any) => {
    setScheduleSIData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-si") {
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

  const handleScheduleIFSubmit = (values: any) => {
    setScheduleIFData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-if") {
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

  const handleScheduleEXSubmit = (values: any) => {
    setScheduleEXData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-ex") {
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

  const handleSchedulePTSubmit = (values: any) => {
    setSchedulePTData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-pt") {
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

  const handleScheduleTPSASubmit = (values: any) => {
    setScheduleTPSAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-tpsa") {
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

  const handleSchedule115TDSubmit = (values: any) => {
    setSchedule115TDData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-115td") {
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

  const handleScheduleFSISubmit = (values: any) => {
    setScheduleFSIData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-fsi") {
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

  const handleScheduleTRSubmit = (values: any) => {
    setScheduleTRData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-tr") {
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

  const handleScheduleFASubmit = (values: any) => {
    setScheduleFAData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-fa") {
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

  const handleScheduleGSTSubmit = (values: any) => {
    setScheduleGSTData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-gst") {
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

  const handleScheduleTISubmit = (values: any) => {
    setScheduleTIData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-ti") {
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

  const handleScheduleTTISubmit = (values: any) => {
    setScheduleTTIData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-tti") {
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

  const handleScheduleTPSubmit = (values: any) => {
    setScheduleTPData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-tp") {
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

  const handleScheduleTDSSubmit = (values: any) => {
    setScheduleTDSData(values);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "schedule-tds") {
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
      const stepId = ITR_SIX_PROGRESS_STEPS[index]?.id;
      if (!stepId) return;
      map[stepId] = section.status;
    });
    return map;
  }, [sections]);

  const activeStepId =
    ITR_SIX_PROGRESS_STEPS[
      Math.min(activeSectionIndex, ITR_SIX_PROGRESS_STEPS.length - 1)
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

    if (sectionId === "company-info") {
      setActiveDetailId("company-info");
      resetCompany(companyData);
    } else if (sectionId === "balance-sheet") {
      setActiveDetailId("balance-sheet");
      resetBalanceSheet(balanceSheetData);
    } else if (sectionId === "manufacturing-account") {
      setActiveDetailId("manufacturing-account");
      resetManufacturingAccount(manufacturingAccountData);
    } else if (sectionId === "trading-account") {
      setActiveDetailId("trading-account");
      resetTradingAccount(tradingAccountData);
    } else if (sectionId === "other-info") {
      setActiveDetailId("other-info");
    } else if (sectionId === "schedule-hp") {
      setActiveDetailId("schedule-hp");
    } else if (sectionId === "schedule-bp") {
      setActiveDetailId("schedule-bp");
    } else if (sectionId === "schedule-dpm") {
      setActiveDetailId("schedule-dpm");
    } else if (sectionId === "schedule-doa") {
      setActiveDetailId("schedule-doa");
    } else if (sectionId === "schedule-dep") {
      setActiveDetailId("schedule-dep");
    } else if (sectionId === "schedule-dcg") {
      setActiveDetailId("schedule-dcg");
    } else if (sectionId === "schedule-esr") {
      setActiveDetailId("schedule-esr");
    } else if (sectionId === "schedule-cg") {
      setActiveDetailId("schedule-cg");
    } else if (sectionId === "schedule-112a") {
      setActiveDetailId("schedule-112a");
    } else if (sectionId === "schedule-115ad") {
      setActiveDetailId("schedule-115ad");
    } else if (sectionId === "schedule-vda") {
      setActiveDetailId("schedule-vda");
    } else if (sectionId === "schedule-os") {
      setActiveDetailId("schedule-os");
    } else if (sectionId === "schedule-cyl") {
      setActiveDetailId("schedule-cyl");
    } else if (sectionId === "schedule-fi") {
      setActiveDetailId("schedule-fi");
    } else if (sectionId === "schedule-lsf") {
      setActiveDetailId("schedule-lsf");
    } else if (sectionId === "schedule-ufd") {
      setActiveDetailId("schedule-ufd");
    } else if (sectionId === "schedule-icds") {
      setActiveDetailId("schedule-icds");
    } else if (sectionId === "schedule-16aa") {
      setActiveDetailId("schedule-16aa");
    } else if (sectionId === "schedule-80g") {
      setActiveDetailId("schedule-80g");
    } else if (sectionId === "schedule-80gga") {
      setActiveDetailId("schedule-80gga");
    } else if (sectionId === "schedule-80ggc") {
      setActiveDetailId("schedule-80ggc");
    } else if (sectionId === "schedule-81ac") {
      setActiveDetailId("schedule-81ac");
    } else if (sectionId === "schedule-81la") {
      setActiveDetailId("schedule-81la");
    } else if (sectionId === "schedule-80ia") {
      setActiveDetailId("schedule-80ia");
    } else if (sectionId === "schedule-80ib") {
      setActiveDetailId("schedule-80ib");
    } else if (sectionId === "schedule-80ra") {
      setActiveDetailId("schedule-80ra");
    } else if (sectionId === "schedule-80ie") {
      setActiveDetailId("schedule-80ie");
    } else if (sectionId === "schedule-80p") {
      setActiveDetailId("schedule-80p");
    } else if (sectionId === "schedule-via") {
      setActiveDetailId("schedule-via");
    } else if (sectionId === "schedule-amt") {
      setActiveDetailId("schedule-amt");
    } else if (sectionId === "schedule-amt-credit") {
      setActiveDetailId("schedule-amt-credit");
    } else if (sectionId === "schedule-si") {
      setActiveDetailId("schedule-si");
    } else if (sectionId === "schedule-if") {
      setActiveDetailId("schedule-if");
    } else if (sectionId === "schedule-ex") {
      setActiveDetailId("schedule-ex");
    } else if (sectionId === "financial-info") {
      setActiveDetailId("financial-info");
    } else if (sectionId === "tax-computation") {
      setActiveDetailId("tax-computation");
    } else if (sectionId === "shareholding") {
      setActiveDetailId("shareholding");
    } else {
      setActiveDetailId(null);
    }
  };

  const handleBackToSummary = () => {
    resetCompany(companyData);
    setActiveDetailId(null);
    setSubmissionInfo(null);
    setSections((prev) =>
      ensureAtLeastOneInProgress(prev.map((section) => ({ ...section })))
    );
  };

  const handleCompanySubmit: SubmitHandler<CompanyInformationFormData> = (
    values
  ) => {
    setCompanyData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "company-info") {
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

  const handleBalanceSheetSubmit: SubmitHandler<BalanceSheetFormData> = (
    values
  ) => {
    setBalanceSheetData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "balance-sheet") {
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

  const handleManufacturingAccountSubmit: SubmitHandler<
    ManufacturingAccountFormData
  > = (values) => {
    setManufacturingAccountData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "manufacturing-account") {
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

  const handleTradingAccountSubmit: SubmitHandler<TradingAccountFormData> = (
    values
  ) => {
    setTradingAccountData(values);
    setSubmissionInfo(null);
    setSections((prev) => {
      const updated = prev.map((section) => {
        if (section.id === "trading-account") {
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

  const exportToCSV = () => {
    // Helper function to flatten nested objects
    const flattenObject = (obj: any, prefix = ''): any => {
      const flattened: any = {};
      
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          const newKey = prefix ? `${prefix}_${key}` : key;
          
          if (value === null || value === undefined) {
            flattened[newKey] = '';
          } else if (Array.isArray(value)) {
            // For arrays, create separate rows
            value.forEach((item, index) => {
              if (typeof item === 'object') {
                const itemFlattened = flattenObject(item, `${newKey}_${index + 1}`);
                Object.assign(flattened, itemFlattened);
              } else {
                flattened[`${newKey}_${index + 1}`] = item;
              }
            });
          } else if (typeof value === 'object') {
            const nestedFlattened = flattenObject(value, newKey);
            Object.assign(flattened, nestedFlattened);
          } else {
            flattened[newKey] = value;
          }
        }
      }
      
      return flattened;
    };

    // Collect all form data
    const allFormData = {
      companyInfo: companyData,
      balanceSheet: balanceSheetData,
      manufacturingAccount: manufacturingAccountData,
      tradingAccount: tradingAccountData,
      otherInfo: otherInfoData,
      scheduleHP: scheduleHPData,
      scheduleBP: scheduleBPData,
      scheduleDPM: scheduleDPMData,
      scheduleDOA: scheduleDOAData,
      scheduleDEP: scheduleDEPData,
      scheduleDCG: scheduleDCGData,
      scheduleESR: scheduleESRData,
      scheduleCG: scheduleCGData,
      schedule112A: schedule112AData,
      schedule115AD: schedule115ADData,
      scheduleVDA: scheduleVDAData,
      scheduleOS: scheduleOSData,
      scheduleCYL: scheduleCYLData,
      scheduleFI: scheduleFIData,
      scheduleLSF: scheduleLSFData,
      scheduleUFD: scheduleUFDData,
      scheduleICDS: scheduleICDSData,
      schedule16AA: schedule16AAData,
      schedule80G: schedule80GData,
      schedule80GGA: schedule80GGAData,
      schedule80GGC: schedule80GGCData,
      schedule81AC: schedule81ACData,
      schedule81LA: schedule81LAData,
      schedule80IA: schedule80IAData,
      schedule80IB: schedule80IBData,
      schedule80RA: schedule80RAData,
      schedule80IE: schedule80IEData,
      schedule80P: schedule80PData,
      scheduleVIA: scheduleVIAData,
      scheduleAMT: scheduleAMTData,
      scheduleAMTCredit: scheduleAMTCreditData,
      scheduleSI: scheduleSIData,
      scheduleIF: scheduleIFData,
      scheduleEX: scheduleEXData,
      schedulePT: schedulePTData,
      scheduleTPSA: scheduleTPSAData,
      schedule115TD: schedule115TDData,
      scheduleFSI: scheduleFSIData,
      scheduleTR: scheduleTRData,
      scheduleFA: scheduleFAData,
      scheduleGST: scheduleGSTData,
      scheduleTI: scheduleTIData,
      scheduleTTI: scheduleTTIData,
      scheduleTP: scheduleTPData,
      scheduleTDS: scheduleTDSData,
      financial: financialData,
      taxComputation: taxData,
      shareholding: shareholdingData,
    };

    // Flatten the form data
    const flatData = flattenObject(allFormData);
    
    // Convert to CSV format
    const headers = Object.keys(flatData);
    const values = Object.values(flatData);
    
    // Create CSV content
    let csvContent = 'Field,Value\n';
    headers.forEach((header, index) => {
      const value = String(values[index]).replace(/"/g, '""'); // Escape quotes
      csvContent += `"${header}","${value}"\n`;
    });
    
    // Create and download the file
    const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ITR6_${new Date().toISOString().split('T')[0]}.csv`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('ITR-6 data exported to CSV successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Income Tax Return - ITR-6
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                For companies other than companies claiming exemption under section 11
              </p>
            </div>
            <div className="rounded-lg bg-blue-100 px-4 py-2">
              <span className="text-sm font-medium text-blue-800">
                AY {companyData.assessmentYear || "2025-26"}
              </span>
            </div>
          </div>

          <ITR6Progress
            steps={ITR_SIX_PROGRESS_STEPS}
            activeStepId={activeStepId}
            stepStatusMap={stepStatusMap}
          />
        </div>

        {activeDetailId === null && !submissionInfo && (
          <div className="space-y-6">
            <ITR6Entry
              sections={sections}
              activeSectionId={activeSectionId}
              onSectionSelect={handleSectionSelect}
            />

            {allSectionsCompleted && (
              <div className="rounded-2xl border-2 border-green-300 bg-white p-8 shadow-lg">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    All Sections Completed!
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Review your information and submit your ITR-6
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={exportToCSV}
                      className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
                    >
                      📥 Export to CSV
                    </button>
                    <button
                      onClick={handleFinalSubmit}
                      className="rounded-lg bg-green-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-green-700"
                    >
                      Submit ITR-6
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeDetailId === "company-info" && (
          <CompanyInformation
            form={companyFormMethods}
            onSubmit={handleCompanySubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "balance-sheet" && (
          <BalanceSheet
            form={balanceSheetFormMethods}
            onSubmit={handleBalanceSheetSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "manufacturing-account" && (
          <ManufacturingAccount
            form={manufacturingAccountFormMethods}
            onSubmit={handleManufacturingAccountSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "trading-account" && (
          <TradingAccount
            form={tradingAccountFormMethods}
            onSubmit={handleTradingAccountSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "other-info" && (
          <OtherInfo
            form={useForm()}
            onSubmit={handleOtherInfoSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-hp" && (
          <ScheduleHP
            form={useForm()}
            onSubmit={handleScheduleHPSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-bp" && (
          <ScheduleBP
            form={useForm()}
            onSubmit={handleScheduleBPSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-dpm" && (
          <ScheduleDPM
            form={useForm()}
            onSubmit={handleScheduleDPMSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-doa" && (
          <ScheduleDOA
            form={useForm()}
            onSubmit={handleScheduleDOASubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-dep" && (
          <ScheduleDEP
            form={useForm()}
            onSubmit={handleScheduleDEPSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-dcg" && (
          <ScheduleDCG
            form={useForm()}
            onSubmit={handleScheduleDCGSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-esr" && (
          <ScheduleESR
            form={useForm()}
            onSubmit={handleScheduleESRSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-cg" && (
          <ScheduleCG
            form={useForm()}
            onSubmit={handleScheduleCGSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-112a" && (
          <Schedule112A
            form={useForm()}
            onSubmit={handleSchedule112ASubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-115ad" && (
          <Schedule115AD
            form={useForm()}
            onSubmit={handleSchedule115ADSubmit}
            onCancel={handleBackToSummary}
          />
        )}

        {activeDetailId === "schedule-vda" && (
          <ScheduleVDA
            form={useForm()}
            onSubmit={handleScheduleVDASubmit}
            onCancel={handleBackToSummary}
          />
        )}

      {activeDetailId === "schedule-os" && (
        <ScheduleOS
          form={useForm()}
          onSubmit={handleScheduleOSSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-cyl" && (
        <ScheduleCYL
          form={useForm()}
          onSubmit={handleScheduleCYLSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-fi" && (
        <ScheduleFI
          form={useForm()}
          onSubmit={handleScheduleFISubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-lsf" && (
        <ScheduleLSF
          form={useForm()}
          onSubmit={handleScheduleLSFSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-ufd" && (
        <ScheduleUFD
          form={useForm()}
          onSubmit={handleScheduleUFDSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-icds" && (
        <ScheduleICDS
          form={useForm()}
          onSubmit={handleScheduleICDSSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-16aa" && (
        <Schedule16AA
          form={useForm()}
          onSubmit={handleSchedule16AASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80g" && (
        <Schedule80G
          form={useForm()}
          onSubmit={handleSchedule80GSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80gga" && (
        <Schedule80GGA
          form={useForm()}
          onSubmit={handleSchedule80GGASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80ggc" && (
        <Schedule80GGC
          form={useForm()}
          onSubmit={handleSchedule80GGCSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-81ac" && (
        <Schedule81AC
          form={useForm()}
          onSubmit={handleSchedule81ACSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-81la" && (
        <Schedule81LA
          form={useForm()}
          onSubmit={handleSchedule81LASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80ia" && (
        <Schedule80IA
          form={useForm()}
          onSubmit={handleSchedule80IASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80ib" && (
        <Schedule80IB
          form={useForm()}
          onSubmit={handleSchedule80IBSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80ra" && (
        <Schedule80RA
          form={useForm()}
          onSubmit={handleSchedule80RASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80ie" && (
        <Schedule80IE
          form={useForm()}
          onSubmit={handleSchedule80IESubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-80p" && (
        <Schedule80P
          form={useForm()}
          onSubmit={handleSchedule80PSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-via" && (
        <ScheduleVIA
          form={useForm()}
          onSubmit={handleScheduleVIASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-amt" && (
        <ScheduleAMT
          form={useForm()}
          onSubmit={handleScheduleAMTSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-amt-credit" && (
        <ScheduleAMTCredit
          form={useForm()}
          onSubmit={handleScheduleAMTCreditSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-si" && (
        <ScheduleSI
          form={useForm()}
          onSubmit={handleScheduleSISubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-if" && (
        <ScheduleIF
          form={useForm()}
          onSubmit={handleScheduleIFSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-ex" && (
        <ScheduleEX
          form={useForm()}
          onSubmit={handleScheduleEXSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-pt" && (
        <SchedulePT
          form={useForm()}
          onSubmit={handleSchedulePTSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-tpsa" && (
        <ScheduleTPSA
          form={useForm()}
          onSubmit={handleScheduleTPSASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-115td" && (
        <Schedule115TD
          form={useForm()}
          onSubmit={handleSchedule115TDSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-fsi" && (
        <ScheduleFSI
          form={useForm()}
          onSubmit={handleScheduleFSISubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-tr" && (
        <ScheduleTR
          form={useForm()}
          onSubmit={handleScheduleTRSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-fa" && (
        <ScheduleFA
          form={useForm()}
          onSubmit={handleScheduleFASubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-gst" && (
        <ScheduleGST
          form={useForm()}
          onSubmit={handleScheduleGSTSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-ti" && (
        <ScheduleTI
          form={useForm()}
          onSubmit={handleScheduleTISubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-tti" && (
        <ScheduleTTI
          form={useForm()}
          onSubmit={handleScheduleTTISubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-tp" && (
        <ScheduleTP
          form={useForm()}
          onSubmit={handleScheduleTPSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "schedule-tds" && (
        <ScheduleTDS
          form={useForm()}
          onSubmit={handleScheduleTDSSubmit}
          onCancel={handleBackToSummary}
        />
      )}

      {activeDetailId === "financial-info" && (
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Step 2
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Financial Information
                </h2>
                <p className="text-sm text-gray-600">
                  Coming soon - Revenue, expenses, and profit details
                </p>
              </div>
              <button
                onClick={handleBackToSummary}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Back to summary
              </button>
            </div>
          </div>
        )}

        {activeDetailId === "tax-computation" && (
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Step 3
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Tax Computation
                </h2>
                <p className="text-sm text-gray-600">
                  Coming soon - Tax calculations and payments
                </p>
              </div>
              <button
                onClick={handleBackToSummary}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Back to summary
              </button>
            </div>
          </div>
        )}

        {activeDetailId === "shareholding" && (
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Step 4
                </p>
                <h2 className="text-2xl font-bold text-gray-900">
                  Shareholding Pattern
                </h2>
                <p className="text-sm text-gray-600">
                  Coming soon - Directors and shareholders details
                </p>
              </div>
              <button
                onClick={handleBackToSummary}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Back to summary
              </button>
            </div>
          </div>
        )}

        {submissionInfo && (
          <div className="rounded-2xl border-2 border-green-400 bg-white p-10 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="mb-3 text-3xl font-bold text-gray-900">
                ITR-6 Successfully Submitted!
              </h2>
              <p className="mb-6 text-lg text-gray-600">
                Your Income Tax Return has been processed
              </p>
              <div className="mx-auto mb-8 max-w-md space-y-4 rounded-lg bg-gray-50 p-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Acknowledgement Number
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {submissionInfo.acknowledgementNo}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Submitted On
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {submissionInfo.submittedAt.toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSubmissionInfo(null);
                  setSections(ITR_SIX_SUMMARY_SECTIONS.map((s) => ({ ...s })));
                  setCompanyData(defaultCompanyInfo);
                  setFinancialData(defaultFinancialData);
                  setTaxData(defaultTaxComputation);
                  setShareholdingData(defaultShareholding);
                }}
                className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-blue-700"
              >
                File Another Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItrSix;
