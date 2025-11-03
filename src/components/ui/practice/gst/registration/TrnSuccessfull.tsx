import React from "react";

const TrnSuccessfull = ({ arnCode="12232nirb3r3br33urr" }) => {
  return (
    <div className=" w-[100%] flex items-center justify-center p-6 bg-gray-100">
      <div className="p-8 text-center bg-white border border-gray-300 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800">Transaction Successful!</h2>
        <p className="mt-2 text-gray-600 text-md">Your transaction has been processed successfully. Below is your ARN code for reference:</p>
        <p className="mt-4 font-mono text-2xl font-semibold text-orange-500">{arnCode}</p>
        <p className="mt-2 text-sm text-gray-500">Please keep this code safe for any future reference regarding your transaction.</p>
      </div>
    </div>
  );
};

export default TrnSuccessfull;
