import React from 'react'

const Login = () => {
  return (
    <dialog id="my_modal_2" className="modal" open={true}>
      <div className="modal-box">
        <div className="flex flex-col items-center justify-center">
          {/* Outer Frame */}
          <div className="flex flex-col items-start gap-11 p-0 w-[441px]">
            {/* Header Section */}
            <div className="flex flex-col items-center w-full gap-3">
              <h1 className="text-xl font-medium text-gray-900">Login</h1>
              <p className="text-sm font-normal text-gray-500">
                Welcome back! Please enter your details.
              </p>
            </div>

            {/* Input Section */}
            <div className="flex flex-col w-full gap-3">
              {/* Input Field 1 */}
              <div className="w-full form-control">
                <label className="label">
                  <span className="text-gray-900 label-text">Email Address*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter text"
                  className="w-full input input-bordered input-error"
                />
                <span className="mt-1 text-sm text-red-500">
                  This is an error message.
                </span>
              </div>

              {/* Input Field 2 */}
              <div className="w-full form-control">
                <label className="label">
                  <span className="text-gray-900 label-text">Password*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Password"
                  className="w-full input input-bordered input-error"
                />
                <span className="mt-1 text-sm text-red-500">
                  This is an error message.
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between items-start gap-2 w-[441px]">
              {/* Checkbox Section */}
              <div className="flex flex-row items-center gap-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-6 h-6 border-gray-300 rounded-md checkbox"
                  />
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    Remember Me
                  </span>
                </label>
              </div>

              {/* Text Button */}
              <div className="flex flex-row items-center gap-2">
                <span className="text-sm font-medium text-right text-gray-800">
                  Forgot Password?
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-[441px] h-[94px]">
              {/* Button */}
              <button className="flex justify-center items-center w-[441px] h-12 px-4 py-2 bg-[#101C36] text-white text-base font-medium rounded-lg">
                Continue
              </button>

              {/* Text Section */}
              <div className="flex flex-row items-center gap-2">
                <span className="text-[#041B2D] text-base font-medium">
                  Don’t have an account?
                </span>
                <button className="text-[#101C36] text-base font-medium">
                  Sign Up
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

export default Login