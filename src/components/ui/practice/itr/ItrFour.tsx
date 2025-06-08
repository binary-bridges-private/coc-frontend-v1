import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface BusinessIncome {
  scheduleBPValue: string;
}

interface SalaryIncome {
  salary: string;
  perquisites: string;
  profitInLieu: string;
  retirementBenefit: string;
  allowancesExempt: string;
  relief89A: string;
  standardDeduction: string;
  entertainmentAllowance: string;
  professionalTax: string;
}

interface HouseProperty {
  propertyType: string;
  grossRent: string;
  localTaxes: string;
  interestOnBorrowedCapital: string;
  arrearsUnrealizedRent: string;
}

interface OtherSources {
  natureOfIncome: string;
  grossIncome: string;
  familyPensionDeduction: string;
  relief89A: string;
}

interface FormData {
  // Step 1 fields
  firstName: string;
  middleName: string;
  lastName: string;
  pan: string;
  dateOfBirth: string;
  flatDoorBlock: string;
  premisesBuilding: string;
  roadStreetPostOffice: string;
  areaLocality: string;
  townCityDistrict: string;
  state: string;
  country: string;
  pincode: string;
  aadhar: string;
  status: string;
  phoneNumber1: string;
  phoneNumber2: string;
  email1: string;
  email2: string;
  natureOfEmployment: string;
  filingStatus: {
    section: string;
    noticeSection: string;
  };
  revisedReturn: {
    receiptNo: string;
    originalFilingDate: string;
  };
  noticeDetails: {
    dinNoticeNo: string;
    date: string;
  };
  newTaxRegime: {
    opted: string;
    form10IEA: {
      date: string;
      acknowledgmentNo: string;
    };
    optOut: {
      currentYear: boolean;
      currentAY: boolean;
      form10IEA: {
        date: string;
        acknowledgmentNo: string;
      };
    };
  };
  seventhProviso: {
    applicable: boolean;
    conditions: {
      currentAccountDeposit: {
        yes: boolean;
        amount: string;
      };
      foreignTravel: {
        yes: boolean;
        amount: string;
      };
      electricityConsumption: {
        yes: boolean;
        amount: string;
      };
      otherConditions: {
        yes: boolean;
        details: string;
      };
    };
  };
  representativeAssessee: {
    isRepresentative: boolean;
    name: string;
    capacity: string;
    address: string;
    panAadhar: string;
  };

  // Step 2 fields
  businessIncome: BusinessIncome;
  salaryIncome: SalaryIncome;
  houseProperty: HouseProperty;
  otherSources: OtherSources;
  grossTotalIncome: string;

  // Step 3 fields
  deductions: {
    c1: string;  // 80C
    c2: string;  // 80CCC
    c3: string;  // 80CCD(1)
    c4: string;  // 80CCD(1B)
    c5: string;  // 80CCD(2)
    c6: string;  // 80D
    c7: string;  // 80DD
    c8: string;  // 80DDB
    c9: string;  // 80E
    c10: string; // 80EE
    c11: string; // 80EEA
    c12: string; // 80EEB
    c13: string; // 80G
    c14: string; // 80GG
    c15: string; // 80GGC
    c16: string; // 80TTA
    c17: string; // 80TTB
    c18: string; // 80U
    c18a: string; // 80CCH
    c18b: string; // Others
  };
  totalDeductions: string;
  taxableTotalIncome: string;

  // Step 4 fields
  advanceTax: string;
  tds: string;
  selfAssessmentTax: string;

  // Step 4: PART D - TAX COMPUTATIONS AND TAX STATUS
  taxComputation: {
    d1: string; // Tax payable on Total Income
    d2: string; // Rebate u/s 87A
    d3: string; // Tax payable after Rebate
    d4: string; // Health and Education Cess
    d5: string; // Total Tax and Cess
    d6: string; // Relief u/s 89
    d7: string; // Balance Tax after Relief
  };
  interestAndFees: {
    d8: string; // Interest u/s 234A
    d9: string; // Interest u/s 234B
    d10: string; // Interest u/s 234C
    d11: string; // Fee u/s 234F
    d12: string; // Total Tax, Fee & Interest
  };
  taxesPaid: {
    d13: string; // Advance Tax Paid
    d14: string; // Self-Assessment Tax Paid
    d15: string; // TDS Claimed
    d16: string; // TCS Claimed
    d17: string; // Total Taxes Paid
  };
  netTaxPayable: {
    d18: string; // Tax Payable
    d19: string; // Refund
  };
  exemptIncome: {
    d20: {
      type: string;
      amount: string;
    };
  };
  longTermCapitalGains: {
    saleConsideration: string;
    costOfAcquisition: string;
    ltcg: string;
  };
  bankAccounts: Array<{
    ifsc: string;
    bankName: string;
    accountNo: string;
    accountType: string;
    selectedForRefund: boolean;
  }>;
  step5: Step5Data;
  step6: Step6Data;
  step7: Step7Data;
}

interface FormErrors {
  // Step 1 errors
  firstName: string;
  middleName: string;
  lastName: string;
  pan: string;
  dateOfBirth: string;
  flatDoorBlock: string;
  premisesBuilding: string;
  roadStreetPostOffice: string;
  areaLocality: string;
  townCityDistrict: string;
  state: string;
  country: string;
  pincode: string;
  aadhar: string;
  status: string;
  phoneNumber1: string;
  phoneNumber2: string;
  email1: string;
  email2: string;
  natureOfEmployment: string;
  filingStatus: {
    section: string;
    noticeSection: string;
  };

  // Step 2 errors
  businessIncome: BusinessIncome;
  salaryIncome: SalaryIncome;
  houseProperty: HouseProperty;
  otherSources: OtherSources;
  grossTotalIncome: string;

  // Step 3 errors
  deductions: {
    c1: string;
    c2: string;
    c3: string;
    c4: string;
    c5: string;
    c6: string;
    c7: string;
    c8: string;
    c9: string;
    c10: string;
    c11: string;
    c12: string;
    c13: string;
    c14: string;
    c15: string;
    c16: string;
    c17: string;
    c18: string;
    c18a: string;
    c18b: string;
  };
  totalDeductions: string;
  taxableTotalIncome: string;

  // Step 4 errors
  advanceTax: string;
  tds: string;
  selfAssessmentTax: string;

  // Step 4 errors
  taxComputation: {
    d1: string;
    d2: string;
    d3: string;
    d4: string;
    d5: string;
    d6: string;
    d7: string;
  };
  interestAndFees: {
    d8: string;
    d9: string;
    d10: string;
    d11: string;
    d12: string;
  };
  taxesPaid: {
    d13: string;
    d14: string;
    d15: string;
    d16: string;
    d17: string;
  };
  netTaxPayable: {
    d18: string;
    d19: string;
  };
  exemptIncome: {
    d20: {
      type: string;
      amount: string;
    };
  };
  longTermCapitalGains: {
    saleConsideration: string;
    costOfAcquisition: string;
    ltcg: string;
  };
  bankAccounts: Array<{
    ifsc: string;
    bankName: string;
    accountNo: string;
    accountType: string;
    selectedForRefund: string;
  }>;
  step5: {
    business44ad: Business44AD;
    business44ada: Business44ADA;
    goods44ae: {
      items: Array<{
        regNo: string;
        ownership: string;
        tonnage: string;
        monthsHeld: string;
        presumptiveIncome: string;
      }>;
      total: string;
      salaryInterest: string;
      e7: string;
    };
    final: {
      businessIncome: string;
    };
    gst: Array<{
      gstin: string;
      outwardSupply: string;
    }>;
    financial: FinancialParticulars;
  };
  step6: {
    scheduleIT: Array<{
      bsrCode: string;
      depositDate: string;
      challanNo: string;
      taxPaid: string;
    }>;
    scheduleITTotal: string;
    scheduleTCS: Array<{
      accountNo: string;
      collectorName: string;
      amountPaid: string;
      amountClaimed: string;
    }>;
    scheduleTCSTotal: string;
  };
  step7: {
    tds1: Array<{
      tan: string;
      employerName: string;
      salaryIncome: string;
      taxDeducted: string;
    }>;
    tds1Total: string;
    tds2: Array<{
      tan: string;
      section: string;
      panOrAadhaar: string;
      fyDeducted: string;
      tdsBf: string;
      tdsDeducted: string;
      tdsClaimed: string;
      grossAmount: string;
      incomeHead: string;
    }>;
    tds2Total: string;
    d15Total: string;
  };
}

interface Business44AD {
  name: string;
  code: string;
  description: string;
  grossTurnover: string;
  ela: string;
  elb: string;
  elc: string;
  e2a: string;
  e2b: string;
  e2c: string;
}

interface Business44ADA {
  name: string;
  code: string;
  description: string;
  grossReceipts: string;
  e3a: string;
  e3b: string;
  e3c: string;
  e4: string;
}

interface Goods44AE {
  regNo: string;
  ownership: string;
  tonnage: string;
  monthsHeld: string;
  presumptiveIncome: string;
}

interface GSTInfo {
  gstin: string;
  outwardSupply: string;
}

interface FinancialParticulars {
  e11: string;
  e12: string;
  e13: string;
  e14: string;
  e15: string;
  e16: string;
  e17: string;
  e18: string;
  e19: string;
  e20: string;
  e21: string;
  e22: string;
  e23: string;
  e24: string;
  e25: string;
}

interface Step5Data {
  business44ad: Business44AD;
  business44ada: Business44ADA;
  goods44ae: {
    items: Goods44AE[];
    total: string;
    salaryInterest: string;
    e7: string;
  };
  final: {
    businessIncome: string;
  };
  gst: GSTInfo[];
  financial: FinancialParticulars;
}

interface ScheduleITEntry {
  bsrCode: string;
  depositDate: string;
  challanNo: string;
  taxPaid: string;
}

interface ScheduleTCSEntry {
  accountNo: string;
  collectorName: string;
  amountPaid: string;
  amountClaimed: string;
}

interface Step6Data {
  scheduleIT: ScheduleITEntry[];
  scheduleITTotal: string;
  scheduleTCS: ScheduleTCSEntry[];
  scheduleTCSTotal: string;
}

interface TDS1Entry {
  tan: string;
  employerName: string;
  salaryIncome: string;
  taxDeducted: string;
}

interface TDS2Entry {
  tan: string;
  section: string;
  panOrAadhaar: string;
  fyDeducted: string;
  tdsBf: string;
  tdsDeducted: string;
  tdsClaimed: string;
  grossAmount: string;
  incomeHead: string;
}

interface Step7Data {
  tds1: TDS1Entry[];
  tds1Total: string;
  tds2: TDS2Entry[];
  tds2Total: string;
  d15Total: string;
}

const Step5 = ({ formData, setFormData, errors }: { formData: FormData; setFormData: (data: FormData) => void; errors: FormErrors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        [name]: value,
      },
    });
  };

  const handleBusiness44ADChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        business44ad: {
          ...formData.step5.business44ad,
          [name]: value,
        },
      },
    });
  };

  const handleBusiness44ADAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        business44ada: {
          ...formData.step5.business44ada,
          [name]: value,
        },
      },
    });
  };

  const handleGoods44AEChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newItems = [...formData.step5.goods44ae.items];
    newItems[index] = {
      ...newItems[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        goods44ae: {
          ...formData.step5.goods44ae,
          items: newItems,
        },
      },
    });
  };

  const addGoods44AE = () => {
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        goods44ae: {
          ...formData.step5.goods44ae,
          items: [
            ...formData.step5.goods44ae.items,
            {
              regNo: "",
              ownership: "",
              tonnage: "",
              monthsHeld: "",
              presumptiveIncome: "",
            },
          ],
        },
      },
    });
  };

  const removeGoods44AE = (index: number) => {
    const newItems = formData.step5.goods44ae.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        goods44ae: {
          ...formData.step5.goods44ae,
          items: newItems,
        },
      },
    });
  };

  const handleGSTChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newGST = [...formData.step5.gst];
    newGST[index] = {
      ...newGST[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        gst: newGST,
      },
    });
  };

  const addGST = () => {
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        gst: [
          ...formData.step5.gst,
          {
            gstin: "",
            outwardSupply: "",
          },
        ],
      },
    });
  };

  const removeGST = (index: number) => {
    const newGST = formData.step5.gst.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        gst: newGST,
      },
    });
  };

  const handleFinancialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      step5: {
        ...formData.step5,
        financial: {
          ...formData.step5.financial,
          [name]: value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">PART E - BUSINESS INCOME</h3>
        
        {/* Section 44AD - Business Income */}
        <div className="mb-6">
          <h4 className="mb-3 text-base font-medium text-gray-700">Computation under Section 44AD (Business Income)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name of Business</label>
              <input
                type="text"
                name="name"
                value={formData.step5.business44ad.name}
                onChange={handleBusiness44ADChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={formData.step5.business44ad.code}
                onChange={handleBusiness44ADChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={formData.step5.business44ad.description}
                onChange={handleBusiness44ADChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Gross Turnover</label>
              <input
                type="number"
                name="grossTurnover"
                value={formData.step5.business44ad.grossTurnover}
                onChange={handleBusiness44ADChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 44ADA - Professionals */}
        <div className="mb-6">
          <h4 className="mb-3 text-base font-medium text-gray-700">Computation under Section 44ADA (Professionals)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Name of Profession</label>
              <input
                type="text"
                name="name"
                value={formData.step5.business44ada.name}
                onChange={handleBusiness44ADAChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                name="code"
                value={formData.step5.business44ada.code}
                onChange={handleBusiness44ADAChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={formData.step5.business44ada.description}
                onChange={handleBusiness44ADAChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Gross Receipts</label>
              <input
                type="number"
                name="grossReceipts"
                value={formData.step5.business44ada.grossReceipts}
                onChange={handleBusiness44ADAChange}
                className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 44AE - Goods Carriage */}
        <div className="mb-6">
          <h4 className="mb-3 text-base font-medium text-gray-700">Computation under Section 44AE (Goods Carriage)</h4>
          <div className="space-y-4">
            {formData.step5.goods44ae.items.map((item, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Registration No.</label>
                    <input
                      type="text"
                      name="regNo"
                      value={item.regNo}
                      onChange={(e) => handleGoods44AEChange(index, e)}
                      className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Ownership</label>
                    <input
                      type="text"
                      name="ownership"
                      value={item.ownership}
                      onChange={(e) => handleGoods44AEChange(index, e)}
                      className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Tonnage</label>
                    <input
                      type="number"
                      name="tonnage"
                      value={item.tonnage}
                      onChange={(e) => handleGoods44AEChange(index, e)}
                      className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Months Held</label>
                    <input
                      type="number"
                      name="monthsHeld"
                      value={item.monthsHeld}
                      onChange={(e) => handleGoods44AEChange(index, e)}
                      className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeGoods44AE(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGoods44AE}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Goods Carriage
            </button>
          </div>
        </div>

        {/* GST Information */}
        <div className="mb-6">
          <h4 className="mb-3 text-base font-medium text-gray-700">GST Information</h4>
          <div className="space-y-4">
            {formData.step5.gst.map((item, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">GSTIN</label>
                    <input
                      type="text"
                      name="gstin"
                      value={item.gstin}
                      onChange={(e) => handleGSTChange(index, e)}
                      className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Outward Supply</label>
                    <input
                      type="number"
                      name="outwardSupply"
                      value={item.outwardSupply}
                      onChange={(e) => handleGSTChange(index, e)}
                      className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeGST(index)}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addGST}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add GST Entry
            </button>
          </div>
        </div>

        {/* Financial Particulars */}
        <div className="mb-6">
          <h4 className="mb-3 text-base font-medium text-gray-700">Financial Particulars</h4>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.step5.financial).map(([key, value]) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  {key.toUpperCase()}
                </label>
                <input
                  type="number"
                  name={key}
                  value={value}
                  onChange={handleFinancialChange}
                  className="w-full h-10 px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Step6 = ({ formData, setFormData, errors }: { formData: FormData; setFormData: (data: FormData) => void; errors: FormErrors }) => {
  const handleScheduleITChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedScheduleIT = [...formData.step6.scheduleIT];
    updatedScheduleIT[index] = {
      ...updatedScheduleIT[index],
      [name]: value
    };

    // Calculate total
    const total = updatedScheduleIT.reduce((sum, entry) => sum + (parseFloat(entry.taxPaid) || 0), 0);

    setFormData({
      ...formData,
      step6: {
        ...formData.step6,
        scheduleIT: updatedScheduleIT,
        scheduleITTotal: total.toString()
      }
    });
  };

  const handleScheduleTCSChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedScheduleTCS = [...formData.step6.scheduleTCS];
    updatedScheduleTCS[index] = {
      ...updatedScheduleTCS[index],
      [name]: value
    };

    // Calculate total
    const total = updatedScheduleTCS.reduce((sum, entry) => sum + (parseFloat(entry.amountClaimed) || 0), 0);

    setFormData({
      ...formData,
      step6: {
        ...formData.step6,
        scheduleTCS: updatedScheduleTCS,
        scheduleTCSTotal: total.toString()
      }
    });
  };

  const addScheduleITEntry = () => {
    setFormData({
      ...formData,
      step6: {
        ...formData.step6,
        scheduleIT: [
          ...formData.step6.scheduleIT,
          { bsrCode: '', depositDate: '', challanNo: '', taxPaid: '' }
        ]
      }
    });
  };

  const removeScheduleITEntry = (index: number) => {
    const updatedScheduleIT = formData.step6.scheduleIT.filter((_, i) => i !== index);
    const total = updatedScheduleIT.reduce((sum, entry) => sum + (parseFloat(entry.taxPaid) || 0), 0);

    setFormData({
      ...formData,
      step6: {
        ...formData.step6,
        scheduleIT: updatedScheduleIT,
        scheduleITTotal: total.toString()
      }
    });
  };

  const addScheduleTCSEntry = () => {
    setFormData({
      ...formData,
      step6: {
        ...formData.step6,
        scheduleTCS: [
          ...formData.step6.scheduleTCS,
          { accountNo: '', collectorName: '', amountPaid: '', amountClaimed: '' }
        ]
      }
    });
  };

  const removeScheduleTCSEntry = (index: number) => {
    const updatedScheduleTCS = formData.step6.scheduleTCS.filter((_, i) => i !== index);
    const total = updatedScheduleTCS.reduce((sum, entry) => sum + (parseFloat(entry.amountClaimed) || 0), 0);

    setFormData({
      ...formData,
      step6: {
        ...formData.step6,
        scheduleTCS: updatedScheduleTCS,
        scheduleTCSTotal: total.toString()
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule IT — Advance Tax & Self Assessment Tax Payments</h3>
        
        <div className="space-y-4">
          {formData.step6.scheduleIT.map((entry, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">BSR Code</label>
                  <input
                    type="text"
                    name="bsrCode"
                    value={entry.bsrCode}
                    onChange={(e) => handleScheduleITChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={7}
                    pattern="[0-9]{7}"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Date of Deposit</label>
                  <input
                    type="date"
                    name="depositDate"
                    value={entry.depositDate}
                    onChange={(e) => handleScheduleITChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Challan Number</label>
                  <input
                    type="text"
                    name="challanNo"
                    value={entry.challanNo}
                    onChange={(e) => handleScheduleITChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={5}
                    pattern="[0-9]{5}"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Tax Paid (₹)</label>
                  <input
                    type="number"
                    name="taxPaid"
                    value={entry.taxPaid}
                    onChange={(e) => handleScheduleITChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeScheduleITEntry(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addScheduleITEntry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Entry
          </button>

          <div className="p-4 mt-4 bg-white rounded-lg shadow">
            <label className="block mb-1 text-sm font-medium text-gray-700">Total Tax Paid (D13 + D14)</label>
            <input
              type="number"
              value={formData.step6.scheduleITTotal}
              readOnly
              className="w-full h-10 px-3 py-2 text-white bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule TCS — Tax Collected at Source</h3>
        
        <div className="space-y-4">
          {formData.step6.scheduleTCS.map((entry, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Tax Collection Account Number</label>
                  <input
                    type="text"
                    name="accountNo"
                    value={entry.accountNo}
                    onChange={(e) => handleScheduleTCSChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Name of Collector</label>
                  <input
                    type="text"
                    name="collectorName"
                    value={entry.collectorName}
                    onChange={(e) => handleScheduleTCSChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Amount Paid (As per 26AS)</label>
                  <input
                    type="number"
                    name="amountPaid"
                    value={entry.amountPaid}
                    onChange={(e) => handleScheduleTCSChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Amount Claimed</label>
                  <input
                    type="number"
                    name="amountClaimed"
                    value={entry.amountClaimed}
                    onChange={(e) => handleScheduleTCSChange(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeScheduleTCSEntry(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addScheduleTCSEntry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Entry
          </button>

          <div className="p-4 mt-4 bg-white rounded-lg shadow">
            <label className="block mb-1 text-sm font-medium text-gray-700">Total Claimed Amount (D16)</label>
            <input
              type="number"
              value={formData.step6.scheduleTCSTotal}
              readOnly
              className="w-full h-10 px-3 py-2 text-white bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Step7 = ({ formData, setFormData, errors }: { formData: FormData; setFormData: (data: FormData) => void; errors: FormErrors }) => {
  const handleTDS1Change = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedTDS1 = [...formData.step7.tds1];
    updatedTDS1[index] = {
      ...updatedTDS1[index],
      [name]: value
    };

    // Calculate total
    const total = updatedTDS1.reduce((sum, entry) => sum + (parseFloat(entry.taxDeducted) || 0), 0);
    const d15Total = total + (parseFloat(formData.step7.tds2Total) || 0);

    setFormData({
      ...formData,
      step7: {
        ...formData.step7,
        tds1: updatedTDS1,
        tds1Total: total.toString(),
        d15Total: d15Total.toString()
      }
    });
  };

  const handleTDS2Change = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedTDS2 = [...formData.step7.tds2];
    updatedTDS2[index] = {
      ...updatedTDS2[index],
      [name]: value
    };

    // Calculate total
    const total = updatedTDS2.reduce((sum, entry) => sum + (parseFloat(entry.tdsClaimed) || 0), 0);
    const d15Total = total + (parseFloat(formData.step7.tds1Total) || 0);

    setFormData({
      ...formData,
      step7: {
        ...formData.step7,
        tds2: updatedTDS2,
        tds2Total: total.toString(),
        d15Total: d15Total.toString()
      }
    });
  };

  const addTDS1Entry = () => {
    setFormData({
      ...formData,
      step7: {
        ...formData.step7,
        tds1: [
          ...formData.step7.tds1,
          { tan: '', employerName: '', salaryIncome: '', taxDeducted: '' }
        ]
      }
    });
  };

  const removeTDS1Entry = (index: number) => {
    const updatedTDS1 = formData.step7.tds1.filter((_, i) => i !== index);
    const total = updatedTDS1.reduce((sum, entry) => sum + (parseFloat(entry.taxDeducted) || 0), 0);
    const d15Total = total + (parseFloat(formData.step7.tds2Total) || 0);

    setFormData({
      ...formData,
      step7: {
        ...formData.step7,
        tds1: updatedTDS1,
        tds1Total: total.toString(),
        d15Total: d15Total.toString()
      }
    });
  };

  const addTDS2Entry = () => {
    setFormData({
      ...formData,
      step7: {
        ...formData.step7,
        tds2: [
          ...formData.step7.tds2,
          { tan: '', section: '', panOrAadhaar: '', fyDeducted: '', tdsBf: '', tdsDeducted: '', tdsClaimed: '', grossAmount: '', incomeHead: '' }
        ]
      }
    });
  };

  const removeTDS2Entry = (index: number) => {
    const updatedTDS2 = formData.step7.tds2.filter((_, i) => i !== index);
    const total = updatedTDS2.reduce((sum, entry) => sum + (parseFloat(entry.tdsClaimed) || 0), 0);
    const d15Total = total + (parseFloat(formData.step7.tds1Total) || 0);

    setFormData({
      ...formData,
      step7: {
        ...formData.step7,
        tds2: updatedTDS2,
        tds2Total: total.toString(),
        d15Total: d15Total.toString()
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule TDS-1 — Tax Deducted at Source from Salary</h3>
        
        <div className="space-y-4">
          {formData.step7.tds1.map((entry, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">TAN</label>
                  <input
                    type="text"
                    name="tan"
                    value={entry.tan}
                    onChange={(e) => handleTDS1Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={10}
                    pattern="[A-Z]{4}[0-9]{5}[A-Z]{1}"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Name of the Employer</label>
                  <input
                    type="text"
                    name="employerName"
                    value={entry.employerName}
                    onChange={(e) => handleTDS1Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Income under Salary</label>
                  <input
                    type="number"
                    name="salaryIncome"
                    value={entry.salaryIncome}
                    onChange={(e) => handleTDS1Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Tax Deducted</label>
                  <input
                    type="number"
                    name="taxDeducted"
                    value={entry.taxDeducted}
                    onChange={(e) => handleTDS1Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeTDS1Entry(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTDS1Entry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Entry
          </button>

          <div className="p-4 mt-4 bg-white rounded-lg shadow">
            <label className="block mb-1 text-sm font-medium text-gray-700">Total TDS from Salary</label>
            <input
              type="number"
              value={formData.step7.tds1Total}
              readOnly
              className="w-full h-10 px-3 py-2 text-white bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-700">Schedule TDS-2 — Tax Deducted on Income Other than Salary</h3>
        
        <div className="space-y-4">
          {formData.step7.tds2.map((entry, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">TAN of Deductor</label>
                  <input
                    type="text"
                    name="tan"
                    value={entry.tan}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={10}
                    pattern="[A-Z]{4}[0-9]{5}[A-Z]{1}"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Section</label>
                  <input
                    type="text"
                    name="section"
                    value={entry.section}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 194A, 194C, 194N"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">PAN/Aadhaar of Deductor</label>
                  <input
                    type="text"
                    name="panOrAadhaar"
                    value={entry.panOrAadhaar}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Financial Year</label>
                  <input
                    type="text"
                    name="fyDeducted"
                    value={entry.fyDeducted}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="YYYY-YY"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Unclaimed TDS B/F</label>
                  <input
                    type="number"
                    name="tdsBf"
                    value={entry.tdsBf}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">TDS Deducted</label>
                  <input
                    type="number"
                    name="tdsDeducted"
                    value={entry.tdsDeducted}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">TDS Claimed</label>
                  <input
                    type="number"
                    name="tdsClaimed"
                    value={entry.tdsClaimed}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Gross Amount</label>
                  <input
                    type="number"
                    name="grossAmount"
                    value={entry.grossAmount}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">Head of Income</label>
                  <input
                    type="text"
                    name="incomeHead"
                    value={entry.incomeHead}
                    onChange={(e) => handleTDS2Change(index, e)}
                    className="w-full h-10 px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Interest, Rent, Commission"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeTDS2Entry(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTDS2Entry}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Entry
          </button>

          <div className="p-4 mt-4 bg-white rounded-lg shadow">
            <label className="block mb-1 text-sm font-medium text-gray-700">Total TDS Claimed</label>
            <input
              type="number"
              value={formData.step7.tds2Total}
              readOnly
              className="w-full h-10 px-3 py-2 text-white bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          <div className="p-4 mt-4 bg-white rounded-lg shadow">
            <label className="block mb-1 text-sm font-medium text-gray-700">Grand Total (D15)</label>
            <input
              type="number"
              value={formData.step7.d15Total}
              readOnly
              className="w-full h-10 px-3 py-2 text-white bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ItrFour = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    // Step 1: PART A - GENERAL INFORMATION
    firstName: "",
    middleName: "",
    lastName: "",
    pan: "",
    dateOfBirth: "",
    flatDoorBlock: "",
    premisesBuilding: "",
    roadStreetPostOffice: "",
    areaLocality: "",
    townCityDistrict: "",
    state: "",
    country: "",
    pincode: "",
    aadhar: "",
    status: "", // Individual/HUF/Firm
    phoneNumber1: "",
    phoneNumber2: "",
    email1: "",
    email2: "",
    natureOfEmployment: "",
    filingStatus: {
      section: "", // 139(1)/139(4)/139(5)/119(2)(b)
      noticeSection: "", // 139(9)/142(1)/148/153C
    },
    revisedReturn: {
      receiptNo: "",
      originalFilingDate: "",
    },
    noticeDetails: {
      dinNoticeNo: "",
      date: "",
    },
    newTaxRegime: {
      opted: "", // Yes/No/Not Applicable
      form10IEA: {
        date: "",
        acknowledgmentNo: "",
      },
      optOut: {
        currentYear: false,
        currentAY: false,
        form10IEA: {
          date: "",
          acknowledgmentNo: "",
        },
      },
    },
    seventhProviso: {
      applicable: false,
      conditions: {
        currentAccountDeposit: {
          yes: false,
          amount: "",
        },
        foreignTravel: {
          yes: false,
          amount: "",
        },
        electricityConsumption: {
          yes: false,
          amount: "",
        },
        otherConditions: {
          yes: false,
          details: "",
        },
      },
    },
    representativeAssessee: {
      isRepresentative: false,
      name: "",
      capacity: "",
      address: "",
      panAadhar: "",
    },
    
    // Step 2: PART B - GROSS TOTAL INCOME
    businessIncome: {
      scheduleBPValue: "",
    },
    salaryIncome: {
      // B2. Gross Salary Breakdown
      salary: "",
      perquisites: "",
      profitInLieu: "",
      retirementBenefit: "",
      // Allowances/Relief/Deductions
      allowancesExempt: "",
      relief89A: "",
      // Section 16 Deductions
      standardDeduction: "",
      entertainmentAllowance: "",
      professionalTax: "",
    },
    houseProperty: {
      propertyType: "", // Self Occupied/Let Out/Deemed Let Out
      grossRent: "",
      localTaxes: "",
      interestOnBorrowedCapital: "",
      arrearsUnrealizedRent: "",
    },
    otherSources: {
      natureOfIncome: "",
      grossIncome: "",
      familyPensionDeduction: "",
      relief89A: "",
    },
    grossTotalIncome: "", // Auto-calculated: B1 + B2 + B3 + B4
    
    // Step 3: PART C - DEDUCTIONS AND TAXABLE TOTAL INCOME
    deductions: {
      c1: "",
      c2: "",
      c3: "",
      c4: "",
      c5: "",
      c6: "",
      c7: "",
      c8: "",
      c9: "",
      c10: "",
      c11: "",
      c12: "",
      c13: "",
      c14: "",
      c15: "",
      c16: "",
      c17: "",
      c18: "",
      c18a: "",
      c18b: "",
    },
    totalDeductions: "",
    taxableTotalIncome: "",
    
    // Step 4: Tax Details
    advanceTax: "",
    tds: "",
    selfAssessmentTax: "",
    
    // Step 4: PART D - TAX COMPUTATIONS AND TAX STATUS
    taxComputation: {
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      d5: "",
      d6: "",
      d7: "",
    },
    interestAndFees: {
      d8: "",
      d9: "",
      d10: "",
      d11: "",
      d12: "",
    },
    taxesPaid: {
      d13: "",
      d14: "",
      d15: "",
      d16: "",
      d17: "",
    },
    netTaxPayable: {
      d18: "",
      d19: "",
    },
    exemptIncome: {
      d20: {
        type: "",
        amount: "",
      },
    },
    longTermCapitalGains: {
      saleConsideration: "",
      costOfAcquisition: "",
      ltcg: "",
    },
    bankAccounts: [
      {
        ifsc: "",
        bankName: "",
        accountNo: "",
        accountType: "",
        selectedForRefund: false,
      },
      {
        ifsc: "",
        bankName: "",
        accountNo: "",
        accountType: "",
        selectedForRefund: false,
      },
    ],
    step5: {
      business44ad: {
        name: "",
        code: "",
        description: "",
        grossTurnover: "",
        ela: "",
        elb: "",
        elc: "",
        e2a: "",
        e2b: "",
        e2c: "",
      },
      business44ada: {
        name: "",
        code: "",
        description: "",
        grossReceipts: "",
        e3a: "",
        e3b: "",
        e3c: "",
        e4: "",
      },
      goods44ae: {
        items: [],
        total: "",
        salaryInterest: "",
        e7: "",
      },
      final: {
        businessIncome: "",
      },
      gst: [],
      financial: {
        e11: "",
        e12: "",
        e13: "",
        e14: "",
        e15: "",
        e16: "",
        e17: "",
        e18: "",
        e19: "",
        e20: "",
        e21: "",
        e22: "",
        e23: "",
        e24: "",
        e25: "",
      },
    },
    step6: {
      scheduleIT: [{
        bsrCode: '',
        depositDate: '',
        challanNo: '',
        taxPaid: ''
      }],
      scheduleITTotal: '0',
      scheduleTCS: [{
        accountNo: '',
        collectorName: '',
        amountPaid: '',
        amountClaimed: ''
      }],
      scheduleTCSTotal: '0'
    },
    step7: {
      tds1: [{
        tan: '',
        employerName: '',
        salaryIncome: '',
        taxDeducted: ''
      }],
      tds1Total: '0',
      tds2: [{
        tan: '',
        section: '',
        panOrAadhaar: '',
        fyDeducted: '',
        tdsBf: '',
        tdsDeducted: '',
        tdsClaimed: '',
        grossAmount: '',
        incomeHead: ''
      }],
      tds2Total: '0',
      d15Total: '0'
    },
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    middleName: "",
    lastName: "",
    pan: "",
    dateOfBirth: "",
    flatDoorBlock: "",
    premisesBuilding: "",
    roadStreetPostOffice: "",
    areaLocality: "",
    townCityDistrict: "",
    state: "",
    country: "",
    pincode: "",
    aadhar: "",
    status: "",
    phoneNumber1: "",
    phoneNumber2: "",
    email1: "",
    email2: "",
    natureOfEmployment: "",
    filingStatus: {
      section: "",
      noticeSection: "",
    },
    businessIncome: {
      scheduleBPValue: "",
    },
    salaryIncome: {
      salary: "",
      perquisites: "",
      profitInLieu: "",
      retirementBenefit: "",
      allowancesExempt: "",
      relief89A: "",
      standardDeduction: "",
      entertainmentAllowance: "",
      professionalTax: "",
    },
    houseProperty: {
      propertyType: "",
      grossRent: "",
      localTaxes: "",
      interestOnBorrowedCapital: "",
      arrearsUnrealizedRent: "",
    },
    otherSources: {
      natureOfIncome: "",
      grossIncome: "",
      familyPensionDeduction: "",
      relief89A: "",
    },
    grossTotalIncome: "",
    deductions: {
      c1: "",
      c2: "",
      c3: "",
      c4: "",
      c5: "",
      c6: "",
      c7: "",
      c8: "",
      c9: "",
      c10: "",
      c11: "",
      c12: "",
      c13: "",
      c14: "",
      c15: "",
      c16: "",
      c17: "",
      c18: "",
      c18a: "",
      c18b: "",
    },
    totalDeductions: "",
    taxableTotalIncome: "",
    advanceTax: "",
    tds: "",
    selfAssessmentTax: "",
    taxComputation: {
      d1: "",
      d2: "",
      d3: "",
      d4: "",
      d5: "",
      d6: "",
      d7: "",
    },
    interestAndFees: {
      d8: "",
      d9: "",
      d10: "",
      d11: "",
      d12: "",
    },
    taxesPaid: {
      d13: "",
      d14: "",
      d15: "",
      d16: "",
      d17: "",
    },
    netTaxPayable: {
      d18: "",
      d19: "",
    },
    exemptIncome: {
      d20: {
        type: "",
        amount: "",
      },
    },
    longTermCapitalGains: {
      saleConsideration: "",
      costOfAcquisition: "",
      ltcg: "",
    },
    bankAccounts: [
      {
        ifsc: "",
        bankName: "",
        accountNo: "",
        accountType: "",
        selectedForRefund: "",
      },
      {
        ifsc: "",
        bankName: "",
        accountNo: "",
        accountType: "",
        selectedForRefund: "",
      },
    ],
    step5: {
      business44ad: {
        name: "",
        code: "",
        description: "",
        grossTurnover: "",
        ela: "",
        elb: "",
        elc: "",
        e2a: "",
        e2b: "",
        e2c: "",
      },
      business44ada: {
        name: "",
        code: "",
        description: "",
        grossReceipts: "",
        e3a: "",
        e3b: "",
        e3c: "",
        e4: "",
      },
      goods44ae: {
        items: [],
        total: "",
        salaryInterest: "",
        e7: "",
      },
      final: {
        businessIncome: "",
      },
      gst: [],
      financial: {
        e11: "",
        e12: "",
        e13: "",
        e14: "",
        e15: "",
        e16: "",
        e17: "",
        e18: "",
        e19: "",
        e20: "",
        e21: "",
        e22: "",
        e23: "",
        e24: "",
        e25: "",
      },
    },
    step6: {
      scheduleIT: [{
        bsrCode: '',
        depositDate: '',
        challanNo: '',
        taxPaid: ''
      }],
      scheduleITTotal: '',
      scheduleTCS: [{
        accountNo: '',
        collectorName: '',
        amountPaid: '',
        amountClaimed: ''
      }],
      scheduleTCSTotal: ''
    },
    step7: {
      tds1: [{
        tan: '',
        employerName: '',
        salaryIncome: '',
        taxDeducted: ''
      }],
      tds1Total: '',
      tds2: [{
        tan: '',
        section: '',
        panOrAadhaar: '',
        fyDeducted: '',
        tdsBf: '',
        tdsDeducted: '',
        tdsClaimed: '',
        grossAmount: '',
        incomeHead: ''
      }],
      tds2Total: '',
      d15Total: ''
    },
  });

  const calculateGrossTotalIncome = () => {
    // Convert string values to numbers, defaulting to 0 if empty or invalid
    const b1 = parseFloat(formData.businessIncome.scheduleBPValue) || 0;
    
    // Calculate B2 (Salary Income)
    const salary = parseFloat(formData.salaryIncome.salary) || 0;
    const perquisites = parseFloat(formData.salaryIncome.perquisites) || 0;
    const profitInLieu = parseFloat(formData.salaryIncome.profitInLieu) || 0;
    const retirementBenefit = parseFloat(formData.salaryIncome.retirementBenefit) || 0;
    const allowancesExempt = parseFloat(formData.salaryIncome.allowancesExempt) || 0;
    const relief89A = parseFloat(formData.salaryIncome.relief89A) || 0;
    const standardDeduction = parseFloat(formData.salaryIncome.standardDeduction) || 0;
    const entertainmentAllowance = parseFloat(formData.salaryIncome.entertainmentAllowance) || 0;
    const professionalTax = parseFloat(formData.salaryIncome.professionalTax) || 0;
    
    const b2 = salary + perquisites + profitInLieu + retirementBenefit - 
              allowancesExempt - relief89A - standardDeduction - 
              entertainmentAllowance - professionalTax;

    // Calculate B3 (House Property)
    const grossRent = parseFloat(formData.houseProperty.grossRent) || 0;
    const localTaxes = parseFloat(formData.houseProperty.localTaxes) || 0;
    const interestOnBorrowedCapital = parseFloat(formData.houseProperty.interestOnBorrowedCapital) || 0;
    const arrearsUnrealizedRent = parseFloat(formData.houseProperty.arrearsUnrealizedRent) || 0;
    
    const annualValue = grossRent - localTaxes;
    const b3 = annualValue - (annualValue * 0.3) - interestOnBorrowedCapital + arrearsUnrealizedRent;

    // Calculate B4 (Other Sources)
    const grossIncome = parseFloat(formData.otherSources.grossIncome) || 0;
    const familyPensionDeduction = parseFloat(formData.otherSources.familyPensionDeduction) || 0;
    const otherRelief89A = parseFloat(formData.otherSources.relief89A) || 0;
    
    const b4 = grossIncome - familyPensionDeduction - otherRelief89A;

    // Calculate total (BS)
    return {
      total: b1 + b2 + b3 + b4,
      breakdown: {
        b1,
        b2,
        b3,
        b4
      }
    };
  };

  // Memoize the calculation results
  const { total, breakdown } = useMemo(() => calculateGrossTotalIncome(), [
    formData.businessIncome.scheduleBPValue,
    formData.salaryIncome,
    formData.houseProperty,
    formData.otherSources
  ]);

  // Update form data when total changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      grossTotalIncome: total.toFixed(2)
    }));
  }, [total]);

  // Calculate total deductions
  const calculateTotalDeductions = useMemo(() => {
    const total = Object.values(formData.deductions).reduce((sum, value) => {
      return sum + (parseFloat(value) || 0);
    }, 0);
    
    setFormData(prev => ({
      ...prev,
      totalDeductions: total.toFixed(2)
    }));

    return total;
  }, [formData.deductions]);

  // Calculate taxable total income
  useEffect(() => {
    const grossTotalIncome = parseFloat(formData.grossTotalIncome) || 0;
    const totalDeductions = calculateTotalDeductions;
    const taxableIncome = Math.max(0, grossTotalIncome - totalDeductions);
    
    setFormData(prev => ({
      ...prev,
      taxableTotalIncome: taxableIncome.toFixed(2)
    }));
  }, [formData.grossTotalIncome, calculateTotalDeductions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle nested form fields (e.g., "businessIncome.scheduleBPValue")
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const parentObj = prev[parent as keyof FormData] as Record<string, any>;
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        };
      });
      setErrors(prev => {
        const parentObj = prev[parent as keyof FormErrors] as Record<string, any>;
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: ""
          }
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // Recalculate total if any income-related field changes
    if (name.includes('businessIncome') || 
        name.includes('salaryIncome') || 
        name.includes('houseProperty') || 
        name.includes('otherSources')) {
      calculateGrossTotalIncome();
    }
  };

  const validatePan = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan.toUpperCase());
  };

  const validateAadhar = (aadhar: string) => {
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  const validatePincode = (pincode: string) => {
    const pincodeRegex = /^[0-9]{6}$/;
    return pincodeRegex.test(pincode);
  };

  const validateStep = (stepNumber: number) => {
    const newErrors = { ...errors };
    let isValid = true;

    switch (stepNumber) {
      case 1:
        if (!formData.firstName) {
          newErrors.firstName = "First name is required";
          isValid = false;
        }

        if (!formData.lastName) {
          newErrors.lastName = "Last name is required";
          isValid = false;
        }

        if (!formData.pan) {
          newErrors.pan = "PAN is required";
          isValid = false;
        } else if (!validatePan(formData.pan)) {
          newErrors.pan = "Invalid PAN format";
          isValid = false;
        }

        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = "Date of birth is required";
          isValid = false;
        }

        if (!formData.aadhar) {
          newErrors.aadhar = "Aadhar is required";
          isValid = false;
        } else if (!validateAadhar(formData.aadhar)) {
          newErrors.aadhar = "Invalid Aadhar format";
          isValid = false;
        }

        if (!formData.status) {
          newErrors.status = "Status is required";
          isValid = false;
        }

        if (!formData.phoneNumber1) {
          newErrors.phoneNumber1 = "Phone number is required";
          isValid = false;
        }

        if (!formData.email1) {
          newErrors.email1 = "Email is required";
          isValid = false;
        }

        if (!formData.natureOfEmployment) {
          newErrors.natureOfEmployment = "Nature of employment is required";
          isValid = false;
        }

        if (!formData.filingStatus.section) {
          newErrors.filingStatus.section = "Filing status is required";
          isValid = false;
        }

        break;

      case 2:
        if (!formData.businessIncome.scheduleBPValue) {
          newErrors.businessIncome.scheduleBPValue = "Schedule BP value is required";
          isValid = false;
        }

        if (!formData.salaryIncome.salary) {
          newErrors.salaryIncome.salary = "Salary amount is required";
          isValid = false;
        }

        if (!formData.houseProperty.propertyType) {
          newErrors.houseProperty.propertyType = "Property type is required";
          isValid = false;
        }

        if (!formData.otherSources.natureOfIncome) {
          newErrors.otherSources.natureOfIncome = "Nature of income is required";
          isValid = false;
        }

        break;

      case 3:
        if (!formData.deductions.c1) {
          newErrors.deductions.c1 = "80C deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c2) {
          newErrors.deductions.c2 = "80CCC deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c3) {
          newErrors.deductions.c3 = "80CCD(1) deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c4) {
          newErrors.deductions.c4 = "80CCD(1B) deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c5) {
          newErrors.deductions.c5 = "80CCD(2) deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c6) {
          newErrors.deductions.c6 = "80D deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c7) {
          newErrors.deductions.c7 = "80DD deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c8) {
          newErrors.deductions.c8 = "80DDB deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c9) {
          newErrors.deductions.c9 = "80E deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c10) {
          newErrors.deductions.c10 = "80EE deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c11) {
          newErrors.deductions.c11 = "80EEA deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c12) {
          newErrors.deductions.c12 = "80EEB deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c13) {
          newErrors.deductions.c13 = "80G deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c14) {
          newErrors.deductions.c14 = "80GG deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c15) {
          newErrors.deductions.c15 = "80GGC deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c16) {
          newErrors.deductions.c16 = "80TTA deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c17) {
          newErrors.deductions.c17 = "80TTB deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c18) {
          newErrors.deductions.c18 = "80U deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c18a) {
          newErrors.deductions.c18a = "80CCH deduction is required";
          isValid = false;
        }

        if (!formData.deductions.c18b) {
          newErrors.deductions.c18b = "Others deduction is required";
          isValid = false;
        }

        break;

      case 4:
        if (!formData.advanceTax) {
          newErrors.advanceTax = "Advance tax is required";
          isValid = false;
        }

        if (!formData.tds) {
          newErrors.tds = "TDS is required";
          isValid = false;
        }

        if (!formData.selfAssessmentTax) {
          newErrors.selfAssessmentTax = "Self assessment tax is required";
          isValid = false;
        }
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 4) {
        setIsLoading(true);
        try {
          // API call to submit form would go here
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
          navigate("/practice/itr/login");
        } catch (error) {
          setSaveError("Failed to submit form. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "PART A - GENERAL INFORMATION";
      case 2:
        return "PART B - GROSS TOTAL INCOME";
      case 3:
        return "PART C - DEDUCTIONS AND TAXABLE TOTAL INCOME";
      case 4:
        return "PART D - TAX COMPUTATIONS AND TAX STATUS";
      case 5:
        return "PART E - BUSINESS INCOME";
      case 6:
        return "PART F - ADVANCE TAX AND TCS";
      case 7:
        return "PART G - TAX DEDUCTED AT SOURCE";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART A - GENERAL INFORMATION</h3>
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First Name (A1) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Middle Name (A2)
                  </label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last Name (A3) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                </div>
              </div>

              {/* PAN and DOB */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    PAN (A4) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pan ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.pan && <p className="mt-1 text-sm text-red-500">{errors.pan}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date of Birth (A5) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                </div>
              </div>

              {/* Address Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Flat/Door/Block No. (A6) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="flatDoorBlock"
                    value={formData.flatDoorBlock}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.flatDoorBlock ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Name of Premises/Building/Village (A7) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="premisesBuilding"
                    value={formData.premisesBuilding}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.premisesBuilding ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Road/Street/Post Office (A8) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="roadStreetPostOffice"
                    value={formData.roadStreetPostOffice}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.roadStreetPostOffice ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Area/Locality (A9) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="areaLocality"
                    value={formData.areaLocality}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.areaLocality ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Town/City/District (A10) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="townCityDistrict"
                    value={formData.townCityDistrict}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.townCityDistrict ? "border-red-500" : "border-gray-300"}`}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      State (A11) <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.state ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select State</option>
                      {/* Add state options */}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Country (A12) <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.country ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select Country</option>
                      {/* Add country options */}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      PIN Code (A13) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.pincode ? "border-red-500" : "border-gray-300"}`}
                    />
                  </div>
                </div>
              </div>

              {/* Aadhar and Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Aadhar Number (A14) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadhar"
                    value={formData.aadhar}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.aadhar ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.aadhar && <p className="mt-1 text-sm text-red-500">{errors.aadhar}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Status (A15) <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="individual"
                        name="status"
                        value="individual"
                        checked={formData.status === "individual"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="individual" className="ml-2 text-sm font-medium text-gray-700">
                        Individual
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="huf"
                        name="status"
                        value="huf"
                        checked={formData.status === "huf"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="huf" className="ml-2 text-sm font-medium text-gray-700">
                        HUF
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="firm"
                        name="status"
                        value="firm"
                        checked={formData.status === "firm"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="firm" className="ml-2 text-sm font-medium text-gray-700">
                        Firm (other than LLP)
                      </label>
                    </div>
                  </div>
                  {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone No. 1 (A16) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber1"
                    value={formData.phoneNumber1}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.phoneNumber1 ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.phoneNumber1 && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber1}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone No. 2 (A17)
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber2"
                    value={formData.phoneNumber2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address 1 (A18) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email1"
                    value={formData.email1}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.email1 ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email1 && <p className="mt-1 text-sm text-red-500">{errors.email1}</p>}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email Address 2
                  </label>
                  <input
                    type="email"
                    name="email2"
                    value={formData.email2}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Nature of Employment */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Nature of Employment (A19) <span className="text-red-500">*</span>
                </label>
                <select
                  name="natureOfEmployment"
                  value={formData.natureOfEmployment}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.natureOfEmployment ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select Nature of Employment</option>
                  <option value="central_govt">Central Govt.</option>
                  <option value="state_govt">State Govt.</option>
                  <option value="psu">Public Sector Undertaking</option>
                  <option value="pensioner_cg">Pensioners – CG</option>
                  <option value="pensioner_sg">Pensioners – SG</option>
                  <option value="pensioner_psu">Pensioners – PSU</option>
                  <option value="pensioner_others">Pensioners – Others</option>
                  <option value="others">Others</option>
                  <option value="not_applicable">Not Applicable</option>
                </select>
                {errors.natureOfEmployment && <p className="mt-1 text-sm text-red-500">{errors.natureOfEmployment}</p>}
              </div>

              {/* Filing Status */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Filing Status (A20) <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-700">Filed u/s:</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="139_1"
                            name="filingStatus.section"
                            value="139_1"
                            checked={formData.filingStatus.section === "139_1"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="139_1" className="ml-2 text-sm font-medium text-gray-700">
                            139(1) – On or before due date
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="139_4"
                            name="filingStatus.section"
                            value="139_4"
                            checked={formData.filingStatus.section === "139_4"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="139_4" className="ml-2 text-sm font-medium text-gray-700">
                            139(4) – After due date
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="139_5"
                            name="filingStatus.section"
                            value="139_5"
                            checked={formData.filingStatus.section === "139_5"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="139_5" className="ml-2 text-sm font-medium text-gray-700">
                            139(5) – Revised Return
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="119_2b"
                            name="filingStatus.section"
                            value="119_2b"
                            checked={formData.filingStatus.section === "119_2b"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="119_2b" className="ml-2 text-sm font-medium text-gray-700">
                            119(2)(b) – After Condonation of Delay
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-sm font-medium text-gray-700">Filed in response to notice u/s:</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="139_9"
                            name="filingStatus.noticeSection"
                            value="139_9"
                            checked={formData.filingStatus.noticeSection === "139_9"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="139_9" className="ml-2 text-sm font-medium text-gray-700">
                            139(9)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="142_1"
                            name="filingStatus.noticeSection"
                            value="142_1"
                            checked={formData.filingStatus.noticeSection === "142_1"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="142_1" className="ml-2 text-sm font-medium text-gray-700">
                            142(1)
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="148"
                            name="filingStatus.noticeSection"
                            value="148"
                            checked={formData.filingStatus.noticeSection === "148"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="148" className="ml-2 text-sm font-medium text-gray-700">
                            148
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="153C"
                            name="filingStatus.noticeSection"
                            value="153C"
                            checked={formData.filingStatus.noticeSection === "153C"}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor="153C" className="ml-2 text-sm font-medium text-gray-700">
                            153C
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rest of the form fields for A21-A25 */}
              {/* ... Add the remaining fields following the same pattern ... */}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART B - GROSS TOTAL INCOME (Whole Rupees ₹ Only)</h3>
            <div className="space-y-8">
              {/* B1. Income from Business & Profession */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">B1. Income from Business & Profession</h4>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Value from Schedule BP (ES) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="businessIncome.scheduleBPValue"
                    value={formData.businessIncome.scheduleBPValue}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.businessIncome.scheduleBPValue ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.businessIncome.scheduleBPValue && (
                    <p className="mt-1 text-sm text-red-500">{errors.businessIncome.scheduleBPValue}</p>
                  )}
                </div>
              </div>

              {/* B2. Gross Salary Breakdown */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">B2. Gross Salary Breakdown</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Salary as per Section 17(1) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="salaryIncome.salary"
                        value={formData.salaryIncome.salary}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.salaryIncome.salary ? "border-red-500" : "border-gray-300"}`}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Value of Perquisites – Section 17(2)
                      </label>
                      <input
                        type="number"
                        name="salaryIncome.perquisites"
                        value={formData.salaryIncome.perquisites}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Profit in lieu of Salary – Section 17(3)
                      </label>
                      <input
                        type="number"
                        name="salaryIncome.profitInLieu"
                        value={formData.salaryIncome.profitInLieu}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Income from retirement benefit account maintained in a notified country – u/s 89A
                      </label>
                      <input
                        type="number"
                        name="salaryIncome.retirementBenefit"
                        value={formData.salaryIncome.retirementBenefit}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="mb-3 text-sm font-medium text-gray-700">Less: Allowances / Relief / Deductions</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Less: Allowances exempt under Section 10
                        </label>
                        <input
                          type="number"
                          name="salaryIncome.allowancesExempt"
                          value={formData.salaryIncome.allowancesExempt}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Less: Income claimed for relief u/s 89A
                        </label>
                        <input
                          type="number"
                          name="salaryIncome.relief89A"
                          value={formData.salaryIncome.relief89A}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="mb-3 text-sm font-medium text-gray-700">Deductions under Section 16</h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Standard Deduction u/s 16(ia)
                        </label>
                        <input
                          type="number"
                          name="salaryIncome.standardDeduction"
                          value={formData.salaryIncome.standardDeduction}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Entertainment Allowance u/s 16(ii)
                        </label>
                        <input
                          type="number"
                          name="salaryIncome.entertainmentAllowance"
                          value={formData.salaryIncome.entertainmentAllowance}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Professional Tax u/s 16(iii)
                        </label>
                        <input
                          type="number"
                          name="salaryIncome.professionalTax"
                          value={formData.salaryIncome.professionalTax}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* B3. Income from House Property */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">B3. Income from House Property</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Property Type <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="selfOccupied"
                          name="houseProperty.propertyType"
                          value="selfOccupied"
                          checked={formData.houseProperty.propertyType === "selfOccupied"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="selfOccupied" className="ml-2 text-sm font-medium text-gray-700">
                          Self Occupied
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="letOut"
                          name="houseProperty.propertyType"
                          value="letOut"
                          checked={formData.houseProperty.propertyType === "letOut"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="letOut" className="ml-2 text-sm font-medium text-gray-700">
                          Let Out
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="deemedLetOut"
                          name="houseProperty.propertyType"
                          value="deemedLetOut"
                          checked={formData.houseProperty.propertyType === "deemedLetOut"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="deemedLetOut" className="ml-2 text-sm font-medium text-gray-700">
                          Deemed Let Out
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Gross rent received/receivable/lettable value
                      </label>
                      <input
                        type="number"
                        name="houseProperty.grossRent"
                        value={formData.houseProperty.grossRent}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Less: Tax paid to local authorities
                      </label>
                      <input
                        type="number"
                        name="houseProperty.localTaxes"
                        value={formData.houseProperty.localTaxes}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Interest payable on borrowed capital
                      </label>
                      <input
                        type="number"
                        name="houseProperty.interestOnBorrowedCapital"
                        value={formData.houseProperty.interestOnBorrowedCapital}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Arrears/Unrealized Rent received (Less 30%)
                      </label>
                      <input
                        type="number"
                        name="houseProperty.arrearsUnrealizedRent"
                        value={formData.houseProperty.arrearsUnrealizedRent}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="p-3 mt-4 text-sm text-yellow-700 bg-yellow-100 rounded-md">
                    📌 Max. set-off allowed for house property loss: ₹2,00,000.
                    Use ITR-3/5 for carry-forward claims.
                  </div>
                </div>
              </div>

              {/* B4. Income from Other Sources */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">B4. Income from Other Sources</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Nature of Income <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="otherSources.natureOfIncome"
                      value={formData.otherSources.natureOfIncome}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.otherSources.natureOfIncome ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select Nature of Income</option>
                      <option value="savings_interest">Savings Account Interest</option>
                      <option value="fixed_deposit">Fixed Deposit Interest</option>
                      <option value="dividend">Dividend</option>
                      <option value="family_pension">Family Pension</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Gross income from other sources
                      </label>
                      <input
                        type="number"
                        name="otherSources.grossIncome"
                        value={formData.otherSources.grossIncome}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Less: Deduction u/s 57(iia) (Family Pension only)
                      </label>
                      <input
                        type="number"
                        name="otherSources.familyPensionDeduction"
                        value={formData.otherSources.familyPensionDeduction}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Less: Income claimed for relief u/s 89A (if any)
                    </label>
                    <input
                      type="number"
                      name="otherSources.relief89A"
                      value={formData.otherSources.relief89A}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="p-3 mt-4 text-sm text-yellow-700 bg-yellow-100 rounded-md">
                    📌 Fill Schedule TDS2 if applicable.
                  </div>
                </div>
              </div>

              {/* BS. Gross Total Income */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">BS. Gross Total Income</h4>
                <div className="p-4 text-lg font-medium text-gray-700 bg-gray-50 rounded-md">
                  Total (BS): ₹ {total.toFixed(2)}
                </div>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p>Breakdown:</p>
                  <p>B1 (Business Income): ₹ {breakdown.b1.toFixed(2)}</p>
                  <p>B2 (Salary Income): ₹ {breakdown.b2.toFixed(2)}</p>
                  <p>B3 (House Property): ₹ {breakdown.b3.toFixed(2)}</p>
                  <p>B4 (Other Sources): ₹ {breakdown.b4.toFixed(2)}</p>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  = B1 + B2 + B3 + B4
                </p>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART C - DEDUCTIONS AND TAXABLE TOTAL INCOME</h3>
            <div className="space-y-6">
              {/* Section-wise Deductions */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">C1 to C18b: Section-wise Deductions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C1 - 80C (Life Insurance Premium, PPF, ELSS etc.)
                    </label>
                    <input
                      type="number"
                      name="deductions.c1"
                      value={formData.deductions.c1}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C2 - 80CCC (Pension Funds – LIC, etc.)
                    </label>
                    <input
                      type="number"
                      name="deductions.c2"
                      value={formData.deductions.c2}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C3 - 80CCD(1) (Employee's contribution to NPS)
                    </label>
                    <input
                      type="number"
                      name="deductions.c3"
                      value={formData.deductions.c3}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C4 - 80CCD(1B) (Additional NPS contribution up to ₹50,000)
                    </label>
                    <input
                      type="number"
                      name="deductions.c4"
                      value={formData.deductions.c4}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C5 - 80CCD(2) (Employer's contribution to NPS)
                    </label>
                    <input
                      type="number"
                      name="deductions.c5"
                      value={formData.deductions.c5}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C6 - 80D (Medical Insurance Premium - Self, Family, Parents)
                    </label>
                    <input
                      type="number"
                      name="deductions.c6"
                      value={formData.deductions.c6}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C7 - 80DD (Maintenance of disabled dependent)
                    </label>
                    <input
                      type="number"
                      name="deductions.c7"
                      value={formData.deductions.c7}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C8 - 80DDB (Medical expenses for specified diseases)
                    </label>
                    <input
                      type="number"
                      name="deductions.c8"
                      value={formData.deductions.c8}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C9 - 80E (Interest on Education Loan)
                    </label>
                    <input
                      type="number"
                      name="deductions.c9"
                      value={formData.deductions.c9}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C10 - 80EE (Interest on Home Loan - First-time buyer)
                    </label>
                    <input
                      type="number"
                      name="deductions.c10"
                      value={formData.deductions.c10}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C11 - 80EEA (Interest on Home Loan for affordable housing)
                    </label>
                    <input
                      type="number"
                      name="deductions.c11"
                      value={formData.deductions.c11}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C12 - 80EEB (Interest on Loan for Electric Vehicle)
                    </label>
                    <input
                      type="number"
                      name="deductions.c12"
                      value={formData.deductions.c12}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C13 - 80G (Donations to charitable institutions)
                    </label>
                    <input
                      type="number"
                      name="deductions.c13"
                      value={formData.deductions.c13}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C14 - 80GG (Rent paid - if HRA not received)
                    </label>
                    <input
                      type="number"
                      name="deductions.c14"
                      value={formData.deductions.c14}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C15 - 80GGC (Donations to Political Parties)
                    </label>
                    <input
                      type="number"
                      name="deductions.c15"
                      value={formData.deductions.c15}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C16 - 80TTA (Interest from savings bank accounts)
                    </label>
                    <input
                      type="number"
                      name="deductions.c16"
                      value={formData.deductions.c16}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C17 - 80TTB (Interest on deposits - Senior Citizens)
                    </label>
                    <input
                      type="number"
                      name="deductions.c17"
                      value={formData.deductions.c17}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C18 - 80U (Deduction for a person with disability)
                    </label>
                    <input
                      type="number"
                      name="deductions.c18"
                      value={formData.deductions.c18}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C18a - 80CCH (Deduction for Agniveer Corpus Fund)
                    </label>
                    <input
                      type="number"
                      name="deductions.c18a"
                      value={formData.deductions.c18a}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      C18b - Others (Any other deductions)
                    </label>
                    <input
                      type="number"
                      name="deductions.c18b"
                      value={formData.deductions.c18b}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Total Deductions */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">C19. Total Deductions</h4>
                <div className="p-4 text-lg font-medium text-gray-700 bg-gray-50 rounded-md">
                  Total Deduction (C19): ₹ {formData.totalDeductions}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Sum of C1 to C18b
                </p>
              </div>

              {/* Taxable Total Income */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">C20. Taxable Total Income</h4>
                <div className="p-4 text-lg font-medium text-gray-700 bg-gray-50 rounded-md">
                  Taxable Income (C20): ₹ {formData.taxableTotalIncome}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Gross Total Income (BS from Part B) – Total Deductions (C19)
                </p>
              </div>

              <div className="p-3 mt-4 text-sm text-yellow-700 bg-yellow-100 rounded-md">
                📌 Refer to instructions for deduction limits under Income-tax Act
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">PART D - TAX COMPUTATIONS AND TAX STATUS</h3>
            <div className="space-y-6">
              {/* D1 to D7: Basic Tax Computation */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">D1 to D7: Basic Tax Computation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D1 - Tax payable on Total Income (from C20)
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d1"
                      value={formData.taxComputation.d1}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D2 - Rebate u/s 87A (if applicable)
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d2"
                      value={formData.taxComputation.d2}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D3 - Tax payable after Rebate (D1 - D2)
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d3"
                      value={formData.taxComputation.d3}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D4 - Health and Education Cess @ 4% on D3
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d4"
                      value={formData.taxComputation.d4}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D5 - Total Tax and Cess (D3 + D4)
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d5"
                      value={formData.taxComputation.d5}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D6 - Relief u/s 89 (Form 10E to be submitted to claim)
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d6"
                      value={formData.taxComputation.d6}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D7 - Balance Tax after Relief (D5 - D6)
                    </label>
                    <input
                      type="number"
                      name="taxComputation.d7"
                      value={formData.taxComputation.d7}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* D8 to D12: Interest & Fees */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">D8 to D12: Interest & Fees</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D8 - Interest u/s 234A (Late filing)
                    </label>
                    <input
                      type="number"
                      name="interestAndFees.d8"
                      value={formData.interestAndFees.d8}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D9 - Interest u/s 234B (Default in Advance Tax)
                    </label>
                    <input
                      type="number"
                      name="interestAndFees.d9"
                      value={formData.interestAndFees.d9}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D10 - Interest u/s 234C (Deferment of Advance Tax)
                    </label>
                    <input
                      type="number"
                      name="interestAndFees.d10"
                      value={formData.interestAndFees.d10}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D11 - Fee u/s 234F (Late filing fee)
                    </label>
                    <input
                      type="number"
                      name="interestAndFees.d11"
                      value={formData.interestAndFees.d11}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D12 - Total Tax, Fee & Interest (D7 + D8 + D9 + D10 + D11)
                    </label>
                    <input
                      type="number"
                      name="interestAndFees.d12"
                      value={formData.interestAndFees.d12}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* D13 to D17: Taxes Paid Summary */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">D13 to D17: Taxes Paid Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D13 - Advance Tax Paid
                    </label>
                    <input
                      type="number"
                      name="taxesPaid.d13"
                      value={formData.taxesPaid.d13}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D14 - Self-Assessment Tax Paid
                    </label>
                    <input
                      type="number"
                      name="taxesPaid.d14"
                      value={formData.taxesPaid.d14}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D15 - TDS Claimed (Sch-TDS1 Col 4 + Sch-TDS2 Col 6)
                    </label>
                    <input
                      type="number"
                      name="taxesPaid.d15"
                      value={formData.taxesPaid.d15}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D16 - TCS Claimed (Schedule-TCS Column 5)
                    </label>
                    <input
                      type="number"
                      name="taxesPaid.d16"
                      value={formData.taxesPaid.d16}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D17 - Total Taxes Paid (D13 + D14 + D15 + D16)
                    </label>
                    <input
                      type="number"
                      name="taxesPaid.d17"
                      value={formData.taxesPaid.d17}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* D18–D19: Net Tax Payable or Refund */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">D18–D19: Net Tax Payable or Refund</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D18 - Tax Payable (D12 - D17), if D12 {'>'} D17
                    </label>
                    <input
                      type="number"
                      name="netTaxPayable.d18"
                      value={formData.netTaxPayable.d18}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      D19 - Refund (D17 - D12), if D17 {'>'} D12
                    </label>
                    <input
                      type="number"
                      name="netTaxPayable.d19"
                      value={formData.netTaxPayable.d19}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* D20: Exempt Income */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">D20: Exempt Income</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Type of Income (Dropdown for Section/Clause)
                    </label>
                    <select
                      name="exemptIncome.d20.type"
                      value={formData.exemptIncome.d20.type}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="dividends">Dividends</option>
                      <option value="agricultural">Agricultural Income</option>
                      <option value="other">Other Exempt Income</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      name="exemptIncome.d20.amount"
                      value={formData.exemptIncome.d20.amount}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="p-3 mt-4 text-sm text-yellow-700 bg-yellow-100 rounded-md">
                  <p>📌 If agricultural income {'>'} ₹5,000, file ITR-3 or ITR-5.</p>
                </div>
              </div>

              {/* D21: Long-Term Capital Gains */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">D21: Long-Term Capital Gains (Sec 112A)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      i. Total sale consideration
                    </label>
                    <input
                      type="number"
                      name="longTermCapitalGains.saleConsideration"
                      value={formData.longTermCapitalGains.saleConsideration}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      ii. Total cost of acquisition
                    </label>
                    <input
                      type="number"
                      name="longTermCapitalGains.costOfAcquisition"
                      value={formData.longTermCapitalGains.costOfAcquisition}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      iii. LTCG as per Sec 112A (i - ii)
                    </label>
                    <input
                      type="number"
                      name="longTermCapitalGains.ltcg"
                      value={formData.longTermCapitalGains.ltcg}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Account Details */}
              <div className="p-4 bg-white rounded-lg shadow">
                <h4 className="mb-4 text-md font-semibold text-gray-700">Bank Account Details (Mandatory)</h4>
                <div className="space-y-4">
                  {formData.bankAccounts.map((account, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          IFSC Code
                        </label>
                        <input
                          type="text"
                          name={`bankAccounts.${index}.ifsc`}
                          value={account.ifsc}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Bank Name
                        </label>
                        <input
                          type="text"
                          name={`bankAccounts.${index}.bankName`}
                          value={account.bankName}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Account No.
                        </label>
                        <input
                          type="text"
                          name={`bankAccounts.${index}.accountNo`}
                          value={account.accountNo}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Account Type
                        </label>
                        <select
                          name={`bankAccounts.${index}.accountType`}
                          value={account.accountType}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Type</option>
                          <option value="savings">Savings</option>
                          <option value="current">Current</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name={`bankAccounts.${index}.selectedForRefund`}
                          checked={account.selectedForRefund}
                          onChange={(e) => {
                            const newAccounts = [...formData.bankAccounts];
                            newAccounts[index].selectedForRefund = e.target.checked;
                            setFormData(prev => ({
                              ...prev,
                              bankAccounts: newAccounts
                            }));
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">
                          Selected for Refund
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 mt-4 text-sm text-yellow-700 bg-yellow-100 rounded-md">
                  <p>📌 All bank accounts (except dormant) must be reported.</p>
                  <p>📌 At least one account must be selected for refund.</p>
                  <p>📌 CPC may credit refund to any one of the validated accounts.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return <Step5 formData={formData} setFormData={setFormData} errors={errors} />;
      case 6:
        return <Step6 formData={formData} setFormData={setFormData} errors={errors} />;
      case 7:
        return <Step7 formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="p-4 mt-4 text-lg text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md">
        Please do not refresh otherwise the progress will be lost!
      </div>

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
          <li className="text-gray-500">ITR-4</li>
        </ul>
      </div>

      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{getStepTitle(step)}</h2>
          <div className="text-sm text-white">Step {step} of 7</div>
        </div>
      </div>

      <div className="w-[60%] mb-20 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {renderStep()}
         <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={handlePreviousStep}
            className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
          >
            Previous
          </button>
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

export default ItrFour;