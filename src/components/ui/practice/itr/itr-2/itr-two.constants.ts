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
    id: "80gga",
    title: "80GGA - Scientific Research Donations",
    description: "Donations for scientific research or rural development",
    status: "pending",
    weight: 1,
  },
  {
    id: "80ggc",
    title: "80GGC - Political Contributions",
    description:
      "Contributions to political parties (non-cash eligible for deduction)",
    status: "pending",
    weight: 1,
  },
  {
    id: "80dd",
    title: "80DD - Dependent Disability Deduction",
    description:
      "Maintenance including medical treatment of a dependent with disability (₹75k / ₹1.25L)",
    status: "pending",
    weight: 1,
  },
  {
    id: "80u",
    title: "80U - Self Disability Deduction",
    description:
      "Deduction for self with disability/severe disability (₹75k / ₹1.25L)",
    status: "pending",
    weight: 1,
  },
  {
    id: "amt",
    title: "AMT - Alternate Minimum Tax",
    description: "Computation of AMT payable under section 115JC",
    status: "pending",
    weight: 1,
  },
  {
    id: "amtc",
    title: "AMTC - AMT Credit",
    description:
      "Computation of AMT credit available and carried forward under section 115JD",
    status: "pending",
    weight: 1,
  },
  {
    id: "si",
    title: "Schedule SI - Special Rates",
    description:
      "Income chargeable to tax at special rates (e.g. 111A, 112A, 115BBE, 115BBH, winnings, patent, pass-through)",
    status: "pending",
    weight: 2,
  },
  {
    id: "ei",
    title: "Schedule EI - Exempt Income",
    description:
      "Details of Exempt Income - Interest, Agricultural income, Other exempt income, DTAA income, Pass through income",
    status: "pending",
    weight: 2,
  },
  {
    id: "pti",
    title: "Schedule PTI - Pass Through Income",
    description:
      "Pass Through Income details from business trust or investment fund as per section 115U, 115UA and 115UB",
    status: "pending",
    weight: 2,
  },
  {
    id: "fsi",
    title: "Schedule FSI - Foreign Source Income",
    description:
      "Details of Income from outside India and tax relief (available only for residents)",
    status: "pending",
    weight: 2,
  },
  {
    id: "tr",
    title: "Schedule TR - Tax Relief",
    description:
      "Summary of tax relief claimed for taxes paid outside India (sections 90, 90A, 91)",
    status: "pending",
    weight: 2,
  },
  {
    id: "fa",
    title: "Schedule FA - Foreign Assets",
    description:
      "Details of Foreign Assets and Income from any source outside India (Depository, Custodial, Equity, Property, Trusts, etc.)",
    status: "pending",
    weight: 3,
  },
  {
    id: "5a",
    title: "Schedule 5A - Apportionment of Income",
    description:
      "Apportionment of income between spouses governed by Portuguese Civil Code",
    status: "pending",
    weight: 1,
  },
  {
    id: "al",
    title: "Schedule AL - Assets and Liabilities",
    description:
      "Assets and Liabilities at the end of the year (applicable where total income exceeds Rs. 1 Crore)",
    status: "pending",
    weight: 2,
  },
  {
    id: "part3-tti",
    title: "Part B-TTI - Tax Liability Computation",
    description:
      "Computation of tax liability on total income including surcharge, cess, rebates, advance tax, TDS, TCS, and refund calculation",
    status: "pending",
    weight: 3,
  },
  {
    id: "tax-payments",
    title: "Tax Payments & Verification",
    description:
      "Details of advance tax, TDS, TCS payments and final verification with signature",
    status: "pending",
    weight: 2,
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
};
