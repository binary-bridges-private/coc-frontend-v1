import React, { useState, useMemo, useEffect } from "react";
import ItrThreeProgress from "./components/itr-three-progress.tsx";
import ItrThreeEntry, {
  ItrThreeSection,
  SectionStatus,
} from "./components/itr-three-entry.tsx";
import ItrThreePartAGeneral, {
  PartAGeneralFormData,
} from "./components/itr-three-part-a-general.tsx";
import ItrThreePartABS, {
  PartABSFormData,
} from "./components/itr-three-part-a-bs.tsx";
import ItrThreePartAManufacturing, {
  ManufacturingFormData,
} from "./components/itr-three-part-a-manufacturing.tsx";
import ItrThreePartAPL, {
  PLFormData,
} from "./components/itr-three-part-a-pl.tsx";
import ItrThreePartAOI, {
  OIFormData,
} from "./components/itr-three-part-a-oi.tsx";
import ItrThreePartAQD, {
  QDFormData,
} from "./components/itr-three-part-a-qd.tsx";
import ItrThreeScheduleS, {
  ScheduleSFormData,
} from "./components/itr-three-schedule-s.tsx";
import ItrThreeScheduleHP, {
  ScheduleHPFormData,
} from "./components/itr-three-schedule-hp.tsx";
import ItrThreeScheduleBP, {
  ScheduleBPFormData,
} from "./components/itr-three-schedule-bp.tsx";
import ItrThreeScheduleDFM, {
  ScheduleDFMFormData,
} from "./components/itr-three-schedule-dfm.tsx";
import ItrThreeScheduleDPA, {
  ScheduleDPAFormData,
} from "./components/itr-three-schedule-dpa.tsx";
import ItrThreeScheduleDER, {
  ScheduleDERFormData,
} from "./components/itr-three-schedule-der.tsx";
import ItrThreeScheduleDCG, {
  ScheduleDCGFormData,
} from "./components/itr-three-schedule-dcg.tsx";
import ItrThreeScheduleESR, {
  ScheduleESRFormData,
} from "./components/itr-three-schedule-esr.tsx";
import ItrThreeScheduleCG, {
  ScheduleCGFormData,
} from "./components/itr-three-schedule-cg.tsx";
import ItrThreeSchedule112A, {
  Schedule112AFormData,
} from "./components/itr-three-schedule-112a.tsx";
import ItrThreeSchedule115AD, {
  Schedule115ADFormData,
} from "./components/itr-three-schedule-115ad.tsx";
import ItrThreeScheduleVDA, {
  ScheduleVDAFormData,
} from "./components/itr-three-schedule-vda.tsx";
import ItrThreeScheduleOS, {
  ScheduleOSFormData,
} from "./itr-three-schedule-os.tsx";
import ItrThreeScheduleCYLA, {
  ScheduleCYLAFormData,
} from "./itr-three-schedule-cyla.tsx";
import ItrThreeScheduleBFLA, {
  ScheduleBFLAFormData,
} from "./itr-three-schedule-bfla.tsx";
import ItrThreeScheduleUD, {
  ScheduleUDFormData,
} from "./itr-three-schedule-ud.tsx";
import ItrThreeScheduleICDS, {
  ScheduleICDSFormData,
} from "./itr-three-schedule-icds.tsx";
import ItrThreeSchedule10AA, {
  Schedule10AAFormData,
} from "./itr-three-schedule-10aa.tsx";
import ItrThreeSchedule80G, {
  Schedule80GFormData,
} from "./itr-three-schedule-80g.tsx";
import ItrThreeSchedule80GGA, {
  Schedule80GGAFormData,
} from "./itr-three-schedule-80gga.tsx";
import ItrThreeSchedule80GCC, {
  Schedule80GCCFormData,
} from "./itr-three-schedule-80gcc.tsx";
import ItrThreeSchedule80DD, {
  Schedule80DDFormData,
} from "./itr-three-schedule-80dd.tsx";
import ItrThreeSchedule80U, {
  Schedule80UFormData,
} from "./itr-three-schedule-80u.tsx";
import ItrThreeSchedule9A, {
  Schedule9AFormData,
} from "./itr-three-schedule-9a.tsx";
import ItrThreeSchedule80IA, {
  Schedule80IAFormData,
} from "./itr-three-schedule-80ia.tsx";
import ItrThreeSchedule80IB, {
  Schedule80IBFormData,
} from "./itr-three-schedule-80ib.tsx";
import ItrThreeSchedule80IE, {
  Schedule80IEFormData,
} from "./itr-three-schedule-80ie.tsx";
import ItrThreeSchedulePartB, {
  SchedulePartBFormData,
} from "./itr-three-schedule-partb.tsx";
import ItrThreeScheduleAMT, {
  ScheduleAMTFormData,
} from "./itr-three-schedule-amt.tsx";
import ItrThreeScheduleAMTC, {
  ScheduleAMTCFormData,
} from "./itr-three-schedule-amtc.tsx";
import ItrThreeScheduleSPI, {
  ScheduleSPIFormData,
} from "./itr-three-schedule-spi.tsx";
import ItrThreeScheduleSI, {
  ScheduleSIFormData,
} from "./itr-three-schedule-si.tsx";
import ItrThreeScheduleIP, {
  ScheduleIPFormData,
} from "./itr-three-schedule-ip.tsx";
import ItrThreeScheduleEI, {
  ScheduleEIFormData,
} from "./itr-three-schedule-ei.tsx";
import ItrThreeSchedulePTI, {
  SchedulePTIFormData,
} from "./itr-three-schedule-pti.tsx";
import ItrThreeScheduleFSI, {
  ScheduleFSIFormData,
} from "./itr-three-schedule-fsi.tsx";
import ItrThreeScheduleTR, {
  ScheduleTRFormData,
} from "./itr-three-schedule-tr.tsx";
import ItrThreeScheduleFA, {
  ScheduleFAFormData,
} from "./itr-three-schedule-fa.tsx";
import ItrThreeScheduleSA, {
  ScheduleSAFormData,
} from "./itr-three-schedule-sa.tsx";
import ItrThreeScheduleAL, {
  ScheduleALFormData,
} from "./itr-three-schedule-al.tsx";
import ItrThreeScheduleFAS, {
  ScheduleFASFormData,
} from "./itr-three-schedule-fas.tsx";
import ItrThreeScheduleTDS, {
  ScheduleTDSFormData,
} from "./itr-three-schedule-tds.tsx";
import ItrThreeScheduleIS, {
  ScheduleISFormData,
} from "./itr-three-schedule-is.tsx";
import ItrThreeScheduleBC, {
  ScheduleBCFormData,
} from "./itr-three-schedule-bc.tsx";
import ItrThreeScheduleTP, {
  ScheduleTPFormData,
} from "./itr-three-schedule-tp.tsx";
import ItrThreeScheduleVER, {
  ScheduleVERFormData,
} from "./itr-three-schedule-ver.tsx";

const ITR_THREE_SECTIONS: ItrThreeSection[] = [
  {
    id: "part-a-general",
    title: "Part A - General Information",
    description:
      "Personal details, address, contact information, and audit information",
    status: "in-progress",
  },
  {
    id: "part-a-bs",
    title: "Part A-BS - Balance Sheet",
    description: "Balance sheet as on 31st day of March, 2025",
    status: "not-started",
  },
  {
    id: "part-a-manufacturing",
    title: "Part A - Manufacturing Account",
    description: "Manufacturing Account for financial year 2024-25",
    status: "not-started",
  },
  {
    id: "part-a-pl",
    title: "Part A - Profit and Loss Account",
    description: "Profit and Loss Account for financial year 2024-25",
    status: "not-started",
  },
  {
    id: "part-a-oi",
    title: "Part A-OI - Other Information",
    description: "Other Information and mandatory disclosures as per ITR-3",
    status: "not-started",
  },
  {
    id: "part-a-qd",
    title: "Part A-QD - Quantitative Details",
    description: "Quantitative details of trading/manufacturing items",
    status: "not-started",
  },
  {
    id: "schedule-s",
    title: "Schedule S - Income from Salary",
    description: "Details of income from salary",
    status: "not-started",
  },
  {
    id: "schedule-hp",
    title: "Schedule HP - Income from House Property",
    description: "Details of income from house property",
    status: "not-started",
  },
  {
    id: "schedule-bp",
    title: "Schedule BP - Computation of Income from Business",
    description: "Computation of income from business or profession",
    status: "not-started",
  },
  {
    id: "schedule-dfm",
    title: "Schedule DFM - Depreciation on Plant & Machinery",
    description: "Depreciation at rates 15%, 30%, 40%, 45%",
    status: "not-started",
  },
  {
    id: "schedule-dpa",
    title: "Schedule DPA - Depreciation on Other Assets",
    description: "Depreciation on land, buildings, tangibles, ships",
    status: "not-started",
  },
  {
    id: "schedule-der",
    title: "Schedule DER - Summary of Depreciation on Other Assets",
    description: "Summary of depreciation on assets",
    status: "not-started",
  },
  {
    id: "schedule-dcg",
    title: "Schedule DCG - Deemed Capital Gains",
    description: "Deemed capital gains on sale of depreciable assets",
    status: "not-started",
  },
  {
    id: "schedule-esr",
    title: "Schedule ESR - Scientific Research Expenditure",
    description: "Deduction under section 35, 35CCC, 35CCD",
    status: "not-started",
  },
  {
    id: "schedule-cg",
    title: "Schedule CG - Capital Gains",
    description: "Computation of capital gains/losses from asset sales",
    status: "not-started",
  },
  {
    id: "schedule-112a",
    title: "Schedule 112A - Equity Shares with STT",
    description: "Detailed equity share transactions (Section 112A) with indexation benefit",
    status: "not-started",
  },
  {
    id: "schedule-115ad",
    title: "Schedule 115AD - Non-Residents Equity",
    description: "Non-residents equity share sales under Section 115AD(1)(b)(iii)",
    status: "not-started",
  },
  {
    id: "schedule-vda",
    title: "Schedule VDA - Virtual Digital Assets",
    description: "Income from transfer of Virtual Digital Assets (taxable @ 30%)",
    status: "not-started",
  },
  {
    id: "schedule-os",
    title: "Schedule OS - Income from Other Sources",
    description: "Income from dividends, interest, rental income, and other sources at normal and special rates",
    status: "not-started",
  },
  {
    id: "schedule-cyla",
    title: "Schedule CYL(A) - Current Year Loss Set-off",
    description: "Details of income after set-off of current years losses",
    status: "not-started",
  },
  {
    id: "schedule-bfla",
    title: "Schedule BFL(A) - Brought Forward Losses",
    description: "Brought forward losses of earlier years",
    status: "not-started",
  },
  {
    id: "schedule-ud",
    title: "Schedule UD - Unabsorbed Depreciation",
    description: "Unabsorbed depreciation and allowance u/s 35(4)",
    status: "not-started",
  },
  {
    id: "schedule-icds",
    title: "Schedule ICDS - Income Computation Disclosure Standards",
    description: "ICDS adjustments to profit",
    status: "not-started",
  },
  {
    id: "schedule-10aa",
    title: "Schedule 10AA - Deduction u/s 10AA",
    description: "Deduction for Special Economic Zone undertakings",
    status: "not-started",
  },
  {
    id: "schedule-80g",
    title: "Schedule 80G - Donations for Deduction",
    description: "Details of donations entitled for 100% or 50% deduction",
    status: "not-started",
  },
  {
    id: "schedule-80gga",
    title: "Schedule 80GGA - Scientific Research Donations",
    description: "Donations for scientific research or rural development",
    status: "not-started",
  },
  {
    id: "schedule-80gcc",
    title: "Schedule 80GCC - Political Party Contributions",
    description: "Contributions to registered political parties",
    status: "not-started",
  },
  {
    id: "schedule-80dd",
    title: "Schedule 80DD - Maintenance of Dependent with Disability",
    description: "Deduction for maintenance of dependent with disability",
    status: "not-started",
  },
  {
    id: "schedule-80u",
    title: "Schedule 80U - Person with Disability Deduction",
    description: "Deduction for person with disability (self)",
    status: "not-started",
  },
  {
    id: "schedule-9a",
    title: "Schedule 9A - Donations to Research Associations",
    description: "Donations to research associations u/s 35",
    status: "not-started",
  },
  {
    id: "schedule-80ia",
    title: "Schedule 80-IA - Deduction in Respect of Profits of Undertaking",
    description: "Deduction u/s 80-IA(4)(iv) for undertakings",
    status: "not-started",
  },
  {
    id: "schedule-80ib",
    title: "Schedule 80-IB - Section 80-IB Deductions",
    description: "Deduction in respect of profits from various undertakings",
    status: "not-started",
  },
  {
    id: "schedule-80ie",
    title: "Schedule 80-IE - North-East Undertakings Deduction",
    description: "Deduction for undertakings located in North-East",
    status: "not-started",
  },
  {
    id: "schedule-partb",
    title: "Part B - Deduction in Respect of Certain Payments",
    description: "Various deductions under Chapter VI-A",
    status: "not-started",
  },
  {
    id: "schedule-amt",
    title: "Schedule AMT - Alternate Minimum Tax",
    description: "Computation of AMT liability and credit utilization",
    status: "not-started",
  },
  {
    id: "schedule-amtc",
    title: "Schedule AMTC - AMT Credit Computation",
    description: "Computation of tax credit u/s 115JD",
    status: "not-started",
  },
  {
    id: "schedule-spi",
    title: "Schedule SPI - Specified Persons Income",
    description: "Income of spouse, minor child etc. u/s 64(1A)",
    status: "not-started",
  },
  {
    id: "schedule-si",
    title: "Schedule SI - Special Income",
    description: "Income chargeable at special rates",
    status: "not-started",
  },
  {
    id: "schedule-ip",
    title: "Schedule IP - Partnership Firms Information",
    description: "Details of partnership firms",
    status: "not-started",
  },
  {
    id: "schedule-ei",
    title: "Schedule EI - Exempt Income",
    description: "Income not to be included in total income",
    status: "not-started",
  },
  {
    id: "schedule-pti",
    title: "Schedule PTI - Pass Through Income",
    description: "Pass through income from business trust or investment fund",
    status: "not-started",
  },
  {
    id: "schedule-fsi",
    title: "Schedule FSI - Foreign Source Income",
    description: "Income from outside India and tax relief details",
    status: "not-started",
  },
  {
    id: "schedule-tr",
    title: "Schedule TR - Tax Relief Summary",
    description: "Summary of tax relief claimed for taxes paid outside India",
    status: "not-started",
  },
  {
    id: "schedule-fa",
    title: "Schedule FA - Foreign Assets",
    description: "Details of foreign depository, custodial accounts, and investments",
    status: "not-started",
  },
  {
    id: "schedule-sa",
    title: "Schedule SA - Apportionment of Income between Spouses",
    description: "Income apportionment details between spouses",
    status: "not-started",
  },
  {
    id: "schedule-al",
    title: "Schedule AL - Assets and Liabilities",
    description: "Assets and liabilities not included in Balance Sheet",
    status: "not-started",
  },
  {
    id: "schedule-fas",
    title: "Schedule FAS - Summary of Foreign Assets",
    description: "Summary of foreign assets and income details",
    status: "not-started",
  },
  {
    id: "schedule-tds",
    title: "Schedule TDS - Tax Deferred ESOP",
    description: "Information related to tax deferred ESOP from eligible startups",
    status: "not-started",
  },
  {
    id: "schedule-is",
    title: "Schedule IS - Interest and Fee Payable",
    description: "Computation of interest and fees for non-compliance with filing",
    status: "not-started",
  },
  {
    id: "schedule-bc",
    title: "Schedule BC - Bank Accounts and Cash",
    description: "Details of bank accounts held in India and foreign bank accounts",
    status: "not-started",
  },
  {
    id: "schedule-tp",
    title: "Schedule TP - Tax Payments & TDS/TCS",
    description: "Details of advance tax, self-assessment tax, TDS, and TCS payments",
    status: "not-started",
  },
  {
    id: "schedule-ver",
    title: "Schedule VER - Verification & Declaration",
    description: "Final declaration, verification, and digital signature",
    status: "not-started",
  },
];

const calculateCompletionPercentage = (sections: ItrThreeSection[]): number => {
  const completedSections = sections.filter(
    (s) => s.status === "completed"
  ).length;
  return Math.round((completedSections / sections.length) * 100);
};

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

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `ITR3_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("ITR-3 data exported to CSV successfully!");
};

const ItrThree: React.FC = () => {
  const [sections, setSections] =
    useState<ItrThreeSection[]>(ITR_THREE_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    partAGeneral?: PartAGeneralFormData;
    partABS?: PartABSFormData;
    partAManufacturing?: ManufacturingFormData;
    partAPL?: PLFormData;
    partAOI?: OIFormData;
    partAQD?: QDFormData;
    scheduleS?: ScheduleSFormData;
    scheduleHP?: ScheduleHPFormData;
    scheduleBP?: ScheduleBPFormData;
    scheduleDFM?: ScheduleDFMFormData;
    scheduleDPA?: ScheduleDPAFormData;
    scheduleDER?: ScheduleDERFormData;
    scheduleDCG?: ScheduleDCGFormData;
    scheduleESR?: ScheduleESRFormData;
    scheduleCG?: ScheduleCGFormData;
    schedule112A?: Schedule112AFormData;
    schedule115AD?: Schedule115ADFormData;
    scheduleVDA?: ScheduleVDAFormData;
    scheduleOS?: ScheduleOSFormData;
    scheduleCYLA?: ScheduleCYLAFormData;
    scheduleBFLA?: ScheduleBFLAFormData;
    scheduleUD?: ScheduleUDFormData;
    scheduleICDS?: ScheduleICDSFormData;
    schedule10AA?: Schedule10AAFormData;
    schedule80G?: Schedule80GFormData;
    schedule80GGA?: Schedule80GGAFormData;
    schedule80GCC?: Schedule80GCCFormData;
    schedule80DD?: Schedule80DDFormData;
    schedule80U?: Schedule80UFormData;
    schedule9A?: Schedule9AFormData;
    schedule80IA?: Schedule80IAFormData;
    schedule80IB?: Schedule80IBFormData;
    schedule80IE?: Schedule80IEFormData;
    schedulePartB?: SchedulePartBFormData;
    scheduleAMT?: ScheduleAMTFormData;
    scheduleAMTC?: ScheduleAMTCFormData;
    scheduleSPI?: ScheduleSPIFormData;
    scheduleSI?: ScheduleSIFormData;
    scheduleIP?: ScheduleIPFormData;
    scheduleEI?: ScheduleEIFormData;
    schedulePTI?: SchedulePTIFormData;
    scheduleFSI?: ScheduleFSIFormData;
    scheduleTR?: ScheduleTRFormData;
    scheduleFA?: ScheduleFAFormData;
    scheduleSA?: ScheduleSAFormData;
    scheduleAL?: ScheduleALFormData;
    scheduleFAS?: ScheduleFASFormData;
    partB?: any;
    partC?: any;
    partD?: any;
    scheduleCFL?: any;
    scheduleIT?: any;
    scheduleTDS?: ScheduleTDSFormData;
    scheduleIS?: ScheduleISFormData;
    scheduleBC?: ScheduleBCFormData;
    scheduleTP?: ScheduleTPFormData;
    scheduleVER?: ScheduleVERFormData;
    scheduleTCS?: any;
    schedule5A?: any;
    verification?: any;
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

  const handleSectionComplete = (sectionId: string, data?: any) => {
    if (sectionId === "part-a-general" && data) {
      setFormData((prev) => ({ ...prev, partAGeneral: data }));
    }
    if (sectionId === "part-a-bs" && data) {
      setFormData((prev) => ({ ...prev, partABS: data }));
    }
    if (sectionId === "part-a-manufacturing" && data) {
      setFormData((prev) => ({ ...prev, partAManufacturing: data }));
    }
    if (sectionId === "part-a-pl" && data) {
      setFormData((prev) => ({ ...prev, partAPL: data }));
    }
    if (sectionId === "part-a-oi" && data) {
      setFormData((prev) => ({ ...prev, partAOI: data }));
    }
    if (sectionId === "part-a-qd" && data) {
      setFormData((prev) => ({ ...prev, partAQD: data }));
    }
    if (sectionId === "schedule-s" && data) {
      setFormData((prev) => ({ ...prev, scheduleS: data }));
    }
    if (sectionId === "schedule-hp" && data) {
      setFormData((prev) => ({ ...prev, scheduleHP: data }));
    }
    if (sectionId === "schedule-bp" && data) {
      setFormData((prev) => ({ ...prev, scheduleBP: data }));
    }
    if (sectionId === "schedule-cyla" && data) {
      setFormData((prev) => ({ ...prev, scheduleCYLA: data }));
    }
    if (sectionId === "schedule-bfla" && data) {
      setFormData((prev) => ({ ...prev, scheduleBFLA: data }));
    }
    if (sectionId === "schedule-ud" && data) {
      setFormData((prev) => ({ ...prev, scheduleUD: data }));
    }
    if (sectionId === "schedule-icds" && data) {
      setFormData((prev) => ({ ...prev, scheduleICDS: data }));
    }
    if (sectionId === "schedule-10aa" && data) {
      setFormData((prev) => ({ ...prev, schedule10AA: data }));
    }
    if (sectionId === "schedule-80g" && data) {
      setFormData((prev) => ({ ...prev, schedule80G: data }));
    }
    if (sectionId === "schedule-80gga" && data) {
      setFormData((prev) => ({ ...prev, schedule80GGA: data }));
    }
    if (sectionId === "schedule-80gcc" && data) {
      setFormData((prev) => ({ ...prev, schedule80GCC: data }));
    }
    if (sectionId === "schedule-80dd" && data) {
      setFormData((prev) => ({ ...prev, schedule80DD: data }));
    }
    if (sectionId === "schedule-80u" && data) {
      setFormData((prev) => ({ ...prev, schedule80U: data }));
    }
    if (sectionId === "schedule-9a" && data) {
      setFormData((prev) => ({ ...prev, schedule9A: data }));
    }
    if (sectionId === "schedule-80ia" && data) {
      setFormData((prev) => ({ ...prev, schedule80IA: data }));
    }
    if (sectionId === "schedule-80ib" && data) {
      setFormData((prev) => ({ ...prev, schedule80IB: data }));
    }
    if (sectionId === "schedule-80ie" && data) {
      setFormData((prev) => ({ ...prev, schedule80IE: data }));
    }
    if (sectionId === "schedule-partb" && data) {
      setFormData((prev) => ({ ...prev, schedulePartB: data }));
    }
    if (sectionId === "schedule-amt" && data) {
      setFormData((prev) => ({ ...prev, scheduleAMT: data }));
    }
    if (sectionId === "schedule-amtc" && data) {
      setFormData((prev) => ({ ...prev, scheduleAMTC: data }));
    }
    if (sectionId === "schedule-spi" && data) {
      setFormData((prev) => ({ ...prev, scheduleSPI: data }));
    }
    if (sectionId === "schedule-si" && data) {
      setFormData((prev) => ({ ...prev, scheduleSI: data }));
    }
    if (sectionId === "schedule-ip" && data) {
      setFormData((prev) => ({ ...prev, scheduleIP: data }));
    }
    if (sectionId === "schedule-ei" && data) {
      setFormData((prev) => ({ ...prev, scheduleEI: data }));
    }
    if (sectionId === "schedule-pti" && data) {
      setFormData((prev) => ({ ...prev, schedulePTI: data }));
    }
    if (sectionId === "schedule-fsi" && data) {
      setFormData((prev) => ({ ...prev, scheduleFSI: data }));
    }
    if (sectionId === "schedule-tr" && data) {
      setFormData((prev) => ({ ...prev, scheduleTR: data }));
    }
    if (sectionId === "schedule-fa" && data) {
      setFormData((prev) => ({ ...prev, scheduleFA: data }));
    }
    if (sectionId === "schedule-sa" && data) {
      setFormData((prev) => ({ ...prev, scheduleSA: data }));
    }
    if (sectionId === "schedule-al" && data) {
      setFormData((prev) => ({ ...prev, scheduleAL: data }));
    }
    if (sectionId === "schedule-fas" && data) {
      setFormData((prev) => ({ ...prev, scheduleFAS: data }));
    }
    if (sectionId === "schedule-tds" && data) {
      setFormData((prev) => ({ ...prev, scheduleTDS: data }));
    }
    if (sectionId === "schedule-is" && data) {
      setFormData((prev) => ({ ...prev, scheduleIS: data }));
    }
    if (sectionId === "schedule-bc" && data) {
      setFormData((prev) => ({ ...prev, scheduleBC: data }));
    }
    if (sectionId === "schedule-tp" && data) {
      setFormData((prev) => ({ ...prev, scheduleTP: data }));
    }
    if (sectionId === "schedule-ver" && data) {
      setFormData((prev) => ({ ...prev, scheduleVER: data }));
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
            ITR-3 (For Individuals and HUF with Business/Profession Income)
          </h1>
          <p className="text-sm text-gray-600">
            Assessment Year 2025-26 | Complete all sections to file your income
            tax return
          </p>
        </header>

        {/* Main Content */}
        {activeSectionId ? (
          <section id={`section-${activeSectionId}`} className="space-y-4">
            {/* Part A - General Information */}
            {activeSectionId === "part-a-general" && (
              <ItrThreePartAGeneral
                onNext={() =>
                  handleSectionComplete("part-a-general", formData.partAGeneral)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partAGeneral: data }))
                }
                initialData={formData.partAGeneral}
              />
            )}

            {/* Part A - Balance Sheet */}
            {activeSectionId === "part-a-bs" && (
              <ItrThreePartABS
                onNext={() =>
                  handleSectionComplete("part-a-bs", formData.partABS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partABS: data }))
                }
                initialData={formData.partABS}
              />
            )}

            {/* Part A - Manufacturing Account */}
            {activeSectionId === "part-a-manufacturing" && (
              <ItrThreePartAManufacturing
                onNext={() =>
                  handleSectionComplete(
                    "part-a-manufacturing",
                    formData.partAManufacturing
                  )
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partAManufacturing: data }))
                }
                initialData={formData.partAManufacturing}
              />
            )}

            {/* Part A - Profit and Loss Account */}
            {activeSectionId === "part-a-pl" && (
              <ItrThreePartAPL
                onNext={() =>
                  handleSectionComplete("part-a-pl", formData.partAPL)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partAPL: data }))
                }
                initialData={formData.partAPL}
              />
            )}

            {/* Part A-OI - Other Information */}
            {activeSectionId === "part-a-oi" && (
              <ItrThreePartAOI
                onNext={() =>
                  handleSectionComplete("part-a-oi", formData.partAOI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partAOI: data }))
                }
                initialData={formData.partAOI}
              />
            )}

            {/* Part A-QD - Quantitative Details */}
            {activeSectionId === "part-a-qd" && (
              <ItrThreePartAQD
                onNext={() =>
                  handleSectionComplete("part-a-qd", formData.partAQD)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, partAQD: data }))
                }
                initialData={formData.partAQD}
              />
            )}

            {/* Schedule S - Income from Salary */}
            {activeSectionId === "schedule-s" && (
              <ItrThreeScheduleS
                onNext={() =>
                  handleSectionComplete("schedule-s", formData.scheduleS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleS: data }))
                }
                initialData={formData.scheduleS}
              />
            )}

            {/* Schedule HP - Income from House Property */}
            {activeSectionId === "schedule-hp" && (
              <ItrThreeScheduleHP
                onNext={() =>
                  handleSectionComplete("schedule-hp", formData.scheduleHP)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleHP: data }))
                }
                initialData={formData.scheduleHP}
              />
            )}

            {/* Schedule BP - Computation of Income */}
            {activeSectionId === "schedule-bp" && (
              <ItrThreeScheduleBP
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

            {activeSectionId === "schedule-dfm" && (
              <ItrThreeScheduleDFM
                onNext={() =>
                  handleSectionComplete("schedule-dfm", formData.scheduleDFM)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleDFM: data }))
                }
                initialData={formData.scheduleDFM}
              />
            )}

            {activeSectionId === "schedule-dpa" && (
              <ItrThreeScheduleDPA
                onNext={() =>
                  handleSectionComplete("schedule-dpa", formData.scheduleDPA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleDPA: data }))
                }
                initialData={formData.scheduleDPA}
              />
            )}

            {activeSectionId === "schedule-der" && (
              <ItrThreeScheduleDER
                onNext={() =>
                  handleSectionComplete("schedule-der", formData.scheduleDER)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleDER: data }))
                }
                initialData={formData.scheduleDER}
              />
            )}

            {activeSectionId === "schedule-dcg" && (
              <ItrThreeScheduleDCG
                onNext={() =>
                  handleSectionComplete("schedule-dcg", formData.scheduleDCG)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleDCG: data }))
                }
                initialData={formData.scheduleDCG}
              />
            )}

            {activeSectionId === "schedule-esr" && (
              <ItrThreeScheduleESR
                onNext={() =>
                  handleSectionComplete("schedule-esr", formData.scheduleESR)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleESR: data }))
                }
                initialData={formData.scheduleESR}
              />
            )}

            {activeSectionId === "schedule-cg" && (
              <ItrThreeScheduleCG
                onNext={() =>
                  handleSectionComplete("schedule-cg", formData.scheduleCG)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleCG: data }))
                }
                initialData={formData.scheduleCG}
              />
            )}

            {activeSectionId === "schedule-112a" && (
              <ItrThreeSchedule112A
                onNext={() =>
                  handleSectionComplete("schedule-112a", formData.schedule112A)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule112A: data }))
                }
                initialData={formData.schedule112A}
              />
            )}

            {activeSectionId === "schedule-115ad" && (
              <ItrThreeSchedule115AD
                onNext={() =>
                  handleSectionComplete("schedule-115ad", formData.schedule115AD)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule115AD: data }))
                }
                initialData={formData.schedule115AD}
              />
            )}

            {activeSectionId === "schedule-vda" && (
              <ItrThreeScheduleVDA
                onNext={() =>
                  handleSectionComplete("schedule-vda", formData.scheduleVDA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleVDA: data }))
                }
                initialData={formData.scheduleVDA}
              />
            )}

            {activeSectionId === "schedule-os" && (
              <ItrThreeScheduleOS
                onNext={() =>
                  handleSectionComplete("schedule-os", formData.scheduleOS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleOS: data }))
                }
                initialData={formData.scheduleOS}
              />
            )}

            {activeSectionId === "schedule-cyla" && (
              <ItrThreeScheduleCYLA
                onNext={() =>
                  handleSectionComplete("schedule-cyla", formData.scheduleCYLA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleCYLA: data }))
                }
                initialData={formData.scheduleCYLA}
              />
            )}

            {activeSectionId === "schedule-bfla" && (
              <ItrThreeScheduleBFLA
                onNext={() =>
                  handleSectionComplete("schedule-bfla", formData.scheduleBFLA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleBFLA: data }))
                }
                initialData={formData.scheduleBFLA}
              />
            )}

            {activeSectionId === "schedule-ud" && (
              <ItrThreeScheduleUD
                onNext={() =>
                  handleSectionComplete("schedule-ud", formData.scheduleUD)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleUD: data }))
                }
                initialData={formData.scheduleUD}
              />
            )}

            {activeSectionId === "schedule-icds" && (
              <ItrThreeScheduleICDS
                onNext={() =>
                  handleSectionComplete("schedule-icds", formData.scheduleICDS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleICDS: data }))
                }
                initialData={formData.scheduleICDS}
              />
            )}

            {activeSectionId === "schedule-10aa" && (
              <ItrThreeSchedule10AA
                onNext={() =>
                  handleSectionComplete("schedule-10aa", formData.schedule10AA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule10AA: data }))
                }
                initialData={formData.schedule10AA}
              />
            )}

            {activeSectionId === "schedule-80g" && (
              <ItrThreeSchedule80G
                onNext={() =>
                  handleSectionComplete("schedule-80g", formData.schedule80G)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80G: data }))
                }
                initialData={formData.schedule80G}
              />
            )}

            {activeSectionId === "schedule-80gga" && (
              <ItrThreeSchedule80GGA
                onNext={() =>
                  handleSectionComplete("schedule-80gga", formData.schedule80GGA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80GGA: data }))
                }
                initialData={formData.schedule80GGA}
              />
            )}

            {activeSectionId === "schedule-80gcc" && (
              <ItrThreeSchedule80GCC
                onNext={() =>
                  handleSectionComplete("schedule-80gcc", formData.schedule80GCC)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80GCC: data }))
                }
                initialData={formData.schedule80GCC}
              />
            )}

            {activeSectionId === "schedule-80dd" && (
              <ItrThreeSchedule80DD
                onNext={() =>
                  handleSectionComplete("schedule-80dd", formData.schedule80DD)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80DD: data }))
                }
                initialData={formData.schedule80DD}
              />
            )}

            {activeSectionId === "schedule-80u" && (
              <ItrThreeSchedule80U
                onNext={() =>
                  handleSectionComplete("schedule-80u", formData.schedule80U)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80U: data }))
                }
                initialData={formData.schedule80U}
              />
            )}

            {activeSectionId === "schedule-9a" && (
              <ItrThreeSchedule9A
                onNext={() =>
                  handleSectionComplete("schedule-9a", formData.schedule9A)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule9A: data }))
                }
                initialData={formData.schedule9A}
              />
            )}

            {activeSectionId === "schedule-80ia" && (
              <ItrThreeSchedule80IA
                onNext={() =>
                  handleSectionComplete("schedule-80ia", formData.schedule80IA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80IA: data }))
                }
                initialData={formData.schedule80IA}
              />
            )}

            {activeSectionId === "schedule-80ib" && (
              <ItrThreeSchedule80IB
                onNext={() =>
                  handleSectionComplete("schedule-80ib", formData.schedule80IB)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80IB: data }))
                }
                initialData={formData.schedule80IB}
              />
            )}

            {activeSectionId === "schedule-80ie" && (
              <ItrThreeSchedule80IE
                onNext={() =>
                  handleSectionComplete("schedule-80ie", formData.schedule80IE)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedule80IE: data }))
                }
                initialData={formData.schedule80IE}
              />
            )}

            {activeSectionId === "schedule-partb" && (
              <ItrThreeSchedulePartB
                onNext={() =>
                  handleSectionComplete("schedule-partb", formData.schedulePartB)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedulePartB: data }))
                }
                initialData={formData.schedulePartB}
              />
            )}

            {activeSectionId === "schedule-amt" && (
              <ItrThreeScheduleAMT
                onNext={() =>
                  handleSectionComplete("schedule-amt", formData.scheduleAMT)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleAMT: data }))
                }
                initialData={formData.scheduleAMT}
              />
            )}

            {activeSectionId === "schedule-amtc" && (
              <ItrThreeScheduleAMTC
                onNext={() =>
                  handleSectionComplete("schedule-amtc", formData.scheduleAMTC)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleAMTC: data }))
                }
                initialData={formData.scheduleAMTC}
              />
            )}

            {activeSectionId === "schedule-spi" && (
              <ItrThreeScheduleSPI
                onNext={() =>
                  handleSectionComplete("schedule-spi", formData.scheduleSPI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleSPI: data }))
                }
                initialData={formData.scheduleSPI}
              />
            )}

            {activeSectionId === "schedule-si" && (
              <ItrThreeScheduleSI
                onNext={() =>
                  handleSectionComplete("schedule-si", formData.scheduleSI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleSI: data }))
                }
                initialData={formData.scheduleSI}
              />
            )}

            {activeSectionId === "schedule-ip" && (
              <ItrThreeScheduleIP
                onNext={() =>
                  handleSectionComplete("schedule-ip", formData.scheduleIP)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleIP: data }))
                }
                initialData={formData.scheduleIP}
              />
            )}

            {activeSectionId === "schedule-ei" && (
              <ItrThreeScheduleEI
                onNext={() =>
                  handleSectionComplete("schedule-ei", formData.scheduleEI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleEI: data }))
                }
                initialData={formData.scheduleEI}
              />
            )}

            {activeSectionId === "schedule-pti" && (
              <ItrThreeSchedulePTI
                onNext={() =>
                  handleSectionComplete("schedule-pti", formData.schedulePTI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, schedulePTI: data }))
                }
                initialData={formData.schedulePTI}
              />
            )}

            {activeSectionId === "schedule-fsi" && (
              <ItrThreeScheduleFSI
                onNext={() =>
                  handleSectionComplete("schedule-fsi", formData.scheduleFSI)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleFSI: data }))
                }
                initialData={formData.scheduleFSI}
              />
            )}

            {activeSectionId === "schedule-tr" && (
              <ItrThreeScheduleTR
                onNext={() =>
                  handleSectionComplete("schedule-tr", formData.scheduleTR)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleTR: data }))
                }
                initialData={formData.scheduleTR}
              />
            )}

            {activeSectionId === "schedule-fa" && (
              <ItrThreeScheduleFA
                onNext={() =>
                  handleSectionComplete("schedule-fa", formData.scheduleFA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleFA: data }))
                }
                initialData={formData.scheduleFA}
              />
            )}

            {activeSectionId === "schedule-sa" && (
              <ItrThreeScheduleSA
                onNext={() =>
                  handleSectionComplete("schedule-sa", formData.scheduleSA)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleSA: data }))
                }
                initialData={formData.scheduleSA}
              />
            )}

            {activeSectionId === "schedule-al" && (
              <ItrThreeScheduleAL
                onNext={() =>
                  handleSectionComplete("schedule-al", formData.scheduleAL)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleAL: data }))
                }
                initialData={formData.scheduleAL}
              />
            )}

            {activeSectionId === "schedule-fas" && (
              <ItrThreeScheduleFAS
                onNext={() =>
                  handleSectionComplete("schedule-fas", formData.scheduleFAS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleFAS: data }))
                }
                initialData={formData.scheduleFAS}
              />
            )}

            {activeSectionId === "schedule-tds" && (
              <ItrThreeScheduleTDS
                onNext={() =>
                  handleSectionComplete("schedule-tds", formData.scheduleTDS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleTDS: data }))
                }
                initialData={formData.scheduleTDS}
              />
            )}

            {activeSectionId === "schedule-is" && (
              <ItrThreeScheduleIS
                onNext={() =>
                  handleSectionComplete("schedule-is", formData.scheduleIS)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleIS: data }))
                }
                initialData={formData.scheduleIS}
              />
            )}

            {activeSectionId === "schedule-bc" && (
              <ItrThreeScheduleBC
                onNext={() =>
                  handleSectionComplete("schedule-bc", formData.scheduleBC)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleBC: data }))
                }
                initialData={formData.scheduleBC}
              />
            )}

            {activeSectionId === "schedule-tp" && (
              <ItrThreeScheduleTP
                onNext={() =>
                  handleSectionComplete("schedule-tp", formData.scheduleTP)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleTP: data }))
                }
                initialData={formData.scheduleTP}
              />
            )}

            {activeSectionId === "schedule-ver" && (
              <ItrThreeScheduleVER
                onNext={() =>
                  handleSectionComplete("schedule-ver", formData.scheduleVER)
                }
                onBack={handleBackToSummary}
                onSave={(data) =>
                  setFormData((prev) => ({ ...prev, scheduleVER: data }))
                }
                initialData={formData.scheduleVER}
              />
            )}

            {/* Placeholder for other sections */}
            {activeSectionId !== "part-a-general" &&
              activeSectionId !== "part-a-bs" &&
              activeSectionId !== "part-a-manufacturing" &&
              activeSectionId !== "part-a-pl" &&
              activeSectionId !== "part-a-oi" &&
              activeSectionId !== "part-a-qd" &&
              activeSectionId !== "schedule-s" &&
              activeSectionId !== "schedule-hp" &&
              activeSectionId !== "schedule-bp" &&
              activeSectionId !== "schedule-dfm" &&
              activeSectionId !== "schedule-dpa" &&
              activeSectionId !== "schedule-der" &&
              activeSectionId !== "schedule-dcg" &&
              activeSectionId !== "schedule-esr" &&
              activeSectionId !== "schedule-cg" &&
              activeSectionId !== "schedule-112a" &&
              activeSectionId !== "schedule-115ad" &&
              activeSectionId !== "schedule-vda" &&
              activeSectionId !== "schedule-os" &&
              activeSectionId !== "schedule-cyla" &&
              activeSectionId !== "schedule-bfla" &&
              activeSectionId !== "schedule-ud" &&
              activeSectionId !== "schedule-icds" &&
              activeSectionId !== "schedule-10aa" &&
              activeSectionId !== "schedule-80g" &&
              activeSectionId !== "schedule-80gga" &&
              activeSectionId !== "schedule-80gcc" &&
              activeSectionId !== "schedule-80dd" &&
              activeSectionId !== "schedule-80u" &&
              activeSectionId !== "schedule-9a" &&
              activeSectionId !== "schedule-80ia" &&
              activeSectionId !== "schedule-80ib" &&
              activeSectionId !== "schedule-80ie" &&
              activeSectionId !== "schedule-partb" &&
              activeSectionId !== "schedule-amt" &&
              activeSectionId !== "schedule-amtc" &&
              activeSectionId !== "schedule-spi" &&
              activeSectionId !== "schedule-si" &&
              activeSectionId !== "schedule-ip" &&
              activeSectionId !== "schedule-ei" &&
              activeSectionId !== "schedule-pti" &&
              activeSectionId !== "schedule-fsi" &&
              activeSectionId !== "schedule-tr" &&
              activeSectionId !== "schedule-fa" &&
              activeSectionId !== "schedule-sa" &&
              activeSectionId !== "schedule-al" &&
              activeSectionId !== "schedule-fas" &&
              activeSectionId !== "schedule-tds" &&
              activeSectionId !== "schedule-is" &&
              activeSectionId !== "schedule-bc" &&
              activeSectionId !== "schedule-tp" &&
              activeSectionId !== "schedule-ver" && (
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
            {/* Progress Card */}
            <ItrThreeProgress
              completionPercentage={completionPercentage}
              completedSections={completedSections}
              totalSections={sections.length}
              currentSection={currentSection}
            />

            {/* Section Selection */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold text-gray-900">
                ITR-3 Sections
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Complete all sections to file your ITR-3 return
              </p>
              <ItrThreeEntry
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
                      sections of your ITR-3 return. Review your information and
                      submit when ready.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={handleFinalSubmit}
                        className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                      >
                        Export to CSV
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

export default ItrThree;
