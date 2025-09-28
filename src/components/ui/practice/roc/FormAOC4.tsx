import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FinancialData from './FinancialData.tsx';
import BalanceSheetData from './BalanceSheetData.tsx';
import ProfitLossData from './ProfitLossData.tsx';
import { getAOC4Entries, getSuggestedAOC4Period, saveAOC4Entry } from '../../../../store/slices/aoc4Slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';

// Official AOC-4 Form Structure (Annual Return)
interface ROCPeriod {
    financialYear: string;
}

interface AOC4FormData {
    // Part I - Company Details
    companyName: string;
    cin: string;
    financialYear: string;
    reportingDate: string;
    
    // Part II - Financial Data
    financialData: {
        revenueFromOperations: string;
        otherIncome: string;
        totalRevenue: string;
        costOfMaterialsConsumed: string;
        purchasesOfStockInTrade: string;
        changesInInventories: string;
        employeeBenefitsExpense: string;
        financeCosts: string;
        depreciationAndAmortisationExpense: string;
        otherExpenses: string;
        totalExpenses: string;
        profitBeforeTax: string;
        taxExpense: string;
        profitAfterTax: string;
        otherComprehensiveIncome: string;
        totalComprehensiveIncome: string;
    };
    
    // Part III - Balance Sheet Data
    balanceSheetData: {
        shareCapital: string;
        otherEquity: string;
        totalEquity: string;
        nonCurrentLiabilities: string;
        currentLiabilities: string;
        totalLiabilities: string;
        nonCurrentAssets: string;
        currentAssets: string;
        totalAssets: string;
    };
    
    // Part IV - Auditor Details
    auditorDetails: {
        auditorName: string;
        auditorFirm: string;
        auditorReportDate: string;
        auditorReportType: string;
    };
    
    // Part V - Additional Information
    additionalInformation: {
        notesToAccounts: string;
        boardResolutionDate: string;
        filingDate: string;
    };
}

// Official validation functions
const validateCIN = (cin: string): boolean => {
    const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
    return cinRegex.test(cin);
};

const FormAOC4 = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { entries, loading, error, suggestedPeriod } = useAppSelector((state: any) => state.aoc4);

    const [formStates, setFormStates] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(0);
    const [showNewFiling, setShowNewFiling] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<any>(null);
    const [viewMode, setViewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    console.log("formStates :", formStates);
    console.log("selectedEntry :", selectedEntry);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await dispatch(getAOC4Entries()).unwrap();
                await dispatch(getSuggestedAOC4Period()).unwrap();
                setInitialLoadComplete(true);
            } catch (error) {
                setIsLoading(false);
                console.error("Failed to fetch AOC-4 data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleNewFiling = () => {
        if (suggestedPeriod) {
            setShowNewFiling(true);
            setSelectedEntry(null);
            setViewMode(false);
            setFormStates({});
            setOpen(0);
        }
    };

    const handleViewEntry = (entry: any) => {
        setSelectedEntry(entry);
        setShowNewFiling(true);
        setViewMode(true);
        setFormStates({});
        setOpen(0);
    };

    const getFormData = (slug: string) => {
        console.log("selectedEntry :", selectedEntry);
        if (viewMode && selectedEntry) {
            return selectedEntry[slug];
        }
        if (!showNewFiling || !suggestedPeriod?.financialYear) return undefined;

        const entry = entries.find((e: any) =>
            e.financialYear === suggestedPeriod.financialYear
        );

        return entry ? entry[slug] : undefined;
    };

    const updateFormState = (slug: string, data: any) => {
        if (viewMode) return;
        setFormStates((prev) => ({ ...prev, [slug]: data }));
    };

    const rocOptions = [
        { name: "Part I - Company Details", slug: "companyDetails" },
        { name: "Part II - Financial Data", slug: "financialData" },
        { name: "Part III - Balance Sheet", slug: "balanceSheetData" },
        { name: "Part IV - Profit & Loss", slug: "profitLossData" },
        { name: "Part V - Auditor Details", slug: "auditorDetails" },
        { name: "Part VI - Additional Information", slug: "additionalInformation" },
    ];

    const handleSubmit = async () => {
        if (!suggestedPeriod) {
            alert("Please select a filing period");
            return;
        }

        if (Object.keys(formStates).length === 0) {
            alert("Please fill at least one section before submitting");
            return;
        }

        try {
            setIsLoading(true);
            const entryData = {
                financialYear: suggestedPeriod.financialYear,
                ...formStates
            };

            const result = await dispatch(saveAOC4Entry(entryData)).unwrap();

            if (result) {
                navigate("/practice/roc-filing", { state: { success: true } });
            }
        } catch (error) {
            alert("Submission failed. Please try again.");
            console.error("Submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">Loading AOC-4 data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center p-10 text-red-500">Error loading AOC-4 data: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center pt-5 pb-20">
            {!showNewFiling ? (
                <div className="w-full max-w-5xl p-4 mx-auto mt-10">
                    <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">Your AOC-4 Filings</h1>

                    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-2xl">
                        {entries?.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-lg text-gray-500">You have not filed any AOC-4 entries yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left text-gray-700">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Financial Year</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">CIN</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Auditor</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Status</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {entries?.map((entry: any) => (
                                            <tr key={`${entry.financialYear}`} className="transition hover:bg-gray-50">
                                                <td className="px-6 py-4">{entry.financialYear}</td>
                                                <td className="px-6 py-4">{entry.cin}</td>
                                                <td className="px-6 py-4">{entry.auditorName || 'N/A'}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                                                        Filed
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleViewEntry(entry)}
                                                        className="font-medium text-blue-600 hover:underline"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div className="mt-10 text-center">
                            {suggestedPeriod ? (
                                <button
                                    onClick={handleNewFiling}
                                    className="px-6 py-3 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                                >
                                    File for FY {suggestedPeriod.financialYear}
                                </button>
                            ) : (
                                <div className="inline-block px-6 py-4 text-blue-800 rounded-lg shadow bg-blue-50">
                                    ✅ All available periods have been filed. No new filing suggested.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate("/practice/roc-filing")}
                            className="px-5 py-2 text-gray-700 transition bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                        >
                            ← Back to ROC Filing
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-full p-4 mt-4 text-lg text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md ">
                        Please do not refresh otherwise the progress will be lost!.
                    </div>
                    <div className="w-full">
                        <div className="w-full py-10 hero">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold">AOC-4 Annual Return</h1>
                                <p className="mt-2 text-lg">Annual Return under Section 92 of the Companies Act, 2013</p>
                                {selectedEntry ? (
                                    <div className="p-4 mt-4 bg-blue-100 rounded-lg">
                                        <p className="font-semibold">
                                            Viewing Filed Return: FY {selectedEntry.financialYear}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setShowNewFiling(false);
                                                setSelectedEntry(null);
                                                setViewMode(false);
                                            }}
                                            className="mt-2 text-sm text-blue-600 hover:underline"
                                        >
                                            Back to Filed Returns
                                        </button>
                                    </div>
                                ) : suggestedPeriod ? (
                                    <div className="p-4 mt-4 bg-blue-100 rounded-lg">
                                        <p className="font-semibold">
                                            Filing Period: FY {suggestedPeriod.financialYear}
                                        </p>
                                        <button
                                            onClick={() => setShowNewFiling(false)}
                                            className="mt-2 text-sm text-blue-600 hover:underline"
                                        >
                                            Back to Filed Returns
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {open === 0 ? (
                            <div className="flex flex-wrap justify-center gap-3">
                                {rocOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className="relative flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px] h-[180px] transition-all duration-300 ease-in-out"
                                    >
                                        <span className="text-lg font-semibold text-gray-700">{option.name}</span>

                                        <div className="flex items-center gap-2 mt-4">
                                            <button
                                                onClick={() => setOpen(index + 1)}
                                                className={`flex items-center px-4 py-2 text-gray-700 transition-all bg-white border rounded-lg ${viewMode ? "border-gray-300" : "border-gray-400 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {viewMode ? "View" : "Select"} <span className="ml-2">→</span>
                                            </button>

                                            {(formStates[option.slug] || (selectedEntry && selectedEntry[option.slug])) && (
                                                <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-lg">
                                                    <span className="text-2xl">✔</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="w-[60%] my-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
                                
                                {open === 1 && (
                                    <FinancialData
                                        setOpen={setOpen}
                                        formData={getFormData("financialData")}
                                        updateFormState={updateFormState}
                                        period={selectedEntry || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 2 && (
                                    <BalanceSheetData
                                        setOpen={setOpen}
                                        formData={getFormData("balanceSheetData")}
                                        updateFormState={updateFormState}
                                        period={selectedEntry || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 3 && (
                                    <ProfitLossData
                                        setOpen={setOpen}
                                        formData={getFormData("profitLossData")}
                                        updateFormState={updateFormState}
                                        period={selectedEntry || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setShowNewFiling(false);
                                    setSelectedEntry(null);
                                    setViewMode(false);
                                    setOpen(0);
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                ← Back to Filed Returns
                            </button>
                            {!viewMode && open === 0 && (
                                <button
                                    className="px-4 py-2 ml-4 text-white bg-[#101C36] rounded-md hover:bg-[#0a1427]"
                                    onClick={handleSubmit}
                                >
                                    Submit AOC-4
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FormAOC4;
