import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ApplicationDetail {
  donationDonationTrustApp: string;
  donationDonationTrustRevenue: string;
  donationDonationTrustTotal: string;
  donation85pctTrustApp: string;
  donation85pctTrustRevenue: string;
  donation85pctTrustTotal: string;
  religionApp: string;
  religionRevenue: string;
  religionTotal: string;
  reliefPoorApp: string;
  reliefPoorRevenue: string;
  reliefPoorTotal: string;
  educationalApp: string;
  educationalRevenue: string;
  educationalTotal: string;
  yogaApp: string;
  yogaRevenue: string;
  yogaTotal: string;
  medicalReliefApp: string;
  medicalReliefRevenue: string;
  medicalReliefTotal: string;
  environmentApp: string;
  environmentRevenue: string;
  environmentTotal: string;
  monumentApp: string;
  monumentRevenue: string;
  monumentTotal: string;
  otherObjectsApp: string;
  otherObjectsRevenue: string;
  otherObjectsTotal: string;
  cannotSpecifyApp: string;
  cannotSpecifyRevenue: string;
  cannotSpecifyTotal: string;
  newAssetClaimApp: string;
  newAssetClaimRevenue: string;
  newAssetClaimTotal: string;
  totalAllApp: string;
  totalAllRevenue: string;
  totalAllTotal: string;
}

export interface ItrFiveScheduleHFormData {
  applicationDetails?: ApplicationDetail;
}

// Zod validation schema
const applicationDetailSchema = z.object({
  donationDonationTrustApp: z.string().optional(),
  donationDonationTrustRevenue: z.string().optional(),
  donationDonationTrustTotal: z.string().optional(),
  donation85pctTrustApp: z.string().optional(),
  donation85pctTrustRevenue: z.string().optional(),
  donation85pctTrustTotal: z.string().optional(),
  religionApp: z.string().optional(),
  religionRevenue: z.string().optional(),
  religionTotal: z.string().optional(),
  reliefPoorApp: z.string().optional(),
  reliefPoorRevenue: z.string().optional(),
  reliefPoorTotal: z.string().optional(),
  educationalApp: z.string().optional(),
  educationalRevenue: z.string().optional(),
  educationalTotal: z.string().optional(),
  yogaApp: z.string().optional(),
  yogaRevenue: z.string().optional(),
  yogaTotal: z.string().optional(),
  medicalReliefApp: z.string().optional(),
  medicalReliefRevenue: z.string().optional(),
  medicalReliefTotal: z.string().optional(),
  environmentApp: z.string().optional(),
  environmentRevenue: z.string().optional(),
  environmentTotal: z.string().optional(),
  monumentApp: z.string().optional(),
  monumentRevenue: z.string().optional(),
  monumentTotal: z.string().optional(),
  otherObjectsApp: z.string().optional(),
  otherObjectsRevenue: z.string().optional(),
  otherObjectsTotal: z.string().optional(),
  cannotSpecifyApp: z.string().optional(),
  cannotSpecifyRevenue: z.string().optional(),
  cannotSpecifyTotal: z.string().optional(),
  newAssetClaimApp: z.string().optional(),
  newAssetClaimRevenue: z.string().optional(),
  newAssetClaimTotal: z.string().optional(),
  totalAllApp: z.string().optional(),
  totalAllRevenue: z.string().optional(),
  totalAllTotal: z.string().optional(),
});

const itrFiveScheduleHSchema = z.object({
  applicationDetails: applicationDetailSchema.optional(),
});

type ItrFiveScheduleHFormType = z.infer<typeof itrFiveScheduleHSchema>;

interface ItrFiveScheduleHProps {
  initialData?: ItrFiveScheduleHFormData;
  onSave: (data: ItrFiveScheduleHFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleH: React.FC<ItrFiveScheduleHProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleHFormType>({
    resolver: zodResolver(itrFiveScheduleHSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<ApplicationDetail>(
    initialData?.applicationDetails || {
      donationDonationTrustApp: "",
      donationDonationTrustRevenue: "",
      donationDonationTrustTotal: "",
      donation85pctTrustApp: "",
      donation85pctTrustRevenue: "",
      donation85pctTrustTotal: "",
      religionApp: "",
      religionRevenue: "",
      religionTotal: "",
      reliefPoorApp: "",
      reliefPoorRevenue: "",
      reliefPoorTotal: "",
      educationalApp: "",
      educationalRevenue: "",
      educationalTotal: "",
      yogaApp: "",
      yogaRevenue: "",
      yogaTotal: "",
      medicalReliefApp: "",
      medicalReliefRevenue: "",
      medicalReliefTotal: "",
      environmentApp: "",
      environmentRevenue: "",
      environmentTotal: "",
      monumentApp: "",
      monumentRevenue: "",
      monumentTotal: "",
      otherObjectsApp: "",
      otherObjectsRevenue: "",
      otherObjectsTotal: "",
      cannotSpecifyApp: "",
      cannotSpecifyRevenue: "",
      cannotSpecifyTotal: "",
      newAssetClaimApp: "",
      newAssetClaimRevenue: "",
      newAssetClaimTotal: "",
      totalAllApp: "",
      totalAllRevenue: "",
      totalAllTotal: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleHFormType) => {
    onSave({
      applicationDetails: details,
    });
  };

  const updateDetail = (field: keyof ApplicationDetail, value: string) => {
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

  // Helper function to render a row with three columns
  const renderApplicationRow = (
    label: string,
    appField: keyof ApplicationDetail,
    revenuField: keyof ApplicationDetail,
    totalField: keyof ApplicationDetail,
    rowNum: string
  ) => {
    const appValue = parseNumber(details[appField] as string);
    const revValue = parseNumber(details[revenuField] as string);
    const total = appValue + revValue;

    return (
      <div key={rowNum} className="border-b">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4 items-center hover:bg-gray-50">
          <div className="md:col-span-2">
            <p className="text-sm font-semibold text-gray-700">{label}</p>
          </div>
          <div>
            <input
              type="text"
              value={details[appField] as string}
              onChange={(e) => updateDetail(appField, e.target.value)}
              placeholder="0"
              className="w-full px-2 py-2 border border-gray-300 rounded text-right text-xs"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">Application</p>
          </div>
          <div>
            <input
              type="text"
              value={details[revenuField] as string}
              onChange={(e) => updateDetail(revenuField, e.target.value)}
              placeholder="0"
              className="w-full px-2 py-2 border border-gray-300 rounded text-right text-xs"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">Revenue</p>
          </div>
          <div>
            <div className="px-2 py-2 border border-gray-300 rounded text-right bg-gray-100">
              <p className="text-xs font-semibold text-gray-700">₹ {formatNumber(total)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">Total</p>
          </div>
        </div>
      </div>
    );
  };

  // Calculate overall totals
  const totalAppAllRows =
    parseNumber(details.donationDonationTrustApp as string) +
    parseNumber(details.donation85pctTrustApp as string) +
    parseNumber(details.religionApp as string) +
    parseNumber(details.reliefPoorApp as string) +
    parseNumber(details.educationalApp as string) +
    parseNumber(details.yogaApp as string) +
    parseNumber(details.medicalReliefApp as string) +
    parseNumber(details.environmentApp as string) +
    parseNumber(details.monumentApp as string) +
    parseNumber(details.otherObjectsApp as string) +
    parseNumber(details.cannotSpecifyApp as string) +
    parseNumber(details.newAssetClaimApp as string);

  const totalRevAllRows =
    parseNumber(details.donationDonationTrustRevenue as string) +
    parseNumber(details.donation85pctTrustRevenue as string) +
    parseNumber(details.religionRevenue as string) +
    parseNumber(details.reliefPoorRevenue as string) +
    parseNumber(details.educationalRevenue as string) +
    parseNumber(details.yogaRevenue as string) +
    parseNumber(details.medicalReliefRevenue as string) +
    parseNumber(details.environmentRevenue as string) +
    parseNumber(details.monumentRevenue as string) +
    parseNumber(details.otherObjectsRevenue as string) +
    parseNumber(details.cannotSpecifyRevenue as string) +
    parseNumber(details.newAssetClaimRevenue as string);

  const grandTotal = totalAppAllRows + totalRevAllRows;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Schedule H - Application towards Stated Objects
          </h1>
          <p className="text-green-700">
            Amount applied to stated objects of the trust/institution during previous year from all sources
          </p>
          <p className="text-xs text-green-600 mt-2">
            (To be filled to assess claiming exemption u/s 11 and 12 or u/s 10(23C)(vi) or 10(23C)(vii) or 10(23C)(viii) or 10(23C)(ixd))
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-emerald-100 border-l-4 border-emerald-600 p-4 rounded-lg mb-8">
          <h3 className="font-bold text-green-900 mb-2">Important Notes:</h3>
          <ul className="text-xs text-green-800 space-y-1 list-disc pl-5">
            <li>Report all amounts applied towards stated objects of the trust/institution</li>
            <li>Separate application and revenue columns as per form structure</li>
            <li>Specify nature for unidentified applications</li>
            <li>All figures should be in Indian Rupees</li>
          </ul>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Application Details Table */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-600 overflow-hidden">
            <div className="p-6 border-b border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <h2 className="text-xl font-bold text-green-900">
                A. Application towards the Stated Objects of the Trust/Institution
              </h2>
            </div>

            <div className="overflow-x-auto">
              <div className="p-4">
                {/* Header Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4 bg-green-100 rounded-lg mb-2 font-bold text-green-900">
                  <div className="md:col-span-2">Application Purpose</div>
                  <div className="text-center">Application</div>
                  <div className="text-center">Revenue</div>
                  <div className="text-center">Total</div>
                </div>

                {/* Application Rows */}
                {renderApplicationRow(
                  "1. Donation(s) made to trust or institution(s) registered u/s 12AB or approved u/s 10(23C)(iii)(vi)(vii)(viii) - Corpus",
                  "donationDonationTrustApp",
                  "donationDonationTrustRevenue",
                  "donationDonationTrustTotal",
                  "1"
                )}

                {renderApplicationRow(
                  "1a. 85% of the donation(s) made to trust or institution(s) registered u/s 12AB or approved u/s 10(23C)(iii)(vi)(vii)(viii) - Other than donations out of accumulated income",
                  "donation85pctTrustApp",
                  "donation85pctTrustRevenue",
                  "donation85pctTrustTotal",
                  "1a"
                )}

                {renderApplicationRow(
                  "2. Religion",
                  "religionApp",
                  "religionRevenue",
                  "religionTotal",
                  "2"
                )}

                {renderApplicationRow(
                  "3. Relief of poor",
                  "reliefPoorApp",
                  "reliefPoorRevenue",
                  "reliefPoorTotal",
                  "3"
                )}

                {renderApplicationRow(
                  "4. Educational",
                  "educationalApp",
                  "educationalRevenue",
                  "educationalTotal",
                  "4"
                )}

                {renderApplicationRow(
                  "5. Yoga",
                  "yogaApp",
                  "yogaRevenue",
                  "yogaTotal",
                  "5"
                )}

                {renderApplicationRow(
                  "6. Medical relief",
                  "medicalReliefApp",
                  "medicalReliefRevenue",
                  "medicalReliefTotal",
                  "6"
                )}

                {renderApplicationRow(
                  "7. Preservation of environment",
                  "environmentApp",
                  "environmentRevenue",
                  "environmentTotal",
                  "7"
                )}

                {renderApplicationRow(
                  "8. Preservation of monuments etc.",
                  "monumentApp",
                  "monumentRevenue",
                  "monumentTotal",
                  "8"
                )}

                {renderApplicationRow(
                  "9. Other disallowable application",
                  "otherObjectsApp",
                  "otherObjectsRevenue",
                  "otherObjectsTotal",
                  "9"
                )}

                {renderApplicationRow(
                  "10. Application which cannot be specifically identified under 1 to 9 above",
                  "cannotSpecifyApp",
                  "cannotSpecifyRevenue",
                  "cannotSpecifyTotal",
                  "10"
                )}

                {renderApplicationRow(
                  "11. Cost of new asset for claim of Exemption u/s 11(1A) (restricted to the set consideration)",
                  "newAssetClaimApp",
                  "newAssetClaimRevenue",
                  "newAssetClaimTotal",
                  "11"
                )}

                {/* Total Row */}
                <div className="border-t-2 border-green-400 mt-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg font-bold text-green-900">
                    <div className="md:col-span-2">12. Total (A1a to A11)</div>
                    <div className="text-center">
                      <p className="text-sm">₹ {formatNumber(totalAppAllRows)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm">₹ {formatNumber(totalRevAllRows)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg">₹ {formatNumber(grandTotal)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-l-4 border-emerald-600">
            <h2 className="text-xl font-bold text-green-900 mb-4">Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-green-800">Total Application Amount</span>
                <span className="font-bold text-lg">₹ {formatNumber(totalAppAllRows)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-semibold text-green-800">Total Revenue Amount</span>
                <span className="font-bold text-lg">₹ {formatNumber(totalRevAllRows)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-emerald-300">
                <span className="font-bold text-lg text-green-900">Grand Total</span>
                <span className="font-bold text-2xl text-emerald-900">₹ {formatNumber(grandTotal)}</span>
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
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleH;
