import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface FundSource {
  description: string;
  amount: string;
}

export interface ApplicationOfFunds {
  category: string;
  amount: string;
}

export interface CurrentAsset {
  description: string;
  amount: string;
}

export interface CashAndBank {
  description: string;
  amount: string;
}

export interface Liability {
  description: string;
  amount: string;
}

export interface ItrFiveScheduleBSFormData {
  fundSources?: FundSource[];
  applicationsOfFunds?: ApplicationOfFunds[];
  currentAssets?: CurrentAsset[];
  cashAndBanks?: CashAndBank[];
  liabilities?: Liability[];
  netCurrentAssets?: string;
  accountBalance?: string;
  totalApplicationFunds?: string;
}

// Zod validation schema
const fundSourceSchema = z.object({
  description: z.string().optional(),
  amount: z.string().optional(),
});

const applicationSchema = z.object({
  category: z.string().optional(),
  amount: z.string().optional(),
});

const assetSchema = z.object({
  description: z.string().optional(),
  amount: z.string().optional(),
});

const itrFiveScheduleBSSchema = z.object({
  fundSources: z.array(fundSourceSchema).optional(),
  applicationsOfFunds: z.array(applicationSchema).optional(),
  currentAssets: z.array(assetSchema).optional(),
  cashAndBanks: z.array(assetSchema).optional(),
  liabilities: z.array(assetSchema).optional(),
  netCurrentAssets: z.string().optional(),
  accountBalance: z.string().optional(),
  totalApplicationFunds: z.string().optional(),
});

type ItrFiveScheduleBSFormType = z.infer<typeof itrFiveScheduleBSSchema>;

interface ItrFiveScheduleBSProps {
  initialData?: ItrFiveScheduleBSFormData;
  onSave: (data: ItrFiveScheduleBSFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleBS: React.FC<ItrFiveScheduleBSProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleBSFormType>({
    resolver: zodResolver(itrFiveScheduleBSSchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [fundSources, setFundSources] = useState<FundSource[]>(
    initialData?.fundSources || [
      {
        description: "Open Funds",
        amount: "",
      },
      {
        description: "Corpus out of the donations received for renovation or repair of places notified u/s RGC(21D) on or after 01.04.2020",
        amount: "",
      },
      {
        description: "Other corpus received on or after 01.04.2021",
        amount: "",
      },
      {
        description: "Corpus other than (a) and (b)",
        amount: "",
      },
      {
        description: "Income accumulated under third proviso to clause (23C) of section 10 or section 11(2)",
        amount: "",
      },
      {
        description: "Balance Amount of deemed Income being exemption claimed in earlier years on account of deemed application and expended in FY 2025-26 onwards",
        amount: "",
      },
    ]
  );

  const [applicationsOfFunds, setApplicationsOfFunds] = useState<ApplicationOfFunds[]>(
    initialData?.applicationsOfFunds || [
      {
        category: "Fixed assets",
        amount: "",
      },
      {
        category: "Gross Fixed Assets",
        amount: "",
      },
      {
        category: "Depreciation",
        amount: "",
      },
      {
        category: "Net Fixed Assets (1+3+1b)",
        amount: "",
      },
      {
        category: "Investments",
        amount: "",
      },
    ]
  );

  const [currentAssets, setCurrentAssets] = useState<CurrentAsset[]>(
    initialData?.currentAssets || [
      {
        description: "Investments",
        amount: "",
      },
      {
        description: "Sundry Debtors",
        amount: "",
      },
      {
        description: "Cash and bank balances",
        amount: "",
      },
    ]
  );

  const [cashAndBanks, setCashAndBanks] = useState<CashAndBank[]>(
    initialData?.cashAndBanks || [
      {
        description: "Balance with banks",
        amount: "",
      },
      {
        description: "Cash-in-hand",
        amount: "",
      },
      {
        description: "Others",
        amount: "",
      },
    ]
  );

  const [liabilities, setLiabilities] = useState<Liability[]>(
    initialData?.liabilities || [
      {
        description: "Sundry Creditors",
        amount: "",
      },
      {
        description: "Other payables",
        amount: "",
      },
    ]
  );

  const [netCurrentAssets, setNetCurrentAssets] = useState(
    initialData?.netCurrentAssets || ""
  );
  const [accountBalance, setAccountBalance] = useState(
    initialData?.accountBalance || ""
  );
  const [totalApplicationFunds, setTotalApplicationFunds] = useState(
    initialData?.totalApplicationFunds || ""
  );

  const onSubmit = (data: ItrFiveScheduleBSFormType) => {
    onSave({
      fundSources,
      applicationsOfFunds,
      currentAssets,
      cashAndBanks,
      liabilities,
      netCurrentAssets,
      accountBalance,
      totalApplicationFunds,
    });
  };

  const updateFundSource = (idx: number, field: keyof FundSource, value: string) => {
    const updated = [...fundSources];
    updated[idx][field] = value;
    setFundSources(updated);
  };

  const updateApplication = (idx: number, field: keyof ApplicationOfFunds, value: string) => {
    const updated = [...applicationsOfFunds];
    updated[idx][field] = value;
    setApplicationsOfFunds(updated);
  };

  const updateCurrentAsset = (idx: number, field: keyof CurrentAsset, value: string) => {
    const updated = [...currentAssets];
    updated[idx][field] = value;
    setCurrentAssets(updated);
  };

  const updateCashAndBank = (idx: number, field: keyof CashAndBank, value: string) => {
    const updated = [...cashAndBanks];
    updated[idx][field] = value;
    setCashAndBanks(updated);
  };

  const updateLiability = (idx: number, field: keyof Liability, value: string) => {
    const updated = [...liabilities];
    updated[idx][field] = value;
    setLiabilities(updated);
  };

  const calculateFundSourcesTotal = (): string => {
    const total = fundSources.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const calculateApplicationsTotal = (): string => {
    const total = applicationsOfFunds.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const calculateCashAndBanksTotal = (): string => {
    const total = cashAndBanks.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const calculateCurrentAssetsTotal = (): string => {
    const total = currentAssets.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    const cashBanksTotal = cashAndBanks.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    return (total + cashBanksTotal).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  const calculateLiabilitiesTotal = (): string => {
    const total = liabilities.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);
    return total.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-900 mb-2">
            Part A-BS - Consolidated Balance Sheet
          </h1>
          <p className="text-cyan-700">
            As on 31st Day of March, 2025
          </p>
          <p className="text-xs text-cyan-600 mt-2">
            (Figures in Rupees)
          </p>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Sources of Funds */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              A. Sources of Funds
            </h2>

            <div className="space-y-3 mb-4">
              {fundSources.map((source, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {source.description}
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={source.amount}
                      onChange={(e) => updateFundSource(idx, "amount", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-cyan-300 rounded-lg text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-cyan-300 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div>
                  <label className="text-sm text-cyan-900">Total fund (a+b+c+d+e+f)</label>
                </div>
                <div className="text-right text-cyan-900">
                  {calculateFundSourcesTotal()}
                </div>
              </div>
            </div>
          </div>

          {/* Application of Funds */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              B. Application of Funds
            </h2>

            <div className="space-y-3 mb-4">
              {applicationsOfFunds.map((app, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {app.category}
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={app.amount}
                      onChange={(e) => updateApplication(idx, "amount", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-blue-300 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div>
                  <label className="text-sm text-cyan-900">Total application of funds (1+2+3+4)</label>
                </div>
                <div className="text-right text-cyan-900">
                  {calculateApplicationsTotal()}
                </div>
              </div>
            </div>
          </div>

          {/* Current Assets, Loans and Advances */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              C. Current Assets, Loans and Advances
            </h2>

            <h3 className="text-lg font-semibold text-teal-800 mb-3">i) Current Assets</h3>
            <div className="space-y-3 mb-6">
              {currentAssets.map((asset, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {asset.description}
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={asset.amount}
                      onChange={(e) => updateCurrentAsset(idx, "amount", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-teal-800 mb-3">iii) Cash and Bank Balances</h3>
            <div className="space-y-3 mb-6">
              {cashAndBanks.map((cb, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {cb.description}
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={cb.amount}
                      onChange={(e) => updateCashAndBank(idx, "amount", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-teal-300 rounded-lg text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-teal-300 pt-3 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div>
                  <label className="text-sm text-cyan-900">Total Cash and Cash Equivalents (IIA + IIB + IIC)</label>
                </div>
                <div className="text-right text-cyan-900">
                  {calculateCashAndBanksTotal()}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-teal-800 mb-3">iv) Total Current Assets (i + ii + iii + iv)</h3>
            <div className="border-t-2 border-teal-300 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div>
                  <label className="text-sm text-cyan-900">Total Current Assets</label>
                </div>
                <div className="text-right text-cyan-900">
                  {calculateCurrentAssetsTotal()}
                </div>
              </div>
            </div>
          </div>

          {/* Current Liabilities and Provisions */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              D. Current Liabilities and Provisions
            </h2>

            <h3 className="text-lg font-semibold text-red-800 mb-3">i) Current Liabilities</h3>
            <div className="space-y-3 mb-6">
              {liabilities.map((liability, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {liability.description}
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={liability.amount}
                      onChange={(e) => updateLiability(idx, "amount", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-red-300 rounded-lg text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-red-300 pt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div>
                  <label className="text-sm text-cyan-900">Total Current Liabilities (A + B)</label>
                </div>
                <div className="text-right text-cyan-900">
                  {calculateLiabilitiesTotal()}
                </div>
              </div>
            </div>

            <div className="border-t-2 border-red-300 pt-3 mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div>
                  <label className="text-sm text-cyan-900">Net Current Assets (iv - (A + B))</label>
                </div>
                <div>
                  <input
                    type="text"
                    value={netCurrentAssets}
                    onChange={(e) => setNetCurrentAssets(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-red-300 rounded-lg text-right font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-600">
            <h2 className="text-xl font-bold text-cyan-900 mb-4">
              Summary
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Account Balance: Any other reserve (deficit)
                </label>
                <input
                  type="text"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-right"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Total, application of funds (1+2+3+4+5)
                </label>
                <input
                  type="text"
                  value={totalApplicationFunds}
                  onChange={(e) => setTotalApplicationFunds(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg text-right"
                />
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
              className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleBS;
