import { ItrTwoSection } from "./itr-two.types.ts";

export const ITR_TWO_SECTIONS: ItrTwoSection[] = [
  {
    id: "part-a-general",
    title: "Part A - General Information",
    description:
      "Personal details, PAN, Aadhaar, Contact, Address, Filing Status",
    status: "in-progress",
    weight: 3,
  },
  {
    id: "schedule-s",
    title: "Schedule S - Salary Details",
    description: "Salary income from all employers with Form 16 details",
    status: "pending",
    weight: 2,
  },
  {
    id: "house-property",
    title: "House Property",
    description:
      "Income from house property - Self-occupied, Let-out, Deemed let-out",
    status: "pending",
    weight: 2,
  },
  {
    id: "cg",
    title: "Capital Gains (CG)",
    description: "Short-term and Long-term capital gains from sale of assets",
    status: "pending",
    weight: 2,
  },
  {
    id: "schedule-112a",
    title: "Schedule 112A",
    description: "Long Term Capital Gains on listed equity shares u/s 112A",
    status: "pending",
    weight: 1,
  },
  {
    id: "schedule-115ad",
    title: "Schedule 115AD(1)(iii)",
    description: "Income of FIIs from securities",
    status: "pending",
    weight: 1,
  },
  {
    id: "vda",
    title: "VDA - Virtual Digital Assets",
    description: "Income from transfer of Virtual Digital Assets (Crypto)",
    status: "pending",
    weight: 1,
  },
  {
    id: "os",
    title: "OS - Other Sources",
    description: "Interest, Dividend, and other miscellaneous income",
    status: "pending",
    weight: 2,
  },
  {
    id: "cyla-bfla",
    title: "CYLA - Current Year Loss Adjustment",
    description: "Set-off of current year losses",
    status: "pending",
    weight: 1,
  },
  {
    id: "cfl",
    title: "CFL - Carried Forward Losses",
    description: "Brought forward losses from previous years",
    status: "pending",
    weight: 1,
  },
  {
    id: "80c",
    title: "80C - Investment Deductions",
    description: "LIC, PPF, ELSS, NSC, Home Loan Principal, Tuition Fees",
    status: "pending",
    weight: 2,
  },
  {
    id: "80g",
    title: "80G - Donations",
    description: "Donations to charitable institutions and relief funds",
    status: "pending",
    weight: 1,
  },
  {
    id: "80d",
    title: "80D - Medical Insurance",
    description: "Health insurance premiums for self, family, and parents",
    status: "pending",
    weight: 1,
  },
  {
    id: "80gga",
    title: "80GGA - Scientific Research Donations",
    description: "Donations for scientific research or rural development",
    status: "pending",
    weight: 1,
  },
  {
    id: "80e-loans",
    title: "80E/EE/EEA/EEB - Loan Interest",
    description: "Education, Home, Electric Vehicle loan interest deductions",
    status: "pending",
    weight: 1,
  },
  {
    id: "other-80",
    title: "Other Chapter VI-A Deductions",
    description: "80TTA, 80TTB, 80GG, 80GGC, 80CCH, etc.",
    status: "pending",
    weight: 1,
  },
  {
    id: "vi-a",
    title: "Chapter VI-A Summary",
    description: "Total deductions under Chapter VI-A",
    status: "pending",
    weight: 1,
  },
  {
    id: "80u-80dd",
    title: "80U/80DD - Disability Deductions",
    description: "Deductions for persons with disability and dependents",
    status: "pending",
    weight: 1,
  },
  {
    id: "80ggc",
    title: "80GGC - Political Contributions",
    description: "Contributions to political parties",
    status: "pending",
    weight: 1,
  },
  {
    id: "spi-si",
    title: "SPI/SI - Special Income",
    description: "Income chargeable to tax at special rates",
    status: "pending",
    weight: 1,
  },
  {
    id: "amt",
    title: "AMT - Alternate Minimum Tax",
    description: "Computation of Alternate Minimum Tax",
    status: "pending",
    weight: 1,
  },
  {
    id: "amtc",
    title: "AMTC - AMT Credit",
    description: "AMT Credit available for set-off",
    status: "pending",
    weight: 1,
  },
  {
    id: "ei",
    title: "EI - Exempt Income",
    description: "Income not chargeable to tax",
    status: "pending",
    weight: 1,
  },
  {
    id: "pti",
    title: "PTI - Pass Through Income",
    description: "Income from business trusts",
    status: "pending",
    weight: 1,
  },
  {
    id: "fsi",
    title: "FSI - Foreign Source Income",
    description: "Income earned from outside India",
    status: "pending",
    weight: 1,
  },
  {
    id: "tr-fa",
    title: "TR/FA - Tax Relief & Foreign Assets",
    description: "Foreign tax credit and foreign asset details",
    status: "pending",
    weight: 1,
  },
  {
    id: "sch-5a",
    title: "Schedule 5A - Tax Payments",
    description:
      "Details of taxes paid - TDS, TCS, Advance Tax, Self-Assessment",
    status: "pending",
    weight: 2,
  },
  {
    id: "al",
    title: "AL - Agricultural Land",
    description: "Details of agricultural land held",
    status: "pending",
    weight: 1,
  },
  {
    id: "part-b-ti",
    title: "Part B-TI - Computation of Total Income",
    description: "Total income computation and taxable total income",
    status: "pending",
    weight: 2,
  },
  {
    id: "it",
    title: "IT - Income Tax Computation",
    description:
      "Tax calculation, rebate u/s 87A, cess, and final tax liability",
    status: "pending",
    weight: 2,
  },
  {
    id: "esop",
    title: "ESOP - Employee Stock Options",
    description: "Details of ESOPs and RSUs",
    status: "pending",
    weight: 1,
  },
  {
    id: "tds",
    title: "TDS - Tax Deducted at Source",
    description: "TDS details from Form 16, 16A, 26AS, and AIS",
    status: "pending",
    weight: 2,
  },
  {
    id: "verification",
    title: "Verification",
    description: "Final verification and declaration",
    status: "pending",
    weight: 1,
  },
];

export const TOTAL_WEIGHT = ITR_TWO_SECTIONS.reduce(
  (sum, section) => sum + section.weight,
  0
);

export const calculateCompletionPercentage = (
  sections: ItrTwoSection[]
): number => {
  const completedWeight = sections
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.weight, 0);

  return Math.round((completedWeight / TOTAL_WEIGHT) * 100);
};

export const getNextPendingSection = (
  sections: ItrTwoSection[]
): ItrTwoSection | null => {
  return (
    sections.find(
      (s) => s.status === "pending" || s.status === "in-progress"
    ) || null
  );
}