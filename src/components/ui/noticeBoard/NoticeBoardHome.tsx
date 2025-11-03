// import React from 'react'

// const NoticeCard = ({ info }) => {
//     return (
//         <div className="flex items-center justify-between p-4 bg-[#ffffff] rounded-md shadow lg:p-6">
//             <p className="text-gray-800 text-bold text-n">
//                 {info}
//             </p>
//         </div>
//     )
// }

// const NoticeBoardHome = () => {
//     return (
//         <div className="relative w-full bg-gradient-to-b from-green-100/50 to-green-100/50">

//             <div
//                 className="relative w-full p-10 mx-auto bg-center bg-cover rounded-lg md:p-20 lg:p-20"
//                 style={{
//                     backgroundImage: "url('/assets/noticeBoard/bg.svg')",
//                     filter: "brightness(1.2) contrast(1.1) saturate(1.5)"
//                 }}
//             >


//                 <div className="absolute inset-0 rounded-lg bg-black/50"></div>
//                 <div className="relative flex flex-col items-start gap-6 p-0 lg:flex-row lg:p-12">

//                     <div className="flex flex-col gap-6 lg:w-[50%] w-[100%] h-[512px]">
//                         <div className="flex items-center gap-4">
//                             <div className="w-4 h-8 bg-red-500 rounded-md"></div>
//                             <h2 className="text-2xl font-bold text-red-500 ">IMPORTANT UPDATES</h2>
//                         </div>

//                         <div className="flex flex-col gap-4 overflow-scroll">
//                             <NoticeCard info={"CMA Inter & Final (June'24) Result Date- 23rd Aug 2024"} />
//                             <NoticeCard info={"Daily Live classNamees are Taking Place On COC Commerce School"} />
//                             <NoticeCard info={"COC Education has Launched CFM Course"} />
//                             <NoticeCard info={"Breaking News CMA Students | Big Update- Stipend & Its Impact on Your Career"} />
//                             <NoticeCard info={"Get Latest Studio Recorded classNamees For CMA & CA June/Dec 24 Attempt"} />
//                             <NoticeCard info={"CMA Inter & Final (June'24) Result Date- 23rd Aug 2024"} />
//                             <NoticeCard info={"Daily Live classNamees are Taking Place On COC Commerce School"} />
//                             <NoticeCard info={"COC Education has Launched CFM Course"} />
//                             <NoticeCard info={"Breaking News CMA Students | Big Update- Stipend & Its Impact on Your Career"} />
//                             <NoticeCard info={"Get Latest Studio Recorded classNamees For CMA & CA June/Dec 24 Attempt"} />
//                         </div>
//                     </div>
//                     <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:p-12 lg:w-[50%] w-[100%] hidden lg:block lg:block">
//                         <div className="relative w-full h-64 bg-center bg-cover rounded-lg lg:h-96" style={{ backgroundImage: "url('/assets/noticeBoard/quote.svg')" }}>

//                             <div className="absolute inset-0 rounded-lg bg-black/50"></div>
//                             <div className="relative flex flex-col items-start justify-center h-full gap-4 p-6">
//                                 <p className="text-2xl font-medium leading-snug text-white">
//                                     "Education is the most powerful weapon which you can use to change the world."
//                                 </p>
//                                 <p className="text-xl italic text-white lg:text-2xl">- Nelson Mandela</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default NoticeBoardHome

import React from 'react';
import { FaBullhorn, FaQuoteLeft, FaArrowRight, FaRegCalendarAlt } from 'react-icons/fa';

const NoticeCard = ({ info, date, isNew = false }) => {
    return (
        <tr className="transition-all duration-200 bg-white hover:bg-white/10 group">
            <td className="px-4 py-4 border-b border-white/20 sm:px-6">
                <div className="flex items-center">
                    {isNew && (
                        <span className="px-2 py-1 mr-3 text-xs font-bold text-white bg-red-500 rounded-full whitespace-nowrap">
                            NEW
                        </span>
                    )}
                    <FaBullhorn className="flex-shrink-0 text-yellow-300" />
                </div>
            </td>
            <td className="px-4 py-4 border-b border-white/20 sm:px-6">
                <p className="font-medium text-blue-500 group-hover:text-white line-clamp-2">
                    {info}
                </p>
            </td>
            <td className="px-4 py-4 border-b border-white/20 sm:px-6">
                <div className="flex items-center text-sm text-white/80 whitespace-nowrap">
                    <FaRegCalendarAlt className="flex-shrink-0 mr-2 text-white/60" />
                    {date}
                </div>
            </td>
            <td className="px-4 py-4 text-sm font-medium text-right border-b border-white/20 sm:px-6">
                <button className="p-1.5 text-white transition-all duration-200 rounded-full hover:bg-white/20 hover:scale-110">
                    <FaArrowRight className="text-sm" />
                </button>
            </td>
        </tr>
    );
};

const NoticeBoardHome = () => {
    const notices = [
        {
            info: "CMA Inter & Final (June'24) Result Date- 23rd Aug 2024",
            date: "Aug 15, 2024",
            isNew: true
        },
        {
            info: "Daily Live classes are Taking Place On COC Commerce School",
            date: "Aug 10, 2024"
        },
        {
            info: "COC Education has Launched CFM Course",
            date: "Aug 5, 2024",
            isNew: true
        },
        {
            info: "Breaking News CMA Students | Big Update- Stipend & Its Impact on Your Career",
            date: "Jul 28, 2024"
        },
        {
            info: "Get Latest Studio Recorded Classes For CMA & CA June/Dec 24 Attempt",
            date: "Jul 20, 2024"
        },
        {
            info: "New Scholarship Program Announced for Top Performing Students",
            date: "Jul 15, 2024"
        }
    ];

    return (
        <section className="relative w-full py-16 overflow-hidden bg-gradient-to-br from-theme1 to-theme2">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-xl"></div>
            
            <div className="container relative px-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Notice Board Section - Left Side */}
                    <div className="w-full lg:w-8/12">
                        <div className="flex items-center mb-8">
                            <div className="w-4 h-10 bg-yellow-300 rounded-md"></div>
                            <h2 className="ml-4 text-3xl font-bold text-white md:text-4xl">
                                <span className="text-yellow-300">Important</span> Notices
                            </h2>
                        </div>

                        <div className="overflow-hidden border border-blue/20 rounded-xl backdrop-blur-sm bg-blue/5">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-white/20">
                                    <thead className="bg-white/10">
                                        <tr>
                                            <th scope="col" className="w-32 px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-white/80 sm:px-6"></th>
                                            <th scope="col" className="px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-white/80 sm:px-6">Notice</th>
                                            <th scope="col" className="w-40 px-4 py-3 text-xs font-medium tracking-wider text-left uppercase text-white/80 sm:px-6">Date</th>
                                            <th scope="col" className="w-16 px-4 py-3 text-xs font-medium tracking-wider text-right uppercase text-white/80 sm:px-6">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/20">
                                        {notices.map((notice, index) => (
                                            <NoticeCard 
                                                key={index}
                                                info={notice.info}
                                                date={notice.date}
                                                isNew={notice.isNew}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <button className="flex items-center justify-center px-6 py-3 mx-auto text-sm font-medium text-white transition-all duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-600 hover:shadow-lg group">
                                View All Notices
                                <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>

                    {/* Quote Section - Right Side */}
                    <div className="w-full lg:w-4/12">
                        <div className="relative h-full p-8 overflow-hidden shadow-2xl bg-gradient-to-br from-blue-700/90 to-purple-700/90 rounded-xl">
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30"></div>
                            
                            <div className="relative flex flex-col justify-between h-full">
                                <div>
                                    <FaQuoteLeft className="mb-6 text-4xl text-white/30" />
                                    <blockquote className="mb-6 text-2xl font-medium leading-relaxed text-white md:text-2xl xl:text-3xl">
                                        "Education is the most powerful weapon which you can use to change the world."
                                    </blockquote>
                                    <p className="text-lg italic text-white/70">- Nelson Mandela</p>
                                </div>
                                <div className="mt-8">
                                    <div className="flex items-center">
                                        <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
                                        <span className="ml-4 text-sm font-medium tracking-wider uppercase text-white/70">COC Education Philosophy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NoticeBoardHome;