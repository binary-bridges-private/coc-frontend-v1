import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PayTds = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tanNumber: "",
        amount: "",
        paymentMode: "online",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle payment submission logic here
        console.log("Payment submitted:", formData);
    };

    return (
        <div className="flex items-center justify-center p-4 mt-20 mb-20">
            <div className="w-full max-w-2xl p-8 bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="mb-10 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-800">Pay TDS</h1>
                    <p className="text-gray-500">Make your TDS payment online</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="tanNumber" className="block mb-2 text-sm font-medium text-gray-700">
                            TAN Number
                        </label>
                        <input
                            type="text"
                            id="tanNumber"
                            value={formData.tanNumber}
                            onChange={(e) => setFormData({ ...formData, tanNumber: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your TAN number"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-700">
                            Amount (₹)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter amount"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="paymentMode" className="block mb-2 text-sm font-medium text-gray-700">
                            Payment Mode
                        </label>
                        <select
                            id="paymentMode"
                            value={formData.paymentMode}
                            onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="online">Online Payment</option>
                            <option value="neft">NEFT/RTGS</option>
                            <option value="cheque">Cheque</option>
                        </select>
                    </div>

                    <div className="flex justify-between pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/practice/tds")}
                            className="px-6 py-2 text-gray-700 border border-gray-400 rounded-lg hover:bg-gray-100"
                        >
                            ⬅ Back
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PayTds; 