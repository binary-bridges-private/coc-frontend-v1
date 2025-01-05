import React from 'react'

const VisitComponentCard = ({ title, label1, label2, label3, iconUrl, iconBgColor }) => {
    return (
        <div className="relative w-sm h-[250px] bg-white border border-[#F5F5F5] shadow-lg rounded-lg p-4 flex flex-col items-start overflow-hidden">

            <div className="absolute top-6 left-8 text-2xl font-bold text-[#282828]">
                {title}
            </div>

            <div className={`absolute top-0 right-[-125px] w-[250px] h-[250px] rounded-full`} style={{ backgroundColor: iconBgColor }} />

            <img className="absolute right-8 top-[calc(50%-24px)] w-12 h-12 bg-cover bg-center" src={iconUrl} />

            <div className="absolute top-20 left-8 flex items-center justify-center gap-2 border border-[#545454] rounded-md p-2 text-[#545454] text-n2">
                {label1}
            </div>

            <div className="absolute top-20 left-32 mx-2 flex items-center justify-center gap-2 border border-[#545454] rounded-md p-2 text-[#545454] text-n2">
                {label2}
            </div>

            <div className="absolute top-32 left-8 flex items-center justify-center gap-2 border border-[#545454] rounded-md p-2 text-[#545454] text-n2">
                {label3}
            </div>

            <div className="absolute flex items-center gap-2 bottom-8 left-8">
                <span className="text-lg font-semibold text-[#101C36]">Explore Courses</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#101C36]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 7l5 5-5 5"></path>
                </svg>
            </div>
        </div>

    )
}

export default VisitComponentCard