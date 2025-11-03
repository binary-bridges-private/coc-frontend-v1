import React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface TaxDeductionProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: any;
  maxLength?: number;
  required?: boolean;
  disabled?: boolean;
  fieldCode?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  error,
  maxLength,
  required,
  disabled,
  fieldCode,
}) => (
  <div className="flex flex-col gap-2">
    {label && (
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
    )}
    <div className="flex items-center gap-2">
      {fieldCode && (
        <span className="flex h-10 w-12 flex-shrink-0 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">
          {fieldCode}
        </span>
      )}
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={`flex-1 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${
          error ? 'border-red-400' : 'border-gray-300'
        } disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const TaxDeduction: React.FC<TaxDeductionProps> = ({ form, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const toNumber = (val: any) => {
    if (typeof val === 'number') return val;
    const parsed = parseFloat(val || '0');
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  // Watch all deduction fields for calculations
  const deductions = {
    section80C: toNumber(watch('section80C')),
    section80CCC: toNumber(watch('section80CCC')),
    section80CCD1: toNumber(watch('section80CCD1')),
    section80CCD1B: toNumber(watch('section80CCD1B')),
    section80CCD2: toNumber(watch('section80CCD2')),
    section80D: toNumber(watch('section80D')),
    section80DD: toNumber(watch('section80DD')),
    section80DDB: toNumber(watch('section80DDB')),
    section80E: toNumber(watch('section80E')),
    section80EE: toNumber(watch('section80EE')),
    section80EEA: toNumber(watch('section80EEA')),
    section80EEB: toNumber(watch('section80EEB')),
    section80G: toNumber(watch('section80G')),
    section80GG: toNumber(watch('section80GG')),
    section80GGA: toNumber(watch('section80GGA')),
    section80GGC: toNumber(watch('section80GGC')),
    section80TTA: toNumber(watch('section80TTA')),
    section80TTB: toNumber(watch('section80TTB')),
    section80U: toNumber(watch('section80U')),
    section80CCH: toNumber(watch('section80CCH')),
    anyOther: toNumber(watch('anyOtherDeductions')),
  };

  const totalDeductions = Object.values(deductions).reduce((sum, val) => sum + val, 0);
  const grossTotalIncome = toNumber(watch('grossTotalIncome')) || 0;
  const totalIncome = grossTotalIncome - totalDeductions;

  return (
    <section className="space-y-6">
  

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 ">
        
        {/* Info Banner */}
        <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-700">
            <strong>💡 Helpful Tip:</strong> Ensure you have supporting documents for all deduction claims as per Income Tax Act provisions
          </p>
        </div>

        {/* Section 80C & 80CCC */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="mb-3 text-sm font-semibold text-gray-900">Section 80C & 80CCC - Investment Deductions</h4>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="80C - Life insurance, provident fund, etc."
              name="section80C"
              type="number"
              placeholder="Enter amount (Max: ₹1,50,000)"
              register={register}
              error={errors.section80C?.message}
              fieldCode="5a"
            />
            <InputField
              label="80CCC - Payment in respect Pension Fund"
              name="section80CCC"
              type="number"
              placeholder="Enter amount (Max: ₹1,50,000)"
              register={register}
              error={errors.section80CCC?.message}
              fieldCode="5b"
            />
          </div>
        </div>

            {/* Section 80CCD(1) and 80CCD(1B) */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Section 80CCD - Pension Scheme Contributions</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <div className="font-medium text-gray-800">80CCD(1) - Contribution to pension scheme of Central Government</div>
                    <p className="mt-1 text-xs text-gray-500">Part of overall 80C limit</p>
                  </div>
                  <InputField
                    label=""
                    name="section80CCD1"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80CCD1?.message}
                    fieldCode="5c"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <div className="font-medium text-gray-800">80CCD(1B) - Additional contribution to pension scheme</div>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹50,000 (Over and above 80C)</p>
                  </div>
                  <InputField
                    label=""
                    name="section80CCD1B"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80CCD1B?.message}
                    fieldCode="5d"
                  />
                </div>
              </div>

              {/* PRAN of taxpayer for 80CCD(1B) */}
              <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 ">
                <label className="mb-2 block text-sm font-semibold text-gray-700">PRAN of the taxpayer</label>
                <input
                  type="text"
                  {...register('pranTaxpayer')}
                  placeholder="Enter 12-digit PRAN number"
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-purple-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>

              {/* Section 80CCD(2) */}
              <div className="mt-4 space-y-2">
                <div className="rounded-md bg-white p-3 text-sm ">
                  <div className="font-medium text-gray-800">80CCD(2) - Employer's contribution to pension scheme</div>
                  <p className="mt-1 text-xs text-gray-500">No upper limit (14% of salary)</p>
                </div>
                <InputField
                  label=""
                  name="section80CCD2"
                  type="number"
                  placeholder="Enter amount"
                  register={register}
                  error={errors.section80CCD2?.message}
                  fieldCode="5e"
                />
              </div>
            </div>

            {/* Section 80D & 80DD - Health */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">Health & Medical Deductions</h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80D - Deduction in respect of Health Insurance premia
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Please fill 80D Schedule. Max limit: ₹1,00,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80D"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80D?.message}
                    fieldCode="5f"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80DD - Maintenance including medical treatment of a dependent who is a person with disability
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Please fill 80DD Schedule. Max limit: ₹1,25,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80DD"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80DD?.message}
                    fieldCode="5g"
                  />
                </div>
              </div>
            </div>

            {/*Section 80DDB - Medical treatment */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">💊Section 80DDB - Specified Disease Treatment</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4  md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Category of Disease</label>
                    <select
                      {...register('specifiedDiseaseName')}
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-amber-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
                    >
                      <option value="">(Select disease category)</option>
                      <option>Neurological Diseases</option>
                      <option>Cancer</option>
                      <option>AIDS</option>
                      <option>Chronic Renal Failure</option>
                      <option>Hemophilia</option>
                      <option>Thalassaemia</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Specific Disease Name</label>
                    <select className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-amber-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200">
                      <option>(Select specific disease)</option>
                    </select>
                  </div>
                </div>
                <div className="rounded-md bg-white p-3 text-sm ">
                  <div className="font-medium text-gray-800">Deduction Amount</div>
                  <p className="mt-1 text-xs text-gray-500">Max limit: ₹1,00,000</p>
                </div>
                <InputField
                  label=""
                  name="section80DDB"
                  type="number"
                  placeholder="Enter amount"
                  register={register}
                  error={errors.section80DDB?.message}
                  fieldCode="5h"
                />
              </div>
            </div>

            {/* Section 80E - 80EEB - Loan Interest Deductions */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">🎓Section 80E, 80EE, 80EEA, 80EEB - Loan Interest Deductions</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80E - Interest on loan taken for higher education
                    </a>
                    <p className="mt-1 text-xs text-gray-500">No upper limit</p>
                  </div>
                  <InputField
                    label=""
                    name="section80E"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80E?.message}
                    fieldCode="5i"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80EE - Interest on loan taken for residential house property
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹50,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80EE"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80EE?.message}
                    fieldCode="5j"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80EEA - Interest on loan taken for certain house property
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹1,50,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80EEA"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80EEA?.message}
                    fieldCode="5k"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80EEB - Deduction in respect of purchase of electric vehicle
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹1,50,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80EEB"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80EEB?.message}
                    fieldCode="5l"
                  />
                </div>
              </div>
            </div>

            {/*Section 80G & 80GG - Donations & Rent */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">❤️Section 80G & 80GG - Donations & Rent</h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80G - Donations to certain funds, charitable institutions, etc.
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Please fill 80G Schedule. This field is auto-populated from schedule 80G.</p>
                  </div>
                  <InputField
                    label=""
                    name="section80G"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80G?.message}
                    fieldCode="5m"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <div className="font-medium text-gray-800">80GG - Rent paid (Please submit form 10BA to claim deduction)</div>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹60,000</p>
                  </div>
                  <div className="rounded-lg border-2 border-rose-200 bg-white p-4 ">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">Acknowledgement number of Form 10BA</label>
                    <input
                      type="text"
                      {...register('form10BAAckNumber')}
                      placeholder="Enter acknowledgement number"
                      className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-medium transition-all hover:border-rose-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                  </div>
                  <InputField
                    label=""
                    name="section80GG"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80GG?.message}
                    fieldCode="5n"
                  />
                </div>
              </div>
            </div>

            {/* Section 80GGA and 80GGC */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">🔬Section 80GGA & 80GGC - Research & Political Donations</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80GGA - Donations for scientific research or rural development
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Please fill 80GGA Schedule. Auto-populated from schedule.</p>
                  </div>
                  <InputField
                    label=""
                    name="section80GGA"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80GGA?.message}
                    fieldCode="5o"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80GGC - Contribution to Political party
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Please fill 80GGC Schedule. Auto-populated from schedule.</p>
                  </div>
                  <InputField
                    label=""
                    name="section80GGC"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80GGC?.message}
                    fieldCode="5p"
                  />
                </div>
              </div>
            </div>

            {/* Section 80TTA and 80TTB */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">💰Section 80TTA & 80TTB - Interest Income Deductions</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <div className="font-medium text-gray-800">80TTA - Interest on saving bank Accounts (Non-Senior Citizens)</div>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹10,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80TTA"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80TTA?.message}
                    fieldCode="5q"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <div className="font-medium text-gray-800">80TTB - Interest on deposits (Resident Senior Citizens)</div>
                    <p className="mt-1 text-xs text-gray-500">Max limit: ₹50,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80TTB"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80TTB?.message}
                    fieldCode="5r"
                  />
                </div>
              </div>
            </div>

            {/*Section 80U & 80CCH */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">🌟Section 80U & 80CCH - Other Deductions</h4>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
                      80U - In case of a person with disability
                    </a>
                    <p className="mt-1 text-xs text-gray-500">Please fill 80U Schedule. Max limit: ₹1,25,000</p>
                  </div>
                  <InputField
                    label=""
                    name="section80U"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80U?.message}
                    fieldCode="5s"
                  />
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white p-3 text-sm ">
                    <div className="font-medium text-gray-800">80CCH - Contribution to Agnipath Scheme</div>
                    <p className="mt-1 text-xs text-gray-500">As per applicable provisions</p>
                  </div>
                  <InputField
                    label=""
                    name="section80CCH"
                    type="number"
                    placeholder="Enter amount"
                    register={register}
                    error={errors.section80CCH?.message}
                    fieldCode="5t"
                  />
                </div>
              </div>
            </div>

            {/*Any Other Deductions */}
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-900">📝Any Other Deductions</h4>
              <div className="space-y-2">
                <div className="rounded-md bg-white p-3 text-sm ">
                  <div className="font-medium text-gray-800">Other deductions not covered above</div>
                  <p className="mt-1 text-xs text-gray-500">Specify any additional deductions</p>
                </div>
                <InputField
                  label=""
                  name="anyOtherDeductions"
                  type="number"
                  placeholder="Enter amount"
                  register={register}
                  error={errors.anyOtherDeductions?.message}
                  fieldCode="5u"
                />
              </div>
            </div>

        {/* Total Deductions and Total Income */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Summary - Total Deductions & Income</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">6</span>
                <span className="text-sm font-medium text-gray-900">Total Deductions (Total of 5a to 5t)</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                ₹{totalDeductions.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">7</span>
                <span className="text-sm font-medium text-gray-900">Total Income (Gross Total Income - Total Deductions)</span>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                ₹{totalIncome.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Exempt Income Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Exempt Income: For reporting purpose and Income on which no tax is payable
          </h3>
          
          <div className="space-y-3">
            <div className="rounded-lg bg-gray-50 p-3 text-sm border border-gray-200">
              <strong className="text-gray-900">Note:</strong> <span className="text-gray-700">Drop down to be provided in e-filing utility mentioning nature of exempt income, relevant clause and section</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 w-20">Sl.No.</th>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">Nature of Income</th>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">Description (If 'Any Other' selected)</th>
                    <th className="border border-gray-300 p-3 text-left text-sm font-semibold text-gray-700 w-48">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2].map((rowNum) => (
                    <tr key={rowNum} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 text-center text-sm font-medium text-gray-700">{rowNum}</td>
                      <td className="border border-gray-300 p-3">
                        <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
                          <option>(Select nature of income)</option>
                          <option>Agricultural Income</option>
                          <option>Dividend Income</option>
                          <option>Interest Income</option>
                          <option>Any Other</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 p-3 text-sm text-gray-600">Not Applicable</td>
                      <td className="border border-gray-300 p-3">
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-3 shadow-md">
                <span className="text-sm font-bold text-gray-900">Total Exempt Income: </span>
                <span className="text-xl font-bold text-green-700">₹0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Long Term Capital Gains Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            7a. Long Term Capital Gains u/s 112A (Not chargeable to Income-tax)
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">i</span>
                <span className="text-sm font-medium text-gray-900">Total sale consideration</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">ii</span>
                <span className="text-sm font-medium text-gray-900">Total cost of acquisition</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">iii</span>
                <span className="text-sm font-medium text-gray-900">Long term capital gains as per sec 112A</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
          </div>
        </div>

        {/* Tax Calculation Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Tax Calculation Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">8</span>
                <span className="text-sm font-medium text-gray-900">Tax Payable on Total Income</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">9</span>
                <span className="text-sm font-medium text-gray-900">Rebate u/s 87A</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">10</span>
                <span className="text-sm font-medium text-gray-900">Tax payable after Rebate</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">11</span>
                <span className="text-sm font-medium text-gray-900">Health and Education Cess @4% on (10)</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">12</span>
                <span className="text-sm font-medium text-gray-900">Total Tax and Cess</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">13</span>
                <span className="text-sm font-medium text-gray-900">
                  Relief u/s 89 <span className="text-xs text-gray-600">(Submit Form 10E to claim)</span>
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">14</span>
                <span className="text-sm font-medium text-gray-900">Balance Tax after Relief (12-13)</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
          </div>
        </div>

        {/* Interest Section */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">15. Interest u/s 234 & Fee</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">15a</span>
                <span className="text-sm font-medium text-gray-900">Interest u/s 234 A</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">15b</span>
                <span className="text-sm font-medium text-gray-900">Interest u/s 234 B</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">15c</span>
                <span className="text-sm font-medium text-gray-900">Interest u/s 234 C</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-12 items-center justify-center rounded border border-gray-400 bg-gray-100 text-xs font-semibold text-gray-700">15d</span>
                <span className="text-sm font-medium text-gray-900">Fee u/s 234F</span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">16</span>
                <span className="text-sm font-medium text-gray-900">
                  Total Interest & Fee Payable (15a + 15b + 15c + 15d)
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-700">17</span>
                <span className="text-sm font-medium text-gray-900">
                  Total Tax, Fee and Interest (14 + 16)
                </span>
              </div>
              <div className="text-sm font-medium text-gray-900">₹ 0</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaxDeduction;
