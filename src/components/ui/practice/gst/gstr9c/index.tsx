import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface GSTR9CFormData {
  // Part A - Reconciliation Statement
  financialYear: string;
  gstin: string;
  legalName: string;
  tradeName: string;
  
  // Reconciliation of turnover declared in audited annual financial statement
  turnoverReconciliation: {
    turnoverAsPerAuditedFinancialStatement: string;
    turnoverAsPerGSTR1: string;
    difference: string;
    reasonForDifference: string;
  };
  
  // Reconciliation of tax paid
  taxReconciliation: {
    taxAsPerAuditedFinancialStatement: string;
    taxAsPerGSTR3B: string;
    difference: string;
    reasonForDifference: string;
  };
  
  // Reconciliation of input tax credit
  itcReconciliation: {
    itcAsPerAuditedFinancialStatement: string;
    itcAsPerGSTR2A: string;
    itcAsPerGSTR3B: string;
    difference: string;
    reasonForDifference: string;
  };
  
  // Part B - Certification
  certification: {
    isAuditRequired: boolean;
    auditorName: string;
    auditorMembershipNumber: string;
    auditorFirmName: string;
    auditorFirmAddress: string;
    auditorReportDate: string;
    auditorSignature: string;
    auditorSeal: string;
  };
  
  // Additional Information
  additionalInformation: {
    isThereAnyDiscrepancy: boolean;
    discrepancyDetails: string;
    isThereAnyNonCompliance: boolean;
    nonComplianceDetails: string;
    recommendations: string;
  };
}

const GSTR9CForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<GSTR9CFormData>({
    financialYear: '',
    gstin: '',
    legalName: '',
    tradeName: '',
    turnoverReconciliation: {
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
    itcReconciliation: {
      itcAsPerAuditedFinancialStatement: '',
      itcAsPerGSTR2A: '',
      itcAsPerGSTR3B: '',
      difference: '',
      reasonForDifference: '',
    },
    certification: {
      isAuditRequired: false,
      auditorName: '',
      auditorMembershipNumber: '',
      auditorFirmName: '',
      auditorFirmAddress: '',
      auditorReportDate: '',
      auditorSignature: '',
      auditorSeal: '',
    },
    additionalInformation: {
      isThereAnyDiscrepancy: false,
      discrepancyDetails: '',
      isThereAnyNonCompliance: false,
      nonComplianceDetails: '',
      recommendations: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    'Basic Details',
    'Turnover Reconciliation',
    'Tax Reconciliation',
    'ITC Reconciliation',
    'Auditor Certification',
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
          ...(prev[section as keyof GSTR9CFormData] as any),
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
        if (!formData.turnoverReconciliation.turnoverAsPerAuditedFinancialStatement) 
          newErrors['turnoverReconciliation.turnoverAsPerAuditedFinancialStatement'] = 'This field is required';
        if (!formData.turnoverReconciliation.turnoverAsPerGSTR1) 
          newErrors['turnoverReconciliation.turnoverAsPerGSTR1'] = 'This field is required';
        break;
        
      case 3:
        if (!formData.taxReconciliation.taxAsPerAuditedFinancialStatement) 
          newErrors['taxReconciliation.taxAsPerAuditedFinancialStatement'] = 'This field is required';
        if (!formData.taxReconciliation.taxAsPerGSTR3B) 
          newErrors['taxReconciliation.taxAsPerGSTR3B'] = 'This field is required';
        break;
        
      case 4:
        if (!formData.itcReconciliation.itcAsPerAuditedFinancialStatement) 
          newErrors['itcReconciliation.itcAsPerAuditedFinancialStatement'] = 'This field is required';
        if (!formData.itcReconciliation.itcAsPerGSTR2A) 
          newErrors['itcReconciliation.itcAsPerGSTR2A'] = 'This field is required';
        break;
        
      case 5:
        if (!formData.certification.auditorName) 
          newErrors['certification.auditorName'] = 'Auditor Name is required';
        if (!formData.certification.auditorMembershipNumber) 
          newErrors['certification.auditorMembershipNumber'] = 'Membership Number is required';
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
      console.log('GSTR-9C Form Data:', formData);
      alert('GSTR-9C Reconciliation Statement submitted successfully!');
      navigate('/practice/gst');
    } catch (error) {
      console.error('Error submitting GSTR-9C:', error);
      alert('Error submitting GSTR-9C. Please try again.');
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Turnover Reconciliation</h3>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Reconciliation of turnover declared in audited annual financial statement</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turnover as per audited annual financial statement (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.turnoverReconciliation.turnoverAsPerAuditedFinancialStatement}
                  onChange={(e) => handleInputChange('turnoverAsPerAuditedFinancialStatement', e.target.value, 'turnoverReconciliation')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['turnoverReconciliation.turnoverAsPerAuditedFinancialStatement'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['turnoverReconciliation.turnoverAsPerAuditedFinancialStatement'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['turnoverReconciliation.turnoverAsPerAuditedFinancialStatement']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turnover as per GSTR-1 (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.turnoverReconciliation.turnoverAsPerGSTR1}
                  onChange={(e) => handleInputChange('turnoverAsPerGSTR1', e.target.value, 'turnoverReconciliation')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['turnoverReconciliation.turnoverAsPerGSTR1'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['turnoverReconciliation.turnoverAsPerGSTR1'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['turnoverReconciliation.turnoverAsPerGSTR1']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difference (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.turnoverReconciliation.difference}
                  onChange={(e) => handleInputChange('difference', e.target.value, 'turnoverReconciliation')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for difference
                </label>
                <textarea
                  value={formData.turnoverReconciliation.reasonForDifference}
                  onChange={(e) => handleInputChange('reasonForDifference', e.target.value, 'turnoverReconciliation')}
                  placeholder="Please provide reason for any difference..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Tax Reconciliation</h3>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Reconciliation of tax paid</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax as per audited annual financial statement (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxReconciliation.taxAsPerAuditedFinancialStatement}
                  onChange={(e) => handleInputChange('taxAsPerAuditedFinancialStatement', e.target.value, 'taxReconciliation')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['taxReconciliation.taxAsPerAuditedFinancialStatement'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['taxReconciliation.taxAsPerAuditedFinancialStatement'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['taxReconciliation.taxAsPerAuditedFinancialStatement']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax as per GSTR-3B (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxReconciliation.taxAsPerGSTR3B}
                  onChange={(e) => handleInputChange('taxAsPerGSTR3B', e.target.value, 'taxReconciliation')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['taxReconciliation.taxAsPerGSTR3B'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['taxReconciliation.taxAsPerGSTR3B'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['taxReconciliation.taxAsPerGSTR3B']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difference (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.taxReconciliation.difference}
                  onChange={(e) => handleInputChange('difference', e.target.value, 'taxReconciliation')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for difference
                </label>
                <textarea
                  value={formData.taxReconciliation.reasonForDifference}
                  onChange={(e) => handleInputChange('reasonForDifference', e.target.value, 'taxReconciliation')}
                  placeholder="Please provide reason for any difference..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">ITC Reconciliation</h3>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Reconciliation of input tax credit</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC as per audited annual financial statement (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReconciliation.itcAsPerAuditedFinancialStatement}
                  onChange={(e) => handleInputChange('itcAsPerAuditedFinancialStatement', e.target.value, 'itcReconciliation')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['itcReconciliation.itcAsPerAuditedFinancialStatement'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['itcReconciliation.itcAsPerAuditedFinancialStatement'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['itcReconciliation.itcAsPerAuditedFinancialStatement']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC as per GSTR-2A (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReconciliation.itcAsPerGSTR2A}
                  onChange={(e) => handleInputChange('itcAsPerGSTR2A', e.target.value, 'itcReconciliation')}
                  placeholder="0.00"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['itcReconciliation.itcAsPerGSTR2A'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['itcReconciliation.itcAsPerGSTR2A'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['itcReconciliation.itcAsPerGSTR2A']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ITC as per GSTR-3B (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReconciliation.itcAsPerGSTR3B}
                  onChange={(e) => handleInputChange('itcAsPerGSTR3B', e.target.value, 'itcReconciliation')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difference (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.itcReconciliation.difference}
                  onChange={(e) => handleInputChange('difference', e.target.value, 'itcReconciliation')}
                  placeholder="0.00"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for difference
                </label>
                <textarea
                  value={formData.itcReconciliation.reasonForDifference}
                  onChange={(e) => handleInputChange('reasonForDifference', e.target.value, 'itcReconciliation')}
                  placeholder="Please provide reason for any difference..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Auditor Certification</h3>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Certification by Chartered Accountant/Cost Accountant</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAuditRequired"
                  checked={formData.certification.isAuditRequired}
                  onChange={(e) => handleInputChange('isAuditRequired', e.target.checked, 'certification')}
                  className="mr-2"
                />
                <label htmlFor="isAuditRequired" className="text-sm font-medium text-gray-700">
                  Audit is required under section 35(5) of CGST Act, 2017
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name of the Auditor *
                </label>
                <input
                  type="text"
                  value={formData.certification.auditorName}
                  onChange={(e) => handleInputChange('auditorName', e.target.value, 'certification')}
                  placeholder="Enter auditor name"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['certification.auditorName'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['certification.auditorName'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['certification.auditorName']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Number *
                </label>
                <input
                  type="text"
                  value={formData.certification.auditorMembershipNumber}
                  onChange={(e) => handleInputChange('auditorMembershipNumber', e.target.value, 'certification')}
                  placeholder="Enter membership number"
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors['certification.auditorMembershipNumber'] ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors['certification.auditorMembershipNumber'] && (
                  <p className="mt-1 text-sm text-red-500">{errors['certification.auditorMembershipNumber']}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firm Name
                </label>
                <input
                  type="text"
                  value={formData.certification.auditorFirmName}
                  onChange={(e) => handleInputChange('auditorFirmName', e.target.value, 'certification')}
                  placeholder="Enter firm name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Firm Address
                </label>
                <textarea
                  value={formData.certification.auditorFirmAddress}
                  onChange={(e) => handleInputChange('auditorFirmAddress', e.target.value, 'certification')}
                  placeholder="Enter firm address"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Report
                </label>
                <input
                  type="date"
                  value={formData.certification.auditorReportDate}
                  onChange={(e) => handleInputChange('auditorReportDate', e.target.value, 'certification')}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
            <h1 className="text-3xl font-bold text-gray-800">GSTR-9C Reconciliation Statement</h1>
            <p className="text-gray-600 mt-2">
              Reconciliation statement and certification for the financial year {formData.financialYear || 'YYYY-YY'}
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
                {isSubmitting ? 'Submitting...' : 'Submit GSTR-9C'}
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

export default GSTR9CForm;
