import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItrThree = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr3-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('itr3-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Step 1: Personal Information
      firstName: "",
      middleName: "",
      lastName: "",
      pan: "",
      status: "",
      dateOfBirth: "",
      dateOfCommencement: "",
      aadharNumber: "",
      
      // Address
      flatDoorBlock: "",
      buildingVillage: "",
      roadStreetPostOffice: "",
      areaLocality: "",
      townCityDistrict: "",
      state: "",
      pinZip: "",
      country: "India",
      phone1: "",
      phone2: "",
      
      // Step 2: Filing Status & Regime Option
      email1: "",
      email2: "",
      dueDateForFiling: "",
      filedUnder: "",
      filedInResponseTo: [] as string[],
      regimeOption: "",
      form10IEADate: "",
      form10IEAAckNumber: "",
      filingUnder7thProviso: "",
      depositedOver1Cr: "",
      depositedAmount: "",
      spentOver2LakhForeign: "",
      foreignTravelAmount: "",
      spentOver1LakhElectricity: "",
      electricityAmount: "",
      otherCondition: "",
      
      // Step 3: Filing Reference & Status + Filing Information
      receiptNumber: "",
      originalFilingDate: "",
      noticeDIN: "",
      noticeDate: "",
      residentialStatus: "",
      jurisdiction: "",
      tin: "",
      daysInIndia: "",
      daysInIndiaLastYear: "",
      
      // Filing Information
      isRevisedReturn: false,
      originalAckNumber: "",
      revisedReturnReason: "",
      
      // Step 4: Additional Declarations
      claimBenefit115H: "",
      governedByPortugueseCivilCode: "",
      filedByRepresentative: "",
      representativeName: "",
      representativeCapacity: "",
      representativeAddress: "",
      representativePAN: "",
      isDirector: "",
      directorName: "",
      directorPAN: "",
      directorDIN: "",
      isListed: "",
      isPartner: "",
      partnerName: "",
      partnerPAN: "",
      heldUnlistedShares: "",
      isPE: "",
      peTransactions: "",
      peUsers: "",
      isUnitIFSC: "",
      isFPI: "",
      sebiRegnNo: "",
      leiDetails: "",
      leiValidity: "",
      
      // Step 5: Bank Details
      ifscCode: "",
      bankName: "",
      accountNumber: "",
      accountType: "",
      primaryRefundAccount: false,
      
      // Step 6: Schedule S - Salary Income
      employerName: "",
      employerType: "",
      employerTAN: "",
      employerAddress: "",
      salaryUnder17_1: "",
      perquisitesUnder17_2: "",
      profitInLieuOfSalary: "",
      retirementIncome: "",
      reliefUnder89A: "",
      allowancesUnder10: "",
      standardDeduction: "",
      entertainmentAllowance: "",
      professionalTax: "",
      
      // Step 7: Schedule HP - House Property
      propertyAddress: "",
      propertyCity: "",
      propertyState: "",
      propertyCountry: "",
      propertyPIN: "",
      isCoOwned: "",
      coOwners: [],
      propertyType: "",
      tenantName: "",
      tenantPAN: "",
      grossRent: "",
      unrealizedRent: "",
      localTaxes: "",
      annualValue: "",
      sharePercentage: "",
      loanInterest: "",
      interestPreConstruction: "",
      arrears: "",
      netPropertyIncome: "",
      
      // Step 8: Audit & Financial Info
      liableToMaintainBooks: "",
      auditUnder44AB: "",
      natureOfBusiness1: "",
      natureOfBusiness2: "",
      natureOfBusiness3: "",
      businessDescription1: "",
      businessDescription2: "",
      businessDescription3: "",
      auditorName: "",
      auditorMembership: "",
      auditorPAN: "",
      auditorRegNo: "",
      auditDate: "",
      udin: "",
      auditAck: "",
      
      // Enhanced Audit/Compliance Fields
      isLiableUnder92E: false,
      auditFirmName: "",
      auditFirmPAN: "",
      depreciationAsPerBooks: "",
      depreciationAsPerIT: "",
      
      // Step 9: Financial Statements
      // Balance Sheet
      fixedAssets: "",
      currentAssets: "",
      investments: "",
      loansAdvances: "",
      currentLiabilities: "",
      longTermLiabilities: "",
      capital: "",
      reserves: "",
      
      // P&L Statement
      grossSales: "",
      netSales: "",
      grossProfit: "",
      netProfit: "",
      totalExpenses: "",
      
      // Presumptive Income
      presumptiveIncome44AD: "",
      presumptiveIncome44ADA: "",
      presumptiveIncome44AE: "",
      
      // Other Financial Info
      openingStock: "",
      closingStock: "",
      purchases: "",
      directExpenses: "",
      indirectExpenses: "",
      quantitativeDetails: "",
      
      // Step 10: Schedule IF - Unlisted Shares
      unlistedShares: [] as Array<{
        companyName: string;
        companyPAN: string;
        noOfShares: number;
        faceValue: number;
        acquisitionDate: string;
        issuePrice: number;
        purchasePrice: number;
      }>,
      
      // Step 11: Business Income & Schedules
      businessIncomeDetails: {
        section28Income: "",
        section44ADAdjustments: "",
        otherBusinessIncome: ""
      },
      section44AEVehicles: [] as Array<{
        vehicleType: string;
        tonnage: number;
        monthsOwned: number;
        presumptiveIncome: number;
      }>,
      section44ADAOpted: false,
      partnersRemuneration: "",
      
      // Step 12: Schedule AL - Assets & Liabilities (mandatory if income > ₹50L)
      movableAssets: {
        cashInHand: "",
        jewelryBullion: "",
        archaeologicalCollections: "",
        insurancePolicies: "",
        bankDeposits: "",
        sharesSecurities: "",
        otherMovable: ""
      },
      immovableAssets: {
        buildingsLand: "",
        otherImmovable: ""
      },
      liabilities: {
        liabilitiesToBank: "",
        liabilitiesToOthers: ""
      },
      
      // Step 13: Foreign Assets & Income
      foreignBankAccounts: [] as Array<{
        accountNumber: string;
        bankName: string;
        country: string;
        maxBalance: number;
        interestEarned: number;
      }>,
      foreignProperties: [] as Array<{
        propertyAddress: string;
        country: string;
        zipCode: string;
        ownershipPercentage: number;
        incomeFromProperty: number;
      }>,
      foreignTaxPaid: "",
      foreignEmployerDetails: {
        employerName: "",
        employerAddress: "",
        taxIdNumber: "",
        salaryPaid: ""
      },
      
      // Step 14: Tax Payments & TDS/TCS
      tdsSalary: [] as Array<{
        deductorTAN: string;
        deductorName: string;
        totalSalaryPaid: number;
        taxDeducted: number;
        tdsClaimedBy: string;
      }>,
      tdsOther: [] as Array<{
        deductorTAN: string;
        deductorName: string;
        grossAmount: number;
        taxDeducted: number;
        natureOfPayment: string;
      }>,
      tcsDetails: [] as Array<{
        collectorTAN: string;
        collectorName: string;
        amountPaid: number;
        taxCollected: number;
        natureOfCollection: string;
      }>,
      advanceTaxPayments: [] as Array<{
        paymentDate: string;
        amount: number;
        bsr: string;
        serialNumber: string;
      }>,
      selfAssessmentTaxPayments: [] as Array<{
        paymentDate: string;
        amount: number;
        bsr: string;
        serialNumber: string;
      }>,
      
      // Step 15: Declaration & Verification
      verifierName: "",
      fatherName: "",
      capacity: "",
      verificationPlace: "",
      verificationDate: "",
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr3-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr3-form-data', JSON.stringify(newData));
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
      localStorage.setItem('itr3-form-data', JSON.stringify(newData));
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
        if (!formData.dateOfCommencement) {
          newErrors.dateOfCommencement = "Date of commencement of business is required";
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
        if (!formData.dueDateForFiling) {
          newErrors.dueDateForFiling = "Due date for filing is required";
          isValid = false;
        }
        if (!formData.filedUnder) {
          newErrors.filedUnder = "Filed u/s is required";
          isValid = false;
        }
        if (formData.regimeOption === "setA" || formData.regimeOption === "setB") {
          if (!formData.form10IEADate) {
            newErrors.form10IEADate = "Form 10-IEA date is required";
            isValid = false;
          }
          if (!formData.form10IEAAckNumber) {
            newErrors.form10IEAAckNumber = "Form 10-IEA acknowledgment number is required";
            isValid = false;
          }
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
        // Filing Information validation
        if (formData.isRevisedReturn && !formData.originalAckNumber) {
          newErrors.originalAckNumber = "Original acknowledgment number is required for revised return";
          isValid = false;
        }
        if (formData.isRevisedReturn && !formData.revisedReturnReason) {
          newErrors.revisedReturnReason = "Reason for revision is required";
          isValid = false;
        }
        break;
      case 4:
        if (!formData.claimBenefit115H) {
          newErrors.claimBenefit115H = "Please specify if claiming benefit under 115H";
          isValid = false;
        }
        if (!formData.governedByPortugueseCivilCode) {
          newErrors.governedByPortugueseCivilCode = "Please specify Portuguese Civil Code status";
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
        if (!formData.isDirector) {
          newErrors.isDirector = "Please specify if you are a director";
          isValid = false;
        }
        if (formData.isDirector === "yes") {
          if (!formData.directorName) {
            newErrors.directorName = "Director name is required";
            isValid = false;
          }
          if (!formData.directorPAN) {
            newErrors.directorPAN = "Director PAN is required";
            isValid = false;
          }
          if (!formData.directorDIN) {
            newErrors.directorDIN = "Director DIN is required";
            isValid = false;
          }
          if (!formData.isListed) {
            newErrors.isListed = "Please specify if company is listed/unlisted";
            isValid = false;
          }
        }
        if (!formData.isPartner) {
          newErrors.isPartner = "Please specify if you are a partner";
          isValid = false;
        }
        if (formData.isPartner === "yes") {
          if (!formData.partnerName) {
            newErrors.partnerName = "Partner name is required";
            isValid = false;
          }
          if (!formData.partnerPAN) {
            newErrors.partnerPAN = "Partner PAN is required";
            isValid = false;
          }
        }
        if (!formData.heldUnlistedShares) {
          newErrors.heldUnlistedShares = "Please specify if held unlisted shares";
          isValid = false;
        }
        if (!formData.isPE) {
          newErrors.isPE = "Please specify PE/SEP status";
          isValid = false;
        }
        if (formData.isPE === "yes") {
          if (!formData.peTransactions) {
            newErrors.peTransactions = "PE transactions details required";
            isValid = false;
          }
          if (!formData.peUsers) {
            newErrors.peUsers = "PE users details required";
            isValid = false;
          }
        }
        if (!formData.isUnitIFSC) {
          newErrors.isUnitIFSC = "Please specify IFSC unit status";
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
        break;
      case 5:
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
      case 6:
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
          'retirementIncome', 'reliefUnder89A', 'allowancesUnder10',
          'standardDeduction', 'entertainmentAllowance', 'professionalTax'
        ];
        salaryFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 7:
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
          'grossRent', 'unrealizedRent', 'localTaxes', 'annualValue',
          'sharePercentage', 'loanInterest', 'interestPreConstruction', 'arrears'
        ];
        propertyFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 8:
        if (!formData.liableToMaintainBooks) {
          newErrors.liableToMaintainBooks = "Please specify if liable to maintain books";
          isValid = false;
        }
        if (!formData.auditUnder44AB) {
          newErrors.auditUnder44AB = "Please specify if audit under 44AB";
          isValid = false;
        }
        if (!formData.natureOfBusiness1) {
          newErrors.natureOfBusiness1 = "At least one nature of business is required";
          isValid = false;
        }
        if (formData.auditUnder44AB === "yes") {
          if (!formData.auditorName) {
            newErrors.auditorName = "Auditor name is required";
            isValid = false;
          }
          if (!formData.auditorMembership) {
            newErrors.auditorMembership = "Auditor membership is required";
            isValid = false;
          }
          if (!formData.auditorPAN) {
            newErrors.auditorPAN = "Auditor PAN is required";
            isValid = false;
          }
          if (!formData.auditorRegNo) {
            newErrors.auditorRegNo = "Auditor registration number is required";
            isValid = false;
          }
          if (!formData.auditDate) {
            newErrors.auditDate = "Audit date is required";
            isValid = false;
          }
          if (!formData.udin) {
            newErrors.udin = "UDIN is required";
            isValid = false;
          }
          if (!formData.auditAck) {
            newErrors.auditAck = "Audit acknowledgment is required";
            isValid = false;
          }
        }
        break;
              case 9:
        // Validate numeric fields for financial statements
        const financialFields = [
          'fixedAssets', 'currentAssets', 'investments', 'loansAdvances',
          'currentLiabilities', 'longTermLiabilities', 'capital', 'reserves',
          'grossSales', 'netSales', 'grossProfit', 'netProfit', 'totalExpenses',
          'presumptiveIncome44AD', 'presumptiveIncome44ADA', 'presumptiveIncome44AE',
          'openingStock', 'closingStock', 'purchases', 'directExpenses', 'indirectExpenses'
        ];
        financialFields.forEach(field => {
          if (formData[field] && isNaN(parseFloat(formData[field]))) {
            newErrors[field] = "Please enter a valid amount";
            isValid = false;
          }
        });
        break;
      case 10:
        // Step 10: Schedule IF - Unlisted Shares (optional validation)
        break;
      case 11:
        // Step 11: Business Income & Schedules (optional validation)
        break;
      case 12:
        // Step 12: Schedule AL - Assets & Liabilities (optional validation)
        break;
      case 13:
        // Step 13: Foreign Assets & Income (optional validation)
        break;
      case 14:
        // Step 14: Tax Payments & TDS/TCS (optional validation)
        break;
      case 15:
        // Step 15: Declaration & Verification
        if (!formData.verifierName.trim()) {
          newErrors.verifierName = "Verifier name is required";
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
        if (!formData.verificationPlace.trim()) {
          newErrors.verificationPlace = "Verification place is required";
          isValid = false;
        }
        if (!formData.verificationDate) {
          newErrors.verificationDate = "Verification date is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 15) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr3-current-step');
          localStorage.removeItem('itr3-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-3. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr3-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr3-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles = {
      1: "Personal Information",
      2: "Filing Status & Regime Option",
      3: "Filing Reference & Status",
      4: "Additional Declarations",
      5: "Bank Details",
      6: "Schedule S - Salary Income",
      7: "Schedule HP - House Property",
      8: "Audit & Financial Info",
      9: "Financial Statements",
      10: "Schedule IF - Unlisted Shares",
      11: "Business Income & Schedules",
      12: "Schedule AL - Assets & Liabilities",
      13: "Foreign Assets & Income",
      14: "Tax Payments & TDS/TCS",
      15: "Declaration & Verification"
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
          <li className="text-gray-500">ITR-3</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 15: ${getStepTitle(step)}`}
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
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
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
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
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
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
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
                {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
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
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date of Commencement of Business <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfCommencement"
                  value={formData.dateOfCommencement}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.dateOfCommencement ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.dateOfCommencement && <p className="mt-1 text-sm text-red-500">{errors.dateOfCommencement}</p>}
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
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.aadharNumber ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.aadharNumber && <p className="mt-1 text-sm text-red-500">{errors.aadharNumber}</p>}
              </div>
            </div>

            {/* Address Subsection */}
            <div className="mt-8">
              <h4 className="mb-4 text-md font-semibold text-gray-700">Address</h4>
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
                    Building/Village
                  </label>
                  <input
                    type="text"
                    name="buildingVillage"
                    value={formData.buildingVillage}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Road/Street/Post Office
                  </label>
                  <input
                    type="text"
                    name="roadStreetPostOffice"
                    value={formData.roadStreetPostOffice}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Area/Locality
                  </label>
                  <input
                    type="text"
                    name="areaLocality"
                    value={formData.areaLocality}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Town/City/District
                  </label>
                  <input
                    type="text"
                    name="townCityDistrict"
                    value={formData.townCityDistrict}
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
                    PIN/ZIP
                  </label>
                  <input
                    type="number"
                    name="pinZip"
                    maxLength={6}
                    value={formData.pinZip}
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
                    Phone No. 1
                  </label>
                  <input
                    type="tel"
                    name="phone1"
                    value={formData.phone1}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone No. 2
                  </label>
                  <input
                    type="tel"
                    name="phone2"
                    value={formData.phone2}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Filing Status & Regime Option */}
        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Filing Status & Regime Option</h3>
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
                  Due Date for Filing <span className="text-red-500">*</span>
                </label>
                <select
                  name="dueDateForFiling"
                  value={formData.dueDateForFiling}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.dueDateForFiling ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select Due Date</option>
                  <option value="july-31">July 31</option>
                  <option value="october-31">October 31</option>
                  <option value="november-30">November 30</option>
                  <option value="december-31">December 31</option>
                </select>
                {errors.dueDateForFiling && <p className="mt-1 text-sm text-red-500">{errors.dueDateForFiling}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Filed u/s <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['139(1)', '139(4)', '139(5)', '92CD', '119(2)(b)'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="radio"
                        id={option}
                        name="filedUnder"
                        value={option}
                        checked={formData.filedUnder === option}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor={option} className="ml-2 text-sm font-medium text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.filedUnder && <p className="mt-1 text-sm text-red-500">{errors.filedUnder}</p>}
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
                  115BAC Option (Set A/B)
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="setA"
                      name="regimeOption"
                      value="setA"
                      checked={formData.regimeOption === "setA"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="setA" className="ml-2 text-sm font-medium text-gray-700">
                      Set A
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="setB"
                      name="regimeOption"
                      value="setB"
                      checked={formData.regimeOption === "setB"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="setB" className="ml-2 text-sm font-medium text-gray-700">
                      Set B
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="neither"
                      name="regimeOption"
                      value="neither"
                      checked={formData.regimeOption === "neither"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="neither" className="ml-2 text-sm font-medium text-gray-700">
                      Neither
                    </label>
                  </div>
                </div>
              </div>

              {(formData.regimeOption === "setA" || formData.regimeOption === "setB") && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Form 10-IEA Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="form10IEADate"
                      value={formData.form10IEADate}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.form10IEADate ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.form10IEADate && <p className="mt-1 text-sm text-red-500">{errors.form10IEADate}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Form 10-IEA Acknowledgment Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="form10IEAAckNumber"
                      value={formData.form10IEAAckNumber}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.form10IEAAckNumber ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.form10IEAAckNumber && <p className="mt-1 text-sm text-red-500">{errors.form10IEAAckNumber}</p>}
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Filed under 7th proviso?
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

              {/* Conditional fields for 7th proviso */}
              {formData.filingUnder7thProviso === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Deposited &gt; ₹1 Cr in current A/C?
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
                    {errors.depositedAmount && <p className="mt-1 text-sm text-red-500">{errors.depositedAmount}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Spent &gt; ₹2L on foreign travel?
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
                    {errors.foreignTravelAmount && <p className="mt-1 text-sm text-red-500">{errors.foreignTravelAmount}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Spent &gt; ₹1L on electricity?
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
                    {errors.electricityAmount && <p className="mt-1 text-sm text-red-500">{errors.electricityAmount}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Other Condition?
                    </label>
                    <select
                      name="otherCondition"
                      value={formData.otherCondition}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select condition</option>
                      <option value="none">None</option>
                      <option value="foreign-remittance">Foreign Remittance</option>
                      <option value="foreign-investment">Foreign Investment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Filing Reference & Status + Filing Information */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Filing Reference & Status</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Revised/Defective Return Receipt No.
                  </label>
                  <input
                    type="text"
                    name="receiptNumber"
                    value={formData.receiptNumber}
                    onChange={handleChange}
                    placeholder="Enter receipt number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Original Filing Date
                  </label>
                  <input
                    type="date"
                    name="originalFilingDate"
                    value={formData.originalFilingDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Notice DIN
                  </label>
                  <input
                    type="text"
                    name="noticeDIN"
                    value={formData.noticeDIN}
                    onChange={handleChange}
                    placeholder="Enter notice DIN"
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

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Residential Status
                </label>
                <div className="space-y-2">
                  {formData.status === "individual" ? (
                    <>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="resident182"
                          name="residentialStatus"
                          value="resident182"
                          checked={formData.residentialStatus === "resident182"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="resident182" className="ml-2 text-sm font-medium text-gray-700">
                          Resident (182+ days)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="resident60"
                          name="residentialStatus"
                          value="resident60"
                          checked={formData.residentialStatus === "resident60"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="resident60" className="ml-2 text-sm font-medium text-gray-700">
                          Resident (60+ days + 365 in 4 years)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="nonResident"
                          name="residentialStatus"
                          value="nonResident"
                          checked={formData.residentialStatus === "nonResident"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="nonResident" className="ml-2 text-sm font-medium text-gray-700">
                          Non-resident
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="residentNotOrdinarily"
                          name="residentialStatus"
                          value="residentNotOrdinarily"
                          checked={formData.residentialStatus === "residentNotOrdinarily"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="residentNotOrdinarily" className="ml-2 text-sm font-medium text-gray-700">
                          Resident but Not Ordinarily Resident
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="hufResident"
                          name="residentialStatus"
                          value="hufResident"
                          checked={formData.residentialStatus === "hufResident"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="hufResident" className="ml-2 text-sm font-medium text-gray-700">
                          Resident HUF
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="hufNonResident"
                          name="residentialStatus"
                          value="hufNonResident"
                          checked={formData.residentialStatus === "hufNonResident"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="hufNonResident" className="ml-2 text-sm font-medium text-gray-700">
                          Non-resident HUF
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Jurisdiction
                  </label>
                  <input
                    type="text"
                    name="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={handleChange}
                    placeholder="Enter jurisdiction"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    TIN
                  </label>
                  <input
                    type="text"
                    name="tin"
                    value={formData.tin}
                    onChange={handleChange}
                    placeholder="Enter TIN"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Days in India (this year)
                  </label>
                  <input
                    type="number"
                    name="daysInIndia"
                    value={formData.daysInIndia}
                    onChange={handleChange}
                    placeholder="Enter number of days"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Days in India (last year)
                  </label>
                  <input
                    type="number"
                    name="daysInIndiaLastYear"
                    value={formData.daysInIndiaLastYear}
                    onChange={handleChange}
                    placeholder="Enter number of days"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Filing Information Section */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Filing Information</h4>
                <div className="space-y-4">
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
                          onChange={(e) => setFormData(prev => ({ ...prev, isRevisedReturn: e.target.value === "true" }))}
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
                          onChange={(e) => setFormData(prev => ({ ...prev, isRevisedReturn: e.target.value === "true" }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="revisedNo" className="ml-2 text-sm font-medium text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  {formData.isRevisedReturn && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Original Acknowledgment Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="originalAckNumber"
                          value={formData.originalAckNumber}
                          onChange={handleChange}
                          placeholder="Enter original acknowledgment number"
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.originalAckNumber ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.originalAckNumber && <p className="mt-1 text-sm text-red-500">{errors.originalAckNumber}</p>}
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Reason for Revision <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="revisedReturnReason"
                          value={formData.revisedReturnReason}
                          onChange={handleChange}
                          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.revisedReturnReason ? "border-red-500" : "border-gray-300"}`}
                        >
                          <option value="">Select reason</option>
                          <option value="income-omitted">Income omitted in original return</option>
                          <option value="incorrect-deductions">Incorrect deductions claimed</option>
                          <option value="computational-errors">Computational errors</option>
                          <option value="additional-documents">Additional documents received</option>
                          <option value="notice-received">Notice received from department</option>
                          <option value="other">Other reasons</option>
                        </select>
                        {errors.revisedReturnReason && <p className="mt-1 text-sm text-red-500">{errors.revisedReturnReason}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Additional Declarations */}
        {step === 4 && (
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
                {errors.claimBenefit115H && <p className="mt-1 text-sm text-red-500">{errors.claimBenefit115H}</p>}
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
                {errors.governedByPortugueseCivilCode && <p className="mt-1 text-sm text-red-500">{errors.governedByPortugueseCivilCode}</p>}
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
                      name="filedByRepresentative"
                      value="yes"
                      checked={formData.filedByRepresentative === "yes"}
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
                      name="filedByRepresentative"
                      value="no"
                      checked={formData.filedByRepresentative === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="representativeNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {errors.filedByRepresentative && <p className="mt-1 text-sm text-red-500">{errors.filedByRepresentative}</p>}
              </div>

              {formData.filedByRepresentative === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Representative Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="representativeName"
                        value={formData.representativeName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.representativeName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.representativeName && <p className="mt-1 text-sm text-red-500">{errors.representativeName}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Capacity <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="representativeCapacity"
                        value={formData.representativeCapacity}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.representativeCapacity ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Select Capacity</option>
                        <option value="authorized-representative">Authorized Representative</option>
                        <option value="legal-heir">Legal Heir</option>
                        <option value="guardian">Guardian</option>
                        <option value="power-of-attorney">Power of Attorney</option>
                      </select>
                      {errors.representativeCapacity && <p className="mt-1 text-sm text-red-500">{errors.representativeCapacity}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Representative Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="representativeAddress"
                        value={formData.representativeAddress}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.representativeAddress ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.representativeAddress && <p className="mt-1 text-sm text-red-500">{errors.representativeAddress}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Representative PAN/Aadhaar <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="representativePAN"
                        value={formData.representativePAN}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.representativePAN ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.representativePAN && <p className="mt-1 text-sm text-red-500">{errors.representativePAN}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Are you a Director in Company?
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
                {errors.isDirector && <p className="mt-1 text-sm text-red-500">{errors.isDirector}</p>}
              </div>

              {formData.isDirector === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Director Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="directorName"
                        value={formData.directorName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.directorName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.directorName && <p className="mt-1 text-sm text-red-500">{errors.directorName}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Director PAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="directorPAN"
                        value={formData.directorPAN}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.directorPAN ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.directorPAN && <p className="mt-1 text-sm text-red-500">{errors.directorPAN}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Director DIN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="directorDIN"
                        value={formData.directorDIN}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.directorDIN ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.directorDIN && <p className="mt-1 text-sm text-red-500">{errors.directorDIN}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Listed/Unlisted <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="isListed"
                        value={formData.isListed}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.isListed ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Select</option>
                        <option value="listed">Listed</option>
                        <option value="unlisted">Unlisted</option>
                      </select>
                      {errors.isListed && <p className="mt-1 text-sm text-red-500">{errors.isListed}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Are you a Partner in Firm?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="partnerYes"
                      name="isPartner"
                      value="yes"
                      checked={formData.isPartner === "yes"}
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
                      name="isPartner"
                      value="no"
                      checked={formData.isPartner === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="partnerNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {errors.isPartner && <p className="mt-1 text-sm text-red-500">{errors.isPartner}</p>}
              </div>

              {formData.isPartner === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Partner Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="partnerName"
                        value={formData.partnerName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.partnerName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.partnerName && <p className="mt-1 text-sm text-red-500">{errors.partnerName}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Partner PAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="partnerPAN"
                        value={formData.partnerPAN}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.partnerPAN ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.partnerPAN && <p className="mt-1 text-sm text-red-500">{errors.partnerPAN}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Held Unlisted Equity Shares?
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
                {errors.heldUnlistedShares && <p className="mt-1 text-sm text-red-500">{errors.heldUnlistedShares}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PE or SEP in India (for NRs)?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="peYes"
                      name="isPE"
                      value="yes"
                      checked={formData.isPE === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="peYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="peNo"
                      name="isPE"
                      value="no"
                      checked={formData.isPE === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="peNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {errors.isPE && <p className="mt-1 text-sm text-red-500">{errors.isPE}</p>}
              </div>

              {formData.isPE === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        PE Transactions <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="peTransactions"
                        value={formData.peTransactions}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.peTransactions ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.peTransactions && <p className="mt-1 text-sm text-red-500">{errors.peTransactions}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        PE Users <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="peUsers"
                        value={formData.peUsers}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.peUsers ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.peUsers && <p className="mt-1 text-sm text-red-500">{errors.peUsers}</p>}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Unit in IFSC?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="unitIFSCYes"
                      name="isUnitIFSC"
                      value="yes"
                      checked={formData.isUnitIFSC === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="unitIFSCYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="unitIFSCNo"
                      name="isUnitIFSC"
                      value="no"
                      checked={formData.isUnitIFSC === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="unitIFSCNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {errors.isUnitIFSC && <p className="mt-1 text-sm text-red-500">{errors.isUnitIFSC}</p>}
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
                {errors.isFPI && <p className="mt-1 text-sm text-red-500">{errors.isFPI}</p>}
              </div>

              {formData.isFPI === "yes" && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      SEBI Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="sebiRegnNo"
                      value={formData.sebiRegnNo}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.sebiRegnNo ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.sebiRegnNo && <p className="mt-1 text-sm text-red-500">{errors.sebiRegnNo}</p>}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    LEI Details
                  </label>
                  <input
                    type="text"
                    name="leiDetails"
                    value={formData.leiDetails}
                    onChange={handleChange}
                    placeholder="Enter LEI details"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    LEI Validity
                  </label>
                  <input
                    type="date"
                    name="leiValidity"
                    value={formData.leiValidity}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Bank Details */}
        {step === 5 && (
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

        {/* Step 6: Schedule S - Salary Income */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule S - Income from Salary</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employerName"
                    value={formData.employerName}
                    onChange={handleChange}
                    placeholder="Enter employer name"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.employerName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.employerName && <p className="mt-1 text-sm text-red-500">{errors.employerName}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employerType"
                    value={formData.employerType}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.employerType ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select employer type</option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                    <option value="public-sector">Public Sector</option>
                    <option value="multinational">Multinational</option>
                    <option value="startup">Startup</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.employerType && <p className="mt-1 text-sm text-red-500">{errors.employerType}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer TAN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employerTAN"
                    value={formData.employerTAN}
                    onChange={handleChange}
                    placeholder="Enter employer TAN"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.employerTAN ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.employerTAN && <p className="mt-1 text-sm text-red-500">{errors.employerTAN}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Employer Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="employerAddress"
                    value={formData.employerAddress}
                    onChange={handleChange}
                    placeholder="Enter employer address"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.employerAddress ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.employerAddress && <p className="mt-1 text-sm text-red-500">{errors.employerAddress}</p>}
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
                      Allowances u/s 10
                    </label>
                    <input
                      type="number"
                      name="allowancesUnder10"
                      value={formData.allowancesUnder10}
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

        {/* Step 7: Schedule HP - House Property */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule HP - Income from House Property</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    placeholder="Enter property address"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.propertyAddress ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.propertyAddress && <p className="mt-1 text-sm text-red-500">{errors.propertyAddress}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyCity"
                    value={formData.propertyCity}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.propertyCity ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.propertyCity && <p className="mt-1 text-sm text-red-500">{errors.propertyCity}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="propertyState"
                    value={formData.propertyState}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.propertyState ? "border-red-500" : "border-gray-300"}`}
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
                  {errors.propertyState && <p className="mt-1 text-sm text-red-500">{errors.propertyState}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="propertyCountry"
                    value={formData.propertyCountry}
                    onChange={handleChange}
                    placeholder="Enter country"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.propertyCountry ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.propertyCountry && <p className="mt-1 text-sm text-red-500">{errors.propertyCountry}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property PIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="propertyPIN"
                    maxLength={6}
                    value={formData.propertyPIN}
                    onChange={handleChange}
                    placeholder="Enter PIN"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.propertyPIN ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.propertyPIN && <p className="mt-1 text-sm text-red-500">{errors.propertyPIN}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Co-owned? <span className="text-red-500">*</span>
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
                  {errors.isCoOwned && <p className="mt-1 text-sm text-red-500">{errors.isCoOwned}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Property Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.propertyType ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select property type</option>
                    <option value="let-out">Let out</option>
                    <option value="self-occupied">Self-occupied</option>
                    <option value="deemed-let-out">Deemed let out</option>
                  </select>
                  {errors.propertyType && <p className="mt-1 text-sm text-red-500">{errors.propertyType}</p>}
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
                    Annual Value
                  </label>
                  <input
                    type="number"
                    name="annualValue"
                    value={formData.annualValue}
                    onChange={handleChange}
                    placeholder="Enter annual value"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Share Percentage
                  </label>
                  <input
                    type="number"
                    name="sharePercentage"
                    value={formData.sharePercentage}
                    onChange={handleChange}
                    placeholder="Enter share percentage"
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
                    Arrears
                  </label>
                  <input
                    type="number"
                    name="arrears"
                    value={formData.arrears}
                    onChange={handleChange}
                    placeholder="Enter arrears"
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

        {/* Step 8: Audit & Financial Info */}
        {step === 8 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Audit & Financial Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Liable to maintain books of account? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="liableYes"
                      name="liableToMaintainBooks"
                      value="yes"
                      checked={formData.liableToMaintainBooks === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="liableYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="liableNo"
                      name="liableToMaintainBooks"
                      value="no"
                      checked={formData.liableToMaintainBooks === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="liableNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {errors.liableToMaintainBooks && <p className="mt-1 text-sm text-red-500">{errors.liableToMaintainBooks}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Audit under 44AB? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="auditYes"
                      name="auditUnder44AB"
                      value="yes"
                      checked={formData.auditUnder44AB === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="auditYes" className="ml-2 text-sm font-medium text-gray-700">
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="auditNo"
                      name="auditUnder44AB"
                      value="no"
                      checked={formData.auditUnder44AB === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="auditNo" className="ml-2 text-sm font-medium text-gray-700">
                      No
                    </label>
                  </div>
                </div>
                {errors.auditUnder44AB && <p className="mt-1 text-sm text-red-500">{errors.auditUnder44AB}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nature of Business 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="natureOfBusiness1"
                    value={formData.natureOfBusiness1}
                    onChange={handleChange}
                    placeholder="Enter nature of business"
                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.natureOfBusiness1 ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.natureOfBusiness1 && <p className="mt-1 text-sm text-red-500">{errors.natureOfBusiness1}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nature of Business 2
                  </label>
                  <input
                    type="text"
                    name="natureOfBusiness2"
                    value={formData.natureOfBusiness2}
                    onChange={handleChange}
                    placeholder="Enter nature of business"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Nature of Business 3
                  </label>
                  <input
                    type="text"
                    name="natureOfBusiness3"
                    value={formData.natureOfBusiness3}
                    onChange={handleChange}
                    placeholder="Enter nature of business"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Business Description 1
                  </label>
                  <textarea
                    name="businessDescription1"
                    value={formData.businessDescription1}
                    onChange={handleChange}
                    placeholder="Enter business description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Business Description 2
                  </label>
                  <textarea
                    name="businessDescription2"
                    value={formData.businessDescription2}
                    onChange={handleChange}
                    placeholder="Enter business description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Business Description 3
                  </label>
                  <textarea
                    name="businessDescription3"
                    value={formData.businessDescription3}
                    onChange={handleChange}
                    placeholder="Enter business description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>

              {formData.auditUnder44AB === "yes" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="mb-4 text-md font-semibold text-gray-700">Auditor Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Auditor Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="auditorName"
                        value={formData.auditorName}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.auditorName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.auditorName && <p className="mt-1 text-sm text-red-500">{errors.auditorName}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Auditor Membership <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="auditorMembership"
                        value={formData.auditorMembership}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.auditorMembership ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.auditorMembership && <p className="mt-1 text-sm text-red-500">{errors.auditorMembership}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Auditor PAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="auditorPAN"
                        value={formData.auditorPAN}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.auditorPAN ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.auditorPAN && <p className="mt-1 text-sm text-red-500">{errors.auditorPAN}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Auditor Registration No. <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="auditorRegNo"
                        value={formData.auditorRegNo}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.auditorRegNo ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.auditorRegNo && <p className="mt-1 text-sm text-red-500">{errors.auditorRegNo}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Audit Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="auditDate"
                        value={formData.auditDate}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.auditDate ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.auditDate && <p className="mt-1 text-sm text-red-500">{errors.auditDate}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        UDIN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="udin"
                        value={formData.udin}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.udin ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.udin && <p className="mt-1 text-sm text-red-500">{errors.udin}</p>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Audit Acknowledgment <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="auditAck"
                        value={formData.auditAck}
                        onChange={handleChange}
                        className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.auditAck ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.auditAck && <p className="mt-1 text-sm text-red-500">{errors.auditAck}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Audit/Compliance Fields */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Enhanced Audit & Compliance Information</h4>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Liable under section 92E (Transfer Pricing)?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="liable92EYes"
                          name="isLiableUnder92E"
                          value="true"
                          checked={formData.isLiableUnder92E === true}
                          onChange={(e) => setFormData(prev => ({ ...prev, isLiableUnder92E: e.target.value === "true" }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="liable92EYes" className="ml-2 text-sm font-medium text-gray-700">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="liable92ENo"
                          name="isLiableUnder92E"
                          value="false"
                          checked={formData.isLiableUnder92E === false}
                          onChange={(e) => setFormData(prev => ({ ...prev, isLiableUnder92E: e.target.value === "true" }))}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="liable92ENo" className="ml-2 text-sm font-medium text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Audit Firm Name
                      </label>
                      <input
                        type="text"
                        name="auditFirmName"
                        value={formData.auditFirmName}
                        onChange={handleChange}
                        placeholder="Enter audit firm name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Audit Firm PAN
                      </label>
                      <input
                        type="text"
                        name="auditFirmPAN"
                        value={formData.auditFirmPAN}
                        onChange={handleChange}
                        placeholder="Enter audit firm PAN"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Depreciation as per Books (₹)
                      </label>
                      <input
                        type="number"
                        name="depreciationAsPerBooks"
                        value={formData.depreciationAsPerBooks}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Depreciation as per Income Tax (₹)
                      </label>
                      <input
                        type="number"
                        name="depreciationAsPerIT"
                        value={formData.depreciationAsPerIT}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 9: Financial Statements */}
        {step === 9 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Financial Statements</h3>
            <div className="space-y-8">
              {/* Balance Sheet */}
              <div>
                <h4 className="mb-4 text-md font-semibold text-gray-700">Balance Sheet</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Fixed Assets
                    </label>
                    <input
                      type="number"
                      name="fixedAssets"
                      value={formData.fixedAssets}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Current Assets
                    </label>
                    <input
                      type="number"
                      name="currentAssets"
                      value={formData.currentAssets}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Investments
                    </label>
                    <input
                      type="number"
                      name="investments"
                      value={formData.investments}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Loans & Advances
                    </label>
                    <input
                      type="number"
                      name="loansAdvances"
                      value={formData.loansAdvances}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Current Liabilities
                    </label>
                    <input
                      type="number"
                      name="currentLiabilities"
                      value={formData.currentLiabilities}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Long Term Liabilities
                    </label>
                    <input
                      type="number"
                      name="longTermLiabilities"
                      value={formData.longTermLiabilities}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Capital
                    </label>
                    <input
                      type="number"
                      name="capital"
                      value={formData.capital}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Reserves
                    </label>
                    <input
                      type="number"
                      name="reserves"
                      value={formData.reserves}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* P&L Statement */}
              <div>
                <h4 className="mb-4 text-md font-semibold text-gray-700">Profit & Loss Statement</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gross Sales
                    </label>
                    <input
                      type="number"
                      name="grossSales"
                      value={formData.grossSales}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Net Sales
                    </label>
                    <input
                      type="number"
                      name="netSales"
                      value={formData.netSales}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gross Profit
                    </label>
                    <input
                      type="number"
                      name="grossProfit"
                      value={formData.grossProfit}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Net Profit
                    </label>
                    <input
                      type="number"
                      name="netProfit"
                      value={formData.netProfit}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Total Expenses
                    </label>
                    <input
                      type="number"
                      name="totalExpenses"
                      value={formData.totalExpenses}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Presumptive Income */}
              <div>
                <h4 className="mb-4 text-md font-semibold text-gray-700">Presumptive Income</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Presumptive Income u/s 44AD
                    </label>
                    <input
                      type="number"
                      name="presumptiveIncome44AD"
                      value={formData.presumptiveIncome44AD}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Presumptive Income u/s 44ADA
                    </label>
                    <input
                      type="number"
                      name="presumptiveIncome44ADA"
                      value={formData.presumptiveIncome44ADA}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Presumptive Income u/s 44AE
                    </label>
                    <input
                      type="number"
                      name="presumptiveIncome44AE"
                      value={formData.presumptiveIncome44AE}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Other Financial Info */}
              <div>
                <h4 className="mb-4 text-md font-semibold text-gray-700">Other Financial Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Opening Stock
                    </label>
                    <input
                      type="number"
                      name="openingStock"
                      value={formData.openingStock}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Closing Stock
                    </label>
                    <input
                      type="number"
                      name="closingStock"
                      value={formData.closingStock}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Purchases
                    </label>
                    <input
                      type="number"
                      name="purchases"
                      value={formData.purchases}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Direct Expenses
                    </label>
                    <input
                      type="number"
                      name="directExpenses"
                      value={formData.directExpenses}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Indirect Expenses
                    </label>
                    <input
                      type="number"
                      name="indirectExpenses"
                      value={formData.indirectExpenses}
                      onChange={handleChange}
                      placeholder="Enter amount"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Quantitative Details
                  </label>
                  <textarea
                    name="quantitativeDetails"
                    value={formData.quantitativeDetails}
                    onChange={handleChange}
                    placeholder="Enter quantitative details"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 10: Schedule IF - Unlisted Shares */}
        {step === 10 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule IF - Unlisted Shares</h3>
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-4">
                  <strong>Note:</strong> This schedule is mandatory if you have held unlisted equity shares during the financial year.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const newShare = {
                      companyName: "",
                      companyPAN: "",
                      noOfShares: 0,
                      faceValue: 0,
                      acquisitionDate: "",
                      issuePrice: 0,
                      purchasePrice: 0
                    };
                    setFormData(prev => ({
                      ...prev,
                      unlistedShares: [...prev.unlistedShares, newShare]
                    }));
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Add Unlisted Share
                </button>
              </div>

              {formData.unlistedShares.map((share, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-md font-semibold text-gray-700">Unlisted Share #{index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          unlistedShares: prev.unlistedShares.filter((_, i) => i !== index)
                        }));
                      }}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={share.companyName}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].companyName = e.target.value;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        placeholder="Enter company name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Company PAN <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={share.companyPAN}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].companyPAN = e.target.value;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        placeholder="Enter company PAN"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Number of Shares
                      </label>
                      <input
                        type="number"
                        value={share.noOfShares}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].noOfShares = parseInt(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        placeholder="Enter number of shares"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Face Value (₹)
                      </label>
                      <input
                        type="number"
                        value={share.faceValue}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].faceValue = parseFloat(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        placeholder="Enter face value"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Acquisition Date
                      </label>
                      <input
                        type="date"
                        value={share.acquisitionDate}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].acquisitionDate = e.target.value;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Issue Price (₹)
                      </label>
                      <input
                        type="number"
                        value={share.issuePrice}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].issuePrice = parseFloat(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        placeholder="Enter issue price"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Purchase Price (₹)
                      </label>
                      <input
                        type="number"
                        value={share.purchasePrice}
                        onChange={(e) => {
                          const newShares = [...formData.unlistedShares];
                          newShares[index].purchasePrice = parseFloat(e.target.value) || 0;
                          setFormData(prev => ({ ...prev, unlistedShares: newShares }));
                        }}
                        placeholder="Enter purchase price"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {formData.unlistedShares.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No unlisted shares added yet. Click "Add Unlisted Share" to begin.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 11: Business Income & Schedules */}
        {step === 11 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Business Income & Schedules</h3>
            <div className="space-y-8">
              {/* Business Income Details */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Business Income Computation</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Income u/s 28 (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.businessIncomeDetails.section28Income}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        businessIncomeDetails: {
                          ...prev.businessIncomeDetails,
                          section28Income: e.target.value
                        }
                      }))}
                      placeholder="Enter section 28 income"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Adjustments u/s 44AD (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.businessIncomeDetails.section44ADAdjustments}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        businessIncomeDetails: {
                          ...prev.businessIncomeDetails,
                          section44ADAdjustments: e.target.value
                        }
                      }))}
                      placeholder="Enter 44AD adjustments"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Other Business Income (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.businessIncomeDetails.otherBusinessIncome}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        businessIncomeDetails: {
                          ...prev.businessIncomeDetails,
                          otherBusinessIncome: e.target.value
                        }
                      }))}
                      placeholder="Enter other business income"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 44AE Vehicles */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Section 44AE - Goods Carriage Vehicles</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newVehicle = {
                      vehicleType: "",
                      tonnage: 0,
                      monthsOwned: 0,
                      presumptiveIncome: 0
                    };
                    setFormData(prev => ({
                      ...prev,
                      section44AEVehicles: [...prev.section44AEVehicles, newVehicle]
                    }));
                  }}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  + Add Vehicle
                </button>

                {formData.section44AEVehicles.map((vehicle, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-sm font-semibold text-gray-700">Vehicle #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            section44AEVehicles: prev.section44AEVehicles.filter((_, i) => i !== index)
                          }));
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Vehicle Type
                        </label>
                        <select
                          value={vehicle.vehicleType}
                          onChange={(e) => {
                            const newVehicles = [...formData.section44AEVehicles];
                            newVehicles[index].vehicleType = e.target.value;
                            setFormData(prev => ({ ...prev, section44AEVehicles: newVehicles }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select vehicle type</option>
                          <option value="heavy-goods">Heavy Goods Vehicle</option>
                          <option value="light-goods">Light Goods Vehicle</option>
                          <option value="three-wheeler">Three Wheeler</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Tonnage
                        </label>
                        <input
                          type="number"
                          value={vehicle.tonnage}
                          onChange={(e) => {
                            const newVehicles = [...formData.section44AEVehicles];
                            newVehicles[index].tonnage = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, section44AEVehicles: newVehicles }));
                          }}
                          placeholder="Enter tonnage"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Months Owned
                        </label>
                        <input
                          type="number"
                          value={vehicle.monthsOwned}
                          onChange={(e) => {
                            const newVehicles = [...formData.section44AEVehicles];
                            newVehicles[index].monthsOwned = parseInt(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, section44AEVehicles: newVehicles }));
                          }}
                          placeholder="Enter months owned"
                          max="12"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Presumptive Income (₹)
                        </label>
                        <input
                          type="number"
                          value={vehicle.presumptiveIncome}
                          onChange={(e) => {
                            const newVehicles = [...formData.section44AEVehicles];
                            newVehicles[index].presumptiveIncome = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, section44AEVehicles: newVehicles }));
                          }}
                          placeholder="Auto-calculated"
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.section44AEVehicles.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No vehicles added yet. Click "Add Vehicle" to begin.
                  </div>
                )}
              </div>

              {/* Section 44ADA & Partners Remuneration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Opted for Section 44ADA?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="section44ADAYes"
                        name="section44ADAOpted"
                        value="true"
                        checked={formData.section44ADAOpted === true}
                        onChange={(e) => setFormData(prev => ({ ...prev, section44ADAOpted: e.target.value === "true" }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="section44ADAYes" className="ml-2 text-sm font-medium text-gray-700">
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="section44ADANo"
                        name="section44ADAOpted"
                        value="false"
                        checked={formData.section44ADAOpted === false}
                        onChange={(e) => setFormData(prev => ({ ...prev, section44ADAOpted: e.target.value === "true" }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="section44ADANo" className="ml-2 text-sm font-medium text-gray-700">
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Partners Remuneration Received (₹)
                  </label>
                  <input
                    type="number"
                    name="partnersRemuneration"
                    value={formData.partnersRemuneration}
                    onChange={handleChange}
                    placeholder="Enter partners remuneration"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 12: Schedule AL - Assets & Liabilities */}
        {step === 12 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule AL - Assets & Liabilities</h3>
            <div className="p-4 bg-yellow-50 rounded-lg mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This schedule is mandatory if total income exceeds ₹50 lakhs.
              </p>
            </div>
            <div className="space-y-8">
              {/* Movable Assets */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Movable Assets</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Cash in Hand (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.movableAssets.cashInHand}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        movableAssets: { ...prev.movableAssets, cashInHand: e.target.value }
                      }))}
                      placeholder="Enter cash in hand"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Jewelry, Bullion etc. (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.movableAssets.jewelryBullion}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        movableAssets: { ...prev.movableAssets, jewelryBullion: e.target.value }
                      }))}
                      placeholder="Enter jewelry & bullion value"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Archaeological Collections (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.movableAssets.archaeologicalCollections}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        movableAssets: { ...prev.movableAssets, archaeologicalCollections: e.target.value }
                      }))}
                      placeholder="Enter archaeological collections value"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Insurance Policies (₹)
                    </label>
                    <input
                      type="number"
                                        value={formData.movableAssets.insurancePolicies}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    movableAssets: { ...prev.movableAssets, insurancePolicies: e.target.value }
                  }))}
                      placeholder="Enter insurance policies value"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Bank Deposits (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.movableAssets.bankDeposits}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        movableAssets: { ...prev.movableAssets, bankDeposits: e.target.value }
                      }))}
                      placeholder="Enter bank deposits"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Shares & Securities (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.movableAssets.sharesSecurities}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        movableAssets: { ...prev.movableAssets, sharesSecurities: e.target.value }
                      }))}
                      placeholder="Enter shares & securities value"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Other Movable Assets (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.movableAssets.otherMovable}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        movableAssets: { ...prev.movableAssets, otherMovable: e.target.value }
                      }))}
                      placeholder="Enter other movable assets"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Immovable Assets */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Immovable Assets</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Buildings & Land (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.immovableAssets.buildingsLand}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        immovableAssets: { ...prev.immovableAssets, buildingsLand: e.target.value }
                      }))}
                      placeholder="Enter buildings & land value"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Other Immovable Assets (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.immovableAssets.otherImmovable}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        immovableAssets: { ...prev.immovableAssets, otherImmovable: e.target.value }
                      }))}
                      placeholder="Enter other immovable assets"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Liabilities */}
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Liabilities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Liabilities to Banks (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.liabilities.liabilitiesToBank}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        liabilities: { ...prev.liabilities, liabilitiesToBank: e.target.value }
                      }))}
                      placeholder="Enter liabilities to banks"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Liabilities to Others (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.liabilities.liabilitiesToOthers}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        liabilities: { ...prev.liabilities, liabilitiesToOthers: e.target.value }
                      }))}
                      placeholder="Enter liabilities to others"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Net Worth Summary */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Net Worth Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Total Assets</p>
                    <p className="text-lg font-bold text-blue-600">₹ {(
                      parseFloat(formData.movableAssets.cashInHand || '0') +
                      parseFloat(formData.movableAssets.jewelryBullion || '0') +
                      parseFloat(formData.movableAssets.archaeologicalCollections || '0') +
                      parseFloat(formData.movableAssets.insurancePolicies || '0') +
                      parseFloat(formData.movableAssets.bankDeposits || '0') +
                      parseFloat(formData.movableAssets.sharesSecurities || '0') +
                      parseFloat(formData.movableAssets.otherMovable || '0') +
                      parseFloat(formData.immovableAssets.buildingsLand || '0') +
                      parseFloat(formData.immovableAssets.otherImmovable || '0')
                    ).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Total Liabilities</p>
                    <p className="text-lg font-bold text-red-600">₹ {(
                      parseFloat(formData.liabilities.liabilitiesToBank || '0') +
                      parseFloat(formData.liabilities.liabilitiesToOthers || '0')
                    ).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Net Worth</p>
                    <p className="text-lg font-bold text-green-600">₹ {(
                      (parseFloat(formData.movableAssets.cashInHand || '0') +
                      parseFloat(formData.movableAssets.jewelryBullion || '0') +
                      parseFloat(formData.movableAssets.archaeologicalCollections || '0') +
                      parseFloat(formData.movableAssets.insurancePolicies || '0') +
                      parseFloat(formData.movableAssets.bankDeposits || '0') +
                      parseFloat(formData.movableAssets.sharesSecurities || '0') +
                      parseFloat(formData.movableAssets.otherMovable || '0') +
                      parseFloat(formData.immovableAssets.buildingsLand || '0') +
                      parseFloat(formData.immovableAssets.otherImmovable || '0')) -
                      (parseFloat(formData.liabilities.liabilitiesToBank || '0') +
                      parseFloat(formData.liabilities.liabilitiesToOthers || '0'))
                    ).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 13: Foreign Assets & Income */}
        {step === 13 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Foreign Assets & Income</h3>
            <div className="p-4 bg-purple-50 rounded-lg mb-6">
              <p className="text-sm text-purple-800">
                <strong>Note:</strong> Mandatory for residents having foreign assets or income exceeding specified thresholds.
              </p>
            </div>
            <div className="space-y-8">
              {/* Foreign Bank Accounts */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Foreign Bank Accounts</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newAccount = {
                      accountNumber: "",
                      bankName: "",
                      country: "",
                      maxBalance: 0,
                      interestEarned: 0
                    };
                    setFormData(prev => ({
                      ...prev,
                      foreignBankAccounts: [...prev.foreignBankAccounts, newAccount]
                    }));
                  }}
                  className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Add Foreign Bank Account
                </button>

                {formData.foreignBankAccounts.map((account, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-sm font-semibold text-gray-700">Account #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            foreignBankAccounts: prev.foreignBankAccounts.filter((_, i) => i !== index)
                          }));
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Account Number
                        </label>
                        <input
                          type="text"
                          value={account.accountNumber}
                          onChange={(e) => {
                            const newAccounts = [...formData.foreignBankAccounts];
                            newAccounts[index].accountNumber = e.target.value;
                            setFormData(prev => ({ ...prev, foreignBankAccounts: newAccounts }));
                          }}
                          placeholder="Enter account number"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          value={account.bankName}
                          onChange={(e) => {
                            const newAccounts = [...formData.foreignBankAccounts];
                            newAccounts[index].bankName = e.target.value;
                            setFormData(prev => ({ ...prev, foreignBankAccounts: newAccounts }));
                          }}
                          placeholder="Enter bank name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          type="text"
                          value={account.country}
                          onChange={(e) => {
                            const newAccounts = [...formData.foreignBankAccounts];
                            newAccounts[index].country = e.target.value;
                            setFormData(prev => ({ ...prev, foreignBankAccounts: newAccounts }));
                          }}
                          placeholder="Enter country"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Maximum Balance (₹)
                        </label>
                        <input
                          type="number"
                          value={account.maxBalance}
                          onChange={(e) => {
                            const newAccounts = [...formData.foreignBankAccounts];
                            newAccounts[index].maxBalance = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, foreignBankAccounts: newAccounts }));
                          }}
                          placeholder="Enter maximum balance"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Interest Earned (₹)
                        </label>
                        <input
                          type="number"
                          value={account.interestEarned}
                          onChange={(e) => {
                            const newAccounts = [...formData.foreignBankAccounts];
                            newAccounts[index].interestEarned = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, foreignBankAccounts: newAccounts }));
                          }}
                          placeholder="Enter interest earned"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.foreignBankAccounts.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No foreign bank accounts added yet.
                  </div>
                )}
              </div>

              {/* Foreign Properties */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Foreign Properties</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newProperty = {
                      propertyAddress: "",
                      country: "",
                      zipCode: "",
                      ownershipPercentage: 0,
                      incomeFromProperty: 0
                    };
                    setFormData(prev => ({
                      ...prev,
                      foreignProperties: [...prev.foreignProperties, newProperty]
                    }));
                  }}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  + Add Foreign Property
                </button>

                {formData.foreignProperties.map((property, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-sm font-semibold text-gray-700">Property #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            foreignProperties: prev.foreignProperties.filter((_, i) => i !== index)
                          }));
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Property Address
                        </label>
                        <input
                          type="text"
                          value={property.propertyAddress}
                          onChange={(e) => {
                            const newProperties = [...formData.foreignProperties];
                            newProperties[index].propertyAddress = e.target.value;
                            setFormData(prev => ({ ...prev, foreignProperties: newProperties }));
                          }}
                          placeholder="Enter property address"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          type="text"
                          value={property.country}
                          onChange={(e) => {
                            const newProperties = [...formData.foreignProperties];
                            newProperties[index].country = e.target.value;
                            setFormData(prev => ({ ...prev, foreignProperties: newProperties }));
                          }}
                          placeholder="Enter country"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={property.zipCode}
                          onChange={(e) => {
                            const newProperties = [...formData.foreignProperties];
                            newProperties[index].zipCode = e.target.value;
                            setFormData(prev => ({ ...prev, foreignProperties: newProperties }));
                          }}
                          placeholder="Enter ZIP code"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Ownership Percentage (%)
                        </label>
                        <input
                          type="number"
                          value={property.ownershipPercentage}
                          onChange={(e) => {
                            const newProperties = [...formData.foreignProperties];
                            newProperties[index].ownershipPercentage = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, foreignProperties: newProperties }));
                          }}
                          placeholder="Enter ownership %"
                          max="100"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Income from Property (₹)
                        </label>
                        <input
                          type="number"
                          value={property.incomeFromProperty}
                          onChange={(e) => {
                            const newProperties = [...formData.foreignProperties];
                            newProperties[index].incomeFromProperty = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, foreignProperties: newProperties }));
                          }}
                          placeholder="Enter income from property"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.foreignProperties.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No foreign properties added yet.
                  </div>
                )}
              </div>

              {/* Foreign Employment & Tax */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="mb-4 text-md font-semibold text-gray-700">Foreign Employment Details</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Employer Name
                      </label>
                      <input
                        type="text"
                        value={formData.foreignEmployerDetails.employerName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          foreignEmployerDetails: {
                            ...prev.foreignEmployerDetails,
                            employerName: e.target.value
                          }
                        }))}
                        placeholder="Enter employer name"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Employer Address
                      </label>
                      <textarea
                        value={formData.foreignEmployerDetails.employerAddress}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          foreignEmployerDetails: {
                            ...prev.foreignEmployerDetails,
                            employerAddress: e.target.value
                          }
                        }))}
                        placeholder="Enter employer address"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Tax ID Number
                      </label>
                      <input
                        type="text"
                        value={formData.foreignEmployerDetails.taxIdNumber}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          foreignEmployerDetails: {
                            ...prev.foreignEmployerDetails,
                            taxIdNumber: e.target.value
                          }
                        }))}
                        placeholder="Enter tax ID number"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Salary Paid (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.foreignEmployerDetails.salaryPaid}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          foreignEmployerDetails: {
                            ...prev.foreignEmployerDetails,
                            salaryPaid: e.target.value
                          }
                        }))}
                        placeholder="Enter salary paid"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="mb-4 text-md font-semibold text-gray-700">Foreign Tax Paid</h4>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Total Foreign Tax Paid (₹)
                    </label>
                    <input
                      type="number"
                      name="foreignTaxPaid"
                      value={formData.foreignTaxPaid}
                      onChange={handleChange}
                      placeholder="Enter foreign tax paid"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="mt-2 text-sm text-gray-600">
                      Enter the total amount of tax paid in foreign countries that you wish to claim as credit under DTAA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 14: Tax Payments & TDS/TCS */}
        {step === 14 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Tax Payments & TDS/TCS</h3>
            <div className="space-y-8">
              {/* TDS on Salary */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">TDS on Salary</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newTDS = {
                      deductorTAN: "",
                      deductorName: "",
                      totalSalaryPaid: 0,
                      taxDeducted: 0,
                      tdsClaimedBy: ""
                    };
                    setFormData(prev => ({
                      ...prev,
                      tdsSalary: [...prev.tdsSalary, newTDS]
                    }));
                  }}
                  className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  + Add TDS Entry
                </button>

                {formData.tdsSalary.map((tds, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-sm font-semibold text-gray-700">TDS Entry #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            tdsSalary: prev.tdsSalary.filter((_, i) => i !== index)
                          }));
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Deductor TAN
                        </label>
                        <input
                          type="text"
                          value={tds.deductorTAN}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsSalary];
                            newTDS[index].deductorTAN = e.target.value;
                            setFormData(prev => ({ ...prev, tdsSalary: newTDS }));
                          }}
                          placeholder="Enter deductor TAN"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Deductor Name
                        </label>
                        <input
                          type="text"
                          value={tds.deductorName}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsSalary];
                            newTDS[index].deductorName = e.target.value;
                            setFormData(prev => ({ ...prev, tdsSalary: newTDS }));
                          }}
                          placeholder="Enter deductor name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Total Salary Paid (₹)
                        </label>
                        <input
                          type="number"
                          value={tds.totalSalaryPaid}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsSalary];
                            newTDS[index].totalSalaryPaid = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, tdsSalary: newTDS }));
                          }}
                          placeholder="Enter total salary paid"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Tax Deducted (₹)
                        </label>
                        <input
                          type="number"
                          value={tds.taxDeducted}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsSalary];
                            newTDS[index].taxDeducted = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, tdsSalary: newTDS }));
                          }}
                          placeholder="Enter tax deducted"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          TDS Claimed By
                        </label>
                        <select
                          value={tds.tdsClaimedBy}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsSalary];
                            newTDS[index].tdsClaimedBy = e.target.value;
                            setFormData(prev => ({ ...prev, tdsSalary: newTDS }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select who claimed TDS</option>
                          <option value="self">Self</option>
                          <option value="employer">Employer</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {formData.tdsSalary.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No TDS entries added yet.
                  </div>
                )}
              </div>

              {/* TDS on Other Income */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">TDS on Other Income</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newTDS = {
                      deductorTAN: "",
                      deductorName: "",
                      grossAmount: 0,
                      taxDeducted: 0,
                      natureOfPayment: ""
                    };
                    setFormData(prev => ({
                      ...prev,
                      tdsOther: [...prev.tdsOther, newTDS]
                    }));
                  }}
                  className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  + Add TDS Entry
                </button>

                {formData.tdsOther.map((tds, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-sm font-semibold text-gray-700">TDS Entry #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            tdsOther: prev.tdsOther.filter((_, i) => i !== index)
                          }));
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Deductor TAN
                        </label>
                        <input
                          type="text"
                          value={tds.deductorTAN}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsOther];
                            newTDS[index].deductorTAN = e.target.value;
                            setFormData(prev => ({ ...prev, tdsOther: newTDS }));
                          }}
                          placeholder="Enter deductor TAN"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Deductor Name
                        </label>
                        <input
                          type="text"
                          value={tds.deductorName}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsOther];
                            newTDS[index].deductorName = e.target.value;
                            setFormData(prev => ({ ...prev, tdsOther: newTDS }));
                          }}
                          placeholder="Enter deductor name"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Gross Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={tds.grossAmount}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsOther];
                            newTDS[index].grossAmount = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, tdsOther: newTDS }));
                          }}
                          placeholder="Enter gross amount"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Tax Deducted (₹)
                        </label>
                        <input
                          type="number"
                          value={tds.taxDeducted}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsOther];
                            newTDS[index].taxDeducted = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, tdsOther: newTDS }));
                          }}
                          placeholder="Enter tax deducted"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Nature of Payment
                        </label>
                        <select
                          value={tds.natureOfPayment}
                          onChange={(e) => {
                            const newTDS = [...formData.tdsOther];
                            newTDS[index].natureOfPayment = e.target.value;
                            setFormData(prev => ({ ...prev, tdsOther: newTDS }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select nature of payment</option>
                          <option value="interest">Interest</option>
                          <option value="dividend">Dividend</option>
                          <option value="rent">Rent</option>
                          <option value="professional-fees">Professional Fees</option>
                          <option value="commission">Commission</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {formData.tdsOther.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No TDS entries added yet.
                  </div>
                )}
              </div>

              {/* Advance Tax Payments */}
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Advance Tax Payments</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newPayment = {
                      paymentDate: "",
                      amount: 0,
                      bsr: "",
                      serialNumber: ""
                    };
                    setFormData(prev => ({
                      ...prev,
                      advanceTaxPayments: [...prev.advanceTaxPayments, newPayment]
                    }));
                  }}
                  className="mb-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  + Add Advance Tax Payment
                </button>

                {formData.advanceTaxPayments.map((payment, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="text-sm font-semibold text-gray-700">Payment #{index + 1}</h5>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            advanceTaxPayments: prev.advanceTaxPayments.filter((_, i) => i !== index)
                          }));
                        }}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Payment Date
                        </label>
                        <input
                          type="date"
                          value={payment.paymentDate}
                          onChange={(e) => {
                            const newPayments = [...formData.advanceTaxPayments];
                            newPayments[index].paymentDate = e.target.value;
                            setFormData(prev => ({ ...prev, advanceTaxPayments: newPayments }));
                          }}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={payment.amount}
                          onChange={(e) => {
                            const newPayments = [...formData.advanceTaxPayments];
                            newPayments[index].amount = parseFloat(e.target.value) || 0;
                            setFormData(prev => ({ ...prev, advanceTaxPayments: newPayments }));
                          }}
                          placeholder="Enter amount"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          BSR Code
                        </label>
                        <input
                          type="text"
                          value={payment.bsr}
                          onChange={(e) => {
                            const newPayments = [...formData.advanceTaxPayments];
                            newPayments[index].bsr = e.target.value;
                            setFormData(prev => ({ ...prev, advanceTaxPayments: newPayments }));
                          }}
                          placeholder="Enter BSR code"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Serial Number
                        </label>
                        <input
                          type="text"
                          value={payment.serialNumber}
                          onChange={(e) => {
                            const newPayments = [...formData.advanceTaxPayments];
                            newPayments[index].serialNumber = e.target.value;
                            setFormData(prev => ({ ...prev, advanceTaxPayments: newPayments }));
                          }}
                          placeholder="Enter serial number"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {formData.advanceTaxPayments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No advance tax payments added yet.
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Tax Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Total TDS</p>
                    <p className="text-lg font-bold text-blue-600">₹ {(
                      formData.tdsSalary.reduce((sum, tds) => sum + (tds.taxDeducted || 0), 0) +
                      formData.tdsOther.reduce((sum, tds) => sum + (tds.taxDeducted || 0), 0)
                    ).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Advance Tax</p>
                    <p className="text-lg font-bold text-green-600">₹ {
                      formData.advanceTaxPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0).toLocaleString('en-IN')
                    }</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Total Tax Credit</p>
                    <p className="text-lg font-bold text-purple-600">₹ {(
                      formData.tdsSalary.reduce((sum, tds) => sum + (tds.taxDeducted || 0), 0) +
                      formData.tdsOther.reduce((sum, tds) => sum + (tds.taxDeducted || 0), 0) +
                      formData.advanceTaxPayments.reduce((sum, payment) => sum + (payment.amount || 0), 0)
                    ).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 15: Declaration & Verification */}
        {step === 15 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Declaration & Verification</h3>
            <div className="space-y-8">
              {/* Verification Details */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Verification Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Verifier Name <span className="text-red-500">*</span>
                    </label>
                                         <input
                       type="text"
                       name="verifierName"
                       value={formData.verifierName}
                       onChange={handleChange}
                       placeholder="Enter verifier name"
                       className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verifierName ? "border-red-500" : "border-gray-300"}`}
                     />
                     {errors.verifierName && <p className="mt-1 text-sm text-red-500">{errors.verifierName}</p>}
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
                       className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.fatherName ? "border-red-500" : "border-gray-300"}`}
                     />
                     {errors.fatherName && <p className="mt-1 text-sm text-red-500">{errors.fatherName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Capacity <span className="text-red-500">*</span>
                    </label>
                                         <select
                       name="capacity"
                       value={formData.capacity}
                       onChange={handleChange}
                       className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.capacity ? "border-red-500" : "border-gray-300"}`}
                     >
                      <option value="">Select capacity</option>
                      <option value="self">Self</option>
                      <option value="authorized-representative">Authorized Representative</option>
                      <option value="legal-heir">Legal Heir</option>
                      <option value="guardian">Guardian</option>
                                             <option value="power-of-attorney">Power of Attorney</option>
                     </select>
                     {errors.capacity && <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>}
                   </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Verification Place <span className="text-red-500">*</span>
                    </label>
                                         <input
                       type="text"
                       name="verificationPlace"
                       value={formData.verificationPlace}
                       onChange={handleChange}
                       placeholder="Enter verification place"
                       className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verificationPlace ? "border-red-500" : "border-gray-300"}`}
                     />
                     {errors.verificationPlace && <p className="mt-1 text-sm text-red-500">{errors.verificationPlace}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Verification Date <span className="text-red-500">*</span>
                    </label>
                                         <input
                       type="date"
                       name="verificationDate"
                       value={formData.verificationDate}
                       onChange={handleChange}
                       className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.verificationDate ? "border-red-500" : "border-gray-300"}`}
                     />
                     {errors.verificationDate && <p className="mt-1 text-sm text-red-500">{errors.verificationDate}</p>}
                  </div>
                </div>
              </div>

              {/* Declaration */}
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Declaration</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      I, <strong>{formData.verifierName || '[Name]'}</strong>, son/daughter of <strong>{formData.fatherName || '[Father\'s Name]'}</strong>, 
                      solemnly declare that to the best of my knowledge and belief, the information given in this return and the schedules thereto is 
                      correct and complete and that the amount of tax shown therein as payable is correctly worked out according to the provisions of 
                      the Income Tax Act, 1961.
                    </p>
                    <br />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      I further declare that I am making this return in my capacity as <strong>{formData.capacity || '[Capacity]'}</strong> and I am competent to make this 
                      return and verify it. I am also responsible for the correctness of the return and the schedules.
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="declarationAccepted"
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="declarationAccepted" className="text-sm text-gray-700">
                      <span className="text-red-500">*</span> I hereby accept the above declaration and certify that the information provided is true and complete to the best of my knowledge.
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="penaltyAccepted"
                      required
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <label htmlFor="penaltyAccepted" className="text-sm text-gray-700">
                      <span className="text-red-500">*</span> I understand that if any information furnished above is found to be false, I shall be liable for prosecution under Section 277 of the Income Tax Act, 1961 and penalty under other provisions of the Act.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submission Options */}
              <div className="p-4 bg-yellow-50 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Submission Method</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      How do you want to verify this return?
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="verifyDSC"
                          name="verificationMethod"
                          value="dsc"
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="verifyDSC" className="ml-2 text-sm font-medium text-gray-700">
                          Digital Signature Certificate (DSC)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="verifyOTP"
                          name="verificationMethod"
                          value="otp"
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="verifyOTP" className="ml-2 text-sm font-medium text-gray-700">
                          Aadhaar OTP
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="verifyEVC"
                          name="verificationMethod"
                          value="evc"
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="verifyEVC" className="ml-2 text-sm font-medium text-gray-700">
                          Electronic Verification Code (EVC) through Bank Account
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Summary */}
              <div className="p-4 bg-gray-100 rounded-lg">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Return Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Filing Status</p>
                    <p className="text-lg font-bold text-blue-600">{formData.isRevisedReturn ? 'Revised' : 'Original'}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Tax Regime</p>
                    <p className="text-lg font-bold text-green-600">{formData.regimeOption || 'Old Regime'}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Verification</p>
                    <p className="text-lg font-bold text-purple-600">{formData.verificationPlace || 'Pending'}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-600">Status</p>
                    <p className="text-lg font-bold text-orange-600">Ready to Submit</p>
                  </div>
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
              step === 15 ? "Submit" : "Next"
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

export default ItrThree;