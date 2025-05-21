
// import React from 'react';
// import { FaYoutube, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

// const FreeVideo = () => {
//     return (
//         <section className="w-full px-4 py-10 sm:px-6 lg:px-8">
//             <div className="grid items-center grid-cols-1 gap-12 mx-auto max-w-7xl lg:grid-cols-2">
//                 {/* Content Section */}
//                 <div className="space-y-6 lg:space-y-8">
//                     <div className="space-y-3">
//                         <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
//                             Watch <span className="text-red-600">Free</span> Lectures
//                         </h2>
//                         <p className="max-w-lg text-lg leading-relaxed text-gray-600 md:text-xl">
//                             Access premium educational content at no cost. Learn from top instructors directly on YouTube or our platform.
//                         </p>
//                     </div>

//                     <div className="flex flex-col gap-4 sm:flex-row">
//                         <a href='https://youtube.com/@cfmcoceducation?si=vhRbpsOvVbrh1k5Y' target='_'>
//                             <button className="flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-medium rounded-lg px-6 py-3 transition-all duration-300 transform hover:scale-105 shadow-lg">
//                                 <FaYoutube className="text-xl" />
//                                 Watch on YouTube
//                             </button>
//                         </a>
//                         <a href="https://www.coceducation.com/new-course/skill-courses" target="_blank" rel="noopener noreferrer">
//                             <button className="flex items-center justify-center gap-2 bg-[#101C36] hover:bg-[#0A1226] text-white font-medium rounded-lg px-6 py-3 transition-all duration-300 border border-gray-300 hover:shadow-md">
//                                 <FaPlay className="text-lg" />
//                                 Browse Courses
//                             </button>
//                         </a>
//                     </div>

//                     <div className="flex items-center gap-2 text-gray-500">
//                         <FaExternalLinkAlt className="text-sm" />
//                         <span className="text-sm">No registration required</span>
//                     </div>
//                 </div>

//                 {/* Video Player Section */}
//                 <div className="relative group">
//                     <div className="absolute transition-all duration-300 opacity-75 -inset-2 rounded-2xl group-hover:opacity-100 blur-md"></div>
//                     <div className="relative overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-xl">
//                         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
//                             <div className="flex gap-2">
//                                 <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                                 <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                             </div>
//                             <div className="font-mono text-sm text-gray-500">coc-education.com</div>
//                         </div>

//                         <div className="bg-gray-100 aspect-w-16 aspect-h-9">
//                             <iframe
//                                 className="w-full h-[200px] sm:h-[300px] md:h-[350px]"
//                                 src="https://www.youtube.com/embed/dV5Z5uL1br8?modestbranding=1"
//                                 title="Free Lecture from COC Education"
//                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                 allowFullScreen
//                                 loading="lazy"
//                             ></iframe>
//                         </div>

//                         <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
//                             <span className="text-sm text-gray-600">Sample Lecture Preview</span>
//                             <div className="flex gap-2">
//                                 <span className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-md">FREE</span>
//                                 <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-md">7:26</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FreeVideo;

import { motion } from 'framer-motion';
import { FaYoutube, FaPlay, FaExternalLinkAlt } from 'react-icons/fa';

const FreeVideo = () => {
    return (
        <section className="w-full px-4 py-10 bg-white ">
            <div className="grid items-center grid-cols-1 gap-12 mx-auto max-w-7xl lg:grid-cols-2">
                {/* Content Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6 lg:space-y-8"
                    viewport={{ once: true }}
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold leading-tight text-gray-900 ">
                            Watch <span className="text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">Free</span> Lectures
                        </h2>
                        <p className="max-w-lg text-lg leading-relaxed text-gray-700 md:text-xl">
                            Access premium educational content at no cost. Learn from top instructors directly on YouTube or our platform.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <a 
                            href='https://youtube.com/@cfmcoceducation?si=vhRbpsOvVbrh1k5Y' 
                            target='_blank'
                            className="w-full sm:w-auto"
                        >
                            <button className="flex items-center justify-center w-full gap-2 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:from-blue-700 hover:to-blue-800">
                                <FaYoutube className="text-xl" />
                                Watch on YouTube
                            </button>
                        </a>
                        <a 
                            href="https://www.coceducation.com/new-course/skill-courses" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto"
                        >
                            <button className="flex items-center justify-center w-full gap-2 px-8 py-4 text-sm font-semibold text-gray-900 transition-all duration-300 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 hover:shadow-md">
                                <FaPlay className="text-lg" />
                                Browse Courses
                            </button>
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                        <FaExternalLinkAlt className="text-sm" />
                        <span className="text-sm">No registration required</span>
                    </div>
                </motion.div>

                {/* Video Player Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative group"
                    viewport={{ once: true }}
                >
                    <div className="relative overflow-hidden transition-shadow duration-300 bg-white border border-gray-200 shadow-xl rounded-xl hover:shadow-2xl">
                        {/* Browser-style Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="text-xs font-medium text-gray-500">education.coc.in/lectures</div>
                        </div>

                        {/* Video Container */}
                        <div className="bg-gray-100 aspect-w-16 aspect-h-9">
                            <iframe
                                className="w-full h-[250px] sm:h-[300px] md:h-[350px]"
                                src="https://www.youtube.com/embed/dV5Z5uL1br8?modestbranding=1"
                                title="Free Lecture from COC Education"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>

                        {/* Video Footer */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-gray-200">
                            <span className="text-sm font-medium text-gray-600">Preview</span>
                            <div className="flex gap-2">
                                <span className="px-2.5 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">FREE</span>
                                <span className="px-2.5 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">7:26</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FreeVideo;