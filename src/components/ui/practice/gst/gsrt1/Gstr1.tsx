import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import B2b from './B2b.tsx';
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
import { getGSTR1Entries, getSuggestedGSTR1Period, saveGSTR1Entry } from '../../../../../store/slices/gstr1Slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks.ts';
import { getSingleRegistration } from '../../../../../store/slices/gstSlice.ts';

interface GSTPeriod {
    financialYear: string;
    quarter: string;
    month: string;
    monthName: string;
}

const Gstr1 = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { entries, loading, error, suggestedPeriod } = useAppSelector((state: any) => state.gstr1);

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
                await dispatch(getGSTR1Entries()).unwrap();
                await dispatch(getSuggestedGSTR1Period()).unwrap();
                setInitialLoadComplete(true);
            } catch (error) {
                setIsLoading(false);
                console.error("Failed to fetch GSTR1 data:", error);
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
        setSelectedEntry({
            ...entry,
            monthName: new Date(0, parseInt(entry.month) - 1).toLocaleDateString('en-US', { month: 'long' })
        });
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
        if (!showNewFiling || !suggestedPeriod?.month) return undefined;

        const entry = entries.find((e: any) =>
            e.financialYear === suggestedPeriod.financialYear &&
            e.quarter === suggestedPeriod.quarter &&
            e.month === suggestedPeriod.month
        );

        return entry ? entry[slug] : undefined;
    };

    const updateFormState = (slug: string, data: any) => {
        if (viewMode) return;
        setFormStates((prev) => ({ ...prev, [slug]: data }));
    };

    const gstOptions = [
        { name: "B2B, SEZ, DE Invoices", slug: "b2b" },
        { name: "B2C (Large) Invoices", slug: "b2c" },
        { name: "Exports Invoices", slug: "exports" },
        { name: "B2C (Others)", slug: "b2cs" },
        { name: "Nil Rated Supplies", slug: "nilRated" },
        { name: "Credit/Debit Notes (Registered)", slug: "credit" },
        { name: "Credit/Debit Notes (Unregistered)", slug: "creditUnregistered" },
        { name: "Tax Liability (Advances)", slug: "taxLiability" },
        { name: "Adjustment of Advances", slug: "adjustments" },
        { name: "HSN Summary", slug: "hsn" },
        { name: "Documents Issued", slug: "documents" },
        { name: "ECO Supplies", slug: "suppliesThroughEco" },
        { name: "Supplies U/s 9(5)", slug: "suppliesB2b" },
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
                quarter: suggestedPeriod.quarter,
                month: suggestedPeriod.month,
                monthName: suggestedPeriod.monthName,
                ...formStates
            };

            const result = await dispatch(saveGSTR1Entry(entryData)).unwrap();

            if (result) {
                navigate("/practice/gst/dashboard", { state: { success: true } });
            }
        } catch (error) {
            alert("Submission failed. Please try again.");
            console.error("Submission error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getSingleRegistration());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700">Loading GSTR1 data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center p-10 text-red-500">Error loading GSTR1 data: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center pt-5 pb-20">
            {!showNewFiling ? (

                <div className="w-full max-w-5xl p-4 mx-auto mt-10">
                    <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">Your GSTR-1 Filings</h1>

                    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-2xl">
                        {entries?.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-lg text-gray-500">You have not filed any GSTR-1 entries yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left text-gray-700">
                                    <thead className="border-b border-gray-200 bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Financial Year</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Quarter</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Month</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Status</th>
                                            <th className="px-6 py-4 font-semibold tracking-wide uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {entries?.map((entry: any) => (
                                            <tr key={`${entry.financialYear}-${entry.quarter}-${entry.month}`} className="transition hover:bg-gray-50">
                                                <td className="px-6 py-4">{entry.financialYear}</td>
                                                <td className="px-6 py-4">{entry.quarter}</td>
                                                <td className="px-6 py-4">
                                                    {new Date(0, parseInt(entry.month) - 1).toLocaleDateString('en-US', { month: 'long' })}
                                                </td>
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
                                    File for {suggestedPeriod.monthName}, {suggestedPeriod.quarter}, FY {suggestedPeriod.financialYear}
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
                            onClick={() => navigate("/practice/gst")}
                            className="px-5 py-2 text-gray-700 transition bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                        >
                            ← Back to GST Services
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
                                <h1 className="text-4xl font-bold">GSTR1</h1>
                                <p className="mt-2 text-lg">Details of outward supplies of goods or services</p>
                                {selectedEntry ? (
                                    <div className="p-4 mt-4 bg-blue-100 rounded-lg">
                                        <p className="font-semibold">
                                            Viewing Filed Return: {selectedEntry.monthName}, {selectedEntry.quarter}, FY {selectedEntry.financialYear}
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
                                            Filing Period: {suggestedPeriod.monthName}, {suggestedPeriod.quarter}, FY {suggestedPeriod.financialYear}
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
                                {gstOptions.map((option, index) => (
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
                                    <B2b
                                        setOpen={setOpen}
                                        formData={getFormData("b2b")}
                                        updateFormState={updateFormState}
                                        period={selectedEntry || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 2 && (
                                    <B2c
                                        setOpen={setOpen}
                                        formData={getFormData("b2c")}
                                        updateFormState={updateFormState}
                                        period={selectedEntry || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 3 && (
                                    <Exports
                                        setOpen={setOpen}
                                        formData={getFormData("exports")}
                                        updateFormState={updateFormState}
                                        period={selectedEntry || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 4 && <B2cs setOpen={setOpen} formData={getFormData("b2cs")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 5 && <NilRated setOpen={setOpen} formData={getFormData("nilRated")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 6 && <Credit setOpen={setOpen} formData={getFormData("credit")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 7 && <CreditUnregistered setOpen={setOpen} formData={getFormData("creditUnregistered")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 8 && <TaxLiability setOpen={setOpen} formData={getFormData("taxLiability")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 9 && <Adjustment setOpen={setOpen} formData={getFormData("adjustments")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 10 && <Hsn setOpen={setOpen} formData={getFormData("hsn")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 11 && <Document setOpen={setOpen} formData={getFormData("documents")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 12 && <SuppliesThroughEco setOpen={setOpen} formData={getFormData("suppliesThroughEco")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
                                {open === 13 && <SuppliesB2b setOpen={setOpen} formData={getFormData("suppliesB2b")} updateFormState={updateFormState} period={selectedEntry || suggestedPeriod} viewMode={viewMode} />}
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
                                    Submit GSTR1
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Gstr1;