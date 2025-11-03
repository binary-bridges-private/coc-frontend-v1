import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GSTR9FormData {
  // Part I - Basic Details
  financialYear: string;
  gstin: string;
  legalName: string;
  tradeName: string;
  arn: string;
  dateOfFiling: string;
  
  // Part II - Annual Return Details
  // 2. Details of advances, inward and outward supplies made during the financial year
  advancesReceived: {
    advancesReceivedInTaxPeriod: string;
    advancesReceivedInPreviousTaxPeriod: string;
    totalAdvancesReceived: string;
  };
  
  // 3. Details of outward supplies and inward supplies liable to reverse charge
  outwardSupplies: {
    interStateSupplies: string;
    intraStateSupplies: string;
    totalOutwardSupplies: string;
  };
  
  inwardSupplies: {
    interStateSupplies: string;
    intraStateSupplies: string;
    totalInwardSupplies: string;
  };
  
  // 4. Details of ITC
  itcDetails: {
    itcAvailable: string;
    itcUtilized: string;
    itcLapsed: string;
    itcReversed: string;
    netItcAvailable: string;
  };
  
  // 5. Details of tax paid
  taxPaidDetails: {
    taxPaidInCash: string;
    taxPaidThroughItc: string;
    totalTaxPaid: string;
  };
  
  // 6. Details of demands and refunds
  demandsAndRefunds: {
    demandsRaised: string;
    demandsPaid: string;
    refundsClaimed: string;
    refundsReceived: string;
  };
  
  // Part III - Reconciliation of turnover declared in audited annual financial statement
  reconciliationDetails: {
    turnoverAsPerAuditedFinancialStatement: string;
    turnoverAsPerGSTR1: string;
    difference: string;
    reasonForDifference: string;
  };
  
  // Part IV - Reconciliation of tax paid
  taxReconciliation: {
    taxAsPerAuditedFinancialStatement: string;
    taxAsPerGSTR3B: string;
    difference: string;
    reasonForDifference: string;
  };
  
  // Part V - Additional Information
  additionalInformation: {
    isAuditRequired: boolean;
    auditorName: string;
    auditorMembershipNumber: string;
    auditorFirmName: string;
    auditorReportDate: string;
  };
}

const GSTR9Form = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GSTR9FormData>({
    financialYear: '',
    gstin: '',
    legalName: '',
    tradeName: '',
    arn: '',
    dateOfFiling: '',
    advancesReceived: {
      advancesReceivedInTaxPeriod: '',
      advancesReceivedInPreviousTaxPeriod: '',
      totalAdvancesReceived: '',
    },
    outwardSupplies: {
      interStateSupplies: '',
      intraStateSupplies: '',
      totalOutwardSupplies: '',
    },
    inwardSupplies: {
      interStateSupplies: '',
      intraStateSupplies: '',
      totalInwardSupplies: '',
    },
    itcDetails: {
      itcAvailable: '',
      itcUtilized: '',
      itcLapsed: '',
      itcReversed: '',
      netItcAvailable: '',
    },
    taxPaidDetails: {
      taxPaidInCash: '',
      taxPaidThroughItc: '',
      totalTaxPaid: '',
    },
    demandsAndRefunds: {
      demandsRaised: '',
      demandsPaid: '',
      refundsClaimed: '',
      refundsReceived: '',
    },
    reconciliationDetails: {
      turnoverAsPerAuditedFinancialStatement: '',
      turnoverAsPerGSTR1: '',
      difference: '',
      reasonForDifference: '',
    },
    taxReconciliation: {
      taxAsPerAuditedFinancialStatement: '',
      taxAsPerGSTR3B: '',
      difference: '',
      reasonForDifference: '',
    },
    additionalInformation: {
      isAuditRequired: false,
      auditorName: '',
      auditorMembershipNumber: '',
      auditorFirmName: '',
      auditorReportDate: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    'Basic Details',
    'Advances Received',
    'Outward & Inward Supplies',
    'ITC Details',
    'Tax Paid Details',
    'Demands & Refunds',
    'Reconciliation - Turnover',
    'Reconciliation - Tax',
    'Additional Information',
    'Review & Submit'
  ];

  const validateGSTIN = (gstin: string): boolean => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstinRegex.test(gstin);
  };

  const validateField = (name: string, value: string | number): string => {
    if (!value || value === '') {
      return 'This field is required';
    }
    
    if (typeof value === 'string' && name === 'gstin' && !validateGSTIN(value)) {
      return 'Invalid GSTIN format';
    }
    
    if (typeof value === 'string' && name.includes('amount') && (isNaN(Number(value)) || Number(value) < 0)) {
      return 'Must be a valid positive number';
    }
    
    return '';
  };

  const handleInputChange = (field: string, value: string | number | boolean, section?: string) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof GSTR9FormData] as any),
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }

    // Clear error when user starts typing
    const errorKey = section ? `${section}.${field}` : field;
    if (errors[errorKey]) {
      setErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case 1:
        if (!formData.financialYear) newErrors.financialYear = 'Financial Year is required';
        if (!formData.gstin) newErrors.gstin = 'GSTIN is required';
        else if (!validateGSTIN(formData.gstin)) newErrors.gstin = 'Invalid GSTIN format';
        if (!formData.legalName) newErrors.legalName = 'Legal Name is required';
        break;
      
      case 2:
        if (!formData.advancesReceived.advancesReceivedInTaxPeriod) 
          newErrors['advancesReceived.advancesReceivedInTaxPeriod'] = 'This field is required';
        if (!formData.advancesReceived.advancesReceivedInPreviousTaxPeriod) 
          newErrors['advancesReceived.advancesReceivedInPreviousTaxPeriod'] = 'This field is required';
        break;
        
      case 3:
        if (!formData.outwardSupplies.interStateSupplies) 
          newErrors['outwardSupplies.interStateSupplies'] = 'This field is required';
        if (!formData.inwardSupplies.interStateSupplies) 
          newErrors['inwardSupplies.interStateSupplies'] = 'This field is required';
        break;
        
      case 4:
        if (!formData.itcDetails.itcAvailable) 
          newErrors['itcDetails.itcAvailable'] = 'This field is required';
        if (!formData.itcDetails.itcUtilized) 
          newErrors['itcDetails.itcUtilized'] = 'This field is required';
        break;
        
      case 5:
        if (!formData.taxPaidDetails.taxPaidInCash) 
          newErrors['taxPaidDetails.taxPaidInCash'] = 'This field is required';
        if (!formData.taxPaidDetails.taxPaidThroughItc) 
          newErrors['taxPaidDetails.taxPaidThroughItc'] = 'This field is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      console.log('GSTR-9 Form Data:', formData);
      alert('GSTR-9 Annual Return submitted successfully!');
      navigate('/practice/gst');
    } catch (error) {
      console.error('Error submitting GSTR-9:', error);
      alert('Error submitting GSTR-9. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8 overflow-x-auto">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center ${
              index !== steps.length - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                currentStep > index
                  ? 'bg-green-500 text-white'
                  : currentStep === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <span className={`ml-2 text-xs ${
              currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}>
              {step}
            </span>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Basic Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Year *
                </label>
                <select
                  value={formData.financialYear}
                  onChange={(e) => handleInputChange('financialYear', e.target.value)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.financialYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Financial Year</option>
                  <option value="2022-23">2022-23</option>
                  <option value="2023-24">2023-24</option>
                  <option value="2024-25">2024-25</option>
                </select>
                {errors.financialYear && (
                  <p className="mt-1 text-sm text-red-500">{errors.financialYear}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GSTIN *
                </label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => handleInputChange('gstin', e.target.value)}
                  placeholder="Enter 15-digit GSTIN"
                  maxLength={15}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.gstin ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.gstin && (
                  <p className="mt-1 text-sm text-red-500">{errors.gstin}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Name *
                </label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) => handleInputChange('legalName', e.target.value)}
                  placeholder="Legal Name as per GST Registration"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.legalName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.legalName && (
                  <p className="mt-1 text-sm text-red-500">{errors.legalName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trade Name
                </label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => handleInputChange('tradeName', e.target.value)}
                  placeholder="Trade Name (if different)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ARN (Application Reference Number)
                </label>
                <input
                  type="text"
                  value={formData.arn}
                  onChange={(e) => handleInputChange('arn', e.target.value)}
                  placeholder="ARN if applicable"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Filing
                </label>
                <input
                  type="date"
                  value={formData.dateOfFiling}
                  onChange={(e) => handleInputChange('dateOfFiling', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Part II - Details of Advances Received</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">2. Details of advances, inward and outward supplies made during the financial year</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advances received in the tax period (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.advancesReceived.advancesReceivedInTaxPeriod}
                  onChange={(e) => handleInputChange('advancesReceivedInTaxPeriod', e.target.value, 'advancesReceived')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['advancesReceived.advancesReceivedInTaxPeriod'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['advancesReceived.advancesReceivedInTaxPeriod'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['advancesReceived.advancesReceivedInTaxPeriod']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Advances received in the previous tax period (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.advancesReceived.advancesReceivedInPreviousTaxPeriod}
                  onChange={(e) => handleInputChange('advancesReceivedInPreviousTaxPeriod', e.target.value, 'advancesReceived')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['advancesReceived.advancesReceivedInPreviousTaxPeriod'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['advancesReceived.advancesReceivedInPreviousTaxPeriod'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['advancesReceived.advancesReceivedInPreviousTaxPeriod']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total advances received (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.advancesReceived.totalAdvancesReceived}
                  onChange={(e) => handleInputChange('totalAdvancesReceived', e.target.value, 'advancesReceived')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Outward & Inward Supplies Details</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-800">Outward Supplies</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inter-state supplies (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.outwardSupplies.interStateSupplies}
                    onChange={(e) => handleInputChange('interStateSupplies', e.target.value, 'outwardSupplies')}
                    placeholder="0.00"
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors['outwardSupplies.interStateSupplies'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors['outwardSupplies.interStateSupplies'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['outwardSupplies.interStateSupplies']}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intra-state supplies (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.outwardSupplies.intraStateSupplies}
                    onChange={(e) => handleInputChange('intraStateSupplies', e.target.value, 'outwardSupplies')}
                    placeholder="0.00"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total outward supplies (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.outwardSupplies.totalOutwardSupplies}
                    onChange={(e) => handleInputChange('totalOutwardSupplies', e.target.value, 'outwardSupplies')}
                    placeholder="0.00"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800">Inward Supplies</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inter-state supplies (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.inwardSupplies.interStateSupplies}
                    onChange={(e) => handleInputChange('interStateSupplies', e.target.value, 'inwardSupplies')}
                    placeholder="0.00"
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors['inwardSupplies.interStateSupplies'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors['inwardSupplies.interStateSupplies'] && (
                    <p className="mt-1 text-sm text-red-500">{errors['inwardSupplies.interStateSupplies']}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intra-state supplies (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.inwardSupplies.intraStateSupplies}
                    onChange={(e) => handleInputChange('intraStateSupplies', e.target.value, 'inwardSupplies')}
                    placeholder="0.00"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total inward supplies (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.inwardSupplies.totalInwardSupplies}
                    onChange={(e) => handleInputChange('totalInwardSupplies', e.target.value, 'inwardSupplies')}
                    placeholder="0.00"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        );

      // Add more cases for remaining steps...
      default:
        return (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">Step {currentStep}</h3>
            <p className="text-gray-600">This step is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">GSTR-9 Annual Return</h1>
            <p className="text-gray-600 mt-2">
              Annual return for the financial year {formData.financialYear || 'YYYY-YY'}
            </p>
          </div>

          {renderStepIndicator()}

          <div className="mb-8">
            {renderStepContent()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-500 text-white hover:bg-gray-600'
              }`}
            >
              Previous
            </button>

            {currentStep === steps.length ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit GSTR-9'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GSTR9Form;
