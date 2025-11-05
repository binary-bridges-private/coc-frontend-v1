import { z } from "zod";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const aadhaarRegex = /^\d{12}$/;

const pinRegex = /^\d{6}$/;

const mobileRegex = /^\d{10}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Date validation function
const validateDate = (dateStr: string, allowFuture: boolean = false): { valid: boolean; message?: string } => {
  // Check format DD/MM/YYYY
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return { valid: false, message: "Date must be in DD/MM/YYYY format" };
  }

  const parts = dateStr.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Validate day (1-31)
  if (day < 1 || day > 31) {
    return { valid: false, message: "Day must be between 01 and 31" };
  }

  // Validate month (1-12)
  if (month < 1 || month > 12) {
    return { valid: false, message: "Month must be between 01 and 12" };
  }

  // Validate year (not future unless allowed)
  const currentYear = new Date().getFullYear();
  if (!allowFuture && year > currentYear) {
    return { valid: false, message: `Year cannot be greater than ${currentYear}` };
  }

  // Validate reasonable year range (1900 to current/future)
  if (year < 1900) {
    return { valid: false, message: "Year must be 1900 or later" };
  }

  // Check if date is valid (e.g., not 31/02/2024)
  const daysInMonth = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > daysInMonth[month - 1]) {
    return { valid: false, message: `Invalid date: ${dateStr} (month ${month} doesn't have ${day} days)` };
  }

  return { valid: true };
};

export const personalInfoSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name too long"),
    middleName: z.string().max(100, "Middle name too long").optional(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name too long"),

    pan: z
      .string()
      .min(10, "PAN must be 10 characters")
      .max(10, "PAN must be 10 characters")
      .regex(panRegex, "Invalid PAN format (e.g., ABCDE1234F)")
      .toUpperCase(),

    flatDoorBlock: z
      .string()
      .min(1, "Flat/Door/Block number is required")
      .max(200),
    premisesName: z.string().max(200, "Premises name too long").optional(),
    roadStreet: z
      .string()
      .min(1, "Road/Street/Post Office is required")
      .max(200),
    areaLocality: z.string().min(1, "Area/Locality is required").max(200),
    townCity: z.string().min(1, "Town/City/District is required").max(100),
    state: z.string().min(1, "State is required"),
    pinCode: z
      .string()
      .regex(pinRegex, "PIN code must be 6 digits")
      .length(6, "PIN code must be 6 digits"),
    country: z.string().min(1, "Country is required"),

    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .superRefine((val, ctx) => {
        const result = validateDate(val, false);
        if (!result.valid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: result.message || "Invalid date",
          });
        }
      }),

    aadhaarNumber: z
      .string()
      .regex(aadhaarRegex, "Aadhaar must be 12 digits")
      .length(12, "Aadhaar must be 12 digits"),

    filingStatus: z.enum(["Individual", "HUF"], {
      message: "Please select filing status",
    }),

    mobileNumber1: z
      .string()
      .regex(mobileRegex, "Mobile number must be 10 digits")
      .length(10, "Mobile number must be 10 digits"),
    stdCode: z.string().max(5, "STD code too long").optional(),
    mobileNumber2: z
      .string()
      .regex(mobileRegex, "Mobile number must be 10 digits")
      .length(10, "Mobile number must be 10 digits")
      .optional()
      .or(z.literal("")),

    emailAddress1: z
      .string()
      .min(1, "Primary email is required")
      .regex(emailRegex, "Invalid email address"),
    emailAddress2: z
      .string()
      .regex(emailRegex, "Invalid email address")
      .optional()
      .or(z.literal("")),

    filedUnderSection: z
      .enum(["139(1)", "139(4)", "139(5)", "92CD", "119(2)(b)"], {
        message: "Please select filing section",
      })
      .optional(),

    filedInResponse: z
      .array(z.enum(["139(9)", "142(1)", "148", "153C"]))
      .optional(),

    optingOutNewRegime: z.enum(["Yes", "No"]).optional(),

    filingUnderSeventhProviso: z.enum(["Yes", "No"]).optional(),

    depositedAmountExceeds1Crore: z.enum(["Yes", "No"]).optional().or(z.literal("")).nullable(),
    depositedAmount: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(10000000, "Amount must be at least Rs. 1 Crore").optional()
    ),

    incurredExpenditureExceeds2Lakhs: z.enum(["Yes", "No"]).optional().or(z.literal("")).nullable(),
    incurredExpenditureAmount: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(200000, "Amount must be at least Rs. 2 Lakhs").optional()
    ),

    electricityExpenditureExceeds1Lakh: z.enum(["Yes", "No"]).optional().or(z.literal("")).nullable(),
    electricityExpenditureAmount: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(100000, "Amount must be at least Rs. 1 Lakh").optional()
    ),

    otherConditionsApplicable: z.enum(["Yes", "No"]).optional().or(z.literal("")).nullable(),
    relevantCondition: z.string().max(200).optional().or(z.literal("")),

    isRevisedDefectiveModified: z.boolean().default(false),
    originalReceiptNumber: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 0 || (val.length <= 50 && /^[A-Z0-9]+$/.test(val)),
        { message: "Receipt number should contain only letters and numbers (max 50 chars)" }
      ),
    originalFilingDate: z
      .string()
      .optional()
      .or(z.literal(""))
      .superRefine((val, ctx) => {
        if (val && val.length > 0) {
          const result = validateDate(val, false);
          if (!result.valid) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: result.message || "Invalid date",
            });
          }
        }
      }),

    filedInResponseToNotice: z.boolean().default(false),
    uniqueDocumentNumber: z.string().max(50).optional().or(z.literal("")),
    noticeDate: z
      .string()
      .optional()
      .or(z.literal(""))
      .superRefine((val, ctx) => {
        if (val && val.length > 0) {
          const result = validateDate(val, false);
          if (!result.valid) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: result.message || "Invalid date",
            });
          }
        }
      }),
    advancePricingAgreementDate: z.string().optional(),

    residentialStatus: z.enum(
      ["Resident", "Resident but not Ordinarily Resident", "Non-resident"],
      {
        message: "Please select residential status",
      }
    ),

    residentDaysInIndia: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(0).max(366).optional()
    ),
    residentCondition: z.string().max(500).optional(),

    rnorDaysInIndia: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(0).max(366).optional()
    ),
    rnorCondition: z.string().max(500).optional(),

    nonResidentDaysInIndia: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(0).max(366).optional()
    ),
    jurisdictionOfResidence: z.string().max(200).optional(),
    taxpayerIdentificationNumber: z.string().max(100).optional(),
    totalPeriodInIndiaPreviousYear: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(0).max(366).optional()
    ),
    totalPeriodInIndiaPreceding4Years: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().min(0).max(1464).optional()
    ),

    daysInIndia: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().int("Must be a whole number").min(0, "Days cannot be negative").max(366, "Days cannot exceed 366").optional()
    ),

    daysInIndiaPreviousYear: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().int("Must be a whole number").min(0, "Days cannot be negative").max(366, "Days cannot exceed 366").optional()
    ),
    daysInIndiaPreceding4Years: z.preprocess(
      (val) => (val === "" || val === null || val === undefined || (typeof val === 'number' && isNaN(val))) ? undefined : val,
      z.number().int("Must be a whole number").min(0, "Days cannot be negative").max(1464, "Days cannot exceed 1464 (4 years)").optional()
    ),

    section115HBenefit: z.enum(["Yes", "No"]).optional(),

    portugueseCivilCode: z.enum(["Yes", "No"]).optional(),
    sebiRegNo: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 0 || (val.length <= 50 && /^[A-Z0-9\/\-]+$/.test(val)),
        { message: "Invalid SEBI Reg No. format (max 50 chars)" }
      ),

    fpiYesNo: z.enum(["Yes", "No"]).optional(),
    leiNumber: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 0 || (val.length === 20 && /^[A-Z0-9]{20}$/.test(val)),
        { message: "LEI must be 20 alphanumeric characters if provided" }
      ),
    leiValidDate: z
      .string()
      .optional()
      .or(z.literal(""))
      .superRefine((val, ctx) => {
        if (val && val.length > 0) {
          const result = validateDate(val, true); // Allow future dates for validity period
          if (!result.valid) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: result.message || "Invalid date",
            });
          }
        }
      }),

    representativeAssessee: z.enum(["Yes", "No"]).optional(),
    representativeName: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 0 || (val.length <= 200 && /^[A-Za-z\s.'-]+$/.test(val)),
        { message: "Name can only contain letters, spaces, periods, apostrophes (max 200 chars)" }
      ),
    representativeCapacity: z.string().max(200).optional().or(z.literal("")),
    representativeAddress: z.string().max(500).optional().or(z.literal("")),
    representativePan: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 0 || panRegex.test(val),
        { message: "Invalid PAN format (e.g., ABCDE1234F)" }
      ),
    representativeAadhaar: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 0 || aadhaarRegex.test(val),
        { message: "Invalid Aadhaar number (must be 12 digits)" }
      ),

    wasDirector: z.enum(["Yes", "No"]).optional(),
    companyDetails: z
      .array(
        z.object({
          companyName: z.string().min(1, "Company name is required").max(200, "Company name is too long"),
          companyType: z.string().min(1, "Company type is required").max(50, "Company type is too long"),
          pan: z.string().regex(panRegex, "Invalid PAN format (e.g., ABCDE1234F)"),
          sharesListed: z.boolean(),
          din: z.string().min(1, "DIN is required").regex(/^[0-9]{8}$/, "Invalid DIN format (must be 8 digits)"),
        })
      )
      .optional(),

    heldUnlistedEquity: z.enum(["Yes", "No"]).optional(),
    equitySharesDetails: z
      .array(
        z.object({
          companyName: z.string().min(1, "Company name is required").max(200, "Company name is too long"),
          companyType: z.string().min(1, "Company type is required").max(50, "Company type is too long"),
          pan: z.string().regex(panRegex, "Invalid PAN format (e.g., ABCDE1234F)"),
          openingBalance: z.number().min(0, "Opening balance cannot be negative"),
          sharesAcquired: z.number().min(0, "Shares acquired cannot be negative"),
          purchasePrice: z.number().min(0, "Purchase price cannot be negative"),
          sharesTransferred: z.number().min(0, "Shares transferred cannot be negative"),
          salePrice: z.number().min(0, "Sale price cannot be negative"),
          closingBalance: z.number().min(0, "Closing balance cannot be negative"),
          costOfAcquisition: z.number().min(0, "Cost of acquisition cannot be negative"),
        })
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.filingUnderSeventhProviso === "Yes") {
      if (
        data.depositedAmountExceeds1Crore === "Yes" &&
        !data.depositedAmount
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the deposited amount",
          path: ["depositedAmount"],
        });
      }
      if (
        data.incurredExpenditureExceeds2Lakhs === "Yes" &&
        !data.incurredExpenditureAmount
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the travel expenditure amount",
          path: ["incurredExpenditureAmount"],
        });
      }
      if (
        data.electricityExpenditureExceeds1Lakh === "Yes" &&
        !data.electricityExpenditureAmount
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the electricity expenditure amount",
          path: ["electricityExpenditureAmount"],
        });
      }
    }

    if (data.representativeAssessee === "Yes") {
      if (!data.representativeName || data.representativeName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Representative name is required",
          path: ["representativeName"],
        });
      }
      if (
        !data.representativeCapacity ||
        data.representativeCapacity.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Representative capacity is required",
          path: ["representativeCapacity"],
        });
      }
      if (
        !data.representativeAddress ||
        data.representativeAddress.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Representative address is required",
          path: ["representativeAddress"],
        });
      }
    }

    if (data.fpiYesNo === "Yes") {
      if (!data.sebiRegNo || data.sebiRegNo.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "SEBI Registration Number is required for FPI",
          path: ["sebiRegNo"],
        });
      }
    }
  });

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const salaryIncomeSchema = z.object({
  employers: z
    .array(
      z.object({
        employerName: z.string().min(1, "Employer name is required").max(200),
        natureOfEmployer: z
          .string()
          .min(1, "Nature of employer is required")
          .max(100),
        employerTAN: z
          .string()
          .regex(
            /^[A-Z]{4}[0-9]{5}[A-Z]$/,
            "Invalid TAN format (e.g., ABCD12345E)"
          )
          .optional()
          .or(z.literal("")),
        addressOfEmployer: z.string().max(500).optional(),
        townCity: z.string().max(100).optional(),
        state: z.string().max(100).optional(),
        pinCode: z
          .string()
          .regex(pinRegex, "PIN code must be 6 digits")
          .optional()
          .or(z.literal("")),

        salaryAsPerSection17_1: z
          .number()
          .min(0, "Amount cannot be negative")
          .default(0),
        valueOfPerquisites: z
          .number()
          .min(0, "Amount cannot be negative")
          .default(0),
        profitInLieuOfSalary: z
          .number()
          .min(0, "Amount cannot be negative")
          .default(0),
        incomeFromRetirementBenefit89A: z
          .number()
          .min(0, "Amount cannot be negative")
          .default(0),
        incomeFromRetirementBenefitOther: z
          .number()
          .min(0, "Amount cannot be negative")
          .default(0),
        incomeTaxableReliefClaimed89A: z
          .number()
          .min(0, "Amount cannot be negative")
          .default(0),
      })
    )
    .min(1, "At least one employer is required"),

  totalGrossSalary: z.number().min(0).default(0),
  lessAllowancesExempt: z.number().min(0).default(0),
  incomeClaimedRelief89A: z.number().min(0).default(0),
  netSalary: z.number().default(0),

  standardDeduction: z.number().min(0).default(0),
  entertainmentAllowance: z.number().min(0).default(0),
  professionalTax: z.number().min(0).default(0),
  totalDeductionSection16: z.number().min(0).default(0),

  incomeChargeableSalaries: z.number().default(0),
});

export type SalaryIncomeFormData = z.infer<typeof salaryIncomeSchema>;

export const housePropertySchema = z.object({
  properties: z
    .array(
      z.object({
        propertyAddress: z
          .string()
          .min(1, "Property address is required")
          .max(500),
        townCity: z.string().max(100).optional().or(z.literal("")),
        state: z.string().max(100).optional().or(z.literal("")),
        country: z.string().max(100).optional().or(z.literal("")),
        pinCode: z
          .string()
          .regex(pinRegex, "PIN code must be 6 digits")
          .optional()
          .or(z.literal("")),

        isCoOwned: z.enum(["Yes", "No"]).default("No"),
        ownershipPercentage: z
          .number()
          .min(0, "Percentage cannot be negative")
          .max(100, "Percentage cannot exceed 100")
          .optional()
          .nullable(),

        coOwners: z
          .array(
            z.object({
              name: z.string().max(200),
              panOrAadhaar: z.string().max(12),
              percentageShare: z.number().min(0).max(100),
            })
          )
          .optional(),

        propertyType: z.enum(["Let-out", "Self-occupied", "Deemed let-out"]),

        tenantNames: z.string().max(500).optional().or(z.literal("")),
        tenantPanOrAadhaar: z.string().max(12).optional().or(z.literal("")),
        tenantPanOrTan: z.string().max(10).optional().or(z.literal("")),

        grossRentReceived: z.number().min(0).default(0),
        rentNotRealized: z.number().min(0).default(0),
        taxPaidToAuthorities: z.number().min(0).default(0),
        totalRent: z.number().min(0).default(0),
        annualValue: z.number().default(0),
        annualValueOwned: z.number().default(0),
        fiftyPercentOfAnnualValue: z.number().min(0).default(0),
        interestOnBorrowedCapital: z.number().min(0).default(0),
        totalInterest: z.number().min(0).default(0),
        arrearsUnrealizedRent: z.number().min(0).default(0),
        incomeFromProperty: z.number().default(0),
      })
    )
    .min(1, "At least one property is required"),

  totalPassThroughIncome: z.number().default(0),
  incomeFromHouseProperty: z.number().default(0),
});

export type HousePropertyFormData = z.infer<typeof housePropertySchema>;

export const capitalGainsSectionASchema = z.object({
  landBuildingSales: z
    .array(
      z.object({
        purchaseDate: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),

        saleDate: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),

        fullValueConsideration: z.number().min(0).default(0),

        stampDutyValue: z.number().min(0).default(0),

        fullValueAdopted: z.number().min(0).default(0),

        costAcquisitionWithoutIndexation: z.number().min(0).default(0),

        costImprovementWithoutIndexation: z.number().min(0).default(0),

        expenditureOnTransfer: z.number().min(0).default(0),

        totalDeductions: z.number().min(0).default(0),

        balance: z.number().default(0),

        deductionSection54B: z.number().min(0).default(0),

        shortTermCapitalGain: z.number().default(0),

        transferDetails: z
          .object({
            buyerName: z.string().max(200).optional().or(z.literal("")),
            buyerPan: z
              .string()
              .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format")
              .optional()
              .or(z.literal("")),
            buyerAadhaar: z
              .string()
              .regex(/^\d{12}$/, "Aadhaar must be 12 digits")
              .optional()
              .or(z.literal("")),
            percentageShare: z.number().min(0).max(100).optional().nullable(),
            amount: z.number().min(0).default(0),
            propertyAddress: z.string().max(500).optional().or(z.literal("")),
            countryCode: z.string().max(10).optional().or(z.literal("")),
            zipCode: z.string().max(20).optional().or(z.literal("")),
            pinCode: z
              .string()
              .regex(/^\d{6}$/, "PIN code must be 6 digits")
              .optional()
              .or(z.literal("")),
            state: z.string().max(100).optional().or(z.literal("")),
          })
          .optional(),
      })
    )
    .optional()
    .default([]),

  equityMfSales: z
    .object({
      transferBefore23July: z
        .object({
          fullValueConsideration: z.number().min(0).default(0),
          deductionsCostAcquisition: z.number().min(0).default(0),
          deductionsCostImprovement: z.number().min(0).default(0),
          deductionsExpenditureTransfer: z.number().min(0).default(0),
          deductionsTotal: z.number().min(0).default(0),
          balance: z.number().default(0),
        })
        .optional(),

      transferOnAfter23July: z
        .object({
          fullValueConsideration: z.number().min(0).default(0),
          deductionsCostAcquisition: z.number().min(0).default(0),
          deductionsCostImprovement: z.number().min(0).default(0),
          deductionsExpenditureTransfer: z.number().min(0).default(0),
          deductionsTotal: z.number().min(0).default(0),
          balance: z.number().default(0),
        })
        .optional(),

      stcgOtherShares: z.number().default(0),
    })
    .optional(),

  nonResidentShares: z
    .object({
      transferBefore23July: z.number().default(0),

      transferOnAfter23July: z.number().default(0),

      stcgOtherShares: z.number().default(0),

      stcgSection111A: z.number().default(0),
    })
    .optional(),

  nonResidentFII: z
    .object({
      unquotedShares: z
        .object({
          fullValueConsiderationUnquoted: z.number().min(0).default(0),
          fairMarketValueUnquoted: z.number().min(0).default(0),
          fullValueConsiderationAdopted: z.number().min(0).default(0),
          fullValueConsiderationOther: z.number().min(0).default(0),
          totalFullValue: z.number().min(0).default(0),
        })
        .optional(),

      deductions: z
        .object({
          costAcquisitionWithoutIndexation: z.number().min(0).default(0),
          costImprovementWithoutIndexation: z.number().min(0).default(0),
          expenditureOnTransfer: z.number().min(0).default(0),
          totalDeductions: z.number().min(0).default(0),
        })
        .optional(),

      balance: z.number().default(0),

      lossDisallowed: z.number().default(0),

      shortTermCapitalGain: z.number().default(0),
    })
    .optional(),

  otherAssetsSales: z
    .object({
      unquotedShares: z
        .object({
          fullValueConsiderationUnquoted: z.number().min(0).default(0),
          fairMarketValueUnquoted: z.number().min(0).default(0),
          fullValueConsiderationAdopted: z.number().min(0).default(0),
          fullValueConsiderationOther: z.number().min(0).default(0),
          totalFullValue: z.number().min(0).default(0),
        })
        .optional(),

      deductions: z
        .object({
          costAcquisitionWithoutIndexation: z.number().min(0).default(0),
          costImprovementWithoutIndexation: z.number().min(0).default(0),
          expenditureOnTransfer: z.number().min(0).default(0),
          totalDeductions: z.number().min(0).default(0),
        })
        .optional(),

      balance: z.number().default(0),

      lossDisallowed: z.number().default(0),

      shortTermCapitalGain: z.number().default(0),
    })
    .optional(),

  amountDeemedSTCG: z.number().default(0),

  passeThroughIncome: z
    .object({
      at15Percent: z.number().default(0),

      at30Percent: z.number().default(0),

      at30PercentB: z.number().default(0),

      atApplicableRates: z.number().default(0),
    })
    .optional(),

  stcgNotChargeableOrSpecialRates: z
    .array(
      z.object({
        amountItemNo: z.string().max(10).optional().or(z.literal("")),
        countryNameCode: z.string().max(100).optional().or(z.literal("")),
        articleOfDTAA: z.string().max(50).optional().or(z.literal("")),
        rateAsPerTreatyAnnexure: z
          .number()
          .min(0)
          .max(100)
          .optional()
          .nullable(),
        whetherTRC: z.enum(["Yes", "No"]).optional(),
        sectionOfITAct: z.string().max(50).optional().or(z.literal("")),
        rateAsPerITAct: z.number().min(0).max(100).optional().nullable(),
        applicableRate: z.number().min(0).max(100).optional().nullable(),
      })
    )
    .optional()
    .default([]),

  totalSTCGNotChargeable: z.number().default(0),

  totalSTCGSpecialRates: z.number().default(0),

  capitalLossBuyBack: z.number().default(0),

  totalShortTermCapitalGain: z.number().default(0),
});

export type CapitalGainsSectionAFormData = z.infer<
  typeof capitalGainsSectionASchema
>;

// Section B - Long-term Capital Gains (LTCG)
export const capitalGainsSectionBSchema = z.object({
  // B1: From sale of land or building or both
  ltcgLandBuildingSales: z
    .array(
      z.object({
        purchaseDate: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),
        saleDate: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),

        // a. Full value of consideration
        fullValueConsideration: z.number().min(0).default(0),
        stampDutyValue: z.number().min(0).default(0),
        fullValueAdopted: z.number().min(0).default(0),

        // b. Deductions under section 48
        costAcquisitionWithoutIndexation: z.number().min(0).default(0),
        costAcquisitionWithIndexation: z.number().min(0).default(0),
        costImprovementWithoutIndexation: z.number().min(0).default(0),
        yearOfImprovement: z.string().max(10).optional().or(z.literal("")),
        costImprovementWithIndexation: z.number().min(0).default(0),
        expenditureOnTransfer: z.number().min(0).default(0),
        
        // Transfer timing specific fields
        totalBeforeJuly23: z.number().min(0).default(0),
        totalAfterJuly23: z.number().min(0).default(0),
        totalForComputingExcessTax: z.number().min(0).default(0),

        // c. Balance
        balance: z.number().default(0),
        balanceForComputingExcessTax: z.number().default(0),

        // ca. Balance for residents computational purposes
        balanceComputationalPurpose: z.number().default(0),

        // d. Deduction under sections 54/54B/54D/54F/54GB
        deductionSection54: z.number().min(0).default(0),

        // e. Long-term capital gains
        longTermCapitalGain: z.number().default(0),
        longTermCapitalGainComputational: z.number().default(0),

        // ci. Tax as per section 112(1)(a)(iiB) at 12.5%
        taxAt12_5Percent: z.number().min(0).default(0),

        // cii. Excess amount required to be ignored
        excessAmountIgnored: z.number().min(0).default(0),

        // f. Transfer of immovable property details
        transferDetails: z
          .object({
            buyerName: z.string().max(200).optional().or(z.literal("")),
            buyerPanAadhaar: z.string().max(12).optional().or(z.literal("")),
            percentageShare: z.number().min(0).max(100).optional().nullable(),
            amount: z.number().min(0).default(0),
            propertyAddress: z.string().max(500).optional().or(z.literal("")),
            countryCode: z.string().max(10).optional().or(z.literal("")),
            zipCode: z.string().max(20).optional().or(z.literal("")),
            pinCode: z
              .string()
              .regex(/^\d{6}$/, "PIN code must be 6 digits")
              .optional()
              .or(z.literal("")),
            state: z.string().max(100).optional().or(z.literal("")),
          })
          .optional(),

        // g. Total LTCG on immovable property
        totalLTCGImmovableProperty: z.number().default(0),
        totalLTCGBeforeJuly23: z.number().default(0),
        totalLTCGAfterJuly23: z.number().default(0),
        totalExcessTaxIgnored: z.number().default(0),
      })
    )
    .optional()
    .default([]),

  // B2: For residents, from sale of unlisted bonds/debentures
  unlistedBondsSales: z
    .array(
      z.object({
        transferWasBefore23July: z.boolean().default(false),
        transferWasAfter23July: z.boolean().default(false),

        fullValueConsideration: z.number().min(0).default(0),
        costAcquisitionWithoutIndexation: z.number().min(0).default(0),
        costImprovementWithoutIndexation: z.number().min(0).default(0),
        expenditureOnTransfer: z.number().min(0).default(0),
        totalDeductions: z.number().min(0).default(0),
        balance: z.number().default(0),
        deductionSection54: z.number().min(0).default(0),
        ltcgOnBonds: z.number().default(0),
      })
    )
    .optional()
    .default([]),

  // B3i: From sale of listed securities
  listedSecuritiesSales: z
    .array(
      z.object({
        transferWasBefore23July: z.boolean().default(false),
        transferWasAfter23July: z.boolean().default(false),

        fullValueConsideration: z.number().min(0).default(0),
        costAcquisitionWithIndexation: z.number().min(0).default(0),
        costAcquisitionWithoutIndexation: z.number().min(0).default(0),
        costImprovementWithoutIndexation: z.number().min(0).default(0),
        expenditureOnTransfer: z.number().min(0).default(0),
        totalDeductions: z.number().min(0).default(0),
        balance: z.number().default(0),
        balanceForComputingExcessTax: z.number().default(0),
        deductionSection54: z.number().min(0).default(0),
        ltcgOnSecurities: z.number().default(0),
        ltcgForComputingExcessTax: z.number().default(0),

        taxAt12_5Percent: z.number().min(0).default(0),
        excessAmountIgnored: z.number().min(0).default(0),
      })
    )
    .optional()
    .default([]),

  // B3ii: From sale of CDIR or Indian company under section 115AC(1)
  cdirSales: z
    .object({
      transferWasBefore23July: z.boolean().default(false),
      transferWasAfter23July: z.boolean().default(false),

      fullValueConsideration: z.number().min(0).default(0),
      costAcquisitionWithoutIndexation: z.number().min(0).default(0),
      costImprovementWithoutIndexation: z.number().min(0).default(0),
      expenditureOnTransfer: z.number().min(0).default(0),
      totalDeductions: z.number().min(0).default(0),
      balance: z.number().default(0),
      deductionSection54: z.number().min(0).default(0),
      ltcgOnAssets: z.number().default(0),
    })
    .optional(),

  // B4: From sale of equity shares
  equitySharesSales: z
    .array(
      z.object({
        // Case assets include shares of company other than quoted shares
        caseType: z.enum(["quoted", "unquoted"]).default("quoted"),

        fullValueConsideration: z.number().min(0).default(0),
        fairMarketValue: z.number().min(0).default(0),
        fullValueAdopted: z.number().min(0).default(0),
        fullValueOther: z.number().min(0).default(0),
        totalFullValue: z.number().min(0).default(0),

        costAcquisitionWithIndexation: z.number().min(0).default(0),
        costAcquisitionWithoutIndexation: z.number().min(0).default(0),
        costImprovementWithoutIndexation: z.number().min(0).default(0),
        expenditureOnTransfer: z.number().min(0).default(0),
        totalDeductions: z.number().min(0).default(0),

        balance: z.number().default(0),
        deductionSection54: z.number().min(0).default(0),
        ltcgOnAssets: z.number().default(0),

        transferWasBefore23July: z.boolean().default(false),
        transferWasAfter23July: z.boolean().default(false),
      })
    )
    .optional()
    .default([]),

  // B5: For NON-RESIDENTS: from sale of shares or debentures of Indian company
  nonResidentSharesSales: z
    .object({
      // LTCG computed without indexation benefit
      withoutIndexation: z
        .object({
          before23July: z.number().default(0),
          onAfter23July: z.number().default(0),
          totalListedDebentures: z.number().default(0),
          totalOtherThanListedDebentures: z.number().default(0),
          totalUnlistedShares: z.number().default(0),
        })
        .optional(),

      // Deduction under sections 54F
      deductionSection54F: z
        .object({
          before23July: z.number().min(0).default(0),
          onAfter23July: z.number().min(0).default(0),
          totalListedDebentures: z.number().min(0).default(0),
          totalOtherThanListedDebentures: z.number().min(0).default(0),
          totalUnlistedShares: z.number().min(0).default(0),
        })
        .optional(),

      // LTCG on sale of debentures
      ltcgDebentures: z
        .object({
          before23July: z.number().default(0),
          onAfter23July: z.number().default(0),
          totalListedDebentures: z.number().default(0),
          totalOtherThanListedDebentures: z.number().default(0),
          totalUnlistedShares: z.number().default(0),
        })
        .optional(),

      // For NON-RESIDENTS: from sale of unlisted shares or FII
      unlistedOrFII: z
        .object({
          transferWasBefore23July: z.boolean().default(false),
          transferWasAfter23July: z.boolean().default(false),
        })
        .optional(),
    })
    .optional(),

  // B6: For FII/ FPI (NON-RESIDENTS): From sale of shares in company or unit of equity oriented fund
  fpiNonResidentSales: z
    .object({
      transferWasBefore23July: z.boolean().default(false),
      transferWasAfter23July: z.boolean().default(false),

      fullValueConsideration: z.number().min(0).default(0),
      costAcquisitionWithIndexation: z.number().min(0).default(0),
      costAcquisitionWithoutIndexation: z.number().min(0).default(0),
      costImprovementWithoutIndexation: z.number().min(0).default(0),
      expenditureOnTransfer: z.number().min(0).default(0),
      totalDeductions: z.number().min(0).default(0),

      balance: z.number().default(0),
      deductionSection54: z.number().min(0).default(0),
      ltcgOnCapitalAssets: z.number().default(0),
    })
    .optional(),

  // B7: For FII/ FPI (NON-RESIDENTS): from sale of shares in company or unit of equity oriented fund
  fpiFiiSales: z
    .object({
      ltcgColumn14Before23July: z.number().default(0),
      ltcgColumn14After23July: z.number().default(0),

      deductionSection54: z.number().min(0).default(0),
      deductionBefore23July: z.number().min(0).default(0),
      deductionAfter23July: z.number().min(0).default(0),

      ltcgCapitalAssetsBefore23July: z.number().default(0),
      ltcgCapitalAssetsAfter23July: z.number().default(0),
    })
    .optional(),

  // B8: From sale of foreign exchange asset by NON-RESIDENT INDIAN
  foreignExchangeAssetSales: z
    .object({
      ltcgBefore23July: z.number().default(0),
      ltcgAfter23July: z.number().default(0),

      lessDeductionSection115F: z.number().min(0).default(0),
      lessDeductionBefore23July: z.number().min(0).default(0),
      lessDeductionAfter23July: z.number().min(0).default(0),

      balanceBefore23July: z.number().default(0),
      balanceAfter23July: z.number().default(0),
    })
    .optional(),

  // B9: From sale of assets where B1 to B8 above are not applicable
  otherAssetsSales: z
    .array(
      z.object({
        transferWasBefore23July: z.boolean().default(false),
        transferWasAfter23July: z.boolean().default(false),

        caseType: z.enum(["quoted", "unquoted"]).default("quoted"),

        fullValueConsideration: z.number().min(0).default(0),
        fairMarketValue: z.number().min(0).default(0),
        fullValueAdopted: z.number().min(0).default(0),
        fullValueOther: z.number().min(0).default(0),
        totalFullValue: z.number().min(0).default(0),

        costAcquisitionWithIndexation: z.number().min(0).default(0),
        costAcquisitionWithoutIndexation: z.number().min(0).default(0),
        costImprovementWithIndexation: z.number().min(0).default(0),
        costImprovementWithoutIndexation: z.number().min(0).default(0),
        expenditureOnTransfer: z.number().min(0).default(0),
        totalDeductions: z.number().min(0).default(0),

        balance: z.number().default(0),
        deductionSection54: z.number().min(0).default(0),
        ltcgOnAssets: z.number().default(0),
      })
    )
    .optional()
    .default([]),

  // B10: Amount deemed to be long-term capital gains
  amountDeemedLTCG: z
    .object({
      // Whether any unutilized capital gain arose from previous year shown below
      capitalGainAccountDetails: z
        .array(
          z.object({
            previousYear: z.string().max(10).optional().or(z.literal("")),
            section: z.string().max(20).optional().or(z.literal("")),
            previousYearUtilized: z.number().default(0),
            amountUtilizedOutOfCapitalGains: z.number().default(0),
            amountNotUtilizedCapitalGains: z.number().default(0),
            whetherDateLimitationWithdrawal: z
              .string()
              .max(50)
              .optional()
              .or(z.literal("")),
          })
        )
        .optional()
        .default([]),

      amountDeemedBefore23July: z.number().default(0),
      amountDeemedAfter23July: z.number().default(0),
      totalAmountDeemed: z.number().default(0),
    })
    .optional(),

  // B11: Pass Through Income/ Loss in the nature of Long-Term Capital Gain
  ltcgPassThroughIncome: z
    .object({
      at10Percent: z.number().default(0),
      at10PercentNonResident: z.number().default(0),
      at12_5Percent: z.number().default(0),
      at20Percent: z.number().default(0),
    })
    .optional(),

  // B12: Amount of LTCG included in B1-B11 but claimed as not chargeable or chargeable at special rates
  ltcgNotChargeableOrSpecialRates: z
    .array(
      z.object({
        itemNo: z.string().max(10).optional().or(z.literal("")),
        countryNameCode: z.string().max(100).optional().or(z.literal("")),
        articleOfDTAA: z.string().max(50).optional().or(z.literal("")),
        rateAsPerTreatyAnnexure: z
          .number()
          .min(0)
          .max(100)
          .optional()
          .nullable(),
        whetherTRC: z.enum(["Yes", "No"]).optional(),
        sectionOfITAct: z.string().max(50).optional().or(z.literal("")),
        rateAsPerITAct: z.number().min(0).max(100).optional().nullable(),
        applicableRate: z.number().min(0).max(100).optional().nullable(),
      })
    )
    .optional()
    .default([]),

  totalLTCGNotChargeable: z.number().default(0),
  totalLTCGSpecialRates: z.number().default(0),

  // B(A): Capital Loss on buy back of shares
  capitalLossBuyBack: z
    .object({
      longTermLoss: z.number().default(0),
      tenPercent: z.number().default(0),
      tenPercentNonResident: z.number().default(0),
    })
    .optional(),

  // B13: Total long-term capital gain chargeable under I.T. Act
  totalLTCGChargeable: z.number().default(0),

  // C1: Sum of Capital Incomes
  totalCapitalIncome: z.number().default(0),

  // C2: Income from transfer of Virtual Digital Assets
  virtualDigitalAssetIncome: z.number().default(0),

  // C3: Income chargeable under the head "CAPITAL GAINS"
  totalCapitalGainsIncome: z.number().default(0),

  // C4: Deduction claimed against Capital Gains
  deductionClaimedDetails: z
    .array(
      z.object({
        deductionType: z
          .enum([
            "54/54B/54D/54F/54GB",
            "54/54B/54EC",
            "54EC",
            "54E",
            "115F",
          ])
          .optional(),
        dateOfTransferOriginalAsset: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),
        costOfNewResidentialHouse: z.number().min(0).optional().nullable(),
        dateOfPurchaseNewHouse: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),
        amountDepositedCapitalGains: z.number().min(0).optional().nullable(),
        dateOfDeposit: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),
        accountNumber: z.string().max(50).optional().or(z.literal("")),
        ifscCode: z.string().max(20).optional().or(z.literal("")),
        amountOfDeductionClaimed: z.number().min(0).default(0),
      })
    )
    .optional()
    .default([]),

  totalDeductionClaimed: z.number().default(0),

  // E: Set-off of current year capital losses with current year capital gains
  setOffDetails: z
    .object({
      capitalLossToBeSetOff: z
        .array(
          z.object({
            typeOfCapitalGain: z
              .string()
              .max(100)
              .optional()
              .or(z.literal("")),
            capitalGainThisColumn: z.number().default(0),
            shortTermCapitalLoss: z.number().default(0),
            longTermCapitalLoss: z.number().default(0),
            currentYearCapitalGainsRemainingAfterSetOff: z.number().default(0),
          })
        )
        .optional()
        .default([]),

      at15Percent: z
        .object({
          gains: z.number().default(0),
          stcgLoss: z.number().default(0),
          ltcgLoss: z.number().default(0),
          remaining: z.number().default(0),
        })
        .optional(),

      at20Percent: z
        .object({
          gains: z.number().default(0),
          stcgLoss: z.number().default(0),
          ltcgLoss: z.number().default(0),
          remaining: z.number().default(0),
        })
        .optional(),

      at30Percent: z
        .object({
          gains: z.number().default(0),
          stcgLoss: z.number().default(0),
          ltcgLoss: z.number().default(0),
          remaining: z.number().default(0),
        })
        .optional(),

      atApplicableRate: z
        .object({
          gains: z.number().default(0),
          stcgLoss: z.number().default(0),
          ltcgLoss: z.number().default(0),
          remaining: z.number().default(0),
        })
        .optional(),

      dtaaRate: z
        .object({
          gains: z.number().default(0),
          stcgLoss: z.number().default(0),
          ltcgLoss: z.number().default(0),
          remaining: z.number().default(0),
        })
        .optional(),

      totalTaxSetOff: z.number().default(0),
      lossRemainingAfterSetOff: z.number().default(0),
    })
    .optional(),

  // F: Information about accrual/receipt of capital gain
  accrualReceiptInformation: z
    .array(
      z.object({
        typeOfCapitalGain: z
          .string()
          .max(100)
          .optional()
          .or(z.literal("")),
        dateRange: z.string().max(50).optional().or(z.literal("")),
        upTo15_6: z.number().default(0),
        from16_6_to_15_9: z.number().default(0),
        from16_9_to_15_12: z.number().default(0),
        from16_12_to_15_3: z.number().default(0),
        from16_3_to_31_3: z.number().default(0),
      })
    )
    .optional()
    .default([]),
});

export type CapitalGainsSectionBFormData = z.infer<
  typeof capitalGainsSectionBSchema
>;

// Schedule 112A - Equity Shares with STT
export const schedule112ASchema = z.object({
  equityShares: z
    .array(
      z.object({
        // Basic Information
        shareOrUnit: z.enum(["Share", "Unit"]).default("Share"),
        shareTransferred: z
          .string()
          .max(200, "Share/Unit description too long")
          .optional()
          .or(z.literal("")),
        isinCode: z
          .string()
          .max(12, "ISIN Code must be 12 characters")
          .optional()
          .or(z.literal("")),
        nameOfCompany: z
          .string()
          .max(200, "Company name too long")
          .optional()
          .or(z.literal("")),
        numberOfSharesAcquired: z.number().min(0).default(0),
        dateOfAcquisition: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),
        dateOfSale: z
          .string()
          .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
          .optional()
          .or(z.literal("")),

        // Acquisition Details
        acquiredBefore: z.enum(["Before 31.01.2018", "On or after 31.01.2018", "After 23rd July 2024"]).optional(),
        
        // Full Value of Consideration
        fullValueOfConsideration: z.number().min(0).default(0),
        
        // Cost of Acquisition with indexation
        costOfAcquisitionWithIndexation: z.number().min(0).default(0),
        
        // Cost of Acquisition
        costOfAcquisition: z.number().min(0).default(0),
        
        // Fair Market Value on Long-term capital gain per share
        fairMarketValuePerShare: z.number().min(0).default(0),
        
        // Total Market Value
        totalMarketValue: z.number().min(0).default(0),
        
        // Capital gains before exemption
        capitalGainsBeforeExemption: z.number().default(0),
        
        // Capital gains under section 112A before Jan 2018
        capitalGainsUnder112ABeforeJan2018: z.number().default(0),
        
        // Long-term capital gains under 112A before 220* (5\5C/\Ac after 1Apr 14)+11
        ltcgUnder112ABeforeLowRateOf6And11: z.number().default(0),
        
        // Exemption whole or any portion transferred
        exemptionWholeOrAnyPortionTransferred: z.number().min(0).default(0),
        
        // Total deduction
        totalDeduction: z.number().min(0).default(0),
        
        // Balance
        balance: z.number().default(0),
      })
    )
    .default([]),

  // Summary totals
  totals: z.object({
    totalCol14BeforeJuly2024: z.number().default(0),
    totalCol14AfterJuly2024: z.number().default(0),
    totalCol14Overall: z.number().default(0),
    totalLTCGUs112A: z.number().default(0),
  }).default({
    totalCol14BeforeJuly2024: 0,
    totalCol14AfterJuly2024: 0,
    totalCol14Overall: 0,
    totalLTCGUs112A: 0,
  }),
});

export type Schedule112AFormData = z.infer<typeof schedule112ASchema>;
