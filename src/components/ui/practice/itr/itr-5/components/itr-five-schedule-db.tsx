import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions for Funds and Investments section
export interface FundDetails {
  corpusOpeningBalance: string;
  corpusDonation: string;
  corpusReceivedDuringYear: string;
  corpusTreatedDuringYear: string;
  amountBackIntoCorpus: string;
  corpusClosingBalance: string;
  capitalInvested: string;
  capitalAppliedWhile: string;
  capitalInvestedInMode: string;
  investedInSpecific: string;
  investmentAmount: string;
  investedInOtherMode: string;
  investedInOtherModeAmount: string;
}

export interface LoanDetails {
  openingBalance: string;
  loanTaken: string;
  appliedForObjectives: string;
  repaymentDuringYear: string;
  financialYearApplied: string;
  totalRepaymentDuring: string;
  closingBalance: string;
}

export interface CorpusInvestmentDetails {
  slNo: string;
  investmentOutOf: string;
  modeOfInvestment: string;
  amountOfInvestment: string;
}

export interface PropertyDetails {
  slNo: string;
  nameAddress: string;
  isConcern: string;
  numberOfShares: string;
  classOfShares: string;
  nominalValue: string;
  incomeInvestment: string;
  isAmountInExcess: string;
}

export interface VoluntaryDetails {
  slNo: string;
  nameAddress: string;
  valueOfDonation: string;
  valueOfApplied: string;
  amountInvested: string;
  balanceTreated: string;
}

export interface ItrFiveScheduleDBFormData {
  fundDetails?: FundDetails;
  loanDetails?: LoanDetails;
  corpusInvestments?: CorpusInvestmentDetails[];
  propertyDetails?: PropertyDetails[];
  voluntaryDetails?: VoluntaryDetails[];
}

// Zod validation schema
const fundDetailsSchema = z.object({
  corpusOpeningBalance: z.string().optional(),
  corpusDonation: z.string().optional(),
  corpusReceivedDuringYear: z.string().optional(),
  corpusTreatedDuringYear: z.string().optional(),
  amountBackIntoCorpus: z.string().optional(),
  corpusClosingBalance: z.string().optional(),
  capitalInvested: z.string().optional(),
  capitalAppliedWhile: z.string().optional(),
  capitalInvestedInMode: z.string().optional(),
  investedInSpecific: z.string().optional(),
  investmentAmount: z.string().optional(),
  investedInOtherMode: z.string().optional(),
  investedInOtherModeAmount: z.string().optional(),
});

const loanDetailsSchema = z.object({
  openingBalance: z.string().optional(),
  loanTaken: z.string().optional(),
  appliedForObjectives: z.string().optional(),
  repaymentDuringYear: z.string().optional(),
  financialYearApplied: z.string().optional(),
  totalRepaymentDuring: z.string().optional(),
  closingBalance: z.string().optional(),
});

const corpusInvestmentSchema = z.object({
  slNo: z.string().optional(),
  investmentOutOf: z.string().optional(),
  modeOfInvestment: z.string().optional(),
  amountOfInvestment: z.string().optional(),
});

const propertyDetailsSchema = z.object({
  slNo: z.string().optional(),
  nameAddress: z.string().optional(),
  isConcern: z.string().optional(),
  numberOfShares: z.string().optional(),
  classOfShares: z.string().optional(),
  nominalValue: z.string().optional(),
  incomeInvestment: z.string().optional(),
  isAmountInExcess: z.string().optional(),
});

const voluntaryDetailsSchema = z.object({
  slNo: z.string().optional(),
  nameAddress: z.string().optional(),
  valueOfDonation: z.string().optional(),
  valueOfApplied: z.string().optional(),
  amountInvested: z.string().optional(),
  balanceTreated: z.string().optional(),
});

const itrFiveScheduleDBSchema = z.object({
  fundDetails: fundDetailsSchema.optional(),
  loanDetails: loanDetailsSchema.optional(),
  corpusInvestments: z.array(corpusInvestmentSchema).optional(),
  propertyDetails: z.array(propertyDetailsSchema).optional(),
  voluntaryDetails: z.array(voluntaryDetailsSchema).optional(),
});

type ItrFiveScheduleDBFormType = z.infer<typeof itrFiveScheduleDBSchema>;

interface ItrFiveScheduleDBProps {
  initialData?: ItrFiveScheduleDBFormData;
  onSave: (data: ItrFiveScheduleDBFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleDB: React.FC<ItrFiveScheduleDBProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleDBFormType>({
    resolver: zodResolver(itrFiveScheduleDBSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [fundDetails, setFundDetails] = useState<FundDetails>(
    initialData?.fundDetails || {
      corpusOpeningBalance: "",
      corpusDonation: "",
      corpusReceivedDuringYear: "",
      corpusTreatedDuringYear: "",
      amountBackIntoCorpus: "",
      corpusClosingBalance: "",
      capitalInvested: "",
      capitalAppliedWhile: "",
      capitalInvestedInMode: "",
      investedInSpecific: "",
      investmentAmount: "",
      investedInOtherMode: "",
      investedInOtherModeAmount: "",
    }
  );

  const [loanDetails, setLoanDetails] = useState<LoanDetails>(
    initialData?.loanDetails || {
      openingBalance: "",
      loanTaken: "",
      appliedForObjectives: "",
      repaymentDuringYear: "",
      financialYearApplied: "",
      totalRepaymentDuring: "",
      closingBalance: "",
    }
  );

  const [corpusInvestments, setCorpusInvestments] = useState<CorpusInvestmentDetails[]>(
    initialData?.corpusInvestments || [
      {
        slNo: "I",
        investmentOutOf: "Corpus representing donation for renovation or repair of places notified as RGC (21D) as on or after 01.04.2020",
        modeOfInvestment: "Dropdown to be provided (Please specify the nature)",
        amountOfInvestment: "",
      },
      {
        slNo: "II",
        investmentOutOf: "Corpus other than (i) above received on or after 01.04.2021",
        modeOfInvestment: "",
        amountOfInvestment: "",
      },
      {
        slNo: "III",
        investmentOutOf: "Other than (i) and (ii) above",
        modeOfInvestment: "",
        amountOfInvestment: "",
      },
      {
        slNo: "IV",
        investmentOutOf: "TOTAL",
        modeOfInvestment: "",
        amountOfInvestment: "",
      },
    ]
  );

  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails[]>(
    initialData?.propertyDetails || [
      {
        slNo: "I",
        nameAddress: "",
        isConcern: "",
        numberOfShares: "",
        classOfShares: "",
        nominalValue: "",
        incomeInvestment: "",
        isAmountInExcess: "",
      },
    ]
  );

  const [voluntaryDetails, setVoluntaryDetails] = useState<VoluntaryDetails[]>(
    initialData?.voluntaryDetails || [
      {
        slNo: "I",
        nameAddress: "",
        valueOfDonation: "",
        valueOfApplied: "",
        amountInvested: "",
        balanceTreated: "",
      },
    ]
  );

  const onSubmit = (data: ItrFiveScheduleDBFormType) => {
    onSave({
      fundDetails,
      loanDetails,
      corpusInvestments,
      propertyDetails,
      voluntaryDetails,
    });
  };

  const updateFundDetails = (field: keyof FundDetails, value: string) => {
    setFundDetails((prev) => ({ ...prev, [field]: value }));
  };

  const updateLoanDetails = (field: keyof LoanDetails, value: string) => {
    setLoanDetails((prev) => ({ ...prev, [field]: value }));
  };

  const updateCorpusInvestment = (
    idx: number,
    field: keyof CorpusInvestmentDetails,
    value: string
  ) => {
    const updated = [...corpusInvestments];
    updated[idx][field] = value;
    setCorpusInvestments(updated);
  };

  const addPropertyDetail = () => {
    const newSlNo = String.fromCharCode(65 + propertyDetails.length);
    setPropertyDetails([
      ...propertyDetails,
      {
        slNo: newSlNo,
        nameAddress: "",
        isConcern: "",
        numberOfShares: "",
        classOfShares: "",
        nominalValue: "",
        incomeInvestment: "",
        isAmountInExcess: "",
      },
    ]);
  };

  const removePropertyDetail = (idx: number) => {
    setPropertyDetails(propertyDetails.filter((_, i) => i !== idx));
  };

  const updatePropertyDetail = (
    idx: number,
    field: keyof PropertyDetails,
    value: string
  ) => {
    const updated = [...propertyDetails];
    updated[idx][field] = value;
    setPropertyDetails(updated);
  };

  const addVoluntaryDetail = () => {
    const newSlNo = String.fromCharCode(65 + voluntaryDetails.length);
    setVoluntaryDetails([
      ...voluntaryDetails,
      {
        slNo: newSlNo,
        nameAddress: "",
        valueOfDonation: "",
        valueOfApplied: "",
        amountInvested: "",
        balanceTreated: "",
      },
    ]);
  };

  const removeVoluntaryDetail = (idx: number) => {
    setVoluntaryDetails(voluntaryDetails.filter((_, i) => i !== idx));
  };

  const updateVoluntaryDetail = (
    idx: number,
    field: keyof VoluntaryDetails,
    value: string
  ) => {
    const updated = [...voluntaryDetails];
    updated[idx][field] = value;
    setVoluntaryDetails(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Schedule DB - Funds and Investments
          </h1>
          <p className="text-slate-700">
            Statement showing the funds and investments as on the last day of the previous year for filling by assessees
          </p>
          <p className="text-xs text-slate-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section A: Details of Corpus */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-slate-600">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              A. Details of Corpus
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Opening Balance (01.04.2024)
                </label>
                <input
                  type="text"
                  value={fundDetails.corpusOpeningBalance}
                  onChange={(e) =>
                    updateFundDetails("corpusOpeningBalance", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Donation in (2024)
                </label>
                <input
                  type="text"
                  value={fundDetails.corpusDonation}
                  onChange={(e) =>
                    updateFundDetails("corpusDonation", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Received during the year
                </label>
                <input
                  type="text"
                  value={fundDetails.corpusReceivedDuringYear}
                  onChange={(e) =>
                    updateFundDetails("corpusReceivedDuringYear", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Treated during the year
                </label>
                <input
                  type="text"
                  value={fundDetails.corpusTreatedDuringYear}
                  onChange={(e) =>
                    updateFundDetails("corpusTreatedDuringYear", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Amount back into corpus
                </label>
                <input
                  type="text"
                  value={fundDetails.amountBackIntoCorpus}
                  onChange={(e) =>
                    updateFundDetails("amountBackIntoCorpus", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Closing Balance (31.03.2025)
                </label>
                <input
                  type="text"
                  value={fundDetails.corpusClosingBalance}
                  onChange={(e) =>
                    updateFundDetails("corpusClosingBalance", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Capital Invested
                </label>
                <input
                  type="text"
                  value={fundDetails.capitalInvested}
                  onChange={(e) =>
                    updateFundDetails("capitalInvested", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Capital Applied while
                </label>
                <input
                  type="text"
                  value={fundDetails.capitalAppliedWhile}
                  onChange={(e) =>
                    updateFundDetails("capitalAppliedWhile", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Capital Invested in Mode
                </label>
                <input
                  type="text"
                  value={fundDetails.capitalInvestedInMode}
                  onChange={(e) =>
                    updateFundDetails("capitalInvestedInMode", e.target.value)
                  }
                  placeholder="Specify mode"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Invested in Specific Year
                </label>
                <input
                  type="text"
                  value={fundDetails.investedInSpecific}
                  onChange={(e) =>
                    updateFundDetails("investedInSpecific", e.target.value)
                  }
                  placeholder="Year"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Investment Amount
                </label>
                <input
                  type="text"
                  value={fundDetails.investmentAmount}
                  onChange={(e) =>
                    updateFundDetails("investmentAmount", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Invested in Other Mode
                </label>
                <input
                  type="text"
                  value={fundDetails.investedInOtherMode}
                  onChange={(e) =>
                    updateFundDetails("investedInOtherMode", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-right"
                />
              </div>
            </div>
          </div>

          {/* Section A: Details of Loan and Borrowings */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              A. Details of Loan and Borrowings
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-left font-semibold text-gray-800 min-w-24">
                      Opening Balance (01.04.2024)
                    </th>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Loan & Borrowings taken
                    </th>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Applied for objectives
                    </th>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount of repayment
                    </th>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Financial year applied
                    </th>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Total Repayment
                    </th>
                    <th className="border border-gray-300 bg-blue-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Closing Balance (31.03.2025)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.openingBalance}
                        onChange={(e) =>
                          updateLoanDetails("openingBalance", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.loanTaken}
                        onChange={(e) =>
                          updateLoanDetails("loanTaken", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.appliedForObjectives}
                        onChange={(e) =>
                          updateLoanDetails("appliedForObjectives", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.repaymentDuringYear}
                        onChange={(e) =>
                          updateLoanDetails("repaymentDuringYear", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.financialYearApplied}
                        onChange={(e) =>
                          updateLoanDetails("financialYearApplied", e.target.value)
                        }
                        placeholder="F.Y."
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.totalRepaymentDuring}
                        onChange={(e) =>
                          updateLoanDetails("totalRepaymentDuring", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                      />
                    </td>
                    <td className="border border-gray-300 px-3 py-2">
                      <input
                        type="text"
                        value={loanDetails.closingBalance}
                        onChange={(e) =>
                          updateLoanDetails("closingBalance", e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section B: Details of Corpus Investment */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              B. Details of Corpus Investment/Deposits made under section 11(5) as on 31.03.2025
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-green-100">
                  <tr>
                    <th className="border border-gray-300 bg-green-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-16">
                      Sl. No.
                    </th>
                    <th className="border border-gray-300 bg-green-200 px-3 py-2 text-left font-semibold text-gray-800 min-w-48">
                      Investment out of
                    </th>
                    <th className="border border-gray-300 bg-green-200 px-3 py-2 text-left font-semibold text-gray-800 min-w-32">
                      Mode of investment as per section 11(5)
                    </th>
                    <th className="border border-gray-300 bg-green-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount of investment
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {corpusInvestments.map((item, idx) => (
                    <tr key={idx} className="hover:bg-green-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold">
                        {item.slNo}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">
                        {item.investmentOutOf}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.modeOfInvestment}
                          onChange={(e) =>
                            updateCorpusInvestment(idx, "modeOfInvestment", e.target.value)
                          }
                          placeholder="Specify"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.amountOfInvestment}
                          onChange={(e) =>
                            updateCorpusInvestment(idx, "amountOfInvestment", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section C: Property Details */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-600">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              C. Property held at any time during the previous year - Section 13(3) and 21st Proviso of Section 10(23C)
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-purple-100">
                  <tr>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-12">
                      Sl.
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-32">
                      Name & Address
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-24">
                      Is it a company
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-20">
                      # of Shares
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-20">
                      Class
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-20">
                      Nominal Value
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-20">
                      Income Investment
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-left font-semibold text-gray-800 min-w-20">
                      Excess
                    </th>
                    <th className="border border-gray-300 bg-purple-200 px-2 py-2 text-center font-semibold text-gray-800 min-w-12">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {propertyDetails.map((item, idx) => (
                    <tr key={idx} className="hover:bg-purple-50">
                      <td className="border border-gray-300 px-2 py-2 text-center font-semibold text-xs">
                        {item.slNo}
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.nameAddress}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "nameAddress", e.target.value)
                          }
                          placeholder="Name & Address"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <select
                          value={item.isConcern}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "isConcern", e.target.value)
                          }
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.numberOfShares}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "numberOfShares", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-center"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.classOfShares}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "classOfShares", e.target.value)
                          }
                          placeholder="Class"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.nominalValue}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "nominalValue", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <input
                          type="text"
                          value={item.incomeInvestment}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "incomeInvestment", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-2 py-2">
                        <select
                          value={item.isAmountInExcess}
                          onChange={(e) =>
                            updatePropertyDetail(idx, "isAmountInExcess", e.target.value)
                          }
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </td>
                      <td className="border border-gray-300 px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removePropertyDetail(idx)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addPropertyDetail}
              className="mb-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-sm font-semibold"
            >
              + Add Property
            </button>
          </div>

          {/* Section E: Voluntary Contributions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-600">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              E. Voluntary contributions/donations received in kind but not converted into investments in the specified mode us 11(5)
            </h2>

            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-4">
              <table className="w-full border-collapse text-xs md:text-sm">
                <thead className="bg-orange-100">
                  <tr>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-12">
                      Sl.
                    </th>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-left font-semibold text-gray-800 min-w-32">
                      Name and Address of Donor
                    </th>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Value of Donation
                    </th>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Value Applied towards Objective
                    </th>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Amount Invested (Section 11(5))
                    </th>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-24">
                      Balance (Section 11(3))
                    </th>
                    <th className="border border-gray-300 bg-orange-200 px-3 py-2 text-center font-semibold text-gray-800 min-w-12">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voluntaryDetails.map((item, idx) => (
                    <tr key={idx} className="hover:bg-orange-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold text-xs">
                        {item.slNo}
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.nameAddress}
                          onChange={(e) =>
                            updateVoluntaryDetail(idx, "nameAddress", e.target.value)
                          }
                          placeholder="Name & Address"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.valueOfDonation}
                          onChange={(e) =>
                            updateVoluntaryDetail(idx, "valueOfDonation", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.valueOfApplied}
                          onChange={(e) =>
                            updateVoluntaryDetail(idx, "valueOfApplied", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.amountInvested}
                          onChange={(e) =>
                            updateVoluntaryDetail(idx, "amountInvested", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={item.balanceTreated}
                          onChange={(e) =>
                            updateVoluntaryDetail(idx, "balanceTreated", e.target.value)
                          }
                          placeholder="0"
                          className="w-full px-1 py-1 border border-gray-300 rounded text-xs text-right"
                        />
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeVoluntaryDetail(idx)}
                          className="text-red-600 hover:text-red-800 font-bold text-xs"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addVoluntaryDetail}
              className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold"
            >
              + Add Voluntary Contribution
            </button>
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

export default ItrFiveScheduleDB;
