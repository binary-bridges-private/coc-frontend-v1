import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ==================== TYPE DEFINITIONS ====================

export interface PropertyDetails {
  propertyId: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pinCode?: string;
  isCoOwned?: "yes" | "no";
  coOwnershipPercentage?: string;
  coOwnerName?: string;
  coOwnerPAN?: string;
  coOwnershipPercentageShare?: string;
}

export interface ScheduleHPFormData {
  property1?: PropertyDetails;
  
  // Annual details
  propertyType?: "self-occupied" | "let-out" | "semi-commercial" | "other";
  grossRentReceived?: string;
  municipalTaxPaid?: string;
  unrealizedRent?: string;
  annualValueSelfOccupied?: string;  // 1a - Self-occupied
  interestOnBorrowedCapital?: string; // 1b - Interest on borrowed capital
  details?: string;                   // Details to be filled
  totalOfA1?: string;                 // Total (1a - 1e)
  
  // Deductions
  annualValue?: string;               // Annual value (1a - 1d)
  stdDeduction?: string;              // Standard deduction
  interestPayable?: string;           // Interest payable on borrowed capital
  details2?: string;                  // Details to be filled
  totalDeductionsB1?: string;         // Total (1b - 1e)
  
  // Arrears and unrealized
  arrearsUnrealizedRentReceived?: string; // Arrears/Unrealized rent received
  arrearsUnrealizedRentReceivable?: string; // Amount of rent not receivable
  unrealizedRentBeforeYear?: string;  // Unrealized rent before year
  stdDedOnUnrealized?: string;        // Standard deduction on unrealized
  
  // Annual value calculation
  annualValueCalculated?: string;     // Calculated from gross - deductions
}

const propertyDetailsSchema = z.object({
  propertyId: z.string(),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  pinCode: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[0-9]{6}$/.test(val), {
      message: "PIN code must be 6 digits",
    }),
  isCoOwned: z.enum(["yes", "no"]).optional(),
  coOwnershipPercentage: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, "Must be between 0 and 100"),
  coOwnerName: z.string().optional().or(z.literal("")),
  coOwnerPAN: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val), {
      message: "PAN must be in format ABCDE1234F",
    }),
  coOwnershipPercentageShare: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    }, "Must be between 0 and 100"),
});

const scheduleHPSchema = z.object({
  property1: propertyDetailsSchema.optional(),
  
  propertyType: z.enum(["self-occupied", "let-out", "semi-commercial", "other"]).optional(),
  
  grossRentReceived: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  municipalTaxPaid: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  unrealizedRent: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  annualValueSelfOccupied: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  annualValue: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  stdDeduction: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  interestPayable: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  interestOnBorrowedCapital: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  arrearsUnrealizedRentReceived: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  arrearsUnrealizedRentReceivable: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  unrealizedRentBeforeYear: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  stdDedOnUnrealized: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Must be valid non-negative amount"),

  details: z.string().optional().or(z.literal("")),
  details2: z.string().optional().or(z.literal("")),
  totalOfA1: z.string().optional().or(z.literal("")),
  totalDeductionsB1: z.string().optional().or(z.literal("")),
  annualValueCalculated: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  // Calculate gross rent - municipal tax + unrealized
  const grossRent = parseFloat(data.grossRentReceived || "0") || 0;
  const municipalTax = parseFloat(data.municipalTaxPaid || "0") || 0;
  const unrealized = parseFloat(data.unrealizedRent || "0") || 0;

  // Validate gross rent >= municipal tax
  if (grossRent < municipalTax) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["municipalTaxPaid"],
      message: `Municipal tax (₹${municipalTax}) cannot exceed gross rent (₹${grossRent})`,
    });
  }

  // Calculate deductions
  const stdDed = parseFloat(data.stdDeduction || "0") || 0;
  const interestPayable = parseFloat(data.interestPayable || "0") || 0;

  const totalDeductions = stdDed + interestPayable;
  const grossAfterTax = grossRent - municipalTax;

  // Validate total deductions don't exceed gross after tax
  if (totalDeductions > grossAfterTax) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Total deductions (₹${totalDeductions}) cannot exceed gross rent after tax (₹${grossAfterTax})`,
    });
  }

  // Calculate annual value
  const annualValue = Math.max(0, grossAfterTax - totalDeductions);

  // Standard deduction limit: Max 30% of annual value or actual if property is self-occupied
  if (stdDed > annualValue * 0.3) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["stdDeduction"],
      message: `Standard deduction should typically be 30% of annual value or as per rules`,
    });
  }

  // Co-ownership percentage validation
  const coOwnershipPct = parseFloat(data.property1?.coOwnershipPercentage || "0") || 0;
  if (data.property1?.isCoOwned === "yes" && coOwnershipPct === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["property1"],
      message: "Please enter co-ownership percentage",
    });
  }

  // If co-owned, verify share percentage
  const coOwnerShare = parseFloat(data.property1?.coOwnershipPercentageShare || "0") || 0;
  if (
    data.property1?.isCoOwned === "yes" &&
    coOwnershipPct > 0 &&
    coOwnerShare > 0 &&
    Math.abs(coOwnershipPct - coOwnerShare) > 0.01
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["property1"],
      message: "Co-ownership percentage and share percentage should match",
    });
  }

  // Validate PAN for co-owner if co-owned
  if (
    data.property1?.isCoOwned === "yes" &&
    data.property1?.coOwnerName &&
    !data.property1?.coOwnerPAN
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["property1"],
      message: "PAN/Aadhaar of co-owner is required",
    });
  }

  console.log("🏠 Schedule HP Validation Details:", {
    propertyType: data.propertyType,
    grossRentReceived: grossRent,
    municipalTaxPaid: municipalTax,
    standardDeduction: stdDed,
    interestPayable: interestPayable,
    annualValueCalculated: annualValue,
  });
});

type ScheduleHPFormType = z.infer<typeof scheduleHPSchema>;

// ==================== REACT COMPONENT ====================

interface ScheduleHPProps {
  initialData?: ScheduleHPFormData;
  onSave: (data: ScheduleHPFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleHP({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleHPProps) {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ScheduleHPFormType>({
    resolver: zodResolver(scheduleHPSchema),
    mode: "onChange",
    defaultValues: initialData || {
      property1: { propertyId: "1" },
    },
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const formValues = watch();

  // Calculate annual value
  const calculations = useMemo(() => {
    const grossRent = parseFloat(formValues.grossRentReceived || "0") || 0;
    const municipalTax = parseFloat(formValues.municipalTaxPaid || "0") || 0;
    const stdDed = parseFloat(formValues.stdDeduction || "0") || 0;
    const interestPayable = parseFloat(formValues.interestPayable || "0") || 0;

    const grossAfterTax = Math.max(0, grossRent - municipalTax);
    const totalDeductions = stdDed + interestPayable;
    const annualValue = Math.max(0, grossAfterTax - totalDeductions);

    return {
      grossRent: grossRent.toFixed(2),
      grossAfterTax: grossAfterTax.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      annualValue: annualValue.toFixed(2),
    };
  }, [formValues]);

  // Collect all errors
  const allErrors = useMemo(() => {
    const errorList: string[] = [];
    Object.entries(errors).forEach(([field, error]) => {
      if (error && error.message) {
        errorList.push(`${field}: ${error.message}`);
      }
    });
    return errorList;
  }, [errors]);

  const onSubmit = (data: ScheduleHPFormType) => {
    onSave(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-900 mb-2">
            Schedule HP - Income from House Property
          </h1>
          <p className="text-orange-700">
            Provide details of income from house property for FY 2024-25
          </p>
        </div>

        {/* Error Banner */}
        {allErrors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <h3 className="text-red-900 font-bold mb-2">
              ⚠️ Please correct {allErrors.length} error(s):
            </h3>
            <ul className="text-red-800 text-sm space-y-1 max-h-32 overflow-y-auto">
              {allErrors.map((error, idx) => (
                <li key={idx}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Property Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-bold text-orange-900 mb-4">
              Property Details - Property 1
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address of Property
                </label>
                <input
                  {...register("property1.address")}
                  type="text"
                  placeholder="Enter property address"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.property1?.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                />
                {errors.property1?.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.property1.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town/City
                </label>
                <input
                  {...register("property1.city")}
                  type="text"
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  {...register("property1.state")}
                  type="text"
                  placeholder="Enter state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  {...register("property1.country")}
                  type="text"
                  placeholder="Enter country"
                  defaultValue="India"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PIN Code
                </label>
                <input
                  {...register("property1.pinCode")}
                  type="text"
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.property1?.pinCode
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-orange-500"
                  }`}
                />
                {errors.property1?.pinCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.property1.pinCode.message}
                  </p>
                )}
              </div>
            </div>

            {/* Co-ownership Section */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-orange-900 mb-4">Co-Ownership</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Is the property co-owned?
                  </label>
                  <select
                    {...register("property1.isCoOwned")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {formValues.property1?.isCoOwned === "yes" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Percentage of Share (%)
                      </label>
                      <input
                        {...register("property1.coOwnershipPercentage")}
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.property1?.coOwnershipPercentage
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-orange-500"
                        }`}
                      />
                      {errors.property1?.coOwnershipPercentage && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.property1.coOwnershipPercentage.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <h4 className="font-medium text-gray-700 mb-3">
                        Co-Owner Details
                      </h4>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name of Co-owner
                      </label>
                      <input
                        {...register("property1.coOwnerName")}
                        type="text"
                        placeholder="Enter co-owner name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PAN/Aadhaar of Co-owner
                      </label>
                      <input
                        {...register("property1.coOwnerPAN")}
                        type="text"
                        placeholder="Enter PAN or Aadhaar"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.property1?.coOwnerPAN
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-orange-500"
                        }`}
                      />
                      {errors.property1?.coOwnerPAN && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.property1.coOwnerPAN.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentage Share in Property (%)
                      </label>
                      <input
                        {...register("property1.coOwnershipPercentageShare")}
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        placeholder="0.00"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.property1?.coOwnershipPercentageShare
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-orange-500"
                        }`}
                      />
                      {errors.property1?.coOwnershipPercentageShare && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.property1.coOwnershipPercentageShare.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Annual Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-purple-900 mb-4">
              Annual Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <select
                  {...register("propertyType")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select property type</option>
                  <option value="self-occupied">Self-occupied</option>
                  <option value="let-out">Let out</option>
                  <option value="semi-commercial">Semi-commercial</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gross Rent Received
                </label>
                <input
                  {...register("grossRentReceived")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.grossRentReceived
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.grossRentReceived && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.grossRentReceived.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Municipal Tax Paid (1c)
                </label>
                <input
                  {...register("municipalTaxPaid")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.municipalTaxPaid
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.municipalTaxPaid && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.municipalTaxPaid.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unrealized Rent
                </label>
                <input
                  {...register("unrealizedRent")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.unrealizedRent
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.unrealizedRent && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.unrealizedRent.message}
                  </p>
                )}
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  For Self-occupied Property: Annual Value (1a)
                </label>
                <input
                  {...register("annualValueSelfOccupied")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.annualValueSelfOccupied
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-purple-500"
                  }`}
                />
                {errors.annualValueSelfOccupied && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.annualValueSelfOccupied.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Deductions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Deductions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Value (1a - 1d)
                </label>
                <input
                  {...register("annualValue")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.annualValue
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.annualValue && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.annualValue.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Standard Deduction (30% or actual)
                </label>
                <input
                  {...register("stdDeduction")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.stdDeduction
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.stdDeduction && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.stdDeduction.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Payable on Borrowed Capital (1b)
                </label>
                <input
                  {...register("interestPayable")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.interestPayable
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.interestPayable && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.interestPayable.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest on Borrowed Capital (1f)
                </label>
                <input
                  {...register("interestOnBorrowedCapital")}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.interestOnBorrowedCapital
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.interestOnBorrowedCapital && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.interestOnBorrowedCapital.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Calculations Display */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
            <h3 className="text-lg font-bold text-orange-900 mb-4">
              Annual Value Calculation
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-gray-600">Gross Rent Received</p>
                <p className="text-2xl font-bold text-blue-900">
                  ₹{parseFloat(calculations.grossRent).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-sm text-gray-600">After Municipal Tax</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{parseFloat(calculations.grossAfterTax).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-red-500">
                <p className="text-sm text-gray-600">Total Deductions</p>
                <p className="text-2xl font-bold text-red-900">
                  ₹{parseFloat(calculations.totalDeductions).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-sm text-gray-600">Annual Value</p>
                <p className="text-2xl font-bold text-green-900">
                  ₹{parseFloat(calculations.annualValue).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600 mb-2">
                Calculation Formula: (Gross Rent - Municipal Tax - Deductions)
              </p>
              <p className="text-gray-700">
                ({calculations.grossRent} - Municipal Tax - {calculations.totalDeductions}) = {calculations.annualValue}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-orange-600 text-white hover:bg-orange-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isValid}
              className={`px-8 py-3 font-semibold rounded-lg transition duration-200 ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
