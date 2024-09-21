// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";

// import Spinner from "../components/common/Spinner";
// import { resetPassword } from "../services/operations/authAPI";

// const UpdatePassword = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { loading } = useSelector((state) => state.auth);

//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { password, confirmPassword } = formData;

//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     const token = location.pathname.split("/").at(-1);
//     dispatch(resetPassword(password, confirmPassword, token, navigate));
//   };

//   return (
//     <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="max-w-[500px] p-4 lg:p-8">
//           <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
//             Choose New Password
//           </h1>
//           <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
//             Almost done! Enter your new Password and you're all set.
//           </p>

//           <form onSubmit={handleOnSubmit}>
//             <label className="relative">
//               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                 New Password <sup className="text-pink-200">*</sup>
//               </p>
//               <input
//                 required
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={password}
//                 onChange={handleOnChange}
//                 placeholder="Password"
//                 style={{
//                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                 }}
//                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//               />

//               <span
//                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? (
//                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                 ) : (
//                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                 )}
//               </span>
//             </label>

//             <label className="relative mt-3 block">
//               <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
//                 Confirm New Password <sup className="text-pink-200">*</sup>
//               </p>
//               <input
//                 required
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={confirmPassword}
//                 onChange={handleOnChange}
//                 placeholder="Confirm Password"
//                 style={{
//                   boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                 }}
//                 className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
//               />

//               <span
//                 className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                 onClick={() => setShowConfirmPassword((prev) => !prev)}
//               >
//                 {showConfirmPassword ? (
//                   <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                 ) : (
//                   <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                 )}
//               </span>
//             </label>

//             <button
//               type="submit"
//               className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
//             >
//               Reset Password
//             </button>
//           </form>
//           <div className="mt-6 flex items-center justify-between">
//             <NavLink to="/login">
//               <p className="flex items-center gap-x-2 text-richblack-5">
//                 <BiArrowBack /> Back To Login
//               </p>
//             </NavLink>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdatePassword;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import Spinner from "../components/common/Spinner";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gray-100">
      {loading ? (
        <Spinner />
      ) : (
        <div className=" w-[90%] sm:max-w-[500px] p-6 lg:p-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-gray-800">
            Choose New Password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-600">
            Almost done! Enter your new Password and you're all set.
          </p>

          <form onSubmit={handleOnSubmit}>
            <label className="relative block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
                New Password <sup className="text-pink-500">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Password"
                className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-gray-800">
                Confirm New Password <sup className="text-pink-500">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                className="w-full rounded-[0.5rem] bg-gray-200 p-[12px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-500 py-[12px] px-[12px] font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <NavLink to="/login">
              <p className="flex items-center gap-x-2 text-blue-500 hover:text-blue-600">
                <BiArrowBack /> Back To Login
              </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
