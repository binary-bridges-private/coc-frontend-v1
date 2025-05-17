import React from 'react'

const FacultyCard = ({ image, label, name, bio }) => {
    return (
        <div className="min-w-[300px] max-w-[360px] bg-white rounded-lg shadow-md p-4 flex flex-col items-start mx-auto">

            <div className="relative w-full">
                <img
                    src={image}
                    alt={label}
                    className="object-cover w-full rounded-lg"
                />
                <div className="absolute px-3 py-1 rounded bottom-4 left-4 bg-white/80 backdrop-blur-sm">
                    <span className="text-sm font-medium text-red-600">{label}</span>
                </div>
            </div>

            <div className="mt-6 overflow-hidden h-[160px]">
                <h3 className="mb-2 text-lg font-semibold text-black">{name}</h3>
                <p className="leading-relaxed text-gray-600 text-n2">
                    {bio}
                </p>
            </div>

            <div className="flex items-center mt-4">
                <a href="https://www.coceducation.com/faculties"  target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-blue-500 underline">
                    Learn More
                </a>
                <div className="flex items-center justify-center w-6 h-6 ml-2 border-2 border-blue-500 rounded-full">
                    <div className="w-2 h-2 bg-blue-500"></div>
                </div>
            </div>

        </div>
    );
}

export default FacultyCard;