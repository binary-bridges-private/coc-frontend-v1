import React from 'react';

interface PersonalInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  pan: string;
  aadhar: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  residentialStatus: string;
  email: string;
  mobile: string;
  alternateMobile: string;
}

interface AddressInfo {
  flatNo: string;
  buildingName: string;
  street: string;
  area: string;
  town: string;
  state: string;
  pincode: string;
  country: string;
  isSameAsPermanent: boolean;
}

interface FilingStatusInfo {
  filingStatus: string;
  filingReason: string;
  originalReturnDate: string;
  noticeDIN: string;
  noticeDate: string;
  receiptNo: string;
  isRevisedReturn: boolean;
  isBelatedReturn: boolean;
  isDefectiveReturn: boolean;
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
}

interface ItrFivePartAGeneralProps {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  filingStatusInfo: FilingStatusInfo;
  auditInfo: AuditInfo;
  onUpdatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  onUpdateAddressInfo: (field: keyof AddressInfo, value: string | boolean) => void;
  onUpdateFilingStatusInfo: (field: keyof FilingStatusInfo, value: string | boolean) => void;
  onUpdateAuditInfo: (field: keyof AuditInfo, value: string | boolean) => void;
}

const ItrFivePartAGeneral: React.FC<ItrFivePartAGeneralProps> = ({
  personalInfo,
  addressInfo,
  filingStatusInfo,
  auditInfo,
  onUpdatePersonalInfo,
  onUpdateAddressInfo,
  onUpdateFilingStatusInfo,
  onUpdateAuditInfo
}) => {
  const genders = ['Male', 'Female', 'Transgender', 'Other'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];
  const residentialStatuses = ['Resident', 'Non-Resident', 'Resident but Not Ordinarily Resident'];
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

      {/* Personal Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={personalInfo.firstName}
              onChange={(e) => onUpdatePersonalInfo('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Middle Name
            </label>
            <input
              type="text"
              value={personalInfo.middleName}
              onChange={(e) => onUpdatePersonalInfo('middleName', e.target.value)}
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
              value={personalInfo.lastName}
              onChange={(e) => onUpdatePersonalInfo('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PAN *
            </label>
            <input
              type="text"
              value={personalInfo.pan}
              onChange={(e) => onUpdatePersonalInfo('pan', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhar Number
            </label>
            <input
              type="text"
              value={personalInfo.aadhar}
              onChange={(e) => onUpdatePersonalInfo('aadhar', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Aadhar number"
              maxLength={12}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={personalInfo.dateOfBirth}
              onChange={(e) => onUpdatePersonalInfo('dateOfBirth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender *
            </label>
            <select
              value={personalInfo.gender}
              onChange={(e) => onUpdatePersonalInfo('gender', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marital Status *
            </label>
            <select
              value={personalInfo.maritalStatus}
              onChange={(e) => onUpdatePersonalInfo('maritalStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Marital Status</option>
              {maritalStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Residential Status *
            </label>
            <select
              value={personalInfo.residentialStatus}
              onChange={(e) => onUpdatePersonalInfo('residentialStatus', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Residential Status</option>
              {residentialStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father's Name *
            </label>
            <input
              type="text"
              value={personalInfo.fatherName}
              onChange={(e) => onUpdatePersonalInfo('fatherName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter father's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother's Name *
            </label>
            <input
              type="text"
              value={personalInfo.motherName}
              onChange={(e) => onUpdatePersonalInfo('motherName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mother's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spouse's Name
            </label>
            <input
              type="text"
              value={personalInfo.spouseName}
              onChange={(e) => onUpdatePersonalInfo('spouseName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter spouse's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => onUpdatePersonalInfo('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={personalInfo.mobile}
              onChange={(e) => onUpdatePersonalInfo('mobile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alternate Mobile Number
            </label>
            <input
              type="tel"
              value={personalInfo.alternateMobile}
              onChange={(e) => onUpdatePersonalInfo('alternateMobile', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter alternate mobile number"
              maxLength={10}
            />
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flat/Door No. *
            </label>
            <input
              type="text"
              value={addressInfo.flatNo}
              onChange={(e) => onUpdateAddressInfo('flatNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter flat/door number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Building Name
            </label>
            <input
              type="text"
              value={addressInfo.buildingName}
              onChange={(e) => onUpdateAddressInfo('buildingName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter building name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street *
            </label>
            <input
              type="text"
              value={addressInfo.street}
              onChange={(e) => onUpdateAddressInfo('street', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter street name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area/Locality *
            </label>
            <input
              type="text"
              value={addressInfo.area}
              onChange={(e) => onUpdateAddressInfo('area', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter area/locality"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Town/City *
            </label>
            <input
              type="text"
              value={addressInfo.town}
              onChange={(e) => onUpdateAddressInfo('town', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter town/city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State *
            </label>
            <input
              type="text"
              value={addressInfo.state}
              onChange={(e) => onUpdateAddressInfo('state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter state"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN Code *
            </label>
            <input
              type="text"
              value={addressInfo.pincode}
              onChange={(e) => onUpdateAddressInfo('pincode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter PIN code"
              maxLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country *
            </label>
            <input
              type="text"
              value={addressInfo.country}
              onChange={(e) => onUpdateAddressInfo('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country"
            />
          </div>

          <div className="md:col-span-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={addressInfo.isSameAsPermanent}
                onChange={(e) => onUpdateAddressInfo('isSameAsPermanent', e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Same as Permanent Address
              </span>
            </label>
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
              value={filingStatusInfo.filingStatus}
              onChange={(e) => onUpdateFilingStatusInfo('filingStatus', e.target.value)}
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
              value={filingStatusInfo.filingReason}
              onChange={(e) => onUpdateFilingStatusInfo('filingReason', e.target.value)}
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
              value={filingStatusInfo.originalReturnDate}
              onChange={(e) => onUpdateFilingStatusInfo('originalReturnDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notice DIN
            </label>
            <input
              type="text"
              value={filingStatusInfo.noticeDIN}
              onChange={(e) => onUpdateFilingStatusInfo('noticeDIN', e.target.value)}
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
              value={filingStatusInfo.noticeDate}
              onChange={(e) => onUpdateFilingStatusInfo('noticeDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Receipt Number
            </label>
            <input
              type="text"
              value={filingStatusInfo.receiptNo}
              onChange={(e) => onUpdateFilingStatusInfo('receiptNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter receipt number"
            />
          </div>

          <div className="md:col-span-3">
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingStatusInfo.isRevisedReturn}
                  onChange={(e) => onUpdateFilingStatusInfo('isRevisedReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Revised Return</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingStatusInfo.isBelatedReturn}
                  onChange={(e) => onUpdateFilingStatusInfo('isBelatedReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Belated Return</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filingStatusInfo.isDefectiveReturn}
                  onChange={(e) => onUpdateFilingStatusInfo('isDefectiveReturn', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Defective Return</span>
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
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">PART A - GENERAL Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Personal Information:</strong> Basic details of the taxpayer including name, PAN, Aadhar, etc.</p>
          <p><strong>Address Information:</strong> Current and permanent address details</p>
          <p><strong>Filing Status:</strong> Type of return being filed (Original, Revised, Belated, Defective)</p>
          <p><strong>Audit Information:</strong> Details of audit if applicable under section 44AB</p>
          <p><strong>Mandatory Fields:</strong> Fields marked with * are mandatory</p>
          <p><strong>Validation:</strong> PAN format validation and other field validations</p>
          <p><strong>Documentation:</strong> Keep supporting documents for all information provided</p>
        </div>
      </div>
    </div>
  );
};

export default ItrFivePartAGeneral;
