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

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center ${
              index !== steps.length - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeStep >= index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  activeStep > index ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Login and Select Financial Year</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-3 font-medium">Financial Year</label>
                <select 
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Enter Aggregate Turnover</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-3 font-medium">Aggregate Turnover of Previous Financial Year</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formData.aggregateTurnover}
                  onChange={(e) => handleInputChange('aggregateTurnover', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">File Nil Return</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={formData.isNilReturn}
                  onChange={(e) => handleInputChange('isNilReturn', e.target.checked)}
                />
                <span className="ml-3">File Nil GSTR4</span>
              </div>
              <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold">Note: You can file Nil return if you have:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>NOT made any outward supply</li>
                  <li>NOT received any goods/services</li>
                  <li>Have NO other tax liability to report</li>
                  <li>Have filed all Form CMP-08 as Nil</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Enter Details</h3>
            <div className="space-y-6">
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">4A. Inward supplies from registered supplier (other than reverse charge)</h3>
                <div className="space-y-4">
                  {/* Add form fields for 4A */}
                </div>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">4B. Inward supplies from registered supplier (reverse charge)</h3>
                <div className="space-y-4">
                  {/* Add form fields for 4B */}
                </div>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">4C. Inward supplies from unregistered supplier</h3>
                <div className="space-y-4">
                  {/* Add form fields for 4C */}
                </div>
              </div>
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">4D. Import of service</h3>
                <div className="space-y-4">
                  {/* Add form fields for 4D */}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Preview & Payment</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Download GSTR-4 Summary (PDF)
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Download GSTR-4 (Excel)
                </button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">File Return</h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 border rounded-lg">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-1 text-blue-600 border-gray-300 focus:ring-blue-500"
                  checked={formData.declaration}
                  onChange={(e) => handleInputChange('declaration', e.target.checked)}
                />
                <span className="ml-3 text-sm">
                  I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.
                </span>
              </div>
              <div>
                <label className="block mb-3 font-medium">Authorized Signatory</label>
                <select
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={formData.authorizedSignatory}
                  onChange={(e) => handleInputChange('authorizedSignatory', e.target.value)}
                >
                  <option value="">Select Signatory</option>
                  <option value="signatory1">Signatory 1</option>
                  <option value="signatory2">Signatory 2</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">GSTR-4 Annual Return</h2>
      {/* {renderStepIndicator()} */}
      <div className=" rounded-lg shadow-lg p-6">
        {renderStepContent(activeStep)}
        
        <div className="flex justify-between mt-8">
          {activeStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {activeStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
            >
              File Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GSTR4Form;