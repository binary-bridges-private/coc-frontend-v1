import React from 'react'
import { motion } from "framer-motion";

const VisitCoursesCard = ({ iconUrl, iconBgColor, title, labels }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
        >
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-lg"
                    style={{ backgroundColor: iconBgColor }}>
                    <img src={iconUrl} alt={title} className="w-10 h-10" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">{title}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {labels.map((label, index) => (
                        <span key={index} className="px-3 py-1 text-blue-800 rounded-full text-md bg-blue-50">
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
};
export default VisitCoursesCard;