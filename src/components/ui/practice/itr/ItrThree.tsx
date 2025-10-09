import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItrThreeFormData, ItrThreeFormErrors } from './types/ItrThreeTypes';
import { initialItrThreeFormData, initialItrThreeFormErrors, ITR_THREE_STEPS } from './constants/ItrThreeConstants';
import { validateItrThreeStep, calculateTotalIncome, calculateTotalDeductions, calculateTaxPayable } from './ItrThreeValidation';
import ItrThreeGeneralInfo from './components/ItrThreeGeneralInfo';
import ItrThreeBusinessDetails from './components/ItrThreeBusinessDetails';
import ItrThreeTradingAccount from './components/ItrThreeTradingAccount';

const ItrThree: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr3-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ItrThreeFormData>(() => {
    const savedFormData = localStorage.getItem('itr3-form-data');
    return savedFormData ? JSON.parse(savedFormData) : initialItrThreeFormData;
  });

  const [errors, setErrors] = useState<ItrThreeFormErrors>(initialItrThreeFormErrors);

  // Handler functions
  const handleInputChange = (field: keyof ItrThreeFormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      localStorage.setItem('itr3-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const handleArrayFieldChange = (field: keyof ItrThreeFormData, index: number, subField: string, value: string | number | boolean) => {
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
      localStorage.setItem('itr3-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const addArrayItem = (field: keyof ItrThreeFormData, newItem: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: [...(prev[field] as any[]), newItem]
      };
      localStorage.setItem('itr3-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const removeArrayItem = (field: keyof ItrThreeFormData, index: number) => {
    setFormData(prev => {
      const arrayField = prev[field] as any[];
      const updatedArray = arrayField.filter((_, i) => i !== index);
      const newData = {
        ...prev,
        [field]: updatedArray
      };
      localStorage.setItem('itr3-form-data', JSON.stringify(newData));
      return newData;
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    const validation = validateItrThreeStep(stepNumber, formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === ITR_THREE_STEPS.length) {
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

  const handlePrevStep = () => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      localStorage.setItem('itr3-current-step', prevStep.toString());
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ItrThreeGeneralInfo
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Revised Return?
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
      case 3:
        return (
          <ItrThreeBusinessDetails
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleArrayFieldChange={handleArrayFieldChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case 4:
        return (
          <ItrThreeTradingAccount
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleArrayFieldChange={handleArrayFieldChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Profit & Loss Account</h2>
            <p className="text-sm text-gray-600">Profit and loss account details</p>
            {/* Add Profit & Loss implementation here */}
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Balance Sheet</h2>
            <p className="text-sm text-gray-600">Balance sheet details</p>
            {/* Add Balance Sheet implementation here */}
          </div>
        );
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Quantitative Details</h2>
            <p className="text-sm text-gray-600">Quantitative details of stock</p>
            {/* Add Quantitative Details implementation here */}
          </div>
        );
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule HP - House Property</h2>
            <p className="text-sm text-gray-600">Income from house property</p>
            {/* Add House Property implementation here */}
          </div>
        );
      case 9:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule CG - Capital Gains</h2>
            <p className="text-sm text-gray-600">Capital gains and losses</p>
            {/* Add Capital Gains implementation here */}
          </div>
        );
      case 10:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule OS - Other Sources</h2>
            <p className="text-sm text-gray-600">Income from other sources</p>
            {/* Add Other Sources implementation here */}
          </div>
        );
      case 11:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Schedule VI-A - Deductions</h2>
            <p className="text-sm text-gray-600">Deductions under Chapter VI-A</p>
            {/* Add Deductions implementation here */}
          </div>
        );
      case 12:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Depreciation Schedule</h2>
            <p className="text-sm text-gray-600">Depreciation details</p>
            {/* Add Depreciation implementation here */}
          </div>
        );
      case 13:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">TDS Details</h2>
            <p className="text-sm text-gray-600">Tax deducted at source details</p>
            {/* Add TDS implementation here */}
          </div>
        );
      case 14:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Advance Tax Details</h2>
            <p className="text-sm text-gray-600">Advance tax payment details</p>
            {/* Add Advance Tax implementation here */}
          </div>
        );
      case 15:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Self Assessment Tax</h2>
            <p className="text-sm text-gray-600">Self assessment tax details</p>
            {/* Add Self Assessment Tax implementation here */}
          </div>
        );
      case 16:
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Type
                      </label>
                      <select
                        value={account.accountType}
                        onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'accountType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Account Type</option>
                        <option value="Savings">Savings</option>
                        <option value="Current">Current</option>
                        <option value="Fixed Deposit">Fixed Deposit</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={account.isPrimary}
                        onChange={(e) => handleArrayFieldChange('bankAccounts', index, 'isPrimary', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Primary Account
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
                  isPrimary: false
                })}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Bank Account
              </button>
            </div>
          </div>
        );
      case 17:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Audit Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Is Audit Required?
                </label>
                <select
                  value={formData.auditDetails.isAuditRequired.toString()}
                  onChange={(e) => handleInputChange('auditDetails', JSON.stringify({
                    ...formData.auditDetails,
                    isAuditRequired: e.target.value === 'true'
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              {formData.auditDetails.isAuditRequired && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auditor Name
                    </label>
                    <input
                      type="text"
                      value={formData.auditDetails.auditorName}
                      onChange={(e) => handleInputChange('auditDetails', JSON.stringify({
                        ...formData.auditDetails,
                        auditorName: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter auditor name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Auditor PAN
                    </label>
                    <input
                      type="text"
                      value={formData.auditDetails.auditorPAN}
                      onChange={(e) => handleInputChange('auditDetails', JSON.stringify({
                        ...formData.auditDetails,
                        auditorPAN: e.target.value
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter auditor PAN"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 18:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Computation of Total Income</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Total Income
                </label>
                <input
                  type="number"
                  value={formData.grossTotalIncome}
                  onChange={(e) => handleInputChange('grossTotalIncome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Deductions
                </label>
                <input
                  type="number"
                  value={formData.totalDeductions}
                  onChange={(e) => handleInputChange('totalDeductions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Income
                </label>
                <input
                  type="number"
                  value={formData.totalIncome}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        );
      case 19:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tax Computation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax on Total Income
                </label>
                <input
                  type="number"
                  value={formData.taxOnTotalIncome}
                  onChange={(e) => handleInputChange('taxOnTotalIncome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Tax Paid
                </label>
                <input
                  type="number"
                  value={formData.totalTaxPaid}
                  onChange={(e) => handleInputChange('totalTaxPaid', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refund Due
                </label>
                <input
                  type="number"
                  value={formData.refundDue}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Payable
                </label>
                <input
                  type="number"
                  value={formData.balancePayable}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                  placeholder="Auto-calculated"
                />
              </div>
            </div>
          </div>
        );
      case 20:
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ITR-3 Form</h1>
            <p className="text-gray-600">Income Tax Return for individuals and HUFs having income from business or profession</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {step} of {ITR_THREE_STEPS.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((step / ITR_THREE_STEPS.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / ITR_THREE_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Title */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {ITR_THREE_STEPS[step - 1]?.title}
            </h2>
            <p className="text-gray-600">
              {ITR_THREE_STEPS[step - 1]?.description}
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
              {isLoading ? 'Saving...' : step === ITR_THREE_STEPS.length ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrThree;
