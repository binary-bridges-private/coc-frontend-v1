// import React, { Dispatch, SetStateAction, useState } from "react";

// interface Props {
//   setStep: Dispatch<SetStateAction<number>>;
// }

// interface Item {
//   id: number;
//   hsnCode: string;
//   description: string;
// }

// const GoodsServices: React.FC<Props> = ({ setStep }) => {
//   const [activeTab, setActiveTab] = useState<"goods" | "services">("goods");
//   const [goods, setGoods] = useState<Item[]>([{ id: 1, hsnCode: "", description: "" }]);
//   const [services, setServices] = useState<Item[]>([{ id: 1, hsnCode: "", description: "" }]);
//   const [goodsErrors, setGoodsErrors] = useState<{ [key: number]: { hsnCode?: string } }>({});
//   const [servicesErrors, setServicesErrors] = useState<{ [key: number]: { hsnCode?: string } }>({});

//   // Function to get the current active list and errors
//   const getCurrentList = () => (activeTab === "goods" ? goods : services);
//   const getCurrentErrors = () => (activeTab === "goods" ? goodsErrors : servicesErrors);

//   // Function to update the active list
//   const setCurrentList = (newList: Item[]) => {
//     activeTab === "goods" ? setGoods(newList) : setServices(newList);
//   };

//   // Function to update the active errors
//   const setCurrentErrors = (newErrors: { [key: number]: { hsnCode?: string } }) => {
//     activeTab === "goods" ? setGoodsErrors(newErrors) : setServicesErrors(newErrors);
//   };

//   // Function to add a new row
//   const addItem = () => {
//     const newItem = { id: Date.now(), hsnCode: "", description: "" };
//     setCurrentList([...getCurrentList(), newItem]);
//   };

//   // Function to remove a row
//   const removeItem = (id: number) => {
//     const updatedList = getCurrentList().filter((item) => item.id !== id);
//     setCurrentList(updatedList);

//     // Remove errors for the deleted item
//     const updatedErrors = { ...getCurrentErrors() };
//     delete updatedErrors[id];
//     setCurrentErrors(updatedErrors);
//   };

//   // Function to handle input change
//   const handleChange = (id: number, field: keyof Item, value: string) => {
//     const updatedList = getCurrentList().map((item) =>
//       item.id === id ? { ...item, [field]: value } : item
//     );
//     setCurrentList(updatedList);

//     // Clear error for the field if it's valid
//     if (field === "hsnCode" && value.trim()) {
//       const updatedErrors = { ...getCurrentErrors() };
//       if (updatedErrors[id]) {
//         delete updatedErrors[id].hsnCode;
//         if (Object.keys(updatedErrors[id]).length === 0) {
//           delete updatedErrors[id];
//         }
//       }
//       setCurrentErrors(updatedErrors);
//     }
//   };

//   // Function to validate the current list
//   const validateList = () => {
//     const errors: { [key: number]: { hsnCode?: string } } = {};
//     let isValid = true;

//     getCurrentList().forEach((item) => {
//       if (!item.hsnCode.trim()) {
//         errors[item.id] = { hsnCode: "HSN Code is required" };
//         isValid = false;
//       }
//     });

//     setCurrentErrors(errors);
//     return isValid;
//   };

//   // Function to handle form submission
//   const handleSubmit = () => {
//     const isValid = validateList();
//     if (isValid) {
//       console.log(activeTab === "goods" ? goods : services);
//       setStep(9); // Proceed to the next step
//     }
//   };

//   return (
//     <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
//       {/* Tab Navigation */}
//       <div className="flex space-x-4 border-b">
//         <button
//           className={`pb-2 px-4 font-medium ${
//             activeTab === "goods" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
//           }`}
//           onClick={() => setActiveTab("goods")}
//         >
//           Goods
//         </button>
//         <button
//           className={`pb-2 px-4 font-medium ${
//             activeTab === "services" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
//           }`}
//           onClick={() => setActiveTab("services")}
//         >
//           Services
//         </button>
//       </div>

//       {/* Tab Content */}
//       <div className="mt-4">
//         {activeTab === "goods" ? (
//           <div>
//             <h2 className="text-lg font-semibold">Details of Goods / Commodities supplied by the business</h2>
//             <p className="text-sm text-gray-600">Please specify top 5 Commodities</p>
//           </div>
//         ) : (
//           <div>
//             <h2 className="text-lg font-semibold">Details of Services offered by the business</h2>
//             <p className="text-sm text-gray-600">Please specify top 5 Services</p>
//           </div>
//         )}
//       </div>

//       {/* Dynamic Input Fields */}
//       <div className="mt-6">
//         {getCurrentList().map((item) => (
//           <div key={item.id} className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
//             {/* HSN Code Input */}
//             <div>
//               <label className="block text-sm font-medium">HSN Code*</label>
//               <input
//                 type="text"
//                 value={item.hsnCode}
//                 onChange={(e) => handleChange(item.id, "hsnCode", e.target.value)}
//                 placeholder="Enter HSN Code"
//                 className={`w-full p-2 text-sm font-medium border rounded-md ${
//                   getCurrentErrors()[item.id]?.hsnCode ? "border-red-500" : ""
//                 }`}
//               />
//               {getCurrentErrors()[item.id]?.hsnCode && (
//                 <p className="text-sm text-red-500">{getCurrentErrors()[item.id].hsnCode}</p>
//               )}
//             </div>

//             {/* Description Input */}
//             <div>
//               <label className="block text-sm font-medium">Description</label>
//               <input
//                 type="text"
//                 value={item.description}
//                 onChange={(e) => handleChange(item.id, "description", e.target.value)}
//                 placeholder="Enter Description"
//                 className="w-full p-2 text-sm font-medium border rounded-md"
//               />
//             </div>

//             {/* Remove Button */}
//             {getCurrentList().length > 1 && (
//               <div className="flex items-end">
//                 <button
//                   className="px-3 py-1 text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white"
//                   onClick={() => removeItem(item.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Add More Button */}
//       <button
//         className="px-4 py-2 mt-4 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
//         onClick={addItem}
//       >
//         + Add More
//       </button>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-4 mt-6">
//         <button className="px-4 py-2 border border-gray-400 rounded-md" onClick={() => setStep(7)}>
//           Back
//         </button>
//         <button className="px-4 py-2 bg-[#101C36] text-white rounded-md" onClick={handleSubmit}>
//           Save & Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GoodsServices;

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
  const [activeTab, setActiveTab] = useState<"goods" | "services">("goods");
  const [goods, setGoods] = useState<Item[]>([{ id: 1, hsnCode: "", description: "" }]);
  const [services, setServices] = useState<Item[]>([{ id: 1, hsnCode: "", description: "" }]);
  const [goodsErrors, setGoodsErrors] = useState<{ [key: number]: { hsnCode?: string } }>({});
  const [servicesErrors, setServicesErrors] = useState<{ [key: number]: { hsnCode?: string } }>({});

  // Standardized input classes
  const inputClass = "w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500";
  const errorInputClass = "w-full p-3 border rounded-md border-red-500 focus:ring-2 focus:ring-red-500";

  // Function to get the current active list and errors
  const getCurrentList = () => (activeTab === "goods" ? goods : services);
  const getCurrentErrors = () => (activeTab === "goods" ? goodsErrors : servicesErrors);

  // Function to update the active list
  const setCurrentList = (newList: Item[]) => {
    activeTab === "goods" ? setGoods(newList) : setServices(newList);
  };

  // Function to update the active errors
  const setCurrentErrors = (newErrors: { [key: number]: { hsnCode?: string } }) => {
    activeTab === "goods" ? setGoodsErrors(newErrors) : setServicesErrors(newErrors);
  };

  // Function to add a new row
  const addItem = () => {
    const newItem = { id: Date.now(), hsnCode: "", description: "" };
    setCurrentList([...getCurrentList(), newItem]);
  };

  // Function to remove a row
  const removeItem = (id: number) => {
    const updatedList = getCurrentList().filter((item) => item.id !== id);
    setCurrentList(updatedList);

    // Remove errors for the deleted item
    const updatedErrors = { ...getCurrentErrors() };
    delete updatedErrors[id];
    setCurrentErrors(updatedErrors);
  };

  // Function to handle input change
  const handleChange = (id: number, field: keyof Item, value: string) => {
    const updatedList = getCurrentList().map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setCurrentList(updatedList);

    // Clear error for the field if it's valid
    if (field === "hsnCode" && value.trim()) {
      const updatedErrors = { ...getCurrentErrors() };
      if (updatedErrors[id]) {
        delete updatedErrors[id].hsnCode;
        if (Object.keys(updatedErrors[id]).length === 0) {
          delete updatedErrors[id];
        }
      }
      setCurrentErrors(updatedErrors);
    }
  };

  // Function to validate the current list
  const validateList = () => {
    const errors: { [key: number]: { hsnCode?: string } } = {};
    let isValid = true;

    getCurrentList().forEach((item) => {
      if (!item.hsnCode.trim()) {
        errors[item.id] = { hsnCode: "HSN Code is required" };
        isValid = false;
      }
    });

    setCurrentErrors(errors);
    return isValid;
  };

  // Function to handle form submission
  const handleSubmit = () => {
    const isValid = validateList();
    if (isValid) {
      console.log(activeTab === "goods" ? goods : services);
      setStep(9); // Proceed to the next step
    }
  };

  return (
    <>
      <div className="w-[60%] mx-auto mt-8 p-6 bg-blue-500 shadow-lg rounded-lg">
        <h2 className="text-xl font-extrabold text-white">
          Goods & Services Details
        </h2>
      </div>
      <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg">
        {/* Tab Navigation */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "goods" 
                ? "border-b-2 border-blue-500 text-blue-500" 
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("goods")}
          >
            Goods
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "services" 
                ? "border-b-2 border-blue-500 text-blue-500" 
                : "text-gray-600 hover:text-blue-500"
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
              <h3 className="text-lg font-semibold text-gray-700">Details of Goods / Commodities</h3>
              <p className="text-sm text-gray-500">Please specify top 5 Commodities</p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Details of Services</h3>
              <p className="text-sm text-gray-500">Please specify top 5 Services</p>
            </div>
          )}
        </div>

        {/* Dynamic Input Fields */}
        <div className="mt-6 space-y-4">
          {getCurrentList().map((item) => (
            <div key={item.id} className="grid grid-cols-1 gap-4 p-4 border rounded-md md:grid-cols-3">
              {/* HSN Code Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">HSN Code *</label>
                <input
                  type="text"
                  value={item.hsnCode}
                  onChange={(e) => handleChange(item.id, "hsnCode", e.target.value)}
                  placeholder="Enter HSN Code"
                  className={getCurrentErrors()[item.id]?.hsnCode ? errorInputClass : inputClass}
                />
                {getCurrentErrors()[item.id]?.hsnCode && (
                  <p className="mt-1 text-sm text-red-500">{getCurrentErrors()[item.id].hsnCode}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleChange(item.id, "description", e.target.value)}
                  placeholder="Enter Description"
                  className={inputClass}
                />
              </div>

              {/* Remove Button */}
              <div className="flex items-end">
                {getCurrentList().length > 1 && (
                  <button
                    className="px-4 py-2 text-sm font-medium text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add More Button */}
        <button
          className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
          onClick={addItem}
        >
          + Add More
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => setStep(7)}
          >
            Back
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default GoodsServices;