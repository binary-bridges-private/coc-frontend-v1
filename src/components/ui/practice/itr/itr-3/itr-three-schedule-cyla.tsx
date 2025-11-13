"use client";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ScheduleCYLASchema = z
  .object({
    loss1IncomeCurrentYear: z.string().default("0"),
    loss1HouseProperty: z.string().default("0"),
    loss1BusinessProfit: z.string().default("0"),
    loss1OtherSources: z.string().default("0"),
    loss1RemainingAfterSetOff: z.string().default("0"),

    salaries2IncomeCurrentYear: z.string().default("0"),
    salaries2HouseProperty: z.string().default("0"),
    salaries2BusinessProfit: z.string().default("0"),
    salaries2OtherSources: z.string().default("0"),
    salaries2RemainingAfterSetOff: z.string().default("0"),

    houseProperty3IncomeCurrentYear: z.string().default("0"),
    houseProperty3HouseProperty: z.string().default("0"),
    houseProperty3BusinessProfit: z.string().default("0"),
    houseProperty3OtherSources: z.string().default("0"),
    houseProperty3RemainingAfterSetOff: z.string().default("0"),

    business4IncomeCurrentYear: z.string().default("0"),
    business4HouseProperty: z.string().default("0"),
    business4BusinessProfit: z.string().default("0"),
    business4OtherSources: z.string().default("0"),
    business4RemainingAfterSetOff: z.string().default("0"),

    speculative5IncomeCurrentYear: z.string().default("0"),
    speculative5HouseProperty: z.string().default("0"),
    speculative5BusinessProfit: z.string().default("0"),
    speculative5OtherSources: z.string().default("0"),
    speculative5RemainingAfterSetOff: z.string().default("0"),

    specified6IncomeCurrentYear: z.string().default("0"),
    specified6HouseProperty: z.string().default("0"),
    specified6BusinessProfit: z.string().default("0"),
    specified6OtherSources: z.string().default("0"),
    specified6RemainingAfterSetOff: z.string().default("0"),

    stcg7At15IncomeCurrentYear: z.string().default("0"),
    stcg7At15HouseProperty: z.string().default("0"),
    stcg7At15BusinessProfit: z.string().default("0"),
    stcg7At15OtherSources: z.string().default("0"),
    stcg7At15RemainingAfterSetOff: z.string().default("0"),

    stcg8At20IncomeCurrentYear: z.string().default("0"),
    stcg8At20HouseProperty: z.string().default("0"),
    stcg8At20BusinessProfit: z.string().default("0"),
    stcg8At20OtherSources: z.string().default("0"),
    stcg8At20RemainingAfterSetOff: z.string().default("0"),

    stcg9At30IncomeCurrentYear: z.string().default("0"),
    stcg9At30HouseProperty: z.string().default("0"),
    stcg9At30BusinessProfit: z.string().default("0"),
    stcg9At30OtherSources: z.string().default("0"),
    stcg9At30RemainingAfterSetOff: z.string().default("0"),

    stcg10AtApplicableIncomeCurrentYear: z.string().default("0"),
    stcg10AtApplicableHouseProperty: z.string().default("0"),
    stcg10AtApplicableBusinessProfit: z.string().default("0"),
    stcg10AtApplicableOtherSources: z.string().default("0"),
    stcg10AtApplicableRemainingAfterSetOff: z.string().default("0"),

    stcg11SpecialDTAAIncomeCurrentYear: z.string().default("0"),
    stcg11SpecialDTAAHouseProperty: z.string().default("0"),
    stcg11SpecialDTAABusinessProfit: z.string().default("0"),
    stcg11SpecialDTAAOtherSources: z.string().default("0"),
    stcg11SpecialDTAARemainingAfterSetOff: z.string().default("0"),

    ltcg12At10IncomeCurrentYear: z.string().default("0"),
    ltcg12At10HouseProperty: z.string().default("0"),
    ltcg12At10BusinessProfit: z.string().default("0"),
    ltcg12At10OtherSources: z.string().default("0"),
    ltcg12At10RemainingAfterSetOff: z.string().default("0"),

    ltcg13At12_5IncomeCurrentYear: z.string().default("0"),
    ltcg13At12_5HouseProperty: z.string().default("0"),
    ltcg13At12_5BusinessProfit: z.string().default("0"),
    ltcg13At12_5OtherSources: z.string().default("0"),
    ltcg13At12_5RemainingAfterSetOff: z.string().default("0"),

    ltcg14At20IncomeCurrentYear: z.string().default("0"),
    ltcg14At20HouseProperty: z.string().default("0"),
    ltcg14At20BusinessProfit: z.string().default("0"),
    ltcg14At20OtherSources: z.string().default("0"),
    ltcg14At20RemainingAfterSetOff: z.string().default("0"),

    ltcg15SpecialDTAAIncomeCurrentYear: z.string().default("0"),
    ltcg15SpecialDTAAHouseProperty: z.string().default("0"),
    ltcg15SpecialDTAABusinessProfit: z.string().default("0"),
    ltcg15SpecialDTAAOtherSources: z.string().default("0"),
    ltcg15SpecialDTAARemainingAfterSetOff: z.string().default("0"),

    netOS16IncomeCurrentYear: z.string().default("0"),
    netOS16HouseProperty: z.string().default("0"),
    netOS16BusinessProfit: z.string().default("0"),
    netOS16OtherSources: z.string().default("0"),
    netOS16RemainingAfterSetOff: z.string().default("0"),

    raceHorses17IncomeCurrentYear: z.string().default("0"),
    raceHorses17HouseProperty: z.string().default("0"),
    raceHorses17BusinessProfit: z.string().default("0"),
    raceHorses17OtherSources: z.string().default("0"),
    raceHorses17RemainingAfterSetOff: z.string().default("0"),

    otherSourcesSpecial18IncomeCurrentYear: z.string().default("0"),
    otherSourcesSpecial18HouseProperty: z.string().default("0"),
    otherSourcesSpecial18BusinessProfit: z.string().default("0"),
    otherSourcesSpecial18OtherSources: z.string().default("0"),
    otherSourcesSpecial18RemainingAfterSetOff: z.string().default("0"),

    totalLoss19IncomeCurrentYear: z.string().default("0"),
    totalLoss19HouseProperty: z.string().default("0"),
    totalLoss19BusinessProfit: z.string().default("0"),
    totalLoss19OtherSources: z.string().default("0"),

    lossRemaining20IncomeCurrentYear: z.string().default("0"),
    lossRemaining20HouseProperty: z.string().default("0"),
    lossRemaining20BusinessProfit: z.string().default("0"),
    lossRemaining20OtherSources: z.string().default("0"),
  })
  .superRefine((data, ctx) => {
    const isParentSelected =
      parseFloat(data.loss1IncomeCurrentYear || "0") > 0 ||
      parseFloat(data.loss1HouseProperty || "0") > 0 ||
      parseFloat(data.loss1BusinessProfit || "0") > 0 ||
      parseFloat(data.loss1OtherSources || "0") > 0 ||
      parseFloat(data.loss1RemainingAfterSetOff || "0") > 0;

    if (!isParentSelected) {
      return;
    }

    const numericFields = [
      "loss1IncomeCurrentYear",
      "loss1HouseProperty",
      "loss1BusinessProfit",
      "loss1OtherSources",
      "loss1RemainingAfterSetOff",
      "salaries2IncomeCurrentYear",
      "salaries2HouseProperty",
      "salaries2BusinessProfit",
      "salaries2OtherSources",
      "salaries2RemainingAfterSetOff",
      "houseProperty3IncomeCurrentYear",
      "houseProperty3HouseProperty",
      "houseProperty3BusinessProfit",
      "houseProperty3OtherSources",
      "houseProperty3RemainingAfterSetOff",
      "business4IncomeCurrentYear",
      "business4HouseProperty",
      "business4BusinessProfit",
      "business4OtherSources",
      "business4RemainingAfterSetOff",
      "speculative5IncomeCurrentYear",
      "speculative5HouseProperty",
      "speculative5BusinessProfit",
      "speculative5OtherSources",
      "speculative5RemainingAfterSetOff",
      "specified6IncomeCurrentYear",
      "specified6HouseProperty",
      "specified6BusinessProfit",
      "specified6OtherSources",
      "specified6RemainingAfterSetOff",
      "stcg7At15IncomeCurrentYear",
      "stcg7At15HouseProperty",
      "stcg7At15BusinessProfit",
      "stcg7At15OtherSources",
      "stcg7At15RemainingAfterSetOff",
      "stcg8At20IncomeCurrentYear",
      "stcg8At20HouseProperty",
      "stcg8At20BusinessProfit",
      "stcg8At20OtherSources",
      "stcg8At20RemainingAfterSetOff",
      "stcg9At30IncomeCurrentYear",
      "stcg9At30HouseProperty",
      "stcg9At30BusinessProfit",
      "stcg9At30OtherSources",
      "stcg9At30RemainingAfterSetOff",
      "stcg10AtApplicableIncomeCurrentYear",
      "stcg10AtApplicableHouseProperty",
      "stcg10AtApplicableBusinessProfit",
      "stcg10AtApplicableOtherSources",
      "stcg10AtApplicableRemainingAfterSetOff",
      "stcg11SpecialDTAAIncomeCurrentYear",
      "stcg11SpecialDTAAHouseProperty",
      "stcg11SpecialDTAABusinessProfit",
      "stcg11SpecialDTAAOtherSources",
      "stcg11SpecialDTAARemainingAfterSetOff",
      "ltcg12At10IncomeCurrentYear",
      "ltcg12At10HouseProperty",
      "ltcg12At10BusinessProfit",
      "ltcg12At10OtherSources",
      "ltcg12At10RemainingAfterSetOff",
      "ltcg13At12_5IncomeCurrentYear",
      "ltcg13At12_5HouseProperty",
      "ltcg13At12_5BusinessProfit",
      "ltcg13At12_5OtherSources",
      "ltcg13At12_5RemainingAfterSetOff",
      "ltcg14At20IncomeCurrentYear",
      "ltcg14At20HouseProperty",
      "ltcg14At20BusinessProfit",
      "ltcg14At20OtherSources",
      "ltcg14At20RemainingAfterSetOff",
      "ltcg15SpecialDTAAIncomeCurrentYear",
      "ltcg15SpecialDTAAHouseProperty",
      "ltcg15SpecialDTAABusinessProfit",
      "ltcg15SpecialDTAAOtherSources",
      "ltcg15SpecialDTAARemainingAfterSetOff",
      "netOS16IncomeCurrentYear",
      "netOS16HouseProperty",
      "netOS16BusinessProfit",
      "netOS16OtherSources",
      "netOS16RemainingAfterSetOff",
      "raceHorses17IncomeCurrentYear",
      "raceHorses17HouseProperty",
      "raceHorses17BusinessProfit",
      "raceHorses17OtherSources",
      "raceHorses17RemainingAfterSetOff",
      "otherSourcesSpecial18IncomeCurrentYear",
      "otherSourcesSpecial18HouseProperty",
      "otherSourcesSpecial18BusinessProfit",
      "otherSourcesSpecial18OtherSources",
      "otherSourcesSpecial18RemainingAfterSetOff",
      "totalLoss19IncomeCurrentYear",
      "totalLoss19HouseProperty",
      "totalLoss19BusinessProfit",
      "totalLoss19OtherSources",
      "lossRemaining20IncomeCurrentYear",
      "lossRemaining20HouseProperty",
      "lossRemaining20BusinessProfit",
      "lossRemaining20OtherSources",
    ] as const;

    numericFields.forEach((field) => {
      const value = data[field as keyof typeof data] as string | undefined;
      if (value !== undefined && value !== "") {
        const val = parseFloat(value);
        if (isNaN(val) || val < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `Must be a valid non-negative number`,
          });
        }
      }
    });
  });

export type ScheduleCYLAFormData = z.infer<typeof ScheduleCYLASchema>;

interface NumberInputProps {
  label: string;
  fieldName: keyof ScheduleCYLAFormData;
  control: any;
  errors: any;
  placeholder?: string;
  readOnly?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  fieldName,
  control,
  errors,
  placeholder = "0.00",
  readOnly = false,
}) => (
  <div>
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label}
    </label>
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <>
          <input
            {...field}
            type="text"
            readOnly={readOnly}
            value={field.value || ""}
            onChange={(e) => field.onChange(e.target.value)}
            className={`w-full px-2 py-1 border text-sm rounded focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              readOnly ? "bg-gray-100 cursor-not-allowed" : ""
            } ${errors[fieldName] ? "border-red-500" : "border-gray-300"}`}
            placeholder={placeholder}
          />
          {errors[fieldName] && (
            <p className="mt-0.5 text-xs text-red-600">
              {errors[fieldName].message}
            </p>
          )}
        </>
      )}
    />
  </div>
);

interface ScheduleCYLAProps {
  initialData?: Partial<ScheduleCYLAFormData>;
  onSave: (data: ScheduleCYLAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ItrThreeScheduleCYLA({
  initialData,
  onSave,
  onNext,
  onBack,
}: ScheduleCYLAProps) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleCYLAFormData>({
    resolver: zodResolver(ScheduleCYLASchema) as any,
    defaultValues: initialData || {},
    mode: "onChange",
  });

  const watchedValues = watch();

  const onSubmit: SubmitHandler<ScheduleCYLAFormData> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200 px-6 py-4 rounded-t-xl shadow-sm">
        <h1 className="text-2xl font-bold text-blue-900">
          Schedule CYL(A) - Details of Income after Set-off of Current Years
          Losses
        </h1>
        <p className="mt-1 text-sm text-blue-700">
          Compute loss set-off and carry-forward from current year losses (Items
          i-xviii)
        </p>
      </div>

      <div className="max-h-screen overflow-y-auto px-6 py-4 space-y-6">
        {/* Large scrollable table */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <div className="overflow-x-auto">
            <table className="w-full border border-blue-300 bg-white text-xs">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    Sl.No
                  </th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    Head/Source of Income
                  </th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    Income of current year
                  </th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    House property loss of the current year set off
                  </th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    Business Loss (other than speculation loss or specified
                    business income) of the current year set off
                  </th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    Other sources loss (other than loss from owning race horses
                    current year set off)
                  </th>
                  <th className="border border-blue-300 px-2 py-2 text-left font-semibold">
                    Current year's income remaining after set-off
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Loss to be set off */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    i
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Loss to be set off (Fill this row only if computed figure is
                    negative) (3 of Schedule-HP)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="loss1IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="loss1HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="loss1BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="loss1OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="loss1RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 2: Salaries */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    ii
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Salaries (6 of Schedule S)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="salaries2IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="salaries2HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="salaries2BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="salaries2OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="salaries2RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 3: House property */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    iii
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    House property (3 of Schedule HP)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="houseProperty3IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="houseProperty3HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="houseProperty3BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="houseProperty3OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="houseProperty3RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 4: Business */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    iv
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Income from Business (excluding speculation profit and
                    income from specified business) or profession (437 of
                    Schedule BP)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="business4IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="business4HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="business4BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="business4OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="business4RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 5: Speculative Income */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    v
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Speculative Income (3ii of item E of Schedule BP)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="speculative5IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="speculative5HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="speculative5BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="speculative5OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="speculative5RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 6: Specified Business Income */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    vi
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Specified Business Income (2 of item G of Schedule BP)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="specified6IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="specified6HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="specified6BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="specified6OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="specified6RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Rows 7-15: Capital Gains (keeping same structure) */}
                {/* Row 7: STCG @ 15% */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    vii(a)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Short-term capital gain taxable @ 15% (1)(i) of item E of
                    Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg7At15IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg7At15HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg7At15BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg7At15OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg7At15RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 8: STCG @ 20% */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    vii(b)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Short-term capital gain taxable @ 20% (1)(ii) of item E of
                    Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg8At20IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg8At20HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg8At20BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg8At20OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg8At20RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 9: STCG @ 30% */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    vii(c)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Short-term capital gain taxable @ 30% (1)(iii) of item E of
                    Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg9At30IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg9At30HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg9At30BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg9At30OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg9At30RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 10: STCG @ Applicable rates */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    vii(d)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Short-term capital gain taxable @ applicable rates (1)(iv)
                    of item E of Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg10AtApplicableIncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg10AtApplicableHouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg10AtApplicableBusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg10AtApplicableOtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg10AtApplicableRemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 11: STCG Special DTAA */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    vii(e)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Short-term capital gain taxable @ special rates in India as
                    per DTAA (1)(v) of item E of Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg11SpecialDTAAIncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg11SpecialDTAAHouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg11SpecialDTAABusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg11SpecialDTAAOtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="stcg11SpecialDTAARemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 12: LTCG @ 10% */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xi(a)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Long term capital gain taxable @ 10% (1)(i) of item E of
                    Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg12At10IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg12At10HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg12At10BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg12At10OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg12At10RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 13: LTCG @ 12.5% */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xi(b)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Long term capital gain taxable @ 12.5% (1)(ii) of item E of
                    Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg13At12_5IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg13At12_5HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg13At12_5BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg13At12_5OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg13At12_5RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 14: LTCG @ 20% */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xii
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Long term capital gain taxable @ 20% (1)(iii) of item E of
                    Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg14At20IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg14At20HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg14At20BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg14At20OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg14At20RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 15: LTCG Special DTAA */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xiii
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Long term capital gains taxable @ special rates in India as
                    per DTAA (1)(v) of item E of Schedule CG)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg15SpecialDTAAIncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg15SpecialDTAAHouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg15SpecialDTAABusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg15SpecialDTAAOtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="ltcg15SpecialDTAARemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 16: Net income from other sources */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xiv
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Net income from other sources chargeable at normal
                    applicable rates (6 of Schedule OS)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="netOS16IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="netOS16HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="netOS16BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="netOS16OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="netOS16RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 17: Race horses */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xv
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Profit from the activity of owning and maintaining race
                    horses (8a of Schedule OS)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="raceHorses17IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="raceHorses17HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="raceHorses17BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="raceHorses17OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="raceHorses17RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 18: Other sources special rates */}
                <tr className="hover:bg-blue-50">
                  <td className="border border-blue-300 px-2 py-2 font-semibold">
                    xvi
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    Income from other sources taxable at special rates in India
                    (2f of Schedule OS)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="otherSourcesSpecial18IncomeCurrentYear"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="otherSourcesSpecial18HouseProperty"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="otherSourcesSpecial18BusinessProfit"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="otherSourcesSpecial18OtherSources"
                      control={control}
                      errors={errors}
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="otherSourcesSpecial18RemainingAfterSetOff"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                </tr>

                {/* Row 19: Total loss set off */}
                <tr className="bg-gray-100 hover:bg-gray-150">
                  <td className="border border-blue-300 px-2 py-2 font-bold">
                    xvii
                  </td>
                  <td className="border border-blue-300 px-2 py-2 font-bold">
                    Total loss set off
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="totalLoss19IncomeCurrentYear"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="totalLoss19HouseProperty"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="totalLoss19BusinessProfit"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="totalLoss19OtherSources"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2"></td>
                </tr>

                {/* Row 20: Loss remaining after set-off */}
                <tr className="bg-blue-100 hover:bg-blue-150">
                  <td className="border border-blue-300 px-2 py-2 font-bold">
                    xviii
                  </td>
                  <td className="border border-blue-300 px-2 py-2 font-bold">
                    Loss remaining after set-off (i - xvii)
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="lossRemaining20IncomeCurrentYear"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="lossRemaining20HouseProperty"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="lossRemaining20BusinessProfit"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2">
                    <NumberInput
                      label=""
                      fieldName="lossRemaining20OtherSources"
                      control={control}
                      errors={errors}
                      readOnly
                    />
                  </td>
                  <td className="border border-blue-300 px-2 py-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== STICKY FOOTER ===== */}
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
          className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Save & Continue
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          Next Section
        </button>
      </div>
    </form>
  );
}
