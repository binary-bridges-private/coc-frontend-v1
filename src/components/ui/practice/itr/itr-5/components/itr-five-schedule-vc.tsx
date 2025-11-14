import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface VoluntaryContributionDetail {
  domesticCorpusDonation: string;
  domesticCorpusDonationRenovation: string;
  domesticCorpusDonationOther: string;
  domesticOtherDonation: string;
  grantsGovernment: string;
  grantsCorporateCSR: string;
  grantsOtherSpecific: string;
  grantsOtherDonation: string;
  grantsTotal: string;
  voluntaryContributionDomestic: string;
  foreignCorpusDonation: string;
  foreignCorpusDonationRenovation: string;
  foreignCorpusDonationOther: string;
  foreignOtherCorpusDonation: string;
  foreignContribution: string;
  foreignContributionPurpose: string;
  totalContributions: string;
}

export interface ItrFiveScheduleVCFormData {
  voluntaryContributionDetails?: VoluntaryContributionDetail;
}

// Zod validation schema
const voluntaryContributionDetailSchema = z.object({
  domesticCorpusDonation: z.string().optional(),
  domesticCorpusDonationRenovation: z.string().optional(),
  domesticCorpusDonationOther: z.string().optional(),
  domesticOtherDonation: z.string().optional(),
  grantsGovernment: z.string().optional(),
  grantsCorporateCSR: z.string().optional(),
  grantsOtherSpecific: z.string().optional(),
  grantsOtherDonation: z.string().optional(),
  grantsTotal: z.string().optional(),
  voluntaryContributionDomestic: z.string().optional(),
  foreignCorpusDonation: z.string().optional(),
  foreignCorpusDonationRenovation: z.string().optional(),
  foreignCorpusDonationOther: z.string().optional(),
  foreignOtherCorpusDonation: z.string().optional(),
  foreignContribution: z.string().optional(),
  foreignContributionPurpose: z.string().optional(),
  totalContributions: z.string().optional(),
});

const itrFiveScheduleVCSchema = z.object({
  voluntaryContributionDetails: voluntaryContributionDetailSchema.optional(),
});

type ItrFiveScheduleVCFormType = z.infer<typeof itrFiveScheduleVCSchema>;

interface ItrFiveScheduleVCProps {
  initialData?: ItrFiveScheduleVCFormData;
  onSave: (data: ItrFiveScheduleVCFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleVC: React.FC<ItrFiveScheduleVCProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleVCFormType>({
    resolver: zodResolver(itrFiveScheduleVCSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<VoluntaryContributionDetail>(
    initialData?.voluntaryContributionDetails || {
      domesticCorpusDonation: "",
      domesticCorpusDonationRenovation: "",
      domesticCorpusDonationOther: "",
      domesticOtherDonation: "",
      grantsGovernment: "",
      grantsCorporateCSR: "",
      grantsOtherSpecific: "",
      grantsOtherDonation: "",
      grantsTotal: "",
      voluntaryContributionDomestic: "",
      foreignCorpusDonation: "",
      foreignCorpusDonationRenovation: "",
      foreignCorpusDonationOther: "",
      foreignOtherCorpusDonation: "",
      foreignContribution: "",
      foreignContributionPurpose: "",
      totalContributions: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleVCFormType) => {
    onSave({
      voluntaryContributionDetails: details,
    });
  };

  const updateDetail = (field: keyof VoluntaryContributionDetail, value: string) => {
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

  // Calculate totals
  const domesticCorpusTotal =
    parseNumber(details.domesticCorpusDonation) +
    parseNumber(details.domesticCorpusDonationRenovation) +
    parseNumber(details.domesticCorpusDonationOther);

  const grantsSubTotal =
    parseNumber(details.grantsGovernment) +
    parseNumber(details.grantsCorporateCSR) +
    parseNumber(details.grantsOtherSpecific) +
    parseNumber(details.grantsOtherDonation);

  const foreignCorpusTotal =
    parseNumber(details.foreignCorpusDonation) +
    parseNumber(details.foreignCorpusDonationRenovation) +
    parseNumber(details.foreignCorpusDonationOther);

  const totalVoluntaryContributions =
    domesticCorpusTotal +
    parseNumber(details.domesticOtherDonation) +
    grantsSubTotal +
    parseNumber(details.voluntaryContributionDomestic) +
    foreignCorpusTotal +
    parseNumber(details.foreignOtherCorpusDonation) +
    parseNumber(details.foreignContribution);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-900 mb-2">
            Schedule VC - Voluntary Contributions
          </h1>
          <p className="text-teal-700">
            Details of Domestic and Foreign Contributions
          </p>
          <p className="text-xs text-teal-600 mt-2">
            (By b mandatory filing in all persons filing ITR-7)
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-cyan-100 border-l-4 border-cyan-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-teal-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-teal-800 space-y-1 list-disc pl-5">
            <li>Report all voluntary contributions received during the financial year</li>
            <li>Include corpus donations and other grants separately</li>
            <li>Distinguish between domestic and foreign contributions</li>
            <li>Specify purpose for foreign contributions</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section A: Domestic Contributions (Other than anonymous donations) */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-xl font-bold text-teal-900 mb-6">
              A. Domestic Contribution (Other than anonymous donations taxable u/s 115BBC)
            </h2>

            {/* Subsection I: Corpus Donation */}
            <div className="mb-8 bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">
                I. Corpus donation (Aia + Aib)
              </h3>

              <div className="space-y-4 ml-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      a. Corpus representing donations received for the renovation or repair of places notified u/s 80G(5C) or 80G(5D)
                    </label>
                    <input
                      type="text"
                      value={details.domesticCorpusDonationRenovation}
                      onChange={(e) =>
                        updateDetail("domesticCorpusDonationRenovation", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">Aia</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      b. Corpus other than above
                    </label>
                    <input
                      type="text"
                      value={details.domesticCorpusDonationOther}
                      onChange={(e) =>
                        updateDetail("domesticCorpusDonationOther", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">Aib</p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-teal-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-teal-800">
                      Corpus Donation Total (Aia + Aib)
                    </span>
                    <span className="font-bold text-teal-900">
                      ₹ {formatNumber(domesticCorpusTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection II: Other than Corpus Donation */}
            <div className="mb-8 bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">
                II. Other than corpus donation
              </h3>

              <div className="space-y-4 ml-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Other donations and gifts
                  </label>
                  <input
                    type="text"
                    value={details.domesticOtherDonation}
                    onChange={(e) =>
                      updateDetail("domesticOtherDonation", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Aii</p>
                </div>
              </div>
            </div>

            {/* Subsection III: Grants */}
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">
                III. Grants received from Government and other organizations
              </h3>

              <div className="space-y-4 ml-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      (a) Grants Received from Government
                    </label>
                    <input
                      type="text"
                      value={details.grantsGovernment}
                      onChange={(e) =>
                        updateDetail("grantsGovernment", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">AIIIa</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      (b) Grants Received from Companies under Corporate Social Responsibility
                    </label>
                    <input
                      type="text"
                      value={details.grantsCorporateCSR}
                      onChange={(e) =>
                        updateDetail("grantsCorporateCSR", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">AIIIb</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      (c) Other specific grants
                    </label>
                    <input
                      type="text"
                      value={details.grantsOtherSpecific}
                      onChange={(e) =>
                        updateDetail("grantsOtherSpecific", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">AIIIc</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      (d) Other Donations
                    </label>
                    <input
                      type="text"
                      value={details.grantsOtherDonation}
                      onChange={(e) =>
                        updateDetail("grantsOtherDonation", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">AIIId</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      (e) Total
                    </label>
                    <input
                      type="text"
                      value={formatNumber(grantsSubTotal)}
                      disabled
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">AIIIe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Foreign Contributions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-600">
            <h2 className="text-xl font-bold text-teal-900 mb-6">
              B. Foreign contribution (other than anonymous donations taxable u/s 115BBC)
            </h2>

            {/* Subsection I: Corpus Donation */}
            <div className="mb-8 bg-cyan-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">
                I. Corpus donation (Bia + Bib)
              </h3>

              <div className="space-y-4 ml-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      a. Corpus representing donations received for renovation or repair of places notified u/s 80G(5D)
                    </label>
                    <input
                      type="text"
                      value={details.foreignCorpusDonationRenovation}
                      onChange={(e) =>
                        updateDetail("foreignCorpusDonationRenovation", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-cyan-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">Bia</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      b. Corpus other than above
                    </label>
                    <input
                      type="text"
                      value={details.foreignCorpusDonationOther}
                      onChange={(e) =>
                        updateDetail("foreignCorpusDonationOther", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-cyan-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">Bib</p>
                  </div>
                </div>

                <div className="bg-white p-3 rounded border border-cyan-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-teal-800">
                      Foreign Corpus Donation Total (Bia + Bib)
                    </span>
                    <span className="font-bold text-teal-900">
                      ₹ {formatNumber(foreignCorpusTotal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsection II: Other Contributions */}
            <div className="mb-8 bg-cyan-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">
                II. Other corpus donation
              </h3>

              <div className="space-y-4 ml-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    Other donations and grants
                  </label>
                  <input
                    type="text"
                    value={details.foreignOtherCorpusDonation}
                    onChange={(e) =>
                      updateDetail("foreignOtherCorpusDonation", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 border border-cyan-300 rounded-lg text-right"
                  />
                  <p className="text-xs text-gray-500 mt-1">Bii</p>
                </div>
              </div>
            </div>

            {/* Subsection III: Foreign Contribution */}
            <div className="mb-8 bg-cyan-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-4">
                III. Foreign contribution (Bi + Bii)
              </h3>

              <div className="space-y-4 ml-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Contribution Amount
                    </label>
                    <input
                      type="text"
                      value={details.foreignContribution}
                      onChange={(e) =>
                        updateDetail("foreignContribution", e.target.value)
                      }
                      placeholder="0"
                      className="w-full px-3 py-2 border border-cyan-300 rounded-lg text-right"
                    />
                    <p className="text-xs text-gray-500 mt-1">Biii</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      Specify the purpose for which foreign contribution has been received
                    </label>
                    <input
                      type="text"
                      value={details.foreignContributionPurpose}
                      onChange={(e) =>
                        updateDetail("foreignContributionPurpose", e.target.value)
                      }
                      placeholder="Purpose"
                      className="w-full px-3 py-2 border border-cyan-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Biv - Free text box</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-xl font-bold text-teal-900 mb-6">
              C. Total Contributions
            </h2>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b-2 border-teal-300">
                  <span className="font-semibold text-teal-800">
                    Total Voluntary Contributions (Aii + AIIIe + Bi + Bii + Biii)
                  </span>
                  <span className="font-bold text-2xl text-teal-900">
                    ₹ {formatNumber(totalVoluntaryContributions)}
                  </span>
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
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleVC;
