import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

interface Item {
  id: number;
  hsnCode: string;
  description: string;
}

const GoodsServices: React.FC<Props> = ({ setStep }) => {
  const [activeTab, setActiveTab] = useState("goods");
  const [goods, setGoods] = useState<Item[]>([{ id: 1, hsnCode: "", description: "" }]);
  const [services, setServices] = useState<Item[]>([{ id: 1, hsnCode: "", description: "" }]);

  // Function to get the current active list
  const getCurrentList = () => (activeTab === "goods" ? goods : services);

  // Function to update the active list
  const setCurrentList = (newList: Item[]) => {
    activeTab === "goods" ? setGoods(newList) : setServices(newList);
  };

  // Function to add a new row
  const addItem = () => {
    setCurrentList([...getCurrentList(), { id: Date.now(), hsnCode: "", description: "" }]);
  };

  // Function to remove a row
  const removeItem = (id: number) => {
    setCurrentList(getCurrentList().filter(item => item.id !== id));
  };

  // Function to handle input change
  const handleChange = (id: number, field: keyof Item, value: string) => {
    setCurrentList(
      getCurrentList().map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b">
        <button
          className={`pb-2 px-4 font-medium ${activeTab === "goods" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("goods")}
        >
          Goods
        </button>
        <button
          className={`pb-2 px-4 font-medium ${activeTab === "services" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"}`}
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
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold">Details of Services offered by the business</h2>
            <p className="text-sm text-gray-600">Please specify top 5 Services</p>
          </div>
        )}
      </div>

      {/* Dynamic Input Fields */}
      <div className="mt-6">
        {getCurrentList().map((item) => (
          <div key={item.id} className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
            {/* HSN Code Input */}
            <div>
              <label className="block text-sm font-medium">HSN Code*</label>
              <input
                type="text"
                value={item.hsnCode}
                onChange={(e) => handleChange(item.id, "hsnCode", e.target.value)}
                placeholder="Enter HSN Code"
                className="w-full p-2 text-sm font-medium border rounded-md"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleChange(item.id, "description", e.target.value)}
                placeholder="Enter Description"
                className="w-full p-2 text-sm font-medium border rounded-md"
              />
            </div>

            {/* Remove Button */}
            {getCurrentList().length > 1 && (
              <div className="flex items-end">
                <button
                  className="px-3 py-1 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add More Button */}
      <button
        className="px-4 py-2 mt-4 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
        onClick={addItem}
      >
        + Add More
      </button>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button className="px-4 py-2 border border-gray-400 rounded-md" onClick={() => setStep(7)}>
          Back
        </button>
        <button className="px-4 py-2 bg-[#101C36] text-white rounded-md" onClick={() => setStep(9)}>
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default GoodsServices;
