import React from "react";
import { useForm } from "react-hook-form";

interface ItrTwoBflaProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  initialData?: any;
}

const ItrTwoBfla: React.FC<ItrTwoBflaProps> = ({
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
      // Row 1 - Salaries
      salaries: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 2 - House property
      houseProperty: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 3 - Short-term capital gain taxable @ 15%
      stcg15: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 4 - Short-term capital gain taxable @ 20%
      stcg20: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 5 - Short-term capital gain taxable @ 30%
      stcg30: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 6 - Short-term capital gain taxable at applicable rates
      stcgApplicable: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 7 - Short-term capital gain taxable at special rates in India as per DTAA
      stcgDTAA: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 8 - Long-term capital gain taxable @ 10%
      ltcg10: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 9 - Long-term capital gain taxable @ 12.5%
      ltcg12_5: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 10 - Long term capital gain taxable @ 20%
      ltcg20: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 11 - Long term capital gains taxable at special rates in India as per DTAA
      ltcgDTAA: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 12 - Net income from other sources chargeable at normal applicable rates
      netIncomeOtherSources: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 13 - Profit from owning and maintaining race horses
      raceHorses: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 14 - Income from other sources taxable at special rates in India as per DTAA
      otherSourcesDTAA: {
        incomeAfterSetOff: 0,
        broughtForwardLoss: 0,
        currentYearRemaining: 0,
      },

      // Row 15 - Total of brought forward loss set off
      totalBroughtForwardLoss: 0,

      // Row 16 - Current year's income remaining after set off
      totalCurrentYearRemaining: 0,
    },
  });

  // Calculate row total (column 1 - column 2)
  const calculateRowTotal = (rowName: string) => {
    const incomeAfterSetOff = Number(watch(`${rowName}.incomeAfterSetOff`)) || 0;
    const broughtForwardLoss = Number(watch(`${rowName}.broughtForwardLoss`)) || 0;
    
    const remaining = incomeAfterSetOff - broughtForwardLoss;
    setValue(`${rowName}.currentYearRemaining`, remaining);
    return remaining;
  };

  // Calculate total of brought forward loss set off (sum of column 2 for all rows)
  const calculateTotalBroughtForwardLoss = () => {
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

    let total = 0;
    rows.forEach(row => {
      total += Number(watch(`${row}.broughtForwardLoss`)) || 0;
    });

    setValue('totalBroughtForwardLoss', total);
    return total;
  };

  // Calculate total current year's income remaining after set off
  const calculateTotalCurrentYearRemaining = () => {
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

    let total = 0;
    rows.forEach(row => {
      total += Number(watch(`${row}.currentYearRemaining`)) || 0;
    });

    setValue('totalCurrentYearRemaining', total);
    return total;
  };

  // Calculate all
  const calculateAll = () => {
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

    rows.forEach(row => calculateRowTotal(row));
    calculateTotalBroughtForwardLoss();
    calculateTotalCurrentYearRemaining();
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
              Schedule BFLA - Details of Income after Set off of Brought Forward Losses of earlier years
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Brought Forward Loss Adjustment - Set-off of losses from previous years
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
                <li>Brought forward losses from earlier years can be set off against current year's income</li>
                <li>House property loss can be carried forward for 8 years</li>
                <li>Business losses can be carried forward for 8 years (set off only against business income)</li>
                <li>Short-term capital loss can be set off against any capital gains (STCG or LTCG)</li>
                <li>Long-term capital loss can only be set off against long-term capital gains</li>
                <li>Loss from race horses can be carried forward for 4 years (set off only against race horse income)</li>
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
                    Income after set off, if any, of current year's losses as per 4.4 of Schedule CYLA)<br/>
                    (1)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Brought forward loss set off<br/>
                    (2)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Current year's Income remaining after set off<br/>
                    (3)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* Row i - Salaries */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">i</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Salaries</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('salaries.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4ii of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('salaries.broughtForwardLoss')}
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

                {/* Row ii - House property */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">ii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">House property</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('houseProperty.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4iii of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('houseProperty.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 house property loss)</div>
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

                {/* Row iii-a - Short-term capital gain taxable @ 15% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">iii-a</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable @ 15%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg15.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4iva of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg15.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term capital loss)</div>
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

                {/* Row iii-b - Short-term capital gain taxable @ 20% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">iii-b</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable @ 20%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg20.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4ivb of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg20.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term capital loss)</div>
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

                {/* Row iv - Short-term capital gain taxable @ 30% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">iv</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable @ 30%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg30.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4v of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcg30.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term capital loss)</div>
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

                {/* Row v - Short-term capital gain taxable at applicable rates */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">v</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable at applicable rates</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgApplicable.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4vi of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgApplicable.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term capital loss)</div>
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

                {/* Row vi - Short-term capital gain taxable at special rates in India as per DTAA */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">vi</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Short-term capital gain taxable at special rates in India as per DTAA</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgDTAA.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4vii of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('stcgDTAA.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term or long-term capital loss)</div>
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

                {/* Row vii-a - Long-term capital gain taxable @ 10% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">vii-a</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Long-term capital gain taxable @ 10%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg10.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4viiia of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg10.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term or long-term capital loss)</div>
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

                {/* Row viii - Long-term capital gain taxable @ 12.5% */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">viii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Long-term capital gain taxable @ 12.5%</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg12_5.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4viiib of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg12_5.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term or long-term capital loss)</div>
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
                      {...register('ltcg20.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4ix of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcg20.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term or long-term capital loss)</div>
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
                      {...register('ltcgDTAA.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4x of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('ltcgDTAA.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B7 short-term or long-term capital loss)</div>
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
                      {...register('netIncomeOtherSources.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4xi of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('netIncomeOtherSources.broughtForwardLoss')}
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

                {/* Row xii - Profit from owning and maintaining race horses */}
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">xii</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">Profit from owning and maintaining race horses</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('raceHorses.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4xii of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('raceHorses.broughtForwardLoss')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(B6 loss from horse races)</div>
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
                      {...register('otherSourcesDTAA.incomeAfterSetOff')}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                      placeholder="0.00"
                    />
                    <div className="text-xs text-gray-500 mt-1">(4xiii of schedule CYLA)</div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.01"
                      {...register('otherSourcesDTAA.broughtForwardLoss')}
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

                {/* Row xiv - Total of brought forward loss set off */}
                <tr className="bg-gray-50 font-semibold">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-900">xiv</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    Total of brought forward loss set off<br/>
                    <span className="text-xs font-normal text-gray-600">
                      (2i + 2iia + 2iiia + 2iiib + 2iv + 2v + 2vi + 2viia + 2viii + 2ix + 2x + 2xi + 2xii + 2xiii)
                    </span>
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('totalBroughtForwardLoss')}
                      className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </td>
                  <td className="px-4 py-3"></td>
                </tr>

                {/* Row xv - Current year's income remaining after set off */}
                <tr className="bg-gray-100 font-semibold">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-bold text-gray-900">xv</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900">
                    Current year's income remaining after set off of Total of (3i + 3ii + 3iia + 3iiib + 3iv + 3v + 3vi + 3viia + 3viiib + 3ix + 3x + 3xi + 3xiia + 3xiib + 3xiii)
                  </td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3"></td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      readOnly
                      {...register('totalCurrentYearRemaining')}
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

export default ItrTwoBfla;
