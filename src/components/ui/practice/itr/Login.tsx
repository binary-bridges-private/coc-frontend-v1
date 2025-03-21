import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [isPan, setIsPan] = useState(true);

    return (
        <>
            <div className="w-[60%] mt-10 p-6 mx-auto bg-white rounded-lg shadow-lg  breadcrumbs">
                <ul>
                    <li className={`${step >= 1 ? 'text-blue-500' : ''}`}>Get Started</li>
                    <li className={`${step >= 2 ? 'text-blue-500' : ''}`}>Fill Details</li>
                    <li className={`${step >= 3 ? 'text-blue-500' : ''}`}>Verify Details</li>
                    <li className={`${step >= 4 ? 'text-blue-500' : ''}`}>Secure Your Account</li>
                </ul>
            </div>

            {step === 1 &&
                <div className="w-[60%] mb-10 p-6 mx-auto bg-white rounded-lg shadow-lg ">
                    <h2 className="mb-4 text-xl font-semibold">Let's Get Started</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Register as</span>
                            </label>
                            <select
                                onChange={(e) => setIsPan(e.currentTarget.value == "0")}
                                className="w-[50%] select select-bordered"
                            >
                                <option value="0">Taxpayers</option>
                                <option value="1">Others</option>
                            </select>
                        </div>

                        {isPan &&
                            <div>
                                <label className="label">
                                    <span className="label-text">PAN *</span>
                                </label>
                                <input type="text" placeholder="" className="w-full input input-bordered" />
                            </div>}


                        {!isPan && <div>
                            <label className="label">
                                <span className="label-text">Category *</span>
                            </label>
                            <input type="text" placeholder="" className="w-full input input-bordered" />
                        </div>}

                        <div className="flex justify-between gap-4 mt-10">
                            <button className="btn btn-outline">Back</button>
                            <button className="btn bg-[#101C36] text-white">Continue</button>
                        </div>
                    </form>
                </div>}
            
            {
                step === 2 && <div>
                    
                </div>
            }
        </>
    );
};

export default Login;
