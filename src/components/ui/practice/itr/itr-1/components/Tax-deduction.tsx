import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { TaxRegime } from "../itr-1.types.ts";

interface TaxDeductionProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  taxRegime?: string;
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
  type = "text",
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
          error ? "border-red-400" : "border-gray-300"
        } disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500`}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const TaxDeduction: React.FC<TaxDeductionProps> = ({
  form,
  onSubmit,
  onCancel,
  taxRegime,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const [showFormula, setShowFormula] = useState(false);
  const [taxBreakdown, setTaxBreakdown] = useState<any[]>([]);

  const isNewRegime = taxRegime === TaxRegime.New115BAC;

  const toNumber = (val: any) => {
    if (typeof val === "number") return val;
    const parsed = parseFloat(val || "0");
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  // Watch values for calculations
  const values = watch();
  
  const section80C = toNumber(watch("section80C"));
  const section80CCC = toNumber(watch("section80CCC"));
  const section80CCD1 = toNumber(watch("section80CCD1"));
  const section80CCD1B = toNumber(watch("section80CCD1B"));
  const section80CCD2 = toNumber(watch("section80CCD2"));
  const section80D = toNumber(watch("section80D"));
  const section80DD = toNumber(watch("section80DD"));
  const section80DDB = toNumber(watch("section80DDB"));
  const section80E = toNumber(watch("section80E"));
  const section80EE = toNumber(watch("section80EE"));
  const section80EEA = toNumber(watch("section80EEA"));
  const section80EEB = toNumber(watch("section80EEB"));
  const section80G = toNumber(watch("section80G"));
  const section80GG = toNumber(watch("section80GG"));
  const section80GGA = toNumber(watch("section80GGA"));
  const section80GGC = toNumber(watch("section80GGC"));
  const section80QQB = toNumber(watch("section80QQB"));
  const section80RRB = toNumber(watch("section80RRB"));
  const section80TTA = toNumber(watch("section80TTA"));
  const section80TTB = toNumber(watch("section80TTB"));
  const section80U = toNumber(watch("section80U"));
  const section80CCH = toNumber(watch("section80CCH"));
  const anyOtherDeductions = toNumber(watch("anyOtherDeductions"));

  const grossTotalIncome = toNumber(watch("grossTotalIncome"));
  
  // Exempt Income / 112A
  const ltcgSaleConsideration = toNumber(watch("ltcg112ATotalSaleConsideration"));
  const ltcgCostOfAcquisition = toNumber(watch("ltcg112ATotalCostOfAcquisition"));
  
  // Calculate LTCG 112A
  useEffect(() => {
    const gain = Math.max(0, ltcgSaleConsideration - ltcgCostOfAcquisition);
    setValue("ltcg112ALongTermCapitalGains", gain);
  }, [ltcgSaleConsideration, ltcgCostOfAcquisition, setValue]);

  // Calculate Total Deductions
  const calculateTotalDeductions = () => {
    if (isNewRegime) {
      // In New Regime, mainly 80CCD(2) and 80CCH are allowed
      // Note: Standard Deduction is technically a deduction from Salary head, dealt with in Gross Total Income
      // But 80CCD(2) (Employer contribution to NPS) is allowed.
      return section80CCD2 + section80CCH;
    }

    // Old Regime
    // 80C + 80CCC + 80CCD(1) limit 1.5L
    let agg80C = section80C + section80CCC + section80CCD1;
    if (agg80C > 150000) agg80C = 150000;

    // 80CCD(1B) limit 50k
    let val80CCD1B = section80CCD1B;
    if (val80CCD1B > 50000) val80CCD1B = 50000;

    // Others (simplified logic, assuming validations handle specific sub-limits roughly)
    return (
      agg80C +
      val80CCD1B +
      section80CCD2 +
      section80D +
      section80DD +
      section80DDB +
      section80E +
      section80EE +
      section80EEA +
      section80EEB +
      section80G +
      section80GG +
      section80GGA +
      section80GGC +
      section80QQB +
      section80RRB +
      section80TTA +
      section80TTB +
      section80U +
      section80CCH +
      anyOtherDeductions
    );
  };

  const totalDeductions = calculateTotalDeductions();
  const totalIncome = Math.max(0, Math.round((grossTotalIncome - totalDeductions) / 10) * 10); // Round to nearest 10

  // Update form values
  useEffect(() => {
    setValue("totalDeductions", totalDeductions);
    setValue("totalIncome", totalIncome);
  }, [totalDeductions, totalIncome, setValue]);

  // Tax Calculation Logic
  const calculateTax = (income: number) => {
    let tax = 0;
    const breakdown = [];

    if (isNewRegime) {
      // New Regime Slabs (AY 2024-25 / FY 2023-24 onwards default)
      // 0-3L: Nil
      // 3-6L: 5%
      // 6-9L: 10%
      // 9-12L: 15%
      // 12-15L: 20%
      // >15L: 30%
      
      const slabs = [
        { limit: 300000, rate: 0, label: "Up to ₹3,00,000" },
        { limit: 600000, rate: 0.05, label: "₹3,00,001 - ₹6,00,000" },
        { limit: 900000, rate: 0.10, label: "₹6,00,001 - ₹9,00,000" },
        { limit: 1200000, rate: 0.15, label: "₹9,00,001 - ₹12,00,000" },
        { limit: 1500000, rate: 0.20, label: "₹12,00,001 - ₹15,00,000" },
        { limit: Infinity, rate: 0.30, label: "Above ₹15,00,000" },
      ];

      let previousLimit = 0;
      let remainingIncome = income;

      for (const slab of slabs) {
        if (remainingIncome <= 0) break;
        
        const slabRange = slab.limit === Infinity ? remainingIncome : slab.limit - previousLimit;
        const taxableAtThisSlab = Math.min(remainingIncome, slabRange);
        
        if (taxableAtThisSlab > 0) {
          const taxAtThisSlab = taxableAtThisSlab * slab.rate;
          tax += taxAtThisSlab;
          breakdown.push({
            label: slab.label,
            rate: `${slab.rate * 100}%`,
            amount: taxableAtThisSlab,
            tax: taxAtThisSlab
          });
          remainingIncome -= taxableAtThisSlab;
        }
        previousLimit = slab.limit;
      }
      
      // Rebate u/s 87A for New Regime: Income <= 7,00,000, max rebate 25,000
      if (income <= 700000) {
        const rebate = Math.min(tax, 25000);
        if (rebate > 0) {
           breakdown.push({ label: "Rebate u/s 87A", rate: "-", amount: "-", tax: -rebate });
           tax -= rebate;
        }
      }

    } else {
      // Old Regime Slabs (General Citizen < 60) - Simplified for this context
      // 0-2.5L: Nil
      // 2.5-5L: 5%
      // 5-10L: 20%
      // >10L: 30%
      
      const slabs = [
        { limit: 250000, rate: 0, label: "Up to ₹2,50,000" },
        { limit: 500000, rate: 0.05, label: "₹2,50,001 - ₹5,00,000" },
        { limit: 1000000, rate: 0.20, label: "₹5,00,001 - ₹10,00,000" },
        { limit: Infinity, rate: 0.30, label: "Above ₹10,00,000" },
      ];

      let previousLimit = 0;
      let remainingIncome = income;

      for (const slab of slabs) {
        if (remainingIncome <= 0) break;
        
        const slabRange = slab.limit === Infinity ? remainingIncome : slab.limit - previousLimit;
        const taxableAtThisSlab = Math.min(remainingIncome, slabRange);
        
        if (taxableAtThisSlab > 0) {
          const taxAtThisSlab = taxableAtThisSlab * slab.rate;
          tax += taxAtThisSlab;
           breakdown.push({
            label: slab.label,
            rate: `${slab.rate * 100}%`,
            amount: taxableAtThisSlab,
            tax: taxAtThisSlab
          });
          remainingIncome -= taxableAtThisSlab;
        }
         previousLimit = slab.limit;
      }

      // Rebate u/s 87A for Old Regime: Income <= 5,00,000, max rebate 12,500
      if (income <= 500000) {
         const rebate = Math.min(tax, 12500);
         if (rebate > 0) {
           breakdown.push({ label: "Rebate u/s 87A", rate: "-", amount: "-", tax: -rebate });
           tax -= rebate;
        }
      }
    }

    return { tax: Math.round(tax), breakdown };
  };

  useEffect(() => {
    const { tax, breakdown } = calculateTax(totalIncome);
    setValue("taxPayableOnTotalIncome", tax);
    setTaxBreakdown(breakdown);
  }, [totalIncome, isNewRegime, setValue]);


  return (
    <section className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tax Deductions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Claim deductions to reduce your taxable income.
            </p>
             <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Current Regime: {taxRegime === TaxRegime.New115BAC ? "New Tax Regime" : "Old Tax Regime"}
            </div>
          </div>
          
           <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-xs text-gray-500">Gross Total Income</p>
              <p className="text-lg font-bold text-gray-900">₹{grossTotalIncome.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        {isNewRegime && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
             <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div className="text-sm text-yellow-800">
                <strong>Note:</strong> You have opted for the <strong>New Tax Regime</strong>. 
                Most deductions under Chapter VI-A (like 80C, 80D, 80G etc.) are <strong>NOT available</strong>. 
                Only deductions u/s 80CCD(2) (Employer contribution to NPS) and 80CCH (Agniveer Corpus Fund) are allowed.
              </div>
            </div>
          </div>
        )}

        {/* Deductions - Conditional Rendering */}
        <div className="grid gap-6 md:grid-cols-2">
          {!isNewRegime && (
            <>
              {/* 80C, 80CCC, 80CCD */}
              <div className="space-y-4 rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Part B - Deductions u/s 80C</h3>
                <InputField fieldCode="80C" label="Life Insurance, PPF, etc." name="section80C" type="number" register={register} placeholder="0" error={errors.section80C?.message} />
                <InputField fieldCode="80CCC" label="Annuity Plan of LIC/Other Insurer" name="section80CCC" type="number" register={register} placeholder="0" error={errors.section80CCC?.message} />
                <InputField fieldCode="80CCD(1)" label="Pension Scheme of Central Govt" name="section80CCD1" type="number" register={register} placeholder="0" error={errors.section80CCD1?.message} />
                <InputField fieldCode="80CCD(1B)" label="NPS Contribution (Additional ₹50k)" name="section80CCD1B" type="number" register={register} placeholder="0" error={errors.section80CCD1B?.message} />
              </div>

               {/* 80D & Health */}
               <div className="space-y-4 rounded-xl border border-gray-200 p-4">
                 <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Part C - Deductions u/s 80D</h3>
                 <InputField fieldCode="80D" label="Health Insurance Premium" name="section80D" type="number" register={register} placeholder="0" error={errors.section80D?.message} />
                 <InputField fieldCode="80DD" label="Maintenance of Dependent with Disability" name="section80DD" type="number" register={register} placeholder="0" error={errors.section80DD?.message} />
                 <InputField fieldCode="80DDB" label="Medical Treatment of Specified Diseases" name="section80DDB" type="number" register={register} placeholder="0" error={errors.section80DDB?.message} />
                 <InputField fieldCode="80U" label="Person with Disability" name="section80U" type="number" register={register} placeholder="0" error={errors.section80U?.message} />
               </div>

                {/* Other Deductions */}
                <div className="space-y-4 rounded-xl border border-gray-200 p-4 md:col-span-2">
                  <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Part D - Other Deductions</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <InputField fieldCode="80E" label="Interest on Higher Education Loan" name="section80E" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80EE" label="Interest on Residential House Loan (AY 17-18)" name="section80EE" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80EEA" label="Interest on Housing Loan (Affordable)" name="section80EEA" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80EEB" label="Interest on Electric Vehicle Loan" name="section80EEB" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80G" label="Donations to Certain Funds, Charities" name="section80G" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80GG" label="Rent Paid (Non-HRA)" name="section80GG" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80GGA" label="Donations for Scientific Research" name="section80GGA" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80GGC" label="Donations to Political Parties" name="section80GGC" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80TTA" label="Interest on Savings Account" name="section80TTA" type="number" register={register} placeholder="0" />
                    <InputField fieldCode="80TTB" label="Interest on Deposits (Senior Citizens)" name="section80TTB" type="number" register={register} placeholder="0" />
                  </div>
                </div>
            </>
          )}

           {/* Allowed in BOTH Regimes */}
           <div className={`space-y-4 rounded-xl border border-gray-200 p-4 ${isNewRegime ? "md:col-span-2 bg-blue-50/30" : "md:col-span-2"}`}>
              <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">
                 {isNewRegime ? "Allowed Deductions in New Regime" : "Other Allowed Deductions"}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                 <InputField fieldCode="80CCD(2)" label="Employer's Contribution to NPS" name="section80CCD2" type="number" register={register} placeholder="0" error={errors.section80CCD2?.message} />
                 <InputField fieldCode="80CCH" label="Agniveer Corpus Fund" name="section80CCH" type="number" register={register} placeholder="0" error={errors.section80CCH?.message} />
                 {!isNewRegime && (
                    <InputField label="Any Other Deductions" name="anyOtherDeductions" type="number" register={register} placeholder="0" />
                 )}
              </div>
           </div>
        </div>
        
        {/* Exempt Income 112A Fix */}
        <div className="rounded-xl border border-gray-200 p-4">
             <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-4">Exempt Income (For Reporting Purposes)</h3>
             <div className="grid gap-4 md:grid-cols-2">
                 <InputField label="Long Term Capital Gains (u/s 112A) Sale Consideration" name="ltcg112ATotalSaleConsideration" type="number" register={register} placeholder="0" />
                 <InputField label="Long Term Capital Gains (u/s 112A) Cost of Acquisition" name="ltcg112ATotalCostOfAcquisition" type="number" register={register} placeholder="0" />
                 <div className="md:col-span-2">
                     <p className="text-xs text-gray-500 mb-1">Calculated LTCG u/s 112A (Gain &gt; ₹1 Lakh is taxable @ 10%)</p>
                     <div className="rounded-md bg-gray-100 p-2 text-sm font-medium">
                        ₹ {toNumber(watch("ltcg112ALongTermCapitalGains")).toLocaleString('en-IN')}
                     </div>
                 </div>
             </div>
        </div>


        {/* Summary & Tax Calculation */}
        <div className="rounded-xl bg-gray-50 p-6">
           <h3 className="mb-4 text-lg font-bold text-gray-900">Tax Computation Summary</h3>
           <div className="space-y-3">
              <div className="flex justify-between text-sm">
                 <span className="text-gray-600">Gross Total Income</span>
                 <span className="font-medium">₹{grossTotalIncome.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-gray-600">Total Deductions</span>
                 <span className="font-medium text-green-600">- ₹{totalDeductions.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold">
                 <span>Total Taxable Income</span>
                 <span>₹{totalIncome.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="mt-4">
                 <button 
                  type="button" 
                  onClick={() => setShowFormula(!showFormula)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                 >
                   {showFormula ? "Hide Tax Calculation Formula" : "Show Tax Calculation Formula"}
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform ${showFormula ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
                 </button>
                 
                 {showFormula && (
                    <div className="mt-3 rounded-lg border border-gray-200 bg-white p-4 text-sm animate-in fade-in slide-in-from-top-2">
                       <h4 className="font-semibold text-gray-900 mb-2">Calculation Breakdown ({isNewRegime ? "New Regime" : "Old Regime"})</h4>
                       <div className="space-y-2">
                          <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 border-b pb-1">
                             <div className="col-span-2">Slab</div>
                             <div className="text-right">Rate</div>
                             <div className="text-right">Tax</div>
                          </div>
                          {taxBreakdown.map((item, idx) => (
                             <div key={idx} className="grid grid-cols-4 gap-2 text-xs">
                                <div className="col-span-2 text-gray-700">{item.label}</div>
                                <div className="text-right text-gray-600">{item.rate}</div>
                                <div className="text-right font-medium text-gray-900">
                                   {typeof item.tax === 'number' ? `₹${Math.abs(item.tax).toLocaleString('en-IN')}` : item.tax}
                                   {item.tax < 0 && " (Rebate)"}
                                </div>
                             </div>
                          ))}
                          <div className="border-t pt-2 mt-2 grid grid-cols-4 gap-2 font-bold text-gray-900">
                             <div className="col-span-3 text-right">Tax Payable</div>
                             <div className="text-right">₹{toNumber(watch("taxPayableOnTotalIncome")).toLocaleString('en-IN')}</div>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
           </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default TaxDeduction;
