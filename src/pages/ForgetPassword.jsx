// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";
// import { getPasswordToken } from "../services/operations/authAPI";
// import Spinner from "../components/common/Spinner";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const { loading } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     dispatch(getPasswordToken(email, setEmailSent));
//   };

//   return (
//     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="max-w-[500px] p-4 lg:p-8">
//           <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//             {!emailSent ? "Reset your Password" : "Check Email"}
//           </h1>

//           <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
//             {!emailSent
//               ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
//               : `We have sent the reset email to ${email}`}
//           </p>
//           {/* Form */}
//           <form onSubmit={handleOnSubmit}>
//             {!emailSent && (
//               <label className="w-full">
//                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                   Email Address <sup className="text-pink-200">*</sup>
//                 </p>
//                 <input
//                   required
//                   type="email"
//                   name="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter Email Address"
//                   style={{
//                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                   }}
//                   className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//                 ></input>
//               </label>
//             )}
//             <button
//               type="submit"
//               className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
//             >
//               {!emailSent ? "Submit" : "ResentEmail"}
//             </button>
//           </form>

//           {/* backtoLogin btn */}
//           <div className="mt-6 flex items-center justify-between">
//             <NavLink to="/login">
//               <p className="flex items-center gap-x-2 text-richblack-5">
//                 <BiArrowBack /> Back to Login
//               </p>
//             </NavLink>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getPasswordToken } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordToken(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-100">
      {loading ? (
        <Spinner />
      ) : (
        <div className=" w-[90%] sm:max-w-[500px] p-6 lg:p-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-800">
            {!emailSent ? "Reset your Password" : "Check Email"}
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-600">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent the reset email to ${email}`}
          </p>
          {/* Form */}
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
                  Email Address <sup className="text-pink-500">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            )}
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-500 py-[12px] px-[12px] font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          {/* Back to Login button */}
          <div className="mt-6 flex items-center justify-between">
            <NavLink to="/login">
              <p className="flex items-center gap-x-2 text-blue-500 hover:text-blue-600">
                <BiArrowBack /> Back to Login
              </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
