import React from 'react'

const Item = () => {
    return (
        <div className="flex flex-col  md:flex-row lg:flex-row items-start gap-6 p-5 w-full max-w-[1030px] h-auto border-2">
            {/* Card 1 (Image Section) */}
            <div className="w-full sm:w-[222px] h-auto sm:h-[225px] bg-[#F5F5F5] rounded-md flex-none">
                <div
                    className="w-full h-full bg-center bg-cover rounded-lg"
                    style={{ backgroundImage: "url('cma-foundation-accounting')" }}
                ></div>
            </div>

            {/* Content Section */}
            <div className="w-full sm:w-[584px] h-auto sm:h-[222px] flex flex-col gap-6">
                <div className="flex flex-col gap-4 w-full sm:w-[584px] h-auto sm:h-[174px]">
                    {/* Heading Section */}
                    <div className="flex flex-col gap-2 w-full sm:w-[584px] h-auto sm:h-[82px]">
                        <p className="text-[#0F172A] text-[18px] sm:text-[20px] font-semibold">Your Heading</p>
                        <p className="text-[#1E1E1E] text-[14px] sm:text-[16px] font-medium">By COC Education</p>
                    </div>

                    {/* Info Section */}
                    <div className="flex flex-row gap-6 w-auto h-auto sm:h-[28px]">
                        <div className="flex flex-row gap-2 w-full sm:w-[169px] h-auto sm:h-[28px]">
                            <p className="text-[#9C9C9C] text-[14px] sm:text-[18px] font-normal">Attempt</p>
                            <p className="text-[#0F172A] text-[14px] sm:text-[18px] font-medium">Value 1</p>
                        </div>
                        <div className="flex flex-row gap-2 w-full sm:w-[239px] h-auto sm:h-[28px]">
                            <p className="text-[#9C9C9C] text-[14px] sm:text-[18px] font-normal">Mode</p>
                            <p className="text-[#0F172A] text-[14px] sm:text-[18px] font-medium">Value 2</p>
                        </div>
                    </div>

                    {/* Discount and Price Section */}
                    <div className="flex flex-row gap-3 w-auto h-auto sm:h-[28px]">
                        <p className="text-[#9C9C9C] text-[14px] sm:text-[24px] font-normal line-through uppercase">
                            Discounted
                        </p>
                        <p className="text-[#0F172A] text-[14px] sm:text-[24px] font-bold uppercase">Price</p>
                        <p className="text-[#1FAF38] text-[12px] sm:text-[16px] font-semibold">(16.00% Off)</p>
                    </div>

                    {/* Button Section */}
                    <div className="flex flex-row items-center gap-2 w-auto h-auto sm:h-[24px]">
                        <p className="text-[#DC2626] text-[14px] sm:text-[16px] font-semibold underline cursor-pointer">
                            Remove
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item