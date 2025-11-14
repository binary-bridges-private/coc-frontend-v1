import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface PoliticalPartyDetail {
  registeredUnderSection29A: string;
  registrationNumber: string;
  dateOfRegistration: string;
  recognizedByElectionCommission: string;
  dateOfRecognition: string;
  booksOfAccountsMaintained: string;
  auditedStatus: string;
  auditDate: string;
  auditorName: string;
  auditorMembership: string;
  auditorFirmName: string;
  auditorRegistration: string;
  auditorPAN: string;
  auditReportDate: string;
  section29CReportSubmitted: string;
  reportSubmissionDate: string;
  voluntaryContribution20k: string;
  voluntaryContributionRecord: string;
  donationExceedingLimit: string;
  totalVoluntaryContributions: string;
  aggregateUpto20k: string;
  aggregateUpto2kCash: string;
  aggregateUpto2kOther: string;
  aggregateMoreThan20k: string;
}

export interface ItrFiveScheduleLAFormData {
  politicalPartyDetails?: PoliticalPartyDetail;
}

// Zod validation schema
const politicalPartyDetailSchema = z.object({
  registeredUnderSection29A: z.string().optional(),
  registrationNumber: z.string().optional(),
  dateOfRegistration: z.string().optional(),
  recognizedByElectionCommission: z.string().optional(),
  dateOfRecognition: z.string().optional(),
  booksOfAccountsMaintained: z.string().optional(),
  auditedStatus: z.string().optional(),
  auditDate: z.string().optional(),
  auditorName: z.string().optional(),
  auditorMembership: z.string().optional(),
  auditorFirmName: z.string().optional(),
  auditorRegistration: z.string().optional(),
  auditorPAN: z.string().optional(),
  auditReportDate: z.string().optional(),
  section29CReportSubmitted: z.string().optional(),
  reportSubmissionDate: z.string().optional(),
  voluntaryContribution20k: z.string().optional(),
  voluntaryContributionRecord: z.string().optional(),
  donationExceedingLimit: z.string().optional(),
  totalVoluntaryContributions: z.string().optional(),
  aggregateUpto20k: z.string().optional(),
  aggregateUpto2kCash: z.string().optional(),
  aggregateUpto2kOther: z.string().optional(),
  aggregateMoreThan20k: z.string().optional(),
});

const itrFiveScheduleLASchema = z.object({
  politicalPartyDetails: politicalPartyDetailSchema.optional(),
});

type ItrFiveScheduleLAFormType = z.infer<typeof itrFiveScheduleLASchema>;

interface ItrFiveScheduleLAProps {
  initialData?: ItrFiveScheduleLAFormData;
  onSave: (data: ItrFiveScheduleLAFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleLA: React.FC<ItrFiveScheduleLAProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleLAFormType>({
    resolver: zodResolver(itrFiveScheduleLASchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [details, setDetails] = useState<PoliticalPartyDetail>(
    initialData?.politicalPartyDetails || {
      registeredUnderSection29A: "",
      registrationNumber: "",
      dateOfRegistration: "",
      recognizedByElectionCommission: "",
      dateOfRecognition: "",
      booksOfAccountsMaintained: "",
      auditedStatus: "",
      auditDate: "",
      auditorName: "",
      auditorMembership: "",
      auditorFirmName: "",
      auditorRegistration: "",
      auditorPAN: "",
      auditReportDate: "",
      section29CReportSubmitted: "",
      reportSubmissionDate: "",
      voluntaryContribution20k: "",
      voluntaryContributionRecord: "",
      donationExceedingLimit: "",
      totalVoluntaryContributions: "",
      aggregateUpto20k: "",
      aggregateUpto2kCash: "",
      aggregateUpto2kOther: "",
      aggregateMoreThan20k: "",
    }
  );

  const onSubmit = (data: ItrFiveScheduleLAFormType) => {
    onSave({
      politicalPartyDetails: details,
    });
  };

  const updateDetail = (field: keyof PoliticalPartyDetail, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-orange-900 mb-2">
            Schedule LA - Political Party
          </h1>
          <p className="text-orange-700">
            Details of Political Party Registration, Audit, and Contributions
          </p>
          <p className="text-xs text-orange-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Registration Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
            <h2 className="text-xl font-bold text-orange-900 mb-6">
              1. Registration under Section 29A of Representation of People Act, 1951
            </h2>

            <div className="space-y-6">
              {/* Question 1: Registered */}
              <div className="border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    A) Whether registered under Section 29A of Representation of People Act, 1951
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.registeredUnderSection29A === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "registeredUnderSection29A",
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
                        checked={details.registeredUnderSection29A === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "registeredUnderSection29A",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>

                {/* Registration Number and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      a) If yes, please enter registration number
                    </label>
                    <input
                      type="text"
                      value={details.registrationNumber}
                      onChange={(e) => updateDetail("registrationNumber", e.target.value)}
                      placeholder="Registration Number"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      b) Date of Registration
                    </label>
                    <input
                      type="text"
                      value={details.dateOfRegistration}
                      onChange={(e) => updateDetail("dateOfRegistration", e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Question 1B: Election Commission Recognition */}
              <div className="border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    B) Whether recognized by the Election Commission of India
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.recognizedByElectionCommission === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "recognizedByElectionCommission",
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
                        checked={details.recognizedByElectionCommission === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "recognizedByElectionCommission",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-2">
                    a) If yes, date of recognition
                  </label>
                  <input
                    type="text"
                    value={details.dateOfRecognition}
                    onChange={(e) => updateDetail("dateOfRecognition", e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3 py-2 border border-orange-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Question 2: Books of Accounts */}
              <div className="border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    2. Whether books of accounts have been maintained? (tick as applicable ☑)
                  </label>
                  <div className="flex gap-4">
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

              {/* Question 3: Audit Status */}
              <div className="border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-6">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    3. Whether the accounts have been audited? (tick as applicable ☑)
                  </label>
                  <div className="flex gap-4">
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

                {details.auditedStatus === "yes" && (
                  <div className="bg-orange-50 p-4 rounded-lg space-y-4">
                    <h3 className="font-semibold text-orange-900 text-sm mb-4">
                      If yes, furnish the following information:-
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          a) Date of furnishing of the audit report (DD/MM/YYYY)
                        </label>
                        <input
                          type="text"
                          value={details.auditDate}
                          onChange={(e) => updateDetail("auditDate", e.target.value)}
                          placeholder="DD/MM/YYYY"
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          b) Name of the auditor signing the audit report
                        </label>
                        <input
                          type="text"
                          value={details.auditorName}
                          onChange={(e) => updateDetail("auditorName", e.target.value)}
                          placeholder="Name"
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          c) Membership No. of the auditor
                        </label>
                        <input
                          type="text"
                          value={details.auditorMembership}
                          onChange={(e) =>
                            updateDetail("auditorMembership", e.target.value)
                          }
                          placeholder="Membership No."
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          d) Name of the auditor (proprietorship/ firm)
                        </label>
                        <input
                          type="text"
                          value={details.auditorFirmName}
                          onChange={(e) =>
                            updateDetail("auditorFirmName", e.target.value)
                          }
                          placeholder="Firm Name"
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          e) Proprietorship/firm registration No.
                        </label>
                        <input
                          type="text"
                          value={details.auditorRegistration}
                          onChange={(e) =>
                            updateDetail("auditorRegistration", e.target.value)
                          }
                          placeholder="Registration No."
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          f) Permanent Account Number (PAN) / Aadhaar No.
                        </label>
                        <input
                          type="text"
                          value={details.auditorPAN}
                          onChange={(e) => updateDetail("auditorPAN", e.target.value)}
                          placeholder="PAN / Aadhaar"
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          g) Date of audit report
                        </label>
                        <input
                          type="text"
                          value={details.auditReportDate}
                          onChange={(e) =>
                            updateDetail("auditReportDate", e.target.value)
                          }
                          placeholder="DD/MM/YYYY"
                          className="w-full px-2 py-2 border border-orange-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Question 4: Section 29C Report */}
              <div className="border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    4. Whether the report under sub-section (3) of section 29C of the Representation of the People Act, 1951 for the financial year has been submitted?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.section29CReportSubmitted === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "section29CReportSubmitted",
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
                        checked={details.section29CReportSubmitted === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "section29CReportSubmitted",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>

                {details.section29CReportSubmitted === "yes" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">
                      If yes, date of submission of the report (DD/MM/YYYY)
                    </label>
                    <input
                      type="text"
                      value={details.reportSubmissionDate}
                      onChange={(e) =>
                        updateDetail("reportSubmissionDate", e.target.value)
                      }
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 py-2 border border-orange-300 rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Question 5: Voluntary Contributions */}
              <div className="border-b pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    5 a) Whether any voluntary contribution from any person in excess of twenty thousand rupees was received during the year?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.voluntaryContribution20k === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "voluntaryContribution20k",
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
                        checked={details.voluntaryContribution20k === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "voluntaryContribution20k",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    b) If yes, whether record of each voluntary contribution (other than contributions by way of electoral bonds) in excess of twenty thousand rupees (including name and address of the person who has made such contribution) were maintained?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.voluntaryContributionRecord === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "voluntaryContributionRecord",
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
                        checked={details.voluntaryContributionRecord === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "voluntaryContributionRecord",
                            e.target.checked ? "no" : ""
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-xs">No</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <label className="text-sm font-semibold text-gray-700 col-span-2">
                    6. Whether any donation exceeding two thousand rupees was received otherwise than by an account payee cheque or account payee bank draft or use of electronic clearing system through a bank account or through electoral bond?
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={details.donationExceedingLimit === "yes"}
                        onChange={(e) =>
                          updateDetail(
                            "donationExceedingLimit",
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
                        checked={details.donationExceedingLimit === "no"}
                        onChange={(e) =>
                          updateDetail(
                            "donationExceedingLimit",
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

              {/* Question 7: Contribution Information */}
              <div className="pb-6">
                <h3 className="font-semibold text-orange-900 mb-4">
                  7. Please furnish the following information:-
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        a) Total voluntary contributions received by the party during the F.Y. (b+d)
                      </label>
                      <input
                        type="text"
                        value={details.totalVoluntaryContributions}
                        onChange={(e) =>
                          updateDetail("totalVoluntaryContributions", e.target.value)
                        }
                        placeholder="Amount in Rs."
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        b) Aggregate value of all the voluntary contributions received upto Rs. 20,000 during the F.Y.
                      </label>
                      <input
                        type="text"
                        value={details.aggregateUpto20k}
                        onChange={(e) =>
                          updateDetail("aggregateUpto20k", e.target.value)
                        }
                        placeholder="Amount in Rs."
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        c) Aggregate value of all the voluntary contributions received upto Rs. 2,000 in cash during the F.Y.
                      </label>
                      <input
                        type="text"
                        value={details.aggregateUpto2kCash}
                        onChange={(e) =>
                          updateDetail("aggregateUpto2kCash", e.target.value)
                        }
                        placeholder="Amount in Rs."
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        cii) Aggregate value of all the voluntary contributions received upto Rs. 2,000 other than in cash during the F.Y.
                      </label>
                      <input
                        type="text"
                        value={details.aggregateUpto2kOther}
                        onChange={(e) =>
                          updateDetail("aggregateUpto2kOther", e.target.value)
                        }
                        placeholder="Amount in Rs."
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">
                        d) Aggregate value of all the voluntary contributions received more than Rs. 20,000/- during the F.Y.
                      </label>
                      <input
                        type="text"
                        value={details.aggregateMoreThan20k}
                        onChange={(e) =>
                          updateDetail("aggregateMoreThan20k", e.target.value)
                        }
                        placeholder="Amount in Rs."
                        className="w-full px-3 py-2 border border-orange-300 rounded-lg text-right"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
            <h3 className="font-semibold text-orange-900 mb-2">Important Notes:</h3>
            <ul className="text-xs text-orange-800 space-y-1 list-disc list-inside">
              <li>Tick the applicable checkbox for Yes/No questions</li>
              <li>For registered political parties under Section 29A only</li>
              <li>All contribution amounts should be in Rupees</li>
              <li>Ensure audit details are complete if accounts have been audited</li>
              <li>Electoral bonds are considered for limit calculations</li>
            </ul>
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
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleLA;
