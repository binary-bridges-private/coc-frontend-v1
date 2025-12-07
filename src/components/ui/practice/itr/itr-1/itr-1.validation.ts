import { z } from "zod";
import {
  Gender,
  FilingStatus,
  TaxRegime,
  FilingSection,
  PropertyType,
} from "./itr-1.types.ts";

const trimmedString = z.string().trim();

const panSchema = trimmedString
  .min(1, "PAN is required")
  .length(10, "PAN must be exactly 10 characters")
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Enter a valid PAN (e.g., ABCDE1234F)")
  .transform((val) => val.toUpperCase());

const aadhaarSchema = trimmedString
  .min(1, "Aadhaar number is required")
  .length(12, "Aadhaar must be exactly 12 digits")
  .regex(/^[0-9]{12}$/, "Enter a valid 12-digit Aadhaar number");

const aadhaarEnrolmentSchema = z.union([
  z.literal(""),
  trimmedString
    .length(14, "Aadhaar Enrolment ID must be exactly 14 digits")
    .regex(/^[0-9]{14}$/, "Enter a valid 14-digit Enrolment ID"),
]);

const nameSchema = trimmedString
  .min(1, "This field is required")
  .max(50, "Name must be 50 characters or less")
  .regex(
    /^[A-Za-z\s.'-]+$/,
    "Name can only contain letters, spaces, periods, apostrophes, and hyphens"
  );

const optionalNameSchema = z.union([
  z.literal(""),
  trimmedString
    .max(50, "Name must be 50 characters or less")
    .regex(
      /^[A-Za-z\s.'-]+$/,
      "Name can only contain letters, spaces, periods, apostrophes, and hyphens"
    ),
]);

const dateSchema = z
  .string()
  .min(1, "Date of birth is required")
  .refine(
    (val) => {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if (!datePattern.test(val)) return false;

      const date = new Date(val);
      if (Number.isNaN(date.getTime())) return false;

      const [year, month, day] = val.split("-").map(Number);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    },
    { message: "Enter a valid date" }
  )
  .refine(
    (val) => {
      const birthDate = new Date(val);
      const today = new Date();

      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 18;
    },
    { message: "You must be at least 18 years old to file ITR" }
  );

const emailSchema = trimmedString
  .min(1, "Email address is required")
  .email("Enter a valid email address");

const mobileSchema = trimmedString
  .min(1, "Mobile number is required")
  .length(10, "Mobile number must be exactly 10 digits")
  .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number");

const pincodeSchema = trimmedString
  .min(1, "Pincode is required")
  .length(6, "Pincode must be exactly 6 digits")
  .regex(/^[0-9]{6}$/, "Enter a valid 6-digit pincode");

const requiredStringSchema = trimmedString.min(1, "This field is required");

const genderSchema = z.nativeEnum(Gender, {
  message: "Please select a valid gender",
});

const filingStatusSchema = z.nativeEnum(FilingStatus, {
  message: "Please select filing status",
});

const taxRegimeSchema = z.nativeEnum(TaxRegime, {
  message: "Please select tax regime",
});

const filingSectionSchema = z
  .union([z.literal(""), z.nativeEnum(FilingSection)])
  .optional();

const optionalDateSchema = z
  .union([
    z.literal(""),
    z.string().refine(
      (val) => {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(val)) return false;
        const date = new Date(val);
        return !Number.isNaN(date.getTime());
      },
      { message: "Enter a valid date" }
    ),
  ])
  .optional();

export const personalInformationSchema = z
  .object({
    assessmentYear: requiredStringSchema,

    pan: panSchema,
    aadhar: aadhaarSchema,
    aadhaarEnrolmentId: aadhaarEnrolmentSchema.optional(),

    firstName: nameSchema,
    middleName: optionalNameSchema.optional(),
    lastName: nameSchema,
    dateOfBirth: dateSchema,
    gender: genderSchema,
    residentialStatus: requiredStringSchema,

    email: emailSchema,
    mobileNumber: mobileSchema,

    flatDoorBlockNo: z.string().optional(),
    nameOfPremises: z.string().optional(),
    roadStreetPostOffice: z.string().optional(),
    areaLocality: z.string().optional(),
    city: requiredStringSchema,
    state: requiredStringSchema,
    pincode: pincodeSchema.optional(),
    noZipCode: z.boolean().optional(),
    zipCode: z.string().optional(),
    country: requiredStringSchema,

    bankName: requiredStringSchema,
    bankAccountNumber: z
      .string()
      .min(1, "Account Number is required")
      .regex(/^\d{9,18}$/, "Enter a valid account number"),
    bankIFSCCode: z
      .string()
      .min(1, "IFSC Code is required")
      .regex(
        /^[A-Z]{4}0[A-Z0-9]{6}$/,
        "Enter a valid IFSC Code (e.g., SBIN0123456)"
      ),

    natureOfEmployment: requiredStringSchema,

    filingStatus: filingStatusSchema,
    filedInResponseToNotice: z.boolean().optional(),
    responseNoticeSection: filingSectionSchema,

    isRevisedOrDefective: z.boolean().optional(),
    originalReceiptNumber: z.string().optional(),
    originalFilingDate: optionalDateSchema,

    noticeUniqueDIN: z.string().optional(),

    taxRegime: taxRegimeSchema,
    optingOut115BAC: z.boolean().optional(),
    form10IEAckNumber: z.string().optional(),
    form10IEAckDate: optionalDateSchema,

    filingUnderSeventhProviso: z.boolean().optional(),
    foreignTravelExpenditure: z
      .union([
        z.number(),
        z
          .string()
          .transform((val) => (val === "" ? undefined : parseFloat(val))),
        z.undefined(),
      ])
      .optional(),
    electricityExpenditure: z
      .union([
        z.number(),
        z
          .string()
          .transform((val) => (val === "" ? undefined : parseFloat(val))),
        z.undefined(),
      ])
      .optional(),

    filingUnderOtherSeventhProvisoConditions: z.boolean().optional(),
    tdsTcsAggregate25ThousandOrMore: z.boolean().optional(),
    savingsBankDeposit50LakhOrMore: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.filingStatus === FilingStatus.Revised ||
      data.filingStatus === FilingStatus.DefectiveReturn
    ) {
      if (
        !data.originalReceiptNumber ||
        data.originalReceiptNumber.trim() === ""
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["originalReceiptNumber"],
          message:
            "Original receipt number is required for revised/defective returns",
        });
      }
      if (!data.originalFilingDate || data.originalFilingDate === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["originalFilingDate"],
          message:
            "Original filing date is required for revised/defective returns",
        });
      }
    }

    if (data.filedInResponseToNotice) {
      if (!data.responseNoticeSection) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["responseNoticeSection"],
          message:
            "Notice section is required when filed in response to notice",
        });
      }
      if (!data.noticeUniqueDIN || data.noticeUniqueDIN.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["noticeUniqueDIN"],
          message: "DIN (Document Identification Number) is required",
        });
      }
    }

    if (data.taxRegime === TaxRegime.New115BAC && data.optingOut115BAC) {
      if (!data.form10IEAckNumber || data.form10IEAckNumber.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["form10IEAckNumber"],
          message:
            "Form 10-IE acknowledgment number is required when opting out of 115BAC",
        });
      }
      if (!data.form10IEAckDate || data.form10IEAckDate === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["form10IEAckDate"],
          message: "Form 10-IE date is required when opting out of 115BAC",
        });
      }
    }

    if (data.filingUnderSeventhProviso) {
      if (
        (data.foreignTravelExpenditure === undefined ||
          data.foreignTravelExpenditure === 0) &&
        (data.electricityExpenditure === undefined ||
          data.electricityExpenditure === 0)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["foreignTravelExpenditure"],
          message:
            "Either foreign travel or electricity expenditure must be provided",
        });
      }
    }
  });

export type PersonalInformationFormData = z.infer<
  typeof personalInformationSchema
>;

const optionalNumericAmountSchema = z
  .union([z.string(), z.number(), z.undefined(), z.literal("")])
  .optional()
  .transform((val) => {
    if (val === undefined || val === "") return 0;
    if (typeof val === "number") return val;
    const parsed = parseFloat(String(val));
    return Number.isNaN(parsed) ? 0 : parsed;
  })
  .refine((val) => val >= 0, { message: "Amount cannot be negative" });

export const grossTotalIncomeSchema = z
  .object({
    salarySection17_1: optionalNumericAmountSchema,
    perquisitesSection17_2: optionalNumericAmountSchema,
    profitSection17_3: optionalNumericAmountSchema,
    retirementBenefitNotified: optionalNumericAmountSchema,
    retirementBenefitOther: optionalNumericAmountSchema,

    exemptAllowances: optionalNumericAmountSchema,

    reliefFromTaxation89A: optionalNumericAmountSchema,

    standardDeduction16: optionalNumericAmountSchema.refine(
      (val) => val <= 50000,
      {
        message: "Standard deduction cannot exceed ₹50,000",
      }
    ),
    entertainmentAllowance: optionalNumericAmountSchema,
    professionalTax: optionalNumericAmountSchema.refine((val) => val <= 2500, {
      message: "Professional tax cannot exceed ₹2,500 per year",
    }),

    propertyType: z.nativeEnum(PropertyType).optional(),
    grossRent: optionalNumericAmountSchema,
    localTaxPaid: optionalNumericAmountSchema,
    annualValue: optionalNumericAmountSchema,
    standardDeduction30Percent: optionalNumericAmountSchema,
    interestBorrowedCapital: optionalNumericAmountSchema,
    arrearsUnrealisedRent: optionalNumericAmountSchema,
    otherSourcesIncome: optionalNumericAmountSchema,
    // Other Sources Income Table (4 rows)
    otherSource1Nature: z.string().optional(),
    otherSource1Description: z.string().optional(),
    otherSource1Amount: optionalNumericAmountSchema,
    otherSource2Nature: z.string().optional(),
    otherSource2Description: z.string().optional(),
    otherSource2Amount: optionalNumericAmountSchema,
    otherSource3Nature: z.string().optional(),
    otherSource3Description: z.string().optional(),
    otherSource3Amount: optionalNumericAmountSchema,
    otherSource4Nature: z.string().optional(),
    otherSource4Description: z.string().optional(),
    otherSource4Amount: optionalNumericAmountSchema,
    // Retirement benefit from non-notified countries
    retirementBenefitNonNotifiedCountry: optionalNumericAmountSchema,
    // Retirement benefit from notified countries (u/s 89A)
    retirementBenefitUSA: optionalNumericAmountSchema,
    retirementBenefitUK: optionalNumericAmountSchema,
    retirementBenefitCanada: optionalNumericAmountSchema,
    // Quarterly breakup for retirement benefit (notified countries)
    retirementBenefitQ1: optionalNumericAmountSchema,
    retirementBenefitQ2: optionalNumericAmountSchema,
    retirementBenefitQ3: optionalNumericAmountSchema,
    retirementBenefitQ4: optionalNumericAmountSchema,
    retirementBenefitQ5: optionalNumericAmountSchema,
    // Dividend income quarterly breakup
    dividendQ1: optionalNumericAmountSchema,
    dividendQ2: optionalNumericAmountSchema,
    dividendQ3: optionalNumericAmountSchema,
    dividendQ4: optionalNumericAmountSchema,
    dividendQ5: optionalNumericAmountSchema,
    // Deductions
    reliefFromTaxation89AOtherSources: optionalNumericAmountSchema,
    deduction57iia: optionalNumericAmountSchema,
    agriculturalIncome: optionalNumericAmountSchema,
    // Part C - Deductions
    section80C: optionalNumericAmountSchema.refine((val) => val <= 150000, {
      message: "80C deduction cannot exceed ₹1,50,000",
    }),
    section80CCC: optionalNumericAmountSchema.refine((val) => val <= 150000, {
      message: "80CCC deduction cannot exceed ₹1,50,000",
    }),
    section80CCD1: optionalNumericAmountSchema,
    section80CCD1B: optionalNumericAmountSchema.refine((val) => val <= 50000, {
      message: "80CCD(1B) deduction cannot exceed ₹50,000",
    }),
    pranTaxpayer: z.string().optional(),
    section80CCD2: optionalNumericAmountSchema,
    section80D: optionalNumericAmountSchema.refine((val) => val <= 100000, {
      message: "80D deduction cannot exceed ₹1,00,000",
    }),
    section80DD: optionalNumericAmountSchema.refine((val) => val <= 125000, {
      message: "80DD deduction cannot exceed ₹1,25,000",
    }),
    section80DDB: optionalNumericAmountSchema.refine((val) => val <= 100000, {
      message: "80DDB deduction cannot exceed ₹1,00,000",
    }),
    specifiedDiseaseName: z.string().optional(),
    section80E: optionalNumericAmountSchema,
    section80EE: optionalNumericAmountSchema.refine((val) => val <= 50000, {
      message: "80EE deduction cannot exceed ₹50,000",
    }),
    section80EEA: optionalNumericAmountSchema.refine((val) => val <= 150000, {
      message: "80EEA deduction cannot exceed ₹1,50,000",
    }),
    section80EEB: optionalNumericAmountSchema.refine((val) => val <= 150000, {
      message: "80EEB deduction cannot exceed ₹1,50,000",
    }),
    section80G: optionalNumericAmountSchema,
    section80GG: optionalNumericAmountSchema.refine((val) => val <= 60000, {
      message: "80GG deduction cannot exceed ₹60,000",
    }),
    form10BAAckNumber: z.string().optional(),
    section80GGA: optionalNumericAmountSchema,
    section80GGC: optionalNumericAmountSchema,
    section80TTA: optionalNumericAmountSchema.refine((val) => val <= 10000, {
      message: "80TTA deduction cannot exceed ₹10,000",
    }),
    section80TTB: optionalNumericAmountSchema.refine((val) => val <= 50000, {
      message: "80TTB deduction cannot exceed ₹50,000",
    }),
    section80U: optionalNumericAmountSchema.refine((val) => val <= 125000, {
      message: "80U deduction cannot exceed ₹1,25,000",
    }),
    section80CCH: optionalNumericAmountSchema,
    anyOtherDeductions: optionalNumericAmountSchema,
    totalDeductions: optionalNumericAmountSchema,
    totalIncome: optionalNumericAmountSchema,
    // Tax calculation fields
    taxPayableOnTotalIncome: optionalNumericAmountSchema,
    rebate87A: optionalNumericAmountSchema,
    taxPayableAfterRebate: optionalNumericAmountSchema,
    healthAndEducationCess: optionalNumericAmountSchema,
    totalTaxAndCess: optionalNumericAmountSchema,
    relief89: optionalNumericAmountSchema,
    balanceTaxAfterRelief: optionalNumericAmountSchema,
    interest234A: optionalNumericAmountSchema,
    interest234B: optionalNumericAmountSchema,
    interest234C: optionalNumericAmountSchema,
    fee234F: optionalNumericAmountSchema,
    totalInterestFee: optionalNumericAmountSchema,
    totalTaxFeeInterest: optionalNumericAmountSchema,
  })
  .refine(
    (data) => {
      if (
        data.propertyType === PropertyType.SelfOccupied &&
        data.interestBorrowedCapital > 200000
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Interest on home loan for self-occupied property cannot exceed ₹2,00,000",
      path: ["interestBorrowedCapital"],
    }
  )
  .refine(
    (data) => {
      // Validate Other Source 1
      if (
        data.otherSource1Nature === "Any Other" &&
        !data.otherSource1Description
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Description is required when 'Any Other' is selected",
      path: ["otherSource1Description"],
    }
  )
  .refine(
    (data) => {
      // Validate Other Source 2
      if (
        data.otherSource2Nature === "Any Other" &&
        !data.otherSource2Description
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Description is required when 'Any Other' is selected",
      path: ["otherSource2Description"],
    }
  )
  .refine(
    (data) => {
      // Validate Other Source 3
      if (
        data.otherSource3Nature === "Any Other" &&
        !data.otherSource3Description
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Description is required when 'Any Other' is selected",
      path: ["otherSource3Description"],
    }
  )
  .refine(
    (data) => {
      // Validate Other Source 4
      if (
        data.otherSource4Nature === "Any Other" &&
        !data.otherSource4Description
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Description is required when 'Any Other' is selected",
      path: ["otherSource4Description"],
    }
  );

export type GrossTotalIncomeFormData = z.infer<typeof grossTotalIncomeSchema>;

// Part C - Tax Deductions Schema
export const taxDeductionSchema = z.object({
  grossTotalIncome: optionalNumericAmountSchema,

  // Section 80C & 80CCC
  section80C: optionalNumericAmountSchema.refine((val) => val <= 150000, {
    message: "80C deduction cannot exceed ₹1,50,000",
  }),
  section80CCC: optionalNumericAmountSchema.refine((val) => val <= 150000, {
    message: "80CCC deduction cannot exceed ₹1,50,000",
  }),

  // Section 80CCD - Pension Schemes
  section80CCD1: optionalNumericAmountSchema,
  section80CCD1B: optionalNumericAmountSchema.refine((val) => val <= 50000, {
    message: "80CCD(1B) deduction cannot exceed ₹50,000",
  }),
  pranTaxpayer: z.string().optional(),
  section80CCD2: optionalNumericAmountSchema,

  // Section 80D & 80DD - Health & Disability
  section80D: optionalNumericAmountSchema.refine((val) => val <= 100000, {
    message: "80D deduction cannot exceed ₹1,00,000",
  }),
  section80DD: optionalNumericAmountSchema.refine((val) => val <= 125000, {
    message: "80DD deduction cannot exceed ₹1,25,000",
  }),

  // Section 80DDB - Specified Disease
  section80DDB: optionalNumericAmountSchema.refine((val) => val <= 100000, {
    message: "80DDB deduction cannot exceed ₹1,00,000",
  }),
  specifiedDiseaseName: z.string().optional(),

  // Section 80E-80EEB - Loan Interest
  section80E: optionalNumericAmountSchema,
  section80EE: optionalNumericAmountSchema.refine((val) => val <= 50000, {
    message: "80EE deduction cannot exceed ₹50,000",
  }),
  section80EEA: optionalNumericAmountSchema.refine((val) => val <= 150000, {
    message: "80EEA deduction cannot exceed ₹1,50,000",
  }),
  section80EEB: optionalNumericAmountSchema.refine((val) => val <= 150000, {
    message: "80EEB deduction cannot exceed ₹1,50,000",
  }),

  // Section 80G & 80GG - Donations & Rent
  section80G: optionalNumericAmountSchema,
  section80GG: optionalNumericAmountSchema.refine((val) => val <= 60000, {
    message: "80GG deduction cannot exceed ₹60,000",
  }),
  form10BAAckNumber: z.string().optional(),

  // Section 80GGA & 80GGC - Research & Political
  section80GGA: optionalNumericAmountSchema,
  section80GGC: optionalNumericAmountSchema,

  // Section 80TTA & 80TTB - Interest Income
  section80TTA: optionalNumericAmountSchema.refine((val) => val <= 10000, {
    message: "80TTA deduction cannot exceed ₹10,000",
  }),
  section80TTB: optionalNumericAmountSchema.refine((val) => val <= 50000, {
    message: "80TTB deduction cannot exceed ₹50,000",
  }),

  // Section 80U & 80CCH - Other Deductions
  section80U: optionalNumericAmountSchema.refine((val) => val <= 125000, {
    message: "80U deduction cannot exceed ₹1,25,000",
  }),
  section80CCH: optionalNumericAmountSchema,

  // Any Other Deductions
  anyOtherDeductions: optionalNumericAmountSchema,

  // Calculated fields
  totalDeductions: optionalNumericAmountSchema,
  totalIncome: optionalNumericAmountSchema,

  // Tax calculation fields
  taxPayableOnTotalIncome: optionalNumericAmountSchema,
  rebate87A: optionalNumericAmountSchema,
  taxPayableAfterRebate: optionalNumericAmountSchema,
  healthAndEducationCess: optionalNumericAmountSchema,
  totalTaxAndCess: optionalNumericAmountSchema,
  relief89: optionalNumericAmountSchema,
  balanceTaxAfterRelief: optionalNumericAmountSchema,

  // Interest and Fee
  interest234A: optionalNumericAmountSchema,
  interest234B: optionalNumericAmountSchema,
  interest234C: optionalNumericAmountSchema,
  fee234F: optionalNumericAmountSchema,
  totalInterestFee: optionalNumericAmountSchema,
  totalTaxFeeInterest: optionalNumericAmountSchema,

  // Exempt Income
  exemptIncomeNature1: z.string().optional(),
  exemptIncomeDescription1: z.string().optional(),
  exemptIncome1: optionalNumericAmountSchema,
  exemptIncomeNature2: z.string().optional(),
  exemptIncomeDescription2: z.string().optional(),
  exemptIncome2: optionalNumericAmountSchema,

  // LTCG u/s 112A
  ltcgSaleConsideration112A: optionalNumericAmountSchema,
  ltcgCostOfAcquisition112A: optionalNumericAmountSchema,
});

export type TaxDeductionFormData = z.infer<typeof taxDeductionSchema>;

export const grossIncomeValidationMessages = {
  salary: {
    section17_1: "Enter valid salary amount as per Form 16",
    perquisites:
      "Enter value of perquisites (company car, rent-free accommodation, etc.)",
    profits:
      "Enter profits in lieu of salary (compensation on termination, leave encashment)",
    hra: "HRA exemption must be calculated as per IT rules",
    standardDeduction: "Standard deduction is capped at ₹50,000",
    professionalTax:
      "Professional tax paid during the financial year (max ₹2,500)",
  },
  houseProperty: {
    propertyType:
      "Select the type of property (Self-Occupied, Let-Out, or Deemed Let-Out)",
    grossRent: "Annual rent received from the property",
    localTax: "Municipal taxes paid to local authority",
    interest: "Interest paid on home loan (max ₹2,00,000 for self-occupied)",
  },
  otherSources: {
    savingsInterest: "Interest earned from savings bank accounts",
    fdInterest: "Interest earned from fixed deposits",
    dividend: "Dividend income from shares and mutual funds",
    other: "Any other miscellaneous income",
  },
};
