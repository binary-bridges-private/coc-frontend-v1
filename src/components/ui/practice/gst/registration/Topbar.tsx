import React from "react";

interface props {
  curr: number
}

const TopBar: React.FC<props> = ({ curr }) => {
  const tabs = [
    "Business Details",
    "Promoter / Partners",
    "Authorized Signatory",
    "Authorized Representative",
    "Principal Place of Business",
    "Additional Places of Business",
    "Goods and Services",
    "State Specific Information",
    "Aadhaar Authentication",
    "Verification",
  ];

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <button className={`btn btn-outline btn-sm ${curr === index ? 'text-white bg-[#101C36]' : ''}`}>{tab}</button>
            {index < tabs.length - 1 && <span className="text-gray-500">|</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
