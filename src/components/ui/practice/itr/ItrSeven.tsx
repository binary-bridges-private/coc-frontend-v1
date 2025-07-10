import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Itr7FormData {
  // Step 1: Personal Information
  name: string;
  pan: string;
  formationDate: string;
  flatNo: string;
  building: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  phone1: string;
  phone2: string;
  email1: string;
  email2: string;
  
  // Step 2: Filing Status
  sectionFiled: string;
  receiptNumber: string;
  originalFilingDate: string;
  din: string;
  dinDate: string;
  
  // Step 3: Residential & Legal Info
  residentialStatus: string;
  hasProject: boolean;
  projectName: string;
  activityNature: string;
  classification: string;
  
  // Step 4: Registration Details
  regSection: string;
  regDate: string;
  urn: string;
  authority: string;
  effectiveFrom: string;
  
  // Step 5: Representative / Legal / Audit
  hasRepresentative: boolean;
  repName: string;
  repPAN: string;
  repAddress: string;
  auditFirm: string;
  auditPAN: string;
  auditDate: string;
  auditUDIN: string;
  
  // Step 6: Equity & Partner Details
  hasUnlistedShares: boolean;
  companyName: string;
  companyPAN: string;
  sharesHeld: string;
  costOfAcquisition: string;
  sharesTransferred: string;
  
  // Step 7: Contributors & Members
  authorName: string;
  relation: string;
  identificationType: string;
  identificationNo: string;
  mobile: string;
  email: string;
}

interface Itr7FormErrors {
  [key: string]: string;
}

const ItrSeven = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('itr7-current-step');
    return savedStep ? parseInt(savedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Itr7FormData>(() => {
    const savedFormData = localStorage.getItem('itr7-form-data');
    return savedFormData ? JSON.parse(savedFormData) : {
      // Step 1: Personal Information
      name: '',
      pan: '',
      formationDate: '',
      flatNo: '',
      building: '',
      street: '',
      area: '',
      city: '',
      state: '',
      pinCode: '',
      country: '',
      phone1: '',
      phone2: '',
      email1: '',
      email2: '',
      
      // Step 2: Filing Status
      sectionFiled: '',
      receiptNumber: '',
      originalFilingDate: '',
      din: '',
      dinDate: '',
      
      // Step 3: Residential & Legal Info
      residentialStatus: '',
      hasProject: false,
      projectName: '',
      activityNature: '',
      classification: '',
      
      // Step 4: Registration Details
      regSection: '',
      regDate: '',
      urn: '',
      authority: '',
      effectiveFrom: '',
      
      // Step 5: Representative / Legal / Audit
      hasRepresentative: false,
      repName: '',
      repPAN: '',
      repAddress: '',
      auditFirm: '',
      auditPAN: '',
      auditDate: '',
      auditUDIN: '',
      
      // Step 6: Equity & Partner Details
      hasUnlistedShares: false,
      companyName: '',
      companyPAN: '',
      sharesHeld: '',
      costOfAcquisition: '',
      sharesTransferred: '',
      
      // Step 7: Contributors & Members
      authorName: '',
      relation: '',
      identificationType: '',
      identificationNo: '',
      mobile: '',
      email: '',
    };
  });
  const [errors, setErrors] = useState<Itr7FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => {
        const newData = { ...prev, [name]: checked };
        localStorage.setItem('itr7-form-data', JSON.stringify(newData));
        return newData;
      });
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        localStorage.setItem('itr7-form-data', JSON.stringify(newData));
        return newData;
      });
    }
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Itr7FormErrors = {};
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
        } else if (!validatePan(formData.pan)) {
          newErrors.pan = 'Please enter a valid PAN number';
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
        if (!formData.pinCode) {
          newErrors.pinCode = 'PIN code is required';
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
        if (!formData.mobile) {
          newErrors.mobile = 'Mobile number is required';
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        }
        break;
      case 2:
        if (!formData.sectionFiled) {
          newErrors.sectionFiled = 'Section filed is required';
          isValid = false;
        }
        break;
      case 3:
        if (!formData.residentialStatus) {
          newErrors.residentialStatus = 'Residential status is required';
          isValid = false;
        }
        if (formData.hasProject && !formData.projectName) {
          newErrors.projectName = 'Project name is required';
          isValid = false;
        }
        break;
      case 4:
        if (!formData.regSection) {
          newErrors.regSection = 'Section of registration is required';
          isValid = false;
        }
        if (!formData.regDate) {
          newErrors.regDate = 'Registration date is required';
          isValid = false;
        }
        break;
      case 5:
        if (formData.hasRepresentative) {
          if (!formData.repName) {
            newErrors.repName = 'Representative name is required';
            isValid = false;
          }
          if (!formData.repPAN) {
            newErrors.repPAN = 'Representative PAN is required';
            isValid = false;
          }
        }
        break;
      case 6:
        if (formData.hasUnlistedShares) {
          if (!formData.companyName) {
            newErrors.companyName = 'Company name is required';
            isValid = false;
          }
          if (!formData.companyPAN) {
            newErrors.companyPAN = 'Company PAN is required';
            isValid = false;
          }
        }
        break;
      case 7:
        if (!formData.authorName) {
          newErrors.authorName = 'Author/Founder name is required';
          isValid = false;
        }
        if (!formData.mobile) {
          newErrors.mobile = 'Mobile number is required';
          isValid = false;
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
          newErrors.mobile = 'Please enter a valid 10-digit mobile number';
          isValid = false;
        }
        if (!formData.email) {
          newErrors.email = 'Email address is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
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
          localStorage.removeItem('itr7-current-step');
          localStorage.removeItem('itr7-form-data');
          navigate("/practice/itr/success");
        } catch (error) {
          setSaveError("Failed to save ITR-7. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        const nextStep = step + 1;
        setStep(nextStep);
        localStorage.setItem('itr7-current-step', nextStep.toString());
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = step - 1;
    setStep(prevStep);
    localStorage.setItem('itr7-current-step', prevStep.toString());
  };

  const getStepTitle = (stepNumber: number) => {
    const titles: Record<number, string> = {
      1: 'Personal Information',
      2: 'Filing Status',
      3: 'Residential & Legal Info',
      4: 'Registration Details',
      5: 'Representative / Legal / Audit',
      6: 'Equity & Partner Details',
      7: 'Contributors & Members',
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
          <li className="text-gray-500">ITR-7</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          {`Step ${step} of 7: ${step === 1 ? "PART A: Personal Information" : 
                                step === 2 ? "PART B: Filing Status" : 
                                step === 3 ? "PART C: Residential & Legal Info" : 
                                step === 4 ? "PART D: Registration Details" :
                                step === 5 ? "PART E: Representative / Legal / Audit" :
                                step === 6 ? "PART F: Equity & Partner Details" :
                                "PART G: Contributors & Members"}`
          }
        </h2>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART A: Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name (as per Deed/Formation) <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name as per deed/formation" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`} />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PAN <span className="text-red-500">*</span></label>
                <input type="text" name="pan" value={formData.pan} onChange={handleChange} placeholder="Enter PAN number" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`} />
                {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Formation Date <span className="text-red-500">*</span></label>
                <input type="date" name="formationDate" value={formData.formationDate} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.formationDate ? "border-red-500" : "border-gray-300"}`} />
                {errors.formationDate && <p className="mt-1 text-sm text-red-500">{errors.formationDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Flat/Door/Block No.</label>
                <input type="text" name="flatNo" value={formData.flatNo} onChange={handleChange} placeholder="Enter flat/door/block number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Building/Village</label>
                <input type="text" name="building" value={formData.building} onChange={handleChange} placeholder="Enter building/village name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Street/Post Office</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Enter street/post office" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Area/Locality</label>
                <input type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Enter area/locality" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Town/City/District</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter town/city/district" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter state" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`} />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">PIN/ZIP Code <span className="text-red-500">*</span></label>
                <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Enter PIN/ZIP code" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pinCode ? "border-red-500" : "border-gray-300"}`} />
                {errors.pinCode && <p className="mt-1 text-sm text-red-500">{errors.pinCode}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Enter country" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.country ? "border-red-500" : "border-gray-300"}`} />
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 1</label>
                <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} placeholder="Enter phone number 1" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number 2</label>
                <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} placeholder="Enter phone number 2" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 1 <span className="text-red-500">*</span></label>
                <input type="email" name="email1" value={formData.email1} onChange={handleChange} placeholder="Enter email address 1" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email1 ? "border-red-500" : "border-gray-300"}`} />
                {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address 2</label>
                <input type="email" name="email2" value={formData.email2} onChange={handleChange} placeholder="Enter email address 2" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Filing Status */}
        {step === 2 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART B: Filing Status</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section Filed <span className="text-red-500">*</span></label>
                <select name="sectionFiled" value={formData.sectionFiled} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.sectionFiled ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select section</option>
                  <option value="139(1)">139(1)</option>
                  <option value="139(4)">139(4)</option>
                  <option value="139(5)">139(5)</option>
                  <option value="92CD">92CD</option>
                  <option value="119(2)(b)">119(2)(b)</option>
                </select>
                {errors.sectionFiled && <p className="mt-1 text-sm text-red-500">{errors.sectionFiled}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Receipt No. (if revised)</label>
                <input type="text" name="receiptNumber" value={formData.receiptNumber} onChange={handleChange} placeholder="Enter receipt number if revised" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Original Filing Date</label>
                <input type="date" name="originalFilingDate" value={formData.originalFilingDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">DIN / Unique Number</label>
                <input type="text" name="din" value={formData.din} onChange={handleChange} placeholder="Enter DIN/Unique number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">DIN Date</label>
                <input type="date" name="dinDate" value={formData.dinDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Residential & Legal Info */}
        {step === 3 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART C: Residential & Legal Info</h3>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Residential Status <span className="text-red-500">*</span></label>
                <select name="residentialStatus" value={formData.residentialStatus} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.residentialStatus ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select residential status</option>
                  <option value="Resident">Resident</option>
                  <option value="Non-Resident">Non-Resident</option>
                </select>
                {errors.residentialStatus && <p className="mt-1 text-sm text-red-500">{errors.residentialStatus}</p>}
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="hasProject" checked={formData.hasProject} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Project</label>
              </div>
              {formData.hasProject && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Project/Institution Name</label>
                  <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} placeholder="Enter project/institution name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.projectName ? "border-red-500" : "border-gray-300"}`} />
                  {errors.projectName && <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>}
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Nature of Activity</label>
                <input type="text" name="activityNature" value={formData.activityNature} onChange={handleChange} placeholder="Enter nature of activity" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Classification</label>
                <input type="text" name="classification" value={formData.classification} onChange={handleChange} placeholder="Enter classification" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Registration Details */}
        {step === 4 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART D: Registration Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Section of Registration <span className="text-red-500">*</span></label>
                <input type="text" name="regSection" value={formData.regSection} onChange={handleChange} placeholder="Enter section of registration" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.regSection ? "border-red-500" : "border-gray-300"}`} />
                {errors.regSection && <p className="mt-1 text-sm text-red-500">{errors.regSection}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Registration Date <span className="text-red-500">*</span></label>
                <input type="date" name="regDate" value={formData.regDate} onChange={handleChange} className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.regDate ? "border-red-500" : "border-gray-300"}`} />
                {errors.regDate && <p className="mt-1 text-sm text-red-500">{errors.regDate}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">URN / Approval No.</label>
                <input type="text" name="urn" value={formData.urn} onChange={handleChange} placeholder="Enter URN/Approval number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Approving Authority</label>
                <input type="text" name="authority" value={formData.authority} onChange={handleChange} placeholder="Enter approving authority" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Effective Date</label>
                <input type="date" name="effectiveFrom" value={formData.effectiveFrom} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Representative / Legal / Audit */}
        {step === 5 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART E: Representative / Legal / Audit</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="hasRepresentative" checked={formData.hasRepresentative} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Representative</label>
              </div>
              {formData.hasRepresentative && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Representative Name</label>
                    <input type="text" name="repName" value={formData.repName} onChange={handleChange} placeholder="Enter representative name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.repName ? "border-red-500" : "border-gray-300"}`} />
                    {errors.repName && <p className="mt-1 text-sm text-red-500">{errors.repName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">PAN / Aadhaar</label>
                    <input type="text" name="repPAN" value={formData.repPAN} onChange={handleChange} placeholder="Enter PAN/Aadhaar" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.repPAN ? "border-red-500" : "border-gray-300"}`} />
                    {errors.repPAN && <p className="mt-1 text-sm text-red-500">{errors.repPAN}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                    <input type="text" name="repAddress" value={formData.repAddress} onChange={handleChange} placeholder="Enter representative address" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Firm Name</label>
                  <input type="text" name="auditFirm" value={formData.auditFirm} onChange={handleChange} placeholder="Enter audit firm name" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Firm PAN</label>
                  <input type="text" name="auditPAN" value={formData.auditPAN} onChange={handleChange} placeholder="Enter audit firm PAN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Audit Date</label>
                  <input type="date" name="auditDate" value={formData.auditDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">UDIN</label>
                  <input type="text" name="auditUDIN" value={formData.auditUDIN} onChange={handleChange} placeholder="Enter UDIN" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Equity & Partner Details */}
        {step === 6 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART F: Equity & Partner Details</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" name="hasUnlistedShares" checked={formData.hasUnlistedShares} onChange={handleChange} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label className="ml-2 text-sm font-medium text-gray-700">Has Unlisted Shares</label>
              </div>
              {formData.hasUnlistedShares && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Enter company name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.companyName ? "border-red-500" : "border-gray-300"}`} />
                    {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Company PAN</label>
                    <input type="text" name="companyPAN" value={formData.companyPAN} onChange={handleChange} placeholder="Enter company PAN" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.companyPAN ? "border-red-500" : "border-gray-300"}`} />
                    {errors.companyPAN && <p className="mt-1 text-sm text-red-500">{errors.companyPAN}</p>}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">No. of Shares</label>
                    <input type="number" name="sharesHeld" value={formData.sharesHeld} onChange={handleChange} placeholder="Enter number of shares" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Cost of Acquisition</label>
                    <input type="number" name="costOfAcquisition" value={formData.costOfAcquisition} onChange={handleChange} placeholder="Enter cost of acquisition" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Shares Transferred</label>
                    <input type="number" name="sharesTransferred" value={formData.sharesTransferred} onChange={handleChange} placeholder="Enter shares transferred" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 7: Contributors & Members */}
        {step === 7 && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART G: Contributors & Members</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Author/Founder Name <span className="text-red-500">*</span></label>
                <input type="text" name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Enter author/founder name" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.authorName ? "border-red-500" : "border-gray-300"}`} />
                {errors.authorName && <p className="mt-1 text-sm text-red-500">{errors.authorName}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Relation</label>
                <input type="text" name="relation" value={formData.relation} onChange={handleChange} placeholder="Enter relation" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ID Type</label>
                <input type="text" name="identificationType" value={formData.identificationType} onChange={handleChange} placeholder="Enter ID type" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">ID Number</label>
                <input type="text" name="identificationNo" value={formData.identificationNo} onChange={handleChange} placeholder="Enter ID number" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter mobile number" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.mobile ? "border-red-500" : "border-gray-300"}`} />
                {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`} />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePreviousStep}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={handleNextStep}
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : step === 7 ? (
              "Submit"
            ) : (
              "Next"
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

export default ItrSeven;