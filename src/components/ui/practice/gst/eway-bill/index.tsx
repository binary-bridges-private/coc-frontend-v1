import React, { useState, useEffect } from 'react';
// import { useAppDispatch } from '../../../../../store/hooks';

interface EWayBillFormData {
  transactionType: 'Outward' | 'Inward';
  subType: string;
  documentType: 'Invoice' | 'Bill' | 'Challan' | 'Credit Note' | 'Bill of Entry' | 'Others';
  documentNo: string;
  documentDate: string;
  fromGstin: string;
  fromName: string;
  fromAddress: string;
  toGstin: string;
  toName: string;
  toAddress: string;
  items: {
    productName: string;
    description: string;
    hsnCode: string;
    quantity: string;
    unit: string;
    value: string;
    cgstRate: string;
    sgstRate: string;
    igstRate: string;
    cessRate: string;
  }[];
  transportMode: 'Road' | 'Rail' | 'Ship' | 'Air';
  distance: string;
  transporterName: string;
  transporterId: string;
  transporterDocNo: string;
  transporterDocDate: string;
  vehicleNo: string;
}

const EWayBill: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  // const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<EWayBillFormData>({
    transactionType: 'Outward',
    subType: '',
    documentType: 'Invoice',
    documentNo: '',
    documentDate: '',
    fromGstin: '',
    fromName: '',
    fromAddress: '',
    toGstin: '',
    toName: '',
    toAddress: '',
    items: [{
      productName: '',
      description: '',
      hsnCode: '',
      quantity: '',
      unit: '',
      value: '',
      cgstRate: '',
      sgstRate: '',
      igstRate: '',
      cessRate: ''
    }],
    transportMode: 'Road',
    distance: '',
    transporterName: '',
    transporterId: '',
    transporterDocNo: '',
    transporterDocDate: '',
    vehicleNo: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EWayBillFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EWayBillFormData, boolean>>>({});

  const validateField = (name: keyof EWayBillFormData, value: any): string => {
    // Skip validation for items array as it's handled separately
    if (name === 'items') return '';

    // Check if the field is required
    const requiredFields: (keyof EWayBillFormData)[] = [
      'transactionType',
      'subType',
      'documentType',
      'documentNo',
      'documentDate',
      'fromGstin',
      'fromName',
      'fromAddress',
      'toGstin',
      'toName',
      'toAddress',
      'transportMode',
      'distance'
    ];

    if (requiredFields.includes(name) && !value) {
      return 'This field is required';
    }

    switch (name) {
      case 'documentNo':
        return value.length > 16 ? 'Max 16 characters allowed' : '';
      case 'fromGstin':
      case 'toGstin':
        return value && !/^[0-9A-Z]{15}$/.test(value) ? 'Invalid GSTIN format' : '';
      case 'distance':
        return isNaN(Number(value)) ? 'Must be a valid number' : '';
      case 'vehicleNo':
        return value && !/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/.test(value) ? 'Invalid vehicle number format' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name as keyof EWayBillFormData, value)
      }));
    }
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, {
        productName: '',
        description: '',
        hsnCode: '',
        quantity: '',
        unit: '',
        value: '',
        cgstRate: '',
        sgstRate: '',
        igstRate: '',
        cessRate: ''
      }]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof EWayBillFormData, string>> = {};
    let isValid = true;

    switch (step) {
      case 1:
        // Validate Transaction Details
        if (!formData.transactionType) {
          newErrors.transactionType = 'Transaction Type is required';
          isValid = false;
        }
        if (!formData.subType) {
          newErrors.subType = 'Sub-type is required';
          isValid = false;
        }
        break;

      case 2:
        // Validate Document Details
        if (!formData.documentType) {
          newErrors.documentType = 'Document Type is required';
          isValid = false;
        }
        if (!formData.documentNo) {
          newErrors.documentNo = 'Document Number is required';
          isValid = false;
        }
        if (!formData.documentDate) {
          newErrors.documentDate = 'Document Date is required';
          isValid = false;
        }
        break;

      case 3:
        // Validate Party Details
        if (!formData.fromGstin) {
          newErrors.fromGstin = 'From GSTIN is required';
          isValid = false;
        }
        if (!formData.fromName) {
          newErrors.fromName = 'From Name is required';
          isValid = false;
        }
        if (!formData.fromAddress) {
          newErrors.fromAddress = 'From Address is required';
          isValid = false;
        }
        if (!formData.toGstin) {
          newErrors.toGstin = 'To GSTIN is required';
          isValid = false;
        }
        if (!formData.toName) {
          newErrors.toName = 'To Name is required';
          isValid = false;
        }
        if (!formData.toAddress) {
          newErrors.toAddress = 'To Address is required';
          isValid = false;
        }
        break;

      case 4:
        // Validate Item Details
        const hasValidItems = formData.items.every(item => 
          item.productName && 
          item.hsnCode && 
          item.quantity && 
          item.unit && 
          item.value
        );
        if (!hasValidItems) {
          newErrors.items = 'All items must have required fields filled';
          isValid = false;
        }
        break;

      case 5:
        // Validate Transporter Details
        if (!formData.transportMode) {
          newErrors.transportMode = 'Transport Mode is required';
          isValid = false;
        }
        if (!formData.distance) {
          newErrors.distance = 'Distance is required';
          isValid = false;
        }
        if (formData.transportMode === 'Road' && !formData.vehicleNo) {
          newErrors.vehicleNo = 'Vehicle Number is required for Road transport';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // TODO: Implement form submission logic
      console.log('Form submitted:', formData);
    }
  };

  const inputClass = "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500";
  const errorInputClass = `${inputClass} border-red-500`;
  const selectClass = `${inputClass} bg-white`;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      if (validateStep(currentStep)) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((step) => (
          <div
            key={step}
            className={`flex items-center ${
              step !== totalSteps ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step}
            </div>
            {step !== totalSteps && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
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
            <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-3 font-medium">Transaction Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.transactionType === 'Outward' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="transactionType"
                      value="Outward"
                      checked={formData.transactionType === 'Outward'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Outward</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.transactionType === 'Inward' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="transactionType"
                      value="Inward"
                      checked={formData.transactionType === 'Inward'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Inward</span>
                  </label>
                </div>
                {errors.transactionType && <p className="text-red-500 text-sm mt-1">{errors.transactionType}</p>}
              </div>

              <div>
                <label className="block mb-3 font-medium">Sub-type</label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.transactionType === 'Outward' ? (
                    <>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Supply' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Supply"
                          checked={formData.subType === 'Supply'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Supply</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Export' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Export"
                          checked={formData.subType === 'Export'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Export</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Job Work' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Job Work"
                          checked={formData.subType === 'Job Work'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Job Work</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'SKD/CKD' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="SKD/CKD"
                          checked={formData.subType === 'SKD/CKD'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">SKD/CKD</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Recipient Not Known' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Recipient Not Known"
                          checked={formData.subType === 'Recipient Not Known'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Recipient Not Known</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'For Own Use' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="For Own Use"
                          checked={formData.subType === 'For Own Use'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">For Own Use</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Exhibition or Fair' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Exhibition or Fair"
                          checked={formData.subType === 'Exhibition or Fair'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Exhibition or Fair</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Line Sales' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Line Sales"
                          checked={formData.subType === 'Line Sales'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Line Sales</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Others' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Others"
                          checked={formData.subType === 'Others'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Others</span>
                      </label>
                    </>
                  ) : (
                    <>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Supply' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Supply"
                          checked={formData.subType === 'Supply'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Supply</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Import' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Import"
                          checked={formData.subType === 'Import'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Import</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'SKD/CKD' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="SKD/CKD"
                          checked={formData.subType === 'SKD/CKD'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">SKD/CKD</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Job Work Returns' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Job Work Returns"
                          checked={formData.subType === 'Job Work Returns'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Job Work Returns</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Sales Return' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Sales Return"
                          checked={formData.subType === 'Sales Return'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Sales Return</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Exhibition or Fair' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Exhibition or Fair"
                          checked={formData.subType === 'Exhibition or Fair'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Exhibition or Fair</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'For Own Use' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="For Own Use"
                          checked={formData.subType === 'For Own Use'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">For Own Use</span>
                      </label>
                      <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                        formData.subType === 'Others' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <input
                          type="radio"
                          name="subType"
                          value="Others"
                          checked={formData.subType === 'Others'}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-3">Others</span>
                      </label>
                    </>
                  )}
                </div>
                {errors.subType && <p className="text-red-500 text-sm mt-1">{errors.subType}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Document Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2">Document Type</label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="Invoice">Invoice</option>
                  <option value="Bill">Bill</option>
                  <option value="Challan">Challan</option>
                  <option value="Credit Note">Credit Note</option>
                  <option value="Bill of Entry">Bill of Entry</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Document No.</label>
                <input
                  type="text"
                  name="documentNo"
                  value={formData.documentNo}
                  onChange={handleChange}
                  className={errors.documentNo ? errorInputClass : inputClass}
                />
                {errors.documentNo && <p className="text-red-500 text-sm mt-1">{errors.documentNo}</p>}
              </div>
              <div>
                <label className="block mb-2">Document Date</label>
                <input
                  type="date"
                  name="documentDate"
                  value={formData.documentDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Party Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">From</h4>
                <div>
                  <label className="block mb-2">GSTIN</label>
                  <input
                    type="text"
                    name="fromGstin"
                    value={formData.fromGstin}
                    onChange={handleChange}
                    className={errors.fromGstin ? errorInputClass : inputClass}
                    placeholder="Enter GSTIN or URP"
                  />
                  {errors.fromGstin && <p className="text-red-500 text-sm mt-1">{errors.fromGstin}</p>}
                </div>
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="fromName"
                    value={formData.fromName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block mb-2">Address</label>
                  <input
                    type="text"
                    name="fromAddress"
                    value={formData.fromAddress}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">To</h4>
                <div>
                  <label className="block mb-2">GSTIN</label>
                  <input
                    type="text"
                    name="toGstin"
                    value={formData.toGstin}
                    onChange={handleChange}
                    className={errors.toGstin ? errorInputClass : inputClass}
                    placeholder="Enter GSTIN or URP"
                  />
                  {errors.toGstin && <p className="text-red-500 text-sm mt-1">{errors.toGstin}</p>}
                </div>
                <div>
                  <label className="block mb-2">Name</label>
                  <input
                    type="text"
                    name="toName"
                    value={formData.toName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block mb-2">Address</label>
                  <input
                    type="text"
                    name="toAddress"
                    value={formData.toAddress}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Item Details</h3>
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={addItem}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Item
              </button>
            </div>

            {formData.items.map((item, index) => (
              <div key={index} className="border p-4 rounded-md space-y-4">
                <div className="flex justify-between">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">Product Name</label>
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => handleItemChange(index, 'productName', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Description</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">HSN Code</label>
                    <input
                      type="text"
                      value={item.hsnCode}
                      onChange={(e) => handleItemChange(index, 'hsnCode', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Quantity</label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Unit</label>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Value</label>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => handleItemChange(index, 'value', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">CGST Rate (%)</label>
                    <input
                      type="number"
                      value={item.cgstRate}
                      onChange={(e) => handleItemChange(index, 'cgstRate', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">SGST Rate (%)</label>
                    <input
                      type="number"
                      value={item.sgstRate}
                      onChange={(e) => handleItemChange(index, 'sgstRate', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">IGST Rate (%)</label>
                    <input
                      type="number"
                      value={item.igstRate}
                      onChange={(e) => handleItemChange(index, 'igstRate', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Cess Rate (%)</label>
                    <input
                      type="number"
                      value={item.cessRate}
                      onChange={(e) => handleItemChange(index, 'cessRate', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Transporter Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Transport Mode</label>
                <select
                  name="transportMode"
                  value={formData.transportMode}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="Road">Road</option>
                  <option value="Rail">Rail</option>
                  <option value="Ship">Ship</option>
                  <option value="Air">Air</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Distance (KM)</label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className={errors.distance ? errorInputClass : inputClass}
                />
                {errors.distance && <p className="text-red-500 text-sm mt-1">{errors.distance}</p>}
              </div>
              <div>
                <label className="block mb-2">Transporter Name</label>
                <input
                  type="text"
                  name="transporterName"
                  value={formData.transporterName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block mb-2">Transporter ID</label>
                <input
                  type="text"
                  name="transporterId"
                  value={formData.transporterId}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block mb-2">Transporter Doc No.</label>
                <input
                  type="text"
                  name="transporterDocNo"
                  value={formData.transporterDocNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block mb-2">Transporter Doc Date</label>
                <input
                  type="date"
                  name="transporterDocDate"
                  value={formData.transporterDocDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block mb-2">Vehicle No.</label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  className={errors.vehicleNo ? errorInputClass : inputClass}
                  placeholder="Format: AB12AB1234"
                />
                {errors.vehicleNo && <p className="text-red-500 text-sm mt-1">{errors.vehicleNo}</p>}
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
      <h2 className="text-2xl font-bold mb-6">E-way Bill Entry Form</h2>
      {/* {renderStepIndicator()} */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderStepContent()}
        
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-auto"
            >
              Generate E-way Bill
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EWayBill;