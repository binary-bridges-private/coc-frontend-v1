import React from 'react'

const FacultyDetails = () => {
    return (
        <>
            <div
                className="absolute inset-x-0 top-0 h-[15vh] bg-red-200 opacity-40 transform scale-x-[-1]"
            ></div>

            <div
                className="absolute top-1/4 left-5 sm:left-10 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] bg-cover bg-no-repeat rounded-full"
                style={{ backgroundImage: "url('image3.png')", backgroundColor: "#EEF5FC" }}
            ></div>

            <div
                className="absolute top-1/3 left-[10%] sm:left-[25%] flex flex-col gap-6 w-[90%] sm:w-[60%] lg:w-[40%]"
            >
                <h2
                    className="text-2xl font-semibold leading-tight text-black break-words sm:text-3xl"
                >
                    Professor Nitin Bhardwaj
                </h2>

                <div className="flex flex-wrap justify-start gap-4">
                    <button
                        className="flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-800 transition bg-white border border-gray-300 rounded-lg sm:text-base hover:bg-gray-100"
                    >
                        Button 1
                    </button>

                    <button
                        className="flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-800 transition bg-white border border-gray-300 rounded-lg sm:text-base hover:bg-gray-100"
                    >
                        Button 2
                    </button>

                    <button
                        className="flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-800 transition bg-white border border-gray-300 rounded-lg sm:text-base hover:bg-gray-100"
                    >
                        Button 3
                    </button>

                    <button
                        className="flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-800 transition bg-white border border-gray-300 rounded-lg sm:text-base hover:bg-gray-100"
                    >
                        Button 4
                    </button>
                </div>
            </div>

        </>
    )
}

export default FacultyDetails