import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItrTwo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr2-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('itr2-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
    // Step 1: Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    pan: "",
    name: "", // Combined name field
    status: "",
    dateOfBirth: "",
    aadharNumber: "",
    
    // Address
    flatDoorBlock: "",
    buildingName: "",
    roadStreet: "",
    localityArea: "",
    cityDistrict: "",
    state: "",
    pinCode: "",
    country: "India",
    mobile1: "",
    mobile2: "",
    
    // Step 2: Filing Status
    email1: "",
    email2: "",
    filingSection: "", // natureOfFiling in specification
    returnFileSectionReason: "", // Reason for filing
    filedInResponseTo: [] as string[], // noticeSection in specification
    optingOut115BAC: "",
    filingUnder7thProviso: "",
    depositedOver1Cr: "",
    depositedAmount: "",
    spentOver2LakhForeign: "",
    foreignTravelAmount: "",
    spentOver1LakhElectricity: "",
    electricityAmount: "",
    otherConditions: "",
    
    // Step 3: Revised/Defective/Modified Return
    isRevisedReturn: false, // Boolean flag for revised return
    originalAckNumber: "", // originalAckNumber from specification
    originalFilingDate: "",
    receiptNumber: "",
    noticeDIN: "", // Document Identification Number of notice
    noticeDate: "", // Date of notice/order
    
    // Step 4: Residential Status
    residentialStatus: [] as string[],
    jurisdiction: "", // countryOfResidence renamed
    daysInIndiaCurrentYear: "", // daysInIndia renamed and split
    daysInIndiaLast4Years: "", // Separate field for last 4 years
    passportNumber: "",
    issuedByCountry: "",
    tin: "",
    
    // Step 5: Additional Declarations
    claimBenefit115H: "",
    governedByPortugueseCivilCode: "",
    isFPI: "",
    sebiRegnNo: "",
    filingByRepresentative: "", // filedByRepresentative renamed
    representativeName: "",
    representativeCapacity: "",
    representativeAddress: "",
    representativePAN: "",
    
    // Step 6: Company Involvement
    isDirector: "",
    directorDIN: "",
    directorCompanyPAN: "",
    directorCompanyName: "",
    isListed: "",
    heldUnlistedShares: "",
    unlistedShares: [],
    
    // Partner in Firm Details
    isPartnerInFirm: "", // Are you a partner in a firm?
    firmName: "", // Name of firm
    firmPAN: "", // PAN of firm
    
    // Step 7: Bank Details
    ifscCode: "",
    bankName: "",
    accountNumber: "",
    accountType: "",
    primaryRefundAccount: false,
    
    // Step 8: Schedule S - Income from Salary
    employerName: "",
    employerCategory: "", // employerType renamed to match specification
    employerTAN: "",
    employerAddress: "",
    salaryUnder17_1: "",
    perquisitesUnder17_2: "",
    profitsInLieuUnder17_3: "", // profitInLieuOfSalary renamed
    retirementIncome89A: "", // retirementIncome renamed
    reliefClaimed89A: "", // reliefUnder89A renamed
    allowancesUnderSection10: "", // New field from specification
    standardDeduction: "",
    entertainmentAllowance: "",
    professionalTax: "",
    
    // Step 9: Schedule HP - Income from House Property
    propertyType: "", // Moved to top as per specification
    propertyAddress: "", // Complete address of property
    isCoOwned: "",
    coOwnerDetails: [], // coOwners renamed to coOwnerDetails
    ownershipShare: "", // Your share of ownership (%)
    tenantName: "",
    tenantPAN: "",
    grossRentReceived: "", // grossRent renamed
    unrealizedRent: "",
    localTaxesPaid: "", // localTaxes renamed
    annualValue: "", // New field from specification
    interestOnBorrowedCapital: "", // loanInterest renamed
    interestPreConstruction: "",
    arrearsReceived: "", // New field from specification
    netIncomeFromProperty: "", // netPropertyIncome renamed
    
    // Step 10: Schedule CG - Capital Gains
    capitalGainsSchedule: [] as Array<{
      capitalAssetType: string; // Type of capital asset (e.g., land, equity, bonds)
      isLongTerm: boolean; // Whether gain is long term
      fullValueConsideration: number; // Sale value
      costOfAcquisition: number;
      costOfImprovement: number; // Cost of improvement
      expensesOnTransfer: number; // Expenses on transfer
      indexedCost: number; // Indexed cost (for LTCG)
      exemptionsClaimed: number; // Exemptions claimed (u/s 54, 54EC, etc.)
      netCapitalGain: number; // Capital gain after exemption
      foreignCapitalAssets: boolean; // Whether the capital asset is located outside India
    }>,
    shortTermGains: "" as string,
    longTermGains: "" as string,
    exemptionSection54: "",
    exemptionSection54EC: "",
    exemptionSection54F: "",
    
    // Step 11: Schedule OS - Income from Other Sources
    interestIncome: "", // Interest income (savings, FD, etc.)
    dividendIncome: "", // Dividend income
    winnings: "", // winningsFromLottery renamed to match specification
    familyPension: "", // Family pension income
    incomeFromOthers: "", // otherMiscIncome renamed
    deductionsAgainstOS: "", // Deductions claimed under section 57
    
    // Step 12: Schedule VI-A - Deductions
    section80C: "", // LIC, PPF, tuition fees, home loan principal etc.
    section80CCC: "", // Pension fund contributions
    section80CCD: "", // NPS contributions (self + employer)
    section80D: "", // Health insurance premiums
    section80DD: "", // Maintenance for handicapped dependent
    section80DDB: "", // Medical treatment for specified diseases
    section80E: "", // Interest on education loan
    section80EE: "", // Interest on home loan for first-time buyer
    section80G: "", // Donations to charity
    section80GGA: "", // Donations for scientific/social research
    section80TTA: "", // Savings interest (non-senior citizens)
    section80TTB: "", // Interest (senior citizens)
    section80U: "", // Disability of self
    otherDeductions: "", // Other eligible deductions
    
    // Step 12A: Schedule CYLA/BFLA/CFL/AMT/AMTC - Loss and AMT Details
    currentYearLossSetOff: "", // Losses set off against current year income
    broughtForwardLossSetOff: "", // Losses brought forward from previous years
    carryForwardLosses: "", // Losses carried forward to future years
    amtPayable: "", // Alternate Minimum Tax payable
    amtCreditCarriedForward: "", // AMT credit carried forward
    
    // Step 13: Taxes Paid
    tdsSalary: "", // TDS deducted on salary
    tdsOthers: "", // TDS deducted on other income
    tcs: "", // Tax collected at source
    advanceTax: "", // Advance tax paid
    selfAssessmentTax: "", // Self-assessment tax paid
    
    // Detailed TDS/TCS/Tax Payment Arrays (for comprehensive tracking)
    tdsSalaryDetails: [] as Array<{
      employerTAN: string;
      employerName: string;
      salaryPaid: number;
      taxDeducted: number;
    }>,
    tdsOtherDetails: [] as Array<{
      deductorTAN: string;
      deductorName: string;
      incomeHead: string;
      grossAmount: number;
      taxDeducted: number;
    }>,
    tcsDetails: [] as Array<{
      collectorTAN: string;
      collectorName: string;
      amountPaid: number;
      taxCollected: number;
    }>,
    advanceTaxDetails: [] as Array<{
      paymentDate: string;
      bsrCode: string;
      serialNumber: string;
      amount: number;
    }>,
    selfAssessmentTaxDetails: [] as Array<{
      paymentDate: string;
      bsrCode: string;
      serialNumber: string;
      amount: number;
    }>,
    
    // Step 14: Enhanced Bank Accounts
    bankAccounts: [] as Array<{
      ifscCode: string;
      bankName: string;
      accountNumber: string;
      accountType: string;
      primaryRefundAccount: boolean;
    }>,
    
    // Step 15: Schedule AL - Assets and Liabilities (if total income > ₹50L)
    immovableAssets: "", // Details of land/buildings with location and cost
    movableAssets: "", // Vehicles, jewellery, etc.
    financialAssets: "", // Shares, bonds, etc.
    totalAssets: "", // Total assets value
    totalLiabilities: "", // Total loans and liabilities
    
    // Detailed Asset & Liability Breakdown
    immovableAssetsDetails: {
      landBuildings: "",
      otherImmovable: "",
    },
    movableAssetsDetails: {
      cashInHand: "",
      jewelryBullion: "",
      vehicles: "",
      bankDeposits: "",
      sharesSecurities: "",
      otherMovable: "",
    },
    liabilitiesDetails: {
      securedLoans: "",
      unsecuredLoans: "",
      otherLiabilities: "",
    },
    
    // Step 16: Schedule FA - Foreign Assets
    foreignBankAccounts: "", // Details of foreign bank accounts held
    foreignDeposits: "", // Foreign deposits/investments
    foreignImmovableProperty: "", // Property held abroad (address, country)
    foreignTrusts: "", // Interest in foreign trusts/entities
    foreignTaxPaid: "", // Tax paid in foreign country
    
    // Detailed Foreign Asset Arrays (for comprehensive tracking)
    foreignBankAccountDetails: [] as Array<{
      accountNumber: string;
      bankName: string;
      country: string;
      maxBalance: number;
      interestEarned: number;
    }>,
    foreignImmovablePropertyDetails: [] as Array<{
      address: string;
      country: string;
      value: number;
      income: number;
    }>,
    
    // Step 17: Enhanced Verification
    verificationName: "",
    fatherName: "",
    capacity: "",
    declarationPlace: "",
    declarationDate: "",
  };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr2-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr2-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: prev[name].includes(value) 
          ? prev[name].filter(item => item !== value)
          : [...prev[name], value]
      };
      localStorage.setItem('itr2-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
          isValid = false;
        }
        if (!formData.pan) {
          newErrors.pan = "PAN is required";
          isValid = false;
        }
        if (!formData.status) {
          newErrors.status = "Status is required";
          isValid = false;
        }
        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = "Date of birth is required";
          isValid = false;
        }
        if (!formData.aadharNumber) {
          newErrors.aadharNumber = "Aadhar number is required";
          isValid = false;
        }
        break;
      case 2:
        if (!formData.email1) {
          newErrors.email1 = "Email address is required";
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email1)) {
          newErrors.email1 = "Please enter a valid email address";
          isValid = false;
        }
        if (!formData.filingSection) {
          newErrors.filingSection = "Filing section is required";
          isValid = false;
        }
        if (formData.filingUnder7thProviso === "yes") {
          if (!formData.depositedOver1Cr) {
            newErrors.depositedOver1Cr = "Please specify if deposited over ₹1 Cr";
          isValid = false;
        }
          if (formData.depositedOver1Cr === "yes" && !formData.depositedAmount) {
            newErrors.depositedAmount = "Please enter deposited amount";
          isValid = false;
        }
          if (!formData.spentOver2LakhForeign) {
            newErrors.spentOver2LakhForeign = "Please specify foreign travel expenses";
          isValid = false;
        }
          if (formData.spentOver2LakhForeign === "yes" && !formData.foreignTravelAmount) {
            newErrors.foreignTravelAmount = "Please enter foreign travel amount";
          isValid = false;
        }
          if (!formData.spentOver1LakhElectricity) {
            newErrors.spentOver1LakhElectricity = "Please specify electricity expenses";
          isValid = false;
        }
          if (formData.spentOver1LakhElectricity === "yes" && !formData.electricityAmount) {
            newErrors.electricityAmount = "Please enter electricity amount";
          isValid = false;
        }
        }
        break;
      case 3:
        // Step 3 is optional, no validation required
        break;
      case 4:
        if (formData.residentialStatus.length === 0) {
          newErrors.residentialStatus = "Please select at least one residential status";
          isValid = false;
        }
        if (!formData.jurisdiction) {
          newErrors.jurisdiction = "Country of residence is required";
          isValid = false;
        }
        if (!formData.daysInIndiaCurrentYear) {
          newErrors.daysInIndiaCurrentYear = "Days in India is required";
          isValid = false;
        } else if (parseInt(formData.daysInIndiaCurrentYear) < 0 || parseInt(formData.daysInIndiaCurrentYear) > 365) {
          newErrors.daysInIndiaCurrentYear = "Please enter valid days (0-365)";
          isValid = false;
        }
        break;
      case 5:
        if (!formData.claimBenefit115H) {
          newErrors.claimBenefit115H = "Please specify if claiming benefit under 115H";
          isValid = false;
        }
        if (!formData.governedByPortugueseCivilCode) {
          newErrors.governedByPortugueseCivilCode = "Please specify Portuguese Civil Code status";
          isValid = false;
        }
        if (!formData.isFPI) {
          newErrors.isFPI = "Please specify FPI status";
          isValid = false;
        }
        if (formData.isFPI === "yes" && !formData.sebiRegnNo) {
          newErrors.sebiRegnNo = "SEBI registration number is required for FPI";
          isValid = false;
        }
        if (!formData.filedByRepresentative) {
          newErrors.filedByRepresentative = "Please specify if filed by representative";
          isValid = false;
        }
        if (formData.filedByRepresentative === "yes") {
          if (!formData.representativeName) {
            newErrors.representativeName = "Representative name is required";
          isValid = false;
        }
          if (!formData.representativeCapacity) {
            newErrors.representativeCapacity = "Representative capacity is required";
          isValid = false;
        }
          if (!formData.representativeAddress) {
            newErrors.representativeAddress = "Representative address is required";
          isValid = false;
        }
          if (!formData.representativePAN) {
            newErrors.representativePAN = "Representative PAN/Aadhaar is required";
          isValid = false;
        }
        }
        break;
      case 6:
        if (!formData.isDirector) {
          newErrors.isDirector = "Please specify if you are a director";
          isValid = false;
        }
        if (formData.isDirector === "yes") {
          if (!formData.directorDIN) {
            newErrors.directorDIN = "DIN is required for directors";
          isValid = false;
        }
          if (!formData.directorCompanyPAN) {
            newErrors.directorCompanyPAN = "Company PAN is required";
          isValid = false;
        }
          if (!formData.directorCompanyName) {
            newErrors.directorCompanyName = "Company name is required";
          isValid = false;
        }
          if (!formData.isListed) {
            newErrors.isListed = "Please specify if company is listed/unlisted";
          isValid = false;
        }
        }
        if (!formData.heldUnlistedShares) {
          newErrors.heldUnlistedShares = "Please specify if held unlisted shares";
          isValid = false;
        }
        break;
      case 7:
        if (!formData.ifscCode) {
          newErrors.ifscCode = "IFSC code is required";
          isValid = false;
        } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.toUpperCase())) {
          newErrors.ifscCode = "Please enter a valid IFSC code";
          isValid = false;
        }
        if (!formData.bankName) {
          newErrors.bankName = "Bank name is required";
          isValid = false;
        }
        if (!formData.accountNumber) {
          newErrors.accountNumber = "Account number is required";
          isValid = false;
        } else if (formData.accountNumber.length < 9 || formData.accountNumber.length > 18) {
          newErrors.accountNumber = "Account number should be 9-18 digits";
          isValid = false;
        }
        if (!formData.accountType) {
          newErrors.accountType = "Account type is required";
          isValid = false;
        }
        break;
      case 8:
        if (!formData.employerName) {
          newErrors.employerName = "Employer name is required";
          isValid = false;
        }
        if (!formData.employerType) {
          newErrors.employerType = "Employer type is required";
          isValid = false;
        }
        if (!formData.employerTAN) {
          newErrors.employerTAN = "Employer TAN is required";
          isValid = false;
        } else if (!/^[A-Z]{4}[A-Z0-9]{5}[A-Z]$/.test(formData.employerTAN.toUpperCase())) {
          newErrors.employerTAN = "Please enter a valid TAN";
          isValid = false;
        }
        if (!formData.employerAddress) {
          newErrors.employerAddress = "Employer address is required";
          isValid = false;
        }
        // Validate numeric fields
        const salaryFields = [
          'salaryUnder17_1', 'perquisitesUnder17_2', 'profitInLieuOfSalary',
          'retirementIncome', 'reliefUnder89A', 'standardDeduction',
          'entertainmentAllowance', 'professionalTax'
        ];
        salaryFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 9:
        if (!formData.propertyAddress) {
          newErrors.propertyAddress = "Property address is required";
          isValid = false;
        }
        if (!formData.propertyCity) {
          newErrors.propertyCity = "Property city is required";
          isValid = false;
        }
        if (!formData.propertyState) {
          newErrors.propertyState = "Property state is required";
          isValid = false;
        }
        if (!formData.propertyCountry) {
          newErrors.propertyCountry = "Property country is required";
          isValid = false;
        }
        if (!formData.propertyPIN) {
          newErrors.propertyPIN = "Property PIN is required";
          isValid = false;
        } else if (!/^[0-9]{6}$/.test(formData.propertyPIN)) {
          newErrors.propertyPIN = "Please enter a valid 6-digit PIN";
          isValid = false;
        }
        if (!formData.isCoOwned) {
          newErrors.isCoOwned = "Please specify if property is co-owned";
          isValid = false;
        }
        if (!formData.propertyType) {
          newErrors.propertyType = "Property type is required";
          isValid = false;
        }
        // Validate numeric fields
        const propertyFields = [
          'grossRent', 'unrealizedRent', 'localTaxes', 'loanInterest', 'interestPreConstruction'
        ];
        propertyFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 10:
        // Step 10: Capital Gains - optional but validate if filled
        const capitalGainsFields = [
          'shortTermGains', 'longTermGains', 'exemptionSection54', 
          'exemptionSection54EC', 'exemptionSection54F', 'foreignCapitalAssets'
        ];
        capitalGainsFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 11:
        // Step 11: Other Income - validate numeric fields
        const otherIncomeFields = [
          'interestIncome', 'dividendIncome', 'familyPension', 
          'winningsFromLottery', 'giftIncome', 'otherMiscIncome'
        ];
        otherIncomeFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 12:
        // Step 12: Deductions - validate numeric fields
        const deductionFields = [
          'section80C', 'section80CCC', 'section80CCD', 'section80D', 'section80DD', 
          'section80DDB', 'section80E', 'section80EE', 'section80G', 'section80GGA',
          'section80TTA', 'section80TTB', 'section80U', 'otherDeductions'
        ];
        deductionFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 13:
        // Step 13: Tax Details - optional validation
        if (formData.totalTaxPaid && isNaN(parseFloat(formData.totalTaxPaid))) {
          newErrors.totalTaxPaid = "Please enter a valid amount";
          isValid = false;
        }
        break;
      case 14:
        // Step 14: Verification - mandatory fields
        if (!formData.verificationName.trim()) {
          newErrors.verificationName = "Verifier name is required";
          isValid = false;
        }
        if (!formData.fatherName.trim()) {
          newErrors.fatherName = "Father's name is required";
          isValid = false;
        }
        if (!formData.capacity) {
          newErrors.capacity = "Capacity is required";
          isValid = false;
        }
        if (!formData.declarationPlace.trim()) {
          newErrors.declarationPlace = "Declaration place is required";
          isValid = false;
        }
        if (!formData.declarationDate) {
          newErrors.declarationDate = "Declaration date is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 14) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr2-current-step'); // Clear step on completion
          localStorage.removeItem('itr2-form-data'); // Clear form data on completion
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-2. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr2-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr2-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles = {
      1: "Personal Information",
      2: "Contact & Address",
      3: "Filing Status & Section",
      4: "Residential Status & Passport Details",
      5: "Additional Declarations",
      6: "Company Involvement",
      7: "Enhanced Bank Details",
      8: "Schedule S - Income from Salary",
      9: "Schedule HP - Income from House Property",
      10: "Capital Gains",
      11: "Other Income",
      12: "Deductions (Chapter VI-A)",
      13: "Tax Details & TDS/TCS",
      14: "Verification"
    };
    return titles[stepNumber] || "";
  };

  return (
    <>
      <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200">
        <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
          <li
            className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice")}
          >
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
            </svg>
            Practice
          </li>
          <span className="text-gray-400">›</span>
          <li
            className="transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice/itr")}
          >
            ITR
          </li>
          <span className="text-gray-400">›</span>
          <li className="text-gray-500">ITR-2</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 14: ${getStepTitle(step)}`}
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pan"
                  maxLength={10}
                  placeholder="ABCDE1234F"
                  value={formData.pan}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="individual"
                      name="status"
                      value="individual"
                      checked={formData.status === "individual"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="individual" className="ml-2 text-sm font-medium text-gray-700">
                      Individual
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="huf"
                      name="status"
                      value="huf"
                      checked={formData.status === "huf"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="huf" className="ml-2 text-sm font-medium text-gray-700">
                      HUF
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date of Birth / Formation <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadharNumber"
                  maxLength={12}
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Contact & Address */}
        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Contact & Address</h3>
            
            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Primary Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email1"
                  value={formData.email1}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email1 ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Alternate Email Address
                </label>
                <input
                  type="email"
                  name="email2"
                  value={formData.email2}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Primary Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile1"
                  value={formData.mobile1}
                  onChange={handleChange}
                  placeholder="Enter mobile number with STD code"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Secondary Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile2"
                  value={formData.mobile2}
                  onChange={handleChange}
                  placeholder="Enter alternate mobile number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h4 className="mb-4 text-md font-semibold text-gray-700">Address Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Flat/Door/Block No.
                </label>
                <input
                  type="text"
                    name="flatDoorBlock"
                    value={formData.flatDoorBlock}
                  onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Building/Premises Name
                </label>
                <input
                  type="text"
                    name="buildingName"
                    value={formData.buildingName}
                  onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Road/Street
                </label>
                <input
                  type="text"
                    name="roadStreet"
                    value={formData.roadStreet}
                  onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Locality/Area
                </label>
                <input
                    type="text"
                    name="localityArea"
                    value={formData.localityArea}
                  onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    City/District
                </label>
                  <input
                    type="text"
                    name="cityDistrict"
                    value={formData.cityDistrict}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    State
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                    <option value="assam">Assam</option>
                    <option value="bihar">Bihar</option>
                    <option value="chhattisgarh">Chhattisgarh</option>
                    <option value="goa">Goa</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="haryana">Haryana</option>
                    <option value="himachal-pradesh">Himachal Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="mizoram">Mizoram</option>
                    <option value="nagaland">Nagaland</option>
                    <option value="odisha">Odisha</option>
                    <option value="punjab">Punjab</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="sikkim">Sikkim</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="telangana">Telangana</option>
                    <option value="tripura">Tripura</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="west-bengal">West Bengal</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    PIN Code
                  </label>
                  <input
                    type="number"
                    name="pinCode"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Primary Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile1"
                    value={formData.mobile1}
                    onChange={handleChange}
                    placeholder="Enter mobile number with STD code"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Secondary Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile2"
                    value={formData.mobile2}
                    onChange={handleChange}
                    placeholder="Enter alternate mobile number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Filing Status & Section */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Filing Status</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address-1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email1"
                    value={formData.email1}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email1 ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address-2
                  </label>
                  <input
                    type="email"
                    name="email2"
                    value={formData.email2}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Filing Section <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['139(1)', '139(4)', '139(5)', '92CD', '119(2)(b)'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={option}
                        name="filingSection"
                        value={option}
                        checked={formData.filingSection === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={option} className="ml-2 text-sm font-medium text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Reason for Filing
                </label>
                <input
                  type="text"
                  name="returnFileSectionReason"
                  value={formData.returnFileSectionReason}
                  onChange={handleChange}
                  placeholder="e.g., loss carried forward"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Revised Return Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Is this a Revised Return?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="revisedYes"
                          name="isRevisedReturn"
                          value="true"
                          checked={formData.isRevisedReturn === true}
                          onChange={(e) => setFormData(prev => ({ ...prev, isRevisedReturn: e.target.value === 'true' }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="revisedYes" className="ml-2 text-sm font-medium text-gray-700">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="revisedNo"
                          name="isRevisedReturn"
                          value="false"
                          checked={formData.isRevisedReturn === false}
                          onChange={(e) => setFormData(prev => ({ ...prev, isRevisedReturn: e.target.value === 'true' }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="revisedNo" className="ml-2 text-sm font-medium text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.isRevisedReturn && (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Original Acknowledgment Number
                      </label>
                      <input
                        type="text"
                        name="originalAckNumber"
                        value={formData.originalAckNumber}
                        onChange={handleChange}
                        placeholder="Enter original ACK number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Notice Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Notice DIN
                    </label>
                    <input
                      type="text"
                      name="noticeDIN"
                      value={formData.noticeDIN}
                      onChange={handleChange}
                      placeholder="Enter DIN of notice"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Notice Date
                    </label>
                    <input
                      type="date"
                      name="noticeDate"
                      value={formData.noticeDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Filed in response to notice u/s
                </label>
                <div className="space-y-2">
                  {['139(9)', '142(1)', '148', '153C'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        checked={formData.filedInResponseTo.includes(option)}
                        onChange={() => handleCheckboxChange('filedInResponseTo', option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={option} className="ml-2 text-sm font-medium text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Opting out of 115BAC?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="optingOutYes"
                      name="optingOut115BAC"
                      value="yes"
                      checked={formData.optingOut115BAC === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="optingOutYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="optingOutNo"
                      name="optingOut115BAC"
                      value="no"
                      checked={formData.optingOut115BAC === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="optingOutNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Filing under 7th proviso?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="filingUnder7thYes"
                      name="filingUnder7thProviso"
                      value="yes"
                      checked={formData.filingUnder7thProviso === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="filingUnder7thYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="filingUnder7thNo"
                      name="filingUnder7thProviso"
                      value="no"
                      checked={formData.filingUnder7thProviso === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="filingUnder7thNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                </div>
                </div>
              </div>

              {/* Conditional fields */}
              {formData.filingUnder7thProviso === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
              <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Deposited &gt; ₹1 Cr?
                </label>
                    <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                          id="depositedYes"
                          name="depositedOver1Cr"
                          value="yes"
                          checked={formData.depositedOver1Cr === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                        <label htmlFor="depositedYes" className="ml-2 text-sm font-medium text-gray-700">
                          Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                          id="depositedNo"
                          name="depositedOver1Cr"
                          value="no"
                          checked={formData.depositedOver1Cr === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                        <label htmlFor="depositedNo" className="ml-2 text-sm font-medium text-gray-700">
                          No
                    </label>
                  </div>
                </div>
                    {formData.depositedOver1Cr === "yes" && (
                      <input
                        type="number"
                        name="depositedAmount"
                        placeholder="Enter amount"
                        value={formData.depositedAmount}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    )}
              </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Spent &gt; ₹2 Lakh on foreign travel?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="foreignTravelYes"
                          name="spentOver2LakhForeign"
                          value="yes"
                          checked={formData.spentOver2LakhForeign === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="foreignTravelYes" className="ml-2 text-sm font-medium text-gray-700">
                          Yes
                        </label>
            </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="foreignTravelNo"
                          name="spentOver2LakhForeign"
                          value="no"
                          checked={formData.spentOver2LakhForeign === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="foreignTravelNo" className="ml-2 text-sm font-medium text-gray-700">
                          No
                        </label>
          </div>
                    </div>
                    {formData.spentOver2LakhForeign === "yes" && (
                      <input
                        type="number"
                        name="foreignTravelAmount"
                        placeholder="Enter amount"
                        value={formData.foreignTravelAmount}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Spent&gt; ₹1 Lakh on electricity?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="electricityYes"
                          name="spentOver1LakhElectricity"
                          value="yes"
                          checked={formData.spentOver1LakhElectricity === "yes"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="electricityYes" className="ml-2 text-sm font-medium text-gray-700">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="electricityNo"
                          name="spentOver1LakhElectricity"
                          value="no"
                          checked={formData.spentOver1LakhElectricity === "no"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="electricityNo" className="ml-2 text-sm font-medium text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                    {formData.spentOver1LakhElectricity === "yes" && (
                      <input
                        type="number"
                        name="electricityAmount"
                        placeholder="Enter amount"
                        value={formData.electricityAmount}
                        onChange={handleChange}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}



        {/* Step 4: Residential Status & Passport Details */}
        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Residential Status</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Residential Status
                </label>
                <div className="space-y-2">
                  {[
                    'Resident (182+ days)',
                    'Resident (60+ days + 365 in 4 years)',
                    'Non-resident',
                    'Resident but Not Ordinarily Resident'
                  ].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        checked={formData.residentialStatus.includes(option)}
                        onChange={() => handleCheckboxChange('residentialStatus', option)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={option} className="ml-2 text-sm font-medium text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Country of Residence/Jurisdiction
                </label>
                <select
                  name="jurisdiction"
                  value={formData.jurisdiction}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                  <option value="usa">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                  <option value="singapore">Singapore</option>
                  <option value="uae">UAE</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Days in India (Current Year)
                </label>
                <input
                  type="number"
                  name="daysInIndiaCurrentYear"
                  value={formData.daysInIndiaCurrentYear}
                  onChange={handleChange}
                  placeholder="Enter days in current year"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Days in India (Last 4 Years)
                </label>
                <input
                  type="number"
                  name="daysInIndiaLast4Years"
                  value={formData.daysInIndiaLast4Years}
                  onChange={handleChange}
                  placeholder="Enter days in last 4 years"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Passport Number
                </label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  placeholder="Enter passport number (if held)"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Passport Issuing Country
                </label>
                <input
                  type="text"
                  name="issuedByCountry"
                  value={formData.issuedByCountry}
                  onChange={handleChange}
                  placeholder="Enter issuing country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Tax Identification Number (TIN)
                </label>
                <input
                  type="text"
                  name="tin"
                  value={formData.tin}
                  onChange={handleChange}
                  placeholder="Enter TIN (if not Indian resident)"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Additional Declarations */}
        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Additional Declarations</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Claim benefit under 115H?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                <input
                      type="radio"
                      id="claimBenefitYes"
                      name="claimBenefit115H"
                      value="yes"
                      checked={formData.claimBenefit115H === "yes"}
                  onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="claimBenefitYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="claimBenefitNo"
                      name="claimBenefit115H"
                      value="no"
                      checked={formData.claimBenefit115H === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="claimBenefitNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Governed by Portuguese Civil Code?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                <input
                      type="radio"
                      id="portugueseYes"
                      name="governedByPortugueseCivilCode"
                      value="yes"
                      checked={formData.governedByPortugueseCivilCode === "yes"}
                  onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="portugueseYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="portugueseNo"
                      name="governedByPortugueseCivilCode"
                      value="no"
                      checked={formData.governedByPortugueseCivilCode === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="portugueseNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Are you FPI?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                <input
                      type="radio"
                      id="fpiYes"
                      name="isFPI"
                      value="yes"
                      checked={formData.isFPI === "yes"}
                  onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="fpiYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="fpiNo"
                      name="isFPI"
                      value="no"
                      checked={formData.isFPI === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="fpiNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {formData.isFPI === "yes" && (
                  <input
                    type="text"
                    name="sebiRegnNo"
                    placeholder="SEBI Registration Number"
                    value={formData.sebiRegnNo}
                    onChange={handleChange}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>

                              <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Are you a Partner in a Firm?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="partnerYes"
                        name="isPartnerInFirm"
                        value="yes"
                        checked={formData.isPartnerInFirm === "yes"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="partnerYes" className="ml-2 text-sm font-medium text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="partnerNo"
                        name="isPartnerInFirm"
                        value="no"
                        checked={formData.isPartnerInFirm === "no"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="partnerNo" className="ml-2 text-sm font-medium text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                  {formData.isPartnerInFirm === "yes" && (
                    <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-lg">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Firm Name
                        </label>
                        <input
                          type="text"
                          name="firmName"
                          value={formData.firmName}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Firm PAN
                        </label>
                        <input
                          type="text"
                          name="firmPAN"
                          value={formData.firmPAN}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Filed by Representative?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                <input
                      type="radio"
                      id="representativeYes"
                      name="filingByRepresentative"
                      value="yes"
                      checked={formData.filingByRepresentative === "yes"}
                  onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                    <label htmlFor="representativeYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
              </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="representativeNo"
                      name="filingByRepresentative"
                      value="no"
                      checked={formData.filingByRepresentative === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="representativeNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {formData.filingByRepresentative === "yes" && (
                  <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                        Representative Name
                </label>
                <input
                        type="text"
                        name="representativeName"
                        value={formData.representativeName}
                  onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Capacity
                      </label>
                      <select
                        name="representativeCapacity"
                        value={formData.representativeCapacity}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Capacity</option>
                        <option value="authorized-representative">Authorized Representative</option>
                        <option value="legal-heir">Legal Heir</option>
                        <option value="guardian">Guardian</option>
                        <option value="power-of-attorney">Power of Attorney</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Representative Address
                      </label>
                      <input
                        type="text"
                        name="representativeAddress"
                        value={formData.representativeAddress}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Representative PAN/Aadhaar
                      </label>
                      <input
                        type="text"
                        name="representativePAN"
                        value={formData.representativePAN}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Company Involvement */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Company Involvement</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Are you a Director?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                <input
                      type="radio"
                      id="directorYes"
                      name="isDirector"
                      value="yes"
                      checked={formData.isDirector === "yes"}
                  onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="directorYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="directorNo"
                      name="isDirector"
                      value="no"
                      checked={formData.isDirector === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="directorNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {formData.isDirector === "yes" && (
                  <div className="mt-4 space-y-4 p-4 bg-blue-50 rounded-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Director Identification Number (DIN)
                        </label>
                        <input
                          type="text"
                          name="directorDIN"
                          value={formData.directorDIN}
                          onChange={handleChange}
                          placeholder="Enter DIN"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Company PAN
                        </label>
                        <input
                          type="text"
                          name="directorCompanyPAN"
                          value={formData.directorCompanyPAN}
                          onChange={handleChange}
                          placeholder="Enter company PAN"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="directorCompanyName"
                          value={formData.directorCompanyName}
                          onChange={handleChange}
                          placeholder="Enter company name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Listed/Unlisted
                        </label>
                        <select
                          name="isListed"
                          value={formData.isListed}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select</option>
                          <option value="listed">Listed</option>
                          <option value="unlisted">Unlisted</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Held unlisted equity shares?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="unlistedSharesYes"
                      name="heldUnlistedShares"
                      value="yes"
                      checked={formData.heldUnlistedShares === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="unlistedSharesYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="unlistedSharesNo"
                      name="heldUnlistedShares"
                      value="no"
                      checked={formData.heldUnlistedShares === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="unlistedSharesNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {formData.heldUnlistedShares === "yes" && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="mb-4 text-md font-semibold text-gray-700">Unlisted Equity Shares Details</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter company name"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            PAN
                          </label>
                          <input
                            type="text"
                            placeholder="Enter PAN"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            No. of shares
                </label>
                <input
                  type="number"
                            placeholder="Enter number of shares"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Cost of acquisition
                          </label>
                          <input
                            type="number"
                            placeholder="Enter cost"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Purchase Date
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Sale Date
                          </label>
                          <input
                            type="date"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                      >
                        + Add Another Company
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Enhanced Bank Details */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Bank Details</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    IFS Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    maxLength={11}
                    value={formData.ifscCode}
                  onChange={handleChange}
                    placeholder="Enter IFSC code"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.ifscCode ? "border-red-500" : "border-gray-300"}`}
                />
                  {errors.ifscCode && <p className="mt-1 text-sm text-red-500">{errors.ifscCode}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                  onChange={handleChange}
                    placeholder="Enter bank name"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.bankName ? "border-red-500" : "border-gray-300"}`}
                />
                  {errors.bankName && <p className="mt-1 text-sm text-red-500">{errors.bankName}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Account Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                  onChange={handleChange}
                    placeholder="Enter account number"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? "border-red-500" : "border-gray-300"}`}
                />
                  {errors.accountNumber && <p className="mt-1 text-sm text-red-500">{errors.accountNumber}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Account Type <span className="text-red-500">*</span>
                </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.accountType ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select account type</option>
                    <option value="savings">Savings</option>
                    <option value="current">Current</option>
                    <option value="fixed-deposit">Fixed Deposit</option>
                    <option value="recurring-deposit">Recurring Deposit</option>
                  </select>
                  {errors.accountType && <p className="mt-1 text-sm text-red-500">{errors.accountType}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center">
                <input
                    type="checkbox"
                    id="primaryRefundAccount"
                    name="primaryRefundAccount"
                    checked={formData.primaryRefundAccount}
                  onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                  <label htmlFor="primaryRefundAccount" className="ml-2 text-sm font-medium text-gray-700">
                    Primary Refund Account
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Schedule S - Income from Salary */}
        {step === 8 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule S - Income from Salary</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer Name
                  </label>
                  <input
                    type="text"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                    placeholder="Enter employer name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer Type
                  </label>
                  <select
                    name="employerType"
                    value={formData.employerType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select employer type</option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                    <option value="public-sector">Public Sector</option>
                    <option value="multinational">Multinational</option>
                    <option value="startup">Startup</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer TAN
                  </label>
                  <input
                    type="text"
                    name="employerTAN"
                    value={formData.employerTAN}
                    onChange={handleChange}
                    placeholder="Enter employer TAN"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer Address
                  </label>
                  <input
                    type="text"
                    name="employerAddress"
                    value={formData.employerAddress}
                    onChange={handleChange}
                    placeholder="Enter employer address"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Income Fields</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Salary u/s 17(1)
                </label>
                <input
                  type="number"
                      name="salaryUnder17_1"
                      value={formData.salaryUnder17_1}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                      Perquisites u/s 17(2)
                </label>
                <input
                  type="number"
                      name="perquisitesUnder17_2"
                      value={formData.perquisitesUnder17_2}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                      Profit in lieu of salary u/s 17(3)
                </label>
                <input
                  type="number"
                      name="profitInLieuOfSalary"
                      value={formData.profitInLieuOfSalary}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                      Retirement income (notified/other)
                </label>
                <input
                  type="number"
                      name="retirementIncome"
                      value={formData.retirementIncome}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                      Relief u/s 89A
                </label>
                <input
                  type="number"
                      name="reliefUnder89A"
                      value={formData.reliefUnder89A}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                      Standard Deduction u/s 16
                </label>
                <input
                  type="number"
                      name="standardDeduction"
                      value={formData.standardDeduction}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                      Entertainment Allowance u/s 16
                </label>
                <input
                  type="number"
                      name="entertainmentAllowance"
                      value={formData.entertainmentAllowance}
                  onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Professional Tax u/s 16
                    </label>
                    <input
                      type="number"
                      name="professionalTax"
                      value={formData.professionalTax}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Schedule HP - Income from House Property */}
        {step === 9 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule HP - Income from House Property</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property Address
                </label>
                <input
                  type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                  onChange={handleChange}
                    placeholder="Enter property address"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property City
                </label>
                <input
                  type="text"
                    name="propertyCity"
                    value={formData.propertyCity}
                  onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property State
                  </label>
                  <select
                    name="propertyState"
                    value={formData.propertyState}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                    <option value="assam">Assam</option>
                    <option value="bihar">Bihar</option>
                    <option value="chhattisgarh">Chhattisgarh</option>
                    <option value="goa">Goa</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="haryana">Haryana</option>
                    <option value="himachal-pradesh">Himachal Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="mizoram">Mizoram</option>
                    <option value="nagaland">Nagaland</option>
                    <option value="odisha">Odisha</option>
                    <option value="punjab">Punjab</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="sikkim">Sikkim</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="telangana">Telangana</option>
                    <option value="tripura">Tripura</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="west-bengal">West Bengal</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property Country
                </label>
                <input
                  type="text"
                    name="propertyCountry"
                    value={formData.propertyCountry}
                  onChange={handleChange}
                    placeholder="Enter country"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property PIN
                  </label>
                  <input
                    type="number"
                    name="propertyPIN"
                    maxLength={6}
                    value={formData.propertyPIN}
                    onChange={handleChange}
                    placeholder="Enter PIN"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Co-owned?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="coOwnedYes"
                        name="isCoOwned"
                        value="yes"
                        checked={formData.isCoOwned === "yes"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="coOwnedYes" className="ml-2 text-sm font-medium text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="coOwnedNo"
                        name="isCoOwned"
                        value="no"
                        checked={formData.isCoOwned === "no"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="coOwnedNo" className="ml-2 text-sm font-medium text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {formData.isCoOwned === "yes" && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="mb-4 text-md font-semibold text-gray-700">Co-owners Details</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Co-owner Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter co-owner name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Co-owner PAN
                        </label>
                        <input
                          type="text"
                          placeholder="Enter co-owner PAN"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Share %
                        </label>
                        <input
                          type="number"
                          placeholder="Enter share percentage"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                    >
                      + Add Another Co-owner
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property Type
                </label>
                <select
                    name="propertyType"
                    value={formData.propertyType}
                  onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select property type</option>
                    <option value="let-out">Let out</option>
                    <option value="self-occupied">Self-occupied</option>
                    <option value="deemed-let-out">Deemed let out</option>
                </select>
              </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Tenant Name
                  </label>
                  <input
                    type="text"
                    name="tenantName"
                    value={formData.tenantName}
                    onChange={handleChange}
                    placeholder="Enter tenant name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Tenant PAN
                  </label>
                  <input
                    type="text"
                    name="tenantPAN"
                    value={formData.tenantPAN}
                    onChange={handleChange}
                    placeholder="Enter tenant PAN"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gross Rent
                  </label>
                  <input
                    type="number"
                    name="grossRent"
                    value={formData.grossRent}
                    onChange={handleChange}
                    placeholder="Enter gross rent"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Unrealized Rent
                  </label>
                  <input
                    type="number"
                    name="unrealizedRent"
                    value={formData.unrealizedRent}
                    onChange={handleChange}
                    placeholder="Enter unrealized rent"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Local Taxes
                  </label>
                  <input
                    type="number"
                    name="localTaxes"
                    value={formData.localTaxes}
                    onChange={handleChange}
                    placeholder="Enter local taxes"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Loan Interest
                  </label>
                  <input
                    type="number"
                    name="loanInterest"
                    value={formData.loanInterest}
                    onChange={handleChange}
                    placeholder="Enter loan interest"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Pre-construction Interest
                  </label>
                  <input
                    type="number"
                    name="interestPreConstruction"
                    value={formData.interestPreConstruction}
                    onChange={handleChange}
                    placeholder="Enter pre-construction interest"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Net Property Income (auto-calculated)
                  </label>
                  <input
                    type="number"
                    name="netPropertyIncome"
                    value={formData.netPropertyIncome}
                    onChange={handleChange}
                    placeholder="Auto-calculated"
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 10: Capital Gains */}
        {step === 10 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Capital Gains</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Short Term Capital Gains
                  </label>
                  <input
                    type="number"
                    name="shortTermGains"
                    value={formData.shortTermGains}
                    onChange={handleChange}
                    placeholder="Enter STCG amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Long Term Capital Gains
                  </label>
                  <input
                    type="number"
                    name="longTermGains"
                    value={formData.longTermGains}
                    onChange={handleChange}
                    placeholder="Enter LTCG amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Exemption u/s 54
                  </label>
                  <input
                    type="number"
                    name="exemptionSection54"
                    value={formData.exemptionSection54}
                    onChange={handleChange}
                    placeholder="Enter exemption amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Exemption u/s 54EC
                  </label>
                  <input
                    type="number"
                    name="exemptionSection54EC"
                    value={formData.exemptionSection54EC}
                    onChange={handleChange}
                    placeholder="Enter exemption amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Exemption u/s 54F
                  </label>
                  <input
                    type="number"
                    name="exemptionSection54F"
                    value={formData.exemptionSection54F}
                    onChange={handleChange}
                    placeholder="Enter exemption amount"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Foreign Capital Assets
                  </label>
                  <input
                    type="number"
                    name="foreignCapitalAssets"
                    value={formData.foreignCapitalAssets}
                    onChange={handleChange}
                    placeholder="Enter foreign capital gains"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 11: Other Income */}
        {step === 11 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Other Income</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Interest Income
                  </label>
                  <input
                    type="number"
                    name="interestIncome"
                    value={formData.interestIncome}
                    onChange={handleChange}
                    placeholder="Enter interest income"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Dividend Income
                  </label>
                  <input
                    type="number"
                    name="dividendIncome"
                    value={formData.dividendIncome}
                    onChange={handleChange}
                    placeholder="Enter dividend income"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Family Pension
                  </label>
                  <input
                    type="number"
                    name="familyPension"
                    value={formData.familyPension}
                    onChange={handleChange}
                    placeholder="Enter family pension"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Winnings from Lottery/Gambling
                  </label>
                  <input
                    type="number"
                    name="winningsFromLottery"
                    value={formData.winningsFromLottery}
                    onChange={handleChange}
                    placeholder="Enter winnings"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gift Income
                  </label>
                  <input
                    type="number"
                    name="giftIncome"
                    value={formData.giftIncome}
                    onChange={handleChange}
                    placeholder="Enter taxable gift income"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Other Miscellaneous Income
                  </label>
                  <input
                    type="number"
                    name="otherMiscIncome"
                    value={formData.otherMiscIncome}
                    onChange={handleChange}
                    placeholder="Enter other income"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 12: Deductions (Chapter VI-A) */}
        {step === 12 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Deductions (Chapter VI-A)</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80C (LIC, PF, NSC, etc.)
                  </label>
                  <input
                    type="number"
                    name="section80C"
                    value={formData.section80C}
                    onChange={handleChange}
                    placeholder="Enter 80C deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80D (Medical Insurance)
                  </label>
                  <input
                    type="number"
                    name="section80D"
                    value={formData.section80D}
                    onChange={handleChange}
                    placeholder="Enter 80D deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80CCC (Pension Fund)
                  </label>
                  <input
                    type="number"
                    name="section80CCC"
                    value={formData.section80CCC}
                    onChange={handleChange}
                    placeholder="Enter 80CCC deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80CCD (NPS)
                  </label>
                  <input
                    type="number"
                    name="section80CCD"
                    value={formData.section80CCD}
                    onChange={handleChange}
                    placeholder="Enter 80CCD deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80DD (Disability)
                  </label>
                  <input
                    type="number"
                    name="section80DD"
                    value={formData.section80DD}
                    onChange={handleChange}
                    placeholder="Enter 80DD deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80DDB (Medical Treatment)
                  </label>
                  <input
                    type="number"
                    name="section80DDB"
                    value={formData.section80DDB}
                    onChange={handleChange}
                    placeholder="Enter 80DDB deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80EE (Home Loan First-time)
                  </label>
                  <input
                    type="number"
                    name="section80EE"
                    value={formData.section80EE}
                    onChange={handleChange}
                    placeholder="Enter 80EE deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80GGA (Scientific Research)
                  </label>
                  <input
                    type="number"
                    name="section80GGA"
                    value={formData.section80GGA}
                    onChange={handleChange}
                    placeholder="Enter 80GGA deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80E (Education Loan)
                  </label>
                  <input
                    type="number"
                    name="section80E"
                    value={formData.section80E}
                    onChange={handleChange}
                    placeholder="Enter 80E deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80G (Donations)
                  </label>
                  <input
                    type="number"
                    name="section80G"
                    value={formData.section80G}
                    onChange={handleChange}
                    placeholder="Enter 80G deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80TTA (Savings Interest)
                  </label>
                  <input
                    type="number"
                    name="section80TTA"
                    value={formData.section80TTA}
                    onChange={handleChange}
                    placeholder="Enter 80TTA deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80TTB (Senior Citizens)
                  </label>
                  <input
                    type="number"
                    name="section80TTB"
                    value={formData.section80TTB}
                    onChange={handleChange}
                    placeholder="Enter 80TTB deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Section 80U (Person with Disability)
                  </label>
                  <input
                    type="number"
                    name="section80U"
                    value={formData.section80U}
                    onChange={handleChange}
                    placeholder="Enter 80U deduction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Other Deductions
                  </label>
                  <input
                    type="number"
                    name="otherDeductions"
                    value={formData.otherDeductions}
                    onChange={handleChange}
                    placeholder="Enter other deductions"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 13: Tax Details & TDS/TCS */}
        {step === 13 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Tax Details & TDS/TCS</h3>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">TDS on Salary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Employer TAN
                    </label>
                    <input
                      type="text"
                      placeholder="Enter employer TAN"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Tax Deducted
                    </label>
                    <input
                      type="number"
                      placeholder="Enter tax deducted"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">TDS on Other Income</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Deductor TAN
                    </label>
                    <input
                      type="text"
                      placeholder="Enter deductor TAN"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Tax Deducted
                    </label>
                    <input
                      type="number"
                      placeholder="Enter tax deducted"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Advance Tax</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      BSR Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter BSR code"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Amount Paid
                    </label>
                    <input
                      type="number"
                      placeholder="Enter amount paid"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Total Tax Paid
                </label>
                <input
                  type="number"
                  name="totalTaxPaid"
                  value={formData.totalTaxPaid}
                  onChange={handleChange}
                  placeholder="Auto-calculated total tax paid"
                  className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 14: Verification */}
        {step === 14 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Verification</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Verifier Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="verificationName"
                    value={formData.verificationName}
                    onChange={handleChange}
                    placeholder="Enter name of declarant"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter father's name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Capacity <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select capacity</option>
                    <option value="self">Self</option>
                    <option value="legal-representative">Legal Representative</option>
                    <option value="authorized-signatory">Authorized Signatory</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Declaration Place <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="declarationPlace"
                    value={formData.declarationPlace}
                    onChange={handleChange}
                    placeholder="Enter place of declaration"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Declaration Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="declarationDate"
                    value={formData.declarationDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Declaration</h4>
                <p className="text-sm text-gray-700 mb-4">
                  I, {formData.verificationName || '[Name]'}, son/daughter of {formData.fatherName || '[Father\'s Name]'}, 
                  do hereby certify that the particulars given in this return are true and correct to the best of my knowledge and belief.
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="declaration"
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="declaration" className="text-sm font-medium text-gray-700">
                    I agree to the above declaration <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={handlePreviousStep}
              className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
            >
              Previous
            </button>
          )}
          <button
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              step === 14 ? "Submit" : "Next"
            )}
          </button>
        </div>
        {saveError && (
          <div className="mt-2 text-sm text-red-500">{saveError}</div>
        )}
      </div>
    </>
  );
};

export default ItrTwo;