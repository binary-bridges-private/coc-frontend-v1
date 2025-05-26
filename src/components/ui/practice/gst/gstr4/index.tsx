import React, { useState } from 'react';

const steps = [
  'Login & Select Year',
  'Enter Aggregate Turnover',
  'File Nil Return',
  'Enter Details',
  'Preview & Payment',
  'File Return'
];

const GSTR4Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    financialYear: '',
    aggregateTurnover: '',
    isNilReturn: false,
    inwardSupplies: {
      registeredSupplier: [],
      registeredSupplierReverseCharge: [],
      unregisteredSupplier: [],
      importOfService: []
    },
    taxRateWiseSupplies: {
      inward: [],
      outward: []
    },
    tdsTcsCredit: [],
    declaration: false,
    authorizedSignatory: ''
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Login and Select Financial Year</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Financial Year</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={formData.financialYear}
                onChange={(e) => handleInputChange('financialYear', e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
                <option value="2021-22">2021-22</option>
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Enter Aggregate Turnover</h2>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Aggregate Turnover of Previous Financial Year</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={formData.aggregateTurnover}
                onChange={(e) => handleInputChange('aggregateTurnover', e.target.value)}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">File Nil Return</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">File Nil GSTR4</span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={formData.isNilReturn}
                  onChange={(e) => handleInputChange('isNilReturn', e.target.checked)}
                />
              </label>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p className="font-semibold">Note: You can file Nil return if you have:</p>
              <ul className="list-disc list-inside mt-2">
                <li>NOT made any outward supply</li>
                <li>NOT received any goods/services</li>
                <li>Have NO other tax liability to report</li>
                <li>Have filed all Form CMP-08 as Nil</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Enter Details</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">4A. Inward supplies from registered supplier (other than reverse charge)</h3>
                {/* Add form fields for 4A */}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">4B. Inward supplies from registered supplier (reverse charge)</h3>
                {/* Add form fields for 4B */}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">4C. Inward supplies from unregistered supplier</h3>
                {/* Add form fields for 4C */}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">4D. Import of service</h3>
                {/* Add form fields for 4D */}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Preview & Payment</h2>
            <div className="space-x-4">
              <button className="btn btn-primary">
                Download GSTR-4 Summary (PDF)
              </button>
              <button className="btn btn-primary">
                Download GSTR-4 (Excel)
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">File Return</h2>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.
                </span>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => handleInputChange('declaration', e.target.checked)}
                />
              </label>
            </div>
            <div className="form-control w-full mt-4">
              <label className="label">
                <span className="label-text">Authorized Signatory</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={formData.authorizedSignatory}
                onChange={(e) => handleInputChange('authorizedSignatory', e.target.value)}
              >
                <option value="">Select Signatory</option>
                <option value="signatory1">Signatory 1</option>
                <option value="signatory2">Signatory 2</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          GSTR-4 Annual Return
        </h1>
        
        <div className="steps steps-horizontal w-full mb-8">
          {steps.map((label, index) => (
            <div key={label} className={`step ${index <= activeStep ? 'step-primary' : ''}`}>
              {label}
            </div>
          ))}
        </div>

        <div className="mt-8">
          {renderStepContent(activeStep)}
        </div>

        <div className="flex justify-between mt-8">
          <button
            className="btn"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            {activeStep === steps.length - 1 ? 'File Return' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GSTR4Form;