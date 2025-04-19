// import React, { useState } from 'react'
// import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
// import { switchLoginToSignup, toggleLoginPopup } from '../../../store/slices/PopupSlice.ts';
// import { loginUser } from '../../../store/slices/AuthSlice.ts';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
//   const [loading, setLoading] = useState(false);

//   const dispatch = useAppDispatch();
//   const isOpen = useAppSelector((state) => state.popup.isLoginPopupOpen);

//   const handleLogin = async () => {
//     setErrors({});
//     setLoading(true);

//     try {
//       const resultAction = await dispatch(loginUser({ email, password }));

//       if (loginUser.fulfilled.match(resultAction)) {
//         console.log('Login successful:', resultAction.payload);
//         dispatch(toggleLoginPopup());
//       } else if (loginUser.rejected.match(resultAction)) {
//         const error = resultAction.payload as any;
//         setErrors({
//           email: error?.errors?.email,
//           password: error?.errors?.password,
//           general: error?.message || 'Login failed.',
//         });
//       }
//     } catch (err) {
//       setErrors({ general: 'Something went wrong.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center modal modal-open bg-black/50">
//       <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-xl modal-box">
//         <div className="flex flex-col items-center justify-center">
//           <div className="flex flex-col items-start w-full gap-11">
//             <div className="flex flex-col items-center w-full gap-3">
//               <h1 className="text-xl font-medium text-gray-900">Login</h1>
//               <p className="text-sm font-normal text-gray-500">
//                 Welcome back! Please enter your details.
//               </p>
//               {/* {errors.general && (
//                 <span className="text-sm text-red-500">{errors.general}</span>
//               )} */}
//             </div>

//             {/* Input Section */}
//             <div className="flex flex-col w-full gap-3">
//               {/* Email */}
//               <div className="w-full form-control">
//                 <label className="label">
//                   <span className="text-gray-900 label-text">Email Address*</span>
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className={`w-full input input-bordered ${errors.email ? 'input-error' : ''}`}
//                 />
//                 {errors.email && (
//                   <span className="mt-1 text-sm text-red-500">{errors.email}</span>
//                 )}
//               </div>

//               {/* Password */}
//               <div className="w-full form-control">
//                 <label className="label">
//                   <span className="text-gray-900 label-text">Password*</span>
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Enter password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className={`w-full input input-bordered ${errors.password ? 'input-error' : ''}`}
//                 />
//                 {errors.password && (
//                   <span className="mt-1 text-sm text-red-500">{errors.password}</span>
//                 )}
//               </div>
//             </div>

//             {/* <div className="flex flex-row items-start justify-between w-full gap-2">
//               <div className="flex flex-row items-center gap-2">
//                 <label className="flex items-center cursor-pointer">
//                   <input type="checkbox" className="w-6 h-6 border-gray-300 rounded-md checkbox" />
//                   <span className="ml-2 text-sm font-normal text-gray-600">
//                     Remember Me
//                   </span>
//                 </label>
//               </div>
//               <div className="flex flex-row items-center gap-2">
//                 <span className="text-sm font-medium text-right text-gray-800">
//                   Forgot Password?
//                 </span>
//               </div>
//             </div> */}

//             {/* Submit Button + Signup Link */}
//             <div className="flex flex-col items-center w-full gap-4">
//               <button
//                 onClick={handleLogin}
//                 disabled={loading}
//                 className="flex justify-center items-center w-full h-12 px-4 py-2 bg-[#101C36] text-white text-base font-medium rounded-lg"
//               >
//                 {loading ? 'Logging in...' : 'Continue'}
//               </button>

//               <div className="flex flex-row items-center gap-2">
//                 <span className="text-[#041B2D] text-base font-medium">
//                   Don’t have an account?
//                 </span>
//                 <button
//                   onClick={() => dispatch(switchLoginToSignup())}
//                   className="text-[#101C36] text-base font-medium"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-0 bg-black opacity-50"
//         onClick={() => dispatch(toggleLoginPopup())}
//       ></div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { switchLoginToSignup, toggleLoginPopup } from '../../../store/slices/PopupSlice.ts';
import { loginUser } from '../../../store/slices/AuthSlice.ts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.popup.isLoginPopupOpen);

  const handleLogin = async () => {
    setErrors({});
    setLoading(true);

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        console.log('Login successful:', resultAction.payload);
        dispatch(toggleLoginPopup());
      } else if (loginUser.rejected.match(resultAction)) {
        const error = resultAction.payload as any;
        setErrors({
          email: error?.errors?.email,
          password: error?.errors?.password,
          general: error?.message || 'Login failed.',
        });
      }
    } catch (err) {
      setErrors({ general: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal modal-open bg-black/50">
      <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-xl modal-box">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-start w-full gap-11">
            <div className="flex flex-col items-center w-full gap-3">
              <h1 className="text-xl font-medium text-gray-900">Login</h1>
              <p className="text-sm font-normal text-gray-500">
                Welcome back! Please enter your details.
              </p>
              {/* {errors.general && (
                <span className="text-sm text-red-500">{errors.general}</span>
              )} */}
            </div>

            {/* Input Section */}
            <div className="flex flex-col w-full gap-3">
              {/* Email */}
              <div className="w-full form-control">
                <label className="label">
                  <span className="text-gray-900 label-text">Email Address*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full input input-bordered ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && (
                  <span className="mt-1 text-sm text-red-500">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="w-full form-control">
                <label className="label">
                  <span className="text-gray-900 label-text">Password*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full input input-bordered ${errors.password ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span className="mt-1 text-sm text-red-500">{errors.password}</span>
                )}
              </div>
            </div>

            {/* Submit Button + Signup Link */}
            <div className="flex flex-col items-center w-full gap-4">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex justify-center items-center w-full h-12 px-4 py-2 bg-[#101C36] text-white text-base font-medium rounded-lg"
              >
                {loading ? 'Logging in...' : 'Continue'}
              </button>

              <div className="flex flex-row items-center gap-2">
                <span className="text-[#041B2D] text-base font-medium">
                  Don't have an account?
                </span>
                <button
                  onClick={() => dispatch(switchLoginToSignup())}
                  className="text-[#101C36] text-base font-medium"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-0 bg-black opacity-50"
        onClick={() => dispatch(toggleLoginPopup())}
      ></div>
    </div>
  );
};

export default Login;