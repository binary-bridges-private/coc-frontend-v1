import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItrFourFormData, ItrFourFormErrors } from './types/ItrFourTypes';
import { 
  initialItrFourFormData, 
  initialItrFourFormErrors, 
  ITR_FOUR_STEPS 
} from './constants/ItrFourConstants.ts';
import { validateItrFourStep } from './ItrFourValidation.ts';
import ItrFourPresumptiveTax from './components/ItrFourPresumptiveTax.tsx';
import ItrFourHouseProperty from './components/ItrFourHouseProperty.tsx';

const ItrFour: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ItrFourFormData>(initialItrFourFormData);
  const [errors, setErrors] = useState<ItrFourFormErrors>(initialItrFourFormErrors);

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('itrFourFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('itrFourFormData', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (field: keyof ItrFourFormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayFieldChange = (
    field: keyof ItrFourFormData, 
    index: number, 
    subField: string, 
    value: string | number | boolean
  ) => {
    setFormData(prev => {
      const newArray = [...(prev[field] as any[])];
      newArray[index] = {
        ...newArray[index],
        [subField]: value
      };
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: keyof ItrFourFormData, newItem: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), newItem]
    }));
  };

  const removeArrayItem = (field: keyof ItrFourFormData, index: number) => {
    setFormData(prev => {
      const newArray = [...(prev[field] as any[])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const validateStep = (stepNumber: number): boolean => {
    const validation = validateItrFourStep(stepNumber, formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < ITR_FOUR_STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Here you would typically submit the form data to your backend
      console.log('Form submitted:', formData);
      alert('ITR-4 form submitted successfully!');
      navigate('/practice/itr');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">General Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
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
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN *
                </label>
                <input
                  type="text"
                  value={formData.pan}
                  onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.pan ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                />
                {errors.pan && <p className="text-red-500 text-sm mt-1">{errors.pan}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123456789012"
                  maxLength={12}
                />
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
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Residential Status
                </label>
                <select
                  value={formData.residentialStatus}
                  onChange={(e) => handleInputChange('residentialStatus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                  <option value="Resident but Not Ordinarily Resident">Resident but Not Ordinarily Resident</option>
                </select>
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
                  placeholder="9876543210"
                  maxLength={10}
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.emailAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                />
                {errors.emailAddress && <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>}
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Address Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flat/Door/Block No.
                  </label>
                  <input
                    type="text"
                    value={formData.flatDoorBlock}
                    onChange={(e) => handleInputChange('flatDoorBlock', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter flat/door/block number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building Name
                  </label>
                  <input
                    type="text"
                    value={formData.buildingName}
                    onChange={(e) => handleInputChange('buildingName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter building name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Road/Street
                  </label>
                  <input
                    type="text"
                    value={formData.roadStreet}
                    onChange={(e) => handleInputChange('roadStreet', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter road/street"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locality/Area
                  </label>
                  <input
                    type="text"
                    value={formData.localityArea}
                    onChange={(e) => handleInputChange('localityArea', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter locality/area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City/District
                  </label>
                  <input
                    type="text"
                    value={formData.cityDistrict}
                    onChange={(e) => handleInputChange('cityDistrict', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter city/district"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter state"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="123456"
                    maxLength={6}
                  />
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
              </div>
            </div>
          </div>
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
                {errors.filingSection && <p className="text-red-500 text-sm mt-1">{errors.filingSection}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isRevisedReturn}
                  onChange={(e) => handleInputChange('isRevisedReturn', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Is this a revised return?
                </label>
              </div>

              {formData.isRevisedReturn && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Original Acknowledgement Number
                    </label>
                    <input
                      type="text"
                      value={formData.originalAckNumber}
                      onChange={(e) => handleInputChange('originalAckNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter original ACK number"
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

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isUpdatedReturn}
                  onChange={(e) => handleInputChange('isUpdatedReturn', e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Is this an updated return?
                </label>
              </div>

              {formData.isUpdatedReturn && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Updated Return Acknowledgement Number
                  </label>
                  <input
                    type="text"
                    value={formData.updatedReturnAckNumber}
                    onChange={(e) => handleInputChange('updatedReturnAckNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter updated return ACK number"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <ItrFourPresumptiveTax
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
          <ItrFourHouseProperty
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleArrayFieldChange={handleArrayFieldChange}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
          />
        );

      case 16:
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
                {errors.verificationName && <p className="text-red-500 text-sm mt-1">{errors.verificationName}</p>}
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
                {errors.capacity && <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>}
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
                {errors.declarationPlace && <p className="text-red-500 text-sm mt-1">{errors.declarationPlace}</p>}
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
                {errors.declarationDate && <p className="text-red-500 text-sm mt-1">{errors.declarationDate}</p>}
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-4">Declaration</h3>
              <p className="text-sm text-yellow-700">
                I declare that the information given in this return is true and correct to the best of my knowledge and belief.
                I further declare that I am making this return in my capacity as {formData.capacity || '[Capacity]'} and that I am competent to make this return and verify it.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {ITR_FOUR_STEPS[currentStep - 1]?.title || 'Step ' + currentStep}
            </h2>
            <p className="text-gray-600">
              {ITR_FOUR_STEPS[currentStep - 1]?.description || 'This step is under development.'}
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-blue-700">
                This section will be implemented in the next phase. The form structure is ready and can be extended as needed.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ITR-4 Form</h1>
              <p className="text-gray-600 mt-2">
                For individuals and HUFs having income from a proprietary business or profession
              </p>
            </div>
            <button
              onClick={() => navigate('/practice/itr')}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back to ITR Forms
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {ITR_FOUR_STEPS.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / ITR_FOUR_STEPS.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / ITR_FOUR_STEPS.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            <div className="flex space-x-4">
              {currentStep < ITR_FOUR_STEPS.length ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Form
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItrFour;