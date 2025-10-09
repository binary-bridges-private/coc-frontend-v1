import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItrOneFormData, ItrOneFormErrors } from './types/ItrOneTypes';
import { initialItrOneFormData, initialItrOneFormErrors, ITR_ONE_OPTIONS, ITR_ONE_STEPS } from './constants/ItrOneConstants';
import { validateItrOneForm, calculateTotalIncome, calculateTotalDeductions, calculateTaxPayable } from './ItrOneValidation';

const ItrOne = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const [formData, setFormData] = useState<ItrOneFormData>(initialItrOneFormData);
  const [errors, setErrors] = useState<ItrOneFormErrors>(initialItrOneFormErrors);

  // Handle form field changes
  const handleInputChange = (field: keyof ItrOneFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle array field changes (for exempt allowances, other sources, etc.)
  const handleArrayFieldChange = (field: keyof ItrOneFormData, index: number, subField: string, value: string) => {
    setFormData(prev => {
      const arrayField = prev[field] as any[];
      const updatedArray = [...arrayField];
      updatedArray[index] = {
        ...updatedArray[index],
        [subField]: value
      };
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };

  // Add new item to array field
  const addArrayItem = (field: keyof ItrOneFormData, newItem: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), newItem]
    }));
  };

  // Remove item from array field
  const removeArrayItem = (field: keyof ItrOneFormData, index: number) => {
    setFormData(prev => {
      const arrayField = prev[field] as any[];
      const updatedArray = arrayField.filter((_, i) => i !== index);
      return {
        ...prev,
        [field]: updatedArray
      };
    });
  };

  // Validate current step
  const validateStep = (stepNumber: number): boolean => {
    const { isValid, errors: validationErrors } = validateItrOneForm(formData);
    setErrors(validationErrors);
    return isValid;
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, ITR_ONE_STEPS.length));
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Save form data
  const saveFormData = async () => {
    setIsLoading(true);
    setSaveError(null);
    
    try {
      // Validate entire form
      const { isValid, errors: validationErrors } = validateItrOneForm(formData);
      if (!isValid) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      // Save to localStorage
      localStorage.setItem('itr1-form-data', JSON.stringify(formData));
      localStorage.setItem('itr1-current-step', step.toString());
      
      // Here you would typically send to backend
      console.log('Form data saved:', formData);
      
      setIsLoading(false);
    } catch (error) {
      setSaveError('Failed to save form data');
      setIsLoading(false);
    }
  };

  // Calculate totals
  const totalIncome = calculateTotalIncome(formData);
  const totalDeductions = calculateTotalDeductions(formData);
  const taxPayable = calculateTaxPayable(totalIncome, totalDeductions);

  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderGeneralInformation();
      case 2:
        return renderNewTaxRegimeAndSeventhProviso();
      case 3:
        return renderIncomeFromSalary();
      case 4:
        return renderIncomeFromHouseProperty();
      case 5:
        return renderIncomeFromOtherSources();
      case 6:
        return renderDeductions();
      case 7:
        return renderTaxComputation();
      case 8:
        return renderBankDetailsAndVerification();
      default:
        return renderGeneralInformation();
    }
  };

  // Step 1: General Information
  const renderGeneralInformation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">General Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Number *
          </label>
          <input
            type="text"
            value={formData.pan}
            onChange={(e) => handleInputChange('pan', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pan ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="ABCDE1234F"
            maxLength={10}
          />
          {errors.pan && <p className="mt-1 text-sm text-red-600">{errors.pan}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Number *
          </label>
          <input
            type="text"
            value={formData.aadhar}
            onChange={(e) => handleInputChange('aadhar', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.aadhar ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="123456789012"
            maxLength={12}
          />
          {errors.aadhar && <p className="mt-1 text-sm text-red-600">{errors.aadhar}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter first name"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Middle Name
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => handleInputChange('middleName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter middle name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter last name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <input
            type="text"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="DD/MM/YYYY"
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            {ITR_ONE_OPTIONS.gender.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residential Status *
          </label>
          <select
            value={formData.residentialStatus}
            onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.residentialStatus ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Residential Status</option>
            {ITR_ONE_OPTIONS.residentialStatus.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.residentialStatus && <p className="mt-1 text-sm text-red-600">{errors.residentialStatus}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number *
          </label>
          <input
            type="text"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter mobile number"
            maxLength={10}
          />
          {errors.mobileNumber && <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.address ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter complete address"
            rows={3}
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter city"
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter state"
          />
          {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pincode *
          </label>
          <input
            type="text"
            value={formData.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.pincode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter pincode"
            maxLength={6}
          />
          {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nature of Employment
          </label>
          <select
            value={formData.natureOfEmployment}
            onChange={(e) => handleInputChange('natureOfEmployment', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Nature of Employment</option>
            {ITR_ONE_OPTIONS.natureOfEmployment.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  // Step 2: New Tax Regime & Seventh Proviso
  const renderNewTaxRegimeAndSeventhProviso = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">New Tax Regime & Seventh Proviso</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">New Tax Regime Options (115BAC)</h3>
        <p className="text-sm text-blue-700 mb-4">
          Do you wish to exercise the option u/s 115BAC(6) of Opting out of new tax regime?
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opting out of New Tax Regime *
            </label>
            <select
              value={formData.optingOut115BAC}
              onChange={(e) => handleInputChange('optingOut115BAC', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>
              {ITR_ONE_OPTIONS.optingOut115BAC.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {formData.optingOut115BAC === 'Yes' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form 10-IEA Date
                </label>
                <input
                  type="text"
                  value={formData.form10IEADate}
                  onChange={(e) => handleInputChange('form10IEADate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DD/MM/YYYY"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form 10-IEA Acknowledgement Number
                </label>
                <input
                  type="text"
                  value={formData.form10IEAAckNumber}
                  onChange={(e) => handleInputChange('form10IEAAckNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter acknowledgement number"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Seventh Proviso Conditions</h3>
        <p className="text-sm text-yellow-700 mb-4">
          Are you filing return of income under Seventh proviso to section 139(1) but otherwise not required to furnish return of income?
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing under Seventh Proviso *
            </label>
            <select
              value={formData.filingUnderSeventhProviso}
              onChange={(e) => handleInputChange('filingUnderSeventhProviso', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Option</option>
              {ITR_ONE_OPTIONS.seventhProvisoOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {formData.filingUnderSeventhProviso === 'Yes' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deposited amount exceeding Rs. 1 Crore in current account?
                </label>
                <select
                  value={formData.depositedOver1Crore}
                  onChange={(e) => handleInputChange('depositedOver1Crore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  {ITR_ONE_OPTIONS.seventhProvisoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formData.depositedOver1Crore === 'Yes' && (
                  <input
                    type="text"
                    value={formData.depositedAmount}
                    onChange={(e) => handleInputChange('depositedAmount', e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foreign travel expenditure exceeding Rs. 2 Lakhs?
                </label>
                <select
                  value={formData.foreignTravelOver2Lakh}
                  onChange={(e) => handleInputChange('foreignTravelOver2Lakh', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  {ITR_ONE_OPTIONS.seventhProvisoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formData.foreignTravelOver2Lakh === 'Yes' && (
                  <input
                    type="text"
                    value={formData.foreignTravelAmount}
                    onChange={(e) => handleInputChange('foreignTravelAmount', e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Electricity consumption exceeding Rs. 1 Lakh?
                </label>
                <select
                  value={formData.electricityOver1Lakh}
                  onChange={(e) => handleInputChange('electricityOver1Lakh', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  {ITR_ONE_OPTIONS.seventhProvisoOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {formData.electricityOver1Lakh === 'Yes' && (
                  <input
                    type="text"
                    value={formData.electricityAmount}
                    onChange={(e) => handleInputChange('electricityAmount', e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Step 3: Income from Salary
  const renderIncomeFromSalary = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Income from Salary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary as per section 17(1)
          </label>
          <input
            type="text"
            value={formData.salarySection17_1}
            onChange={(e) => handleInputChange('salarySection17_1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value of perquisites as per section 17(2)
          </label>
          <input
            type="text"
            value={formData.perquisitesSection17_2}
            onChange={(e) => handleInputChange('perquisitesSection17_2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profit in lieu of salary as per section 17(3)
          </label>
          <input
            type="text"
            value={formData.profitSection17_3}
            onChange={(e) => handleInputChange('profitSection17_3', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            House Rent Allowance u/s 10(13A)
          </label>
          <input
            type="text"
            value={formData.houseRentAllowance}
            onChange={(e) => handleInputChange('houseRentAllowance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Standard Deduction u/s 16(ia)
          </label>
          <input
            type="text"
            value={formData.standardDeduction16}
            onChange={(e) => handleInputChange('standardDeduction16', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entertainment Allowance u/s 16(ii)
          </label>
          <input
            type="text"
            value={formData.entertainmentAllowance}
            onChange={(e) => handleInputChange('entertainmentAllowance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Tax u/s 16(iii)
          </label>
          <input
            type="text"
            value={formData.professionalTax}
            onChange={(e) => handleInputChange('professionalTax', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );

  // Step 4: Income from House Property
  const renderIncomeFromHouseProperty = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Income from House Property</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of House Property
          </label>
          <select
            value={formData.propertyType}
            onChange={(e) => handleInputChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Property Type</option>
            {ITR_ONE_OPTIONS.propertyType.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gross rent received/receivable
          </label>
          <input
            type="text"
            value={formData.grossRent}
            onChange={(e) => handleInputChange('grossRent', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax paid to local authorities
          </label>
          <input
            type="text"
            value={formData.localTaxPaid}
            onChange={(e) => handleInputChange('localTaxPaid', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interest payable on borrowed capital
          </label>
          <input
            type="text"
            value={formData.interestBorrowedCapital}
            onChange={(e) => handleInputChange('interestBorrowedCapital', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Arrears/Unrealised Rent received
          </label>
          <input
            type="text"
            value={formData.arrearsRent}
            onChange={(e) => handleInputChange('arrearsRent', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );

  // Step 5: Income from Other Sources
  const renderIncomeFromOtherSources = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Income from Other Sources</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agricultural Income
          </label>
          <input
            type="text"
            value={formData.agriculturalIncome}
            onChange={(e) => handleInputChange('agriculturalIncome', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Dividend Income
          </label>
          <input
            type="text"
            value={formData.totalDividendIncome}
            onChange={(e) => handleInputChange('totalDividendIncome', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );

  // Step 6: Deductions
  const renderDeductions = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Deductions under Chapter VI-A</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80C - Life insurance, PPF, etc.
          </label>
          <input
            type="text"
            value={formData.section80C}
            onChange={(e) => handleInputChange('section80C', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80D - Health Insurance Premium
          </label>
          <input
            type="text"
            value={formData.section80D}
            onChange={(e) => handleInputChange('section80D', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80G - Donations
          </label>
          <input
            type="text"
            value={formData.section80G}
            onChange={(e) => handleInputChange('section80G', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80TTA - Interest on Savings Account
          </label>
          <input
            type="text"
            value={formData.section80TTA}
            onChange={(e) => handleInputChange('section80TTA', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80E - Education Loan Interest
          </label>
          <input
            type="text"
            value={formData.section80E}
            onChange={(e) => handleInputChange('section80E', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80U - Person with Disability
          </label>
          <input
            type="text"
            value={formData.section80U}
            onChange={(e) => handleInputChange('section80U', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
      </div>
    </div>
  );

  // Step 7: Tax Computation
  const renderTaxComputation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Tax Computation</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Income
            </label>
            <input
              type="text"
              value={totalIncome.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Deductions
            </label>
            <input
              type="text"
              value={totalDeductions.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taxable Income
            </label>
            <input
              type="text"
              value={(totalIncome - totalDeductions).toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Payable
            </label>
            <input
              type="text"
              value={taxPayable.toFixed(2)}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Step 8: Bank Details & Verification
  const renderBankDetailsAndVerification = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Bank Details & Verification</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank Name *
          </label>
          <input
            type="text"
            value={formData.bankName}
            onChange={(e) => handleInputChange('bankName', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.bankName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter bank name"
          />
          {errors.bankName && <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number *
          </label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.accountNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter account number"
          />
          {errors.accountNumber && <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IFSC Code *
          </label>
          <input
            type="text"
            value={formData.ifscCode}
            onChange={(e) => handleInputChange('ifscCode', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.ifscCode ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter IFSC code"
          />
          {errors.ifscCode && <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type *
          </label>
          <select
            value={formData.accountType}
            onChange={(e) => handleInputChange('accountType', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.accountType ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Account Type</option>
            {ITR_ONE_OPTIONS.accountType.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.accountType && <p className="mt-1 text-sm text-red-600">{errors.accountType}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Method *
          </label>
          <select
            value={formData.verificationMethod}
            onChange={(e) => handleInputChange('verificationMethod', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.verificationMethod ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select Verification Method</option>
            {ITR_ONE_OPTIONS.verificationMethod.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.verificationMethod && <p className="mt-1 text-sm text-red-600">{errors.verificationMethod}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Place of Filing *
          </label>
          <input
            type="text"
            value={formData.placeOfFiling}
            onChange={(e) => handleInputChange('placeOfFiling', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.placeOfFiling ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter place of filing"
          />
          {errors.placeOfFiling && <p className="mt-1 text-sm text-red-600">{errors.placeOfFiling}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ITR-1 (SAHAJ)</h1>
              <p className="text-gray-600 mt-2">Indian Income Tax Return for Individuals</p>
            </div>
            <button
              onClick={() => navigate('/practice/itr/login')}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              ← Back to ITR Forms
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Step {step} of {ITR_ONE_STEPS.length}: {ITR_ONE_STEPS[step - 1]?.title}
            </h2>
            <span className="text-sm text-gray-500">
              {Math.round((step / ITR_ONE_STEPS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / ITR_ONE_STEPS.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {ITR_ONE_STEPS[step - 1]?.description}
          </p>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-2 rounded-md font-medium ${
                step === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={saveFormData}
                disabled={isLoading}
                className="px-6 py-2 bg-yellow-600 text-white rounded-md font-medium hover:bg-yellow-700 disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Draft'}
              </button>

              {step < ITR_ONE_STEPS.length ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={saveFormData}
                  disabled={isLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? 'Submitting...' : 'Submit ITR'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{saveError}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItrOne;

