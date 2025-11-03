import React from 'react'
import { motion } from "framer-motion";

const VisitCoursesCard = ({ iconUrl, iconBgColor, title, labels, link }) => {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col h-64 overflow-hidden bg-white border border-amber-100 shadow-sm rounded-2xl hover:shadow-xl group"
        >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 rounded-full opacity-5 bg-gradient-to-br from-orange-400 to-amber-500"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 rounded-full opacity-5 bg-gradient-to-br from-amber-400 to-orange-300"></div>
            
            <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col flex-1 h-full p-6"
            >
                <div className="flex flex-col h-full z-10">
                    {/* Card Header with Icon and Title */}
                    <div className="flex items-center mb-5">
                        <div 
                            className="flex items-center justify-center w-14 h-14 mr-4 transition-transform duration-300 rounded-xl group-hover:rotate-3"
                            style={{ backgroundColor: iconBgColor }}
                        >
                            <img src={iconUrl} alt={title} className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    </div>
                    
                    {/* Card Body with Tags */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {labels.map((label, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 text-sm font-medium text-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                    
                    {/* Card Footer with CTA */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-amber-100">
                        <div className="text-xs font-medium text-amber-700">
                            COC Education
                        </div>
                        <div className="flex items-center text-orange-600 transition-transform duration-300 group-hover:translate-x-1">
                            <span className="text-sm font-medium">View course</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    )
};
export default VisitCoursesCard;