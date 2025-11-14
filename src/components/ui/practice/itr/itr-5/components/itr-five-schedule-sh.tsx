import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface ShareholdingDetail {
  slNo: number;
  nameOfShareholder: string;
  residentialStatus: string;
  typeOfShares: string;
  pan: string;
  dateOfAcquisition: string;
  numberOfSharesHeld: string;
  faceValuePerShare: string;
  issuePricePerShare: string;
  amountPaid: string;
}

export interface EquityShareApplicationDetail {
  slNo: number;
  nameOfApplicant: string;
  residentialStatus: string;
  typeOfShares: string;
  pan: string;
  dateOfApplication: string;
  numberOfShares: string;
  applicationMoneyPer: string;
  faceValuePerShare: string;
  proposedIssuePrice: string;
}

export interface ShareholderNotShareDetail {
  slNo: number;
  nameOfShareholder: string;
  residentialStatus: string;
  typeOfSharesPAN: string;
  pan: string;
  numberOfSharesHeld: string;
  faceValuePerShare: string;
  issuePrice: string;
  amountPaid: string;
  dateOfAcquisition: string;
  dateOnWhichCease: string;
  modeOfTransfer: string;
  inCaseOfTransferPAN: string;
}

export interface ItrFiveScheduleSHFormData {
  shareHoldingDetails?: ShareholdingDetail[];
  equityShareApplicationDetails?: EquityShareApplicationDetail[];
  shareholderNotShareDetails?: ShareholderNotShareDetail[];
}

// Zod validation schema
const shareholdingDetailSchema = z.object({
  slNo: z.number().optional(),
  nameOfShareholder: z.string().optional(),
  residentialStatus: z.string().optional(),
  typeOfShares: z.string().optional(),
  pan: z.string().optional(),
  dateOfAcquisition: z.string().optional(),
  numberOfSharesHeld: z.string().optional(),
  faceValuePerShare: z.string().optional(),
  issuePricePerShare: z.string().optional(),
  amountPaid: z.string().optional(),
});

const equityShareApplicationSchema = z.object({
  slNo: z.number().optional(),
  nameOfApplicant: z.string().optional(),
  residentialStatus: z.string().optional(),
  typeOfShares: z.string().optional(),
  pan: z.string().optional(),
  dateOfApplication: z.string().optional(),
  numberOfShares: z.string().optional(),
  applicationMoneyPer: z.string().optional(),
  faceValuePerShare: z.string().optional(),
  proposedIssuePrice: z.string().optional(),
});

const shareholderNotShareSchema = z.object({
  slNo: z.number().optional(),
  nameOfShareholder: z.string().optional(),
  residentialStatus: z.string().optional(),
  typeOfSharesPAN: z.string().optional(),
  pan: z.string().optional(),
  numberOfSharesHeld: z.string().optional(),
  faceValuePerShare: z.string().optional(),
  issuePrice: z.string().optional(),
  amountPaid: z.string().optional(),
  dateOfAcquisition: z.string().optional(),
  dateOnWhichCease: z.string().optional(),
  modeOfTransfer: z.string().optional(),
  inCaseOfTransferPAN: z.string().optional(),
});

const itrFiveScheduleSHSchema = z.object({
  shareHoldingDetails: z.array(shareholdingDetailSchema).optional(),
  equityShareApplicationDetails: z.array(equityShareApplicationSchema).optional(),
  shareholderNotShareDetails: z.array(shareholderNotShareSchema).optional(),
});

type ItrFiveScheduleSHFormType = z.infer<typeof itrFiveScheduleSHSchema>;

interface ItrFiveScheduleSHProps {
  initialData?: ItrFiveScheduleSHFormData;
  onSave: (data: ItrFiveScheduleSHFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleSH: React.FC<ItrFiveScheduleSHProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleSHFormType>({
    resolver: zodResolver(itrFiveScheduleSHSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [shareHoldingDetails, setShareHoldingDetails] = useState<ShareholdingDetail[]>(
    initialData?.shareHoldingDetails || [
      {
        slNo: 1,
        nameOfShareholder: "",
        residentialStatus: "",
        typeOfShares: "",
        pan: "",
        dateOfAcquisition: "",
        numberOfSharesHeld: "",
        faceValuePerShare: "",
        issuePricePerShare: "",
        amountPaid: "",
      },
    ]
  );

  const [equityShareApplicationDetails, setEquityShareApplicationDetails] = useState<
    EquityShareApplicationDetail[]
  >(
    initialData?.equityShareApplicationDetails || [
      {
        slNo: 1,
        nameOfApplicant: "",
        residentialStatus: "",
        typeOfShares: "",
        pan: "",
        dateOfApplication: "",
        numberOfShares: "",
        applicationMoneyPer: "",
        faceValuePerShare: "",
        proposedIssuePrice: "",
      },
    ]
  );

  const [shareholderNotShareDetails, setShareholderNotShareDetails] = useState<
    ShareholderNotShareDetail[]
  >(
    initialData?.shareholderNotShareDetails || [
      {
        slNo: 1,
        nameOfShareholder: "",
        residentialStatus: "",
        typeOfSharesPAN: "",
        pan: "",
        numberOfSharesHeld: "",
        faceValuePerShare: "",
        issuePrice: "",
        amountPaid: "",
        dateOfAcquisition: "",
        dateOnWhichCease: "",
        modeOfTransfer: "",
        inCaseOfTransferPAN: "",
      },
    ]
  );

  const onSubmit = (data: ItrFiveScheduleSHFormType) => {
    onSave({
      shareHoldingDetails,
      equityShareApplicationDetails,
      shareholderNotShareDetails,
    });
  };

  const updateShareHolding = (
    index: number,
    field: keyof ShareholdingDetail,
    value: string | number
  ) => {
    const updated = [...shareHoldingDetails];
    updated[index] = { ...updated[index], [field]: value };
    setShareHoldingDetails(updated);
  };

  const addShareHoldingRow = () => {
    const newSlNo = Math.max(...shareHoldingDetails.map((d) => d.slNo), 0) + 1;
    setShareHoldingDetails([
      ...shareHoldingDetails,
      {
        slNo: newSlNo,
        nameOfShareholder: "",
        residentialStatus: "",
        typeOfShares: "",
        pan: "",
        dateOfAcquisition: "",
        numberOfSharesHeld: "",
        faceValuePerShare: "",
        issuePricePerShare: "",
        amountPaid: "",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-violet-900 mb-2">
            Schedule SH - Share Holding of Unlisted Company
          </h1>
          <p className="text-violet-700">
            If you are an unlisted company, please furnish the following details
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-violet-100 border-l-4 border-violet-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-violet-900">
            <strong>Important:</strong> This schedule captures shareholding details of unlisted companies 
            including shareholders at end of year, equity share applications, and former shareholders.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Part A: Details of shareholding at end of previous year */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-violet-600">
            <h2 className="text-lg font-bold text-violet-900 mb-6">
              Details of shareholding at the end of the previous year
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-violet-200 border-b-2 border-violet-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">Name of Shareholder</th>
                    <th className="border px-2 py-2 text-left font-semibold">Residential Status in India</th>
                    <th className="border px-2 py-2 text-left font-semibold">Type of Shares</th>
                    <th className="border px-2 py-2 text-left font-semibold">PAN</th>
                    <th className="border px-2 py-2 text-left font-semibold">Date of Acquisition</th>
                    <th className="border px-2 py-2 text-right font-semibold">Number of Shares Held</th>
                    <th className="border px-2 py-2 text-right font-semibold">Face Value Per Share</th>
                    <th className="border px-2 py-2 text-right font-semibold">Issue Price Per Share</th>
                    <th className="border px-2 py-2 text-right font-semibold">Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {shareHoldingDetails.map((row, index) => (
                    <tr key={index} className="hover:bg-violet-50">
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.slNo}
                          disabled
                          className="w-8 px-1 py-1 border border-violet-200 rounded bg-gray-100 text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.nameOfShareholder}
                          onChange={(e) =>
                            updateShareHolding(index, "nameOfShareholder", e.target.value)
                          }
                          placeholder="Name"
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select
                          value={row.residentialStatus}
                          onChange={(e) =>
                            updateShareHolding(index, "residentialStatus", e.target.value)
                          }
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="Resident">Resident</option>
                          <option value="Non-Resident">Non-Resident</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.typeOfShares}
                          onChange={(e) =>
                            updateShareHolding(index, "typeOfShares", e.target.value)
                          }
                          placeholder="Type"
                          className="w-16 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.pan}
                          onChange={(e) =>
                            updateShareHolding(index, "pan", e.target.value)
                          }
                          placeholder="PAN"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="date"
                          value={row.dateOfAcquisition}
                          onChange={(e) =>
                            updateShareHolding(index, "dateOfAcquisition", e.target.value)
                          }
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.numberOfSharesHeld}
                          onChange={(e) =>
                            updateShareHolding(index, "numberOfSharesHeld", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.faceValuePerShare}
                          onChange={(e) =>
                            updateShareHolding(index, "faceValuePerShare", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.issuePricePerShare}
                          onChange={(e) =>
                            updateShareHolding(index, "issuePricePerShare", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          value={row.amountPaid}
                          onChange={(e) =>
                            updateShareHolding(index, "amountPaid", e.target.value)
                          }
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="button"
                onClick={addShareHoldingRow}
                className="px-4 py-2 bg-violet-500 text-white rounded text-sm hover:bg-violet-600 transition"
              >
                + Add Row
              </button>
            </div>
          </div>

          {/* Part B: Details of equity share application */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-violet-600">
            <h2 className="text-lg font-bold text-violet-900 mb-6">
              Details of equity share application money pending allotment at the end of the previous year
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-violet-200 border-b-2 border-violet-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">Name of Applicant</th>
                    <th className="border px-2 py-2 text-left font-semibold">Residential Status in India</th>
                    <th className="border px-2 py-2 text-left font-semibold">Type of Shares</th>
                    <th className="border px-2 py-2 text-left font-semibold">PAN</th>
                    <th className="border px-2 py-2 text-left font-semibold">Date of Application</th>
                    <th className="border px-2 py-2 text-right font-semibold">Number of Shares</th>
                    <th className="border px-2 py-2 text-right font-semibold">Application Money Per Share</th>
                    <th className="border px-2 py-2 text-right font-semibold">Face Value Per Share</th>
                    <th className="border px-2 py-2 text-right font-semibold">Proposed Issue Price</th>
                  </tr>
                </thead>
                <tbody>
                  {equityShareApplicationDetails.map((row, index) => (
                    <tr key={index} className="hover:bg-violet-50">
                      <td className="border px-2 py-2">
                        <span className="text-xs">{row.slNo}</span>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select className="w-24 px-1 py-1 border border-violet-200 rounded text-xs">
                          <option value="">Select</option>
                          <option value="Resident">Resident</option>
                          <option value="Non-Resident">Non-Resident</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="Type"
                          className="w-16 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="PAN"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="date"
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Part C: Shareholders who is not a shareholder */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-violet-600">
            <h2 className="text-lg font-bold text-violet-900 mb-6">
              Details of shareholders who is not a shareholder at the end of the previous year but was a shareholder at any time during the previous year
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse bg-white">
                <thead>
                  <tr className="bg-violet-200 border-b-2 border-violet-400">
                    <th className="border px-2 py-2 text-left font-semibold">S.No.</th>
                    <th className="border px-2 py-2 text-left font-semibold">Name of Shareholder</th>
                    <th className="border px-2 py-2 text-left font-semibold">Residential Status</th>
                    <th className="border px-2 py-2 text-left font-semibold">Type of Shares/PAN</th>
                    <th className="border px-2 py-2 text-left font-semibold">Number of Shares Held</th>
                    <th className="border px-2 py-2 text-right font-semibold">Date of Acquisition</th>
                    <th className="border px-2 py-2 text-right font-semibold">Date on which ceased</th>
                    <th className="border px-2 py-2 text-left font-semibold">Mode of Transfer</th>
                    <th className="border px-2 py-2 text-left font-semibold">In case of transfer PAN</th>
                  </tr>
                </thead>
                <tbody>
                  {shareholderNotShareDetails.map((row, index) => (
                    <tr key={index} className="hover:bg-violet-50">
                      <td className="border px-2 py-2">
                        <span className="text-xs">{row.slNo}</span>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select className="w-24 px-1 py-1 border border-violet-200 rounded text-xs">
                          <option value="">Select</option>
                          <option value="Resident">Resident</option>
                          <option value="Non-Resident">Non-Resident</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="Type/PAN"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="0"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-right text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="date"
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="date"
                          className="w-24 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2">
                        <select className="w-24 px-1 py-1 border border-violet-200 rounded text-xs">
                          <option value="">Select</option>
                          <option value="Sale">Sale</option>
                          <option value="Gift">Gift</option>
                          <option value="Transfer">Transfer</option>
                        </select>
                      </td>
                      <td className="border px-2 py-2">
                        <input
                          type="text"
                          placeholder="PAN"
                          className="w-20 px-1 py-1 border border-violet-200 rounded text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default ItrFiveScheduleSH;
