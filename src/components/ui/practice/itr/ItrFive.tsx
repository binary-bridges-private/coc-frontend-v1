import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Itr5FormData {
  // Step 1: General Information
  name: string;
  pan: string;
  oldName: string;
  llpin: string;
  formationDate: string;
  businessStartDate: string;
  flatNo: string;
  building: string;
  street: string;
  area: string;
  town: string;
  state: string;
  pincode: string;
  country: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  
  // Step 2: Filing Status
  filingSection: string;
  receiptNumber: string;
  originalFilingDate: string;
  noticeDIN: string;
  noticeDate: string;
  
  // Step 3: Residential Status & Declarations
  residentialStatus: string;
  hasIFSCUnit: boolean;
  isStartup: boolean;
  startupRegNo: string;
  msmeRegNo: string;
  representativeName: string;
  representativePAN: string;
  
  // Step 4: Audit Information
  isAudited: boolean;
  auditFirm: string;
  auditPAN: string;
  auditDate: string;
  auditUDIN: string;
  
  // Step 5: Partners / Members Information
  partnerName: string;
  partnerPAN: string;
  partnerAdmission: string;
  remuneration: string;
  sharePercent: string;
  
  // Step 6: Nature of Business
  businessCode: string;
  tradeName: string;
  description: string;
  
  // Step 7: Unlisted Shares
  companyName: string;
  companyPAN: string;
  sharesAcquired: string;
  acquisitionCost: string;
  sharesSold: string;
  saleValue: string;
}

interface Itr5FormErrors {
  [key: string]: string;
}

const ItrFive = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr5-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Itr5FormData>(() => {
    const savedFormData = localStorage.getItem('itr5-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Step 1: General Information
      name: '',
      pan: '',
      oldName: '',
      llpin: '',
      formationDate: '',
      businessStartDate: '',
      flatNo: '',
      building: '',
      street: '',
      area: '',
      town: '',
      state: '',
      pincode: '',
      country: '',
      phone1: '',
      phone2: '',
      email1: '',
      email2: '',
      
      // Step 2: Filing Status
      filingSection: '',
      receiptNumber: '',
      originalFilingDate: '',
      noticeDIN: '',
      noticeDate: '',
      
      // Step 3: Residential Status & Declarations
      residentialStatus: '',
      hasIFSCUnit: false,
      isStartup: false,
      startupRegNo: '',
      msmeRegNo: '',
      representativeName: '',
      representativePAN: '',
      
      // Step 4: Audit Information
      isAudited: false,
      auditFirm: '',
      auditPAN: '',
      auditDate: '',
      auditUDIN: '',
      
      // Step 5: Partners / Members Information
      partnerName: '',
      partnerPAN: '',
      partnerAdmission: '',
      remuneration: '',
      sharePercent: '',
      
      // Step 6: Nature of Business
      businessCode: '',
      tradeName: '',
      description: '',
      
      // Step 7: Unlisted Shares
      companyName: '',
      companyPAN: '',
      sharesAcquired: '',
      acquisitionCost: '',
      sharesSold: '',
      saleValue: '',
    };
  });
  const [errors, setErrors] = useState<Itr5FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr5-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr5-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Itr5FormErrors = {};
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!formData.pan.trim()) {
          newErrors.pan = 'PAN is required';
          isValid = false;
        }
        if (!formData.formationDate) {
          newErrors.formationDate = 'Formation date is required';
          isValid = false;
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        if (!formData.pincode) {
          newErrors.pincode = 'PIN/ZIP is required';
          isValid = false;
        }
        if (!formData.country) {
          newErrors.country = 'Country is required';
          isValid = false;
        }
        if (!formData.email1) {
          newErrors.email1 = 'Email address is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email1)) {
          newErrors.email1 = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.filingSection) {
          newErrors.filingSection = 'Filing section is required';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.residentialStatus) {
          newErrors.residentialStatus = 'Residential status is required';
          isValid = false;
        }
        break;
      case 4:
        // Step 4 is optional, no validation required
        break;
      case 5:
        if (!formData.partnerName) {
          newErrors.partnerName = 'Partner name is required';
          isValid = false;
        }
        if (!formData.partnerPAN) {
          newErrors.partnerPAN = 'Partner PAN is required';
          isValid = false;
        }
        break;
      case 6:
        if (!formData.businessCode) {
          newErrors.businessCode = 'Business code is required';
          isValid = false;
        }
        if (!formData.tradeName) {
          newErrors.tradeName = 'Trade name is required';
          isValid = false;
        }
        break;
      case 7:
        // Step 7 is optional, no validation required
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 7) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr5-current-step');
          localStorage.removeItem('itr5-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-5. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr5-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr5-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'General Information',
      2: 'Filing Status',
      3: 'Residential Status & Declarations',
      4: 'Audit Information',
      5: 'Partners / Members Information',
      6: 'Nature of Business',
      7: 'Unlisted Shares',
    };
    return titles[stepNumber] || '';
  };

  return (
    <>
      <div className="w-[60%] mt-20 p-6 mx-auto bg-white/80 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200">
        <ul className="flex items-center space-x-4 text-lg font-semibold text-gray-700">
          <li
            className="flex items-center transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice")}
          >
            <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18m-6-6l6 6m-6 6l6-6"></path>
            </svg>
            Practice
          </li>
          <span className="text-gray-400">›</span>
          <li
            className="transition duration-200 cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/practice/itr")}
          >
            ITR
          </li>
          <span className="text-gray-400">›</span>
          <li className="text-gray-500">ITR-5</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 7: ${getStepTitle(step)}`}
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: General Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Old Name (if changed)</label>
                <input type="text" name="oldName" value={formData.oldName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">LLPIN (if applicable)</label>
                <input type="text" name="llpin" value={formData.llpin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Formation Date <span className="text-red-500">*</span></label>
                <input type="date" name="formationDate" value={formData.formationDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.formationDate && <p className="mt-1 text-sm text-red-500">{errors.formationDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Business Start Date</label>
                <input type="date" name="businessStartDate" value={formData.businessStartDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Flat/Door/Block No.</label>
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Building/Village</label>
                <input type="text" name="building" value={formData.building} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Street/Post Office</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Area/Locality</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Town/City</label>
                <input type="text" name="town" value={formData.town} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PIN/ZIP Code <span className="text-red-500">*</span></label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 1</label>
                <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 2</label>
                <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 1 <span className="text-red-500">*</span></label>
                <input type="email" name="email1" value={formData.email1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 2</label>
                <input type="email" name="email2" value={formData.email2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Filing Status */}
        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Filing Status</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Section <span className="text-red-500">*</span></label>
                <select name="filingSection" value={formData.filingSection} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select filing section</option>
                  <option value="139(1)">139(1)</option>
                  <option value="139(4)">139(4)</option>
                  <option value="139(5)">139(5)</option>
                  <option value="92CD">92CD</option>
                  <option value="119(2)(b)">119(2)(b)</option>
                </select>
                {errors.filingSection && <p className="mt-1 text-sm text-red-500">{errors.filingSection}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Receipt Number (if revised)</label>
                <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Original Filing Date</label>
                <input type="date" name="originalFilingDate" value={formData.originalFilingDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">DIN / Unique Number</label>
                <input type="text" name="noticeDIN" value={formData.noticeDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of Notice/Order</label>
                <input type="date" name="noticeDate" value={formData.noticeDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Residential Status & Declarations */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Residential Status & Declarations</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status <span className="text-red-500">*</span></label>
                <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select residential status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" name="hasIFSCUnit" checked={formData.hasIFSCUnit} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Has IFSC Unit</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="isStartup" checked={formData.isStartup} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is Startup</label>
                </div>
              </div>
              {formData.isStartup && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Startup Reg. No.</label>
                  <input type="text" name="startupRegNo" value={formData.startupRegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">MSME Reg. No.</label>
                <input type="text" name="msmeRegNo" value={formData.msmeRegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                <input type="text" name="representativeName" value={formData.representativeName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative PAN / Aadhaar</label>
                <input type="text" name="representativePAN" value={formData.representativePAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Audit Information */}
        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Audit Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="isAudited" checked={formData.isAudited} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Is Audited</label>
              </div>
              {formData.isAudited && (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Audit Firm Name</label>
                    <input type="text" name="auditFirm" value={formData.auditFirm} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Firm PAN / Aadhaar</label>
                    <input type="text" name="auditPAN" value={formData.auditPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Audit Date</label>
                    <input type="date" name="auditDate" value={formData.auditDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                    <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 5: Partners / Members Information */}
        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Partners / Members Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Partner Name <span className="text-red-500">*</span></label>
                <input type="text" name="partnerName" value={formData.partnerName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.partnerName && <p className="mt-1 text-sm text-red-500">{errors.partnerName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="partnerPAN" value={formData.partnerPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.partnerPAN && <p className="mt-1 text-sm text-red-500">{errors.partnerPAN}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Admission Date</label>
                <input type="date" name="partnerAdmission" value={formData.partnerAdmission} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Remuneration</label>
                <input type="number" name="remuneration" value={formData.remuneration} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Share %</label>
                <input type="number" name="sharePercent" value={formData.sharePercent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Nature of Business */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Nature of Business</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Business Code <span className="text-red-500">*</span></label>
                <input type="text" name="businessCode" value={formData.businessCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.businessCode && <p className="mt-1 text-sm text-red-500">{errors.businessCode}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Trade Name <span className="text-red-500">*</span></label>
                <input type="text" name="tradeName" value={formData.tradeName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.tradeName && <p className="mt-1 text-sm text-red-500">{errors.tradeName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Unlisted Shares */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Unlisted Shares</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN</label>
                <input type="text" name="companyPAN" value={formData.companyPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">No. of Shares Acquired</label>
                <input type="number" name="sharesAcquired" value={formData.sharesAcquired} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Acquisition Cost</label>
                <input type="number" name="acquisitionCost" value={formData.acquisitionCost} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">No. of Shares Sold</label>
                <input type="number" name="sharesSold" value={formData.sharesSold} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Sale Value</label>
                <input type="number" name="saleValue" value={formData.saleValue} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button onClick={handlePreviousStep} className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100">Previous</button>
          )}
          <button
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              step === 7 ? "Submit" : "Next"
            )}
          </button>
        </div>
        {saveError && (
          <div className="mt-2 text-sm text-red-500">{saveError}</div>
        )}
      </div>
    </>
  );
};

export default ItrFive;