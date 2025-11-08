import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Section A1: Foreign Depository Accounts
const foreignDepositoryAccountSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  nameOfFinancialInstitution: z
    .string()
    .min(1, "Financial institution name required"),
  addressOfFinancialInstitution: z.string().optional(),
  zipCode: z.string().optional(),
  accountNumber: z.string().min(1, "Account number required"),
  status: z
    .enum(["active", "closed", ""], { message: "Select status" })
    .optional(),
  accountOpeningDate: z.string().optional(),
  peakBalance: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  closingBalance: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  grossInterestPaidOrCredited: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
});

// Section A2: Foreign Custodial Accounts
const foreignCustodialAccountSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  nameOfFinancialInstitution: z
    .string()
    .min(1, "Financial institution name required"),
  addressOfFinancialInstitution: z.string().optional(),
  zipCode: z.string().optional(),
  accountNumber: z.string().min(1, "Account number required"),
  status: z
    .enum(["active", "closed", ""], { message: "Select status" })
    .optional(),
  accountOpeningDate: z.string().optional(),
  peakBalance: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  closingBalance: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  grossAmountPaidOrCredited: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
});

// Section A3: Foreign Equity and Debt Interest
const foreignEquityDebtSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  nameOfEntity: z.string().min(1, "Entity name required"),
  addressOfEntity: z.string().optional(),
  zipCode: z.string().optional(),
  natureOfEntity: z.string().optional(),
  dateOfAcquiring: z.string().optional(),
  initialValueOfInvestment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  peakValueOfInvestment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  closingValue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  totalGrossAmountPaid: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  totalGrossProceedsFromSale: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
});

// Section A4: Foreign Cash Value Insurance or Annuity Contract
const foreignCashValueContractSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  nameOfFinancialInstitution: z
    .string()
    .min(1, "Financial institution name required"),
  addressOfFinancialInstitution: z.string().optional(),
  zipCode: z.string().optional(),
  dateOfContract: z.string().optional(),
  cashValueOrSurrenderValue: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  totalGrossAmountPaid: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
});

// Section B: Financial Interest in any Entity
const financialInterestEntitySchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  zipCode: z.string().optional(),
  nameOfEntity: z.string().min(1, "Entity name required"),
  addressOfEntity: z.string().optional(),
  natureOfEntity: z.string().optional(),
  dateAcquired: z.string().optional(),
  totalInvestment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  incomeAccruedOrDerived: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  natureOfIncome: z.string().optional(),
  incomeTaxableAndOffered: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  scheduleWhereOffered: z.string().optional(),
  itemNumberOfSchedule: z.string().optional(),
});

// Section C: Immovable Property
const immovablePropertySchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  zipCode: z.string().optional(),
  addressOfProperty: z.string().optional(),
  ownership: z.string().optional(),
  totalInvestment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  incomeDerived: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  incomeTaxableAndOffered: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
});

// Section D: Other Capital Assets
const otherCapitalAssetSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  zipCode: z.string().optional(),
  natureOfAsset: z.string().optional(),
  ownership: z.string().optional(),
  dateOfAcquisition: z.string().optional(),
  totalInvestment: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  incomeDerived: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  natureOfIncome: z.string().optional(),
  incomeTaxableAndOffered: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  scheduleWhereOffered: z.string().optional(),
  itemNumberOfSchedule: z.string().optional(),
});

// Section E: Accounts where signing authority
const signingAuthorityAccountSchema = z.object({
  nameOfInstitution: z.string().optional(),
  countryName: z.string().optional(),
  countryCode: z.string().optional(),
  nameOfAccountHolder: z.string().optional(),
  accountNumber: z.string().optional(),
  peakBalance: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  whetherIncomeAccrued: z
    .enum(["yes", "no", ""], { message: "Select Yes or No" })
    .optional(),
  incomeOfferedInReturn: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  scheduleWhereOffered: z.string().optional(),
  itemNumberOfSchedule: z.string().optional(),
});

// Section F: Trusts
const trustSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  zipCode: z.string().optional(),
  nameAndAddressOfTrust: z.string().optional(),
  nameAndAddressOfTrustees: z.string().optional(),
  nameAndAddressOfSettlor: z.string().optional(),
  nameAndAddressOfBeneficiaries: z.string().optional(),
  dateSinceBeneficiary: z.string().optional(),
  whetherTaxableInYourHands: z
    .enum(["yes", "no", ""], { message: "Select Yes or No" })
    .optional(),
  incomeDerivable: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  incomeOffered: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  scheduleWhereOffered: z.string().optional(),
  itemNumberOfSchedule: z.string().optional(),
});

// Section G: Other Income
const otherIncomeSchema = z.object({
  countryName: z.string().min(1, "Country name required"),
  countryCode: z.string().min(1, "Country code required"),
  zipCode: z.string().optional(),
  nameAndAddressOfPerson: z.string().optional(),
  incomeDerived: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  natureOfIncome: z.string().optional(),
  whetherOfferedInYourReturn: z
    .enum(["yes", "no", ""], { message: "Select Yes or No" })
    .optional(),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid amount")
    .optional()
    .or(z.literal("")),
  scheduleWhereOffered: z.string().optional(),
  itemNumberOfSchedule: z.string().optional(),
});

const scheduleFASchema = z.object({
  // Section A: Details of Foreign Assets
  depositoryAccounts: z.array(foreignDepositoryAccountSchema).optional(),
  custodialAccounts: z.array(foreignCustodialAccountSchema).optional(),
  equityDebtInterest: z.array(foreignEquityDebtSchema).optional(),
  cashValueContracts: z.array(foreignCashValueContractSchema).optional(),

  // Section B
  financialInterestEntities: z.array(financialInterestEntitySchema).optional(),

  // Section C
  immovableProperties: z.array(immovablePropertySchema).optional(),

  // Section D
  otherCapitalAssets: z.array(otherCapitalAssetSchema).optional(),

  // Section E
  signingAuthorityAccounts: z.array(signingAuthorityAccountSchema).optional(),

  // Section F
  trusts: z.array(trustSchema).optional(),

  // Section G
  otherIncome: z.array(otherIncomeSchema).optional(),
});

export type ScheduleFAFormData = z.infer<typeof scheduleFASchema>;

interface ItrTwoFAProps {
  onSave: (data: ScheduleFAFormData) => void;
  onBack: () => void;
  initialData?: ScheduleFAFormData;
}

const ItrTwoFA: React.FC<ItrTwoFAProps> = ({ onSave, onBack, initialData }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFAFormData>({
    resolver: zodResolver(scheduleFASchema),
    defaultValues: initialData || {
      depositoryAccounts: [],
      custodialAccounts: [],
      equityDebtInterest: [],
      cashValueContracts: [],
      financialInterestEntities: [],
      immovableProperties: [],
      otherCapitalAssets: [],
      signingAuthorityAccounts: [],
      trusts: [],
      otherIncome: [],
    },
  });

  const {
    fields: depositoryFields,
    append: appendDepository,
    remove: removeDepository,
  } = useFieldArray({
    control,
    name: "depositoryAccounts",
  });

  const {
    fields: custodialFields,
    append: appendCustodial,
    remove: removeCustodial,
  } = useFieldArray({
    control,
    name: "custodialAccounts",
  });

  const {
    fields: equityFields,
    append: appendEquity,
    remove: removeEquity,
  } = useFieldArray({
    control,
    name: "equityDebtInterest",
  });

  const {
    fields: cashValueFields,
    append: appendCashValue,
    remove: removeCashValue,
  } = useFieldArray({
    control,
    name: "cashValueContracts",
  });

  const {
    fields: financialInterestFields,
    append: appendFinancialInterest,
    remove: removeFinancialInterest,
  } = useFieldArray({
    control,
    name: "financialInterestEntities",
  });

  const {
    fields: immovableFields,
    append: appendImmovable,
    remove: removeImmovable,
  } = useFieldArray({
    control,
    name: "immovableProperties",
  });

  const {
    fields: capitalAssetFields,
    append: appendCapitalAsset,
    remove: removeCapitalAsset,
  } = useFieldArray({
    control,
    name: "otherCapitalAssets",
  });

  const {
    fields: signingFields,
    append: appendSigning,
    remove: removeSigning,
  } = useFieldArray({
    control,
    name: "signingAuthorityAccounts",
  });

  const {
    fields: trustFields,
    append: appendTrust,
    remove: removeTrust,
  } = useFieldArray({
    control,
    name: "trusts",
  });

  const {
    fields: otherIncomeFields,
    append: appendOtherIncome,
    remove: removeOtherIncome,
  } = useFieldArray({
    control,
    name: "otherIncome",
  });

  const onSubmit = (data: ScheduleFAFormData) => {
    onSave(data);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Schedule FA - Foreign Assets
        </h2>
        <p className="mt-1.5 text-sm text-gray-600">
          Details of Foreign Assets and Income from any source outside India
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">NOTE:</span> Please refer to the
            instructions for filling out this schedule. In case of an
            individual, not being an Indian citizen, who is in India on a
            business, employment or student visa, on visit acquired during any
            previous year in which he was non-resident is not mandatory to be
            reported in this schedule, if no income from outside India is
            offered in the current previous year.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">
              A1. Details of Foreign Depository Accounts held (including any
              beneficial interest) at any time during the calendar year ending
              as on 31st December, 2024
            </h3>
            <button
              type="button"
              onClick={() =>
                appendDepository({
                  countryName: "",
                  countryCode: "",
                  nameOfFinancialInstitution: "",
                  addressOfFinancialInstitution: "",
                  zipCode: "",
                  accountNumber: "",
                  status: "",
                  accountOpeningDate: "",
                  peakBalance: "",
                  closingBalance: "",
                  grossInterestPaidOrCredited: "",
                })
              }
              className="whitespace-nowrap rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              + Add Account
            </button>
          </div>

          {depositoryFields.length > 0 && (
            <div className="space-y-4">
              {depositoryFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Account #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeDepository(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Country Name & Code *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          {...register(`depositoryAccounts.${idx}.countryName`)}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                          placeholder="Country"
                        />
                        <input
                          type="text"
                          {...register(`depositoryAccounts.${idx}.countryCode`)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm uppercase"
                          placeholder="Code"
                        />
                      </div>
                      {errors.depositoryAccounts?.[idx]?.countryName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.depositoryAccounts[idx]?.countryName?.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Financial Institution *
                      </label>
                      <input
                        type="text"
                        {...register(
                          `depositoryAccounts.${idx}.nameOfFinancialInstitution`
                        )}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      {errors.depositoryAccounts?.[idx]
                        ?.nameOfFinancialInstitution && (
                        <p className="text-red-500 text-xs mt-1">
                          {
                            errors.depositoryAccounts[idx]
                              ?.nameOfFinancialInstitution?.message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Address & ZIP
                      </label>
                      <input
                        type="text"
                        {...register(
                          `depositoryAccounts.${idx}.addressOfFinancialInstitution`
                        )}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-1"
                        placeholder="Address"
                      />
                      <input
                        type="text"
                        {...register(`depositoryAccounts.${idx}.zipCode`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="ZIP"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        {...register(`depositoryAccounts.${idx}.accountNumber`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      {errors.depositoryAccounts?.[idx]?.accountNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {
                            errors.depositoryAccounts[idx]?.accountNumber
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Status & Opening Date
                      </label>
                      <select
                        {...register(`depositoryAccounts.${idx}.status`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm mb-1"
                      >
                        <option value="">Select</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                      </select>
                      <input
                        type="date"
                        {...register(
                          `depositoryAccounts.${idx}.accountOpeningDate`
                        )}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Peak Balance
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(`depositoryAccounts.${idx}.peakBalance`)}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Closing Balance
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(
                          `depositoryAccounts.${idx}.closingBalance`
                        )}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Gross Interest
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        {...register(
                          `depositoryAccounts.${idx}.grossInterestPaidOrCredited`
                        )}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {depositoryFields.length === 0 && (
            <p className="text-gray-500 text-sm text-center py-4">
              No accounts added. Click "+ Add Account" to add.
            </p>
          )}
        </div>

        {custodialFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              A2. Foreign Custodial Accounts
            </h3>
            <div className="space-y-4">
              {custodialFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Custodial Account #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeCustodial(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(`custodialAccounts.${idx}.countryName`)}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`custodialAccounts.${idx}.countryCode`)}
                      placeholder="Code"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `custodialAccounts.${idx}.nameOfFinancialInstitution`
                      )}
                      placeholder="Institution *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`custodialAccounts.${idx}.accountNumber`)}
                      placeholder="Account No *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`custodialAccounts.${idx}.peakBalance`)}
                      placeholder="Peak Balance"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`custodialAccounts.${idx}.closingBalance`)}
                      placeholder="Closing Balance"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `custodialAccounts.${idx}.grossAmountPaidOrCredited`
                      )}
                      placeholder="Gross Amount"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {equityFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              A3. Foreign Equity and Debt Interest
            </h3>
            <div className="space-y-4">
              {equityFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Equity/Debt #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeEquity(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(`equityDebtInterest.${idx}.countryName`)}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`equityDebtInterest.${idx}.nameOfEntity`)}
                      placeholder="Entity Name *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`equityDebtInterest.${idx}.natureOfEntity`)}
                      placeholder="Nature of Entity"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `equityDebtInterest.${idx}.initialValueOfInvestment`
                      )}
                      placeholder="Initial Value"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `equityDebtInterest.${idx}.peakValueOfInvestment`
                      )}
                      placeholder="Peak Value"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`equityDebtInterest.${idx}.closingValue`)}
                      placeholder="Closing Value"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `equityDebtInterest.${idx}.totalGrossAmountPaid`
                      )}
                      placeholder="Gross Amount Paid"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `equityDebtInterest.${idx}.totalGrossProceedsFromSale`
                      )}
                      placeholder="Proceeds from Sale"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {financialInterestFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              B. Financial Interest in any Entity
            </h3>
            <div className="space-y-4">
              {financialInterestFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Entity #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeFinancialInterest(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(
                        `financialInterestEntities.${idx}.countryName`
                      )}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `financialInterestEntities.${idx}.nameOfEntity`
                      )}
                      placeholder="Entity Name *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `financialInterestEntities.${idx}.totalInvestment`
                      )}
                      placeholder="Total Investment"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `financialInterestEntities.${idx}.incomeAccruedOrDerived`
                      )}
                      placeholder="Income Derived"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `financialInterestEntities.${idx}.incomeTaxableAndOffered`
                      )}
                      placeholder="Taxable Income"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `financialInterestEntities.${idx}.scheduleWhereOffered`
                      )}
                      placeholder="Schedule"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {immovableFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              C. Immovable Property
            </h3>
            <div className="space-y-4">
              {immovableFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Property #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeImmovable(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(`immovableProperties.${idx}.countryName`)}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `immovableProperties.${idx}.addressOfProperty`
                      )}
                      placeholder="Address"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`immovableProperties.${idx}.ownership`)}
                      placeholder="Ownership"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `immovableProperties.${idx}.totalInvestment`
                      )}
                      placeholder="Total Investment"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`immovableProperties.${idx}.incomeDerived`)}
                      placeholder="Income Derived"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `immovableProperties.${idx}.incomeTaxableAndOffered`
                      )}
                      placeholder="Taxable Income"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {capitalAssetFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              D. Other Capital Assets
            </h3>
            <div className="space-y-4">
              {capitalAssetFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Asset #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeCapitalAsset(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(`otherCapitalAssets.${idx}.countryName`)}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`otherCapitalAssets.${idx}.natureOfAsset`)}
                      placeholder="Nature of Asset"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`otherCapitalAssets.${idx}.totalInvestment`)}
                      placeholder="Total Investment"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`otherCapitalAssets.${idx}.incomeDerived`)}
                      placeholder="Income Derived"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `otherCapitalAssets.${idx}.incomeTaxableAndOffered`
                      )}
                      placeholder="Taxable Income"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `otherCapitalAssets.${idx}.scheduleWhereOffered`
                      )}
                      placeholder="Schedule"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {signingFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              E. Accounts with Signing Authority
            </h3>
            <div className="space-y-4">
              {signingFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Account #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeSigning(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(
                        `signingAuthorityAccounts.${idx}.nameOfInstitution`
                      )}
                      placeholder="Institution"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `signingAuthorityAccounts.${idx}.nameOfAccountHolder`
                      )}
                      placeholder="Account Holder"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `signingAuthorityAccounts.${idx}.accountNumber`
                      )}
                      placeholder="Account Number"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `signingAuthorityAccounts.${idx}.peakBalance`
                      )}
                      placeholder="Peak Balance"
                      className="px-2 py-1 border rounded"
                    />
                    <select
                      {...register(
                        `signingAuthorityAccounts.${idx}.whetherIncomeAccrued`
                      )}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="">Income Accrued?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      {...register(
                        `signingAuthorityAccounts.${idx}.incomeOfferedInReturn`
                      )}
                      placeholder="Income Offered"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {trustFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              F. Trusts
            </h3>
            <div className="space-y-4">
              {trustFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Trust #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeTrust(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <input
                      type="text"
                      {...register(`trusts.${idx}.countryName`)}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`trusts.${idx}.nameAndAddressOfTrust`)}
                      placeholder="Trust Name & Address"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(
                        `trusts.${idx}.nameAndAddressOfBeneficiaries`
                      )}
                      placeholder="Beneficiaries"
                      className="px-2 py-1 border rounded"
                    />
                    <select
                      {...register(`trusts.${idx}.whetherTaxableInYourHands`)}
                      className="px-2 py-1 border rounded"
                    >
                      <option value="">Taxable in your hands?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      {...register(`trusts.${idx}.incomeDerivable`)}
                      placeholder="Income Derivable"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`trusts.${idx}.incomeOffered`)}
                      placeholder="Income Offered"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {otherIncomeFields.length > 0 && (
          <div className="border border-gray-300 rounded-lg p-5 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              G. Other Income from Outside India
            </h3>
            <div className="space-y-4">
              {otherIncomeFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 bg-white border border-gray-300 rounded text-sm"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Income #{idx + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => removeOtherIncome(idx)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                      type="text"
                      {...register(`otherIncome.${idx}.countryName`)}
                      placeholder="Country *"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`otherIncome.${idx}.nameAndAddressOfPerson`)}
                      placeholder="Person/Source"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`otherIncome.${idx}.natureOfIncome`)}
                      placeholder="Nature of Income"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`otherIncome.${idx}.incomeDerived`)}
                      placeholder="Income Derived"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="number"
                      step="0.01"
                      {...register(`otherIncome.${idx}.amount`)}
                      placeholder="Amount"
                      className="px-2 py-1 border rounded"
                    />
                    <input
                      type="text"
                      {...register(`otherIncome.${idx}.scheduleWhereOffered`)}
                      placeholder="Schedule"
                      className="px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border border-gray-300 rounded-lg p-5 bg-blue-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Add Foreign Asset Sections
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() =>
                appendCustodial({
                  countryName: "",
                  countryCode: "",
                  nameOfFinancialInstitution: "",
                  addressOfFinancialInstitution: "",
                  zipCode: "",
                  accountNumber: "",
                  status: "",
                  accountOpeningDate: "",
                  peakBalance: "",
                  closingBalance: "",
                  grossAmountPaidOrCredited: "",
                })
              }
              className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              + A2: Custodial Account
            </button>
            <button
              type="button"
              onClick={() =>
                appendEquity({
                  countryName: "",
                  countryCode: "",
                  nameOfEntity: "",
                  addressOfEntity: "",
                  zipCode: "",
                  natureOfEntity: "",
                  dateOfAcquiring: "",
                  initialValueOfInvestment: "",
                  peakValueOfInvestment: "",
                  closingValue: "",
                  totalGrossAmountPaid: "",
                  totalGrossProceedsFromSale: "",
                })
              }
              className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              + A3: Equity/Debt
            </button>
            <button
              type="button"
              onClick={() =>
                appendCashValue({
                  countryName: "",
                  countryCode: "",
                  nameOfFinancialInstitution: "",
                  addressOfFinancialInstitution: "",
                  zipCode: "",
                  dateOfContract: "",
                  cashValueOrSurrenderValue: "",
                  totalGrossAmountPaid: "",
                })
              }
              className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              + A4: Cash Value Contract
            </button>
            <button
              type="button"
              onClick={() =>
                appendFinancialInterest({
                  countryName: "",
                  countryCode: "",
                  zipCode: "",
                  nameOfEntity: "",
                  addressOfEntity: "",
                  natureOfEntity: "",
                  dateAcquired: "",
                  totalInvestment: "",
                  incomeAccruedOrDerived: "",
                  natureOfIncome: "",
                  incomeTaxableAndOffered: "",
                  scheduleWhereOffered: "",
                  itemNumberOfSchedule: "",
                })
              }
              className="px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              + B: Financial Interest
            </button>
            <button
              type="button"
              onClick={() =>
                appendImmovable({
                  countryName: "",
                  countryCode: "",
                  zipCode: "",
                  addressOfProperty: "",
                  ownership: "",
                  totalInvestment: "",
                  incomeDerived: "",
                  incomeTaxableAndOffered: "",
                })
              }
              className="px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              + C: Immovable Property
            </button>
            <button
              type="button"
              onClick={() =>
                appendCapitalAsset({
                  countryName: "",
                  countryCode: "",
                  zipCode: "",
                  natureOfAsset: "",
                  ownership: "",
                  dateOfAcquisition: "",
                  totalInvestment: "",
                  incomeDerived: "",
                  natureOfIncome: "",
                  incomeTaxableAndOffered: "",
                  scheduleWhereOffered: "",
                  itemNumberOfSchedule: "",
                })
              }
              className="px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
            >
              + D: Capital Asset
            </button>
            <button
              type="button"
              onClick={() =>
                appendSigning({
                  nameOfInstitution: "",
                  countryName: "",
                  countryCode: "",
                  nameOfAccountHolder: "",
                  accountNumber: "",
                  peakBalance: "",
                  whetherIncomeAccrued: "",
                  incomeOfferedInReturn: "",
                  scheduleWhereOffered: "",
                  itemNumberOfSchedule: "",
                })
              }
              className="px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
            >
              + E: Signing Authority
            </button>
            <button
              type="button"
              onClick={() =>
                appendTrust({
                  countryName: "",
                  countryCode: "",
                  zipCode: "",
                  nameAndAddressOfTrust: "",
                  nameAndAddressOfTrustees: "",
                  nameAndAddressOfSettlor: "",
                  nameAndAddressOfBeneficiaries: "",
                  dateSinceBeneficiary: "",
                  whetherTaxableInYourHands: "",
                  incomeDerivable: "",
                  incomeOffered: "",
                  scheduleWhereOffered: "",
                  itemNumberOfSchedule: "",
                })
              }
              className="px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
            >
              + F: Trust
            </button>
            <button
              type="button"
              onClick={() =>
                appendOtherIncome({
                  countryName: "",
                  countryCode: "",
                  zipCode: "",
                  nameAndAddressOfPerson: "",
                  incomeDerived: "",
                  natureOfIncome: "",
                  whetherOfferedInYourReturn: "",
                  amount: "",
                  scheduleWhereOffered: "",
                  itemNumberOfSchedule: "",
                })
              }
              className="px-3 py-2 bg-orange-600 text-white text-sm rounded hover:bg-orange-700"
            >
              + G: Other Income
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-3">
            <p>
              Summary: {depositoryFields.length} Depository |{" "}
              {custodialFields.length} Custodial | {equityFields.length}{" "}
              Equity/Debt | {cashValueFields.length} Cash Value |{" "}
              {financialInterestFields.length} Financial Interest |{" "}
              {immovableFields.length} Immovable | {capitalAssetFields.length}{" "}
              Capital Assets | {signingFields.length} Signing Authority |{" "}
              {trustFields.length} Trusts | {otherIncomeFields.length} Other
              Income
            </p>
          </div>
        </div>

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
            Save Schedule FA
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItrTwoFA;
