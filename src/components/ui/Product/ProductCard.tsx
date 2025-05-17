// import React from "react";
// import { FaWhatsapp, FaYoutube, FaStar } from "react-icons/fa";
// import { MdPhoneInTalk, MdOutlineGroups } from "react-icons/md";
// import { RiFlashlightFill } from "react-icons/ri";

// const ProductCard = ({ name, byline, photo, priceRange, rating, students, tag, discount }) => {
//     const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//         const target = e.target as HTMLImageElement;
//         target.src = 'https://via.placeholder.com/400x240?text=Course+Image';
//         target.className = "object-contain bg-gray-200";
//     };

//     return (
//         <div className="relative flex flex-col w-full min-w-[280px] max-w-[360px] h-[580px] overflow-hidden transition-all duration-300 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl group mx-auto">
//             {/* Tag Badge */}
//             {tag && (
//                 <div className="absolute z-10 top-4 left-4">
//                     <span className={`px-3 py-1 text-xs font-bold tracking-wider text-white uppercase rounded-full ${
//                         tag === "BEST SELLER" ? "bg-purple-600" :
//                         tag === "NEW" ? "bg-blue-600" :
//                         tag === "POPULAR" ? "bg-orange-500" :
//                         tag === "HOT" ? "bg-red-600" : "bg-gray-800"
//                     }`}>
//                         {tag}
//                     </span>
//                 </div>
//             )}

//             {/* Discount Badge */}
//             {discount && (
//                 <div className="absolute z-10 top-4 right-4">
//                     <span className="flex items-center px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-green-600 rounded-full">
//                         <RiFlashlightFill className="mr-1" />
//                         {discount}
//                     </span>
//                 </div>
//             )}

//             {/* Image Container */}
//             <div className="relative w-full overflow-hidden bg-gray-100 h-60">
//                 <img
//                     src={photo || 'https://via.placeholder.com/400x240?text=Course+Image'}
//                     alt={name}
//                     className="object-cover w-full h-full"
//                     onError={handleImageError}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             </div>

//             {/* Course Details */}
//             <div className="flex flex-col flex-1 p-4 md:p-6">
//                 <div className="flex-1">
//                     <h3 className="mb-2 text-lg font-bold text-gray-900 md:text-xl line-clamp-2">{name}</h3>
//                     <p className="mb-4 text-xs text-gray-600 md:text-sm line-clamp-2">By: {byline}</p>
//                 </div>

//                 <div className="flex items-center mb-4 space-x-4">
//                     <div className="flex items-center">
//                         <FaStar className="text-yellow-400" />
//                         <span className="ml-1 text-sm font-semibold text-gray-900">
//                             {rating}
//                         </span>
//                     </div>
//                     <div className="flex items-center">
//                         <MdOutlineGroups className="text-gray-500" />
//                         <span className="ml-1 text-sm text-gray-600">
//                             {students.toLocaleString()} students
//                         </span>
//                     </div>
//                 </div>

//                 <div className="p-2 mb-4 text-center bg-gray-100 rounded-lg md:p-3">
//                     <p className="text-base font-bold text-gray-900 md:text-lg">{priceRange}</p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                     <div className="flex space-x-2 md:space-x-3">
//                         <button className="p-1.5 md:p-2 text-red-600 transition-colors duration-300 bg-red-100 rounded-full hover:bg-red-200">
//                             <FaYoutube className="text-base md:text-lg" />
//                         </button>
//                         <button className="p-1.5 md:p-2 text-green-600 transition-colors duration-300 bg-green-100 rounded-full hover:bg-green-200">
//                             <FaWhatsapp className="text-base md:text-lg" />
//                         </button>
//                         <button className="p-1.5 md:p-2 text-blue-600 transition-colors duration-300 bg-blue-100 rounded-full hover:bg-blue-200">
//                             <MdPhoneInTalk className="text-base md:text-lg" />
//                         </button>
//                     </div>
//                     <button className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white transition-colors duration-300 bg-gray-900 rounded-lg hover:bg-gray-800">
//                         View Details
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

import React from "react";
import { FaWhatsapp, FaYoutube, FaStar } from "react-icons/fa";
import { MdPhoneInTalk, MdOutlineGroups } from "react-icons/md";
import { RiFlashlightFill } from "react-icons/ri";

const ProductCard = ({ name, byline, photo, priceRange, rating, students, tag, discount }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://via.placeholder.com/800x450?text=Course+Image';
        target.className = "object-contain bg-gray-200";
    };

    return (
        <div className="relative flex flex-col w-full h-full min-w-[240px] max-w-[400px] overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-lg hover:shadow-xl group mx-auto">
            {/* Tag Badge */}
            {tag && (
                <div className="absolute z-10 top-3 left-3 sm:top-4 sm:left-4">
                    <span className={`px-2 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-white uppercase rounded-full ${tag === "BEST SELLER" ? "bg-purple-600" :
                            tag === "NEW" ? "bg-blue-600" :
                                tag === "POPULAR" ? "bg-orange-500" :
                                    tag === "HOT" ? "bg-red-600" : "bg-gray-800"
                        }`}>
                        {tag}
                    </span>
                </div>
            )}

            {/* Discount Badge */}
            {discount && (
                <div className="absolute z-10 top-3 right-3 sm:top-4 sm:right-4">
                    <span className="flex items-center px-2 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-white uppercase bg-green-600 rounded-full">
                        <RiFlashlightFill className="mr-0.5 sm:mr-1 text-xs sm:text-sm" />
                        {discount}
                    </span>
                </div>
            )}

            {/* Image Container - Responsive height */}
            <div className="relative w-full bg-gray-100 aspect-video">
                <img
                    src={photo || 'https://via.placeholder.com/800x450?text=Course+Image'}
                    alt={name}
                    className="object-cover w-full h-full"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Course Details - Responsive padding */}
            <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5">
                <div className="flex-1 space-y-1 sm:space-y-2">
                    <h3 className="text-sm font-bold leading-tight text-gray-900 sm:text-base md:text-lg line-clamp-2 sm:leading-snug">
                        {name}
                    </h3>
                    <p className="text-xs text-gray-600 sm:text-sm line-clamp-2">
                        By: {byline}
                    </p>
                </div>

                {/* Rating and Students - Responsive spacing */}
                <div className="flex items-center mt-3 space-x-3 sm:mt-4 sm:space-x-4">
                    <div className="flex items-center space-x-1">
                        <FaStar className="text-sm text-yellow-400 sm:text-base" />
                        <span className="text-xs font-semibold text-gray-900 sm:text-sm">
                            {rating}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <MdOutlineGroups className="text-sm text-gray-500 sm:text-base" />
                        <span className="text-xs text-gray-600 sm:text-sm">
                            {students.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Price - Responsive padding */}
                <div className="p-2 mt-3 text-center bg-gray-100 rounded-lg sm:mt-4 sm:p-3">
                    <p className="text-sm font-bold text-gray-900 sm:text-base md:text-lg">
                        {priceRange}
                    </p>
                </div>

                {/* Action Buttons - Responsive sizing */}
                <div className="flex items-center justify-between mt-4 sm:mt-5">
                    <div className="flex space-x-2 sm:space-x-3">
                        <button className="p-1.5 sm:p-2 text-red-600 transition-colors duration-300 bg-red-100 rounded-full hover:bg-red-200">
                            <FaYoutube className="text-sm sm:text-base" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-green-600 transition-colors duration-300 bg-green-100 rounded-full hover:bg-green-200">
                            <FaWhatsapp className="text-sm sm:text-base" />
                        </button>
                        <button className="p-1.5 sm:p-2 text-blue-600 transition-colors duration-300 bg-blue-100 rounded-full hover:bg-blue-200">
                            <MdPhoneInTalk className="text-sm sm:text-base" />
                        </button>
                    </div>
                    <a href="https://www.coceducation.com/new-course/skill-courses" target="_blank" rel="noopener noreferrer">
                        <button className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-white transition-colors duration-300 bg-gray-900 rounded-lg hover:bg-gray-800">
                            View Details
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;