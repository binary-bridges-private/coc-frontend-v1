import { z } from "zod";

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const aadhaarRegex = /^\d{12}$/;

const pinRegex = /^\d{6}$/;

const mobileRegex = /^\d{10}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format"),

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

    depositedAmountExceeds1Crore: z.enum(["Yes", "No"]).optional(),
    depositedAmount: z
      .number()
      .positive("Amount must be positive")
      .min(10000000, "Amount must be at least Rs. 1 Crore")
      .optional()
      .nullable(),

    incurredExpenditureExceeds2Lakhs: z.enum(["Yes", "No"]).optional(),
    incurredExpenditureAmount: z
      .number()
      .positive("Amount must be positive")
      .min(200000, "Amount must be at least Rs. 2 Lakhs")
      .optional()
      .nullable(),

    electricityExpenditureExceeds1Lakh: z.enum(["Yes", "No"]).optional(),
    electricityExpenditureAmount: z
      .number()
      .positive("Amount must be positive")
      .min(100000, "Amount must be at least Rs. 1 Lakh")
      .optional()
      .nullable(),

    otherConditionsApplicable: z.enum(["Yes", "No"]).optional(),
    relevantCondition: z.string().max(200).optional().or(z.literal("")),

    isRevisedDefectiveModified: z.boolean().default(false),
    originalReceiptNumber: z
      .string()
      .max(50)
      .regex(
        /^[A-Z0-9]+$/,
        "Receipt number should contain only letters and numbers"
      )
      .optional()
      .or(z.literal("")),
    originalFilingDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
      .optional()
      .or(z.literal("")),

    filedInResponseToNotice: z.boolean().default(false),
    uniqueDocumentNumber: z.string().max(50).optional().or(z.literal("")),
    noticeDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
      .optional()
      .or(z.literal("")),
    advancePricingAgreementDate: z.string().optional(),

    residentialStatus: z.enum(
      ["Resident", "Resident but not Ordinarily Resident", "Non-resident"],
      {
        message: "Please select residential status",
      }
    ),

    residentDaysInIndia: z.number().min(0).max(366).optional(),
    residentCondition: z.string().max(500).optional(),

    rnorDaysInIndia: z.number().min(0).max(366).optional(),
    rnorCondition: z.string().max(500).optional(),

    nonResidentDaysInIndia: z.number().min(0).max(366).optional(),
    jurisdictionOfResidence: z.string().max(200).optional(),
    taxpayerIdentificationNumber: z.string().max(100).optional(),
    totalPeriodInIndiaPreviousYear: z.number().min(0).max(366).optional(),
    totalPeriodInIndiaPreceding4Years: z.number().min(0).max(1464).optional(),

    daysInIndia: z
      .number()
      .int("Must be a whole number")
      .min(0, "Days cannot be negative")
      .max(366, "Days cannot exceed 366")
      .optional(),

    daysInIndiaPreviousYear: z
      .number()
      .int("Must be a whole number")
      .min(0, "Days cannot be negative")
      .max(366, "Days cannot exceed 366")
      .optional(),
    daysInIndiaPreceding4Years: z
      .number()
      .int("Must be a whole number")
      .min(0, "Days cannot be negative")
      .max(1464, "Days cannot exceed 1464 (4 years)")
      .optional(),

    section115HBenefit: z.enum(["Yes", "No"]).optional(),

    portugueseCivilCode: z.enum(["Yes", "No"]).optional(),
    sebiRegNo: z
      .string()
      .regex(/^[A-Z0-9\/\-]+$/, "Invalid SEBI Reg No. format")
      .max(50)
      .optional()
      .or(z.literal("")),

    fpiYesNo: z.enum(["Yes", "No"]).optional(),
    leiNumber: z
      .string()
      .min(20, "LEI must be 20 characters")
      .max(20, "LEI must be 20 characters")
      .regex(/^[A-Z0-9]{20}$/, "LEI must be 20 alphanumeric characters")
      .optional(),
    leiValidDate: z
      .string()
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Date must be in DD/MM/YYYY format")
      .optional(),

    representativeAssessee: z.enum(["Yes", "No"]).optional(),
    representativeName: z
      .string()
      .max(200)
      .regex(
        /^[A-Za-z\s.'-]+$/,
        "Name can only contain letters, spaces, periods, apostrophes"
      )
      .optional()
      .or(z.literal("")),
    representativeCapacity: z.string().max(200).optional().or(z.literal("")),
    representativeAddress: z.string().max(500).optional().or(z.literal("")),
    representativePan: z
      .string()
      .regex(panRegex, "Invalid PAN format (e.g., ABCDE1234F)")
      .optional()
      .or(z.literal("")),
    representativeAadhaar: z
      .string()
      .regex(aadhaarRegex, "Invalid Aadhaar number (must be 12 digits)")
      .optional()
      .or(z.literal("")),

    wasDirector: z.enum(["Yes", "No"]).optional(),
    companyDetails: z
      .array(
        z.object({
          companyName: z.string().max(200),
          companyType: z.string().max(50),
          pan: z.string().regex(panRegex, "Invalid PAN format"),
          sharesListed: z.boolean(),
          din: z.string().max(50),
        })
      )
      .optional(),

    heldUnlistedEquity: z.enum(["Yes", "No"]).optional(),
    equitySharesDetails: z
      .array(
        z.object({
          companyName: z.string().max(200),
          companyType: z.string().max(50),
          pan: z.string().regex(panRegex, "Invalid PAN format"),
          openingBalance: z.number().min(0),
          sharesAcquired: z.number().min(0),
          purchasePrice: z.number().min(0),
          sharesTransferred: z.number().min(0),
          salePrice: z.number().min(0),
          closingBalance: z.number().min(0),
          costOfAcquisition: z.number().min(0),
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
