import React from 'react'

const FacultyDetails = ({ faculty }) => {
    return (
        <div>
            <div className=" relative bg-opacity-40 bg-red-200 w-full h-[289px] transform -scale-x-100">


                <div className="absolute h-[289px] w-auto top-[69px] left-[50%] transform border-2 -translate-x-1/2 lg:translate-x-0 lg:right-[120px]">
                    <div
                        className="bg-cover bg-center bg-no-repeat rounded-full w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[260px] lg:h-[260px]"
                        style={{ backgroundImage: "url('image-3.png')", backgroundColor: "#EEF5FC" }}
                    ></div>
                </div>

                <div className="absolute top-[332px] left-[50%] transform -translate-x-1/2 lg:left-[422px] lg:translate-x-0 flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
                    <div className="text-xl font-semibold text-black md:text-2xl">
                        Professor Nitin Bhardwaj
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                        <button className="px-4 py-2 text-base font-medium btn btn-outline btn-gray md:px-6 md:py-3">
                            Text 1
                        </button>
                        <button className="px-4 py-2 text-base font-medium btn btn-outline btn-gray md:px-6 md:py-3">
                            Text 2
                        </button>
                        <button className="px-4 py-2 text-base font-medium btn btn-outline btn-gray md:px-6 md:py-3">
                            Text 3
                        </button>
                        <button className="px-4 py-2 text-base font-medium btn btn-outline btn-gray md:px-6 md:py-3">
                            Text 4
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute left-[120px] top-[590px] w-full max-w-screen-lg p-4 flex flex-col gap-8">
                {/* About Section */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-primary font-semibold text-2xl leading-[52px]">ABOUT</h2>
                    <p className="text-lg font-normal leading-8 text-secondary">
                        Nitin Bhardwaj sir is known as a devoted teacher for Law having a consistent growth rate and
                        success within a short span of time. His insights into the subject are intriguing and his hold over
                        BUSINESS LAW and COMPANY LAW is unparalleled. His Story Telling Technique is very famous
                        among the students. He was a university topper in M.COM & B.COM.
                    </p>
                </div>

                {/* Experience Section */}
                <div className="flex flex-col gap-3">
                    <h2 className="text-primary font-semibold text-2xl leading-[52px]">EXPERIENCE</h2>
                    <p className="text-lg font-normal leading-8 text-secondary">
                        He has a vast amount of work experience of more than 14+ years as a Pan India Faculty. Precisely,
                        he has been working with numerous institutes and educational companies (Pearson ETEN CA,
                        Stargate E-Learning Pvt. Ltd., UNACADEMY) as one of the great and highly regarded faculty.
                        His way of teaching is unbeatable. He had taught a massive crowd in Delhi NCR (Through Live &
                        Face to Face mode).
                    </p>
                </div>

                {/* Metric Section */}
                <div className="absolute left-[939px] top-[585px] w-full max-w-[381px] flex flex-col gap-8">
                    {/* Metric Item 1 */}
                    <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md">
                        <div className="flex flex-col gap-3">
                            <span className="text-primary font-bold text-4xl leading-[72px]">219</span>
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-lg font-semibold text-primary">Text</span>
                                <span className="text-base font-normal leading-6 text-gray-600">Supporting text</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric Item 2 */}
                    <div className="flex flex-col gap-5 p-6 bg-white rounded-lg shadow-md">
                        <div className="flex flex-col gap-3">
                            <span className="text-primary font-bold text-4xl leading-[72px]">134</span>
                            <div className="flex flex-col items-start gap-1">
                                <span className="text-lg font-semibold text-primary">Text</span>
                                <span className="text-base font-normal leading-6 text-gray-600">Supporting text</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FacultyDetails