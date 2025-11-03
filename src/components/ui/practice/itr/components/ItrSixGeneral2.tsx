import React from 'react';

interface HoldingStatus {
  isHoldingCompany: boolean;
  isSubsidiaryCompany: boolean;
  isAssociateCompany: boolean;
  isJointVenture: boolean;
  parentCompanyName: string;
  parentCompanyPAN: string;
  parentCompanyCIN: string;
  subsidiaryDetails: string;
  associateDetails: string;
  jointVentureDetails: string;
}

interface BusinessOrganisation {
  businessStructure: string;
  businessModel: string;
  businessStrategy: string;
  marketSegment: string;
  customerBase: string;
  supplierBase: string;
  distributionChannels: string;
  competitiveAdvantage: string;
  businessRisks: string;
  mitigationStrategies: string;
}

interface KeyPerson {
  name: string;
  designation: string;
  pan: string;
  aadhar: string;
  dateOfBirth: string;
  qualification: string;
  experience: number;
  salary: number;
  isDirector: boolean;
  isKeyManagerialPersonnel: boolean;
  isPromoter: boolean;
  shareholding: number;
  appointmentDate: string;
  resignationDate: string;
  isActive: boolean;
}

interface Shareholder {
  name: string;
  pan: string;
  aadhar: string;
  address: string;
  shareholding: number;
  shareholdingPercentage: number;
  shareValue: number;
  isPromoter: boolean;
  isForeignShareholder: boolean;
  isInstitutionalInvestor: boolean;
  isEmployeeShareholder: boolean;
  shareType: string;
  acquisitionDate: string;
  isActive: boolean;
}

interface OwnershipInfo {
  totalShares: number;
  totalShareValue: number;
  promoterShareholding: number;
  promoterShareholdingPercentage: number;
  publicShareholding: number;
  publicShareholdingPercentage: number;
  foreignShareholding: number;
  foreignShareholdingPercentage: number;
  institutionalShareholding: number;
  institutionalShareholdingPercentage: number;
  employeeShareholding: number;
  employeeShareholdingPercentage: number;
}

interface ItrSixGeneral2Props {
  holdingStatus: HoldingStatus;
  businessOrganisation: BusinessOrganisation;
  keyPersons: KeyPerson[];
  shareholders: Shareholder[];
  ownershipInfo: OwnershipInfo;
  onUpdateHoldingStatus: (field: keyof HoldingStatus, value: string | boolean) => void;
  onUpdateBusinessOrganisation: (field: keyof BusinessOrganisation, value: string) => void;
  onAddKeyPerson: () => void;
  onRemoveKeyPerson: (index: number) => void;
  onUpdateKeyPerson: (index: number, field: keyof KeyPerson, value: string | number | boolean) => void;
  onAddShareholder: () => void;
  onRemoveShareholder: (index: number) => void;
  onUpdateShareholder: (index: number, field: keyof Shareholder, value: string | number | boolean) => void;
  onUpdateOwnershipInfo: (field: keyof OwnershipInfo, value: number) => void;
}

const ItrSixGeneral2: React.FC<ItrSixGeneral2Props> = ({
  holdingStatus,
  businessOrganisation,
  keyPersons,
  shareholders,
  ownershipInfo,
  onUpdateHoldingStatus,
  onUpdateBusinessOrganisation,
  onAddKeyPerson,
  onRemoveKeyPerson,
  onUpdateKeyPerson,
  onAddShareholder,
  onRemoveShareholder,
  onUpdateShareholder,
  onUpdateOwnershipInfo
}) => {
  const businessStructures = [
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

  const businessModels = [
    'B2B (Business to Business)',
    'B2C (Business to Consumer)',
    'B2G (Business to Government)',
    'C2C (Consumer to Consumer)',
    'B2B2C (Business to Business to Consumer)',
    'Direct Sales',
    'Franchise Model',
    'Subscription Model',
    'Freemium Model',
    'Marketplace Model',
    'Other'
  ];

  const designations = [
    'Managing Director',
    'Executive Director',
    'Non-Executive Director',
    'Independent Director',
    'Chief Executive Officer',
    'Chief Financial Officer',
    'Chief Operating Officer',
    'Chief Technology Officer',
    'Company Secretary',
    'Chief Risk Officer',
    'Chief Marketing Officer',
    'Other'
  ];

  const shareTypes = [
    'Equity Shares',
    'Preference Shares',
    'Cumulative Preference Shares',
    'Non-Cumulative Preference Shares',
    'Convertible Preference Shares',
    'Non-Convertible Preference Shares',
    'Redeemable Preference Shares',
    'Non-Redeemable Preference Shares',
    'Employee Stock Options',
    'Sweat Equity Shares',
    'Other'
  ];

  const calculateShareholdingPercentage = (shareholding: number, totalShares: number) => {
    return totalShares > 0 ? (shareholding / totalShares) * 100 : 0;
  };

  const calculateTotalShareValue = (shareholders: Shareholder[]) => {
    return shareholders.reduce((sum, shareholder) => sum + shareholder.shareValue, 0);
  };

  const calculatePromoterShareholding = (shareholders: Shareholder[]) => {
    return shareholders
      .filter(shareholder => shareholder.isPromoter)
      .reduce((sum, shareholder) => sum + shareholder.shareholding, 0);
  };

  const calculatePublicShareholding = (shareholders: Shareholder[]) => {
    return shareholders
      .filter(shareholder => !shareholder.isPromoter)
      .reduce((sum, shareholder) => sum + shareholder.shareholding, 0);
  };

  const calculateForeignShareholding = (shareholders: Shareholder[]) => {
    return shareholders
      .filter(shareholder => shareholder.isForeignShareholder)
      .reduce((sum, shareholder) => sum + shareholder.shareholding, 0);
  };

  const calculateInstitutionalShareholding = (shareholders: Shareholder[]) => {
    return shareholders
      .filter(shareholder => shareholder.isInstitutionalInvestor)
      .reduce((sum, shareholder) => sum + shareholder.shareholding, 0);
  };

  const calculateEmployeeShareholding = (shareholders: Shareholder[]) => {
    return shareholders
      .filter(shareholder => shareholder.isEmployeeShareholder)
      .reduce((sum, shareholder) => sum + shareholder.shareholding, 0);
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-green-800 mb-2">GENERAL2</h2>
        <p className="text-sm text-green-700">
          Holding Status, Business Organisation, Key Persons, Shareholders Information, Ownership Information, Nature of Company & its Business
        </p>
      </div>

      {/* Holding Status */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Holding Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="md:col-span-3">
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={holdingStatus.isHoldingCompany}
                  onChange={(e) => onUpdateHoldingStatus('isHoldingCompany', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Holding Company</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={holdingStatus.isSubsidiaryCompany}
                  onChange={(e) => onUpdateHoldingStatus('isSubsidiaryCompany', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Subsidiary Company</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={holdingStatus.isAssociateCompany}
                  onChange={(e) => onUpdateHoldingStatus('isAssociateCompany', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Associate Company</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={holdingStatus.isJointVenture}
                  onChange={(e) => onUpdateHoldingStatus('isJointVenture', e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Joint Venture</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Company Name
            </label>
            <input
              type="text"
              value={holdingStatus.parentCompanyName}
              onChange={(e) => onUpdateHoldingStatus('parentCompanyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter parent company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Company PAN
            </label>
            <input
              type="text"
              value={holdingStatus.parentCompanyPAN}
              onChange={(e) => onUpdateHoldingStatus('parentCompanyPAN', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Company CIN
            </label>
            <input
              type="text"
              value={holdingStatus.parentCompanyCIN}
              onChange={(e) => onUpdateHoldingStatus('parentCompanyCIN', e.target.value.toUpperCase())}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter parent company CIN"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subsidiary Details
            </label>
            <textarea
              value={holdingStatus.subsidiaryDetails}
              onChange={(e) => onUpdateHoldingStatus('subsidiaryDetails', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subsidiary company details"
              rows={3}
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Associate Details
            </label>
            <textarea
              value={holdingStatus.associateDetails}
              onChange={(e) => onUpdateHoldingStatus('associateDetails', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter associate company details"
              rows={3}
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Joint Venture Details
            </label>
            <textarea
              value={holdingStatus.jointVentureDetails}
              onChange={(e) => onUpdateHoldingStatus('jointVentureDetails', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter joint venture details"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Business Organisation */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">Business Organisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Structure *
            </label>
            <select
              value={businessOrganisation.businessStructure}
              onChange={(e) => onUpdateBusinessOrganisation('businessStructure', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Business Structure</option>
              {businessStructures.map(structure => (
                <option key={structure} value={structure}>{structure}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Model *
            </label>
            <select
              value={businessOrganisation.businessModel}
              onChange={(e) => onUpdateBusinessOrganisation('businessModel', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Business Model</option>
              {businessModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market Segment *
            </label>
            <input
              type="text"
              value={businessOrganisation.marketSegment}
              onChange={(e) => onUpdateBusinessOrganisation('marketSegment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter market segment"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Base
            </label>
            <input
              type="text"
              value={businessOrganisation.customerBase}
              onChange={(e) => onUpdateBusinessOrganisation('customerBase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter customer base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Base
            </label>
            <input
              type="text"
              value={businessOrganisation.supplierBase}
              onChange={(e) => onUpdateBusinessOrganisation('supplierBase', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter supplier base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distribution Channels
            </label>
            <input
              type="text"
              value={businessOrganisation.distributionChannels}
              onChange={(e) => onUpdateBusinessOrganisation('distributionChannels', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter distribution channels"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Strategy
            </label>
            <textarea
              value={businessOrganisation.businessStrategy}
              onChange={(e) => onUpdateBusinessOrganisation('businessStrategy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business strategy"
              rows={3}
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Competitive Advantage
            </label>
            <textarea
              value={businessOrganisation.competitiveAdvantage}
              onChange={(e) => onUpdateBusinessOrganisation('competitiveAdvantage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter competitive advantage"
              rows={3}
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Risks
            </label>
            <textarea
              value={businessOrganisation.businessRisks}
              onChange={(e) => onUpdateBusinessOrganisation('businessRisks', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter business risks"
              rows={3}
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mitigation Strategies
            </label>
            <textarea
              value={businessOrganisation.mitigationStrategies}
              onChange={(e) => onUpdateBusinessOrganisation('mitigationStrategies', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mitigation strategies"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Key Persons */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Key Persons</h3>
          <button
            type="button"
            onClick={onAddKeyPerson}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Key Person
          </button>
        </div>

        {keyPersons.map((person, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Key Person {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveKeyPerson(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => onUpdateKeyPerson(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>
                <select
                  value={person.designation}
                  onChange={(e) => onUpdateKeyPerson(index, 'designation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Designation</option>
                  {designations.map(designation => (
                    <option key={designation} value={designation}>{designation}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN *
                </label>
                <input
                  type="text"
                  value={person.pan}
                  onChange={(e) => onUpdateKeyPerson(index, 'pan', e.target.value.toUpperCase())}
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
                  value={person.aadhar}
                  onChange={(e) => onUpdateKeyPerson(index, 'aadhar', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Aadhar number"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={person.dateOfBirth}
                  onChange={(e) => onUpdateKeyPerson(index, 'dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Qualification
                </label>
                <input
                  type="text"
                  value={person.qualification}
                  onChange={(e) => onUpdateKeyPerson(index, 'qualification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter qualification"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  value={person.experience}
                  onChange={(e) => onUpdateKeyPerson(index, 'experience', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter experience"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary (₹)
                </label>
                <input
                  type="number"
                  value={person.salary}
                  onChange={(e) => onUpdateKeyPerson(index, 'salary', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter salary"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholding (%)
                </label>
                <input
                  type="number"
                  value={person.shareholding}
                  onChange={(e) => onUpdateKeyPerson(index, 'shareholding', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter shareholding"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Date
                </label>
                <input
                  type="date"
                  value={person.appointmentDate}
                  onChange={(e) => onUpdateKeyPerson(index, 'appointmentDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resignation Date
                </label>
                <input
                  type="date"
                  value={person.resignationDate}
                  onChange={(e) => onUpdateKeyPerson(index, 'resignationDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-3">
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={person.isDirector}
                      onChange={(e) => onUpdateKeyPerson(index, 'isDirector', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Director</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={person.isKeyManagerialPersonnel}
                      onChange={(e) => onUpdateKeyPerson(index, 'isKeyManagerialPersonnel', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Key Managerial Personnel</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={person.isPromoter}
                      onChange={(e) => onUpdateKeyPerson(index, 'isPromoter', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Promoter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={person.isActive}
                      onChange={(e) => onUpdateKeyPerson(index, 'isActive', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shareholders */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-700">Shareholders</h3>
          <button
            type="button"
            onClick={onAddShareholder}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Shareholder
          </button>
        </div>

        {shareholders.map((shareholder, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-semibold text-gray-600">Shareholder {index + 1}</h4>
              <button
                type="button"
                onClick={() => onRemoveShareholder(index)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={shareholder.name}
                  onChange={(e) => onUpdateShareholder(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN *
                </label>
                <input
                  type="text"
                  value={shareholder.pan}
                  onChange={(e) => onUpdateShareholder(index, 'pan', e.target.value.toUpperCase())}
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
                  value={shareholder.aadhar}
                  onChange={(e) => onUpdateShareholder(index, 'aadhar', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Aadhar number"
                  maxLength={12}
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  value={shareholder.address}
                  onChange={(e) => onUpdateShareholder(index, 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholding (Number) *
                </label>
                <input
                  type="number"
                  value={shareholder.shareholding}
                  onChange={(e) => onUpdateShareholder(index, 'shareholding', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter shareholding"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareholding (%)
                </label>
                <input
                  type="number"
                  value={shareholder.shareholdingPercentage}
                  onChange={(e) => onUpdateShareholder(index, 'shareholdingPercentage', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter shareholding percentage"
                  step="0.01"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Value (₹)
                </label>
                <input
                  type="number"
                  value={shareholder.shareValue}
                  onChange={(e) => onUpdateShareholder(index, 'shareValue', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter share value"
                  step="0.01"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Type *
                </label>
                <select
                  value={shareholder.shareType}
                  onChange={(e) => onUpdateShareholder(index, 'shareType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Share Type</option>
                  {shareTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Acquisition Date
                </label>
                <input
                  type="date"
                  value={shareholder.acquisitionDate}
                  onChange={(e) => onUpdateShareholder(index, 'acquisitionDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-3">
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isPromoter}
                      onChange={(e) => onUpdateShareholder(index, 'isPromoter', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Promoter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isForeignShareholder}
                      onChange={(e) => onUpdateShareholder(index, 'isForeignShareholder', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Foreign Shareholder</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isInstitutionalInvestor}
                      onChange={(e) => onUpdateShareholder(index, 'isInstitutionalInvestor', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Institutional Investor</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isEmployeeShareholder}
                      onChange={(e) => onUpdateShareholder(index, 'isEmployeeShareholder', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Employee Shareholder</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={shareholder.isActive}
                      onChange={(e) => onUpdateShareholder(index, 'isActive', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ownership Information Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Ownership Information Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Shares</div>
            <div className="text-lg font-bold text-blue-600">
              {shareholders.reduce((sum, shareholder) => sum + shareholder.shareholding, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Total Share Value</div>
            <div className="text-lg font-bold text-green-600">
              ₹{calculateTotalShareValue(shareholders).toLocaleString()}
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Promoter Shareholding</div>
            <div className="text-lg font-bold text-purple-600">
              {calculatePromoterShareholding(shareholders).toLocaleString()} ({calculateShareholdingPercentage(calculatePromoterShareholding(shareholders), shareholders.reduce((sum, shareholder) => sum + shareholder.shareholding, 0)).toFixed(2)}%)
            </div>
          </div>
          <div className="bg-white p-3 rounded-md">
            <div className="text-gray-600">Public Shareholding</div>
            <div className="text-lg font-bold text-orange-600">
              {calculatePublicShareholding(shareholders).toLocaleString()} ({calculateShareholdingPercentage(calculatePublicShareholding(shareholders), shareholders.reduce((sum, shareholder) => sum + shareholder.shareholding, 0)).toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">GENERAL2 Information</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p><strong>Holding Status:</strong> Company's position in corporate structure</p>
          <p><strong>Business Organisation:</strong> Business structure, model, and strategy</p>
          <p><strong>Key Persons:</strong> Directors, KMPs, and other key personnel</p>
          <p><strong>Shareholders:</strong> All shareholders and their details</p>
          <p><strong>Ownership Information:</strong> Shareholding pattern and distribution</p>
          <p><strong>Compliance:</strong> Ensure compliance with Companies Act requirements</p>
          <p><strong>Documentation:</strong> Keep supporting documents for all information</p>
          <p><strong>Updates:</strong> Regular updates required for changes in key personnel and shareholding</p>
        </div>
      </div>
    </div>
  );
};

export default ItrSixGeneral2;
