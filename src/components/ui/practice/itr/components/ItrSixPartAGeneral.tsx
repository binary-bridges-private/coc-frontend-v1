import React from 'react';

interface CompanyInfo {
  companyName: string;
  pan: string;
  cin: string;
  registrationNumber: string;
  dateOfIncorporation: string;
  companyType: string;
  businessNature: string;
  registeredOffice: string;
  email: string;
  phone: string;
  website: string;
  authorizedCapital: number;
  paidUpCapital: number;
  financialYear: string;
  assessmentYear: string;
}

interface FilingInfo {
  filingStatus: string;
  filingReason: string;
  originalReturnDate: string;
  noticeDIN: string;
  noticeDate: string;
  receiptNo: string;
  isRevisedReturn: boolean;
  isBelatedReturn: boolean;
  isDefectiveReturn: boolean;
  isFirstReturn: boolean;
}

interface AuditInfo {
  isAuditRequired: boolean;
  auditReportDate: string;
  auditorName: string;
  auditorPAN: string;
  auditorMembershipNo: string;
  auditFirmName: string;
  auditFirmPAN: string;
  auditUDIN: string;
  hasAdverseRemarks: boolean;
  adverseRemarksDetails: string;
  isTaxAuditRequired: boolean;
  taxAuditReportDate: string;
  taxAuditorName: string;
  taxAuditorPAN: string;
}

interface ItrSixPartAGeneralProps {
  companyInfo: CompanyInfo;
  filingInfo: FilingInfo;
  auditInfo: AuditInfo;
  onUpdateCompanyInfo: (field: keyof CompanyInfo, value: string | number) => void;
  onUpdateFilingInfo: (field: keyof FilingInfo, value: string | boolean) => void;
  onUpdateAuditInfo: (field: keyof AuditInfo, value: string | boolean) => void;
}

const ItrSixPartAGeneral: React.FC<ItrSixPartAGeneralProps> = ({
  companyInfo,
  filingInfo,
  auditInfo,
  onUpdateCompanyInfo,
  onUpdateFilingInfo,
  onUpdateAuditInfo
}) => {
  const companyTypes = [
    'Public Limited Company',
    'Private Limited Company',
    'One Person Company',
    'Section 8 Company',
    'Government Company',
    'Foreign Company',
    'Holding Company',
    'Subsidiary Company',
    'Associate Company',
    'Joint Venture',
    'Other'
  ];

  const businessNatures = [
    'Manufacturing',
    'Trading',
    'Service',
    'Technology',
    'Construction',
    'Transport',
    'Hospitality',
    'Education',
    'Healthcare',
    'Banking',
    'Insurance',
    'Real Estate',
    'Agriculture',
    'Mining',
    'Other'
  ];

  const filingStatuses = ['Original', 'Revised', 'Belated', 'Defective'];
  const filingReasons = ['Normal Filing', 'Notice u/s 142(1)', 'Notice u/s 148', 'Notice u/s 153A', 'Other'];

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-blue-800 mb-2">PART A - GENERAL</h2>
        <p className="text-sm text-blue-700">
          Personal Information, Filing Status & Audit Information
        </p>
      </div>

      {/* Company Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              value={companyInfo.companyName}
              onChange={(e) => onUpdateCompanyInfo('companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN *
            </label>
            <input
              type="text"
              value={companyInfo.pan}
              onChange={(e) => onUpdateCompanyInfo('pan', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CIN *
            </label>
            <input
              type="text"
              value={companyInfo.cin}
              onChange={(e) => onUpdateCompanyInfo('cin', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CIN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number
            </label>
            <input
              type="text"
              value={companyInfo.registrationNumber}
              onChange={(e) => onUpdateCompanyInfo('registrationNumber', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter registration number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Incorporation *
            </label>
            <input
              type="date"
              value={companyInfo.dateOfIncorporation}
              onChange={(e) => onUpdateCompanyInfo('dateOfIncorporation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Type *
            </label>
            <select
              value={companyInfo.companyType}
              onChange={(e) => onUpdateCompanyInfo('companyType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Company Type</option>
              {companyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Nature *
            </label>
            <select
              value={companyInfo.businessNature}
              onChange={(e) => onUpdateCompanyInfo('businessNature', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Business Nature</option>
              {businessNatures.map(nature => (
                <option key={nature} value={nature}>{nature}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registered Office *
            </label>
            <textarea
              value={companyInfo.registeredOffice}
              onChange={(e) => onUpdateCompanyInfo('registeredOffice', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter complete registered office address"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => onUpdateCompanyInfo('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={companyInfo.phone}
              onChange={(e) => onUpdateCompanyInfo('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website
            </label>
            <input
              type="url"
              value={companyInfo.website}
              onChange={(e) => onUpdateCompanyInfo('website', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter website URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authorized Capital (₹) *
            </label>
            <input
              type="number"
              value={companyInfo.authorizedCapital}
              onChange={(e) => onUpdateCompanyInfo('authorizedCapital', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter authorized capital"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Paid Up Capital (₹) *
            </label>
            <input
              type="number"
              value={companyInfo.paidUpCapital}
              onChange={(e) => onUpdateCompanyInfo('paidUpCapital', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter paid up capital"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Financial Year *
            </label>
            <input
              type="text"
              value={companyInfo.financialYear}
              onChange={(e) => onUpdateCompanyInfo('financialYear', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2024-25"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assessment Year *
            </label>
            <input
              type="text"
              value={companyInfo.assessmentYear}
              onChange={(e) => onUpdateCompanyInfo('assessmentYear', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2025-26"
            />
          </div>
        </div>
      </div>

      {/* Filing Status Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Filing Status Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Status *
            </label>
            <select
              value={filingInfo.filingStatus}
              onChange={(e) => onUpdateFilingInfo('filingStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Filing Status</option>
              {filingStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filing Reason
            </label>
            <select
              value={filingInfo.filingReason}
              onChange={(e) => onUpdateFilingInfo('filingReason', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Filing Reason</option>
              {filingReasons.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Return Date
            </label>
            <input
              type="date"
              value={filingInfo.originalReturnDate}
              onChange={(e) => onUpdateFilingInfo('originalReturnDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice DIN
            </label>
            <input
              type="text"
              value={filingInfo.noticeDIN}
              onChange={(e) => onUpdateFilingInfo('noticeDIN', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter notice DIN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice Date
            </label>
            <input
              type="date"
              value={filingInfo.noticeDate}
              onChange={(e) => onUpdateFilingInfo('noticeDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receipt Number
            </label>
            <input
              type="text"
              value={filingInfo.receiptNo}
              onChange={(e) => onUpdateFilingInfo('receiptNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter receipt number"
            />
          </div>

          <div className="md:col-span-3">
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingInfo.isRevisedReturn}
                  onChange={(e) => onUpdateFilingInfo('isRevisedReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Revised Return</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingInfo.isBelatedReturn}
                  onChange={(e) => onUpdateFilingInfo('isBelatedReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Belated Return</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingInfo.isDefectiveReturn}
                  onChange={(e) => onUpdateFilingInfo('isDefectiveReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Defective Return</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingInfo.isFirstReturn}
                  onChange={(e) => onUpdateFilingInfo('isFirstReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">First Return</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Audit Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={auditInfo.isAuditRequired}
                onChange={(e) => onUpdateAuditInfo('isAuditRequired', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Audit Required under Section 44AB</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Report Date
            </label>
            <input
              type="date"
              value={auditInfo.auditReportDate}
              onChange={(e) => onUpdateAuditInfo('auditReportDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auditor Name
            </label>
            <input
              type="text"
              value={auditInfo.auditorName}
              onChange={(e) => onUpdateAuditInfo('auditorName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter auditor name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auditor PAN
            </label>
            <input
              type="text"
              value={auditInfo.auditorPAN}
              onChange={(e) => onUpdateAuditInfo('auditorPAN', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auditor Membership No.
            </label>
            <input
              type="text"
              value={auditInfo.auditorMembershipNo}
              onChange={(e) => onUpdateAuditInfo('auditorMembershipNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter membership number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Firm Name
            </label>
            <input
              type="text"
              value={auditInfo.auditFirmName}
              onChange={(e) => onUpdateAuditInfo('auditFirmName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter audit firm name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit Firm PAN
            </label>
            <input
              type="text"
              value={auditInfo.auditFirmPAN}
              onChange={(e) => onUpdateAuditInfo('auditFirmPAN', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audit UDIN
            </label>
            <input
              type="text"
              value={auditInfo.auditUDIN}
              onChange={(e) => onUpdateAuditInfo('auditUDIN', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter audit UDIN"
            />
          </div>

          <div className="md:col-span-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={auditInfo.hasAdverseRemarks}
                onChange={(e) => onUpdateAuditInfo('hasAdverseRemarks', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Has Adverse Remarks</span>
            </label>
          </div>

          {auditInfo.hasAdverseRemarks && (
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adverse Remarks Details
              </label>
              <textarea
                value={auditInfo.adverseRemarksDetails}
                onChange={(e) => onUpdateAuditInfo('adverseRemarksDetails', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter adverse remarks details"
                rows={4}
              />
            </div>
          )}

          <div className="md:col-span-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={auditInfo.isTaxAuditRequired}
                onChange={(e) => onUpdateAuditInfo('isTaxAuditRequired', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Tax Audit Required under Section 44AB</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Audit Report Date
            </label>
            <input
              type="date"
              value={auditInfo.taxAuditReportDate}
              onChange={(e) => onUpdateAuditInfo('taxAuditReportDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Auditor Name
            </label>
            <input
              type="text"
              value={auditInfo.taxAuditorName}
              onChange={(e) => onUpdateAuditInfo('taxAuditorName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tax auditor name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Auditor PAN
            </label>
            <input
              type="text"
              value={auditInfo.taxAuditorPAN}
              onChange={(e) => onUpdateAuditInfo('taxAuditorPAN', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">PART A - GENERAL Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Company Information:</strong> Basic details of the company including name, PAN, CIN, etc.</p>
          <p><strong>Filing Status:</strong> Type of return being filed (Original, Revised, Belated, Defective)</p>
          <p><strong>Audit Information:</strong> Details of audit if applicable under section 44AB</p>
          <p><strong>Tax Audit:</strong> Tax audit requirements for companies</p>
          <p><strong>Mandatory Fields:</strong> Fields marked with * are mandatory</p>
          <p><strong>Validation:</strong> PAN format validation and other field validations</p>
          <p><strong>Documentation:</strong> Keep supporting documents for all information provided</p>
          <p><strong>Compliance:</strong> Ensure compliance with Companies Act and Income Tax Act</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixPartAGeneral;
