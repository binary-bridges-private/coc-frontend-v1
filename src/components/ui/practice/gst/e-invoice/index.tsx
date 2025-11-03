import React, { useState, useEffect } from 'react';

interface EInvoiceFormData {
  invoiceType: 'Regular' | 'SEZ' | 'Export' | 'Deemed Export';
  documentType: 'Invoice' | 'Credit Note' | 'Debit Note';
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
  paymentDetails: {
    paymentMode: 'Cash' | 'Credit' | 'UPI' | 'Bank Transfer';
    paymentDueDate: string;
    paymentTerms: string;
  };
  additionalDetails: {
    placeOfSupply: string;
    reverseCharge: boolean;
    ecommerceOperator: boolean;
    exportType: string;
    invoiceValue: string;
    taxableValue: string;
    cgstAmount: string;
    sgstAmount: string;
    igstAmount: string;
    cessAmount: string;
    totalAmount: string;
  };
}

const EInvoice: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<EInvoiceFormData>({
    invoiceType: 'Regular',
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
    paymentDetails: {
      paymentMode: 'Cash',
      paymentDueDate: '',
      paymentTerms: ''
    },
    additionalDetails: {
      placeOfSupply: '',
      reverseCharge: false,
      ecommerceOperator: false,
      exportType: '',
      invoiceValue: '',
      taxableValue: '',
      cgstAmount: '',
      sgstAmount: '',
      igstAmount: '',
      cessAmount: '',
      totalAmount: ''
    }
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EInvoiceFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EInvoiceFormData, boolean>>>({});

  const inputClass = "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500";
  const errorInputClass = `${inputClass} border-red-500`;
  const selectClass = `${inputClass} bg-white`;

  const validateField = (name: keyof EInvoiceFormData, value: any): string => {
    if (name === 'items') return '';

    const requiredFields: (keyof EInvoiceFormData)[] = [
      'invoiceType',
      'documentType',
      'documentNo',
      'documentDate',
      'fromGstin',
      'fromName',
      'fromAddress',
      'toGstin',
      'toName',
      'toAddress'
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
      case 'paymentDetails':
        if (!value.paymentMode) return 'Payment Mode is required';
        if (value.paymentMode === 'Credit' && !value.paymentDueDate) return 'Payment Due Date is required for Credit';
        return '';
      case 'additionalDetails':
        if (!value.placeOfSupply) return 'Place of Supply is required';
        if (formData.invoiceType === 'Export' && !value.exportType) return 'Export Type is required';
        if (!value.invoiceValue || isNaN(Number(value.invoiceValue))) return 'Invalid Invoice Value';
        if (!value.taxableValue || isNaN(Number(value.taxableValue))) return 'Invalid Taxable Value';
        return '';
      default:
        return '';
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof EInvoiceFormData, string>> = {};
    let isValid = true;

    switch (step) {
      case 1:
        if (!formData.invoiceType) {
          newErrors.invoiceType = 'Invoice Type is required';
          isValid = false;
        }
        if (!formData.documentType) {
          newErrors.documentType = 'Document Type is required';
          isValid = false;
        }
        break;

      case 2:
        if (!formData.documentNo) {
          newErrors.documentNo = 'Document Number is required';
          isValid = false;
        }
        if (!formData.documentDate) {
          newErrors.documentDate = 'Document Date is required';
          isValid = false;
        }
        if (formData.documentNo && formData.documentNo.length > 16) {
          newErrors.documentNo = 'Max 16 characters allowed';
          isValid = false;
        }
        break;

      case 3:
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
        if (formData.fromGstin && !/^[0-9A-Z]{15}$/.test(formData.fromGstin)) {
          newErrors.fromGstin = 'Invalid GSTIN format';
          isValid = false;
        }
        if (formData.toGstin && !/^[0-9A-Z]{15}$/.test(formData.toGstin)) {
          newErrors.toGstin = 'Invalid GSTIN format';
          isValid = false;
        }
        break;

      case 4:
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
        const hasValidNumericFields = formData.items.every(item => {
          const quantity = parseFloat(item.quantity);
          const value = parseFloat(item.value);
          const cgstRate = parseFloat(item.cgstRate);
          const sgstRate = parseFloat(item.sgstRate);
          const igstRate = parseFloat(item.igstRate);
          const cessRate = parseFloat(item.cessRate);

          return !isNaN(quantity) && !isNaN(value) && 
                 (isNaN(cgstRate) || cgstRate >= 0) &&
                 (isNaN(sgstRate) || sgstRate >= 0) &&
                 (isNaN(igstRate) || igstRate >= 0) &&
                 (isNaN(cessRate) || cessRate >= 0);
        });
        if (!hasValidNumericFields) {
          newErrors.items = 'Invalid numeric values in items';
          isValid = false;
        }
        break;

      case 5:
        if (!formData.paymentDetails.paymentMode) {
          newErrors.paymentDetails = 'Payment Mode is required';
          isValid = false;
        }
        if (formData.paymentDetails.paymentMode === 'Credit' && !formData.paymentDetails.paymentDueDate) {
          newErrors.paymentDetails = 'Payment Due Date is required for Credit';
          isValid = false;
        }
        if (!formData.additionalDetails.placeOfSupply) {
          newErrors.additionalDetails = 'Place of Supply is required';
          isValid = false;
        }
        if (formData.invoiceType === 'Export' && !formData.additionalDetails.exportType) {
          newErrors.additionalDetails = 'Export Type is required for Export invoices';
          isValid = false;
        }
        if (!formData.additionalDetails.invoiceValue || isNaN(Number(formData.additionalDetails.invoiceValue))) {
          newErrors.additionalDetails = 'Invalid Invoice Value';
          isValid = false;
        }
        if (!formData.additionalDetails.taxableValue || isNaN(Number(formData.additionalDetails.taxableValue))) {
          newErrors.additionalDetails = 'Invalid Taxable Value';
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    setErrors(prev => ({
      ...prev,
      [name]: validateField(name as keyof EInvoiceFormData, value)
    }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));

    // Validate numeric fields
    if (['quantity', 'value', 'cgstRate', 'sgstRate', 'igstRate', 'cessRate'].includes(field)) {
      const numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        setErrors(prev => ({
          ...prev,
          items: 'Invalid numeric value'
        }));
      }
    }
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
            <h3 className="text-xl font-semibold mb-4">Invoice Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-3 font-medium">Invoice Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.invoiceType === 'Regular' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="invoiceType"
                      value="Regular"
                      checked={formData.invoiceType === 'Regular'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Regular</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.invoiceType === 'SEZ' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="invoiceType"
                      value="SEZ"
                      checked={formData.invoiceType === 'SEZ'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">SEZ</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.invoiceType === 'Export' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="invoiceType"
                      value="Export"
                      checked={formData.invoiceType === 'Export'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Export</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.invoiceType === 'Deemed Export' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="invoiceType"
                      value="Deemed Export"
                      checked={formData.invoiceType === 'Deemed Export'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Deemed Export</span>
                  </label>
                </div>
                {errors.invoiceType && <p className="text-red-500 text-sm mt-1">{errors.invoiceType}</p>}
              </div>

              <div>
                <label className="block mb-3 font-medium">Document Type</label>
                <div className="grid grid-cols-3 gap-4">
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.documentType === 'Invoice' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="documentType"
                      value="Invoice"
                      checked={formData.documentType === 'Invoice'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Invoice</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.documentType === 'Credit Note' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="documentType"
                      value="Credit Note"
                      checked={formData.documentType === 'Credit Note'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Credit Note</span>
                  </label>
                  <label className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.documentType === 'Debit Note' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="documentType"
                      value="Debit Note"
                      checked={formData.documentType === 'Debit Note'}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3">Debit Note</span>
                  </label>
                </div>
                {errors.documentType && <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Document Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Document No.</label>
                <input
                  type="text"
                  name="documentNo"
                  value={formData.documentNo}
                  onChange={handleChange}
                  className={errors.documentNo ? errorInputClass : inputClass}
                  maxLength={16}
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
                  className={errors.documentDate ? errorInputClass : inputClass}
                />
                {errors.documentDate && <p className="text-red-500 text-sm mt-1">{errors.documentDate}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">From Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">From GSTIN</label>
                <input
                  type="text"
                  name="fromGstin"
                  value={formData.fromGstin}
                  onChange={handleChange}
                  className={errors.fromGstin ? errorInputClass : inputClass}
                />
                {errors.fromGstin && <p className="text-red-500 text-sm mt-1">{errors.fromGstin}</p>}
              </div>
              <div>
                <label className="block mb-2">From Name</label>
                <input
                  type="text"
                  name="fromName"
                  value={formData.fromName}
                  onChange={handleChange}
                  className={errors.fromName ? errorInputClass : inputClass}
                />
                {errors.fromName && <p className="text-red-500 text-sm mt-1">{errors.fromName}</p>}
              </div>
              <div>
                <label className="block mb-2">From Address</label>
                <textarea
                  name="fromAddress"
                  value={formData.fromAddress}
                  onChange={handleChange}
                  className={errors.fromAddress ? errorInputClass : inputClass}
                />
                {errors.fromAddress && <p className="text-red-500 text-sm mt-1">{errors.fromAddress}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Item Details</h3>
            {errors.items && <p className="text-red-500 text-sm mb-4">{errors.items}</p>}
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
                      min="0"
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
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">CGST Rate (%)</label>
                    <input
                      type="number"
                      value={item.cgstRate}
                      onChange={(e) => handleItemChange(index, 'cgstRate', e.target.value)}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">SGST Rate (%)</label>
                    <input
                      type="number"
                      value={item.sgstRate}
                      onChange={(e) => handleItemChange(index, 'sgstRate', e.target.value)}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">IGST Rate (%)</label>
                    <input
                      type="number"
                      value={item.igstRate}
                      onChange={(e) => handleItemChange(index, 'igstRate', e.target.value)}
                      className={inputClass}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Cess Rate (%)</label>
                    <input
                      type="number"
                      value={item.cessRate}
                      onChange={(e) => handleItemChange(index, 'cessRate', e.target.value)}
                      className={inputClass}
                      min="0"
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
            <h3 className="text-lg font-medium">Payment & Additional Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Mode</label>
                <select
                  name="paymentDetails.paymentMode"
                  value={formData.paymentDetails.paymentMode}
                  onChange={handleChange}
                  className={errors.paymentDetails ? errorInputClass : selectClass}
                >
                  <option value="">Select Payment Mode</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                </select>
                {errors.paymentDetails && <p className="mt-1 text-sm text-red-600">{errors.paymentDetails}</p>}
              </div>

              {formData.paymentDetails.paymentMode === 'Credit' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Due Date</label>
                  <input
                    type="date"
                    name="paymentDetails.paymentDueDate"
                    value={formData.paymentDetails.paymentDueDate}
                    onChange={handleChange}
                    className={errors.paymentDetails ? errorInputClass : inputClass}
                  />
                  {errors.paymentDetails && <p className="mt-1 text-sm text-red-600">{errors.paymentDetails}</p>}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
                <input
                  type="text"
                  name="paymentDetails.paymentTerms"
                  value={formData.paymentDetails.paymentTerms}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Enter payment terms"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Place of Supply</label>
                <input
                  type="text"
                  name="additionalDetails.placeOfSupply"
                  value={formData.additionalDetails.placeOfSupply}
                  onChange={handleChange}
                  className={errors.additionalDetails ? errorInputClass : inputClass}
                  placeholder="Enter place of supply"
                />
                {errors.additionalDetails && <p className="mt-1 text-sm text-red-600">{errors.additionalDetails}</p>}
              </div>

              {formData.invoiceType === 'Export' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Export Type</label>
                  <select
                    name="additionalDetails.exportType"
                    value={formData.additionalDetails.exportType}
                    onChange={handleChange}
                    className={errors.additionalDetails ? errorInputClass : selectClass}
                  >
                    <option value="">Select Export Type</option>
                    <option value="WOP">WOP</option>
                    <option value="WPAY">WPAY</option>
                  </select>
                  {errors.additionalDetails && <p className="mt-1 text-sm text-red-600">{errors.additionalDetails}</p>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Taxable Values</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Taxable Value:</span>
                    <span className="text-sm font-medium">₹{formData.additionalDetails.taxableValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CGST Amount:</span>
                    <span className="text-sm font-medium">₹{formData.additionalDetails.cgstAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">SGST Amount:</span>
                    <span className="text-sm font-medium">₹{formData.additionalDetails.sgstAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">IGST Amount:</span>
                    <span className="text-sm font-medium">₹{formData.additionalDetails.igstAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cess Amount:</span>
                    <span className="text-sm font-medium">₹{formData.additionalDetails.cessAmount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Total Amount</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Invoice Value:</span>
                    <span className="text-sm font-medium">₹{formData.additionalDetails.invoiceValue}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Total Amount:</span>
                    <span className="text-sm font-bold">₹{formData.additionalDetails.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="additionalDetails.reverseCharge"
                  checked={formData.additionalDetails.reverseCharge}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Reverse Charge</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="additionalDetails.ecommerceOperator"
                  checked={formData.additionalDetails.ecommerceOperator}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">E-commerce Operator</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // TODO: Implement form submission logic
      console.log('Form submitted:', formData);
    }
  };

  const calculateTaxAmounts = () => {
    let totalTaxableValue = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    let totalCess = 0;

    formData.items.forEach(item => {
      const value = parseFloat(item.value) || 0;
      const cgstRate = parseFloat(item.cgstRate) || 0;
      const sgstRate = parseFloat(item.sgstRate) || 0;
      const igstRate = parseFloat(item.igstRate) || 0;
      const cessRate = parseFloat(item.cessRate) || 0;

      totalTaxableValue += value;
      totalCGST += (value * cgstRate) / 100;
      totalSGST += (value * sgstRate) / 100;
      totalIGST += (value * igstRate) / 100;
      totalCess += (value * cessRate) / 100;
    });

    const totalAmount = totalTaxableValue + totalCGST + totalSGST + totalIGST + totalCess;

    setFormData(prev => ({
      ...prev,
      additionalDetails: {
        ...prev.additionalDetails,
        taxableValue: totalTaxableValue.toFixed(2),
        cgstAmount: totalCGST.toFixed(2),
        sgstAmount: totalSGST.toFixed(2),
        igstAmount: totalIGST.toFixed(2),
        cessAmount: totalCess.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      }
    }));
  };

  useEffect(() => {
    calculateTaxAmounts();
  }, [formData.items]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">E-Invoice Entry Form</h2>
      {renderStepIndicator()}
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
              Generate E-Invoice
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EInvoice;