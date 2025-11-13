"use client";

import { useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleSPISchema = z
  .object({
    // Assessee Details
    assesseePhone: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[6-9][0-9]{9}$/.test(val), {
        message: "Phone number must be 10 digits starting with 6-9",
      }),

    assesseeAadhaar: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || /^[2-9][0-9]{11}$/.test(val), {
        message: "Aadhaar must be 12 digits starting with 2-9",
      }),

    // Specified Persons (up to 3)
    person1Name: z.string().default(""),
    person1PAN: z.string().default(""),
    person1Aadhaar: z.string().default(""),
    person1Relationship: z.string().default(""),
    person1Amount: z.string().default("0"),
    person1HeadOfIncome: z.string().default(""),

    person2Name: z.string().default(""),
    person2PAN: z.string().default(""),
    person2Aadhaar: z.string().default(""),
    person2Relationship: z.string().default(""),
    person2Amount: z.string().default("0"),
    person2HeadOfIncome: z.string().default(""),

    person3Name: z.string().default(""),
    person3PAN: z.string().default(""),
    person3Aadhaar: z.string().default(""),
    person3Relationship: z.string().default(""),
    person3Amount: z.string().default("0"),
    person3HeadOfIncome: z.string().default(""),

    totalAmount: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    const validateNumeric = (value: string | undefined, fieldName: string, path: (string | number)[]) => {
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: "Must be a valid non-negative number",
          });
        }
      }
    };

    const validatePAN = (value: string | undefined, fieldName: string, path: (string | number)[]) => {
      if (value && value !== "" && value.trim() !== "") {
        if (!/^[A-Z0-9]{10}$/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: "PAN must be 10 alphanumeric characters",
          });
        }
      }
    };

    const validateAadhaar = (value: string | undefined, fieldName: string, path: (string | number)[]) => {
      if (value && value !== "" && value.trim() !== "") {
        if (!/^[2-9][0-9]{11}$/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path,
            message: "Aadhaar must be 12 digits starting with 2-9",
          });
        }
      }
    };

    // Validate Person 1
    validatePAN(data.person1PAN, "person1PAN", ["person1PAN"]);
    validateAadhaar(data.person1Aadhaar, "person1Aadhaar", ["person1Aadhaar"]);
    validateNumeric(data.person1Amount, "person1Amount", ["person1Amount"]);

    // Validate Person 2
    validatePAN(data.person2PAN, "person2PAN", ["person2PAN"]);
    validateAadhaar(data.person2Aadhaar, "person2Aadhaar", ["person2Aadhaar"]);
    validateNumeric(data.person2Amount, "person2Amount", ["person2Amount"]);

    // Validate Person 3
    validatePAN(data.person3PAN, "person3PAN", ["person3PAN"]);
    validateAadhaar(data.person3Aadhaar, "person3Aadhaar", ["person3Aadhaar"]);
    validateNumeric(data.person3Amount, "person3Amount", ["person3Amount"]);

    validateNumeric(data.totalAmount, "totalAmount", ["totalAmount"]);

    console.log("Schedule SPI - Specified Persons Includible in Income", data);
  });

export type ScheduleSPIFormData = z.infer<typeof ScheduleSPISchema>;

interface ScheduleSPIProps {
  initialData?: Partial<ScheduleSPIFormData>;
  onSave: (data: ScheduleSPIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleSPI({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleSPIProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleSPIFormData>({
    resolver: zodResolver(ScheduleSPISchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watched = watch();

  const calculations = useMemo(() => {
    const parseVal = (val: string | undefined): number =>
      parseFloat(val || "0") || 0;

    const total =
      parseVal(watched.person1Amount) +
      parseVal(watched.person2Amount) +
      parseVal(watched.person3Amount);

    return { total };
  }, [watched]);

  const onSubmit: SubmitHandler<ScheduleSPIFormData> = (data) => {
    onSave(data);
  };

  const renderPersonRow = (
    rowNum: 1 | 2 | 3
  ) => {
    const nameField = `person${rowNum}Name` as const;
    const panField = `person${rowNum}PAN` as const;
    const aadhaarField = `person${rowNum}Aadhaar` as const;
    const relationshipField = `person${rowNum}Relationship` as const;
    const amountField = `person${rowNum}Amount` as const;
    const headField = `person${rowNum}HeadOfIncome` as const;

    return (
      <tr key={rowNum} className="hover:bg-teal-50">
        <td className="border border-teal-300 px-4 py-3 font-semibold text-center">
          {rowNum}
        </td>
        <td className="border border-teal-300 px-4 py-3">
          <Controller
            name={nameField}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Name of person"
              />
            )}
          />
        </td>
        <td className="border border-teal-300 px-4 py-3">
          <Controller
            name={panField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm ${
                    errors[panField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="PAN"
                />
                {errors[panField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[panField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
        <td className="border border-teal-300 px-4 py-3">
          <Controller
            name={aadhaarField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm ${
                    errors[aadhaarField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Aadhaar (optional)"
                />
                {errors[aadhaarField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[aadhaarField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
        <td className="border border-teal-300 px-4 py-3">
          <Controller
            name={relationshipField}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="e.g., Spouse, Son"
              />
            )}
          />
        </td>
        <td className="border border-teal-300 px-4 py-3">
          <Controller
            name={amountField}
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  value={field.value || ""}
                  className={`w-full px-2 py-1 border rounded text-sm text-right ${
                    errors[amountField] ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="0.00"
                />
                {errors[amountField] && (
                  <p className="text-xs text-red-600 mt-0.5">
                    {(errors[amountField] as any)?.message}
                  </p>
                )}
              </>
            )}
          />
        </td>
        <td className="border border-teal-300 px-4 py-3">
          <Controller
            name={headField}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                value={field.value || ""}
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Head of Income"
              />
            )}
          />
        </td>
      </tr>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-teal-900">
          Schedule SPI - Specified Persons Includible in Income
        </h1>
        <p className="mt-1 text-sm text-teal-700">
          u/s 64(1A) - Income of specified persons (spouse, minor child, etc.)
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-8">
        
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Assessee Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number (10 digits)
              </label>
              <Controller
                name="assesseePhone"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        errors.assesseePhone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., 9876543210"
                    />
                    {errors.assesseePhone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.assesseePhone.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number (12 digits)
              </label>
              <Controller
                name="assesseeAadhaar"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                        errors.assesseeAadhaar ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="e.g., 123456789012"
                    />
                    {errors.assesseeAadhaar && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.assesseeAadhaar.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>

        {/* Specified Persons Table */}
        <div className="rounded-xl border border-teal-200 bg-teal-50 p-6">
          <h2 className="text-lg font-bold text-teal-900 mb-6">
            Income of Specified Persons (Spouse, Minor Child, etc.)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-teal-300 bg-white text-xs">
              <thead className="bg-teal-200">
                <tr>
                  <th className="border border-teal-300 px-4 py-3 text-center font-semibold" style={{ width: "40px" }}>
                    Sl.No.
                  </th>
                  <th className="border border-teal-300 px-4 py-3 text-left font-semibold">
                    Name of person
                  </th>
                  <th className="border border-teal-300 px-4 py-3 text-left font-semibold">
                    PAN/Aadhaar No.
                  </th>
                  <th className="border border-teal-300 px-4 py-3 text-left font-semibold">
                    Aadhaar (optional)
                  </th>
                  <th className="border border-teal-300 px-4 py-3 text-left font-semibold">
                    Relationship
                  </th>
                  <th className="border border-teal-300 px-4 py-3 text-right font-semibold">
                    Amount (₹)
                  </th>
                  <th className="border border-teal-300 px-4 py-3 text-left font-semibold">
                    Head of Income is included
                  </th>
                </tr>
              </thead>
              <tbody>
                {renderPersonRow(1)}
                {renderPersonRow(2)}
                {renderPersonRow(3)}
              </tbody>
              <tfoot className="bg-teal-100 font-bold">
                <tr>
                  <td colSpan={5} className="border border-teal-300 px-4 py-3">
                    Total
                  </td>
                  <td className="border border-teal-300 px-4 py-3 text-right">
                    ₹{calculations.total.toFixed(2)}
                  </td>
                  <td className="border border-teal-300 px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-xl border-2 border-teal-900 bg-teal-100 p-6">
          <h3 className="text-lg font-bold text-teal-900 mb-4">
            Total Income from Specified Persons
          </h3>
          <div className="bg-white p-6 rounded-lg border-2 border-teal-300">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Total Amount:
            </p>
            <p className="text-3xl font-bold text-teal-700">
              ₹{calculations.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-6 py-4 flex items-center justify-between gap-4 shadow-lg rounded-b-xl">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Back to Summary
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
