import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface HousePropertyDetail {
  tick: string;
  applicableOption: string;
  nameOfTenant: string;
  panAadharNumber: string;
  panAadharTenants: string;
  ifTdsCredit: string;
  grossRentReceived: string;
  amountRentNotRealized: string;
  taxPaidLocalAuthorities: string;
  total: string;
  annualValue: string;
  percentageLEe: string;
  amountPayableOnBorrowedCapital: string;
  details: string;
  totalI: string;
  unrealizedGrossRent: string;
  incomeFromHouseProperty: string;
  fillUpDetails: string;
}

export interface ItrFiveScheduleHPFormData {
  housePropertyDetails?: HousePropertyDetail;
}

// Zod validation schema
const housePropertyDetailSchema = z.object({
  tick: z.string().optional(),
  applicableOption: z.string().optional(),
  nameOfTenant: z.string().optional(),
  panAadharNumber: z.string().optional(),
  panAadharTenants: z.string().optional(),
  ifTdsCredit: z.string().optional(),
  grossRentReceived: z.string().optional(),
  amountRentNotRealized: z.string().optional(),
  taxPaidLocalAuthorities: z.string().optional(),
  total: z.string().optional(),
  annualValue: z.string().optional(),
  percentageLEe: z.string().optional(),
  amountPayableOnBorrowedCapital: z.string().optional(),
  details: z.string().optional(),
  totalI: z.string().optional(),
  unrealizedGrossRent: z.string().optional(),
  incomeFromHouseProperty: z.string().optional(),
  fillUpDetails: z.string().optional(),
});

const itrFiveScheduleHPSchema = z.object({
  housePropertyDetails: housePropertyDetailSchema.optional(),
});

type ItrFiveScheduleHPFormType = z.infer<typeof itrFiveScheduleHPSchema>;

interface ItrFiveScheduleHPProps {
  initialData?: ItrFiveScheduleHPFormData;
  onSave: (data: ItrFiveScheduleHPFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleHP: React.FC<ItrFiveScheduleHPProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleHPFormType>({
    resolver: zodResolver(itrFiveScheduleHPSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<HousePropertyDetail>(
    initialData?.housePropertyDetails || {
      tick: "",
      applicableOption: "",
      nameOfTenant: "",
      panAadharNumber: "",
      panAadharTenants: "",
      ifTdsCredit: "",
      grossRentReceived: "",
      amountRentNotRealized: "",
      taxPaidLocalAuthorities: "",
      total: "",
      annualValue: "",
      percentageLEe: "",
      amountPayableOnBorrowedCapital: "",
      details: "",
      totalI: "",
      unrealizedGrossRent: "",
      incomeFromHouseProperty: "",
      fillUpDetails: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleHPFormType) => {
    onSave({
      housePropertyDetails: details,
    });
  };

  const updateDetail = (field: keyof HousePropertyDetail, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const parseNumber = (value: string): number => {
    if (!value) return 0;
    return parseFloat(value.replace(/,/g, "")) || 0;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule HP - Income from House Property
          </h1>
          <p className="text-slate-700">
            Details of Income from House Property (Please refer to instructions)
          </p>
          <p className="text-xs text-slate-600 mt-2">
            (Drops down to be provided for applicability, Let out, Deemed let out)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-slate-200 border-l-4 border-slate-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-slate-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-slate-800 space-y-1 list-disc pl-5">
            <li>Provide details for each property separately</li>
            <li>Report gross rent received or receivable</li>
            <li>Include tenant information with PAN/Aadhar numbers</li>
            <li>Fill up details for each property as indicated</li>
            <li>Calculate annual value and deductions appropriately</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Property Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Property Details
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tick as applicable option
                </label>
                <div className="space-y-2 bg-slate-50 p-4 rounded">
                  <label className="flex items-center gap-3 p-2 hover:bg-white rounded">
                    <input
                      type="checkbox"
                      checked={details.tick === "self-occupied"}
                      onChange={(e) =>
                        updateDetail("tick", e.target.checked ? "self-occupied" : "")
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Self-Occupied</span>
                  </label>

                  <label className="flex items-center gap-3 p-2 hover:bg-white rounded">
                    <input
                      type="checkbox"
                      checked={details.tick === "let-out"}
                      onChange={(e) =>
                        updateDetail("tick", e.target.checked ? "let-out" : "")
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Let out</span>
                  </label>

                  <label className="flex items-center gap-3 p-2 hover:bg-white rounded">
                    <input
                      type="checkbox"
                      checked={details.tick === "deemed-let-out"}
                      onChange={(e) =>
                        updateDetail("tick", e.target.checked ? "deemed-let-out" : "")
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">Deemed let out</span>
                  </label>
                </div>
              </div>

              {/* Tenant Information */}
              {details.tick === "let-out" && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-slate-800 mb-4">Tenant Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        Name of Tenant
                      </label>
                      <input
                        type="text"
                        value={details.nameOfTenant}
                        onChange={(e) =>
                          updateDetail("nameOfTenant", e.target.value)
                        }
                        placeholder="Enter tenant name"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        PAN/Aadhar No. of Tenant(s) (If available)
                      </label>
                      <input
                        type="text"
                        value={details.panAadharNumber}
                        onChange={(e) =>
                          updateDetail("panAadharNumber", e.target.value)
                        }
                        placeholder="Enter PAN/Aadhar"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        PAN/Aadhar No. of Tenant(s) (If TDS credit is claimed)
                      </label>
                      <input
                        type="text"
                        value={details.ifTdsCredit}
                        onChange={(e) =>
                          updateDetail("ifTdsCredit", e.target.value)
                        }
                        placeholder="Enter if TDS credit claimed"
                        className="w-full px-3 py-2 border border-blue-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              I. Income from House Property
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address of property I
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.applicableOption}
                    onChange={(e) =>
                      updateDetail("applicableOption", e.target.value)
                    }
                    placeholder="Property address"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    a. Gross rent received or receivable at definable value
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.grossRentReceived}
                    onChange={(e) =>
                      updateDetail("grossRentReceived", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ia</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    b. The amount of rent which cannot be realized
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.amountRentNotRealized}
                    onChange={(e) =>
                      updateDetail("amountRentNotRealized", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ib</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    c. Tax paid to local authorities
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.taxPaidLocalAuthorities}
                    onChange={(e) =>
                      updateDetail("taxPaidLocalAuthorities", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ic</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    d. Total (Ib + Ic)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.total}
                    onChange={(e) =>
                      updateDetail("total", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Id</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    e. Annual value (Ia - Id)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.annualValue}
                    onChange={(e) =>
                      updateDetail("annualValue", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ie</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    f. 90% of IE
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.percentageLEe}
                    onChange={(e) =>
                      updateDetail("percentageLEe", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">If</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    g. Interest payable on borrowed capital (Details are to be filled in the drop down in or provided in ceiling suffix)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.amountPayableOnBorrowedCapital}
                    onChange={(e) =>
                      updateDetail("amountPayableOnBorrowedCapital", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ig</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    h. Total (If + Ig)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.totalI}
                    onChange={(e) =>
                      updateDetail("totalI", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ih</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end border-b pb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    i. Average Unrealized rent received during the year loss Nft(Ii - Ih - Ij)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.unrealizedGrossRent}
                    onChange={(e) =>
                      updateDetail("unrealizedGrossRent", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ii</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    j. Income from house property 1 (Ie - Ih - Ii) (fill up details separately for each property)
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    value={details.incomeFromHouseProperty}
                    onChange={(e) =>
                      updateDetail("incomeFromHouseProperty", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Ij</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-slate-50 rounded-lg p-6 border-l-4 border-slate-400">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes & Additional Details
            </label>
            <textarea
              value={details.fillUpDetails}
              onChange={(e) =>
                updateDetail("fillUpDetails", e.target.value)
              }
              placeholder="Enter any additional details or notes"
              rows={4}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          {/* Form Actions */}
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
              className="px-8 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleHP;
