export const COMPANY_TYPES = [
  { value: "domestic", label: "Domestic Company" },
  { value: "foreign", label: "Foreign Company" }
];

export const FILING_STATUS_OPTIONS = [
  { value: "139(1)", label: "139(1) - On or Before due date" },
  { value: "139(4)", label: "139(4) - After due date" },
  { value: "139(5)", label: "139(5) - Revised Return" },
  { value: "92CD", label: "92CD - Modified return" },
  { value: "119(2)(b)", label: "119(2)(b) - After condonation of delay" },
  { value: "92E", label: "92E - After order by the AO/CIT(A)/tribunal/court" }
];

export const RETURN_TYPE_OPTIONS = [
  { value: "original", label: "Original Return" },
  { value: "revised", label: "Revised Return" },
  { value: "defective", label: "Defective/Modified Return" }
];

export const RESIDENTIAL_STATUS_OPTIONS = [
  { value: "resident", label: "Resident" },
  { value: "non-resident", label: "Non-Resident" }
];

export const NATURE_OF_COMPANY_OPTIONS = [
  { value: "public_sector", label: "Public sector company as defined in section 2(36A)" },
  { value: "rbi_owned", label: "Company owned by the Reserve Bank of India" },
  { value: "govt_owned", label: "Company in which not less than forty percent shares are held by Government or Reserve Bank of India or a corporation owned by that Bank" },
  { value: "banking", label: "Banking company as defined in clause (c) of section 5 of the Banking Regulation Act, 1949" },
  { value: "scheduled_bank", label: "Scheduled Bank being a bank included in the Second Schedule to the Reserve Bank of India Act" },
  { value: "insurance", label: "Company registered with Insurance Regulatory and Development Authority established under sub-section (1) of section 3 of the Insurance Regulatory and Development Authority Act, 1999" },
  { value: "nbfc", label: "Company being a non-banking Financial Institution" },
  { value: "unlisted", label: "Company is unlisted" }
];

export const AUDIT_SECTION_OPTIONS = [
  { value: "44AB", label: "44AB - Tax Audit" },
  { value: "44AB_sales", label: "Sales/turnover/gross receipts exceeds limits under 44AB" },
  { value: "44AB_presumptive", label: "44AB but not offering income on presumptive basis" },
  { value: "44BBB_presumptive", label: "44BBB but not offering income on presumptive basis" },
  { value: "44BBB_others", label: "Others" }
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];
