import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ITR7FormData } from '../itr-7.types.ts';

interface Itr7PersonalInfoProps {
  form: UseFormReturn<ITR7FormData>;
}

export const Itr7PersonalInfo: React.FC<Itr7PersonalInfoProps> = ({ form }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['basic']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className="space-y-6 p-6 bg-white">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <h2 className="text-xl font-bold text-blue-900">Part A-GEN - GENERAL</h2>
        <p className="text-sm text-blue-800 mt-1">Personal Information</p>
      </div>

      {/* BASIC INFORMATION */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('basic')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>Basic Information</span>
          <span className="text-xl">{expandedSections.includes('basic') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('basic') && (
          <div className="p-6 space-y-4">
            {/* (A1) Name and (A2) PAN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A1) Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Company/Trust Name"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_name')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A2) PAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="AAAAA0000A"
                  maxLength={10}
                  className="w-full border rounded px-3 py-2 uppercase"
                  {...form.register('gen_pan')}
                />
              </div>
            </div>

            {/* (A3) Name Change */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A3) Is there any change in the company's name? If yes, please furnish the old name
              </label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    className="mr-2"
                    {...form.register('gen_name_change')}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    className="mr-2"
                    {...form.register('gen_name_change')}
                  />
                  No
                </label>
                <input
                  type="text"
                  placeholder="Old name (if applicable)"
                  className="flex-1 border rounded px-3 py-2"
                  {...form.register('gen_old_name')}
                />
              </div>
            </div>

            {/* (A4) Corporate Identity Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A4) Corporate Identity Number (CIN) issued by MCA
              </label>
              <input
                type="text"
                placeholder="CIN Number"
                className="w-full border rounded px-3 py-2"
                {...form.register('gen_cin')}
              />
            </div>

            {/* Address Section */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A8) Flat/Door/Block No
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_flat_door_block')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A9) Name of Premises/Building/Village
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_premises_building')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A5) Date of incorporation (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_incorporation_date')}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A10) Road/Street/Post Office
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_road_street_post')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A11) Area/Locality
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_area_locality')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A6) Date of commencement of business (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_commencement_date')}
                />
              </div>
            </div>

            {/* (A7) Type of company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A7) Type of company (Tick any one) ☑
              </label>
              <div className="flex gap-6 items-center">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="domestic"
                    className="mr-2"
                    {...form.register('gen_company_type')}
                  />
                  (i) Domestic Company
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="foreign"
                    className="mr-2"
                    {...form.register('gen_company_type')}
                  />
                  (ii) Foreign Company
                </label>
              </div>
              <div className="mt-2">
                <label className="text-sm text-gray-600">
                  If a public company write 6, and if private company write 7 (as defined in section 3 of The Companies Act)
                </label>
                <input
                  type="text"
                  maxLength={1}
                  placeholder="6 or 7"
                  className="w-20 border rounded px-3 py-2 ml-2"
                  {...form.register('gen_company_classification')}
                />
              </div>
            </div>

            {/* Address continuation */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A12) Town/City/District
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_town_city_district')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A13) State
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_state')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A14) Pin code/Zip code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_pin_code')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A15) Country
                </label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_country')}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A16) Office Phone Number with STD code/ Mobile No. 1
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="STD"
                    maxLength={5}
                    className="w-20 border rounded px-2 py-2"
                    {...form.register('gen_office_phone_std')}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="flex-1 border rounded px-3 py-2"
                    {...form.register('gen_office_phone_number')}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A17) Mobile No. 2
                </label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Mobile Number"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_mobile_2')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A18) Email Address-1
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_email_1')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address-2
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full border rounded px-3 py-2"
                {...form.register('gen_email_2')}
              />
            </div>
          </div>
        )}
      </div>

      {/* FILING STATUS */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('filing')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>Filing Status</span>
          <span className="text-xl">{expandedSections.includes('filing') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('filing') && (
          <div className="p-6 space-y-4">
            {/* (A19)(ai) Due date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(ai) Due date for filing return of income [Dropdown to be provided]:
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="31st October"
                    className="mr-2"
                    {...form.register('gen_due_date_type')}
                  />
                  1. 31st October
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="30th November"
                    className="mr-2"
                    {...form.register('gen_due_date_type')}
                  />
                  2. 30th November
                </label>
              </div>
            </div>

            {/* (A19)(aii) Filing options */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(aii) 1 Filed u/s (Tick)[Please see instruction]
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_filing_139_1')}
                  />
                  ☐ 139(1)- On or Before due date
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_filing_92cd')}
                  />
                  ☐ 139(4)- After due date
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_filing_119_2b')}
                  />
                  ☐ 139(5)- Revised Return
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_filing_170a')}
                  />
                  ☐ 92CD-Modified return
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_filing_139_9')}
                  />
                  ☐ 119(2)(b)- After condonation of delay
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_filing_142_1')}
                  />
                  ☐ 170A-After order by the tribunal or court
                </label>
              </div>
            </div>

            {/* 2 Or filed in response to notice */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                2 Or filed in response to notice u/s
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_response_notice_139_9')}
                  />
                  ☐ 139(9)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_response_notice_142_1')}
                  />
                  ☐ 142(1)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_response_notice_148_153c')}
                  />
                  ☐ 148
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...form.register('gen_response_notice_119_2b')}
                  />
                  ☐ 153C
                </label>
              </div>
            </div>

            {/* (b) Receipt Number */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  (A19)(b) If revised/ defective/Modified, then enter Receipt No of Original Return (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="Receipt Number"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_receipt_number')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date (DD/MM/YYYY)
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_receipt_date')}
                />
              </div>
            </div>

            {/* (c) Response to notice details */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(c) If filed, in response to notice u/s 139(9)/142(1)/148/153C or order u/s 119(2)(b) or order referred to in section 170A, enter Unique Number / Document Identification Number and date of such notice/order, or if filed u/s 92CD enter date of advance pricing agreement
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Unique Number / Document ID"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_unique_doc_number')}
                />
                <input
                  type="text"
                  placeholder="Date (DD/MM/YYYY)"
                  className="w-full border rounded px-3 py-2"
                  {...form.register('gen_notice_order_date')}
                />
              </div>
            </div>

            {/* (d) Residential Status */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(d) Residential Status (Tick) ☑
              </label>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="resident"
                    className="mr-2"
                    {...form.register('gen_residential_status')}
                  />
                  ☐ Resident
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="non_resident"
                    className="mr-2"
                    {...form.register('gen_residential_status')}
                  />
                  ☐ Non-Resident
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* TAXATION OPTIONS */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('taxation')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>Taxation Options</span>
          <span className="text-xl">{expandedSections.includes('taxation') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('taxation') && (
          <div className="p-6 space-y-4">
            {/* (e) Taxation under Section 115BA/115BAA/115BAB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(e) Have you opted for taxation under section 115BA/115BAA/115BAB? (drop down to be provided in efiling utility) (applicable on Domestic Company) If yes, please furnish the AY in which said option is exercised for the first time along with date of filing and acknowledgement number.
              </label>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" {...form.register('gen_taxation_115ba')} />
                    115BA
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" {...form.register('gen_taxation_115baa')} />
                    115BAA
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" {...form.register('gen_taxation_115bab')} />
                    115BAB
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Assessment Year"
                    className="border rounded px-3 py-2"
                    {...form.register('gen_taxation_ay')}
                  />
                  <input
                    type="text"
                    placeholder="Acknowledgement Number"
                    className="border rounded px-3 py-2"
                    {...form.register('gen_taxation_ack_number')}
                  />
                </div>
              </div>
            </div>

            {/* Choosing taxation option */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                If no, whether you are choosing to opt for taxation under section 115BA/115BAA/115BAB this year? (drop down to be provided in efiling utility)
              </label>
              <div className="flex gap-4 items-center">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_choosing_taxation')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_choosing_taxation')} />
                  No
                </label>
              </div>
              <div className="mt-3">
                <label className="text-sm text-gray-600 mb-2 block">
                  Please provide details of filing of relevant form (10-IB/10-IC/10-ID) & acknowledgement number.
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Form Number (10-IB/10-IC/10-ID)"
                    className="border rounded px-3 py-2"
                    {...form.register('gen_taxation_form_number')}
                  />
                  <input
                    type="text"
                    placeholder="Acknowledgement Number"
                    className="border rounded px-3 py-2"
                    {...form.register('gen_taxation_form_ack')}
                  />
                </div>
              </div>
            </div>

            {/* (f) Turnover exceeds 400 crores */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(f) Whether total turnover/ gross receipts in the previous year 2022-2023 exceeds 400 crore rupees? (Yes/No) (applicable for Domestic Company)
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_turnover_exceeds_400cr')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_turnover_exceeds_400cr')} />
                  No
                </label>
              </div>
            </div>

            {/* (g) Tax agreement */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(g) Whether assessee is a resident of a country or specified territory with which India has an agreement referred to in s/s 90 (1) or a Central Government notification u/s 90(2) or 90A(1)?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_tax_agreement_country')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_tax_agreement_country')} />
                  No
                </label>
              </div>
            </div>

            {/* (h) Permanent Establishment */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(h) In the case of non-resident, is there a Permanent Establishment (PE) in India (Tick) ☑
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_pe_in_india')} />
                  ☐ Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_pe_in_india')} />
                  ☐ No
                </label>
              </div>
            </div>

            {/* (i) Significant Economic Presence */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(i) In the case of non-resident, is there a Significant Economic Presence (SEP) in India (Tick) ☑ Yes ☐ No
              </label>
              <p className="text-sm text-gray-600 mb-2">
                please provide details of either or both, if Yes –
              </p>
              <div className="space-y-2">
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" {...form.register('gen_sep_payment_aggregate')} />
                  (a) aggregate of payments arising from the transaction or transactions during the previous year as referred in Explanation 2A(a) to Section 9(1)(i).
                </label>
                <label className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" {...form.register('gen_sep_users_in_india')} />
                  (b) number of users in India as referred in Explanation 2A(b) to Section 9(1)(i).
                </label>
              </div>
            </div>

            {/* (j) Registration required */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(j) Whether assessee is required to seek registration under any law for the time being in force relating to companies? If yes, please provide details.
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_registration_required')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_registration_required')} />
                  No
                </label>
              </div>
              <div className="bg-gray-50 p-4 rounded space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Act under which registration required</label>
                  <input
                    type="text"
                    placeholder="Act name"
                    className="w-full border rounded px-3 py-2 mt-1"
                    {...form.register('gen_registration_act')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date of Registration (DD/MM/YYYY)</label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="w-full border rounded px-3 py-2 mt-1"
                      {...form.register('gen_registration_date')}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Registration Number</label>
                    <input
                      type="text"
                      placeholder="Registration Number"
                      className="w-full border rounded px-3 py-2 mt-1"
                      {...form.register('gen_registration_number')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCOUNTING & COMPLIANCE */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('accounting')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>Accounting Standards & Compliance</span>
          <span className="text-xl">{expandedSections.includes('accounting') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('accounting') && (
          <div className="p-6 space-y-4">
            {/* (k) Accounting Standards */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(k) Whether accounting standards notified u/s 133 are followed by the assessee
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_ind_accounting_standards')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_ind_accounting_standards')} />
                  No
                </label>
              </div>
            </div>

            {/* (l) Liquidation */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(l) Whether the company is under liquidation?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_under_liquidation')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_under_liquidation')} />
                  No
                </label>
              </div>
            </div>

            {/* (m) FII/FPI */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(m) Whether the assessee is a Foreign Institutional Investor(FII)/Foreign Portfolio Investor (FPI)
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_is_fii_fpi')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_is_fii_fpi')} />
                  No
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">If yes, provide SEBI Registration Number</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1"
                  {...form.register('gen_sebi_regn_no')}
                />
              </div>
            </div>

            {/* (n) Producer Company */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(n) Whether assessee is a Producer Company? [as defined in section 2(a) of Companies Act,2013]
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_producer_company')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_producer_company')} />
                  No
                </label>
              </div>
            </div>

            {/* (o) Representative Assessee */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(o) Whether the representative assessee is being assessed in a representative capacity under the Act
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_representative_assessee')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_representative_assessee')} />
                  No
                </label>
              </div>
              <div className="space-y-3 bg-gray-50 p-4 rounded">
                <div>
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_rep_assessee_name')} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">PAN/Aadhaar</label>
                    <input type="text" maxLength={12} className="w-full border rounded px-3 py-2 mt-1 uppercase" {...form.register('gen_rep_assessee_pan_aadhaar')} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Capacity</label>
                    <input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_rep_assessee_capacity')} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <textarea rows={2} className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_rep_assessee_address')} />
                </div>
              </div>
            </div>

            {/* (q) Start-up Recognition */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(q) Whether eligible start-up recognized by DPIIT?
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_startup_dpiit')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_startup_dpiit')} />
                  No
                </label>
              </div>
              <div className="bg-gray-50 p-4 rounded space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Recognition Number</label>
                  <input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_startup_recognition_number')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Certificate Number</label>
                  <input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_startup_certification_number')} />
                </div>
              </div>
            </div>

            {/* (r) LEI */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                (A19)(r) Legal Entity Identifier (LEI) details
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">LEI Number</label>
                  <input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_lei_number')} />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Valid Up To (DD/MM/YYYY)</label>
                  <input type="text" placeholder="DD/MM/YYYY" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_lei_valid_upto')} />
                </div>
              </div>
            </div>

            {/* (s) MSME */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                (A19)(s) Whether assessee is a Micro or Small or Medium Enterprises (MSME)?
              </label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center">
                  <input type="radio" value="yes" className="mr-2" {...form.register('gen_msme_recognized')} />
                  Yes
                </label>
                <label className="flex items-center">
                  <input type="radio" value="no" className="mr-2" {...form.register('gen_msme_recognized')} />
                  No
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">If yes, provide Registration Number</label>
                <input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_msme_registration_number')} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AUDIT INFORMATION */}
      <div className="border rounded-lg">
        <button
          type="button"
          onClick={() => toggleSection('audit')}
          className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left"
        >
          <span>Audit Information</span>
          <span className="text-xl">{expandedSections.includes('audit') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('audit') && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">(a1) Whether books of account are required to be maintained u/s 44AA?</label>
              <div className="flex gap-4">
                <label className="flex items-center"><input type="radio" value="yes" className="mr-2" {...form.register('gen_accounts_44aa')} />Yes</label>
                <label className="flex items-center"><input type="radio" value="no" className="mr-2" {...form.register('gen_accounts_44aa')} />No</label>
              </div>
            </div>
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">(a2) Whether books of account are required to be audited u/s 44AB?</label>
              <div className="flex gap-4">
                <label className="flex items-center"><input type="radio" value="yes" className="mr-2" {...form.register('gen_audit_44ab')} />Yes</label>
                <label className="flex items-center"><input type="radio" value="no" className="mr-2" {...form.register('gen_audit_44ab')} />No</label>
              </div>
            </div>
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">(c) Whether accounts audited by accountant?</label>
              <div className="flex gap-4">
                <label className="flex items-center"><input type="radio" value="yes" className="mr-2" {...form.register('gen_accounts_audited')} />Yes</label>
                <label className="flex items-center"><input type="radio" value="no" className="mr-2" {...form.register('gen_accounts_audited')} />No</label>
              </div>
            </div>
            <div className="border-t pt-4 bg-blue-50 p-4 rounded">
              <h4 className="font-semibold text-gray-800 mb-3">Auditor Details</h4>
              <div className="space-y-3">
                <div><label className="text-sm font-medium text-gray-700">Name</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_auditor_name')} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-700">Membership No</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_auditor_membership_no')} /></div>
                  <div><label className="text-sm font-medium text-gray-700">Firm Name</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_auditor_proprietorship_name')} /></div>
                </div>
                <div><label className="text-sm font-medium text-gray-700">Firm Registration No</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_auditor_firm_regn_no')} /></div>
                <div><label className="text-sm font-medium text-gray-700">Report Date (DD/MM/YYYY)</label><input type="text" placeholder="DD/MM/YYYY" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_audit_report_date')} /></div>
                <div><label className="text-sm font-medium text-gray-700">Ack Number</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_audit_ack_number')} /></div>
              </div>
            </div>
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">(di) Whether report u/s 92E is to be furnished?</label>
              <div className="flex gap-4">
                <label className="flex items-center"><input type="radio" value="yes" className="mr-2" {...form.register('gen_audit_92e')} />Yes</label>
                <label className="flex items-center"><input type="radio" value="no" className="mr-2" {...form.register('gen_audit_92e')} />No</label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HOLDING STATUS */}
      <div className="border rounded-lg">
        <button type="button" onClick={() => toggleSection('holding')} className="w-full bg-gray-100 hover:bg-gray-200 p-4 flex justify-between items-center font-semibold text-left">
          <span>Holding/Subsidiary Status</span>
          <span className="text-xl">{expandedSections.includes('holding') ? '−' : '+'}</span>
        </button>
        {expandedSections.includes('holding') && (
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">(a) Nature of company</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center"><input type="radio" value="holding" className="mr-2" {...form.register('gen_nature_holding')} />Holding</label>
                <label className="flex items-center"><input type="radio" value="subsidiary" className="mr-2" {...form.register('gen_nature_holding')} />Subsidiary</label>
                <label className="flex items-center"><input type="radio" value="both" className="mr-2" {...form.register('gen_nature_holding')} />Both</label>
                <label className="flex items-center"><input type="radio" value="any_other" className="mr-2" {...form.register('gen_nature_holding')} />Any Other</label>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded"><h4 className="font-medium mb-3">Holding Company</h4><div className="space-y-3">
              <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-700">PAN</label><input type="text" maxLength={10} className="w-full border rounded px-3 py-2 mt-1 uppercase" {...form.register('gen_holding_company_pan')} /></div><div><label className="text-sm font-medium text-gray-700">Name</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_holding_company_name')} /></div></div>
              <div><label className="text-sm font-medium text-gray-700">Address</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_holding_company_address')} /></div>
              <div><label className="text-sm font-medium text-gray-700">Percentage</label><input type="number" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_holding_company_percentage')} /></div>
            </div></div>
            <div className="bg-gray-50 p-4 rounded"><h4 className="font-medium mb-3">Subsidiary Company</h4><div className="space-y-3">
              <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-gray-700">PAN</label><input type="text" maxLength={10} className="w-full border rounded px-3 py-2 mt-1 uppercase" {...form.register('gen_subsidiary_company_pan')} /></div><div><label className="text-sm font-medium text-gray-700">Name</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_subsidiary_company_name')} /></div></div>
              <div><label className="text-sm font-medium text-gray-700">Address</label><input type="text" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_subsidiary_company_address')} /></div>
              <div><label className="text-sm font-medium text-gray-700">Percentage</label><input type="number" className="w-full border rounded px-3 py-2 mt-1" {...form.register('gen_subsidiary_company_percentage')} /></div>
            </div></div>
          </div>
        )}
      </div>
    </div>
  );
};
