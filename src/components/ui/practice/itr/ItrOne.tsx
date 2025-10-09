import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItrOneFormData, ItrOneFormErrors } from './types/ItrOneTypes';
import { initialItrOneFormData, initialItrOneFormErrors, ITR_ONE_OPTIONS, ITR_ONE_STEPS } from './constants/ItrOneConstants.ts';
import { validateItrOneForm, calculateTotalIncome, calculateTotalDeductions, calculateTaxPayable } from './ItrOneValidation.ts';

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
    const errors: any = {};
    let isValid = true;

    switch (stepNumber) {
      case 1: // General Information
        if (!formData.pan) {
          errors.pan = 'PAN is required';
          isValid = false;
        }
        if (!formData.firstName) {
          errors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName) {
          errors.lastName = 'Last name is required';
          isValid = false;
        }
        if (!formData.dateOfBirth) {
          errors.dateOfBirth = 'Date of birth is required';
          isValid = false;
        }
        if (!formData.gender) {
          errors.gender = 'Gender is required';
          isValid = false;
        }
        if (!formData.residentialStatus) {
          errors.residentialStatus = 'Residential status is required';
          isValid = false;
        }
        if (!formData.email) {
          errors.email = 'Email is required';
          isValid = false;
        }
        if (!formData.mobileNumber) {
          errors.mobileNumber = 'Mobile number is required';
          isValid = false;
        }
        if (!formData.address) {
          errors.address = 'Address is required';
          isValid = false;
        }
        if (!formData.city) {
          errors.city = 'City is required';
          isValid = false;
        }
        if (!formData.state) {
          errors.state = 'State is required';
          isValid = false;
        }
        if (!formData.pincode) {
          errors.pincode = 'Pincode is required';
          isValid = false;
        }
        break;
      
      case 8: // Bank Details & Verification
        if (!formData.verificationMethod) {
          errors.verificationMethod = 'Verification method is required';
          isValid = false;
        }
        if (!formData.placeOfFiling) {
          errors.placeOfFiling = 'Place of filing is required';
          isValid = false;
        }
        break;
      
      default:
        // For other steps, no validation required
        break;
    }

    setErrors(errors);
    return isValid;
  };

  // Navigate to next step
  const nextStep = () => {
    console.log('Next button clicked, current step:', step);
    const isValid = validateStep(step);
    console.log('Step validation result:', isValid);
    console.log('Current errors:', errors);
    
    if (isValid) {
      setStep(prev => Math.min(prev + 1, ITR_ONE_STEPS.length));
      console.log('Moving to next step');
    } else {
      console.log('Validation failed, staying on current step');
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

        {/* Retirement Benefit Accounts */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Retirement Benefit Accounts</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Income from retirement benefit account - Notified Country
          </label>
          <select
            value={formData.retirementBenefitNotifiedCountry}
            onChange={(e) => handleInputChange('retirementBenefitNotifiedCountry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            {ITR_ONE_OPTIONS.retirementBenefitCountries.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount - Notified Country
          </label>
          <input
            type="text"
            value={formData.retirementBenefitNotifiedAmount}
            onChange={(e) => handleInputChange('retirementBenefitNotifiedAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Income from retirement benefit account - Other Country
          </label>
          <input
            type="text"
            value={formData.retirementBenefitOtherCountry}
            onChange={(e) => handleInputChange('retirementBenefitOtherCountry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount - Other Country
          </label>
          <input
            type="text"
            value={formData.retirementBenefitOtherAmount}
            onChange={(e) => handleInputChange('retirementBenefitOtherAmount', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relief from taxation u/s 89A
          </label>
          <input
            type="text"
            value={formData.reliefFromTaxation89A}
            onChange={(e) => handleInputChange('reliefFromTaxation89A', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Net Salary (Calculated)
          </label>
          <input
            type="text"
            value={formData.netSalary}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Auto-calculated"
          />
        </div>

        {/* Exempt Allowances Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Allowances to the extent exempt u/s 10</h3>
          <div className="space-y-4">
            {formData.exemptAllowances.map((allowance, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sl. No.
                    </label>
                    <input
                      type="text"
                      value={allowance.slNo.toString()}
                      onChange={(e) => handleArrayFieldChange('exemptAllowances', index, 'slNo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Serial number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nature of Exempt Allowance
                    </label>
                    <select
                      value={allowance.natureOfExemptAllowance}
                      onChange={(e) => handleArrayFieldChange('exemptAllowances', index, 'natureOfExemptAllowance', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      {ITR_ONE_OPTIONS.exemptAllowanceTypes.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={allowance.description}
                      onChange={(e) => handleArrayFieldChange('exemptAllowances', index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="If 'Any Other' selected"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={allowance.amount}
                        onChange={(e) => handleArrayFieldChange('exemptAllowances', index, 'amount', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('exemptAllowances', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('exemptAllowances', { slNo: formData.exemptAllowances.length + 1, natureOfExemptAllowance: '', description: '', amount: '' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Exempt Allowance
            </button>
          </div>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Value (Calculated)
          </label>
          <input
            type="text"
            value={formData.annualValue}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Auto-calculated"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            30% of Annual Value (Calculated)
          </label>
          <input
            type="text"
            value={formData.standardDeduction}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Auto-calculated"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total House Property Income (Calculated)
          </label>
          <input
            type="text"
            value={formData.totalHousePropertyIncome}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Auto-calculated"
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

        {/* Other Sources Income Array */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Sources Income</h3>
          <div className="space-y-4">
            {formData.otherSourcesIncome.map((income, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sl. No.
                    </label>
                    <input
                      type="text"
                      value={income.slNo.toString()}
                      onChange={(e) => handleArrayFieldChange('otherSourcesIncome', index, 'slNo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Serial number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nature of Income
                    </label>
                    <select
                      value={income.natureOfIncome}
                      onChange={(e) => handleArrayFieldChange('otherSourcesIncome', index, 'natureOfIncome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      {ITR_ONE_OPTIONS.otherSourceIncomeTypes.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={income.description}
                      onChange={(e) => handleArrayFieldChange('otherSourcesIncome', index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="If 'Any Other' selected"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={income.amount}
                        onChange={(e) => handleArrayFieldChange('otherSourcesIncome', index, 'amount', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('otherSourcesIncome', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('otherSourcesIncome', { slNo: formData.otherSourcesIncome.length + 1, natureOfIncome: '', description: '', amount: '' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Other Source Income
            </button>
          </div>
        </div>

        {/* Retirement Benefit Details */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Retirement Benefit Details</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Income from retirement benefit account - Other Country u/s 89A
          </label>
          <input
            type="text"
            value={formData.retirementBenefitOtherCountry89A}
            onChange={(e) => handleInputChange('retirementBenefitOtherCountry89A', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relief from taxation u/s 89A - Other Sources
          </label>
          <input
            type="text"
            value={formData.reliefFromTaxation89AOtherSources}
            onChange={(e) => handleInputChange('reliefFromTaxation89AOtherSources', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deduction u/s 57(iia) - Family pension only
          </label>
          <input
            type="text"
            value={formData.familyPensionDeduction57}
            onChange={(e) => handleInputChange('familyPensionDeduction57', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Dividend Income Quarterly Breakup */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Dividend Income Quarterly Breakup</h3>
          <div className="space-y-4">
            {formData.dividendIncomeQuarterly.map((dividend, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Period
                    </label>
                    <input
                      type="text"
                      value={dividend.period}
                      onChange={(e) => handleArrayFieldChange('dividendIncomeQuarterly', index, 'period', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Upto 15-Jun-2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={dividend.amount}
                        onChange={(e) => handleArrayFieldChange('dividendIncomeQuarterly', index, 'amount', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('dividendIncomeQuarterly', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('dividendIncomeQuarterly', { period: '', amount: '' })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Dividend Period
            </button>
          </div>
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

        {/* Advanced Deductions */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Deductions</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCC - Payment in respect Pension Fund
          </label>
          <input
            type="text"
            value={formData.section80CCC}
            onChange={(e) => handleInputChange('section80CCC', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCD(1) - Contribution to pension scheme of Central Government
          </label>
          <input
            type="text"
            value={formData.section80CCD1}
            onChange={(e) => handleInputChange('section80CCD1', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCD(1B) - Additional contribution to pension scheme
          </label>
          <input
            type="text"
            value={formData.section80CCD1B}
            onChange={(e) => handleInputChange('section80CCD1B', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PRAN of the taxpayer
          </label>
          <input
            type="text"
            value={formData.pranTaxpayer}
            onChange={(e) => handleInputChange('pranTaxpayer', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PRAN number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCD(2) - Contribution by employer
          </label>
          <input
            type="text"
            value={formData.section80CCD2}
            onChange={(e) => handleInputChange('section80CCD2', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCG - Investment under equity savings scheme
          </label>
          <input
            type="text"
            value={formData.section80CCG}
            onChange={(e) => handleInputChange('section80CCG', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PRAN for 80CCG
          </label>
          <input
            type="text"
            value={formData.pranTaxpayer80CCG}
            onChange={(e) => handleInputChange('pranTaxpayer80CCG', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PRAN number"
          />
        </div>

        {/* Section 80D Sub-sections */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Section 80D - Health Insurance Details</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Health insurance premium
          </label>
          <input
            type="text"
            value={formData.section80DHealthInsurance}
            onChange={(e) => handleInputChange('section80DHealthInsurance', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical expenditure
          </label>
          <input
            type="text"
            value={formData.section80DMedicalExpenditure}
            onChange={(e) => handleInputChange('section80DMedicalExpenditure', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preventive health check-up
          </label>
          <input
            type="text"
            value={formData.section80DPreventiveCheckup}
            onChange={(e) => handleInputChange('section80DPreventiveCheckup', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80DD - Maintenance of dependent with disability
          </label>
          <input
            type="text"
            value={formData.section80DD}
            onChange={(e) => handleInputChange('section80DD', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80DDB - Medical treatment of specified disease
          </label>
          <input
            type="text"
            value={formData.section80DDB}
            onChange={(e) => handleInputChange('section80DDB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name of specified disease
          </label>
          <input
            type="text"
            value={formData.specifiedDiseaseName}
            onChange={(e) => handleInputChange('specifiedDiseaseName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter disease name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80EE - Interest on loan for residential house property
          </label>
          <input
            type="text"
            value={formData.section80EE}
            onChange={(e) => handleInputChange('section80EE', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80EEA - Interest on loan for certain house property
          </label>
          <input
            type="text"
            value={formData.section80EEA}
            onChange={(e) => handleInputChange('section80EEA', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80EEB - Purchase of electric vehicle
          </label>
          <input
            type="text"
            value={formData.section80EEB}
            onChange={(e) => handleInputChange('section80EEB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80GG - Rent paid
          </label>
          <input
            type="text"
            value={formData.section80GG}
            onChange={(e) => handleInputChange('section80GG', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Acknowledgement number of Form 10BA
          </label>
          <input
            type="text"
            value={formData.form10BAAckNumber}
            onChange={(e) => handleInputChange('form10BAAckNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter acknowledgement number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80GGA - Donations for scientific research
          </label>
          <input
            type="text"
            value={formData.section80GGA}
            onChange={(e) => handleInputChange('section80GGA', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80GGC - Contribution to Political party
          </label>
          <input
            type="text"
            value={formData.section80GGC}
            onChange={(e) => handleInputChange('section80GGC', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80QQB - Royalty income of authors
          </label>
          <input
            type="text"
            value={formData.section80QQB}
            onChange={(e) => handleInputChange('section80QQB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80RRB - Royalty on patents
          </label>
          <input
            type="text"
            value={formData.section80RRB}
            onChange={(e) => handleInputChange('section80RRB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80TTB - Interest on deposits (senior citizens)
          </label>
          <input
            type="text"
            value={formData.section80TTB}
            onChange={(e) => handleInputChange('section80TTB', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section 80CCH - Contribution to Agnipath Scheme
          </label>
          <input
            type="text"
            value={formData.section80CCH}
            onChange={(e) => handleInputChange('section80CCH', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any Other deductions
          </label>
          <input
            type="text"
            value={formData.anyOtherDeductions}
            onChange={(e) => handleInputChange('anyOtherDeductions', e.target.value)}
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
              Gross Total Income (1+2+3)
            </label>
            <input
              type="text"
              value={formData.grossTotalIncome}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gross Total Income (1+2+3+7a(iii))
            </label>
            <input
              type="text"
              value={formData.grossTotalIncomeWith112A}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Deductions
            </label>
            <input
              type="text"
              value={formData.totalDeductions}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Income (4 - 6)
            </label>
            <input
              type="text"
              value={formData.totalIncome}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      {/* Exempt Income Section */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Exempt Income</h3>
        <div className="space-y-4">
          {formData.exemptIncome.map((income, index) => (
            <div key={index} className="border border-blue-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sl. No.
                  </label>
                  <input
                    type="text"
                    value={income.slNo.toString()}
                    onChange={(e) => handleArrayFieldChange('exemptIncome', index, 'slNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Serial number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nature of Income
                  </label>
                  <select
                    value={income.natureOfIncome}
                    onChange={(e) => handleArrayFieldChange('exemptIncome', index, 'natureOfIncome', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    {ITR_ONE_OPTIONS.exemptIncomeTypes.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    value={income.description}
                    onChange={(e) => handleArrayFieldChange('exemptIncome', index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="If 'Any Other' selected"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={income.amount}
                      onChange={(e) => handleArrayFieldChange('exemptIncome', index, 'amount', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('exemptIncome', index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('exemptIncome', { slNo: formData.exemptIncome.length + 1, natureOfIncome: '', description: '', amount: '' })}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Exempt Income
          </button>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Exempt Income
          </label>
          <input
            type="text"
            value={formData.totalExemptIncome}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="Auto-calculated"
          />
        </div>
      </div>

      {/* Long Term Capital Gains u/s 112A */}
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Long Term Capital Gains u/s 112A</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total sale consideration
            </label>
            <input
              type="text"
              value={formData.ltcg112ATotalSaleConsideration}
              onChange={(e) => handleInputChange('ltcg112ATotalSaleConsideration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total cost of acquisition
            </label>
            <input
              type="text"
              value={formData.ltcg112ATotalCostOfAcquisition}
              onChange={(e) => handleInputChange('ltcg112ATotalCostOfAcquisition', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long term capital gains as per sec 112A
            </label>
            <input
              type="text"
              value={formData.ltcg112ALongTermCapitalGains}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      {/* Tax Calculation */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-4">Tax Calculation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Payable on Total Income
            </label>
            <input
              type="text"
              value={formData.taxPayableOnTotalIncome}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rebate u/s 87A
            </label>
            <input
              type="text"
              value={formData.rebate87A}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax payable after Rebate
            </label>
            <input
              type="text"
              value={formData.taxPayableAfterRebate}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Health and Education Cess @4%
            </label>
            <input
              type="text"
              value={formData.healthAndEducationCess}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax and Cess
            </label>
            <input
              type="text"
              value={formData.totalTaxAndCess}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relief u/s 89 (Form 10E required)
            </label>
            <input
              type="text"
              value={formData.relief89}
              onChange={(e) => handleInputChange('relief89', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relief u/s 89A
            </label>
            <input
              type="text"
              value={formData.relief89A}
              onChange={(e) => handleInputChange('relief89A', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balance Tax after Relief
            </label>
            <input
              type="text"
              value={formData.balanceTaxAfterRelief}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>
        </div>
      </div>

      {/* Interest and Fee Calculations */}
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-4">Interest and Fee Calculations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest u/s 234A
            </label>
            <input
              type="text"
              value={formData.interest234A}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest u/s 234B
            </label>
            <input
              type="text"
              value={formData.interest234B}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest u/s 234C
            </label>
            <input
              type="text"
              value={formData.interest234C}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fee u/s 234F
            </label>
            <input
              type="text"
              value={formData.fee234F}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Interest, Fee Payable
            </label>
            <input
              type="text"
              value={formData.totalInterestFeePayable}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Tax, Fee and Interest
            </label>
            <input
              type="text"
              value={formData.totalTaxFeeAndInterest}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Auto-calculated"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Date
          </label>
          <input
            type="text"
            value={formData.verificationDate}
            onChange={(e) => handleInputChange('verificationDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="DD"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Month
          </label>
          <input
            type="text"
            value={formData.verificationMonth}
            onChange={(e) => handleInputChange('verificationMonth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="MM"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Year
          </label>
          <input
            type="text"
            value={formData.verificationYear}
            onChange={(e) => handleInputChange('verificationYear', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="YYYY"
          />
        </div>

        {/* Multiple Bank Accounts */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Accounts</h3>
          <div className="space-y-4">
            {formData.bankAccounts.map((account, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      value={account.ifscCode}
                      onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'ifscCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter IFSC code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={account.bankName}
                      onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'bankName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={account.accountNumber}
                      onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'accountNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <select
                      value={account.accountType}
                      onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'accountType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      {ITR_ONE_OPTIONS.accountType.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select for Refund
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="checkbox"
                        checked={account.selectForRefund}
                        onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'selectForRefund', e.target.checked.toString())}
                        className="mt-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('bankAccounts', index)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('bankAccounts', { ifscCode: '', bankName: '', accountNumber: '', accountType: '', selectForRefund: false })}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Bank Account
            </button>
          </div>
        </div>

        {/* Filing Status Details */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filing Status Details</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filed u/s
          </label>
          <select
            value={formData.filedUnderSection}
            onChange={(e) => handleInputChange('filedUnderSection', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Section</option>
            {ITR_ONE_OPTIONS.filedUnderSection.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filed in response to notice u/s
          </label>
          <input
            type="text"
            value={formData.filedInResponseToNotice}
            onChange={(e) => handleInputChange('filedInResponseToNotice', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter section"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Receipt Number
          </label>
          <input
            type="text"
            value={formData.receiptNumber}
            onChange={(e) => handleInputChange('receiptNumber', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter receipt number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of filing of original return
          </label>
          <input
            type="text"
            value={formData.originalFilingDate}
            onChange={(e) => handleInputChange('originalFilingDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="DD/MM/YYYY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unique Number/DIN
          </label>
          <input
            type="text"
            value={formData.noticeDIN}
            onChange={(e) => handleInputChange('noticeDIN', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter DIN"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of such Notice or Order
          </label>
          <input
            type="text"
            value={formData.noticeDate}
            onChange={(e) => handleInputChange('noticeDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="DD/MM/YYYY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date of filing of ITR
          </label>
          <input
            type="text"
            value={formData.dueDateOfFiling}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            placeholder="31/07/2025"
          />
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
