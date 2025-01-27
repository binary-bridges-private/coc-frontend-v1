import React from 'react';


const CartSummary: React.FC = () => {

  return (
    <div className=" flex flex-col justify-center items-center gap-8 p-6 sm:p-8 w-[100%] h-auto bg-white border border-[#DBDBDB] rounded-lg">
      {/* Frame 1321315089 (Inner Box) */}
      <div className="flex flex-col items-start gap-4 sm:gap-6 w-full sm:w-[360px] h-auto">

        {/* Title/Description */}
        <div className="w-full sm:w-[327px] h-[26px] flex items-center text-[#0F172A] text-lg sm:text-xl font-semibold">
          Order Summary
        </div>

        {/* Group Content */}
        <div className="w-full sm:w-[360px] h-[100px] flex flex-col gap-4">

          {/* Subsection 1 */}
          <div className='flex '>
            <div className="w-full sm:w-[327px] h-[26px] flex items-center text-[#1E293B] text-sm sm:text-base font-medium">
              Label 1
            </div>
            <div className="text-[#1E293B] text-sm sm:text-base ">
              Value 1
            </div>
          </div>

          {/* Subsection 2 */}
          <div className='flex '>
            <div className="w-full sm:w-[327px] h-[26px] flex items-center text-[#1E293B] text-sm sm:text-base font-medium">
              Label 2
            </div>
            <div className="text-[#1E293B] text-sm sm:text-base ">
              Value 2
            </div>
          </div>
        </div>

        {/* Line */}
        <div className="w-full sm:w-[360px] h-[0.5px] border-t border-dashed border-[#94A3B8]" />


        <div className="w-full sm:w-[327px] h-[26px] flex items-center text-[#0F172A] text-lg sm:text-xl font-semibold">
          Total Amount
        </div>

        {/* Button Section */}
        <div className="flex justify-center items-center gap-2 w-full sm:w-[360px] h-[52px] bg-[#101C36] rounded-md cursor-pointer">
          <p className="text-base font-medium text-white sm:text-xl">Proceed to Checkout</p>
        </div>
      </div>
    </div>

  );
};

export default CartSummary;
