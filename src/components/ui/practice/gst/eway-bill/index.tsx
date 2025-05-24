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

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EWayBillFormData, string>> = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const fieldName = key as keyof EWayBillFormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Implement form submission logic
      console.log('Form submitted:', formData);
    }
  };

  const inputClass = "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500";
  const errorInputClass = `${inputClass} border-red-500`;
  const selectClass = `${inputClass} bg-white`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">E-way Bill Entry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type */}
        <div>
          <label className="block mb-2">Transaction Type</label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="Outward">Outward</option>
            <option value="Inward">Inward</option>
          </select>
        </div>

        {/* Sub-type */}
        <div>
          <label className="block mb-2">Sub-type</label>
          <select
            name="subType"
            value={formData.subType}
            onChange={handleChange}
            className={selectClass}
          >
            {formData.transactionType === 'Outward' ? (
              <>
                <option value="Supply">Supply</option>
                <option value="Export">Export</option>
                <option value="Job Work">Job Work</option>
                <option value="SKD/CKD">SKD/CKD</option>
              </>
            ) : (
              <>
                <option value="Supply">Supply</option>
                <option value="Import">Import</option>
                <option value="Job Work">Job Work</option>
                <option value="SKD/CKD">SKD/CKD</option>
              </>
            )}
          </select>
        </div>

        {/* Document Details */}
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

        {/* From/To Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">From</h3>
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
            <h3 className="font-semibold">To</h3>
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

        {/* Item Details */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Item Details</h3>
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

        {/* Transporter Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Transporter Details</h3>
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Generate E-way Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default EWayBill;