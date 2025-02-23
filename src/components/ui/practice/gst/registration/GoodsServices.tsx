import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

interface Props {
    setStep: Dispatch<SetStateAction<number>>;
}

const GoodsServices: React.FC<Props> = ({ setStep }) => {
    const [activeTab, setActiveTab] = useState("goods");

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "goods" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("goods")}
        >
          Goods
        </button>
        <button
          className={`pb-2 px-4 font-medium ${
            activeTab === "services" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "goods" ? (
          <div>
            <h2 className="text-lg font-semibold">Details of Goods / Commodities supplied by the business</h2>
            <p className="text-sm text-gray-600">Please specify top 5 Commodities</p>
            <input
              type="text"
              placeholder="Search HSN Chapter by Name or Code"
              className="w-full p-2 mt-4 mt-5 border rounded-md"
            />
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold">Details of Services offered by the business</h2>
            <p className="text-sm text-gray-600">Please specify top 5 Services</p>
            <input
              type="text"
              placeholder="Search Service by Name or Code"
              className="w-full p-2 mt-4 mt-5 border rounded-md"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
      <button className="btn btn-outline" onClick={() => setStep(6)}>Back</button>
      <button className="btn bg-[#101C36] text-white" onClick={() => setStep(8)}>Save & Continue</button>
      </div>
    </div>
  );
}

export default GoodsServices;
