import React from "react";
import { useForm } from "react-hook-form";

interface ItrTwoCylaProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const ItrTwoCyla: React.FC<ItrTwoCylaProps> = ({
  onSubmit,
  onBack,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: initialData || {
      // Row 1 - Loss to be set off
      lossToBeSetOff: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 2 - Salaries
      salaries: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 3 - House property
      houseProperty: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 4 - Short-term capital gain taxable @ 15%
      stcg15: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 5 - Short-term capital gain taxable @ 20%
      stcg20: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 6 - Short-term capital gain taxable @ 30%
      stcg30: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 7 - Short-term capital gain taxable at applicable rates
      stcgApplicable: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 8 - Short-term capital gain taxable at special rates in India as per DTAA
      stcgDTAA: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 9 - Long term capital gain taxable @ 10%
      ltcg10: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 10 - Long term capital gain taxable @ 12.5%
      ltcg12_5: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 11 - Long term capital gain taxable @ 20%
      ltcg20: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 12 - Long term capital gains taxable at special rates in India as per DTAA
      ltcgDTAA: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 13 - Net income from other sources chargeable at normal applicable rates
      netIncomeOtherSources: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 14 - Profit from the activity of owning and maintaining race horses
      raceHorses: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 15 - Income from other sources taxable at special rates in India as per DTAA
      otherSourcesDTAA: {
        incomeCurrentYear: 0,
        housePropertyLoss: 0,
        netIncomeOtherSources: 0,
        currentYearRemaining: 0,
      },

      // Row 16 - Total loss set off
      totalLossSetOff: 0,

      // Row 17 - Loss remaining after set-off
      lossRemainingAfterSetOff: 0,
    },
  });

  // Calculate row total (columns 1 - 2 - 3)
  const calculateRowTotal = (rowName: string) => {
    const incomeCurrentYear = Number(watch(`${rowName}.incomeCurrentYear`)) || 0;
    const housePropertyLoss = Number(watch(`${rowName}.housePropertyLoss`)) || 0;
    const netIncomeOtherSources = Number(watch(`${rowName}.netIncomeOtherSources`)) || 0;
    
    const remaining = incomeCurrentYear - housePropertyLoss - netIncomeOtherSources;
    setValue(`${rowName}.currentYearRemaining`, remaining);
    return remaining;
  };

  // Calculate total loss set off (sum of all rows ii to xiii)
  const calculateTotalLossSetOff = () => {
    const rows = [
      'salaries',
      'houseProperty',
      'stcg15',
      'stcg20',
      'stcg30',
      'stcgApplicable',
      'stcgDTAA',
      'ltcg10',
      'ltcg12_5',
      'ltcg20',
      'ltcgDTAA',
      'netIncomeOtherSources',
      'raceHorses',
      'otherSourcesDTAA',
    ];

    let totalCol2 = 0;
    let totalCol3 = 0;

    rows.forEach(row => {
      totalCol2 += Number(watch(`${row}.housePropertyLoss`)) || 0;
      totalCol3 += Number(watch(`${row}.netIncomeOtherSources`)) || 0;
    });

    const total = totalCol2 + totalCol3;
    setValue('totalLossSetOff', total);
    return total;
  };

  // Calculate loss remaining after set-off
  const calculateLossRemaining = () => {
    const lossToBeSetOff = Number(watch('lossToBeSetOff.incomeCurrentYear')) || 0;
    const totalLossSetOff = Number(watch('totalLossSetOff')) || 0;
    
    const remaining = lossToBeSetOff - totalLossSetOff;
    setValue('lossRemainingAfterSetOff', remaining);
    return remaining;
  };

  // Calculate all
  const calculateAll = () => {
    const rows = [
      'lossToBeSetOff',
      'salaries',
      'houseProperty',
      'stcg15',
      'stcg20',
      'stcg30',
      'stcgApplicable',
      'stcgDTAA',
      'ltcg10',
      'ltcg12_5',
      'ltcg20',
      'ltcgDTAA',
      'netIncomeOtherSources',
      'raceHorses',
      'otherSourcesDTAA',
    ];

    rows.forEach(row => calculateRowTotal(row));
    calculateTotalLossSetOff();
    calculateLossRemaining();
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Schedule CYLA - Details of Income after Set off of Current Year Losses
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Current Year Loss Adjustment - Set-off of losses against income heads
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
        </div>

        {/* Information Banner */}
        <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="h-6 w-6 flex-shrink-0 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1 text-sm text-gray-700">
              <p className="font-semibold">Important Notes:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Loss from house property can be set off against any other head of income</li>
                <li>Net loss from other sources (other than race horses & DTAA) can be set off against any head except salaries</li>
                <li>Business losses can only be set off against business income</li>
                <li>Capital losses can only be set off against capital gains of same nature (STCG against STCG, LTCG against LTCG)</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Main Table */}
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Sl. No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Head/ Source of Income
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Income of current year (Fill this column only if income is zero or positive)<br/>
                    (1)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    House property loss of the current year set off<br/>
                    (2)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Net loss from Other sources chargeable at normal applicable rates (other than loss from race horses and/or current year set off)<br/>
                    (3)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Current year's Income remaining after set off<br/>
                    (4=1-2-3)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Row i - Loss to be set off */}
                <tr className="bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">i</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    Loss to be set off<br/>
                    <span className="text-xs font-normal text-gray-600">(Fill this row only if computed figure is negative)</span>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('lossToBeSetOff.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-500 italic">(1a of Schedule HP)</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-500 italic">(6 of Schedule OS)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('lossToBeSetOff.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row ii - Salaries */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">ii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Salaries</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('salaries.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(6 of Schedule S)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('salaries.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('salaries.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('salaries.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row iii - House property */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">iii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">House property</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('houseProperty.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(3 of Schedule HP)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('houseProperty.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('houseProperty.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('houseProperty.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row iv-a - Short-term capital gain taxable @ 15% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">iv-a</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable @ 15%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg15.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11a of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg15.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg15.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('stcg15.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row iv-b - Short-term capital gain taxable @ 20% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">iv-b</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable @ 20%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg20.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11b of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg20.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg20.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('stcg20.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row v - Short-term capital gain taxable @ 30% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">v</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable @ 30%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg30.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11c of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg30.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg30.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('stcg30.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row vi - Short-term capital gain taxable at applicable rates */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">vi</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable at applicable rates</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgApplicable.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11d of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgApplicable.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgApplicable.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('stcgApplicable.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row vii - Short-term capital gain taxable at special rates in India as per DTAA */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">vii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable at special rates in India as per DTAA</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgDTAA.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11e of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgDTAA.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgDTAA.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('stcgDTAA.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row viii-a - Long term capital gain taxable @ 10% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">viii-a</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Long term capital gain taxable @ 10%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg10.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11via of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg10.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg10.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('ltcg10.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row viii-b - Long term capital gain taxable @ 12.5% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">viii-b</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Long term capital gain taxable @ 12.5%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg12_5.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11vib of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg12_5.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg12_5.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('ltcg12_5.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row ix - Long term capital gain taxable @ 20% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">ix</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Long term capital gain taxable @ 20%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg20.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11vii of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg20.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg20.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('ltcg20.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row x - Long term capital gains taxable at special rates in India as per DTAA */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">x</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Long term capital gains taxable at special rates in India as per DTAA</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcgDTAA.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(11viii of item E of Schedule CG)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcgDTAA.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcgDTAA.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('ltcgDTAA.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row xi - Net income from other sources chargeable at normal applicable rates */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">xi</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Net income from other sources chargeable at normal applicable rates</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('netIncomeOtherSources.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(6 of Schedule OS)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('netIncomeOtherSources.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('netIncomeOtherSources.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('netIncomeOtherSources.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row xii - Profit from the activity of owning and maintaining race horses */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">xii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Profit from the activity of owning and maintaining race horses</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('raceHorses.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(8e of Schedule OS)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('raceHorses.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('raceHorses.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('raceHorses.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row xiii - Income from other sources taxable at special rates in India as per DTAA */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">xiii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Income from other sources taxable at special rates in India as per DTAA</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('otherSourcesDTAA.incomeCurrentYear')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(2f of Schedule OS)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('otherSourcesDTAA.housePropertyLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('otherSourcesDTAA.netIncomeOtherSources')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('otherSourcesDTAA.currentYearRemaining')}
                      className="w-full rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-900"
                    />
                  </td>
                </tr>

                {/* Row xiv - Total loss set off */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-900">xiv</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    Total loss set off (ii + iii + iv + v + vi + vii + viii + viiia + viiib + ix + x + xi + xii + xiii)
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3" colSpan={2}>
                    <input
                      type="number"
                      readOnly
                      {...register('totalLossSetOff')}
                      className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>

                {/* Row xv - Loss remaining after set-off */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-900">xv</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    Loss remaining after set-off (i – xiv)
                  </td>
                  <td className="px-4 py-3" colSpan={4}>
                    <input
                      type="number"
                      readOnly
                      {...register('lossRemainingAfterSetOff')}
                      className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-base font-bold text-gray-900"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Calculate All Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={calculateAll}
              className="rounded-lg border border-gray-900 bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Calculate All Totals
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItrTwoCyla;
