import React from 'react'

const NoticeCard = ({ info }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-[#ffffff] rounded-md shadow lg:p-6">
            <p className="text-lg font-medium text-gray-800">
                {info}
            </p>
        </div>
    )
}

const NoticeBoardHome = () => {
    return (
        <div className="relative w-full bg-gradient-to-b from-green-100/50 to-green-100/50">

            <div
                className="relative w-full p-10 mx-auto bg-center bg-cover rounded-lg md:p-20 lg:p-20"
                style={{
                    backgroundImage: "url('/assets/noticeBoard/bg.svg')",
                    filter: "brightness(1.2) contrast(1.1) saturate(1.5)"
                }}
            >


                <div className="absolute inset-0 rounded-lg bg-black/50"></div>
                <div className="relative flex flex-col items-start gap-6 p-0 lg:flex-row lg:p-12">

                    <div className="flex flex-col gap-6 lg:w-[50%] w-[100%] h-[512px]">
                        <div className="flex items-center gap-4">
                            <div className="w-4 h-8 bg-red-500 rounded-md"></div>
                            <h2 className="text-xl font-bold text-red-500">IMPORTANT UPDATES</h2>
                        </div>

                        <div className="flex flex-col gap-4 overflow-scroll">
                            <NoticeCard info={"CMA Inter & Final (June'24) Result Date- 23rd Aug 2024"} />
                            <NoticeCard info={"Daily Live classNamees are Taking Place On COC Commerce School"} />
                            <NoticeCard info={"COC Education has Launched CFM Course"} />
                            <NoticeCard info={"Breaking News CMA Students | Big Update- Stipend & Its Impact on Your Career"} />
                            <NoticeCard info={"Get Latest Studio Recorded classNamees For CMA & CA June/Dec 24 Attempt"} />
                            <NoticeCard info={"CMA Inter & Final (June'24) Result Date- 23rd Aug 2024"} />
                            <NoticeCard info={"Daily Live classNamees are Taking Place On COC Commerce School"} />
                            <NoticeCard info={"COC Education has Launched CFM Course"} />
                            <NoticeCard info={"Breaking News CMA Students | Big Update- Stipend & Its Impact on Your Career"} />
                            <NoticeCard info={"Get Latest Studio Recorded classNamees For CMA & CA June/Dec 24 Attempt"} />
                        </div>
                    </div>
                    <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:p-12 lg:w-[50%] w-[100%] hidden lg:block lg:block">
                        <div className="relative w-full h-64 bg-center bg-cover rounded-lg lg:h-96" style={{ backgroundImage: "url('/assets/noticeBoard/quote.svg')" }}>

                            <div className="absolute inset-0 rounded-lg bg-black/50"></div>
                            <div className="relative flex flex-col items-start justify-center h-full gap-4 p-6">
                                <p className="text-2xl font-medium leading-snug text-white lg:text-3xl">
                                    "Education is the most powerful weapon which you can use to change the world."
                                </p>
                                <p className="text-xl italic text-white lg:text-2xl">- Nelson Mandela</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NoticeBoardHome