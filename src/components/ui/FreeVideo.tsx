// import React from 'react'

// const FreeVideo = () => {
//     return (
//         <section className="bg-[#FCE9E9] w-full h-auto flex flex-col lg:flex-row items-center justify-center px-10 py-20">
//             <div className="relative flex flex-col items-start gap-3 px-6">
//                 <div className="flex flex-col gap-2">
//                     <h2 className="text-[#282828] text-4xl md:text-6xl font-semibold">
//                         Watch <br></br>
//                         free lectures
//                     </h2>
//                 </div>

//                 <p className="text-[#282828] lg:text-pl md:text-pm text-ps leading-relaxed w-4/5 max-w-lg">
//                     You can watch free lectures by simply going to the youtube channel or on the website.
//                 </p>

//                 <button className="bg-[#101C36] text-white lg:text-pl md:text-pm text-ps rounded-md px-6 py-3 top-[65%] left-10 hover:bg-opacity-90">
//                     Watch on YouTube
//                 </button>
//             </div>

//             <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg w-11/12 max-w-[680px] h-auto mt-12">
//                 <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
//                     <div className="flex gap-2">
//                         <div className="w-3 h-3 rounded-full bg-[#E11D48]"></div>
//                         <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
//                         <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-center h-[200px] md:h-[384px] bg-gray-200">
//                     <iframe
//                         width="100%"
//                         height="100%"
//                         src="https://www.youtube.com/embed/dV5Z5uL1br8"
//                         title="YouTube video"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                         allowFullScreen
//                     ></iframe>
//                 </div>
//             </div>
//         </section>

//     )
// }

// export default FreeVideo

import React from 'react';
import { FaYoutube, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

const FreeVideo = () => {
    return (
        <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 mx-auto max-w-7xl lg:grid-cols-2">
                {/* Content Section */}
                <div className="space-y-6 lg:space-y-8">
                    <div className="space-y-3">
                        <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
                            Watch <span className="text-red-600">Free</span> Lectures
                        </h2>
                        <p className="max-w-lg text-lg leading-relaxed text-gray-600 md:text-xl">
                            Access premium educational content at no cost. Learn from top instructors directly on YouTube or our platform.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <button className="flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-medium rounded-lg px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <FaYoutube className="text-xl" />
                            Watch on YouTube
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-[#101C36] hover:bg-[#0A1226] text-white font-medium rounded-lg px-6 py-3 transition-all duration-300 border border-gray-300 hover:shadow-md">
                            <FaPlay className="text-lg" />
                            Browse Courses
                        </button>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <FaExternalLinkAlt className="text-sm" />
                        <span className="text-sm">No registration required</span>
                    </div>
                </div>

                {/* Video Player Section */}
                <div className="relative group">
                    <div className="absolute transition-all duration-300 opacity-75 -inset-2 rounded-2xl group-hover:opacity-100 blur-md"></div>
                    <div className="relative overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-xl">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="font-mono text-sm text-gray-500">coc-education.com</div>
                        </div>

                        <div className="bg-gray-100 aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-[200px] sm:h-[300px] md:h-[350px]"
                                src="https://www.youtube.com/embed/dV5Z5uL1br8?modestbranding=1"
                                title="Free Lecture from COC Education"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <span className="text-sm text-gray-600">Sample Lecture Preview</span>
                            <div className="flex gap-2">
                                <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-md">FREE</span>
                                <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md">10:24</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FreeVideo;