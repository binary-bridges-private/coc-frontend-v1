import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItrTwo = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    pan: "",
    aadhar: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    residentialStatus: "",
    
    // Step 2: Business/Professional Income
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessPincode: "",
    businessState: "",
    grossReceipts: "",
    totalExpenses: "",
    netProfit: "",
    
    // Step 3: Other Income Sources
    salaryIncome: "",
    housePropertyIncome: "",
    capitalGains: "",
    otherSourcesIncome: "",
    agriculturalIncome: "",
    
    // Step 4: Deductions and Tax Details
    section80C: "",
    section80D: "",
    section80G: "",
    section80TTA: "",
    advanceTaxPaid: "",
    tdsPaid: "",
    selfAssessmentTax: "",
    
    // Step 5: Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
  });

  const [errors, setErrors] = useState({
    pan: "",
    aadhar: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    residentialStatus: "",
    businessName: "",
    businessType: "",
    businessAddress: "",
    businessPincode: "",
    businessState: "",
    grossReceipts: "",
    totalExpenses: "",
    netProfit: "",
    salaryIncome: "",
    housePropertyIncome: "",
    capitalGains: "",
    otherSourcesIncome: "",
    agriculturalIncome: "",
    section80C: "",
    section80D: "",
    section80G: "",
    section80TTA: "",
    advanceTaxPaid: "",
    tdsPaid: "",
    selfAssessmentTax: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validatePincode = (pincode: string) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateStep = (stepNumber: number) => {
    const newErrors = { ...errors };
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.pan) {
          newErrors.pan = "PAN is required";
          isValid = false;
        } else if (!validatePan(formData.pan)) {
          newErrors.pan = "Invalid PAN format";
          isValid = false;
        }

        if (!formData.aadhar) {
          newErrors.aadhar = "Aadhar is required";
          isValid = false;
        } else if (!validateAadhar(formData.aadhar)) {
          newErrors.aadhar = "Invalid Aadhar format";
          isValid = false;
        }

        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
          isValid = false;
        }

        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
          isValid = false;
        }

        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = "Date of birth is required";
          isValid = false;
        }

        if (!formData.gender) {
          newErrors.gender = "Gender is required";
          isValid = false;
        }

        if (!formData.residentialStatus) {
          newErrors.residentialStatus = "Residential status is required";
          isValid = false;
        }
        break;

      case 2:
        if (!formData.businessName) {
          newErrors.businessName = "Business name is required";
          isValid = false;
        }

        if (!formData.businessType) {
          newErrors.businessType = "Business type is required";
          isValid = false;
        }

        if (!formData.businessAddress) {
          newErrors.businessAddress = "Business address is required";
          isValid = false;
        }

        if (!formData.businessPincode) {
          newErrors.businessPincode = "Business pincode is required";
          isValid = false;
        } else if (!validatePincode(formData.businessPincode)) {
          newErrors.businessPincode = "Invalid pincode format";
          isValid = false;
        }

        if (!formData.businessState) {
          newErrors.businessState = "Business state is required";
          isValid = false;
        }

        if (!formData.grossReceipts) {
          newErrors.grossReceipts = "Gross receipts is required";
          isValid = false;
        }

        if (!formData.totalExpenses) {
          newErrors.totalExpenses = "Total expenses is required";
          isValid = false;
        }

        if (!formData.netProfit) {
          newErrors.netProfit = "Net profit is required";
          isValid = false;
        }
        break;

      case 3:
        if (!formData.salaryIncome) {
          newErrors.salaryIncome = "Salary income is required";
          isValid = false;
        }

        if (!formData.housePropertyIncome) {
          newErrors.housePropertyIncome = "House property income is required";
          isValid = false;
        }

        if (!formData.capitalGains) {
          newErrors.capitalGains = "Capital gains is required";
          isValid = false;
        }

        if (!formData.otherSourcesIncome) {
          newErrors.otherSourcesIncome = "Other sources income is required";
          isValid = false;
        }

        if (!formData.agriculturalIncome) {
          newErrors.agriculturalIncome = "Agricultural income is required";
          isValid = false;
        }
        break;

      case 4:
        if (!formData.section80C) {
          newErrors.section80C = "Section 80C deduction is required";
          isValid = false;
        }

        if (!formData.section80D) {
          newErrors.section80D = "Section 80D deduction is required";
          isValid = false;
        }

        if (!formData.section80G) {
          newErrors.section80G = "Section 80G deduction is required";
          isValid = false;
        }

        if (!formData.section80TTA) {
          newErrors.section80TTA = "Section 80TTA deduction is required";
          isValid = false;
        }

        if (!formData.advanceTaxPaid) {
          newErrors.advanceTaxPaid = "Advance tax paid is required";
          isValid = false;
        }

        if (!formData.tdsPaid) {
          newErrors.tdsPaid = "TDS paid is required";
          isValid = false;
        }

        if (!formData.selfAssessmentTax) {
          newErrors.selfAssessmentTax = "Self assessment tax is required";
          isValid = false;
        }
        break;

      case 5:
        if (!formData.bankName) {
          newErrors.bankName = "Bank name is required";
          isValid = false;
        }

        if (!formData.accountNumber) {
          newErrors.accountNumber = "Account number is required";
          isValid = false;
        }

        if (!formData.ifscCode) {
          newErrors.ifscCode = "IFSC code is required";
          isValid = false;
        }

        if (!formData.accountType) {
          newErrors.accountType = "Account type is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 5) {
        setIsLoading(true);
        try {
          // API call to save ITR-2 would go here
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-2. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
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
          {`Step ${step} of 5: ${step === 1 ? "Personal Information" : 
                                step === 2 ? "Business/Professional Income" : 
                                step === 3 ? "Other Income Sources" : 
                                step === 4 ? "Deductions and Tax Details" :
                                "Bank Details"}`
          }
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Personal Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  PAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="Enter PAN number"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Aadhar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.aadhar ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.aadhar && <p className="mt-1 text-sm text-red-500">{errors.aadhar}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
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
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block mb-4 text-lg font-medium text-gray-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-700">
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-700">
                      Female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="other" className="ml-2 text-sm font-medium text-gray-700">
                      Other
                    </label>
                  </div>
                </div>
                {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
              </div>

              <div>
                <label className="block mb-4 text-lg font-medium text-gray-700">
                  Residential Status <span className="text-red-500">*</span>
                </label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="resident"
                      name="residentialStatus"
                      value="resident"
                      checked={formData.residentialStatus === "resident"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="resident" className="ml-2 text-sm font-medium text-gray-700">
                      Resident
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
                      Non-Resident
                    </label>
                  </div>
                </div>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Business/Professional Income</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Enter business name"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessName ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.businessName && <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessType ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select business type</option>
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="huf">HUF</option>
                </select>
                {errors.businessType && <p className="mt-1 text-sm text-red-500">{errors.businessType}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  placeholder="Enter business address"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessAddress ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.businessAddress && <p className="mt-1 text-sm text-red-500">{errors.businessAddress}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Business Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessPincode"
                  value={formData.businessPincode}
                  onChange={handleChange}
                  placeholder="Enter business pincode"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessPincode ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.businessPincode && <p className="mt-1 text-sm text-red-500">{errors.businessPincode}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Business State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessState"
                  value={formData.businessState}
                  onChange={handleChange}
                  placeholder="Enter business state"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessState ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.businessState && <p className="mt-1 text-sm text-red-500">{errors.businessState}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Gross Receipts <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="grossReceipts"
                  value={formData.grossReceipts}
                  onChange={handleChange}
                  placeholder="Enter gross receipts"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.grossReceipts ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.grossReceipts && <p className="mt-1 text-sm text-red-500">{errors.grossReceipts}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Total Expenses <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="totalExpenses"
                  value={formData.totalExpenses}
                  onChange={handleChange}
                  placeholder="Enter total expenses"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.totalExpenses ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.totalExpenses && <p className="mt-1 text-sm text-red-500">{errors.totalExpenses}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Net Profit <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="netProfit"
                  value={formData.netProfit}
                  onChange={handleChange}
                  placeholder="Enter net profit"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.netProfit ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.netProfit && <p className="mt-1 text-sm text-red-500">{errors.netProfit}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Other Income Sources</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Salary Income <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="salaryIncome"
                  value={formData.salaryIncome}
                  onChange={handleChange}
                  placeholder="Enter salary income"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.salaryIncome ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.salaryIncome && <p className="mt-1 text-sm text-red-500">{errors.salaryIncome}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  House Property Income <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="housePropertyIncome"
                  value={formData.housePropertyIncome}
                  onChange={handleChange}
                  placeholder="Enter house property income"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.housePropertyIncome ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.housePropertyIncome && <p className="mt-1 text-sm text-red-500">{errors.housePropertyIncome}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Capital Gains <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="capitalGains"
                  value={formData.capitalGains}
                  onChange={handleChange}
                  placeholder="Enter capital gains"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.capitalGains ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.capitalGains && <p className="mt-1 text-sm text-red-500">{errors.capitalGains}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Other Sources Income <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="otherSourcesIncome"
                  value={formData.otherSourcesIncome}
                  onChange={handleChange}
                  placeholder="Enter other sources income"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.otherSourcesIncome ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.otherSourcesIncome && <p className="mt-1 text-sm text-red-500">{errors.otherSourcesIncome}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Agricultural Income <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="agriculturalIncome"
                  value={formData.agriculturalIncome}
                  onChange={handleChange}
                  placeholder="Enter agricultural income"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.agriculturalIncome ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.agriculturalIncome && <p className="mt-1 text-sm text-red-500">{errors.agriculturalIncome}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Deductions and Tax Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Section 80C Deduction <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="section80C"
                  value={formData.section80C}
                  onChange={handleChange}
                  placeholder="Enter Section 80C deduction"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80C ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.section80C && <p className="mt-1 text-sm text-red-500">{errors.section80C}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Section 80D Deduction <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="section80D"
                  value={formData.section80D}
                  onChange={handleChange}
                  placeholder="Enter Section 80D deduction"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80D ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.section80D && <p className="mt-1 text-sm text-red-500">{errors.section80D}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Section 80G Deduction <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="section80G"
                  value={formData.section80G}
                  onChange={handleChange}
                  placeholder="Enter Section 80G deduction"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80G ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.section80G && <p className="mt-1 text-sm text-red-500">{errors.section80G}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Section 80TTA Deduction <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="section80TTA"
                  value={formData.section80TTA}
                  onChange={handleChange}
                  placeholder="Enter Section 80TTA deduction"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.section80TTA ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.section80TTA && <p className="mt-1 text-sm text-red-500">{errors.section80TTA}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Advance Tax Paid <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="advanceTaxPaid"
                  value={formData.advanceTaxPaid}
                  onChange={handleChange}
                  placeholder="Enter advance tax paid"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.advanceTaxPaid ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.advanceTaxPaid && <p className="mt-1 text-sm text-red-500">{errors.advanceTaxPaid}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  TDS Paid <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="tdsPaid"
                  value={formData.tdsPaid}
                  onChange={handleChange}
                  placeholder="Enter TDS paid"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.tdsPaid ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.tdsPaid && <p className="mt-1 text-sm text-red-500">{errors.tdsPaid}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Self Assessment Tax <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="selfAssessmentTax"
                  value={formData.selfAssessmentTax}
                  onChange={handleChange}
                  placeholder="Enter self assessment tax"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.selfAssessmentTax ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.selfAssessmentTax && <p className="mt-1 text-sm text-red-500">{errors.selfAssessmentTax}</p>}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Bank Details</h3>
            <div className="space-y-6">
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
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.bankName ? "border-red-500" : "border-gray-300"}`}
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
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.accountNumber && <p className="mt-1 text-sm text-red-500">{errors.accountNumber}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  IFSC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="Enter IFSC code"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.ifscCode ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.ifscCode && <p className="mt-1 text-sm text-red-500">{errors.ifscCode}</p>}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Account Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.accountType ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select account type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
                {errors.accountType && <p className="mt-1 text-sm text-red-500">{errors.accountType}</p>}
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
              step === 5 ? "Submit" : "Next"
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