import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schedule5ASchema = z
  .object({
    spouseName: z.string().min(1, "Spouse name required"),
    spousePAN: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) =>
          !val ||
          (val.trim().length === 10 &&
            /^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(val.trim())),
        "Invalid PAN format (e.g., ABCDE1234F)"
      ),
    spouseAadhaar: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || /^\d{12}$/.test(val),
        "Valid 12-digit Aadhaar required"
      ),

    housePropertyReceipts: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    housePropertyAmountApportioned: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    housePropertyTDSDeducted: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    housePropertyTDSApportioned: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),

    capitalGainsReceipts: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    capitalGainsAmountApportioned: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    capitalGainsTDSDeducted: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    capitalGainsTDSApportioned: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),

    otherSourcesReceipts: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    otherSourcesAmountApportioned: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    otherSourcesTDSDeducted: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),
    otherSourcesTDSApportioned: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
      .optional()
      .or(z.literal("")),

    totalReceipts: z.string().optional(),
    totalAmountApportioned: z.string().optional(),
    totalTDSDeducted: z.string().optional(),
    totalTDSApportioned: z.string().optional(),
  })
  .refine((data) => data.spousePAN || data.spouseAadhaar, {
    message: "Either PAN or Aadhaar is required",
    path: ["spousePAN"],
  });

export type Schedule5AFormData = z.infer<typeof schedule5ASchema>;

interface ItrTwo5AProps {
  onSave: (data: Schedule5AFormData) => void;
  onBack: () => void;
  initialData?: Schedule5AFormData;
}

const ItrTwo5A: React.FC<ItrTwo5AProps> = ({ onSave, onBack, initialData }) => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule5AFormData>({
    resolver: zodResolver(schedule5ASchema),
    defaultValues: initialData || {
      spouseName: "",
      spousePAN: "",
      spouseAadhaar: "",
      housePropertyReceipts: "",
      housePropertyAmountApportioned: "",
      housePropertyTDSDeducted: "",
      housePropertyTDSApportioned: "",
      capitalGainsReceipts: "",
      capitalGainsAmountApportioned: "",
      capitalGainsTDSDeducted: "",
      capitalGainsTDSApportioned: "",
      otherSourcesReceipts: "",
      otherSourcesAmountApportioned: "",
      otherSourcesTDSDeducted: "",
      otherSourcesTDSApportioned: "",
      totalReceipts: "0",
      totalAmountApportioned: "0",
      totalTDSDeducted: "0",
      totalTDSApportioned: "0",
    },
  });

  const all = watch();

  const calculateTotals = () => {
    const houseReceipts = parseFloat(all.housePropertyReceipts || "0");
    const houseApportioned = parseFloat(
      all.housePropertyAmountApportioned || "0"
    );
    const houseTDSDeducted = parseFloat(all.housePropertyTDSDeducted || "0");
    const houseTDSApportioned = parseFloat(
      all.housePropertyTDSApportioned || "0"
    );

    const cgReceipts = parseFloat(all.capitalGainsReceipts || "0");
    const cgApportioned = parseFloat(all.capitalGainsAmountApportioned || "0");
    const cgTDSDeducted = parseFloat(all.capitalGainsTDSDeducted || "0");
    const cgTDSApportioned = parseFloat(all.capitalGainsTDSApportioned || "0");

    const osReceipts = parseFloat(all.otherSourcesReceipts || "0");
    const osApportioned = parseFloat(all.otherSourcesAmountApportioned || "0");
    const osTDSDeducted = parseFloat(all.otherSourcesTDSDeducted || "0");
    const osTDSApportioned = parseFloat(all.otherSourcesTDSApportioned || "0");

    const totalReceipts = houseReceipts + cgReceipts + osReceipts;
    const totalApportioned = houseApportioned + cgApportioned + osApportioned;
    const totalTDSDeducted = houseTDSDeducted + cgTDSDeducted + osTDSDeducted;
    const totalTDSApportioned =
      houseTDSApportioned + cgTDSApportioned + osTDSApportioned;

    setValue("totalReceipts", totalReceipts.toFixed(2));
    setValue("totalAmountApportioned", totalApportioned.toFixed(2));
    setValue("totalTDSDeducted", totalTDSDeducted.toFixed(2));
    setValue("totalTDSApportioned", totalTDSApportioned.toFixed(2));
  };

  useEffect(() => {
    calculateTotals();
  }, [
    all.housePropertyReceipts,
    all.housePropertyAmountApportioned,
    all.housePropertyTDSDeducted,
    all.housePropertyTDSApportioned,
    all.capitalGainsReceipts,
    all.capitalGainsAmountApportioned,
    all.capitalGainsTDSDeducted,
    all.capitalGainsTDSApportioned,
    all.otherSourcesReceipts,
    all.otherSourcesAmountApportioned,
    all.otherSourcesTDSDeducted,
    all.otherSourcesTDSApportioned,
  ]);

  const onSubmit = (data: Schedule5AFormData) => {
    calculateTotals();
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Schedule 5A - Apportionment of Income
        </h2>
        <p className="mt-1.5 text-sm text-gray-600">
          Information regarding apportionment of income between spouses governed
          by Portuguese Civil Code
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Spouse Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Spouse Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name of the Spouse <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("spouseName")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Full name"
              />
              {errors.spouseName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.spouseName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN / Aadhaar No. of the Spouse{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("spousePAN")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 uppercase"
                placeholder="ABCDE1234F"
                maxLength={10}
                style={{ textTransform: "uppercase" }}
                onBlur={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
              {errors.spousePAN && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.spousePAN.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number (Optional)
              </label>
              <input
                type="text"
                {...register("spouseAadhaar")}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                placeholder="12-digit Aadhaar"
                maxLength={12}
              />
              {errors.spouseAadhaar && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.spouseAadhaar.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Income Apportionment Table */}
        <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Income Apportionment Details
          </h3>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th
                    className="border border-gray-300 px-3 py-2 text-left"
                    rowSpan={2}
                  >
                    Heads of Income
                    <br />
                    (i)
                  </th>
                  <th
                    className="border border-gray-300 px-3 py-2 text-center"
                    rowSpan={2}
                  >
                    Receipts under the head
                    <br />
                    (ii)
                  </th>
                  <th
                    className="border border-gray-300 px-3 py-2 text-center"
                    rowSpan={2}
                  >
                    Amount apportioned in the hands of the spouse
                    <br />
                    (iii)
                  </th>
                  <th
                    className="border border-gray-300 px-3 py-2 text-center"
                    colSpan={2}
                  >
                    Amount of TDS deducted on income at (ii)
                  </th>
                </tr>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-3 py-2 text-center">
                    (iv)
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center">
                    TDS apportioned in the hands of spouse
                    <br />
                    (v)
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: House Property */}
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">
                    1. House Property
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("housePropertyReceipts")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("housePropertyAmountApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("housePropertyTDSDeducted")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("housePropertyTDSApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                </tr>

                {/* Row 2: Capital Gains */}
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">
                    2. Capital gains
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("capitalGainsReceipts")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("capitalGainsAmountApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("capitalGainsTDSDeducted")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("capitalGainsTDSApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                </tr>

                {/* Row 3: Other Sources */}
                <tr className="bg-white">
                  <td className="border border-gray-300 px-3 py-2 font-semibold">
                    3. Other sources
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("otherSourcesReceipts")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("otherSourcesAmountApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("otherSourcesTDSDeducted")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("otherSourcesTDSApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-right"
                      placeholder="0.00"
                    />
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="border border-gray-300 px-3 py-2">4. Total</td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("totalReceipts")}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("totalAmountApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("totalTDSDeducted")}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    <input
                      type="number"
                      step="0.01"
                      {...register("totalTDSApportioned")}
                      className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-200 text-right font-semibold"
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Save Schedule 5A
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwo5A;
