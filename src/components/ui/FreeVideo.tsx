import React from 'react'

const FreeVideo = () => {
    return (
        <section className="bg-[#FCE9E9] w-full h-auto flex flex-col lg:flex-row items-center justify-center px-10 py-20">
            <div className="relative flex flex-col items-start gap-3 px-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[#282828] text-4xl md:text-6xl font-semibold">
                        Watch <br></br>
                        free lectures
                    </h2>
                </div>

                <p className="text-[#282828] text-base md:text-lg leading-relaxed w-4/5 max-w-lg">
                You can watch free lectures by simply going to the youtube channel or on the website.
                </p>

                <button className="bg-[#101C36] text-white text-lg font-semibold rounded-md px-6 py-3 top-[65%] left-10 hover:bg-opacity-90">
                    Watch on YouTube
                </button>
            </div>

            <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg w-11/12 max-w-[680px] h-auto mt-12">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#E11D48]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FBBF24]"></div>
                        <div className="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                    </div>
                </div>

                <div className="flex items-center justify-center h-[200px] md:h-[384px] bg-gray-200">
                    <p className="text-gray-500">Video Placeholder</p>
                </div>
            </div>
        </section>

    )
}

export default FreeVideo