import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GSTR10FormData {
  // Part A - Basic Details
  financialYear: string;
  gstin: string;
  legalName: string;
  tradeName: string;
  cancellationDate: string;
  cancellationReason: string;
  
  // Part B - Details of outward supplies made during the period from the effective date of cancellation
  outwardSupplies: {
    interStateSupplies: string;
    intraStateSupplies: string;
    totalOutwardSupplies: string;
    taxOnOutwardSupplies: string;
  };
  
  // Part C - Details of inward supplies received during the period from the effective date of cancellation
  inwardSupplies: {
    interStateSupplies: string;
    intraStateSupplies: string;
    totalInwardSupplies: string;
    itcOnInwardSupplies: string;
  };
  
  // Part D - Details of ITC reversed
  itcReversed: {
    itcOnInputs: string;
    itcOnCapitalGoods: string;
    itcOnInputServices: string;
    totalItcReversed: string;
  };
  
  // Part E - Details of tax payable
  taxPayable: {
    taxOnOutwardSupplies: string;
    taxOnReverseCharge: string;
    interestOnTax: string;
    lateFee: string;
    penalty: string;
    totalTaxPayable: string;
  };
  
  // Part F - Details of ITC claimed
  itcClaimed: {
    itcOnInputs: string;
    itcOnCapitalGoods: string;
    itcOnInputServices: string;
    totalItcClaimed: string;
  };
  
  // Part G - Details of tax paid
  taxPaid: {
    taxPaidInCash: string;
    taxPaidThroughItc: string;
    totalTaxPaid: string;
  };
  
  // Part H - Details of refund claimed
  refundClaimed: {
    refundAmount: string;
    refundReason: string;
    refundMethod: string;
  };
  
  // Part I - Additional Information
  additionalInformation: {
    isThereAnyPendingDemand: boolean;
    pendingDemandDetails: string;
    isThereAnyPendingRefund: boolean;
    pendingRefundDetails: string;
    remarks: string;
  };
}

const GSTR10Form = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GSTR10FormData>({
    financialYear: '',
    gstin: '',
    legalName: '',
    tradeName: '',
    cancellationDate: '',
    cancellationReason: '',
    outwardSupplies: {
      interStateSupplies: '',
      intraStateSupplies: '',
      totalOutwardSupplies: '',
      taxOnOutwardSupplies: '',
    },
    inwardSupplies: {
      interStateSupplies: '',
      intraStateSupplies: '',
      totalInwardSupplies: '',
      itcOnInwardSupplies: '',
    },
    itcReversed: {
      itcOnInputs: '',
      itcOnCapitalGoods: '',
      itcOnInputServices: '',
      totalItcReversed: '',
    },
    taxPayable: {
      taxOnOutwardSupplies: '',
      taxOnReverseCharge: '',
      interestOnTax: '',
      lateFee: '',
      penalty: '',
      totalTaxPayable: '',
    },
    itcClaimed: {
      itcOnInputs: '',
      itcOnCapitalGoods: '',
      itcOnInputServices: '',
      totalItcClaimed: '',
    },
    taxPaid: {
      taxPaidInCash: '',
      taxPaidThroughItc: '',
      totalTaxPaid: '',
    },
    refundClaimed: {
      refundAmount: '',
      refundReason: '',
      refundMethod: '',
    },
    additionalInformation: {
      isThereAnyPendingDemand: false,
      pendingDemandDetails: '',
      isThereAnyPendingRefund: false,
      pendingRefundDetails: '',
      remarks: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    'Basic Details',
    'Outward Supplies',
    'Inward Supplies',
    'ITC Reversed',
    'Tax Payable',
    'ITC Claimed',
    'Tax Paid',
    'Refund Claimed',
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
          ...(prev[section as keyof GSTR10FormData] as any),
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
        if (!formData.cancellationDate) newErrors.cancellationDate = 'Cancellation Date is required';
        if (!formData.cancellationReason) newErrors.cancellationReason = 'Cancellation Reason is required';
        break;
      
      case 2:
        if (!formData.outwardSupplies.interStateSupplies) 
          newErrors['outwardSupplies.interStateSupplies'] = 'This field is required';
        if (!formData.outwardSupplies.intraStateSupplies) 
          newErrors['outwardSupplies.intraStateSupplies'] = 'This field is required';
        break;
        
      case 3:
        if (!formData.inwardSupplies.interStateSupplies) 
          newErrors['inwardSupplies.interStateSupplies'] = 'This field is required';
        if (!formData.inwardSupplies.intraStateSupplies) 
          newErrors['inwardSupplies.intraStateSupplies'] = 'This field is required';
        break;
        
      case 4:
        if (!formData.itcReversed.itcOnInputs) 
          newErrors['itcReversed.itcOnInputs'] = 'This field is required';
        if (!formData.itcReversed.itcOnCapitalGoods) 
          newErrors['itcReversed.itcOnCapitalGoods'] = 'This field is required';
        break;
        
      case 5:
        if (!formData.taxPayable.taxOnOutwardSupplies) 
          newErrors['taxPayable.taxOnOutwardSupplies'] = 'This field is required';
        if (!formData.taxPayable.taxOnReverseCharge) 
          newErrors['taxPayable.taxOnReverseCharge'] = 'This field is required';
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
      console.log('GSTR-10 Form Data:', formData);
      alert('GSTR-10 Final Return submitted successfully!');
      navigate('/practice/gst');
    } catch (error) {
      console.error('Error submitting GSTR-10:', error);
      alert('Error submitting GSTR-10. Please try again.');
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
            
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">GSTR-10 Final Return</h4>
              <p className="text-sm text-red-700">
                This return is to be filed by a taxable person whose registration has been cancelled.
              </p>
            </div>
            
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
                  Date of Cancellation *
                </label>
                <input
                  type="date"
                  value={formData.cancellationDate}
                  onChange={(e) => handleInputChange('cancellationDate', e.target.value)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.cancellationDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cancellationDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.cancellationDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Cancellation *
                </label>
                <select
                  value={formData.cancellationReason}
                  onChange={(e) => handleInputChange('cancellationReason', e.target.value)}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.cancellationReason ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Reason</option>
                  <option value="voluntary">Voluntary Cancellation</option>
                  <option value="non-compliance">Non-compliance</option>
                  <option value="business-closure">Business Closure</option>
                  <option value="other">Other</option>
                </select>
                {errors.cancellationReason && (
                  <p className="mt-1 text-sm text-red-500">{errors.cancellationReason}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Outward Supplies Details</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Part B - Details of outward supplies made during the period from the effective date of cancellation
              </h4>
            </div>
            
            <div className="space-y-4">
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
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['outwardSupplies.intraStateSupplies'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['outwardSupplies.intraStateSupplies'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['outwardSupplies.intraStateSupplies']}</p>
                )}
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax on outward supplies (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.outwardSupplies.taxOnOutwardSupplies}
                  onChange={(e) => handleInputChange('taxOnOutwardSupplies', e.target.value, 'outwardSupplies')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Inward Supplies Details</h3>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">
                Part C - Details of inward supplies received during the period from the effective date of cancellation
              </h4>
            </div>
            
            <div className="space-y-4">
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
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['inwardSupplies.intraStateSupplies'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['inwardSupplies.intraStateSupplies'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['inwardSupplies.intraStateSupplies']}</p>
                )}
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC on inward supplies (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.inwardSupplies.itcOnInwardSupplies}
                  onChange={(e) => handleInputChange('itcOnInwardSupplies', e.target.value, 'inwardSupplies')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">ITC Reversed Details</h3>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">
                Part D - Details of ITC reversed
              </h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC on inputs (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReversed.itcOnInputs}
                  onChange={(e) => handleInputChange('itcOnInputs', e.target.value, 'itcReversed')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['itcReversed.itcOnInputs'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['itcReversed.itcOnInputs'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['itcReversed.itcOnInputs']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC on capital goods (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReversed.itcOnCapitalGoods}
                  onChange={(e) => handleInputChange('itcOnCapitalGoods', e.target.value, 'itcReversed')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['itcReversed.itcOnCapitalGoods'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['itcReversed.itcOnCapitalGoods'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['itcReversed.itcOnCapitalGoods']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC on input services (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReversed.itcOnInputServices}
                  onChange={(e) => handleInputChange('itcOnInputServices', e.target.value, 'itcReversed')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total ITC reversed (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReversed.totalItcReversed}
                  onChange={(e) => handleInputChange('totalItcReversed', e.target.value, 'itcReversed')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Tax Payable Details</h3>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">
                Part E - Details of tax payable
              </h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax on outward supplies (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxPayable.taxOnOutwardSupplies}
                  onChange={(e) => handleInputChange('taxOnOutwardSupplies', e.target.value, 'taxPayable')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['taxPayable.taxOnOutwardSupplies'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['taxPayable.taxOnOutwardSupplies'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['taxPayable.taxOnOutwardSupplies']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax on reverse charge (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxPayable.taxOnReverseCharge}
                  onChange={(e) => handleInputChange('taxOnReverseCharge', e.target.value, 'taxPayable')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['taxPayable.taxOnReverseCharge'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['taxPayable.taxOnReverseCharge'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['taxPayable.taxOnReverseCharge']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest on tax (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxPayable.interestOnTax}
                  onChange={(e) => handleInputChange('interestOnTax', e.target.value, 'taxPayable')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Late fee (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxPayable.lateFee}
                  onChange={(e) => handleInputChange('lateFee', e.target.value, 'taxPayable')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penalty (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxPayable.penalty}
                  onChange={(e) => handleInputChange('penalty', e.target.value, 'taxPayable')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total tax payable (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxPayable.totalTaxPayable}
                  onChange={(e) => handleInputChange('totalTaxPayable', e.target.value, 'taxPayable')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
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
            <h1 className="text-3xl font-bold text-gray-800">GSTR-10 Final Return</h1>
            <p className="text-gray-600 mt-2">
              Final return for cancelled registration for the financial year {formData.financialYear || 'YYYY-YY'}
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
                {isSubmitting ? 'Submitting...' : 'Submit GSTR-10'}
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

export default GSTR10Form;
