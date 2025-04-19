import React, { useEffect, useState } from 'react'
import B2b from './B2b.tsx'
import { useNavigate } from 'react-router-dom'
import B2c from './B2c.tsx';
import Exports from './Exports.tsx';
import B2cs from './B2cs.tsx';
import NilRated from './NilRated.tsx';
import Credit from './creditDebitNotes.tsx';
import CreditUnregistered from './creditDebitNotesUnregistered.tsx';
import TaxLiability from './TaxLiability.tsx';
import Adjustment from './AdjustmentInAdvances.tsx';
import Hsn from './Hsn.tsx';
import SuppliesThroughEco from './SuppliesThroughEco.tsx';
import SuppliesB2b from './SuppliesB2b.tsx';
import Document from './Documents.tsx';

const Gstr1 = () => {
    const navigate = useNavigate();

    // State to track form data
    const [formStates, setFormStates] = useState<Record<string, any>>({});

    // State to track which form is open
    const [open, setOpen] = useState(0);
    const [period, setPeriod] = useState({
        financialYear: '',
        quarter: '',
        month: '',
        monthName: ''
    });

    const [periodSelected, setPeriodSelected] = useState(false);
    const [filledPeriods, setFilledPeriods] = useState<string[]>([]);

    // Generate last 6 quarters (18 months)
    const generateLast6Quarters = () => {
        const quarters: any = [];
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1); // Start from next month

        for (let i = 0; i < 6; i++) {
            currentDate.setMonth(currentDate.getMonth() - 3); // Go back 3 months each iteration

            const year = currentDate.getFullYear();
            const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
            const financialYear = quarter > 1 ? `${year}-${(year + 1).toString().slice(2)}` : `${year - 1}-${year.toString().slice(2)}`;

            // Get months in this quarter
            const startMonth = (quarter - 1) * 3;
            const quarterMonths: any = [];

            for (let m = 0; m < 3; m++) {
                const monthIndex = startMonth + m;
                quarterMonths.push({
                    value: `${year}-${(monthIndex + 1).toString().padStart(2, '0')}`,
                    display: monthNames[monthIndex],
                    monthName: monthNames[monthIndex]
                });
            }

            quarters.push({
                financialYear,
                quarter: `Q${quarter}`,
                quarterName: `Quarter ${quarter}`,
                months: quarterMonths
            });
        }

        return quarters;
    };

    const last6Quarters = generateLast6Quarters();

    // Financial years options (unique from last 6 quarters)
    const financialYears = Array.from(new Set(last6Quarters.map(q => q.financialYear)));

    // Get quarters for selected financial year
    const getQuartersForYear = (year: string) => {
        return last6Quarters.filter(q => q.financialYear === year);
    };

    // Get months for selected quarter
    const getMonthsForQuarter = (year: string, quarter: string) => {
        const quarterData = last6Quarters.find(q =>
            q.financialYear === year && q.quarter === quarter
        );
        return quarterData ? quarterData.months : [];
    };

    // Handle period selection submit
    const handlePeriodSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (period.financialYear && period.quarter && period.month) {
            setPeriodSelected(true);
        }
    };

    // Reset quarter and month when financial year changes
    useEffect(() => {
        setPeriod(prev => ({ ...prev, quarter: '', month: '', monthName: '' }));
    }, [period.financialYear]);

    // Reset month when quarter changes
    useEffect(() => {
        setPeriod(prev => ({ ...prev, month: '', monthName: '' }));
    }, [period.quarter]);


    // Options list
    const gstOptions = [
        { name: "4A, 4B, 6B, 6C - B2B, SEZ, DE Invoices", slug: "B2B" },
        { name: "5 - B2C (Large) Invoices", slug: "B2CL" },
        { name: "6A - Exports Invoices", slug: "EXP" },
        { name: "7 - B2C (Others)", slug: "B2CS" },
        { name: "8A, 8B, 8C, 8D - Nil Rated Supplies", slug: "NIL-RATED" },
        { name: "9B - Credit / Debit Notes (Registered)", slug: "CDNR" },
        { name: "9B - Credit / Debit Notes (Unregistered)", slug: "CDNUR" },
        { name: "11A(1), 11A(2) - Tax Liability (Advances Received)", slug: "TAX-LIABILITY" },
        { name: "11B(1), 11B(2) - Adjustment of Advances", slug: "ADJUSTMENT" },
        { name: "HSN-wise summary of outward supplies", slug: "HSN" },
        { name: "Documents Issued", slug: "DOCUMENTS" },
        { name: "Supplies made through ECO", slug: "ECO" },
        { name: "Supplies U/s 9(5)", slug: "SUPPLIES-B2B" },
    ];

    // Function to update form states
    const updateFormState = (slug: string, data: any) => {
        setFormStates((prev) => ({ ...prev, [slug]: data }));
    };

    return (
        <div className="flex flex-col items-center px-10 pt-5 pb-20">
            {!periodSelected && (
                <div className="w-full max-w-2xl p-8 mx-auto mt-10 bg-white rounded-lg shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-center">Select Filing Period</h2>
                    <form onSubmit={handlePeriodSubmit}>
                        <div className="space-y-4">
                            {/* Financial Year Selection */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-700">Financial Year</label>
                                <select
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={period.financialYear}
                                    onChange={(e) => setPeriod({
                                        ...period,
                                        financialYear: e.target.value,
                                        quarter: '',
                                        month: '',
                                        monthName: ''
                                    })}
                                    required
                                >
                                    <option value="">Select Financial Year</option>
                                    {financialYears.map((year: any) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Quarter Selection */}
                            {period.financialYear && (
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Quarter</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={period.quarter}
                                        onChange={(e) => setPeriod({
                                            ...period,
                                            quarter: e.target.value,
                                            month: '',
                                            monthName: ''
                                        })}
                                        required
                                    >
                                        <option value="">Select Quarter</option>
                                        {getQuartersForYear(period.financialYear).map((qtr) => (
                                            <option key={qtr.quarter} value={qtr.quarter}>
                                                {qtr.quarterName} (FY {qtr.financialYear})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Month Selection */}
                            {period.quarter && (
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">Month</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={period.month}
                                        onChange={(e) => {
                                            const selectedMonth = getMonthsForQuarter(
                                                period.financialYear,
                                                period.quarter
                                            ).find(m => m.value === e.target.value);

                                            if (selectedMonth) {
                                                setPeriod({
                                                    ...period,
                                                    month: selectedMonth.value,
                                                    monthName: selectedMonth.monthName
                                                });
                                            }
                                        }}
                                        required
                                    >
                                        <option value="">Select Month</option>
                                        {getMonthsForQuarter(period.financialYear, period.quarter).map((month) => (
                                            <option
                                                key={month.value}
                                                value={month.value}
                                                disabled={filledPeriods.includes(month.value)}
                                                className={filledPeriods.includes(month.value) ? 'text-gray-400' : ''}
                                            >
                                                {month.display} {filledPeriods.includes(month.value) ? '(Already Filed)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                    {filledPeriods.includes(period.month) && (
                                        <p className="mt-1 text-sm text-red-500">
                                            This period has already been filed. Please select another month.
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    disabled={filledPeriods.includes(period.month)}
                                >
                                    Continue to GSTR-1
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Header Section */}
            {periodSelected && open === 0 && (
                <div className="w-full py-10 hero">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold">GSTR1</h1>
                        <p className="mt-2 text-lg">Details of outward supplies of goods or services</p>
                        <div className="p-4 mt-4 bg-blue-100 rounded-lg">
                            <p className="font-semibold">
                                Selected Period: {period.monthName}, {period.quarter}, FY {period.financialYear}
                            </p>
                            <button
                                onClick={() => setPeriodSelected(false)}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                            >
                                Change Period
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Selection Grid */}
            {periodSelected && open === 0 && (
                <div className="flex flex-wrap justify-center gap-3">
                    {gstOptions.map((option, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px] h-[180px] transition-all duration-300 ease-in-out"
                        >
                            <span className="text-lg font-semibold text-gray-700">{option.name}</span>

                            <div className="flex items-center gap-2 mt-4">
                                <button
                                    onClick={() => setOpen(index + 1)}
                                    className="flex items-center px-4 py-2 text-gray-700 transition-all bg-white border border-gray-400 rounded-lg hover:bg-gray-100"
                                >
                                    Select <span className="ml-2">→</span>
                                </button>

                                {/* Tick Icon (Shown only if form is submitted) */}
                                {formStates[option.slug] && (
                                    <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-lg">
                                        <span className="text-2xl">✔</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Back Button */}
            {periodSelected && open === 0 && (
                <div>
                    <button onClick={() => navigate("/practice/gst")} className="mt-6 btn btn-outline">
                        ⬅ Back to Services
                    </button>
                    <button
                        className="btn ml-5 bg-[#101C36] text-white"
                        onClick={() => navigate("/practice/gst/dashboard")}
                    >
                        Submit
                    </button>
                </div>
            )}

            {/* Breadcrumbs */}
            {periodSelected && open > 0 && (
                <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg breadcrumbs">
                    <ul>
                        <li className="cursor-pointer" onClick={() => navigate("/practice")}>Practice</li>
                        <li className="cursor-pointer" onClick={() => navigate("/practice/gst")}>Gst</li>
                        <li className="cursor-pointer" onClick={() => setOpen(0)}>Gstr-1</li>
                        <li>{gstOptions[open - 1].slug}</li>
                    </ul>
                </div>
            )}

            {/* Form Rendering */}
            {periodSelected && open > 0 && (
                <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                    <div className="mb-4 text-sm text-gray-600">
                        Filing for: {period.month}, {period.quarter}, FY {period.financialYear}
                    </div>

                    {open === 1 && <B2b setOpen={setOpen} formData={formStates["B2B"]} updateFormState={updateFormState} period={period} />}
                    {open === 2 && <B2c setOpen={setOpen} formData={formStates["B2CL"]} updateFormState={updateFormState} period={period} />}
                    {open === 3 && <Exports setOpen={setOpen} formData={formStates["EXP"]} updateFormState={updateFormState} period={period} />}
                    {open === 4 && <B2cs setOpen={setOpen} formData={formStates["B2CS"]} updateFormState={updateFormState} period={period} />}
                    {open === 5 && <NilRated setOpen={setOpen} formData={formStates["NIL-RATED"]} updateFormState={updateFormState} period={period} />}

                    {open === 6 && <Credit setOpen={setOpen} formData={formStates["CDNR"]} updateFormState={updateFormState} period={period} />}
                    {open === 7 && <CreditUnregistered setOpen={setOpen} formData={formStates["CDNUR"]} updateFormState={updateFormState} period={period} />}
                    {open === 8 && <TaxLiability setOpen={setOpen} formData={formStates["TAX-LIABILITY"]} updateFormState={updateFormState} period={period} />}
                    {open === 9 && <Adjustment setOpen={setOpen} formData={formStates["ADJUSTMENT"]} updateFormState={updateFormState} period={period} />}
                    {open === 10 && <Hsn setOpen={setOpen} formData={formStates["HSN"]} updateFormState={updateFormState} period={period} />}
                    {open === 11 && <Document setOpen={setOpen} formData={formStates["DOCUMENTS"]} updateFormState={updateFormState} period={period} />}
                    {open === 12 && <SuppliesThroughEco setOpen={setOpen} formData={formStates["ECO"]} updateFormState={updateFormState} period={period} />}
                    {open === 13 && <SuppliesB2b setOpen={setOpen} formData={formStates["SUPPLIES-B2B"]} updateFormState={updateFormState} period={period} />}
                </div>
            )}
        </div>
    );
};

export default Gstr1