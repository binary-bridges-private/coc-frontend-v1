import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ElectoralTrustDetail {
  booksOfAccountsMaintained: string;
  eligibleContributionRecords: string;
  cashEligiblePoliticalPartyDistribution: string;
  auditedStatus: string;
  auditReportSubmitted: string;
  itrForm11CAReportSubmitted: string;
  reportDate: string;
  openingBalance: string;
  voluntaryContribution: string;
  totalAmount: string;
  amountDistributed: string;
  adminSpentAmount: string;
  totalSpent: string;
  closingBalance: string;
  totalAmountEligible: string;
  closingBalanceBalance: string;
}

export interface ItrFiveScheduleETFormData {
  electoralTrustDetails?: ElectoralTrustDetail;
}

// Zod validation schema
const electoralTrustDetailSchema = z.object({
  booksOfAccountsMaintained: z.string().optional(),
  eligibleContributionRecords: z.string().optional(),
  cashEligiblePoliticalPartyDistribution: z.string().optional(),
  auditedStatus: z.string().optional(),
  auditReportSubmitted: z.string().optional(),
  itrForm11CAReportSubmitted: z.string().optional(),
  reportDate: z.string().optional(),
  openingBalance: z.string().optional(),
  voluntaryContribution: z.string().optional(),
  totalAmount: z.string().optional(),
  amountDistributed: z.string().optional(),
  adminSpentAmount: z.string().optional(),
  totalSpent: z.string().optional(),
  closingBalance: z.string().optional(),
  totalAmountEligible: z.string().optional(),
  closingBalanceBalance: z.string().optional(),
});

const itrFiveScheduleETSchema = z.object({
  electoralTrustDetails: electoralTrustDetailSchema.optional(),
});

type ItrFiveScheduleETFormType = z.infer<typeof itrFiveScheduleETSchema>;

interface ItrFiveScheduleETProps {
  initialData?: ItrFiveScheduleETFormData;
  onSave: (data: ItrFiveScheduleETFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleET: React.FC<ItrFiveScheduleETProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleETFormType>({
    resolver: zodResolver(itrFiveScheduleETSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<ElectoralTrustDetail>(
    initialData?.electoralTrustDetails || {
      booksOfAccountsMaintained: "",
      eligibleContributionRecords: "",
      cashEligiblePoliticalPartyDistribution: "",
      auditedStatus: "",
      auditReportSubmitted: "",
      itrForm11CAReportSubmitted: "",
      reportDate: "",
      openingBalance: "",
      voluntaryContribution: "",
      totalAmount: "",
      amountDistributed: "",
      adminSpentAmount: "",
      totalSpent: "",
      closingBalance: "",
      totalAmountEligible: "",
      closingBalanceBalance: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleETFormType) => {
    onSave({
      electoralTrustDetails: details,
    });
  };

  const updateDetail = (field: keyof ElectoralTrustDetail, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-violet-900 mb-2">
            Schedule ET - Electoral Trust
          </h1>
          <p className="text-violet-700">
            Details of Electoral Trust Accounts and Distributions
          </p>
          <p className="text-xs text-violet-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Compliance Questions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-violet-600">
            <h2 className="text-xl font-bold text-violet-900 mb-6">
              Electoral Trust Compliance
            </h2>

            <div className="space-y-6">
              {/* Question 1 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    1. Whether books of account were maintained?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.booksOfAccountsMaintained === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "booksOfAccountsMaintained",
                            e.target.checked ? "yes" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.booksOfAccountsMaintained === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "booksOfAccountsMaintained",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Question 2 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    2. Whether record of contribution (mentioning name, address and PAN of the person who has made such contribution along with the mode of contribution) were maintained?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.eligibleContributionRecords === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "eligibleContributionRecords",
                            e.target.checked ? "yes" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.eligibleContributionRecords === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "eligibleContributionRecords",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Question 3 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    3. Whether record of cash eligible political party to whom the distributable contributions have been distributed (including name, PAN and registration number of eligible political party) were maintained?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.cashEligiblePoliticalPartyDistribution === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "cashEligiblePoliticalPartyDistribution",
                            e.target.checked ? "yes" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.cashEligiblePoliticalPartyDistribution === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "cashEligiblePoliticalPartyDistribution",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Question 4 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    4. Whether the accounts have been audited as per rule TFICA(17)?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.auditedStatus === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "auditedStatus",
                            e.target.checked ? "yes" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.auditedStatus === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "auditedStatus",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Question 5 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    5. Whether the audit report in Form No. TFICA(16) was submitted?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.auditReportSubmitted === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "auditReportSubmitted",
                            e.target.checked ? "yes" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.auditReportSubmitted === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "auditReportSubmitted",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Question 6 */}
              <div className="border-b pb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    6. Whether the report as per the TFICA(14) furnished to the Commissioner of Income Tax or Department?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.itrForm11CAReportSubmitted === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "itrForm11CAReportSubmitted",
                            e.target.checked ? "yes" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.itrForm11CAReportSubmitted === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "itrForm11CAReportSubmitted",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Question 6a */}
              {details.itrForm11CAReportSubmitted === "yes" && (
                <div className="bg-violet-50 p-4 rounded-lg">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    If yes, date of submission of the report
                  </label>
                  <input
                    type="text"
                    value={details.reportDate}
                    onChange={(e) => updateDetail("reportDate", e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-violet-300 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-xl font-bold text-violet-900 mb-6">
              6. Details of Voluntary Contributions Received and Amounts Distributed During the Year
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    I. Opening balance as on 1st April
                  </label>
                  <input
                    type="text"
                    value={details.openingBalance}
                    onChange={(e) => updateDetail("openingBalance", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    II. Voluntary contribution received during the year
                  </label>
                  <input
                    type="text"
                    value={details.voluntaryContribution}
                    onChange={(e) => updateDetail("voluntaryContribution", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    III. Total (I + II)
                  </label>
                  <input
                    type="text"
                    value={details.totalAmount}
                    onChange={(e) => updateDetail("totalAmount", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    IV. Amount distributed to Political parties
                  </label>
                  <input
                    type="text"
                    value={details.amountDistributed}
                    onChange={(e) => updateDetail("amountDistributed", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    V. Amount spent on administrative and management functions of the Trust (Restricted to 5% of Sr.no. (i) above or 5 lakhs for first year of incorporation and 3 lakh for subsequent years whichever is lower)
                  </label>
                  <input
                    type="text"
                    value={details.adminSpentAmount}
                    onChange={(e) => updateDetail("adminSpentAmount", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    VI. Total (IV + V)
                  </label>
                  <input
                    type="text"
                    value={details.totalSpent}
                    onChange={(e) => updateDetail("totalSpent", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    VII. Total amount eligible for exemption under section 13B (Sr.no. Bill of schedule ET.7 amount invested in any bonds of any ITA)
                  </label>
                  <input
                    type="text"
                    value={details.totalAmountEligible}
                    onChange={(e) => updateDetail("totalAmountEligible", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    VIII. Closing balance as on 31st March (III - VI)
                  </label>
                  <input
                    type="text"
                    value={details.closingBalance}
                    onChange={(e) => updateDetail("closingBalance", e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-purple-300 rounded-lg text-right"
                  />
                </div>
              </div>
            </div>
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
              className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-violet-600 text-white font-semibold rounded-lg hover:bg-violet-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleET;
