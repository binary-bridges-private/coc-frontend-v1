import React from "react";
import { FaWhatsapp, FaYoutube, FaStar } from "react-icons/fa";
import { MdPhoneInTalk, MdOutlineGroups } from "react-icons/md";
import { RiFlashlightFill } from "react-icons/ri";

const ProductCard = ({ name, byline, photo, priceRange, rating, students, tag, discount, link }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        target.src = 'https://via.placeholder.com/800x450?text=Course+Image';
        target.className = "object-contain bg-gray-200";
    };

    return (
        <div className="relative flex flex-col w-full h-full overflow-hidden transition-all duration-300 bg-white rounded-2xl shadow-lg hover:shadow-2xl group">
            {/* Tag Badge */}
            {tag && (
                <div className="absolute z-10 top-4 left-4">
                    <span className={`px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase rounded-full shadow-md ${
                        tag === "BEST SELLER" ? "bg-gradient-to-r from-purple-600 to-purple-700" :
                        tag === "NEW" ? "bg-gradient-to-r from-blue-600 to-blue-700" :
                        tag === "POPULAR" ? "bg-gradient-to-r from-pink-600 to-pink-700" :
                        tag === "HOT" ? "bg-gradient-to-r from-red-600 to-red-700" : 
                        "bg-gradient-to-r from-indigo-600 to-indigo-700"
                    }`}>
                        {tag}
                    </span>
                </div>
            )}

            {/* Discount Badge */}
            {discount && (
                <div className="absolute z-10 top-4 right-4">
                    <span className="flex items-center px-3 py-1.5 text-xs font-bold tracking-wider text-white uppercase bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full shadow-md">
                        <RiFlashlightFill className="mr-1.5 text-sm" />
                        {discount}
                    </span>
                </div>
            )}

            {/* Image Container */}
            <div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
                <img
                    src={photo || 'https://via.placeholder.com/800x450?text=Course+Image'}
                    alt={name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Course Details */}
            <div className="flex flex-col flex-1 p-4">
                {/* Title and Byline */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold leading-tight text-gray-900 line-clamp-2 mb-1.5">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        By: {byline}
                    </p>
                </div>

                {/* Rating and Students */}
                <div className="flex items-center mb-3 space-x-4">
                    <div className="flex items-center space-x-1.5">
                        <FaStar className="text-base text-orange-500" />
                        <span className="text-sm font-semibold text-gray-900">
                            {rating}
                        </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <MdOutlineGroups className="text-base text-gray-500" />
                        <span className="text-sm text-gray-600">
                            {students.toLocaleString()} students
                        </span>
                    </div>
                </div>

                {/* Price */}
                <div className="p-2.5 my-3 text-center bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                    <p className="text-lg font-bold text-gray-900">
                        {priceRange}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex space-x-2">
                        <button className="p-2 text-orange-600 transition-all duration-300 bg-orange-50 rounded-full hover:bg-orange-100 hover:scale-110">
                            <FaYoutube className="text-base" />
                        </button>
                        <button className="p-2 text-orange-600 transition-all duration-300 bg-orange-50 rounded-full hover:bg-orange-100 hover:scale-110">
                            <FaWhatsapp className="text-base" />
                        </button>
                        <button className="p-2 text-orange-600 transition-all duration-300 bg-orange-50 rounded-full hover:bg-orange-100 hover:scale-110">
                            <MdPhoneInTalk className="text-base" />
                        </button>
                    </div>
                    <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg hover:from-orange-700 hover:to-orange-800 hover:shadow-lg"
                    >
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;