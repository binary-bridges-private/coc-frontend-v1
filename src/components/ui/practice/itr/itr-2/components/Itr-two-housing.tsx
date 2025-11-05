import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  housePropertySchema,
  HousePropertyFormData,
} from "../itr-two.validation.ts";
import { PersonalInfoFormData } from "../itr-two.validation.ts";

interface ItrTwoHousingProps {
  onComplete: (data: HousePropertyFormData) => void;
  initialData?: Partial<HousePropertyFormData>;
  personalInfo?: PersonalInfoFormData;
}

const ItrTwoHousing: React.FC<ItrTwoHousingProps> = ({
  onComplete,
  initialData,
  personalInfo,
}) => {
  const [visibleCalculations, setVisibleCalculations] = useState<
    Record<string, boolean>
  >({});

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<HousePropertyFormData>({
    resolver: zodResolver(housePropertySchema) as any,
    defaultValues: initialData || {
      properties: [
        {
          propertyAddress: "",
          townCity: "",
          state: "",
          country: "India",
          pinCode: "",
          isCoOwned: "No",
          ownershipPercentage: 100,
          coOwners: [],
          propertyType: "Self-occupied",
          tenantNames: "",
          tenantPanOrAadhaar: "",
          tenantPanOrTan: "",
          grossRentReceived: 0,
          rentNotRealized: 0,
          taxPaidToAuthorities: 0,
          totalRent: 0,
          annualValue: 0,
          annualValueOwned: 0,
          fiftyPercentOfAnnualValue: 0,
          interestOnBorrowedCapital: 0,
          totalInterest: 0,
          arrearsUnrealizedRent: 0,
          incomeFromProperty: 0,
        },
      ],
      totalPassThroughIncome: 0,
      incomeFromHouseProperty: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });

  const watchProperties = watch("properties");

  const computePropertyValues = (
    property: HousePropertyFormData["properties"][number],
    index: number
  ) => {
    const totalRent =
      (property.rentNotRealized || 0) + (property.taxPaidToAuthorities || 0);
    const annualValue = (property.grossRentReceived || 0) - totalRent;
    const annualValueOwned =
      annualValue * ((property.ownershipPercentage || 100) / 100);
    const fiftyPercent = annualValueOwned * 0.5;
    const totalInterest =
      fiftyPercent + (property.interestOnBorrowedCapital || 0);
    const income =
      annualValueOwned - totalInterest + (property.arrearsUnrealizedRent || 0);

    setValue(`properties.${index}.totalRent`, totalRent);
    setValue(`properties.${index}.annualValue`, annualValue);
    setValue(`properties.${index}.annualValueOwned`, annualValueOwned);
    setValue(`properties.${index}.fiftyPercentOfAnnualValue`, fiftyPercent);
    setValue(`properties.${index}.totalInterest`, totalInterest);
    setValue(`properties.${index}.incomeFromProperty`, income);
  };

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const fieldId = fields[index]?.id;
      if (!fieldId || !visibleCalculations[fieldId]) {
        return;
      }
      computePropertyValues(property, index);
    });
  }, [watchProperties, fields, visibleCalculations, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const hasInput =
        (property.rentNotRealized && property.rentNotRealized !== 0) ||
        (property.taxPaidToAuthorities && property.taxPaidToAuthorities !== 0);

      if (hasInput) {
        const total =
          (property.rentNotRealized || 0) +
          (property.taxPaidToAuthorities || 0);
        setValue(`properties.${index}.totalRent`, total);
      }
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      if (
        property.grossRentReceived &&
        property.grossRentReceived !== 0 &&
        property.totalRent !== undefined
      ) {
        const annualValue =
          (property.grossRentReceived || 0) - (property.totalRent || 0);
        setValue(`properties.${index}.annualValue`, annualValue);
      }
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      if (property.annualValue !== undefined) {
        const annualValueOwned =
          (property.annualValue || 0) *
          ((property.ownershipPercentage || 100) / 100);
        setValue(`properties.${index}.annualValueOwned`, annualValueOwned);
      }
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      if (property.annualValueOwned !== undefined) {
        const fiftyPercent = (property.annualValueOwned || 0) * 0.5;
        setValue(`properties.${index}.fiftyPercentOfAnnualValue`, fiftyPercent);
      }
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      if (
        property.fiftyPercentOfAnnualValue !== undefined ||
        (property.interestOnBorrowedCapital &&
          property.interestOnBorrowedCapital !== 0)
      ) {
        const total =
          (property.fiftyPercentOfAnnualValue || 0) +
          (property.interestOnBorrowedCapital || 0);
        setValue(`properties.${index}.totalInterest`, total);
      }
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      if (
        property.annualValueOwned !== undefined &&
        property.totalInterest !== undefined
      ) {
        const income =
          (property.annualValueOwned || 0) -
          (property.totalInterest || 0) +
          (property.arrearsUnrealizedRent || 0);
        setValue(`properties.${index}.incomeFromProperty`, income);
      }
    });
  }, [watchProperties, setValue]);

  const calculateTotalIncomeFromHouseProperty = () => {
    const properties = watch("properties");
    const passThroughIncome = watch("totalPassThroughIncome") || 0;

    const totalPropertyIncome = properties.reduce(
      (sum, property) => sum + (property.incomeFromProperty || 0),
      0
    );

    const totalIncome = totalPropertyIncome + passThroughIncome;
    setValue("incomeFromHouseProperty", totalIncome);
  };

  const handleShowCalculations = (fieldId: string, index: number) => {
    setVisibleCalculations((prev) => ({ ...prev, [fieldId]: true }));
    const property = watchProperties[index];
    if (property) {
      computePropertyValues(property, index);
    }
  };

  const onSubmit = (data: HousePropertyFormData) => {
    console.log("House Property form submitted:", data);
    onComplete(data);
  };

  const onError = (errors: any) => {
    console.error("House Property validation errors:", errors);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {personalInfo && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Personal Information from Part A
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
            <div>
              <span className="font-medium text-blue-700">Name:</span>
              <p className="text-blue-900">
                {personalInfo.firstName} {personalInfo.lastName}
              </p>
            </div>
            <div>
              <span className="font-medium text-blue-700">PAN:</span>
              <p className="text-blue-900">{personalInfo.pan}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">State:</span>
              <p className="text-blue-900">{personalInfo.state}</p>
            </div>
            <div>
              <span className="font-medium text-blue-700">Status:</span>
              <p className="text-blue-900">{personalInfo.filingStatus}</p>
            </div>
          </div>
        </div>
      )}
      <div className="rounded-lg">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <div className="space-y-6">
            {fields.map((field, index) => {
              const fieldId = field.id;
              const showCalculations = !!visibleCalculations[fieldId];
              const propertyState = watchProperties[index] || {};

              return (
                <div
                  key={field.id}
                  className="rounded-lg border-2 border-gray-200 p-6"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Property {index + 1}
                    </h3>
                    <div className="flex items-center gap-2">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="rounded border border-red-500 px-3 py-1 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Property
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mb-6 rounded-lg border border-gray-300 p-4">
                    <h4 className="mb-4 font-semibold text-gray-700">
                      Address of Property {index + 1}
                    </h4>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Property Address{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          {...register(`properties.${index}.propertyAddress`)}
                          rows={2}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter complete property address"
                        />
                        {errors.properties?.[index]?.propertyAddress && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.properties[index]?.propertyAddress?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Town/City
                        </label>
                        <input
                          {...register(`properties.${index}.townCity`)}
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter town/city"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          State
                        </label>
                        <input
                          {...register(`properties.${index}.state`)}
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter state"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <input
                          {...register(`properties.${index}.country`)}
                          type="text"
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="India"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          PIN Code/ZIP Code
                        </label>
                        <input
                          {...register(`properties.${index}.pinCode`)}
                          type="text"
                          maxLength={6}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="123456"
                        />
                        {errors.properties?.[index]?.pinCode && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.properties[index]?.pinCode?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 rounded-lg border border-gray-300 p-4">
                    <div className="mb-4">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Is the property co-owned?
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            {...register(`properties.${index}.isCoOwned`)}
                            type="radio"
                            value="Yes"
                            className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            {...register(`properties.${index}.isCoOwned`)}
                            type="radio"
                            value="No"
                            className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            No (if "YES" please enter following details)
                          </span>
                        </label>
                      </div>
                    </div>

                    {watch(`properties.${index}.isCoOwned`) === "Yes" && (
                      <div className="space-y-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Your percentage of share in the property (%)
                          </label>
                          <input
                            {...register(
                              `properties.${index}.ownershipPercentage`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter percentage (0-100)"
                          />
                          {errors.properties?.[index]?.ownershipPercentage && (
                            <p className="mt-1 text-xs text-red-500">
                              {
                                errors.properties[index]?.ownershipPercentage
                                  ?.message
                              }
                            </p>
                          )}
                        </div>

                        <div className="text-sm text-gray-600">
                          <p className="mb-2 font-medium">
                            Name of Co-owner(s)
                          </p>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                              <thead>
                                <tr>
                                  <th className="border border-gray-300 px-2 py-2"></th>
                                  <th className="border border-gray-300 px-2 py-2">
                                    Name of Co-owner(s)
                                  </th>
                                  <th className="border border-gray-300 px-2 py-2">
                                    PAN/Aadhaar No. of Co-owner(s)
                                  </th>
                                  <th className="border border-gray-300 px-2 py-2">
                                    Percentage Share in Property
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border border-gray-300 px-2 py-2 text-center">
                                    I
                                  </td>
                                  <td className="border border-gray-300 px-2 py-2">
                                    <input
                                      type="text"
                                      className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm"
                                      placeholder="Enter name"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-2 py-2">
                                    <input
                                      type="text"
                                      className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm"
                                      placeholder="PAN/Aadhaar"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-2 py-2">
                                    <input
                                      type="number"
                                      className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm"
                                      placeholder="%"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border border-gray-300 px-2 py-2 text-center">
                                    II
                                  </td>
                                  <td className="border border-gray-300 px-2 py-2">
                                    <input
                                      type="text"
                                      className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm"
                                      placeholder="Enter name"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-2 py-2">
                                    <input
                                      type="text"
                                      className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm"
                                      placeholder="PAN/Aadhaar"
                                    />
                                  </td>
                                  <td className="border border-gray-300 px-2 py-2">
                                    <input
                                      type="number"
                                      className="w-full rounded border-gray-300 bg-white px-2 py-1 text-sm"
                                      placeholder="%"
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-6 rounded-lg border border-gray-300 p-4">
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      (Tick ☑ the applicable option){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          {...register(`properties.${index}.propertyType`)}
                          type="radio"
                          value="Let-out"
                          className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700"> Let out</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          {...register(`properties.${index}.propertyType`)}
                          type="radio"
                          value="Self-occupied"
                          className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Self-occupied
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          {...register(`properties.${index}.propertyType`)}
                          type="radio"
                          value="Deemed let-out"
                          className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Deemed let out
                        </span>
                      </label>
                    </div>
                    {errors.properties?.[index]?.propertyType && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.properties[index]?.propertyType?.message}
                      </p>
                    )}
                  </div>

                  {watch(`properties.${index}.propertyType`) === "Let-out" && (
                    <div className="mb-6 rounded-lg border border-gray-300 p-4">
                      <h4 className="mb-4 font-semibold text-gray-700">
                        Tenant Details (if let out)
                      </h4>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Name(s) of Tenant(s) (if let out)
                          </label>
                          <input
                            {...register(`properties.${index}.tenantNames`)}
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter tenant name(s)"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            PAN/Aadhaar No. of Tenant(s) (Please see note)
                          </label>
                          <input
                            {...register(
                              `properties.${index}.tenantPanOrAadhaar`
                            )}
                            type="text"
                            maxLength={12}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter PAN or Aadhaar"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            PAN/TAN/Aadhaar No. of Tenant(s) (if TDS credit is
                            claimed)
                          </label>
                          <input
                            {...register(`properties.${index}.tenantPanOrTan`)}
                            type="text"
                            maxLength={10}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Enter PAN/TAN"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg border border-gray-300 p-4">
                    <h4 className="mb-4 font-semibold text-gray-700 flex items-center justify-between">
                      <span>Income Calculation</span>

                      <button
                        type="button"
                        onClick={() => handleShowCalculations(fieldId, index)}
                        className="rounded border border-blue-500 px-3 py-1 text-xs font-medium text-blue-600 transition-colors hover:border-blue-600 hover:text-blue-700"
                      >
                        {showCalculations ? "Recalculate" : "Show Calculations"}
                      </button>
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            a. Gross rent received or receivable or lettable
                            value
                          </label>
                          <input
                            {...register(
                              `properties.${index}.grossRentReceived`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            b. The amount of rent which cannot be realized
                          </label>
                          <input
                            {...register(
                              `properties.${index}.rentNotRealized`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            c. Tax paid to local authorities
                          </label>
                          <input
                            {...register(
                              `properties.${index}.taxPaidToAuthorities`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            d. Total (1b + 1c)
                          </label>
                          <input
                            {...register(`properties.${index}.totalRent`, {
                              valueAsNumber: true,
                            })}
                            type="number"
                            readOnly
                            value={
                              showCalculations
                                ? propertyState.totalRent ?? ""
                                : ""
                            }
                            placeholder="Click 'Show Calculations'"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            e. Annual value (1a - 1d){" "}
                            <span className="text-xs text-gray-500">
                              (nil if self-occupied etc. as per section 23(2)of
                              the Act)
                            </span>
                          </label>
                          <input
                            {...register(`properties.${index}.annualValue`, {
                              valueAsNumber: true,
                            })}
                            type="number"
                            readOnly
                            value={
                              showCalculations
                                ? propertyState.annualValue ?? ""
                                : ""
                            }
                            placeholder="Click 'Show Calculations'"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            f. Annual value of the property owned (own
                            percentage share x 1e)
                          </label>
                          <input
                            {...register(
                              `properties.${index}.annualValueOwned`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            readOnly
                            value={
                              showCalculations
                                ? propertyState.annualValueOwned ?? ""
                                : ""
                            }
                            placeholder="Click 'Show Calculations'"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            g. 50% of 1f
                          </label>
                          <input
                            {...register(
                              `properties.${index}.fiftyPercentOfAnnualValue`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            readOnly
                            value={
                              showCalculations
                                ? propertyState.fiftyPercentOfAnnualValue ?? ""
                                : ""
                            }
                            placeholder="Click 'Show Calculations'"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            h. Interest payable on borrowed capital (Details are
                            to be filled in the drop down to be provided in
                            e-filing utility)
                          </label>
                          <input
                            {...register(
                              `properties.${index}.interestOnBorrowedCapital`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div className="rounded-lg border border-gray-300 bg-gray-50 p-3">
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            i. Total (1g + 1h)
                          </label>
                          <input
                            {...register(`properties.${index}.totalInterest`, {
                              valueAsNumber: true,
                            })}
                            type="number"
                            readOnly
                            value={
                              showCalculations
                                ? propertyState.totalInterest ?? ""
                                : ""
                            }
                            placeholder="Click 'Show Calculations'"
                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            j. Arrears/unrealized rent received during the year
                            less 30%
                          </label>
                          <input
                            {...register(
                              `properties.${index}.arrearsUnrealizedRent`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>

                        <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-3">
                          <label className="mb-1.5 block text-sm font-semibold text-gray-900">
                            k. Income from house property 1 (1f - 1i + 1j)
                          </label>
                          <input
                            {...register(
                              `properties.${index}.incomeFromProperty`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            type="number"
                            readOnly
                            value={
                              showCalculations
                                ? propertyState.incomeFromProperty ?? ""
                                : ""
                            }
                            placeholder="Click 'Show Calculations'"
                            className="w-full rounded-lg border-2 border-blue-300 bg-blue-50 px-3 py-2 text-sm font-bold text-gray-900 placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <p className="text-xs italic text-gray-500">
                        (fill up details separately for each property)
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() =>
                append({
                  propertyAddress: "",
                  townCity: "",
                  state: "",
                  country: "India",
                  pinCode: "",
                  isCoOwned: "No",
                  ownershipPercentage: 100,
                  coOwners: [],
                  propertyType: "Self-occupied",
                  tenantNames: "",
                  tenantPanOrAadhaar: "",
                  tenantPanOrTan: "",
                } as any)
              }
              className="rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400"
            >
              + Add Another Property
            </button>
          </div>

          <div className="space-y-4 rounded-lg border-2 border-gray-300 p-6">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                2. Pass through income/loss if any
              </label>
              <input
                {...register("totalPassThroughIncome", { valueAsNumber: true })}
                type="number"
                step="0.01"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div className="rounded-lg border-2 border-gray-300 p-4">
              <label className="mb-1.5 block text-lg font-semibold text-gray-900">
                3. Income under the head "Income from House Property" (Σ1k + 2)
              </label>
              <p className="mb-2 text-xs italic text-gray-500">
                (if negative take the figure to 2i of schedule CYLA)
              </p>
              <div className="flex gap-3">
                <input
                  {...register("incomeFromHouseProperty", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  readOnly
                  className="flex-1 rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-3 text-lg font-bold text-gray-900"
                />
                <button
                  type="button"
                  onClick={calculateTotalIncomeFromHouseProperty}
                  className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  title="Calculate total income from all properties and pass through income"
                >
                  Calculate
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Click "Calculate" to compute: Sum of all property incomes (1k) +
                Pass through income (2)
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-300 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">NOTE ►</span> Please include the
              income of the specified persons referred to in Schedule SPI and
              Pass through income referred to in schedule PTI while computing
              the income under this head
            </p>
          </div>

          <div className="rounded-lg border border-gray-300 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">NOTE ►</span> Furnishing of PAN/
              Aadhaar No. of tenant is mandatory, if tax is deducted under
              section 194-IB.
            </p>
          </div>

          <div className="rounded-lg border border-gray-300 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">NOTE ►</span> Furnishing of TAN of
              tenant is mandatory, if tax is deducted under section 194-I.
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="rounded-lg border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 hover:border-blue-700 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrTwoHousing;
