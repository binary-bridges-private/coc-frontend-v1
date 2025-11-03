import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItrTwoFormData, ItrTwoFormErrors } from './types/ItrTwoTypes';
import { initialItrTwoFormData, initialItrTwoFormErrors, ITR_TWO_STEPS } from './constants/ItrTwoConstants';
import { validateItrTwoStep, calculateTotalIncome, calculateTotalDeductions, calculateTaxPayable } from './ItrTwoValidation';
import ItrTwoPersonalInfo from './components/ItrTwoPersonalInfo';
import ItrTwoSalary from './components/ItrTwoSalary';
import ItrTwoHouseProperty from './components/ItrTwoHouseProperty';
import ItrTwoCapitalGains from './components/ItrTwoCapitalGains';
import ItrTwoDeductions from './components/ItrTwoDeductions';
import ItrTwoForeignAssets from './components/ItrTwoForeignAssets';
import ItrTwoAssetsLiabilities from './components/ItrTwoAssetsLiabilities';

const ItrTwo: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr2-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ItrTwoFormData>(() => {
    const savedFormData = localStorage.getItem('itr2-form-data');
    return savedFormData ? JSON.parse(savedFormData) : initialItrTwoFormData;
  });

  const [errors, setErrors] = useState<ItrTwoFormErrors>(initialItrTwoFormErrors);

  // Handler functions
  const handleInputChange = (field: keyof ItrTwoFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      localStorage.setItem('itr2-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const handleArrayFieldChange = (field: keyof ItrTwoFormData, index: number, subField: string, value: string | number | boolean) => {
    setFormData(prev => {
      const arrayField = prev[field] as any[];
      const updatedArray = [...arrayField];
      updatedArray[index] = {
        ...updatedArray[index],
        [subField]: value
      };
      const newData = {
        ...prev,
        [field]: updatedArray
      };
      localStorage.setItem('itr2-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const addArrayItem = (field: keyof ItrTwoFormData, newItem: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: [...(prev[field] as any[]), newItem]
      };
      localStorage.setItem('itr2-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const removeArrayItem = (field: keyof ItrTwoFormData, index: number) => {
    setFormData(prev => {
      const arrayField = prev[field] as any[];
      const updatedArray = arrayField.filter((_, i) => i !== index);
      const newData = {
        ...prev,
        [field]: updatedArray
      };
      localStorage.setItem('itr2-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    const validation = validateItrTwoStep(stepNumber, formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === ITR_TWO_STEPS.length) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr2-current-step');
          localStorage.removeItem('itr2-form-data');
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

  const handlePrevStep = () => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      localStorage.setItem('itr2-current-step', prevStep.toString());
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ItrTwoPersonalInfo
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Filing Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filing Section *
                </label>
                <select
                  value={formData.filingSection}
                  onChange={(e) => handleInputChange('filingSection', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.filingSection ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Filing Section</option>
                  <option value="139(1)">139(1) - On or before due date</option>
                  <option value="139(4)">139(4) - After due date</option>
                  <option value="139(5)">139(5) - Revised return</option>
                  <option value="139(8A)">139(8A) - Updated return</option>
                </select>
                {errors.filingSection && <p className="mt-1 text-sm text-red-600">{errors.filingSection}</p>}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Revised/Defective Return</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is this a Revised Return?
                </label>
                <select
                  value={formData.isRevisedReturn.toString()}
                  onChange={(e) => handleInputChange('isRevisedReturn', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              {formData.isRevisedReturn && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Acknowledgment Number
                    </label>
                    <input
                      type="text"
                      value={formData.originalAckNumber}
                      onChange={(e) => handleInputChange('originalAckNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter acknowledgment number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Filing Date
                    </label>
                    <input
                      type="text"
                      value={formData.originalFilingDate}
                      onChange={(e) => handleInputChange('originalFilingDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Residential Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residential Status *
                </label>
                <select
                  value={formData.residentialStatus[0] || ''}
                  onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.residentialStatus ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Residential Status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                  <option value="Resident but Not Ordinarily Resident">Resident but Not Ordinarily Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-600">{errors.residentialStatus}</p>}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Additional Declarations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim Benefit u/s 115H
                </label>
                <select
                  value={formData.claimBenefit115H}
                  onChange={(e) => handleInputChange('claimBenefit115H', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Company Involvement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you a Director in any Company?
                </label>
                <select
                  value={formData.isDirector}
                  onChange={(e) => handleInputChange('isDirector', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Bank Details</h2>
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
            </div>
          </div>
        );
      case 8:
        return (
          <ItrTwoSalary
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 9:
        return (
          <ItrTwoHouseProperty
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleArrayFieldChange={handleArrayFieldChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case 10:
        return (
          <ItrTwoCapitalGains
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleArrayFieldChange={handleArrayFieldChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case 11:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule OS - Income from Other Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Income
                </label>
                <input
                  type="text"
                  value={formData.interestIncome}
                  onChange={(e) => handleInputChange('interestIncome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dividend Income
                </label>
                <input
                  type="text"
                  value={formData.dividendIncome}
                  onChange={(e) => handleInputChange('dividendIncome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Family Pension
                </label>
                <input
                  type="text"
                  value={formData.familyPension}
                  onChange={(e) => handleInputChange('familyPension', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        );
      case 12:
        return (
          <ItrTwoDeductions
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 13:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Taxes Paid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TDS on Salary
                </label>
                <input
                  type="text"
                  value={formData.tdsSalary}
                  onChange={(e) => handleInputChange('tdsSalary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TDS on Others
                </label>
                <input
                  type="text"
                  value={formData.tdsOthers}
                  onChange={(e) => handleInputChange('tdsOthers', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advance Tax
                </label>
                <input
                  type="text"
                  value={formData.advanceTax}
                  onChange={(e) => handleInputChange('advanceTax', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>
        );
      case 14:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Bank Accounts</h2>
            <div className="space-y-4">
              {formData.bankAccounts.map((account, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={account.selectForRefund}
                        onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'selectForRefund', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Select for Refund
                      </label>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('bankAccounts', index)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('bankAccounts', {
                  bankName: '',
                  accountNumber: '',
                  ifscCode: '',
                  accountType: '',
                  selectForRefund: false
                })}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Bank Account
              </button>
            </div>
          </div>
        );
      case 15:
        return (
          <ItrTwoAssetsLiabilities
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
          />
        );
      case 16:
        return (
          <ItrTwoForeignAssets
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleArrayFieldChange={handleArrayFieldChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case 17:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Verification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Name *
                </label>
                <input
                  type="text"
                  value={formData.verificationName}
                  onChange={(e) => handleInputChange('verificationName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.verificationName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter verification name"
                />
                {errors.verificationName && <p className="mt-1 text-sm text-red-600">{errors.verificationName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Father's Name
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter father's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity *
                </label>
                <select
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.capacity ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Capacity</option>
                  <option value="Self">Self</option>
                  <option value="Authorized Representative">Authorized Representative</option>
                  <option value="Guardian">Guardian</option>
                </select>
                {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Declaration Place *
                </label>
                <input
                  type="text"
                  value={formData.declarationPlace}
                  onChange={(e) => handleInputChange('declarationPlace', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.declarationPlace ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter declaration place"
                />
                {errors.declarationPlace && <p className="mt-1 text-sm text-red-600">{errors.declarationPlace}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Declaration Date *
                </label>
                <input
                  type="text"
                  value={formData.declarationDate}
                  onChange={(e) => handleInputChange('declarationDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.declarationDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="DD/MM/YYYY"
                />
                {errors.declarationDate && <p className="mt-1 text-sm text-red-600">{errors.declarationDate}</p>}
              </div>
            </div>
          </div>
        );
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ITR-2 Form</h1>
            <p className="text-gray-600">Income Tax Return for Individuals and HUFs not having income from business or profession</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {step} of {ITR_TWO_STEPS.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((step / ITR_TWO_STEPS.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / ITR_TWO_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Title */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {ITR_TWO_STEPS[step - 1]?.title}
            </h2>
            <p className="text-gray-600">
              {ITR_TWO_STEPS[step - 1]?.description}
            </p>
          </div>

          {/* Error Message */}
          {saveError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {saveError}
            </div>
          )}

          {/* Form Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={step === 1}
              className={`px-6 py-2 rounded-md font-medium ${
                step === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              disabled={isLoading}
              className={`px-6 py-2 rounded-md font-medium ${
                isLoading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Saving...' : step === ITR_TWO_STEPS.length ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrTwo;
