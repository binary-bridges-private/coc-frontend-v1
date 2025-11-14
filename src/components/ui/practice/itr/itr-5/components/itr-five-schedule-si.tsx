import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Type definitions
export interface SpecialRateIncomeDetail {
  slNo: string;
  section: string;
  description: string;
  checkbox: boolean;
  specialRate: string;
  income: string;
  taxThroughRate: string;
}

export interface ItrFiveScheduleSIFormData {
  specialRateIncomeDetails?: SpecialRateIncomeDetail[];
  stcgSharesSpecialRate?: string;
  stcgSharesTaxRate?: string;
  ltcgIndexedUnits?: string;
  ltcgIndexedRate?: string;
  ltcgOther?: string;
  ltcgOtherRate?: string;
  isadLtcgRate?: string;
  isadLtcgIncome?: string;
  equitySharesRate?: string;
  equitySharesIncome?: string;
  businessTrustRate?: string;
  businessTrustIncome?: string;
  virtualDigitalAssetRate?: string;
  virtualDigitalAssetIncome?: string;
  lotteryWinningsRate?: string;
  lotteryWinningsIncome?: string;
  horseRacingRate?: string;
  horseRacingIncome?: string;
  otherSpecialRate?: string;
  otherSpecialIncome?: string;
  totalIncome?: string;
}

// Zod validation schema
const specialRateIncomeSchema = z.object({
  slNo: z.string().optional(),
  section: z.string().optional(),
  description: z.string().optional(),
  checkbox: z.boolean().optional(),
  specialRate: z.string().optional(),
  income: z.string().optional(),
  taxThroughRate: z.string().optional(),
});

const itrFiveScheduleSISchema = z.object({
  specialRateIncomeDetails: z.array(specialRateIncomeSchema).optional(),
  stcgSharesSpecialRate: z.string().optional(),
  stcgSharesTaxRate: z.string().optional(),
  ltcgIndexedUnits: z.string().optional(),
  ltcgIndexedRate: z.string().optional(),
  ltcgOther: z.string().optional(),
  ltcgOtherRate: z.string().optional(),
  isadLtcgRate: z.string().optional(),
  isadLtcgIncome: z.string().optional(),
  equitySharesRate: z.string().optional(),
  equitySharesIncome: z.string().optional(),
  businessTrustRate: z.string().optional(),
  businessTrustIncome: z.string().optional(),
  virtualDigitalAssetRate: z.string().optional(),
  virtualDigitalAssetIncome: z.string().optional(),
  lotteryWinningsRate: z.string().optional(),
  lotteryWinningsIncome: z.string().optional(),
  horseRacingRate: z.string().optional(),
  horseRacingIncome: z.string().optional(),
  otherSpecialRate: z.string().optional(),
  otherSpecialIncome: z.string().optional(),
  totalIncome: z.string().optional(),
});

type ItrFiveScheduleSIFormType = z.infer<typeof itrFiveScheduleSISchema>;

interface ItrFiveScheduleSIProps {
  initialData?: ItrFiveScheduleSIFormData;
  onSave: (data: ItrFiveScheduleSIFormData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ItrFiveScheduleSI: React.FC<ItrFiveScheduleSIProps> = ({
  initialData,
  onSave,
  onNext,
  onBack,
}) => {
  const {
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm<ItrFiveScheduleSIFormType>({
    resolver: zodResolver(itrFiveScheduleSISchema),
    mode: "onChange",
    defaultValues: initialData || {},
  });

  React.useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const [stcgSharesSpecialRate, setStcgSharesSpecialRate] = useState(
    initialData?.stcgSharesSpecialRate || ""
  );
  const [stcgSharesTaxRate, setStcgSharesTaxRate] = useState(
    initialData?.stcgSharesTaxRate || "15"
  );

  const [ltcgIndexedUnits, setLtcgIndexedUnits] = useState(
    initialData?.ltcgIndexedUnits || ""
  );
  const [ltcgIndexedRate, setLtcgIndexedRate] = useState(
    initialData?.ltcgIndexedRate || "20"
  );

  const [ltcgOther, setLtcgOther] = useState(initialData?.ltcgOther || "");
  const [ltcgOtherRate, setLtcgOtherRate] = useState(
    initialData?.ltcgOtherRate || "20"
  );

  const [isadLtcgRate, setIsadLtcgRate] = useState(
    initialData?.isadLtcgRate || "10"
  );
  const [isadLtcgIncome, setIsadLtcgIncome] = useState(
    initialData?.isadLtcgIncome || ""
  );

  const [equitySharesRate, setEquitySharesRate] = useState(
    initialData?.equitySharesRate || "15"
  );
  const [equitySharesIncome, setEquitySharesIncome] = useState(
    initialData?.equitySharesIncome || ""
  );

  const [businessTrustRate, setBusinessTrustRate] = useState(
    initialData?.businessTrustRate || "30"
  );
  const [businessTrustIncome, setBusinessTrustIncome] = useState(
    initialData?.businessTrustIncome || ""
  );

  const [virtualDigitalAssetRate, setVirtualDigitalAssetRate] = useState(
    initialData?.virtualDigitalAssetRate || "30"
  );
  const [virtualDigitalAssetIncome, setVirtualDigitalAssetIncome] = useState(
    initialData?.virtualDigitalAssetIncome || ""
  );

  const [lotteryWinningsRate, setLotteryWinningsRate] = useState(
    initialData?.lotteryWinningsRate || "30"
  );
  const [lotteryWinningsIncome, setLotteryWinningsIncome] = useState(
    initialData?.lotteryWinningsIncome || ""
  );

  const [horseRacingRate, setHorseRacingRate] = useState(
    initialData?.horseRacingRate || "30"
  );
  const [horseRacingIncome, setHorseRacingIncome] = useState(
    initialData?.horseRacingIncome || ""
  );

  const [otherSpecialRate, setOtherSpecialRate] = useState(
    initialData?.otherSpecialRate || ""
  );
  const [otherSpecialIncome, setOtherSpecialIncome] = useState(
    initialData?.otherSpecialIncome || ""
  );

  const [totalIncome, setTotalIncome] = useState(
    initialData?.totalIncome || ""
  );

  const onSubmit = (data: ItrFiveScheduleSIFormType) => {
    onSave({
      stcgSharesSpecialRate,
      stcgSharesTaxRate,
      ltcgIndexedUnits,
      ltcgIndexedRate,
      ltcgOther,
      ltcgOtherRate,
      isadLtcgRate,
      isadLtcgIncome,
      equitySharesRate,
      equitySharesIncome,
      businessTrustRate,
      businessTrustIncome,
      virtualDigitalAssetRate,
      virtualDigitalAssetIncome,
      lotteryWinningsRate,
      lotteryWinningsIncome,
      horseRacingRate,
      horseRacingIncome,
      otherSpecialRate,
      otherSpecialIncome,
      totalIncome,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-rose-900 mb-2">
            Schedule SI - Income Chargeable to Tax at Special Rates
          </h1>
          <p className="text-rose-700">
            Please provide details of income chargeable to tax at special rates
          </p>
        </div>

        {/* Instructions Panel */}
        <div className="bg-rose-100 border-l-4 border-rose-600 p-4 rounded-lg mb-8">
          <p className="text-sm text-rose-900">
            <strong>Important:</strong> This schedule captures income taxed at special/concessional rates 
            including STCG on shares, LTCG on units/securities, ISAD income, equity shares, business trust, 
            virtual digital assets, lottery winnings, and horse racing income.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section A: STCG on Shares */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-rose-600">
            <h2 className="text-lg font-bold text-rose-900 mb-6">
              Section A: Short-Term Capital Gains (STCG) on Shares
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">1a. 111A (STCG) on shares where STT paid (where transfer was on or before 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={stcgSharesSpecialRate}
                    onChange={(e) => setStcgSharesSpecialRate(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">{stcgSharesTaxRate}%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">1b. 111A (STCG) on shares where STT paid (where transfer was on or after 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={stcgSharesSpecialRate}
                    onChange={(e) => setStcgSharesSpecialRate(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: LTCG */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-rose-600">
            <h2 className="text-lg font-bold text-rose-900 mb-6">
              Section B: Long-Term Capital Gains (LTCG) on Securities
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">2a. 115AD (LTCG for FIIs on securities where STT not paid)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgIndexedUnits}
                    onChange={(e) => setLtcgIndexedUnits(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">30%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">3. Prior to 113(1) (LTCG on listed securities' units with indexation - where transfer before 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgIndexedUnits}
                    onChange={(e) => setLtcgIndexedUnits(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">3i. 113(1) (LTCG on listed securities' units - where transfer on or after 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgOther}
                    onChange={(e) => setLtcgOther(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">12.5%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">4a. 113(1)(c) (LTCG for non-resident on unlisted securities or other than listed debentures - where transfer before 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgIndexedUnits}
                    onChange={(e) => setLtcgIndexedUnits(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">4b. 113(1)(c) (LTCG for non-resident on unlisted securities - where transfer on or after 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgOther}
                    onChange={(e) => setLtcgOther(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">12.5%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">5a. 115AD (LTCG for FII on securities)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={isadLtcgIncome}
                    onChange={(e) => setIsadLtcgIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">5b. 115AD (LTCG for FII on bonds/GDR where transfer on or after 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgOther}
                    onChange={(e) => setLtcgOther(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">12.5%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">6. 115AD (LTCG for FII on units)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgIndexedUnits}
                    onChange={(e) => setLtcgIndexedUnits(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">6i. 115AC (LTCG for non-resident on units referred in section ISAD)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgIndexedUnits}
                    onChange={(e) => setLtcgIndexedUnits(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">10%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">6ii. 115AC (LTCG for non-resident on units referred in ISAD - where transfer before 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ltcgIndexedUnits}
                    onChange={(e) => setLtcgIndexedUnits(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">7. 115AD (LTCG for FII on securities)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={isadLtcgIncome}
                    onChange={(e) => setIsadLtcgIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">10%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">8a. 112 (LTCG on shares - where transfer before 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={equitySharesIncome}
                    onChange={(e) => setEquitySharesIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">8b. 112 (LTCG on shares - where transfer on or after 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={equitySharesIncome}
                    onChange={(e) => setEquitySharesIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">12.5%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">8c. 112 (LTCG on equity-oriented mutual fund - where transfer before 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={equitySharesIncome}
                    onChange={(e) => setEquitySharesIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">20%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">8d. 112 (LTCG on equity-oriented fund-units of business trust on which STT is paid - where transfer on or after 23rd July 2024)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={businessTrustIncome}
                    onChange={(e) => setBusinessTrustIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">12.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Other Special Rate Income */}
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-rose-600">
            <h2 className="text-lg font-bold text-rose-900 mb-6">
              Section C: Other Income at Special Rates
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">9. STCG chargeable at special rates in India as per DTAA</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <input
                    type="text"
                    value={otherSpecialRate}
                    onChange={(e) => setOtherSpecialRate(e.target.value)}
                    placeholder="Rate %"
                    className="w-16 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">10. LTCG chargeable at special rates in India as per DTAA</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <input
                    type="text"
                    value={otherSpecialRate}
                    onChange={(e) => setOtherSpecialRate(e.target.value)}
                    placeholder="Rate %"
                    className="w-16 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">11. 115BBH (Income by way interest received by non-resident from bonds or GDR purchased in foreign currency)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">10%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">12. 115BBH (Income by way of dividend received by non-resident from bonds or GDR purchased in foreign currency)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">10%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">13. 115BBH (Income by way of Dividend received by non-resident from bonds or GDR purchased in foreign currency)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">10%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">14. 115BBH (Winnings from lotteries, puzzles, races, games and other similar contests)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lotteryWinningsIncome}
                    onChange={(e) => setLotteryWinningsIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">30%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">15. 115BBH (Winnings from online games)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lotteryWinningsIncome}
                    onChange={(e) => setLotteryWinningsIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">30%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">16. 115BBH (Tax on income from Virtual Digital Asset)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={virtualDigitalAssetIncome}
                    onChange={(e) => setVirtualDigitalAssetIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">30%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">17. 115BBE (Income under head business or profession)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">80%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">18. 115BBE (Income under head Capital Gain)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">80%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">19. 115BBE (Income under section 68, 69, 69A, 69B, 69C or 69D)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <span className="w-16 px-2 py-2 text-center font-semibold">80%</span>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="font-semibold text-rose-800">20. Any other income chargeable at special rates (Please footnote from drop down menu)</span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={otherSpecialIncome}
                    onChange={(e) => setOtherSpecialIncome(e.target.value)}
                    placeholder="0"
                    className="w-24 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                  <input
                    type="text"
                    value={otherSpecialRate}
                    onChange={(e) => setOtherSpecialRate(e.target.value)}
                    placeholder="Rate %"
                    className="w-16 px-2 py-2 border border-rose-200 rounded text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg shadow-lg p-6 border-l-4 border-rose-600">
            <h2 className="text-lg font-bold text-rose-900 mb-6">Summary Total</h2>

            <div className="flex justify-between items-center pt-2 bg-white p-3 rounded border-2 border-rose-300">
              <span className="font-bold text-lg text-rose-900">Total Income Chargeable at Special Rates</span>
              <input
                type="text"
                value={totalIncome}
                onChange={(e) => setTotalIncome(e.target.value)}
                placeholder="0"
                className="w-40 px-3 py-2 border-2 border-rose-600 rounded-lg text-right font-bold"
              />
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
              className="px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition duration-200"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onNext}
              className="px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition duration-200"
            >
              Next →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrFiveScheduleSI;
