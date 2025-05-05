// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import OutwardAndReverseChargeInward from './OutwardAndReverseChargeInward.tsx';
// import SuppliesThroughEcommerceOperators from './SuppliesThroughEcommerceOperators.tsx';
// import SuppliesTable from './SuppliesTable.tsx';
// import EligibleItc from './EligibleItc.tsx';
// import InwardSupplies from './InwardSupplies.tsx';
// import InterestAndLateFee from './InterestAndLateFee.tsx';
// import PaymentOfTax from './PaymentOfTax.tsx';
// import {
//     getGstr3bList,
//     getSuggestedPeriod,
//     saveGstr3b,
//     setCurrentReturn,
//     resetGstr3bState
// } from '../../../../../store/slices/gstr3bSlice.ts';
// import { useAppDispatch, useAppSelector } from '../../../../../store/hooks.ts';
// import { getSingleRegistration } from '../../../../../store/slices/gstSlice.ts';

// const Gstr3b = () => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const {
//         currentReturn,
//         returns,
//         loading,
//         error,
//         suggestedPeriod
//     } = useAppSelector((state) => state.gstr3b);

//     const [formStates, setFormStates] = useState<Record<string, any>>({});
//     const [open, setOpen] = useState(0);
//     const [showNewFiling, setShowNewFiling] = useState(false);
//     const [initialLoadComplete, setInitialLoadComplete] = useState(false);
//     const [viewMode, setViewMode] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [open]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);
//                 await dispatch(getGstr3bList()).unwrap();
//                 await dispatch(getSuggestedPeriod()).unwrap();
//                 setInitialLoadComplete(true);
//             } catch (error) {
//                 setIsLoading(false);
//                 console.error("Failed to fetch GSTR3B data:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, [dispatch]);


//     const handleNewFiling = () => {
//         if (suggestedPeriod) {
//             setShowNewFiling(true);
//             dispatch(resetGstr3bState());
//             setViewMode(false);
//             setFormStates({});
//             setOpen(0);
//         }
//     };

//     const handleViewEntry = (entry: any) => {
//         dispatch(setCurrentReturn(entry));
//         setShowNewFiling(true);
//         setViewMode(true);
//         setFormStates({});
//         setOpen(0);
//     };

//     const getFormData = (slug: string) => {
//         if (viewMode && currentReturn) {
//             return currentReturn[slug];
//         }
//         if (!showNewFiling || !suggestedPeriod?.month) return undefined;

//         const entry = returns.find((e: any) =>
//             e.financialYear === suggestedPeriod.financialYear &&
//             e.month === suggestedPeriod.month
//         );

//         return entry ? entry[slug] : undefined;
//     };

//     const updateFormState = (slug: string, data: any) => {
//         if (viewMode) return;
//         setFormStates((prev) => ({ ...prev, [slug]: data }));
//     };

//     const gstOptions = [
//         { name: "3.1 Tax on outward and reverse charge inward supplies", slug: "outwardAndReverseChargeInward" },
//         { name: "3.1.1 Supplies notified under section 9(5)", slug: "suppliesThroughEcommerceOperators" },
//         { name: "3.2 Inter-state supplies", slug: "interStateSupplies" },
//         { name: "4. Eligible ITC", slug: "eligibleItc" },
//         { name: "5. Exempt, nil and Non GST inward supplies", slug: "inwardSupplies" },
//         { name: "5.1 Interest and Late fee for previous tax period", slug: "interestPreviousTaxPeriod" },
//         { name: "6.1 Payment of tax", slug: "paymentOfTax" },
//     ];

//     const handleSubmit = async () => {
//         if (!suggestedPeriod) {
//             alert("Please select a filing period");
//             return;
//         }

//         if (Object.keys(formStates).length === 0) {
//             alert("Please fill at least one section before submitting");
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const entryData = {
//                 financialYear: suggestedPeriod.financialYear,
//                 month: suggestedPeriod.month,
//                 ...formStates
//             };

//             const result = await dispatch(saveGstr3b(entryData)).unwrap();

//             if (result) {
//                 navigate("/practice/gst/dashboard", { state: { success: true } });
//             }
//         } catch (error) {
//             alert("Submission failed. Please try again.");
//             console.error("Submission error:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         dispatch(getSingleRegistration());
//     }, [dispatch]);

//     if (isLoading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <div className="flex flex-col items-center">
//                     <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
//                     <p className="mt-4 text-lg font-medium text-gray-700">Loading GSTR3B data...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="flex justify-center p-10 text-red-500">Error loading GSTR3B data: {error}</div>;
//     }

//     console.log(suggestedPeriod);

//     return (
//         <div className="flex flex-col items-center pt-5 pb-20">
//             {!showNewFiling ? (
//                 <div className="w-full max-w-5xl p-4 mx-auto mt-10">
//                     <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">Your GSTR-3B Filings</h1>

//                     <div className="p-6 bg-white border border-gray-200 shadow-md rounded-2xl">
//                         {returns?.length === 0 ? (
//                             <div className="py-12 text-center">
//                                 <p className="text-lg text-gray-500">You have not filed any GSTR-3B entries yet.</p>
//                             </div>
//                         ) : (
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full text-sm text-left text-gray-700">
//                                     <thead className="border-b border-gray-200 bg-gray-50">
//                                         <tr>
//                                             <th className="px-6 py-4 font-semibold tracking-wide uppercase">Financial Year</th>
//                                             <th className="px-6 py-4 font-semibold tracking-wide uppercase">Month</th>
//                                             <th className="px-6 py-4 font-semibold tracking-wide uppercase">Status</th>
//                                             <th className="px-6 py-4 font-semibold tracking-wide uppercase">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-100">
//                                         {returns?.map((entry: any) => (
//                                             <tr key={`${entry.financialYear}-${entry.month}`} className="transition hover:bg-gray-50">
//                                                 <td className="px-6 py-4">{entry.financialYear}</td>
//                                                 {/* <td className="px-6 py-4">
//                                                     {new Date(0, parseInt(entry.month) - 1).toLocaleDateString('en-US', { month: 'long' })}
//                                                 </td> */}
//                                                 <td className="px-6 py-4">
//                                                     {new Date(0, parseInt(entry.month) - 1).toLocaleDateString('en-US', { month: 'long' })},
//                                                     Q{entry.quarter}
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <span className="inline-block px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
//                                                         Filed
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4">
//                                                     <button
//                                                         onClick={() => handleViewEntry(entry)}
//                                                         className="font-medium text-blue-600 hover:underline"
//                                                     >
//                                                         View Details
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}

//                         <div className="mt-10 text-center">
//                             {suggestedPeriod ? (
//                                 <button
//                                     onClick={handleNewFiling}
//                                     className="px-6 py-3 text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-700"
//                                 >
//                                     File for {suggestedPeriod.month}, FY {suggestedPeriod.financialYear}
//                                 </button>
//                             ) : (
//                                 <div className="inline-block px-6 py-4 text-blue-800 rounded-lg shadow bg-blue-50">
//                                     ✅ All available periods have been filed. No new filing suggested.
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="mt-8 text-center">
//                         <button
//                             onClick={() => navigate("/practice/gst")}
//                             className="px-5 py-2 text-gray-700 transition bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
//                         >
//                             ← Back to GST Services
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <>
//                     <div className="w-full p-4 mt-4 text-lg text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md ">
//                         Please do not refresh otherwise the progress will be lost!.
//                     </div>
//                     <div className="w-full">
//                         <div className="w-full py-10 hero">
//                             <div className="text-center">
//                                 <h1 className="text-4xl font-bold">GSTR-3B</h1>
//                                 <p className="mt-2 text-lg">Monthly Return</p>
//                                 {currentReturn ? (
//                                     <div className="p-4 mt-4 bg-blue-100 rounded-lg">
//                                         <p className="font-semibold">
//                                             Viewing Filed Return: {new Date(0, parseInt(currentReturn.month) - 1).toLocaleDateString('en-US', { month: 'long' })}, FY {currentReturn.financialYear}
//                                         </p>
//                                         <button
//                                             onClick={() => {
//                                                 setShowNewFiling(false);
//                                                 dispatch(setCurrentReturn(null));
//                                                 setViewMode(false);
//                                             }}
//                                             className="mt-2 text-sm text-blue-600 hover:underline"
//                                         >
//                                             Back to Filed Returns
//                                         </button>
//                                     </div>
//                                 ) : suggestedPeriod ? (
//                                     <div className="p-4 mt-4 bg-blue-100 rounded-lg">
//                                         <p className="font-semibold">
//                                             Filing Period: {new Date(0, parseInt(suggestedPeriod.month) - 1).toLocaleDateString('en-US', { month: 'long' })},
//                                             Q{suggestedPeriod.quarter}, FY {suggestedPeriod.financialYear}
//                                         </p>
//                                         <button
//                                             onClick={() => setShowNewFiling(false)}
//                                             className="mt-2 text-sm text-blue-600 hover:underline"
//                                         >
//                                             Back to Filed Returns
//                                         </button>
//                                     </div>
//                                 ) : null}
//                             </div>
//                         </div>

//                         {open === 0 ? (
//                             <div className="flex flex-wrap justify-center gap-3">
//                                 {gstOptions.map((option, index) => (
//                                     <div
//                                         key={index}
//                                         className="relative flex flex-col items-center justify-between p-5 mb-4 bg-white border border-gray-300 shadow-xl rounded-xl w-[250px] h-[180px] transition-all duration-300 ease-in-out"
//                                     >
//                                         <span className="text-lg font-semibold text-gray-700">{option.name}</span>

//                                         <div className="flex items-center gap-2 mt-4">
//                                             <button
//                                                 onClick={() => setOpen(index + 1)}
//                                                 className={`flex items-center px-4 py-2 text-gray-700 transition-all bg-white border rounded-lg ${viewMode ? "border-gray-300" : "border-gray-400 hover:bg-gray-100"
//                                                     }`}
//                                             >
//                                                 {viewMode ? "View" : "Select"} <span className="ml-2">→</span>
//                                             </button>

//                                             {(formStates[option.slug] || (currentReturn && currentReturn[option.slug])) && (
//                                                 <div className="flex items-center justify-center w-10 h-10 text-white bg-green-500 rounded-lg">
//                                                     <span className="text-2xl">✔</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             <div className="w-[60%] my-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//                                 {open === 1 && (
//                                     <OutwardAndReverseChargeInward
//                                         setOpen={setOpen}
//                                         formData={getFormData("outwardAndReverseChargeInward")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                                 {open === 2 && (
//                                     <SuppliesThroughEcommerceOperators
//                                         setOpen={setOpen}
//                                         formData={getFormData("suppliesThroughEcommerceOperators")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                                 {open === 3 && (
//                                     <SuppliesTable
//                                         setOpen={setOpen}
//                                         formData={getFormData("interStateSupplies")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                                 {open === 4 && (
//                                     <EligibleItc
//                                         setOpen={setOpen}
//                                         formData={getFormData("eligibleItc")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                                 {open === 5 && (
//                                     <InwardSupplies
//                                         setOpen={setOpen}
//                                         formData={getFormData("inwardSupplies")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                                 {open === 6 && (
//                                     <InterestAndLateFee
//                                         setOpen={setOpen}
//                                         formData={getFormData("interestPreviousTaxPeriod")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                                 {open === 7 && (
//                                     <PaymentOfTax
//                                         setOpen={setOpen}
//                                         formData={getFormData("paymentOfTax")}
//                                         updateFormState={updateFormState}
//                                         period={currentReturn || suggestedPeriod}
//                                         viewMode={viewMode}
//                                     />
//                                 )}
//                             </div>
//                         )}

//                         <div className="mt-6 text-center">
//                             <button
//                                 onClick={() => {
//                                     setShowNewFiling(false);
//                                     dispatch(setCurrentReturn(null));
//                                     setViewMode(false);
//                                     setOpen(0);
//                                 }}
//                                 className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
//                             >
//                                 ← Back to Filed Returns
//                             </button>
//                             {!viewMode && open === 0 && (
//                                 <button
//                                     className="px-4 py-2 ml-4 text-white bg-[#101C36] rounded-md hover:bg-[#0a1427]"
//                                     onClick={handleSubmit}
//                                 >
//                                     Submit GSTR3B
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Gstr3b;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OutwardAndReverseChargeInward from './OutwardAndReverseChargeInward.tsx';
import SuppliesThroughEcommerceOperators from './SuppliesThroughEcommerceOperators.tsx';
import SuppliesTable from './SuppliesTable.tsx';
import EligibleItc from './EligibleItc.tsx';
import InwardSupplies from './InwardSupplies.tsx';
import InterestAndLateFee from './InterestAndLateFee.tsx';
import PaymentOfTax from './PaymentOfTax.tsx';
import {
    getGstr3bList,
    getSuggestedPeriod,
    saveGstr3b,
    setCurrentReturn,
    resetGstr3bState
} from '../../../../../store/slices/gstr3bSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks.ts';
import { getSingleRegistration } from '../../../../../store/slices/gstSlice.ts';

const Gstr3b = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        currentReturn,
        returns,
        loading,
        error,
        suggestedPeriod
    } = useAppSelector((state) => state.gstr3b);

    const [formStates, setFormStates] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(0);
    const [showNewFiling, setShowNewFiling] = useState(false);
    const [initialLoadComplete, setInitialLoadComplete] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await dispatch(getGstr3bList()).unwrap();
                await dispatch(getSuggestedPeriod()).unwrap();
                setInitialLoadComplete(true);
            } catch (error) {
                setIsLoading(false);
                console.error("Failed to fetch GSTR3B data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleNewFiling = () => {
        if (suggestedPeriod) {
            setShowNewFiling(true);
            dispatch(resetGstr3bState());
            setViewMode(false);
            setFormStates({});
            setOpen(0);
        }
    };

    const handleViewEntry = (entry: any) => {
        dispatch(setCurrentReturn({
            ...entry,
            monthName: new Date(0, parseInt(entry.month) - 1).toLocaleDateString('en-US', { month: 'long' })
        }));
        setShowNewFiling(true);
        setViewMode(true);
        setFormStates({});
        setOpen(0);
    };

    const getFormData = (slug: string) => {
        if (viewMode && currentReturn) {
            return currentReturn[slug];
        }
        if (!showNewFiling || !suggestedPeriod?.month) return undefined;

        const entry = returns.find((e: any) =>
            e.financialYear === suggestedPeriod.financialYear &&
            e.month === suggestedPeriod.month
        );

        return entry ? entry[slug] : undefined;
    };

    const updateFormState = (slug: string, data: any) => {
        if (viewMode) return;
        setFormStates((prev) => ({ ...prev, [slug]: data }));
    };

    const gstOptions = [
        { name: "3.1 Tax on outward and reverse charge inward supplies", slug: "outwardAndReverseChargeInward" },
        { name: "3.1.1 Supplies notified under section 9(5)", slug: "suppliesThroughEcommerceOperators" },
        { name: "3.2 Inter-state supplies", slug: "interStateSupplies" },
        { name: "4. Eligible ITC", slug: "eligibleItc" },
        { name: "5. Exempt, nil and Non GST inward supplies", slug: "inwardSupplies" },
        { name: "5.1 Interest and Late fee for previous tax period", slug: "interestPreviousTaxPeriod" },
        { name: "6.1 Payment of tax", slug: "paymentOfTax" },
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
                monthName: new Date(0, parseInt(suggestedPeriod.month) - 1).toLocaleDateString('en-US', { month: 'long' }),
                ...formStates
            };

            const result = await dispatch(saveGstr3b(entryData)).unwrap();

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
                    <p className="mt-4 text-lg font-medium text-gray-700">Loading GSTR3B data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="flex justify-center p-10 text-red-500">Error loading GSTR3B data: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center px-10 pt-5 pb-20">
            {!showNewFiling ? (
                <div className="w-full max-w-5xl p-4 mx-auto mt-10">
                    <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">Your GSTR-3B Filings</h1>

                    <div className="p-6 bg-white border border-gray-200 shadow-md rounded-2xl">
                        {returns?.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-lg text-gray-500">You have not filed any GSTR-3B entries yet.</p>
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
                                        {returns?.map((entry: any) => (
                                            <tr key={`${entry.financialYear}-${entry.month}`} className="transition hover:bg-gray-50">
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
                                    File for {new Date(0, parseInt(suggestedPeriod.month) - 1).toLocaleDateString('en-US', { month: 'long' })}, {suggestedPeriod.quarter}, FY {suggestedPeriod.financialYear}
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
                    <div className="w-full p-4 mt-4 text-lg text-center text-yellow-700 bg-yellow-100 border border-yellow-300 rounded-md">
                        Please do not refresh otherwise the progress will be lost!.
                    </div>
                    <div className="w-full">
                        <div className="w-full py-10 hero">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold">GSTR-3B</h1>
                                <p className="mt-2 text-lg">Monthly Return</p>
                                {currentReturn ? (
                                    <div className="p-4 mt-4 bg-blue-100 rounded-lg">
                                        <p className="font-semibold">
                                            Viewing Filed Return: {currentReturn.monthName}, {currentReturn.quarter}, FY {currentReturn.financialYear}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setShowNewFiling(false);
                                                dispatch(setCurrentReturn(null));
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
                                            Filing Period: {new Date(0, parseInt(suggestedPeriod.month) - 1).toLocaleDateString('en-US', { month: 'long' })}, {suggestedPeriod.quarter}, FY {suggestedPeriod.financialYear}
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
                                                className={`flex items-center px-4 py-2 text-gray-700 transition-all bg-white border rounded-lg ${viewMode ? "border-gray-300" : "border-gray-400 hover:bg-gray-100"}`}
                                            >
                                                {viewMode ? "View" : "Select"} <span className="ml-2">→</span>
                                            </button>
                                            {(formStates[option.slug] || (currentReturn && currentReturn[option.slug])) && (
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
                                    <OutwardAndReverseChargeInward
                                        setOpen={setOpen}
                                        formData={getFormData("outwardAndReverseChargeInward")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 2 && (
                                    <SuppliesThroughEcommerceOperators
                                        setOpen={setOpen}
                                        formData={getFormData("suppliesThroughEcommerceOperators")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 3 && (
                                    <SuppliesTable
                                        setOpen={setOpen}
                                        formData={getFormData("interStateSupplies")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 4 && (
                                    <EligibleItc
                                        setOpen={setOpen}
                                        formData={getFormData("eligibleItc")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 5 && (
                                    <InwardSupplies
                                        setOpen={setOpen}
                                        formData={getFormData("inwardSupplies")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 6 && (
                                    <InterestAndLateFee
                                        setOpen={setOpen}
                                        formData={getFormData("interestPreviousTaxPeriod")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                                {open === 7 && (
                                    <PaymentOfTax
                                        setOpen={setOpen}
                                        formData={getFormData("paymentOfTax")}
                                        updateFormState={updateFormState}
                                        period={currentReturn || suggestedPeriod}
                                        viewMode={viewMode}
                                    />
                                )}
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setShowNewFiling(false);
                                    dispatch(setCurrentReturn(null));
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
                                    Submit GSTR3B
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Gstr3b;