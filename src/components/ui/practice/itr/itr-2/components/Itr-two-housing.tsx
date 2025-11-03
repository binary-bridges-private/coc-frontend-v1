import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  housePropertySchema,
  HousePropertyFormData,
} from "../itr-two.validation.ts";

interface ItrTwoHousingProps {
  onComplete: (data: HousePropertyFormData) => void;
  initialData?: Partial<HousePropertyFormData>;
}

const ItrTwoHousing: React.FC<ItrTwoHousingProps> = ({
  onComplete,
  initialData,
}) => {
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

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const total =
        (property.grossRentReceived || 0) -
        (property.rentNotRealized || 0) -
        (property.taxPaidToAuthorities || 0);
      setValue(`properties.${index}.totalRent`, total);
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const annualValue =
        (property.grossRentReceived || 0) - (property.totalRent || 0);
      setValue(`properties.${index}.annualValue`, annualValue);
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const annualValueOwned =
        (property.annualValue || 0) *
        ((property.ownershipPercentage || 100) / 100);
      setValue(`properties.${index}.annualValueOwned`, annualValueOwned);
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const fiftyPercent = (property.annualValueOwned || 0) * 0.5;
      setValue(`properties.${index}.fiftyPercentOfAnnualValue`, fiftyPercent);
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const total =
        (property.fiftyPercentOfAnnualValue || 0) +
        (property.interestOnBorrowedCapital || 0);
      setValue(`properties.${index}.totalInterest`, total);
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    watchProperties.forEach((property, index) => {
      const income =
        (property.annualValueOwned || 0) -
        (property.totalInterest || 0) +
        (property.arrearsUnrealizedRent || 0);
      setValue(`properties.${index}.incomeFromProperty`, income);
    });
  }, [watchProperties, setValue]);

  useEffect(() => {
    const total = watchProperties.reduce(
      (sum, property) => sum + (property.incomeFromProperty || 0),
      0
    );
    setValue("incomeFromHouseProperty", total);
  }, [watchProperties, setValue]);

  const onSubmit = (data: HousePropertyFormData) => {
    console.log("House Property form submitted:", data);
    onComplete(data);
  };

  const onError = (errors: any) => {
    console.error("House Property validation errors:", errors);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="rounded-lg">
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg border-2 border-gray-200 p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Property {index + 1}
                  </h3>
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

                <div className="mb-6 rounded-lg border border-gray-300 p-4">
                  <h4 className="mb-4 font-semibold text-gray-700">
                    Address of Property {index + 1}
                  </h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Property Address <span className="text-red-500">*</span>
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
                        <span className="text-sm text-gray-700">☐ Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          {...register(`properties.${index}.isCoOwned`)}
                          type="radio"
                          value="No"
                          className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          ☐ No (if "YES" please enter following details)
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
                        <p className="mb-2 font-medium">Name of Co-owner(s)</p>
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
                      <span className="text-sm text-gray-700">☐ Let out</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        {...register(`properties.${index}.propertyType`)}
                        type="radio"
                        value="Self-occupied"
                        className="mr-2 h-4 w-4 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        ☐ Self-occupied
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
                        ☐ Deemed let out
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
                  <h4 className="mb-4 font-semibold text-gray-700">
                    Income Calculation
                  </h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          a. Gross rent received or receivable or lettable value
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
                          {...register(`properties.${index}.rentNotRealized`, {
                            valueAsNumber: true,
                          })}
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

                      <div className="rounded-lg border border-gray-300 p-3">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          d. Total (1b + 1c)
                        </label>
                        <input
                          {...register(`properties.${index}.totalRent`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          readOnly
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
                        />
                      </div>

                      <div className="rounded-lg border border-gray-300 p-3">
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
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
                        />
                      </div>

                      <div className="rounded-lg border border-gray-300 p-3">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          f. Annual value of the property owned (own percentage
                          share x 1e)
                        </label>
                        <input
                          {...register(`properties.${index}.annualValueOwned`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          readOnly
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
                        />
                      </div>

                      <div className="rounded-lg border border-gray-300 p-3">
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
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
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

                      <div className="rounded-lg border border-gray-300 p-3">
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                          i. Total (1g + 1h)
                        </label>
                        <input
                          {...register(`properties.${index}.totalInterest`, {
                            valueAsNumber: true,
                          })}
                          type="number"
                          readOnly
                          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900"
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

                      <div className="rounded-lg border-2 border-gray-300 p-3">
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
                          className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-sm font-bold text-gray-900"
                        />
                      </div>
                    </div>

                    <p className="text-xs italic text-gray-500">
                      (fill up details separately for each property)
                    </p>
                  </div>
                </div>
              </div>
            ))}

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
                })
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
              <input
                {...register("incomeFromHouseProperty", {
                  valueAsNumber: true,
                })}
                type="number"
                readOnly
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg font-bold text-gray-900"
              />
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
