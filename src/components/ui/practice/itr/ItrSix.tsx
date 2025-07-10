import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Itr6FormData {
  // Step 1: Company General Information
  companyName: string;
  pan: string;
  oldCompanyName: string;
  cin: string;
  incorporationDate: string;
  businessStartDate: string;
  flatNo: string;
  buildingName: string;
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
  filingReasonNotice: string;
  receiptNo: string;
  originalReturnDate: string;
  noticeDIN: string;
  noticeDate: string;
  
  // Step 3: Company Status
  residentialStatus: string;
  companyType: string;
  opted115BAA: boolean;
  isAuditRequired: boolean;
  isIFSCUnit: boolean;
  isUnderLiquidation: boolean;
  isFPI: boolean;
  sebiRegNo: string;
  
  // Step 4: Representative Assessee Details
  repName: string;
  repPAN: string;
  repCapacity: string;
  repAddress: string;
  
  // Step 5: Audit & Books of Account
  maintainsBooks: boolean;
  isLiableToAudit: boolean;
  auditReportDate: string;
  auditorName: string;
  auditorMembershipNo: string;
  auditFirmName: string;
  auditFirmPAN: string;
  auditUDIN: string;
  
  // Step 6: Holding/Subsidiary Company Info
  holdingCompanyPAN: string;
  holdingCompanyName: string;
  holdingSharePercent: string;
  
  // Step 7: Key Persons and Shareholders
  directorName: string;
  directorPAN: string;
  directorDIN: string;
  directorAddress: string;
  shareholderName: string;
  shareholderPAN: string;
  sharePercent: string;
  
  // Step 8: Financials and Business Nature
  natureOfBusiness1: string;
  natureOfBusiness2: string;
  natureOfBusiness3: string;
  bankAccountNumber: string;
  bankIFSC: string;
  bankName: string;
  accountType: string;
}

interface Itr6FormErrors {
  [key: string]: string;
}

const ItrSix = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr6-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Itr6FormData>(() => {
    const savedFormData = localStorage.getItem('itr6-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Step 1: Company General Information
      companyName: '',
      pan: '',
      oldCompanyName: '',
      cin: '',
      incorporationDate: '',
      businessStartDate: '',
      flatNo: '',
      buildingName: '',
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
      filingReasonNotice: '',
      receiptNo: '',
      originalReturnDate: '',
      noticeDIN: '',
      noticeDate: '',
      
      // Step 3: Company Status
      residentialStatus: '',
      companyType: '',
      opted115BAA: false,
      isAuditRequired: false,
      isIFSCUnit: false,
      isUnderLiquidation: false,
      isFPI: false,
      sebiRegNo: '',
      
      // Step 4: Representative Assessee Details
      repName: '',
      repPAN: '',
      repCapacity: '',
      repAddress: '',
      
      // Step 5: Audit & Books of Account
      maintainsBooks: false,
      isLiableToAudit: false,
      auditReportDate: '',
      auditorName: '',
      auditorMembershipNo: '',
      auditFirmName: '',
      auditFirmPAN: '',
      auditUDIN: '',
      
      // Step 6: Holding/Subsidiary Company Info
      holdingCompanyPAN: '',
      holdingCompanyName: '',
      holdingSharePercent: '',
      
      // Step 7: Key Persons and Shareholders
      directorName: '',
      directorPAN: '',
      directorDIN: '',
      directorAddress: '',
      shareholderName: '',
      shareholderPAN: '',
      sharePercent: '',
      
      // Step 8: Financials and Business Nature
      natureOfBusiness1: '',
      natureOfBusiness2: '',
      natureOfBusiness3: '',
      bankAccountNumber: '',
      bankIFSC: '',
      bankName: '',
      accountType: '',
    };
  });
  const [errors, setErrors] = useState<Itr6FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr6-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr6-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Itr6FormErrors = {};
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.companyName.trim()) {
          newErrors.companyName = 'Company name is required';
          isValid = false;
        }
        if (!formData.pan.trim()) {
          newErrors.pan = 'PAN is required';
          isValid = false;
        }
        if (!formData.incorporationDate) {
          newErrors.incorporationDate = 'Incorporation date is required';
          isValid = false;
        }
        if (!formData.state) {
          newErrors.state = 'State is required';
          isValid = false;
        }
        if (!formData.pincode) {
          newErrors.pincode = 'PIN code is required';
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
        if (!formData.companyType) {
          newErrors.companyType = 'Company type is required';
          isValid = false;
        }
        if (formData.isFPI && !formData.sebiRegNo) {
          newErrors.sebiRegNo = 'SEBI registration number is required for FPI';
          isValid = false;
        }
        break;
      case 4:
        // Step 4 is optional, no validation required
        break;
      case 5:
        // Step 5 is optional, no validation required
        break;
      case 6:
        // Step 6 is optional, no validation required
        break;
      case 7:
        // Step 7 is optional, no validation required
        break;
      case 8:
        if (!formData.natureOfBusiness1) {
          newErrors.natureOfBusiness1 = 'Nature of business is required';
          isValid = false;
        }
        if (!formData.bankAccountNumber) {
          newErrors.bankAccountNumber = 'Bank account number is required';
          isValid = false;
        }
        if (!formData.bankIFSC) {
          newErrors.bankIFSC = 'Bank IFSC is required';
          isValid = false;
        }
        if (!formData.bankName) {
          newErrors.bankName = 'Bank name is required';
          isValid = false;
        }
        if (!formData.accountType) {
          newErrors.accountType = 'Account type is required';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 8) {
        setIsLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          localStorage.removeItem('itr6-current-step');
          localStorage.removeItem('itr6-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-6. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr6-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr6-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'Company General Information',
      2: 'Filing Status',
      3: 'Company Status',
      4: 'Representative Assessee Details',
      5: 'Audit & Books of Account',
      6: 'Holding/Subsidiary Company Info',
      7: 'Key Persons and Shareholders',
      8: 'Financials and Business Nature',
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
          <li className="text-gray-500">ITR-6</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 8: ${getStepTitle(step)}`}
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: Company General Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Company General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Name <span className="text-red-500">*</span></label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Old Company Name</label>
                <input type="text" name="oldCompanyName" value={formData.oldCompanyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">CIN (Corporate Identity Number)</label>
                <input type="text" name="cin" value={formData.cin} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Incorporation Date <span className="text-red-500">*</span></label>
                <input type="date" name="incorporationDate" value={formData.incorporationDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.incorporationDate && <p className="mt-1 text-sm text-red-500">{errors.incorporationDate}</p>}
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
                <input type="text" name="buildingName" value={formData.buildingName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
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
                <label className="block mb-2 text-sm font-medium text-gray-700">Town/City/District</label>
                <input type="text" name="town" value={formData.town} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PIN Code <span className="text-red-500">*</span></label>
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
                  <option value="170A">170A</option>
                </select>
                {errors.filingSection && <p className="mt-1 text-sm text-red-500">{errors.filingSection}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Filing Reason Notice</label>
                <select name="filingReasonNotice" value={formData.filingReasonNotice} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select reason</option>
                  <option value="None">None</option>
                  <option value="139(9)">139(9)</option>
                  <option value="142(1)">142(1)</option>
                  <option value="148">148</option>
                  <option value="153C">153C</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Receipt No (if revised)</label>
                <input type="text" name="receiptNo" value={formData.receiptNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Date of original return</label>
                <input type="date" name="originalReturnDate" value={formData.originalReturnDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Document Identification Number (DIN)</label>
                <input type="text" name="noticeDIN" value={formData.noticeDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Notice/Order Date</label>
                <input type="date" name="noticeDate" value={formData.noticeDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Company Status */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Company Status</h3>
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Type <span className="text-red-500">*</span></label>
                <select name="companyType" value={formData.companyType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                  <option value="">Select company type</option>
                  <option value="Domestic">Domestic</option>
                  <option value="Foreign">Foreign</option>
                </select>
                {errors.companyType && <p className="mt-1 text-sm text-red-500">{errors.companyType}</p>}
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" name="opted115BAA" checked={formData.opted115BAA} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Opted 115BAA</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="isAuditRequired" checked={formData.isAuditRequired} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is Audit Required</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="isIFSCUnit" checked={formData.isIFSCUnit} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is IFSC Unit</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="isUnderLiquidation" checked={formData.isUnderLiquidation} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is Under Liquidation</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="isFPI" checked={formData.isFPI} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is FPI</label>
                </div>
              </div>
              {formData.isFPI && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">SEBI Registration No</label>
                  <input type="text" name="sebiRegNo" value={formData.sebiRegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.sebiRegNo && <p className="mt-1 text-sm text-red-500">{errors.sebiRegNo}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Representative Assessee Details */}
        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Representative Assessee Details (If Applicable)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                <input type="text" name="repName" value={formData.repName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN / Aadhaar</label>
                <input type="text" name="repPAN" value={formData.repPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Capacity</label>
                <input type="text" name="repCapacity" value={formData.repCapacity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                <input type="text" name="repAddress" value={formData.repAddress} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Audit & Books of Account */}
        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Audit & Books of Account</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" name="maintainsBooks" checked={formData.maintainsBooks} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Maintains Books</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="isLiableToAudit" checked={formData.isLiableToAudit} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                  <label className="ml-2 text-sm font-medium text-gray-700">Is Liable To Audit</label>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Audit Report Date</label>
                <input type="date" name="auditReportDate" value={formData.auditReportDate} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Auditor Name</label>
                <input type="text" name="auditorName" value={formData.auditorName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Membership No</label>
                <input type="text" name="auditorMembershipNo" value={formData.auditorMembershipNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Firm Name</label>
                <input type="text" name="auditFirmName" value={formData.auditFirmName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Firm PAN / Aadhaar</label>
                <input type="text" name="auditFirmPAN" value={formData.auditFirmPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Holding/Subsidiary Company Info */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Holding/Subsidiary Company Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Holding Company PAN</label>
                <input type="text" name="holdingCompanyPAN" value={formData.holdingCompanyPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Holding Company Name</label>
                <input type="text" name="holdingCompanyName" value={formData.holdingCompanyName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Holding Share (%)</label>
                <input type="number" name="holdingSharePercent" value={formData.holdingSharePercent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Key Persons and Shareholders */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Key Persons and Shareholders</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Director/MD Name</label>
                  <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">PAN / Aadhaar</label>
                  <input type="text" name="directorPAN" value={formData.directorPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">DIN</label>
                  <input type="text" name="directorDIN" value={formData.directorDIN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                  <input type="text" name="directorAddress" value={formData.directorAddress} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Beneficial Owner Name</label>
                  <input type="text" name="shareholderName" value={formData.shareholderName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">PAN</label>
                  <input type="text" name="shareholderPAN" value={formData.shareholderPAN} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Shareholding (%)</label>
                  <input type="number" name="sharePercent" value={formData.sharePercent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Financials and Business Nature */}
        {step === 8 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">Financials and Business Nature</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Business 1 <span className="text-red-500">*</span></label>
                  <input type="text" name="natureOfBusiness1" value={formData.natureOfBusiness1} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.natureOfBusiness1 && <p className="mt-1 text-sm text-red-500">{errors.natureOfBusiness1}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Business 2</label>
                  <input type="text" name="natureOfBusiness2" value={formData.natureOfBusiness2} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Business 3</label>
                  <input type="text" name="natureOfBusiness3" value={formData.natureOfBusiness3} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Account Number <span className="text-red-500">*</span></label>
                  <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.bankAccountNumber && <p className="mt-1 text-sm text-red-500">{errors.bankAccountNumber}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Bank IFSC <span className="text-red-500">*</span></label>
                  <input type="text" name="bankIFSC" value={formData.bankIFSC} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.bankIFSC && <p className="mt-1 text-sm text-red-500">{errors.bankIFSC}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Bank Name <span className="text-red-500">*</span></label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  {errors.bankName && <p className="mt-1 text-sm text-red-500">{errors.bankName}</p>}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Account Type <span className="text-red-500">*</span></label>
                  <select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select account type</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                  </select>
                  {errors.accountType && <p className="mt-1 text-sm text-red-500">{errors.accountType}</p>}
                </div>
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
              step === 8 ? "Submit" : "Next"
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

export default ItrSix;