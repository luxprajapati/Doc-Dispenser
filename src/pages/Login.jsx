import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, loginGoogle } from "../services/operations/authAPI";

// google login
import { useGoogleLogin } from "@react-oauth/google";
import Spinner from "../components/common/Spinner";
// import { apiConnector } from "../services/apiConnector";
// import { setToken } from "../redux/slices/authSlice";
// import { endpoints } from "../services/apis";

const Login = (props) => {
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log("FormData", formData);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  // const responseGoogle = async (authResult) => {
  //   try {
  //     if (authResult["code"]) {
  //       console.log("Auth Result Code", authResult.code);
  //       const result = await apiConnector(
  //         "GET",
  //         endpoints.GOOGLEAUTH_API,
  //         null,
  //         null,
  //         { code: authResult.code } // passing code as a query parameter
  //       );
  //       console.log("Auth Result", result.data);
  //       // props.setUser(result.data.data);
  //       dispatch(setToken(result.data.token));
  //       localStorage.setItem("token", JSON.stringify(result.data.token));
  //       navigate("/dashboard");
  //       // alert("Login Successfull");
  //     } else {
  //       console.log("Auth Result", authResult);
  //       throw new Error(authResult);
  //     }
  //   } catch (error) {
  //     console.log("Error in Google Login", error);
  //   }
  // };

  const googleLogin = useGoogleLogin({
    onSuccess: (authResult) => {
      dispatch(loginGoogle(authResult, navigate));
    },
    onError: (authResult) => {
      dispatch(loginGoogle(authResult, navigate));
    },
    flow: "auth-code",
  });

  return (
    <div className="flex items-center w-full justify-center my-auto font-poppins ">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-slate-100 p-8 rounded-lg shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-11/12 max-w-md  ">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <p className="mb-4">Hi, Welcome back 👋</p>
          <button
            onClick={googleLogin}
            className="w-full border border-zinc-900  text-zinc-900 py-2 rounded-lg mb-4 flex items-center justify-center"
          >
            <FcGoogle className="mx-2 text-[20px]" />
            Login with Google
          </button>
          <div className="text-center my-4 text-gray-500">
            or Login with Email
          </div>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border  rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                placeholder="E.g. luxprajapati@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 bg-slate-100"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <NavLink to="/forgotPassword" className="text-blue-500">
                Forgot Password?
              </NavLink>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Login
            </button>
          </form>
          <div className="text-center mt-6">
            Not registered yet?{" "}
            <NavLink to="/signup" className="text-blue-500">
              Create an account
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
