import React from "react";

interface HousePropertyProps {
  onCancel: () => void;
}

const HouseProperty: React.FC<HousePropertyProps> = ({ onCancel }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        House Property Income (Schedule HP)
      </h3>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
        <p className="text-slate-700">
          Enter details of house properties owned by the HUF. Include rental income, municipal taxes, repairs, and interest on borrowed capital.
        </p>
      </div>

      <div className="space-y-6">
        <div className="border border-slate-200 rounded-lg p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Property 1</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Address" className="border border-slate-300 rounded px-3 py-2" />
            <input type="text" placeholder="City" className="border border-slate-300 rounded px-3 py-2" />
            <input type="number" placeholder="Gross Rent" className="border border-slate-300 rounded px-3 py-2" />
            <input type="number" placeholder="Tax & Municipal Charges" className="border border-slate-300 rounded px-3 py-2" />
            <input type="number" placeholder="Interest on Borrowed Capital" className="border border-slate-300 rounded px-3 py-2" />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded text-center text-slate-600">
        Component content placeholder - Implementation in progress
      </div>
    </div>
  );
};

export default HouseProperty;
