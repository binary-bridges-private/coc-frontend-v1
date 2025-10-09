// ITR-2 Type Definitions - Based on Official ITR-2 Structure

export interface TdsSalaryDetail {
    employerTAN: string;
    employerName: string;
    salaryPaid: number;
    taxDeducted: number;
  }
  
  export interface TdsOtherDetail {
    deductorTAN: string;
    deductorName: string;
    incomeHead: string;
    grossAmount: number;
    taxDeducted: number;
  }
  
  export interface TcsDetail {
    collectorTAN: string;
    collectorName: string;
    amountPaid: number;
    taxCollected: number;
  }
  
  export interface AdvanceTaxDetail {
    paymentDate: string;
    bsrCode: string;
    serialNumber: string;
    amount: number;
  }
  
  export interface SelfAssessmentTaxDetail {
    paymentDate: string;
    bsrCode: string;
    serialNumber: string;
    amount: number;
  }
  
  export interface BankAccount {
    ifscCode: string;
    bankName: string;
    accountNumber: string;
    accountType: string;
    primaryRefundAccount: boolean;
    selectForRefund: boolean;
  }
  
  export interface CapitalGainSchedule {
    capitalAssetType: string;
    isLongTerm: boolean;
    fullValueConsideration: number;
    costOfAcquisition: number;
    costOfImprovement: number;
    expensesOnTransfer: number;
    indexedCost: number;
    exemptionsClaimed: number;
    netCapitalGain: number;
    foreignCapitalAssets: boolean;
  }
  
  export interface ForeignBankAccountDetail {
    accountNumber: string;
    bankName: string;
    country: string;
    maxBalance: number;
    interestEarned: number;
  }
  
  export interface ForeignImmovablePropertyDetail {
    address: string;
    country: string;
    value: number;
    income: number;
  }
  
  export interface UnlistedShare {
    companyName: string;
    numberOfShares: number;
    faceValue: number;
    marketValue: number;
  }
  
  export interface CoOwnerDetail {
    name: string;
    pan: string;
    sharePercentage: number;
  }
  
  // Schedule 112A - Long-term capital gains on equity shares
  export interface Schedule112ADetail {
    nameOfCompany: string;
    isin: string;
    dateOfTransfer: string;
    saleConsideration: number;
    costOfAcquisition: number;
    longTermCapitalGain: number;
    taxPayable: number;
  }
  
  // Schedule 115AD - Capital gains on foreign assets
  export interface Schedule115ADDetail {
    description: string;
    dateOfTransfer: string;
    saleConsideration: number;
    costOfAcquisition: number;
    capitalGain: number;
    taxPayable: number;
  }
  
  // Schedule CYLA - Current Year Loss Adjustment
  export interface CurrentYearLoss {
    lossType: string;
    lossAmount: number;
    adjustedAgainst: string;
    adjustedAmount: number;
    balanceLoss: number;
  }
  
  // Schedule BFLA - Brought Forward Loss Adjustment
  export interface BroughtForwardLoss {
    assessmentYear: string;
    lossType: string;
    lossAmount: number;
    adjustedAgainst: string;
    adjustedAmount: number;
    balanceLoss: number;
  }
  
  // Schedule CFL - Carry Forward Losses
  export interface CarryForwardLoss {
    lossType: string;
    lossAmount: number;
    carryForwardTo: string;
  }
  
  // Schedule 80G - Donations
  export interface Schedule80GDetail {
    doneeName: string;
    doneeAddress: string;
    doneePAN: string;
    donationAmount: number;
    eligibleDeduction: number;
    section: string;
  }
  
  // Schedule 80GGA - Donations for scientific research
  export interface Schedule80GGADetail {
    doneeName: string;
    doneeAddress: string;
    doneePAN: string;
    donationAmount: number;
    eligibleDeduction: number;
  }
  
  // Schedule AMT - Alternate Minimum Tax
  export interface AMTDetail {
    adjustedTotalIncome: number;
    deductionUnderVI_A: number;
    deductionUnder10AA: number;
    deductionUnder80IA: number;
    deductionUnder80IAB: number;
    deductionUnder80IB: number;
    deductionUnder80IC: number;
    deductionUnder80ID: number;
    deductionUnder80IE: number;
    deductionUnder80JJA: number;
    deductionUnder80JJAA: number;
    deductionUnder80LA: number;
    deductionUnder80P: number;
    deductionUnder80QQB: number;
    deductionUnder80RRB: number;
    deductionUnder80U: number;
    totalDeductions: number;
    adjustedTotalIncomeAfterDeductions: number;
    alternateMinimumTax: number;
    regularTax: number;
    amtPayable: number;
  }
  
  // Schedule AMTC - AMT Credit
  export interface AMTCDetail {
    assessmentYear: string;
    amtCreditAvailable: number;
    amtCreditUtilized: number;
    amtCreditCarriedForward: number;
  }
  
  // Schedule SPI - Income of Specified Persons
  export interface SpecifiedPersonIncome {
    personName: string;
    relationship: string;
    incomeAmount: number;
    taxPaid: number;
    includedInAssesseeIncome: number;
  }
  
  // Schedule SI - Special Income
  export interface SpecialIncome {
    description: string;
    incomeAmount: number;
    taxRate: number;
    taxPayable: number;
  }
  
  // Schedule EI - Exempt Income
  export interface ExemptIncome {
    description: string;
    incomeAmount: number;
    section: string;
  }
  
  // Schedule PTI - Pass Through Income
  export interface PassThroughIncome {
    trustName: string;
    trustPAN: string;
    incomeAmount: number;
    taxPaid: number;
    netIncome: number;
  }
  
  // Schedule FSI - Foreign Source Income
  export interface ForeignSourceIncome {
    country: string;
    incomeType: string;
    incomeAmount: number;
    taxPaidInForeignCountry: number;
    exchangeRate: number;
    incomeInINR: number;
    taxPaidInINR: number;
  }
  
  // Schedule TR - Tax Relief
  export interface TaxRelief {
    country: string;
    incomeAmount: number;
    taxPaidInForeignCountry: number;
    taxPayableInIndia: number;
    reliefClaimed: number;
    section: string;
  }
  
  // Schedule 5A - Portuguese Civil Code
  export interface PortugueseCivilCode {
    spouseName: string;
    spousePAN: string;
    totalIncome: number;
    apportionedIncome: number;
    taxPayable: number;
  }
  
  // Main ITR-2 Form Data Interface
  export interface ItrTwoFormData {
    // Step 1: Personal Information
    firstName: string;
    middleName: string;
    lastName: string;
    pan: string;
    name: string; // Combined name field
    status: string;
    dateOfBirth: string;
    aadharNumber: string;
    
    // Address
    flatDoorBlock: string;
    buildingName: string;
    roadStreet: string;
    localityArea: string;
    cityDistrict: string;
    state: string;
    pinCode: string;
    country: string;
    mobile1: string;
    mobile2: string;
    
    // Step 2: Filing Status
    email1: string;
    email2: string;
    filingSection: string; // natureOfFiling in specification
    returnFileSectionReason: string; // Reason for filing
    filedInResponseTo: string[]; // noticeSection in specification
    optingOut115BAC: string;
    filingUnder7thProviso: string;
    depositedOver1Cr: string;
    depositedAmount: string;
    spentOver2LakhForeign: string;
    foreignTravelAmount: string;
    spentOver1LakhElectricity: string;
    electricityAmount: string;
    otherConditions: string;
    
    // Step 3: Revised/Defective/Modified Return
    isRevisedReturn: boolean; // Boolean flag for revised return
    originalAckNumber: string; // originalAckNumber from specification
    originalFilingDate: string;
    receiptNumber: string;
    noticeDIN: string; // Document Identification Number of notice
    noticeDate: string; // Date of notice/order
    
    // Step 4: Residential Status
    residentialStatus: string[];
    jurisdiction: string; // countryOfResidence renamed
    daysInIndiaCurrentYear: string; // daysInIndia renamed and split
    daysInIndiaLast4Years: string; // Separate field for last 4 years
    passportNumber: string;
    issuedByCountry: string;
    tin: string;
    
    // Step 5: Additional Declarations
    claimBenefit115H: string;
    governedByPortugueseCivilCode: string;
    isFPI: string;
    sebiRegnNo: string;
    filingByRepresentative: string; // filedByRepresentative renamed
    representativeName: string;
    representativeCapacity: string;
    representativeAddress: string;
    representativePAN: string;
    
    // Step 6: Company Involvement
    isDirector: string;
    directorDIN: string;
    directorCompanyPAN: string;
    directorCompanyName: string;
    isListed: string;
    heldUnlistedShares: string;
    unlistedShares: UnlistedShare[];
    
    // Partner in Firm Details
    isPartnerInFirm: string; // Are you a partner in a firm?
    firmName: string; // Name of firm
    firmPAN: string; // PAN of firm
    
    // Step 7: Bank Details
    ifscCode: string;
    bankName: string;
    accountNumber: string;
    accountType: string;
    primaryRefundAccount: boolean;
    
    // Step 8: Schedule S - Income from Salary
    employerName: string;
    employerCategory: string; // employerType renamed to match specification
    employerTAN: string;
    employerAddress: string;
    salaryUnder17_1: string;
    perquisitesUnder17_2: string;
    profitsInLieuUnder17_3: string; // profitInLieuOfSalary renamed
    retirementIncome89A: string; // retirementIncome renamed
    reliefClaimed89A: string; // reliefUnder89A renamed
    allowancesUnderSection10: string; // New field from specification
    standardDeduction: string;
    entertainmentAllowance: string;
    professionalTax: string;
    
    // Step 9: Schedule HP - Income from House Property
    propertyType: string; // Moved to top as per specification
    propertyAddress: string; // Complete address of property
    isCoOwned: string;
    coOwnerDetails: CoOwnerDetail[]; // coOwners renamed to coOwnerDetails
    ownershipShare: string; // Your share of ownership (%)
    tenantName: string;
    tenantPAN: string;
    grossRentReceived: string; // grossRent renamed
    unrealizedRent: string;
    localTaxesPaid: string; // localTaxes renamed
    annualValue: string; // New field from specification
    interestOnBorrowedCapital: string; // loanInterest renamed
    interestPreConstruction: string;
    arrearsReceived: string; // New field from specification
    netIncomeFromProperty: string; // netPropertyIncome renamed
    
    // Step 10: Schedule CG - Capital Gains
    capitalGainsSchedule: CapitalGainSchedule[];
    shortTermGains: string;
    longTermGains: string;
    exemptionSection54: string;
    exemptionSection54EC: string;
    exemptionSection54F: string;
    
    // Step 11: Schedule OS - Income from Other Sources
    interestIncome: string; // Interest income (savings, FD, etc.)
    dividendIncome: string; // Dividend income
    winnings: string; // winningsFromLottery renamed to match specification
    familyPension: string; // Family pension income
    incomeFromOthers: string; // otherMiscIncome renamed
    deductionsAgainstOS: string; // Deductions claimed under section 57
    
    // Step 12: Schedule VI-A - Deductions
    section80C: string; // LIC, PPF, tuition fees, home loan principal etc.
    section80CCC: string; // Pension fund contributions
    section80CCD: string; // NPS contributions (self + employer)
    section80D: string; // Health insurance premiums
    section80DD: string; // Maintenance for handicapped dependent
    section80DDB: string; // Medical treatment for specified diseases
    section80E: string; // Interest on education loan
    section80EE: string; // Interest on home loan for first-time buyer
    section80G: string; // Donations to charity
    section80GGA: string; // Donations for scientific/social research
    section80TTA: string; // Savings interest (non-senior citizens)
    section80TTB: string; // Interest (senior citizens)
    section80U: string; // Disability of self
    otherDeductions: string; // Other eligible deductions
    
    // Step 12A: Schedule CYLA/BFLA/CFL/AMT/AMTC - Loss and AMT Details
    currentYearLossSetOff: string; // Losses set off against current year income
    broughtForwardLossSetOff: string; // Losses brought forward from previous years
    amtPayable: string; // Alternate Minimum Tax payable
    amtCreditCarriedForward: string; // AMT credit carried forward
    
    // Step 13: Taxes Paid
    tdsSalary: string; // TDS deducted on salary
    tdsOthers: string; // TDS deducted on other income
    tcs: string; // Tax collected at source
    advanceTax: string; // Advance tax paid
    selfAssessmentTax: string; // Self-assessment tax paid
    
    // Detailed TDS/TCS/Tax Payment Arrays (for comprehensive tracking)
    tdsSalaryDetails: TdsSalaryDetail[];
    tdsOtherDetails: TdsOtherDetail[];
    tcsDetails: TcsDetail[];
    advanceTaxDetails: AdvanceTaxDetail[];
    selfAssessmentTaxDetails: SelfAssessmentTaxDetail[];
    
    // Step 14: Enhanced Bank Accounts
    bankAccounts: BankAccount[];
    
    // Step 15: Schedule AL - Assets and Liabilities (if total income > ₹50L)
    immovableAssets: string; // Details of land/buildings with location and cost
    movableAssets: string; // Vehicles, jewellery, etc.
    financialAssets: string; // Shares, bonds, etc.
    totalAssets: string; // Total assets value
    totalLiabilities: string; // Total loans and liabilities
    
    // Detailed Asset & Liability Breakdown
    immovableAssetsDetails: {
      landBuildings: string;
      otherImmovable: string;
    };
    movableAssetsDetails: {
      cashInHand: string;
      jewelryBullion: string;
      vehicles: string;
      bankDeposits: string;
      sharesSecurities: string;
      otherMovable: string;
    };
    liabilitiesDetails: {
      securedLoans: string;
      unsecuredLoans: string;
      otherLiabilities: string;
    };
    
    // Step 16: Schedule FA - Foreign Assets
    foreignBankAccounts: string; // Details of foreign bank accounts held
    foreignDeposits: string; // Foreign deposits/investments
    foreignImmovableProperty: string; // Property held abroad (address, country)
    foreignTrusts: string; // Interest in foreign trusts/entities
    foreignTaxPaid: string; // Tax paid in foreign country
    
    // Detailed Foreign Asset Arrays (for comprehensive tracking)
    foreignBankAccountDetails: ForeignBankAccountDetail[];
    foreignImmovablePropertyDetails: ForeignImmovablePropertyDetail[];
    
    // Step 17: Enhanced Verification
    verificationName: string;
    fatherName: string;
    capacity: string;
    declarationPlace: string;
    declarationDate: string;
    
    // Additional Schedules - Missing from current implementation
    // Schedule 112A - Long-term capital gains on equity shares
    schedule112ADetails: Schedule112ADetail[];
    
    // Schedule 115AD - Capital gains on foreign assets
    schedule115ADDetails: Schedule115ADDetail[];
    
    // Schedule CYLA - Current Year Loss Adjustment
    currentYearLosses: CurrentYearLoss[];
    
    // Schedule BFLA - Brought Forward Loss Adjustment
    broughtForwardLosses: BroughtForwardLoss[];
    
    // Schedule CFL - Carry Forward Losses
    carryForwardLosses: CarryForwardLoss[];
    
    // Schedule 80G - Donations
    schedule80GDetails: Schedule80GDetail[];
    
    // Schedule 80GGA - Donations for scientific research
    schedule80GGADetails: Schedule80GGADetail[];
    
    // Schedule AMT - Alternate Minimum Tax
    amtDetails: AMTDetail;
    
    // Schedule AMTC - AMT Credit
    amtcDetails: AMTCDetail[];
    
    // Schedule SPI - Income of Specified Persons
    specifiedPersonIncomes: SpecifiedPersonIncome[];
    
    // Schedule SI - Special Income
    specialIncomes: SpecialIncome[];
    
    // Schedule EI - Exempt Income
    exemptIncomes: ExemptIncome[];
    
    // Schedule PTI - Pass Through Income
    passThroughIncomes: PassThroughIncome[];
    
    // Schedule FSI - Foreign Source Income
    foreignSourceIncomes: ForeignSourceIncome[];
    
    // Schedule TR - Tax Relief
    taxReliefs: TaxRelief[];
    
    // Schedule 5A - Portuguese Civil Code
    portugueseCivilCodeDetails: PortugueseCivilCode;
    
    // Part B - Total Income Computation
    grossTotalIncome: string;
    totalDeductionsUnderVI_A: string;
    totalIncome: string;
    agriculturalIncome: string;
    
    // Part B-TTI - Tax Liability on Total Income
    taxOnTotalIncome: string;
    rebateUnder87A: string;
    taxAfterRebate: string;
    healthAndEducationCess: string;
    totalTaxAndCess: string;
    reliefUnder89: string;
    reliefUnder90: string;
    reliefUnder90A: string;
    reliefUnder91: string;
    totalRelief: string;
    balanceTaxAfterRelief: string;
    interestUnder234A: string;
    interestUnder234B: string;
    interestUnder234C: string;
    interestUnder234F: string;
    totalInterestAndFee: string;
    totalTaxFeeInterest: string;
    totalTaxPaid: string;
    refundDue: string;
    balancePayable: string;
  }
  
  // Form Errors Interface
  export interface ItrTwoFormErrors {
    [key: string]: string;
  }
  
  // Form Steps Interface
  export interface ItrTwoStep {
    id: number;
    title: string;
    description: string;
    fields: string[];
  }
  
  