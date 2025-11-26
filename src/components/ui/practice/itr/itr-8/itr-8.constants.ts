export const HUF_RESIDENCE_STATUS_OPTIONS = [
  { value: "resident", label: "Resident" },
  { value: "non-resident", label: "Non-Resident" },
  { value: "not-ordinarily-resident", label: "Not Ordinarily Resident" }
];

export const ACCOUNT_TYPE_OPTIONS = [
  { value: "savings", label: "Savings Account" },
  { value: "current", label: "Current Account" },
  { value: "nri", label: "NRI Account" },
  { value: "other", label: "Other" }
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

export const INCOME_HEAD_OPTIONS = [
  { value: "house_property", label: "House Property" },
  { value: "business_profession", label: "Business or Profession" },
  { value: "capital_gains", label: "Capital Gains" },
  { value: "other_sources", label: "Other Sources" },
  { value: "agricultural", label: "Agricultural Income" }
];

export const PROPERTY_STATUS_OPTIONS = [
  { value: "self_occupied", label: "Self Occupied" },
  { value: "let_out", label: "Let Out" },
  { value: "deemed_let_out", label: "Deemed Let Out" }
];

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Ladakh", "Puducherry", "Lakshadweep", "Daman and Diu", "Andaman and Nicobar"
];

export const COUNTRIES_LIST = [
  "India", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Japan", "China", "Dubai", "Singapore", "New Zealand"
];

export const DONATION_ORGANIZATIONS = [
  { section: "80G(1)", label: "To Government for Prime Minister's National Relief Fund or for any fund specified by Government" },
  { section: "80G(2)(a)", label: "To National Defence Fund" },
  { section: "80G(2)(b)", label: "To various specified organizations" },
];

export const CHAPTER_VI_A_SECTIONS = [
  { code: "80G", label: "Donations to charitable organizations" },
  { code: "80GG", label: "Rent paid by individuals" },
  { code: "80GGA", label: "Scientific research and rural development" },
  { code: "80GGC", label: "Political contributions" },
  { code: "80IA", label: "Infrastructure development" },
  { code: "80IAB", label: "Infrastructure development (individuals)" },
  { code: "80IB", label: "Building housing projects" },
  { code: "80IE", label: "Industrial undertakings in North-East" },
  { code: "80JJA", label: "IFSC Banking Unit deduction" },
  { code: "80LLA", label: "Lloyds TSB deduction" },
  { code: "80PA", label: "Pension scheme contributions" },
];

export const DEPRECIATION_RATES = {
  pm_15: { rate: 15, description: "Plant & Machinery - General (15%)" },
  pm_30: { rate: 30, description: "Plant & Machinery - Specific (30%)" },
  pm_40: { rate: 40, description: "Plant & Machinery - Specific (40%)" },
  pm_45: { rate: 45, description: "Plant & Machinery - Specific (45%)" },
  building_5: { rate: 5, description: "Building - Residential (5%)" },
  building_10: { rate: 10, description: "Building - Non-residential (10%)" },
  building_40: { rate: 40, description: "Building - Factory (40%)" },
  furniture: { rate: 10, description: "Furniture & Fittings (10%)" },
  intangible: { rate: 25, description: "Intangible Assets (25%)" },
  ships: { rate: 20, description: "Ships (20%)" },
};

export const TAX_RATE_SLABS = [
  { min: 0, max: 250000, rate: 0, description: "Up to 2,50,000 (NIL)" },
  { min: 250001, max: 500000, rate: 5, description: "2,50,001 to 5,00,000 (5%)" },
  { min: 500001, max: 1000000, rate: 20, description: "5,00,001 to 10,00,000 (20%)" },
  { min: 1000001, max: Infinity, rate: 30, description: "Above 10,00,000 (30%)" },
];

export const SURCHARGE_RATES = [
  { min: 0, max: 5000000, rate: 0, description: "Up to 50 lakhs (NIL)" },
  { min: 5000001, max: 20000000, rate: 10, description: "50 lakhs to 2 crore (10%)" },
  { min: 20000001, max: 50000000, rate: 15, description: "2 crore to 5 crore (15%)" },
  { min: 50000001, max: Infinity, rate: 25, description: "Above 5 crore (25%)" },
];

export const CESS_RATE = 4; // 4% Health and Education Cess

export const LOSS_CARRYFORWARD_YEARS = {
  normal: 8,
  business: 8,
  speculative: 4,
  house_property: 2,
  capital_loss: 8,
  depreciation: 8,
};

export const AGRICULTURAL_INCOME_THRESHOLD = 5000;

export const SECTION_44AA_TURNOVER_LIMIT = 1000000; // 10 lakhs

export const SECTION_44AB_TURNOVER_LIMIT = 5000000; // 50 lakhs

export const SECTION_92_THRESHOLD = 10000000; // 1 crore

export const FORM_FIELDS_CONFIG = {
  bankDetailsRequired: false,
  agriculturalIncomeRequired: true,
  capitalGainsRequired: true,
  businessProfessionRequired: true,
  housePropertyRequired: true,
  otherSourcesRequired: true,
};

export const HUF_SPECIFIC_SECTIONS = [
  { code: "80U", label: "Disability deduction" },
  { code: "80AC", label: "Life insurance premium" },
  { code: "80AA", label: "Savings in Government securities" },
  { code: "80ACA", label: "Contributions to Mutual Funds" },
  { code: "80D", label: "Health insurance premiums" },
  { code: "80DD", label: "Dependent handicapped person" },
  { code: "80DDB", label: "Medical treatment" },
  { code: "80E", label: "Education loan interest" },
  { code: "80EB", label: "Income related to higher education" },
];
